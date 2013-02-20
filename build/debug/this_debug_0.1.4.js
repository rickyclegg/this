/*! this - v0.1.4 - 2013-02-20 - Author: Ricky Clegg || me@rickyclegg.com */

(function () {
    /**
     * Extends all methods and properties from the parsed Object.
     * @param SuperClass {Function} The class you wish to inherit from.
     * @returns {Function}
     * @memberOf Function.prototype
     * @example var BaseClass = function() {};
     * var AdvancedClass = function() {};
     * AdvancedClass.extend(BaseClass);
     */
    Function.prototype.extend = function (SuperClass) {
        if (typeof SuperClass.constructor === 'function') {
            this.prototype = new SuperClass();
            this.prototype.constructor = this;
        } else {
            this.prototype = SuperClass;
            this.prototype.constructor = this;
        }

        return this;
    };

    if (!Function.prototype.bind) {
        (function () {
            var slice = Array.prototype.slice;

            /**
             * Changes the scope of the function every time it is called.
             * @memberOf Function.prototype
             * @param scope
             * @returns {Function} A new copy of the function bound to a scope.
             * @example function myClickHandler(event)
             * {
             *     alert(this);
             * }
             *
             * var myElement = document.getElementById('myElement');
             * myElement.onClick = myClickHandler.bind(this);
             */
            Function.prototype.bind = function (scope) {
                var _this = this,
                    args;

                if (arguments.length > 1) {
                    args = slice.call(arguments, 1);

                    return function () {
                        var allArgs = args;

                        if (arguments.length > 0) {
                            allArgs = args.concat(slice.call(arguments));
                        }

                        return _this.apply(scope, allArgs);
                    };
                }

                return function () {
                    if (arguments.length > 0) {
                        return _this.apply(scope, arguments);
                    }

                    return _this.call(scope);
                };
            };
        }());
    }

    /**
     * Remembers and caches the results of high process functions. And returns the result.
     * @returns {Function} The new version of the Function object with memoizing capabilities.
     * @memberOf Function.prototype
     * @example function addNumbersTogether() {
     *      var i,
     *          numberOfArgs = arguments.length,
     *          result = 0;
     *
     *      for (i = 0; i < numberOfArgs; i += 1) {
     *          result += arguments[i];
     *      }
     *
     *      return result;
     * }
     *
     * var memAddNumbersTogether = addNumberTogether.memoize();
     * memAddNumbersTogether(1, 2, 3, 4);
     */
    Function.prototype.memoize = function () {
        var cache = {},
            originalFunction = this,
            join = Array.prototype.join;

        return function () {
            var key = join.call(arguments);

            if (!cache[key]) {
                cache[key] = originalFunction.apply(this, arguments);
            }

            return cache[key];
        };
    };
}());
/**
 * Creates a new instance of EventDispatcher. A low lever class for dispatching events from Function constructors.
 * @class Base class for to extend for the dispatching system.
 * @this {EventDispatcher}
 * @see Event
 * @example
 * var MyClass = function() {};
 * MyClass.extend(EventDispatcher);
 *
 * var myClass = new MyClass();
 * myClass.addEventListener(Event.COMPLETE, myClass_completeHandler, this);
 */
var EventDispatcher = (function () {

    /**
     * Creates a new instance of EventDispatcher.
     * @constructor
     */
    function EventDispatcher() {
        /**
         * @private
         * @ignore
         * @type Array
         */
        this._eventObjects = [];
    }

    EventDispatcher.TYPE_ERROR = 'The listener specified is not a function.';

    /**
     * Compares to string values.
     * @param {*} valueA
     * @param {*} valueB
     * @returns {Boolean}
     * @private
     */
    function isValueEqualToValue(valueA, valueB) {
        return valueA === valueB;
    }

    /**
     * Checks if params exist and match the correct types.
     * @param {String} eventType
     * @param {Function} listener
     * @returns {Boolean}
     * @private
     * @throws {TypeError} The listener specified is not a function.
     */
    function hasCompleteEventParams(eventType, listener) {
        var hasParams = eventType && listener,
            isTypeString = typeof eventType === 'string',
            isTypeFunction = typeof listener === 'function';

        if (!isTypeFunction) {
            throw new TypeError(EventDispatcher.TYPE_ERROR);
        }

        return hasParams && isTypeString && isTypeFunction;
    }

    /**
     * Finds a listener based on type and function.
     * @private
     * @param {Array} eventObjects
     * @param {String} eventType
     * @param {Function} listener
     * @returns {Object} Return null if no object matches.
     */
    function getEventObject(eventObjects, eventType, listener) {
        var i, numberOfEvents = eventObjects.length;

        for (i = 0; i < numberOfEvents; i += 1) {
            if (isValueEqualToValue(eventObjects[i].type, eventType) &&
                    isValueEqualToValue(eventObjects[i].callback, listener)) {
                return eventObjects[i];
            }
        }

        return null;
    }

    /**
     * Finds a listener based on type and function.
     * @private
     * @param {Array} eventObjects
     * @param {String} eventType
     * @returns {Boolean} Return null if no object matches.
     */
    function hasEventType(eventObjects, eventType) {
        var i, numberOfEvents = eventObjects.length;

        for (i = 0; i < numberOfEvents; i += 1) {
            if (isValueEqualToValue(eventObjects[i].type, eventType)) {
                return !!eventObjects[i];
            }
        }

        return false;
    }

    /**
     * Registers an event listener object with an EventDispatcher object
     * so that the listener receives notification of an event.
     * If you no longer need an event listener, remove it by calling removeEventListener(),
     * or memory problems could result.
     * @memberOf EventDispatcher.prototype
     * @param {String} eventType The type of event.
     * @param {Function} listener The listener function that processes the event.
     * This function must accept an Event object as its only parameter and should return nothing.
     * @param {Object} listenerScope The scope you want the listener function to be called with.
     * @returns {Boolean} Returns true if event is added.
     * @throws {TypeError} The listener specified is not a function.
     */
    EventDispatcher.prototype.addEventListener = function (eventType, listener, listenerScope) {
        if (!hasCompleteEventParams(eventType, listener) ||
                getEventObject(this._eventObjects, eventType, listener)) {
            return false;
        }

        this._eventObjects.push({
            type: eventType,
            callback: listener,
            listenerScope: listenerScope
        });

        return true;
    };

    /**
     * Dispatches an event into the event flow.
     * The event target is the EventDispatcher object upon which the dispatchEvent() method is called.
     * @memberOf EventDispatcher.prototype
     * @param {Object} event The Event object that is dispatched into the event flow.
     * @returns {Boolean} A value of true if the event was successfully dispatched.
     */
    EventDispatcher.prototype.dispatchEvent = function (event) {
        var i, numberOfEvents = this._eventObjects.length, hasDispatched = false;

        for (i = 0; i < numberOfEvents; i += 1) {
            if (isValueEqualToValue(this._eventObjects[i].type, event.type)) {
                event.target = this;

                this._eventObjects[i].callback.apply(this._eventObjects[i].listenerScope, [event]);

                hasDispatched = true;
            }
        }

        return hasDispatched;
    };

    /**
     * Checks whether the EventDispatcher object has any listeners registered for a specific type of event.
     * @memberOf EventDispatcher.prototype
     * @param {String} eventType The type of event.
     * @returns {Boolean}
     */
    EventDispatcher.prototype.hasEventListener = function (eventType) {
        return hasEventType(this._eventObjects, eventType);
    };

    /**
     * Removes a listener from the EventDispatcher object.
     * If there is no matching listener registered with the EventDispatcher object,
     * a call to this method has no effect.
     * @memberOf EventDispatcher.prototype
     * @param {String} eventType The type of event.
     * @param {Function} listener The listener object to remove.
     * @throws {TypeError} The listener specified is not a function.
     */
    EventDispatcher.prototype.removeEventListener = function (eventType, listener) {
        var eventObject;

        if (this.hasEventListener(eventType) &&
                hasCompleteEventParams(eventType, listener)) {

            eventObject = getEventObject(this._eventObjects, eventType, listener);
            this._eventObjects.splice(this._eventObjects.indexOf(eventObject), 1);
        }
    };

    return EventDispatcher;
}());
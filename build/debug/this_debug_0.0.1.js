/*! this - v0.0.1 - 2013-02-13 */

(function () {
    if (!Function.prototype.extend) {
        /**
         * Extends all methods and properties from the parsed Object.
         * @param SuperClass {Object} The class you wish to inherit from.
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
    }

    if (!Function.prototype.bind) {
        (function () {
            var slice = Array.prototype.slice;

            /**
             * Changes the scope of the function everytime it is called.
             * @memberOf Function.prototype
             * @param scope
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

    if (!Function.prototype.memoize) {
        /**
         * Remembers and caches the results of high process functions. And returns the result.
         * @memberOf Function.prototype
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
    }
}());
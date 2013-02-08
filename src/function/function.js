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
            if (typeof SuperClass.constructor === "function") {
                this.prototype = new SuperClass();
                this.prototype.constructor = this;
            } else {
                this.prototype = SuperClass;
                this.prototype.constructor = this;
            }

            return this;
        };
    }

    if (!Function.prototype.curry) {
        (function () {
            var slice = Array.prototype.slice;

            /**
             * Passes scoped variables through a function.
             * @memberOf Function.prototype
             */
            Function.prototype.curry = function () {
                var target = this,
                    args = slice.call(arguments);

                return function () {
                    var allArgs = args;

                    if (arguments.length > 0) {
                        allArgs = args.concat(slice.call(arguments));
                    }

                    return target.apply(this, allArgs);
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
                func = this,
                join = Array.prototype.join;

            return function () {
                var key = join.call(arguments);

                if (!cache[key]) {
                    cache[key] = func.apply(this, arguments);
                }

                return cache[key];
            };
        };
    }
}());
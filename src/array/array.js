(function () {
    if (!Array.prototype.indexOf) {
        /**
         * Returns the first index at which a given element can be found in the array, or -1 if it is not present.
         * @param searchElement {Object} Element to locate in the array.
         * @param fromIndex {int} The index at which to begin the search. Defaults to 0,
         * i.e. the whole array will be searched. If the index is greater than or equal to the length of the array,
         * -1 is returned, i.e. the array will not be searched. If negative,
         * it is taken as the offset from the end of the array.
         * Note that even when the index is negative, the array is still searched from front to back.
         * If the calculated index is less than 0, the whole array will be searched.
         * @returns {Number}
         * @memberOf Array.prototype
         */
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var i, numberOfItems = this.length;

            for (i = (fromIndex || 0); i < numberOfItems; i += 1) {
                if (this[i] === searchElement) {
                    return i;
                }
            }

            return -1;
        };
    }
}());
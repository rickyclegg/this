describe("array", function () {

    var RICKY = 'Ricky',
        MARK = 'Mark',
        KEITH = 'Keith',
        NUMBER = 10,
        developers = [RICKY, MARK, KEITH, NUMBER, MARK, MARK],
        frontEndDevelopers = [KEITH, RICKY, MARK];

    it("All browsers should now have indexOf", function () {
        expect(developers.indexOf).toBeDefined();
    });

    it("No item returns -1", function () {
        expect(developers.indexOf('Elaine')).toEqual(-1);
    });

    it("Getting the first item", function () {
        expect(developers.indexOf(RICKY)).toEqual(0);
    });

    it("Getting the second item", function () {
        expect(developers.indexOf(MARK)).toEqual(1);
    });

    it("Getting the third item", function () {
        expect(developers.indexOf(KEITH)).toEqual(2);
    });

    it("Getting a number", function () {
        expect(developers.indexOf(NUMBER)).toEqual(3);
    });

    it("Starting from a specified index", function () {
        expect(developers.indexOf(MARK, 2)).toEqual(4);
    });

    it("Starting from a specified index when it is not the first occurrence", function () {
        expect(developers.indexOf(MARK, 2)).toEqual(4);
    });

    it("IndexOf is unique to the Array", function () {
        expect(developers.indexOf(MARK)).toEqual(1);
        expect(frontEndDevelopers.indexOf(MARK)).toEqual(2);
    });

});
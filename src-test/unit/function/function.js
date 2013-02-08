describe("function features", function () {

    beforeEach(function () {
        window.LivingThing = function () {
            this.getHeart = function() {};
        };
        window.LivingThing.prototype.getLungs = function () {};
    });

    afterEach(function () {
        delete window.LivingThing;
    });

    it("Extending a global class", function () {
        var Person = function () {},
            ricky;
        Person.extend(window.LivingThing);

        ricky = new Person();

        expect(ricky.getHeart).toBeDefined();
    });

    it("Extending a global class with prototypical functions", function () {
        var Person = function () {},
            ricky;
        Person.extend(window.LivingThing);

        ricky = new Person();

        expect(ricky.getLungs).toBeDefined();
    });

});
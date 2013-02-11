describe("function features", function () {

    beforeEach(function () {
        window.LivingThing = function () {
            this.getHeart = function () {
            };
        };
        window.LivingThing.prototype.getLungs = function () {
        };
    });

    afterEach(function () {
        window.LivingThing = null;
    });

    it("Extending a global class", function () {
        var Person = function () {
            },
            ricky;
        Person.extend(window.LivingThing);

        ricky = new Person();

        expect(typeof ricky.getHeart).toBe('function');
    });

    it("Extending a global class with prototypical functions", function () {
        var Person = function () {
            },
            ricky;
        Person.extend(window.LivingThing);

        ricky = new Person();

        expect(ricky.getLungs).toBeDefined();
    });

});
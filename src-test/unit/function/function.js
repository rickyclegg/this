describe("Function features", function () {

    describe("Inheritance", function () {

        beforeEach(function () {
            window.LivingThing = function () {
                this.getHeart = function () {
                };
            };
            window.LivingThing.prototype.getLungs = function () {
            };

            window.Person = function () {
            };
            window.Person.prototype.getLegs = function () {
            };
            window.Person.extend(window.LivingThing);
        });

        afterEach(function () {
            window.LivingThing = null;
        });

        it("Extending a global class", function () {
            var ricky = new Person();

            expect(ricky.getHeart).toBeDefined();
        });

        it("Extending a global class with prototypical functions", function () {
            var ricky = new Person();

            expect(ricky.getLungs).toBeDefined();
        });

        it("Extending 2 classes deep", function () {
            var SuperHero = function () {},
                superMan;
            SuperHero.extend(window.Person);

            superMan = new SuperHero();

            expect(superMan.getHeart).toBeDefined();
            expect(superMan.getLungs).toBeDefined();
            expect(superMan instanceof LivingThing).toBeTruthy();
            expect(superMan instanceof Person).toBeTruthy();
        });

        it("Extended classes are instances of super", function () {
            var SuperHero = function () {},
                superMan;
            SuperHero.extend(window.Person);

            superMan = new SuperHero();

            expect(superMan instanceof LivingThing).toBeTruthy();
            expect(superMan instanceof Person).toBeTruthy();
        });

        it("Overriding a function", function () {
            var Square = function (side) {
                    this.side = side;
                },
                Cube = function (side) {
                    Square.call(this, side);
                },
                testSquare,
                testCube;

            Square.prototype.side = 0;
            Square.prototype.getArea = function () {
                return this.side * this.side;
            };

            Cube.extend(Square);
            Cube.prototype.getArea = function () {
                return this.side * this.side * this.side;
            };

            testSquare = new Square(10);
            testCube = new Cube(100);

            expect(testSquare.getArea()).toEqual(100);
            expect(testCube.getArea()).toEqual(1000000);
        });

    });

    describe("Scoping", function () {

        beforeEach(function () {

        });

        afterEach(function () {

        });

        it("Forcing the scope of a function", function () {

        });

    });
});
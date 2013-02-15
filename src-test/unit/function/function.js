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
            var ricky = new window.Person();

            expect(ricky.getHeart).toBeDefined();
        });

        it("Extending a global class with prototypical functions", function () {
            var ricky = new window.Person();

            expect(ricky.getLungs).toBeDefined();
        });

        it("Extending 2 classes deep", function () {
            var SuperHero = function () {},
                superMan;
            SuperHero.extend(window.Person);

            superMan = new SuperHero();

            expect(superMan.getHeart).toBeDefined();
            expect(superMan.getLungs).toBeDefined();
            expect(superMan instanceof window.LivingThing).toBeTruthy();
            expect(superMan instanceof window.Person).toBeTruthy();
        });

        it("Extended classes are instances of super", function () {
            var SuperHero = function () {},
                superMan;
            SuperHero.extend(window.Person);

            superMan = new SuperHero();

            expect(superMan instanceof window.LivingThing).toBeTruthy();
            expect(superMan instanceof window.Person).toBeTruthy();
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

        it("Extending a class written in a closure", function () {
            var Greeter = (function () {
                    function Greeter(message) {
                        this.greeting = message;
                    }

                    Greeter.extend(window.Person);

                    Greeter.prototype.greet = function () {
                        return "Hello, " + this.greeting;
                    };

                    return Greeter;
                }()),
                helloPerson = new Greeter("Ricky");

            expect(helloPerson.greet).toBeDefined();
            expect(helloPerson.getHeart).toBeDefined();
            expect(helloPerson instanceof window.Person).toBeTruthy();
        });

    });

    describe("Scoping", function () {

        it("Forcing the scope of a function", function () {
            var functionOne = function () {
                    return this;
                },
                functionCaller = function () {
                    var bindedFunction = functionOne.bind(this);

                    return bindedFunction();
                },
                mainBindedFunction = functionCaller.bind(this);

            expect(mainBindedFunction()).toBe(this);
        });

        it("Binding a function scope with arguments", function () {
            var addAHundred = function (num) {
                    return num + 100;
                },
                addTwoNumbersTogether = function (num1, num2) {
                    var bindedFunction = addAHundred.bind(this),
                        totalNum = num1 + num2;

                    return bindedFunction(totalNum);
                },
                mainBindedFunction = addTwoNumbersTogether.bind(this);

            expect(mainBindedFunction(10, 20)).toEqual(130);
        });

        it("Binding a class callback", function () {
            var NumberBuilder = function (num) {
                    this._num = num;
                },
                myNumBuild,
                scopedCallback;

            NumberBuilder.prototype.getTimesHundred = function (onComplete) {
                this._num *= 100;

                onComplete(this._num);
            };

            myNumBuild = new NumberBuilder(1);

            scopedCallback = jasmine.createSpy("scopedCallback");

            myNumBuild.getTimesHundred(scopedCallback.bind(this));

            expect(scopedCallback).toHaveBeenCalled();
            expect(scopedCallback.mostRecentCall.object).toBe(this);
        });
    });

    describe("Performance", function () {

        var addNumbersTogetherFunctionRun = false;

        function addNumbersTogether() {
            var i,
                numberOfArgs = arguments.length,
                result = 0;

            for (i = 0; i < numberOfArgs; i += 1) {
                result += arguments[i];
            }

            addNumbersTogetherFunctionRun = true;

            return result;
        }

        function addNumbersToObject(obj) {
            obj.num = Math.floor(Math.random() * 999999) + new Date().getTime();

            return obj;
        }

        it("Remembering a call that has not been called before", function () {
            var memoizedAddNumbersTogether = addNumbersTogether.memoize(),
                result;

            result = memoizedAddNumbersTogether(1, 2, 3, 4);

            expect(addNumbersTogetherFunctionRun).toBeTruthy();
            expect(result).toBe(10);

            addNumbersTogetherFunctionRun = false;

            result = memoizedAddNumbersTogether(1, 2, 3, 4);

            expect(addNumbersTogetherFunctionRun).toBeFalsy();
            expect(result).toBe(10);
        });

        it("Remembering a call that has simple objects as the key", function () {
            var memoizedAddNumbersToObject = addNumbersToObject.memoize(),
                resultOne = memoizedAddNumbersToObject({}),
                resultTwo = memoizedAddNumbersToObject({});


            expect(resultOne.num).toEqual(resultTwo.num);
        });

        it("Remembering a call that has simple objects with overridden toString", function () {
            var memoizedAddNumbersToObject = addNumbersToObject.memoize(),
                resultOne = memoizedAddNumbersToObject({
                    toString: function () {
                        return 'Object One';
                    }
                }),
                resultTwo = memoizedAddNumbersToObject({
                    toString: function () {
                        return 'Object Two';
                    }
                });

            expect(resultOne.num).not.toEqual(resultTwo.num);
        });
    });
});
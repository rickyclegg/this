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
                    var bindedFunction = addAHundred.bind(this);

                    var totalNum = num1 + num2;

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

    describe("Remembering", function () {

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
            var memorizedAddNumbersTogether = addNumbersTogether.memoize(),
                result;
            result = memorizedAddNumbersTogether(1, 2, 3, 4);

            expect(addNumbersTogetherFunctionRun).toBeTruthy();
            expect(result).toBe(10);

            addNumbersTogetherFunctionRun = false;

            result = memorizedAddNumbersTogether(1, 2, 3, 4);

            expect(addNumbersTogetherFunctionRun).toBeFalsy();
            expect(result).toBe(10);
        });

        it("Remembering a call that has simple objects as the key", function () {
            var memorizedAddNumbersToObject = addNumbersToObject.memoize(),
                resultOne = memorizedAddNumbersToObject({}),
                resultTwo = memorizedAddNumbersToObject({});


            expect(resultOne.num).toEqual(resultTwo.num);
        });

        it("Remembering a call that has simple objects with overridden toString", function () {
            var memorizedAddNumbersToObject = addNumbersToObject.memoize(),
                resultOne = memorizedAddNumbersToObject({
                    toString: function () {
                        return 'Object One';
                    }
                }),
                resultTwo = memorizedAddNumbersToObject({
                    toString: function () {
                        return 'Object Two';
                    }
                });

            expect(resultOne.num).not.toEqual(resultTwo.num);
        });
    });
});
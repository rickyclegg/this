// This
// ----

// this.js is a tiny library for writing OO JavaScript.
// A JavaScript library that tries its best not to be a library.
// Rules are being broken but this just does not care. This adds functionality to globals already in JavaScript (Often frowned upon). But I'm all about not choosing a big library until the project needs it.
//
// this.js is all about deferring decisions and writing just what you need, for some hard core true agile TDD.
//
// We're not saying never use [Backbone](http://backbonejs.org/), [Ember](http://emberjs.com/) or [Sencha](http://www.sencha.com/). We are just suggesting deferring the decision until it actually has to be made.
//
// What we are preaching is nothing new. I suggest that you go check out [Clean Coders](http://www.cleancoders.com/) by Uncle Bob.


// Writing Classes
// ---------------

var Class = function () {};

// With this, you can write your classes however you like.
// I prefer writing them in a closure like [TypeScript](http://www.typescriptlang.org/).

var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }

    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };

    return Greeter;
}());

// Inheritance
// -----------

// The main ability of this is inheritance.
//
// Every [Function](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function) Object can be extended with this.
//
// Simply use the Extend function after you have created the constructor to extend the 'Super' class and all the classes it also inherits.

// ###extend
// * param | **superClass: Function** | The class you want to inherit.
Function.prototype.extend(superClass: Function);

// ####Example:
//
// Our base class we want to extend.
var Person = (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.speak = function (words) {
        console.log(words);
    };

    return Person;
}());

// As our SuperHeroes are based on people we will extend the Person class.
var SuperHero = (function () {
    function SuperHero(name, age, power) {
        this.power = power;

        // We can call the constructor of our super class with the [call](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call) method.
        Person.call(this, name, age);
    }

    // Extends the Person class.
    SuperHero.extend(Person);

    // Adds any public function SuperHero needs.
    SuperHero.prototype.useSuperPower = function () {
        console.log("Using " + this.power);
    };

    return SuperHero;
}());

// You must extend after you have defined the constructor.
//
// Here we add the Person or super class to the [Prototype](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/prototype) Object, which means you have to add all your public methods after extending.

// Scope
// -----

// Losing scope can always be a problem in JavaScript.
// Especially if you are working with events and callbacks.
//
// Working with callbacks you often use a closure to get around loss of scope.

// ####Closure example:
// Account class.
var Account = (function () {
    function Account() {}

    Account.prototype.getUser = function (userId, onComplete) {
        /* Get the user somehow */

        if (onComplete) {
            onComplete(/* Some data */);
        }
    };

    Account.prototype.deleteUser = function () {};

    return Account;
}());

//Accounts main view.
var AccountView = (function () {
    function AccountView() {
        this._account = new Account();
    }

    AccountView.prototype.displayUser = function (userId) {
        var _this = this;

        this._account.getUser(userId, function (userData) {
            /* Some jQuery here */

            _this.deleteUser();
        });
    };

    return AccountView;
}());

// This is very common is JavaScript. It is not really wrong, however functions should perform one task.
// this gives us a binding function, so we can keep our classes separated out.

// ###bind
// * param | **scope: Object** | The scope of the this word inside the function.
// * param | **...** | A comma list of all the arguments.
// * returns | **Function** | A new copy of the function bound to a scope.
Function.prototype.bind(scope: Object, ...);

// ####Example:
// Looking at the AccountView from the earlier example.
var AccountView = (function () {
    function AccountView() {
        this._account = new Account();
    }

    AccountView.prototype.displayUser = function (userId) {
        this._account.getUser(userId, this.renderUserDataToDom.bind(this));
    };

    AccountView.prototype.renderUserDataToDom = function (userId) {
        /* Some jQuery here */

        // We can use the this keyword here knowing we have the scope that we intended.
        this.deleteUser();
    };

    return AccountView;
}());

// bind() is a cross browser implementation of the function that already appears in modern browsers like Chrome.
// If the function already exists we do not override it.

// Performance
// -----------

// Built to help with high process functions.

// ###memorize
// * returns | **Function** | The new version of the Function object with memoizing capabilities.
Function.prototype.memorize();

// ####Example:
function fibonacci (num) {
    if (num < 2) {
        return 1;
    }

    return fibonacci(num - 1) + fibonacci(num - 2);
}

// The Fibonacci sequence is very expensive. It takes a lot of processing power to run.
//
// Memoization can drastically help improve performance.
//
var memFibRun = fibonacci.memoize(),
// resultThree will not run again. It will get the result from cache.
    resultOne = memFibRun(50),
    resultTwo = memFibRun(25),
    resultThree = memFibRun(50);


// License
// -------

//Copyright (c) 2013 Ricky Clegg
//
//Licensed under the APACHE license.
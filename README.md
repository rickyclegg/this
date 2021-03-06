# this

**this** is a tiny library for writing OO JavaScript.

this makes it easy to write JavaScript classes and use simple object orientated techniques.

What we are preaching is nothing new. I suggest that you go check out [Clean Coders](http://www.cleancoders.com/) by Uncle Bob.

### Quick Explanation
If you are creating a new client side payroll system. You will have simple use cases like 'Pay hourly employee'. At this point how do you know which framework will best suite you?

DON'T make the decision now! Use this to create classes and core code bases and 'plugin' to the rest of the application architecture. Your application is the use cases, not the view.

Enough preaching.

## Getting Started
There are many ways to install this.

```
npm install this
```

Will download the this library to your project.

You can also get the code from GitHub.

Once you have got the this_0.1.3.js

```
<script type="text/javascript" src="this_0.1.3.js">
```

As soon as the script has loaded you are ready.

## Documentation

### API Documentation

### Method Behind The Madness

Now you have this installed you can start writing classes.

With this, you can write your classes however you want. We prefer writing them in a closure like [TypeScript](http://www.typescriptlang.org/).

```javascript
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
```

This creates you a basic class. This is doing nothing here. 

### Inheritance

The main ability of this is inheritance.

Every [Function](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function) Object can be extended with this.

Simply use the Extend function after you have created the constructor to extend the 'Super' class and all the classes it also inherits.

```javascript
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

var SuperHero = (function () {
    function SuperHero(name, age, power) {
        this.power = power;    

        // Calls the Person constructor to pass the mandatory arguments.
        Person.call(this, name, age);
    }
    
    // Extends the Person.
    SuperHero.extend(Person);

    SuperHero.prototype.useSuperPower = function () {
        console.log("Using " + this.power);
    };
    
    return SuperHero;
}());
```

You must extend after you have defined the constructor.
Here we add the Person or super class to the [Prototype](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/prototype) Object, which means you have to add all your public methods after extending.

## Release History
* 2012/25/2 - v0.1.7 - Added Bower ignore list.
* 2012/25/2 - v0.1.6 - Added component.json to publish to Bower.
* 2012/25/2 - v0.1.5 - Added tests for EventDispatcher. Added Array.indexOf.
* 2012/17/2 - v0.1.4 - Updated API, added EventDispatcher but not yet tested.
* 2012/14/2 - v0.1.3 - API update.
* 2012/13/2 - v0.1.2 - API update.
* 2012/12/2 - v0.1.1 - Documentation update.
* 2012/10/2 - v0.1.0 - First release on includes extending.

## New Features
* Simple Event dispatching.

Let me know if you have any new features that you think would be good. Or any improvements that can be made. Post on the issues page [GitHub Issues](https://github.com/rickyclegg/this/issues).

## License
Copyright (c) 2013 Ricky Clegg  
Licensed under the MIT license.

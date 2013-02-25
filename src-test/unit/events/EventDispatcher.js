describe("EventDispatcher", function () {

    var eventDispatcher;

    beforeEach(function () {
        eventDispatcher = new EventDispatcher();
    });

    it("EventDispatcher should be defined", function () {
        expect(eventDispatcher).toBeDefined();
    });

    it("Has listener is false when event dispatcher is created", function () {
        expect(eventDispatcher.hasEventListener('click')).toBeFalsy();
    });

    it("Adding the same event listener twice is not allowed", function () {
        var eventType = 'click',
            eventFunction = function () {};

        expect(eventDispatcher.addEventListener(eventType, eventFunction)).toBeTruthy();
        expect(eventDispatcher.addEventListener(eventType, eventFunction)).toBeFalsy();
    });

    it("has listener is true when adding an event", function () {
        var eventType = 'click';

        expect(eventDispatcher.hasEventListener(eventType)).toBeFalsy();

        eventDispatcher.addEventListener(eventType, function () {});

        expect(eventDispatcher.hasEventListener(eventType)).toBeTruthy();
    });

    it("Adding 2 events each has listener should be true", function () {
        var clickEvent = 'click',
            completeEvent = 'complete';

        eventDispatcher.addEventListener(clickEvent, function () {});
        eventDispatcher.addEventListener(completeEvent, function () {});

        expect(eventDispatcher.hasEventListener(clickEvent)).toBeTruthy();
        expect(eventDispatcher.hasEventListener(completeEvent)).toBeTruthy();
    });

    it("Removing an event throws an error if params are not correct", function () {
        var clickEvent = 'click',
            clickListener = function () {};

        eventDispatcher.addEventListener(clickEvent, clickListener);

        expect(function () {
            eventDispatcher.removeEventListener(clickEvent, 'Not a function');
        }).toThrow(new TypeError(EventDispatcher.TYPE_ERROR));
    });

    it("Removing an event hasEventListener equals false", function () {
        var clickEvent = 'click',
            clickListener = function () {};

        eventDispatcher.addEventListener(clickEvent, clickListener);
        eventDispatcher.removeEventListener(clickEvent, clickListener);

        expect(eventDispatcher.hasEventListener(clickEvent)).toBeFalsy();
    });

    it("when removing one of several events", function () {
        var clickEvent = 'click',
            completeEvent = 'complete',
            clickListener = function () {},
            completeListener = function () {};

        eventDispatcher.addEventListener(clickEvent, clickListener);
        eventDispatcher.addEventListener(completeEvent, completeListener);

        eventDispatcher.removeEventListener(clickEvent, clickListener);

        expect(eventDispatcher.hasEventListener(clickEvent)).toBeFalsy();
        expect(eventDispatcher.hasEventListener(completeEvent)).toBeTruthy();
    });

    it("Dispatching an event", function () {
        var completeListener = jasmine.createSpy('completeListener'),
            completeEvent = 'complete',
            eventObj = {type: completeEvent};

        eventDispatcher.addEventListener(completeEvent, completeListener);
        eventDispatcher.dispatchEvent(eventObj);

        expect(completeListener).toHaveBeenCalledWith(eventObj);
    });

    it("Dispatching one of two events", function () {
        var clickListener = jasmine.createSpy('clickListener'),
            clickEvent = 'click',
            completeListener = jasmine.createSpy('completeListener'),
            completeEvent = 'complete',
            eventObj = {type: clickEvent};

        eventDispatcher.addEventListener(clickEvent, clickListener);
        eventDispatcher.addEventListener(completeEvent, completeListener);
        eventDispatcher.dispatchEvent(eventObj);

        expect(clickListener).toHaveBeenCalledWith(eventObj);
        expect(completeListener).not.toHaveBeenCalled();
    });

    it("Dispatching two events", function () {
        var clickListener = jasmine.createSpy('clickListener'),
            clickEvent = 'click',
            completeListener = jasmine.createSpy('completeListener'),
            completeEvent = 'complete',
            clickEventObj = {type: clickEvent},
            completeEventObj = {type: completeEvent};

        eventDispatcher.addEventListener(clickEvent, clickListener);
        eventDispatcher.addEventListener(completeEvent, completeListener);
        eventDispatcher.dispatchEvent(clickEventObj);
        eventDispatcher.dispatchEvent(completeEventObj);

        expect(clickListener).toHaveBeenCalledWith(clickEventObj);
        expect(completeListener).toHaveBeenCalledWith(completeEventObj);
    });

    it("Extending EventDispatcher that event dispatches", function () {
        var myCompany,
            addListener = jasmine.createSpy('addListener'),
            addEmployee = 'addEmployee',
            employee = {name: 'Ricky'},
            Work = function () {
                this.addEmployee = function (employee) {
                    this.dispatchEvent({type: addEmployee, employee: employee});
                };
            };
        Work.extend(EventDispatcher);

        myCompany = new Work();
        myCompany.addEventListener(addEmployee, addListener, myCompany);
        myCompany.addEmployee(employee);

        expect(addListener).toHaveBeenCalled();
        expect(addListener.calls[0].args[0].employee).toBe(employee);
    });

    it("extending EventDispatcher with 2 instances that the same event is unique to the instance", function () {
        var myCompany,
            otherCompany,
            addMyListener = jasmine.createSpy('addMyListener'),
            addMarkListener = jasmine.createSpy('addMarkListener'),
            addEmployee = 'addEmployee',
            employeeRick = {name: 'Ricky'},
            employeeMark = {name: 'Mark'},
            Work = function () {
                this.addEmployee = function (employee) {
                    this.dispatchEvent({type: addEmployee, employee: employee});
                };
            };
        Work.extend(EventDispatcher);

        myCompany = new Work();
        myCompany.addEventListener(addEmployee, addMyListener, myCompany);
        myCompany.addEmployee(employeeRick);

        otherCompany = new Work();
        otherCompany.addEventListener(addEmployee, addMarkListener, otherCompany);
        otherCompany.addEmployee(employeeMark);

        expect(addMyListener).toHaveBeenCalled();
        expect(addMyListener.calls[0].args[0].employee).toBe(employeeRick);

        expect(addMarkListener).toHaveBeenCalled();
        expect(addMarkListener.calls[0].args[0].employee).toBe(employeeMark);
    });
});
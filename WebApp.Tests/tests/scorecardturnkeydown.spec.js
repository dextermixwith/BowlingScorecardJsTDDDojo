/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

describe("Keydown behavious specs", function () {
    var scorecardTableNodeCollection = $('<table />');

    var jQuerySpy;
    var turnScoreCellSelectionResultStub;
    var keydownEvent;
    var turnInlineInputStub;
    var scoreTurnInputStub;
    var currentTurnScoreValue;
    var stubScoreKeeper;
    var currentTurnScoreValueStub;
    var proxiedTurnBlurHandler = {};
    var proxiedTurnKeydownHandler = {};
    var stubTurnScoreBlurEventHandler = {};
    var stubTurnScoreKeydownEventHandler = {};
    var mockTurnScoreUI;

    describe("When 'Enter' is is pressed in score turn input", function () {

        beforeEach(function () {

            turnScoreCellSelectionResultStub = { on: function () { } };

            scoreTurnInputStub = {};

            keydownEvent = { currentTarget: scoreTurnInputStub, which: 13 };

            turnInlineInputStub = {
                before: function () { },
                val: jasmine.createSpy("val").andReturn(currentTurnScoreValue),
                remove: jasmine.createSpy("remove"),
                parent: jasmine.createSpy("parent").andReturn(turnScoreCellSelectionResultStub)
            };

            currentTurnScoreValueStub = {
                show: jasmine.createSpy("show"),
                html: jasmine.createSpy("html")
            };

            stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == "td.turnScore") {
                    return turnScoreCellSelectionResultStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                if (arguments[0] = 'span.currentScoreValue' && arguments[1] == turnScoreCellSelectionResultStub) {
                    return currentTurnScoreValueStub;
                }
                return null;
            });

            jQuerySpy.proxy = jasmine.createSpy("proxy").andCallFake(function () {
                if (arguments[0] == stubTurnScoreBlurEventHandler) {
                    return proxiedTurnBlurHandler;
                }
                if (arguments[0] == stubTurnScoreKeydownEventHandler) {
                    return proxiedTurnKeydownHandler;
                }
                return null;
            });

            jQuerySpy.on = jasmine.createSpy("on");

            mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

            (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubScoreKeeper, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
        });

        it("then finishes the turn score", function () {
            expect(mockTurnScoreUI.finishTurn).toHaveBeenCalledWith(scoreTurnInputStub, stubScoreKeeper.updateScoreTurn);
        });
    });


    describe("When score turn keydown 0 pressed", function () {
        beforeEach(function () {

            turnScoreCellSelectionResultStub = { on: function () { } };

            scoreTurnInputStub = {};

            keydownEvent = { currentTarget: scoreTurnInputStub, which: 48 };

            turnInlineInputStub = {
                before: jasmine.createSpy("before"),
                val: jasmine.createSpy("val").andReturn(currentTurnScoreValue),
                remove: jasmine.createSpy("remove"),
                parent: jasmine.createSpy("parent").andReturn(turnScoreCellSelectionResultStub)
            };

            currentTurnScoreValueStub = {
                show: jasmine.createSpy("show"),
                html: jasmine.createSpy("html")
            };

            stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == "td.turnScore") {
                    return turnScoreCellSelectionResultStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                if (arguments[0] = 'span.currentScoreValue' && arguments[1] == turnScoreCellSelectionResultStub) {
                    return currentTurnScoreValueStub;
                }
                return null;
            });

            stubTurnScoreBlurEventHandler = {};
            stubTurnScoreKeydownEventHandler = {};

            jQuerySpy.proxy = jasmine.createSpy("proxy").andCallFake(function () {
                if (arguments[0] == stubTurnScoreBlurEventHandler) {
                    return proxiedTurnBlurHandler;
                }
                if (arguments[0] == stubTurnScoreKeydownEventHandler) {
                    return proxiedTurnKeydownHandler;
                }
                return null;
            });

            jQuerySpy.on = jasmine.createSpy("on");
            
            mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

            (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubScoreKeeper, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
        });
        
        it("then the turn is not finished", function () {
            expect(mockTurnScoreUI.finishTurn).not.toHaveBeenCalled();
        });
    });

    describe("When score turn keydown 9 pressed", function () {
        beforeEach(function () {

            turnScoreCellSelectionResultStub = { on: function () { } };

            scoreTurnInputStub = {};

            keydownEvent = { currentTarget: scoreTurnInputStub, which: 57 };

            turnInlineInputStub = {
                before: jasmine.createSpy("before"),
                val: jasmine.createSpy("val").andReturn(currentTurnScoreValue),
                remove: jasmine.createSpy("remove"),
                parent: jasmine.createSpy("parent").andReturn(turnScoreCellSelectionResultStub)
            };

            currentTurnScoreValueStub = {
                show: jasmine.createSpy("show"),
                html: jasmine.createSpy("html")
            };

            stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == "td.turnScore") {
                    return turnScoreCellSelectionResultStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                if (arguments[0] = 'span.currentScoreValue' && arguments[1] == turnScoreCellSelectionResultStub) {
                    return currentTurnScoreValueStub;
                }
                return null;
            });

            stubTurnScoreBlurEventHandler = {};
            stubTurnScoreKeydownEventHandler = {};

            jQuerySpy.proxy = jasmine.createSpy("proxy").andCallFake(function () {
                if (arguments[0] == stubTurnScoreBlurEventHandler) {
                    return proxiedTurnBlurHandler;
                }
                if (arguments[0] == stubTurnScoreKeydownEventHandler) {
                    return proxiedTurnKeydownHandler;
                }
                return null;
            });

            jQuerySpy.on = jasmine.createSpy("on");

            mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

            (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubScoreKeeper, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
        });

        it("then the turn is not finished", function () {
            expect(mockTurnScoreUI.finishTurn).not.toHaveBeenCalled();
        });
    });

    describe("When score card turn keydown ESC key is pressed", function () {
        beforeEach(function () {

            turnScoreCellSelectionResultStub = { on: function () { } };

            scoreTurnInputStub = {};

            keydownEvent = { currentTarget: scoreTurnInputStub, which: 27 };

            turnInlineInputStub = {
                before: function () { },
                val: jasmine.createSpy("val").andReturn(currentTurnScoreValue),
                remove: jasmine.createSpy("remove"),
                parent: jasmine.createSpy("parent").andReturn(turnScoreCellSelectionResultStub)
            };

            currentTurnScoreValueStub = {
                show: jasmine.createSpy("show"),
                html: jasmine.createSpy("html")
            };

            stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == "td.turnScore") {
                    return turnScoreCellSelectionResultStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                if (arguments[0] = 'span.currentScoreValue' && arguments[1] == turnScoreCellSelectionResultStub) {
                    return currentTurnScoreValueStub;
                }
                return null;
            });

            stubTurnScoreBlurEventHandler = {};
            stubTurnScoreKeydownEventHandler = {};

            jQuerySpy.proxy = jasmine.createSpy("proxy").andCallFake(function () {
                if (arguments[0] == stubTurnScoreBlurEventHandler) {
                    return proxiedTurnBlurHandler;
                }
                if (arguments[0] == stubTurnScoreKeydownEventHandler) {
                    return proxiedTurnKeydownHandler;
                }
                return null;
            });

            jQuerySpy.on = jasmine.createSpy("on");
            
            mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["cancelTurn"]);

            (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubScoreKeeper, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
        });

        it("then the turn is cancelled", function () {
            expect(mockTurnScoreUI.cancelTurn).toHaveBeenCalledWith(scoreTurnInputStub);
        });
    });
});

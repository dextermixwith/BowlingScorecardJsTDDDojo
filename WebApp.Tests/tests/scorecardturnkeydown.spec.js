/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

   var scorecardTableNodeCollection = $('<table />');

    var jQuerySpy;
    var turnScoreCellSelectionResultStub;
    var keydownEvent;
    var turnInlineInputStub;
    var scoreTurnInputStub;
    var currentTurnScoreValue;
    var beforeStub;
    var valStub;
    var removeStub;
    var stubScoreKeeper;
    var showStub;
    var htmlStub;
    var currentTurnScoreValueStub;
    var inputParentStub;
    var proxiedTurnBlurHandler = {};
    var proxiedTurnKeydownHandler = {};

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

            (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);
        });

        it("then finds current turn cell using jQuery", function () {
            expect(jQuerySpy).toHaveBeenCalledWith(scoreTurnInputStub);
        });

        it("then fetches value of turn from turn input", function () {
            expect(turnInlineInputStub.val).toHaveBeenCalled();
        });

        it("then finds table cell for turn", function () {
            expect(turnInlineInputStub.parent).toHaveBeenCalled();
        });

        it("then finds current score span", function () {
            expect(jQuerySpy).toHaveBeenCalledWith("span.currentScoreValue", turnScoreCellSelectionResultStub);
        });

        it("then updates current score span with new score", function () {
            expect(currentTurnScoreValueStub.html).toHaveBeenCalledWith(currentTurnScoreValue);
        });

        it("then shows current score span again", function () {
            expect(currentTurnScoreValueStub.show).toHaveBeenCalled();
        });

        it("then calls score keeper to update turn score", function () {
            expect(stubScoreKeeper.updateScoreTurn).toHaveBeenCalledWith(currentTurnScoreValue);
        });

        it("then removws turn score inline input from DOM", function () {
            expect(turnInlineInputStub.remove).toHaveBeenCalled();
        });
    });


var keyDownHandlerResult = true;

describe("When score turn keydown 0 pressed", function() {
    beforeEach(function() {

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

        (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);
    });

    it("then does not call the score keeper to update turn score", function() {
        expect(stubScoreKeeper.updateScoreTurn).not.toHaveBeenCalled();
    });

    it("then does not append the value at start of turn table cell", function() {
        expect(turnInlineInputStub.before).not.toHaveBeenCalled();
    });

    it("then does not remove then turn score inline input from then DOM", function() {
        expect(turnInlineInputStub.remove).not.toHaveBeenCalled();
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

        (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);
    });

    it("then does not call the score keeper to update turn score", function () {
        expect(stubScoreKeeper.updateScoreTurn).not.toHaveBeenCalled();
    });

    it("then does not append the value at start of turn table cell", function () {
        expect(turnInlineInputStub.before).not.toHaveBeenCalled();
    });

    it("then does not remove then turn score inline input from then DOM", function () {
        expect(turnInlineInputStub.remove).not.toHaveBeenCalled();
    });
});

describe("When score card turn keydown ESC key is pressed", function() {
    beforeEach(function() {

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

        (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);
    });

    it("then does not call the score keeper to update turn score", function() {
        expect(stubScoreKeeper.updateScoreTurn).not.toHaveBeenCalled();
    });

    it("then finds the table cell for turn", function() {
        expect(turnInlineInputStub.parent).toHaveBeenCalled();
    });

    it("then finds score span", function() {
        expect(jQuerySpy).toHaveBeenCalledWith("span.currentScoreValue", turnScoreCellSelectionResultStub);
    });

    it("then shows current score span again", function() {
        expect(currentTurnScoreValueStub.show).toHaveBeenCalled();
    });

    it("then removes score inline input from DOM", function() {
        expect(turnInlineInputStub.remove).toHaveBeenCalled();
    });
});

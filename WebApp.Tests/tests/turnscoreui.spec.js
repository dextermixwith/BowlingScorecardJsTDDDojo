/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

var scorecardTableNodeCollection = $('<table />');

var jQuerySpy;
var stubbedJQueryProxy;
var turnScoreCellSelectionResultStub;
var stubTurnScoreClickEventHandler;
var scorecard;
var currentTurnScoreValue;
var clickEvent;
var injectedJQueryForProxy;
var currentTurnCellStub;
var turnInlineInputStub;
var stubTurnScoreBlurEventHandler;
var proxiedTurnBlurHandler = {};
var proxiedTurnKeydownHandler = {};
var stubTurnScoreKeydownEventHandler;

var mockTurnScoreUI;
var mockScoreKeeper;

describe("When a score turn is started", function () {
    beforeEach(function () {
        turnInlineInputStub = jasmine.createSpyObj("turnInlineInputStub", ["on", "trigger"]);

        currentTurnScoreValue = "5";
        currentTurnCellStub = jasmine.createSpyObj("currentTurnCellStub", ["append", "on"]);

        turnScoreCellSelectionResultStub = jasmine.createSpyObj("turnScoreCellSelectionResultStub", ["after", "on", "hide"]);
        turnScoreCellSelectionResultStub.html = jasmine.createSpy("html").andReturn(currentTurnScoreValue);
        jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
            if (arguments[0] == '<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />') {
                return turnInlineInputStub;
            }
            if (arguments[0] = 'span.currentScoreValue' && arguments[1] == currentTurnCellStub) {
                return turnScoreCellSelectionResultStub;
            }
            return null;
        });

        stubTurnScoreBlurEventHandler = {};
        stubTurnScoreKeydownEventHandler = {};

        jQuerySpy.proxy = jasmine.createSpy("proxy").andCallFake(
            function () {
                if (arguments[0] == stubTurnScoreBlurEventHandler) {
                    return proxiedTurnBlurHandler;
                }
                if (arguments[0] == stubTurnScoreKeydownEventHandler) {
                    return proxiedTurnKeydownHandler;
                }
                return null;
            }
        );

        jQuerySpy.on = jasmine.createSpy("on");

        (new TurnScoreUI(scorecardTableNodeCollection, jQuerySpy, stubTurnScoreBlurEventHandler, stubTurnScoreKeydownEventHandler)).startTurn(currentTurnCellStub);
    });

    it("then finds current turn cell is using jQuery", function () {
        expect(jQuerySpy).toHaveBeenCalledWith("span.currentScoreValue", currentTurnCellStub);
    });

    it("then the current turn score value is fetched", function () {
        expect(turnScoreCellSelectionResultStub.html).toHaveBeenCalled();
    });

    it("then calls after on turn score cell element", function () {
        expect(turnScoreCellSelectionResultStub.after).toHaveBeenCalled();
    });

    it("then hides current turn cell contents", function () {
        expect(turnScoreCellSelectionResultStub.hide).toHaveBeenCalled();
    });

    it("then adds input to current turn cell", function () {
        expect(turnScoreCellSelectionResultStub.after).toHaveBeenCalledWith(turnInlineInputStub);
    });

    it("then focuses on current turn input", function () {
        expect(turnInlineInputStub.trigger).toHaveBeenCalledWith("focus");
    });

    it("then attaches blur event handlers to turn input", function () {
        expect(turnInlineInputStub.on).toHaveBeenCalledWith("blur", proxiedTurnBlurHandler);
    });

    it("then attaches keydown event handler to the turn input", function () {
        expect(turnInlineInputStub.on).toHaveBeenCalledWith("keydown", proxiedTurnKeydownHandler);
    });

    it("then proxies the input blur handler", function () {
        expect(jQuerySpy.proxy).toHaveBeenCalledWith(stubTurnScoreBlurEventHandler, jasmine.any(Object));
    });


    it("then the input for the current turn score is creted with correct markuo", function () {
        expect(jQuerySpy).toHaveBeenCalledWith('<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />');
    });

});

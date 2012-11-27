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

describe("When the turn score cell is clicked", function () {
    beforeEach(function () {
        turnScoreCellSelectionResultStub = jasmine.createSpy("turnScoreCellSelectionResultStub");
        jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
            if (arguments[0] == "td.turnScore") {
                return turnScoreCellSelectionResultStub;
            }
            return null;
        });

        mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["startTurn"]);

        currentTurnCellStub = {};
        clickEvent = { currentTarget: currentTurnCellStub };

        mockScoreKeeper = { updateScoreTurn: function () { } };

        (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, null, null, null, mockScoreKeeper, mockTurnScoreUI)).handleTurnScoreClick(clickEvent);

    });

    it("then starts the turn.", function () {
        expect(mockTurnScoreUI.startTurn).toHaveBeenCalledWith(currentTurnCellStub, jasmine.any(Function));
    });

    it("then passes the score keeper 'update score' through to be called when needed.", function () {
        expect(mockTurnScoreUI.startTurn).toHaveBeenCalledWith(jasmine.any(Object), mockScoreKeeper.updateScoreTurn);
    });
});

/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

var scorecardTableNodeCollection = $('<table />');

var jQuerySpy;
var turnScoreCellSelectionResultStub;
var scorecard;
var blurEvent;
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
var proxiedClickHandler = function () { };
var mockTurnScoreUI;

describe("When a score card turn input is blurred", function () {
    beforeEach(function () {
        currentTurnScoreValue = "5";
        scoreTurnInputStub = {};
        blurEvent = { currentTarget: scoreTurnInputStub };
        turnScoreCellSelectionResultStub = { on: function () { } };

        currentTurnScoreValueStub = {
            show: jasmine.createSpy("show"),
            html: jasmine.createSpy("html")
        };
        turnInlineInputStub = {
            val: jasmine.createSpy("val").andReturn(currentTurnScoreValue),
            remove: jasmine.createSpy("remove"), 
            parent: function () { return turnInlineInputStub; }
        };

        jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(
            function () {
                if (arguments[0] == "span.currentScoreValue") {
                    return currentTurnScoreValueStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                return null;
            }
        );
        
        jQuerySpy.proxy = jasmine.createSpy("proxy").andReturn(proxiedClickHandler);

        stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

        mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

        (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubScoreKeeper, mockTurnScoreUI)).turnScoreBlurHandler(blurEvent);
    });

    it("then starts the turn.", function () {
        expect(mockTurnScoreUI.finishTurn).toHaveBeenCalledWith(scoreTurnInputStub, stubScoreKeeper.updateScoreTurn);
    });   
});

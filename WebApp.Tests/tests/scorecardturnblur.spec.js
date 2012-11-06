/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery;
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

describe("When a score card turn input is blurred", function() {
    beforeEach(function() {
        currentTurnScoreValue = "5";

        scoreTurnInputStub = { };
        blurEvent = sinon.stub({ currentTarget: scoreTurnInputStub });


        turnScoreCellSelectionResultStub = {
            on: function() {
            },
        };

        stubbedJQuery = sinon.stub();
        stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

        turnInlineInputStub = {
            val: function() {
            },
            remove: function() {
            },
            parent: function() {
            }
        };

        valStub = sinon.stub(turnInlineInputStub, "val");
        valStub.returns(currentTurnScoreValue);
        inputParentStub = sinon.stub(turnInlineInputStub, "parent");
        inputParentStub.returns(turnScoreCellSelectionResultStub);
        removeStub = sinon.stub(turnInlineInputStub, "remove");

        stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

        currentTurnScoreValueStub = {
            show: function() {
            },
            html: function() {
            }
        };
        showStub = sinon.stub(currentTurnScoreValueStub, "show");
        htmlStub = sinon.stub(currentTurnScoreValueStub, "html");

        stubbedJQuery.withArgs("span.currentScoreValue", turnScoreCellSelectionResultStub).returns(currentTurnScoreValueStub);
        stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
        stubScoreKeeper = sinon.stub({
            updateScoreTurn: function() {
            }
        });


        scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper).turnScoreBlurHandler(blurEvent);
    });

    it("finds current turn cell using jQuery", function() {
        expect(stubbedJQuery.calledWith(scoreTurnInputStub)).toBe(true);
    });

    it("fetches value of turn from turn input", function() {
        expect(valStub.called).toBe(true);
    });

    it("calls score keeper to update turn score", function() {
        expect(stubScoreKeeper.updateScoreTurn.calledWith(currentTurnScoreValue)).toBe(true);
    });

    it("finds current score span", function() {
        expect(stubbedJQuery.calledWith("span.currentScoreValue", turnScoreCellSelectionResultStub)).toBe(true);
    });

    it("updates current score span with new score", function() {
        expect(htmlStub.calledWith(currentTurnScoreValue)).toBe(true);
    });

    it("shows score span again", function() {
        expect(showStub.called).toBe(true);
    });

    it("removes score inline input from DOM", function() {
        expect(removeStub.called).toBe(true);
    });
});

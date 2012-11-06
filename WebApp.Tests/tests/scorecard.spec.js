/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery, stubbedJQueryProxy, turnScoreCellSelectionResultStub, stubTurnScoreClickEventHandler;
var scorecard;

describe("When a Score Card is Initialised", function () {
    
    beforeEach(function() {
        stubbedJQuery = sinon.stub();
        stubbedJQueryProxy = sinon.stub({
            proxy: function() {
            }
        });
        turnScoreCellSelectionResultStub = sinon.stub({
            on: function() {
            }
        });
        stubTurnScoreClickEventHandler = sinon.stub();
        stubbedJQuery.returns(turnScoreCellSelectionResultStub);
        scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, stubTurnScoreClickEventHandler, stubbedJQueryProxy);
    });
	
    it("then has the current turn set to 1", function () {
	    expect(scorecard.CurrentTurn).toEqual(1);
    });

    it("then finds the current turn score cells in the table", function() {
	    expect(stubbedJQuery.calledWith("td.turnScore")).toBe(true);
    });

    it("then attaches a click handler to the current score cells", function() {
        expect(turnScoreCellSelectionResultStub.on.calledWith("click")).toBe(true);
    });

    it("then attaches the current score cell click handlers via a proxy to preserve context", function() {
	    expect(stubbedJQueryProxy.proxy.calledWith(stubTurnScoreClickEventHandler)).toBe(true);
    });
});


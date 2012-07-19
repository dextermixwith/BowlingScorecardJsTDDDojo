/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery, turnScoreCellSelectionResultStub, stubTurnScoreClickEventHandler;
var scorecard;

module("Score Card Initialisation", {
	setup : function() {
		stubbedJQuery = sinon.stub();
		turnScoreCellSelectionResultStub = sinon.stub( { on : function() {} } );
		stubTurnScoreClickEventHandler = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
		scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, stubTurnScoreClickEventHandler);		
	}
});


test("Creating a scorecard has current turn set to 1", function () {
	equal(scorecard.CurrentTurn, 1, "Current turn should be 1");
});

test("Turn score cells are selection test", function() {
	ok(stubbedJQuery.calledWith("td.turnScore"), "turn score cells in table are selected.");
});

test("Turn score cell click handler attachment test", function() {
	ok(turnScoreCellSelectionResultStub.on.calledWith("click", stubTurnScoreClickEventHandler), "turn score cells have had 'on' method used to attach click events");
});
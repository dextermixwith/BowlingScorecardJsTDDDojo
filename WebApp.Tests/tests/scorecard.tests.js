/// <reference path="../../WebApp/assets/js/scorecard.js" />

var scorecardTableNodeCollection = $('<table class="scorecardTable"><thead><tr><th colspan="2">1</th></tr></thead><tbody><tr><td>-</td><td>-</td></tr><tr><td class="turnScore" colspan="2">-</td></tr></tbody></table>');

var stubbedJQuery;
var scorecard;

module("Score Card Initialisation", {
	setup : function() {
		stubbedJQuery = sinon.stub();
		scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery);		
	}
});


test("Creating a scorecard has current turn set to 1", function () {
	equal(scorecard.CurrentTurn, 1, "Current turn should be 1");
});

test("Turn score cells are selection test", function() {
	ok(stubbedJQuery.calledWith("td.turnScore"), "turn score cells in table are selected.");
});


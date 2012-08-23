/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery, stubbedJQueryProxy, turnScoreCellSelectionResultStub, stubTurnScoreblurEventHandler;
var scorecard;
var blurEvent, injectedJQueryForProxy, currentTurnCellStub, turnInlineInputStub, stubTurnScoreBlurEventHandler;
var scoreTurnInputStub;
var filterSpy;

module("Score Card Turn Blur", {
	setup : function() {
		currentTurnCellStub = sinon.stub({ append : function () {} , on : function() {}, filter : function() {} });
		
		scoreTurnInputStub = {  };
		blurEvent = sinon.stub({ currentTarget : scoreTurnInputStub });	

		
		turnScoreCellSelectionResultStub =  { 
												on : function() { } , 
											 };

		stubbedJQuery = sinon.stub();

		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

		turnInlineInputStub = { filter : function() {} };
		filterSpy = sinon.stub(turnInlineInputStub, "filter");
		filterSpy.returns(turnScoreCellSelectionResultStub);
		
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);


		scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery).turnScoreBlurHandler(blurEvent);	
	}
});


test("Blur event select find current turn input test", function() {
	ok(stubbedJQuery.calledWith(scoreTurnInputStub), "current turn cell is found by jQuery");
});

test("Blur event select find current turn table cell", function() {
	ok(filterSpy.calledWith(":parrent"), "turn table cell found by filtering to parent of input");
});


/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery, turnScoreCellSelectionResultStub;
var scorecard;
var blurEvent, turnInlineInputStub;
var scoreTurnInputStub, currentTurnScoreValue;
var beforeStub, valStub, removeStub;
var stubScoreKeeper;

module("Score Card Turn Blur", {
	setup : function() {
		currentTurnScoreValue = "5";
		
		scoreTurnInputStub = {  };
		blurEvent = sinon.stub({ currentTarget : scoreTurnInputStub });	

		
		turnScoreCellSelectionResultStub =  { 
												on : function() { } , 
											 };

		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

		turnInlineInputStub = { before : function() {} , val : function() {}, remove : function() {}};

		beforeStub = sinon.stub(turnInlineInputStub, "before");
		
		valStub = sinon.stub(turnInlineInputStub, "val");
		valStub.returns(currentTurnScoreValue);

		removeStub = sinon.stub(turnInlineInputStub, "remove");

		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
		stubScoreKeeper = sinon.stub({ updateScoreTurn : function() {} });


		scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper).turnScoreBlurHandler(blurEvent);	
	}
});


test("Blur event select find current turn input test", function() {
	ok(stubbedJQuery.calledWith(scoreTurnInputStub), "current turn cell is found by jQuery");
});

test("Value of turn is fetched from turn input", function() {
	ok(valStub.called, "value of turn found by calling val on input");
});


test("Score keeper is called to update turn score", function() {
	ok(stubScoreKeeper.updateScoreTurn.calledWith(currentTurnScoreValue), "score keeper is called to update turn score");
});

test("Value of turn input is appended at start of turn table cell", function() {
	ok(beforeStub.calledWith(currentTurnScoreValue), "value added before turn input");
});

test("Turn score inline input is removed from DOM", function() {
	ok(removeStub.called, "input element removed form DOM");
});


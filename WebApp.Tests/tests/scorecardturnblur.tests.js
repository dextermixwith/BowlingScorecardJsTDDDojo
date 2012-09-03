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
var showStub, htmlStub, currentTurnScoreValueStub;
var inputParentStub;

module("Score Card Turn Blur", {
	setup : function() {
		currentTurnScoreValue = "5";
		
		scoreTurnInputStub = {  };
		blurEvent = sinon.stub({ currentTarget : scoreTurnInputStub });	

		
		turnScoreCellSelectionResultStub =  { on : function() { } , };

		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

		turnInlineInputStub = { val : function() {}, remove : function() {}, parent : function() {} };

		valStub = sinon.stub(turnInlineInputStub, "val");
		valStub.returns(currentTurnScoreValue);
		inputParentStub = sinon.stub(turnInlineInputStub, "parent");
		inputParentStub.returns(turnScoreCellSelectionResultStub);
		removeStub = sinon.stub(turnInlineInputStub, "remove");
		
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

		currentTurnScoreValueStub = { show : function() {}, html : function() {} };
		showStub = sinon.stub(currentTurnScoreValueStub, "show");
		htmlStub = sinon.stub(currentTurnScoreValueStub, "html");

		stubbedJQuery.withArgs("span.currentScoreValue", turnScoreCellSelectionResultStub).returns(currentTurnScoreValueStub);
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

test("Current score span is found", function() {
	ok(stubbedJQuery.calledWith("span.currentScoreValue", turnScoreCellSelectionResultStub), "current score value span is found");
});

test("Current score span is updated with new score", function() {
	ok(htmlStub.calledWith(currentTurnScoreValue), "score span html is is updated with new score");
});

test("Current score span is shown again", function() {
	ok(showStub.called, "show is called on current score span DOM element.");
});

test("Turn score inline input is removed from DOM", function() {
	ok(removeStub.called, "input element removed form DOM");
});


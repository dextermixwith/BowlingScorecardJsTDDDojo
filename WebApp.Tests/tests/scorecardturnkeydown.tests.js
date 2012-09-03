/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery, turnScoreCellSelectionResultStub;
var scorecard;
var keydownEvent, turnInlineInputStub;
var scoreTurnInputStub, currentTurnScoreValue;
var beforeStub, valStub, removeStub;
var stubScoreKeeper;
var showStub, htmlStub, currentTurnScoreValueStub;
var inputParentStub;

module("Score Card Turn Keydown Enter Pressed Tests", {
	setup : function() {
				
		turnScoreCellSelectionResultStub =  {  on : function() { } };

		scoreTurnInputStub = {  };
		keydownEvent = sinon.stub({ currentTarget : scoreTurnInputStub, which : 13 });	

		turnInlineInputStub = { before : function() {} , val : function() {}, remove : function() {}, parent : function() {} };

		beforeStub = sinon.stub(turnInlineInputStub, "before");
		valStub = sinon.stub(turnInlineInputStub, "val");
		valStub.returns(currentTurnScoreValue);
		inputParentStub = sinon.stub(turnInlineInputStub, "parent");
		inputParentStub.returns(turnScoreCellSelectionResultStub);
		removeStub = sinon.stub(turnInlineInputStub, "remove");

		currentTurnScoreValueStub = { show : function() {}, html : function() {} };
		showStub = sinon.stub(currentTurnScoreValueStub, "show");
		htmlStub = sinon.stub(currentTurnScoreValueStub, "html");

		stubScoreKeeper = sinon.stub({ updateScoreTurn : function() {} });
	
		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
		stubbedJQuery.withArgs("span.currentScoreValue", turnScoreCellSelectionResultStub).returns(currentTurnScoreValueStub);

		(new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);	
	}
});


test("Keydown event select find current turn input test", function() {
	ok(stubbedJQuery.calledWith(scoreTurnInputStub), "current turn cell is found by jQuery");
});

test("Value of turn is fetched from turn input", function() {
	ok(valStub.called, "value of turn found by calling val on input");
});

test("Table cell for turn is found", function() {
	ok(inputParentStub.called, "parent of turn input is found.");
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

test("Score keeper is called to update turn score", function() {
	ok(stubScoreKeeper.updateScoreTurn.calledWith(currentTurnScoreValue), "score keeper is called to update turn score");
});

test("Turn score inline input is removed from DOM", function() {
	ok(removeStub.called, "input element removed form DOM");
});

var keyDownHandlerResult = true;

module("Score Card Turn Keydown Number 0 Pressed Tests", {
	setup : function() {
				
		turnScoreCellSelectionResultStub =  { 
												on : function() { } , 
											 };

		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

		scoreTurnInputStub = {  };
		keydownEvent = sinon.stub({ currentTarget : scoreTurnInputStub, which : 48 });	


		turnInlineInputStub = { before : function() {} , val : function() {}, remove : function() {}};

		beforeStub = sinon.stub(turnInlineInputStub, "before");
		
		valStub = sinon.stub(turnInlineInputStub, "val");
		valStub.returns(currentTurnScoreValue);

		removeStub = sinon.stub(turnInlineInputStub, "remove");

		stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
		stubScoreKeeper = sinon.stub({ updateScoreTurn : function() {} });

		keyDownHandlerResult = (new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);	
	}
});

test("Score keeper is not called to update turn score", function() {
	ok(!stubScoreKeeper.updateScoreTurn.called, "score keeper is not called to update turn score");
});

test("Value of turn input is not appended at start of turn table cell", function() {
	ok(!beforeStub.calledWith(currentTurnScoreValue), "value added before turn input");
});

test("Turn score inline input is not removed from DOM", function() {
	ok(!removeStub.called, "input element removed form DOM");
});


module("Score Card Turn Keydown Number 9 Pressed Tests", {
	setup : function() {
				
		turnScoreCellSelectionResultStub =  { 
												on : function() { } , 
											 };

		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

		scoreTurnInputStub = {  };
		keydownEvent = sinon.stub({ currentTarget : scoreTurnInputStub, which : 57 });	


		turnInlineInputStub = { before : function() {} , val : function() {}, remove : function() {}};

		beforeStub = sinon.stub(turnInlineInputStub, "before");
		
		valStub = sinon.stub(turnInlineInputStub, "val");
		valStub.returns(currentTurnScoreValue);

		removeStub = sinon.stub(turnInlineInputStub, "remove");

		stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
		stubScoreKeeper = sinon.stub({ updateScoreTurn : function() {} });
	
		keyDownHandlerResult = (new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);	
	}
});

test("Score keeper is not called to update turn score", function() {
	ok(!stubScoreKeeper.updateScoreTurn.called, "score keeper is not called to update turn score");
});

test("Value of turn input is not appended at start of turn table cell", function() {
	ok(!beforeStub.calledWith(currentTurnScoreValue), "value added before turn input");
});

test("Turn score inline input is not removed from DOM", function() {
	ok(!removeStub.called, "input element removed form DOM");
});



module("Score Card Turn Keydown ESC key Pressed Tests", {
	setup : function() {
				
		turnScoreCellSelectionResultStub =  { 
												on : function() { } , 
											 };

		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

		scoreTurnInputStub = {  };
		keydownEvent = sinon.stub({ currentTarget : scoreTurnInputStub, which : 27 });	


		turnInlineInputStub = { before : function() {} , val : function() {}, remove : function() {}};

		beforeStub = sinon.stub(turnInlineInputStub, "before");
		
		valStub = sinon.stub(turnInlineInputStub, "val");
		valStub.returns(currentTurnScoreValue);

		removeStub = sinon.stub(turnInlineInputStub, "remove");

		stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
		stubScoreKeeper = sinon.stub({ updateScoreTurn : function() {} });
	
		keyDownHandlerResult = (new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);	
	}
});

test("Score keeper is not called to update turn score", function() {
	ok(!stubScoreKeeper.updateScoreTurn.called, "score keeper is not called to update turn score");
});

test("Value of turn input is not appended at start of turn table cell", function() {
	ok(!beforeStub.calledWith(currentTurnScoreValue), "value not added before turn input");
});

test("Turn score inline input is not removed from DOM", function() {
	ok(removeStub.called, "input element removed form DOM");
});
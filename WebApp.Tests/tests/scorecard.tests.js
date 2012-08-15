/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery, stubbedJQueryProxy, turnScoreCellSelectionResultStub, stubTurnScoreClickEventHandler;
var scorecard;

module("Score Card Initialisation", {
	setup : function() {
		stubbedJQuery = sinon.stub();
		stubbedJQueryProxy = sinon.stub({ proxy: function() {} });
		turnScoreCellSelectionResultStub = sinon.stub( { on : function() {} } );
		stubTurnScoreClickEventHandler = sinon.stub();
		stubbedJQuery.returns(turnScoreCellSelectionResultStub);
		scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, stubTurnScoreClickEventHandler, stubbedJQueryProxy);		
	}
});

test("Creating a scorecard has current turn set to 1", function () {
	equal(scorecard.CurrentTurn, 1, "Current turn should be 1");
});

test("Turn score cells are selection test", function() {
	ok(stubbedJQuery.calledWith("td.turnScore"), "turn score cells in table are selected.");
});

test("Turn score cell click handler attachment test", function() {
	ok(turnScoreCellSelectionResultStub.on.calledWith("click"), "turn score cells have had 'on' method used to attach click events");
});

test("The turn score cell event click proxy test", function() {
	ok(stubbedJQueryProxy.proxy.calledWith(stubTurnScoreClickEventHandler), "The turn score cell event click handler is proxied by jQuery");
});

var clickEvent, injectedJQueryForProxy, currentTurnCellStub, turnInlineInputStub;

module("Score Card Turn Click", {
	setup : function() {
		currentTurnCellStub = sinon.stub({ append : function () {} , on : function() {} });
		turnInlineInputStub = sinon.stub({ on : function() {}, trigger : function() {} });
		clickEvent = sinon.stub({ currentTarget : currentTurnCellStub });	
		turnScoreCellSelectionResultStub = sinon.stub( { 
												append : function() {}, 
												on : function() {} , 
												empty : function() {},

											});
		
		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs(currentTurnCellStub).returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs('<input type="text" class="turnInput" maxlength="1" />').returns(turnInlineInputStub);

		scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery).turnScoreClickEventHandler(clickEvent);	
	}
});

test("Click event select find current turn cell test", function() {
	ok(stubbedJQuery.calledWith(currentTurnCellStub), "current turn cell is found by jQuery");
});

test("Turn cell inline input element creation tests", function() {
	ok(stubbedJQuery.calledWith('<input type="text" class="turnInput" maxlength="1" />'), "turn inline input element has been created by jQuery");
});

test("Current turn cell append test", function() {
	ok(turnScoreCellSelectionResultStub.append.called, "append is called on turn score cell element");
});

test("Current turn cell contents cleared test", function() {
	ok(turnScoreCellSelectionResultStub.empty.called, "empty is call on turn score cell");
});

test("Current turn cell add input test", function() {
	ok(turnScoreCellSelectionResultStub.append.calledWith(turnInlineInputStub), "inline input is added to turn cell");
});

test("Current turn cell focused input test", function() {
	ok(turnInlineInputStub.trigger.calledWith("focus"), "input input gets focus");
});

test("Turn cell input focus loss event attachment tests", function() {
	ok(turnInlineInputStub.on.calledWith("blur"));
});	

test("Turn cell input keydown event attachment tests", function() {
	ok(turnInlineInputStub.on.calledWith("keydown"));
});

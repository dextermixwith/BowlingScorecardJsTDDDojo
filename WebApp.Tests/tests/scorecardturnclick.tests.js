/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery, stubbedJQueryProxy, turnScoreCellSelectionResultStub, stubTurnScoreClickEventHandler;
var scorecard;
var currentTurnScoreValue;
var clickEvent, injectedJQueryForProxy, currentTurnCellStub, turnInlineInputStub, stubTurnScoreBlurEventHandler;

module("Score Card Turn Click", {
	setup : function() {
		currentTurnScoreValue = "5";
		currentTurnCellStub = sinon.stub({ append : function () {} , on : function() {} });
		turnInlineInputStub = sinon.stub({ on : function() {}, trigger : function() {} });
		clickEvent = sinon.stub({ currentTarget : currentTurnCellStub });	

		turnScoreCellSelectionResultStub =  { 
												append : function() { }, 
												on : function() { } , 
												empty : function() { },
												html : function() {  }
											};

		var appendSpy = sinon.spy(turnScoreCellSelectionResultStub, "append");
		var onSpy = sinon.spy(turnScoreCellSelectionResultStub, "on");
		var emptySpy = sinon.spy(turnScoreCellSelectionResultStub, "empty");
		var htmlSpy = sinon.stub(turnScoreCellSelectionResultStub, "html");
		htmlSpy.returns(currentTurnScoreValue);

		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs(currentTurnCellStub).returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs('<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />').returns(turnInlineInputStub);

		stubTurnScoreBlurEventHandler = function () {};
		stubTurnScoreKeydownEventHandler = function () {};

		stubbedJQueryProxy = sinon.stub({ proxy: function() {} });

		scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, stubbedJQueryProxy, stubTurnScoreBlurEventHandler, stubTurnScoreKeydownEventHandler).turnScoreClickEventHandler(clickEvent);	
	}
});

test("Click event select find current turn cell test", function() {
	ok(stubbedJQuery.calledWith(currentTurnCellStub), "current turn cell is found by jQuery");
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

test("The turn score blur proxy test", function() {
	ok(stubbedJQueryProxy.proxy.calledWith(stubTurnScoreBlurEventHandler), "The turn score cell event blur handler is proxied by jQuery");
});

test("The turn score keydown proxy test", function() {
	ok(stubbedJQueryProxy.proxy.calledWith(stubTurnScoreKeydownEventHandler), "The turn score cell event keydown handler is proxied by jQuery");
});

test("The turn score click loads current turn score", function() {
	ok(turnScoreCellSelectionResultStub.html.called, "current score of turn is loaded");
});


test("Turn cell inline input element creation tests", function() {
	ok(stubbedJQuery.calledWith('<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />'), "turn inline input element has been created by jQuery with correct value set");
});
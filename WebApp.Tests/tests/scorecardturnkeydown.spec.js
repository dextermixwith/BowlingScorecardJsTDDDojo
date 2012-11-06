/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />
/// <reference path="../jasmine/jasmine.js" />

   var scorecardTableNodeCollection = $('<table />');

    var stubbedJQuery;
    var turnScoreCellSelectionResultStub;
    var keydownEvent;
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

describe("When 'Enter' is is pressed in score turn input", function() {
 
	beforeEach(function() {
				
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
		htmlStub = sinon.stub(currentTurnScoreValueStub, "html");
        showStub = sinon.stub(currentTurnScoreValueStub, "show");
		
		stubScoreKeeper = sinon.stub({ updateScoreTurn : function() {} });
	
		stubbedJQuery = sinon.stub();
		stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
		stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
		stubbedJQuery.withArgs("span.currentScoreValue", turnScoreCellSelectionResultStub).returns(currentTurnScoreValueStub);

		(new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);	
	});


    it("finds current turn cell using jQuery", function() {
	    expect(stubbedJQuery.calledWith(scoreTurnInputStub)).toBe(true);
    });

    it("fetches value of turn from turn input", function() {
	    expect(valStub.called).toBe(true);
    });

    it("finds table cell for turn", function() {
	    expect(inputParentStub.called).toBe(true);
    });

    it("finds current score span", function() {
	    expect(stubbedJQuery.calledWith("span.currentScoreValue", turnScoreCellSelectionResultStub)).toBe(true);
    });

    it("updates current score span with new score", function() {
	    expect(htmlStub.calledWith(currentTurnScoreValue)).toBe(true);
    });

    it("shows current score span again", function() { 
	    expect(showStub.called).toBe(true);
    });

    it("calls score keeper to update turn score", function() {
	    expect(stubScoreKeeper.updateScoreTurn.calledWith(currentTurnScoreValue)).toBe(true);
    });

    it("removws turn score inline input from DOM", function() {
	    expect(removeStub.called).toBe(true);
    });
});


var keyDownHandlerResult = true;

describe("When score turn keydown 0 pressed", function() {
    beforeEach(function() {

        turnScoreCellSelectionResultStub = {
            on: function() {
            },
        };

        stubbedJQuery = sinon.stub();
        stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

        scoreTurnInputStub = { };
        keydownEvent = sinon.stub({ currentTarget: scoreTurnInputStub, which: 48 });


        turnInlineInputStub = {
            before: function() {
            },
            val: function() {
            },
            remove: function() {
            }
        };

        beforeStub = sinon.stub(turnInlineInputStub, "before");

        valStub = sinon.stub(turnInlineInputStub, "val");
        valStub.returns(currentTurnScoreValue);

        removeStub = sinon.stub(turnInlineInputStub, "remove");

        stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
        stubScoreKeeper = sinon.stub({
            updateScoreTurn: function() {
            }
        });

        keyDownHandlerResult = (new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);
    });

    it("does not call the score keeper to update turn score", function() {
        expect(stubScoreKeeper.updateScoreTurn.called).not.toBe(true);
    });

    it("does not append the value at start of turn table cell", function() {
        expect(beforeStub.calledWith(currentTurnScoreValue)).not.toBe(true);
    });

    it("does not remove then turn score inline input from then DOM", function() {
        expect(removeStub.called).not.toBe(true);
    });
});

describe("When score card turn keydown number 9 is pressed", function() {
    beforeEach(function() {

        turnScoreCellSelectionResultStub = {
            on: function() {
            },
        };

        stubbedJQuery = sinon.stub();
        stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

        scoreTurnInputStub = { };
        keydownEvent = sinon.stub({ currentTarget: scoreTurnInputStub, which: 57 });


        turnInlineInputStub = {
            before: function() {
            },
            val: function() {
            },
            remove: function() {
            }
        };

        beforeStub = sinon.stub(turnInlineInputStub, "before");

        valStub = sinon.stub(turnInlineInputStub, "val");
        valStub.returns(currentTurnScoreValue);

        removeStub = sinon.stub(turnInlineInputStub, "remove");

        currentTurnScoreValueStub = {
            show: function() {
            },
            html: function() {
            }
        };
        showStub = sinon.stub(currentTurnScoreValueStub, "show");

        stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
        stubScoreKeeper = sinon.stub({
            updateScoreTurn: function() {
            }
        });

        keyDownHandlerResult = (new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);
    });

    it("does not call the score keeper to update turn score", function() {
        expect(stubScoreKeeper.updateScoreTurn.called).not.toBe(true);
    });

    it("does not append the value at start of turn table cell", function() {
        expect(beforeStub.calledWith(currentTurnScoreValue)).not.toBe(true);
    });

    it("does not remove then turn score inline input from then DOM", function() {
        expect(removeStub.called).not.toBe(true);
    });
});


describe("When score card turn keydown ESC key is pressed", function() {
    beforeEach(function() {

        turnScoreCellSelectionResultStub = {
            on: function() {
            },
        };

        stubbedJQuery = sinon.stub();
        stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);

        scoreTurnInputStub = { };
        keydownEvent = sinon.stub({ currentTarget: scoreTurnInputStub, which: 27 });


        turnInlineInputStub = {
            before: function() {
            },
            val: function() {
            },
            remove: function() {
            },
            parent: function() {
            }
        };

        beforeStub = sinon.stub(turnInlineInputStub, "before");

        valStub = sinon.stub(turnInlineInputStub, "val");
        valStub.returns(currentTurnScoreValue);
        inputParentStub = sinon.stub(turnInlineInputStub, "parent");
        inputParentStub.returns(turnScoreCellSelectionResultStub);

        removeStub = sinon.stub(turnInlineInputStub, "remove");

        stubbedJQuery.withArgs(scoreTurnInputStub).returns(turnInlineInputStub);
        stubScoreKeeper = sinon.stub({
            updateScoreTurn: function() {
            }
        });
        stubbedJQuery.withArgs("span.currentScoreValue", turnScoreCellSelectionResultStub).returns(currentTurnScoreValueStub);


        keyDownHandlerResult = (new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, null, null, null, stubScoreKeeper)).turnKeydownHandler(keydownEvent);
    });

    it("does not call the score keeper to update turn score", function() {
        expect(stubScoreKeeper.updateScoreTurn.called).not.toBe(true);
    });

    it("finds the table cell for turn", function() {
        expect(inputParentStub.called).toBe(true);
    });

    it("finds score span", function() {
        expect(stubbedJQuery.calledWith("span.currentScoreValue", turnScoreCellSelectionResultStub)).toBe(true);
    });

    it("shows current score span again", function() {
        expect(showStub.called).toBe(true);
    });

    it("removes score inline input from DOM", function() {
        expect(removeStub.called).toBe(true);
    });
});
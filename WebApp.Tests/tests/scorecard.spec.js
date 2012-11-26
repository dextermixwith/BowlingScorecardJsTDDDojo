/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

var scorecardTableNodeCollection = $('<table />');

var jQuerySpy, stubbedJQueryProxy, turnScoreCellSelectionResultStub, stubTurnScoreClickEventHandler;
var scorecard;
var jQuerySpy;
var proxiedClickHandler = function () { };


describe("When a Score Card is Initialised", function () {
    beforeEach(function () {
        turnScoreCellSelectionResultStub = jasmine.createSpyObj("nodeObject", ["on"]);
        jQuerySpy = jasmine.createSpy("").andReturn(turnScoreCellSelectionResultStub);
        jQuerySpy.proxy = jasmine.createSpy("proxy").andReturn(proxiedClickHandler);
        stubTurnScoreClickEventHandler = {};
        scorecard = new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubTurnScoreClickEventHandler);
    });
    
    it("then has the current turn set to 1", function () {
        expect(scorecard.CurrentTurn).toEqual(1);
    });

    it("then finds the current turn score cells in the table", function () {
        expect(jQuerySpy).toHaveBeenCalledWith("td.turnScore", scorecardTableNodeCollection);
    });

    it("then attaches a click handler to the current score cells", function () {
        expect(turnScoreCellSelectionResultStub.on).toHaveBeenCalledWith("click", proxiedClickHandler);
    });
    
    it("then attaches the current score cell click handlers via a proxy to preserve context", function () {
        expect(jQuerySpy.proxy).toHaveBeenCalled();
    });
});


/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

describe("Score card specs", function () {
    var scorecardTableNodeCollection = $('<table />');

    var jQuerySpy;
    var turnScoreCellSelectionResultStub;
    var stubTurnScoreClickEventHandler;
    var scorecard;
    var proxiedClickHandler = function () { };

    describe("When a Score Card is Initialised", function () {
        beforeEach(function () {
            turnScoreCellSelectionResultStub = jasmine.createSpyObj("nodeObject", ["on"]);
            jQuerySpy = jasmine.createSpy("jQuerySpy").andReturn(turnScoreCellSelectionResultStub);
            jQuerySpy.proxy = jasmine.createSpy("proxy").andReturn(proxiedClickHandler);
            stubTurnScoreClickEventHandler = {};
            scorecard = new ScoreCard(scorecardTableNodeCollection, jQuerySpy);
            scorecard.handleTurnScoreClick = stubTurnScoreClickEventHandler;
            scorecard.initialise();
        });

        it("then finds the current turn score cells in the table", function () {
            expect(jQuerySpy).toHaveBeenCalledWith("td.turnScore", scorecardTableNodeCollection);
        });

        it("then attaches a click handler to the current score cells", function () {
            expect(turnScoreCellSelectionResultStub.on).toHaveBeenCalledWith("click", proxiedClickHandler);
        });

        it("then attaches the current score cell click handlers via a proxy to preserve context", function () {
            expect(jQuerySpy.proxy).toHaveBeenCalledWith(stubTurnScoreClickEventHandler, scorecard);
        });
    });

});


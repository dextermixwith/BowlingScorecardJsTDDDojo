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

    var clickEvent;
    var currentTurnCellStub;
    var proxiedTurnBlurHandler = {};
    var proxiedTurnKeydownHandler = {};

    var mockTurnScoreUI;
    var mockScoreKeeper;
    var mockTurnBlurHandler = function () { };
    var mockTurnKeydownHandler = function () { };

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

    describe("When the turn score cell is clicked", function () {
        beforeEach(function () {
            turnScoreCellSelectionResultStub = jasmine.createSpy("turnScoreCellSelectionResultStub");
            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == "td.turnScore") {
                    return turnScoreCellSelectionResultStub;
                }
                return null;
            });

            jQuerySpy.proxy = jasmine.createSpy("proxy").andCallFake(function () {
                if (arguments[0] = mockTurnBlurHandler) {
                    return proxiedTurnBlurHandler;
                }
                if (arguments[0] = mockTurnKeydownHandler) {
                    return proxiedTurnKeydownHandler;
                }
                return null;
            });

            mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["startTurn"]);

            currentTurnCellStub = {};
            clickEvent = { currentTarget: currentTurnCellStub };

            mockScoreKeeper = { updateScoreTurn: function () { } };

            scorecard = new ScoreCard(scorecardTableNodeCollection, jQuerySpy, mockScoreKeeper, mockTurnScoreUI);
            scorecard.turnScoreBlurHandler = mockTurnBlurHandler;
            scorecard.turnKeydownHandler = mockTurnKeydownHandler;
            scorecard.handleTurnScoreClick(clickEvent);

        });

        it("then the turn blur callback function is proxied by jQuery", function () {
            expect(jQuerySpy.proxy).toHaveBeenCalledWith(mockTurnBlurHandler, scorecard);
        });

        it("then the turn keydown callback function is proxied by jQuery", function () {
            expect(jQuerySpy.proxy).toHaveBeenCalledWith(mockTurnKeydownHandler, scorecard);
        });

        it("then starts the turn.", function () {
            expect(mockTurnScoreUI.startTurn).toHaveBeenCalledWith(currentTurnCellStub, proxiedTurnBlurHandler, proxiedTurnKeydownHandler);
        });
    });

    var blurEvent;
    var turnInlineInputStub;
    var scoreTurnInputStub;
    var currentTurnScoreValue;
    var stubScoreKeeper;
    var currentTurnScoreValueStub;

    describe("When a score card turn input is blurred", function () {
        beforeEach(function () {
            currentTurnScoreValue = "5";
            scoreTurnInputStub = {};
            blurEvent = { currentTarget: scoreTurnInputStub };
            turnScoreCellSelectionResultStub = { on: function () { } };

            currentTurnScoreValueStub = {
                show: jasmine.createSpy("show"),
                html: jasmine.createSpy("html")
            };
            turnInlineInputStub = {
                val: jasmine.createSpy("val").andReturn(currentTurnScoreValue),
                remove: jasmine.createSpy("remove"),
                parent: function () { return turnInlineInputStub; }
            };

            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == "span.currentScoreValue") {
                    return currentTurnScoreValueStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                return null;
            });

            jQuerySpy.proxy = jasmine.createSpy("proxy").andReturn(proxiedClickHandler);

            stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

            mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

            (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubScoreKeeper, mockTurnScoreUI)).turnScoreBlurHandler(blurEvent);
        });

        it("then finishes the turn.", function () {
            expect(mockTurnScoreUI.finishTurn).toHaveBeenCalledWith(scoreTurnInputStub, stubScoreKeeper.updateScoreTurn);
        });
    });

    describe("Keydown behavious specs", function () {
        var keydownEvent;
        describe("When 'Enter' is is pressed in score turn input", function () {

            beforeEach(function () {

                scoreTurnInputStub = {};

                keydownEvent = { currentTarget: scoreTurnInputStub, which: 13 };

                turnInlineInputStub = {
                    before: function () { },
                    val: jasmine.createSpy("val").andReturn(currentTurnScoreValue),
                    remove: jasmine.createSpy("remove"),
                    parent: jasmine.createSpy("parent").andReturn(turnScoreCellSelectionResultStub)
                };

                currentTurnScoreValueStub = {
                    show: jasmine.createSpy("show"),
                    html: jasmine.createSpy("html")
                };

                stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

                mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

                (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, stubScoreKeeper, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
            });

            it("then finishes the turn score", function () {
                expect(mockTurnScoreUI.finishTurn).toHaveBeenCalledWith(scoreTurnInputStub, stubScoreKeeper.updateScoreTurn);
            });
        });
        
        describe("When score turn keydown 0 pressed", function () {
            beforeEach(function () {

                keydownEvent = { currentTarget: scoreTurnInputStub, which: 48 };

                mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

                (new ScoreCard(null, null, null, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
            });

            it("then the turn is not finished", function () {
                expect(mockTurnScoreUI.finishTurn).not.toHaveBeenCalled();
            });
        });

        describe("When score turn keydown 9 pressed", function () {
            beforeEach(function () {

                keydownEvent = { currentTarget: scoreTurnInputStub, which: 57 };
                
                mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["finishTurn"]);

                (new ScoreCard(null, null, null, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
            });

            it("then the turn is not finished", function () {
                expect(mockTurnScoreUI.finishTurn).not.toHaveBeenCalledWith();
            });
        });

        describe("When score card turn keydown ESC key is pressed", function () {
            beforeEach(function () {

                scoreTurnInputStub = {};

                keydownEvent = { currentTarget: scoreTurnInputStub, which: 27 };

                mockTurnScoreUI = jasmine.createSpyObj("mockTurnScoreUI", ["cancelTurn"]);

                (new ScoreCard(scorecardTableNodeCollection, null, null, mockTurnScoreUI)).turnKeydownHandler(keydownEvent);
            });

            it("then the turn is cancelled", function () {
                expect(mockTurnScoreUI.cancelTurn).toHaveBeenCalledWith(scoreTurnInputStub);
            });
        });
    });
});


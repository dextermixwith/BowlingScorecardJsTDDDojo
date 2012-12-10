/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

describe("Turn score UI Specs", function () {
    var scorecardTableNodeCollection = $('<table />');

    var jQuerySpy;
    var turnScoreCellSelectionResultStub;
    var turnscoreUI;
    var currentTurnScoreValue;
    var currentTurnCellStub;
    var turnInlineInputStub;
    var stubTurnScoreBlurCallback;
    var proxiedTurnBlurHandler = {};
    var proxiedTurnKeydownHandler = {};
    var stubTurnScoreKeydownCallback;

    describe("When a score turn is started", function () {
        beforeEach(function () {
            turnInlineInputStub = jasmine.createSpyObj("turnInlineInputStub", ["on", "trigger"]);

            currentTurnScoreValue = "5";
            currentTurnCellStub = jasmine.createSpyObj("currentTurnCellStub", ["append", "on"]);

            turnScoreCellSelectionResultStub = jasmine.createSpyObj("turnScoreCellSelectionResultStub", ["after", "on", "hide"]);
            turnScoreCellSelectionResultStub.html = jasmine.createSpy("html").andReturn(currentTurnScoreValue);
            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == '<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />') {
                    return turnInlineInputStub;
                }
                if (arguments[0] = 'span.currentScoreValue' && arguments[1] == currentTurnCellStub) {
                    return turnScoreCellSelectionResultStub;
                }
                return null;
            });

            stubTurnScoreBlurCallback = function() {};
            stubTurnScoreKeydownCallback = function() {};

            jQuerySpy.proxy = jasmine.createSpy("proxy").andCallFake(
            function () {
                if (arguments[0] == stubTurnScoreBlurCallback) {
                    return proxiedTurnBlurHandler;
                }
                if (arguments[0] == stubTurnScoreKeydownCallback) {
                    return proxiedTurnKeydownHandler;
                }
                return null;
            }
        );

            jQuerySpy.on = jasmine.createSpy("on");

            turnscoreUI = new TurnScoreUI(scorecardTableNodeCollection, jQuerySpy);
            turnscoreUI.startTurn(currentTurnCellStub, stubTurnScoreBlurCallback, stubTurnScoreKeydownCallback);
        });

        it("then finds current turn cell is using jQuery", function () {
            expect(jQuerySpy).toHaveBeenCalledWith("span.currentScoreValue", currentTurnCellStub);
        });

        it("then the current turn score value is fetched", function () {
            expect(turnScoreCellSelectionResultStub.html).toHaveBeenCalled();
        });

        it("then calls after on turn score cell element", function () {
            expect(turnScoreCellSelectionResultStub.after).toHaveBeenCalled();
        });

        it("then hides current turn cell contents", function () {
            expect(turnScoreCellSelectionResultStub.hide).toHaveBeenCalled();
        });

        it("then adds input to current turn cell", function () {
            expect(turnScoreCellSelectionResultStub.after).toHaveBeenCalledWith(turnInlineInputStub);
        });

        it("then focuses on current turn input", function () {
            expect(turnInlineInputStub.trigger).toHaveBeenCalledWith("focus");
        });

        it("then attaches blur event handlers to turn input", function () {
            expect(turnInlineInputStub.on).toHaveBeenCalledWith("blur", proxiedTurnBlurHandler);
        });

        it("then attaches keydown event handler to the turn input", function () {
            expect(turnInlineInputStub.on).toHaveBeenCalledWith("keydown", proxiedTurnKeydownHandler);
        });

        it("then proxies the input blur handler", function () {
            expect(jQuerySpy.proxy).toHaveBeenCalledWith(stubTurnScoreBlurCallback, turnscoreUI);
        });


        it("then the input for the current turn score is creted with correct markuo", function () {
            expect(jQuerySpy).toHaveBeenCalledWith('<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />');
        });

    });

    var updateScoreCallbackSpy;
    var proxiedClickHandler;
    var currentTurnScoreValueStub;
    var scoreTurnInputStub;

    describe("When the turn score entry is finished", function () {
        beforeEach(function () {
            currentTurnScoreValue = "5";
            scoreTurnInputStub = {};

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

            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(
            function () {
                if (arguments[0] == "span.currentScoreValue") {
                    return currentTurnScoreValueStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                return null;
            });

            jQuerySpy.proxy = jasmine.createSpy("proxy").andReturn(proxiedClickHandler);

            updateScoreCallbackSpy = jasmine.createSpy("updateScoreCallback");

            turnscoreUI = new TurnScoreUI(scorecardTableNodeCollection, jQuerySpy, stubTurnScoreBlurCallback, stubTurnScoreKeydownCallback);
            turnscoreUI.finishTurn(scoreTurnInputStub, updateScoreCallbackSpy);

        });

        it("then fetches value of turn from turn input", function () {
            expect(turnInlineInputStub.val).toHaveBeenCalled();
        });

        it("then finds current score span", function () {
            expect(jQuerySpy).toHaveBeenCalledWith("span.currentScoreValue", turnInlineInputStub);
        });

        it("then shows score span again", function () {
            expect(currentTurnScoreValueStub.show).toHaveBeenCalled();
        });

        it("then updates current score span with new score", function () {
            expect(currentTurnScoreValueStub.html).toHaveBeenCalledWith(currentTurnScoreValue);
        });

        it("then removes score inline input from DOM", function () {
            expect(turnInlineInputStub.remove).toHaveBeenCalled();
        });

        it("then calls score keeper to update turn score", function () {
            expect(updateScoreCallbackSpy).toHaveBeenCalledWith(currentTurnScoreValue);
        });
    });

    describe("When a turn score entry is cancelled", function () {
        beforeEach(function() {

            turnScoreCellSelectionResultStub = { on: function () { } };

            scoreTurnInputStub = {};

            turnInlineInputStub = {
                remove: jasmine.createSpy("remove"),
                parent: jasmine.createSpy("parent").andReturn(turnScoreCellSelectionResultStub)
            };

            currentTurnScoreValueStub = {
                show: jasmine.createSpy("show"),
            };

            jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(function () {
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                if (arguments[0] = 'span.currentScoreValue' && arguments[1] == turnScoreCellSelectionResultStub) {
                    return currentTurnScoreValueStub;
                }
                return null;
            });

            turnscoreUI = new TurnScoreUI(scorecardTableNodeCollection, jQuerySpy, null, null);
            turnscoreUI.cancelTurn(scoreTurnInputStub);
   
        });

        it("then finds the table cell for turn", function () {
            expect(turnInlineInputStub.parent).toHaveBeenCalled();
        });

        it("then finds score span", function () {
            expect(jQuerySpy).toHaveBeenCalledWith("span.currentScoreValue", turnScoreCellSelectionResultStub);
        });

        it("then shows current score span again", function () {
            expect(currentTurnScoreValueStub.show).toHaveBeenCalled();
        });

        it("then removes score inline input from DOM", function () {
            expect(turnInlineInputStub.remove).toHaveBeenCalled();
        });

    });

});


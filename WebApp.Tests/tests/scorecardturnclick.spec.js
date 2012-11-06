/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scorecardTableNodeCollection = $('<table />');

var stubbedJQuery;
var stubbedJQueryProxy;
var turnScoreCellSelectionResultStub;
var stubTurnScoreClickEventHandler;
var scorecard;
var currentTurnScoreValue;
var clickEvent;
var injectedJQueryForProxy;
var currentTurnCellStub;
var turnInlineInputStub;
var stubTurnScoreBlurEventHandler;

describe("When a score card turn cell is clicked", function () {
    beforeEach(function () {
        currentTurnScoreValue = "5";
        currentTurnCellStub = sinon.stub({
            append: function () {
            },
            on: function () {
            }
        });
        turnInlineInputStub = sinon.stub({
            on: function () {
            },
            trigger: function () {
            }
        });
        clickEvent = sinon.stub({ currentTarget: currentTurnCellStub });

        turnScoreCellSelectionResultStub = {
            after: function () {
            },
            on: function () {
            },
            hide: function () {
            },
            html: function () {
            }
        };

        var appendSpy = sinon.spy(turnScoreCellSelectionResultStub, "after");
        var onSpy = sinon.spy(turnScoreCellSelectionResultStub, "on");
        var emptySpy = sinon.spy(turnScoreCellSelectionResultStub, "hide");
        var htmlSpy = sinon.stub(turnScoreCellSelectionResultStub, "html");
        htmlSpy.returns(currentTurnScoreValue);

        stubbedJQuery = sinon.stub();
        stubbedJQuery.withArgs("td.turnScore").returns(turnScoreCellSelectionResultStub);
        stubbedJQuery.withArgs("span.currentScoreValue", currentTurnCellStub).returns(turnScoreCellSelectionResultStub);
        stubbedJQuery.withArgs('<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />').returns(turnInlineInputStub);

        stubTurnScoreBlurEventHandler = function () {
        };
        stubTurnScoreKeydownEventHandler = function () {
        };

        stubbedJQueryProxy = sinon.stub({
            proxy: function () {
            }
        });

        scorecard = new ScoreCard(scorecardTableNodeCollection, stubbedJQuery, null, stubbedJQueryProxy, stubTurnScoreBlurEventHandler, stubTurnScoreKeydownEventHandler).turnScoreClickEventHandler(clickEvent);
    });

    it("then finds current turn cell is using jQuery", function () {
        expect(stubbedJQuery.calledWith("span.currentScoreValue", currentTurnCellStub)).toBe(true);
    });

    it("then calls after on turn score cell element", function () {
        expect(turnScoreCellSelectionResultStub.after.called).toBe(true);
    });

    it("then hides current turn cell contents", function () {
        expect(turnScoreCellSelectionResultStub.hide.called).toBe(true);
    });

    it("then adds input to current turn cell", function () {
        expect(turnScoreCellSelectionResultStub.after.calledWith(turnInlineInputStub)).toBe(true);
    });

    it("then focuses on current turn input", function () {
        expect(turnInlineInputStub.trigger.calledWith("focus")).toBe(true);
    });

    it("then attaches blur event handlers to turn input", function () {
        expect(turnInlineInputStub.on.calledWith("blur")).toBe(true);
    });

    it("then attaches keydown event handler to the turn input", function () {
        expect(turnInlineInputStub.on.calledWith("keydown")).toBe(true);
    });

    it("then proxies the input blur handler", function () {
        expect(stubbedJQueryProxy.proxy.calledWith(stubTurnScoreBlurEventHandler)).toBe(true);
    });

    it("then proxies the input keydown handler", function () {
        expect(stubbedJQueryProxy.proxy.calledWith(stubTurnScoreKeydownEventHandler)).toBe(true);
    });

    it("then the current turn score value is fetched", function () {
        expect(turnScoreCellSelectionResultStub.html.called).toBe(true);
    });


    it("then the input for the current turn score is creted with correct markuo", function () {
        expect(stubbedJQuery.calledWith('<input type="text" class="turnInput" maxlength="1" value="' + currentTurnScoreValue + '" />')).toBe(true);
    });

});

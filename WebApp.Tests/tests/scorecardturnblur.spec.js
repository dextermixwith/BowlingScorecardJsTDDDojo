/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../jasmine/jasmine.js" />

var scorecardTableNodeCollection = $('<table />');

var jQuerySpy;
var turnScoreCellSelectionResultStub;
var scorecard;
var blurEvent;
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
var proxiedClickHandler = function () { };

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

        jQuerySpy = jasmine.createSpy("jQuerySpy").andCallFake(
            function () {
                if (arguments[0] == "span.currentScoreValue") {
                    return currentTurnScoreValueStub;
                }
                if (arguments[0] == scoreTurnInputStub) {
                    return turnInlineInputStub;
                }
                return null;
            }
        );
        
        jQuerySpy.proxy = jasmine.createSpy("proxy").andReturn(proxiedClickHandler);

        stubScoreKeeper = jasmine.createSpyObj("stubScoreKeeper", ["updateScoreTurn"]);

        (new ScoreCard(scorecardTableNodeCollection, jQuerySpy, null, null, null, stubScoreKeeper)).turnScoreBlurHandler(blurEvent);
    });

    it("then fetches value of turn from turn input", function() {
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
    
    it("then removes score inline input from DOM", function() {
        expect(turnInlineInputStub.remove).toHaveBeenCalled();
    });
   
    it("then calls score keeper to update turn score", function() {
        expect(stubScoreKeeper.updateScoreTurn).toHaveBeenCalled();
    });
   
});

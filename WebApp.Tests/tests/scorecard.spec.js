/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />
/// <reference path="../jasmine/jasmine.js" />

describe("When a Score Card is Initialised", function () {
    var scorecard;
    
    beforeEach(function () {
        scorecard = new ScoreCard();
    });

    it("then has the current turn set to 1", function () {
        expect(scorecard.CurrentTurn).toEqual(1);
    });

});


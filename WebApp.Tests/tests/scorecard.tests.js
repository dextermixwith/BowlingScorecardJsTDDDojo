/// <reference path="../../WebApp/assets/js/jquery-1.7.2.min.js" />
/// <reference path="../../WebApp/assets/js/scorecard.js" />
/// <reference path="../sinon/sinon-1.4.2.js" />

var scoreCard = new ScoreCard();

test("Creating a scorecard has current score value of 0", function () {
    equal(scoreCard.CurrentScore, 0, "Current Score Should be 0");
});
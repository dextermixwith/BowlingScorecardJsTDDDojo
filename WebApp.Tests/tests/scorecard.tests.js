/// <reference path="../../WebApp/assets/js/scorecard.js" />
test("Creating a scorecard has current score value of 0", function () {
	equal(new ScoreCard().CurrentScore, 0, "Current Score Should be 0");
});
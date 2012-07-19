var ScoreCard = function (scoreCardTableNode, internalJQuery, turnScoreClickEventHandler) {
    this.CurrentTurn = 1;
    this.internalJQuery = internalJQuery || $;
    this.turnScoreClickEventHandler = turnScoreClickEventHandler;
    this.initialiseTable(scoreCardTableNode);
};

ScoreCard.prototype = {
    initialiseTable : function(scoreCardTableNode) {
   		this.internalJQuery("td.turnScore", scoreCardTableNode).on("click", this.turnScoreClickEventHandler);
    }
};
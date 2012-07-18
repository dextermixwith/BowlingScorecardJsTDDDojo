var ScoreCard = function (scoreCardTableNode, internalJQuery) {
    this.CurrentTurn = 1;
    this.internalJQuery = internalJQuery || $;
    this.initialiseTable(scoreCardTableNode);
};

ScoreCard.prototype = {
    initialiseTable : function(scoreCardTableNode) {
   		this.internalJQuery("td.turnScore", scoreCardTableNode);
    }
};
var ScoreCard = function (scoreCardTableNode, internalJQuery, injectedTurnScoreClickEventHandler, injectedJQueryProxy) {
    this.CurrentTurn = 1;
    this.internalJQuery = internalJQuery || $;
    this.jQueryForProxying = injectedJQueryProxy || $;
    this.turnScoreClickEventHandler = injectedTurnScoreClickEventHandler || this.turnScoreClickEventHandler ;
    this.initialiseTable(scoreCardTableNode);
};

ScoreCard.prototype = {
    initialiseTable : function(scoreCardTableNode) {
   		this.internalJQuery("td.turnScore", scoreCardTableNode)
   			.on("click", this.jQueryForProxying.proxy(this.turnScoreClickEventHandler, this));
    },
    turnScoreClickEventHandler : function(event) {

    }
};
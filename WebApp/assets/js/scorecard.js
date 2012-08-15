var ScoreCard = function (scoreCardTableNode, internalJQuery, injectedTurnScoreClickEventHandler, injectedJQueryForProxy) {
    this.CurrentTurn = 1;
    this.internalJQuery = internalJQuery || $;
    this.jQueryForProxying = injectedJQueryForProxy || $;
    this.turnScoreClickEventHandler = injectedTurnScoreClickEventHandler || this.turnScoreClickEventHandler ;
    this.initialiseTable(scoreCardTableNode);
};

ScoreCard.prototype = {
    initialiseTable : function(scoreCardTableNode) {
   		this.internalJQuery("td.turnScore", scoreCardTableNode)
   			.on("click", this.jQueryForProxying.proxy(this.turnScoreClickEventHandler, this));
    },
    turnScoreClickEventHandler : function(event) {
        var turnInlineInput = this.internalJQuery('<input type="text" class="turnInput" maxlength="1" />');
        turnInlineInput.on("blur", function(){});
        turnInlineInput.on("keydown", function(){})
        this.internalJQuery(event.currentTarget).empty();
    	this.internalJQuery(event.currentTarget).append(turnInlineInput);
        turnInlineInput.trigger("focus");
    }
};
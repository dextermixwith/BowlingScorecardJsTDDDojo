var ScoreCard = function (scoreCardTableNode, internalJQuery, injectedTurnScoreClickEventHandler, 
                    injectedJQueryForProxy, injectedTurnBlurHandler, injectedTurnKeydownHandler) {
    this.CurrentTurn = 1;
    this.internalJQuery = internalJQuery || $;
    this.jQueryForProxying = injectedJQueryForProxy || $;
    this.turnScoreClickEventHandler = injectedTurnScoreClickEventHandler || this.turnScoreClickEventHandler ;
    this.turnScoreBlurHandler = injectedTurnBlurHandler || this.turnScoreBlurHandler;
    this.turnKeydownHandler = injectedTurnKeydownHandler || this.turnKeydownHandler;

    this.initialiseTable(scoreCardTableNode);
};

ScoreCard.prototype = {
    initialiseTable : function(scoreCardTableNode) {
   		this.internalJQuery("td.turnScore", scoreCardTableNode)
   			.on("click", this.jQueryForProxying.proxy(this.turnScoreClickEventHandler, this));
    },
    turnScoreClickEventHandler : function(event) {
        var turnScore = this.internalJQuery(event.currentTarget).html();
        var turnInlineInput = this.internalJQuery('<input type="text" class="turnInput" maxlength="1" value="' + turnScore + '" />');
        turnInlineInput.on("blur", this.jQueryForProxying.proxy(this.turnScoreBlurHandler, this));
        turnInlineInput.on("keydown", this.jQueryForProxying.proxy(this.turnKeydownHandler, this));
        this.internalJQuery(event.currentTarget).empty();
    	this.internalJQuery(event.currentTarget).append(turnInlineInput);
        turnInlineInput.trigger("focus");
    },
    turnScoreBlurHandler : function(event) {
        var turnInlineInput = this.internalJQuery(event.currentTarget);
        turnInlineInput.filter(":parrent");
    },
    turnKeydownHandler : function(event) {
           
    }
};
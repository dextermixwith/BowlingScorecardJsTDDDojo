var ScoreCard = function (scoreCardTableNode, injectedJQuery, injectedTurnScoreClickEventHandler, 
                    injectedJQueryForProxy, injectedTurnBlurHandler, injectedTurnKeydownHandler,
                    scoreKeeper) {
    this.CurrentTurn = 1;
    this.$ = injectedJQuery || $;
    this.jQueryForProxying = injectedJQueryForProxy || $;
    this.turnScoreClickEventHandler = injectedTurnScoreClickEventHandler || this.turnScoreClickEventHandler ;
    this.turnScoreBlurHandler = injectedTurnBlurHandler || this.turnScoreBlurHandler;
    this.turnKeydownHandler = injectedTurnKeydownHandler || this.turnKeydownHandler;
    this.scoreKeeper = scoreKeeper;

    this.initialiseTable(scoreCardTableNode);
};

ScoreCard.prototype = {
    initialiseTable : function(scoreCardTableNode) {
   		this.$("td.turnScore", scoreCardTableNode)
   			.on("click", this.jQueryForProxying.proxy(this.turnScoreClickEventHandler, this));
    },
    turnScoreClickEventHandler : function(event) {
        var turnScore = this.$(event.currentTarget).html();
        var turnInlineInput = this.$('<input type="text" class="turnInput" maxlength="1" value="' + turnScore + '" />');
        turnInlineInput.on("blur", this.jQueryForProxying.proxy(this.turnScoreBlurHandler, this));
        turnInlineInput.on("keydown", this.jQueryForProxying.proxy(this.turnKeydownHandler, this));
        this.$(event.currentTarget).empty();
    	this.$(event.currentTarget).append(turnInlineInput);
        turnInlineInput.trigger("focus");
    },
    turnScoreBlurHandler : function(event) {
        this.finishTurnScoreEntry(event.currentTarget); 
    },
    turnKeydownHandler : function(event) {
        if (event.which == 13) {
            this.finishTurnScoreEntry(event.currentTarget); 
        } else {
            this.scoreKeeper.updateScoreTurn();
        }
    },
    finishTurnScoreEntry : function(turnScoreDOMInputNode) {
        var turnInlineInput = this.$(turnScoreDOMInputNode);
        turnInlineInput.before(turnInlineInput.val());
        turnInlineInput.remove();  
    }
};
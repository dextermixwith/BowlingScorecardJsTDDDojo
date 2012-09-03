var ScoreKeeper = function() {};

ScoreKeeper.prototype = {
    updateScoreTurn : function () {}    
};

var ScoreCard = function (scoreCardTableNode, injectedJQuery, injectedTurnScoreClickEventHandler, 
                    injectedJQueryForProxy, injectedTurnBlurHandler, injectedTurnKeydownHandler,
                    scoreKeeper) {
    this.CurrentTurn = 1;
    this.$ = injectedJQuery || $;
    this.jQueryForProxying = injectedJQueryForProxy || $;
    this.turnScoreClickEventHandler = injectedTurnScoreClickEventHandler || this.turnScoreClickEventHandler ;
    this.turnScoreBlurHandler = injectedTurnBlurHandler || this.turnScoreBlurHandler;
    this.turnKeydownHandler = injectedTurnKeydownHandler || this.turnKeydownHandler;
    this.scoreKeeper = scoreKeeper || new ScoreKeeper();

    this.initialiseTable(scoreCardTableNode);
};

ScoreCard.prototype = {
    initialiseTable : function(scoreCardTableNode) {
   		this.$("td.turnScore", scoreCardTableNode)
   			.on("click", this.jQueryForProxying.proxy(this.turnScoreClickEventHandler, this));
    },

    turnScoreClickEventHandler : function(event) {
        var turnScore = this.$('span.currentScoreValue', event.currentTarget).html();
        var turnInlineInput = this.$('<input type="text" class="turnInput" maxlength="1" value="' + turnScore + '" />');
        turnInlineInput.on("blur", this.jQueryForProxying.proxy(this.turnScoreBlurHandler, this));
        turnInlineInput.on("keydown", this.jQueryForProxying.proxy(this.turnKeydownHandler, this));
        this.$('span.currentScoreValue', event.currentTarget).hide();
    	this.$('span.currentScoreValue', event.currentTarget).after(turnInlineInput);
        turnInlineInput.trigger("focus");
    },
    
    turnScoreBlurHandler : function(event) {
        var turnScore = this.finishTurnScoreEntry(event.currentTarget); 
        this.scoreKeeper.updateScoreTurn(turnScore); 
    },

    turnKeydownHandler : function(event) {
        if (event.which == 13) {
            var turnScore = this.finishTurnScoreEntry(event.currentTarget); 
            this.scoreKeeper.updateScoreTurn(turnScore); 
        } else if (event.which == 27) {
            this.cancelTurnScoreEntry(event.currentTarget); 
        };  
     
    },
    
    finishTurnScoreEntry : function(turnScoreDOMInputNode) {
        var turnInlineInput = this.$(turnScoreDOMInputNode);
        var turnScore = turnInlineInput.val();
        var turnCell = turnInlineInput.parent();
        var currentScoreSpan = this.$('span.currentScoreValue', turnCell);
        currentScoreSpan.html(turnScore);
        currentScoreSpan.show();
        turnInlineInput.remove();  
        return turnScore;
    },
    
    cancelTurnScoreEntry : function(turnScoreDOMInputNode) {
        this.$(turnScoreDOMInputNode).remove();  
    }
};
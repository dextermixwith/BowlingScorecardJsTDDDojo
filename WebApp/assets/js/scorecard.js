var ScoreKeeper = function() {};

ScoreKeeper.prototype = {
    updateScoreTurn : function() {
        
    }    
};

var TurnScoreUI = function (scoreCardTableNode, injectedJQuery, turnScoreBlurHandler, turnKeydownHandler) {
    this.$ = injectedJQuery || $;
    this.scoreCardTableNode = scoreCardTableNode;
    this.turnScoreBlurHandler = turnScoreBlurHandler;
    this.turnKeydownHandler = turnKeydownHandler;
};

TurnScoreUI.prototype = {
    startTurn: function (turnScoreCurrentDOMTarget, turnBlurCallback, turnKeydownCallback) {
        var turnScoreCurrentDOMNode = this.$('span.currentScoreValue', turnScoreCurrentDOMTarget);
        var turnScore = turnScoreCurrentDOMNode.html();
        var turnInlineInput = this.$('<input type="text" class="turnInput" maxlength="1" value="' + turnScore + '" />');
        var blurProxy = this.$.proxy(turnBlurCallback, this);
        turnInlineInput.on("blur", blurProxy);
        var keyDownProxy = this.$.proxy(turnKeydownCallback, this);
        turnInlineInput.on("keydown", keyDownProxy);
        this.$('span.currentScoreValue', turnScoreCurrentDOMTarget).hide();
        this.$('span.currentScoreValue', turnScoreCurrentDOMTarget).after(turnInlineInput);
        turnInlineInput.trigger("focus");
    },

    finishTurn: function (turnScoreDOMInputNode, turnScoreUpdateCallback) {
        var turnInlineInput = this.$(turnScoreDOMInputNode);
        var turnScore = turnInlineInput.val();
        var turnCell = turnInlineInput.parent();
        var currentScoreSpan = this.$('span.currentScoreValue', turnCell);
        console.log(currentScoreSpan);
        currentScoreSpan.show();
        currentScoreSpan.html(turnScore);
        turnInlineInput.remove();
        turnScoreUpdateCallback(turnScore);
    },
    cancelTurn: function (turnScoreDOMInputNode) {
        var turnInlineInput = this.$(turnScoreDOMInputNode);
        var turnCell = turnInlineInput.parent();
        this.$('span.currentScoreValue', turnCell).show();
        turnInlineInput.remove();
    }
};

var ScoreCard = function (scoreCardTableNode, injectedJQuery, scoreKeeper, turnScoreUI) {
    this.$ = injectedJQuery || $;
    this.scoreKeeper = scoreKeeper || new ScoreKeeper();
    this.scoreCardTableNode = scoreCardTableNode;
    this.turnScoreUI = turnScoreUI || new TurnScoreUI(scoreCardTableNode, this.$);
};

ScoreCard.prototype = {
    initialise: function () {
        this.$("td.turnScore", this.scoreCardTableNode).on("click", this.$.proxy(this.handleTurnScoreClick, this));
    },

    handleTurnScoreClick: function (event) {
        this.turnScoreUI.startTurn(event.currentTarget, this.$.proxy(this.turnScoreBlurHandler, this), this.$.proxy(this.turnKeydownHandler, this));
    },

    turnScoreBlurHandler: function (event) {
        this.turnScoreUI.finishTurn(event.currentTarget, this.scoreKeeper.updateScoreTurn);
    },

    turnKeydownHandler: function (event) {
        if (event.which == 13) {
            this.turnScoreUI.finishTurn(event.currentTarget, this.scoreKeeper.updateScoreTurn);
        } else if (event.which == 27) {
            this.turnScoreUI.cancelTurn(event.currentTarget);
        };
    }
};
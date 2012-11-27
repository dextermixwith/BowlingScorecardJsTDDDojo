var ScoreKeeper = function() {};

ScoreKeeper.prototype = {
    updateScoreTurn : function () {}    
};

var TurnScoreUI = function (scoreCardTableNode, injectedJQuery, turnScoreBlurHandler, turnKeydownHandler) {
    this.$ = injectedJQuery || $;
    this.scoreCardTableNode = scoreCardTableNode;
    this.turnScoreBlurHandler = turnScoreBlurHandler;
    this.turnKeydownHandler = turnKeydownHandler;
};

TurnScoreUI.prototype = {
    startTurn: function (turnScoreCurrentDOMTarget) {
        var turnScoreCurrentDOMNode = this.$('span.currentScoreValue', turnScoreCurrentDOMTarget);
        var turnScore = turnScoreCurrentDOMNode.html();
        var turnInlineInput = this.$('<input type="text" class="turnInput" maxlength="1" value="' + turnScore + '" />');
        var blurProxy = this.$.proxy(this.turnScoreBlurHandler, this);
        turnInlineInput.on("blur", blurProxy);
        var keyDownProxy = this.$.proxy(this.turnKeydownHandler, this);
        turnInlineInput.on("keydown", keyDownProxy);
        this.$('span.currentScoreValue', turnScoreCurrentDOMTarget).hide();
        this.$('span.currentScoreValue', turnScoreCurrentDOMTarget).after(turnInlineInput);
        turnInlineInput.trigger("focus");
    }
};

var ScoreCard = function (scoreCardTableNode, injectedJQuery, injectedTurnScoreClickEventHandler,
                            injectedTurnBlurHandler, injectedTurnKeydownHandler, scoreKeeper, turnScoreUI) {
    this.CurrentTurn = 1;
    this.$ = injectedJQuery || $;
    this.turnScoreClickEventHandler = injectedTurnScoreClickEventHandler || this.turnScoreClickEventHandler;
    this.turnScoreBlurHandler = injectedTurnBlurHandler || this.turnScoreBlurHandler;
    this.turnKeydownHandler = injectedTurnKeydownHandler || this.turnKeydownHandler;
    this.scoreKeeper = scoreKeeper || new ScoreKeeper();
    this.scoreCardTableNode = scoreCardTableNode;
    this.turnScoreUI = turnScoreUI || new TurnScoreUI(scoreCardTableNode, this.$, this.turnScoreBlurHandler, this.turnKeydownHandler);
};

ScoreCard.prototype = {
    initialiseTable: function () {
        this.$("td.turnScore", this.scoreCardTableNode).on("click", this.$.proxy(this.turnScoreClickEventHandler, this));
    },

    handleTurnScoreClick: function (event) {
        this.turnScoreUI.startTurn(event.currentTarget, this.scoreKeeper.updateScoreTurn);
    },

    turnScoreClickEventHandler: function (event) {
        this.startTurnScoreEntry(event.currentTarget);
    },

    turnScoreBlurHandler: function (event) {
        var turnScore = this.finishTurnScoreEntry(event.currentTarget);
        this.scoreKeeper.updateScoreTurn(turnScore);
    },

    turnKeydownHandler: function (event) {
        if (event.which == 13) {
            var turnScore = this.finishTurnScoreEntry(event.currentTarget);
            this.scoreKeeper.updateScoreTurn(turnScore);
        } else if (event.which == 27) {
            this.cancelTurnScoreEntry(event.currentTarget);
        };
    },

    finishTurnScoreEntry: function (turnScoreDOMInputNode) {
        var turnInlineInput = this.$(turnScoreDOMInputNode);
        var turnScore = turnInlineInput.val();
        var turnCell = turnInlineInput.parent();
        var currentScoreSpan = this.$('span.currentScoreValue', turnCell);
        console.log(currentScoreSpan);
        currentScoreSpan.show();
        currentScoreSpan.html(turnScore);
        turnInlineInput.remove();
        return turnScore;
    },

    cancelTurnScoreEntry: function (turnScoreDOMInputNode) {
        var turnInlineInput = this.$(turnScoreDOMInputNode);
        var turnCell = turnInlineInput.parent();
        this.$('span.currentScoreValue', turnCell).show();
        turnInlineInput.remove();
    }
};
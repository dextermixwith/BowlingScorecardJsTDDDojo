class ScoreKeeper
	constructor ->
		
    updateScoreTurn ->

class ScoreCard
	constructor :(scoreCardTableNode, injectedJQuery, injectedTurnScoreClickEventHandler, injectedJQueryForProxy, injectedTurnBlurHandler, injectedTurnKeydownHandler, scoreKeeper) -> 
		@_CurrentTurn = 1
		@_$ = injectedJQuery || $
		@_jQueryForProxying = injectedJQueryForProxy || $
		@_turnScoreClickEventHandler = injectedTurnScoreClickEventHandler || this.turnScoreClickEventHandler
		@_turnScoreBlurHandler = injectedTurnBlurHandler || this.turnScoreBlurHandler
		@_turnKeydownHandler = injectedTurnKeydownHandler || this.turnKeydownHandler
		@_scoreKeeper = scoreKeeper || new ScoreKeeper
		@initialiseTable scoreCardTableNode
		
	@initialiseTable : (scoreCardTableNode) ->
		@_$("td.turnScore", scoreCardTableNode)
			.on "click", @_jQueryForProxying.proxy(this.turnScoreClickEventHandler, this)
	
	@turnScoreClickEventHandler : (event) ->
		turnScore = @_$('span.currentScoreValue', event.currentTarget).html()
		turnInlineInput = @_$('<input type="text" class="turnInput" maxlength="1" value="' + turnScore + '" />')
		turnInlineInput.on("blur", @_jQueryForProxying.proxy(@_turnScoreBlurHandler, @))
		turnInlineInput.on("keydown", @_jQueryForProxying.proxy(@_turnKeydownHandler, @))
		@_$('span.currentScoreValue', event.currentTarget).hide()
		@_$('span.currentScoreValue', event.currentTarget).after(turnInlineInput)
		turnInlineInput.trigger("focus")
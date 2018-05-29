'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors.
	var gameTitle = $('#gameTitle');
	var gameCategory = $('#gameCategory');
	var gameEstimate = $('#gameEstimate');
	var player = $('#playerContainer .playerText');
	var timerText = $('.timer');
	
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
		else updateSceneFields({
			game: 'The Beginning',
			category: ' ',
			estimate: ' ',
			teams: []
		});
	});
	
	// Sets information on the layout for the run.
	function updateSceneFields(runData) {
		animationSetField(player, formPlayerNamesString(runData));
		animationSetField(gameTitle, runData.game);
		animationSetField(gameCategory, runData.category);
		animationSetField(gameEstimate, runData.estimate);
		animationSetField(timerText); // Fade out/in the timer as well.
	}
});
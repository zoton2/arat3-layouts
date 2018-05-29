'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';

	// Starts a highlight if layout becomes active in OBS, if it becomes inactive it stops the highlight.
	window.obsstudio.onActiveChange = function(active) {
		if (active) nodecg.sendMessageToBundle('startTwitchHighlight', speedcontrolBundle);
		else nodecg.sendMessageToBundle('stopTwitchHighlight', speedcontrolBundle);
	};
});
'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors.
	var timerText = $('.timerContainer .timer');
	
	// Declaring other variables.
	var ignoreIndex = [];
	
	var stopwatch = nodecg.Replicant('stopwatch', speedcontrolBundle);
	stopwatch.on('change', (newVal, oldVal) => {
		if (!newVal) return;
		updateTimer(newVal, oldVal);
	});
	
	function updateTimer(newVal, oldVal) {
		var time = newVal.time || '88:88:88';
		
		timerText.each((index, element) => {
			if (!ignoreIndex.includes(index)) {
				// Change class on the timer to change the colour if needed.
				if (oldVal) $(element).toggleClass('timer_'+oldVal.state, false);
				$(element).toggleClass('timer_'+newVal.state, true);

				$(element).html(time);
				$(element).lettering(); // Makes each character into a <span>.
			}
		});
	}
	
	// Used to hide finish times for everyone.
	nodecg.listenFor('resetTime', speedcontrolBundle, () => {
		ignoreIndex = [];
	});
	
	// Used to hide finish timers just for the specified index.
	nodecg.listenFor('timerReset', speedcontrolBundle, index => {
		if (ignoreIndex.includes(parseInt(index))) {
			ignoreIndex.splice(ignoreIndex.indexOf(parseInt(index)), 1);
			var element = timerText.eq(index);
			element.toggleClass('timer_finished', false);
		}
	});
	
	// Used to show finish timers for the specified index.
	nodecg.listenFor('timerSplit', speedcontrolBundle, index => {
		ignoreIndex.push(parseInt(index));
		var element = timerText.eq(index);
		element.toggleClass('timer_finished', true);
	});
});
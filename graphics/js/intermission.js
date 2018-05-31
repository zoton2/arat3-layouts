'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';

	var gameArtImage = $('#gameArtImage');

	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.once('change', (newVal, oldVal) => {
		if (!oldVal) {
			// Do this on page startup.
			setNextGameCoverArt();
		}
	});

	// (As of writing) triggered from a dashboard button and also when a run's timer ends
	nodecg.listenFor('forceRefreshIntermission', speedcontrolBundle, () => {
		setNextGameCoverArt();
	});

	function setNextGameCoverArt() {
		var nextRun = getNextRuns(runDataActiveRun.value, 1);
		if (nextRun.length)
			nextRun = nextRun[0];
		else
			nextRun = null;

		if (nextRun) {
			if (nextRun.game === 'Cruis\'n') {
				var artURL = 'images/cruisn.jpg';
				gameArtImage.attr('src',artURL);
				gameArtImage.show();
			}

			else {
				var searchQuery = nextRun.game.replace('&', 'and'); // SASRT hack ;)
				if (searchQuery === 'Initial D' || searchQuery === 'Hydro Thunder')
					searchQuery += ' (PS1)';

					console.log(searchQuery)

				$.ajax({
					url: "https://www.speedrun.com/api/v1/games?name=" + searchQuery + "&limit=1",
					dataType: "jsonp",
					data: {
						q: searchQuery
					},
					success: function(result) {
						// We look for an exact match (case insensitive) here so games like super metroid fall back to twitch search instead
						if ((result.data.length > 0) && ((nextRun.game.toLowerCase() === result.data[0].names.international.toLowerCase() || searchQuery.toLowerCase() === result.data[0].names.international.toLowerCase()))) {
							var artURL = result.data[0].assets['cover-large'].uri;
							gameArtImage.attr('src',artURL);
							gameArtImage.show();
						} else {
							// no image found :(
							gameArtImage.hide();
						}
					},
					error: function() {
						console.log("Warning: Speedrun.com API call failed");
						gameArtImage.hide();
					}
				});
			}
		}

		else {
			gameArtImage.hide();
		}
	}
});
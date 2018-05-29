'use strict';

// Replicants
var runDataArray = nodecg.Replicant('runDataArray', 'nodecg-speedcontrol');

// Get the next X runs in the schedule.
function getNextRuns(runData, amount) {
	var nextRuns = [];
	var indexOfCurrentRun = findIndexInRunDataArray(runData);
	for (var i = 1; i <= amount; i++) {
		if (!runDataArray.value[indexOfCurrentRun+i]) break;
		nextRuns.push(runDataArray.value[indexOfCurrentRun+i]);
	}
	return nextRuns;
}

// Goes through each team and members and makes a string to show the names correctly together.
function formPlayerNamesString(runData) {
	var namesArray = [];
	var namesList = 'No Runner(s)';
	runData.teams.forEach(team => {
		var teamMemberArray = [];
		team.members.forEach(member => {teamMemberArray.push(member.names.international);});
		namesArray.push(teamMemberArray.join(', '));
	});
	if (namesArray.length) namesList = namesArray.join(' vs. ');
	return namesList;
}

// Find array index of current run based on it's ID.
function findIndexInRunDataArray(run) {
	var indexOfRun = -1;
	
	// Completely skips this if the run variable isn't defined.
	if (run) {
		for (var i = 0; i < runDataArray.value.length; i++) {
			if (run.runID === runDataArray.value[i].runID) {
				indexOfRun = i; break;
			}
		}
	}
	
	return indexOfRun;
}
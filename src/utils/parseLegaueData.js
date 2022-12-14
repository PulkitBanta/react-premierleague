const { compareDesc } = require("date-fns");

const CURRENT_DATE = "5 May 2021 14:00:00";

/**
 *
 * @param {*} score - difference in goals of two teams
 * @returns array with game state and points
 */
function getGameStatusAndPoints(score) {
  switch (true) {
    case score === 0:
      return ["D", 1];
    case score < 0:
      return ["L", 0];
    case score > 0:
      return ["W", 3];
  }
}

/**
 *
 * @param {*} teamScore - goals scored by the team
 * @param {*} opponentName - name of the opponent team
 * @param {*} opponentScore - goals scored by the opponent team
 * @param {*} dateOfEvent - date on which event was/is scheduled
 * @param {*} previousState - object with previous details for the team
 * @returns Object with gameStatuses, totalPoints, totalGoalDifference & fixtures
 */
function getEventDetails(
  teamScore,
  opponentName,
  opponentScore,
  dateOfEvent,
  previousState
) {
  const goalDifference = teamScore - opponentScore,
    [gameState, teamPoints] = getGameStatusAndPoints(goalDifference),
    isDiscarded = teamScore === null && opponentScore === null,
    isFutureEvent =
      compareDesc(new Date(dateOfEvent), new Date(CURRENT_DATE)) === -1;

  return {
    ...previousState,
    // games with score as null are not counted for Draw (assuming game didn'nt occurred) & are only added for the fixtures
    // having isDiscarded value to true
    // games which are in future are only considered for the fixtures
    ...(!isDiscarded && !isFutureEvent
      ? {
          gameStatuses: [...(previousState?.gameStatuses || []), gameState],
          totalPoints: (previousState?.totalPoints || 0) + teamPoints,
          totalGoalDifference:
            (previousState?.totalGoalDifference || 0) + goalDifference,
          gamesPlayed: (previousState?.gamesPlayed || 0) + 1,
        }
      : {}),
    fixtures: [
      ...(previousState?.fixtures || []),
      {
        date: dateOfEvent,
        opponent: opponentName,
        isDiscarded: isDiscarded && !isFutureEvent,
      },
    ],
  };
}

/**
 *
 * @param {*} leagueDataList List of the league data
 * @returns formatted object with the fixtures, gameStatuses, totalPoints, totalGoalDifference, games played
 */
export const parseLeagueData = (leagueDataList) => {
  // parse and format the data
  return leagueDataList.reduce((acc, leagueData) => {
    // getting team name and score from score object
    const [firstTeamName, secondTeamName] = Object.keys(leagueData.score);
    const [firstTeamScore, secondTeamScore] = Object.values(leagueData.score);

    // assigning values in the object with key name as team namme
    // keeping fixtures as the match played and status as the status of each game (W: Win, L: Loss, D: Draw)
    acc[firstTeamName] = getEventDetails(
      firstTeamScore,
      secondTeamName,
      secondTeamScore,
      leagueData.date,
      acc[firstTeamName] || {}
    );
    acc[secondTeamName] = getEventDetails(
      secondTeamScore,
      firstTeamName,
      firstTeamScore,
      leagueData.date,
      acc[secondTeamName] || {}
    );
    return acc;
  }, {});
};

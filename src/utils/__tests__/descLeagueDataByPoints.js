import descLeagueDataByPoints from "../descLeagueDataByPoints";

const mockLeagueData = {
  "Manchester United": {
    gameStatuses: ["L", "D"],
    totalPoints: 1,
    totalGoalDifference: -3,
    gamesPlayed: 2,
    fixtures: [
      {
        date: "2021-05-01T11:00:00",
        opponent: "Liverpool",
      },
      {
        date: "2021-05-05T11:00:00",
        opponent: "Liverpool",
      },
    ],
  },
  Liverpool: {
    gameStatuses: ["W", "D"],
    totalPoints: 4,
    totalGoalDifference: 3,
    gamesPlayed: 2,
    fixtures: [
      {
        date: "2021-05-01T11:00:00",
        opponent: "Manchester United",
      },
      {
        date: "2021-05-05T11:00:00",
        opponent: "Manchester United",
      },
    ],
  },
};

it("should sort leagueDetails by points in desc order", () => {
  const sortedData = descLeagueDataByPoints(mockLeagueData);
  expect(Object.keys(sortedData)).toStrictEqual([
    "Liverpool",
    "Manchester United",
  ]);
});

import { parseLeagueData } from "../parseLegaueData";

const mockLeagueData = [
  {
    score: { "Manchester United": null, Liverpool: null },
    date: "2021-05-11T11:00:00",
  },
];

it("should only create fixtures when the date is in future", () => {
  expect(parseLeagueData(mockLeagueData)).toEqual({
    "Manchester United": {
      fixtures: [
        {
          date: "2021-05-11T11:00:00",
          opponent: "Liverpool",
        },
      ],
    },
    Liverpool: {
      fixtures: [
        {
          date: "2021-05-11T11:00:00",
          opponent: "Manchester United",
        },
      ],
    },
  });
});

it("should only create fixtures if team score is null", () => {
  expect(
    parseLeagueData([{ ...mockLeagueData[0], date: "2021-05-01T11:00:00" }])
  ).toEqual({
    "Manchester United": {
      fixtures: [
        {
          date: "2021-05-01T11:00:00",
          opponent: "Liverpool",
        },
      ],
    },
    Liverpool: {
      fixtures: [
        {
          date: "2021-05-01T11:00:00",
          opponent: "Manchester United",
        },
      ],
    },
  });
});

it("should get all event details for both teams for one game", () => {
  expect(
    parseLeagueData([
      {
        score: { "Manchester United": 2, Liverpool: 1 },
        date: "2021-05-01T11:00:00",
      },
    ])
  ).toEqual({
    "Manchester United": {
      gameStatuses: ["W"],
      totalPoints: 3,
      totalGoalDifference: 1,
      gamesPlayed: 1,
      fixtures: [
        {
          date: "2021-05-01T11:00:00",
          opponent: "Liverpool",
        },
      ],
    },
    Liverpool: {
      gameStatuses: ["L"],
      totalPoints: 0,
      totalGoalDifference: -1,
      gamesPlayed: 1,
      fixtures: [
        {
          date: "2021-05-01T11:00:00",
          opponent: "Manchester United",
        },
      ],
    },
  });
});

it("should get all event details all teams with more than one game having different outcome", () => {
  expect(
    parseLeagueData([
      {
        score: { "Manchester United": 2, Liverpool: 1 },
        date: "2021-05-01T11:00:00",
      },
      {
        score: { "Manchester United": 1, Liverpool: 3 },
        date: "2021-05-04T11:00:00",
      },
      {
        score: { "Manchester United": 2, Liverpool: 2 },
        date: "2021-05-05T11:00:00",
      },
    ])
  ).toEqual({
    "Manchester United": {
      gameStatuses: ["W", "L", "D"],
      totalPoints: 4,
      totalGoalDifference: -1,
      gamesPlayed: 3,
      fixtures: [
        {
          date: "2021-05-01T11:00:00",
          opponent: "Liverpool",
        },
        {
          date: "2021-05-04T11:00:00",
          opponent: "Liverpool",
        },
        {
          date: "2021-05-05T11:00:00",
          opponent: "Liverpool",
        },
      ],
    },
    Liverpool: {
      gameStatuses: ["L", "W", "D"],
      totalPoints: 4,
      totalGoalDifference: 1,
      gamesPlayed: 3,
      fixtures: [
        {
          date: "2021-05-01T11:00:00",
          opponent: "Manchester United",
        },
        {
          date: "2021-05-04T11:00:00",
          opponent: "Manchester United",
        },
        {
          date: "2021-05-05T11:00:00",
          opponent: "Manchester United",
        },
      ],
    },
  });
});

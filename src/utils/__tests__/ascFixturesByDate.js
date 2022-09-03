import ascFixturesByDate from "../ascFixturesByDate";

it("should sort fixtures by date in asc order", () => {
  expect(
    ascFixturesByDate([
      {
        date: "2021-05-09T11:00:00",
        opponent: "teamA",
      },
      {
        date: "2021-05-05T11:00:00",
        opponent: "teamB",
      },
      {
        date: "2021-05-06T12:00:00",
        opponent: "teamC",
      },
      {
        date: "2021-05-06T11:00:00",
        opponent: "teamD",
      },
    ])
  ).toStrictEqual([
    {
      date: "2021-05-05T11:00:00",
      opponent: "teamB",
    },
    {
      date: "2021-05-06T11:00:00",
      opponent: "teamD",
    },
    {
      date: "2021-05-06T12:00:00",
      opponent: "teamC",
    },
    {
      date: "2021-05-09T11:00:00",
      opponent: "teamA",
    },
  ]);
});

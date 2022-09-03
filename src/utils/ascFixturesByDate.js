import { compareAsc } from "date-fns";

/**
 *
 * @param {*} fixtures
 * @returns fixture list sorted by the date in asc order
 */
export default function ascFixturesByDate(fixtures) {
  return fixtures.sort((a, b) =>
    compareAsc(new Date(a.date), new Date(b.date))
  );
}

/**
 *
 * @param {*} leagueData
 * @returns leagueData sorted by the points in desc order
 */
export default function descLeagueDataByPoints(leagueData) {
  return Object.fromEntries(
    Object.entries(leagueData).sort(
      ([, a], [, b]) => b.totalPoints - a.totalPoints
    )
  );
}

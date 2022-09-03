import { TAB_KEYS } from "../../constants/tabKeys";
import descLeagueDataByPoints from "../../utils/descLeagueDataByPoints";
import "./premierLeagueTable.styles.css";

export default function PremierLegaueTable({
  leagueData,
  setSelectedTeam,
  setActiveTab,
}) {
  // sort the leagueData based on the total points for each team
  const sortedLeagueData = descLeagueDataByPoints(leagueData);

  // change tab to fixture tab for particular team
  const handleOnRowClick = (teamName) => () => {
    setSelectedTeam(teamName);
    setActiveTab(TAB_KEYS.FIXTURE_TAB);
  };

  return (
    <div className="container">
      <h1>Premier League Table</h1>
      <table>
        <thead>
          <tr>
            <th className="team">Club</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GD</th>
            <th>Points</th>
            <th>Form</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(sortedLeagueData).map(([teamName, details]) => (
            <tr key={teamName} onClick={handleOnRowClick(teamName)}>
              <td className="team">{teamName}</td>
              <td>{details.gamesPlayed}</td>
              <td>
                {details.gameStatuses.filter((status) => status === "W").length}
              </td>
              <td>
                {details.gameStatuses.filter((status) => status === "D").length}
              </td>
              <td>
                {details.gameStatuses.filter((status) => status === "L").length}
              </td>
              <td>{details.totalGoalDifference}</td>
              <td>
                <b>{details.totalPoints}</b>
              </td>
              <td>
                {details.gameStatuses.map((status) => (
                  <span className={`form ${status}`}>{status}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

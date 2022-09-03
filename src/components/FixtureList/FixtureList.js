import { format } from "date-fns";
import { TAB_KEYS } from "../../constants/tabKeys";
import ascFixturesByDate from "../../utils/ascFixturesByDate";
import "./fixtureList.styles.css";

export default function FixtureList({ team, setActiveTab, fixtures }) {
  const ascSortedFixtures = ascFixturesByDate(fixtures);
  // handle click on the button & change the tab to premier league table
  const handleOnBackClick = () => {
    setActiveTab(TAB_KEYS.PREMIER_LEAGUE_TAB);
  };
  return (
    <div className="container">
      <button onClick={handleOnBackClick}>&#8701; Premier League Table</button>
      <h1>Fixtures for {team}</h1>
      {ascSortedFixtures.map((fixture) => (
        <div key={fixture.date} className="card">
          <h3>
            {format(new Date(fixture.date), "dd/MM, HH:mm")}
            {fixture.isDiscarded && "(Discarded)"}
          </h3>
          <div className="teams">
            {team} &#8623; {fixture.opponent}
          </div>
        </div>
      ))}
    </div>
  );
}

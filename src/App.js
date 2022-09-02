import { data } from "./constants/data";
import { useState } from "react";
import { parseLeagueData } from "./utils/parseLegaueData";
import PremierLegaueTable from "./components/PremierLeagueTable/PremierLeagueTable";
import { TAB_KEYS } from "./constants/tabKeys";
import "./styles.css";

export default function App() {
  // keep state of parsed leagueData & team selected for displaying the fixtures
  const leagueData = parseLeagueData(data),
    [activeTab, setActiveTab] = useState(TAB_KEYS.PREMIER_LEAGUE_TAB),
    [selectedTeam, setSelectedTeam] = useState();

  return (
    <>
      {activeTab === TAB_KEYS.PREMIER_LEAGUE_TAB && (
        <PremierLegaueTable
          {...{ leagueData, setActiveTab, setSelectedTeam }}
        />
      )}
      {activeTab === TAB_KEYS.FIXTURE_TAB && selectedTeam}
    </>
  );
}

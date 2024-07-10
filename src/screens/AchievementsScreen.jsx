import { Container } from "react-bootstrap";
import GettingStartedMain from "../components/GettingStartedMain";
import CaptaincyMain from "../components/CaptaincyMain";
import RankingMain from "../components/RankingMain";
import ScoreMain from "../components/ScoreMain";
const AchievementsScreen = () => {

  return (
    <>
    <Container>
      <h1 className="py-5">Achievements</h1>
      <div className="achievements">
        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Getting Started
          </summary>
          <GettingStartedMain />
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Captaincy
          </summary>
          <CaptaincyMain />
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Gameweek Ranking
          </summary>
          
          <RankingMain/>
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Gameweek Score
          </summary>
          <ScoreMain />
        </details>

      </div>
    </Container>
    </>
  );
};

export default AchievementsScreen;

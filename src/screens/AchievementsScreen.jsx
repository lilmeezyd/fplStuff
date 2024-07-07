import { Container } from "react-bootstrap";
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
          <div className="first">
          <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Hattrick hero</div>
                <div className="achieve-note">
                  A player in your team scores 3 or more goals
                </div>
              </div>
              <div>
                <div className="times"></div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Unlikely hero</div>
                <div className="achieve-note">
                  Goal Keeper scores a goal
                </div>
              </div>
              <div> 
                <div className="times"></div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Lethal strike force</div>
                <div className="achieve-note">
                  All your forwards score a goal in a gameweek
                </div>
              </div>
              <div>
                <div className="times"></div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">The main man</div>
                <div className="achieve-note">
                  Own the highest points scorer in a gameweek
                </div>
              </div>
              <div>
                <div className="times"></div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Solid at the back</div>
                <div className="achieve-note">
                  Your defence does not concede in a gameweek
                </div>
              </div>
              <div>
                <div className="times"></div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Captain fantastic</div>
                <div className="achieve-note">
                  Your captain is the highest points scorer in a gameweek
                </div>
              </div>
              <div>
                <div className="times"></div>
              </div>
            </div>
          </div>
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Captaincy
          </summary>
          <CaptaincyMain />
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Chips
          </summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Star Performances
          </summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
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

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Reaching the top
          </summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Epcot Center
          </summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Epcot Center
          </summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>
      </div>
    </Container>
    </>
  );
};

export default AchievementsScreen;

import { Container } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
const AchievementsScreen = () => {
  return (
    <Container>
      <h1 className="py-5">Achievements</h1>
      <div className="achievements">
        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Getting Started</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Captaincy</summary>
          <p>
            <div className="achieve-wrapper my-2">
              <div className="achieve-details">
                <div className="achieve-header">Sunday league skipper</div>
                <div className="achieve-note">Your captain scores more than 6 points</div>
              </div>
              <div><BiLock /></div>
            </div>
            <div className="achieve-wrapper my-2">
              <div className="achieve-details">
                <div className="achieve-header">Amateur skipper</div>
                <div className="achieve-note">Your captain scores more than 10 points</div>
              </div>
              <div><BiLock /></div>
            </div>
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Chips</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Star Performances</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Gameweek Ranking</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Gameweek Score</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Reaching the top</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Epcot Center</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{display: "flex", listStyle: "none"}}>Epcot Center</summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>
      </div>
    </Container>
  );
};

export default AchievementsScreen;

import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
const AchievementsScreen = () => {

  const [ picks, setPicks ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/10199/event/38/picks/`)
        const data = await response.data
        setPicks(data)
        console.log(data)
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message
        console.log(errMsg)
      }
    }

    fetchData()
  },[])
  
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
          <p className="first">
            <p className="achieve-wrapper my-1">
              <p className="achieve-details">
                <p className="achieve-header">Sunday league skipper</p>
                <p className="achieve-note">Your captain scores more than 6 points</p>
              </p>
              <p><BiLock /></p>
            </p>
            <p className="achieve-wrapper my-1">
              <p className="achieve-details">
                <p className="achieve-header">Amateur skipper</p>
                <p className="achieve-note">Your captain scores more than 10 points</p>
              </p>
              <p><BiLock /></p>
            </p>
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

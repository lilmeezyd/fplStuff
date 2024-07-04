import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
import { usePlayer } from "../PlayerContext"
import { usePlayerStats } from "../PlayerStatContext";
const AchievementsScreen = () => {
  const [picks, setPicks] = useState([]);
  const { teams, elementTypes, players, events } = usePlayer()
  const { playerStats } = usePlayerStats()
  console.log(playerStats)

  useEffect(() => {
    const a = [];
    for (let i = 1; i <= 38; i++) {
      a.push(i);
    }
    const picksArray = a.map(
      (x) =>
        `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/10199/event/${x}/picks/`
    );
    async function makeAPICall(endpoint) {
      const response = await axios.get(endpoint);
      const data = await response.data;
      return data;
    }
    async function makeCalls(endpoints) {
      const promises = endpoints.map(makeAPICall);
      const responses = await Promise.all(promises);
      return responses;
    }
    const fetchData = async () => {
      try {
        const response = await makeCalls(picksArray);
        setPicks(response);
        //console.log(response);
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message;
        console.log(errMsg);
      }
    };

    fetchData();
  }, []);

  //console.log(playerStats.find(player => player.history[0].element === 20)?.history.find(x => x.round === 3))

  const getCaptains = () => {
  
   const a3 = picks?.map(pick => {
      const y = Object.create({})
      const event = pick?.entry_history?.event
      const playerId = pick?.picks?.find(x => x.multiplier > 1)?.element
      const web_name = players?.find(x => x.id === playerId)?.web_name
      const stats = playerStats.find(player => player.history[0].element === playerId)?.history.find(x => x.round === event)
      //const teamId = players?.find(x => x.id === playerId).team
      //const elementTypeId = players?.find(x => x.id === playerId).element_type
      y.event = pick?.entry_history?.event
      y.captain = web_name
      y.total_points = stats?.total_points
      y.playerId = playerId
      return y
    })
    return a3
  }

  const sixOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 6)
  const tenOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 10)
  const sixteenOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 16)
  const twentyOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 20)
  const thirtyOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 30)
  const thirtyFiveOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 35)

  console.log(sixOrMore)
  

  console.log(sixOrMore)

  return (
    <Container>
      <h1 className="py-5">Achievements</h1>
      <div className="achievements">
        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Getting Started
          </summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Captaincy
          </summary>
          <div className="first">
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Sunday league skipper</div>
                <div className="achieve-note">
                  Your captain scores more than 6 points
                </div>
              </div>
              <div className="times">
                {sixOrMore.length > 0 ? sixOrMore.length : <BiLock />}
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Amateur skipper</div>
                <div className="achieve-note">
                  Your captain scores more than 10 points
                </div>
              </div>
              <div className="times">
              {tenOrMore.length > 0 ? tenOrMore.length : <BiLock />}
              </div>
            </div>
          </div>
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
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
        </details>

        <details>
          <summary style={{ display: "flex", listStyle: "none" }}>
            Gameweek Score
          </summary>
          <p>
            Epcot is a theme park at Walt Disney World Resort featuring exciting
            attractions, international pavilions, award-winning fireworks and
            seasonal special events.
          </p>
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
  );
};

export default AchievementsScreen;

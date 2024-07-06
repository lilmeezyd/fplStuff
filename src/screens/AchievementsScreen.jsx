import axios from "axios";
import { useEffect, useState, useMemo, useReducer, useCallback } from "react";
import { Container } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
import { usePlayer } from "../PlayerContext"
import { usePlayerStats } from "../PlayerStatContext";
import Captaincy from "../components/Captaincy";
const AchievementsScreen = () => {
  const [picks, setPicks] = useState([]);
  const [show, setShow] = useState(false)
  const { teams, elementTypes, players, events } = usePlayer()
  const { playerStats } = usePlayerStats()

  function reducer(state, action) {
    if(action.type === 'captain_by_6') {
      return {
        value: 6
      }
    }

    if(action.type === 'captain_by_10') {
      return {
        value: 10
      }
    }
  }
  const [ state, dispatch ] = useReducer(reducer, { value: 0})
  const { value } = state

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

  const handleClose = () => setShow(false)

  const handleSix = () => {
    setShow(true)
    dispatch({type: 'captain_by_6'})
  }

  const handleTen = () => {
    setShow(true)
    dispatch({type: 'captain_by_10'})
  }

  //console.log(playerStats.find(player => player.history[0].element === 20)?.history.find(x => x.round === 3))

  const getCaptains = useCallback(
    () => {
      const a3 = picks?.map(pick => {
        const y = Object.create({})
        const event = pick?.entry_history?.event
        const playerId = pick?.picks?.find(x => x.multiplier > 1)?.element
        const web_name = players?.find(x => x.id === playerId)?.web_name
        const stats = playerStats.find(player => player.history[0].element === playerId)?.history.find(x => x.round === event)
        const teamId = players?.find(x => x.id === playerId)?.team
        const playerTeam = teams?.find(x => x.id === teamId)?.short_name
        //const elementTypeId = players?.find(x => x.id === playerId).element_type
        y.event = pick?.entry_history?.event
        y.captain = web_name
        y.total_points = stats?.total_points
        y.playerId = playerId
        y.stats = stats
        y.goals_scored = stats?.goals_scored
        y.assists = stats?.assists
        y.yellow_cards = stats?.yellow_cards
        y.red_cards = stats?.red_cards
        y.penalties_saved = stats?.penalties_saved
        y.penalties_missed = stats?.penalties_missed
        y.opponent_team = teams?.find(x => x.id === stats?.opponent_team)?.short_name
        y.was_home = stats?.was_home
        y.own_goals = stats?.own_goals
        y.saves = stats?.saves
        y.playerTeam = playerTeam
        y.team_a_score  = stats?.team_a_score
        y.team_h_score = stats?.team_h_score
        y.bonus = stats?.bonus
  
        
        return y
      })
      return a3
    },
    [picks, playerStats, players, teams]
  )
  

  const captainDetails = useMemo(() => 
    getCaptains().filter(cap => (cap.total_points*2) >= value), [getCaptains, value])

  const sixOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 6)
  const tenOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 10)
  const sixteenOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 16)
  const twentyOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 20)
  const thirtyOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 30)
  const thirtyFiveOrMore = getCaptains().filter(cap => (cap.total_points*2) >= 35)

  return (
    <>
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
              <div>
                {sixOrMore.length > 0 ? 
                <div onClick={handleSix} className="times">{sixOrMore.length}</div> : <BiLock />}
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Amateur skipper</div>
                <div className="achieve-note">
                  Your captain scores more than 10 points
                </div>
              </div>
              <div onClick={handleTen} className="times">
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
    <Captaincy captainDetails={captainDetails} show={show} handleClose={handleClose} />
    </>
  );
};

export default AchievementsScreen;

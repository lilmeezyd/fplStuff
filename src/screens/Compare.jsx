import { Container, Button } from "react-bootstrap";
import { usePlayer } from "../PlayerContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Compare = () => {
  const { players, events } = usePlayer();
  const [ playersId, setPlayersId ] = useState({player1: 1, player2: 1})
  const [ playerData1, setPlayerData1 ] = useState({start1: '', end1: ''})
  const [ playerData2, setPlayerData2 ] = useState({start2: '', end2: ''})
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')

  const { player1, player2 } = playersId
  const { start1, end1 } = playerData1
  const { start2, end2 } = playerData2

  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await axios
          .get(`https://corsproxy.io/?https://fantasy.premierleague.com/api/element-summary/${player1}/`)
        const data = await response.data
        setData1(data)
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message
        //setError(errMsg)
      }

    }
    playerData()
  }, [player1])

  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await axios
          .get(`https://corsproxy.io/?https://fantasy.premierleague.com/api/element-summary/${player2}/`)
        const data = await response.data
        setData2(data)
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message
        //setError(errMsg)
      }

    }
    playerData()
  }, [player2])
  

  const playerFrom1 = (e) => {
    setPlayerData1((prevState => ({...prevState, start1:e.target.value})))
  }
  const playerTo1 = (e) => {
    setPlayerData1((prevState => ({...prevState, end1:e.target.value})))
  }
  const playerFrom2 = (e) => {
    setPlayerData2((prevState => ({...prevState, start2:e.target.value})))
  }
  const playerTo2 = (e) => {
    setPlayerData2((prevState => ({...prevState, end2:e.target.value})))
  }

  const compare = () => {
    const {history : history1} = data1
    const {history: history2} = data2
    const p1History = history1.filter(x => +x.round >= start1 && +x.round <= +end1)
    const p2History = history2.filter(x => +x.round >= start2 && +x.round <= +end2)
    const p1 = {minutes:p1History.reduce((x,y) => x+y.minutes,0),
       goals_scored:p1History.reduce((x,y) => x+y.goals_scored,0),
       assists:p1History.reduce((x,y) => x+y.assists,0),
       clean_sheets:p1History.reduce((x,y) => x+y.clean_sheets,0),
       own_goals:p1History.reduce((x,y) => x+y.own_goals,0),
      penalties_saved:p1History.reduce((x,y) => x+y.penalties_saved,0),
      penalties_missed:p1History.reduce((x,y) => x+y.penalties_missed,0),
      yellow_cards:p1History.reduce((x,y) => x+y.yellow_cards,0),
      red_cards:p1History.reduce((x,y) => x+y.red_cards,0),
      saves:p1History.reduce((x,y) => x+y.saves,0),
      starts:p1History.reduce((x,y) => x+y.starts,0),
      expected_goals:p1History.reduce((x,y) => x+(+y.expected_goals),0),
       expected_assists:p1History.reduce((x,y) => x+(+y.expected_assists),0),
       expected_goal_involvements:p1History.reduce((x,y) => x+(+y.expected_goal_involvements),0),
      expected_goals_conceded:p1History.reduce((x,y) => x+(+y.expected_goals_conceded),0)
    }
    const p2 = {minutes:p2History.reduce((x,y) => x+y.minutes,0),
      goals_scored:p2History.reduce((x,y) => x+y.goals_scored,0),
      assists:p2History.reduce((x,y) => x+y.assists,0),
      clean_sheets:p2History.reduce((x,y) => x+y.clean_sheets,0),
      own_goals:p2History.reduce((x,y) => x+y.own_goals,0),
     penalties_saved:p2History.reduce((x,y) => x+y.penalties_saved,0),
     penalties_missed:p2History.reduce((x,y) => x+y.penalties_missed,0),
     yellow_cards:p2History.reduce((x,y) => x+y.yellow_cards,0),
     red_cards:p2History.reduce((x,y) => x+y.red_cards,0),
     saves:p2History.reduce((x,y) => x+y.saves,0),
     starts:p2History.reduce((x,y) => x+y.starts,0),
     expected_goals:p2History.reduce((x,y) => x+(+y.expected_goals),0),
      expected_assists:p2History.reduce((x,y) => x+(+y.expected_assists),0),
      expected_goal_involvements:p2History.reduce((x,y) => x+(+y.expected_goal_involvements),0),
     expected_goals_conceded:p1History.reduce((x,y) => x+(+y.expected_goals_conceded),0)}
    console.log(`Player1: ${player1}, From: ${start1}, To: ${end1}`)
    console.log(`Player2: ${player2}, From: ${start2}, To: ${end2}`)
    setP1(p1)
    setP2(p2)
  }


  const nEvents = events.map(event => event.finished && event.id).sort((x, y) => x.id > y.id ? -1 : 1)
  return (
    <Container>
      <h4 className="p-2">Select players to compare</h4>
      <div className="playerison">
        <select onChange={(e) => setPlayersId((prevState) => ({...prevState, player1: e.target.value}))} className="custom-select" name="" id="">
          {players.map((player) => (
            <option value={player.id} key={player.id}>{player.web_name}</option>
          ))}
        </select>
        <select onChange={(e) => setPlayersId((prevState) => ({...prevState, player2: e.target.value}))} className="custom-select" name="" id="">
          {players.map((player) => (
            <option value={player.id} key={player.id}>{player.web_name}</option>
          ))}
        </select>
      </div>
      <h4 className="p-2">Select Gameweeks range</h4>
      <div className="range-wrapper">
        <div className="range-contents">
          <div className="form-group">
          <label htmlFor="player-from-1">From&nbsp;</label>
          <select onChange={playerFrom1} className="custom-select-2" name="player-from-1" id="player-from-1">
            {nEvents.map((event, idx) => (
              <option value={event} key={idx}>GW{event}</option>
            ))}
          </select>
          </div>
          <div className="form-group">
          <label htmlFor="player-to-1">To&nbsp;</label>
            <select onChange={playerTo1}  className="custom-select-2" name="player-to-1" id="player-to-1">
            {nEvents.map((event, idx) => (
              <option value={event} key={idx}>GW{event}</option>
            ))}
          </select></div>
          
        </div>
        <div className="range-contents">
          <div className="form-group">
          <label htmlFor="player-from-2">From&nbsp;</label>
          <select onChange={playerFrom2}  className="custom-select-2" name="player-from-2" id="player-from-2">
            {nEvents.map((event, idx) => (
              <option value={event} key={idx}>GW{event}</option>
            ))}
          </select>
          </div>
          <div className="form-group">
          <label htmlFor="player-to-2">To&nbsp;</label>
            <select onChange={playerTo2}  className="custom-select-2" name="player-to-2" id="player-to-2">
            {nEvents.map((event, idx) => (
              <option value={event} key={idx}>GW{event}</option>
            ))}
          </select></div>
          
        </div>
      </div>
      <div className="p-2">
        <Button disabled={!player1||!player2||!start1||!end1||!start2||!end2} onClick={compare}>Compare</Button>
      </div>
      <h4 className="p-2">Player Statistics</h4>
      {<>
        <h6 className="p-2">Minutes</h6>
      <div className="p-1 compare-stat-wrap">
      <div>
          <div 
          style={{width: (p1.minutes/(p1.minutes+p2.minutes)*100)+'%',
            background: 'blue', padding: 0.3+'rem'
          }}>{p1.minutes}</div></div>
        <div>
          <div style={{width: (p2.minutes/(p1.minutes+p2.minutes)*100)+'%',
            background: 'red', padding: 0.3+'rem'
          }}>{p2.minutes}</div></div>
      </div>
      <h6 className="p-2">Goals</h6>
      <div className="p-1 compare-stat-wrap">
        <div>
          <div 
          style={{width: (p1.goals_scored/(p1.goals_scored+p2.goals_scored)*100)+'%',
            background: 'blue', padding: 0.3+'rem'
          }}>{p1.goals_scored}</div></div>
        <div>
          <div style={{width: (p2.goals_scored/(p1.goals_scored+p2.goals_scored)*100)+'%',
            background: 'red', padding: 0.3+'rem'
          }}>{p2.goals_scored}</div></div>
      </div>
      <h6 className="p-2">Assists</h6>
      <div className="p-1 compare-stat-wrap">
        <div>
          <div 
          style={{width: (p1.assists/(p1.assists+p2.assists)*100)+'%',
            background: 'blue', padding: 0.3+'rem'
          }}>{p1.assists}</div></div>
        <div>
          <div style={{width: (p2.assists/(p1.assists+p2.assists)*100)+'%',
            background: 'red', padding: 0.3+'rem'
          }}>{p2.assists}</div></div>
      </div>
      </>}
      
    </Container>
  );
};

export default Compare;

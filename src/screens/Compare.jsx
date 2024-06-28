import { Container, Spinner} from "react-bootstrap";
import { usePlayer } from "../PlayerContext";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Legend,
  ResponsiveContainer
 } from "recharts";

const Compare = () => {
  const { players, events, elementTypes, teams } = usePlayer();
  const [playersId, setPlayersId] = useState({ player1: 1, player2: 1 });
  const [playerData1, setPlayerData1] = useState({ start1: 1, end1: 1 });
  const [playerData2, setPlayerData2] = useState({ start2: 1, end2: 1 });
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [graph, setGraph] = useState(false)
  const [stat, setStat] = useState(true)
  const [error, setError] = useState('')
  const [error1, setError1] = useState('')

  const { player1, player2 } = playersId;
  const { start1, end1 } = playerData1;
  const { start2, end2 } = playerData2;

  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await axios.get(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/element-summary/${player1}/`
        );
        const data = await response.data;
        setData1(data);
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message;
        setError(errMsg)
      }
    };
    playerData();
  }, [player1]);

  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await axios.get(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/element-summary/${player2}/`
        );
        const data = await response.data;
        setData2(data);
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message;
        setError1(errMsg)
      }
    };
    playerData();
  }, [player2]);

  const playersToCompare = useMemo(() => {
    const playerId1 = players.find(player => player.id === +player1)
    const playerId2 = players.find(player => player.id === +player2)
    const player1Team = teams.find(team => team.id === playerId1.team)?.name
    const player2Team = teams.find(team => team.id === playerId2.team)?.name
    const position1 = elementTypes.find(x => x.id === playerId1.element_type)?.singular_name
    const position2 = elementTypes.find(x => x.id === playerId2.element_type)?.singular_name
    const playerToCompare1 = {
      name: playerId1?.web_name, team: player1Team,
      position: position1
    }
    const playerToCompare2 = {
      name: playerId2?.web_name, team: player2Team,
      position: position2
    }

    return {
      playerToCompare1, playerToCompare2
    }

  }, [player1, player2, players, teams, elementTypes])

  const { playerToCompare1, playerToCompare2 } = playersToCompare

  const playerFrom1 = (e) => {
    if(+e.target.value > +end1) {
      setPlayerData1({end1: +e.target.value, start1: end1
      })
  } else {
    setPlayerData1((prevState) => ({ ...prevState, start1: +e.target.value }));
  }
  };
  const playerTo1 = (e) => {
    if(+e.target.value < +start1) {
      setPlayerData1(prevState => ({
          ...prevState, end1: start1, start1: +e.target.value
      }))
  } else {
    setPlayerData1((prevState) => ({ ...prevState, end1: +e.target.value }));
  }
  };
  const playerFrom2 = (e) => {
    if(+e.target.value > +end2) {
      setPlayerData2({end2: +e.target.value, start2: end2
      })
  } else {
    setPlayerData2((prevState) => ({ ...prevState, start2: +e.target.value }));
  }
  };
  const playerTo2 = (e) => {
    if(+e.target.value < +start2) {
      setPlayerData2(prevState => ({
          ...prevState, end2: start2, start2: +e.target.value
      }))
  } else {
    setPlayerData2((prevState) => ({ ...prevState, end2: +e.target.value }));
  }
  };

  const compare = useMemo(() => {
    const { history: history1 } = data1;
    const { history: history2 } = data2;
    const p1History = history1?.filter(
      (x) => +x.round >= start1 && +x.round <= +end1
    );
    const p2History = history2?.filter(
      (x) => +x.round >= start2 && +x.round <= +end2
    );
    const p1 = {
      minutes: p1History?.reduce((x, y) => x + y.minutes, 0),
      total_points: p1History?.reduce((x,y) => x + y.total_points, 0),
      goals_scored: p1History?.reduce((x, y) => x + y.goals_scored, 0),
      assists: p1History?.reduce((x, y) => x + y.assists, 0),
      clean_sheets: p1History?.reduce((x, y) => x + y.clean_sheets, 0),
      own_goals: p1History?.reduce((x, y) => x + y.own_goals, 0),
      penalties_saved: p1History?.reduce((x, y) => x + y.penalties_saved, 0),
      penalties_missed: p1History?.reduce((x, y) => x + y.penalties_missed, 0),
      yellow_cards: p1History?.reduce((x, y) => x + y.yellow_cards, 0),
      red_cards: p1History?.reduce((x, y) => x + y.red_cards, 0),
      saves: p1History?.reduce((x, y) => x + y.saves, 0),
      starts: p1History?.reduce((x, y) => x + y.starts, 0),
      expected_goals: p1History?.reduce((x, y) => x + +y.expected_goals, 0),
      expected_assists: p1History?.reduce((x, y) => x + +y.expected_assists, 0),
      expected_goal_involvements: p1History?.reduce(
        (x, y) => x + +y.expected_goal_involvements,
        0
      ),
      expected_goals_conceded: p1History?.reduce(
        (x, y) => x + +y.expected_goals_conceded,
        0
      ),
    };
    const p2 = {
      minutes: p2History?.reduce((x, y) => x + y.minutes, 0),
      total_points: p2History?.reduce((x,y) => x + y.total_points, 0),
      goals_scored: p2History?.reduce((x, y) => x + y.goals_scored, 0),
      assists: p2History?.reduce((x, y) => x + y.assists, 0),
      clean_sheets: p2History?.reduce((x, y) => x + y.clean_sheets, 0),
      own_goals: p2History?.reduce((x, y) => x + y.own_goals, 0),
      penalties_saved: p2History?.reduce((x, y) => x + y.penalties_saved, 0),
      penalties_missed: p2History?.reduce((x, y) => x + y.penalties_missed, 0),
      yellow_cards: p2History?.reduce((x, y) => x + y.yellow_cards, 0),
      red_cards: p2History?.reduce((x, y) => x + y.red_cards, 0),
      saves: p2History?.reduce((x, y) => x + y.saves, 0),
      starts: p2History?.reduce((x, y) => x + y.starts, 0),
      expected_goals: p2History?.reduce((x, y) => x + +y.expected_goals, 0),
      expected_assists: p2History?.reduce((x, y) => x + +y.expected_assists, 0),
      expected_goal_involvements: p2History?.reduce(
        (x, y) => x + +y.expected_goal_involvements,
        0
      ),
      expected_goals_conceded: p1History?.reduce(
        (x, y) => x + +y.expected_goals_conceded,
        0
      ),
    };
    return { p1, p2}
  }, [data1, data2, start1, start2, end1, end2 ])

  const onStat = () => {
    if(stat === false) {
      setStat(true)
      setGraph(false)
    }
  }
  const onGraph = () => {
    if(graph === false) {
      setGraph(true)
      setStat(false)
    }
  }
  const { p1, p2 } = compare
  const nEvents = events
    .filter((event) => event.finished)
    .map(event => event.id)
    .sort((x, y) => (x.id > y.id ? 1 : -1));
    console.log(nEvents)
  
  const data = [
    {"param" : "Minutes", 
      "player1":p1.minutes/135, "player2":p2.minutes/135 },
      {"param" : "Points","player1":p1.total_points/10, "player2":p2.total_points/10
      },
    {"param" : "Goals","player1":p1.goals_scored, "player2":p2.goals_scored},
    {"param" : "xG","player1":p1.expected_goals, "player2":p2.expected_goals},
    {"param" : "xA","player1":p1.expected_assists, "player2":p2.expected_assists},
    {"param" : "xGi","player1":p1.expected_goal_involvements, "player2":p2.expected_goal_involvements},
    {"param" : "xGc","player1":p1.expected_goals_conceded, "player2":p2.expected_goals_conceded},
    {"param" : "Saves","player1":p1.saves, "player2":p2.saves}]
  return (
    <Container>
    {players.length === 0 && error === '' && error1 === '' && <div className="py-5"><Spinner/></div>}
    {(error === 'Network Error' || error1 === 'Network Error')  && 
    <div className="py-5">Check your internet connection!</div>}
      {players.length > 0 &&  <>
      <h4 style={{fontWeight: 700}} className="p-2">Select players to compare</h4>
      <div className="playerison">
        <div className="player-wrapper">
        <select
          defaultValue='1'
          className="custom-select"
          name=""
          onChange={(e) =>
            setPlayersId((prevState) => ({
              ...prevState,
              player1: e.target.value,
            }))
          }
        >
          {players.map((player) => (
            <option value={player.id} key={player.id}>
              {player.web_name} 
            </option>
          ))}
        </select>
        {playerToCompare1 && <div className="player-details">
          <div className="details">
            <div>Name</div>
            <div>{playerToCompare1.name}</div>
          </div>
          <div className="details">
            <div>Team</div>
            <div>{playerToCompare1.team}</div>
          </div>
          <div className="details">
            <div>Position</div>
            <div>{playerToCompare1.position}</div>
          </div>
        </div>}
        </div>
        <div className="player-wrapper">
        <select
          onChange={(e) =>
            setPlayersId((prevState) => ({
              ...prevState,
              player2: e.target.value,
            }))
          }
          className="custom-select"
          defaultValue='1'
          name=""
          id=""
        >
          {players.map((player) => (
            <option value={player.id} key={player.id}>
              {player.web_name}
            </option>
          ))}
        </select>
        {playerToCompare2 && <div className="player-details">
          <div className="details">
            <div>Name</div>
            <div>{playerToCompare2.name}</div>
          </div>
          <div className="details">
            <div>Team</div>
            <div>{playerToCompare2.team}</div>
          </div>
          <div className="details">
            <div>Position</div>
            <div>{playerToCompare2.position}</div>
          </div>
        </div>}
        </div>
        
        
      </div>
      <div className="comparison">
      <div onClick={onStat} style={{fontWeight: 700}} className="p-2">Select Gameweeks range for {playerToCompare1.name}</div>
      <div onClick={onGraph} style={{fontWeight: 700}} className="p-2">Select Gameweeks range for {playerToCompare2.name}</div>
      </div>
      
      <div className="range-wrapper">
        <div className="range-contents">
          <div className="form-group">
            <label htmlFor="player-from-1">From&nbsp;</label>
            <select
              onChange={playerFrom1}
              className="custom-select-2"
              name="player-from-1"
              id="player-from-1"
              value={start1}
            >
              {nEvents.map((event, idx) => (
                <option value={event} key={idx}>
                  GW{event}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="player-to-1">To&nbsp;</label>
            <select
              onChange={playerTo1}
              className="custom-select-2"
              name="player-to-1"
              id="player-to-1"
              value={end1}
            >
              {nEvents.map((event, idx) => (
                <option value={event} key={idx}>
                  GW{event}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="range-contents">
          <div className="form-group">
            <label htmlFor="player-from-2">From&nbsp;</label>
            <select
              onChange={playerFrom2}
              className="custom-select-2"
              name="player-from-2"
              id="player-from-2"
              value={start2}
            >
              {nEvents.map((event, idx) => (
                <option value={event} key={idx}>
                  GW{event}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="player-to-2">To&nbsp;</label>
            <select
              onChange={playerTo2}
              className="custom-select-2"
              name="player-to-2"
              id="player-to-2"
              value={end2}
            >
              {nEvents.map((event, idx) => (
                <option value={event} key={idx}>
                  GW{event}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="compare-tabs">
      <div onClick={onStat} style={{fontWeight: 700}} 
      className={`p-2 ${stat === true && 'select-active'}`}>Player Statistics</div>
      <div onClick={onGraph} style={{fontWeight: 700}}
       className={`p-2 ${graph === true && 'select-active'}`}>Graphical display</div>
      </div>
      {
        stat &&
        <>
          <div className="player-stats">
            <div>{p1.minutes}</div>
            <div>Minutes</div>
            <div>{p2.minutes}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width: p1.minutes > 0 ? (p1.minutes / (p1.minutes + p2.minutes)) * 100 + "%": 0+'%',
                background: p1.minutes > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width: p2.minutes > 0 ? (p2.minutes / (p1.minutes + p2.minutes)) * 100 + "%" : 0+'%',
                background: p2.minutes > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className="player-stats">
            <div>{p1.total_points}</div>
            <div>Points</div>
            <div>{p2.total_points}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width: p1.total_points > 0 ? (p1.total_points / (p1.total_points + p2.total_points)) * 100 + "%": 0+'%',
                background: p1.total_points > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width: p2.total_points > 0 ? (p2.total_points / (p1.total_points + p2.total_points)) * 100 + "%" : 0+'%',
                background: p2.total_points > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className="player-stats">
            <div>{p1.goals_scored}</div>
            <div>Goals</div>
            <div>{p2.goals_scored}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.goals_scored > 0 ? (p1.goals_scored / (p1.goals_scored + p2.goals_scored)) *
                    100 +
                  "%": 0+'%',
                background: p1.goals_scored > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.goals_scored > 0 ? (p2.goals_scored / (p1.goals_scored + p2.goals_scored)) *
                    100 +
                  "%": 0+'%',
                background: p2.goals_scored > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className="player-stats">
            <div>{p1.assists}</div>
            <div>Assists</div>
            <div>{p2.assists}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.assists > 0 ? (p1.assists / (p1.assists + p2.assists)) *
                    100 +
                  "%": 0+'%',
                background: p1.assists > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.assists > 0 ? (p2.assists / (p1.assists + p2.assists)) *
                    100 +
                  "%" : 0+'%',
                background: p2.assists > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.clean_sheets}</div>
            <div>Clean Sheets</div>
            <div>{p2.clean_sheets}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.clean_sheets > 0 ? (p1.clean_sheets / (p1.clean_sheets + p2.clean_sheets)) *
                    100 +
                  "%": 0+'%',
                background: p1.clean_sheets > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.clean_sheets > 0 ? (p2.clean_sheets / (p1.clean_sheets + p2.clean_sheets)) *
                    100 +
                  "%" : 0+'%',
                background: p2.clean_sheets > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.own_goals}</div>
            <div>Own Goals</div>
            <div>{p2.own_goals}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.own_goals > 0 ? (p1.own_goals / (p1.own_goals + p2.own_goals)) *
                    100 +
                  "%": 0+'%',
                background: p1.own_goals > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.own_goals > 0 ? (p2.own_goals / (p1.own_goals + p2.own_goals)) *
                    100 +
                  "%" : 0+'%',
                background: p2.own_goals > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.penalties_saved}</div>
            <div>Penalties Saved</div>
            <div>{p2.penalties_saved}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.penalties_saved > 0 ?
                 (p1.penalties_saved / (p1.penalties_saved + p2.penalties_saved)) *
                    100 +
                  "%": 0+'%',
                background: p1.penalties_saved > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.penalties_saved > 0 ? 
                (p2.penalties_saved / (p1.penalties_saved + p2.penalties_saved)) *
                    100 +
                  "%" : 0+'%',
                background: p2.penalties_saved > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.penalties_missed}</div>
            <div>Penalties Missed</div>
            <div>{p2.penalties_missed}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.penalties_missed > 0 ? 
                (p1.penalties_missed / (p1.penalties_missed + p2.penalties_missed)) *
                    100 +
                  "%": 0+'%',
                background: p1.penalties_missed > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.penalties_missed > 0 ? 
                (p2.penalties_missed / (p1.penalties_missed + p2.penalties_missed)) *
                    100 +
                  "%" : 0+'%',
                background: p2.penalties_missed > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.yellow_cards}</div>
            <div>Yellow Cards</div>
            <div>{p2.yellow_cards}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.yellow_cards > 0 ? (p1.yellow_cards / (p1.yellow_cards + p2.yellow_cards)) *
                    100 +
                  "%": 0+'%',
                background: p1.yellow_cards > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.yellow_cards > 0 ? (p2.yellow_cards / (p1.yellow_cards + p2.yellow_cards)) *
                    100 +
                  "%" : 0+'%',
                background: p2.yellow_cards > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.red_cards}</div>
            <div>Red Cards</div>
            <div>{p2.red_cards}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.red_cards > 0 ? (p1.red_cards / (p1.red_cards + p2.red_cards)) *
                    100 +
                  "%": 0+'%',
                background: p1.red_cards > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.red_cards > 0 ? (p2.red_cards / (p1.red_cards + p2.red_cards)) *
                    100 +
                  "%" : 0+'%',
                background: p2.red_cards > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.saves}</div>
            <div>Saves</div>
            <div>{p2.saves}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.saves > 0 ? (p1.saves / (p1.saves + p2.saves)) *
                    100 +
                  "%": 0+'%',
                background: p1.saves > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.saves > 0 ? (p2.saves / (p1.saves + p2.saves)) *
                    100 +
                  "%" : 0+'%',
                background: p2.saves > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.starts}</div>
            <div>Starts</div>
            <div>{p2.starts}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.starts > 0 ? (p1.starts / (p1.starts + p2.starts)) *
                    100 +
                  "%": 0+'%',
                background: p1.starts > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.starts > 0 ? (p2.starts / (p1.starts + p2.starts)) *
                    100 +
                  "%" : 0+'%',
                background: p2.starts > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.expected_goals?.toFixed(2)}</div>
            <div>xG</div>
            <div>{p2.expected_goals?.toFixed(2)}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.expected_goals > 0 ? (p1.expected_goals / (p1.expected_goals + p2.expected_goals)) *
                    100 +
                  "%": 0+'%',
                background: p1.expected_goals > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.expected_goals > 0 ? (p2.expected_goals / (p1.expected_goals + p2.expected_goals)) *
                    100 +
                  "%" : 0+'%',
                background: p2.expected_goals > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.expected_assists?.toFixed(2)}</div>
            <div>xA</div>
            <div>{p2.expected_assists?.toFixed(2)}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.expected_assists > 0 ? (p1.expected_assists / (p1.expected_assists + p2.expected_assists)) *
                    100 +
                  "%": 0+'%',
                background: p1.expected_assists > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.expected_assists > 0 ? (p2.expected_assists / (p1.expected_assists + p2.expected_assists)) *
                    100 +
                  "%" : 0+'%',
                background: p2.expected_assists > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
          <div className=" player-stats">
            <div>{p1.expected_goal_involvements?.toFixed(2)}</div>
            <div>xGi</div>
            <div>{p2.expected_goal_involvements?.toFixed(2)}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.expected_goal_involvements > 0 ? 
                (p1.expected_goal_involvements / (p1.expected_goal_involvements + p2.expected_goal_involvements)) *
                    100 +
                  "%": 0+'%',
                background: p1.expected_goal_involvements > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.expected_goal_involvements > 0 ?
                 (p2.expected_goal_involvements / (p1.expected_goal_involvements + p2.expected_goal_involvements)) *
                    100 +
                  "%" : 0+'%',
                background: p2.expected_goal_involvements > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>

          <div className=" player-stats">
            <div>{p1.expected_goals_conceded?.toFixed(2)}</div>
            <div>xGc</div>
            <div>{p2.expected_goals_conceded?.toFixed(2)}</div>
          </div>
          <div className="compare-stat-wrap">
            <div
              style={{
                width:
                p1.expected_goals_conceded > 0 ? 
                (p1.expected_goals_conceded / (p1.expected_goals_conceded + p2.expected_goals_conceded)) *
                    100 +
                  "%": 0+'%',
                background: p1.expected_goals_conceded > 0 && "blue",
                padding: 0.3 + "rem",
              }}
              className="player-one"
            ></div>
            <div
              style={{
                width:
                p2.expected_goals_conceded > 0 ?
                 (p2.expected_goals_conceded / (p1.expected_goals_conceded + p2.expected_goals_conceded)) *
                    100 +
                  "%" : 0+'%',
                background: p2.expected_goals_conceded > 0 && "red",
                padding: 0.3 + "rem",
              }}
              className="player-two"
            ></div>
          </div>
        </>
      }
      {graph && <div className="graph-view">
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={90} width={500} height={250} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="param" />
          <PolarRadiusAxis angle={30}  />
          <Radar name={playerToCompare1.name} dataKey="player1" stroke="red" fill="red" fillOpacity={0.6} />
          <Radar name={playerToCompare2.name} dataKey="player2" stroke="blue" fill="blue" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
        </ResponsiveContainer>
        </div>}
        </>}
    </Container>
  );
};

export default Compare;

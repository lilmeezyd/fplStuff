import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { usePlayer } from "../PlayerContext"
import { useNavigate } from "react-router-dom"
import { Modal, Spinner } from "react-bootstrap"
import axios from "axios"
const PlayerScreen = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [show, setShow] = useState(false);
  const [gwStat, setGwStat] = useState('')

  const { teams, elementTypes, players } = usePlayer()
  const { playerId } = useParams()
  const navigate = useNavigate()
  const player = players.find(player => player.id === +playerId)
  const team = player && teams.find(team => team.id === player.team).name
  const elementType = player && elementTypes.find(x => x.id === player.element_type).singular_name
  useEffect(() => {
    const playerData = async () => {
      try {
        const response = await axios
          .get(`https://corsproxy.io/?https://fantasy.premierleague.com/api/element-summary/${playerId}/`)
        const data = await response.data
        //console.log(data)
        setData(data)
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message
        setError(errMsg)
      }

    }
    playerData()
  }, [playerId])
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { history } = data
  const rounds = history?.map(x => `GW${x.round}`)
  const opponents = history?.map(x => teams?.find(y => y.id === x.opponent_team)?.short_name)
 
  const handleClick = (a) => {
   handleShow()
   setGwStat(a)
   console.log(a)
    }
  
  

  if (players.length === 0) return <h1>Loading...</h1>
  if (!player) navigate('/statistics/players/1')
  return (
    <>
      <div className="player-header my-4">
        <h3>{player.first_name}&nbsp;{player.second_name}</h3>
        <h5>{team}</h5>
        <h6>{elementType}</h6>
      </div>
      {error === 'Network Error' && <div>Check Your internet Connection!</div>}
      {!!(error === '') && <div>
        <div className="chart border">
          <div className='chart-heading'>Player Performance</div>
          {history ? <div className="chart-container">
            <div className="graph">
              {history?.map((x, idx) => <div              
               className="graph-label graph-wrap" key={idx}>
                <div onClick={() =>handleClick(x)} 
                style={{height: x.total_points === 0 && x.minutes > 0 ? 5+'px' : 10*x.total_points+'px'}}
                className={`${x.minutes === 0 ? 'dnp' : 'graph-bar'}`}>
                
                  {x.minutes === 0 ?  <div className="no-returns">DNP</div> : 
                  <div className="returns" style={{paddingTop: x.total_points > 1 && 0.2+'rem', 
                  paddingBottom: x.total_points > 1 && 0.2+'rem',
                  background: x.total_points > 1 && '#ff000030'}}>{x.total_points}</div>}</div>
                </div>)}
            </div>
            <div className="graph">
              {rounds?.map((x, idx) => <div className="graph-label" key={idx}>{x}</div>)}
            </div>
            <div className="graph">
              {opponents?.map((x, idx) => <div className="graph-label" key={idx}>{x}</div>)}
            </div>
          </div> : <Spinner />}
        </div>
      </div>}
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header style={{background: '#20ce94'}} closeButton>
          <Modal.Title style={{fontWeight: 700}}>{player.first_name}&nbsp;{player.second_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
        <div className="stat-wrap">
            <div className="stat-head">Gameweek</div>
            <div className="stat-details">{gwStat.round}</div>
          </div>
        <div className="stat-wrap">
            <div className="stat-head">
              {teams?.find(y => y.id === gwStat.opponent_team)?.short_name}&nbsp;
              {gwStat.was_home ? '(H)': '(A)'}</div>
            <div className="stat-details">{gwStat.team_h_score} : {gwStat.team_a_score}</div>
          </div>
        <div className="stat-wrap">
            <div className="stat-head">Minutes</div>
            <div className="stat-details">{gwStat.minutes}</div>
          </div>
          <div className="stat-wrap">
            <div className="stat-head">Points</div>
            <div className="stat-details">{gwStat.total_points}</div>
          </div>
          <div className="stat-wrap">
            <div className="stat-head">Goals</div>
            <div className="stat-details">{gwStat.goals_scored}</div>
          </div>
          <div className="stat-wrap">
            <div className="stat-head">Assists</div>
            <div className="stat-details">{gwStat.assists}</div>
          </div>
          {gwStat.penalties_missed > 0 && <div className="stat-wrap">
            <div className="stat-head">Penalties Missed</div>
            <div className="stat-details">{gwStat.penalties_missed}</div>
          </div>}
          {player.element_type === 1 && gwStat.penalties_saved > 0 && <div className="stat-wrap">
            <div className="stat-head">Penalties Saved</div>
            <div className="stat-details">{gwStat.penalties_saved}</div>
          </div>}
          <div className="stat-wrap">
            <div className="stat-head">Bonus Points</div>
            <div className="stat-details">{gwStat.bonus}</div>
          </div>
          {player.element_type === 1 && <div className="stat-wrap">
            <div className="stat-head">Saves</div>
            <div className="stat-details">{gwStat.saves}</div>
          </div>}
          <div className="stat-wrap">
            <div className="stat-head">xG</div>
            <div className="stat-details">{gwStat.expected_goals}</div>
          </div>
          <div className="stat-wrap">
            <div className="stat-head">xA</div>
            <div className="stat-details">{gwStat.expected_assists}</div>
          </div>
          {gwStat.own_goals > 0 && <div className="stat-wrap">
            <div className="stat-head">Own Goals</div>
            <div className="stat-details">{gwStat.own_goals}</div>
          </div>}
          {/*<div className="stat-wrap">
            <div className="stat-head">nPxG</div>
            <div className="stat-details">{gwStat.expected_goals-0.78}</div>
          </div>*/}
          <div className="stat-wrap">
            <div className="stat-head">xGi</div>
            <div className="stat-details">{gwStat.expected_goal_involvements}</div>
          </div>
          {(player.element_type === 1 || player.element_type === 2) && 
          <div className="stat-wrap">
            <div className="stat-head">xGc</div>
            <div className="stat-details">{gwStat.expected_goals_conceded}</div>
          </div>}
          <div className="stat-wrap">
            <div className="stat-head">Yellow Cards</div>
            <div className="stat-details">{gwStat.yellow_cards}</div>
          </div>
          <div className="stat-wrap">
            <div className="stat-head">Red Cards</div>
            <div className="stat-details">{gwStat.red_cards}</div>
          </div>
        </Modal.Body>
        {/*<Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>*/}
      </Modal>
    </>
  )
}

export default PlayerScreen
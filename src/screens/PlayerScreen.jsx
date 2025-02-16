import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { usePlayer } from "../PlayerContext"
import { useNavigate } from "react-router-dom"
import { Modal, Spinner } from "react-bootstrap"
import axios from "axios"
const PlayerScreen = () => {

  const [error, setError] = useState('')
  const [show, setShow] = useState(false);
  const [gwStat, setGwStat] = useState('')

  const { teams, elementTypes, players } = usePlayer()
  const { playerId } = useParams()
  const navigate = useNavigate()
  const player = players?.find(player => player.id === +playerId)
  const team = player && teams?.find(team => team.id === player.team)?.name
  const elementType = player && elementTypes?.find(x => x.id === player.element_type)?.singular_name
  const data = players?.find(player => player.id === +playerId)


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const rounds = data?.history?.filter(x => new Date() > new Date(x.kickoff_time))?.map(x => `GW${x.round}`)
  const opponents = data?.history?.filter(x => new Date() > new Date(x.kickoff_time))?.map(x => teams?.find(y => y.id === x.opponent_team)?.short_name)
  const fixureRounds = data?.fixtures?.map(x => `GW${x?.event_name?.slice(9)}`)
  const fixtureOpponents = data?.fixtures?.map(x => {
    const opp = x.is_home === true ? x.team_a : x.team_h
    const isHome = x.is_home === true ? '(H)' : '(A)'
    const returnedOpponent = `${teams?.find(y => y.id === opp)?.short_name}${isHome}`
    return returnedOpponent
  })
  const fixtureImages = data?.fixtures?.map(x => {
    const opp = x.is_home === true ? x.team_a : x.team_h
    const returnedOpponent = `${teams?.find(y => y.id === opp)?.short_name}`
    return returnedOpponent
  })
  const fixtureDates = data?.fixtures?.map(x => {
    const a = new Date(x.kickoff_time)
    return a.toLocaleDateString()

  })

  const fixtureTimes = data?.fixtures?.map(x => {
    const a = new Date(x.kickoff_time)
    const hrs = a.getHours() > 9 ? a.getHours() : `0${a.getHours()}`
    const minutes = a.getMinutes() > 9 ? a.getMinutes() : `0${a.getMinutes()}`
    return `${hrs}:${minutes}HRS`

  })
  console.log(opponents)
  console.log(data?.history)

  const handleClick = (a) => {
    handleShow()
    setGwStat(a)
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
      {error === 'Network Error' && <div style={{ fontWeight: 700, fontSize: 1.2 + 'rem' }} className="my-5 py-5">Check your internet connection!</div>}
      {!!(error === '') && <div>
        <div className="chart border">
          <div className='chart-heading'>Player Performance</div>
          {data?.history?.length > 0 ? <div className="chart-container">
            <div>
              <div className="graph">
                {data?.history?.map((x, idx) => <div 
                style={{paddingBottom:0.4+'rem'}}
                  className="graph-label graph-wrap" key={idx}>
                  {x.value > 15 && new Date > new Date(x.kickoff_time) && <div onClick={() => handleClick(x)}
                    style={{ height: x.total_points === 0 && x.minutes > 0 ? 5 + 'px' : 10 * x.total_points + 'px' }}
                    className={`${x.minutes === 0 ? 'dnp' : 'graph-bar'}`}>

                    {x.minutes === 0 ? <div className="no-returns">DNP</div> :
                      <div className="returns" style={{
                        paddingTop: x.total_points > 1 && 0.2 + 'rem',
                        paddingBottom: x.total_points > 1 && 0.2 + 'rem',
                        background: x.total_points > 1 && '#ff000030'
                      }}>{x.total_points}</div>}</div>}

                  {x.value <= 15 && <div onClick={() => handleClick(x)}
                    style={{ height: x.total_points === 0 ? 10 + 'px' : 10 * x.total_points + 'px' }}
                    className='graph-bar'>

                    {
                      <div className="returns" style={{
                        paddingTop: x.total_points > 1 && 0.2 + 'rem',
                        paddingBottom: x.total_points > 1 && 0.2 + 'rem',
                        background: x.total_points > 1 && '#ff000030'
                      }}>{x.total_points}</div>}</div>}
                </div>)
                }
              </div>
              <div className="graph">
                {opponents?.map((x, idx) => <div
                  className="graph-label" key={idx}>
                  <img
                    src={`../../${x}.png`}
                    className="image_pic-2"
                    alt={x}
                  />
                </div>)}
              </div>
              <div className="graph">
                {opponents?.map((x, idx) => <div className="graph-label" key={idx}>{x}</div>)}
              </div>
              <div className="graph">
                {rounds?.map((x, idx) => <div className="graph-label" key={idx}>{x}</div>)}
              </div>
            </div>
            <div>
              <div>
              <div className="graph">
                {fixtureImages?.map((x, idx) => <div
                  className="graph-label-1" key={idx}>
                  <img
                    src={`../../${x}.png`}
                    className="image_pic-2"
                    alt={x}
                  />
                </div>)}
              </div>
              <div className="graph">
                {fixtureOpponents?.map((x, idx) => <div
                  className="graph-label-1" key={idx}>
                  {x}
                </div>)}
              </div>
              <div className="graph">
                {fixtureTimes?.map((x, idx) => <div
                  className="graph-label-1" key={idx}>
                  {x}
                </div>)}
              </div>
              <div className="graph">
                {fixtureDates?.map((x, idx) => <div
                  className="graph-label-1 graph-wrap" key={idx}>
                  {x}
                </div>)}
              </div>
              </div>
              <div className="graph" style={{ paddingTop: 34.4 + 'px' }}>
                {fixureRounds?.map((x, idx) => <div className="graph-label-1" key={idx}>{x}</div>)}
              </div>
            </div>
          </div> : <Spinner />}
        </div>
      </div>}
      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header style={{ background: '#20ce94' }} closeButton>
          <Modal.Title style={{ fontWeight: 700 }}>{player.first_name}&nbsp;{player.second_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="stat-wrap">
            <div className="stat-head">Gameweek</div>
            <div className="stat-details">{gwStat.round}</div>
          </div>
          <div className="stat-wrap">
            <div className="stat-head">
              {teams?.find(y => y.id === gwStat.opponent_team)?.short_name}&nbsp;
              {gwStat.was_home ? '(H)' : '(A)'}</div>
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
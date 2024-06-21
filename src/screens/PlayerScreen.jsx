import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { usePlayer } from "../PlayerContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const PlayerScreen = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState('')
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

  const { history } = data
  const rounds = history?.map(x => `GW${x.round}`)
  const opponents = history?.map(x => teams?.find(y => y.id === x.opponent_team)?.short_name)
 
  const handleClick = (x) => {
      console.log(x)
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
          <div className="chart-container">
            <div className="graph">
              {history?.map((x, idx) => <div              
               className="graph-label graph-wrap" key={idx}>
                <div onClick={() => console.log(x)} 
                style={{height: x.total_points === 0 && x.minutes === 0 ? 5+'px' : 10*x.total_points+'px'}}
                className={`${x.minutes === 0 ? 'dnp' : 'graph-bar'}`}>
                  {x.minutes === 0 ? 'DNP' : x.total_points}</div>
                </div>)}
            </div>
            <div className="graph">
              {rounds?.map((x, idx) => <div className="graph-label" key={idx}>{x}</div>)}
            </div>
            <div className="graph">
              {opponents?.map((x, idx) => <div className="graph-label" key={idx}>{x}</div>)}
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default PlayerScreen
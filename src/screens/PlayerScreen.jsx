import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { usePlayer } from "../PlayerContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BarChart, Bar, Rectangle, Legend, Cell, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
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
  //console.log(player)

  const { history } = data
  console.log(history)

  const returnPoints = () => {
    const data = []
    history?.sort((x,y) => x.round > y.round ? 1 : -1)?.map(x => x.total_points)?.forEach((x, key) => {
      const subData = { name: `GW${key+1}`, points: x }
      data.push(subData)
    })

    return data
  }

  const points = returnPoints()
  //console.log(points)

  //function getIntroOfPage(label) { console.log(label)}

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip border">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }
  
    return null;
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
            <BarChart width={1300} height={300} data={points}
              margin={{ top: 5, right: 30, left: 20, bottom: 0 }}>
              {/*<CartesianGrid strokeDasharray="3 3" />*/}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />}/>
              {/*<Legend />*/}
              <Bar dataKey="points" fill='#2e5f2e' />
            </BarChart>
          </div>
        </div>
      </div>}
    </>
  )
}

export default PlayerScreen
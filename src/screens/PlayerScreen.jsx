import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { usePlayer } from "../PlayerContext"
import { useNavigate } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import axios from "axios"
import { BarChart, Bar, Rectangle, Legend, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
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
        console.log(data)
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
    history?.map(x => x.total_points)?.forEach((x, key) => {
      const subData = {name: key+1, points: x}
      data.push(subData)
    })

    return data
  }

  const points = returnPoints()
  console.log(points)

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
        <div className="chart">
        <div className='chart-heading'>Player Performance</div>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={400} data={points}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="points" fill='#57d557' activeBar={<Rectangle fill='gold' stroke='purple' />} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </div>}
    </>
  )
}

export default PlayerScreen
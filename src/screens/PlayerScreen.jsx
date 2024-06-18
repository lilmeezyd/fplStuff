import { useParams } from "react-router-dom"
import { usePlayer } from "../PlayerContext"
import { useNavigate } from "react-router-dom"
const PlayerScreen = () => {

    const { teams, elementTypes, players } = usePlayer()
    const { playerId } = useParams()
    const navigate = useNavigate()
    const player = players.find(player => player.id === +playerId)
    if(players.length === 0) return <h1>Loading...</h1>
    if(!player) navigate('/statistics/players/1')
  return (
    <div>{player.web_name}</div>
  )
}

export default PlayerScreen
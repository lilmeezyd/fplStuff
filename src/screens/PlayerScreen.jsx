import { useParams } from "react-router-dom"
import { usePlayer } from "../PlayerContext"
const PlayerScreen = () => {

    const { teams, elementTypes, players } = usePlayer()
    const { playerId } = useParams()
    const player = players.find(player => player.id === +playerId)
    console.log(players)
    console.log(player)
  return (
    <div>{player.web_name}</div>
  )
}

export default PlayerScreen
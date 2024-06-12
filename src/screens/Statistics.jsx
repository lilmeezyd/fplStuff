import { Table } from "react-bootstrap"
import { usePlayer } from "../PlayerContext"
const Statistics = () => {

  const {teams, elementTypes, players} = usePlayer()
  return (
    <Table striped bordered hover  size="sm" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th className="name">Player</th>
          <th>Team</th>
          <th>Pos</th>
          <th>£</th>
          <th>Pts</th>
          <th>Start</th>
          <th>MP</th>
          <th>CS</th>
          <th>GS</th>
          <th>A</th>
          <th>xG</th>
          <th>xA</th>
          <th>xGi</th>
          {/*<th>nPxG</th>
          <th>nPxGi</th>*/}
        </tr>
      </thead>
      <tbody>
        {players
        .sort((x,y) => x.total_points > y.total_points ? -1 : 1)
        .slice(0, 20).map((player, key) => <tr key={player.id}>
          <td>{key+1}</td>
          <td className="name">{player.web_name}</td>
          <td>{teams.find(x => +x.id === +player.team).short_name}</td>
          <td>{elementTypes.find(x => +x.id === +player.element_type).singular_name_short}</td>
          <td>{(player.now_cost/10).toFixed(1)}</td>
          <td>{player.total_points}</td>
          <td>{player.starts}</td>
          <td>{player.minutes}</td>
          <td>{player.clean_sheets}</td>
          <td>{player.goals_scored}</td>
          <td>{player.assists}</td>
          <td>{player.expected_goals}</td>
          <td>{player.expected_assists}</td>
          <td>{player.expected_goal_involvements}</td>
          {/*<td>{player.penalties_text}</td>
          <td>{player.starts}</td>*/}
        </tr>)}
        
        {/*<tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>*/}
      </tbody>
    </Table>
  )
}

export default Statistics
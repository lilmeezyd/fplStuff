import { useState } from "react"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import { BiCaretUp } from "react-icons/bi"
import { Row, Col, Form, Table, Container, OverlayTrigger, Tooltip } from "react-bootstrap"
import { usePlayer } from "../PlayerContext"
const Statistics = () => {

  const { teams, elementTypes, players } = usePlayer()
  const [option, setOption] = useState('total')

  const onOptionChange = (e) => {
    setOption(e.target.value)
  }
  return (
    <Container className="py-2 my-2">
      <h3 className="p-2">View Statistics by one of the options below</h3>
      <Form className="my-2">
        <Row className="my-2 py-2 justify-content-center">
          <Col className="col-lg-2">
            <Form.Check
              checked={option === 'total'}
              type="radio" value="total" name="stats" label="Total"
              onChange={onOptionChange} /></Col>
          <Col className="col-lg-2">
            <Form.Check
              checked={option === 'single'} type="radio" value="single" name="stats" label="Single GW"
              onChange={onOptionChange} /></Col>
          <Col className="col-lg-2">
            <Form.Check
              checked={option === 'multiple'}
              type="radio" value="multiple" name="stats" label="Multiple Gws"
              onChange={onOptionChange} /></Col>
        </Row>
      </Form>
      {option === 'total' && <h6 className="p-2">Total Statistics for the season so far</h6>}
      {option === 'single' && <div>
        <h6 className="p-2">Select Statistics for a specific Gameweek</h6>
        <Row className="m-2 p-2 gx-2 justify-content-center align-items-center">
          <Col className="col-sm-1"><label className="gw" htmlFor="single">GW:</label></Col>
          <Col className="col-sm-1">
            <Form.Select name="gws" id="gws" size="sm">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select></Col>

        </Row>

      </div>}
      {option === 'multiple' && <>
        <h6 className="p-2">Select Statistics over multiple Gameweeks</h6>
        <Row className="m-2 p-2 justify-content-center align-items-center">
          <Col className="col-md-1"><label className="gw" htmlFor="single">From:</label></Col>
          <Col className="col-md-1"><Form.Select name="gws" id="gws" size="sm">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Select>
          </Col>
          <Col className="col-md-1"><label className="gw" htmlFor="single">To:</label></Col>
          <Col className="col-md-1"><Form.Select name="gws" id="gws" size="sm">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Select>
          </Col>
        </Row>
      </>}

      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th></th>
            <th className="name">Player</th>
            <th>Team</th>
            <th>Pos</th>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Price</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>£</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Points</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>Pts</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <th>Start</th>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Minutes Played</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>MP</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Clean Sheets</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>CS</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Goals Scored</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>GS</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Assists</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>A</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Expected Goals</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>xG</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Expected Assists</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>xA</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Expected Goal Involvement</strong>
                </Tooltip>
              }
            >
              <th><div className="sortWrapper">
              <div>xGi</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            {/*<th>nPxG</th>
          <th>nPxGi</th>*/}
          </tr>
        </thead>
        <tbody>
          {players
            .sort((x, y) => x.total_points > y.total_points ? -1 : 1)
            .slice(0, 20).map((player, key) => <tr key={player.id}>
              <td>{key + 1}</td>
              <td className="name">{player.web_name}</td>
              <td>{teams.find(x => +x.id === +player.team).short_name}</td>
              <td>{elementTypes.find(x => +x.id === +player.element_type).singular_name_short}</td>
              <td>{(player.now_cost / 10).toFixed(1)}</td>
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


    </Container>
  )
}

export default Statistics
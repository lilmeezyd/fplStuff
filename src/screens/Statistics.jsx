import { useState, useMemo, useReducer } from "react"
import { Link } from "react-router-dom"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
   import { BsChevronLeft, BsChevronRight,
    BsChevronDoubleLeft, BsChevronDoubleRight
    } from "react-icons/bs"
import { Row, Col, Form, Table, Container, OverlayTrigger, Tooltip } from "react-bootstrap"
import { usePlayer } from "../PlayerContext"
const Statistics = () => {

  const { teams, elementTypes, players } = usePlayer()
  const [option, setOption] = useState('total')
  const [curPage, setCurPage] = useState(1)
  const [ page, setPage ] = useState(1)
  const pageSize = 15
  let totalPages = Math.ceil(players.length / pageSize)
  
  function reducer(state, action) {
    if(action.type === 'now_cost' && state.name === 'now_cost') {
      return {
        ...state,
        desc: -state.desc
      }
    }

    if(action.type === 'now_cost' && state.name !== 'now_cost') {
      return {
        ...state,
        name: action.nextName
      }
    }

    if(action.type === 'total_points' && state.name === 'total_points') {
      return {
        ...state,
        desc: -state.desc
      }
    }

    if(action.type === 'total_points' && state.name !== 'total_points') {
      return {
        ...state,
        name: action.nextName
      }
    }

    if(action.type === 'starts' && state.name === 'starts') {
      return {
        ...state,
        desc: -state.desc
      }
    }

    if(action.type === 'starts' && state.name !== 'starts') {
      return {
        ...state,
        name: action.nextName
      }
    }

    if(action.type === 'minutes' && state.name === 'minutes') {
      return {
        ...state,
        desc: -state.desc
      }
    }

    if(action.type === 'minutes' && state.name !== 'minutes') {
      return {
        ...state,
        name: action.nextName
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, { name: 'now_cost', desc: -1})
  const { name, desc} = state
  
  
  const newPlayers = useMemo(() => {
    const nPlayers = players.sort((x, y) => x[name] > y[name] ? desc : -desc)
    .filter((player, key) => {
    let start = (curPage - 1) * pageSize
    let end = curPage * pageSize
    if (key >= start && key < end) return true
  })
  return nPlayers
}
  , [players, name, desc, curPage, pageSize])

  const onSubmit = (e) => {
    e.preventDefault()
    if(page > totalPages) {
      setCurPage(totalPages)
      setPage(totalPages)
    } else if(page < 0) {
      setCurPage(1)
      setPage(1)
    }
    else if(+page === 0){
      setCurPage(1)
      setPage(1)
    } else {
      setCurPage(page)
    }
    
  }

  const changePage = (e) => {
    if(e.target.value === '') {
      setPage('')
    } else if(e.target.value > totalPages) {
      setPage(totalPages)
    } else {
      setPage(+e.target.value)
    }
    
  }
  const viewNextPage = () => {
    setCurPage(curPage + 1)
    setPage(curPage + 1)
  }
  const viewPreviousPage = () => {
    setCurPage(curPage - 1)
    setPage(curPage - 1)
  }
  const viewFirstPage = () => {
    setCurPage(1)
    setPage(1)
  }

  const viewLastPage = () => {
    setCurPage(totalPages)
    setPage(totalPages)
  }

  const onOptionChange = (e) => {
    setOption(e.target.value)
  }
  return (
    <Container className="py-2 my-2">
      {players.length === 0 ? <h1>Loading...</h1> : <>
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
      </>}

      {players.length === 0 ? <h1>Loading...</h1> : <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th></th>
            <th className="name">Player</th>
            <th>Team</th>
            <th><div className="sortWrapper">Pos</div></th>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Price</strong>
                </Tooltip>
              }
            >
              <th><div onClick={() => {
                dispatch({type: 'now_cost', nextName: 'now_cost'})
              }} className="sortWrapper">
              <div>£</div> <div className="sortBy"><FaCaretUp fill="gray" /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Points</strong>
                </Tooltip>
              }
            >
              <th><div onClick={() => {
                dispatch({type: 'total_points', nextName: 'total_points'})
              }} className="sortWrapper">
              <div>Pts</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <th>
            <div onClick={() => {
                dispatch({type: 'starts', nextName: 'starts'})
              }} className="sortWrapper">
              <div>Start</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Minutes Played</strong>
                </Tooltip>
              }
            >
              <th><div onClick={() => {
                dispatch({type: 'minutes', nextName: 'minutes'})
              }} className="sortWrapper">
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
          {newPlayers.map((player, key) => 
          <tr key={player.id}>
              <td>{key + 1 + (curPage - 1) * pageSize}</td>
              <td className="name">
              <Link to={`/statistics/players/${player.id}`}>{player.web_name}</Link></td>
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
      </Table>}

      {players.length === 0 ? <h1>Loading...</h1>:<div className="button-controls">
          <button disabled={curPage === 1 ? true : false} onClick={viewFirstPage} className="btn-controls" id="firstPage">
          <BsChevronDoubleLeft />
          </button>
          <button disabled={curPage === 1 ? true : false} onClick={viewPreviousPage} className="btn-controls" id="prevButton">
          <BsChevronLeft />
          </button>
          <div className="pages">
          <Form onSubmit={onSubmit} className="mx-2">
                <Form.Group className="my-2 current" controlId="curPage">
                    <Form.Control
                        type="number"
                        value={page}
                        onChange={changePage}
                        min='1'
                        max={totalPages}
                    ></Form.Control>
                </Form.Group>
                </Form>
            <span>of</span>
            <span className="mx-2 total_pages">{totalPages}</span>
          </div>
          <button disabled={curPage === totalPages ? true : false} onClick={viewNextPage} className="btn-controls" id="nextButton">
          <BsChevronRight />
          </button>
          <button disabled={curPage === totalPages ? true : false} onClick={viewLastPage} className="btn-controls" id="lastPage">
            <BsChevronDoubleRight />
          </button>
        </div>}

    </Container>
  )
}

export default Statistics
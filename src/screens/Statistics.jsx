import { useState, useMemo, useReducer, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
   import { BsChevronLeft, BsChevronRight,
    BsChevronDoubleLeft, BsChevronDoubleRight
    } from "react-icons/bs"
import { Spinner, Row, Col, Form, Table, Container, OverlayTrigger, Tooltip } from "react-bootstrap"
import { usePlayer } from "../PlayerContext"
import axios from "axios"
const Statistics = () => {

  const { teams, elementTypes, players, events, error:errorM } = usePlayer()
  const [curPage, setCurPage] = useState(1)
  const [ page, setPage ] = useState(1)
  const [ start, setStart ] = useState(1)
  const [ end, setEnd ] = useState(1) 
  const [ nPlayers, setNPlayers] = useState([])
  const [error, setError] = useState('')
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

  useEffect(() => {
    const playersArray = players.map(player => player.id)
    .map(x => `https://corsproxy.io/?https://fantasy.premierleague.com/api/element-summary/${x}/`)

    async function makeAPICall(endpoint) {
      const response = await axios.get(endpoint)
      const data = await response.data
      return data
    }
    async function makeCalls(endpoints) {
      const promises = endpoints.map(makeAPICall)
      const responses = await Promise.all(promises)
      return responses
    }
    const mapPlayers = async () => {
      try {
        const response = await makeCalls(playersArray)
        setNPlayers(response)
        //console.log(response.slice(0,4))
      } catch (error) {
        let errorMsg = error?.response?.data?.masg || error?.message
        setError(errorMsg)
      }
    }

    players && mapPlayers()
  }, [players])
  
  
  
  const newPlayers = useMemo(() => {
  const a1 = []
   nPlayers.forEach(player => {
    const a = {}
    let id
    const {history} = player
    history.forEach((x, idx) => {
      if(idx === 0) { 
        id = x.element
        a.element = x.element}
    })
    const playerInfo = players.find(x => x.id === id)
    a.web_name = playerInfo.web_name
    a.now_cost = (playerInfo.now_cost / 10).toFixed(1)
    a.team = teams.find(x => +x.id === +playerInfo.team).short_name
    a.position = elementTypes.find(x => +x.id === +playerInfo.element_type).singular_name_short
    
    a.history = history
    a1.push(a)
   })
   const a2 = a1.map(x => {
    const y = Object.create({})
    const filteredHis = x.history.filter(z => z.round >= start && z.round <= end)
     y.now_cost = x.now_cost
     y.element = x.element
     y.position = x.position
     y.web_name = x.web_name
     y.team = x.team
     y.assists = filteredHis.reduce((x,y) => x+y.assists,0)
    y.clean_sheets = filteredHis.reduce((x,y) => x+y.clean_sheets,0)
    y.expected_assists = filteredHis.reduce((x,y) => x+(+y.expected_assists),0)
    y.expected_goal_involvements = filteredHis.reduce((x,y) => x+(+y.expected_goal_involvements),0)
    y.expected_goals = filteredHis.reduce((x,y) => x+(+y.expected_goals),0)
    y.expected_goals_conceded = filteredHis.reduce((x,y) => x+(+y.expected_goals_conceded),0)
    y.goals_scored = filteredHis.reduce((x,y) => x+(+y.goals_scored),0)
    y.minutes = filteredHis.reduce((x,y) => x+(+y.minutes),0)
    y.own_goals = filteredHis.reduce((x,y) => x+(+y.own_goals),0)
    y.penalties_missed = filteredHis.reduce((x,y) => x+(+y.penalties_missed),0)
    y.penalties_saved = filteredHis.reduce((x,y) => x+(+y.penalties_saved),0)
    y.red_cards = filteredHis.reduce((x,y) => x+(+y.red_cards),0)
    y.yellow_cards = filteredHis.reduce((x,y) => x+(+y.yellow_cards),0)
    y.saves = filteredHis.reduce((x,y) => x+(+y.saves),0)
    y.starts = filteredHis.reduce((x,y) => x+(+y.starts),0)
    y.total_points = filteredHis.reduce((x,y) => x+(+y.total_points),0)
     return y
   })
  const ntPlayers = a2.sort((x, y) => +x[name] > +y[name] ? desc : -desc)
    .filter((player, key) => {
    let start = (curPage - 1) * pageSize
    let end = curPage * pageSize
    if (key >= start && key < end) return true
  })
  return ntPlayers
}
  , [players, teams, elementTypes, nPlayers, start, end, name, desc, curPage, pageSize])

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

  const nEvents = events
    .filter((event) => event.finished)
    .map(event => event.id)
    .sort((x, y) => (x.id > y.id ? 1 : -1));
  return (
    
    <Container className="py-2 my-2">
      {((error === 'Network Error' || errorM === 'Network Error') && newPlayers.length === 0) && 
      <div className="py-5">Check your internet connection!</div>}
      {newPlayers.length === 0 && error === '' && errorM === '' && <Spinner />}
      {(newPlayers.length > 0 && error === '' && errorM === '') && <>
      <>
      {/*<Form className="my-2">
        <Row className="my-2 py-2 justify-content-center">
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
      </Form>*/}
      <>
        <h4 className="p-2">Select Statistics over multiple Gameweeks or a single Gameweek</h4>
        <Row className="m-2 p-2 justify-content-center align-items-center">
          <Col className="col-md-1"><label className="gw" htmlFor="single">From:</label></Col>
          <Col className="col-md-1"><Form.Select name="gws" id="gws" size="sm"
          value={start}
          onChange={(e) => {
            setStart(+e.target.value)
            if(+e.target.value > +end) {
              setStart(end)
              setEnd(+e.target.value)
          } else {
            setStart(+e.target.value)
          }
          }}>
          {nEvents.map((event, idx) => (
                <option value={event} key={idx}>
                  GW{event}
                </option>
              ))}
          </Form.Select>
          </Col>
          <Col className="col-md-1"><label className="gw" htmlFor="single">To:</label></Col>
          <Col className="col-md-1"><Form.Select name="gws" id="gws" size="sm"
          value={end}
          onChange={(e) => {
            if(+e.target.value < +start) {
              setEnd(start)
              setStart(+e.target.value)
          } else {
            setEnd(+e.target.value)
          }
          }}>
          {nEvents.map((event, idx) => (
                <option value={event} key={idx}>
                  GW{event}
                </option>
              ))}
          </Form.Select>
          </Col>
        </Row>
      </>
      </>

      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th></th>
            <th className="name">Player</th>
            <th className="th-w">Team</th>
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>
              <strong>Position</strong>
            </Tooltip>}>
            <th className="th-w">Pos</th></OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Price</strong>
                </Tooltip>
              }
            >
              <th className="th-w"><div onClick={() => {
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
              <th className="th-w"><div onClick={() => {
                dispatch({type: 'total_points', nextName: 'total_points'})
              }} className="sortWrapper">
              <div>Pts</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            <th className="th-w"> 
            <div onClick={() => {
                dispatch({type: 'starts', nextName: 'starts'})
              }} className="sortWrapper">
              <div>Starts</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Minutes Played</strong>
                </Tooltip>
              }
            >
              <th className="th-w"><div onClick={() => {
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
              <th className="th-w"><div className="sortWrapper">
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
              <th className="th-w"><div className="sortWrapper">
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
              <th className="th-w"><div className="sortWrapper">
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
              <th className="th-w"><div className="sortWrapper">
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
              <th className="th-w"><div className="sortWrapper">
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
              <th className="th-w"><div className="sortWrapper">
              <div>xGi</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Saves</strong>
                </Tooltip>
              }
            >
              <th className="th-w"><div className="sortWrapper">
              <div>Saves</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Yellow Cards</strong>
                </Tooltip>
              }
            >
              <th className="th-w"><div className="sortWrapper">
              <div>YC</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Red Cards</strong>
                </Tooltip>
              }
            >
              <th className="th-w"><div className="sortWrapper">
              <div>RC</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <strong>Expected Goal Conceded</strong>
                </Tooltip>
              }
            >
              <th className="th-w"><div className="sortWrapper">
              <div>xGc</div> <div className="sortBy"><FaCaretUp /> <FaCaretDown /></div></div></th>
            </OverlayTrigger>
            {/*<th>nPxG</th>
          <th>nPxGi</th>*/}
          </tr>
        </thead>
        <tbody>
          {newPlayers.map((player, key) => 
          <tr key={player.element}>
              <td>{key + 1 + (curPage - 1) * pageSize}</td>
              <td className="name">
                <Link to={`/statistics/players/${player.element}`}>{player.web_name}</Link>
              </td>
              <td>{player.team}</td>
              <td>{player.position}</td>
              <td>{player.now_cost}</td>
              <td>{player.total_points}</td>
              <td>{player.starts}</td>
              <td>{player.minutes}</td>
              <td>{player.clean_sheets}</td>
              <td>{player.goals_scored}</td>
              <td>{player.assists}</td>
              <td>{player.expected_goals.toFixed(2)}</td>
              <td>{player.expected_assists.toFixed(2)}</td>
              <td>{player.expected_goal_involvements.toFixed(2)}</td>
              <td>{player.saves}</td>
              <td>{player.yellow_cards}</td>
              <td>{player.red_cards}</td>
              <td>{player.expected_goals_conceded.toFixed(2)}</td>
            </tr>)}
        </tbody>
      </Table>

      <div className="button-controls">
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
        </div>
            </>}
    </Container>
  )
}

export default Statistics
import { useState, useMemo, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from "react-icons/bs";
import {
  Spinner,
  Row,
  Col,
  Form,
  Table,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { usePlayer } from "../PlayerContext";
const Statistics = () => {
  const { teams, elementTypes, players, events, error: errorM } = usePlayer();
  const [curPage, setCurPage] = useState(1);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [error, setError] = useState("");
  const pageSize = 15;
  let totalPages = Math.ceil(players.length / pageSize);

  function reducer(state, action) {
    if (action.type === "now_cost" && state.name === "now_cost") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "now_cost" && state.name !== "now_cost") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "total_points" && state.name === "total_points") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "total_points" && state.name !== "total_points") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "starts" && state.name === "starts") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "starts" && state.name !== "starts") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "minutes" && state.name === "minutes") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "minutes" && state.name !== "minutes") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "clean_sheets" && state.name === "clean_sheets") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "clean_sheets" && state.name !== "clean_sheets") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "goals_scored" && state.name === "goals_scored") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "goals_scored" && state.name !== "goals_scored") {
      return {
        ...state,
        name: action.nextName,
      };
    }
    if (action.type === "assists" && state.name === "assists") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "assists" && state.name !== "assists") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "expected_goals" && state.name === "expected_goals") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "expected_goals" && state.name !== "expected_goals") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (
      action.type === "expected_assists" &&
      state.name === "expected_assists"
    ) {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (
      action.type === "expected_assists" &&
      state.name !== "expected_assists"
    ) {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (
      action.type === "expected_goal_involvements" &&
      state.name === "expected_goal_involvements"
    ) {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (
      action.type === "expected_goal_involvements" &&
      state.name !== "expected_goal_involvements"
    ) {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "saves" && state.name === "saves") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "saves" && state.name !== "saves") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "yellow_cards" && state.name === "yellow_cards") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "yellow_cards" && state.name !== "yellow_cards") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "red_cards" && state.name === "red_cards") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "red_cards" && state.name !== "red_cards") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (
      action.type === "expected_goals_conceded" &&
      state.name === "expected_goals_conceded"
    ) {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (
      action.type === "expected_goals_conceded" &&
      state.name !== "expected_goals_conceded"
    ) {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (
      action.type === "expected_assists_per_90" &&
      state.name === "expected_assists_per_90"
    ) {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (
      action.type === "expected_assists_per_90" &&
      state.name !== "expected_assists_per_90"
    ) {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (
      action.type === "expected_goals_per_90" &&
      state.name === "expected_goals_per_90"
    ) {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (
      action.type === "expected_goals_per_90" &&
      state.name !== "expected_goals_per_90"
    ) {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (
      action.type === "expected_goals_conceded_per_90" &&
      state.name === "expected_goals_conceded_per_90"
    ) {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (
      action.type === "expected_goals_conceded_per_90" &&
      state.name !== "expected_goals_conceded_per_90"
    ) {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (
      action.type === "expected_goal_involvements_per_90" &&
      state.name === "expected_goal_involvements_per_90"
    ) {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (
      action.type === "expected_goal_involvements_per_90" &&
      state.name !== "expected_goal_involvements_per_90"
    ) {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "saves_per_90" && state.name === "saves_per_90") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "saves_per_90" && state.name !== "saves_per_90") {
      return {
        ...state,
        name: action.nextName,
      };
    }

    if (action.type === "points_per_90" && state.name === "points_per_90") {
      return {
        ...state,
        desc: -state.desc,
      };
    }

    if (action.type === "points_per_90" && state.name !== "points_per_90") {
      return {
        ...state,
        name: action.nextName,
      };
    }
  }

  const [state, dispatch] = useReducer(reducer, { name: "now_cost", desc: -1 });
  const { name, desc } = state;

  useEffect(() => {
    const a = new Date()
    const maxEvent = Math.max(...events
      .filter((event) => a > new Date(event.deadline_time))
      .map((event) => event.id))
    setEnd(maxEvent)
  }, [events]);


  const newPlayers = useMemo(() => {
    const a1 = [];
    players.forEach((player) => {
      const a = {};
      let id;
      const { history } = player;
      if (history.length > 0) {
        history.forEach((x, idx) => {
          if (idx === 0) {
            id = x.element;
            a.element = x.element;
          }
        });
        const playerInfo = players?.find((x) => x.id === id);
        a.web_name = playerInfo.web_name;
        a.now_cost = (playerInfo.now_cost / 10).toFixed(1);
        a.team = teams?.find((x) => +x.id === +playerInfo.team)?.short_name;
        a.position = elementTypes?.find(
          (x) => +x.id === +playerInfo.element_type
        )?.singular_name_short;

        a.history = history;
        a1.push(a);
      }
    });
    const a2 = a1.map((x) => {
      const y = Object.create({});
      const filteredHis = x.history.filter(
        (z) => z.round >= start && z.round <= end
      );
      const actualMinutes = filteredHis.reduce((x, y) => x + +y.minutes, 0);
      y.now_cost = x.now_cost;
      y.element = x.element;
      y.position = x.position;
      y.web_name = x.web_name;
      y.team = x.team;
      y.assists = filteredHis.reduce((x, y) => x + y.assists, 0);
      y.clean_sheets = filteredHis.reduce((x, y) => x + y.clean_sheets, 0);
      y.expected_assists = filteredHis.reduce(
        (x, y) => x + +y.expected_assists,
        0
      );
      y.expected_goal_involvements = filteredHis.reduce(
        (x, y) => x + +y.expected_goal_involvements,
        0
      );
      y.expected_goals = filteredHis.reduce((x, y) => x + +y.expected_goals, 0);
      y.expected_goals_conceded = filteredHis.reduce(
        (x, y) => x + +y.expected_goals_conceded,
        0
      );
      y.goals_scored = filteredHis.reduce((x, y) => x + +y.goals_scored, 0);
      y.minutes = actualMinutes;
      y.own_goals = filteredHis.reduce((x, y) => x + +y.own_goals, 0);
      y.penalties_missed = filteredHis.reduce(
        (x, y) => x + +y.penalties_missed,
        0
      );
      y.penalties_saved = filteredHis.reduce(
        (x, y) => x + +y.penalties_saved,
        0
      );
      y.red_cards = filteredHis.reduce((x, y) => x + +y.red_cards, 0);
      y.yellow_cards = filteredHis.reduce((x, y) => x + +y.yellow_cards, 0);
      y.saves = filteredHis.reduce((x, y) => x + +y.saves, 0);
      y.starts = filteredHis.reduce((x, y) => x + +y.starts, 0);
      y.total_points = filteredHis.reduce((x, y) => x + +y.total_points, 0);
      y.expected_assists_per_90 =
        actualMinutes > 30
          ? filteredHis.reduce((x, y) => x + +y.expected_assists, 0) /
          (actualMinutes / 90)
          : 0;
      y.expected_goals_per_90 =
        actualMinutes > 30
          ? filteredHis.reduce((x, y) => x + +y.expected_goals, 0) /
          (actualMinutes / 90)
          : 0;
      y.expected_goal_involvements_per_90 =
        actualMinutes > 30
          ? filteredHis.reduce((x, y) => x + +y.expected_goal_involvements, 0) /
          (actualMinutes / 90)
          : 0;
      y.saves_per_90 =
        actualMinutes > 30
          ? filteredHis.reduce((x, y) => x + +y.saves, 0) / (actualMinutes / 90)
          : 0;
      return y;
    });
    const ntPlayers = a2
      .sort((x, y) => (+x[name] > +y[name] ? desc : -desc))
      .filter((player, key) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (key >= start && key < end) return true;
      });
    return ntPlayers;
  }, [
    players,
    teams,
    elementTypes,
    start,
    end,
    name,
    desc,
    curPage,
    pageSize,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (page > totalPages) {
      setCurPage(totalPages);
      setPage(totalPages);
    } else if (page < 0) {
      setCurPage(1);
      setPage(1);
    } else if (+page === 0) {
      setCurPage(1);
      setPage(1);
    } else {
      setCurPage(page);
    }
  };

  const changePage = (e) => {
    if (e.target.value === "") {
      setPage("");
    } else if (e.target.value > totalPages) {
      setPage(totalPages);
    } else {
      setPage(+e.target.value);
    }
  };
  const viewNextPage = () => {
    setCurPage(curPage + 1);
    setPage(curPage + 1);
  };
  const viewPreviousPage = () => {
    setCurPage(curPage - 1);
    setPage(curPage - 1);
  };
  const viewFirstPage = () => {
    setCurPage(1);
    setPage(1);
  };

  const viewLastPage = () => {
    setCurPage(totalPages);
    setPage(totalPages);
  };

  const a = new Date()
  const nEvents = events
    .filter((event) => a > new Date(event.deadline_time))
    .sort((x, y) => (x.id > y.id ? 1 : -1))
    .map((event) => event.id);
  //|| errorM === "Network Error"

  return (
    <Container className="py-2 my-2">
      {(error === "Network Error") &&
        newPlayers.length === 0 && (
          <div
            style={{ fontWeight: 700, fontSize: 1.2 + "rem" }}
            className="my-5 py-5"
          >
            Check your internet connection!
          </div>
        )}
      {newPlayers.length === 0 && error === "" &&
        events.filter(x => x.finished === true).length > 0 &&
        <Spinner />}
      {/*newPlayers.length === 0 && error === "" &&
      events?.filter(x => x.finished === true).length === 0 &&
       <div
       style={{fontWeight: 700, fontSize: 1.2+'rem'}} className="my-5 py-5">Statistics will appear here once season starts</div>*/}
      {newPlayers.length > 0 && error === "" && (
        <>
          <>
            <>
              <h6 className="p-2" style={{ fontWeight: 700 }}>
                Select Statistics over multiple Gameweeks or a single Gameweek
              </h6>
              <Row className="m-2 p-2 d-flex justify-content-md-evenly justify-content-lg-center align-items-center">
                <Col className="col-md-1">
                  <label className="gw-x" htmlFor="single">
                    From:
                  </label>
                </Col>
                <Col className="col-md-1">
                  <Form.Select
                    name="gws"
                    id="gws"
                    size="sm"
                    style={{ width: 65 + "px" }}
                    value={start}
                    onChange={(e) => {
                      setStart(+e.target.value);
                      if (+e.target.value > +end) {
                        setStart(end);
                        setEnd(+e.target.value);
                      } else {
                        setStart(+e.target.value);
                      }
                    }}
                  >
                    {nEvents.map((event, idx) => (
                      <option value={event} key={idx}>
                        GW{event}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col className="col-md-1">
                  <label className="gw-x" htmlFor="single">
                    To:
                  </label>
                </Col>
                <Col className="col-md-1">
                  <Form.Select
                    name="gws"
                    id="gws"
                    size="sm"
                    style={{ width: 65 + "px" }}
                    value={end}
                    onChange={(e) => {
                      if (+e.target.value < +start) {
                        setEnd(start);
                        setStart(+e.target.value);
                      } else {
                        setEnd(+e.target.value);
                      }
                    }}
                  >
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

          
          <div className="data-set">
            <div className="stat-table-header">
              <div className="stat-table-row">
                <div></div>
                <div className="name-12"></div>
                <div className="general-1">General</div>
                <div className="attack-1">Attack</div>
                <div className="defense-1">Defence</div>
                <div className="expected-1">Expected Data</div>
                <div className="data_90-1">Data Per 90 minutes</div>
              </div>
            </div>

            <div className="stat-table-header">
              <div className="stat-table-row">
                <div></div>
                <div className="name-12">Player</div>
                <div className="general">
                  <div className="div-w">Team</div>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Position</strong>
                      </Tooltip>
                    }
                  >
                    <div className="div-w">Pos</div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Price</strong>
                      </Tooltip>
                    }
                  >
                    <div className="div-w">
                      <div
                        onClick={() => {
                          dispatch({ type: "now_cost", nextName: "now_cost" });
                        }}
                        className="sortWrapper"
                      >
                        <div style={{ fontWeight: name === "now_cost" && 800 }}>
                          £
                        </div>{" "}
                        <div className="sortBy">
                          <FaCaretUp
                            fill={`${name === "now_cost" && desc === 1 ? "black" : "gray"
                              }`}
                          />
                          <FaCaretDown
                            fill={`${name === "now_cost" && desc === -1 ? "black" : "gray"
                              }`}
                          />
                        </div>
                      </div>
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Points</strong>
                      </Tooltip>
                    }
                  >
                    <div className="div-w">
                      <div
                        onClick={() => {
                          dispatch({
                            type: "total_points",
                            nextName: "total_points",
                          });
                        }}
                        className="sortWrapper"
                      >
                        <div style={{ fontWeight: name === "total_points" && 800 }}>
                          Pts
                        </div>{" "}
                        <div className="sortBy">
                          <FaCaretUp
                            fill={`${name === "total_points" && desc === 1
                                ? "black"
                                : "gray"
                              }`}
                          />
                          <FaCaretDown
                            fill={`${name === "total_points" && desc === -1
                                ? "black"
                                : "gray"
                              }`}
                          />
                        </div>
                      </div>
                    </div>
                  </OverlayTrigger>
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({ type: "starts", nextName: "starts" });
                      }}
                      className="sortWrapper"
                    >
                      <div style={{ fontWeight: name === "starts" && 800 }}>
                        Starts
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${name === "starts" && desc === 1 ? "black" : "gray"
                            }`}
                        />
                        <FaCaretDown
                          fill={`${name === "starts" && desc === -1 ? "black" : "gray"
                            }`}
                        />
                      </div>
                    </div>
                  </div>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Minutes Played</strong>
                      </Tooltip>
                    }
                  >
                    <div className="div-w">
                      <div
                        onClick={() => {
                          dispatch({ type: "minutes", nextName: "minutes" });
                        }}
                        className="sortWrapper"
                      >
                        <div style={{ fontWeight: name === "minutes" && 800 }}>
                          MP
                        </div>{" "}
                        <div className="sortBy">
                          <FaCaretUp
                            fill={`${name === "minutes" && desc === 1 ? "black" : "gray"
                              }`}
                          />
                          <FaCaretDown
                            fill={`${name === "minutes" && desc === -1 ? "black" : "gray"
                              }`}
                          />
                        </div>
                      </div>
                    </div>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Yellow Cards</strong>
                      </Tooltip>
                    }
                  >
                    <div className="div-w">
                      <div
                        onClick={() => {
                          dispatch({
                            type: "yellow_cards",
                            nextName: "yellow_cards",
                          });
                        }}
                        className="sortWrapper"
                      >
                        <div style={{ fontWeight: name === "yellow_cards" && 800 }}>
                          YC
                        </div>{" "}
                        <div className="sortBy">
                          <FaCaretUp
                            fill={`${name === "yellow_cards" && desc === 1
                                ? "black"
                                : "gray"
                              }`}
                          />
                          <FaCaretDown
                            fill={`${name === "yellow_cards" && desc === -1
                                ? "black"
                                : "gray"
                              }`}
                          />
                        </div>
                      </div>
                    </div>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        <strong>Red Cards</strong>
                      </Tooltip>
                    }
                  >
                    <div className="div-w">
                      <div
                        onClick={() => {
                          dispatch({ type: "red_cards", nextName: "red_cards" });
                        }}
                        className="sortWrapper"
                      >
                        <div style={{ fontWeight: name === "red_cards" && 800 }}>
                          RC
                        </div>{" "}
                        <div className="sortBy">
                          <FaCaretUp
                            fill={`${name === "red_cards" && desc === 1 ? "black" : "gray"
                              }`}
                          />
                          <FaCaretDown
                            fill={`${name === "red_cards" && desc === -1
                                ? "black"
                                : "gray"
                              }`}
                          />
                        </div>
                      </div>
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="attack">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Goals Scored</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "goals_scored",
                          nextName: "goals_scored",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div style={{ fontWeight: name === "goals_scored" && 800 }}>
                        GS
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "goals_scored" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "goals_scored" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Assists</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({ type: "assists", nextName: "assists" });
                      }}
                      className="sortWrapper"
                    >
                      <div style={{ fontWeight: name === "assists" && 800 }}>
                        A
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "assists" && desc === 1 ? "black" : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "assists" && desc === -1 ? "black" : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>

                </div>
                <div className="defense">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Clean Sheets</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "clean_sheets",
                          nextName: "clean_sheets",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div style={{ fontWeight: name === "clean_sheets" && 800 }}>
                        CS
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "clean_sheets" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "clean_sheets" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Saves</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({ type: "saves", nextName: "saves" });
                      }}
                      className="sortWrapper"
                    >
                      <div style={{ fontWeight: name === "saves" && 800 }}>
                        Saves
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "saves" && desc === 1 ? "black" : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "saves" && desc === -1 ? "black" : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
                </div>
                <div className="expected">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Expected Goals</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "expected_goals",
                          nextName: "expected_goals",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div
                        style={{ fontWeight: name === "expected_goals" && 800 }}
                      >
                        xG
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "expected_goals" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "expected_goals" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Expected Assists</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "expected_assists",
                          nextName: "expected_assists",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div
                        style={{ fontWeight: name === "expected_assists" && 800 }}
                      >
                        xA
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "expected_assists" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "expected_assists" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Expected Goal Involvement</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "expected_goal_involvements",
                          nextName: "expected_goal_involvements",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div
                        style={{
                          color:
                            name === "expected_goal_involvements" && "black",
                        }}
                      >
                        xGi
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "expected_goal_involvements" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "expected_goal_involvements" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>

                </div>
                <div className="data_90">
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Expected Goals Per 90</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "expected_goals_per_90",
                          nextName: "expected_goals_per_90",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div
                        style={{
                          fontWeight: name === "expected_goals_per_90" && 800,
                        }}
                      >
                        xG
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "expected_goals_per_90" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "expected_goals_per_90" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Expected Assists Per 90</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "expected_assists_per_90",
                          nextName: "expected_assists_per_90",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div
                        style={{
                          fontWeight: name === "expected_assists_per_90" && 800,
                        }}
                      >
                        xA
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "expected_assists_per_90" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "expected_assists_per_90" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Expected Goal Involvements Per 90</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "expected_goal_involvements_per_90",
                          nextName: "expected_goal_involvements_per_90",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div
                        style={{
                          color:
                            name === "expected_goal_involvements_per_90" &&
                            "black",
                        }}
                      >
                        xGi
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "expected_goal_involvements_per_90" &&
                            desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "expected_goal_involvements_per_90" &&
                            desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      <strong>Saves Per 90</strong>
                    </Tooltip>
                  }
                >
                  <div className="div-w">
                    <div
                      onClick={() => {
                        dispatch({
                          type: "saves_per_90",
                          nextName: "saves_per_90",
                        });
                      }}
                      className="sortWrapper"
                    >
                      <div style={{ fontWeight: name === "saves_per_90" && 800 }}>
                        Saves
                      </div>{" "}
                      <div className="sortBy">
                        <FaCaretUp
                          fill={`${
                            name === "saves_per_90" && desc === 1
                              ? "black"
                              : "gray"
                          }`}
                        />
                        <FaCaretDown
                          fill={`${
                            name === "saves_per_90" && desc === -1
                              ? "black"
                              : "gray"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </OverlayTrigger>
                </div>
              </div>
            </div>

            {newPlayers.map((player, key) => (
                <div className="stat-table-row" key={player.element}>
                  <div>{key + 1 + (curPage - 1) * pageSize}</div>
                  <div className="name-12">
                    <Link to={`/statistics/players/${player.element}`}>
                      {player.web_name}
                    </Link>
                  </div>
                  <div className="general">
                  <div>{player.team}</div>
                  <div>{player.position}</div>
                  <div>{player.now_cost}</div>
                  <div>{player.total_points}</div>
                  <div>{player.starts}</div>
                  <div>{player.minutes}</div>
                  <div>{player.yellow_cards}</div>
                  <div>{player.red_cards}</div>
                  </div>
                  <div className="attack">
                  <div>{player.goals_scored}</div>
                  <div>{player.assists}</div>
                  </div>
                  <div className="defense">
                  <div>{player.clean_sheets}</div>
                  <div>{player.saves}</div>
                  </div>
                  <div className="expected">
                  <div>{player.expected_goals.toFixed(2)}</div>
                  <div>{player.expected_assists.toFixed(2)}</div>
                  <div>{player.expected_goal_involvements.toFixed(2)}</div>
                  </div>
                  <div className="data_90">
                  <div>{player.expected_goals_per_90.toFixed(2)}</div>
                  <div>{player.expected_assists_per_90.toFixed(2)}</div>
                  <div>{player.expected_goal_involvements_per_90.toFixed(2)}</div>
                  <div>{player.saves_per_90.toFixed(2)}</div>
                  </div>
                </div>
              ))}
          </div>

          <div className="button-controls">
            <button
              disabled={curPage === 1 ? true : false}
              onClick={viewFirstPage}
              className="btn-controls"
              id="firstPage"
            >
              <BsChevronDoubleLeft />
            </button>
            <button
              disabled={curPage === 1 ? true : false}
              onClick={viewPreviousPage}
              className="btn-controls"
              id="prevButton"
            >
              <BsChevronLeft />
            </button>
            <div className="pages">
              <Form onSubmit={onSubmit} className="mx-2">
                <Form.Group className="my-2 current" controlId="curPage">
                  <Form.Control
                    type="number"
                    value={page}
                    onChange={changePage}
                    min="1"
                    max={totalPages}
                  ></Form.Control>
                </Form.Group>
              </Form>
              <span>of</span>
              <span className="mx-2 total_pages">{totalPages}</span>
            </div>
            <button
              disabled={curPage === totalPages ? true : false}
              onClick={viewNextPage}
              className="btn-controls"
              id="nextButton"
            >
              <BsChevronRight />
            </button>
            <button
              disabled={curPage === totalPages ? true : false}
              onClick={viewLastPage}
              className="btn-controls"
              id="lastPage"
            >
              <BsChevronDoubleRight />
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Statistics;

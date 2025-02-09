import { useState, useEffect, useReducer } from "react";
import { Button } from "react-bootstrap";
import { useManager } from "../ManagerContext";
import { usePlayer } from "../PlayerContext";
import SquadPlayer from "./SquadPlayer";
import prevPage from "../assets/chevron_left.png";
import nextPage from "../assets/chevron_right.png";
import { getGameweeks } from "../helpers/timeHelper";
import getTime from "../utils/getTime";
import getPm from "../utils/getPm";
import { loadOpponents, loadPlayerOpponents } from "../helpers/fixtureHelper";
import {
  getGoalKeeper,
  getDefenders,
  getMidfielders,
  getForwards,
  getBenched,
} from "../helpers/picksHelper";
import TransferRows from "./TransferRows";
import { AiFillCaretRight, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
const Pitch = () => {
  const {
    players,
    getManagerInfo,
    managerHistory,
    managerInfo,
    managerPicks,
    picks,
    resetGws,
    colorOfArrow,
    tempPlayersOut,
    playersIn,
    pickIndex,
    transferLogic,
    freeTransfers,
    transferCost,
    eventId,
    chips,
    initialChips,
    playersSelected,
    getInTheBank,
    getPickIndex,
    updateWildcard,
    updateBboost,
    updateFreehit,
    updateTcap,
    updateInitsWc,
    updateInitsTc,
    updateInitsFh,
    updateInitsBb
  } = useManager();
  const [fplId, setFplId] = useState("");
  const [init, setInit] = useState({ init_wc: null, init_tc: null, init_bb: null, init_fh: null })
  const [managerId, setManagerId] = useState(
    localStorage.getItem("managerId") || null
  );
  const { teams, fixtures, events, elementTypes } = usePlayer();
  const curSize = 1;
  const [curPage, setCurPage] = useState(1);
  const [event, setEvent] = useState(1)
  const [show, setShow] = useState(false);
  const { gameweeks, length, countdowns } = getGameweeks(
    events,
    curPage,
    curSize
  );

  const { init_wc, init_tc, init_bb, init_fh } = init

  const colorOfArr = colorOfArrow()

  const reducer = (state, action) => {
    if (action.type === 'INITIAL_CHIPS') {
      return action.payload
    }
    if (action.type === 'ACTIVATE_WC1') {
      if (state.wc === null) {
        updateInitsWc(event)
        const len = Object.values(state).filter(x => x === event).length
        if (len === 1) {
          let key_entry = Object.entries(state).filter(x => x[1] === event )[0][0]
          state[key_entry] = null
          updateInitsBb(state.bb)
          updateInitsFh(state.fh)
          updateInitsTc(state.tc)
          updateWildcard(true, event, state.bb, state.tc, state.fh)
        }
        return {
          ...state,
          wc: event
        }
      } else {
        updateInitsWc(null)
        updateWildcard(false, null, init_bb, init_tc, init_fh)
        return {
          ...state,
          wc: null
        }
      }
    }
    if (action.type === 'ACTIVATE_WC2') {
      if (state.wc === null) {
        updateInitsWc(event)
        const len = Object.values(state).filter(x => x === event).length
        if (len === 1) {
          let key_entry = Object.entries(state).filter(x => x[1] === event)[0][0]
          state[key_entry] = null
        }
          updateInitsBb(state.bb)
          updateInitsFh(state.fh)
          updateInitsTc(state.tc)
          updateWildcard(true, event, state.bb, state.tc, state.fh)
        return {
          ...state,
          wc: event
        }
      } else {
        updateInitsWc(null)
        updateWildcard(false, null, init_bb, init_tc, init_fh)
        return {
          ...state,
          wc: null
        }
      }
    }
    if (action.type === 'ACTIVATE_FH') {
      if (state.fh === null) {
        updateInitsFh(event)
        const len = Object.values(state).filter(x => x === event).length
        if (len === 1) {
          let key_entry = Object.entries(state).filter(x => x[1] === event )[0][0]
          state[key_entry] = null
        }
          updateInitsBb(state.bb)
          updateInitsWc(state.wc)
          updateInitsTc(state.tc)
          updateFreehit(true, event, state.tc, state.wc, state.bb)
        return {
          ...state,
          fh: event
        }
      } else {
        updateInitsFh(null)
        updateFreehit(false, null, init_tc, init_wc, init_bb)
        return {
          ...state,
          fh: null
        }
      }
    }
    if (action.type === 'ACTIVATE_TC') {
      if (state.tc === null) {
        updateInitsTc(event)
        const len = Object.values(state).filter(x => x === event).length
        if (len === 1) {
          let key_entry = Object.entries(state).filter(x => x[1] === event )[0][0]
          state[key_entry] = null
          updateInitsFh(state.fh)
          updateInitsWc(state.wc)
          updateInitsBb(state.bb)
          updateTcap(true, event, state.fh, state.bb, state.wc)
        }
        return {
          ...state,
          tc: event
        }
      } else {
        updateInitsTc(null)
        updateTcap(false, null, init_fh, init_bb, init_wc)
        return {
          ...state,
          tc: null
        }
      }
    }
    if (action.type === 'ACTIVATE_BB') {
      if (state.bb === null) {
        updateInitsBb(event)
        const len = Object.values(state).filter(x => x === event).length
        if (len === 1) {
          let key_entry = Object.entries(state).filter(x => x[1] === event )[0][0]
          state[key_entry] = null
        }
          updateInitsFh(state.fh)
          updateInitsWc(state.wc)
          updateInitsTc(state.tc)
          updateBboost(true, event, state.fh, state.tc, state.wc)
        //updateBboost(true, event, init_fh, init_tc, init_wc)
        return {
          ...state,
          bb: event
        }
      } else {
        updateInitsBb(null)
        updateBboost(false, null, init_fh, init_tc, init_wc)
        return {
          ...state,
          bb: null
        }
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    wc: null, tc: null, bb: null, fh: null
  })
  console.log(state)
  const { wc, tc, bb, fh } = state


  useEffect(() => {
    const fh = initialChips?.init_fh
    const tc = initialChips?.init_tc
    const bb = initialChips?.init_bb
    const wc = initialChips?.init_wc
    setInit({
      init_wc: initialChips?.init_wc,
      init_tc: initialChips?.init_tc,
      init_bb: initialChips?.init_bb,
      init_fh: initialChips?.init_fh
    })
    dispatch({
      type: 'INITIAL_CHIPS',
      payload: {
        ...state,
        wc,
        tc,
        bb,
        fh
      }
    })
  }, [initialChips])
  useEffect(() => {
    setEvent(eventId + 1)
  }, [eventId])
  
  useEffect(() => {
    getPickIndex(curPage);
  }, [getPickIndex, curPage]);

  const onSubmit = (e) => {
    e.preventDefault();
    setManagerId(fplId);
    getManagerInfo(fplId)
    localStorage.setItem("managerId", fplId);
    setFplId(null);
  };

  const viewNextPage = () => {
    setEvent((v) => v + 1)
    setCurPage((v) => v + 1);
  };
  const viewPreviousPage = () => {
    setEvent((v) => v - 1)
    setCurPage((v) => v - 1);
  };

  const handleClose = () => {
    setShow(false);
  };

  const viewTransfers = () => {
    setShow(true);
  };

  const activateWC1 = () => {
    dispatch({
      type: 'ACTIVATE_WC1'
    })
  };

  const activateWC2 = () => {
    dispatch({
      type: 'ACTIVATE_WC2'
    })

  };

  const activateFH = () => {
    dispatch({
      type: 'ACTIVATE_FH'
    })
  };

  const activateTC = () => {
    dispatch({
      type: 'ACTIVATE_TC'
    })
  };

  const activateBB = () => {
    dispatch({
      type: 'ACTIVATE_BB',
      payload: event
    })
  };

  const reset = () => {
    resetGws();
  };

  const goalKeeper = getGoalKeeper(players, picks, curPage, curSize);
  const defenders = getDefenders(players, picks, curPage, curSize);
  const midfielders = getMidfielders(players, picks, curPage, curSize);
  const forwards = getForwards(players, picks, curPage, curSize);
  const benched = getBenched(players, picks, curPage, curSize);
  let pageOneVisible = curPage === 1 ? "hidden" : "visible";
  let lastPageVisible =
    curPage === length || length === 0 ? "hidden" : "visible";
  let disabled = playersSelected() < 15 ? true : false;
  return (
    <>
      {managerId === null && (
        <div className="form py-2">
          <form onSubmit={onSubmit}>
            <div className="fpl-id py-2">
              <label htmlFor="fplId">Enter FPL ID</label>
              <input
                className="form-control"
                type="number"
                min={1}
                id="fplId"
                value={fplId}
                onChange={(e) => setFplId(e.target.value)}
              />
            </div>
            <div className="py-2">
              <Button type="submit" className="fpl-id-btn btn-dark py-2">
                Submit ID
              </Button>
            </div>
          </form>
        </div>
      )}
      {!!managerId && (<div>
        <div>
          <h1>{managerInfo?.name}</h1>
          <h4>{managerInfo?.player_first_name} {managerInfo?.player_last_name}</h4>
          <div className="my-rank"><div>{colorOfArr === 'green' && <AiFillCaretUp />}
            {colorOfArr === 'red' && <AiFillCaretDown />}
            {colorOfArr === 'grey' && <AiFillCaretRight />}
          </div>
            <h4 style={{ padding: 0, margin: 0, marginLeft: 10 + 'px' }}>{managerInfo?.summary_overall_rank}</h4>
          </div>
        </div>
        <div className="deadlines">
          <div>
            {playersSelected() === 15 ? (
              <button
                style={{ visibility: pageOneVisible }}
                onClick={viewPreviousPage}
                className="btn-controls-1"
                id="prevButton"
              >
                <img src={prevPage} alt="prev_page" />
              </button>
            ) : (
              <button className="btn-controls-1" id="prevButton" disabled>
                <img src={prevPage} alt="prev_page" />
              </button>
            )}
          </div>
          <div style={{ fontWeight: 700 }}>
            {gameweeks?.map((gameweek, idx) => {
              return (
                <div className="gw-heading" key={idx}>
                  {gameweek}
                </div>
              );
            })}
            <div>
              Deadline:&nbsp;
              {length === 0 ? (
                <div>Season is over!</div>
              ) : (
                countdowns?.map((countdown, idx) => {
                  return (
                    <div key={idx}>
                      {new Date(countdown).toDateString()}, &nbsp;
                      {getTime(new Date(countdown).toLocaleTimeString("en-US"))}
                      &nbsp;
                      {getPm(new Date(countdown).toLocaleTimeString("en-US"))}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div>
            {playersSelected() === 15 ? (
              <button
                style={{ visibility: lastPageVisible }}
                onClick={viewNextPage}
                className="btn-controls-1"
                id="nextButton"
              >
                <img src={nextPage} alt="next_page" />
              </button>
            ) : (
              <button className="btn-controls-1" id="nextButton" disabled>
                <img src={nextPage} alt="next_page" />
              </button>
            )}
          </div>
        </div>

        <div className="transfer-data p-2">
          <div className="transfer-item">
            <div>Selected</div>
            <div>{playersSelected()}/15</div>
          </div>
          <div className="transfer-item">
            <div>ITB</div>
            <div>{getInTheBank()}</div>
          </div>
          <div className="transfer-item">
            <div>TC</div>
            <div>{transferCost()}</div>
          </div>
          <div className="transfer-item">
            <div>FTs</div>
            <div>{wc === event || fh === event ? 'unlimited' :
              freeTransfers()}</div>
          </div>
        </div>

        <div className="trans-reset p-2">
          <Button onClick={viewTransfers} className="btn-dark">
            Transfers
          </Button>
          <Button onClick={reset} className="btn-dark">
            Reset
          </Button>
        </div>

        {/* Picks */}
        <div className="no-picks-team">
          <div className="default-player">
            {goalKeeper !== undefined &&
              getGoalKeeper(players, picks, curPage, curSize)?.map(
                (playerPos) => {
                  let player = players?.find((x) => x.id === playerPos.element);
                  let teamObj = teams?.find((x) => x.id === player.team);
                  let inTemp = tempPlayersOut?.some(
                    (x) => x.element === playerPos.element
                  );
                  let inplayersIn = playersIn[pickIndex - 1].arr?.some(
                    (x) => x.element === playerPos.element
                  );
                  let playerInClass = inplayersIn ? "player_in" : "";
                  let positionObj = elementTypes?.find(
                    (x) => x.id === player.element_type
                  );
                  let image =
                    positionObj?.id === 1 && !inTemp
                      ? `${teamObj?.code}_1-66`
                      : positionObj?.id >= 1 && !inTemp
                        ? `${teamObj?.code}-66`
                        : `0-66`;
                  let news = player.chance_of_playing_next_round;
                  let backgroundColor =
                    news === 0
                      ? "darkred"
                      : news === 25
                        ? "darkorange"
                        : news === 50
                          ? "orange"
                          : news === 75
                            ? "yellow"
                            : "rgba(0,0,55,0.9)";
                  let color =
                    news === 25
                      ? "rgba(0,0,55,0.9)"
                      : news === 50
                        ? "rgba(0,0,55,0.9)"
                        : news === 75
                          ? "rgba(0,0,55,0.9)"
                          : "white";
                  const opponents = loadOpponents(
                    fixtures,
                    events,
                    teams,
                    teamObj?.id
                  );
                  const playerOpps = loadPlayerOpponents(opponents, curPage);
                  return (
                    <div key={player.id} className="squad-player">
                      <SquadPlayer
                        image={image}
                        backgroundColor={backgroundColor}
                        playerOpps={playerOpps}
                        color={color}
                        key={player.id}
                        player={player}
                        teams={teams}
                        playerPos={playerPos}
                        positionObj={positionObj}
                        playerInClass={playerInClass}
                        curPage={curPage}
                      ></SquadPlayer>
                    </div>
                  );
                }
              )}
          </div>
          <div className="default-player">
            {defenders !== undefined &&
              defenders?.map((playerPos) => {
                let player = players?.find((x) => x.id === playerPos.element);
                let teamObj = teams?.find((x) => x.id === player.team);
                let inTemp = tempPlayersOut?.some(
                  (x) => x.element === playerPos.element
                );
                let inplayersIn = playersIn[pickIndex - 1].arr?.some(
                  (x) => x.element === playerPos.element
                );
                let playerInClass = inplayersIn ? "player_in" : "";
                let positionObj = elementTypes?.find(
                  (x) => x.id === player.element_type
                );
                let image =
                  positionObj?.id === 1 && !inTemp
                    ? `${teamObj?.code}_1-66`
                    : positionObj?.id >= 1 && !inTemp
                      ? `${teamObj?.code}-66`
                      : `0-66`;
                let news = player.chance_of_playing_next_round;
                let backgroundColor =
                  news === 0
                    ? "darkred"
                    : news === 25
                      ? "darkorange"
                      : news === 50
                        ? "orange"
                        : news === 75
                          ? "yellow"
                          : "rgba(0,0,55,0.9)";
                let color =
                  news === 25
                    ? "rgba(0,0,55,0.9)"
                    : news === 50
                      ? "rgba(0,0,55,0.9)"
                      : news === 75
                        ? "rgba(0,0,55,0.9)"
                        : "white";
                const opponents = loadOpponents(
                  fixtures,
                  events,
                  teams,
                  teamObj?.id
                );
                const playerOpps = loadPlayerOpponents(opponents, curPage);
                return (
                  <div key={player.id} className="squad-player">
                    <SquadPlayer
                      image={image}
                      backgroundColor={backgroundColor}
                      color={color}
                      playerOpps={playerOpps}
                      key={player.id}
                      player={player}
                      teams={teams}
                      playerPos={playerPos}
                      positionObj={positionObj}
                      playerInClass={playerInClass}
                      curPage={curPage}
                    ></SquadPlayer>
                  </div>
                );
              })}
          </div>
          <div className="default-player">
            {midfielders !== undefined &&
              midfielders?.map((playerPos) => {
                let player = players?.find((x) => x.id === playerPos.element);
                let teamObj = teams?.find((x) => x.id === player.team);
                let inTemp = tempPlayersOut?.some(
                  (x) => x.element === playerPos.element
                );
                let inplayersIn = playersIn[pickIndex - 1].arr?.some(
                  (x) => x.element === playerPos.element
                );
                let playerInClass = inplayersIn ? "player_in" : "";
                let positionObj = elementTypes?.find(
                  (x) => x.id === player.element_type
                );
                let image =
                  positionObj?.id === 1 && !inTemp
                    ? `${teamObj?.code}_1-66`
                    : positionObj?.id >= 1 && !inTemp
                      ? `${teamObj?.code}-66`
                      : `0-66`;
                let news = player.chance_of_playing_next_round;
                let backgroundColor =
                  news === 0
                    ? "darkred"
                    : news === 25
                      ? "darkorange"
                      : news === 50
                        ? "orange"
                        : news === 75
                          ? "yellow"
                          : "rgba(0,0,55,0.9)";
                let color =
                  news === 25
                    ? "rgba(0,0,55,0.9)"
                    : news === 50
                      ? "rgba(0,0,55,0.9)"
                      : news === 75
                        ? "rgba(0,0,55,0.9)"
                        : "white";
                const opponents = loadOpponents(
                  fixtures,
                  events,
                  teams,
                  teamObj?.id
                );
                const playerOpps = loadPlayerOpponents(opponents, curPage);
                return (
                  <div key={player.id} className="squad-player">
                    <SquadPlayer
                      image={image}
                      backgroundColor={backgroundColor}
                      color={color}
                      playerOpps={playerOpps}
                      key={player.id}
                      player={player}
                      teams={teams}
                      playerPos={playerPos}
                      positionObj={positionObj}
                      playerInClass={playerInClass}
                      curPage={curPage}
                    ></SquadPlayer>
                  </div>
                );
              })}
          </div>
          <div className="default-player">
            {forwards !== undefined &&
              forwards?.map((playerPos) => {
                let player = players?.find((x) => x.id === playerPos.element);
                let teamObj = teams?.find((x) => x.id === player.team);
                let inTemp = tempPlayersOut?.some(
                  (x) => x.element === playerPos.element
                );
                let inplayersIn = playersIn[pickIndex - 1].arr?.some(
                  (x) => x.element === playerPos.element
                );
                let playerInClass = inplayersIn ? "player_in" : "";
                let positionObj = elementTypes?.find(
                  (x) => x.id === player.element_type
                );
                let image =
                  positionObj?.id === 1 && !inTemp
                    ? `${teamObj?.code}_1-66`
                    : positionObj?.id >= 1 && !inTemp
                      ? `${teamObj?.code}-66`
                      : `0-66`;
                let news = player.chance_of_playing_next_round;
                let backgroundColor =
                  news === 0
                    ? "darkred"
                    : news === 25
                      ? "darkorange"
                      : news === 50
                        ? "orange"
                        : news === 75
                          ? "yellow"
                          : "rgba(0,0,55,0.9)";
                let color =
                  news === 25
                    ? "rgba(0,0,55,0.9)"
                    : news === 50
                      ? "rgba(0,0,55,0.9)"
                      : news === 75
                        ? "rgba(0,0,55,0.9)"
                        : "white";
                const opponents = loadOpponents(
                  fixtures,
                  events,
                  teams,
                  teamObj?.id
                );
                const playerOpps = loadPlayerOpponents(opponents, curPage);
                return (
                  <div key={player.id} className="squad-player">
                    <SquadPlayer
                      image={image}
                      backgroundColor={backgroundColor}
                      color={color}
                      playerOpps={playerOpps}
                      key={player.id}
                      player={player}
                      teams={teams}
                      playerPos={playerPos}
                      positionObj={positionObj}
                      playerInClass={playerInClass}
                      curPage={curPage}
                    ></SquadPlayer>
                  </div>
                );
              })}
          </div>
          <div className={`${bb === event ? 'bboost' : ''} default-bench`}>
            {benched !== undefined &&
              benched?.map((playerPos) => {
                let player = players?.find((x) => x.id === playerPos.element);
                let teamObj = teams?.find((x) => x.id === player.team);
                let inTemp = tempPlayersOut?.some(
                  (x) => x.element === playerPos.element
                );
                let inplayersIn = playersIn[pickIndex - 1].arr?.some(
                  (x) => x.element === playerPos.element
                );
                let playerInClass = inplayersIn ? "player_in" : "";
                let positionObj = elementTypes?.find(
                  (x) => x.id === player.element_type
                );
                let image =
                  positionObj?.id === 1 && !inTemp
                    ? `${teamObj?.code}_1-66`
                    : positionObj?.id >= 1 && !inTemp
                      ? `${teamObj?.code}-66`
                      : `0-66`;
                let news = player.chance_of_playing_next_round;
                let backgroundColor =
                  news === 0
                    ? "darkred"
                    : news === 25
                      ? "darkorange"
                      : news === 50
                        ? "orange"
                        : news === 75
                          ? "yellow"
                          : "rgba(0,0,55,0.9)";
                let color =
                  news === 25
                    ? "rgba(0,0,55,0.9)"
                    : news === 50
                      ? "rgba(0,0,55,0.9)"
                      : news === 75
                        ? "rgba(0,0,55,0.9)"
                        : "white";
                const opponents = loadOpponents(
                  fixtures,
                  events,
                  teams,
                  teamObj?.id
                );
                const playerOpps = loadPlayerOpponents(opponents, curPage);
                return (
                  <div key={player.id} className="squad-player">
                    <SquadPlayer
                      image={image}
                      backgroundColor={backgroundColor}
                      color={color}
                      playerOpps={playerOpps}
                      key={player.id}
                      player={player}
                      teams={teams}
                      playerPos={playerPos}
                      positionObj={positionObj}
                      playerInClass={playerInClass}
                      curPage={curPage}
                    ></SquadPlayer>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="chip-buttons p-2">
          {new Date().toISOString() < new Date("2024/12/26/14:00").toISOString() && <div>
            {(wc === null || wc === event) ? <Button onClick={activateWC1}>
              <div className="style-btn"><div>Wildcard</div>
                {wc === event && <div>Active</div>}</div>
            </Button> : <Button
              className="btn btn-dark" disabled>
              <div className="style-btn">
                <div>Wildcard</div>
                {wc !== null && <div>Played</div>}
                {wc !== null && <div>GW {wc}</div>}
              </div>
            </Button>}
          </div>}

          {new Date().toISOString() > new Date("2024/12/26/14:00").toISOString() && <>{(wc === null || wc === event) ? <Button onClick={activateWC2}>
            <div className="style-btn"><div>Wildcard</div>
              {wc === event && <div>Active</div>}</div>
          </Button> : <Button disabled className="btn btn-dark">
            <div className="style-btn">
              <div>Wildcard</div>
              {wc !== null && <div>Played</div>}
              {wc !== null && <div>GW {wc}</div>}
            </div>
          </Button>}</>}
          {(bb === null || bb === event) ? <Button onClick={activateBB}>
            <div className="style-btn"><div>Bench Boost</div>{bb === event && <div>Active</div>}</div>
          </Button> : <Button disabled className="btn btn-dark">
            <div className="style-btn">
              <div>Bench Boost</div>
              {bb !== null && <div>Played</div>}
              {bb !== null && <div>GW {bb}</div>}
            </div>
          </Button>}
          {(fh === null || fh === event) ? <Button onClick={activateFH}>
            <div className="style-btn"><div>FreeHit</div>{fh === event && <div>Active</div>}</div>
          </Button> : <Button disabled className="btn btn-dark">
            <div className="style-btn">
              <div>FreeHit</div>
              {fh !== null && <div>Played</div>}
              {fh !== null && <div>GW {fh}</div>}
            </div>
          </Button>}
          {(tc === null || tc === event) ? <Button onClick={activateTC}>
            <div className="style-btn"><div>Triple Captain</div>
              {tc === event && <div>Active</div>}</div>
          </Button> : <Button disabled className="btn btn-dark">
            <div className="style-btn">
              <div>Triple Captain</div>
              {tc !== null && <div>Played</div>}
              {tc !== null && <div>GW {tc}</div>}
            </div>
          </Button>}
          <Button
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("managerId");
              setManagerId(null);
            }}
            className="btn btn-dark btn-shadow"
          >
            Change FPL ID
          </Button>
        </div>
        <TransferRows show={show} handleClose={handleClose} />
      </div>)}
    </>
  );
};

export default Pitch;

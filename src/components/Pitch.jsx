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
const Pitch = () => {
  const {
    players,
    getManagerInfo,
    managerHistory,
    managerInfo,
    managerPicks,
    picks,
    resetGws,
    tempPlayersOut,
    playersIn,
    pickIndex,
    transferLogic,
    freeTransfers,
    transferCost,
    eventId,
    chips,
    playersSelected,
    getInTheBank,
    getPickIndex,
    updateWildcard
  } = useManager();
  const [fplId, setFplId] = useState("");
  const [managerId, setManagerId] = useState(
    localStorage.getItem("managerId") || null
  );
  const { teams, fixtures, events, elementTypes } = usePlayer();
  const curSize = 1;
  const [curPage, setCurPage] = useState(1);
  const [show, setShow] = useState(false);

  const { gameweeks, length, countdowns } = getGameweeks(
    events,
    curPage,
    curSize
  );

  const reducer = (state, action) => {
    if (action.type === 'INITIAL_CHIPS') {
      return action.payload
    }
    if (action.type === 'INC_EVENT') {
      return {
        ...state,
        event: state.event + 1
      }
    }
    if (action.type === 'DEC_EVENT') {
      return {
        ...state,
        event: state.event - 1
      }
    }
    if (action.type === 'ACTIVATE_WC1') {
      updateWildcard(true, action.payload)
      return {
        ...state,
        wc1: action.payload
      }
    }
    if (action.type === 'DEACT_WC1') {
      updateWildcard(false, null)
      return {
        ...state,
        wc1: null
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    event: 1, wc1: null, wc2: null, tc: null, bb: null, fh: null
  })
  const { wc1, wc2, tc, bb, fh, event } = state


  useEffect(() => {
    const { wildcard, bboost, tcap, freehit } = chips
    dispatch({
      type: 'INITIAL_CHIPS',
      payload: {
        ...state,
        wc1: wildcard.event,
        tc: tcap.event,
        bb: bboost.event,
        fh: freehit.event,
        event: eventId + 1
      }
    })
  }, [chips, eventId])
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
    dispatch({ type: 'INC_EVENT', payload: 1 })
    setCurPage((v) => v + 1);
  };
  const viewPreviousPage = () => {
    dispatch({ type: 'DEC_EVENT' })
    setCurPage((v) => v - 1);
  };

  const handleClose = () => {
    setShow(false);
  };

  const viewTransfers = () => {
    setShow(true);
  };

  const activateWC1 = () => {
   /* if (chips?.wildcard.event === event) {
      dispatch({ type: 'DEACT_WC1' })
    } else {
      dispatch({ type: 'ACTIVATE_WC1', payload: event })
    }*/
   console.log("wc1")
  };

  const activateWC2 = () => {
    console.log("wc2");
  };

  const activateFH = () => {
    console.log("fh");
  };

  const activateTC = () => {
    console.log("tc");
  };

  const activateBB = () => {
    console.log("bb");
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
            <div>{chips?.wildcard?.event === +eventId + curPage ? 'unlimited' :
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
          <div className="default-bench">
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
        <Button 
        className="btn btn-dark" onClick={activateWC1}>
          <div>Wildcard 1</div>
        </Button>
        <Button onClick={activateWC2} className="btn btn-dark">
          Wildcard 2
        </Button>
        <Button onClick={activateBB} className="btn btn-dark">
          Bench Boost
        </Button>
        <Button onClick={activateFH} className="btn btn-dark">
          FreeHit
        </Button>
        <Button onClick={activateTC} className="btn btn-dark">
          Triple Captain
        </Button>
      </div>
        <TransferRows show={show} handleClose={handleClose} />
        <div className="py-2">
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
      </div>)}
    </>
  );
};

export default Pitch;

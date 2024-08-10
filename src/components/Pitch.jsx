import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useManager } from "../ManagerContext";
import { usePlayer } from "../PlayerContext";
import SquadPlayer from "./SquadPlayer";
import prevPage from "../assets/chevron_left.png"
import nextPage from "../assets/chevron_right.png"
import { getGameweeks } from "../helpers/timeHelper";
import getTime from "../utils/getTime";
import getPm from "../utils/getPm";
import { loadOpponents, loadPlayerOpponents } from "../helpers/fixtureHelper";
import { getGoalKeeper, getDefenders, getMidfielders, getForwards, getBenched } from "../helpers/picksHelper";
const Pitch = () => {
  const { players, getManagerInfo, managerHistory, managerInfo,
    managerPicks, picks, resetGws, tempPlayersOut, playersIn, pickIndex, transferLogic,
  playersSelected, getInTheBank, getPickIndex } = useManager();
  const { teams, fixtures, events, elementTypes} = usePlayer()
    const curSize = 1;
  const [curPage, setCurPage] = useState(1);
  const { fts, tc} = transferLogic

  const { gameweeks, length, countdowns } = getGameweeks(events, curPage, curSize)

  //getPickIndex(curPage)
  useEffect(() => {
    
    getPickIndex(curPage)
    }, [getPickIndex, curPage])

  const viewNextPage = () => {
    setCurPage((v) => v + 1);
  };
  const viewPreviousPage = () => {
    setCurPage((v) => v - 1);
  };

  const reset = () => {
    resetGws()
  }

  const goalKeeper = getGoalKeeper(players, picks, curPage, curSize)
  const defenders = getDefenders(players, picks, curPage, curSize)
  const midfielders = getMidfielders(players, picks, curPage, curSize)
  const forwards = getForwards(players, picks, curPage, curSize)
  const benched = getBenched(players, picks, curPage, curSize)
  let pageOneVisible = curPage === 1 ? "hidden" : "visible";
  let lastPageVisible =
    curPage === length || length === 0 ? "hidden" : "visible";
    let disabled = playersSelected() < 15 ? true : false
  return (
    <div>
      {/*<div className="drafts">
        <div className="draft-cell">Plan 1</div>
        <div className="draft-cell">Plan 2</div>
        <div className="draft-cell">Plan 3</div>
      </div>*/}
      <div className="deadlines">
        <div>
        {playersSelected() === 15 ? <button
        style={{ visibility: pageOneVisible }} onClick={viewPreviousPage} className="btn-controls-1" id="prevButton">
      <img src={prevPage} alt="prev_page"/>
  </button> : <button className="btn-controls-1" id="prevButton" disabled>
  <img src={prevPage} alt="prev_page"/></button>}
        </div>
      <div style={{ fontWeight: 700 }}>
        {gameweeks.map((gameweek, idx) => {
                      return (
                        <div className="gw-heading" key={idx}>
                          {gameweek}
                        </div>
                      );
                    })}
        <div>Deadline:&nbsp;
        {length === 0 ? (
                      <div>Season is over!</div>
                    ) : (
                      countdowns.map((countdown, idx) => {
                        return (
                          <div key={idx}>
                            {new Date(countdown).toDateString()}, &nbsp;
                            {getTime(
                              new Date(countdown).toLocaleTimeString("en-US")
                            )}
                            &nbsp;
                            {getPm(
                              new Date(countdown).toLocaleTimeString("en-US")
                            )}
                          </div>
                        );
                      })
                    )}
        </div>
      </div>
      <div>
      {playersSelected() === 15 ? <button
      style={{ visibility: lastPageVisible }}  onClick={viewNextPage} className="btn-controls-1" id="nextButton">
      <img src={nextPage} alt="next_page"/>
  </button> : <button className="btn-controls-1" id="nextButton" disabled><img src={nextPage} alt="next_page"/></button>}
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
          <div>{tc}</div>
        </div>
        <div className="transfer-item">
          <div>FTs</div>
          <div>{fts}</div>
        </div>
      </div>

      <div className="trans-reset p-2">
        <Button className="btn-dark">Transfers</Button>
        <Button onClick={reset} className="btn-dark">Reset</Button>
      </div>

      {/* Picks */}
        <div className="no-picks-team">
          <div className="default-player">
          {goalKeeper !== undefined && 
            getGoalKeeper(players, picks, curPage, curSize).map((playerPos) => {
              let player = players.find(
                (x) => x.id === playerPos.element
              );
              let teamObj = teams.find((x) => x.id === player.team);
              let inTemp = tempPlayersOut.some(
                (x) => x.element === playerPos.element
              );
              let inplayersIn = playersIn[
                pickIndex - 1
              ].arr.some((x) => x.element === playerPos.element);
              let playerInClass = inplayersIn ? "player_in" : "";
              let positionObj = elementTypes.find(
                (x) => x.id === player.element_type
              );
              let image =
                positionObj.id === 1 && !inTemp
                  ? `${teamObj.code}_1-66`
                  : positionObj.id >= 1 && !inTemp
                  ? `${teamObj.code}-66`
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
                  console.log(teamObj.id)
              const opponents = loadOpponents(
                fixtures,
                events,
                teams,
                teamObj.id
              );
              const playerOpps = loadPlayerOpponents(
                opponents,
                curPage
              );
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
            }) }
          </div>
          <div className="default-player">
            {defenders !== undefined && 
            defenders.map((playerPos) => {
              let player = players.find(
                (x) => x.id === playerPos.element
              );
              let teamObj = teams.find((x) => x.id === player.team);
              let inTemp = tempPlayersOut.some(
                (x) => x.element === playerPos.element
              );
              let inplayersIn = playersIn[
                pickIndex - 1
              ].arr.some((x) => x.element === playerPos.element);
              let playerInClass = inplayersIn ? "player_in" : "";
              let positionObj = elementTypes.find(
                (x) => x.id === player.element_type
              );
              let image =
                positionObj.id === 1 && !inTemp
                  ? `${teamObj.code}_1-66`
                  : positionObj.id >= 1 && !inTemp
                  ? `${teamObj.code}-66`
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
              teamObj.id
              );
              const playerOpps = loadPlayerOpponents(
                opponents,
                curPage
              );
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
            }) }
          </div>
          <div className="default-player">
          {midfielders !== undefined && 
            midfielders.map((playerPos) => {
              let player = players.find(
                (x) => x.id === playerPos.element
              );
              let teamObj = teams.find((x) => x.id === player.team);
              let inTemp = tempPlayersOut.some(
                (x) => x.element === playerPos.element
              );
              let inplayersIn = playersIn[
                pickIndex - 1
              ].arr.some((x) => x.element === playerPos.element);
              let playerInClass = inplayersIn ? "player_in" : "";
              let positionObj = elementTypes.find(
                (x) => x.id === player.element_type
              );
              let image =
                positionObj.id === 1 && !inTemp
                  ? `${teamObj.code}_1-66`
                  : positionObj.id >= 1 && !inTemp
                  ? `${teamObj.code}-66`
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
              teamObj.id
              );
              const playerOpps = loadPlayerOpponents(
                opponents,
                curPage
              );
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
            }) }
          </div>
          <div className="default-player">
          {forwards !== undefined && 
            forwards.map((playerPos) => {
              let player = players.find(
                (x) => x.id === playerPos.element
              );
              let teamObj = teams.find((x) => x.id === player.team);
              let inTemp = tempPlayersOut.some(
                (x) => x.element === playerPos.element
              );
              let inplayersIn = playersIn[
                pickIndex - 1
              ].arr.some((x) => x.element === playerPos.element);
              let playerInClass = inplayersIn ? "player_in" : "";
              let positionObj = elementTypes.find(
                (x) => x.id === player.element_type
              );
              let image =
                positionObj.id === 1 && !inTemp
                  ? `${teamObj.code}_1-66`
                  : positionObj.id >= 1 && !inTemp
                  ? `${teamObj.code}-66`
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
                teamObj.id
              );
              const playerOpps = loadPlayerOpponents(
                opponents,
                curPage
              );
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
            }) }
          </div>
          <div className="default-bench">
          {benched !== undefined && 
            benched.map((playerPos) => {
              let player = players.find(
                (x) => x.id === playerPos.element
              );
              let teamObj = teams.find((x) => x.id === player.team);
              let inTemp = tempPlayersOut.some(
                (x) => x.element === playerPos.element
              );
              let inplayersIn = playersIn[
                pickIndex - 1
              ].arr.some((x) => x.element === playerPos.element);
              let playerInClass = inplayersIn ? "player_in" : "";
              let positionObj = elementTypes.find(
                (x) => x.id === player.element_type
              );
              let image =
                positionObj.id === 1 && !inTemp
                  ? `${teamObj.code}_1-66`
                  : positionObj.id >= 1 && !inTemp
                  ? `${teamObj.code}-66`
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
              teamObj.id
              );
              const playerOpps = loadPlayerOpponents(
                opponents,
                curPage
              );
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
            }) }
          </div>
        </div>

      <div className="chip-buttons p-2">
        <Button className="btn-dark">Wildcard 1</Button>
        <Button className="btn-dark">Wildcard 2</Button>
        <Button className="btn-dark">Bench Boost</Button>
        <Button className="btn-dark">FreeHit</Button>
        <Button className="btn-dark">Triple Captain</Button>
      </div>
    </div>
  );
};

export default Pitch;

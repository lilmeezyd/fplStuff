import { useState } from "react";
import { usePlayer } from "../PlayerContext";
import PlayerInfo from "./PlayerInfo";
import DataPopUp from "./DataPopUp";
const SquadPlayer = (props) => {
  const {
    image,
    backgroundColor,
    color,
    player,
    teams,
    playerPos,
    positionObj,
    playerInClass,
    curPage,
    playerOpps
  } = props;
  const [show, setShow] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { elementTypes, players } = usePlayer();

  const handleClose = () => setShow(false);

  const handleShowModal = () => setShowModal(true)

  const handleCloseModal = () => setShowModal(false)
  return (
    <>
    
      {playerPos.multiplier === 0 ? (
        <div style={{fontWeight: 700}} className="bench_unit_heading">
          <span className="bean">
            {playerPos.position === 12
              ? ""
              : playerPos.position === 13
              ? "1."
              : playerPos.position === 14
              ? "2."
              : "3."}
            &nbsp;
            {
              elementTypes.find((x) => x.id === +playerPos.element_type)
                .singular_name_short
            }
          </span>
        </div>
      ) : (
        ""
      )}
      <div className="element">
        <div className="button-wrapper">
        <button onClick={handleShowModal} className="player-btn">
          <img src={`../shirt_${image}.webp`} className="image_pic" alt={player.web_name} />
          <div className="border border-dark">
            <div
              className="data_name"
              style={{ backgroundColor: backgroundColor, color: color }}
            >
              {player.web_name}
            </div>
            <div className="data_fixtures">
              <div className="next-fix">{playerPos.selling_price}</div>
              <div className="up-fix">
                {playerOpps.map((opp, idx) => {
                  return (
                    <div key={idx}>
                      {opp.arr.map((x, idx) => {
                        let color =
                          x.difficulty === 4 || x.difficulty === 5
                            ? "rgb(255,255,255)"
                            : "rgb(0,0,0)";
                        let backgroundColor =
                          x.difficulty === 2
                            ? "rgb(1, 252, 122)"
                            : x.difficulty === 3
                            ? "rgb(231, 231, 231)"
                            : x.difficulty === 4
                            ? "rgb(255, 23, 81)"
                            : x.difficulty === 5
                            ? "rgb(128, 7, 45)"
                            : "rgb(0,0,0)";
                        let name =
                          x.opponent > 0
                            ? teams.filter((y) => y.id === x.opponent)[0]
                                .short_name
                            : "";
                        return (
                          <span
                            className="opponent"
                            style={{
                                display: 'block',
                                padding: 0.2+'rem',
                              color: color,
                              backgroundColor: backgroundColor,
                            }}
                            key={idx}
                          >
                            {name}
                            {x.venue}
                          </span>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </button>
        </div>
      </div>
    
                <DataPopUp
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                playerPos={playerPos.element}
                elementTypes={elementTypes}
                players={players}
                teams={teams}
                ></DataPopUp>
    <PlayerInfo playerPos={playerPos.element}
      bgColor={playerPos.element_type}
      handleClose={handleClose}
      show={show}
      ></PlayerInfo>
    </>
  );
};


export default SquadPlayer;

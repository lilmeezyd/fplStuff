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
    playerOpps,
  } = props;
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { elementTypes, players } = usePlayer();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      {playerPos.multiplier === 0 ? (
        <div style={{ fontWeight: 700 }} className="bench_unit_heading">
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
              elementTypes?.find((x) => x.id === +playerPos.element_type)?.singular_name_short
            }
          </span>
        </div>
      ) : (
        "" 
      )}
      <div className="element">
        <div className="button-wrapper" id={playerPos.element}>
          <button onClick={handleShowModal} className="player-btn">
            <img
              src={`../shirt_${image}.webp`}
              className="image_pic"
              alt={player.web_name}
            />
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
                                display: "block",
                                padding: 0.2 + "rem",
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

            <div className="captain">
              {playerPos.is_captain ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  role="img"
                  focusable="false"
                  className="captain"
                >
                  <title>Captain</title>
                  <circle cx="12" cy="12" r="12" aria-hidden="true"></circle>
                  <path
                    d="M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z"
                    fill="#fff"
                    aria-hidden="true"
                  ></path>
                </svg>
              ) : playerPos.is_vice_captain ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  role="img"
                  focusable="false"
                  className="vice-captain"
                >
                  <title>Captain</title>
                  <circle cx="12" cy="12" r="12" aria-hidden="true"></circle>
                  <polygon
                    points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375"
                    transform="translate(5.25 6)"
                    fill="#fff"
                    aria-hidden="true"
                  ></polygon>
                </svg>
              ) : playerPos.is_captain ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  role="img"
                  focusable="false"
                  className="captain"
                >
                  <title>Captain</title>
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    aria-hidden="true"
                    fill="white"
                  ></circle>
                  <path
                    d="M15.0769667,14.370341 C14.4472145,15.2780796 13.4066319,15.8124328 12.3019667,15.795341 C10.4380057,15.795341 8.92696674,14.284302 8.92696674,12.420341 C8.92696674,10.55638 10.4380057,9.045341 12.3019667,9.045341 C13.3988206,9.06061696 14.42546,9.58781014 15.0769667,10.470341 L17.2519667,8.295341 C15.3643505,6.02401882 12.1615491,5.35094208 9.51934028,6.67031017 C6.87713147,7.98967826 5.49079334,10.954309 6.17225952,13.8279136 C6.8537257,16.7015182 9.42367333,18.7279285 12.3769667,18.720341 C14.2708124,18.7262708 16.0646133,17.8707658 17.2519667,16.395341 L15.0769667,14.370341 Z"
                    fill="#000"
                    aria-hidden="true"
                  ></path>
                </svg>
              ) : playerPos.is_vice_captain ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  role="img"
                  focusable="false"
                  className="vice-captain"
                >
                  <title>Captain</title>
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    aria-hidden="true"
                    fill="white"
                  ></circle>
                  <polygon
                    points="13.5 .375 8.925 12.375 4.65 12.375 0 .375 3.15 .375 6.75 10.05 10.35 .375"
                    transform="translate(5.25 6)"
                    fill="#000"
                    aria-hidden="true"
                  ></polygon>
                </svg>
              ) : (
                ""
              )}
            </div>
          </button>
        </div>
      </div>

      <DataPopUp
      handleShow={handleShow}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        playerPos={playerPos}
        elementTypes={elementTypes}
        players={players}
        teams={teams}
      ></DataPopUp>
      <PlayerInfo
        playerPos={playerPos.element}
        bgColor={playerPos.element_type}
        handleClose={handleClose}
        show={show}
      ></PlayerInfo>
    </>
  );
};

export default SquadPlayer;

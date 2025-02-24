import { useState } from "react";
import { usePlayer } from "../PlayerContext";
import { useManager } from "../ManagerContext"
import { Modal } from "react-bootstrap";
import PlayerInfo
  from "./PlayerInfo";
const PlayerCard = (props) => {
  const {
    backgroundColor, color, forwardImage, playerPos, shortName, shortPos,
    position, team, sort
  } = props
  const { teams } = usePlayer()
  const { pickIndex, picks, playersSelected, goalkeepersSelected,
    defendersSelected, midfieldersSelected, forwardsSelected,
    managersSelected,
    addToTransfersIn, addedPlayer, nowEvent, chips
  } = useManager()
  const [showInfo, setShowInfo] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)
  const [page, setPage] = useState(0)
  const [show, setShow] = useState(false);
  const [showPop, setShowPop] = useState(false)
  const { am } = chips


  const handleClose = () => setShow(false);
  const handleClosePop = () => setShowPop(false)
  const fixtureOpponents = playerPos?.fixtures?.filter(x => +x.event >= +nowEvent)?.map(x => {
    const opp = x.is_home === true ? x.team_a : x.team_h
    const returnedOpponent = `${teams?.find(y => y.id === opp)?.short_name}`
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
    return <div style={{
      textTransform: x.is_home === true ? 'uppercase' : 'lowercase' ,
      background: backgroundColor, color: color
    }}>
      {returnedOpponent}
    </div>
  }).slice(0, 4)

  const handleShowInfo = () => {
    setShow(true)
    //setShowInfo(true)
    //handleShow()
  }

  const handleShowTransfer = () => {
    setShowPop(true)
    //setShowTransfer(true)
    //handleShow()
  }
  const handleCloseTransfer = () => {
    setShowPop(false)
    //handleClose()
  }


  const transferIn = (player, positiion, team) => {
    addToTransfersIn(player, positiion, team)
    addedPlayer(team, player)
    handleCloseTransfer()
  }
  const playerIds = () => {
    let ids = picks[pickIndex - 1].newPicks.map(x => x.element)
    return ids
  }
  return (
    <>
      <div className="player-tbh">
        <div className="info">
          <button
            onClick={handleShowInfo}
            style={{ backgroundColor: backgroundColor, color: color }} className="player-info-button-table">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </button>
        </div>
        <div className="position-table-1">
          <button
            disabled={!!picks.length && playerIds().includes(playerPos.id)}
            onClick={handleShowTransfer} className="player-cell btn-table">
            <div className="images">
              <img src={`../shirt_${forwardImage}.webp`} alt={forwardImage} />
            </div>
            <div className="player-cell-info">
              <span className="name-1">{playerPos.web_name}</span>
              <div className="player-cell-details">
                <span className="team-name">{shortName}</span>
                <span className="position">{shortPos}</span>
              </div>
            </div>
          </button>
          <div className="player-fixtures">
            {fixtureOpponents.map((fix, idx) =>
              <div key={idx + 1}>
                {fix}
              </div>
            )}
          </div>
        </div>
        <div className="price money">{(playerPos.now_cost / 10).toFixed(1)}</div>
        <div className="points others">{sort === 'event_points' ? playerPos.event_points : playerPos.total_points}</div>
      </div>
      <TransferPopUp
        playersSelected={playersSelected}
        forwardsSelected={forwardsSelected}
        midfieldersSelected={midfieldersSelected}
        defendersSelected={defendersSelected}
        goalkeepersSelected={goalkeepersSelected}
        managersSelected={managersSelected}
        transferIn={transferIn}
        am={am}
        nowEvent={nowEvent}
        team={team}
        position={position}
        playerPos={playerPos} showPop={showPop} handleClosePop={handleClosePop}></TransferPopUp>
      <PlayerInfo playerPos={playerPos.id}
        bgColor={playerPos.element_type}
        handleClose={handleClose}
        show={show}
      ></PlayerInfo>
    </>
  )
}

const TransferPopUp = (props) => {
  const { showPop, handleClosePop, playerPos,
    playersSelected, goalkeepersSelected, defendersSelected,
    midfieldersSelected, forwardsSelected, managersSelected, am,
    nowEvent, transferIn,
    position, team
  } = props
  return (
    <Modal show={showPop} onHide={handleClosePop}>
      <Modal.Header style={{ background: "aquamarine" }} closeButton>
        <Modal.Title style={{ fontWeight: 500 }}>
          <div className="namesection">
            <span>{playerPos.first_name}&nbsp;{playerPos.second_name}</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        {playersSelected() === 16 && (nowEvent === am?.event + 2 || nowEvent === am?.event + 1 || nowEvent === am?.event) &&
          <div className='message'>
            <span className='danger span-msg'>You already have the maximum number of Players in your squad</span>
          </div>}
        {playersSelected() === 16 && (nowEvent > am?.event + 2 || nowEvent < am?.event) && <div className='message'>
          <span className='danger span-msg'>You already have the maximum number of Players in your squad</span>
        </div>}
        {playersSelected() < 16 && playerPos.element_type === 5 && managersSelected() === 1 && <div className='message'>
          <span className='danger span-msg'>You already have an assistant manager selected</span>
        </div>}
        {playerPos.element_type === 5 && am?.used === false && <div className='message'>
          <span className='danger span-msg'>Assistant manager chip is not activated</span>
        </div>}
        {(playersSelected() < 15 || playersSelected() < 16) &&
          playerPos.element_type === 1 &&
          goalkeepersSelected() === 2 && <div className='message'>
            <span className='danger span-msg'>You already have the maximum number of Goalkeepers in your squad</span>
          </div>}
        {(playersSelected() < 15 || playersSelected() < 16) &&
          playerPos.element_type === 2 &&
          defendersSelected() === 5 && <div className='message'>
            <span className='danger span-msg'>You already have the maximum number of Defenders in your squad</span>
          </div>}
        {(playersSelected() < 15 || playersSelected() < 16) &&
          playerPos.element_type === 3 &&
          midfieldersSelected() === 5 && <div className='message'>
            <span className='danger span-msg'>You already have the maximum number of Midfielders in your squad</span>
          </div>}
        {(playersSelected() < 15 || playersSelected() < 16) &&
          playerPos.element_type === 4 &&
          forwardsSelected() === 3 && <div className='message'>
            <span className='danger span-msg'>You already have the maximum number of Forwards in your squad</span>
          </div>}
        <div className="infobuttons">
          {(((playersSelected() < 16 || playersSelected() === undefined) &&
            playerPos.element_type === 1 && (goalkeepersSelected() === undefined || goalkeepersSelected() < 2)) ||
            ((playersSelected() < 16 || playersSelected() === undefined) &&
              playerPos.element_type === 2 && (defendersSelected() === undefined || defendersSelected() < 5)) ||
            ((playersSelected() < 16 || playersSelected() === undefined) &&
              playerPos.element_type === 3 && (midfieldersSelected() === undefined || midfieldersSelected() < 5)) ||
            ((playersSelected() < 16 || playersSelected() === undefined) &&
              (nowEvent === am?.event + 2 || nowEvent === am?.event + 1 || nowEvent === am?.event) &&
              playerPos.element_type === 5 && (managersSelected() === undefined || managersSelected() < 1)) ||
            ((playersSelected() < 16 || playersSelected() === undefined) &&
              playerPos.element_type === 4 && (forwardsSelected() === undefined || forwardsSelected() < 3))) && <button
                onClick={() => transferIn(playerPos.id, position, team)} className='btn-info btn-info-block btn-green'>Add</button>}
        </div>
      </Modal.Body>
    </Modal>)
}

export default PlayerCard
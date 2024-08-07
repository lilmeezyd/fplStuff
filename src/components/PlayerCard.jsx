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
    const {pickIndex, picks, playersSelected, goalkeepersSelected,
        defendersSelected, midfieldersSelected, forwardsSelected,
        addToTransfersIn, addedPlayer
    } = useManager()
    const [ showInfo, setShowInfo ] = useState(false)
    const [ showTransfer, setShowTransfer ] = useState(false)
    const [show, setShow] = useState(false);
    const [showPop, setShowPop] = useState(false)
    

    const handleClose = () => setShow(false);
    const handleClosePop = () => setShowPop(false)

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
        let ids = picks[pickIndex-1].newPicks.map(x => x.element)
        return ids
      }
  return (
    <>
    <div className="player-tbh">
    <div className="info">
        <button
        onClick={handleShowInfo}
         style={{backgroundColor: backgroundColor, color: color}} className="player-info-button-table">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
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
    </div>
    <div className="price money">{(playerPos.now_cost/10).toFixed(1)}</div>
    <div className="points others">{sort === 'event_points' ? playerPos.event_points : playerPos.total_points}</div>
</div>
<TransferPopUp 
playersSelected={playersSelected}
forwardsSelected={forwardsSelected}
midfieldersSelected={midfieldersSelected}
defendersSelected={defendersSelected}
goalkeepersSelected={goalkeepersSelected}
transferIn={transferIn}
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
    midfieldersSelected, forwardsSelected, transferIn,
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
      {playersSelected() === 15 && <div className='message'>
        <span className='danger span-msg'>You already have the maximum number of Players in your squad</span>
      </div>}
      {playersSelected() < 15 && 
      playerPos.element_type === 1 && 
      goalkeepersSelected() === 2 && <div className='message'>
         <span className='danger span-msg'>You already have the maximum number of Goalkeepers in your squad</span>
        </div>}
        {playersSelected() < 15 && 
      playerPos.element_type === 2 && 
      defendersSelected() === 5 && <div className='message'>
         <span className='danger span-msg'>You already have the maximum number of Defenders in your squad</span>
        </div>}
        {playersSelected() < 15 && 
      playerPos.element_type === 3 && 
      midfieldersSelected() === 5 && <div className='message'>
         <span className='danger span-msg'>You already have the maximum number of Midfielders in your squad</span>
        </div>}
        {playersSelected() < 15 && 
      playerPos.element_type === 4 && 
      forwardsSelected() === 3 && <div className='message'>
         <span className='danger span-msg'>You already have the maximum number of Forwards in your squad</span>
        </div>}
    <div className="infobuttons">
      {(((playersSelected() < 15 || playersSelected() === undefined) &&
      playerPos.element_type === 1 && (goalkeepersSelected() === undefined || goalkeepersSelected() < 2)) ||
      ((playersSelected() < 15 || playersSelected() === undefined) &&
        playerPos.element_type === 2 && (defendersSelected() === undefined || defendersSelected() < 5)) ||
        ((playersSelected() < 15 || playersSelected() === undefined) &&
          playerPos.element_type === 3 && (midfieldersSelected() === undefined || midfieldersSelected() < 5)) ||
          ((playersSelected() < 15 || playersSelected() === undefined) &&
            playerPos.element_type === 4 && (forwardsSelected() === undefined || forwardsSelected() < 3)))&& <button
         onClick={() => transferIn(playerPos.id, position, team)} className='btn-info btn-info-block btn-green'>Add Player</button>}
    </div>
      </Modal.Body>
    </Modal>)
}

export default PlayerCard
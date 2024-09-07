import { useManager } from "../ManagerContext";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
const DataPopUp = (props) => {
  const {
    teams,
    players,
    showModal,
    handleCloseModal,
    playerPos,
    elementTypes,
    handleShow
  } = props;
  const [ playerElement, setPlayerElement ] = useState(null)
  const [ swapArray, setSwapArray ] = useState([])
  const { outplayer, inplayerOne, inplayerTwo, playersOut, pickIndex, addToTransfersOut,
    changeCaptain, changeViceCaptain, getInPlayerOne, getInPlayerTwo, getOutPlayer,
    switchPlayers, changeBenchOrder, picks, cancelPlayer,tempPlayersOut
   } =
    useManager();

    useEffect(() => {
      let pPicks = document.querySelectorAll('.player-btn')
      Array.from(pPicks).forEach(x => {
          if(x.hasAttribute('disabled')) {
            x.removeAttribute('disabled')
            x.style.opacity = 1
          }
          if(x.parentElement.classList.contains('swap')) {
            x.parentElement.classList.remove('swap')
          }
    })
      Object.keys(outplayer).length > 0 && Object.keys(inplayerOne).length > 0 && switchPlayers()

        Object.keys(outplayer).length === 0 && Object.keys(inplayerOne).length > 0 && Object.keys(inplayerTwo).length > 0 && changeBenchOrder()
    }, [inplayerOne, inplayerTwo, outplayer, switchPlayers, changeBenchOrder])

    useEffect(() => {
      let pPicks = document.querySelectorAll('.button-wrapper')
      let noDefenders = picks[pickIndex-1].newPicks
                          .filter(x => x.element_type === 2 && x.multiplier !== 0).length
      let noMidfielders = picks[pickIndex-1].newPicks
                          .filter(x => x.element_type === 3 && x.multiplier !== 0).length
      let noForwards = picks[pickIndex-1].newPicks
                          .filter(x => x.element_type === 4 && x.multiplier !== 0).length
                          const disablePlayers = (arr) => {
                            Array.from(pPicks).forEach(x => {
                                 if(arr.includes(+x.id)) {
                                   x.querySelector('.player-btn').setAttribute('disabled', 'disabled')
                                  x.querySelector('.player-btn').style.opacity = 0.7
                                     
                                 }
                             })}
      const addSwap = (arr) => {
          Array.from(pPicks).forEach(x => {
              if(arr.includes(+x.id)) {
                 x.classList.add('swap')
              }
          })
      }    
      if(Object.keys(outplayer).length > 0) {
          let playerType = outplayer.element_type
          let playerId = outplayer.element
          if(playerType === 1) {
              const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type !== 1)
                                      .map(x => x.element)
              const swap = picks[pickIndex-1].newPicks
                              .filter(x => x.element_type === 1 && x.position === 12)
                              .map(x => x.element)
              addSwap(swap)
              setSwapArray(toDisable)
              disablePlayers(toDisable)                          
          }
          if(playerType === 2) {
              if(noDefenders === 3) {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => (x.position < 12 && x.element !== playerId) || (x.position >= 12 && x.element_type !== 2))
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element_type === 2 && x.position > 12)
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)               
              } else {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type === 1 || (x.position < 12 && x.element !== playerId))
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element_type !== 1 && x.position > 12)
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable) 
              }
          }
          if(playerType === 3) {
              if(noMidfielders === 2) {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type === 1 || (x.position < 12 && x.element !== playerId))
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element_type === 3 && x.position > 12)
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable) 
              } else {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type === 1 || (x.position < 12 && x.element !== playerId))
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element_type !== 1 && x.position > 12)
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable) 
              } 
          }
          if(playerType === 4) {
              if(noForwards === 1) {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => (x.position < 12 && x.element !== playerId) || (x.position > 12 && x.element_type !== 4))
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element_type === 4 && x.position > 12)
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)               
              } else {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type === 1 || (x.position < 12 && x.element !== playerId))
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element_type !== 1 && x.position > 12)
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable) 
              }
          }
      } else {
          setSwapArray([])
          Array.from(pPicks).forEach(x => {
              x.parentElement.classList.remove('swap')
          })
      }
  },[outplayer, picks, pickIndex]) 

    useEffect(() => {
      let pPicks = document.querySelectorAll('.button-wrapper')
      let noDefenders = picks[pickIndex-1].newPicks
                          .filter(x => x.element_type === 2 && x.position < 12).length
      let noForwards = picks[pickIndex-1].newPicks
                          .filter(x => x.element_type === 4 && x.position < 12).length
      const disablePlayers = (arr) => {
         Array.from(pPicks).forEach(x => {
              if(arr.includes(+x.id)) {
                x.querySelector('.player-btn').setAttribute('disabled', 'disabled')
                x.querySelector('.player-btn').style.opacity = 0.7
                  
              }
          })}
      const addSwap = (arr) => {
          Array.from(pPicks).forEach(x => {
              if(arr.includes(+x.id)) {
                  x.classList.add('swap')
              }
          })
      }    
      if(Object.keys(inplayerOne).length > 0) {
          let playerType = inplayerOne.element_type
          let playerId = inplayerOne.element
          if(playerType === 1) {
              const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => (x.position > 12 && x.element !== playerId) || (x.position < 12 && x.element_type !== 1))
                                      .map(x => x.element)
              const swap = picks[pickIndex-1].newPicks
                              .filter(x => x.element_type === 1 && x.position < 12)
                              .map(x => x.element)
              addSwap(swap)
              setSwapArray(toDisable)
              disablePlayers(toDisable) 
          }
          if(playerType === 2) {
              if(noForwards === 1) {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => ((x.element_type === 4 && x.position < 12) || x.element_type === 1))
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element !== playerId && ( (x.element_type !== 4 && x.element_type !== 1) || (x.position >= 12 && x.element_type !== 1)))
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)
              } else {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type === 1)
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element !== playerId && x.element_type !== 1)
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)
              }
          }
          if(playerType === 3) {
              if(noForwards === 1) {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => (x.element_type === 4 && x.position < 12) || x.element_type === 1)
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element !== playerId && ((x.element_type !== 4 && x.element_type !== 1 )|| (x.position >= 12 && x.element_type !== 1)))
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)
              } else if(noDefenders === 3) {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => (x.element_type === 2 && x.position < 12) || x.element_type === 1)
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element !== playerId &&  ((x.element_type !== 2 && x.element_type !== 1) || (x.position >= 12 && x.element_type !== 1)))
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)
              } else {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type === 1)
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => (x.element_type !== 1 && x.position < 12)||(x.element !== playerId && x.element_type !== 1))
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)
              }
          }
          if(playerType === 4) {
              if(noDefenders === 3) {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => (x.element_type === 2 && x.position < 12) || x.element_type === 1)
                                      .map(x => x.element)
                  const swap = picks[pickIndex-1].newPicks
                                  .filter(x => x.element !== playerId &&  ((x.element_type !== 2 && x.element_type !== 1) || (x.position >= 12 && x.element_type !== 1)))
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)
              } else {
                  const toDisable = picks[pickIndex-1].newPicks
                                      .filter(x => x.element_type === 1)
                                      .map(x => x.element)
                  const swap  = picks[pickIndex-1].newPicks
                                  .filter(x => (x.element_type !== 1 && x.position < 12)||(x.element !== playerId && x.element_type !== 1))
                                  .map(x => x.element)
                  addSwap(swap)
                  setSwapArray(toDisable)
                  disablePlayers(toDisable)
              }
          }
      } else {
          setSwapArray([])
          Array.from(pPicks).forEach(x => {
              x.parentElement.classList.remove('swap')
          })
      }
  }, [inplayerOne, picks, pickIndex])
    

  const playerDetails = () => {
    const player = players?.find((x) => x.id === playerPos?.element);
    let name = `${player?.first_name} ${player?.second_name}`;
    let team = teams?.find((x) => x.id === player.team)?.name;
    let teamId = teams?.find((x) => x.id === player.team)?.id;
    let position = elementTypes?.find(
      (x) => x.id === player.element_type
    )?.singular_name;

    return { name, team, teamId, position };
  };

  const captain = (id) => {
    changeCaptain(id)
    handleCloseModal()
}

const viceCaptain = (id) => {
    changeViceCaptain(id)
    handleCloseModal()
}

const setCancelPlayer = (player) => {
  cancelPlayer(player)
  handleCloseModal()
}

const setSwitchPlayer = (player) => {

  setPlayerElement(player.element_type)
  //setPlayerMultiplier(player.multiplier)

  if(player.multiplier <= 0) {
      if(Object.keys(inplayerOne).length > 0) {
          handleCloseModal()
          return getInPlayerTwo(player)
      }
      if(Object.keys(outplayer).length >= 0) {
          handleCloseModal()
          return getInPlayerOne(player)
      }
  } else {
      getOutPlayer(player)
      handleCloseModal()
  }
  
}

  const transferOut = (player) => {
    addToTransfersOut(player);
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header style={{ background: "aquamarine" }} closeButton>
        <Modal.Title style={{ fontWeight: 500 }}>
          <div className="namesection">
            <span>{playerDetails().name}</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <div className="infobuttons">
          <div className="py-2">
            {(Object.keys(outplayer).length === 0 && Object.keys(inplayerOne).length === 0) &&
              <Button onClick={() => transferOut(playerPos)} className={`form-control
                ${playersOut[pickIndex-1].arr?.some(x => x.element === playerPos?.element) ?
                    'btn-green':'btn-danger'}
                    ${(playerPos?.element === outplayer.element || playerPos?.element === inplayerOne.element) ? 'hide-btn':'show-btn'}`}>
                {playersOut[pickIndex-1].arr.some(x => x.element === playerPos?.element) ?
                    'Restore':'Transfer Out'}
                </Button>}
          </div>
          <div className="py-2">
            {(tempPlayersOut.length === 0 && 
            !swapArray.includes(playerPos?.element)) && <Button onClick={(playerPos?.element === outplayer.element || playerPos.element === inplayerOne.element)
                    ? () => setCancelPlayer(playerPos) : () => setSwitchPlayer(playerPos)}  className={`form-control
                      ${playersOut[pickIndex-1].arr.some(x => x.element === playerPos?.element) ?
                          'hide-btn':'show-btn'} btn-warning`}>
                      {(playerPos?.element === outplayer.element || playerPos?.element === inplayerOne.element)
                     ? 'Cancel' : 'Switch'}
                    </Button>}
          </div>
          <div className="py-2">
            {tempPlayersOut.length === 0 &&
            (Object.keys(outplayer).length === 0 && Object.keys(inplayerOne).length === 0) && 
              <Button onClick={() => captain(playerPos?.element)} className={`form-control btn-success
                ${playersOut[pickIndex-1].arr.some(x => x.element === playerPos.element) ?
                    'hide-btn':'show-btn'} 
                    ${playerPos.multiplier > 0 ? 'show-btn':'hide-btn'} 
                    ${(playerPos?.element === outplayer.element || playerPos?.element === inplayerOne.element) ? 'hide-btn':'show-btn'}`}>Make Captain</Button>}
          </div>
          <div className="py-2">
            {tempPlayersOut.length === 0 &&
            (Object.keys(outplayer).length === 0 && Object.keys(inplayerOne).length === 0) && 
              <Button onClick={() => viceCaptain(playerPos?.element)} 
              className={`form-control
                ${(playersOut[pickIndex-1].arr.some(x => x.element === playerPos?.element)) ?
                    'hide-btn':'show-btn'}
                    ${playerPos?.multiplier > 0 ? 'show-btn':'hide-btn'} 
                    ${(playerPos?.element === outplayer.element || playerPos?.element === inplayerOne.element) ? 'hide-btn':'show-btn'} `} >Make Vice Captain</Button>}
          </div>


          <div className="py-2">
            <Button onClick={handleShow}  className="form-control btn-light">View Information</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DataPopUp;

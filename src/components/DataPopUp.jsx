import { useManager } from "../ManagerContext";
import { Modal } from "react-bootstrap";
const DataPopUp = (props) => {
  const {
    teams,
    players,
    showModal,
    handleCloseModal,
    playerPos,
    elementTypes,
  } = props;

  const { outplayer, inplayerOne, playersOut, pickIndex, addToTransfersOut } =
    useManager;

  const playerDetails = () => {
    const player = players.find((x) => x.id === playerPos);
    let name = `${player.first_name} ${player.second_name}`;
    let team = teams.find((x) => x.id === player.team).name;
    let teamId = teams.find((x) => x.id === player.team).id;
    let position = elementTypes.find(
      (x) => x.id === player.element_type
    ).singular_name;

    return { name, team, teamId, position };
  };

  const transferOut = (player) => {
    addToTransfersOut(player);
    handleCloseModal();
  };
  console.log(inplayerOne);
  console.log(outplayer);
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
          
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DataPopUp;

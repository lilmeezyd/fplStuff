import { BiTransfer } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import { useManager } from "../ManagerContext";
import { usePlayer } from "../PlayerContext";
import TransferBodyIn from "./TransferBodyIn";
import TransferBodyOut from "./TransferBodyOut";

const TransferRows = (props) => {
    const {show, handleClose } = props
    const {pickIndex, playersOut, playersIn } = useManager();
    const { players, teams } = usePlayer()

    const loadTransfers = () => {
        const newPlayersOut = [];
        const newPlayersIn = [];
        const sortPlayers = (a, b) => {
          if (a.element_type < b.element_type) return 1;
          if (a.element_type > b.element_type) return -1;
        };
        playersOut[pickIndex - 1]?.arr.forEach((x) => {
          players.forEach((y) => {
            if (y.id === x.element) {
              newPlayersOut.push({
                ...x,
                element_type: y.element_type,
                web_name: y.web_name,
                team: y.team,
              });
            }
          });
        });
        newPlayersOut.sort(sortPlayers);
    
        playersIn[pickIndex - 1]?.arr.forEach((x) => {
          players.forEach((y) => {
            if (y.id === x.element) {
              newPlayersIn.push({
                ...x,
                element_type: y.element_type,
                web_name: y.web_name,
                team: y.team,
              });
            }
          });
        });
        newPlayersIn.sort(sortPlayers);
    
        return { newPlayersOut, newPlayersIn };
      };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ background: "aquamarine" }} closeButton>
        <Modal.Title>
          <div className="info-details">Transfers</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {playersOut[pickIndex - 1]?.arr.length > 0 ? (
    <div className="transfer-rows">
      <div className="transfer-out-wrapper">
        <h4>Transfer Out</h4>
        <div className="transfer-out">
          {loadTransfers().newPlayersOut.map((player) => {
            const teamObj = teams.find((x) => x.id === player.team);
            let playerTeam = teamObj.name;
            let image =
              player.element_type === 1
                ? `${teamObj.code}_1-66`
                : `${teamObj.code}-66`;
            return (
              <TransferBodyOut
                key={player.element}
                player={player}
                playerTeam={playerTeam}
                image={image}
              ></TransferBodyOut>
            );
          })}
        </div>
      </div>
      <div className="transfer-in-wrapper">
        <h4>Transfer In</h4>
        <div className="transfer-in">
          {loadTransfers().newPlayersIn.map((player) => {
            const teamObj = teams.find((x) => x.id === player.team);
            let playerTeam = teamObj.name;
            let image =
              player.element_type === 1
                ? `${teamObj.code}_1-66`
                : `${teamObj.code}-66`;
            return (
              <TransferBodyIn
                key={player.element}
                player={player}
                playerTeam={playerTeam}
                image={image}
              ></TransferBodyIn>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="no-trans small">No Transfers Made</div>
  )}
      </Modal.Body>
    </Modal>
  );
};

export default TransferRows;

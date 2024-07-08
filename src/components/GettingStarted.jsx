import { Modal } from "react-bootstrap"
const GettingStarted = (props) => {
  const {show, handleClose, picksStats} = props
  return (
    <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header style={{background: 'aquamarine'}} closeButton>
          <Modal.Title style={{fontWeight: 500}}>Getting Started</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {picksStats?.length > 0 ? picksStats?.map((pick, idx) =>
          <>
          <div key={idx+1}>Gameweek {pick?.event}</div>
          {pick?.players?.map(player => <div key={player?.element}>
            <div>{player.web_name}</div>
            </div>)}
          </>
          ) : 'Yet to be unlocked'}
        </Modal.Body>
      </Modal>
  )
}

export default GettingStarted
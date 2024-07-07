import { Modal} from "react-bootstrap"

const Score = (props) => {
    const {show, handleClose, historyDetails} = props
    return (
      <Modal
          show={show}
          onHide={handleClose}
        >
          <Modal.Header style={{background: 'aquamarine'}} closeButton>
            <Modal.Title style={{fontWeight: 700}}>Gameweek Score</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">
            {historyDetails?.map((x, idx) => 
            <div className="achieve-record" key={idx}>
              <div className="gw py-1">Gameweek {x.event}</div>
              <div className="rank-score">
                <div>Score</div>
                <div>{x.points}</div>
              </div>
            </div>)}
          </Modal.Body>
        </Modal>
    )
  }

export default Score
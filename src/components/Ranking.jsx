import { Modal } from "react-bootstrap"
const Ranking = (props) => {
    const {show, handleClose, historyDetails, heading} = props
  return (
    <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header style={{background: 'aquamarine'}} closeButton>
          <Modal.Title style={{fontWeight: 500}}>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {historyDetails?.map((x, idx) => 
          <div className="achieve-record" key={idx}>
            <div className="gw py-1">Gameweek {x.event}</div>
            <div className="rank-score">
                <div>Rank</div>
                <div>{x.rank}</div>
              </div>
          </div>)}
        </Modal.Body>
      </Modal>
  )
}

export default Ranking
import { Modal } from "react-bootstrap";
const GettingStarted = (props) => {
  const { show, handleClose, picksStats, heading } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ background: "aquamarine" }} closeButton>
        <Modal.Title style={{ fontWeight: 500 }}>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        {picksStats?.length > 0 ? (
          picksStats?.map((pick, idx) => (
            <div key={idx + 1} className="achieve-record-wrap">
              <div className="achieve-record">
                <div className="gw py-1">Gameweek {pick?.event}</div>
                {pick?.players?.map((player) => (
                  <div key={player?.element}>
                    <div className="gw-data py-2">
                      <div style={{ fontWeight: 500 }}>
                        {player.web_name}&nbsp;{player.was_home ? `(H)` : `(A)`}
                        &nbsp;V
                      </div>
                      <div>{player.opponent_team}</div>
                      <div>
                        {player.team_h_score}:{player.team_a_score}
                      </div>
                      <div>{player?.total_points}&nbsp;points</div>
                    </div>
                    <div className="date">
                      {player?.kickoff_time?.toDateString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="achieve-img"></div>
            </div>
          ))
        ) : (
          <div className="date">Yet to be unlocked</div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default GettingStarted;

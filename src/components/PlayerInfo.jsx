import { usePlayer } from "../PlayerContext";
import { Modal } from "react-bootstrap";
const PlayerInfo = (props) => {
  const { playerPos, bgColor, onClick, show, handleClose } = props;
  const { players, events, elementTypes, teams, fixtures } = usePlayer();

  const playerDetails = () => {
    const player = players?.find((x) => x.id === playerPos);
    let name = `${player?.first_name} ${player?.second_name}`;
    let team = teams?.find((x) => x.id === player?.team)?.name;
    let teamId = teams?.find((x) => x.id === player?.team)?.id;
    let position = elementTypes?.find(
      (x) => x?.id === player?.element_type
    )?.singular_name;

    let playerFixs = fixtures?.filter(x => (x.team_a === teamId || x.team_h === teamId) && !x.finished )
    .sort((x,y) => x.event > y.event ? 1 :-1)
    return { name, team, teamId, position, playerFixs };
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ background: "aquamarine" }} closeButton>
        <Modal.Title style={{ fontWeight: 500 }}>
          <div className="info-details">
            <span>{playerDetails().name}</span>
            <span>{playerDetails().team}</span>
            <span>{playerDetails().position}</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <div className="games-info">
          <div className="games-info-buttons">
            <div className="btn-game-fixtures py-3">Fixtures</div>
            <div className="games-info-fixtures">
              <div style={{fontWeight: 700}} className="fix-grid p-2">
                <div>Date</div>
                <div className="fdr">GW</div>
                <div className="fdr">Fixture</div>
                <div className="fdr">FDR</div>
              </div>
              <div>
                {playerDetails().playerFixs.map((x, idx) => {
                  let teamName = playerDetails().teamId === x.team_a ?
                  teams.find(tname => tname.id === x.team_h).name : 
                  teams.find(tname => tname.id === x.team_a).name
                  let diff = playerDetails().teamId === x.team_a ? x.team_a_difficulty : 
                  x.team_h_difficulty
                  let venue = playerDetails().teamId === x.team_a ? 'Away' : 
                  'Home'
                  let color = diff === 4 || diff === 5 ? 
                        'rgb(255,255,255)': 'rgb(0,0,0)'
                  let backgroundColor = diff === 2 ? 'rgb(1, 252, 122)' : 
                        diff === 3 ? 'rgb(231, 231, 231)' : diff === 4 ?
                        'rgb(255, 23, 81)' : diff === 5 ? 'rgb(128, 7, 45)' : 'rgb(0,0,0)'
                        return (
                          <div  style={{fontWeight: 700}} className="fix-grid p-2 fix-row" key={x.id}>
                            <div>
                            {x.kickoff === '' ? '' : new Date(x.kickoff_time).toDateString()}
                            </div>
                            <div  className="fdr">
                              {x.event}
                            </div>
                            <div className="actual-fixture">
                              <div>{teamName}</div><div>{venue}</div></div>
                    <div className="fdr fdr-2" style={{color: color, background: backgroundColor}}>
                      {diff}
                    </div>
                          </div>
                        )
})}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PlayerInfo;

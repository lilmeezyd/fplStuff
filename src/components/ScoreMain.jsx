import { useState, useMemo, useReducer, useCallback } from "react";
import Score from "../components/Score";
import { Button } from "react-bootstrap";

const ScoreMain = (props) => {
  const {history} = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function reducer(state, action) {
    if (action.type === "score_by_40") {
      return {
        value_1: 40,
        value_2: 50,
        heading: 'Sunday league score'
      };
    }

    if (action.type === "score_by_50") {
      return {
        value_1: 50,
        value_2: 60,
        heading: 'Amatuer score'
      };
    }

    if (action.type === "score_by_60") {
      return {
        value_1: 60,
        value_2: 80,
        heading: 'Semi pro score'
      };
    }

    if (action.type === "score_by_80") {
      return {
        value_1: 80,
        value_2: 90,
        heading: 'Pro score'
      };
    }
    if (action.type === "score_by_90") {
      return {
        value_1: 90,
        value_2: 100,
        heading: 'World class score'
      };
    }

    if (action.type === "score_by_100") {
      return {
        value_1: 100,
        value_2: 500,
        heading: 'Legendary score'
      };
    }
  }
  const [state, dispatch] = useReducer(reducer, { value_1: 0, value_2: 0, heading: '' });
  const { value_1, value_2, heading } = state;


  const handle40 = () => {
    setShow(true);
    dispatch({ type: "score_by_40" });
  };

  const handle50 = () => {
    setShow(true);
    dispatch({ type: "score_by_50" });
  };

  const handle60 = () => {
    setShow(true);
    dispatch({ type: "score_by_60" });
  };

  const handle80 = () => {
    setShow(true);
    dispatch({ type: "score_by_80" });
  };

  const handle90 = () => {
    setShow(true);
    dispatch({ type: "score_by_90" });
  };

  const handle100 = () => {
    setShow(true);
    dispatch({ type: "score_by_100" });
  };

  const getHistory = useCallback(() => {
    const { current } = history;
    return current;
  }, [history]);

  const historyDetails = useMemo(
    () => getHistory()?.filter((x) => x.points >= value_1 && x.points < value_2),
    [getHistory, value_1, value_2]
  );
/*
  const _40 = getHistory()?.filter((x) => x.points >= 40).length;
  const _50 = getHistory()?.filter((x) => x.points >= 50).length;
  const _60 = getHistory()?.filter((x) => x.points >= 60).length;
  const _80 = getHistory()?.filter((x) => x.points >= 80).length;
  const _90 = getHistory()?.filter((x) => x.points >= 90).length;
  const _100 = getHistory()?.filter((x) => x.points >= 100).length;
*/
  return (
    <>
      <div className="first">
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Sunday league score</div>
            <div className="achieve-note">
              Score between 39 & 50 points in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
            <Button className="btn-dark" onClick={handle40}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Amatuer score</div>
            <div className="achieve-note">
              Score between 49 & 60 points in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
            <Button className="btn-dark" onClick={handle50}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Semi pro score</div>
            <div className="achieve-note">
              Score between 59 & 80 points in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
            <Button className="btn-dark" onClick={handle60}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Pro score</div>
            <div className="achieve-note">
              Score between 79 & 90 points in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
            <Button className="btn-dark" onClick={handle80}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">World class score</div>
            <div className="achieve-note">
              Score between 89 & 100 points in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
            <Button className="btn-dark" onClick={handle90}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Legendary score</div>
            <div className="achieve-note">
              Score 100 or more points in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
            <Button className="btn-dark" onClick={handle100}>Check</Button>
            </div>
          </div>
        </div>
      </div>
      <Score
        historyDetails={historyDetails}
        show={show}
        handleClose={handleClose}
        heading={heading}
      />
    </>
  );
};

export default ScoreMain;

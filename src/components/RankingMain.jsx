import { useState, useMemo, useReducer, useCallback } from "react";
import Ranking from "../components/Ranking";
import { Button } from "react-bootstrap"

const RankingMain = (props) => {
  const {history} = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function reducer(state, action) {
    if (action.type === "ranking_by_2m") {
      return {
        value_1: 2,
        value_2: 1,
        heading: 'Sunday league rank'
      };
    }

    if (action.type === "ranking_by_1m") {
      return {
        value_1: 1,
        value_2: 0.5,
        heading: 'Amatuer rank'
      };
    }

    if (action.type === "ranking_by_500k") {
      return {
        value_1: 0.5,
        value_2: .25,
        heading: 'Semi pro rank'
      };
    }

    if (action.type === "ranking_by_250k") {
      return {
        value_1: .25,
        value_2: .1,
        heading: 'Pro rank'
      };
    }
    if (action.type === "ranking_by_100k") {
      return {
        value_1: .1,
        value_2: 0.01,
        heading: 'World class rank'
      };
    }

    if (action.type === "ranking_by_10k") {
      return {
        value_1: .01,
        value_2: 0.00001,
        heading: 'Legendary rank'
      };
    }
  }
  const [state, dispatch] = useReducer(reducer, { value_1: 0, value_2: 0, heading: '' });
  const { value_1, value_2, heading } = state;


  const handleTwoMil = () => {
    setShow(true);
    dispatch({ type: "ranking_by_2m" });
  };

  const handleOneMil = () => {
    setShow(true);
    dispatch({ type: "ranking_by_1m" });
  };

  const handleFive = () => {
    setShow(true);
    dispatch({ type: "ranking_by_500k" });
  };

  const handleTwoFifty = () => {
    setShow(true);
    dispatch({ type: "ranking_by_250k" });
  };

  const handleHundred = () => {
    setShow(true);
    dispatch({ type: "ranking_by_100k" });
  };

  const handleTen = () => {
    setShow(true);
    dispatch({ type: "ranking_by_10k" });
  };

  const getHistory = useCallback(() => {
    const { current } = history
    return current
  }, [history]);

  const historyDetails = useMemo(
    () => getHistory()?.filter(x => x.rank <= 1000000*value_1 && x.rank > 1000000*value_2),
    [getHistory, value_1, value_2]
  );
  console.log(historyDetails)
  /*
  const _2m = getHistory()?.filter(x => x.rank <= 1000000*2).length
  const _1m = getHistory()?.filter(x => x.rank <= 1000000*1).length
  const _500k = getHistory()?.filter(x => x.rank <= 1000000*.5).length
  const _250k = getHistory()?.filter(x => x.rank <= 1000000*.25).length
  const _100k = getHistory()?.filter(x => x.rank <= 1000000*.1).length
  const _10k = getHistory()?.filter(x => x.rank <= 1000000*.01).length
*/
  return (
    <>
    <div className="first">
          <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Sunday league rank</div>
                <div className="achieve-note">
                  Rank between 2M & 1M in a gameweek
                </div>
              </div>
              <div>
                <div className="times">
                <Button className="btn-dark" onClick={handleTwoMil}>Check</Button>
                </div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Amatuer rank</div>
                <div className="achieve-note">
                  Rank between 1M & 500K in a gameweek
                </div>
              </div>
              <div>
                <div className="times">
                <Button className="btn-dark" onClick={handleOneMil}>Check</Button>
                </div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Semi pro rank</div>
                <div className="achieve-note">
                  Rank between 500K & 250K in a gameweek
                </div>
              </div>
              <div>
                <div className="times">
                <Button className="btn-dark" onClick={handleFive}>Check</Button>
                </div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Pro rank</div>
                <div className="achieve-note">
                  Rank between 250k & 100K in a gameweek
                </div>
              </div>
              <div>
                <div className="times">
                <Button className="btn-dark" onClick={handleTwoFifty}>Check</Button>
                </div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">World class rank</div>
                <div className="achieve-note">
                  Rank between 100k & 10K in a gameweek
                </div>
              </div>
              <div> 
                <div className="times">
                <Button className="btn-dark" onClick={handleHundred}>Check</Button>
                </div>
              </div>
            </div>
            <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Legendary rank</div>
                <div className="achieve-note">
                  Rank inside the top 10k in a gameweek
                </div>
              </div>
              <div>
                <div className="times">
                <Button className="btn-dark" onClick={handleTen}>Check</Button>
                </div>
              </div>
            </div>
          </div>
      <Ranking
        historyDetails={historyDetails}
        show={show}
        handleClose={handleClose}
        heading={heading}
      />
    </>
  );
};

export default RankingMain;

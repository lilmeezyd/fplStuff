import axios from "axios";
import { useEffect, useState, useMemo, useReducer, useCallback } from "react";
import Ranking from "../components/Ranking";
import { Button } from "react-bootstrap"

const RankingMain = () => {
  const [history, setHistory] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function reducer(state, action) {
    if (action.type === "ranking_by_2m") {
      return {
        value: 2,
        heading: 'Sunday league rank'
      };
    }

    if (action.type === "ranking_by_1m") {
      return {
        value: 1,
        heading: 'Amatuer rank'
      };
    }

    if (action.type === "ranking_by_500k") {
      return {
        value: 0.5,
        heading: 'Semi pro rank'
      };
    }

    if (action.type === "ranking_by_250k") {
      return {
        value: .25,
        heading: 'Pro rank'
      };
    }
    if (action.type === "ranking_by_100k") {
      return {
        value: .1,
        heading: 'World class rank'
      };
    }

    if (action.type === "ranking_by_10k") {
      return {
        value: .01,
        heading: 'Legendary rank'
      };
    }
  }
  const [state, dispatch] = useReducer(reducer, { value: 0, heading: '' });
  const { value, heading } = state;

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/10199/history/`);
        const data = await response.data
        setHistory(data);
        console.log(data)
        //console.log(response);
      } catch (error) {
        const errMsg = error?.response?.data?.msg || error?.message;
        console.log(errMsg);
      }
    };

    fetchData();
  }, []);

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
    () => getHistory()?.filter(x => x.rank <= 1000000*value),
    [getHistory, value]
  );
  console.log(historyDetails)
  
  const _2m = getHistory()?.filter(x => x.rank <= 1000000*2).length
  const _1m = getHistory()?.filter(x => x.rank <= 1000000*1).length
  const _500k = getHistory()?.filter(x => x.rank <= 1000000*.5).length
  const _250k = getHistory()?.filter(x => x.rank <= 1000000*.25).length
  const _100k = getHistory()?.filter(x => x.rank <= 1000000*.1).length
  const _10k = getHistory()?.filter(x => x.rank <= 1000000*.01).length

  return (
    <>
    <div className="first">
          <div className="achieve-wrapper my-1">
              <div className="achieve-details">
                <div className="achieve-header">Sunday league rank</div>
                <div className="achieve-note">
                  Rank inside the top 2m in a gameweek
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
                  Rank inside the top 1m in a gameweek
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
                  Rank inside the top 500k in a gameweek
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
                  Rank inside the top 250k in a gameweek
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
                  Rank inside the top 100k in a gameweek
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

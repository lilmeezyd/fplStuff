import { Container, Button } from "react-bootstrap";
import GettingStartedMain from "../components/GettingStartedMain";
import CaptaincyMain from "../components/CaptaincyMain";
import RankingMain from "../components/RankingMain";
import ScoreMain from "../components/ScoreMain";
import { useState, useEffect } from "react";
import axios from "axios";
const AchievementsScreen = () => {
  const [fplId, setFplId] = useState("");
  const [submitId, setSubmitId] = useState(null);

  const useFetch = (dep) => {
    const [picks, setPicks] = useState([]);
    const [history, setHistory] = useState([]);
    const [manager, SetManager] = useState("");
    useEffect(() => {
      const a = [];
      for (let i = 1; i <= 38; i++) {
        a.push(i);
      }
      const picksArray = a.map(
        (x) =>
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${dep}/event/${x}/picks/`
      );
      async function makeAPICall(endpoint) {
        const response = await axios.get(endpoint);
        const data = await response.data;
        return data;
      }
      async function makeCalls(endpoints) {
        const promises = endpoints.map(makeAPICall);
        const responses = await Promise.all(promises);
        return responses;
      }
      const fetchData = async () => {
        try {
          const response = await makeCalls(picksArray);
          const response1 = await axios.get(
            `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${dep}/history/`
          );
          const response2 = await axios.get(
            `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${dep}/`
          );
          const data = await response1.data;
          const data1 = await response2.data;
          setHistory(data);
          setPicks(response);
          SetManager(data1);
          console.log(response);
        } catch (error) {
          const errMsg = error?.response?.data?.msg || error?.message;
          console.log(errMsg);
        }
      };

      dep >= 1 && fetchData();
    }, [dep]);
    return { picks, history, manager };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitId(fplId);
    setFplId(null);
  };

  const { picks, history, manager } = useFetch(submitId);
  console.log(picks);
  console.log(manager)

  return (
    <>
      <Container>
        {submitId === null && (
          <div className="form py-2">
            <form onSubmit={onSubmit}>
              <div className="fpl-id py-2">
                <label htmlFor="fplId">Enter FPL ID</label>
                <input
                  className="form-control"
                  type="number"
                  min={1}
                  id="fplId"
                  value={fplId}
                  onChange={(e) => setFplId(e.target.value)}
                />
              </div>
              <div className="py-2">
                <Button type="submit" className="fpl-id-btn btn-dark">
                  Submit ID
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="row">
          <div className="col-md-8 py-5">
            <div className="manager-stats-achieve mb-2">
            <div className="ms-header py-2 m-3">Achievements</div>
            <div className="ms-header py-2 m-3">Statistics</div>
            </div>
            

            <div className="achievements">
              <details>
                <summary style={{ display: "flex", listStyle: "none" }}>
                  Getting Started
                </summary>
                <GettingStartedMain picks={picks} />
              </details>

              <details>
                <summary style={{ display: "flex", listStyle: "none" }}>
                  Captaincy
                </summary>
                <CaptaincyMain picks={picks} />
              </details>

              <details>
                <summary style={{ display: "flex", listStyle: "none" }}>
                  Gameweek Ranking
                </summary>

                <RankingMain history={history} />
              </details>

              <details>
                <summary style={{ display: "flex", listStyle: "none" }}>
                  Gameweek Score
                </summary>
                <ScoreMain history={history} />
              </details>
            </div>
          </div>

          <div className="py-5 col-md-4">
            <div className="manager-wrap">
              <div className="manager-header">Manager:</div>
              <div className="manager-data">
                {manager?.player_first_name} {manager?.player_last_name}
              </div>
            </div>
            <div  className="manager-wrap">
              <div className="manager-header">Team Name:</div>
              <div className="manager-data">{manager?.name}</div>
            </div>
            <div  className="manager-wrap">
              <div className="manager-header">Overall Rank</div>
              <div className="manager-data">{manager?.summary_overall_rank}</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AchievementsScreen;

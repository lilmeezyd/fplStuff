import axios from "axios";
import { useEffect, useState, useMemo, useReducer, useCallback } from "react";
import { usePlayer } from "../PlayerContext";
import { usePlayerStats } from "../PlayerStatContext";
import GettingStarted from "./GettingStarted";
import { Button } from "react-bootstrap";
import { BiLock } from "react-icons/bi";
const GettingStartedMain = (props) => {
  const {picks } = props
  const [show, setShow] = useState(false);
  const { teams, elementTypes, players, events } = usePlayer();
  const { playerStats } = usePlayerStats();

  const handleClose = () => setShow(false);

  function reducer(state, action) {
    if (action.type === "hattrick") {
      return {
        value: "hattrick",
        heading: "Hattrick Hero"
      };
    }
    if (action.type === "goalie") {
      return {
        value: "goalie",
        heading: "Unlikely hero"
      };
    }
    if (action.type === "strike_force") {
      return {
        value: "strike_force",
        heading: "Lethal strike force"
      };
    }
    if (action.type === "main_man") {
      return {
        value: "main_man",
        heading: "The main man"
      };
    }
    if (action.type === "solid") {
      return {
        value: "solid",
        heading: "Solid at the back"
      };
    }
    if (action.type === "fantastic") {
      return {
        value: "fantastic",
        heading: "Captain fantastic"
      };
    }
  }

  const [state, dispatch] = useReducer(reducer, { value: "", heading: "" });
  const { value, heading } = state;

  const getPicksStatsFunc = useCallback(() => {
    const a = picks?.map((pick) => {
      const y = Object.create({});
      const event = pick?.entry_history?.event;

      const newPicks = pick?.picks?.map((x) => {
        const z = Object.create({});
        const playerId = x?.element;
        const web_name = players?.find((x) => x.id === playerId)?.web_name;
        const teamId = players?.find((x) => x.id === playerId)?.team;
        const playerTeam = teams?.find((x) => x.id === teamId)?.short_name;
        const stats = playerStats
          .find((player) => player?.history[0]?.element === playerId)
          ?.history.find((x) => x.round === pick?.entry_history?.event);
        const elementTypeId = players?.find(
          (x) => x.id === playerId
        )?.element_type;
        z.web_name = web_name;
        z.multiplier = x?.multiplier;
        z.element_type = elementTypeId;
        z.stats = stats;
        z.clean_sheets = stats?.clean_sheets;
        z.goals_conceded = stats?.goals_conceded;
        z.goals_scored = stats?.goals_scored;
        z.assists = stats?.assists;
        z.yellow_cards = stats?.yellow_cards;
        z.red_cards = stats?.red_cards;
        z.penalties_saved = stats?.penalties_saved;
        z.opponent_team = teams?.find(
          (x) => x.id === stats?.opponent_team
        )?.short_name;
        z.was_home = stats?.was_home;
        z.team_a_score = stats?.team_a_score;
        z.team_h_score = stats?.team_h_score;
        z.team = playerTeam;
        z.kickoff_time = new Date(stats?.kickoff_time)
        z.element = stats?.element
        z.total_points = stats?.total_points
        return z;
      });

      y.event = event;
      y.picks = newPicks;
      y.top_element = events?.find(
        (x) => x.id === pick?.entry_history?.event
      )?.top_element;
      return y;
    });
    return a;
  }, [picks, players, playerStats, teams, events]);

  console.log(getPicksStatsFunc());

  const picksStats = useMemo(() => {
    const filteredData = [];
    getPicksStatsFunc().forEach((x) => {
      const a = {};
      if (value === "hattrick") {
        const hattrick = x?.picks?.filter(
          (pick) => pick.goals_scored >= 3 && pick.multiplier > 0
        );
        if (hattrick.length > 0) {
          hattrick.map((y) => (y.event = x.event));
          a.event = x.event;
          a.players = hattrick;
          filteredData.push(a);
        }
      }

      if (value === "main_man") {
        const topExists = x?.picks?.filter(pick => pick.element === x.top_element && pick.multiplier > 0)
        if(topExists.length > 0) {
          topExists.map((y) => (y.event = x.event));
          a.event = x.event;
          a.players = topExists;
          filteredData.push(a);
        }
      }
      if (value === "fantastic") {
        const topExists = x?.picks?.filter(pick => pick.element === x.top_element && pick.multiplier > 1)
        if(topExists.length > 0) {
          topExists.map((y) => (y.event = x.event));
          a.event = x.event;
          a.players = topExists;
          filteredData.push(a);
        }
      }
      if (value === "strike_force") {
      }
      if (value === "solid") {
      }
      if (value === "goalie") {
      }
      /*const lethalStrikeForce = x?.picks?.filter(pick => pick.goals_scored >= 1 && pick.element_type === 4)
     if(lethalStrikeForce.length > 0) {
      lethalStrikeForce.map(y => y.event = x.event)
        filteredData.push(...lethalStrikeForce)
     }*/
    });
    return filteredData;
  }, [getPicksStatsFunc, value]);

  console.log(picksStats);

  const handleHat = () => {
    setShow(true);
    dispatch({ type: "hattrick" });
  };
  const goalie = () => {
    setShow(true);
    dispatch({ type: "goalie" });
  };
  const strikeForce = () => {
    setShow(true);
    dispatch({ type: "strike_force" });
  };
  const mainMan = () => {
    setShow(true);
    dispatch({ type: "main_man" });
  };
  const solid = () => {
    setShow(true);
    dispatch({ type: "solid" });
  };
  const fantastic = () => {
    setShow(true);
    dispatch({ type: "fantastic" });
  };

  return (
    <>
      <div className="first">
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Hattrick hero</div>
            <div className="achieve-note">
              A player in your team scores 3 or more goals
            </div>
          </div>
          <div>
            <div className="times">
              <Button className="btn-dark" onClick={handleHat}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Unlikely hero</div>
            <div className="achieve-note">Goal Keeper scores a goal</div>
          </div>
          <div>
            <div className="times">
              <Button className="btn-dark" onClick={goalie}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Lethal strike force</div>
            <div className="achieve-note">
              All your forwards score a goal in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
              <Button className="btn-dark" onClick={strikeForce}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">The main man</div>
            <div className="achieve-note">
              Own the highest points scorer in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
              <Button className="btn-dark" onClick={mainMan}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Solid at the back</div>
            <div className="achieve-note">
              Your defence does not concede in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
              <Button className="btn-dark" onClick={solid}>Check</Button>
            </div>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Captain fantastic</div>
            <div className="achieve-note">
              Your captain is the highest points scorer in a gameweek
            </div>
          </div>
          <div>
            <div className="times">
              <Button className="btn-dark" onClick={fantastic}>Check</Button>
            </div>
          </div>
        </div>
      </div>
      <GettingStarted
        show={show}
        handleClose={handleClose}
        picksStats={picksStats}
        heading={heading}
      />
    </>
  );
};

export default GettingStartedMain;

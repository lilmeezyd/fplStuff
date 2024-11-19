import { useState, useMemo, useReducer, useCallback } from "react";
import { usePlayer } from "../PlayerContext";
import Captaincy from "../components/Captaincy";
import { Button } from "react-bootstrap";

const CaptaincyMain = (props) => {
  const {picks} = props
  const [show, setShow] = useState(false);
  const { teams, elementTypes, players, events } = usePlayer();

  const handleClose = () => setShow(false);

  function reducer(state, action) {
    if (action.type === "captain_by_6") {
      return {
        value_1: 6,
        value_2: 10,
        heading: "Sunday league skipper"
            };
    }

    if (action.type === "captain_by_10") {
      return {
        value_1: 10,
        value_2: 16,
        heading:"Amateur skipper"
      };
    }

    if (action.type === "captain_by_16") {
      return {
        value_1: 16,
        value_2: 20,
        heading: "Semi Pro skipper"
      };
    }

    if (action.type === "captain_by_20") {
      return {
        value_1: 20,
        value_2: 30,
        heading: "Pro skipper"
      };
    }
    if (action.type === "captain_by_30") {
      return {
        value_1: 30,
        value_2: 35,
        heading: "WorldClass skipper"
      };
    }

    if (action.type === "captain_by_35") {
      return {
        value_1: 35,
        value_2: 2000,
        heading: "Legendary skipper"
      };
    }
  }
  const [state, dispatch] = useReducer(reducer, { value_1: 0, value_2: 0, heading: "" });
  const { value_1, value_2, heading } = state;


  const handleSix = () => {
    setShow(true);
    dispatch({ type: "captain_by_6" });
  };

  const handleTen = () => {
    setShow(true);
    dispatch({ type: "captain_by_10" });
  };

  const handleSixteen = () => {
    setShow(true);
    dispatch({ type: "captain_by_16" });
  };

  const handleTwenty = () => {
    setShow(true);
    dispatch({ type: "captain_by_20" });
  };

  const handleThirty = () => {
    setShow(true);
    dispatch({ type: "captain_by_30" });
  };

  const handleThirtyFive = () => {
    setShow(true);
    dispatch({ type: "captain_by_35" });
  };

  const getCaptains = () => {
    const a3 = picks?.map((pick) => {
      const y = Object.create({});
      const event = pick?.entry_history?.event;
      const playerId = pick?.picks?.find((x) => x.multiplier > 1)?.element;
      const multiplier = pick?.picks?.find((x) => x.multiplier > 1)?.multiplier;
      const web_name = players?.find((x) => x.id === playerId)?.web_name;
      const stats = players?.find((player) => player?.history[0]?.element === playerId)
        ?.history.find((x) => x.round === event);
      const teamId = players?.find((x) => x.id === playerId)?.team;
      const playerTeam = teams?.find((x) => x.id === teamId)?.short_name;
      //const elementTypeId = players?.find(x => x.id === playerId).element_type
      y.event = pick?.entry_history?.event;
      y.captain = web_name;
      y.total_points = stats?.total_points * multiplier;
      y.playerId = playerId;
      y.stats = stats;
      y.goals_scored = stats?.goals_scored;
      y.assists = stats?.assists;
      y.yellow_cards = stats?.yellow_cards;
      y.red_cards = stats?.red_cards;
      y.penalties_saved = stats?.penalties_saved;
      y.penalties_missed = stats?.penalties_missed;
      y.opponent_team = teams?.find(
        (x) => x.id === stats?.opponent_team
      )?.short_name;
      y.was_home = stats?.was_home;
      y.own_goals = stats?.own_goals;
      y.saves = stats?.saves;
      y.playerTeam = playerTeam;
      y.team_a_score = stats?.team_a_score;
      y.team_h_score = stats?.team_h_score;
      y.kickoff_time = new Date(stats?.kickoff_time)
      y.bonus = stats?.bonus;
      return y;
    });
    return a3;
  };

  const captainDetails = useMemo(
    () => getCaptains()?.filter((cap) => cap.total_points >= value_1 && cap.total_points < value_2),
    [getCaptains, value_1, value_2]
  );

/*
  const sixOrMore = getCaptains().filter((cap) => cap.total_points >= 6);
  const tenOrMore = getCaptains().filter((cap) => cap.total_points >= 10);
  const sixteenOrMore = getCaptains().filter((cap) => cap.total_points >= 16);
  const twentyOrMore = getCaptains().filter((cap) => cap.total_points >= 20);
  const thirtyOrMore = getCaptains().filter((cap) => cap.total_points >= 30);
  const thirtyFiveOrMore = getCaptains().filter(
    (cap) => cap.total_points >= 35
  );*/
  return (
    <>
      <div className="first">
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Sunday league skipper</div>
            <div className="achieve-note">
              Your captain scores between 5 & 10 points
            </div>
          </div>
          <div>
          <Button className="btn-dark" onClick={handleSix}>Check</Button>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Amateur skipper</div>
            <div className="achieve-note">
              Your captain scores between 9 & 16 points
            </div>
          </div>
          <div className="times">
          <Button className="btn-dark" onClick={handleTen}>Check</Button>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Semi Pro skipper</div>
            <div className="achieve-note">
              Your captain scores between 15 & 20 points
            </div>
          </div>
          <div className="times">
          <Button className="btn-dark" onClick={handleSixteen}>Check</Button>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Pro skipper</div>
            <div className="achieve-note">
              Your captain scores between 19 & 30 points
            </div>
          </div>
          <div className="times">
          <Button className="btn-dark" onClick={handleTwenty}>Check</Button>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">WorldClass skipper</div>
            <div className="achieve-note">
              Your captain scores between 29 & 35 points
            </div>
          </div>
          <div className="times">
          <Button className="btn-dark" onClick={handleThirty}>Check</Button>
          </div>
        </div>
        <div className="achieve-wrapper my-1">
          <div className="achieve-details">
            <div className="achieve-header">Legendary skipper</div>
            <div className="achieve-note">
              Your captain scores above 34 points
            </div>
          </div>
          <div className="times">
          <Button className="btn-dark" onClick={handleThirtyFive}>Check</Button>
          </div>
        </div>
      </div>
      <Captaincy
        captainDetails={captainDetails}
        show={show}
        handleClose={handleClose}
        heading={heading}
      />
    </>
  );
};

export default CaptaincyMain;

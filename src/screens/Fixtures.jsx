import { usePlayer } from "../PlayerContext";
import { useMemo, useState } from "react";

const Fixtures = () => {
  const { fixtures, teams, events } = usePlayer();
  const [gws, setGws] = useState(38);
  const [start, setStart] = useState(0);
  const [ sort, setSort ] = useState('team')
  const fixtureHeader = useMemo(
    () =>
      events
        .filter((event) => new Date(event.deadline_time) > new Date())
        .slice(start)
        .slice(0, gws),
    [events, gws, start]
  );

  const eventIds = events
  .filter((event) => new Date(event.deadline_time) > new Date()).map(x => x.id)

  console.log(eventIds)

  const fixtureBody = useMemo(() => {
    const eventIds = events
      .filter((event) => new Date(event.deadline_time) > new Date())
      .map((x) => x.id);

    const setA = new Set(eventIds);
    return teams.map((team) => {
      const a = Object.create({});
      const teamFixsHome = fixtures.filter(
        (fix) =>
          fix.team_h === team.id &&
          !fix.finished &&
          fix.event !== null &&
          eventIds.includes(fix.event)
      );
      const teamFixsAway = fixtures.filter(
        (fix) =>
          fix.team_a === team.id &&
          !fix.finished &&
          fix.event !== null &&
          eventIds.includes(fix.event)
      );
      //const blanks = fixtures.filter(fix => (fix.team_a === team.id || fix.team_h === team.id) && fix.event === null )
      //const fixsWithBlanksIds = fixtures.filter(fix => fix.team_a === team.id || fix.team_h === team.id).map(x => x.event)
      //const setB = new Set(fixsWithBlanksIds)
      //const diffSet = setA.difference(setB)
      //const diff = Array.from(diffSet).sort((a,b) => a > b ? 1 : -1)
      /*
        const teamBlanks = blanks.
        sort((a,b) => a.kickoff_time > b.kickoff_time ? 1 : -1).map((fix, index) => {
          return {
            ...fix,
            event: diff[index],
            team_a_difficulty: 0,
            team_h_difficulty: 0
          }
        })*/

      const teamA = teamFixsAway.map((fix) => {
        return {
          ...fix,
          is_home: false,
          difficulty: fix.team_a_difficulty,
          team_h: teams?.find((x) => x.id === fix.team_h)?.short_name,
        };
      });

      const teamH = teamFixsHome.map((fix) => {
        return {
          ...fix,
          is_home: true,
          difficulty: fix.team_h_difficulty,
          team_a: teams?.find((x) => x.id === fix.team_a)?.short_name,
        };
      });

      const teamFixt = [];
      //const teamFixs = [...teamH, ...teamA, ...teamBlanks]
      const teamFixs = [...teamH, ...teamA];
      const teamFixIds = [];
      teamFixs.forEach((team) => {
        if (!teamFixIds.includes(team.event)) {
          teamFixIds.push(team.event);
          teamFixt.push({ event: team.event, fixtures: [team] });
        } else {
          const index = teamFixt.findIndex((fixt) => fixt.event === team.event);
          const foundFixt = teamFixt[index];
          const newFixtures = [team, ...foundFixt.fixtures].sort((a, b) =>
            a.kickoff_time > b.kickoff_time ? 1 : -1
          );
          teamFixt.splice(index, 1, {
            event: team.event,
            fixtures: newFixtures,
          });
        }
      });

      a.id = team.id;
      a.team = team.short_name;
      a.difficulty = teamFixs.sort((a, b) => (a.event > b.event ? 1 : -1)).slice(start)
      .slice(0, gws).reduce((x,y) => x+y.difficulty,0);
      a.teamFixs = teamFixt
        .sort((a, b) => (a.event > b.event ? 1 : -1))
        .slice(start)
        .slice(0, gws);
      return a;
    }).sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
  }, [fixtures, events, teams, gws, start, sort]);
  console.log(fixtureBody);
  return (
    <>
    
    <h4>Fixture Ticker</h4>
      <div className="nxt-fixture-wrapper range-contents">
      <div className="next-fixtures form-group">
        <label htmlFor="next-fixture" className="small">
          From Gameweek
        </label>
        <select
          onChange={(e) => setStart(+e.target.value)}
          className="custom-select custom-select-next"
          id="next-fixture"
          name="next-fixture"
        >
          {eventIds.map((x, idx) => {
                  return (
                    <option key={idx} value={idx}>
                      {x}
                    </option>
                  );
                })}
        </select>
      </div>
      <div className="next-fixtures form-group">
        <label htmlFor="nxt_fixtures" className="small">
          Next
        </label>
        <select
          onChange={(e) => setGws(+e.target.value)}
          className="custom-select custom-select-next"
          id="nxt_fixtures"
        >
          {eventIds.map((fix, idx) => {
                  return (
                    <option key={idx} value={fix}>
                      {fix}
                    </option>
                  );
                })}
        </select>
        {/*<span style={{fontWeight: 700}} className="small">{gws === 1 ? "Gameweek" : "Gameweeks"}</span>*/}
      </div>
      </div>
      <div>
        <label htmlFor="sort_by"></label>Sort 
        <select onChange={(e) => setSort(e.target.value)}
          className="custom-select custom-select-next"
          id="sort_by"
          name="sort_by">
          <option value="team">By team</option>
          <option value="difficulty">By difficulty</option>
        </select>
      </div>
    <div className="fixtures-col">
      <div>
        <div
          style={{
            gridTemplateColumns: `repeat(${fixtureHeader.length + 1}, 70px)`,
          }}
          className="fix-gw gw-headers"
        >
          <div className="border"></div>
          {fixtureHeader.map((header) => (
            <div className="border" key={header.id}>
              GW&nbsp;{header.id}
            </div>
          ))}
        </div>
        <div>
          {fixtureBody.map((team) => (
            <div
              style={{
                gridTemplateColumns: `repeat(${
                  fixtureHeader.length + 1
                }, 70px)`,
              }}
              className="fix-gw gw-body"
              key={team.id}
            >
              <div className="border" style={{ fontWeight: 700 }}>
                {team.team}
              </div>
              {team?.teamFixs
                ?.sort((a, b) => (a.event > b.event ? 1 : -1))
                .map((x) => (
                  <div key={x.event}>
                    {x.fixtures.map((y, idx) => (
                      <div
                        style={{
                          borderRadius: 5 + "px",
                          color:
                            y.difficulty === 4 || y.difficulty === 5
                              ? "rgb(255,255,255)"
                              : "rgb(0,0,0)",
                          backgroundColor:
                            y.difficulty === 2
                              ? "rgb(1, 252, 122)"
                              : y.difficulty === 3
                              ? "rgb(231, 231, 231)"
                              : y.difficulty === 4
                              ? "rgb(255, 23, 81)"
                              : y.difficulty === 5
                              ? "rgb(128, 7, 45)"
                              : "rgb(0,0,0)",
                          fontWeight: 700,
                        }}
                        className="border"
                        key={idx}
                      >
                        {team.id === y.team_a ? y.team_h : y.team_a} &nbsp;
                        {y.is_home ? "(H)" : "(A)"}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Fixtures;


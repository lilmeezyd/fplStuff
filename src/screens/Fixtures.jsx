import { usePlayer } from "../PlayerContext";
import { useMemo, useState } from "react";

const Fixtures = () => {
  const { fixtures, teams, events } = usePlayer();
  const [gws, setGws] = useState(38);
  const [start, setStart] = useState(0);
  const fixtureHeader = useMemo(
    () =>
      events
        .filter((event) => new Date(event.deadline_time) > new Date())
        .slice(start)
        .slice(0, gws),
    [events, gws, start]
  );

  const fixtureBody = useMemo(() => {
    const eventIds = events
    .filter((event) => new Date(event.deadline_time) > new Date())
    .map((x) => x.id);

    const setA = new Set(eventIds)
    return teams.map(team => {
        const a = Object.create({})
        const teamFixsHome = fixtures.filter(fix => fix.team_h === team.id && !fix.finished && fix.event !== null && eventIds.includes(fix.event))
        const teamFixsAway = fixtures.filter(fix => fix.team_a === team.id && !fix.finished && fix.event !== null && eventIds.includes(fix.event))
        const blanks = fixtures.filter(fix => (fix.team_a === team.id || fix.team_h === team.id) && fix.event === null )
        const fixsWithBlanksIds = fixtures.filter(fix => fix.team_a === team.id || fix.team_h === team.id).map(x => x.event)
        const setB = new Set(fixsWithBlanksIds)
        const diffSet = setA.difference(setB)
        const diff = Array.from(diffSet).sort((a,b) => a > b ? 1 : -1)
        
        const teamBlanks = blanks.
        sort((a,b) => a.kickoff_time > b.kickoff_time ? 1 : -1).map((fix, index) => {
          return {
            ...fix,
            event: diff[index],
            team_a_difficulty: 0,
            team_h_difficulty: 0
          }
        })


        const teamA = teamFixsAway.map(fix => {
            return {
                ...fix,
                is_home: false,
                difficulty: fix.team_a_difficulty,
                team_h: teams?.find(x => x.id === fix.team_h)?.short_name
            }
        })

        const teamH = teamFixsHome.map(fix => {
            return {
                ...fix,
                is_home: true,
                difficulty: fix.team_h_difficulty,
                team_a: teams?.find(x => x.id === fix.team_a)?.short_name
            }
        })

        const teamFixt = []
        const teamFixs = [...teamH, ...teamA, ...teamBlanks]
        const teamFixIds = []
        teamFixs.forEach(team => {
          if(!(teamFixIds.includes(team.event))) {
            teamFixIds.push(team.event)
            teamFixt.push({event: team.event, fixtures: [team]})
          } else {
            const index = teamFixt.findIndex(fixt => fixt.event === team.event)
            const foundFixt = teamFixt[index]
            const newFixtures = [team, ...foundFixt.fixtures].sort((a,b) => a.kickoff_time > b.kickoff_time ? 1 : -1)
            teamFixt.splice(index, 1, {event: team.event, fixtures: newFixtures})
          }
        })
        
        a.id = team.id
        a.team = team.short_name
        a.teamFixs = teamFixt
        return a
    })
  }, [fixtures, events, teams])
  console.log(fixtureBody)
  return (
    <div className="fixtures-col">
      <h4>Fixture Ticker</h4>
      <div>
        <div style={{gridTemplateColumns: `repeat(${fixtureHeader.length+1}, 70px)`}} className="fix-gw gw-headers">
            <div className="border"></div>
            {fixtureHeader.map(header => <div className="border" key={header.id}>
                GW&nbsp;{header.id}
            </div>)}
        </div>
        <div>
            {fixtureBody.map(team => <div
             style={{gridTemplateColumns: `repeat(${fixtureHeader.length+1}, 70px)`}} className="fix-gw gw-body" key={team.id}>
                <div className="border" style={{fontWeight: 700}}>{team.team}</div>
                {team?.teamFixs?.sort((a,b) => a.event > b.event ? 1 : -1)
                .map(x => <div key={x.event}>
                  {x.fixtures.map((y, idx) => 
                  <div
                  style={{borderRadius: 5+'px', color: y.difficulty === 4 || y.difficulty === 5
                              ? "rgb(255,255,255)"
                              : "rgb(0,0,0)", backgroundColor: 
                              y.difficulty === 2
                              ? "rgb(1, 252, 122)"
                              : y.difficulty === 3
                              ? "rgb(231, 231, 231)"
                              : y.difficulty === 4
                              ? "rgb(255, 23, 81)"
                              : y.difficulty === 5
                              ? "rgb(128, 7, 45)"
                              : "rgb(0,0,0)", fontWeight: 700}}
                   className="border" key={idx}>
                      {team.id === y.team_a ? y.team_h : y.team_a} &nbsp;{y.is_home ? '(H)' : '(A)'}
                  </div>)}
                </div>)}
            </div>)}
        </div>
      </div>
    </div>
  );
};

export default Fixtures;

/*
{team?.teamFixs?.
                sort((a,b) => a.event > b.event ? 1 : -1).
                map(x => 
                <div key={x.id}>
                  {fixtures.map((y, idx) =>
                    <div
                    style={{color: y.difficulty === 4 || y.difficulty === 5
                                ? "rgb(255,255,255)"
                                : "rgb(0,0,0)", backgroundColor: 
                                y.difficulty === 2
                                ? "rgb(1, 252, 122)"
                                : y.difficulty === 3
                                ? "rgb(231, 231, 231)"
                                : y.difficulty === 4
                                ? "rgb(255, 23, 81)"
                                : y.difficulty === 5
                                ? "rgb(128, 7, 45)"
                                : "rgb(0,0,0)", fontWeight: 700}}
                     className="border" key={idx}>
                        {team.id === x.team_a ? x.team_h : x.team_a} &nbsp;{x.is_home ? '(H)' : '(A)'}
                    </div>
                  )}
                </div>)}

*/

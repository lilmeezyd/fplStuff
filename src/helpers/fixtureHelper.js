export const loadOpponents = (fixtures, events, teams, teamId) => {
    const eventIds = events
      .filter((event) => new Date(event.deadline_time) > new Date())
      .map((x) => x.id);
  
    const teamA = fixtures.filter(fix => fix.team_a === teamId && !fix.finished && fix.event !== null && eventIds.includes(fix.event))
    const teamH = fixtures.filter(fix => fix.team_h === teamId && !fix.finished && fix.event !== null && eventIds.includes(fix.event))
    const teamHome = [];
    const teamAway = [];
    const blankEvents = []
    const playerInfoOpp = [];
    const sortEvent = (x,y) => {
      if(x['event'] > y['event']) return 1
      if(x['event'] < y['event']) return -1
  }
  const sortKickOff = (x,y) => {
      if(x['kickoff'] > y['kickoff']) return 1
      if(x['kickoff'] < y['kickoff']) return -1
  }
  function final(a,b) {
    if(!Array.prototype.findLastIndex) {
      Array.prototype.findLastIndex = function(callback) {
        for(let i = a.length-1; i >= 0; i--) {
          if(callback.call(b, a[i], i, a)) {
            return i
          }
          if(!callback.call(b, a[i], i, a) && i === 0) {
            return -1
          }
        }
      }
    }
      
      return a.findLastIndex(x => x.event===b)
    }
  
  function initial(a,b) {
      return a.findIndex(x => x.event===b)
  }
   /* const newT = teams.map(
      (team) =>
        team.id && {
          ...team,
          teamH: fixtures.filter(
            (fix) =>
              fix.team_h === team.id &&
              !fix.finished &&
              fix.event !== null &&
              eventIds.includes(fix.event)
          ),
          teamA: fixtures.filter(
            (fix) =>
              fix.team_a === team.id &&
              !fix.finished &&
              fix.event !== null &&
              eventIds.includes(fix.event)
          ),
        }
    );
    const newTa = newT
      .map(
        (team) =>
          team.id && {
            ...team,
            teamHome:
              team.teamH &&
              team.teamH.map((x) => {
                const teamHomeObjt = {};
                const arr = [];
                const arrObj = {};
                Object.keys(x).forEach((y) => {
                  if (y === "event") {
                    teamHomeObjt.event = x["event"];
                  }
                  if (y === "team_h") {
                    arrObj.venue = "(H)";
                  }
                  if (y === "team_a") {
                    arrObj.opponent = x["team_a"];
                  }
                  if (y === "team_h_difficulty") {
                    arrObj.difficulty = x["team_h_difficulty"];
                  }
                  if (y === "kickoff_time") {
                    teamHomeObjt.kickoff = x["kickoff_time"];
                  }
                });
                arr.push(arrObj);
                teamHomeObjt.arr = arr;
                return teamHomeObjt;
              }),
            teamAway:
              team.teamA &&
              team.teamA.map((x) => {
                const teamAwayObjt = {};
                const arr = [];
                const arrObj = {};
                Object.keys(x).forEach((y) => {
                  if (y === "event") {
                    teamAwayObjt.event = x["event"];
                  }
                  if (y === "team_a") {
                    arrObj.venue = "(A)";
                  }
                  if (y === "team_h") {
                    arrObj.opponent = x["team_h"];
                  }
                  if (y === "team_a_difficulty") {
                    arrObj.difficulty = x["team_a_difficulty"];
                  }
                  if (y === "kickoff_time") {
                    teamAwayObjt.kickoff = x["kickoff_time"];
                  }
                });
                arr.push(arrObj);
                teamAwayObjt.arr = arr;
  
                return teamAwayObjt;
              }),
          }
      )
      .map(
        (team) =>
          team.id && { ...team, teamAandH: [...team.teamAway, ...team.teamHome] }
      ).map(team => team.id && {...team, teamAandHIds: team.teamAandH.map(x => x.event)})
      .map(team => team.id && {...team, blankIds:eventIds.filter(x => !team.teamAandHIds.includes(x))})
      .map(team => team.teamAandH && {...team, teamAandH: team.teamAandH.sort(sortEvent).sort(sortKickOff)})
      .map(team => team.teamAandH && {...team, AandH: team.teamAandH.map(x => {
        team.teamAandH.forEach(x=>{
          let init = initial(team.teamAandH, x.event)
          let fin  = final(team.teamAandH, x.event)
          //const newTeam = []
          if(init === fin) {
              //console.log(x.event)
              return 
          } else {
              team.teamAandH[init].arr.push(...team.teamAandH[fin].arr)
              team.teamAandH.splice(fin,1)
          }
      })
      
      return team.teamAandH
      })})
      
     .map(team => team.teamAandH && {...team, teamAandH: team.teamAandH})*/
    
      teamH.forEach(x => {
          const teamHomeObjt = {}
          const arr = []
          const arrObj = {}
          Object.keys(x).forEach(y => {
              if(y==='event') {
                  teamHomeObjt.event = x['event']
              }
              if(y === 'team_h') {
                  arrObj.venue = '(H)'
              }
              if(y === 'team_a') {
                  arrObj.opponent = x['team_a']
              }
              if(y === 'team_h_difficulty') {
                  arrObj.difficulty = x['team_h_difficulty']
              }
              if(y === 'kickoff_time') {
                  teamHomeObjt.kickoff = x['kickoff_time']
              }
          })
          arr.push(arrObj)
          teamHomeObjt.arr = arr
          teamHome.push(teamHomeObjt)
      })
      
      teamA.forEach(x => {
          const teamAwayObjt = {}
          const arr = []
          const arrObj = {}
          Object.keys(x).forEach(y => {
              if(y==='event') {
                  teamAwayObjt.event = x['event']
              }
              if(y === 'team_a') {
                  arrObj.venue = '(A)'
              }
              if(y === 'team_h') {
                  arrObj.opponent = x['team_h']
              }
              if(y === 'team_a_difficulty') {
                  arrObj.difficulty = x['team_a_difficulty']
              }
              if(y === 'kickoff_time') {
                  teamAwayObjt.kickoff = x['kickoff_time']
              }
          })
          arr.push(arrObj)
          teamAwayObjt.arr = arr
          teamAway.push(teamAwayObjt)
      })
  
      
      const teamAandH = [...teamHome, ...teamAway]
      const teamAandHIds = teamAandH.map(x => x.event)
      const blankIds = eventIds.filter(x => !teamAandHIds.includes(x))
      //const blankEvents = []
  
      blankIds.length && blankIds.forEach(x => {
          const obj = {}
          const obj1 = {}
          const arr = []
          obj.event = x
          obj.kickoff = ''
          obj1.opponent = 0
          obj1.venue = ''
          obj1.difficulty = ''
          arr.push(obj1)
          obj.arr = arr
          blankEvents.push(obj)
      })
  
  
      teamAandH.push(...blankEvents)
  
      teamAandH.sort(sortEvent).sort(sortKickOff)
  
      playerInfoOpp.push(...teamAandH)
      playerInfoOpp.sort(sortEvent)
      
      //console.log(newTa)
      
      teamAandH.forEach(x=>{
          let init = initial(teamAandH, x?.event)
          let fin  = final(teamAandH, x?.event)
          if(init === fin) {
              //console.log(x.event)
              return
          } else {
              teamAandH[init].arr.push(...teamAandH[fin].arr)
              teamAandH.splice(fin,1)
          }
      })
  
      teamAandH.sort(sortEvent)
  
      const newTeamAandH = teamAandH
      return newTeamAandH
     // return newTa
  };

  export const loadPlayerOpponents = (opponents, curPage) => {
    const playerFix = opponents.slice(curPage - 1, 1 + (curPage - 1));
    return playerFix;
  };
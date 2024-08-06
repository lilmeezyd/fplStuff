
export const getGameweeks = (events, curPage, curSize) => {
    const length =  events
                    .filter(event => new Date(event.deadline_time) > new Date()).length
    const returnedGW = (event, idx) => {
        let start = (curPage-1)*curSize
        let end = curPage*curSize
        if(idx >= start && idx < end) return true
    }
    const gameweeks = events
                        .filter(event => new Date(event.deadline_time) > new Date())
                        .map(event => event.name)
                        .filter(returnedGW)
    const deadlines = events
                        .filter(event => new Date(event.deadline_time) > new Date())
                        .map(event => event.deadline_time)
    //const deadlineTimes = getTime(deadlines)
    const countdowns =  deadlines.filter(returnedGW)  
    return { gameweeks, length, countdowns }
}
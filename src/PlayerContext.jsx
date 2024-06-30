import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const PlayerContext = createContext({
    players: [],
    teams: [],
    events: [],
    elementTypes: []
})

function PlayerProvider({ children }){
    const [players, setPlayers ] = useState([])
    const [teams, setTeams ] = useState([])
    const [elementTypes, setElementTypes ] = useState([])
    const [events, setEvents] = useState([])
    //const [elements, setElements] = useState([])
    //a.find(x => x.history.find(y => y.element === 605)).history.reduce((x,y) => x+y.total_points, 0) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                ///api/element-summary/616/
                const response = await axios.get('https://corsproxy.io/?https://fantasy.premierleague.com/api/bootstrap-static/')
                const data = await response.data
                const { teams, element_types, elements, events } = data
                setEvents(events)
                setPlayers(elements)
                setTeams(teams)
                setElementTypes(element_types)
                /*
                elements.forEach(async(element) => {
                    const a = {}
                    a.id = element.id
                    const response1 = await axios.get(`/api/element-summary/${element.id}/`)
                    const data1 = await response1.data
                    a.data = data1
                    setPlayers(prevState => ([
                        ...prevState, a
                    ]))
                })*/
            } catch (error) {
                let errorMsg = error?.response?.data?.msg || error?.message
                console.log(errorMsg)
            }
        }
      fetchData()
    }, [])
  
    

    const contextValue = {
        players: players,
        teams: teams,
        events: events,
        elementTypes: elementTypes
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider

export const usePlayer = () => {
    return useContext(PlayerContext)
}
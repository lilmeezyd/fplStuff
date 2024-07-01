import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const PlayerContext = createContext({
    players: [],
    teams: [],
    events: [],
    elementTypes: [],
    error: ''
})

function PlayerProvider({ children }){
    const [players, setPlayers ] = useState([])
    const [teams, setTeams ] = useState([])
    const [elementTypes, setElementTypes ] = useState([])
    const [events, setEvents] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
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
                setError(errorMsg)
                console.log(errorMsg)
            }
        }
      fetchData()
    }, [])
  
    

    const contextValue = {
        players: players,
        teams: teams,
        events: events,
        elementTypes: elementTypes,
        error:error
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
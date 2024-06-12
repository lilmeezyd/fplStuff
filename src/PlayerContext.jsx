import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const PlayerContext = createContext({
    players: [],
    teams: [],
    elementTypes: []
})

function PlayerProvider({ children }){
    const [players, setPlayers ] = useState([])
    const [teams, setTeams ] = useState([])
    const [elementTypes, setElementTypes ] = useState([])
    //const [elements, setElements] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                ///api/element-summary/616/
                const response = await axios.get('/api/bootstrap-static/')
                const data = await response.data
                const { teams, element_types, elements } = data
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
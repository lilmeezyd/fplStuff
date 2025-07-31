import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const PlayerContext = createContext({
    players: [],
    teams: [],
    events: [],
    elementTypes: [],
    fixtures: [],
    error: ''
})

function PlayerProvider({ children }){
    const [players, setPlayers ] = useState([])
    const [teams, setTeams ] = useState([])
    const [elementTypes, setElementTypes ] = useState([])
    const [fixtures, setFixtures] = useState([])
    const [events, setEvents] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const response = await axios.get(`https://fpl-stuff-proxy.vercel.app/api/data/getFixtures`)
                //const response = await axios.get('https://fpl-stuff-proxy.vercel.app/fixtures')
                const data = await response.data
                setFixtures(data)
            } catch (error) {
                let errorMsg = error?.response?.data?.msg || error?.message
                console.log(errorMsg)
            }
        }
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`https://fpl-stuff-proxy.vercel.app/api/data/getTeams`)
                //const response = await axios.get('https://fpl-stuff-proxy.vercel.app/fixtures')
                const data = await response.data
                console.log(data)
                setTeams(data)
            } catch (error) {
                let errorMsg = error?.response?.data?.msg || error?.message
                console.log(errorMsg)
            }
        }
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`https://fpl-stuff-proxy.vercel.app/api/data/getPlayers`)
                //const response = await axios.get('https://fpl-stuff-proxy.vercel.app/fixtures')
                const data = await response.data
                console.log(data)
                setPlayers(data)
            } catch (error) {
                let errorMsg = error?.response?.data?.msg || error?.message
                console.log(errorMsg)
            }
        }
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`https://fpl-stuff-proxy.vercel.app/api/data/getEvents`)
                //const response = await axios.get('https://fpl-stuff-proxy.vercel.app/fixtures')
                const data = await response.data
                setEvents(data)
            } catch (error) {
                let errorMsg = error?.response?.data?.msg || error?.message
                console.log(errorMsg)
            }
        }
        const fetchElems = async () => {
            try {
                const response = await axios.get(`https://fpl-stuff-proxy.vercel.app/api/data/getElems`)
                //const response = await axios.get('https://fpl-stuff-proxy.vercel.app/fixtures')
                const data = await response.data
                setElementTypes(data)
            } catch (error) {
                let errorMsg = error?.response?.data?.msg || error?.message
                console.log(errorMsg)
            }
        }
        
      fetchTeams()
      fetchElems()
      fetchEvents()
      fetchPlayers()
      fetchFixtures()
    }, [])
  
    

    const contextValue = {
        players: players,
        teams: teams,
        events: events,
        elementTypes: elementTypes,
        fixtures:fixtures,
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
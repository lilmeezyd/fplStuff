import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { usePlayer } from "./PlayerContext";

export const PlayerStatContext = createContext({
    playerStats: []
})

function PlayerStatProvider({children}) {
    const [playerStats, setPlayerStats] = useState([])

    const { players} = usePlayer()

    useEffect(() => {
        const playersArray = players.map(player => player.id)
    .map(x => `https://corsproxy.io/?https://fantasy.premierleague.com/api/element-summary/${x}/`)

    async function makeAPICall(endpoint) {
      const response = await axios.get(endpoint)
      const data = await response.data
      return data
    }
    async function makeCalls(endpoints) {
      const promises = endpoints.map(makeAPICall)
      const responses = await Promise.all(promises)
      return responses
    }
    const mapPlayers = async () => {
      try {
        const response = await makeCalls(playersArray)
        setPlayerStats(response)
        //console.log(response)
        //console.log(response.slice(0,4))
      } catch (error) {
        let errorMsg = error?.response?.data?.msg || error?.message
        //setError(errorMsg)
        console.log(errorMsg)
      }
    }


    players && mapPlayers()
    }, [players])

    const contextValue = {
        playerStats: playerStats
    }

    return <PlayerStatContext.Provider value={contextValue}>
        {children}
    </PlayerStatContext.Provider>
}

export default PlayerStatProvider

export const usePlayerStats = () => {
    return useContext(PlayerStatContext)
}
import { apiSlice } from "./apiSlice";
/*const PLAYERS_URL = "https://fpl-stuff-proxy.vercel.app/api/data";*/
//const PLAYERS_URL = "http://localhost:5000/api/data"
const PLAYERS_URL = "https://2e771dbc-b06b-41c9-9123-89e9513716e0-00-1tj5cvezv500d.kirk.replit.dev/api/data"

export const playerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updatePlayers: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/load`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayers2: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/list2`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayers3: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/list3`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayers4: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/list4`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayers5: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/list5`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayers6: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/list6`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayers7: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/list7`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        }),
        updatePlayers8: builder.mutation({
            query: () => ({
                url: `${PLAYERS_URL}/list8`,
                method: 'POST'
            }),
            invalidatesTags: ['Player']
        })
    })
})

export const { useUpdatePlayersMutation,
    useUpdatePlayers2Mutation, useUpdatePlayers3Mutation,
    useUpdatePlayers4Mutation, useUpdatePlayers5Mutation,
    useUpdatePlayers6Mutation, useUpdatePlayers7Mutation, 
    useUpdatePlayers8Mutation
 } = playerApiSlice
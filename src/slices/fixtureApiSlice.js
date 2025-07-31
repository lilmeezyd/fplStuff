import { apiSlice } from "./apiSlice";
const FIXTURES_URL = "https://fpl-stuff-proxy.vercel.app/api/data";
/*const PLAYERS_URL = "https://2e771dbc-b06b-41c9-9123-89e9513716e0-00-1tj5cvezv500d.kirk.replit.dev/api/data"*/

export const fixtureApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateFixtures: builder.mutation({
            query: () => ({
                url: `${FIXTURES_URL}/fixtures`,
                method: 'POST'
            }),
            invalidatesTags: ['Fixture']
        })
    })
})

export const { useUpdateFixturesMutation } = fixtureApiSlice
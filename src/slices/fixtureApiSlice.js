import { apiSlice } from "./apiSlice";
const FIXTURES_URL = "https://fpl-stuff-proxy.vercel.app/api/data";
//const FIXTURES_URL = "http://localhost:5000/api/data"

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
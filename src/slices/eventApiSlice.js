import { apiSlice } from "./apiSlice";
const EVENTS_URL = "https://fpl-stuff-proxy.vercel.app/api/data";
//const EVENTS_URL = "http://localhost:5000/api/data"

export const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateEvents: builder.mutation({
            query: () => ({
                url: `${EVENTS_URL}/events`,
                method: 'POST'
            }),
            invalidatesTags: ['Event']
        })
    })
})

export const { useUpdateEventsMutation } = eventApiSlice
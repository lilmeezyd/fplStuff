import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({baseUrl: '',
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem('adminInfo'))?.token
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Fixture', 'Event', 'Player'
    ],
    endpoints: (builder) => ({})
})
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/user' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ body }) => ({
                url: "login",
                method: "POST",
                body: body,
            }),
            // invalidatesTags: ["users"],
        }),
        createUser: builder.mutation({
            query: ({ body }) => ({
                url: "createUser",
                method: "POST",
                body: body,
            }),
            // invalidatesTags: ["users"],
        }),
        myProfile: builder.query({
            query: () => ({
                url: "me",
                method: "GET",
            }),
            // invalidatesTags: ["users"],
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET",
            }),
            // invalidatesTags: ["users"],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useCreateUserMutation, useMyProfileQuery,useLogoutMutation } = userApi;
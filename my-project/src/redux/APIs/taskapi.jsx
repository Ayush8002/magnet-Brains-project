// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/task' }),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: ({ body }) => ({
                url: "createTask",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Task"],
        }),
        getMyTask: builder.query({
            query: ({ currentPage }) => ({
                url: `getAllTasks?page=${currentPage}`,
                method: "GET",
            }),
            providesTags: ['Task'],
        }),
        getTaskDetail: builder.query({
            query: () => ({
                url: `getTasksDetail`,
                method: "GET",
            }),
            providesTags: ['Task'],
        }),
        getPriorityTasks: builder.query({
            query: () => ({
                url: "getPriorityTasks",
                method: "GET",
            }),
            providesTags: ['Task'],
        }),
        getSingleTask: builder.query({
            query: ({ id }) => ({
                url: `getSingleTask/${id}`,
                method: "GET",
            }),
        }),
        updateTask: builder.mutation({
            query: ({ id, body }) => ({
                url: `updateTask/${id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Task"],
        }),
        deleteTask: builder.mutation({
            query: ({ id }) => ({
                url: `deleteTask/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateTaskMutation, useGetMyTaskQuery, useUpdateTaskMutation, useDeleteTaskMutation, useGetSingleTaskQuery, useGetPriorityTasksQuery, useGetTaskDetailQuery } = taskApi;
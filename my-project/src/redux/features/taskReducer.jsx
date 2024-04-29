import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    deleteTaskData: {},
    showDeleteDialog: false,
    page: 1,
    updateTaskData: {}
}

export const taskSlice = createSlice({
    name: "taskState",
    initialState,
    reducers: {
        setDeleteTaskData: (state, action) => {
            const task = action.payload
            state.deleteTaskData = task
        },
        setShowDeleteDialog: (state, action) => {
            const task = action.payload
            state.showDeleteDialog = task
        },
        setPage: (state, action) => {
            const task = action.payload
            state.page = task
        },
        setUpdateTaskData: (state, action) => {
            const task = action.payload
            state.updateTaskData = task
        },
    }
})

export const { setUpdateTaskData, setDeleteTaskData, setPage, setShowDeleteDialog } = taskSlice.actions

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    isAuthenticated: false

}

export const userSlice = createSlice({
    name: "userState",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload
            state.user = user
            state.isAuthenticated = true
        },
        setLogout: (state, action) => {
            state.user = {}
            state.isAuthenticated = false
        }
    }
})

export const { setUser, setLogout } = userSlice.actions

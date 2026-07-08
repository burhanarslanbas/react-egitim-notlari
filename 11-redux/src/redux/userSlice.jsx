import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    users: [],
    loading: false,
}

export const getAllUsers = createAsyncThunk(
    'users',
    async () => {
        const response = await axios.get("https://dummyjson.com/users");
        return response.data;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HTTP isteği olmazsa kullanılır.
    },
    extraReducers: (builder) => {
        // HTTP isteklerinde kullanılır.
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        })
    }
})

export const { } = userSlice.actions
export default userSlice.reducer
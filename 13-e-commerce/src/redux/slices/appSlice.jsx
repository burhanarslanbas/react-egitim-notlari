import { createSlice } from '@reduxjs/toolkit'

// Başlangıç durumu
const initialState = {
    theme: 'light', // Başlangıçta tema 'light' olarak ayarlanır
    loading: false, // Başlangıçta yükleniyor durumu false olarak ayarlanır
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
})

export const { } = appSlice.actions

export default appSlice.reducer
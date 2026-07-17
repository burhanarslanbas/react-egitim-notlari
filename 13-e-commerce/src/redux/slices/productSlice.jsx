import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = "https://api.escuelajs.co/api/v1"

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
}

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        })
    }
})

export const { setSelectedProduct } = productSlice.actions

export default productSlice.reducer
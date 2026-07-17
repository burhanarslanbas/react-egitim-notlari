import { createSlice } from '@reduxjs/toolkit'

const writeToLocalStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket));
}

const readFromLocalStorage = () => {
    const products = localStorage.getItem('basket');
    return products ? JSON.parse(products) : [];
}

const initialState = {
    products: readFromLocalStorage(),
    drawerOpen: false,
    totalPrice: 0,
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addProductToBasket: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                findProduct.quantity += action.payload.quantity;
                writeToLocalStorage(state.products);
            } else {
                state.products.push({ ...action.payload, quantity: action.payload.quantity });
                writeToLocalStorage(state.products);
            }
        },
        removeProductFromBasket: (state, action) => {
            const updatedProducts = state.products.filter((product) => product.id !== action.payload);
            state.products = updatedProducts;
            writeToLocalStorage(state.products);
        },
        toggleDrawer: (state) => {
            state.drawerOpen = !state.drawerOpen;
        },
        calculateTotalPrice: (state) => {
            state.products && (state.totalPrice = state.products.reduce((total, product) => total + (product.price * product.quantity), 0));
        }
    }
});

export const { addProductToBasket, removeProductFromBasket, toggleDrawer, calculateTotalPrice } = basketSlice.actions
export default basketSlice.reducer
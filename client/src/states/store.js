import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer/reducer";
import cartReducer from "./cart/cartReducer";

const store = configureStore({
    reducer:{
        search : searchReducer,
        booking : cartReducer,
    }
})

export default store
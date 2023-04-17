import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    book:[]
}

export const cartSlice = createSlice({
    name : 'booking',
    initialState,

    reducers:{
        addToCart : (state,action)=>{
            state.book.push(action.payload)
            // if(state.book.length > 0){
            //     state.book[0] = action.payload
            // }else{
            //     state.book.push(action.payload)
            // }
        }
    }
})

export const {addToCart} = cartSlice.actions

export default cartSlice.reducer
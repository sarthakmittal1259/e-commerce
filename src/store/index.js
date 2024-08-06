import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'

const store = configureStore({
   reducer: {
     cart: cartReducer, // Reducer for cart state
   }
 });
 
 export default store; 
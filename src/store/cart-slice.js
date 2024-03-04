// use seperate slice for cart
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice= createSlice({
    name: "cart",
    initialState:{
        itemsList:[],
        totalQuantity:0,
        showCart:false 
    },
    reducers:{
        addToCart(state, action){
            const newItem = action.payload;
            // check if item is already there. Increase qty if yes
            const existingItems = state.itemsList.find((item)=>item.id === newItem.id);
            if (existingItems){
                existingItems.quantity += 1;
                existingItems.totalPrice+=newItem.price
            } else {
                state.itemsList.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.name
                });
                state.totalQuantity += 1;
            }
        },
        removeFromCart(state, action){
            const id = action.payload;
            const existingItems = state.itemsList.find((item)=>item.id === id);
            if (existingItems.quantity ===1){
                 state.itemsList = state.itemsList.filter((item)=>item.id !== id); 
            }else{
                existingItems.quantity -= 1;
                existingItems.totalPrice-=existingItems.price
            }
        },
        setShowCart(state){
            state.showCart = !state.showCart;
        }
    }
})

// thunk
export const sendCartdata = (cart)=>{
    return async(dispatch)=>{
        dispatch(uiActions.showNotifications({
            open: true,
            message:"Sending request",
            type:"warning"
          }))
        const sendRequest = async()=>{
            const res = await fetch('https://redux-http-fcc-default-rtdb.firebaseio.com/cartItems.json',{
              method: 'PUT',
              body: JSON.stringify(cart)
            });
            const data = await res.json();
            // send state as request is succes
            dispatch(uiActions.showNotifications({
              open: true,
              message:"Sent request to server",
              type:"success"
            }))
          };
          try {
            await sendRequest(); 
          } catch (error) {
            dispatch(uiActions.showNotifications({
                open: true,
                message:"Sending request failed",
                type:"error"
              }))
          }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice; 
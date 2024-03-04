import { createSlice } from "@reduxjs/toolkit";

// Create a slice for the auth state
const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false},
    reducers: {
        login(state){
            // allow mutating state here because of redux toolkit
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
        }
    }
}) 

// const authActions = authSlice.actions; 
// export authActions; 
// equivalent of this is below

export const authActions = authSlice.actions;
export default authSlice;
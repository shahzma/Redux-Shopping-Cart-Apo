import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification:null
}

const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    showNotifications(state, action){
        state.notification = {
            message:action.payload.message,
            type: action.payload.type,
            open: action.payload.open 
        }
    }
  }
});

export const uiActions = uiSlice.actions

export default uiSlice.reducer 
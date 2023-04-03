import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    user: "guest",
  }
const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    statusUser(state,action){
      state.user = action.payload
    },
    logoutUser(state,action){
      state.user = "guest"
    }
  }
})

export const {statusUser,logoutUser} = userSlice.actions
export default userSlice.reducer
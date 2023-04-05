import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../../app/store"
const initialState = {
    user: "guest",
  }
const userSlice = createSlice({
  name:"user",
  initialState,
  reducers:{
    statusUser(state,action:PayloadAction<string>){
      state.user = action.payload
    },
    logoutUser(state,action){
      state.user = "guest"
    }
  }
})

export const {statusUser,logoutUser} = userSlice.actions
export default userSlice.reducer
import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../../app/store"

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
    status: StatusFilters.All,
  }

const filtersSlice = createSlice({
  name:"filters",
  initialState,
  reducers:{
    statusFilterChanged(state,action){
      state.status = StatusFilters[action.payload]
    }
  }
})

export const {statusFilterChanged} = filtersSlice.actions
export default filtersSlice.reducer
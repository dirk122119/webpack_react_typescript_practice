import { createSlice } from '@reduxjs/toolkit'

interface Status  {
  payload: "All"|"Active"|"Completed";
  type: string;
}

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
    statusFilterChanged(state,action:Status){
      state.status = StatusFilters[action.payload]
    }
  }
})

export const {statusFilterChanged} = filtersSlice.actions
export default filtersSlice.reducer
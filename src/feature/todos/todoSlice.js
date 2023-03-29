import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit'
  
  const todosAdapter = createEntityAdapter()
  const initialState = todosAdapter.getInitialState({
    status: 'idle',
  })


  const todosSlice = createSlice({
    name: 'todos',
  initialState,
  reducers:{
    // saveNewTodo(state, action){
    //     const todo = action.payload
    //     state.entities[todo.id] = todo
    // },
    saveNewTodo:todosAdapter.addOne,
    toggleComplete(state,action){
        const todo = action.payload
        state.entities[todo.id].complete = !todo.complete
    },
    // toggleDelete(state,action){
    //     const todo = action.payload
    //     delete state.entities[todo.id]
    // }
    toggleDelete:todosAdapter.removeOne
  }
  })


export default todosSlice.reducer
export const {
    saveNewTodo,toggleComplete,toggleDelete
  } = todosSlice.actions
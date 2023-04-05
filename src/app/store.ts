import { configureStore } from '@reduxjs/toolkit'

import todosReducer from '../feature/todos/todoSlice'
import filtersReducer from "../feature/filiters/filtersSlice"
import userReducer from "../feature/user/userSlice"
const store = configureStore({
    reducer: {
      // Define a top-level state field named `todos`, handled by `todosReducer`
      todos: todosReducer,
      filters:filtersReducer,
      user:userReducer

    },
  })
  
export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'

import todosReducer from './feature/todos/todoSlice'
import filtersReducer from "./feature/filiters/filtersSlice"

const store = configureStore({
    reducer: {
      // Define a top-level state field named `todos`, handled by `todosReducer`
      todos: todosReducer,
      filters:filtersReducer
    },
  })
  
  export default store
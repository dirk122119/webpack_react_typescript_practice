import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { StatusFilters } from "../filiters/filtersSlice"
const todosAdapter = createEntityAdapter();
const initialState = todosAdapter.getInitialState({
  status: "idle",
});
export const { selectAll: selectTodos } = todosAdapter.getSelectors(
  (state) => state.todos
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // saveNewTodo(state, action){
    //     const todo = action.payload
    //     state.entities[todo.id] = todo
    // },
    saveNewTodo: todosAdapter.addOne,
    toggleComplete(state, action) {
      const todoId = action.payload;
      const todo = state.entities[todoId]
      todo.complete = !todo.complete;
    },
    // toggleDelete(state,action){
    //     const todo = action.payload
    //     delete state.entities[todo.id]
    // }
    toggleDelete: todosAdapter.removeOne,
  },
});

export default todosSlice.reducer;
export const { saveNewTodo, toggleComplete, toggleDelete } = todosSlice.actions;
export const selectFilterTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const showAllCompletions = filters.status === StatusFilters.All;
    if (showAllCompletions) {
      return todos;
    } else {
      const completedStatus = filters.status === StatusFilters.Completed;
      return todos.filter((todo) => {
        const statusMatches = todo.complete === completedStatus;
        return statusMatches;
      });
    }
  }
);

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilterTodos,
  // And derive data in the output selector
  (filterTodos) => filterTodos.map((todo) => todo.id)
)
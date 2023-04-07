import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
  PayloadAction
} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store"
import { StatusFilters } from "../filiters/filtersSlice";
import { db } from "../../lib/firestore";
import { collection, getDocs,setDoc,doc,updateDoc,getDoc,deleteDoc } from "firebase/firestore";

interface Todo {
  id: number;
  todo: string;
  user:string;
  complete:boolean;
}
const todosAdapter = createEntityAdapter();
const initialState = todosAdapter.getInitialState({
  status: "idle",
});
export const { selectAll: selectTodos } = todosAdapter.getSelectors(
  (state:RootState) => state.todos
);
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const todos = await getDocs(collection(db, "todoList")).then(
    (querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    }
  );
  todos.sort((p1, p2) => (p1.id < p2.id) ? -1 : (p1.id > p2.id) ? 1 : 0);
  return todos;
});

export const saveNewTodo = createAsyncThunk("todos/saveNewTodo",async (todo:Todo) =>
{
  await setDoc(doc(db, "todoList",todo.id.toString()),todo)
  return todo
})

export const toggleComplete = createAsyncThunk("todos/Complete",async (id:number) =>
{
  const docSnap:any = await getDoc(doc(db, "todoList",id.toString()));
  await updateDoc(doc(db, "todoList",id.toString()), {
    complete: !docSnap.data().complete
  });
  return id
})
export const toggleDelete = createAsyncThunk("todos/toggleDelete",async (id:number) =>
{
  await deleteDoc(doc(db, "todoList", id.toString()));
  return id
})

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // toggleDelete: todosAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state,action.payload)
        state.status = "idle";
      })
      .addCase(saveNewTodo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        todosAdapter.addOne(state,action.payload)
        state.status = "idle";
      })
      .addCase(toggleComplete.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(toggleComplete.fulfilled, (state, action:PayloadAction<number>) => {
        const todo:any= state.entities[action.payload];
        todo.complete = !todo.complete;
        state.status = "idle";
      })
      .addCase(toggleDelete.fulfilled, (state, action) => {
        todosAdapter.removeOne(state,action.payload)
      })
      
  },
});

export default todosSlice.reducer;
export const selectFilterTodos = createSelector(
  selectTodos,
  (state:RootState) => state.filters,
  (state:RootState) => state.user,
  (todos, filters,user) => {
    const showAllCompletions = filters.status === StatusFilters.All;
    if (showAllCompletions) {
      return todos.filter((todo:any)=>{
        const userMatches = todo.user === user.user
        return userMatches
      });
    } else {
      const completedStatus = filters.status === StatusFilters.Completed;
      return todos.filter((todo:any) => {
        const statusMatches= todo.complete === completedStatus;
        const userMatches = todo.user === user.user
        return statusMatches && userMatches;
      });
    }
  }
);

export const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilterTodos,
  // And derive data in the output selector
  (filterTodos) => filterTodos.map((todo:any) => todo.id)
);

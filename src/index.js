import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider,useSelector } from "react-redux";
import { Navbar } from "./components/Navbar";
import { InputText } from "./feature/inputText/InputText";
import {TodoList} from "./feature/todos/TodoList"
import "./style.scss";
import store from "./store"
import {StateFiliters} from "./feature/filiters/StateFilters"

import { fetchTodos } from "./feature/todos/todoSlice";
const App = () => {
  
  store.dispatch(fetchTodos())
  
  return (
    <Provider store={store}>
      <Navbar />
      <InputText />
      <StateFiliters/>
      <TodoList />
      
    </Provider>
  );
};

const hello = createRoot(document.getElementById("hello"));
hello.render(<App />);

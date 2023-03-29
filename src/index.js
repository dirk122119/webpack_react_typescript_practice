import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Navbar } from "./components/Navbar";
import { InputText } from "./feature/inputText/InputText";
import {TodoList} from "./feature/todos/TodoList"
import "./style.scss";
import store from "./store"
import {StateFiliters} from "./feature/filiters/StateFilters"

const App = () => {
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

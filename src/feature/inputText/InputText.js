import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import "./InpuTText.scss"
import { useSelector, useDispatch } from 'react-redux'
import {saveNewTodo} from "../todos/todoSlice"
import store from '../../store'
function InputText() {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch()
  let todos = useSelector((state) => state.todos.entities);
  const userStatus = useSelector((state) => state.user.user)
  const handleChange = (e)=>{setText(e.target.value);}

  const handleKeyDown = (e)=>{
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
        e.preventDefault();
        addNewOne()
    }
  }
  const handleAddIcon =()=>{
    
    addNewOne()
  }

  const addNewOne=()=>{
    let objectLength=Object.keys(todos).length
    let todoArray = Object.values(todos)
    const maxId = todoArray.reduce((maxId, todo) => Math.max(todo.id, maxId),-1)

    dispatch(saveNewTodo({"id":maxId+1,"todo":text,"complete":false,"user":userStatus}))
    console.log(store.getState())
    setText("")
  }

  return (
    <>
    <div className="container"><h3>This is {userStatus}'s todo list,you can regist and login to create your own todo list</h3></div>
    <div className="container">
      <Paper
        elevation={2}
        component="form"
        sx={{
          p: "2px 4px",
          display:"flex",
          alignItems: "center",
          width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add TodoList"
          inputProps={{ "aria-label": "search google maps" }}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          type="button"
          sx={{ p: "10px"}}
          aria-label="search"
          onClick={handleAddIcon}
        >
          <AddIcon />
        </IconButton>
      </Paper>
      <Divider sx={{ margin: "10px" }} />

    </div>
    </>
  );
}

export { InputText };

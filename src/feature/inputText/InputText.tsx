import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import "./InpuTText.scss"
import {saveNewTodo} from "../todos/todoSlice"
import store from '../../app/store'
import { useAppSelector, useAppDispatch } from "../../app/hooks"
function InputText() {
  const [text, setText] = React.useState("");
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.entities);
  const userStatus = useAppSelector((state) => state.user.user)
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{setText(e.target.value);}

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
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
    let todoArray = Object.values(todos)
    const maxId = todoArray.reduce((maxId:number, todo:any) => Math.max(todo.id, maxId),-1)

    dispatch(saveNewTodo({"id":maxId+1,"todo":text,"complete":false,"user":userStatus}))
    return maxId+1
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

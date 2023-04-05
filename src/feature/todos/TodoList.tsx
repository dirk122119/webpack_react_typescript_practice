import * as React from "react";
import { toggleComplete,toggleDelete,selectFilteredTodoIds} from "./todoSlice";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import store from "../../app/store"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

export const TodoList = () => {

  const todoEntities=store.getState().todos.entities
  const todoIds = useAppSelector(selectFilteredTodoIds)
  const loadingStatus = useAppSelector((state) => state.todos.status)
  const userStatus = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch();
  if (loadingStatus === 'loading') {
    return (
      <Backdrop
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    )
  }
  return (
    <div className="container">
    
      <List
        sx={{ width: "400px", bgcolor: "background.paper" }}
      >
        {Object.values(todoIds).map((value,index) => {
          const labelId = `checkbox-list-label-${value}`;
          const handleComplete = () => {
            dispatch(toggleComplete(value));
          };
          const handleDelete = ()=>{
            dispatch(toggleDelete(value));
          }
          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={handleDelete}
                >
                  <DeleteForeverIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleComplete} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todoEntities[value].complete}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                sx={(todoEntities[value].complete)?{textDecoration: 'line-through'}:{textDecoration: 'none'}}
                  id={labelId}
                  primary={`Task ${index + 1} : ${todoEntities[value].todo} `}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

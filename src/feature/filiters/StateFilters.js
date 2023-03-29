import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { statusFilterChanged } from "./filtersSlice";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {StatusFilters} from "./filtersSlice"

export const StateFiliters = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.filters);
  const handleButtonClick =(e)=>{
    dispatch(statusFilterChanged(e.target.innerText))
  }
  return (
    <div className="container">
      <Stack spacing={2} direction="row">
        {Object.keys(StatusFilters).map((key) => {
            if(StatusFilters[key]===status.status)
            {
                return <Button sx={{textTransform:"none"}} key={key} onClick={handleButtonClick} variant="contained">{key}</Button>;
            }
            else{
                return <Button sx={{textTransform:"none"}} key={key} onClick={handleButtonClick} variant="outlined">{key}</Button>;
            }
         
        })}
      </Stack>
    </div>
  );
};

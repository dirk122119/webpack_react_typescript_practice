import * as React from "react";
import { statusFilterChanged,StatusFilters } from "./filtersSlice";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks"

export const StateFiliters = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.filters);
  const userStatus = useAppSelector((state) => state.user.user)
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

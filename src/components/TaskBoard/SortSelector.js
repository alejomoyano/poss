import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortTasks } from "../../redux/slices/tasks";

export default function SortSelector() {
  // const { value: {...value,sort} } = useSelector((state) => state.task);
  const [sort, setSort] = useState("increase");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(sortTasks(event.target.value));
    setSort(event.target.value);
  };
  return (
    <FormControl sx={{ width: 100 }} size="small">
      <InputLabel>Sort</InputLabel>
      <Select value={sort} onChange={handleChange} label="sort">
        <MenuItem value={"increase"}>Increase Time</MenuItem>
        <MenuItem value={"decrease"}>Decrease Time</MenuItem>
        <MenuItem value={"states"}>States</MenuItem>
      </Select>
    </FormControl>
  );
}

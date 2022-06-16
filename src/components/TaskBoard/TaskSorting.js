import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import sortTasks from "../../Strategy/context";
import { useDispatch } from "react-redux";

export default function SortSelector() {
  const [sort, setSort] = useState("increase");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSort(event.target.value);
    dispatch(sortTasks(sort));
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

import {
  Select,
  MenuItem,
  FormControl,
  NativeSelect,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";

export default function SortSelector() {
  const [sort, setSort] = useState(1);

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <FormControl sx={{ width: 100 }} size="small">
      <InputLabel>Sort</InputLabel>
      <Select value={sort} onChange={handleChange} label="sort">
        <MenuItem value={1}>Increase Time</MenuItem>
        <MenuItem value={2}>Decrease Time</MenuItem>
        <MenuItem value={3}>Alphabetic</MenuItem>
      </Select>
    </FormControl>
  );
}

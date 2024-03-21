import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default function SelectBox(props) {
  let { options } = props;
  return (
    <FormControl sx={{ m: 1, minWidth: props.size || 120, }} size="small">
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.value}
        label={props.label}
        onChange={props.handleChange}
        size="small"
        endAdornment={
          props.showClearIcon && props.value && (
            <InputAdornment position="end" sx={{marginRight: 1.5, margingLeft: 0, fontSize: 16}}>
              <IconButton onClick={props.handleUnselect} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      >
        {options?.map((option) => (
          <MenuItem value={option}>{option.replace(/_/g, ' ')}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

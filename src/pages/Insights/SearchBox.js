import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

export default function SearchBox(props) {
  return (
    <FormControl sx={{ m: 1, minWidth: props.size || 120 }} size="small">
      <TextField
        id="outlined-basic"
        value={props.value}
        label={props.label}
        size="small"
        variant="outlined"
        onChange={props.handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
        }}
      />
    </FormControl>
  );
}

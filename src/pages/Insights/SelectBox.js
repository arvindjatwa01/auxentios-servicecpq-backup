import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox(props) {
    let { options } = props;
    return (
        <FormControl sx={{ m: 1, minWidth: props.size || 120 }} size="small">
            <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value}
                label={props.label}
                onChange={props.handleChange}
                size='small'
            >
                {options?.map(option =>
                    <MenuItem value={option}>{option}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

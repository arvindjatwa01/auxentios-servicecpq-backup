import React, { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";

import searchIcon from "../../../assets/icons/svg/search.svg";

const data = ["RD-4132", "RD-4153", "RD-4154", "RD-8621"];

const ReturnSearch = ({ number, setReturnRecivedData }) => {
  const [modelSuggestions, setModelSuggestions] = useState([...data]);
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState("");

  console.log("number :::::: ", number);

  useEffect(() => {
    const _modelSuggestions = [...modelSuggestions];
    if (number) {
      _modelSuggestions.push(number);
    }
    setModelSuggestions(_modelSuggestions);
  }, [number]);
  return (
    <>
      <div>
        <Autocomplete
          options={modelSuggestions}
          // loading={loading}
          open={open}
          onInputChange={(event, newInputValue) => {
            if (newInputValue.length === 0) {
              if (open) setOpen(false);
            } else {
              //   handleFilterChange(event, newInputValue);
              if (!open) setOpen(true);
            }
          }}
          value={model}
          //   onChange={(event, values) => handleChangeModel(values)}
          noOptionsText={<span style={{ fontSize: 12 }}>No Options</span>}
          size="small"
          renderOption={(props, option) => (
            <li
              {...props}
              style={{
                ...props.style,
                fontSize: 12,
                borderBottom: "1px solid #00000025",
              }}
              onClick={(e) =>{
                setReturnRecivedData((pre) => ({
                  ...pre,
                  returnNumber: option,
                }));
                setOpen(false);
              }
              }
            >
              {option}
            </li>
          )}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <div class="input-group icons border-radius-10 border-primary overflow-hidden my-3 p-2">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text bg-transparent border-0 pr-0 "
                    id="basic-addon1"
                  >
                    <img src={searchIcon} />
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Search by Customer id, customer name"
                  {...params.inputProps}
                  // style={{ width: "100%", borderRadius: 5, borderColor: '#00000030', marginBlock: 10, padding: 6 }}
                  name="modelNo"
                  class="form-control search-form-control"
                />
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default ReturnSearch;

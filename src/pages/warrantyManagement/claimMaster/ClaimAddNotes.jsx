import React, { useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

import Select from "react-select";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";

const noteTypeOptions = [
  { label: "Claim Story", value: "CLAIM_NOTES" },
  { label: "Claim Analysis", value: "CLAIM_ANALYSIS" },
  { label: "Approval Notes", value: "APPROVAL_NOTES" },
  { label: "Rejection Notes", value: "REJECTION_NOTES" },
  { label: "Settelement Notes", value: "SETTLEMENT_NOTES" },
];

const ClaimAddNotes = ({ handleSnack, handleBack, claimNumber }) => {
  const [value, setValue] = React.useState("1");
  const [recordData, setRecordData] = useState({
    noteFor: claimNumber || "",
    noteType: "",
    date: new Date(),
    externalNotes: "",
    internalNotes: "",
    note: "",
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddNotes = () => {
    handleBack();
  };

  return (
    <>
      <div className="row d-flex justify-content-between align-items-center py-2 ">
        <div className="d-flex">
          <h4 className="ml-3">Add Notes</h4>
          <span className="ml-2">
            <EditOutlinedIcon />
          </span>
          <span className="ml-2">
            <ShareOutlinedIcon />
          </span>
        </div>
        <button
          className="btn btn-light bg-primary text-white mx-3"
          onClick={handleBack}
        >
          <ArrowBackIcon /> Back
        </button>
      </div>
      <div className="card border px-3 py-2">
        <div className="row mt-3">
          <div className="col-lg-4 col-md-4 col-sm-4 master-input-fields">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                NOTE FOR
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.noteFor}
                name={"noteFor"}
                placeholder="Claim Number"
                disabled
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 master-input-fields">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                NOTE TYPE
              </label>
              <Select
                options={noteTypeOptions}
                styles={FONT_STYLE_SELECT}
                value={recordData.noteType}
                onChange={(e) => setRecordData({ ...recordData, noteType: e })}
                // placeholder="Instructions"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 master-input-fields">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                DATE
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={recordData.date}
                    onChange={(e) =>
                      setRecordData({
                        ...recordData,
                        date: e,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        inputProps={{
                          ...params.inputProps,
                          style: FONT_STYLE,
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
        <Box className="mt-2" sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="External" value="1" />
                <Tab label="Internal" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" className="px-0">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    NOTE
                  </label>
                  <textarea
                    className="form-control border-radius-10 text-primary"
                    name="externalNotes"
                    value={recordData.externalNotes}
                    onChange={(e) =>
                      setRecordData({
                        ...recordData,
                        externalNotes: e.target.value,
                      })
                    }
                    cols="30"
                    rows="5"
                    // placeholder="causes"
                  ></textarea>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2" className="px-0">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    NOTE
                  </label>
                  <textarea
                    className="form-control border-radius-10 text-primary"
                    name="internalNotes"
                    value={recordData.internalNotes}
                    onChange={(e) =>
                      setRecordData({
                        ...recordData,
                        internalNotes: e.target.value,
                      })
                    }
                    cols="30"
                    rows="5"
                    // placeholder="causes"
                  ></textarea>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      <div className="row mb-3 mx-0" style={{ justifyContent: "right" }}>
        <button
          type="button"
          className="btn btn-light bg-primary text-white"
          onClick={handleAddNotes}
        >
          Save & Close
        </button>
      </div>
    </>
  );
};

export default ClaimAddNotes;

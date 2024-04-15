import React, { useState } from "react";

import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import {
  claimRequestTypeOptions,
  questionsOptions,
} from "../warrantyManagementConstants";
import SearchBox from "pages/Common/SearchBox";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";

const WarrantyRequestModal = ({
  show,
  hideModal,
  handleSnack,
  pwaNumber,
  warrantyRequestType,
}) => {
  const [recordData, setRecordData] = useState({
    requestType: warrantyRequestType || "",
  });

  const handleGenrateCode = () => {
    hideModal();
  };
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Header>
        <Modal.Title class="h5 mb-0">Warranty Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="ligt-greey-bg p-3">
          <div>
            <span className="mr-3 cursor">
              <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
              <span className="ml-2">Edit</span>
            </span>
            <span className={`mr-3 cursor `}>
              <SellOutlinedIcon className=" font-size-16" />
              <span className="ml-2"> Authorization Code({pwaNumber})</span>
            </span>
          </div>
        </div>
        <div className="card border px-3 py-2 mb-3">
          <div className="row input-fields">
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REQUEST TYPE
                </label>
                <Select
                  onChange={(e) =>
                    setRecordData({
                      ...recordData,
                      requestType: e,
                    })
                  }
                  options={claimRequestTypeOptions}
                  value={recordData.requestType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CLAIMENT
                </label>
                <Select
                  // onChange={(e) =>
                  //   setRecordData({
                  //     ...recordData,
                  //     requestType: e,
                  //   })
                  // }
                  options={claimRequestTypeOptions}
                  // value={recordData.requestType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CLAIMENT DETAILS
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="claimentDetails"
                  placeholder="Claiment Details"
                  //   value={recordData.serialNumber}
                  //   onChange={handleInputFieldsChange}
                />
              </div>
            </div>
          </div>
        </div>
        <span>GENERAL DETAILS</span>
        <div className="card border px-3 py-2 mb-3 mt-2">
          <div className="row input-fields">
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REQUEST DESCRIPTION
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="requestDescription"
                  placeholder="Request Description"
                  //   value={recordData.serialNumber}
                  //   onChange={handleInputFieldsChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  NAME OF APPROVER
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="approverName"
                  placeholder="Name of Approver"
                  //   value={recordData.serialNumber}
                  //   onChange={handleInputFieldsChange}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  APPROVED ON
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      // value={shipmentData.shippedOn}
                      // onChange={(e) =>
                      //   handleShipmentSelectChange(e, "shippedOn")
                      // }
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
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  FAILURE DATE
                </label>
                <div className="align-items-center date-box">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      inputFormat="dd/MM/yyyy"
                      className="form-controldate border-radius-10"
                      // maxDate={new Date()}
                      closeOnSelect
                      // value={shipmentData.shippedOn}
                      // onChange={(e) =>
                      //   handleShipmentSelectChange(e, "shippedOn")
                      // }
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
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REPLACEMENT
                </label>
                <Select
                  // onChange={(e) =>
                  //   setRecordData({
                  //     ...recordData,
                  //     requestType: e,
                  //   })
                  // }
                  options={questionsOptions}
                  // value={recordData.requestType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
          </div>
        </div>
        <span>MACHINE</span>
        <div className="card border px-3 py-2 mb-3 mt-2">
          <div className="row input-fields">
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  MAKE
                </label>
                <SearchBox
                  // value={machineData.model}
                  // onChange={(e) => handleMachineSearch("model", e.target.value)}
                  type="model"
                  // result={searchModelResults}
                  // onSelect={handleModelSelect}
                  // noOptions={noOptionsModel}
                />
                {/* <div className="css-w8dmq8">*Mandatory</div> */}
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  MODEL
                </label>
                <SearchBox
                  // value={machineData.model}
                  // onChange={(e) => handleMachineSearch("model", e.target.value)}
                  type="model"
                  placeholder="Search Model"
                  // result={searchModelResults}
                  // onSelect={handleModelSelect}
                  // noOptions={noOptionsModel}
                />
                {/* <div className="css-w8dmq8">*Mandatory</div> */}
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SERIAL NUMBER
                </label>
                <SearchBox
                  // value={machineData.model}
                  // onChange={(e) => handleMachineSearch("model", e.target.value)}
                  type="equipmentNumber"
                  // result={searchModelResults}
                  // onSelect={handleModelSelect}
                  // noOptions={noOptionsModel}
                  placeholder="Search Serial Number"
                />
                {/* <div className="css-w8dmq8">*Mandatory</div> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  USED FOR
                </label>
                <Select
                  // onChange={(e) =>
                  //   setRecordData({
                  //     ...recordData,
                  //     requestType: e,
                  //   })
                  // }
                  options={claimRequestTypeOptions}
                  // value={recordData.requestType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  USAGE CONDITION
                </label>
                <Select
                  // onChange={(e) =>
                  //   setRecordData({
                  //     ...recordData,
                  //     requestType: e,
                  //   })
                  // }
                  options={claimRequestTypeOptions}
                  // value={recordData.requestType}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
          </div>
        </div>
        <span>CUSTOMER</span>
        <div className="card border px-3 py-2 mb-3 mt-2">
          <div className="row input-fields">
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CUSTOMER NUMBER
                </label>
                <SearchBox
                  // value={customerData.customerID}
                  // onChange={(e) =>
                  //   handleCustSearch("customerId", e.target.value)
                  // }
                  type="customerId"
                  // result={searchCustResults}
                  // onSelect={handleCustSelect}
                  // noOptions={noOptionsCust}
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  CUSTOMER NAME
                </label>
                <SearchBox
                  // value={customerData.customerID}
                  // onChange={(e) =>
                  //   handleCustSearch("customerId", e.target.value)
                  // }
                  type="customerId"
                  // result={searchCustResults}
                  // onSelect={handleCustSelect}
                  // noOptions={noOptionsCust}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  REFERENCE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="reference"
                  placeholder="Reference"
                  //   value={recordData.serialNumber}
                  //   onChange={handleInputFieldsChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row px-3" style={{ justifyContent: "right" }}>
          <button className="btn btn-border-primary mx-3" onClick={hideModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleGenrateCode}>
            Save & Generate Code
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyRequestModal;

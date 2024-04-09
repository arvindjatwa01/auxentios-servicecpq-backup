import React from "react";

import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { claimRequestTypeOptions } from "../warrantyManagementConstants";
import SearchBox from "pages/Common/SearchBox";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";

const WarrantyRequestModal = ({ show, hideModal, handleSnack }) => {
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Header>
        <Modal.Title class="h5 mb-0">Replacement Request</Modal.Title>
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
              <span className="ml-2"> Authorization Code(6FV0987)</span>
            </span>
          </div>
        </div>
        <span className="px-3 mt-3">GENERAL DETAILS</span>
        <div className="row input-fields mt-2 px-3">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                REQUEST TYPE
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
          <ReadOnlyField
            label="AUTHORIZATION CODE"
            className="col-lg-4 col-md-4 col-sm-4 col-12"
            value="992K17980"
          />
        </div>
        <div className="row input-fields px-3">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                CUSTOMER
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="claimentDetails"
                placeholder="Customer Name"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                ADDRESS
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="claimentDetails"
                placeholder="Customer Address"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              />
            </div>
          </div>
        </div>
        <div className="row input-fields px-3">
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                MACHINE/COMPOENT
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="claimentDetails"
                placeholder="Machine/Component"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                OLD SERIAL NUMBER
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                name="claimentDetails"
                placeholder="Old Serial Number"
                //   value={recordData.serialNumber}
                //   onChange={handleInputFieldsChange}
              />
            </div>
          </div>
        </div>
        <div className="row input-fields px-3">
          <div className="col-md-4 col-sm-4">
            <div className="form-group date-box">
              <label className="text-light-dark font-size-12 font-weight-500">
                CLAIM DETAILS
              </label>
              <div className=" d-flex form-control-date">
                <div className="">
                  <Select
                    className="text-primary"
                    placeholder="Select"
                    // value={itemPriceRequestObj.additionalPriceType}
                    // onChange={(e) =>
                    //   handlePriceTextChange(
                    //     e,
                    //     "additionalPriceType",
                    //     "select"
                    //   )
                    // }
                    options={[]}
                  />
                </div>
                <input
                  type="number"
                  className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                  placeholder="$ 300"
                  name="priceAdditionalInput"
                  // value={itemPriceRequestObj.additionalPriceValue}
                  // onChange={(e) =>
                  //   handlePriceTextChange(
                  //     e,
                  //     "additionalPriceValue",
                  //     "number",
                  //     true
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group date-box">
              <label className="text-light-dark font-size-12 font-weight-500">
                CLAIM DETAILS
              </label>
              <div className=" d-flex form-control-date">
                <div className="">
                  <Select
                    className="text-primary"
                    placeholder="Select"
                    // value={itemPriceRequestObj.additionalPriceType}
                    // onChange={(e) =>
                    //   handlePriceTextChange(
                    //     e,
                    //     "additionalPriceType",
                    //     "select"
                    //   )
                    // }
                    options={[]}
                  />
                </div>
                <input
                  type="number"
                  className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                  placeholder="$ 300"
                  name="priceAdditionalInput"
                  // value={itemPriceRequestObj.additionalPriceValue}
                  // onChange={(e) =>
                  //   handlePriceTextChange(
                  //     e,
                  //     "additionalPriceValue",
                  //     "number",
                  //     true
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card border px-3 py-2 mb-3 mt-2">
          <div className="row input-fields">
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
          </div>

          <p className="mt-4">ITEM DETAILS</p>
          <div className="row input-fields">
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  SERIAL NUMBER
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="number"
                    // type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="Required*"
                    // defaultValue={props?.priceCalculator?.startUsage}
                    // value={priceCalculator.startUsage}
                    // onChange={(e) =>
                    //   setPriceCalculator({
                    //     ...priceCalculator,
                    //     startUsage: e.target.value,
                    //   })
                    // }
                    // value={priceCalculator.startUsage}
                    name="startUsage"
                  />
                  <span className="hours-div text-primary">{"Hour"}</span>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  QUANTITY
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="number"
                    // type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="Required*"
                    // defaultValue={props?.priceCalculator?.startUsage}
                    // value={priceCalculator.startUsage}
                    // onChange={(e) =>
                    //   setPriceCalculator({
                    //     ...priceCalculator,
                    //     startUsage: e.target.value,
                    //   })
                    // }
                    // value={priceCalculator.startUsage}
                    name="startUsage"
                  />
                  <span className="hours-div text-primary">{"Hour"}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  MERCHANT
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="claimentDetails"
                  placeholder="Merchant details"
                  //   value={recordData.serialNumber}
                  //   onChange={handleInputFieldsChange}
                />
              </div>
            </div>
          </div>
          <p className="mt-4">INSTALLATION DETAILS</p>
          <div className="row input-fields">
            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  INSTALLED ON
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
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PROOF OF INSTALL
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    // type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="Required*"
                    // value={priceCalculator.startUsage}
                    // onChange={(e) =>
                    //   setPriceCalculator({
                    //     ...priceCalculator,
                    //     startUsage: e.target.value,
                    //   })
                    // }
                    // value={priceCalculator.startUsage}
                    name="startUsage"
                  />
                  <span className="hours-div text-primary">{"Photo"}</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-3">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PROOF OF purchase
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    // type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="Required*"
                    // value={priceCalculator.startUsage}
                    // onChange={(e) =>
                    //   setPriceCalculator({
                    //     ...priceCalculator,
                    //     startUsage: e.target.value,
                    //   })
                    // }
                    // value={priceCalculator.startUsage}
                    name="startUsage"
                  />
                  <span className="hours-div text-primary">{"Doc"}</span>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-12">
              <div className="form-group">
                <FormGroup>
                  <FormControlLabel
                    style={{ alignItems: "start", marginLeft: 0 }}
                    control={
                      <Switch
                      // checked={warrantyRecord.machine}
                      // onChange={(e) =>
                      //   setWarrantyRecord({
                      //     ...warrantyRecord,
                      //     machine: e.target.checked,
                      //   })
                      // }
                      />
                    }
                    labelPlacement="top"
                    label={
                      <span className="text-light-dark font-size-12 font-weight-500">
                        REPLACED
                      </span>
                    }
                  />
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="row px-3" style={{ justifyContent: "right" }}>
          <button className="btn btn-border-primary mx-3">Cancel</button>
          <button
            className="btn btn-primary"
            // onClick={handleCreateClaimRecord}
          >
            Create Claim Request
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyRequestModal;

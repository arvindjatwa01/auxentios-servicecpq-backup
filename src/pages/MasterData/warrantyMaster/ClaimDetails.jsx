import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import { Switch, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import {
  claimRequestObj,
  claimStatusOptions,
  claimTypeOptions,
  defaultClaimDetails,
  defaultDistributorObj,
  payerOptions,
} from "./WarrantyConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import { Claim_Details_By_Id_Get } from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

const ClaimDetails = ({ show, hideModal, recordId }) => {
  const [claimRecord, setClaimRecord] = useState({ ...claimRequestObj });
  const [claimDetails, setClaimDetails] = useState({ ...defaultClaimDetails });
  const [distributorDetails, setDistributorDetails] = useState({
    ...defaultDistributorObj,
  });

  const [editMode, setEditMode] = useState(false);
  const [expendClaimDetails, setExpendClaimDetails] = useState(false);

  useEffect(() => {
    if (recordId) {
      const rUrl = `${Claim_Details_By_Id_Get}${recordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const _claimStatus = claimStatusOptions.find(
            (obj) => obj.value === responseData.claimStatus
          );
          const _claimType = claimTypeOptions.find(
            (obj) => obj.value === responseData.claimType
          );

          const _payer = payerOptions.find(
            (obj) => obj.value === responseData.payer
          );

          setClaimRecord({
            ...responseData,
            claimStatus: _claimStatus || "",
            claimType: _claimType || "",
            payer: _payer || "",
          });
          setClaimDetails({
            claimStatus: _claimStatus || "",
            claimType: _claimType || "",
            replacement: responseData.replacement,
            failDate: responseData.failDate,
            installedDate: "",
            defectType: "",
            defectDescription: "",
          });
        }
      });
    }
  }, [recordId]);

  // input text change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimDetails({ ...claimDetails, [name]: value });
  };

  // select optio || date change
  const handleSelectChange = (e, keyName) => {
    setClaimDetails({ ...claimDetails, [keyName]: e });
  };

  // distributor input text change
  const handleDistrubutorTextChange = (e) => {
    const { name, value } = e.target;
    setDistributorDetails({ ...distributorDetails, [name]: value });
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="font-weight-bold fw-bold mb-0">Claim Detials</h5>
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
        <div className="card border px-2 py-3 mt-2">
          {editMode ? (
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Claim Status
                  </label>
                  <Select
                    className="text-primary"
                    options={claimStatusOptions}
                    onChange={(e) => handleSelectChange(e, "claimStatus")}
                    value={claimDetails.claimStatus}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Claim Type
                  </label>
                  <Select
                    className="text-primary"
                    options={claimTypeOptions}
                    onChange={(e) => handleSelectChange(e, "claimType")}
                    value={claimDetails.claimType}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <FormGroup>
                    <FormControlLabel
                      style={{ alignItems: "start", marginLeft: 0 }}
                      control={
                        <Switch
                          checked={claimDetails.replacement}
                          onChange={(e) =>
                            setClaimDetails({
                              ...claimDetails,
                              replacement: e.target.checked,
                            })
                          }
                        />
                      }
                      labelPlacement="top"
                      label={
                        <span className="text-light-dark font-size-12 font-weight-500">
                          Replacement
                        </span>
                      }
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Fill Date
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        // maxDate={new Date()}
                        closeOnSelect
                        value={claimDetails.fillDate}
                        onChange={(e) => handleSelectChange(e, "fillDate")}
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
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Installed
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        // maxDate={new Date()}
                        closeOnSelect
                        value={claimDetails.installedDate}
                        onChange={(e) => handleSelectChange(e, "installedDate")}
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
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Defect Type
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.defectType}
                    name="defectType"
                    placeholder="Defect Type"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Defect Description
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.defectDescription}
                    name="defectDescription"
                    placeholder="Defect Description"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="row align-items-end px-2 py-2">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Status
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimDetails.claimStatus?.label)
                      ? "NA"
                      : claimDetails.claimStatus?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Claim Type
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimDetails.claimType?.label)
                      ? "NA"
                      : claimDetails.claimType?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Replacement
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {claimDetails.replacement ? "Yes" : "No"}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Fill Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimDetails.fillDate)
                      ? "NA"
                      : getFormatDateTime(claimDetails.fillDate, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Installed
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimDetails.installedDate)
                      ? "NA"
                      : getFormatDateTime(claimDetails.installedDate, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Defect Type
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimDetails.defectType)
                      ? "NA"
                      : claimDetails.defectType}
                  </h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Defect Description
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(claimDetails.defectDescription)
                      ? "NA"
                      : claimDetails.defectDescription}
                  </h6>
                </div>
              </div>
            </div>
          )}
        </div>
        <h5 className="font-weight-bold fw-bold mb-0">Distributor</h5>
        <div className="card border px-2 py-3">
          {editMode ? (
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Distributor Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.distributorName}
                    name="distributorName"
                    placeholder="Distributor Name"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Distributor Address
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.address}
                    name="address"
                    placeholder="Distributor Address"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.city}
                    name="city"
                    placeholder="City"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.state}
                    name="state"
                    placeholder="State"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.zipCode}
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Contact Email
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.email}
                    name="email"
                    placeholder="Email"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.phoneNumber}
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Fax
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimDetails.fax}
                    name="fax"
                    placeholder="Fax"
                    onChange={handleDistrubutorTextChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="row align-items-end px-2 py-2">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Distributor Name
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.distributorName)
                      ? "NA"
                      : distributorDetails.distributorName}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Distributor Address
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.address)
                      ? "NA"
                      : distributorDetails.address}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    City
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.city)
                      ? "NA"
                      : distributorDetails.city}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    State
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.state)
                      ? "NA"
                      : distributorDetails.state}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Zip Code
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.zipCode)
                      ? "NA"
                      : distributorDetails.zipCode}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Contact Email
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.email)
                      ? "NA"
                      : distributorDetails.email}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Phone Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.phoneNumber)
                      ? "NA"
                      : distributorDetails.phoneNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Fax
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(distributorDetails.fax)
                      ? "NA"
                      : distributorDetails.fax}
                  </h6>
                </div>
              </div>
            </div>
          )}
        </div>
        {expendClaimDetails && (
          <>
            <h5 className="font-weight-bold fw-bold mb-0">Item Details</h5>
            <div className="card border px-2 py-3 mb-0">
              {editMode ? (
                <>
                  <div className="row input-fields">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.claimNumber}
                          name="claimNumber"
                          placeholder="Claim Number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Model Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.modelNumber}
                          name="modelNumber"
                          placeholder="Model Number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Equipment Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.equipmentNumber}
                          name="equipmentNumber"
                          placeholder="Equipment Number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Serial Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.serialNumber}
                          name="serialNumber"
                          placeholder="Serial Number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Component Code
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.componentCode}
                          name="componentCode"
                          placeholder="Component Code"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Status
                        </label>
                        <Select
                          className="text-primary"
                          options={claimStatusOptions}
                          onChange={(e) => handleSelectChange(e, "claimStatus")}
                          value={claimRecord.claimStatus}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Type
                        </label>
                        <Select
                          className="text-primary"
                          options={claimTypeOptions}
                          onChange={(e) => handleSelectChange(e, "claimType")}
                          value={claimRecord.claimType}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <FormGroup>
                          <FormControlLabel
                            style={{ alignItems: "start", marginLeft: 0 }}
                            control={
                              <Switch
                                checked={claimRecord.replacement}
                                onChange={(e) =>
                                  setClaimRecord({
                                    ...claimRecord,
                                    replacement: e.target.checked,
                                  })
                                }
                              />
                            }
                            labelPlacement="top"
                            label={
                              <span className="text-light-dark font-size-12 font-weight-500">
                                Replacement
                              </span>
                            }
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Fill Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.fillDate}
                              onChange={(e) =>
                                handleSelectChange(e, "fillDate")
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
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Failure Part Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.failurePartNumber}
                          name="failurePartNumber"
                          placeholder="Failure Part Number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Hour on Machine
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.hourOnMachine}
                          name="hourOnMachine"
                          placeholder="Hour on Machine"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Hours on Failed Part
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.hoursOnFailedPart}
                          name="hoursOnFailedPart"
                          placeholder="Hours on Failed Part"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Part List
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.partList}
                          name="partList"
                          placeholder="Part List"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Time taken for the Repair
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.repairTime}
                          name="repairTime"
                          placeholder="Time taken for the Repair"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Payer
                        </label>
                        <Select
                          className="text-primary"
                          options={payerOptions}
                          onChange={(e) => handleSelectChange(e, "payer")}
                          value={claimRecord.payer}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Approver
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.claimApprover}
                          name="claimApprover"
                          placeholder="Claim Approver"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Created By
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.createdBy}
                          name="createdBy"
                          placeholder="Created By"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Updated By
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecord.updatedBy}
                          name="updatedBy"
                          placeholder="Updated By"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Created On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.createdOn}
                              onChange={(e) =>
                                handleSelectChange(e, "createdOn")
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
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Updated On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.updatedOn}
                              onChange={(e) =>
                                handleSelectChange(e, "updatedOn")
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
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Receipt Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.claimReceiptDate}
                              onChange={(e) =>
                                handleSelectChange(e, "claimReceiptDate")
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
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Created Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.createdDate}
                              onChange={(e) =>
                                handleSelectChange(e, "createdDate")
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
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Closed Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.closedDate}
                              onChange={(e) =>
                                handleSelectChange(e, "closedDate")
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
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Approved / Rejected On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecord.appoverRejectedOn}
                              onChange={(e) =>
                                handleSelectChange(e, "appoverRejectedOn")
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
                  <div className="row input-fields">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Story
                        </label>
                        <textarea
                          name="claimStory"
                          cols="30"
                          rows="3"
                          value={claimRecord.claimStory}
                          onChange={handleInputChange}
                          placeholder="Claim Story"
                          className="form-control border-radius-10 text-primary"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Approval / Rejection Notes
                        </label>
                        <textarea
                          name="claimNotes"
                          cols="30"
                          rows="3 "
                          value={claimRecord.claimNotes}
                          onChange={handleInputChange}
                          placeholder="Claim Approval / Rejection Notes"
                          className="form-control border-radius-10 text-primary"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row align-items-end px-2 py-2">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Claim Number
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.claimNumber)
                            ? "NA"
                            : claimRecord.claimNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Modal Number
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.modelNumber)
                            ? "NA"
                            : claimRecord.modelNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Equipment Number
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.equipmentNumber)
                            ? "NA"
                            : claimRecord.equipmentNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Serial Number
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.serialNumber)
                            ? "NA"
                            : claimRecord.serialNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Component Code
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.componentCode)
                            ? "NA"
                            : claimRecord.componentCode}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Claim Status
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.claimStatus?.label)
                            ? "NA"
                            : claimRecord.claimStatus?.label}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Claim Type
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.claimType?.label)
                            ? "NA"
                            : claimRecord.claimType?.label}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Replacement
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {claimRecord.replacement ? "Yes" : "No"}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Fill Date
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.fillDate)
                            ? "NA"
                            : getFormatDateTime(claimRecord.fillDate, false)}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Failure Part Number
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.failurePartNumber)
                            ? "NA"
                            : claimRecord.failurePartNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Hour on Machine
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.hourOnMachine)
                            ? "NA"
                            : claimRecord.hourOnMachine}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Hours on Failed Part
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.hoursOnFailedPart)
                            ? "NA"
                            : claimRecord.hoursOnFailedPart}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Part List
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.partList)
                            ? "NA"
                            : claimRecord.partList}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Time taken for the Repair
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.repairTime)
                            ? "NA"
                            : claimRecord.repairTime}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Payer
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.payer?.label)
                            ? "NA"
                            : claimRecord.payer?.label}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Claim Approver
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.claimApprover)
                            ? "NA"
                            : claimRecord.claimApprover}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Created By
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.createdBy)
                            ? "NA"
                            : claimRecord.createdBy}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Updated By
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.updatedBy)
                            ? "NA"
                            : claimRecord.updatedBy}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Created On
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.createdOn)
                            ? "NA"
                            : getFormatDateTime(claimRecord.createdOn, false)}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Updated On
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.updatedOn)
                            ? "NA"
                            : getFormatDateTime(claimRecord.updatedOn, false)}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Claim Receipt Date
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.claimReceiptDate)
                            ? "NA"
                            : getFormatDateTime(
                                claimRecord.claimReceiptDate,
                                false
                              )}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Created Date
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.createdDate)
                            ? "NA"
                            : getFormatDateTime(claimRecord.createdDate, false)}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Closed Date
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.closedDate)
                            ? "NA"
                            : getFormatDateTime(claimRecord.closedDate, false)}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Approved / Rejected On
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.appoverRejectedOn)
                            ? "NA"
                            : getFormatDateTime(
                                claimRecord.appoverRejectedOn,
                                false
                              )}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row input-fields">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Claim Story
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.claimStory)
                            ? "NA"
                            : claimRecord.claimStory}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Claim Approval / Rejection Notes
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(claimRecord.claimNotes)
                            ? "NA"
                            : claimRecord.claimNotes}
                        </h6>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
        <div className="row mt-2 px-2 d-flex justify-content-arround">
          {editMode ? (
            <>
              <button
                className="btn text-white bg-primary mx-1"
                onClick={hideModal}
              >
                Submit
              </button>
              <button
                className="btn text-white bg-primary mx-1"
                onClick={hideModal}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn text-white bg-primary mx-1"
              onClick={hideModal}
            >
              Close
            </button>
          )}
          <button
            className="btn text-white bg-primary mx-1"
            onClick={() => setExpendClaimDetails(!expendClaimDetails)}
          >
            Expend {expendClaimDetails ? "Close" : "Overview"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimDetails;

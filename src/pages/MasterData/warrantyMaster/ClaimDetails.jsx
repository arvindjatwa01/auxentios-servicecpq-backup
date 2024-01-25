import React, { useState } from "react";
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
  claimStatusOptions,
  claimTypeOptions,
  defaultClaimDetails,
  defaultDistributorObj,
} from "./WarrantyConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";

const ClaimDetails = ({ show, hideModal }) => {
  const [claimDetails, setClaimDetails] = useState({ ...defaultClaimDetails });
  const [distributorDetails, setDistributorDetails] = useState({
    ...defaultDistributorObj,
  });

  const [editMode, setEditMode] = useState(false);

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
        <div className="card border px-2 py-3 mb-0">
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
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimDetails;

import { Box, TextField, Typography } from "@mui/material";
import SelectBox from "pages/Insights/SelectBox";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import { warrantyDummyRecord } from "./WarrantyConstants";

const warrantyStatusOptions = [
  { label: "In Warranty", value: "In Warranty" },
  { label: "Out of warranty", value: "Out of warranty" },
];
const replacementOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const WarrantyDetails = ({ show, hideModal, recordId }) => {
  const [warrantyStatus, setWarrantyStatus] = useState("");
  const [replacement, setReplacement] = useState("");
  const [dateOfInsatll, setDateOfInsatll] = useState(new Date());

  const [editRecord, setEditRecord] = useState(true);

  const [installerReqObj, setInstallerReqObj] = useState({
    companyName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
    installType: "",
    indoorBrand: "",
    outdoorBrand: "",
    equipmentInfo: "",
    distributor: "",
  });

  useEffect(() => {
    if (recordId) {
      const newData = warrantyDummyRecord.find(
        (record) => record.id === recordId
      );
      if (newData !== undefined) {
        console.log(newData);
        const _warrantyStatus = warrantyStatusOptions.find(
          (obj) =>
            obj.value.toLowerCase() === newData.warrantyStatus.toLowerCase()
        );
        setWarrantyStatus(_warrantyStatus || "");

        const _replacement = replacementOptions.find(
          (obj) => obj.value.toLowerCase() === newData.replacement.toLowerCase()
        );
        setReplacement(_replacement || "");

        setInstallerReqObj({
          companyName: "AIR-TECH SERVICES",
          address: "2500 A STREET STE 4",
          city: "PASCO",
          state: "WA",
          zipCode: "99320",
          email: "HELLO@AIRTECH.COM",
          phoneNumber: "509-727-3333",
          installType: "INSTALLER TYPE",
          indoorBrand: "",
          outdoorBrand: "",
          equipmentInfo: "EQUIPMENT INFO",
          distributor: "JONES SUPPLY",
        });
      }
    }
  }, [recordId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstallerReqObj({ ...installerReqObj, [name]: value });
  };

  return (
    <Modal show={show} onHide={hideModal} size="lg">
      <Modal.Body>
        <div className="row align-items-end text-end ">
          <div className="col-12 d-flex justify-content-end mb-2 float-end ">
            <button
              className="btn btn-primary float-end "
              onClick={() => setEditRecord(false)}
            >
              Edit
            </button>
          </div>
        </div>
        <h5>Warranty Details</h5>
        <div className="card border mb-2 mt-2 px-3">
          {editRecord ? (
            <>
              <div className="row mt-2">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Warranty Status
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(warrantyStatus) ? "NA" : warrantyStatus?.label}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Replacement
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(replacement) ? "NA" : replacement?.label}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Date of Install
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(dateOfInsatll)
                        ? "NA"
                        : getFormatDateTime(dateOfInsatll, false)}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-2 input-fields">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Warranty Status
                    </label>
                    <Select
                      className="text-primary"
                      options={warrantyStatusOptions}
                      onChange={(e) => setWarrantyStatus(e)}
                      value={warrantyStatus}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Replacement
                    </label>
                    <Select
                      className="text-primary"
                      options={replacementOptions}
                      onChange={(e) => setReplacement(e)}
                      value={replacement}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Date of Install
                    </label>
                    <div className="align-items-center date-box">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          // sx={{
                          //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                          //   }}
                          // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                          // minDate={estimationData.preparedOn}
                          maxDate={new Date()}
                          closeOnSelect
                          value={dateOfInsatll}
                          onChange={(e) => setDateOfInsatll(e)}
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
            </>
          )}
        </div>

        <h5>Installer</h5>
        <div className="card border mb-2 mt-1 px-2">
          {editRecord ? (
            <>
              <div className="row mt-2">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Installer Company Name
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.companyName)
                        ? "NA"
                        : installerReqObj?.companyName}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Installer Address
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.address)
                        ? "NA"
                        : installerReqObj?.address}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      City
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.city)
                        ? "NA"
                        : installerReqObj?.city}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      State
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.state)
                        ? "NA"
                        : installerReqObj?.state}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Zip Code
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.zipCode)
                        ? "NA"
                        : installerReqObj?.zipCode}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Contact Email
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.email)
                        ? "NA"
                        : installerReqObj?.email}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Phone Number
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.phoneNumber)
                        ? "NA"
                        : installerReqObj?.phoneNumber}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Install Type
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.installType)
                        ? "NA"
                        : installerReqObj?.installType}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Indoor Brand
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.indoorBrand)
                        ? "NA"
                        : installerReqObj?.indoorBrand}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Outdoor Brand
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.outdoorBrand)
                        ? "NA"
                        : installerReqObj?.outdoorBrand}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Equipment Info
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.equipmentInfo)
                        ? "NA"
                        : installerReqObj?.equipmentInfo}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      Distributor/Wholesaler
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(installerReqObj.distributor)
                        ? "NA"
                        : installerReqObj?.distributor}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-1 input-fields">
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Installer Company Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.companyName}
                      name="companyName"
                      placeholder="Company Name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Installer Address
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.address}
                      name="address"
                      placeholder="Address"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.city}
                      name="city"
                      placeholder="City"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.state}
                      name="state"
                      placeholder="State"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-1 input-fields">
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.zipCode}
                      name="zipCode"
                      placeholder="Zip Code"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Contact Email
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.phoneNumber}
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Insatll Type
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.installType}
                      name="installType"
                      placeholder="Install Type"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-1 input-fields">
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Indoor Brand
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.indooorBrand}
                      name="indooorBrand"
                      placeholder="Indoor Brand"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Outdoor Brand
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.outdoorBrand}
                      name="outdoorBrand"
                      placeholder="Outdoor Brand"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Equipment Info
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.equipmentInfo}
                      name="equipmentInfo"
                      placeholder="Equipment Info"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Distributor/Wholesaler
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerReqObj.distributor}
                      name="distributor"
                      placeholder="Distributor"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="row mt-2 px-2 d-flex justify-content-arround">
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
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyDetails;
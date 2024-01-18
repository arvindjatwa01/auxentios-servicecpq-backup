import { Box, TextField, Typography } from "@mui/material";
import SelectBox from "pages/Insights/SelectBox";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

const warrentyStatusOptions = [
  { label: "In Warranty", value: "In Warranty" },
  { label: "Out of warranty", value: "Out of warranty" },
];
const replacementOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const WarrantyDetails = ({ show, hideModal }) => {
  const [warrantyStatus, setWarrantyStatus] = useState("");
  const [replacement, setReplacement] = useState("");
  const [dateOfInsatll, setDateOfInsatll] = useState(new Date());

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstallerReqObj({ ...installerReqObj, [name]: value });
  };

  return (
    <Modal show={show} onHide={hideModal} size="lg">
      <Modal.Body>
        <h5>Warrenty Details</h5>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row mt-2 input-fields">
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Warrenty Status
                </label>
                <Select
                  // className="text-primary"
                  options={warrentyStatusOptions}
                  // onChange={(e) =>
                  //   handleAdministrativeTextChange(e, "select", "salesOffice")
                  // }
                  // value={administrative.salesOffice}
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
                  // className="text-primary"
                  options={replacementOptions}
                  // onChange={(e) =>
                  //   handleAdministrativeTextChange(e, "select", "salesOffice")
                  // }
                  // value={administrative.salesOffice}
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
        </div>

        <h5>Installer</h5>
        <div className="card border mb-2 mt-1 px-2">
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
        </div>
        <div className="row mt-2 px-2 d-flex justify-content-arround">
          <button className="btn text-white bg-primary mx-1">Upload</button>
          <button className="btn text-white bg-primary mx-1" onClick={hideModal}>Cancel</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyDetails;

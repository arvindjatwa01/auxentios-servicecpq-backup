import React, { useEffect, useState } from "react";

import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import Select from "react-select";
import { Modal } from "react-bootstrap";
import Moment from "react-moment";

import {
  warrantyRequestObj,
  customerRequestObj,
  installerRequestObj,
  warrantyCategoryOptions,
  warrantyBasisOptions,
  warrantyUnitOptions,
  warrantyStatusOptions,
  installerTypeOptions,
} from "../warrantyManagementConstants";

import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";

import { callGetApi, callPutApi } from "services/ApiCaller";
import {
  Get_Customer_Master_Details_By_Id_GET,
  WARRANTY_INSTALLER_MASTER_URL,
  WARRANTY_MASTER_URL,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";

const WarrantyEditModal = ({ show, hideModal, recordId, handleSnack }) => {
  const [editWarranty, setEditWarranty] = useState(false);
  const [warrantyRecord, setWarrantyRecord] = useState({
    ...warrantyRequestObj,
  });

  const [customerRecord, setCustomerRecord] = useState({
    ...customerRequestObj,
  });

  const [installerRecord, setInstallerRecord] = useState({
    ...installerRequestObj,
  });

  useEffect(() => {
    if (recordId) {
      const rUrl = `${WARRANTY_MASTER_URL}/${recordId}`;
      callGetApi(rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          //   const responseData = response.data;
          const { installerDetails, customerDetails, ...responseData } =
            response.data;

          // get category key value pairs
          const _category = warrantyCategoryOptions.find(
            (obj) => obj.value === responseData.category
          );

          // get basis key value pairs
          const _basis = warrantyBasisOptions.find(
            (obj) => obj.value === responseData.basis
          );

          // get unit key value pairs
          const _unit = warrantyUnitOptions.find(
            (obj) => obj.value === responseData.basis
          );

          // get status key value pairs
          const _warrantyStatus = warrantyStatusOptions.find(
            (obj) => obj.value === responseData.warrantyStatus
          );

          // set warranty details
          setWarrantyRecord({
            ...responseData,
            category: _category || "",
            basis: _basis || "",
            unit: _unit || "",
            warrantyStatus: _warrantyStatus || "",
          });

          // get customer details
          if (responseData.customerId) {
            getCustomerDetails(responseData.customerId);
          }

          if (responseData.installerId) {
            getInstallerDetails(responseData.installerId);
          }

          // // set installer record data
          // const _installerType = installerTypeOptions.find(
          //   (obj) => obj.value === installerDetails.installerType
          // );
          // setInstallerRecord({
          //   ...installerDetails,
          //   installerType: _installerType || "",
          // });
          // setCustomerRecord({ ...customerDetails });
        } else {
          handleSnack("error", "Something went wrong");
        }
      });
    }
  }, [recordId]);

  // get customer details
  const getCustomerDetails = (id) => {
    const rUrl = `${Get_Customer_Master_Details_By_Id_GET}${id}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setCustomerRecord({
          customerId: responseData.id,
          customerName: responseData.fullName,
          email: responseData.email,
          address: responseData.addressDTO?.fullAddress,
          city: responseData.addressDTO?.district,
          state: responseData.addressDTO?.regionOrState,
          country: responseData.addressDTO?.country,
          zipCode: responseData.addressDTO?.zipCode,
          phoneNumber: responseData?.phoneNumber,
        });
      }
    });
  };

  // get warranty installer details
  const getInstallerDetails = (installerId) => {
    const rUrl = `${WARRANTY_INSTALLER_MASTER_URL}/${installerId}`;
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        // set installer record data
        const _installerType = installerTypeOptions.find(
          (obj) => obj.value === responseData.installerType
        );
        setInstallerRecord({
          ...responseData,
          installerType: _installerType || "",
        });
      }
    });
  };

  const handleCustomerFieldsChange = (e) => {
    const { name, value } = e.target;
    setCustomerRecord({ ...customerRecord, [name]: value });
  };

  const handleInstallerFieldsChange = (e) => {
    const { name, value } = e.target;
    setInstallerRecord({ ...installerRecord, [name]: value });
  };

  const handleUpdateWarrantyDetails = (e) => {
    const rUrl = `${WARRANTY_MASTER_URL}/${recordId}`;
    const rObj = {
      ...warrantyRecord,
      category: warrantyRecord.category?.value || "EMPTY",
      basis: warrantyRecord.basis?.value || "EMPTY",
      unit: warrantyRecord.unit?.value || "EMPTY",
      warrantyStatus: warrantyRecord.warrantyStatus?.value || "EMPTY",
      installerDetails: {
        ...installerRecord,
        installerType: installerRecord.installerType?.value || "EMPTY",
      },
      customerDetails: { ...customerRecord },
    };

    callPutApi(null, rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        handleSnack("success", "Warranty Details updated successfully.");
        hideModal();
      } else {
        handleSnack("error", "Something went wrong.");
      }
    });
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="row align-items-center text-end">
          <div className="col-lg-12 d-flex justify-content-between align-items-center ">
            <h5>Warranty Details</h5>
            <button
              className="btn btn-primary float-end "
              onClick={() => setEditWarranty(!editWarranty)}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="card border mb-3 mt-2 px-3 py-2">
          {editWarranty ? (
            <>
              <div className="row mt-2 input-fields">
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      WARRANTY STATUS
                    </label>
                    <Select
                      className="text-primary"
                      options={warrantyStatusOptions}
                      onChange={(e) =>
                        setWarrantyRecord({
                          ...warrantyRecord,
                          warrantyStatus: e,
                        })
                      }
                      value={warrantyRecord.warrantyStatus}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <FormGroup>
                      <FormControlLabel
                        style={{ alignItems: "start", marginLeft: 0 }}
                        control={
                          <Switch
                            checked={warrantyRecord.replacement}
                            onChange={(e) =>
                              setWarrantyRecord({
                                ...warrantyRecord,
                                replacement: e.target.checked,
                              })
                            }
                          />
                        }
                        labelPlacement="top"
                        label={
                          <span className="text-light-dark font-size-12 font-weight-500">
                            replacement
                          </span>
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DATE OF INSTALL
                    </label>
                    <div className="align-items-center date-box">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                          inputFormat="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          //   maxDate={new Date()}
                          closeOnSelect
                          value={warrantyRecord.dateOfInstall}
                          onChange={(e) =>
                            setWarrantyRecord({
                              ...warrantyRecord,
                              dateOfInstall: e,
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
            </>
          ) : (
            <>
              <div className="row mt-2">
                <ReadOnlyField
                  label="WARRANTY STATUS"
                  value={warrantyRecord.warrantyStatus?.label}
                  className="col-md-4 col-sm-4"
                />
                <ReadOnlyField
                  label="REPLACEMENT"
                  value={warrantyRecord.replacement ? "YES" : "NO"}
                  className="col-md-4 col-sm-4"
                />
                <ReadOnlyField
                  label="DATE OF INSTALL"
                  value={
                    warrantyRecord.dateOfInstall ? (
                      <Moment format="DD/MM/YYYY">
                        {warrantyRecord.dateOfInstall}
                      </Moment>
                    ) : (
                      "na"
                    )
                  }
                  className="col-md-4 col-sm-4"
                />
              </div>
            </>
          )}
        </div>
        <h5 className="mb-0">End Customer</h5>
        <div className="card border mb-3 px-3 py-2">
          {editWarranty ? (
            <>
              <div className="row mt-2 input-fields">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CUSTOMER ID
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.customerId}
                      name="customerId"
                      placeholder="Customer Id"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CUSTOMER NAME
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.customerName}
                      name="customerName"
                      placeholder="Customer Name"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      ADDRESS
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.address}
                      name="address"
                      placeholder="Address"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CITY
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.city}
                      name="city"
                      placeholder="City"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      STATE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.state}
                      name="state"
                      placeholder="State"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      ZIP CODE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.zipCode}
                      name="zipCode"
                      placeholder="Zip Code"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CONTACT EMAIL
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={customerRecord.phoneNumber}
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChange={handleCustomerFieldsChange}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-2">
                <ReadOnlyField
                  label="CUSTOMER ID"
                  value={customerRecord.customerId}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="CUSTOMER NAME"
                  value={customerRecord.customerName}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="ADDRESS"
                  value={customerRecord.address}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="CITY"
                  value={customerRecord.city}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="STATE"
                  value={customerRecord.state}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="ZIP CODE"
                  value={customerRecord.zipCode}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="CONTACT EMAIL"
                  value={customerRecord.email}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="PHONE NUMBER"
                  value={customerRecord.phoneNumber}
                  className="col-md-3 col-sm-3"
                />
              </div>
            </>
          )}
        </div>
        <h5 className="mb-0">Installer</h5>
        <div className="card border mb-2 px-3 py-2">
          {editWarranty ? (
            <>
              <div className="row mt-2 input-fields">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      INSTALLER COMPANY NAME
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.companyName}
                      name="companyName"
                      placeholder="Company Name"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      INSTALLER ADDRESS
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.address}
                      name="address"
                      placeholder="Address"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CITY
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.city}
                      name="city"
                      placeholder="City"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      STATE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.state}
                      name="state"
                      placeholder="State"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      ZIP CODE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.zipCode}
                      name="zipCode"
                      placeholder="Zip Code"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CONTACT EMAIL
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.phoneNumber}
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      INSATALL TYPE
                    </label>
                    <Select
                      className="text-primary"
                      options={installerTypeOptions}
                      onChange={(e) =>
                        setInstallerRecord({
                          ...installerRecord,
                          installerType: e,
                        })
                      }
                      value={installerRecord.installerType}
                      styles={FONT_STYLE_SELECT}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      EQUIPMENT INFO
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.equipmentInfo}
                      name="equipmentInfo"
                      placeholder="Equipment Info"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DISREIBUTOR/WHOLESALER
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={installerRecord.distributor}
                      name="distributor"
                      placeholder="Distributor/Wholesaler"
                      onChange={handleInstallerFieldsChange}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-2 mb-0">
                <ReadOnlyField
                  label="INSTALLER COMPANY NAME"
                  value={installerRecord.companyName}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="INSTALLER ADDRESS"
                  value={installerRecord.address}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="CITY"
                  value={installerRecord.city}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="STATE"
                  value={installerRecord.state}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="ZIP CODE"
                  value={installerRecord.zipCode}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="CONTACT EMAIL"
                  value={installerRecord.email}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="PHONE NUMBER"
                  value={installerRecord.phoneNumber}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="INSTALL TYPE"
                  value={installerRecord.installerType?.label}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="EQUIPMENT INFO"
                  value={installerRecord.equipmentInfo}
                  className="col-md-3 col-sm-3"
                />
                <ReadOnlyField
                  label="DISREIBUTOR/WHOLESALER"
                  value={installerRecord.distributor}
                  className="col-md-3 col-sm-3"
                />
              </div>
            </>
          )}
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            type="button"
            className={`btn btn-light bg-primary text-white ${
              !editWarranty ? "mx-3" : ""
            }`}
            onClick={hideModal}
          >
            {editWarranty ? "Cancel" : "Close"}
          </button>
          {editWarranty && (
            <button
              type="button"
              className="btn btn-light bg-primary text-white mx-3"
              onClick={handleUpdateWarrantyDetails}
            >
              Save & Close
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarrantyEditModal;

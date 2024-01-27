import React from "react";

import penIcon from "../../../assets/images/pen.png";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import { Switch, TextField } from "@mui/material";

import Select from "react-select";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import {
  installerTypeOptions,
  notesList,
  warrantyBasisOptions,
  warrantyCategoryOptions,
  warrantyStatusOptions,
  warrantyUnitOptions,
} from "./WarrantyConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";

const OverviewDetailsTabConatiner = ({
  warrantyRecord,
  edit,
  handleEdit,
  hadleWarrantyInputChange,
  handleWarrantySelectChange,
  handleTabChange,
  installerRecord,
  customerDetails,
  hadleInstallerInputChange,
  hadleInstallerSelectChange,
  hadleCustomerInputChange,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="font-weight-bold fw-bold mb-0">Item Details</h5>
        <div>
          <button className="border-primary text-primary rounded-pill px-3 py-1">
            <img className="m-1" src={penIcon} alt="Edit" /> Edit
          </button>
        </div>
      </div>
      <div className="card border mb-3 mt-2 px-3 py-3">
        {edit ? (
          <>
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Warranty Id
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.warrantyId}
                    name="warrantyId"
                    placeholder="Company Name"
                    onChange={hadleWarrantyInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Category
                  </label>
                  <Select
                    className="text-primary"
                    options={warrantyCategoryOptions}
                    onChange={(e) => handleWarrantySelectChange(e, "category")}
                    value={warrantyRecord.category}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Basis
                  </label>
                  <Select
                    className="text-primary"
                    options={warrantyBasisOptions}
                    onChange={(e) => handleWarrantySelectChange(e, "basis")}
                    value={warrantyRecord.basis}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Unit
                  </label>
                  <Select
                    className="text-primary"
                    options={warrantyUnitOptions}
                    onChange={(e) => handleWarrantySelectChange(e, "unit")}
                    value={warrantyRecord.unit}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Warranty Start Date
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        closeOnSelect
                        value={warrantyRecord.warrantyStartDate}
                        onChange={(e) =>
                          handleWarrantySelectChange(e, "warrantyStartDate")
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
                    Warranty End Date
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        closeOnSelect
                        value={warrantyRecord.warrantyEndDate}
                        onChange={(e) =>
                          handleWarrantySelectChange(e, "warrantyEndDate")
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
                    Warranty Start Usage
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.warrantyStartUsage}
                    name="warrantyStartUsage"
                    placeholder="Start Usag"
                    onChange={hadleWarrantyInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Warranty End Usage
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.warrantyEndUsage}
                    name="warrantyEndUsage"
                    placeholder="End USage"
                    onChange={hadleWarrantyInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Modal Number
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.modalNumber}
                    name="modalNumber"
                    placeholder="Model Number"
                    onChange={hadleWarrantyInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Make
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.make}
                    name="make"
                    placeholder="Make"
                    onChange={hadleWarrantyInputChange}
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
                          checked={warrantyRecord.machine}
                          //   onChange={(e) =>
                          //     setWarrantyRecord({
                          //       ...warrantyRecord,
                          //       machine: e.target.checked,
                          //     })
                          //   }
                        />
                      }
                      labelPlacement="top"
                      label={
                        <span className="text-light-dark font-size-12 font-weight-500">
                          Machine/Component
                        </span>
                      }
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Machine Serial Number
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.machineSerialNumber}
                    name="machineSerialNumber"
                    placeholder="Machine Serial Number"
                    onChange={hadleWarrantyInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Component Code
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.componentCode}
                    name="componentCode"
                    placeholder="Component Code"
                    onChange={hadleWarrantyInputChange}
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
                    value={warrantyRecord.serialNumber}
                    name="serialNumber"
                    placeholder="Company Name"
                    onChange={hadleWarrantyInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Date of Install
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRecord.dateOfInstall}
                        onChange={(e) =>
                          handleWarrantySelectChange(e, "dateOfInstall")
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
                    Warranty Certificate
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.warrantyCertificate}
                    name="warrantyCertificate"
                    placeholder="Warranty Certificate"
                    onChange={hadleWarrantyInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Proof of Install
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.proofOfInstall) ? "No" : "Yes"}
                    <InsertPhotoIcon />
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Warranty Status
                  </label>
                  <Select
                    className="text-primary"
                    options={warrantyStatusOptions}
                    onChange={(e) =>
                      handleWarrantySelectChange(e, "warrantyStatus")
                    }
                    value={warrantyRecord.warrantyStatus}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Date of Sale
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRecord.dateOdSale}
                        onChange={(e) =>
                          handleWarrantySelectChange(e, "dateOdSale")
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
                  <FormGroup>
                    <FormControlLabel
                      style={{ alignItems: "start", marginLeft: 0 }}
                      control={
                        <Switch
                          checked={warrantyRecord.replacement}
                          //   onChange={(e) =>
                          //     setWarrantyRecord({
                          //       ...warrantyRecord,
                          //       replacement: e.target.checked,
                          //     })
                          //   }
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
                    Manufacture Date
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRecord.manufectureDate}
                        onChange={(e) =>
                          handleWarrantySelectChange(e, "manufectureDate")
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
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Warranty Id
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyId)
                      ? "NA"
                      : warrantyRecord.warrantyId}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Category
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.category?.label)
                      ? "NA"
                      : warrantyRecord.category?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Basis
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.basis?.label)
                      ? "NA"
                      : warrantyRecord.basis?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Unit
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.unit?.label)
                      ? "NA"
                      : warrantyRecord.unit?.label}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Warranty Start Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyStartDate)
                      ? "NA"
                      : getFormatDateTime(
                          warrantyRecord.warrantyStartDate,
                          false
                        )}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Warranty End Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyEndDate)
                      ? "NA"
                      : getFormatDateTime(
                          warrantyRecord.warrantyEndDate,
                          false
                        )}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Warranty Start Usage
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyStartUsage)
                      ? "NA"
                      : warrantyRecord.warrantyStartUsage}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Warranty End Usage
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyEndUsage)
                      ? "NA"
                      : warrantyRecord.warrantyEndUsage}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Component Code
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.componentCode)
                      ? "NA"
                      : warrantyRecord.componentCode}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Serial Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.serialNumber)
                      ? "NA"
                      : warrantyRecord.serialNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Date of Install
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.dateOfInstall)
                      ? "NA"
                      : getFormatDateTime(warrantyRecord.dateOfInstall, false)}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Warranty Certificate
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyCertificate)
                      ? "NA"
                      : warrantyRecord.warrantyCertificate}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Proof of Install
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.proofOfInstall) ? "No" : "Yes"}
                    <InsertPhotoIcon />
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Warranty Status
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyStatus?.label)
                      ? "NA"
                      : warrantyRecord.warrantyStatus?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Date of Sale
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.warrantyStatus?.label)
                      ? "NA"
                      : warrantyRecord.warrantyStatus?.label}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Replacement
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {warrantyRecord.replacement ? "Yes" : "No"}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Manufacture Date
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.manufectureDate)
                      ? "NA"
                      : getFormatDateTime(
                          warrantyRecord.manufectureDate,
                          false
                        )}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <h5 className="font-weight-bold fw-bold mb-0">Installer</h5>
      <div className="card border mb-3 mt-2 px-3 py-3">
        {edit ? (
          <>
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={installerRecord.companyName}
                    name="companyName"
                    placeholder="Company Name"
                    onChange={hadleInstallerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={installerRecord.address}
                    name="address"
                    placeholder="Installer Address"
                    onChange={hadleInstallerInputChange}
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
                    value={installerRecord.city}
                    name="city"
                    placeholder="City Name"
                    onChange={hadleInstallerInputChange}
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
                    value={installerRecord.state}
                    name="state"
                    placeholder="State Name"
                    onChange={hadleInstallerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={installerRecord.zipCode}
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={hadleInstallerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Contact Email
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={installerRecord.email}
                    name="email"
                    placeholder="Contact Email"
                    onChange={hadleInstallerInputChange}
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
                    value={installerRecord.phoneNumber}
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={hadleInstallerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Installer Type
                  </label>
                  <Select
                    className="text-primary"
                    options={installerTypeOptions}
                    onChange={(e) =>
                      hadleInstallerSelectChange(e, "installerType")
                    }
                    value={installerRecord.installerType}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Company Name
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.companyName)
                      ? "NA"
                      : installerRecord.companyName}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Address
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.installer)
                      ? "NA"
                      : installerRecord.installer}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    City
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.city)
                      ? "NA"
                      : installerRecord.city}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    State
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.state)
                      ? "NA"
                      : installerRecord.state}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Zip Code
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.zipCode)
                      ? "NA"
                      : installerRecord.zipCode}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Contact Email
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.email)
                      ? "NA"
                      : installerRecord.email}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Phone Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.phoneNumber)
                      ? "NA"
                      : installerRecord.phoneNumber}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Installer Type
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(installerRecord.installerType?.label)
                      ? "NA"
                      : installerRecord.installerType?.label}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <h5 className="font-weight-bold fw-bold mb-0">End Customer</h5>
      <div className="card border mb-3 mt-2 px-3 py-3">
        {edit ? (
          <>
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Customer Id
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={customerDetails.customerId}
                    name="customerId"
                    placeholder="Customer Id"
                    onChange={hadleCustomerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={customerDetails.customerName}
                    name="customerName"
                    placeholder="Customer Name"
                    onChange={hadleCustomerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={customerDetails.address}
                    name="address"
                    placeholder="Installer Address"
                    onChange={hadleCustomerInputChange}
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
                    value={customerDetails.city}
                    name="city"
                    placeholder="City Name"
                    onChange={hadleCustomerInputChange}
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
                    value={customerDetails.state}
                    name="state"
                    placeholder="State Name"
                    onChange={hadleCustomerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={customerDetails.zipCode}
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={hadleCustomerInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Contact Email
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={customerDetails.email}
                    name="email"
                    placeholder="Contact Email"
                    onChange={hadleCustomerInputChange}
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
                    value={customerDetails.phoneNumber}
                    name="phoneNumber"
                    placeholder="Phone Number"
                    onChange={hadleCustomerInputChange}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Customer Id
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.customerId)
                      ? "NA"
                      : customerDetails.customerId}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Customer Name
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.customerName)
                      ? "NA"
                      : customerDetails.customerName}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Address
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.address)
                      ? "NA"
                      : customerDetails.address}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    City
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.city)
                      ? "NA"
                      : customerDetails.city}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    State
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.state)
                      ? "NA"
                      : customerDetails.state}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Zip Code
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.zipCode)
                      ? "NA"
                      : customerDetails.zipCode}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Contact Email
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.email)
                      ? "NA"
                      : customerDetails.email}
                  </h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    Phone Number
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(customerDetails.phoneNumber)
                      ? "NA"
                      : customerDetails.phoneNumber}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <h5 className="font-weight-bold fw-bold mb-0">Warranty Agreement</h5>
      <div className="card border mb-2 mt-2 px-3">
        <div className="row align-items-end">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <ul className="py-2">
              {/* <li className="text-light-dark font-size-17 font-weight-500 mb-2">
              Warranty Agreement
            </li> */}
              <ol className="list-group-numbered" type="a">
                {notesList.map((notes, i) => (
                  <li
                    key={`notes-${i}`}
                    className="text-light-dark font-size-17 font-weight-500 mb-2"
                  >
                    {`${i + 1}. ${notes.title}`}
                    <ul>
                      {isEmpty(notes.subTitle) &&
                        notes.contentList.map((content, j) => (
                          <li
                            key={`notes-content-${i}-${j}`}
                            className="text-light-dark font-size-14 font-weight-500 mb-2"
                          >
                            {content}
                          </li>
                        ))}
                      {!isEmpty(notes.subTitle) && (
                        <>
                          <li className="text-light-dark font-size-14 font-weight-500 mb-2">
                            {notes.subTitle}
                          </li>
                          <ol
                            className="pl-3"
                            type="a"
                            style={{ textTransform: "lowercase" }}
                          >
                            {notes.contentList.map((content, j) => (
                              <li
                                key={`notes-content-with-subTitle-${i}-${j}`}
                                className="text-light-dark font-size-14 font-weight-500 mb-2"
                              >
                                {content}
                              </li>
                            ))}
                          </ol>
                        </>
                      )}
                    </ul>
                  </li>
                ))}
              </ol>
            </ul>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button
          className="btn btn-primary"
          id="details"
          onClick={handleTabChange}
        >
          {edit ? "Save & Next" : "Next"}
        </button>
      </div>
    </>
  );
};

export default OverviewDetailsTabConatiner;

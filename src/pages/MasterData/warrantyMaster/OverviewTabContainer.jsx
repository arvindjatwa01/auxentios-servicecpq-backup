import React, { useState } from "react";
import { TextField } from "@mui/material";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import { Switch } from "@mui/material";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Select from "react-select";

import {
  notesList,
  warrantyBasisOptions,
  warrantyCategoryOptions,
  warrantyStatusOptions,
  warrantyUnitOptions,
} from "./WarrantyConstants";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";

const OverviewTabContainer = ({
  warrantyRecord,
  edit,
  handleEdit,
  hadleWarrantyInputChange,
  handleWarrantySelectChange,
  handleTabChange,
  handleWarrantyToggleButton,
}) => {
  return (
    <>
      <div className="row mt-3 mb-5">
        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 border-50">
          <div className="card border px-5">
            <img
              src="../../assets/images/spare-parts.png"
              alt="spare-parts"
              className="card-img-top width-75 img-fluid"
            />
          </div>
          <div className="card-body">
            <h6 className="card-title">Notes</h6>
            <p class="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              labore eum quas odit, sunt ex tenetur nobis neque nulla ad, vel,
              voluptatibus veritatis repellat temporibus. Totam, amet dolore
              illo laudantium, praesentium, fuga incidunt expedita voluptatem
              maiores obcaecati possimus magnam vel quaerat labore velit. Rem
              ut, et laboriosam corporis fuga aut ex?
            </p>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 equipment-master-chart mt-custom">
          <div className="">
            <div className="bg-white p-3 border-radius-10 ">
              <div className="d-flex align-items-center justify-content-between equipment-pagination">
                <h5 className="font-weight-600 mb-0 text-uppercase">
                  {isEmpty(warrantyRecord.title) ? "NA" : warrantyRecord.title}
                </h5>
                <button className="btn btn-primary" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>
            {edit ? (
              <>
                <div className="p-3 border-radius-10 overflow-hidden">
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
                          onChange={(e) =>
                            handleWarrantySelectChange(e, "category")
                          }
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
                          onChange={(e) =>
                            handleWarrantySelectChange(e, "basis")
                          }
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
                          onChange={(e) =>
                            handleWarrantySelectChange(e, "unit")
                          }
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
                                handleWarrantySelectChange(
                                  e,
                                  "warrantyStartDate"
                                )
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
                  </div>
                  <div className="row input-fields">
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
                                onChange={(e) =>
                                  handleWarrantyToggleButton(e, "machine")
                                }
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
                  </div>
                  <div className="row align-items-end">
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
                          Warranty Certificate
                        </label>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.warrantyCertificate) ? (
                            "NA"
                          ) : (
                            <>
                              {warrantyRecord.warrantyCertificate}
                              <PictureAsPdfIcon />
                            </>
                          )}
                        </h6>
                        {/* <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            value={warrantyRecord.warrantyCertificate}
                            name="warrantyCertificate"
                            placeholder="Warranty Certificate"
                            onChange={hadleWarrantyInputChange, handleWarrantySelectChange}
                          /> */}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Proof of Install
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.proofOfInstall)
                            ? "No"
                            : "Yes"}
                          <InsertPhotoIcon />
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white p-3 border-radius-10 overflow-hidden">
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
                          Date of Install
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.dateOfInstall)
                            ? "NA"
                            : getFormatDateTime(
                                warrantyRecord.dateOfInstall,
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
                  </div>
                  <div className="row align-items-end">
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
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Model Number
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.modelNumber)
                            ? "NA"
                            : warrantyRecord.modelNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Make
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.make)
                            ? "NA"
                            : warrantyRecord.make}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Machine/Component
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {warrantyRecord.machine ? "Yes" : "No"}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-end">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Machine Serial Number
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.machineSerialNumber)
                            ? "NA"
                            : warrantyRecord.machineSerialNumber}
                        </h6>
                      </div>
                    </div>
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
                          Warranty Certificate
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.warrantyCertificate)
                            ? "NA"
                            : warrantyRecord.warrantyCertificate}
                        </h6>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                          Proof of Install
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(warrantyRecord.proofOfInstall)
                            ? "No"
                            : "Yes"}
                          <InsertPhotoIcon />
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5 style={{ fontWeight: "bold" }}>Notes</h5>
                    <div className="card border px-3">
                      <ul className="py-2">
                        <li className="text-light-dark font-size-17 font-weight-500 mb-2">
                          Warranty Agreement
                        </li>
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
              </>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary"
              id="overview"
              onClick={handleTabChange}
            >
              {edit ? "Save & Next" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewTabContainer;

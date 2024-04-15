import React, { useEffect, useState } from "react";

import penIcon from "../../../assets/images/pen.png";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { Box, Tab, TextField, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import { Switch } from "@mui/material";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
} from "pages/Repair/CONSTANTS";
import {
  claimRecords,
  defaultCustomerDetails,
  defaultInstallerDetails,
  defaultWarrantyDetails,
  filesRecords,
  installerTypeOptions,
  notesList,
  warrantyBasisOptions,
  warrantyCategoryOptions,
  warrantyStatusOptions,
  warrantyUnitOptions,
} from "./WarrantyConstants";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { warranty_Details_By_Id_Get } from "services/CONSTANTS";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";

const WarrantyOverView = ({
  show,
  hideModal,
  activeTab,
  setActiveTab,
  recordId,
  handleOverViewModal,
  handleClaimDetailsModal,
}) => {
  const [tabeEditMode, setTabeEditMode] = useState({
    overViewTab: false,
    detailsTab: false,
    claimTab: false,
    filesTab: false,
  });

  const [warrantyRecord, setWarrantyRecord] = useState({
    ...defaultWarrantyDetails,
  });
  const [installerRecord, setInstallerRecord] = useState({
    ...defaultInstallerDetails,
  });
  const [customerDetails, setCustomerDetails] = useState({
    ...defaultCustomerDetails,
  });

  useEffect(() => {
    if (recordId && recordId !== null) {
      const rUrl = `${warranty_Details_By_Id_Get}${recordId}`;
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
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
              (obj) => obj.value === responseData.unit
            );

            // get status key value pairs
            const _warrantyStatus = warrantyStatusOptions.find(
              (obj) => obj.value === responseData.warrantyStatus
            );

            // set Overview record
            setWarrantyRecord({
              ...responseData,
              category: _category || "",
              basis: _basis || "",
              unit: _unit || "",
              warrantyStatus: _warrantyStatus || "",
            });

            // set installer record data
            const _installerType = installerTypeOptions.find(
              (obj) => obj.value === installerDetails?.installerType
            );
            setInstallerRecord({
              ...installerDetails,
              installerType: _installerType || "",
            });
            setCustomerDetails({ ...customerDetails });
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    }
  }, [recordId]);

  const claimColumns = [
    {
      field: "claimNumber",
      headerName: "Claim Number",
      flex: 1,
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      flex: 1,
    },
    {
      field: "claimType",
      headerName: "Claim Type",
      flex: 1,
    },
    {
      field: "claimDate",
      headerName: "Claim Date",
      flex: 1,
    },
    {
      field: "replacement",
      headerName: "Replacement",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      //   width: 150,
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
                onClick={() => {
                  handleClaimDetailsModal();
                  setActiveTab("claim");
                }}
              >
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
    },
  ];

  const filesColumns = [
    {
      field: "fileName",
      headerName: "File Name",
      flex: 1,
    },
    {
      field: "uploadDate",
      headerName: "Uplaod Date",
      flex: 1,
    },
    {
      field: "author",
      headerName: "Upload By",
      flex: 1,
    },
    // {
    //   field: "claimDate",
    //   headerName: "Claim Date",
    //   flex: 1,
    // },
  ];

  // Warranty details input text change
  const hadleWarrantyRecordChange = (e) => {
    const { name, value } = e.target;
    setWarrantyRecord({ ...warrantyRecord, [name]: value });
  };

  // installer input text change
  const hadleInstallerRecordChange = (e) => {
    const { name, value } = e.target;
    setInstallerRecord({ ...installerRecord, [name]: value });
  };

  // customer input text change
  const hadleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  // Overview tab data view
  const viewOverviewTab = () => {
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti labore eum quas odit, sunt ex tenetur nobis neque nulla
                ad, vel, voluptatibus veritatis repellat temporibus. Totam, amet
                dolore illo laudantium, praesentium, fuga incidunt expedita
                voluptatem maiores obcaecati possimus magnam vel quaerat labore
                velit. Rem ut, et laboriosam corporis fuga aut ex?
              </p>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 equipment-master-chart mt-custom">
            <div className="">
              <div className="bg-white p-3 border-radius-10 ">
                <div className="d-flex align-items-center justify-content-between equipment-pagination">
                  <h5 className="font-weight-600 mb-0 text-uppercase">
                    {/* CARGADOR RUEDAS/PORTAH. INTEGR - 992K */}
                    {isEmpty(warrantyRecord.title)
                      ? "NA"
                      : warrantyRecord.title}
                  </h5>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      setTabeEditMode({
                        ...tabeEditMode,
                        overViewTab: !tabeEditMode.overViewTab,
                      })
                    }
                  >
                    Edit
                  </button>
                </div>
              </div>
              {tabeEditMode.overViewTab ? (
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
                            onChange={hadleWarrantyRecordChange}
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
                              setWarrantyRecord({
                                ...warrantyRecord,
                                category: e,
                              })
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
                              setWarrantyRecord({
                                ...warrantyRecord,
                                basis: e,
                              })
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
                              setWarrantyRecord({
                                ...warrantyRecord,
                                unit: e,
                              })
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
                                  setWarrantyRecord({
                                    ...warrantyRecord,
                                    warrantyStartDate: e,
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
                                  setWarrantyRecord({
                                    ...warrantyRecord,
                                    warrantyEndDate: e,
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
                            onChange={hadleWarrantyRecordChange}
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
                            onChange={hadleWarrantyRecordChange}
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
                            onChange={hadleWarrantyRecordChange}
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
                            onChange={hadleWarrantyRecordChange}
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
                                    setWarrantyRecord({
                                      ...warrantyRecord,
                                      machine: e.target.checked,
                                    })
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
                            onChange={hadleWarrantyRecordChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-end">
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
                            onChange={hadleWarrantyRecordChange}
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
                            onChange={hadleWarrantyRecordChange}
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
                            onChange={hadleWarrantyRecordChange}
                          /> */}
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
                            {isEmpty(warrantyRecord.proofOfInstall)
                              ? "No"
                              : "Yes"}
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
                            {isEmpty(warrantyRecord.proofOfInstall)
                              ? "No"
                              : "Yes"}
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
          </div>
        </div>
      </>
    );
  };

  // Details tab Data view
  const viewDetailsTab = () => {
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
          {tabeEditMode.detailsTab ? (
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
                      onChange={hadleWarrantyRecordChange}
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
                        setWarrantyRecord({
                          ...warrantyRecord,
                          category: e,
                        })
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
                        setWarrantyRecord({
                          ...warrantyRecord,
                          basis: e,
                        })
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
                        setWarrantyRecord({
                          ...warrantyRecord,
                          unit: e,
                        })
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
                            setWarrantyRecord({
                              ...warrantyRecord,
                              warrantyStartDate: e,
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
                            setWarrantyRecord({
                              ...warrantyRecord,
                              warrantyEndDate: e,
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
                      onChange={hadleWarrantyRecordChange}
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
                      onChange={hadleWarrantyRecordChange}
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
                      onChange={hadleWarrantyRecordChange}
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
                      onChange={hadleWarrantyRecordChange}
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
                              setWarrantyRecord({
                                ...warrantyRecord,
                                machine: e.target.checked,
                              })
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
                      onChange={hadleWarrantyRecordChange}
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
                      onChange={hadleWarrantyRecordChange}
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
                      onChange={hadleWarrantyRecordChange}
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
                      onChange={hadleWarrantyRecordChange}
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
                            setWarrantyRecord({
                              ...warrantyRecord,
                              dateOdSale: e,
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
                <div className="col-lg-3 col-md-3 col-sm-6 col-12">
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
                            setWarrantyRecord({
                              ...warrantyRecord,
                              manufectureDate: e,
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
          {tabeEditMode.detailsTab ? (
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
                      onChange={hadleInstallerRecordChange}
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
                      onChange={hadleInstallerRecordChange}
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
                      onChange={hadleInstallerRecordChange}
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
                      onChange={hadleInstallerRecordChange}
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
                      onChange={hadleInstallerRecordChange}
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
                      onChange={hadleInstallerRecordChange}
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
                      onChange={hadleInstallerRecordChange}
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
          {tabeEditMode.detailsTab ? (
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
                      onChange={hadleCustomerDetailsChange}
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
                      onChange={hadleCustomerDetailsChange}
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
                      onChange={hadleCustomerDetailsChange}
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
                      onChange={hadleCustomerDetailsChange}
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
                      onChange={hadleCustomerDetailsChange}
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
                      onChange={hadleCustomerDetailsChange}
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
                      onChange={hadleCustomerDetailsChange}
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
                      onChange={hadleCustomerDetailsChange}
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
      </>
    );
  };

  // Claim tab data view
  const viewClaimTab = () => {
    return (
      <>
        <div className="card px-3">
          <div className="d-flex justify-content-around ">
            <div className="card border px-2 py-2 cursor-pointer">
              <span className="py-4 px-2">Claim Requested</span>
            </div>
            <div className="card border px-2 py-2 cursor-pointer">
              <span className="py-4 px-2">Claim Accepted</span>
            </div>
            <div className="card border px-2 py-2 cursor-pointer">
              <span className="py-4 px-2">Claim Completed</span>
            </div>
            <div className="card border px-2 py-2 cursor-pointer">
              <span className="py-4 px-2">Claim Rejected</span>
            </div>
            <div className="card border px-2 py-2 cursor-pointer">
              <span className="py-4 px-2">Claim Cancelled</span>
            </div>
          </div>
          <Box
            sx={{
              width: "100%",
              height: 500,
              // marginBottom: 8,
              marginInline: 2,
            }}
          >
            <div className="row align-items-end text-end ">
              <div className="col-12 d-flex justify-content-end mb-2 float-end ">
                <button
                  className="btn btn-primary float-end "
                  onClick={() => {
                    handleOverViewModal();
                    setActiveTab("claim");
                  }}
                >
                  Create New
                </button>
              </div>
            </div>
            <DataGrid
              rows={claimRecords}
              columns={claimColumns}
              sx={GRID_STYLE}
              //   initialState={{
              //     pagination: {
              //       paginationModel: {
              //         pageSize: 5,
              //       },
              //     },
              //   }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              getRowId={(row) => row.claimId}
            />
          </Box>
        </div>
      </>
    );
  };

  // Files tab data view
  const viewFilesTab = () => {
    return (
      <>
        <div className="card px-3">
          <Box
            sx={{
              width: "100%",
              height: 500,
              // marginBottom: 8,
              marginInline: 2,
            }}
          >
            <DataGrid
              rows={filesRecords}
              columns={filesColumns}
              sx={GRID_STYLE}
              //   initialState={{
              //     pagination: {
              //       paginationModel: {
              //         pageSize: 5,
              //       },
              //     },
              //   }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal show={show} onHide={hideModal} size="xl">
        <Modal.Body>
          <Box sx={{ typography: "body1" }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  aria-label="lab API tabs example"
                  onChange={(e, tabValue) => setActiveTab(tabValue)}
                  centered
                >
                  <Tab label={`Overview`} value="overview" />
                  <Tab label={`Details`} value="details" />
                  <Tab label={`Claim`} value="claim" />
                  <Tab label={`Files`} value="files" />
                </TabList>
              </Box>
              <TabPanel value={activeTab}>
                {activeTab === "overview" && viewOverviewTab()}
                {activeTab === "details" && viewDetailsTab()}
                {activeTab === "claim" && viewClaimTab()}
                {activeTab === "files" && viewFilesTab()}
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WarrantyOverView;

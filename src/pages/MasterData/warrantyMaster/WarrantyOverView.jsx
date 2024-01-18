import {
  LocalizationProvider,
  MobileDatePicker,
  TabContext,
  TabList,
  TabPanel,
} from "@mui/lab";
import { Box, Tab, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
// import partsImage from "";
import { Modal } from "react-bootstrap";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { FONT_STYLE, GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { claimRecords, filesRecords } from "./WarrantyConstants";
import WarrantyClaimAddUpdate from "./WarrantyClaimAddUpdate";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import penIcon from "../../../assets/images/pen.png";

const WarrantyOverView = ({
  show,
  hideModal,
  handleOverViewModal,
  handleClaimDetailsModal,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const [tabeEditMode, setTabeEditMode] = useState({
    overViewTab: true,
    detailsTab: true,
    claimTab: true,
    filesTab: true,
  });

  const [warrantyRecord, setWarrantyRecord] = useState({
    warrantyId: "123546789",
    warrantyStartDate: new Date(2023, 9, 14),
    modalNumber: "CE60F34-210L-004",
    serialNumber: "B-21-123456",
    warrantyStatus: { label: "In Warranty", value: "In Warranty" },
    warrantyEndDate: new Date(2025, 9, 14),
    manufectureDate: new Date(2020, 1, 9),
    replacement: "No",
    dateOfInstall: new Date(2020, 11, 15),
    warrantyCertificate: "aspen cert-12345.pdf",
    proofOfInstall: "Yes",
  });

  const [installerRecord, setInstallerRecord] = useState({
    companyName: "AIR-TECH SERVICES",
    address: "2500 A STREET STE 4",
    email: "HELLO@AIRTECH.COM",
    city: "Pasco",
    state: "WA",
    zipCode: 99320,
    phoneNumber: "509-727-3333",
    installerType: "INSTALLER TYPE",
    equipmentInfo: "equipment info",
    distributor: "JONES SUPPLY",
  });

  const [endCustomerRecord, setEndCustomerRecord] = useState({
    endCustomerName: "ZACH HALLUM",
    address: "300 LAKEVIEW CT",
    email: "ZACH@NUKE.DIGITAL",
    city: "Pasco",
    state: "WA",
    zipCode: 99320,
    phoneNumber: "509-270-7555",
  });

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
              <div className=" cursor" onClick={handleClaimDetailsModal}>
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

  const hadleWarrantyRecordChange = (e) => {
    const { name, value } = e.target;
    setWarrantyRecord({ ...warrantyRecord, [name]: value });
  };
  const hadleInstallerRecordChange = (e) => {
    const { name, value } = e.target;
    setInstallerRecord({ ...installerRecord, [name]: value });
  };

  // Overview tab data
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
                    {/* DA24A- da series aluminum uncased upflow/downflow coil */}
                    CARGADOR RUEDAS/PORTAH. INTEGR - 992K
                  </h5>
                  {/* <button className="btn btn-primary">Edit</button> */}
                </div>
              </div>
              {!tabeEditMode.overViewTab ? (
                <>
                  <div className="bg-white p-3 border-radius-10 overflow-hidden">
                    <div className="row align-items-end">
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
                            Warranty Start Date
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
                            Modal Number
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            value={warrantyRecord.modalNumber}
                            name="modalNumber"
                            placeholder="Company Name"
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
                    </div>
                    <div className="row align-items-end">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Warranty Status
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            In Warranty
                          </p>
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
                                // sx={{
                                //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                                //   }}
                                // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                                // minDate={estimationData.preparedOn}
                                maxDate={new Date()}
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
                            MAnufecture Date
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
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Replacement
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            No
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-end">
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
                                // sx={{
                                //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                                //   }}
                                // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                                // minDate={estimationData.preparedOn}
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
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            warranty Certificate
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            Aspen Cert-12345.pdf
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-end">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Proof of Install
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            Yes <InsertPhotoIcon />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 border-radius-10 overflow-hidden">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <h6 style={{ fontWeight: "bold" }}>Installer</h6>
                        <div className="card border px-3">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Installer Company Name
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
                          </div>
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Installer Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={installerRecord.address}
                                  name="address"
                                  placeholder="Address"
                                  onChange={hadleInstallerRecordChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Contact Email
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={installerRecord.email}
                                  name="email"
                                  placeholder="Email"
                                  onChange={hadleInstallerRecordChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
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
                                  placeholder="Email"
                                  onChange={hadleInstallerRecordChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
                              <div className="row align-items-end">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                                  <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                      State
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control border-radius-10 text-primary"
                                      value={installerRecord.state}
                                      name="state"
                                      placeholder="Email"
                                      onChange={hadleInstallerRecordChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                                  <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                      Zip Code
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control border-radius-10 text-primary"
                                      value={installerRecord.zipCode}
                                      name="zipCode"
                                      placeholder="Email"
                                      onChange={hadleInstallerRecordChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
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
                          </div>
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
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Warranty Id
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            123546789
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Warranty Start Date
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            10/14/2023
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Model Number
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            ce60f34-210l-004
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Serial Number
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            b-21-123456
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-end">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Warranty Status
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            In Warranty
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Warranty Start Date
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            10/14/2025
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Manufecture Date
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            09/02/2020
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Replacement
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            No
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-end">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Date of Install
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            10/15/2020
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            warranty Certificate
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            Aspen Cert-12345.pdf
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row align-items-end">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Proof of Install
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                            Yes <InsertPhotoIcon />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 border-radius-10 overflow-hidden">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <h6 style={{ fontWeight: "bold" }}>Installer</h6>
                        <div className="card border px-3">
                          <div className="row align-items-end">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Installer Company Name
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Air-Tech Services
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-end">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Installer Address
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  2500 A Street Ste 4
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Contact Email
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  hello@airtech.com
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-end">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  City
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Pasco
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
                              <div className="row align-items-end">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                                  <div className="d-block">
                                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                      State
                                    </p>
                                    <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                      WA
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                                  <div className="d-block">
                                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                      Zip Code
                                    </p>
                                    <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                      99320
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Phone Number
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  509-727-3333
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-end">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Installer Type
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Installer Type
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Equipment Info
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Equipment Info
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Distributor/Wholesalers
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Jones Supply
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <h6 style={{ fontWeight: "bold" }}>End Customer</h6>
                        <div className="card border px-3">
                          <div className="row align-items-end">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  End Customer Name
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Zach Hallum
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-end">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  End Customer Address
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  300 Lakeview Ct
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  End Customer Email
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Zach@nuke.digital
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-end">
                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  City
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  Richland
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-6 col-12">
                              <div className="row align-items-end">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                                  <div className="d-block">
                                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                      State
                                    </p>
                                    <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                      WA
                                    </p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                                  <div className="d-block">
                                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                      Zip Code
                                    </p>
                                    <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                      99320
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Phone Number
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  509-270-7555
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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

  // Details Tab Data
  const viewDetailsTab = () => {
    return (
      <>
        <h6 style={{ fontWeight: "bold" }}>Item Details</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Model Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  ce60f34-210l-004
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Serail Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  B-21-123456
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Manufacture Date
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  09/02/2020
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Replacement
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  No
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty ID
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  123546789
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty Status
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Under Warranty
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty End Date
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  10/14/2020
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty End Date
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  10/14/2025
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Date of Install
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  10/20/2020
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Proof of Install
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Yes <InsertPhotoIcon />
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty Certificate
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Aspen Cert-12345.pdf
                </p>
              </div>
            </div>
          </div>
        </div>

        <h6 style={{ fontWeight: "bold" }}>Installer</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Installer Company Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Air-Tech Services
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Installer Address
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  2500 A Street Ste 4
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  City
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Pasco
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  State
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  WA
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Zip Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  99320
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Contact Email
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  hello@airtech.com
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Phone Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  509-727-3333
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Installer Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Installer Type
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Equipment Info
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Equipment Info
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Distributor/WholeSaler
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Jones Supply
                </p>
              </div>
            </div>
          </div>
        </div>

        <h6 style={{ fontWeight: "bold" }}>End Customer</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  End Customer Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Zach Hallum
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  End Customer Address
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  300 Lakeview Ct.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  City
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Richland
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  State
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  WA
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Zip Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  99320
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Contact Email
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  zach@nuke.digital
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Phone Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  509-270-7555
                </p>
              </div>
            </div>
          </div>
        </div>

        <h6 style={{ fontWeight: "bold" }}>Notes</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty Notes
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Claim Tab  data
  const viewClaimTab = () => {
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
            <div className="row align-items-end text-end ">
              <div className="col-12 d-flex justify-content-end mb-2 float-end ">
                <button
                  className="btn btn-primary float-end "
                  onClick={() => {
                    handleOverViewModal();
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
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </>
    );
  };

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

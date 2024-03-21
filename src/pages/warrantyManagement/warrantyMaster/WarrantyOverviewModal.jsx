import React, { useEffect, useState } from "react";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Tooltip } from "@mui/material";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import Moment from "react-moment";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import { isEmpty } from "pages/Common/textUtilities";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import {
  warrantyBasisOptions,
  warrantyCategoryOptions,
  warrantyNotesList,
  installerTypeOptions,
  warrantyStatusOptions,
  warrantyUnitOptions,
  warrantyRequestObj,
  customerRequestObj,
  installerRequestObj,
  filesRecords,
  warrantyTypeOptions,
  yearlyWarrantyObj,
} from "../warrantyManagementConstants";
import { FONT_STYLE, FONT_STYLE_SELECT, GRID_STYLE } from "pages/Common/constants";
import {
  CLAIM_MASTER_URL,
  Get_Customer_Master_Details_By_Id_GET,
  Get_Equipment_Datails_By_Id_GET,
  WARRANTY_EQUIPMENT_MASTER_URL,
  WARRANTY_INSTALLER_MASTER_URL,
  WARRANTY_MASTER_URL,
  Warranty_Yearly_GetById_GET,
} from "services/CONSTANTS";
import { callGetApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import ClaimCreateModal from "../claimMaster/ClaimCreateModal";
import ClaimEditModal from "../claimMaster/ClaimEditModal";
import ClaimRequestModal from "../claimMaster/ClaimRequestModal";
import UploadFilesModal from "../UploadFilesModal";

const WarrantyOverviewModal = ({
  show,
  hideModal,
  warrantyRecordId,
  handleSnack,
  openClaimCreateModal,
  handleClaimCreate,
  openClaimEditModal,
  handleOpenClaimEditModal,
  handleOpenClaimRequestModal,
  handleCloseClaimRequestModal,
  openClaimRequestModal,
  openPartCreateModal,
  handleShowPartCreateModal,
  openFileUploadModal,
  handleShowFileUploadModal,
}) => {
  const [tabValue, setTabValue] = useState("overview");
  const [warrantyRecord, setWarrantyRecord] = useState({
    ...warrantyRequestObj,
  });
  const [customerRecord, setCustomerRecord] = useState({
    ...customerRequestObj,
  });

  const [installerRecord, setInstallerRecord] = useState({
    ...installerRequestObj,
  });
  const [yearlyWarrantyRecord, setYearlyWarrantyRecord] = useState({
    ...yearlyWarrantyObj,
  });

  const [equipmentData, setEquipmentData] = useState({
    modelNumber: "",
    make: "",
    serialNumber: "",
    componentCode: "",
  });

  const [viewOnlyTab, setViewOnlyTab] = useState({
    overViewOnly: true,
    detailsViewOnly: true,
  });

  const [claimPage, setClaimPage] = useState(1);
  const [claimPageSize, setClaimPageSize] = useState(10);
  const [claimRecord, setClaimRecord] = useState([]);
  const [claimRecordId, setClaimRecordId] = useState(null);

  const [openClaimReturnRequest, setOpenClaimReturnRequest] = useState(false);

  const [claimOrderId, setClaimOrderId] = useState(null);
  const [claimData, setClaimData] = useState(null);
  const [evaluationId, setEvaluationId] = useState(null);
  const [assesstmentId, setAssesstmentId] = useState(null);
  const [claimRecordDetail, setClaimRecordDetail] = useState(null);

  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [newPartRecord, setNewPartRecord] = useState(null);
  const [isFailurePart, setIsFailurePart] = useState(false);

  const [partSelectionData, setPartSelectionData] = useState([]);
  const [openClaimRequestProcess, setOpenClaimRequestProcess] = useState(false);
  const [openReturnRequsterModal, setOpenReturnRequsterModal] = useState(false);

  useEffect(() => {
    if (warrantyRecordId) {
      const rUrl = `${WARRANTY_MASTER_URL}/${warrantyRecordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const { installerDetails, customerDetails, ...restData } =
            response.data;
          const responseData = response.data;

          // get category key value pairs
          const _category = warrantyCategoryOptions.find(
            (obj) => obj.value === responseData.category
          );

          // get unit key value pairs
          const _unit = warrantyUnitOptions.find(
            (obj) => obj.value === responseData.unit
          );

          // get status key value pairs
          const _warrantyStatus = warrantyStatusOptions.find(
            (obj) => obj.value === responseData.warrantyStatus
          );

          // set warranty details
          setWarrantyRecord({
            ...responseData,
            category: _category || "",
            // basis: _basis || "",
            unit: _unit || "",
            warrantyStatus: _warrantyStatus || "",
          });

          // get equipment details
          if (responseData.equipmentId) {
            getEquipmentDetails(responseData.equipmentId);
          }

          // get customer details
          if (responseData.customerId) {
            getCustomerDetails(responseData.customerId);
          }

          if (responseData.installerId) {
            getInstallerDetails(responseData.installerId);
          }

          if (responseData.yearlyWarrantyIds.length !== 0) {
            getYearlyWarrantyDetails(responseData["yearlyWarrantyIds"][0]);
          }

          setCustomerRecord({ ...customerDetails });
        } else {
          handleSnack("error", "Something went wrong");
        }
      });
    }
  }, [warrantyRecordId]);

  useEffect(() => {
    const rUrl = `${CLAIM_MASTER_URL}/search-by-fields?pageNumber=${0}&pageSize=${25}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setClaimRecord(responseData);
      }
    });
  }, []);

  // get equipment details
  const getEquipmentDetails = (id) => {
    const rUrl = `${WARRANTY_EQUIPMENT_MASTER_URL}/${id}`;
    // const rUrl = `${Get_Equipment_Datails_By_Id_GET}${id}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        setEquipmentData({
          modelNumber: responseData.modelNumber,
          make: responseData.make,
          serialNumber: responseData.serialNumber,
          componentCode: responseData.componentNumber,
        });
      }
    });
  };

  // get warranty installer details
  const getInstallerDetails = (installerId) => {
    const rUrl = `${WARRANTY_INSTALLER_MASTER_URL}/${installerId}`;
    callGetApi(null, rUrl, (response) => {
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

  // get yearly warranty details
  const getYearlyWarrantyDetails = (yearId) => {
    const rUrl = `${Warranty_Yearly_GetById_GET}/${yearId}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;

        // get basis key value pairs
        const _basis = warrantyBasisOptions.find(
          (obj) => obj.value === responseData.basis
        );

        const _warrantyType = warrantyTypeOptions.find(
          (obj) => obj.value === responseData.warrantyType
        );
        setYearlyWarrantyRecord({
          ...responseData,
          warrantyType: _warrantyType,
          basis: _basis,
        });
      }
    });
  };

  // get customer details
  const getCustomerDetails = (id) => {
    const rUrl = `${Get_Customer_Master_Details_By_Id_GET}${id}`;
    callGetApi(null, rUrl, (response) => {
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
        console.log("Customer Details", responseData);
      }
    });
  };

  // warranty overview input fields value change
  const handleWarrantyRecordChange = (e) => {
    const { name, value } = e.target;
    setWarrantyRecord({ ...warrantyRecord, [name]: value });
  };

  // warranty overview input fields value change
  const handleYearluWarrantyRecordChange = (e) => {
    const { name, value } = e.target;
    setYearlyWarrantyRecord({ ...yearlyWarrantyRecord, [name]: value });
  };

  // customer input fields value change
  const handleCustomerFieldsChange = (e) => {
    const { name, value } = e.target;
    setCustomerRecord({ ...customerRecord, [name]: value });
  };

  // installer input fields value change
  const handleInstallerFieldsChange = (e) => {
    const { name, value } = e.target;
    setInstallerRecord({ ...installerRecord, [name]: value });
  };

  const handleEquipmentDataChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({ ...equipmentData, [name]: value });
  };

  // claim table page no and size change
  const handleClaimPaginationChange = (pageNo, rowsPerPage) => {
    setClaimPage(pageNo);
    setClaimPageSize(rowsPerPage);
  };

  // edit Claim Details
  const handleEditClaimDetails = (params) => {
    const claimId = params.row["claimId"];
    setClaimRecordDetail(params.row);
    setClaimRecordId(claimId);
    setClaimData(params.row);
    handleOpenClaimEditModal();
    // setOpenClaimEditModal(true);
  };

  // show return process
  const handleShowReturnProcess = () => {
    // setOpenClaimEditModal(false);
    // setOpenClaimReturnRequest(true);
  };

  // update warranty data (Common function)
  const handleUpdateWarrantyData = () => {
    const rUrl = `${WARRANTY_MASTER_URL}/${warrantyRecordId}`;
    const rObj = {
      ...warrantyRecord,
      // category: warrantyRecord.category?.value || "EMPTY",
      category: yearlyWarrantyRecord.warrantyType?.value || "EMPTY",
      basis: warrantyRecord.basis?.value || "EMPTY",
      unit: warrantyRecord.unit?.value || "EMPTY",
      modelNumber: equipmentData.modelNumber,
      make: equipmentData.make,
      serialNumber: equipmentData.serialNumber,
      warrantyStatus: warrantyRecord.warrantyStatus?.value || "EMPTY",
      installerDetails: {
        ...installerRecord,
        installerType: installerRecord.installerType?.value || "EMPTY",
      },
      customerDetails: { ...customerRecord },
    };
    callPutApi(rUrl, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        handleSnack(
          "success",
          "Warranty Overview Details updated successfully."
        );
        if (tabValue === "overview") {
          setViewOnlyTab({ ...viewOnlyTab, overViewOnly: true });
          setTabValue("details");
        } else if (tabValue === "details") {
          setViewOnlyTab({ ...viewOnlyTab, detailsViewOnly: true });
          setTabValue("claim");
        }
      } else {
        handleSnack("error", "Something went wrong.");
      }
    });
  };

  // save warranty overview details
  const handleSaveWarrantyOverviewDetails = () => {
    if (tabValue === "overview") {
      if (viewOnlyTab.overViewOnly) {
        setTabValue("details");
      } else {
        handleUpdateWarrantyData();
      }
    } else if (tabValue === "details") {
      if (viewOnlyTab.overViewOnly) {
        setTabValue("claim");
      } else {
        handleUpdateWarrantyData();
      }
    } else if (tabValue === "claim") {
      setTabValue("files");
    }
  };

  // overview tab content
  const viewOverviewTabData = () => {
    return (
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
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setViewOnlyTab({
                      ...viewOnlyTab,
                      overViewOnly: !viewOnlyTab.overViewOnly,
                    })
                  }
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="card border px-3 py-3">
              {viewOnlyTab.overViewOnly ? (
                <>
                  <div className="bg-white p-3 border-radius-10 overflow-hidden">
                    <div className="row align-items-end">
                      <ReadOnlyField
                        label="WARRANTY ID"
                        value={warrantyRecord.warrantyId}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="CATEGORY"
                        value={yearlyWarrantyRecord.warrantyType?.label}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="BASIS"
                        value={yearlyWarrantyRecord.basis?.label}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="UNIT"
                        value={warrantyRecord.unit?.label}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="WARRANTY START DATE"
                        value={
                          <Moment format="DD/MM/YYYY">
                            {yearlyWarrantyRecord.warrantyStartDate}
                          </Moment>
                        }
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="WARRANTY END DATE"
                        value={
                          <Moment format="DD/MM/YYYY">
                            {yearlyWarrantyRecord.warrantyEndDate}
                          </Moment>
                        }
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="DATE OF INSTALL"
                        value={
                          <Moment format="DD/MM/YYYY">
                            {warrantyRecord.dateOfInstall}
                          </Moment>
                        }
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="WARRANTY START USAGE"
                        value={yearlyWarrantyRecord.warrantyStartUsage}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="WARRANTY END USAGE"
                        value={yearlyWarrantyRecord.warrantyEndUsage}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="MODEL NUMBER"
                        // value={warrantyRecord.modelNumber}
                        value={equipmentData.modelNumber}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="MAKE"
                        // value={warrantyRecord.make}
                        value={equipmentData.make}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="MACHINE/COMPONENT"
                        value={warrantyRecord.machine ? "MACHINE" : "COMPONENT"}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="MACHINE SERIAL NUMBER"
                        value={warrantyRecord.machineSerialNumber}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="COMPONENT CODE"
                        value={warrantyRecord.componentCode}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="SERIAL NUMBER"
                        // value={warrantyRecord.serialNumber}
                        value={equipmentData.serialNumber}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="WARRANTY STATUS"
                        value={warrantyRecord.warrantyStatus?.label}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="WARRANTY CERTIFICATE"
                        value={warrantyRecord.warrantyCertificate}
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
                      <ReadOnlyField
                        label="PROOF OF INSTALL"
                        value={
                          <>
                            <img
                              className="mx-1 cursor"
                              src="../../assets/images/fileUploadIcon.png"
                              alt="File Upload icon"
                              onClick={() => setTabValue("files")}
                            />
                            {/* <InsertPhotoIcon /> */}
                            {isEmpty(warrantyRecord.proofOfInstall)
                              ? "No"
                              : "Yes"}
                          </>
                        }
                        className="col-lg-3 col-md-3 col-sm-6 col-12"
                      />
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
                            {warrantyNotesList.map((notes, i) => (
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
                                        className="text-light-dark font-size-12 font-weight-500 mb-2"
                                      >
                                        {content}
                                      </li>
                                    ))}
                                  {!isEmpty(notes.subTitle) && (
                                    <>
                                      <li className="text-light-dark font-size-12 font-weight-500 mb-2">
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
                                            className="text-light-dark font-size-12 font-weight-500 mb-2"
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
              ) : (
                <>
                  <div className="p-3 border-radius-10 overflow-hidden">
                    <div className="row input-fields">
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            WARRANTY ID
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            value={warrantyRecord.warrantyId}
                            name="warrantyId"
                            placeholder="Company Name"
                            onChange={handleWarrantyRecordChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            CATEGORY
                          </label>
                          <Select
                            className="text-primary"
                            options={warrantyCategoryOptions}
                            onChange={(e) =>
                              setYearlyWarrantyRecord({
                                ...yearlyWarrantyRecord,
                                warrantyType: e,
                              })
                            }
                            value={yearlyWarrantyRecord.warrantyType}
                            // onChange={(e) =>
                            //   setWarrantyRecord({
                            //     ...warrantyRecord,
                            //     category: e,
                            //   })
                            // }
                            // value={warrantyRecord.category}
                            styles={FONT_STYLE_SELECT}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            BASIS
                          </label>
                          <Select
                            className="text-primary"
                            options={warrantyBasisOptions}
                            onChange={(e) =>
                              setYearlyWarrantyRecord({
                                ...yearlyWarrantyRecord,
                                basis: e,
                              })
                            }
                            value={yearlyWarrantyRecord.basis}
                            styles={FONT_STYLE_SELECT}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            UNIT
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
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            WARRANTY START DATE
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <MobileDatePicker
                                inputFormat="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                closeOnSelect
                                value={yearlyWarrantyRecord.warrantyStartDate}
                                onChange={(e) =>
                                  setYearlyWarrantyRecord({
                                    ...yearlyWarrantyRecord,
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
                          <label className="text-light-dark font-size-12 font-weight-500">
                            WARRANTY END DATE
                          </label>
                          <div className="align-items-center date-box">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <MobileDatePicker
                                inputFormat="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                closeOnSelect
                                value={yearlyWarrantyRecord.warrantyEndDate}
                                onChange={(e) =>
                                  setYearlyWarrantyRecord({
                                    ...yearlyWarrantyRecord,
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
                          <label className="text-light-dark font-size-12 font-weight-500">
                            DATE OF INSTALL
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
                          <label className="text-light-dark font-size-12 font-weight-500">
                            WARRANTY START USAGE
                          </label>
                          <input
                            type="number"
                            className="form-control border-radius-10 text-primary"
                            value={yearlyWarrantyRecord.warrantyStartUsage}
                            name="warrantyStartUsage"
                            placeholder="Start Usage"
                            onChange={handleYearluWarrantyRecordChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            WARRANTY END USAGE
                          </label>
                          <input
                            type="number"
                            className="form-control border-radius-10 text-primary"
                            value={yearlyWarrantyRecord.warrantyEndUsage}
                            name="warrantyEndUsage"
                            placeholder="End Usage"
                            onChange={handleYearluWarrantyRecordChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            MODEL NUMBER
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            // value={warrantyRecord.modalNumber}
                            value={equipmentData.modalNumber}
                            name="modalNumber"
                            placeholder="Model Number"
                            // onChange={handleWarrantyRecordChange}
                            onChange={handleEquipmentDataChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            MAKE
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            // value={warrantyRecord.make}
                            value={equipmentData.make}
                            name="make"
                            placeholder="Make"
                            // onChange={handleWarrantyRecordChange}
                            onChange={handleEquipmentDataChange}
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
                                  MACHINE/COMPONENT
                                </span>
                              }
                            />
                          </FormGroup>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            MACHINE SERIAL NUMBER
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            value={warrantyRecord.machineSerialNumber}
                            name="machineSerialNumber"
                            placeholder="Machine Serial Number"
                            onChange={handleWarrantyRecordChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            COMPONENT CODE
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            value={warrantyRecord.componentCode}
                            name="componentCode"
                            placeholder="Component Code"
                            onChange={handleWarrantyRecordChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            SERIAL NUMBER
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            // value={warrantyRecord.serialNumber}
                            value={equipmentData.serialNumber}
                            name="serialNumber"
                            placeholder="Serial Number"
                            // onChange={handleWarrantyRecordChange}
                            onChange={handleEquipmentDataChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
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
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            WARRANTY CERTIFICATE
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
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                            PROOF OF INSTALL
                          </p>
                          <div
                            className="file-upload-input bg-white border-radius-10 d-flex align-items-center justify-content-between cursor"
                            onClick={handleShowFileUploadModal}
                          >
                            <h6 className="text-primary m-0 font-size-16 font-weight-500">
                              {isEmpty(warrantyRecord.proofOfInstall)
                                ? "Upload File"
                                : warrantyRecord.proofOfInstall}
                            </h6>
                            <img
                              className="mx-1 cursor"
                              src="../../assets/images/fileUploadIcon.png"
                              alt="File Upload icon"
                              // onClick={handleShowFileUploadModal}
                            />
                          </div>
                          {/* <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            <img
                              className="mx-1 cursor"
                              src="../../assets/images/fileUploadIcon.png"
                              alt="File Upload icon"
                              onClick={() => setTabValue("files")}
                            />
                            {isEmpty(warrantyRecord.proofOfInstall)
                              ? "No"
                              : "Yes"}
                            <InsertPhotoIcon />
                          </h6> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="row" style={{ justifyContent: "right" }}>
              <button
                type="button"
                className="btn btn-light bg-primary text-white mr-1"
                onClick={handleSaveWarrantyOverviewDetails}
              >
                {viewOnlyTab.overViewOnly ? "Next" : "Save & Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // details tab content
  const viewDetailsTabData = () => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="font-weight-bold fw-bold mb-0">Item Details</h5>
          <button
            className="btn btn-primary float-end "
            onClick={() =>
              setViewOnlyTab({
                ...viewOnlyTab,
                detailsViewOnly: !viewOnlyTab.detailsViewOnly,
              })
            }
          >
            Edit
          </button>
        </div>
        <div className="card border mb-3 mt-2 px-3 py-3">
          {viewOnlyTab.detailsViewOnly ? (
            <div className="row align-items-end">
              <ReadOnlyField
                label="WARRANTY ID"
                value={warrantyRecord.warrantyId}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="CATEGORY"
                value={yearlyWarrantyRecord.warrantyType?.label}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="BASIS"
                value={yearlyWarrantyRecord.basis?.label}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="UNIT"
                value={warrantyRecord.unit?.label}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="WARRANTY START DATE"
                value={
                  <Moment format="DD/MM/YYYY">
                    {yearlyWarrantyRecord.warrantyStartDate}
                  </Moment>
                }
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="WARRANTY END DATE"
                value={
                  <Moment format="DD/MM/YYYY">
                    {yearlyWarrantyRecord.warrantyEndDate}
                  </Moment>
                }
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="WARRANTY START USAGE"
                value={yearlyWarrantyRecord.warrantyStartUsage}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="WARRABTY END USAGE"
                value={yearlyWarrantyRecord.warrantyEndUsage}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="COMPONENT CODE"
                value={warrantyRecord.componentCode}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="SERIAL NUMBER"
                // value={warrantyRecord.serialNumber}
                value={equipmentData.serialNumber}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="DATE OF INSTALL"
                value={
                  <Moment format="DD/MM/YYYY">
                    {warrantyRecord.dateOfInstall}
                  </Moment>
                }
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="WARRANTY CERTIFICATE"
                value={warrantyRecord.warrantyCertificate}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="PROOF OF INSTALL"
                value={
                  <>
                    <img
                      className="mx-1 cursor"
                      src="../../assets/images/fileUploadIcon.png"
                      alt="File Upload icon"
                      onClick={() => setTabValue("files")}
                    />
                    {isEmpty(warrantyRecord.proofOfInstall) ? "No" : "Yes"}
                    {/* <InsertPhotoIcon /> */}
                  </>
                }
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="WARRANTY STATUS"
                value={warrantyRecord.warrantyStatus?.label}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="DATE OF SALE"
                value={
                  <Moment format="DD/MM/YYYY">
                    {warrantyRecord.dateOfSale}
                  </Moment>
                }
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="REPLACEMENT"
                value={warrantyRecord.replacement ? "YES" : "NO"}
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
              <ReadOnlyField
                label="MANUFACTURE DATE"
                value={
                  <Moment format="DD/MM/YYYY">
                    {warrantyRecord.manufactureDate}
                  </Moment>
                }
                className="col-lg-3 col-md-3 col-sm-6 col-12"
              />
            </div>
          ) : (
            <div className="row input-fields">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    WARRANTY ID
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.warrantyId}
                    name="warrantyId"
                    placeholder="Company Name"
                    onChange={handleWarrantyRecordChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CATEGORY
                  </label>
                  <Select
                    className="text-primary"
                    options={warrantyCategoryOptions}
                    onChange={(e) =>
                      setYearlyWarrantyRecord({
                        ...yearlyWarrantyRecord,
                        warrantyType: e,
                      })
                    }
                    value={yearlyWarrantyRecord.warrantyType}
                    // onChange={(e) =>
                    //   setWarrantyRecord({
                    //     ...warrantyRecord,
                    //     category: e,
                    //   })
                    // }
                    // value={warrantyRecord.category}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    BASIS
                  </label>
                  <Select
                    className="text-primary"
                    options={warrantyBasisOptions}
                    onChange={(e) =>
                      setYearlyWarrantyRecord({
                        ...yearlyWarrantyRecord,
                        basis: e,
                      })
                    }
                    value={yearlyWarrantyRecord.basis}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    UNIT
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
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    WARRANTY START DATE
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        closeOnSelect
                        value={yearlyWarrantyRecord.warrantyStartDate}
                        onChange={(e) =>
                          setYearlyWarrantyRecord({
                            ...yearlyWarrantyRecord,
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
                  <label className="text-light-dark font-size-12 font-weight-500">
                    WARRANTY END DATE
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        closeOnSelect
                        value={yearlyWarrantyRecord.warrantyEndDate}
                        onChange={(e) =>
                          setYearlyWarrantyRecord({
                            ...yearlyWarrantyRecord,
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
                  <label className="text-light-dark font-size-12 font-weight-500">
                    WARRANTY START USAGE
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    value={yearlyWarrantyRecord.warrantyStartUsage}
                    name="warrantyStartUsage"
                    placeholder="Start Usage"
                    onChange={handleYearluWarrantyRecordChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    WARRANTY END USAGE
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    value={yearlyWarrantyRecord.warrantyEndUsage}
                    name="warrantyEndUsage"
                    placeholder="End Usage"
                    onChange={handleYearluWarrantyRecordChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    COMPONENT CODE
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    value={warrantyRecord.componentCode}
                    name="componentCode"
                    placeholder="Component Code"
                    onChange={handleWarrantyRecordChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SERIAL NUMBER
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    // value={warrantyRecord.serialNumber}
                    value={equipmentData.serialNumber}
                    name="serialNumber"
                    placeholder="Serial Number"
                    // onChange={handleWarrantyRecordChange}
                    onChange={handleEquipmentDataChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    DATE OF INSTALL
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
                  <label className="text-light-dark font-size-12 font-weight-500">
                    WARRANTY CERTIFICATE
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
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                    PROOF OF INSTALL
                  </p>
                  <div
                    className="file-upload-input bg-white border-radius-10 d-flex align-items-center justify-content-between cursor"
                    onClick={handleShowFileUploadModal}
                  >
                    <h6 className="text-primary m-0 font-size-16 font-weight-500">
                      {isEmpty(warrantyRecord.proofOfInstall)
                        ? "Upload File"
                        : warrantyRecord.proofOfInstall}
                    </h6>
                    <img
                      className="mx-1 cursor"
                      src="../../assets/images/fileUploadIcon.png"
                      alt="File Upload icon"
                      // onClick={handleShowFileUploadModal}
                    />
                  </div>
                  {/* <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(warrantyRecord.proofOfInstall) ? "No" : "Yes"}
                    <InsertPhotoIcon />
                  </h6> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
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
                          REPLACEMENT
                        </span>
                      }
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    MANUFACTURE DATE
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        maxDate={new Date()}
                        closeOnSelect
                        value={warrantyRecord.manufactureDate}
                        onChange={(e) =>
                          setWarrantyRecord({
                            ...warrantyRecord,
                            manufactureDate: e,
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
          )}
        </div>
        <h5 className="mb-1">Installer</h5>
        <div className="card border mb-3 px-3 py-3">
          {viewOnlyTab.detailsViewOnly ? (
            <>
              <div className="row align-items-end">
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
                  label="DISTRIBUTOR/WHOLESALER"
                  value={installerRecord.distributor}
                  className="col-md-3 col-sm-3"
                />
              </div>
            </>
          ) : (
            <>
              <div className="row input-fields">
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CONTACT EMAIl
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      INSTALL TYPE
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DISTRIBUTOR/WHOLESALER
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
          )}
        </div>
        <h5 className="mb-1">End Customer</h5>
        <div className="card border mb-3 px-3 py-3">
          {viewOnlyTab.detailsViewOnly ? (
            <>
              <div className="row align-items-end">
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
          ) : (
            <>
              <div className="row mt-2 input-fields">
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CONTACT ENAIL
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
                <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
          )}
        </div>
        <h5 className="font-weight-bold fw-bold mb-0">Warranty Agreement</h5>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <ul className="py-2">
                <ol className="list-group-numbered" type="a">
                  {warrantyNotesList.map((notes, i) => (
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
                              className="text-light-dark font-size-12 font-weight-500 mb-2"
                            >
                              {content}
                            </li>
                          ))}
                        {!isEmpty(notes.subTitle) && (
                          <>
                            <li className="text-light-dark font-size-12 font-weight-500 mb-2">
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
                                  className="text-light-dark font-size-12 font-weight-500 mb-2"
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
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            type="button"
            className="btn btn-light bg-primary text-white mr-1"
            onClick={handleSaveWarrantyOverviewDetails}
          >
            {viewOnlyTab.detailsViewOnly ? "Next" : "Save & Next"}
          </button>
        </div>
      </>
    );
  };

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
      field: "createdOn",
      headerName: "Claim Date",
      flex: 1,
    },
    {
      field: "replacement",
      headerName: "Replacement",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontWeight: "bold" }}>{params.value ? "Yes" : "No"}</div>
      ),
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className="cursor">
                <Tooltip title="Edit">
                  <EditOutlinedIcon
                    onClick={() => handleEditClaimDetails(params)}
                  />
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

  // claim tab data
  const viewClaimTabData = () => {
    return (
      <>
        <div className="card border px-3 pt-4">
          <div className="d-flex justify-content-around ">
            <div
              className="card border px-4 py-2 cursor"
              //   onClick={() => handleGetFilterClaimRecords("registered")}
              //   style={{
              //     backgroundColor:
              //       activeClaimFilter === "registered" ? "#f3eafe" : "",
              //   }}
            >
              <div className="py-4 px-2">
                <span className="">Claim Requested</span>
                <h3 className="mt-0 text-center">13</h3>
              </div>
            </div>
            <div
              className="card border px-4 py-2 cursor"
              //   onClick={() => handleGetFilterClaimRecords("acknowledged")}
              //   style={{
              //     backgroundColor:
              //       activeClaimFilter === "acknowledged" ? "#f3eafe" : "",
              //   }}
            >
              <div className="py-4 px-2">
                <span className="">Claim Accepted</span>
                <h3 className="mt-0 text-center">7</h3>
              </div>
            </div>
            <div
              className="card border px-4 py-2 cursor"
              //   onClick={() => handleGetFilterClaimRecords("accepted")}
              //   style={{
              //     backgroundColor:
              //       activeClaimFilter === "accepted" ? "#f3eafe" : "",
              //   }}
            >
              <div className="py-4 px-2">
                <span className="">Claim Completed</span>
                <h3 className="mt-0 text-center">3</h3>
              </div>
            </div>
            <div
              className="card border px-4 py-2 cursor"
              //   onClick={() => handleGetFilterClaimRecords("rejected")}
              //   style={{
              //     backgroundColor:
              //       activeClaimFilter === "rejected" ? "#f3eafe" : "",
              //   }}
            >
              <div className="py-4 px-2">
                <span className="">Claim Rejected</span>
                <h3 className="mt-0 text-center">3</h3>
              </div>
            </div>
            <div
              className="card border px-4 py-2 cursor"
              //   onClick={() => handleGetFilterClaimRecords("closed")}
              //   style={{
              //     backgroundColor:
              //       activeClaimFilter === "closed" ? "#f3eafe" : "",
              //   }}
            >
              <div className="py-4 px-2">
                <span className="">Claim Cancelled</span>
                <h3 className="mt-0 text-center">7</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="card border px-4 py-2 mb-2">
          <Box
            sx={{
              width: "100%",
              height: 500,
              marginBottom: 5,
              marginInline: 2,
            }}
          >
            <div className="row" style={{ justifyContent: "right" }}>
              <button
                className="btn btn-primary mx-3 mb-2"
                onClick={handleClaimCreate}
              >
                + Create New
              </button>
            </div>
            <DataGrid
              rows={claimRecord}
              columns={claimColumns}
              page={claimPage}
              pageSize={claimPageSize}
              sx={GRID_STYLE}
              onPageChange={(newPage) =>
                handleClaimPaginationChange(newPage, claimPageSize)
              }
              onPageSizeChange={(newPageSize) =>
                handleClaimPaginationChange(claimPage, newPageSize)
              }
              rowsPerPageOptions={[10, 20, 50]}
              // paginationMode="server"
              disableRowSelectionOnClick
              getRowId={(row) => row.claimId}
            />
          </Box>
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            type="button"
            className="btn btn-light bg-primary text-white mx-3"
            onClick={handleSaveWarrantyOverviewDetails}
          >
            Next
          </button>
        </div>
      </>
    );
  };

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
              <div className="cursor" onClick={handleShowFileUploadModal}>
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
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

  const viewFilesTabData = () => {
    return (
      <>
        <div className="card px-3 mb-3">
          <Box
            sx={{
              width: "100%",
              height: 500,
              marginBottom: 5,
              marginInline: 2,
            }}
          >
            <div className="row" style={{ justifyContent: "right" }}>
              <button
                type="button"
                className="btn btn-light bg-primary text-white mx-3 mb-2"
                onClick={handleShowFileUploadModal}
              >
                + Upload New
              </button>
            </div>
            <DataGrid
              rows={filesRecords}
              columns={filesColumns}
              sx={GRID_STYLE}
              pageSizeOptions={[5]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            type="button"
            className="btn btn-light bg-primary text-white mx-3"
            onClick={hideModal}
          >
            Close
          </button>
        </div>
      </>
    );
  };

  const handeleShowReturnRequester = (data) => {
    const options = [];
    options.push(data);
    setPartSelectionData([...options]);
    setOpenReturnRequsterModal(true);
    setOpenClaimRequestProcess(false);
  };

  const handleShowHideAddPartModal = () => {
    setOpenReturnRequsterModal(!openReturnRequsterModal);
    // setOpenClaimRequestProcess(!openClaimRequestProcess);
    // setShowOverviewModal(!showOverviewModal);
    setShowAddPartModal(!showAddPartModal);
  };

  return (
    <>
      <Modal show={show} onHide={hideModal} size="xl">
        <Modal.Body>
          <Box sx={{ typography: "body1" }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  aria-label="lab API tabs example"
                  onChange={(e, newTabValue) => setTabValue(newTabValue)}
                  centered
                >
                  <Tab label={`Overview`} value="overview" />
                  <Tab label={`Details`} value="details" />
                  <Tab label={`Claim`} value="claim" />
                  <Tab label={`Files`} value="files" />
                </TabList>
              </Box>
              <TabPanel value={tabValue}>
                {tabValue === "overview" && viewOverviewTabData()}
                {tabValue === "details" && viewDetailsTabData()}
                {tabValue === "claim" && viewClaimTabData()}
                {tabValue === "files" && viewFilesTabData()}
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
      {openClaimCreateModal && (
        <ClaimCreateModal
          show={openClaimCreateModal}
          hideModal={handleClaimCreate}
          warrantyRecord={warrantyRecord}
          handleSnack={handleSnack}
        />
      )}
      {openClaimEditModal && (
        <ClaimEditModal
          show={openClaimEditModal}
          hideModal={handleOpenClaimEditModal}
          warrantyRecord={warrantyRecord}
          claimRecordId={claimRecordId}
          handleSnack={handleSnack}
          handleOpenClaimRequestModal={handleOpenClaimRequestModal}
        />
      )}

      {(openClaimRequestModal || openPartCreateModal) && (
        <ClaimRequestModal
          show={openClaimRequestModal}
          hideModal={handleCloseClaimRequestModal}
          handleSnack={handleSnack}
          claimRecordDetail={claimRecordDetail}
          claimOrderId={claimOrderId}
          setClaimOrderId={setClaimOrderId}
          claimRecordId={claimRecordId}
          assesstmentId={assesstmentId}
          setAssesstmentId={setAssesstmentId}
          evaluationId={evaluationId}
          setEvaluationId={setEvaluationId}
          openPartCreateModal={openPartCreateModal}
          handleShowPartCreateModal={handleShowPartCreateModal}
          // handleShowReturnRequetrModal={handleShowReturnRequetrModal}
        />
      )}
      {openFileUploadModal && (
        <UploadFilesModal
          show={openFileUploadModal}
          hideModal={handleShowFileUploadModal}
        />
      )}

      {/* {openClaimEditModal && (
        <ClaimEditModal
          show={openClaimEditModal}
          hideModal={() => setOpenClaimEditModal(false)}
          warrantyRecord={warrantyRecord}
          handleSnack={handleSnack}
          claimRecordId={claimRecordId}
          handleShowReturnProcess={handleShowReturnProcess}
        />
      )}

      {openClaimReturnRequest && (
        <ReturnRequestProcessModal
          show={openClaimReturnRequest}
          hideModal={() => setOpenClaimReturnRequest(false)}
          claimRecordId={claimRecordId}
          handleSnack={handleSnack}
          // evaluationQuestions={evaluationQuestions}
          claimOrderId={claimOrderId}
          setClaimOrderId={setClaimOrderId}
          claimDetails={claimData}
          evaluationId={evaluationId}
          setEvaluationId={setEvaluationId}
          assesstmentId={assesstmentId}
          setAssesstmentId={setAssesstmentId}
          handeleShowReturnRequester={handeleShowReturnRequester}
          handleShowHideAddPartModal={handleShowHideAddPartModal}
          fromClaim={false}
          newPartRecord={newPartRecord}
          setNewPartRecord={setNewPartRecord}
          isFailurePar={isFailurePart}
          setIsFailurePart={setIsFailurePart}
        />
      )} */}
    </>
  );
};

export default WarrantyOverviewModal;

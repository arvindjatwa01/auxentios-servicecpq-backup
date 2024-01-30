import React, { useCallback, useEffect, useState } from "react";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Modal } from "react-bootstrap";
import OverviewTabContainer from "./OverviewTabContainer";
import {
  defaultCustomerDetails,
  defaultInstallerDetails,
  defaultWarrantyDetails,
  installerTypeOptions,
  warrantyBasisOptions,
  warrantyCategoryOptions,
  warrantyStatusOptions,
  warrantyUnitOptions,
} from "./WarrantyConstants";
import OverviewDetailsTabConatiner from "./OverviewDetailsTabConatiner";
import OverviewClaimTabContainer from "./OverviewClaimTabContainer";
import {
  Claim_Pagination_List_GET,
  Update_Warranty_Details_PUT,
  warranty_Details_By_Id_Get,
} from "services/CONSTANTS";
import { callGetApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import WarrantyClaimAddUpdate from "./WarrantyClaimAddUpdate";
import ClaimDetails from "./ClaimDetails";
import OverviewFilesTabContainer from "./OverviewFilesTabContainer";
import UploadFilesModal from "./UploadFilesModal";

const WarrantyOverviewModal = ({
  show,
  hideModal,
  recordId,
  showClaimAddEditModal,
  handleShowClaimAddEditModal,
  showClaimDetailsModal,
  handleShowClaimDetails,
  showUploadFilesModal,
  handleFilesUploadModal,
  handleSnack,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [editTabsContent, setEditTabsContent] = useState({
    overview: false,
    details: false,
    claim: false,
    files: false,
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

  const [claimRecords, setClaimRecords] = useState([]);

  useEffect(() => {
    if (recordId && recordId !== null) {
      setEditTabsContent({
        overview: false,
        details: false,
        claim: false,
        files: false,
      });
      getOverviewDetails();
      getClaimListRecords();
      setActiveTab("overview");
    }
  }, [recordId]);

  // get selected warranty overview details
  const getOverviewDetails = async () => {
    try {
      const rUrl = `${warranty_Details_By_Id_Get}${recordId}`;
      callGetApi(
        null,
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
    } catch (error) {
      return;
    }
  };

  // get claim data list
  const getClaimListRecords = useCallback(() => {
    if (recordId && recordId !== null) {
      const rUrl = `${Claim_Pagination_List_GET}?pageNumber=${0}&pageSize=${25}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setClaimRecords(responseData);
        }
      });
    }
  }, [recordId]);

  // tabs edit mode active
  const handleEditTabsContent = () => {
    setEditTabsContent({ ...editTabsContent, [activeTab]: true });
  };

  // Warranty details input text change
  const hadleWarrantyInputChange = (e) => {
    const { name, value } = e.target;
    setWarrantyRecord({ ...warrantyRecord, [name]: value });
  };

  // warranty details select|| date change
  const handleWarrantySelectChange = (e, keyName) => {
    setWarrantyRecord({ ...warrantyRecord, [keyName]: e });
  };

  // installer input text change
  const hadleInstallerInputChange = (e) => {
    const { name, value } = e.target;
    setInstallerRecord({ ...installerRecord, [name]: value });
  };

  // installer select|date option change
  const hadleInstallerSelectChange = (e, keyName) => {
    setInstallerRecord({ ...installerRecord, [keyName]: e });
  };

  // customer input text change
  const hadleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  //  warranty toggle button check uncheck
  const handleWarrantyToggleButton = (e, keyName) => {
    setWarrantyRecord({ ...warrantyRecord, [keyName]: e.target.checked });
  };

  // handle tab Change
  const handleTabChange = (e) => {
    try {
      const { id } = e.target;
      const rUrl = `${Update_Warranty_Details_PUT}${recordId}`;
      const reqObj = {
        ...warrantyRecord,
        category: warrantyRecord.category?.value || "EMPTY",
        basis: warrantyRecord.basis?.value || "EMPTY",
        unit: warrantyRecord.unit?.value || "EMPTY",
        warrantyStatus: warrantyRecord.warrantyStatus?.value || "EMPTY",
        installerDetails: {
          ...installerRecord,
          installerType: installerRecord.installerType?.value || "EMPTY",
        },
        customerDetails: { ...customerDetails },
      };
      if (id === "overview") {
        if (editTabsContent.overview) {
          callPutApi(rUrl, rUrl, reqObj, (response) => {
            if (response.status === API_SUCCESS) {
              handleSnack("info", "Warranty Overview updated successfully.");
              setActiveTab("details");
            }
          });
        } else {
          setActiveTab("details");
        }
      } else if (id === "details") {
        if (editTabsContent.details) {
          callPutApi(rUrl, rUrl, reqObj, (response) => {
            if (response.status === API_SUCCESS) {
              handleSnack("info", "Warranty Details updated successfully.");
              setActiveTab("claim");
            }
          });
        } else {
          setActiveTab("claim");
        }
      } else if (id === "claim") {
        setActiveTab("files");
      } else if (id === "files") {
        hideModal();
      }
    } catch (error) {
      return;
    }
  };

  // view all the tabs modal data
  const viewOverviewTabMaster = () => {
    return (
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
                {activeTab === "overview" && (
                  <OverviewTabContainer
                    warrantyRecord={warrantyRecord}
                    edit={editTabsContent.overview}
                    handleEdit={handleEditTabsContent}
                    hadleWarrantyInputChange={hadleWarrantyInputChange}
                    handleWarrantySelectChange={handleWarrantySelectChange}
                    handleTabChange={handleTabChange}
                    handleWarrantyToggleButton={handleWarrantyToggleButton}
                  />
                )}
                {activeTab === "details" && (
                  <OverviewDetailsTabConatiner
                    warrantyRecord={warrantyRecord}
                    installerRecord={installerRecord}
                    customerDetails={customerDetails}
                    edit={editTabsContent.details}
                    handleEdit={handleEditTabsContent}
                    hadleWarrantyInputChange={hadleWarrantyInputChange}
                    handleWarrantySelectChange={handleWarrantySelectChange}
                    handleTabChange={handleTabChange}
                    hadleInstallerInputChange={hadleInstallerInputChange}
                    hadleInstallerSelectChange={hadleInstallerSelectChange}
                    hadleCustomerInputChange={hadleCustomerInputChange}
                    handleWarrantyToggleButton={handleWarrantyToggleButton}
                  />
                )}
                {activeTab === "claim" && (
                  <OverviewClaimTabContainer
                    edit={editTabsContent.claim}
                    recordData={claimRecords}
                    handleTabChange={handleTabChange}
                    handleShowClaimAddEditModal={handleShowClaimAddEditModal}
                    handleShowClaimDetails={handleShowClaimDetails}
                  />
                )}
                {activeTab === "files" && (
                  <OverviewFilesTabContainer
                    edit={editTabsContent.files}
                    handleTabChange={handleTabChange}
                    handleFilesUploadModal={handleFilesUploadModal}
                  />
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
    );
  };
  return (
    <>
      {show && viewOverviewTabMaster()}
      {showClaimAddEditModal && (
        <WarrantyClaimAddUpdate
          show={showClaimAddEditModal}
          hideModal={handleShowClaimAddEditModal}
        />
      )}
      {showClaimDetailsModal && (
        <ClaimDetails
          show={showClaimDetailsModal}
          hideModal={handleShowClaimDetails}
        />
      )}
      {showUploadFilesModal && (
        <UploadFilesModal
          show={showUploadFilesModal}
          hideModal={handleFilesUploadModal}
        />
      )}
    </>
  );
};

export default WarrantyOverviewModal;

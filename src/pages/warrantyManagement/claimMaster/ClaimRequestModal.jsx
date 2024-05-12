import React, { useEffect, useState } from "react";

import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import {
    TextField,
    FormControlLabel,
    FormGroup,
    Switch,
    Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Select from "react-select";
import Moment from "react-moment";
import { Modal } from "react-bootstrap";

import {
    FONT_STYLE,
    FONT_STYLE_SELECT,
    GRID_STYLE,
    SPAREPART_SEARCH_Q_OPTIONS,
} from "pages/Common/constants";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import {
    causalPartRecord,
    claimAssessmentRequestObj,
    claimRequestObj,
    claimStatusOptions,
    claimTypeOptions,
    evaluationRequestObj,
    failedPartsRecord,
    partsAnalysisOption,
    payerOptions,
    questionsOptions,
    rmaResonOptions,
    rmaTypeOptions,
    salesOfficeOptions,
    underWarrantyOptions,
    validityOptions,
    warrantyTypeOptions,
} from "../warrantyManagementConstants";
import { customerSearch, machineSearch } from "services/searchServices";
import SearchBox from "pages/Common/SearchBox";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import {
    CLAIM_MASTER_URL,
    CLAIM_ORDER_MASTER_URL,
    DATA_SVC_EQUIPMENT,
    EVALUATION_PARTS_MASTER_URL,
    EVALUTAION_QUESTION_ANSWER_URL,
    WARRANTY_EVALUATION_MASTER_URL,
    SEARCH_CUSTOMER,
    WARRANTY_ASSESSMENT_MASTER_URL,
    WARRANTY_MASTER_URL,
    YEARLY_WARRANTY_MASTER_URL,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import ClaimPartCreateModal from "./ClaimPartCreateModal";
import ClaimAdjustPrice from "./ClaimAdjustPrice";
import ClaimRelatedPartList from "./ClaimRelatedPartList";
import ClaimRelatedHoursAndExpenses from "./ClaimRelatedHoursAndExpenses";
import ClaimSettlement from "./ClaimSettlement";
import ClaimAddNotes from "./ClaimAddNotes";
import SearchComponent from "../../components/SearchComponent";
import EvaluationPartReport from "./EvaluationPartReport";
import ValidateClaimModal from "./ValidateClaimModal";

const ClaimRequestModal = ({
    show,
    hideModal,
    handleSnack,
    claimRecordDetail,
    claimOrderId,
    setClaimOrderId,
    claimRecordId,
    fromClaim = false,
    evaluationId,
    setEvaluationId,
    assesstmentId,
    setAssesstmentId,
    openPartCreateModal,
    handleShowPartCreateModal,
    handleShowReturnRequetrModal,
}) => {
    const [activeClaim, setActiveClaim] = useState(false);
    const [activeUpperTabs, setActiveUpperTabs] = useState("");
    const [requestTab, setRequestTab] = useState("returnDetails");
    const [returnDetailsTab, setReturnDetailsTab] = useState("general");

    const [showValidateWarnMsg, setShowValidateWarnMsg] = useState(false);
    const [openValidateClaimErrModal, setOpenValidateClaimErrModal] =
        useState(false);

    const [reportTypeCausal, setReportTypeCausal] = useState(false);

    const [partsFailedRecord, setPartsFailedRecord] = useState([]);
    const [partsCausalRecord, setPartsCausalRecord] = useState([]);

    const [claimNumber, setClaimNumber] = useState(null);
    const [claimValueId, setClaimValueId] = useState(null);
    const [relatedHEId, setRelatedHEId] = useState(null);
    const [settlementValueId, setSettlementValueId] = useState(null);
    const [relatedPartsId, setRelatedPartsId] = useState(null);
    const [relatedPartsRecords, setRelatedPartsRecords] = useState([]);
    const [coverageTypeValue, setCoverageTypeValue] = useState("");

    const [viewOnlyTab, setViewOnlyTab] = useState({
        generalViewOnly: false,
        estViewOnly: false,
        custViewOnly: false,
        machineViewOnly: false,
        assesstViewOnly: false,
        evaluViewOnly: false,
        claimViewOnly: false,
    });

    const [claimOrderData, setClaimOrderData] = useState({
        rmaNumber: "",
        rmaReason: "",
        rmaType: "",
    });

    const [generalData, setGeneralData] = useState({
        estimationDate: new Date(),
        estimationNo: "",
        description: "",
        reference: "",
        validity: null,
        version: "",
        warrantyClaimStatus: "",
    });

    const [estimationData, setEstimationData] = useState({
        preparedBy: "user1",
        approvedBy: "user1",
        preparedOn: new Date(),
        revisedBy: "user1",
        revisedOn: new Date(),
        salesOffice: null,
    });

    const [customerData, setCustomerData] = useState({
        customerID: "",
        customerName: "",
        contactEmail: "",
        contactPhone: "",
    });
    const [searchCustResults, setSearchCustResults] = useState([]);
    const [noOptionsCust, setNoOptionsCust] = useState(false);

    const [machineData, setMachineData] = useState({
        make: "",
        model: "",
        serialNo: "",
        smu: "",
        fleetNo: "",
    });

    const [warrantyData, setWarrantyData] = useState({
        warrantyTitle: "",
    });
    const [warrantyEndDate, setWarrantyEndDate] = useState(new Date());
    const [noOptionsModel, setNoOptionsModel] = useState(false);
    const [noOptionsSerial, setNoOptionsSerial] = useState(false);
    const [searchModelResults, setSearchModelResults] = useState([]);
    const [searchSerialResults, setSearchSerialResults] = useState([]);
    const [assesstementData, setAssesstementData] = useState({
        ...claimAssessmentRequestObj,
        warrantyId: claimRecordDetail?.warrantyId || 0,
        warrantyTitle: "STD-18",
        // warrantyEndDate: new Date("2026-01-11"),
        // warrantyRequestDate: new Date("2024-03-05"),
        claimId: claimRecordId,
    });

    const [evaluationTabValue, setEvaluationTabValue] =
        useState("evaluationDetails");

    const [evaluationDetailsData, setEvaluationDetailsData] = useState({
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
    });

    const [evaluatedByData, setEvaluatedByData] = useState({
        ...evaluationRequestObj,
    });
    const [claimRecordData, setClaimRecordData] = useState({
        ...claimRequestObj,
    });

    useEffect(() => {
        if (claimOrderId) {
            const rUrl = `${CLAIM_ORDER_MASTER_URL}/${claimOrderId}`;
            callGetApi(rUrl, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;

                    setActiveClaim(true);
                    setClaimNumber(responseData.claimNumber);

                    // rma type value set
                    const _rmaType = rmaTypeOptions.find(
                        (obj) => obj.value === responseData.rmaType
                    );

                    // rma type value set
                    const _rmaReason = rmaResonOptions.find(
                        (obj) => obj.value === responseData.rmaReason
                    );

                    setClaimOrderData({
                        rmaType: _rmaType || "",
                        rmaReason: _rmaReason || "",
                        rmaNumber: responseData.rmaNumber,
                    });

                    // claim status
                    const _claimStatus = claimStatusOptions.find(
                        (obj) => obj.value === claimRecordDetail?.claimStatus
                    );

                    setGeneralData({
                        ...generalData,
                        estimationNo: claimRecordDetail?.equipmentNumber,
                        description: responseData.description,
                        reference: responseData.reference,
                        warrantyClaimStatus: _claimStatus,
                    });

                    setClaimValueId(responseData.claimValueId);
                    setRelatedHEId(responseData.relatedHEId);
                    setSettlementValueId(responseData.settlementValueId);
                    setRelatedPartsId(responseData.relatedPartsId);

                    setEstimationData({
                        ...estimationData,
                        preparedBy: responseData.preparedBy,
                        preparedOn: responseData.preparedOn,
                        revisedBy: responseData.revisedBy,
                        revisedOn: responseData.revisedOn,
                    });

                    setCustomerData({
                        customerID: responseData.customerNumber,
                        customerName: responseData.customerName,
                        contactEmail: responseData.emailId,
                        contactPhone: responseData.contactNumber,
                    });

                    setMachineData({
                        make: responseData.make,
                        model: responseData.model,
                        serialNo: responseData.serialNumber,
                        smu: responseData.smu,
                        fleetNo: responseData.unitNumber,
                    });

                    setViewOnlyTab({
                        generalViewOnly: true,
                        estViewOnly: true,
                        custViewOnly: true,
                        machineViewOnly: true,
                        assesstViewOnly: claimRecordDetail?.assessmentId
                            ? true
                            : false,
                        evaluViewOnly: claimRecordDetail?.evaluationId
                            ? true
                            : false,
                        // claimViewOnly: claimRecordId ? true : false,
                        claimViewOnly: true,
                    });
                }
            });
        }
        if (claimRecordId) {
            const rUrlClaim = `${CLAIM_MASTER_URL}/${claimRecordId}`;
            callGetApi(rUrlClaim, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;

                    // claim status
                    const _claimStatus = claimStatusOptions.find(
                        (obj) => obj.value === responseData.claimStatus
                    );

                    // claim status
                    const _claimType = claimTypeOptions.find(
                        (obj) => obj.value === responseData.claimType
                    );

                    setClaimRecordData({
                        ...responseData,
                        claimStatus: _claimStatus,
                        claimType: _claimType,
                    });

                    // get assessment details
                    if (responseData.assessmentId) {
                        getAssessmentDetails(responseData.assessmentId);
                        setAssesstmentId(responseData.assessmentId);
                    }

                    // get evalaution details
                    if (responseData.evaluationId) {
                        getEvaluationDetails(responseData.evaluationId);
                        setEvaluationId(responseData.evaluationId);
                    }

                    if (responseData.warrantyId) {
                        getWarrantyDetails(responseData.warrantyId);
                    }
                }
            });
        }
    }, [claimRecordDetail]);

    // get warranty details
    const getWarrantyDetails = (warrantyId) => {
        const rUrl = `${WARRANTY_MASTER_URL}/${warrantyId}`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;
                setWarrantyData({
                    ...warrantyData,
                    warrantyTitle: responseData.warrantyTitle,
                });

                if (responseData.yearlyWarrantyIds.length !== 0) {
                    getyearlyWarrantyDetails(responseData.yearlyWarrantyIds[0]);
                }
                if (!claimOrderId) {
                    getCustomerDetails(responseData.customerId);
                    getEquipmentDetails(responseData.equipmentId);
                }
            }
        });
    };

    const getyearlyWarrantyDetails = (yearlyWarrantyId) => {
        const rUrl = `${YEARLY_WARRANTY_MASTER_URL}/${yearlyWarrantyId}`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;

                setWarrantyEndDate(responseData.warrantyEndDate);
            }
        });
    };

    // get customer details
    const getCustomerDetails = (customerId) => {
        const rUrl = SEARCH_CUSTOMER(`customerId:${customerId}`);
        // const rUrl = `${DATA_SVC_CUSTOMER}${customerId}`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;

                setCustomerData({
                    customerID: responseData[0].customerId,
                    customerName: responseData[0].fullName,
                    contactEmail: responseData[0].email,
                    contactPhone: responseData[0]?.contactNumber,
                });
            }
        });
    };

    const getEquipmentDetails = (equipmentId) => {
        const rUrl = `${DATA_SVC_EQUIPMENT()}/${equipmentId}`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;

                setMachineData({
                    make: responseData.market,
                    model: responseData.model,
                    serialNo: responseData.equipmentNumber,
                    smu: responseData?.sensorId,
                    fleetNo: responseData?.stockNumber,
                });
            }
        });
    };

    // get assessment details
    const getAssessmentDetails = (assessmentId) => {
        callGetApi(
            `${WARRANTY_ASSESSMENT_MASTER_URL}/${assessmentId}`,
            (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;

                    // machine under warranty value set
                    const _machineUnderWarranty = underWarrantyOptions.find(
                        (obj) => obj.value === responseData.machineUnderWarranty
                    );

                    // assessment type value set
                    const _assessmentType = warrantyTypeOptions.find(
                        (obj) => obj.value === responseData.assessmentType
                    );

                    setAssesstementData({
                        ...responseData,
                        machineUnderWarranty: _machineUnderWarranty,
                        assessmentType: _assessmentType,
                    });
                }
            }
        );
    };

    // get evaluation details
    const getEvaluationDetails = (id) => {
        const rUrl = `${WARRANTY_EVALUATION_MASTER_URL}/${id}`;
        callGetApi(rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;

                let _evaluationPartIds = [];
                if (
                    responseData.evaluationPartIds &&
                    responseData.evaluationPartIds.length !== 0
                ) {
                    _evaluationPartIds = responseData.evaluationPartIds;

                    getEvaluationPartsIdsDetails(_evaluationPartIds);
                }
                setEvaluatedByData({
                    ...responseData,
                    evaluationPartIds: _evaluationPartIds,
                });
            }
        });
    };

    // all evaluation parts details main function
    const getEvaluationPartsIdsDetails = async (evaluationPartIds) => {
        let failureParts = [];
        let causalParts = [];
        for (let row of evaluationPartIds) {
            const result = await getEvalautionPartIdDatail(row);
            if (result.success) {
                if (result.data?.partsType === "FAILURE_PARTS") {
                    failureParts.push(result.data);
                } else if (result.data?.partsType === "CAUSAL_PARTS")
                    causalParts.push(result.data);
            }
        }
        setPartsFailedRecord(failureParts);
        setPartsCausalRecord(causalParts);
    };

    // get evluation parts id details
    const getEvalautionPartIdDatail = (id) => {
        return new Promise((resolve) => {
            callGetApi(
                `${EVALUATION_PARTS_MASTER_URL}/${id}`,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        resolve({
                            success: true,
                            data: { ...response["data"], supplier: "SP0023" },
                        });
                    } else {
                        resolve({ success: false });
                    }
                },
                (error) => {
                    resolve({ success: false });
                }
            );
        });
    };

    // make editable able to Return Details tab data
    const handleMakeTabEditable = () => {
        if (activeUpperTabs) {
        } else {
            let viewOnlyTabName = "";
            let show = false;
            if (requestTab === "returnDetails") {
                if (returnDetailsTab === "general") {
                    viewOnlyTabName = "generalViewOnly";
                } else if (returnDetailsTab === "estimation") {
                    viewOnlyTabName = "estViewOnly";
                } else if (returnDetailsTab === "customer") {
                    viewOnlyTabName = "custViewOnly";
                } else if (returnDetailsTab === "machine") {
                    viewOnlyTabName = "machineViewOnly";
                }
            } else if (requestTab === "assesstement") {
                viewOnlyTabName = "assesstViewOnly";
                // show = true;
            } else if (requestTab === "evaluation") {
                viewOnlyTabName = "evaluViewOnly";
                // show = true;
            } else if (requestTab === "claim") {
                viewOnlyTabName = "claimViewOnly";
                // show = true;
            }
            setViewOnlyTab({ ...viewOnlyTab, [viewOnlyTabName]: false });
        }
    };

    // change upper tabs value & make Active to them
    const handleChangeUpperTabs = (tabName) => {
        setActiveUpperTabs(tabName);
    };

    // add new part report for Failer|| Causal
    const handleCreateNewPart = (isCausalPart) => {
        setReportTypeCausal(isCausalPart);
        handleShowPartCreateModal();
    };

    // change claim request active tab
    const handleTabChange = (e, value) => {
        setRequestTab(value);
    };

    // back to request tab
    const handleBackToRequestTab = () => {
        setActiveUpperTabs("");
    };

    //Individual estimation details field value change
    const handleEstimationDataChange = (e) => {
        const { name, value } = e.target;
        setEstimationData({ ...estimationData, [name]: value });
    };

    //Individual customer field value change
    const handleCustomerDataChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    // Search Customer with customer ID
    const handleCustSearch = async (searchCustfieldName, searchText) => {
        setSearchCustResults([]);
        customerData.customerID = searchText;
        if (searchText) {
            await customerSearch(searchCustfieldName + "~" + searchText)
                .then((result) => {
                    if (result && result.length > 0) {
                        setSearchCustResults(result);
                        setNoOptionsCust(false);
                    } else {
                        setNoOptionsCust(true);
                    }
                })
                .catch((e) => {
                    handleSnack(
                        "error",
                        "Error occurred while searching the customer!"
                    );
                });
        }
    };

    // Select the customer from search result
    const handleCustSelect = (type, currentItem) => {
        setCustomerData({
            ...customerData,
            customerID: currentItem.customerId,
            customerName: currentItem.fullName,
            contactEmail: currentItem.email,
        });
        setSearchCustResults([]);
    };

    //Individual machine field value change
    const handleMachineDataChange = (e) => {
        const { name, value } = e.target;
        setMachineData({ ...machineData, [name]: value });
    };

    // Machine search based on model and serial number
    const handleMachineSearch = async (searchMachinefieldName, searchText) => {
        let searchQueryMachine = "";
        setSearchModelResults([]);
        setSearchSerialResults([]);

        if (searchMachinefieldName === "model") {
            machineData.model = searchText;
            searchQueryMachine = searchText
                ? searchMachinefieldName + "~" + searchText
                : "";
        } else if (searchMachinefieldName === "serialNo") {
            machineData.serialNo = searchText;
            searchQueryMachine = searchText
                ? machineData.model
                    ? `model:${machineData.model} AND equipmentNumber~` +
                      searchText
                    : "equipmentNumber~" + searchText
                : "";
        }
        if (searchQueryMachine) {
            await machineSearch(searchQueryMachine)
                .then((result) => {
                    if (result) {
                        if (searchMachinefieldName === "model") {
                            if (result && result.length > 0) {
                                setSearchModelResults(result);
                                setNoOptionsModel(false);
                            } else {
                                setNoOptionsModel(true);
                            }
                        } else if (searchMachinefieldName === "serialNo") {
                            if (result && result.length > 0) {
                                setSearchSerialResults(result);
                                setNoOptionsSerial(false);
                            } else {
                                setNoOptionsSerial(true);
                            }
                        }
                    }
                })
                .catch((e) => {
                    handleSnack(
                        "error",
                        "Error occurred while searching the machine!"
                    );
                });
        } else {
            searchMachinefieldName === "model"
                ? setSearchModelResults([])
                : setSearchSerialResults([]);
        }
    };

    // Select machine from the search result
    const handleModelSelect = (type, currentItem) => {
        if (type === "model") {
            setMachineData({
                ...machineData,
                model: currentItem.model,
            });
            setSearchModelResults([]);
        } else if (type === "equipmentNumber") {
            setMachineData({
                ...machineData,
                make: currentItem.maker,
                model: currentItem.model,
                serialNo: currentItem.equipmentNumber,
                smu: currentItem.sensorId,
                fleetNo: currentItem.stockNumber,
            });
            setSearchSerialResults([]);
        }
    };

    //Individual assessment field value change
    const handleAssesstementDataChange = (e) => {
        const { name, value } = e.target;
        setAssesstementData({ ...assesstementData, [name]: value });
    };

    // Individual assessment field value change
    const handleAssesstementSelectDataChange = (e, keyName) => {
        setAssesstementData({ ...assesstementData, [keyName]: e });
    };

    // Individual evaluation details select option field value change
    const handleEvaluationDeatilsSelectDataChange = (e, keyName) => {
        setEvaluationDetailsData({ ...evaluationDetailsData, [keyName]: e });
    };

    // Individual evaluation By field value change
    const handleEvaluationByDataChange = (e) => {
        const { name, value } = e.target;
        setEvaluatedByData({ ...evaluatedByData, [name]: value });
    };

    // Individual Claim record input field value change
    const handleClaimRecordDataChange = (e) => {
        const { name, value } = e.target;
        setClaimRecordData({ ...claimRecordData, [name]: value });
    };

    // Individual claim record Select & date field value change
    const handleClaimRecordSelectDataChange = (e, keyName) => {
        // const { name, value } = e.;
        setClaimRecordData({ ...claimRecordData, [keyName]: e });
    };

    // go to evaluation return scrren data
    const handleEvaluationPartsReturn = (row) => {
        handleShowReturnRequetrModal(row);
    };

    // Warranty Accepted
    const handleWarrantyAccpeted = () => {
        if (assesstmentId) {
            const rUrl = `${WARRANTY_EVALUATION_MASTER_URL}`;
            const evalatuinonRObj = {
                ...evaluatedByData,
                claimId: claimRecordId,
                evaluated: true,
            };

            if (evaluationId) {
                callPutApi(
                    null,
                    `${rUrl}/${evaluationId}`,
                    evalatuinonRObj,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            // handleCrateQuestions(evaluationId);
                            setActiveClaim(true);
                            setRequestTab("claim");
                            handleSnack(
                                "success",
                                "Warranty Accepted Successfully."
                            );

                            setEvaluatedByData({
                                ...evaluatedByData,
                                evaluated: true,
                            });
                            // setEvaluationTabValue("evaluationPartReport");
                            // setViewOnlyTab({ ...viewOnlyTab, evaluViewOnly: true });
                        } else {
                            handleSnack(
                                "error",
                                "Warranty Acception Failed or Something went wrong"
                            );
                        }
                    },
                    (error) => {
                        handleSnack(
                            "error",
                            "Warranty Acception Failed or Something went wrong"
                        );
                    }
                );
            } else {
                handleSnack(
                    "info",
                    "Create Evaluation First then you can Accepet or Reject Warranty"
                );
            }
        } else {
            handleSnack(
                "info",
                "Create Assessment First then you can Update warranty Status."
            );
        }
    };

    // Warranty Rejected
    const handleWarrantyRejected = () => {
        if (assesstmentId) {
            const rUrl = `${WARRANTY_EVALUATION_MASTER_URL}`;
            const evalatuinonRObj = {
                ...evaluatedByData,
                claimId: claimRecordId,
                evaluated: false,
            };

            if (evaluationId) {
                callPutApi(
                    null,
                    `${rUrl}/${evaluationId}`,
                    evalatuinonRObj,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            // // handleCrateQuestions(evaluationId);
                            // setActiveClaim(true);
                            // setRequestTab("claim");
                            handleSnack(
                                "success",
                                "Warranty Rejected Successfully."
                            );
                            setEvaluatedByData({
                                ...evaluatedByData,
                                evaluated: false,
                            });
                            // // setEvaluationTabValue("evaluationPartReport");
                            // // setViewOnlyTab({ ...viewOnlyTab, evaluViewOnly: true });
                        } else {
                            handleSnack(
                                "error",
                                "Warranty Rejection Failed or Something went wrong"
                            );
                        }
                    },
                    (error) => {
                        handleSnack(
                            "error",
                            "Warranty Rejection Failed or Something went wrong"
                        );
                    }
                );
            } else {
                handleSnack(
                    "info",
                    "Create Evaluation First then you can Accepet or Reject Warranty"
                );
            }
        } else {
            handleSnack(
                "info",
                "Create Assessment First then you can Update warranty Status."
            );
        }
    };

    // add update claim request
    const handleAddUpdateClaimRequest = () => {
        const reqObj = {
            customerNumber: customerData.customerID,
            customerName: customerData.customerName || "",
            emailId: customerData.contactEmail || "",
            address: "",
            contactNumber: customerData.contactPhone || "",
            make: machineData.make || "",
            model: machineData.model || "",
            serialNumber: machineData.serialNo || "",
            location: "",
            smu: machineData.smu || "",
            unitNumber: machineData.fleetNo || "",
            repairFromDate: new Date(),
            repairToDate: new Date(),
            preparedBy: estimationData.preparedBy || "",
            preparedOn: estimationData.preparedOn || new Date(),
            revisedBy: estimationData.revisedBy || "",
            revisedOn: estimationData.revisedOn || new Date(),
            claimRequestDate: new Date(),
            claimType: claimRecordDetail?.claimType || "EMPTY",
            description: generalData.description,
            claimNumber: claimRecordDetail?.claimNumber || "",
            reference: generalData.reference || "",
            rmaType: claimOrderData.rmaType?.value || "",
            rmaReason: claimOrderData.rmaReason?.value || "",
            rmaNumber: claimOrderData.rmaNumber || "",
        };
        if (claimOrderId) {
            callPutApi(
                null,
                `${CLAIM_ORDER_MASTER_URL}/${claimOrderId}`,
                reqObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        if (returnDetailsTab === "general") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                generalViewOnly: true,
                            });
                            setReturnDetailsTab("estimation");
                        } else if (returnDetailsTab === "estimation") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                estViewOnly: true,
                            });
                            setReturnDetailsTab("customer");
                        } else if (returnDetailsTab === "customer") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                custViewOnly: true,
                            });
                            setReturnDetailsTab("machine");
                        } else if (returnDetailsTab === "machine") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                machineViewOnly: true,
                            });
                            setRequestTab("assesstement");
                        }
                        handleSnack(
                            "success",
                            "Claim Request Updated Sucessfully"
                        );
                    }
                }
            );
        } else {
            callPostApi(null, CLAIM_ORDER_MASTER_URL, reqObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    if (returnDetailsTab === "general") {
                        setViewOnlyTab({
                            ...viewOnlyTab,
                            generalViewOnly: true,
                        });
                        setReturnDetailsTab("estimation");
                    } else if (returnDetailsTab === "estimation") {
                        setViewOnlyTab({ ...viewOnlyTab, estViewOnly: true });
                        setReturnDetailsTab("customer");
                    } else if (returnDetailsTab === "customer") {
                        setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
                        setReturnDetailsTab("machine");
                    } else if (returnDetailsTab === "machine") {
                        setViewOnlyTab({
                            ...viewOnlyTab,
                            machineViewOnly: true,
                        });
                        setRequestTab("assesstement");
                    }
                    setClaimOrderId(responseData["claimOrderId"]);
                    setClaimRecordData({
                        ...claimRecordData,
                        claimOrderId: responseData["claimOrderId"],
                    });
                    handleUpdateClaimOrder(
                        "claimRequest",
                        responseData["claimOrderId"]
                    );
                    handleSnack(
                        "success",
                        "Claim Request Created Successfully"
                    );
                } else {
                    handleSnack("error", "Somthing Went wrong");
                }
            });
        }
    };

    // update claim record
    const handleUpdateClaimOrder = (type, valueId) => {
        const rUrl = CLAIM_MASTER_URL;
        let _claimOrderId = claimOrderId;
        let _assessmentId = assesstmentId;
        let _evaluationId = evaluationId;
        if (type === "claimRequest") {
            _claimOrderId = valueId;
        } else if (type === "assessment") {
            _assessmentId = valueId;
        } else if (type === "evaluation") {
            _evaluationId = valueId;
        }
        if (claimRecordId) {
            const rObj = {
                ...claimRecordDetail,
                claimOrderId: _claimOrderId || 0,
                assessmentId: _assessmentId || 0,
                evaluationId: _evaluationId || 0,
            };

            callPutApi(null, `${rUrl}/${claimRecordId}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                }
            });
        }
    };

    // add update assessment
    const handleAddUpdateAssesstment = () => {
        const reqObj = {
            ...assesstementData,
            machineUnderWarranty:
                assesstementData.machineUnderWarranty?.value || "EMPTY",
            assessmentType: assesstementData.assessmentType?.value || "EMPTY",
            warrantyEndDate: warrantyEndDate,
        };

        if (assesstmentId) {
            callPutApi(
                null,
                `${WARRANTY_ASSESSMENT_MASTER_URL}/${assesstmentId}`,
                reqObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;
                        setAssesstmentId(responseData.assessmentId);
                        handleSnack(
                            "success",
                            "Warranty Assessment Updated  Successfully"
                        );
                        // setViewOnlyTab({ ...viewOnlyTab, assesstViewOnly: true });
                        setRequestTab("evaluation");
                        setViewOnlyTab({
                            ...viewOnlyTab,
                            assesstViewOnly: true,
                        });
                    } else {
                        handleSnack("error", "Something went wrong.");
                    }
                },
                (error) => {
                    handleSnack("error", "Something went wrong.");
                }
            );
        } else {
            callPostApi(
                null,
                WARRANTY_ASSESSMENT_MASTER_URL,
                reqObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;
                        setAssesstmentId(responseData.assessmentId);
                        handleSnack(
                            "success",
                            "Warranty Assessment Created Successfully"
                        );
                        // setViewOnlyTab({ ...viewOnlyTab, assesstViewOnly: true });
                        handleUpdateClaimOrder(
                            "assessment",
                            responseData["assessmentId"]
                        );
                        setRequestTab("evaluation");
                        setViewOnlyTab({
                            ...viewOnlyTab,
                            assesstViewOnly: true,
                        });
                    } else {
                        handleSnack("error", "Something went wrong.");
                    }
                },
                (error) => {
                    handleSnack("error", "Something went wrong.");
                }
            );
        }
    };

    // add update claim evalautaion question 1
    const handleCrateEvaluationQuestion1 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 1,
            answer: evaluationDetailsData.question1?.value || "",
        };
        callPostApi(null, rUrl, rObj, (response) => {
            if (response.status === API_SUCCESS) {
                console.log("Success questions1");
            }
        });
    };

    // add update claim evalautaion question 2
    const handleCrateEvaluationQuestion2 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 2,
            answer: evaluationDetailsData.question2?.value || "",
        };
        callPostApi(null, rUrl, rObj, (response) => {
            if (response.status === API_SUCCESS) {
                console.log("Success questions2");
            }
        });
    };

    // add update claim evalautaion question 3
    const handleCrateEvaluationQuestion3 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 3,
            answer: evaluationDetailsData.question3?.value || "",
        };
        callPostApi(null, rUrl, rObj, (response) => {
            if (response.status === API_SUCCESS) {
                console.log("Success questions3");
            }
        });
    };

    // add update claim evalautaion question 4
    const handleCrateEvaluationQuestion4 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 4,
            answer: evaluationDetailsData.question4?.value || "",
        };
        callPostApi(null, rUrl, rObj, (response) => {
            if (response.status === API_SUCCESS) {
                console.log("Success questions4");
            }
        });
    };

    // add update claim evalautaion question 5
    const handleCrateEvaluationQuestion5 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 5,
            answer: evaluationDetailsData.question5,
        };
        callPostApi(null, rUrl, rObj, (response) => {
            if (response.status === API_SUCCESS) {
                console.log("Success questions5");
            }
        });
    };

    // add update claim evalautaion question 6
    const handleCrateEvaluationQuestion6 = (evaluatedId) => {
        const rUrl = `${EVALUTAION_QUESTION_ANSWER_URL}`;
        const rObj = {
            evaluationId: evaluatedId,
            questionId: 6,
            answer: evaluationDetailsData.question6,
        };
        callPostApi(null, rUrl, rObj, (response) => {
            if (response.status === API_SUCCESS) {
                console.log("Success questions6");
            }
        });
    };

    // create Questions
    const handleCrateQuestions = (evaluatedId) => {
        handleCrateEvaluationQuestion1(evaluatedId);
        handleCrateEvaluationQuestion2(evaluatedId);
        handleCrateEvaluationQuestion3(evaluatedId);
        handleCrateEvaluationQuestion4(evaluatedId);
        handleCrateEvaluationQuestion5(evaluatedId);
        handleCrateEvaluationQuestion6(evaluatedId);
    };

    // add update evaluation
    const handleAddUpdateEvaluation = () => {
        if (assesstmentId) {
            const rUrl = `${WARRANTY_EVALUATION_MASTER_URL}`;
            const evalatuinonRObj = {
                ...evaluatedByData,
                claimId: claimRecordId,
            };

            if (evaluationId) {
                callPutApi(
                    null,
                    `${rUrl}/${evaluationId}`,
                    evalatuinonRObj,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            handleCrateQuestions(evaluationId);
                            handleSnack(
                                "success",
                                "Evaluation Updated Successfully."
                            );
                            setEvaluationTabValue("evaluationPartReport");
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                evaluViewOnly: true,
                            });
                        } else {
                            handleSnack(
                                "error",
                                "Evaluation Failed or Something went wrong"
                            );
                        }
                    },
                    (error) => {
                        handleSnack(
                            "error",
                            "Evaluation Failed or Something went wrong"
                        );
                    }
                );
            } else {
                callPostApi(
                    null,
                    rUrl,
                    evalatuinonRObj,
                    (response) => {
                        if (response.status === API_SUCCESS) {
                            const responseData = response.data;
                            setEvaluationId(responseData.evaluationId);
                            handleCrateQuestions(responseData.evaluationId);
                            handleUpdateClaimOrder(
                                "evaluation",
                                responseData["evaluationId"]
                            );
                            handleSnack(
                                "success",
                                "Evaluation Created Successfully."
                            );
                            setEvaluationTabValue("evaluationPartReport");
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                evaluViewOnly: true,
                            });
                        } else {
                            handleSnack(
                                "error",
                                "Evaluation Failed or Something went wrong"
                            );
                        }
                    },
                    (error) => {
                        handleSnack(
                            "error",
                            "Evaluation Failed or Something went wrong"
                        );
                    }
                );
            }
        } else {
            handleSnack(
                "info",
                "Create Assessment First then you can Create or Update Evalaution."
            );
        }
    };

    const partsColumns = [
        {
            field: "partNumber",
            headerName: "Part Number",
            flex: 1,
        },
        {
            field: "partDescription",
            headerName: "Part Description",
            flex: 1,
        },
        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1,
        },
        {
            field: "analysis",
            headerName: "Analysis",
            flex: 1,
            type: "singleSelect",
            valueOptions: ({ row }) => partsAnalysisOption,
            valueFormatter: (params) => {
                const option = partsAnalysisOption.find(
                    ({ value: optionValue }) => params.value === optionValue
                );

                if (option) return option.label;
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 150,
            cellClassName: "actions",
            renderCell: (params) => (
                <button
                    className="btn return-btn"
                    onClick={() => handleEvaluationPartsReturn(params)}
                >
                    Return
                </button>
            ),
        },
    ];

    // create ERP Order >> Claim Tab
    const handleCreateERPOrder = () => {
        if (claimOrderId) {
            // handleSnack(
            //   "success",
            //   `${claimOrderId} has been transmitted to your ERP system`
            // );
            handleSnack(
                "success",
                `Claim Request ${claimOrderId} has been submited successfully.`
            );
        } else {
            handleSnack("info", `Create claim order first.`);
        }
    };

    // Save Claim Order changes >> Claim Tab
    const handleSvaeClaiOrderChanges = () => {
        const reqObj = {
            customerNumber: customerData.customerID,
            customerName: customerData.customerName || "",
            emailId: customerData.contactEmail || "",
            address: "",
            contactNumber: customerData.contactPhone || "",
            make: machineData.make || "",
            model: machineData.model || "",
            serialNumber: machineData.serialNo || "",
            location: "",
            smu: machineData.smu || "",
            unitNumber: machineData.fleetNo || "",
            repairFromDate: new Date(),
            repairToDate: new Date(),
            preparedBy: estimationData.preparedBy || "",
            preparedOn: estimationData.preparedOn || new Date(),
            revisedBy: estimationData.revisedBy || "",
            revisedOn: estimationData.revisedOn || new Date(),
            claimRequestDate: new Date(),
            claimType: claimRecordDetail?.claimType || "EMPTY",
            description: generalData.description,
            claimNumber: claimRecordDetail?.claimNumber || "",
            reference: generalData.reference || "",
            rmaType: claimOrderData.rmaType?.value || "",
            rmaReason: claimOrderData.rmaReason?.value || "",
            rmaNumber: claimOrderData.rmaNumber || "",
        };
        if (claimOrderId) {
            callPutApi(
                null,
                `${CLAIM_ORDER_MASTER_URL}/${claimOrderId}`,
                reqObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        if (returnDetailsTab === "general") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                generalViewOnly: true,
                            });
                            setReturnDetailsTab("estimation");
                        } else if (returnDetailsTab === "estimation") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                estViewOnly: true,
                            });
                            setReturnDetailsTab("customer");
                        } else if (returnDetailsTab === "customer") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                custViewOnly: true,
                            });
                            setReturnDetailsTab("machine");
                        } else if (returnDetailsTab === "machine") {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                machineViewOnly: true,
                            });
                            setRequestTab("assesstement");
                        }
                        handleSnack(
                            "success",
                            "Claim Request Updated Sucessfully"
                        );
                    }
                }
            );
        } else {
            handleSnack("info", `Create claim order first.`);
        }
    };

    return (
        <>
            {!openValidateClaimErrModal && show && (
                <Modal show={show} onHide={hideModal} size="xl">
                    <Modal.Body>
                        <div className="card border my-2 px-3">
                            <div className="row mt-2 py-3">
                                <div className="col-md-4 col-sm-4 d-flex  claim-requester-info">
                                    <img
                                        src="../assets/images/member/2.jpg"
                                        alt=""
                                    />
                                    <div className="mx-2">
                                        <h2 className="mb-0">Ashok Mohanty</h2>
                                        <h6>Warranty Analyst</h6>
                                        {/* <h2 className="mb-0">David Krasniy</h2>
              <h6>Associate Programmer Analyst</h6> */}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 d-flex">
                                    <DateRangeIcon fontSize="large" />
                                    <div className="mx-2">
                                        <h6 className="mb-0">Current Year</h6>
                                        <h4>{new Date().getFullYear()}</h4>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 d-flex">
                                    <PeopleAltOutlinedIcon fontSize="large" />
                                    <div className="mx-2">
                                        <h6 className="mb-0">Manager</h6>
                                        <h4>Andrew Studer</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ligt-greey-bg p-3">
                            <div>
                                <span
                                    className="mr-3 cursor"
                                    onClick={handleMakeTabEditable}
                                >
                                    <i
                                        className="fa fa-pencil font-size-12"
                                        aria-hidden="true"
                                    ></i>
                                    <span className="ml-2">Edit</span>
                                </span>
                                {activeClaim && (
                                    <>
                                        <span
                                            className={`mr-3 cursor ${
                                                activeUpperTabs ===
                                                "adjustPrice"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeUpperTabs(
                                                    "adjustPrice"
                                                )
                                            }
                                        >
                                            <MonetizationOnOutlinedIcon className=" font-size-16" />
                                            <span className="ml-2">
                                                {" "}
                                                Adjust Claim Value
                                            </span>
                                        </span>
                                        {/* <span
                    className={`mr-3 cursor ${
                      activeUpperTabs === "realtedPartList"
                        ? "active-span"
                        : ""
                    }`}
                    onClick={() => handleChangeUpperTabs("realtedPartList")}
                  >
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span> */}
                                        <span
                                            className={`mr-3 cursor ${
                                                activeUpperTabs ===
                                                "realtedServiceEstimate"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeUpperTabs(
                                                    "realtedServiceEstimate"
                                                )
                                            }
                                        >
                                            <AccessAlarmOutlinedIcon className=" font-size-16" />
                                            <span className="ml-2">
                                                Related Parts & Expenses
                                            </span>
                                        </span>
                                        <span
                                            className={`mr-3 cursor ${
                                                activeUpperTabs === "splitPrice"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeUpperTabs(
                                                    "splitPrice"
                                                )
                                            }
                                        >
                                            <SellOutlinedIcon className=" font-size-16" />
                                            <span className="ml-2">
                                                Settlement
                                            </span>
                                        </span>
                                        <span
                                            className={`cursor ${
                                                activeUpperTabs === "addNotes"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeUpperTabs(
                                                    "addNotes"
                                                )
                                            }
                                        >
                                            <DescriptionOutlinedIcon className="font-size-16" />
                                            <span className="ml-2">
                                                Add Notes
                                            </span>
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="card border my-2 px-3">
                            <Box
                                className="mt-0"
                                sx={{ width: "100%", typography: "body1" }}
                            >
                                {activeUpperTabs === "" && (
                                    <TabContext value={requestTab}>
                                        <Box
                                            sx={{
                                                borderBottom: 1,
                                                borderColor: "divider",
                                            }}
                                        >
                                            <TabList
                                                className="custom-tabs-div"
                                                onChange={handleTabChange}
                                            >
                                                <Tab
                                                    label="REQUEST DETAILS"
                                                    value="returnDetails"
                                                />
                                                <Tab
                                                    label="ASSESSMENT "
                                                    value="assesstement"
                                                />
                                                <Tab
                                                    label="EVALUATION "
                                                    value="evaluation"
                                                />
                                                <Tab
                                                    label="CLAIM"
                                                    value="claim"
                                                    //  disabled={!evaluationId && !assesstmentId}
                                                    //  disabled={!activeClaim}
                                                />
                                            </TabList>
                                        </Box>
                                        <TabPanel
                                            value="returnDetails"
                                            sx={{ paddingX: 1.4 }}
                                        >
                                            <div className="card border">
                                                <Box
                                                    className="mt-0"
                                                    sx={{
                                                        width: "100%",
                                                        typography: "body1",
                                                    }}
                                                >
                                                    <TabContext
                                                        value={returnDetailsTab}
                                                    >
                                                        <Box
                                                            sx={{
                                                                borderBottom: 1,
                                                                borderColor:
                                                                    "divider",
                                                                backgroundColor:
                                                                    "#f8f8f8",
                                                            }}
                                                        >
                                                            <TabList
                                                                className="custom-tabs-div"
                                                                sx={{
                                                                    paddingX: 2,
                                                                }}
                                                                onChange={(
                                                                    e,
                                                                    value
                                                                ) =>
                                                                    setReturnDetailsTab(
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <Tab
                                                                    label="GENERAL DETAILS"
                                                                    value="general"
                                                                />
                                                                <Tab
                                                                    label="ESTIMATION DETAILS"
                                                                    value="estimation"
                                                                />
                                                                <Tab
                                                                    label="CUSTOMER"
                                                                    value="customer"
                                                                />
                                                                <Tab
                                                                    label="MACHINE"
                                                                    value="machine"
                                                                />
                                                            </TabList>
                                                        </Box>
                                                        <TabPanel value="general">
                                                            {!viewOnlyTab.generalViewOnly ? (
                                                                <>
                                                                    <div className="row input-fields">
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    WARRANTY
                                                                                    ID
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    disabled
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="warrantyId"
                                                                                    value={
                                                                                        claimRecordDetail?.warrantyId
                                                                                    }
                                                                                    // value={claimRecordDetail?.claimNumber}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    {/* WARRANTY REQUEST ID */}
                                                                                    CLAIM
                                                                                    REQUEST
                                                                                    ID
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    disabled
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="warrantyRequestId"
                                                                                    value={
                                                                                        claimOrderId
                                                                                    }
                                                                                    // value={claimRecordDetail?.claimNumber}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    DESCRIPTION
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="desc-id"
                                                                                    maxLength={
                                                                                        140
                                                                                    }
                                                                                    value={
                                                                                        generalData.description
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setGeneralData(
                                                                                            {
                                                                                                ...generalData,
                                                                                                description:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <div className="css-w8dmq8">
                                                                                    *Mandatory
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    REFERENCE
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="desc-id"
                                                                                    maxLength={
                                                                                        140
                                                                                    }
                                                                                    value={
                                                                                        generalData.reference
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setGeneralData(
                                                                                            {
                                                                                                ...generalData,
                                                                                                reference:
                                                                                                    e
                                                                                                        .target
                                                                                                        .value,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                />
                                                                                <div className="css-w8dmq8">
                                                                                    *Mandatory
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    <span className=" mr-2">
                                                                                        WARRANTY
                                                                                        REQUEST
                                                                                        DATE
                                                                                    </span>
                                                                                </label>
                                                                                <div className="align-items-center date-box">
                                                                                    <LocalizationProvider
                                                                                        dateAdapter={
                                                                                            AdapterDateFns
                                                                                        }
                                                                                    >
                                                                                        <MobileDatePicker
                                                                                            inputFormat="dd/MM/yyyy"
                                                                                            className="form-controldate border-radius-10"
                                                                                            minDate={
                                                                                                generalData.estimationDate
                                                                                            }
                                                                                            maxDate={
                                                                                                new Date()
                                                                                            }
                                                                                            closeOnSelect
                                                                                            value={
                                                                                                generalData.estimationDate
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                setGeneralData(
                                                                                                    {
                                                                                                        ...generalData,
                                                                                                        estimationDate:
                                                                                                            e,
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            renderInput={(
                                                                                                params
                                                                                            ) => (
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
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    WARRANTY
                                                                                    REQUEST
                                                                                    STATUS
                                                                                </label>
                                                                                <Select
                                                                                    // defaultValue={selectedOption}
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setGeneralData(
                                                                                            {
                                                                                                ...generalData,
                                                                                                warrantyClaimStatus:
                                                                                                    e,
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                    options={
                                                                                        claimStatusOptions
                                                                                    }
                                                                                    value={
                                                                                        generalData.warrantyClaimStatus
                                                                                    }
                                                                                    styles={
                                                                                        FONT_STYLE_SELECT
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="row"
                                                                        style={{
                                                                            justifyContent:
                                                                                "right",
                                                                        }}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-light bg-primary text-white"
                                                                            disabled={
                                                                                !generalData.description ||
                                                                                !generalData.reference
                                                                            }
                                                                            onClick={
                                                                                handleAddUpdateClaimRequest
                                                                            }
                                                                        >
                                                                            Save
                                                                            &
                                                                            Next
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="row mt-3">
                                                                    <ReadOnlyField
                                                                        label="WARRANTY ID"
                                                                        value={
                                                                            claimRecordDetail?.warrantyId
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="CLAIM REQUEST ID"
                                                                        // label="WARRANTY REQUEST ID"
                                                                        // value={generalData.estimationNo}
                                                                        value={
                                                                            claimOrderId
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="DESCRIPTION"
                                                                        value={
                                                                            generalData.description
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="REFERENCE"
                                                                        value={
                                                                            generalData.reference
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="WARRANTY REQUEST DATE"
                                                                        value={
                                                                            "NA"
                                                                        }
                                                                        //   value={<Moment format="DD/MM/YYYY">
                                                                        //   {estimationData.preparedOn}
                                                                        // </Moment>}
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="WARRANTY REQUEST STATUS"
                                                                        value={
                                                                            generalData
                                                                                .warrantyClaimStatus
                                                                                ?.label
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                </div>
                                                            )}
                                                        </TabPanel>
                                                        <TabPanel value="estimation">
                                                            {!viewOnlyTab.estViewOnly ? (
                                                                <>
                                                                    <div className="row input-fields">
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    PREPARED
                                                                                    BY
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        estimationData.preparedBy
                                                                                    }
                                                                                    name="preparedBy"
                                                                                    onChange={
                                                                                        handleEstimationDataChange
                                                                                    }
                                                                                />
                                                                                <div className="css-w8dmq8">
                                                                                    *Mandatory
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                      <label className="text-light-dark font-size-12 font-weight-500">
                                        APPROVED BY
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={estimationData.approvedBy}
                                        name="approvedBy"
                                        onChange={handleEstimationDataChange}
                                      />
                                    </div>
                                  </div> */}
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    PREPARED
                                                                                    ON
                                                                                </label>
                                                                                <div className="align-items-center date-box">
                                                                                    <LocalizationProvider
                                                                                        dateAdapter={
                                                                                            AdapterDateFns
                                                                                        }
                                                                                    >
                                                                                        <MobileDatePicker
                                                                                            inputFormat="dd/MM/yyyy"
                                                                                            className="form-controldate border-radius-10"
                                                                                            // minDate={
                                                                                            //   estimationData.preparedOn
                                                                                            // }
                                                                                            // maxDate={new Date()}
                                                                                            closeOnSelect
                                                                                            value={
                                                                                                estimationData.preparedOn
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                setEstimationData(
                                                                                                    {
                                                                                                        ...estimationData,
                                                                                                        preparedOn:
                                                                                                            e,
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            renderInput={(
                                                                                                params
                                                                                            ) => (
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
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    REVISED
                                                                                    BY
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        estimationData.revisedBy
                                                                                    }
                                                                                    name="revisedBy"
                                                                                    onChange={
                                                                                        handleEstimationDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    REVISED
                                                                                    ON
                                                                                </label>
                                                                                <div className="align-items-center date-box">
                                                                                    <LocalizationProvider
                                                                                        dateAdapter={
                                                                                            AdapterDateFns
                                                                                        }
                                                                                    >
                                                                                        <MobileDatePicker
                                                                                            inputFormat="dd/MM/yyyy"
                                                                                            className="form-controldate border-radius-10"
                                                                                            minDate={
                                                                                                estimationData.revisedOn
                                                                                            }
                                                                                            maxDate={
                                                                                                new Date()
                                                                                            }
                                                                                            closeOnSelect
                                                                                            value={
                                                                                                estimationData.revisedOn
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                setEstimationData(
                                                                                                    {
                                                                                                        ...estimationData,
                                                                                                        revisedOn:
                                                                                                            e,
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            renderInput={(
                                                                                                params
                                                                                            ) => (
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
                                                                    <div
                                                                        className="row"
                                                                        style={{
                                                                            justifyContent:
                                                                                "right",
                                                                        }}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-light bg-primary text-white"
                                                                            disabled={
                                                                                !estimationData.preparedBy ||
                                                                                !estimationData.preparedOn
                                                                            }
                                                                            onClick={
                                                                                handleAddUpdateClaimRequest
                                                                            }
                                                                        >
                                                                            Save
                                                                            &
                                                                            Next
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="row mt-3">
                                                                    <ReadOnlyField
                                                                        label="PREPARED BY"
                                                                        value={
                                                                            estimationData.preparedBy
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    {/* <ReadOnlyField
                                  label="APPROVED BY"
                                  value={estimationData.approvedBy}
                                  className="col-md-4 col-sm-4"
                                /> */}

                                                                    <ReadOnlyField
                                                                        label="PREPARED ON"
                                                                        value={
                                                                            <Moment format="DD/MM/YYYY">
                                                                                {
                                                                                    estimationData.preparedOn
                                                                                }
                                                                            </Moment>
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="REVISED BY"
                                                                        value={
                                                                            estimationData.revisedBy
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="REVISED ON"
                                                                        value={
                                                                            <Moment format="DD/MM/YYYY">
                                                                                {
                                                                                    estimationData.revisedOn
                                                                                }
                                                                            </Moment>
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                </div>
                                                            )}
                                                        </TabPanel>
                                                        <TabPanel value="customer">
                                                            {!viewOnlyTab.custViewOnly ? (
                                                                <>
                                                                    <div className="row input-fields">
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    CUSTOMER
                                                                                    ID
                                                                                </label>
                                                                                <SearchBox
                                                                                    value={
                                                                                        customerData.customerID
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleCustSearch(
                                                                                            "customerId",
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    type="customerId"
                                                                                    result={
                                                                                        searchCustResults
                                                                                    }
                                                                                    onSelect={
                                                                                        handleCustSelect
                                                                                    }
                                                                                    noOptions={
                                                                                        noOptionsCust
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    CUSTOMER
                                                                                    NAME
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={
                                                                                        customerData.customerName
                                                                                    }
                                                                                    name="customerName"
                                                                                    onChange={
                                                                                        handleCustomerDataChange
                                                                                    }
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="customerNameid"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    CONTACT
                                                                                    EMAIL
                                                                                </label>
                                                                                <input
                                                                                    type="email"
                                                                                    value={
                                                                                        customerData.contactEmail
                                                                                    }
                                                                                    name="contactEmail"
                                                                                    onChange={
                                                                                        handleCustomerDataChange
                                                                                    }
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="contatEmail"
                                                                                    aria-describedby="emailHelp"
                                                                                />
                                                                                <div className="css-w8dmq8">
                                                                                    *Mandatory
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    CONTACT
                                                                                    PHONE
                                                                                </label>
                                                                                <input
                                                                                    type="tel"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    onChange={
                                                                                        handleCustomerDataChange
                                                                                    }
                                                                                    value={
                                                                                        customerData.contactPhone
                                                                                    }
                                                                                    name="contactPhone"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="row"
                                                                        style={{
                                                                            justifyContent:
                                                                                "right",
                                                                        }}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-light bg-primary text-white"
                                                                            disabled={
                                                                                !customerData.contactEmail ||
                                                                                noOptionsCust
                                                                            }
                                                                            onClick={
                                                                                handleAddUpdateClaimRequest
                                                                            }
                                                                        >
                                                                            Save
                                                                            &
                                                                            Next
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="row mt-3">
                                                                    <ReadOnlyField
                                                                        label="CUSTOMER ID"
                                                                        value={
                                                                            customerData.customerID
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="CUSTOMER NAME"
                                                                        value={
                                                                            customerData.customerName
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="CUSTOMER EMAIL"
                                                                        value={
                                                                            customerData.contactEmail
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="CONTACT PHONE"
                                                                        value={
                                                                            customerData.contactPhone
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                </div>
                                                            )}
                                                        </TabPanel>
                                                        <TabPanel value="machine">
                                                            {!viewOnlyTab.machineViewOnly ? (
                                                                <>
                                                                    <div className="row input-fields">
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    MAKE
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="make-id"
                                                                                    name="make"
                                                                                    value={
                                                                                        machineData.make
                                                                                    }
                                                                                    onChange={
                                                                                        handleMachineDataChange
                                                                                    }
                                                                                    placeholder="Auto Filled"
                                                                                    disabled
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                      <label className="text-light-dark font-size-12 font-weight-500">
                                        FAMILY
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        id="family-id"
                                        name="family"
                                        value={machineData.family}
                                        onChange={handleMachineDataChange}
                                        placeholder="Auto Filled"
                                        disabled
                                      />
                                    </div>
                                  </div> */}
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    MODEL
                                                                                </label>
                                                                                <SearchBox
                                                                                    value={
                                                                                        machineData.model
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleMachineSearch(
                                                                                            "model",
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    type="model"
                                                                                    result={
                                                                                        searchModelResults
                                                                                    }
                                                                                    onSelect={
                                                                                        handleModelSelect
                                                                                    }
                                                                                    noOptions={
                                                                                        noOptionsModel
                                                                                    }
                                                                                />
                                                                                <div className="css-w8dmq8">
                                                                                    *Mandatory
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    SERIAL
                                                                                    #
                                                                                </label>
                                                                                <SearchBox
                                                                                    value={
                                                                                        machineData.serialNo
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleMachineSearch(
                                                                                            "serialNo",
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    type="equipmentNumber"
                                                                                    result={
                                                                                        searchSerialResults
                                                                                    }
                                                                                    onSelect={
                                                                                        handleModelSelect
                                                                                    }
                                                                                    noOptions={
                                                                                        noOptionsSerial
                                                                                    }
                                                                                />
                                                                                <div className="css-w8dmq8">
                                                                                    *Mandatory
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    SMU
                                                                                    (Service
                                                                                    Meter
                                                                                    Unit)
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    id="smu-id"
                                                                                    name="smu"
                                                                                    value={
                                                                                        machineData.smu
                                                                                    }
                                                                                    onChange={
                                                                                        handleMachineDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 col-sm-6">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    UNIT
                                                                                    NO
                                                                                    /
                                                                                    FLEET
                                                                                    NO
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    onChange={
                                                                                        handleMachineDataChange
                                                                                    }
                                                                                    value={
                                                                                        machineData.fleetNo
                                                                                    }
                                                                                    name="fleetNo"
                                                                                    id="fleet-id"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="row"
                                                                        style={{
                                                                            justifyContent:
                                                                                "right",
                                                                        }}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-light bg-primary text-white"
                                                                            disabled={
                                                                                !(
                                                                                    machineData.model &&
                                                                                    machineData.serialNo
                                                                                ) ||
                                                                                noOptionsModel ||
                                                                                noOptionsSerial
                                                                            }
                                                                            onClick={
                                                                                handleAddUpdateClaimRequest
                                                                            }
                                                                        >
                                                                            Save
                                                                            &
                                                                            Next
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="row mt-3">
                                                                    <ReadOnlyField
                                                                        label="MAKE"
                                                                        value={
                                                                            machineData.make
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    {/* <ReadOnlyField
                                  label="FAMILY"
                                  value={machineData.family}
                                  className="col-md-4 col-sm-4"
                                /> */}
                                                                    <ReadOnlyField
                                                                        label="MODEL"
                                                                        value={
                                                                            machineData.model
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="SERIAL NO"
                                                                        value={
                                                                            machineData.serialNo
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="SMU (Service Meter Unit)"
                                                                        value={
                                                                            machineData.smu
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                    <ReadOnlyField
                                                                        label="UNIT NO / FLEET NO"
                                                                        value={
                                                                            machineData.fleetNo
                                                                        }
                                                                        className="col-md-4 col-sm-4"
                                                                    />
                                                                </div>
                                                            )}
                                                        </TabPanel>
                                                    </TabContext>
                                                </Box>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="assesstement">
                                            {!viewOnlyTab.assesstViewOnly ? (
                                                <>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-2">
                                                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        WARRANTY
                                                                        ID
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            assesstementData.warrantyId
                                                                        }
                                                                        name="warrantyId"
                                                                        placeholder="Warranty ID"
                                                                        onChange={
                                                                            handleAssesstementDataChange
                                                                        }
                                                                        readOnly={
                                                                            true
                                                                        }
                                                                        disabled={
                                                                            true
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        WARRANTY
                                                                        TITLE
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        // value={assesstementData?.warrantyTitle}
                                                                        value={
                                                                            warrantyData?.warrantyTitle
                                                                        }
                                                                        name="warrantyTitle"
                                                                        placeholder="Warranty Title"
                                                                        onChange={
                                                                            handleAssesstementDataChange
                                                                        }
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIM
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.claimNumber
                                                                        }
                                                                        name="claimNumber"
                                                                        placeholder="Claim Number"
                                                                        disabled
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-2">
                                                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        <span className=" mr-2">
                                                                            ASSESSMENT
                                                                            DATE
                                                                        </span>
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    assesstementData.assessmentDate
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleAssesstementSelectDataChange(
                                                                                        e,
                                                                                        "assessmentDate"
                                                                                    )
                                                                                }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        <span className=" mr-2">
                                                                            WARRANTY
                                                                            REQUEST
                                                                            DATE
                                                                        </span>
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    assesstementData.warrantyRequestDate
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleAssesstementSelectDataChange(
                                                                                        e,
                                                                                        "warrantyRequestDate"
                                                                                    )
                                                                                }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        <span className=" mr-2">
                                                                            WARRANTY
                                                                            END
                                                                            DATE
                                                                        </span>
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    warrantyEndDate
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    setWarrantyEndDate(
                                                                                        e
                                                                                    );
                                                                                    handleAssesstementSelectDataChange(
                                                                                        e,
                                                                                        "warrantyEndDate"
                                                                                    );
                                                                                }}
                                                                                // value={assesstementData.warrantyEndDate}
                                                                                // onChange={(e) =>
                                                                                // handleAssesstementSelectDataChange(
                                                                                //   e,
                                                                                //   "warrantyEndDate"
                                                                                // )
                                                                                // }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-2">
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        IS THE
                                                                        MACHINE
                                                                        OR
                                                                        COMPONENT
                                                                        UNDER
                                                                        WARRANTY?
                                                                    </label>
                                                                    <Select
                                                                        className="text-primary"
                                                                        options={
                                                                            underWarrantyOptions
                                                                        }
                                                                        value={
                                                                            assesstementData.machineUnderWarranty
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleAssesstementSelectDataChange(
                                                                                e,
                                                                                "machineUnderWarranty"
                                                                            )
                                                                        }
                                                                        styles={
                                                                            FONT_STYLE_SELECT
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        WHAT
                                                                        TYPE OF
                                                                        WARRANTY
                                                                        ASSESSMENT
                                                                        IS IT?
                                                                    </label>
                                                                    <Select
                                                                        className="text-primary"
                                                                        options={
                                                                            warrantyTypeOptions
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleAssesstementSelectDataChange(
                                                                                e,
                                                                                "assessmentType"
                                                                            )
                                                                        }
                                                                        value={
                                                                            assesstementData.assessmentType
                                                                        }
                                                                        styles={
                                                                            FONT_STYLE_SELECT
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        WHAT IS
                                                                        THE
                                                                        CUSTOMER
                                                                        COMPLAINING
                                                                        ABOUT?
                                                                    </label>
                                                                    <div className="row">
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control border-radius-10 text-primary"
                                                                                value={
                                                                                    assesstementData.complainRow1
                                                                                }
                                                                                name="complainRow1"
                                                                                placeholder="Complaining About the...."
                                                                                onChange={
                                                                                    handleAssesstementDataChange
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control border-radius-10 text-primary"
                                                                                value={
                                                                                    assesstementData.complainRow2
                                                                                }
                                                                                name="complainRow2"
                                                                                placeholder="Complaining About the...."
                                                                                onChange={
                                                                                    handleAssesstementDataChange
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control border-radius-10 text-primary"
                                                                                value={
                                                                                    assesstementData.complainRow3
                                                                                }
                                                                                name="complainRow3"
                                                                                placeholder="Complaining About the...."
                                                                                onChange={
                                                                                    handleAssesstementDataChange
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h5>Assign To</h5>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        FIRST
                                                                        NAME
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        name="assignToFirstName"
                                                                        placeholder="First Name"
                                                                        value={
                                                                            assesstementData.assignToFirstName
                                                                        }
                                                                        onChange={
                                                                            handleAssesstementDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        LAST
                                                                        NAME
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        name="assignToLastName"
                                                                        placeholder="Last Name"
                                                                        value={
                                                                            assesstementData.assignToLastName
                                                                        }
                                                                        onChange={
                                                                            handleAssesstementDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        EMAIL
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        name="assignToEmail"
                                                                        placeholder="Email"
                                                                        value={
                                                                            assesstementData.assignToEmail
                                                                        }
                                                                        onChange={
                                                                            handleAssesstementDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        ROLE
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        name="assignToRole"
                                                                        placeholder="Role"
                                                                        value={
                                                                            assesstementData.assignToRole
                                                                        }
                                                                        onChange={
                                                                            handleAssesstementDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        POSITION
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        name="assignToPosition"
                                                                        placeholder="Position"
                                                                        value={
                                                                            assesstementData.assignToPosition
                                                                        }
                                                                        onChange={
                                                                            handleAssesstementDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="row mx-1"
                                                        style={{
                                                            justifyContent:
                                                                "right",
                                                        }}
                                                    >
                                                        <button
                                                            type="button"
                                                            className="btn btn-light bg-primary text-white"
                                                            onClick={
                                                                handleAddUpdateAssesstment
                                                            }
                                                        >
                                                            Save & Next
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row mt-3">
                                                            <ReadOnlyField
                                                                label="WARRANTY ID"
                                                                value={
                                                                    claimRecordDetail?.warrantyId
                                                                }
                                                                className="col-md-4 col-sm-4"
                                                            />
                                                            <ReadOnlyField
                                                                label="WARRANTY TITLE"
                                                                value={
                                                                    warrantyData?.warrantyTitle
                                                                }
                                                                // value={assesstementData?.warrantyTitle}
                                                                className="col-md-4 col-sm-4"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM NUMBER"
                                                                value={
                                                                    claimRecordData.claimNumber
                                                                }
                                                                className="col-md-4 col-sm-4"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row mt-3">
                                                            <ReadOnlyField
                                                                label="ASSESSMENT DATE"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            assesstementData.assessmentDate
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-4 col-sm-4"
                                                            />
                                                            <ReadOnlyField
                                                                label="WARRANTY REQUEST DATE"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            assesstementData.warrantyRequestDate
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-4 col-sm-4"
                                                            />
                                                            <ReadOnlyField
                                                                label="WARRANTY END DATE"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            assesstementData.warrantyEndDate
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-4 col-sm-4"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row mt-3">
                                                            <ReadOnlyField
                                                                label="IS THE MACHINE OR COMPONENT UNDER WARRANTY?"
                                                                value={
                                                                    assesstementData
                                                                        .machineUnderWarranty
                                                                        ?.label
                                                                }
                                                                className="col-md-6 col-sm-6"
                                                            />
                                                            <ReadOnlyField
                                                                label="WHAT TYPE OF WARRANTY ASSESSMENT IS IT?"
                                                                value={
                                                                    assesstementData
                                                                        .assessmentType
                                                                        ?.label
                                                                }
                                                                className="col-md-6 col-sm-6"
                                                            />
                                                            <ReadOnlyField
                                                                label="WHAT IS THE CUSTOMER COMPLAINING ABOUT?"
                                                                value={
                                                                    assesstementData.complainRow1
                                                                }
                                                                className="col-md-12 col-sm-12"
                                                            />
                                                            <ReadOnlyField
                                                                label=""
                                                                value={
                                                                    assesstementData.complainRow2
                                                                }
                                                                className="col-md-12 col-sm-12"
                                                            />
                                                            <ReadOnlyField
                                                                label=""
                                                                value={
                                                                    assesstementData.complainRow2
                                                                }
                                                                className="col-md-12 col-sm-12"
                                                            />
                                                        </div>
                                                    </div>
                                                    <h5>Assign To</h5>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row mt-3">
                                                            <ReadOnlyField
                                                                label="FIRST NAME"
                                                                value={
                                                                    assesstementData.assignToFirstName
                                                                }
                                                                className="col-md-6 col-sm-6"
                                                            />
                                                            <ReadOnlyField
                                                                label="LAST NAME"
                                                                value={
                                                                    assesstementData.assignToLastName
                                                                }
                                                                className="col-md-6 col-sm-6"
                                                            />
                                                            <ReadOnlyField
                                                                label="EMAIL"
                                                                value={
                                                                    assesstementData.assignToEmail
                                                                }
                                                                className="col-md-12 col-sm-12"
                                                            />
                                                            <ReadOnlyField
                                                                label="ROLE"
                                                                value={
                                                                    assesstementData.assignToRole
                                                                }
                                                                className="col-md-6 col-sm-6"
                                                            />
                                                            <ReadOnlyField
                                                                label="POSITION"
                                                                value={
                                                                    assesstementData.assignToPosition
                                                                }
                                                                className="col-md-6 col-sm-6"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </TabPanel>
                                        <TabPanel value="evaluation">
                                            <div className="card border">
                                                <Box
                                                    className="mt-0"
                                                    sx={{
                                                        width: "100%",
                                                        typography: "body1",
                                                    }}
                                                >
                                                    <TabContext
                                                        value={
                                                            evaluationTabValue
                                                        }
                                                    >
                                                        <Box
                                                            sx={{
                                                                borderBottom: 1,
                                                                borderColor:
                                                                    "divider",
                                                                backgroundColor:
                                                                    "#f8f8f8",
                                                            }}
                                                        >
                                                            <TabList
                                                                className="custom-tabs-div"
                                                                onChange={(
                                                                    e,
                                                                    value
                                                                ) =>
                                                                    setEvaluationTabValue(
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <Tab
                                                                    label="Details"
                                                                    value={
                                                                        "evaluationDetails"
                                                                    }
                                                                />
                                                                <Tab
                                                                    label="Part Reports"
                                                                    value={
                                                                        "evaluationPartReport"
                                                                    }
                                                                />
                                                            </TabList>
                                                        </Box>
                                                        <TabPanel value="evaluationDetails">
                                                            <div className="card px-3 py-3 border">
                                                                <div className="row input-fields">
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                                HAS
                                                                                THE
                                                                                CUSTOMER
                                                                                FOLLOWED
                                                                                THE
                                                                                SAFETY
                                                                                REGULATIONS
                                                                                IN
                                                                                THE
                                                                                MANUAL?
                                                                                {/* Has the customer followed the safety
                                  regulations in the manual? */}
                                                                            </label>
                                                                            <Select
                                                                                className="text-primary"
                                                                                options={
                                                                                    questionsOptions
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleEvaluationDeatilsSelectDataChange(
                                                                                        e,
                                                                                        `question1`
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    evaluationDetailsData.question1
                                                                                }
                                                                                styles={
                                                                                    FONT_STYLE_SELECT
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                                HAS
                                                                                THE
                                                                                OPERATOR
                                                                                FOLLOWED
                                                                                PRODUCT
                                                                                INSTUCTIONS
                                                                                CAREFULLY?
                                                                                {/* Has the operator followed product
                                  instructions carefully? */}
                                                                            </label>
                                                                            <Select
                                                                                className="text-primary"
                                                                                options={
                                                                                    questionsOptions
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleEvaluationDeatilsSelectDataChange(
                                                                                        e,
                                                                                        `question2`
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    evaluationDetailsData.question2
                                                                                }
                                                                                styles={
                                                                                    FONT_STYLE_SELECT
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                                HAVE
                                                                                EXTERNAL
                                                                                FORCES
                                                                                DAMAGED
                                                                                THE
                                                                                MACHINE/COMPONENT?
                                                                                {/* Have external forces damaged the
                                  machine/component? */}
                                                                            </label>
                                                                            <Select
                                                                                className="text-primary"
                                                                                options={
                                                                                    questionsOptions
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleEvaluationDeatilsSelectDataChange(
                                                                                        e,
                                                                                        `question3`
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    evaluationDetailsData.question3
                                                                                }
                                                                                styles={
                                                                                    FONT_STYLE_SELECT
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                                IS
                                                                                IT
                                                                                A
                                                                                KNOWN
                                                                                PRODUCT
                                                                                DEFECT?
                                                                                OR
                                                                                HAS
                                                                                THE
                                                                                ISSUE
                                                                                APPEARED
                                                                                BEFORE?
                                                                                {/* Is it a known product defect? or Has the
                                  issue appeared before? */}
                                                                            </label>
                                                                            <Select
                                                                                className="text-primary"
                                                                                options={
                                                                                    questionsOptions
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleEvaluationDeatilsSelectDataChange(
                                                                                        e,
                                                                                        `question4`
                                                                                    )
                                                                                }
                                                                                value={
                                                                                    evaluationDetailsData.question4
                                                                                }
                                                                                styles={
                                                                                    FONT_STYLE_SELECT
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="text-light-dark font-size-14 font-weight-500">
                                                                                WHAT
                                                                                IS
                                                                                THE
                                                                                CAUSES?
                                                                                {/* What is the causes? */}
                                                                            </label>
                                                                            <textarea
                                                                                className="form-control border-radius-10 text-primary"
                                                                                name="causes"
                                                                                cols="30"
                                                                                rows="2"
                                                                                value={
                                                                                    evaluationDetailsData.question5
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setEvaluationDetailsData(
                                                                                        {
                                                                                            ...evaluationDetailsData,
                                                                                            question5:
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                        }
                                                                                    )
                                                                                }
                                                                                placeholder="causes"
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                                                        <div className="form-group">
                                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                                WHAT
                                                                                ARE
                                                                                THE
                                                                                CORRECTIVE
                                                                                ACTIONS
                                                                                TAKEN?
                                                                                {/* What are the corrective actions taken? */}
                                                                            </label>
                                                                            <textarea
                                                                                className="form-control border-radius-10 text-primary"
                                                                                name="correctiveActions"
                                                                                cols="30"
                                                                                rows="2"
                                                                                value={
                                                                                    evaluationDetailsData.question6
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setEvaluationDetailsData(
                                                                                        {
                                                                                            ...evaluationDetailsData,
                                                                                            question6:
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                        }
                                                                                    )
                                                                                }
                                                                                placeholder="Actions"
                                                                            ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h5>
                                                                Evaluated By
                                                            </h5>
                                                            <div className="card border px-3 py-3">
                                                                {!viewOnlyTab.evaluViewOnly ? (
                                                                    <div className="row input-fields">
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    FIRST
                                                                                    NAME
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        evaluatedByData.evaluatedByFirstName
                                                                                    }
                                                                                    name="evaluatedByFirstName"
                                                                                    placeholder="First Name"
                                                                                    onChange={
                                                                                        handleEvaluationByDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    LAST
                                                                                    NAME
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        evaluatedByData.evaluatedByLastName
                                                                                    }
                                                                                    name="evaluatedByLastName"
                                                                                    placeholder="Last Name"
                                                                                    onChange={
                                                                                        handleEvaluationByDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    EMAIL
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        evaluatedByData.evaluatedByEmail
                                                                                    }
                                                                                    name="evaluatedByEmail"
                                                                                    placeholder="Email"
                                                                                    onChange={
                                                                                        handleEvaluationByDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    ROLE
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        evaluatedByData.evaluatedByRole
                                                                                    }
                                                                                    name="evaluatedByRole"
                                                                                    placeholder="Role"
                                                                                    onChange={
                                                                                        handleEvaluationByDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    POSITION
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        evaluatedByData.evaluatedByPosition
                                                                                    }
                                                                                    name="evaluatedByPosition"
                                                                                    placeholder="Position"
                                                                                    onChange={
                                                                                        handleEvaluationByDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    EVALUATED
                                                                                    ON
                                                                                </label>
                                                                                <div className="align-items-center date-box">
                                                                                    <LocalizationProvider
                                                                                        dateAdapter={
                                                                                            AdapterDateFns
                                                                                        }
                                                                                    >
                                                                                        <MobileDatePicker
                                                                                            inputFormat="dd/MM/yyyy"
                                                                                            className="form-controldate border-radius-10"
                                                                                            // maxDate={new Date()}
                                                                                            closeOnSelect
                                                                                            value={
                                                                                                evaluatedByData.evaluatedOn
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                setEvaluatedByData(
                                                                                                    {
                                                                                                        ...evaluatedByData,
                                                                                                        evaluatedOn:
                                                                                                            e,
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            renderInput={(
                                                                                                params
                                                                                            ) => (
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
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    CHANGED
                                                                                    BY
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control border-radius-10 text-primary"
                                                                                    value={
                                                                                        evaluatedByData.evaluationChangedBy
                                                                                    }
                                                                                    name="evaluationChangedBy"
                                                                                    placeholder="Chnaged By"
                                                                                    onChange={
                                                                                        handleEvaluationByDataChange
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                            <div className="form-group">
                                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                                    CHANGED
                                                                                    ON
                                                                                </label>
                                                                                <div className="align-items-center date-box">
                                                                                    <LocalizationProvider
                                                                                        dateAdapter={
                                                                                            AdapterDateFns
                                                                                        }
                                                                                    >
                                                                                        <MobileDatePicker
                                                                                            inputFormat="dd/MM/yyyy"
                                                                                            className="form-controldate border-radius-10"
                                                                                            // maxDate={new Date()}
                                                                                            closeOnSelect
                                                                                            value={
                                                                                                evaluatedByData.evaluationChangedOn
                                                                                            }
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                setEvaluatedByData(
                                                                                                    {
                                                                                                        ...evaluatedByData,
                                                                                                        evaluationChangedOn:
                                                                                                            e,
                                                                                                    }
                                                                                                )
                                                                                            }
                                                                                            renderInput={(
                                                                                                params
                                                                                            ) => (
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
                                                                ) : (
                                                                    <div className="row mt-2">
                                                                        <ReadOnlyField
                                                                            label="FIRST NAME"
                                                                            value={
                                                                                evaluatedByData.evaluatedByFirstName
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                        <ReadOnlyField
                                                                            label="LAST NAME"
                                                                            value={
                                                                                evaluatedByData.evaluatedByLastName
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                        <ReadOnlyField
                                                                            label="EMAIL"
                                                                            value={
                                                                                evaluatedByData.evaluatedByEmail
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                        <ReadOnlyField
                                                                            label="ROLE"
                                                                            value={
                                                                                evaluatedByData.evaluatedByRole
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                        <ReadOnlyField
                                                                            label="POSITION"
                                                                            value={
                                                                                evaluatedByData.evaluatedByPosition
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                        <ReadOnlyField
                                                                            label="EVALUATED ON"
                                                                            value={
                                                                                <Moment format="DD/MM/YYYY">
                                                                                    {
                                                                                        evaluatedByData.evaluatedOn
                                                                                    }
                                                                                </Moment>
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                        <ReadOnlyField
                                                                            label="CHANGED BY"
                                                                            value={
                                                                                evaluatedByData.evaluationChangedBy
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                        <ReadOnlyField
                                                                            label="CHANGED ON"
                                                                            value={
                                                                                <Moment format="DD/MM/YYYY">
                                                                                    {
                                                                                        evaluatedByData.evaluationChangedOn
                                                                                    }
                                                                                </Moment>
                                                                            }
                                                                            className="col-md-3 col-sm-3"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div
                                                                className="row"
                                                                style={{
                                                                    justifyContent:
                                                                        "right",
                                                                }}
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light bg-primary text-white"
                                                                    onClick={
                                                                        handleAddUpdateEvaluation
                                                                    }
                                                                >
                                                                    Save & Next
                                                                </button>
                                                            </div>
                                                        </TabPanel>
                                                        <TabPanel value="evaluationPartReport">
                                                            <EvaluationPartReport
                                                                handleSnack={
                                                                    handleSnack
                                                                }
                                                                title="Failed Part Table"
                                                                partsRecord={
                                                                    partsFailedRecord
                                                                }
                                                                setPartsRecord={
                                                                    setPartsFailedRecord
                                                                }
                                                                claimOrderId={
                                                                    claimOrderId
                                                                }
                                                                evaluationId={
                                                                    evaluationId
                                                                }
                                                                isFailedPart={
                                                                    true
                                                                }
                                                                handleEvaluationPartsReturn={
                                                                    handleEvaluationPartsReturn
                                                                }
                                                            />
                                                            <EvaluationPartReport
                                                                handleSnack={
                                                                    handleSnack
                                                                }
                                                                title="Causal Part Table"
                                                                partsRecord={
                                                                    partsCausalRecord
                                                                }
                                                                setPartsRecord={
                                                                    setPartsCausalRecord
                                                                }
                                                                claimOrderId={
                                                                    claimOrderId
                                                                }
                                                                evaluationId={
                                                                    evaluationId
                                                                }
                                                                isFailedPart={
                                                                    false
                                                                }
                                                                handleEvaluationPartsReturn={
                                                                    handleEvaluationPartsReturn
                                                                }
                                                            />
                                                            {/* <EvaluationPartReport
                              handleSnack={handleSnack}
                              title="Causal Part Table"
                            /> */}
                                                            {/* <div className="card border px-3 py-2">
                              <div className="row d-flex justify-content-between align-items-center ">
                                <h4 className="mx-3">Failed Part</h4>
                                <button
                                  className="btn btn-primary mx-3"
                                  onClick={() => handleCreateNewPart(false)}
                                >
                                  + Add New
                                </button>
                              </div>
                              <Box
                                sx={{
                                  height: 300,
                                  marginBottom: 1,
                                  marginTop: 1,
                                  marginInline: 0,
                                  paddingBottom: 1,
                                }}
                              >
                                <DataGrid
                                  sx={GRID_STYLE}
                                  getRowId={(row) => row.index}
                                  columns={partsColumns}
                                  rows={partsFailedRecord}
                                  rowsPerPageOptions={[10, 20, 50]}
                                />
                              </Box>
                            </div> */}
                                                            {/* <div className="card border px-3 py-2 mt-4">
                              <div className="row d-flex justify-content-between align-items-center ">
                                <h4 className="mx-3">Causal Part</h4>
                                <button
                                  className="btn btn-primary mx-3"
                                  onClick={() => handleCreateNewPart(true)}
                                >
                                  + Add New
                                </button>
                              </div>
                              <Box
                                sx={{
                                  height: 300,
                                  marginBottom: 1,
                                  marginTop: 1,
                                  marginInline: 0,
                                  paddingBottom: 1,
                                }}
                              >
                                <DataGrid
                                  sx={GRID_STYLE}
                                  getRowId={(row) => row.index}
                                  columns={partsColumns}
                                  rows={partsCausalRecord}
                                  rowsPerPageOptions={[10, 20, 50]}
                                />
                              </Box>
                            </div> */}
                                                            <div className="Add-new-segment-div p-3 border-radius-10 mt-4">
                                                                <div class="repairbtn-dropdown">
                                                                    <button
                                                                        className="btn bg-primary text-white ml-2 dropbtn"
                                                                        onClick={
                                                                            handleWarrantyAccpeted
                                                                        }
                                                                    >
                                                                        Warranty
                                                                        Accepted
                                                                    </button>
                                                                    <button
                                                                        className="btn warranty-reject-btn text-white ml-2 dropbtn"
                                                                        // onClick={handleShowWarrantyCoverage}
                                                                        onClick={
                                                                            handleWarrantyRejected
                                                                        }
                                                                    >
                                                                        Warranty
                                                                        Rejected
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </TabPanel>
                                                    </TabContext>
                                                </Box>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value="claim">
                                            {!viewOnlyTab.claimViewOnly ? (
                                                <>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-2">
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIMENT
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            "PARTNER"
                                                                        }
                                                                        disabled
                                                                        // value={claimRecordData.claimNumber}
                                                                        // name="claiment"
                                                                        placeholder="Claiment"
                                                                        // onChange={handleClaimRecordDataChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIM
                                                                        REQUEST
                                                                        ID
                                                                        {/* WARRANTY REQUEST ID */}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.claimOrderId
                                                                        }
                                                                        placeholder="Claiment"
                                                                        disabled={
                                                                            true
                                                                        }
                                                                        // name="claiment"
                                                                        // onChange={handleClaimRecordDataChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        PARTNER
                                                                        NAME
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        // value={claimRecordData?.customerName}
                                                                        value={
                                                                            "KOOLAN IRON ORE PTY LTD"
                                                                        }
                                                                        disabled
                                                                        name="partnerName"
                                                                        placeholder="Partner Name"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIM
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.claimNumber
                                                                        }
                                                                        name="claimNumber"
                                                                        placeholder="Claim Number"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        EQUIPMENT
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.equipmentNumber
                                                                        }
                                                                        name="equipmentNumber"
                                                                        placeholder="Equipment Number"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        SERIAL
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.serialNumber
                                                                        }
                                                                        name="serialNumber"
                                                                        placeholder="Serial Number"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        WARRANTY
                                                                        ID
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.warrantyId
                                                                        }
                                                                        name="warrantyId"
                                                                        placeholder="Warranty Id"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        MODEL
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.modelNumber
                                                                        }
                                                                        name="modelNumber"
                                                                        placeholder="Model Number"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-2">
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <FormGroup>
                                                                        <FormControlLabel
                                                                            style={{
                                                                                alignItems:
                                                                                    "start",
                                                                                marginLeft: 0,
                                                                            }}
                                                                            control={
                                                                                <Switch
                                                                                    checked={
                                                                                        claimRecordData.replacement
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setClaimRecordData(
                                                                                            {
                                                                                                ...claimRecordData,
                                                                                                replacement:
                                                                                                    e
                                                                                                        .target
                                                                                                        .checked,
                                                                                            }
                                                                                        )
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
                                                                        COMPONENT
                                                                        CODE
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.componentCode
                                                                        }
                                                                        name="componentCode"
                                                                        placeholder="Component Code"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        COMPONENT
                                                                        SERIAL
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData?.componentSerialNumber
                                                                        }
                                                                        name="componentSerialNumber"
                                                                        placeholder="Component Serial Number"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        PART
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData?.partNumber
                                                                        }
                                                                        name="partNumber"
                                                                        placeholder="Part Number"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-2">
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIM
                                                                        TYPE
                                                                    </label>
                                                                    <Select
                                                                        className="text-primary"
                                                                        options={
                                                                            claimTypeOptions
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleClaimRecordSelectDataChange(
                                                                                e,
                                                                                "claimType"
                                                                            )
                                                                        }
                                                                        value={
                                                                            claimRecordData.claimType
                                                                        }
                                                                        styles={
                                                                            FONT_STYLE_SELECT
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIM
                                                                        STATUS
                                                                    </label>
                                                                    <Select
                                                                        className="text-primary"
                                                                        options={
                                                                            claimStatusOptions
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleClaimRecordSelectDataChange(
                                                                                e,
                                                                                "claimStatus"
                                                                            )
                                                                        }
                                                                        value={
                                                                            claimRecordData.claimStatus
                                                                        }
                                                                        styles={
                                                                            FONT_STYLE_SELECT
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIM
                                                                        APPROVER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimRecordData.claimApprover
                                                                        }
                                                                        name="claimApprover"
                                                                        placeholder="Claim Approver"
                                                                        onChange={
                                                                            handleClaimRecordDataChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        RMA TYPE
                                                                    </label>
                                                                    <Select
                                                                        className="text-primary"
                                                                        options={
                                                                            rmaTypeOptions
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setClaimOrderData(
                                                                                {
                                                                                    ...claimOrderData,
                                                                                    rmaType:
                                                                                        e,
                                                                                }
                                                                            )
                                                                        }
                                                                        value={
                                                                            claimOrderData.rmaType
                                                                        }
                                                                        styles={
                                                                            FONT_STYLE_SELECT
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        RMA
                                                                        REASON
                                                                    </label>
                                                                    <Select
                                                                        className="text-primary"
                                                                        options={
                                                                            rmaResonOptions
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setClaimOrderData(
                                                                                {
                                                                                    ...claimOrderData,
                                                                                    rmaReason:
                                                                                        e,
                                                                                }
                                                                            )
                                                                        }
                                                                        value={
                                                                            claimOrderData.rmaReason
                                                                        }
                                                                        styles={
                                                                            FONT_STYLE_SELECT
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        RMA
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        name="rmaNumber"
                                                                        placeholder="RMA Number"
                                                                        value={
                                                                            claimOrderData.rmaNumber
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setClaimOrderData(
                                                                                {
                                                                                    ...claimOrderData,
                                                                                    rmaNumber:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-4">
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        FAILURE
                                                                        DATE
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    claimRecordData.failDate
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleClaimRecordSelectDataChange(
                                                                                        e,
                                                                                        "failDate"
                                                                                    )
                                                                                }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                                        REPAIR
                                                                        DATE
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    claimRecordData?.repairDate
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleClaimRecordSelectDataChange(
                                                                                        e,
                                                                                        "repairDate"
                                                                                    )
                                                                                }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                                        CREATED
                                                                        DATE
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    claimRecordData.createdDate
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleClaimRecordSelectDataChange(
                                                                                        e,
                                                                                        "createdDate"
                                                                                    )
                                                                                }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                                        CLOSED
                                                                        DATE
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    claimRecordData.closedDate
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleClaimRecordSelectDataChange(
                                                                                        e,
                                                                                        "closedDate"
                                                                                    )
                                                                                }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                                        APPROVED/REJECTED
                                                                        ON
                                                                    </label>
                                                                    <div className="align-items-center date-box">
                                                                        <LocalizationProvider
                                                                            dateAdapter={
                                                                                AdapterDateFns
                                                                            }
                                                                        >
                                                                            <MobileDatePicker
                                                                                inputFormat="dd/MM/yyyy"
                                                                                className="form-controldate border-radius-10"
                                                                                // maxDate={new Date()}
                                                                                closeOnSelect
                                                                                value={
                                                                                    claimRecordData.appoverRejectedOn
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    handleClaimRecordSelectDataChange(
                                                                                        e,
                                                                                        "appoverRejectedOn"
                                                                                    )
                                                                                }
                                                                                renderInput={(
                                                                                    params
                                                                                ) => (
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
                                                </>
                                            ) : (
                                                <>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-4">
                                                            <ReadOnlyField
                                                                label="CLAIMENT"
                                                                value={
                                                                    "PARTNER"
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM REQUEST ID"
                                                                // label="WARRANTY REQUEST ID"
                                                                value={
                                                                    claimRecordData.claimOrderId
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="PARTNER NAME"
                                                                value={
                                                                    "KOOLAN IRON ORE PTY LTD"
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM NUMBER"
                                                                value={
                                                                    claimRecordData.claimNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="EQUIPMENT NUMBER"
                                                                value={
                                                                    claimRecordData.equipmentNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="SERIAL NUMBER"
                                                                value={
                                                                    claimRecordData.serialNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="WARRANTY ID"
                                                                value={
                                                                    claimRecordData.warrantyId
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="MODEL NUMBER"
                                                                value={
                                                                    claimRecordData.modelNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-4">
                                                            <ReadOnlyField
                                                                label="REPLACEMENT"
                                                                value={
                                                                    claimRecordData.replacement
                                                                        ? "YES"
                                                                        : "NO"
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="COMPONENT CODE"
                                                                value={
                                                                    claimRecordData.componentCode
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="COMPONENT SERIAL NUMBER"
                                                                value={
                                                                    claimRecordData?.componentSerialNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="PART NUMBER"
                                                                value={
                                                                    claimRecordData?.partNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-4">
                                                            <ReadOnlyField
                                                                label="CLAIM TYPE"
                                                                value={
                                                                    claimRecordData
                                                                        .claimType
                                                                        ?.label
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM STATUS"
                                                                value={
                                                                    claimRecordData
                                                                        .claimStatus
                                                                        ?.label
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM APPROVER"
                                                                value={
                                                                    claimRecordData.claimApprover
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="RMA TYPE"
                                                                value={
                                                                    claimOrderData
                                                                        .rmaType
                                                                        ?.label
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="RMA REASON"
                                                                value={
                                                                    claimOrderData
                                                                        .rmaReason
                                                                        ?.label
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="RMA NUMBER"
                                                                value={
                                                                    claimOrderData.claimNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="card border px-3 py-2 mb-3">
                                                        <div className="row input-fields mt-4">
                                                            <ReadOnlyField
                                                                label="FAILURE DATE"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            claimRecordData.failDate
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="REPAIR DATE"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            claimRecordData?.repairDate
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CREATED DATE"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            claimRecordData.createdDate
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLOSED DATE"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            claimRecordData.closedDate
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="APPROVED/REJECTED ON"
                                                                value={
                                                                    <Moment format="DD/MM/YYYY">
                                                                        {
                                                                            claimRecordData.appoverRejectedOn
                                                                        }
                                                                    </Moment>
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {showValidateWarnMsg && (
                                                <span
                                                    className="mb-0 font-size-14 cursor"
                                                    style={{ color: "#ef9429" }}
                                                    onClick={() =>
                                                        setOpenValidateClaimErrModal(
                                                            true
                                                        )
                                                    }
                                                >
                                                    Validated with 1 Warning!
                                                </span>
                                            )}
                                            <div className="Add-new-segment-div p-3 border-radius-10 mt-2">
                                                <div class="repairbtn-dropdown">
                                                    <button
                                                        className="btn bg-primary text-white ml-2 dropbtn"
                                                        // onClick={() => setShowValidateWarnMsg(true)}
                                                        onClick={() =>
                                                            handleChangeUpperTabs(
                                                                "realtedServiceEstimate"
                                                            )
                                                        }
                                                    >
                                                        Go To Parts & Expenses
                                                    </button>
                                                    <button
                                                        className="btn bg-primary text-white ml-2 dropbtn"
                                                        //   onClick={
                                                        //       handleCreateERPOrder
                                                        //   }
                                                        onClick={
                                                            handleSvaeClaiOrderChanges
                                                        }
                                                    >
                                                        {/* Create ERP Order */}
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </TabContext>
                                )}

                                {activeUpperTabs === "adjustPrice" && (
                                    <ClaimAdjustPrice
                                        handleSnack={handleSnack}
                                        handleBack={handleBackToRequestTab}
                                        claimValueId={claimValueId}
                                        setClaimValueId={setClaimValueId}
                                        claimOrderId={claimOrderId}
                                        relatedPartsRecords={
                                            relatedPartsRecords
                                        }
                                        setCoverageTypeValue={
                                            setCoverageTypeValue
                                        }
                                    />
                                )}

                                {activeUpperTabs === "realtedPartList" && (
                                    <ClaimRelatedPartList
                                        partsColumns={partsColumns}
                                        handleBack={handleBackToRequestTab}
                                        handleSnack={handleSnack}
                                        records={[
                                            ...partsFailedRecord,
                                            ...partsCausalRecord,
                                        ]}
                                        relatedPartsRecords={
                                            relatedPartsRecords
                                        }
                                        setRelatedPartsRecords={
                                            setRelatedPartsRecords
                                        }
                                        relatedPartsId={relatedPartsId}
                                        setRelatedPartsId={setRelatedPartsId}
                                        claimOrderId={claimOrderId}
                                        handleEvaluationPartsReturn={
                                            handleEvaluationPartsReturn
                                        }
                                    />
                                )}
                                {activeUpperTabs ===
                                    "realtedServiceEstimate" && (
                                    <ClaimRelatedHoursAndExpenses
                                        handleBack={handleBackToRequestTab}
                                        handleSnack={handleSnack}
                                        relatedHEId={relatedHEId}
                                        setRelatedHEId={setRelatedHEId}
                                        claimOrderId={claimOrderId}
                                        claimNumber={claimNumber}
                                        coverageTypeValue={coverageTypeValue}
                                        relatedPartsId={relatedPartsId}
                                        setRelatedPartsId={setRelatedPartsId}
                                    />
                                )}

                                {activeUpperTabs === "splitPrice" && (
                                    <ClaimSettlement
                                        handleBack={handleBackToRequestTab}
                                        handleSnack={handleSnack}
                                        settlementValueId={settlementValueId}
                                        setSettlementValueId={
                                            setSettlementValueId
                                        }
                                        claimOrderId={claimOrderId}
                                        claimNumber={claimNumber}
                                    />
                                )}
                                {activeUpperTabs === "addNotes" && (
                                    <ClaimAddNotes
                                        handleBack={handleBackToRequestTab}
                                        handleSnack={handleSnack}
                                    />
                                )}
                            </Box>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

            {openPartCreateModal && (
                <ClaimPartCreateModal
                    show={openPartCreateModal}
                    hideModal={handleShowPartCreateModal}
                    handleSnack={handleSnack}
                    setNewPartRecord={
                        reportTypeCausal
                            ? setPartsCausalRecord
                            : setPartsFailedRecord
                    }
                />
            )}

            {openValidateClaimErrModal && (
                <ValidateClaimModal
                    show={openValidateClaimErrModal}
                    hideModal={() => setOpenValidateClaimErrModal(false)}
                    handleSnack={handleSnack}
                />
            )}
        </>
    );
};

export default ClaimRequestModal;

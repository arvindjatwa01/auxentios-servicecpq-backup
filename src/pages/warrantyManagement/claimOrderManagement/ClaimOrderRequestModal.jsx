import React, { useContext, useEffect, useState } from "react";

import deleteIcon from "../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../assets/icons/svg/Copy.svg";

import DateRangeIcon from "@mui/icons-material/DateRange";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Divider, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";

import Select from "react-select";
import Moment from "react-moment";
import { Modal } from "react-bootstrap";

import {
    claimAssessmentRequestObj,
    claimOrderRequestObj,
    claimRelatedHERequestObj,
    claimRequestObj,
    claimRequestTypeOptions,
    claimSettlementRequestObj,
    claimStatusOptions,
    claimValueRequestObj,
    claimVersionOptions,
    evaluationRequestObj,
    questionsOptions,
    rmaResonOptions,
    rmaTypeOptions,
    underWarrantyOptions,
    warrantyTypeOptions,
} from "../warrantyManagementConstants";

import { isEmpty } from "pages/Common/textUtilities";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { customerSearch, machineSearch } from "services/searchServices";
import SearchBox from "pages/Common/SearchBox";

import ClaimOrderDetails from "./ClaimOrderDetails";
import AssessmentDetails from "./AssessmentDetails";
import EvaluationDetails from "./EvaluationDetails";
import {
    CLAIM_MASTER_URL,
    CLAIM_ORDER_MASTER_URL,
    EVALUATION_PARTS_MASTER_URL,
    RELATED_PARTS_MASTER_URL,
    WARRANTY_ASSESSMENT_MASTER_URL,
    WARRANTY_EVALUATION_MASTER_URL,
} from "services/CONSTANTS";
import RelatedPartsAndExpenses from "./RelatedPartsAndExpenses";
import AdjustClaimValue from "./AdjustClaimValue";
import Settlement from "./Settlement";
import ClaimAddNotes from "../claimMaster/ClaimAddNotes";
import ClaimPartCreateModal from "../claimMaster/ClaimPartCreateModal";
import ValidateClaimModal from "../claimMaster/ValidateClaimModal";
import Swal from "sweetalert2";

const climentOpt = [{ label: "Partner", value: "CHANNEL_PARTNER" }];

const coverageTypeOptions = [
    { label: "All Covered", value: "CT_04" },
    { label: "Parts & Labour", value: "CT_01" },
    { label: "Only Parts", value: "CT_02" },
    { label: "Part & Labour & Misc.", value: "CT_03" },
];

const priceTypeOptions = [
    { label: "Claimed", value: "CLAIMED" },
    { label: "Settled", value: "SETTLED" },
];

const auth = { customerId: "", customerName: "" };
const ClaimOrderRequestModal = (props) => {
    const {
        show,
        hideModal,
        handleSnack,
        claimRecordId,
        claimOrderId,
        setClaimOrderId,
        evaluationId,
        setEvaluationId,
        assesstmentId,
        setAssesstmentId,
        openPartCreateModal,
        handleShowPartCreateModal,
        handleShowReturnRequetrModal,
        byAuthCode = true,
        equipmentRowData = null,
        isEquipment = false,
    } = props;

    const [openActionMenu, setOpenActionMenu] = useState(false);
    const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
    const [activeTopTab, setActiveTopTab] = useState("");
    const [requestTab, setRequestTab] = useState("returnDetails");
    const [returnDetailsTab, setReturnDetailsTab] = useState("general");

    const [claimRecordData, setClaimRecordData] = useState({
        ...claimRequestObj,
    });
    const [claimOrderData, setClaimOrderData] = useState({
        ...claimOrderRequestObj,
    });

    const [claimOrderVersion, setClaimOrderVersion] = useState(
        claimVersionOptions[0]
    );
    const [viewOnlyTab, setViewOnlyTab] = useState({
        generalViewOnly: false,
        estViewOnly: false,
        custViewOnly: false,
        machineViewOnly: false,
        assesstViewOnly: false,
        evaluViewOnly: false,
        claimViewOnly: false,
    });
    const [assesstTabViewOnly, setAssesstTabViewOnly] = useState(false);
    const [evaluTabViewOnly, setEvaluTabViewOnly] = useState(false);

    const [claimStatus, setClaimStatus] = useState(claimStatusOptions[0]);
    const [claimType, setClaimType] = useState(claimRequestTypeOptions[0]);
    const [claimNumber, setClaimNumber] = useState(null);
    const [generalData, setGeneralData] = useState({
        claimRequestDate: new Date(),
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

    const [machineData, setMachineData] = useState({
        make: "",
        model: "",
        serialNo: "",
        smu: "",
        fleetNo: "",
        equipmentNumber: "",
    });

    const [assesstementData, setAssesstementData] = useState({
        ...claimAssessmentRequestObj,
        warrantyId: 0,
        warrantyTitle: "STD-18",
        claimId: 0,
    });

    const [warrantyId, setWarrantyId] = useState(null);
    const [warrantyTitle, setWarrantyTitle] = useState("");
    const [authorizationCode, setAuthorizationCode] = useState(null);
    const [replacement, setReplacement] = useState(true);
    const [reference, setReference] = useState("");

    const [warrantyData, setWarrantyData] = useState({
        warrantyId: 0,
        warrantyTitle: "",
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
    const [partsFailedRecord, setPartsFailedRecord] = useState([]);
    const [partsCausalRecord, setPartsCausalRecord] = useState([]);

    const [relatedHEId, setRelatedHEId] = useState(null);
    const [relatedPartsId, setRelatedPartsId] = useState(null);
    const [coverageTypeValue, setCoverageTypeValue] = useState(
        coverageTypeOptions[0]
    );
    const [relatedPartsRecords, setRelatedPartsRecords] = useState([]);

    const [claimValueId, setClaimValueId] = useState(null);
    const [settlementValueId, setSettlementValueId] = useState(null);

    const [claimRelateHERecordData, setClaimRelateHERecordData] = useState({
        ...claimRelatedHERequestObj,
        type: climentOpt[0],
        name: auth?.customerName ? auth?.customerName : "",
        claimOrderId: claimOrderId,
        coverageType: coverageTypeValue,
    });

    const [claimValueRecordData, setClaimValueRecordData] = useState({
        ...claimValueRequestObj,
        coverageType: coverageTypeOptions[0],
        type: priceTypeOptions[0],
    });

    const [claimSettlementRecord, setClaimSettlementRecord] = useState({
        ...claimSettlementRequestObj,
        type: priceTypeOptions[0],
        claimOrderId: claimOrderId,
    });

    const [reportTypeCausal, setReportTypeCausal] = useState(false);
    const [openValidateClaimErrModal, setOpenValidateClaimErrModal] =
        useState(false);

    useEffect(() => {
        setClaimValueRecordData({
            ...claimValueRecordData,
            claimOrderId: claimOrderId,
            totalPartsClaimed: relatedPartsRecords
                .reduce(
                    (total, item) => total + item.totalPrice * item.quantity,
                    0
                )
                .toFixed(2),
        });
    }, [relatedPartsRecords, claimOrderId]);

    useEffect(() => {
        setClaimValueRecordData({
            ...claimValueRecordData,
            claimOrderId: claimOrderId,
            totalHoursClaimed: claimRelateHERecordData.jobHours,
            // totalHoursClaimed: isEmpty(claimValueRecordData.totalHoursClaimed)
            //     ? claimRelateHERecordData.jobHours
            //     : claimValueRecordData.totalHoursClaimed,
        });
    }, [claimRelateHERecordData.jobHours, claimOrderId]);

    useEffect(() => {
        if (claimStatus?.value === "ARCHIVED") {
            setViewOnlyTab({
                ...viewOnlyTab,
                generalViewOnly: true,
                estViewOnly: true,
                custViewOnly: true,
                machineViewOnly: true,
                assesstViewOnly: true,
                evaluViewOnly: true,
                claimViewOnly: true,
            });
            setAssesstTabViewOnly(true);
            setEvaluTabViewOnly(true);
        }
    }, [claimStatus]);

    useEffect(() => {
        if (claimOrderId && !byAuthCode) {
            const rUrl = `${CLAIM_ORDER_MASTER_URL}/${claimOrderId}`;
            callGetApi(rUrl, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;

                    if (
                        responseData.relatedPartsIds &&
                        responseData.relatedPartsIds.length !== 0
                    ) {
                        getRelatedPartDetails(responseData.relatedPartsIds);
                    }

                    if (responseData.claimOrderNumber) {
                        setClaimNumber(responseData.claimOrderNumber);
                    }

                    // claim verion value set
                    const _claimOrderVersion = claimVersionOptions.find(
                        (obj) => obj.value === responseData.version
                    );
                    setClaimOrderVersion(
                        _claimOrderVersion || claimVersionOptions[0]
                    );

                    // rma type value set
                    const _rmaType = rmaTypeOptions.find(
                        (obj) => obj.value === responseData.rmaType
                    );

                    // rma type value set
                    const _rmaReason = rmaResonOptions.find(
                        (obj) => obj.value === responseData.rmaReason
                    );

                    // claim status
                    const _claimStatus = claimStatusOptions.find(
                        (obj) => obj.value === responseData?.claimOrderStatus
                    );
                    setClaimStatus(_claimStatus);

                    // claim type
                    const _claimType = claimRequestTypeOptions.find(
                        (obj) => obj.value === responseData?.claimType
                    );
                    setClaimType(_claimType);

                    setClaimOrderData({
                        ...responseData,
                        claimType: _claimType || "",
                        claimOrderStatus: _claimStatus || "",
                        rmaType: _rmaType || "",
                        rmaReason: _rmaReason || "",
                        // rmaNumber: responseData.rmaNumber,
                    });

                    setGeneralData({
                        ...generalData,
                        // estimationNo: claimRecordDetail?.equipmentNumber,
                        description: responseData.description,
                        reference: responseData.reference,
                        warrantyClaimStatus: _claimStatus,
                        claimRequestDate: responseData?.claimRequestDate,
                    });

                    setReference(responseData.reference);

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

                    setWarrantyData({
                        warrantyId: responseData.warrantyId,
                        warrantyTitle: responseData.warrantyTitle,
                    });
                    setWarrantyId(responseData.warrantyId);
                    setWarrantyTitle(responseData.warrantyTitle);

                    setAuthorizationCode(responseData.authorizationCode);
                    setReplacement(responseData.replacement);

                    setRelatedHEId(responseData.relatedHEId);

                    setClaimValueId(responseData.claimValueId);

                    setViewOnlyTab({
                        ...viewOnlyTab,
                        generalViewOnly: true,
                        estViewOnly: true,
                        custViewOnly: true,
                        machineViewOnly: true,
                        assesstViewOnly: true,
                        evaluViewOnly: true,
                        claimViewOnly: true,
                    });

                    if (responseData.claimId) {
                        getClaimDetails(responseData.claimId, responseData);
                    }
                }
            });
        }
        if (claimRecordId && byAuthCode) {
            getClaimDetails(claimRecordId);
        }
    }, [claimOrderId]);

    // get claim details
    const getClaimDetails = (claimId, claimOrderRes = null) => {
        const rUrlClaim = `${CLAIM_MASTER_URL}/${claimId}`;
        callGetApi( rUrlClaim, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;

                if (isEquipment && byAuthCode) {
                    setMachineData({
                        make: equipmentRowData?.maker,
                        model: equipmentRowData?.model,
                        serialNo: equipmentRowData?.makerSerialNumber,
                        smu: equipmentRowData?.sensorId,
                        fleetNo: equipmentRowData?.stockNumber,
                    });
                }
                if (!isEquipment && byAuthCode) {
                    setMachineData({
                        make: responseData.make,
                        model: responseData.model,
                        serialNo: responseData.serialNumber,
                        smu: responseData.smu,
                        fleetNo: responseData.unitNumber,
                        equipmentNumber: responseData.equipmentNumber,
                    });
                }
                if (byAuthCode) {
                    // claim status
                    const _claimStatus = claimStatusOptions.find(
                        (obj) => obj.value === responseData.claimStatus
                    );
                    setClaimStatus(_claimStatus);

                    // claim status
                    const _claimType = claimRequestTypeOptions.find(
                        (obj) => obj.value === responseData.claimType
                    );
                    setClaimType(_claimType);

                    setWarrantyId(responseData?.warrantyId);
                    setWarrantyTitle(responseData?.warrantyTitle || "Standard");

                    setAuthorizationCode(responseData.authorizationCode);
                    setReplacement(true);

                    setReference(responseData.reference);

                    setCustomerData({
                        customerID: responseData.customerNumber,
                        customerName: responseData.customerName,
                        contactEmail: responseData.emailId,
                        contactPhone: responseData.contactNumber,
                    });
                }
                if (responseData.assessmentId) {
                    getAssessmentDetails(responseData.assessmentId);
                    setAssesstmentId(responseData.assessmentId);
                    setAssesstTabViewOnly(true);
                }
                if (responseData.evaluationId) {
                    setEvaluationId(responseData.evaluationId);
                    getEvaluationDetails(responseData.evaluationId);
                    setEvaluTabViewOnly(true);
                }
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
        callGetApi( rUrl, (response) => {
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

    // get related Part details
    const getRelatedPartDetails = (partIds = []) => {
        let rUrl =
            `${RELATED_PARTS_MASTER_URL}/by-ids?` +
            partIds.map((id) => `ids=${id}`).join("&");
        callGetApi( rUrl, (response) => {
            if (response.status === API_SUCCESS) {
                const responseData = response.data;
                setRelatedPartsRecords(responseData);
            }
        });
    };

    // Individual Claim record input field value change
    const handleClaimRecordDataChange = (e) => {
        const { name, value } = e.target;
        setClaimRecordData({ ...claimRecordData, [name]: value });
    };

    // claim tab input text change
    const handleClaimTabInputTextChange = (e) => {
        const { name, value } = e.target;
        setClaimOrderData({ ...claimOrderData, [name]: value });
    };

    // Individual claim record Select & date field value change
    const handleClaimRecordSelectDataChange = (e, keyName) => {
        // const { name, value } = e.;
        setClaimRecordData({ ...claimRecordData, [keyName]: e });
    };

    // claim tab select & Date value change
    const handleClaimTabSelectValueChange = (e, keyName) => {
        setClaimOrderData({ ...claimOrderData, [keyName]: e });
    };

    // open Action Menu
    const handleOpenActionMenu = (e) => {
        setActionMenuAnchorEl(e.currentTarget);
        setOpenActionMenu(true);
    };

    // close convert to menu items list view
    const handleCloseActionMenu = () => setOpenActionMenu(false);

    // make editable able to Return Details tab data
    const handleMakeTabEditable = () => {
        if (claimStatus?.value === "ARCHIVED") {
            return;
        }
        if (isEmpty(activeTopTab)) {
            let viewOnlyTabName = "";
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
                setAssesstTabViewOnly(false);
            } else if (requestTab === "evaluation") {
                viewOnlyTabName = "evaluViewOnly";
                setEvaluTabViewOnly(false);
            } else if (requestTab === "claim") {
                viewOnlyTabName = "claimViewOnly";
            }
            setViewOnlyTab({ ...viewOnlyTab, [viewOnlyTabName]: false });
        }
    };

    // change upper tabs value & make Active to them
    const handleChangeAndActiveTopTab = (tabName) => {
        if (
            (tabName === "settlement" &&
                !(claimStatus?.value === "CLAIM_REJECTED")) ||
            claimStatus?.value === "SETTLED" ||
            claimStatus?.value === "CONTESTED"
        ) {
            return;
        }
        setActiveTopTab(tabName);
    };

    // change claim request active tab
    const handleTabChange = (e, value) => {
        setRequestTab(value);
    };

    // back to request tab
    const handleBackToRequestTab = () => {
        setActiveTopTab("");
    };

    // go to evaluation return scrren data
    const handleEvaluationPartsReturn = (row) => {
        handleShowReturnRequetrModal(row);
    };

    // add|update Claim Order
    const handleAddUpdateClaimOrder = (e) => {
        if (returnDetailsTab === "general" && viewOnlyTab?.generalViewOnly) {
            setReturnDetailsTab("estimation");
            return;
        } else if (
            returnDetailsTab === "estimation" &&
            viewOnlyTab?.estViewOnly
        ) {
            setReturnDetailsTab("customer");
            return;
        } else if (
            returnDetailsTab === "customer" &&
            viewOnlyTab?.custViewOnly
        ) {
            setReturnDetailsTab("machine");
            return;
        } else if (
            returnDetailsTab === "machine" &&
            viewOnlyTab?.machineViewOnly
        ) {
            setRequestTab("assesstement");
            return;
        }

        const _claimNumber = Math.floor(Math.random() * 9000) + 1000;

        const reqObj = {
            ...claimOrderData,
            customerNumber: customerData.customerID,
            customerName: customerData.customerName || "",
            emailId: customerData.contactEmail || "",
            contactNumber: customerData.contactPhone || "",
            make: machineData.make || "",
            model: machineData.model || "",
            serialNumber: machineData.serialNo || "",
            smu: machineData.smu || "",
            unitNumber: machineData.fleetNo || "",
            preparedBy: estimationData.preparedBy || "",
            preparedOn: estimationData.preparedOn || new Date(),
            revisedBy: estimationData.revisedBy || "",
            revisedOn: estimationData.revisedOn || new Date(),
            // claimType: claimRecordDetail?.claimType || "EMPTY",
            description: generalData.description,
            claimOrderNumber: claimNumber || _claimNumber,
            reference: reference || "",
            // reference: generalData.reference || "",
            rmaType: claimOrderData.rmaType?.value || "",
            rmaReason: claimOrderData.rmaReason?.value || "",
            rmaNumber: claimOrderData.rmaNumber || "",
            equipmentNumber: machineData.equipmentNumber || "",
            version: claimOrderVersion?.value || "VERSION_1",
            replacement: replacement || true,
            warrantyId: warrantyId || 0,
            warrantyTitle: warrantyTitle || "STANDARD",
            claimId: claimRecordId || 0,
            authorizationCode: authorizationCode || "",
            claimValueId: claimValueId || 0,
            settlementId: settlementValueId || 0,
            relatedHEId: relatedHEId || 0,
            claimType: claimType?.value || "EMPTY",
            claimOrderStatus: claimStatus?.value || "REGISTERED",
            claiment: "PARTNER",
            partnerName: auth?.customerName || "",
            address: "",
            location: "",
        };
        if (claimOrderId) {
            callPutApi(
                null,
                `${CLAIM_ORDER_MASTER_URL}/${claimOrderId}`,
                reqObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;
                        setClaimNumber(responseData.claimOrderNumber);
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
                    setClaimNumber(_claimNumber);
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
                    // setClaimRecordData({
                    //     ...claimRecordData,
                    //     claimOrderId: responseData["claimOrderId"],
                    // });
                    // handleUpdateClaimOrder(
                    //     "claimRequest",
                    //     responseData["claimOrderId"]
                    // );
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

    // update Claim Order
    const handleSaveClaimOrderChanges = (rObj = {}, tabClick = false) => {
        const _relatedPartsIds = [];
        if (relatedPartsRecords.length !== 0) {
            relatedPartsRecords.map((obj) =>
                _relatedPartsIds.push(obj.relatedPartsId)
            );
        }
        const reqObj = {
            ...claimOrderData,
            customerNumber: customerData.customerID,
            customerName: customerData.customerName || "",
            emailId: customerData.contactEmail || "",
            contactNumber: customerData.contactPhone || "",
            make: machineData.make || "",
            model: machineData.model || "",
            serialNumber: machineData.serialNo || "",
            smu: machineData.smu || "",
            unitNumber: machineData.fleetNo || "",
            preparedBy: estimationData.preparedBy || "",
            preparedOn: estimationData.preparedOn || new Date(),
            revisedBy: estimationData.revisedBy || "",
            revisedOn: estimationData.revisedOn || new Date(),
            // claimType: claimRecordDetail?.claimType || "EMPTY",
            description: generalData.description,
            claimOrderNumber: claimNumber,
            reference: reference || "",
            // reference: generalData.reference || "",
            rmaType: claimOrderData.rmaType?.value || "",
            rmaReason: claimOrderData.rmaReason?.value || "",
            rmaNumber: claimOrderData.rmaNumber || "",
            equipmentNumber: machineData.equipmentNumber || "",
            version: claimOrderVersion?.value || "VERSION_1",
            replacement: replacement || true,
            warrantyId: warrantyId || 0,
            warrantyTitle: warrantyTitle || "STANDARD",
            claimId: claimRecordId || 0,
            authorizationCode: authorizationCode || "",
            claimValueId: claimValueId || 0,
            settlementId: settlementValueId || 0,
            relatedHEId: relatedHEId || 0,
            claimType: claimType?.value || "EMPTY",
            claimOrderStatus: claimStatus?.value || "REGISTERED",
            claiment: "PARTNER",
            partnerName: auth?.customerName || "",
            address: "",
            location: "",
            relatedPartsIds: _relatedPartsIds,
            ...rObj,
        };

        if (claimOrderId) {
            callPutApi(
                null,
                `${CLAIM_ORDER_MASTER_URL}/${claimOrderId}`,
                reqObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        if (tabClick) {
                            setViewOnlyTab({
                                ...viewOnlyTab,
                                claimViewOnly: true,
                            });
                        }
                        handleSnack(
                            "success",
                            "Claim Request Updated Sucessfully"
                        );
                    }
                }
            );
        }
    };

    // delete claim order
    const handleDeleteClaimOrder = () => {
        if (claimOrderId) {
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to delete this claim",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    setClaimStatus({ label: "Archived", value: "ARCHIVED" });
                    handleSaveClaimOrderChanges({
                        claimOrderStatus: "ARCHIVED",
                    });
                }
            });
        }
    };

    // copy claim
    const handleCopyClaim = () => {
        if (claimOrderId) {
            handleSnack("success", "claim is copied successfully");
        }
    };

    return (
        <>
            {!openValidateClaimErrModal && show && (
                <Modal show={show} onHide={hideModal} size="xl">
                    <Modal.Body
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
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
                        <div className="d-flex align-items-center justify-content-between mt-3">
                            <div className="d-flex justify-content-center align-items-center">
                                <h5 className="font-weight-600 mb-0">
                                    Claim Order
                                    {claimNumber && `- ${claimNumber}`}
                                </h5>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="ml-3">
                                        <span class="claim-version-span">
                                            {claimOrderVersion?.label}
                                        </span>
                                        {/* <Select
                                            value={claimOrderVersion}
                                            onChange={(e) =>
                                                setClaimOrderVersion(e)
                                            }
                                            className="claim-order-version"
                                            options={claimVersionOptions}
                                            classNamePrefix="claim-version-select"
                                            // isDisabled
                                        /> */}
                                    </div>
                                    <div className="ml-3">
                                        <Select
                                            value={claimStatus}
                                            onChange={(e) => {
                                                setClaimStatus(e);
                                                handleSaveClaimOrderChanges({
                                                    claimOrderStatus: e?.value,
                                                });
                                            }}
                                            className="custom-claimStatus-selectbtn"
                                            options={claimStatusOptions.filter(
                                                (obj) => obj.value !== "SETTLED"
                                            )}
                                            isDisabled={
                                                claimStatus?.value === "SETTLED"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center px-3">
                                <div>
                                    <span
                                        className={`px-3 py-1 mx-2 settlement-status`}
                                    >
                                        {claimStatus?.value === "REGISTERED" ||
                                        claimStatus?.value ===
                                            "CLAIM_SUBMITTED" ||
                                        claimStatus?.value ===
                                            "CLAIM_ACKNOWLEDGED" ||
                                        claimStatus?.value ===
                                            "CLAIM_ACCEPTED" ||
                                        claimStatus?.value === "CONTESTED"
                                            ? "Settlement Pending"
                                            : claimStatus?.value ===
                                              "CLAIM_REJECTED"
                                            ? "Claim Rejected"
                                            : claimStatus?.value === "SETTLED"
                                            ? "Settlement Received"
                                            : claimStatus?.value ===
                                                  "ARCHIVED" ||
                                              claimStatus?.value === "CLOSED"
                                            ? "Settlement Closed"
                                            : ""}
                                    </span>
                                </div>
                                <div>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <IconButton
                                            className="btn bg-primary text-white font-size-14 pr-0 ml-2"
                                            style={{ borderRadius: "5px" }}
                                            onClick={handleOpenActionMenu}
                                            disabled={activeTopTab !== "settlement"}
                                            size="small"
                                            aria-controls={
                                                openActionMenu
                                                    ? "account-menu"
                                                    : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={
                                                openActionMenu
                                                    ? "true"
                                                    : undefined
                                            }
                                        >
                                            <span className="convert mx-2">
                                                Action{" "}
                                                <span>
                                                    <KeyboardArrowDownIcon />
                                                </span>
                                            </span>
                                        </IconButton>
                                    </Box>
                                    <Menu
                                        className="convert-top-left"
                                        anchorEl={actionMenuAnchorEl}
                                        id="account-menu"
                                        open={openActionMenu}
                                        onClose={handleCloseActionMenu}
                                        onClick={handleCloseActionMenu}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&:before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform:
                                                        "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{
                                            horizontal: "right",
                                            vertical: "top",
                                        }}
                                        anchorOrigin={{
                                            horizontal: "right",
                                            vertical: "bottom",
                                        }}
                                    >
                                        {!(
                                            claimStatus?.value ===
                                                "REGISTERED" ||
                                            claimStatus?.value ===
                                                "CLAIM_SUBMITTED" ||
                                            claimStatus?.value ===
                                                "CLAIM_ACKNOWLEDGED" ||
                                            claimStatus?.value ===
                                                "CLAIM_ACCEPTED" ||
                                            claimStatus?.value === "CONTESTED"
                                        ) && (
                                            <MenuItem
                                                className="custommenu"
                                                // onClick={() =>
                                                //     setConvertToQuoteModalShow(true)
                                                // }
                                            >
                                                Accept
                                            </MenuItem>
                                        )}
                                        {(claimStatus?.value === "REGISTERED" ||
                                            claimStatus?.value ===
                                                "CLAIM_SUBMITTED" ||
                                            claimStatus?.value ===
                                                "CLAIM_ACKNOWLEDGED" ||
                                            claimStatus?.value ===
                                                "CLAIM_ACCEPTED" ||
                                            claimStatus?.value ===
                                                "CONTESTED") && (
                                            <MenuItem
                                                className="custommenu"
                                                // onClick={() =>
                                                //     setConvertToQuoteModalShow(true)
                                                // }
                                            >
                                                Cancel
                                            </MenuItem>
                                        )}
                                        {!(
                                            claimStatus?.value ===
                                                "REGISTERED" ||
                                            claimStatus?.value ===
                                                "CLAIM_SUBMITTED" ||
                                            claimStatus?.value ===
                                                "CLAIM_ACKNOWLEDGED" ||
                                            claimStatus?.value ===
                                                "CLAIM_ACCEPTED" ||
                                            claimStatus?.value === "CONTESTED"
                                        ) && (
                                            <MenuItem
                                                className="custommenu"
                                                // onClick={() =>
                                                //     setConvertToQuoteModalShow(true)
                                                // }
                                            >
                                                Contest
                                            </MenuItem>
                                        )}
                                        <Divider />
                                    </Menu>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <a className="ml-3 cursor">
                                        <Tooltip title="Notes">
                                            <DescriptionOutlinedIcon className="text-grey font-size-28" />
                                        </Tooltip>
                                    </a>
                                    <a
                                        href="#"
                                        className="ml-3 font-size-14"
                                        title="Delete"
                                        onClick={handleDeleteClaimOrder}
                                    >
                                        <Tooltip title="Delete">
                                            <img src={deleteIcon}></img>
                                        </Tooltip>
                                    </a>
                                    <a
                                        href={undefined}
                                        className="ml-3 font-size-14"
                                        title="Copy"
                                        onClick={handleCopyClaim}
                                    >
                                        <Tooltip title="Copy">
                                            <img src={copyIcon}></img>
                                        </Tooltip>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Divider className="my-2" />
                        <div className="ligt-greey-bg p-3">
                            <div>
                                {claimStatus?.value !== "CLAIM_SUBMITTED" && (
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
                                )}
                                {claimOrderId && (
                                    <>
                                        <span
                                            className={`mr-3 cursor ${
                                                activeTopTab ===
                                                "realtedPartsExpenses"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeAndActiveTopTab(
                                                    "realtedPartsExpenses"
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
                                                activeTopTab ===
                                                "adjustClaimValue"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeAndActiveTopTab(
                                                    "adjustClaimValue"
                                                )
                                            }
                                        >
                                            <MonetizationOnOutlinedIcon className=" font-size-16" />
                                            <span className="ml-2">
                                                Adjust Claim Value
                                            </span>
                                        </span>
                                        {/* <span
                      className={`mr-3 cursor ${
                        activeTopTab === "realtedPartList"
                          ? "active-span"
                          : ""
                      }`}
                      onClick={() => handleChangeAndActiveTopTab("realtedPartList")}
                    >
                      <FormatListBulletedOutlinedIcon className=" font-size-16" />
                      <span className="ml-2">Related part list(s)</span>
                    </span> */}
                                        <span
                                            className={`mr-3 ${
                                                claimStatus?.value ===
                                                    "CLAIM_REJECTED" ||
                                                claimStatus?.value ===
                                                    "SETTLED" ||
                                                claimStatus?.value ===
                                                    "CONTESTED"
                                                    ? "cursor "
                                                    : ""
                                            } ${
                                                activeTopTab === "settlement"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeAndActiveTopTab(
                                                    "settlement"
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
                                                activeTopTab === "addNotes"
                                                    ? "active-span"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleChangeAndActiveTopTab(
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
                        <div
                            className={`card border my-2 ${
                                claimStatus?.value === "ARCHIVED"
                                    ? activeTopTab !== ""
                                        ? ""
                                        : ""
                                    : "px-3"
                            }`}
                        >
                            <Box
                                className="mt-0"
                                sx={{
                                    width: "100%",
                                    typography: "body1",
                                    backgroundColor: `${
                                        claimStatus?.value === "ARCHIVED"
                                            ? "#f3eafe"
                                            : ""
                                    }`,
                                }}
                            >
                                {activeTopTab === "" && (
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
                                                    // disabled={
                                                    //     !evaluationId &&
                                                    //     !assesstmentId
                                                    // }
                                                    disabled={!claimOrderId}
                                                />
                                            </TabList>
                                        </Box>
                                        <TabPanel
                                            value="returnDetails"
                                            sx={{ paddingX: 1.4 }}
                                        >
                                            <ClaimOrderDetails
                                                claimOrderId={claimOrderId}
                                                returnDetailsTab={
                                                    returnDetailsTab
                                                }
                                                setReturnDetailsTab={
                                                    setReturnDetailsTab
                                                }
                                                viewOnlyTab={viewOnlyTab}
                                                setViewOnlyTab={setViewOnlyTab}
                                                setRequestTab={setRequestTab}
                                                generalData={generalData}
                                                setGeneralData={setGeneralData}
                                                reference={reference}
                                                setReference={setReference}
                                                estimationData={estimationData}
                                                setEstimationData={
                                                    setEstimationData
                                                }
                                                customerData={customerData}
                                                setCustomerData={
                                                    setCustomerData
                                                }
                                                machineData={machineData}
                                                setMachineData={setMachineData}
                                                handleSnack={handleSnack}
                                                claimStatusOptions={
                                                    claimStatusOptions
                                                }
                                                claimStatus={claimStatus}
                                                setClaimStatus={setClaimStatus}
                                                warrantyData={warrantyData}
                                                setClaimOrderId={
                                                    setClaimOrderId
                                                }
                                                claimNumber={claimNumber}
                                                setClaimNumber={setClaimNumber}
                                                claimOrderData={claimOrderData}
                                                handleAddUpdateClaimOrder={
                                                    handleAddUpdateClaimOrder
                                                }
                                                warrantyId={warrantyId}
                                                warrantyTitle={warrantyTitle}
                                                authorizationCode={
                                                    authorizationCode
                                                }
                                            />
                                        </TabPanel>
                                        <TabPanel value="assesstement">
                                            <AssessmentDetails
                                                viewOnlyTab={viewOnlyTab}
                                                setViewOnlyTab={setViewOnlyTab}
                                                setRequestTab={setRequestTab}
                                                handleSnack={handleSnack}
                                                assesstementData={
                                                    assesstementData
                                                }
                                                setAssesstementData={
                                                    setAssesstementData
                                                }
                                                underWarrantyOptions={
                                                    underWarrantyOptions
                                                }
                                                warrantyTypeOptions={
                                                    warrantyTypeOptions
                                                }
                                                warrantyData={warrantyData}
                                                assesstTabViewOnly={
                                                    assesstTabViewOnly
                                                }
                                                setAssesstTabViewOnly={
                                                    setAssesstTabViewOnly
                                                }
                                                assesstmentId={assesstmentId}
                                                setAssesstmentId={
                                                    setAssesstmentId
                                                }
                                                claimRecordId={claimRecordId}
                                                warrantyId={warrantyId}
                                                warrantyTitle={warrantyTitle}
                                                claimStatus={claimStatus}
                                            />
                                        </TabPanel>
                                        <TabPanel value="evaluation">
                                            <EvaluationDetails
                                                viewOnlyTab={viewOnlyTab}
                                                setViewOnlyTab={setViewOnlyTab}
                                                handleSnack={handleSnack}
                                                assesstmentId={assesstmentId}
                                                claimRecordId={claimRecordId}
                                                evaluationTabValue={
                                                    evaluationTabValue
                                                }
                                                setEvaluationTabValue={
                                                    setEvaluationTabValue
                                                }
                                                evaluationDetailsData={
                                                    evaluationDetailsData
                                                }
                                                setEvaluationDetailsData={
                                                    setEvaluationDetailsData
                                                }
                                                evaluatedByData={
                                                    evaluatedByData
                                                }
                                                setEvaluatedByData={
                                                    setEvaluatedByData
                                                }
                                                questionsOptions={
                                                    questionsOptions
                                                }
                                                partsFailedRecord={
                                                    partsFailedRecord
                                                }
                                                partsCausalRecord={
                                                    partsCausalRecord
                                                }
                                                setPartsFailedRecord={
                                                    setPartsFailedRecord
                                                }
                                                setPartsCausalRecord={
                                                    setPartsCausalRecord
                                                }
                                                claimOrderId={claimOrderId}
                                                evaluationId={evaluationId}
                                                setEvaluationId={
                                                    setEvaluationId
                                                }
                                                setRequestTab={setRequestTab}
                                                handleEvaluationPartsReturn={
                                                    handleEvaluationPartsReturn
                                                }
                                                claimStatus={claimStatus}
                                            />
                                        </TabPanel>
                                        <TabPanel value="claim">
                                            {!viewOnlyTab.claimViewOnly ? (
                                                <>
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
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
                                                                        {/* CLAIM
                                                                        REQUEST
                                                                        ID */}
                                                                        WARRANTY
                                                                        REQUEST
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        // value={
                                                                        //     claimRecordData.claimOrderId
                                                                        // }
                                                                        value={
                                                                            claimRecordId
                                                                        }
                                                                        placeholder="Claim Request Id"
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
                                                                        ORDER
                                                                        NUMBER
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        disabled
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            claimNumber
                                                                        }
                                                                        // value={
                                                                        //     claimRecordData.claimNumber
                                                                        // }
                                                                        name="claimNumber"
                                                                        placeholder="Claim Number"
                                                                        // onChange={
                                                                        //     handleClaimRecordDataChange
                                                                        // }
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
                                                                        disabled
                                                                        className="form-control border-radius-10 text-primary"
                                                                        value={
                                                                            machineData?.equipmentNumber
                                                                        }
                                                                        // value={
                                                                        //     claimRecordData.equipmentNumber
                                                                        // }
                                                                        name="equipmentNumber"
                                                                        placeholder="Equipment Number"
                                                                        // onChange={
                                                                        //     handleClaimRecordDataChange
                                                                        // }
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
                                                                        disabled
                                                                        value={
                                                                            machineData?.serialNo
                                                                        }
                                                                        // value={
                                                                        //     claimRecordData.serialNumber
                                                                        // }
                                                                        name="serialNumber"
                                                                        placeholder="Serial Number"
                                                                        // onChange={
                                                                        //     handleClaimRecordDataChange
                                                                        // }
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
                                                                        // value={
                                                                        //     claimRecordData.warrantyId
                                                                        // }
                                                                        value={
                                                                            warrantyId
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
                                                                        // value={
                                                                        //     claimRecordData.modelNumber
                                                                        // }
                                                                        disabled
                                                                        value={
                                                                            machineData?.model
                                                                        }
                                                                        name="modelNumber"
                                                                        placeholder="Model Number"
                                                                        // onChange={
                                                                        //     handleClaimRecordDataChange
                                                                        // }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
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
                                                                                    // checked={
                                                                                    //     claimRecordData.replacement
                                                                                    // }
                                                                                    checked={
                                                                                        replacement
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setReplacement(
                                                                                            e
                                                                                                .target
                                                                                                .checked
                                                                                        )
                                                                                    }
                                                                                    // onChange={(
                                                                                    //     e
                                                                                    // ) =>
                                                                                    //     setClaimRecordData(
                                                                                    //         {
                                                                                    //             ...claimRecordData,
                                                                                    //             replacement:
                                                                                    //                 e
                                                                                    //                     .target
                                                                                    //                     .checked,
                                                                                    //         }
                                                                                    //     )
                                                                                    // }
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
                                                                        PRODUCT
                                                                        CODE
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control border-radius-10 text-primary"
                                                                        // value={
                                                                        //     claimRecordData.componentCode
                                                                        // }
                                                                        value={
                                                                            machineData?.equipmentNumber
                                                                        }
                                                                        name="componentCode"
                                                                        placeholder="Component Code"
                                                                        disabled
                                                                        // onChange={
                                                                        //     handleClaimRecordDataChange
                                                                        // }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        PRODUCT
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
                                                                            claimOrderData?.partNumber
                                                                        }
                                                                        name="partNumber"
                                                                        placeholder="Part Number"
                                                                        onChange={
                                                                            handleClaimTabInputTextChange
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
                                                        <div className="row input-fields mt-2">
                                                            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-12 font-weight-500">
                                                                        CLAIM
                                                                        TYPE
                                                                    </label>
                                                                    <Select
                                                                        className="text-primary"
                                                                        isDisabled
                                                                        options={
                                                                            claimRequestTypeOptions
                                                                        }
                                                                        // onChange={(
                                                                        //     e
                                                                        // ) =>
                                                                        //     handleClaimRecordSelectDataChange(
                                                                        //         e,
                                                                        //         "claimType"
                                                                        //     )
                                                                        // }
                                                                        value={
                                                                            claimOrderData.claimType
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
                                                                        isDisabled
                                                                        options={
                                                                            claimStatusOptions
                                                                        }
                                                                        // onChange={(
                                                                        //     e
                                                                        // ) =>
                                                                        //     handleClaimRecordSelectDataChange(
                                                                        //         e,
                                                                        //         "claimStatus"
                                                                        //     )
                                                                        // }
                                                                        // value={
                                                                        //     claimRecordData.claimStatus
                                                                        // }
                                                                        value={
                                                                            claimStatus
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
                                                                            claimOrderData.claimApprover
                                                                        }
                                                                        name="claimApprover"
                                                                        placeholder="Claim Approver"
                                                                        onChange={
                                                                            handleClaimTabInputTextChange
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
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
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
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
                                                        <div className="row input-fields mt-4">
                                                            <ReadOnlyField
                                                                label="CLAIMENT"
                                                                value={
                                                                    "PARTNER"
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="WARRANTY REQUEST NUMBER"
                                                                // value={
                                                                //     claimRecordData.claimOrderId
                                                                // }
                                                                value={
                                                                    claimRecordId
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="PARTNER NAME"
                                                                value={
                                                                    `${
                                                                        auth?.customerName
                                                                            ? auth?.customerName
                                                                            : ""
                                                                    }`
                                                                    // "KOOLAN IRON ORE PTY LTD"
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM NUMBER"
                                                                // value={
                                                                //     claimRecordData.claimNumber
                                                                // }
                                                                value={
                                                                    claimNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="EQUIPMENT NUMBER"
                                                                // value={
                                                                //     claimRecordData.equipmentNumber
                                                                // }
                                                                value={
                                                                    machineData?.equipmentNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="SERIAL NUMBER"
                                                                // value={
                                                                //     claimRecordData.serialNumber
                                                                // }
                                                                value={
                                                                    machineData?.serialNo
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="WARRANTY ID"
                                                                // value={
                                                                //     claimRecordData.warrantyId
                                                                // }
                                                                value={
                                                                    warrantyId
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="MODEL NUMBER"
                                                                // value={
                                                                //     claimRecordData.modelNumber
                                                                // }
                                                                value={
                                                                    machineData?.model
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
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
                                                                // label="COMPONENT CODE"
                                                                // value={
                                                                //     claimRecordData.componentCode
                                                                // }
                                                                label="PRODUCT CODE"
                                                                value={
                                                                    machineData?.equipmentNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="PRODUCT SERIAL NUMBER"
                                                                // label="COMPONENT SERIAL NUMBER"
                                                                value={
                                                                    claimRecordData?.componentSerialNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="PART NUMBER"
                                                                value={
                                                                    claimOrderData?.partNumber
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
                                                        <div className="row input-fields mt-4">
                                                            <ReadOnlyField
                                                                label="CLAIM TYPE"
                                                                // value={
                                                                //     claimRecordData
                                                                //         .claimType
                                                                //         ?.label
                                                                // }
                                                                value={
                                                                    claimType?.label
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM STATUS"
                                                                // value={
                                                                //     claimRecordData
                                                                //         .claimStatus
                                                                //         ?.label
                                                                // }
                                                                value={
                                                                    claimStatus?.label
                                                                }
                                                                className="col-md-3 col-sm-3"
                                                            />
                                                            <ReadOnlyField
                                                                label="CLAIM APPROVER"
                                                                value={
                                                                    claimOrderData.claimApprover
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
                                                    <div
                                                        className="card border px-3 py-2 mb-3"
                                                        style={{
                                                            backgroundColor: `${
                                                                claimStatus?.value ===
                                                                "ARCHIVED"
                                                                    ? "#f3eafe"
                                                                    : ""
                                                            }`,
                                                        }}
                                                    >
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
                                            <div className="Add-new-segment-div p-3 border-radius-10 mt-2">
                                                <div class="repairbtn-dropdown">
                                                    {viewOnlyTab.claimViewOnly ? (
                                                        <button
                                                            className="btn bg-primary text-white ml-2 dropbtn"
                                                            onClick={() =>
                                                                handleChangeAndActiveTopTab(
                                                                    "realtedPartsExpenses"
                                                                )
                                                            }
                                                        >
                                                            Go To Parts &
                                                            Expenses
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn bg-primary text-white ml-2 dropbtn"
                                                            onClick={() =>
                                                                handleSaveClaimOrderChanges(
                                                                    {},
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            Save Changes
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </TabPanel>
                                    </TabContext>
                                )}

                                {activeTopTab === "realtedPartsExpenses" && (
                                    <RelatedPartsAndExpenses
                                        handleBack={handleBackToRequestTab}
                                        handleSnack={handleSnack}
                                        relatedHEId={relatedHEId}
                                        setRelatedHEId={setRelatedHEId}
                                        claimOrderId={claimOrderId}
                                        claimNumber={claimNumber}
                                        coverageTypeValue={coverageTypeValue}
                                        relatedPartsId={relatedPartsId}
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
                                        setRelatedPartsId={setRelatedPartsId}
                                        handleViewClaimValue={
                                            handleChangeAndActiveTopTab
                                        }
                                        claimRelateHERecordData={
                                            claimRelateHERecordData
                                        }
                                        setClaimRelateHERecordData={
                                            setClaimRelateHERecordData
                                        }
                                        climentOpt={climentOpt}
                                        auth={auth}
                                        handleUpdateClaimOrder={
                                            handleSaveClaimOrderChanges
                                        }
                                        claimStatus={claimStatus}
                                    />
                                )}

                                {activeTopTab === "adjustClaimValue" && (
                                    <AdjustClaimValue
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
                                        handleViewSettlement={
                                            handleChangeAndActiveTopTab
                                        }
                                        claimValueRecordData={
                                            claimValueRecordData
                                        }
                                        setClaimValueRecordData={
                                            setClaimValueRecordData
                                        }
                                        handleUpdateClaimOrder={
                                            handleSaveClaimOrderChanges
                                        }
                                        setClaimStatus={setClaimStatus}
                                        jobHours={
                                            claimRelateHERecordData.jobHours
                                        }
                                        claimStatus={claimStatus}
                                        coverageTypeOptions={
                                            coverageTypeOptions
                                        }
                                        priceTypeOptions={priceTypeOptions}
                                    />
                                )}

                                {activeTopTab === "settlement" && (
                                    <Settlement
                                        handleBack={handleBackToRequestTab}
                                        handleSnack={handleSnack}
                                        settlementValueId={settlementValueId}
                                        setSettlementValueId={
                                            setSettlementValueId
                                        }
                                        claimOrderId={claimOrderId}
                                        // claimNumber={claimNumber}
                                        handleViewAndAddNotes={
                                            handleChangeAndActiveTopTab
                                        }
                                        claimSettlementRecord={
                                            claimSettlementRecord
                                        }
                                        setClaimSettlementRecord={
                                            setClaimSettlementRecord
                                        }
                                        claimStatus={claimStatus}
                                    />
                                )}
                                {activeTopTab === "addNotes" && (
                                    <ClaimAddNotes
                                        handleBack={handleBackToRequestTab}
                                        handleSnack={handleSnack}
                                        claimStatus={claimStatus}
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

export default ClaimOrderRequestModal;

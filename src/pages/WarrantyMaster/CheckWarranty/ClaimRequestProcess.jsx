import React, { useEffect, useState } from "react";

import DateRangeIcon from "@mui/icons-material/DateRange";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAlt";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

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
import { TextField, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { Modal } from "react-bootstrap";
import Select from "react-select";
import Moment from "react-moment";
import {
  FONT_STYLE,
  FONT_STYLE_SELECT,
  GRID_STYLE,
} from "pages/Repair/CONSTANTS";
import {
  claimAssessmentReqObj,
  evaluationReqObj,
  questionsOptions,
  salesOfficeOptions,
  underWarrantyOptions,
  validityOptions,
  warrantyClaimStatusOption,
  warrantyTypeOptions,
} from "./claimWarrantyConstants";
import { ReadOnlyField } from "pages/Repair/components/ReadOnlyField";
import SearchBox from "pages/Repair/components/SearchBox";
import { customerSearch, machineSearch } from "services/searchServices";
import {
  Claim_Details_By_Id_Get,
  Claim_Order_Create_POST,
  Claim_Order_Update_PUT,
  Warranty_Assessment_Create_POST,
  Warranty_Evaluation_Create_POST,
  Warranty_Question_Answer_Create_POST,
} from "services/CONSTANTS";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import {
  claimRequestObj,
  payerOptions,
} from "pages/MasterData/warrantyMaster/WarrantyConstants";
import {
  claimStatusOptions,
  claimTypeOptions,
} from "pages/MasterData/claimMaster/ClaimMasterConstants";
import {
  selectActivityIdList,
  selectChargeCodeList,
  selectConsumableTypeList,
  selectDimensionList,
  selectDropdownOption,
  selectLaborCodeList,
  selectLaborTypeList,
  selectMiscTypeList,
  selectPricingMethodList,
  selectServiceTypeList,
} from "pages/Repair/dropdowns/repairSlice";
import ClaimRelatedPartList from "./ClaimRelatedPartList";
import ClaimAdjustPrice from "./ClaimAdjustPrice";
import ClaimRelatedServiceEstimate from "./ClaimRelatedServiceEstimate";
import ClaimSplitPrice from "./ClaimSplitPrice";
import { useAppSelector } from "app/hooks";

const failedPartAnalysisOptions = [
  `known to be faulty i.e. “sticky”`,
  `suspected faulty`,
  `without any fault`,
];

const failedPartRecords = [
  {
    index: Math.floor(Math.random() * 900) + 10000,
    partNumber: "N90058041",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "10R4469",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
];

const causalPartRecords = [
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "039720N2",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: Math.floor(Math.random() * 9000) + 10000,
    partNumber: "5788987",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
];

const ClaimRequestProcess = ({
  show,
  hideModal,
  claimRecordId,
  handleSnack,
  evaluationQuestions,
  claimOrderId = null,
  setClaimOrderId,
  claimDetails,
  assesstmentId,
  setAssesstmentId,
  evaluationId,
  setEvaluationId,
  handeleShowReturnRequester,
  fromClaim = true,
  handleShowHideAddPartModal,
  newPartRecord = null,
  setNewPartRecord,
  isFailurePart,
  setIsFailurePart,
}) => {
  // Retrieve labor codes
  const laborCodeList = useAppSelector(
    selectDropdownOption(selectLaborCodeList)
  );

  // Retrieve charge codes
  const chargeCodeList = useAppSelector(
    selectDropdownOption(selectChargeCodeList)
  );

  // Retrieve labor types
  const laborTypeList = useAppSelector(
    selectDropdownOption(selectLaborTypeList)
  );

  // Retrieve service types
  const serviceTypeList = useAppSelector(
    selectDropdownOption(selectServiceTypeList)
  );

  // Retrieve misc types
  const miscTypeList = useAppSelector(selectDropdownOption(selectMiscTypeList));

  // Retrieve dimensions
  const dimensionList = useAppSelector(
    selectDropdownOption(selectDimensionList)
  );
  // Retrieve consumables
  const consumableTypeList = useAppSelector(
    selectDropdownOption(selectConsumableTypeList)
  );
  // Retrieve price methods
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );

  // Retrieve activity Ids
  const activityIdList = useAppSelector(
    selectDropdownOption(selectActivityIdList)
  );

  const [activeClaim, setActiveClaim] = useState(false);
  const [activeUpperTabs, setActiveUpperTabs] = useState("");
  const [requestTab, setRequestTab] = useState("general");

  const [failedPartRecordsData, setFailedPartRecordsData] = useState([
    ...failedPartRecords,
  ]);

  const [causalPartRecordsData, setCausalPartRecordsData] = useState([
    ...causalPartRecords,
  ]);

  useEffect(() => {
    if (isFailurePart) {
      if (newPartRecord && newPartRecord?.index !== undefined) {
        setCausalPartRecordsData([...causalPartRecordsData, newPartRecord]);
      }
    } else {
      if (newPartRecord && newPartRecord?.index !== undefined) {
        setFailedPartRecordsData([...failedPartRecordsData, newPartRecord]);
      }
    }
  }, [newPartRecord, isFailurePart]);

  const [viewOnlyTab, setViewOnlyTab] = useState({
    generalViewOnly: false,
    estViewOnly: false,
    custViewOnly: false,
    machineViewOnly: false,
    assesstViewOnly: false,
    evaluViewOnly: false,
  });

  const [selectedVersion, setSelectedVersion] = useState({
    label: "Version 1",
    value: 1,
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
    source: "User Generated",
    customerID: !fromClaim ? "101211" : "",
    customerName: !fromClaim ? "KOOLAN IRON ORE PTY LTD" : "",
    contactEmail: !fromClaim ? "andrei@yahoo.com" : "",
    contactName: "",
    contactPhone: "",
    customerGroup: !fromClaim ? "Large Enterprise" : "",
    customerSegment: !fromClaim ? "Corporate" : "",
    regionOrState: !fromClaim ? "Clamview Beach" : "",
    country: !fromClaim ? "US" : "",
  });
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [noOptionsCust, setNoOptionsCust] = useState(false);

  const [machineData, setMachineData] = useState({
    make: !fromClaim ? "CATERPILLAR" : "",
    family: !fromClaim ? "10" : "",
    model: !fromClaim ? "992K" : "",
    serialNo: !fromClaim ? "ZMX00507" : "",
    smu: !fromClaim ? "4896" : "",
    fleetNo: !fromClaim ? "CM27404" : "",
    registrationNo: "",
    chasisNo: "",
    productSegment: !fromClaim ? "PS1" : "",
    productGroup: !fromClaim ? "7" : "",
  });

  const [noOptionsModel, setNoOptionsModel] = useState(false);
  const [noOptionsSerial, setNoOptionsSerial] = useState(false);
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);

  const [assesstementData, setAssesstementData] = useState({
    ...claimAssessmentReqObj,
    warrantyId: 18,
    warrantyTitle: "STD-18",
    warrantyEndDate: new Date("2026-01-11"),
    warrantyRequestDate: new Date("2024-03-05"),
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
    ...evaluationReqObj,
  });

  const [claimRecordData, setClaimRecordData] = useState({
    ...claimRequestObj,
  });

  useEffect(() => {
    if (claimRecordId) {
      const rUrl = `${Claim_Details_By_Id_Get}${claimRecordId}`;
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const _claimStatus = claimStatusOptions.find(
            (obj) => obj.value === responseData.claimStatus
          );
          const _claimType = claimTypeOptions.find(
            (obj) => obj.value === responseData.claimType
          );

          const _payer = payerOptions.find(
            (obj) => obj.value === responseData.payer
          );

          setClaimRecordData({
            ...responseData,
            claimStatus: _claimStatus,
            claimType: _claimType,
            payer: _payer,
          });
        }
      });
    }
  }, [claimRecordId]);

  // change upper tabs value & make Active to them
  const handleChangeUpperTabs = (tabName) => {
    setActiveUpperTabs(tabName);
  };

  // change claim request active tab
  const handleTabChange = (e, value) => {
    setRequestTab(value);
  };

  //Individual estimation details field value change
  const handleEstimationDataChange = (e) => {
    const { name, value } = e.target;
    setEstimationData({
      ...estimationData,
      [name]: value,
    });
  };

  //Individual customer field value change
  const handleCustomerDataChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
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
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    setCustomerData({
      ...customerData,
      customerID: currentItem.customerId,
      contactEmail: currentItem.email,
      contactName: currentItem.contactName,
      customerGroup: currentItem.customerGroup,
      customerName: currentItem.fullName,
      customerSegment: currentItem.customerSegment,
      country: currentItem.addressDTO?.country,
      regionOrState: currentItem.addressDTO?.regionOrState,
    });
    console.log(currentItem);
    setSearchCustResults([]);
  };

  //Individual machine field value change
  const handleMachineDataChange = (e) => {
    const { name, value } = e.target;
    setMachineData({
      ...machineData,
      [name]: value,
    });
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
          ? `model:${machineData.model} AND equipmentNumber~` + searchText
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
          handleSnack("error", "Error occurred while searching the machine!");
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
        model: currentItem.model,
        fleetNo: currentItem.stockNumber,
        serialNo: currentItem.equipmentNumber,
        smu: currentItem.sensorId,
        make: currentItem.maker,
        family: currentItem.market,
        productGroup: currentItem.productGroup,
        productSegment: currentItem.productSegment,
      });
      setSearchSerialResults([]);
    }
  };

  //Individual assessment field value change
  const handleAssesstementDataChange = (e) => {
    const { name, value } = e.target;
    setAssesstementData({
      ...assesstementData,
      [name]: value,
    });
  };

  // Individual assessment field value change
  const handleAssesstementSelectDataChange = (e, keyName) => {
    setAssesstementData({
      ...assesstementData,
      [keyName]: e,
    });
  };

  // Individual evaluation details select option field value change
  const handleEvaluationDeatilsSelectDataChange = (e, keyName) => {
    setEvaluationDetailsData({ ...evaluationDetailsData, [keyName]: e });
  };

  // Individual evaluation By field value change
  const handleEvaluationByDataChange = (e) => {
    const { name, value } = e.target;
    setEvaluatedByData({
      ...evaluatedByData,
      [name]: value,
    });
  };

  // Individual Claim record input field value change
  const handleClaimRecordDataChange = (e) => {
    const { name, value } = e.target;
    setClaimRecordData({
      ...claimRecordData,
      [name]: value,
    });
  };

  // Individual claim record Select & date field value change
  const handleClaimRecordSelectDataChange = (e) => {
    const { name, value } = e.target;
    setClaimRecordData({
      ...claimRecordData,
      [name]: value,
    });
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
      unitNumber: "",
      repairFromDate: new Date(),
      repairToDate: new Date(),
      preparedBy: estimationData.preparedBy || "",
      preparedOn: estimationData.preparedOn || new Date(),
      revisedBy: estimationData.revisedBy || "",
      revisedOn: estimationData.revisedOn || new Date(),
      claimRequestDate: new Date(),
      claimType: claimDetails?.claimType || "EMPTY",
      description: "",
      claimNumber: claimDetails.claimNumber || "",
      reference: "",
    };
    if (claimOrderId) {
      callPutApi(
        null,
        `${Claim_Order_Update_PUT}/${claimOrderId}`,
        reqObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            if (requestTab === "general") {
              setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
              setRequestTab("estimation");
            } else if (requestTab === "estimation") {
              setViewOnlyTab({ ...viewOnlyTab, estViewOnly: true });
              setRequestTab("customer");
            } else if (requestTab === "customer") {
              setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
              setRequestTab("machine");
            } else if (requestTab === "machine") {
              setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
              setRequestTab("assesstement");
            }
            handleSnack("success", "Claim Request Updated Sucessfully");
          }
        }
      );
    } else {
      callPostApi(null, Claim_Order_Create_POST, reqObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          if (requestTab === "general") {
            setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
            setRequestTab("estimation");
          } else if (requestTab === "estimation") {
            setViewOnlyTab({ ...viewOnlyTab, estViewOnly: true });
            setRequestTab("customer");
          } else if (requestTab === "customer") {
            setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
            setRequestTab("machine");
          } else if (requestTab === "machine") {
            setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
            setRequestTab("assesstement");
          }
          setClaimOrderId(responseData.claimOrderId);
          handleSnack("success", "Claim Request Created Successfully");
        } else {
          handleSnack("error", "Somthing Went wrong");
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
    };

    if (assesstmentId) {
      callPutApi(
        null,
        `${Warranty_Assessment_Create_POST}/${assesstmentId}`,
        reqObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            setAssesstmentId(responseData.assessmentId);
            handleSnack("success", "Warranty Assessment Updated  Successfully");
            // setViewOnlyTab({ ...viewOnlyTab, assesstViewOnly: true });
            setRequestTab("evaluation");
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
        Warranty_Assessment_Create_POST,
        reqObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            setAssesstmentId(responseData.assessmentId);
            handleSnack("success", "Warranty Assessment Created Successfully");
            // setViewOnlyTab({ ...viewOnlyTab, assesstViewOnly: true });
            setRequestTab("evaluation");
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

  const handleCrateEvaluationQuestion1 = (evaluatedId) => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
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

  const handleCrateEvaluationQuestion2 = (evaluatedId) => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
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

  const handleCrateEvaluationQuestion3 = (evaluatedId) => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
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

  const handleCrateEvaluationQuestion4 = (evaluatedId) => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
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

  const handleCrateEvaluationQuestion5 = (evaluatedId) => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
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

  const handleCrateEvaluationQuestion6 = (evaluatedId) => {
    const rUrl = `${Warranty_Question_Answer_Create_POST}`;
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
    const rUrl = `${Warranty_Evaluation_Create_POST}`;
    const evalatuinonRObj = {
      ...evaluatedByData,
    };

    if (evaluationId) {
      callPutApi(
        null,
        `${rUrl}/${evaluationId}`,
        evalatuinonRObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            handleCrateQuestions(evaluationId);
            handleSnack("success", "Evaluation Updated Successfully.");
            setEvaluationTabValue("evaluationPartReport");
          } else {
            handleSnack("error", "Evaluation Failed or Something went wrong");
          }
        },
        (error) => {
          handleSnack("error", "Evaluation Failed or Something went wrong");
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
            handleSnack("success", "Evaluation Created Successfully.");
            setEvaluationTabValue("evaluationPartReport");
          } else {
            handleSnack("error", "Evaluation Failed or Something went wrong");
          }
        },
        (error) => {
          handleSnack("error", "Evaluation Failed or Something went wrong");
        }
      );
    }
  };

  const failedPartListColumns = [
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
      valueOptions: ({ row }) => failedPartAnalysisOptions,
      valueFormatter: (params) => {
        const option = failedPartAnalysisOptions.find(
          ({ value: optionValue }) => params.value === optionValue
        );

        if (option) return option.label;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 250,
      cellClassName: "actions",
      renderCell: (params) => (
        <button
          className="btn btn-primary"
          onClick={() => handleEvaluationReturn(params)}
        >
          Claim Supplier Warranty
        </button>
      ),
    },
  ];

  const failedPartColumns = [
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
      valueOptions: ({ row }) => failedPartAnalysisOptions,
      valueFormatter: (params) => {
        const option = failedPartAnalysisOptions.find(
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
          className="btn btn-primary"
          onClick={() => handleEvaluationReturn(params)}
        >
          Return
        </button>
      ),
    },
  ];

  // go to evaluation return scrren data
  const handleEvaluationReturn = (params) => {
    handeleShowReturnRequester(params.row);
  };

  const handleWarrantyAccpeted = () => {
    setActiveClaim(true);
    setRequestTab("claim");
  };

  const handleMakeTabEditable = () => {
    if (activeUpperTabs) {
    } else {
      let viewOnlyTab = "";
      let show = false;
      if (requestTab === "general") {
        viewOnlyTab = "generalViewOnly";
      } else if (requestTab === "estimation") {
        viewOnlyTab = "estViewOnly";
      } else if (requestTab === "customer") {
        viewOnlyTab = "custViewOnly";
      } else if (requestTab === "machine") {
        viewOnlyTab = "machineViewOnly";
      } else if (requestTab === "assesstement") {
        viewOnlyTab = "assesstViewOnly";
        show = true;
      } else if (requestTab === "evaluation") {
        viewOnlyTab = "evaluViewOnly";
        show = true;
      }
      setViewOnlyTab({ ...viewOnlyTab, [viewOnlyTab]: show });
    }
  };

  const handleAddNewFailedPart = () => {
    setIsFailurePart(true);
    handleShowHideAddPartModal();
    setNewPartRecord(null);
  };

  const handleAddNewCausalPart = () => {
    setIsFailurePart(false);
    handleShowHideAddPartModal();
    setNewPartRecord(null);
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="card border my-2 px-3">
          <div className="row mt-2 py-3">
            <div className="col-md-4 col-sm-4 d-flex  claim-requester-info">
              <img src="../assets/images/member/2.jpg" alt="" />
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
                <h6 className="mb-0">Year-end</h6>
                <h4>2018</h4>
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
              // onClick={() => setDisable(false)}
            >
              <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
              <span className="ml-2">Edit</span>
            </span>
            {activeClaim && (
              <>
                <span
                  className={`mr-3 cursor ${
                    activeUpperTabs === "adjustPrice" ? "active-span" : ""
                  }`}
                  onClick={() => handleChangeUpperTabs("adjustPrice")}
                >
                  <MonetizationOnOutlinedIcon className=" font-size-16" />
                  <span className="ml-2"> Adjust Claim Value</span>
                </span>
                <span
                  className={`mr-3 cursor ${
                    activeUpperTabs === "realtedPartList" ? "active-span" : ""
                  }`}
                  onClick={() => handleChangeUpperTabs("realtedPartList")}
                >
                  <FormatListBulletedOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related part list(s)</span>
                </span>
                <span
                  className={`mr-3 cursor ${
                    activeUpperTabs === "realtedServiceEstimate"
                      ? "active-span"
                      : ""
                  }`}
                  onClick={() =>
                    handleChangeUpperTabs("realtedServiceEstimate")
                  }
                >
                  <AccessAlarmOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Related Hours & expenses</span>
                </span>
                <span
                  className={`cursor ${
                    activeUpperTabs === "splitPrice" ? "active-span" : ""
                  }`}
                  onClick={() => handleChangeUpperTabs("splitPrice")}
                >
                  <SellOutlinedIcon className=" font-size-16" />
                  <span className="ml-2">Settlement</span>
                </span>
              </>
            )}
          </div>
        </div>
        <div className="card border my-2 px-3">
          <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
            {activeUpperTabs === "" && (
              <TabContext value={requestTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    className="custom-tabs-div"
                    onChange={handleTabChange}
                  >
                    <Tab label="General Details" value="general" />
                    <Tab label="Estimation Details" value="estimation" />
                    <Tab label="Customer" value="customer" />
                    <Tab label="Machine " value="machine" />
                    <Tab label="Assesstement " value="assesstement" />
                    <Tab label="Evaluation " value="evaluation" />
                    <Tab label="Claim" value="claim" disabled={!activeClaim} />
                  </TabList>
                </Box>
                <TabPanel value="general">
                  {!viewOnlyTab.generalViewOnly ? (
                    <>
                      <div className="row input-fields">
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              <span className=" mr-2">ESTIMATION DATE</span>
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  minDate={generalData.estimationDate}
                                  maxDate={new Date()}
                                  closeOnSelect
                                  value={generalData.estimationDate}
                                  onChange={(e) =>
                                    setGeneralData({
                                      ...generalData,
                                      estimationDate: e,
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
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              ESTIMATION #
                            </label>
                            <input
                              type="text"
                              disabled
                              className="form-control border-radius-10 text-primary"
                              id="estNoId"
                              // value={generalData.estimationNo}
                              value={claimDetails.claimNumber}
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
                              maxLength={140}
                              value={generalData.description}
                              onChange={(e) =>
                                setGeneralData({
                                  ...generalData,
                                  description: e.target.value,
                                })
                              }
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
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
                              maxLength={140}
                              value={generalData.reference}
                              onChange={(e) =>
                                setGeneralData({
                                  ...generalData,
                                  reference: e.target.value,
                                })
                              }
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              VALIDITY
                            </label>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setGeneralData({
                                  ...generalData,
                                  validity: e,
                                })
                              }
                              options={validityOptions}
                              value={generalData.validity}
                              styles={FONT_STYLE_SELECT}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              VERSION
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              disabled
                              value={parseFloat(selectedVersion.value).toFixed(
                                1
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              WARRANTY CLAIM STATUS
                            </label>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setGeneralData({
                                  ...generalData,
                                  warrantyClaimStatus: e,
                                })
                              }
                              options={warrantyClaimStatusOption}
                              value={generalData.warrantyClaimStatus}
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        {/* <button
                        type="button"
                        className="btn btn-light bg-primary text-white mr-1"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button> */}
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          disabled={
                            !generalData.estimationDate ||
                            !generalData.description ||
                            // !generalData.estimationNo ||
                            !generalData.reference ||
                            !generalData.validity
                          }
                          // onClick={updateGeneralData}
                          onClick={handleAddUpdateClaimRequest}
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <ReadOnlyField
                        label="ESTIMATION DATE"
                        value={
                          <Moment format="DD/MM/YYYY">
                            {generalData.estimationDate}
                          </Moment>
                        }
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="ESTIMATION #"
                        // value={generalData.estimationNo}
                        value={claimDetails.claimNumber}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="DESCRIPTION"
                        value={generalData.description}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="REFERENCE"
                        value={generalData.reference}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="VALIDTITY (DAYs)"
                        value={generalData.validity?.label}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="VERSION"
                        value={parseFloat(selectedVersion.value).toFixed(1)}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="WARRANTY CLAIM STATUS"
                        value={generalData.warrantyClaimStatus?.label}
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
                              PREPARED BY
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={estimationData.preparedBy}
                              name="preparedBy"
                              onChange={handleEstimationDataChange}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
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
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PREPARED ON
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // sx={{
                                  //   "&& .MuiPickersDay-dayWithMargin": {color: '#fff !important'},
                                  //   }}
                                  // InputProps={{style: {...FONT_STYLE, color: '#fff'}}}
                                  minDate={estimationData.preparedOn}
                                  maxDate={new Date()}
                                  closeOnSelect
                                  value={estimationData.preparedOn}
                                  onChange={(e) =>
                                    setEstimationData({
                                      ...estimationData,
                                      preparedOn: e,
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
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              REVISED BY
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={estimationData.revisedBy}
                              name="revisedBy"
                              onChange={handleEstimationDataChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              REVISED ON
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  minDate={estimationData.revisedOn}
                                  maxDate={new Date()}
                                  closeOnSelect
                                  value={estimationData.revisedOn}
                                  onChange={(e) =>
                                    setEstimationData({
                                      ...estimationData,
                                      revisedOn: e,
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
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SALES OFFICE / BRANCH
                            </label>
                            <Select
                              onChange={(e) =>
                                setEstimationData({
                                  ...estimationData,
                                  salesOffice: e,
                                })
                              }
                              options={salesOfficeOptions}
                              value={estimationData.salesOffice}
                              styles={FONT_STYLE_SELECT}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        {/* <button
                        type="button"
                        className="btn btn-light bg-primary text-white mr-1"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button> */}
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          disabled={
                            !estimationData.preparedBy ||
                            !estimationData.preparedOn ||
                            !estimationData.salesOffice
                          }
                          onClick={handleAddUpdateClaimRequest}
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <ReadOnlyField
                        label="PREPARED BY"
                        value={estimationData.preparedBy}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="APPROVED BY"
                        value={estimationData.approvedBy}
                        className="col-md-4 col-sm-4"
                      />

                      <ReadOnlyField
                        label="PREPARED ON"
                        value={
                          <Moment format="DD/MM/YYYY">
                            {estimationData.preparedOn}
                          </Moment>
                        }
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="REVISED BY"
                        value={estimationData.revisedBy}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="REVISED ON"
                        value={
                          <Moment format="DD/MM/YYYY">
                            {estimationData.revisedOn}
                          </Moment>
                        }
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="SALES OFFICE / BRANCH"
                        value={estimationData.salesOffice?.label}
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
                              SOURCE
                            </label>
                            <input
                              type="text"
                              disabled
                              className="form-control border-radius-10 text-primary"
                              id="customer-src"
                              value={customerData.source}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CUSTOMER ID
                            </label>
                            <SearchBox
                              value={customerData.customerID}
                              onChange={(e) =>
                                handleCustSearch("customerId", e.target.value)
                              }
                              type="customerId"
                              result={searchCustResults}
                              onSelect={handleCustSelect}
                              noOptions={noOptionsCust}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CUSTOMER NAME
                            </label>
                            <input
                              type="text"
                              value={customerData.customerName}
                              name="customerName"
                              onChange={handleCustomerDataChange}
                              className="form-control border-radius-10 text-primary"
                              id="customerNameid"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group w-100">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CONTACT NAME
                            </label>
                            <input
                              type="text"
                              value={customerData.contactName}
                              name="contactName"
                              onChange={handleCustomerDataChange}
                              className="form-control border-radius-10 text-primary"
                              id="contactNameid"
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CONTACT EMAIL
                            </label>
                            <input
                              type="email"
                              value={customerData.contactEmail}
                              name="contactEmail"
                              onChange={handleCustomerDataChange}
                              className="form-control border-radius-10 text-primary"
                              id="contatEmail"
                              aria-describedby="emailHelp"
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CONTACT PHONE
                            </label>
                            <input
                              type="tel"
                              className="form-control border-radius-10 text-primary"
                              onChange={handleCustomerDataChange}
                              value={customerData.contactPhone}
                              name="contactPhone"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CUSTOMER GROUP
                            </label>
                            <input
                              type="text"
                              value={customerData.customerGroup}
                              name="customerGroup"
                              onChange={handleCustomerDataChange}
                              className="form-control border-radius-10 text-primary"
                              id="custGroup"
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        {/* <button
                        type="button"
                        className="btn btn-light bg-primary text-white mr-1"
                        onClick={() => handleResetData("CANCEL")}
                      >
                        Cancel
                      </button> */}
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          disabled={
                            !(
                              customerData.source &&
                              customerData.contactEmail &&
                              customerData.customerGroup &&
                              customerData.contactName
                            ) || noOptionsCust
                          }
                          onClick={handleAddUpdateClaimRequest}
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <ReadOnlyField
                        label="SOURCE"
                        value={customerData.source}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CUSTOMER ID"
                        value={customerData.customerID}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CUSTOMER NAME"
                        value={customerData.customerName}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CUSTOMER EMAIL"
                        value={customerData.contactEmail}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CONTACT NAME"
                        value={customerData.contactName}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CONTACT PHONE"
                        value={customerData.contactPhone}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CUSTOMER GROUP"
                        value={customerData.customerGroup}
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
                              Make
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="make-id"
                              name="make"
                              value={machineData.make}
                              onChange={handleMachineDataChange}
                              placeholder="Auto Filled"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              Family
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
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              MODEL
                            </label>
                            <SearchBox
                              value={machineData.model}
                              onChange={(e) =>
                                handleMachineSearch("model", e.target.value)
                              }
                              type="model"
                              result={searchModelResults}
                              onSelect={handleModelSelect}
                              noOptions={noOptionsModel}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SERIAL #
                            </label>
                            <SearchBox
                              value={machineData.serialNo}
                              onChange={(e) =>
                                handleMachineSearch("serialNo", e.target.value)
                              }
                              type="equipmentNumber"
                              result={searchSerialResults}
                              onSelect={handleModelSelect}
                              noOptions={noOptionsSerial}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              SMU (Service Meter Unit)
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="smu-id"
                              name="smu"
                              value={machineData.smu}
                              onChange={handleMachineDataChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              UNIT NO / FLEET NO
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              onChange={handleMachineDataChange}
                              value={machineData.fleetNo}
                              name="fleetNo"
                              id="fleet-id"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              REGISTRATION NO
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              onChange={handleMachineDataChange}
                              value={machineData.registrationNo}
                              name="registrationNo"
                              id="registration-id"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CHASIS NO
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              id="chasis-id"
                              onChange={handleMachineDataChange}
                              value={machineData.chasisNo}
                              name="chasisNo"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        {/* <button
                      type="button"
                      className="btn btn-light bg-primary text-white mr-1"
                      onClick={() => handleResetData("CANCEL")}
                    >
                      Cancel
                    </button> */}
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          disabled={
                            !(machineData.model && machineData.serialNo) ||
                            noOptionsModel ||
                            noOptionsSerial
                          }
                          onClick={handleAddUpdateClaimRequest}
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <ReadOnlyField
                        label="MAKE"
                        value={machineData.make}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="FAMILY"
                        value={machineData.family}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="MODEL"
                        value={machineData.model}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="SERIAL NO"
                        value={machineData.serialNo}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="SMU (Service Meter Unit)"
                        value={machineData.smu}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="UNIT NO / FLEET NO"
                        value={machineData.fleetNo}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="REGISTRATION NO"
                        value={machineData.registrationNo}
                        className="col-md-4 col-sm-4"
                      />
                      <ReadOnlyField
                        label="CHASSIS NO"
                        value={machineData.chasisNo}
                        className="col-md-4 col-sm-4"
                      />
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="assesstement">
                  {!viewOnlyTab.assesstViewOnly ? (
                    <>
                      <div className="row input-fields">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Warranty Title
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={assesstementData?.warrantyTitle}
                              name="warrantyTitle"
                              placeholder="Warranty Title"
                              onChange={handleAssesstementDataChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Warranty Id
                            </label>
                            <input
                              type="text"
                              className="form-control border-radius-10 text-primary"
                              value={assesstementData.warrantyId}
                              name="warrantyId"
                              placeholder="Warranty ID"
                              onChange={handleAssesstementDataChange}
                              readOnly={true}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Assessment Date
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={assesstementData.assessmentDate}
                                  onChange={(e) =>
                                    handleAssesstementSelectDataChange(
                                      e,
                                      "assessmentDate"
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
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Warranty Request Date
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={assesstementData.warrantyRequestDate}
                                  onChange={(e) =>
                                    handleAssesstementSelectDataChange(
                                      e,
                                      "warrantyRequestDate"
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
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Warranty End Date
                            </label>
                            <div className="align-items-center date-box">
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDatePicker
                                  inputFormat="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  // maxDate={new Date()}
                                  closeOnSelect
                                  value={assesstementData.warrantyEndDate}
                                  onChange={(e) =>
                                    handleAssesstementSelectDataChange(
                                      e,
                                      "warrantyEndDate"
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
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              Is the machine or component under warranty?
                            </label>
                            <Select
                              className="text-primary"
                              options={underWarrantyOptions}
                              value={assesstementData.machineUnderWarranty}
                              onChange={(e) =>
                                handleAssesstementSelectDataChange(
                                  e,
                                  "machineUnderWarranty"
                                )
                              }
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              What type of warranty assessment is it?
                            </label>
                            <Select
                              className="text-primary"
                              options={warrantyTypeOptions}
                              onChange={(e) =>
                                handleAssesstementSelectDataChange(
                                  e,
                                  "assessmentType"
                                )
                              }
                              value={assesstementData.assessmentType}
                              styles={FONT_STYLE_SELECT}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group">
                            <label className="text-light-dark h4 font-weight-500">
                              What is the customer complaining about?
                            </label>
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={assesstementData.complainRow1}
                                  name="complainRow1"
                                  placeholder="Complaining About the...."
                                  onChange={handleAssesstementDataChange}
                                />
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={assesstementData.complainRow2}
                                  name="complainRow2"
                                  placeholder="Complaining About the...."
                                  onChange={handleAssesstementDataChange}
                                />
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={assesstementData.complainRow3}
                                  name="complainRow3"
                                  placeholder="Complaining About the...."
                                  onChange={handleAssesstementDataChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h4>Assign To</h4>
                      <div className="card border px-2 py-2">
                        <div className="row input-fields">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form-group">
                              <label className="text-light-dark font-size-14 font-weight-500">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="assignToFirstName"
                                placeholder="First Name"
                                value={assesstementData.assignToFirstName}
                                onChange={handleAssesstementDataChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form-group">
                              <label className="text-light-dark font-size-14 font-weight-500">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="assignToLastName"
                                placeholder="Last Name"
                                value={assesstementData.assignToLastName}
                                onChange={handleAssesstementDataChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="form-group">
                              <label className="text-light-dark font-size-14 font-weight-500">
                                Email
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="assignToEmail"
                                placeholder="Email"
                                value={assesstementData.assignToEmail}
                                onChange={handleAssesstementDataChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form-group">
                              <label className="text-light-dark font-size-14 font-weight-500">
                                Role
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="assignToRole"
                                placeholder="Role"
                                value={assesstementData.assignToRole}
                                onChange={handleAssesstementDataChange}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form-group">
                              <label className="text-light-dark font-size-14 font-weight-500">
                                Position
                              </label>
                              <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="assignToPosition"
                                placeholder="Position"
                                value={assesstementData.assignToPosition}
                                onChange={handleAssesstementDataChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          onClick={handleAddUpdateAssesstment}
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </TabPanel>
                <TabPanel value="evaluation">
                  <Grid item xs={12}>
                    <TabContext value={evaluationTabValue}>
                      <Box
                        sx={{
                          borderBottom: 1,
                          borderColor: "divider",
                          marginTop: 3,
                          marginInline: 5,
                        }}
                      >
                        <TabList
                          className=""
                          onChange={(e, value) => setEvaluationTabValue(value)}
                        >
                          <Tab
                            label="Details"
                            value={"evaluationDetails"}
                            className="heading-tabs"
                          />
                          <Tab
                            label="Part Reports"
                            value={"evaluationPartReport"}
                            className="heading-tabs"
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="evaluationDetails">
                        <div className="card px-3 py-3 border">
                          <div className="row input-fields">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Has the customer followed the safety
                                  regulations in the manual?
                                </label>
                                <Select
                                  className="text-primary"
                                  options={questionsOptions}
                                  onChange={(e) =>
                                    handleEvaluationDeatilsSelectDataChange(
                                      e,
                                      `question1`
                                    )
                                  }
                                  value={evaluationDetailsData.question1}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Has the operator followed product instructions
                                  carefully?
                                </label>
                                <Select
                                  className="text-primary"
                                  options={questionsOptions}
                                  onChange={(e) =>
                                    handleEvaluationDeatilsSelectDataChange(
                                      e,
                                      `question2`
                                    )
                                  }
                                  value={evaluationDetailsData.question2}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Have external forces damaged the
                                  machine/component?
                                </label>
                                <Select
                                  className="text-primary"
                                  options={questionsOptions}
                                  onChange={(e) =>
                                    handleEvaluationDeatilsSelectDataChange(
                                      e,
                                      `question1`
                                    )
                                  }
                                  value={evaluationDetailsData.question3}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Is it a known product defect? or Has the issue
                                  appeared before?
                                </label>
                                <Select
                                  className="text-primary"
                                  options={questionsOptions}
                                  onChange={(e) =>
                                    handleEvaluationDeatilsSelectDataChange(
                                      e,
                                      `question1`
                                    )
                                  }
                                  value={evaluationDetailsData.question4}
                                  styles={FONT_STYLE_SELECT}
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-16 font-weight-500">
                                  What is the causes?
                                </label>
                                <textarea
                                  className="form-control border-radius-10 text-primary"
                                  name="causes"
                                  cols="30"
                                  rows="2"
                                  value={evaluationDetailsData.question5}
                                  onChange={(e) =>
                                    setEvaluationDetailsData({
                                      ...evaluationDetailsData,
                                      question5: e.target.value,
                                    })
                                  }
                                  placeholder="causes"
                                ></textarea>
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  What are the corrective actions taken?
                                </label>
                                <textarea
                                  className="form-control border-radius-10 text-primary"
                                  name="correctiveActions"
                                  cols="30"
                                  rows="2"
                                  value={evaluationDetailsData.question6}
                                  onChange={(e) =>
                                    setEvaluationDetailsData({
                                      ...evaluationDetailsData,
                                      question6: e.target.value,
                                    })
                                  }
                                  placeholder="Actions"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h4>Evaluated By</h4>
                        <div className="card border px-3 py-3">
                          <div className="row input-fields">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={evaluatedByData.evaluatedByFirstName}
                                  name="evaluatedByFirstName"
                                  placeholder="First Name"
                                  onChange={handleEvaluationByDataChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={evaluatedByData.evaluatedByLastName}
                                  name="evaluatedByLastName"
                                  placeholder="Last Name"
                                  onChange={handleEvaluationByDataChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Email
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={evaluatedByData.evaluatedByEmail}
                                  name="evaluatedByEmail"
                                  placeholder="Email"
                                  onChange={handleEvaluationByDataChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Role
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={evaluatedByData.evaluatedByRole}
                                  name="evaluatedByRole"
                                  placeholder="Role"
                                  onChange={handleEvaluationByDataChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Position
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={evaluatedByData.evaluatedByPosition}
                                  name="evaluatedByPosition"
                                  placeholder="Position"
                                  onChange={handleEvaluationByDataChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Evaluated On
                                </label>
                                <div className="align-items-center date-box">
                                  <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                  >
                                    <MobileDatePicker
                                      inputFormat="dd/MM/yyyy"
                                      className="form-controldate border-radius-10"
                                      // maxDate={new Date()}
                                      closeOnSelect
                                      value={evaluatedByData.evaluatedOn}
                                      onChange={(e) =>
                                        setEvaluatedByData({
                                          ...evaluatedByData,
                                          evaluatedOn: e,
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
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Changed By
                                </label>
                                <input
                                  type="text"
                                  className="form-control border-radius-10 text-primary"
                                  value={evaluatedByData.evaluationChangedBy}
                                  name="evaluationChangedBy"
                                  placeholder="Chnaged By"
                                  onChange={handleEvaluationByDataChange}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">
                                  Changed On
                                </label>
                                <div className="align-items-center date-box">
                                  <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                  >
                                    <MobileDatePicker
                                      inputFormat="dd/MM/yyyy"
                                      className="form-controldate border-radius-10"
                                      // maxDate={new Date()}
                                      closeOnSelect
                                      value={
                                        evaluatedByData.evaluationChangedOn
                                      }
                                      onChange={(e) =>
                                        setEvaluatedByData({
                                          ...evaluatedByData,
                                          evaluationChangedOn: e,
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
                        </div>
                        <div
                          className="row"
                          style={{ justifyContent: "right" }}
                        >
                          <button
                            type="button"
                            className="btn btn-light bg-primary text-white"
                            onClick={handleAddUpdateEvaluation}
                          >
                            Save & Next
                          </button>
                        </div>
                      </TabPanel>
                      <TabPanel value="evaluationPartReport">
                        <Grid
                          container
                          sx={{
                            width: "100%",
                            backgroundColor: "#f3eafe",
                            borderRadius: 5,
                            marginBlock: 0,
                            padding: 1,
                          }}
                        >
                          <Card
                            sx={{
                              borderRadius: 4,
                              minHeight: 400,
                              width: "100%",
                              margin: 0,
                            }}
                            variant="outlined"
                          >
                            <div className="d-flex justify-content-between py-4">
                              <Typography
                                sx={{
                                  fontSize: 18,
                                  fontWeight: 600,
                                  // margin: 2,
                                }}
                              >
                                Failed Part
                              </Typography>
                              <div className="row">
                                <button
                                  className="btn btn-primary mx-3"
                                  onClick={handleAddNewFailedPart}
                                >
                                  + Add
                                </button>
                              </div>
                            </div>
                            <Box
                              sx={{
                                height: 300,
                                marginBottom: 1,
                                marginInline: 2,
                                paddingBottom: 1,
                              }}
                            >
                              <DataGrid
                                sx={GRID_STYLE}
                                getRowId={(row) => row.index}
                                columns={failedPartColumns}
                                rows={failedPartRecordsData}
                                rowsPerPageOptions={[10, 20, 50]}
                              />
                            </Box>
                          </Card>
                          <Card
                            sx={{
                              borderRadius: 4,
                              minHeight: 400,
                              width: "100%",
                              marginTop: 2,
                              marginBottom: 2,
                            }}
                            variant="outlined"
                          >
                            <div className="d-flex justify-content-between py-4">
                              <Typography
                                sx={{
                                  fontSize: 18,
                                  fontWeight: 600,
                                  // margin: 2,
                                }}
                              >
                                Causal Part
                              </Typography>
                              <div className="row">
                                <button
                                  className="btn btn-primary mx-3"
                                  onClick={handleAddNewCausalPart}
                                >
                                  + Add
                                </button>
                              </div>
                            </div>
                            <Box
                              sx={{
                                height: 300,
                                marginBottom: 1,
                                marginInline: 2,
                                paddingBottom: 1,
                              }}
                            >
                              <DataGrid
                                sx={GRID_STYLE}
                                getRowId={(row) => row.index}
                                columns={failedPartColumns}
                                rows={causalPartRecordsData}
                                rowsPerPageOptions={[10, 20, 50]}
                              />
                            </Box>
                          </Card>
                          <div className="d-flex justify-content-end mt-2 mb-2">
                            <button
                              className="btn btn-primary mx-3"
                              onClick={handleWarrantyAccpeted}
                            >
                              Warranty Accepted
                            </button>
                            <button
                              className="btn btn-primary"
                              // onClick={hideModal}
                            >
                              Warranty Rejected
                            </button>
                          </div>
                        </Grid>
                        <div className="Add-new-segment-div p-3 border-radius-10 mt-4">
                          <div class="repairbtn-dropdown">
                            <button
                              className="btn bg-primary text-white ml-2 dropbtn"
                              // onClick={handleShowWarrantyCoverage}
                            >
                              Create Supplier Claim
                            </button>
                          </div>
                        </div>
                      </TabPanel>
                    </TabContext>
                  </Grid>
                </TabPanel>
                <TabPanel value="claim">
                  <div className="row input-fields">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.claimNumber}
                          name="claimNumber"
                          placeholder="Claim Number"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Model Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.modelNumber}
                          name="modelNumber"
                          placeholder="Model Number"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Equipment Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.equipmentNumber}
                          name="equipmentNumber"
                          placeholder="Equipment Number"
                          onChange={handleClaimRecordDataChange}
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
                          value={claimRecordData.serialNumber}
                          name="serialNumber"
                          placeholder="Serial Number"
                          onChange={handleClaimRecordDataChange}
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
                          value={claimRecordData.componentCode}
                          name="componentCode"
                          placeholder="Component Code"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Status
                        </label>
                        <Select
                          className="text-primary"
                          options={claimStatusOptions}
                          onChange={(e) =>
                            handleClaimRecordSelectDataChange(e, "claimStatus")
                          }
                          value={claimRecordData.claimStatus}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Type
                        </label>
                        <Select
                          className="text-primary"
                          options={claimTypeOptions}
                          onChange={(e) =>
                            handleClaimRecordSelectDataChange(e, "claimType")
                          }
                          value={claimRecordData.claimType}
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
                                checked={claimRecordData.replacement}
                                onChange={(e) =>
                                  setClaimRecordData({
                                    ...claimRecordData,
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
                          Fill Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecordData.fillDate}
                              onChange={(e) =>
                                handleClaimRecordSelectDataChange(e, "fillDate")
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
                          Failure Part Number
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.failurePartNumber}
                          name="failurePartNumber"
                          placeholder="Failure Part Number"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Hour on Machine
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.hourOnMachine}
                          name="hourOnMachine"
                          placeholder="Hour on Machine"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Hours on Failed Part
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.hoursOnFailedPart}
                          name="hoursOnFailedPart"
                          placeholder="Hours on Failed Part"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Upload Photo
                </label>
                <input
                        type="number"
                        className="form-control border-radius-10 text-primary"
                        value={claimRecordData.hoursOnFailedPart}
                        name="hoursOnFailedPart"
                        placeholder="Hours on Failed Part"
                        onChange={handleClaimRecordDataChange}
                      /> 
              </div>
            </div>*/}
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Part List
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.partList}
                          name="partList"
                          placeholder="Part List"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Time taken for the Repair
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.repairTime}
                          name="repairTime"
                          placeholder="Time taken for the Repair"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Claim Questionnaire
                </label>
                <textarea
                  name="claimQuestionnaire"
                  cols="30"
                  rows="3 "
                  value={claimRecordData.claimQuestionnaire}
                  onChange={handleClaimRecordDataChange}
                  placeholder="Claim Questionnaire"
                  className="form-control border-radius-10 text-primary"
                ></textarea>
              </div>
            </div> */}
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Payer
                        </label>
                        <Select
                          className="text-primary"
                          options={payerOptions}
                          onChange={(e) =>
                            handleClaimRecordSelectDataChange(e, "payer")
                          }
                          value={claimRecordData.payer}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Approver
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.claimApprover}
                          name="claimApprover"
                          placeholder="Claim Approver"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Created By
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.createdBy}
                          name="createdBy"
                          placeholder="Created By"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Updated By
                        </label>
                        <input
                          type="text"
                          className="form-control border-radius-10 text-primary"
                          value={claimRecordData.updatedBy}
                          name="updatedBy"
                          placeholder="Updated By"
                          onChange={handleClaimRecordDataChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Created On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecordData.createdOn}
                              onChange={(e) =>
                                handleClaimRecordSelectDataChange(
                                  e,
                                  "createdOn"
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
                          Updated On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecordData.updatedOn}
                              onChange={(e) =>
                                handleClaimRecordSelectDataChange(
                                  e,
                                  "updatedOn"
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
                          Claim Receipt Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecordData.claimReceiptDate}
                              onChange={(e) =>
                                handleClaimRecordSelectDataChange(
                                  e,
                                  "claimReceiptDate"
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
                          Created Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecordData.createdDate}
                              onChange={(e) =>
                                handleClaimRecordSelectDataChange(
                                  e,
                                  "createdDate"
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
                          Closed Date
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecordData.closedDate}
                              onChange={(e) =>
                                handleClaimRecordSelectDataChange(
                                  e,
                                  "closedDate"
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
                          Approved / Rejected On
                        </label>
                        <div className="align-items-center date-box">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              inputFormat="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              // maxDate={new Date()}
                              closeOnSelect
                              value={claimRecordData.appoverRejectedOn}
                              onChange={(e) =>
                                handleClaimRecordSelectDataChange(
                                  e,
                                  "appoverRejectedOn"
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
                  </div>
                  <div className="row input-fields">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Story
                        </label>
                        <textarea
                          name="claimStory"
                          cols="30"
                          rows="3"
                          value={claimRecordData.claimStory}
                          onChange={handleClaimRecordDataChange}
                          placeholder="Claim Story"
                          className="form-control border-radius-10 text-primary"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          Claim Approval / Rejection Notes
                        </label>
                        <textarea
                          name="claimNotes"
                          cols="30"
                          rows="3 "
                          value={claimRecordData.claimNotes}
                          onChange={handleClaimRecordDataChange}
                          placeholder="Claim Approval / Rejection Notes"
                          className="form-control border-radius-10 text-primary"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="Add-new-segment-div p-3 border-radius-10 mt-4">
                    <div class="repairbtn-dropdown">
                      <button
                        className="btn bg-primary text-white ml-2 dropbtn"
                        // onClick={handleShowWarrantyCoverage}
                      >
                        Validate Claim
                      </button>
                    </div>
                    <div class="repairbtn-dropdown">
                      <button
                        className="btn bg-primary text-white ml-2 dropbtn"
                        // onClick={handleShowWarrantyCoverage}
                      >
                        Create ERP Order
                      </button>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            )}
            {activeUpperTabs === "adjustPrice" && (
              <ClaimAdjustPrice
                handleSnack={handleSnack}
                setActiveUpperTabs={setActiveUpperTabs}
              />
            )}
            {activeUpperTabs === "realtedPartList" && (
              <ClaimRelatedPartList
                selectedVersion={selectedVersion}
                handleSnack={handleSnack}
                setActiveUpperTabs={setActiveUpperTabs}
                failedPartRecordsData={[
                  ...failedPartRecordsData,
                  ...causalPartRecordsData,
                ]}
                partsColumns={failedPartListColumns}
              />
            )}
            {activeUpperTabs === "realtedServiceEstimate" && (
              <ClaimRelatedServiceEstimate
                selectedVersion={selectedVersion}
                handleSnack={handleSnack}
                laborCodeList={laborCodeList}
                chargeCodeList={chargeCodeList}
                laborTypeList={laborTypeList}
                serviceTypeList={serviceTypeList}
                miscTypeList={miscTypeList}
                dimensionList={dimensionList}
                consumableTypeList={consumableTypeList}
                priceMethodOptions={priceMethodOptions}
                activityIdList={activityIdList}
                setActiveUpperTabs={setActiveUpperTabs}
              />
            )}
            {activeUpperTabs === "splitPrice" && (
              <ClaimSplitPrice
                handleSnack={handleSnack}
                setActiveUpperTabs={setActiveUpperTabs}
              />
            )}
          </Box>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimRequestProcess;

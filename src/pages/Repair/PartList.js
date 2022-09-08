import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import Checkbox from "@mui/material/Checkbox";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MuiMenuComponent } from "pages/Operational";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shareIcon from "../../assets/icons/svg/share.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import { Link, useHistory } from "react-router-dom";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import FormGroup from "@mui/material/FormGroup";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DataTable from "react-data-table-component";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FileUploader } from "react-drag-drop-files";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { ToastContainer, toast } from "react-toastify";
import boxicon from "../../assets/icons/png/box.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import $ from "jquery";
import SelectFilter from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import DateFnsUtils from "@date-io/date-fns";
import {
  addMultiPartsToPartList,
  addPartlist,
  addPartToPartList,
  createBuilder,
  customerSearch,
  machineSearch,
  sparePartSearch,
  updateBuilderCustomer,
  updateBuilderEstimation,
  updateBuilderGeneralDet,
  updateBuilderMachine,
} from "services/repairBuilderServices";
import SearchBox from "./components/SearchBox";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Moment from "react-moment";
import Validator from "utils/validator";
import { toast } from "react-toastify";

function PartList() {
  const history = useHistory();
  const [searchCustResults, setSearchCustResults] = useState([]);
  const [allParts, setAllParts] = useState([]);
  const [partsToUpload, setPartsToUpload] = useState([]);

  const [viewOnlyTab, setViewOnlyTab] = useState({
    custViewOnly: false,
    machineViewOnly: false,
    generalViewOnly: false,
    estViewOnly: false,
  });
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [searchGroupNoResults, setSearchGroupNoResults] = useState([]);
  const [searchPartNoResults, setSearchPartNoResults] = useState([]);
  const [builderId, setBuilderId] = useState("");
  const [bId, setBId] = useState("");
  const [partListNo, setPartListNo] = useState("");
  const [partListId, setPartListId] = useState("");
  const [customerData, setCustomerData] = useState({
    source: "User Generated",
    customerID: "",
    customerName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    customerGroup: "",
  });
  const [machineData, setMachineData] = useState({
    model: "",
    serialNo: "",
    smu: "",
    fleetNo: "",
    registrationNo: "",
    chasisNo: "",
  });
  const [generalData, setGeneralData] = useState({
    estimationDate: new Date(),
    estimationNo: "PL2000000",
    description: "",
    reference: "",
    validity: null,
    version: "",
  });
  const [estimationData, setEstimationData] = useState({
    preparedBy: "user1",
    approvedBy: "user1",
    preparedOn: new Date(),
    revisedBy: "user1",
    revisedOn: new Date(),
    salesOffice: null,
  });

  const [sparePart, setSparePart] = useState({
    groupNumber: "",
    partType: "",
    partNumber: "",
    quantity: "",
    unitPrice: 0.0,
    extendedPrice: 0.0,
    salesUnit: "",
    currency: "USD",
    usagePercentage: 0,
    totalPrice: 0.0,
    comment: "",
    description: "",
  });

  const validityOptions = [
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
  ];

  const salesOfficeOptions = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState("customer");
  const [open, setOpen] = useState(false);
  const [addPartOpen, setAddPartOpen] = useState(false);
  const [searchResultOpen, setSearchResultOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    // Uncomment this once the final version is active
    // createBuilder({
    //   builderType: "PARTLIST",
    //   activeVersion: true,
    //   versionNumber: 1,
    //   status: "DRAFT",
    // })
    //   .then((result) => {
    //     setBuilderId(result.builderId);
    //     setBId(result.id);
    //     addPartlist(result.id, {
    //       activeVersion: true,
    //       versionNumber: 1,
    //     })
    //       .then((partlistResult) => {
    //         setPartListNo(partlistResult.id);
    //         setPartListId(partlistResult.partlistId);
    //         setGeneralData({...generalData, estimationNo: partlistResult.partlistId})
    //         console.log(partlistResult.id, partlistResult.partlistId);
    //       })
    //       .catch((err) => {
    //         console.log("Error Occurred", err);
    //         throw "Error occurred!";
    //       });
    //   })
    //   .catch((err) => {
    //     console.log("Error Occurred", err);
    //     throw "Error occurred!";
    //   });
    // Test Data
    setBuilderId("RB00006");
    setBId(6);
    setPartListNo(3);
    setGeneralData({ ...generalData, estimationNo: "PL000003" });
  }, []);

  // Search Customer with customer ID
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    console.log("clear data", searchText);
    setSearchCustResults([]);
    customerData.customerID = searchText;
    if (searchText) {
      await customerSearch(searchCustfieldName + "~" + searchText)
        .then((result) => {
          setSearchCustResults(result);
        })
        .catch((e) => {
          throw "Error occurred while searching the customer!";
        });
    }
  };

  // Search Spare part with group number and part number
  const handleSparePartSearch = async (searchSparePartField, searchText) => {
    console.log("cleared the result", searchText);
    let searchQuerySparePart = "";
    setSearchGroupNoResults([]);
    setSearchPartNoResults([]);

    if (searchSparePartField === "groupNumber") {
      setSparePart({ ...sparePart, groupNumber: searchText });
      searchQuerySparePart = searchText
        ? searchSparePartField + "~" + searchText
        : "";
    } else if (searchSparePartField === "partNumber") {
      setSparePart({ ...sparePart, partNumber: searchText });
      searchQuerySparePart = searchText
        ? sparePart.groupNumber
          ? `groupNumber:${sparePart.groupNumber} AND partNumber~` + searchText
          : "partNumber~" + searchText
        : "";
    }
    console.log("search query", searchQuerySparePart);
    if (searchQuerySparePart) {
      await sparePartSearch(searchQuerySparePart)
        .then((result) => {
          if (result) {
            if (searchSparePartField === "groupNumber") {
              setSearchGroupNoResults(result);
            } else if (searchSparePartField === "partNumber") {
              setSearchPartNoResults(result);
            }
          }
        })
        .catch((e) => {
          throw "Error occurred while searching the sparepart!";
        });
    }
    // else {
    //   searchSparePartField === "groupNumber"
    //     ? setSearchModelResults([])
    //     : setSearchSerialResults([]);
    // }
  };

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    setCustomerData({
      ...customerData,
      customerID: currentItem.customerId,
      contactEmail: currentItem.email,
      contactName: currentItem.contactName,
      customerGroup: currentItem.priceGroup,
      customerName: currentItem.fullName,
    });
    setSearchCustResults([]);
  };

  //Individual customer field value change
  const handleCustomerDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  // Machine search based on model and serial number
  const handleModelSearch = async (searchMachinefieldName, searchText) => {
    console.log("cleared the result", searchText);
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
    console.log("search query", searchQueryMachine);
    if (searchQueryMachine) {
      await machineSearch(searchQueryMachine)
        .then((result) => {
          if (result) {
            if (searchMachinefieldName === "model") {
              setSearchModelResults(result);
            } else if (searchMachinefieldName === "serialNo") {
              setSearchSerialResults(result);
            }
          }
        })
        .catch((e) => {
          throw "Error occurred while searching the models!";
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
      });
      setSearchSerialResults([]);
    }
  };

  // Select spare part from the search results
  const handleSparePartSelect = (type, currentItem) => {
    if (type === "groupNumber") {
      setSparePart({
        ...sparePart,
        groupNumber: currentItem.groupNumber,
      });
      setSearchGroupNoResults([]);
    } else if (type === "partNumber") {
      let quantity = sparePart.quantity;
      let extendedPrice = currentItem.listPrice * quantity;
      let totalPrice = calculateTotalPrice(
        extendedPrice,
        sparePart.usagePercentage
      );
      setSparePart({
        ...sparePart,
        groupNumber: currentItem.groupNumber,
        unitPrice: currentItem.listPrice,
        partNumber: currentItem.partNumber,
        partType: currentItem.partType,
        description: currentItem.partDescription,
        extendedPrice,
        totalPrice,
        salesUnit: currentItem.salesUnit,
      });
      setSearchPartNoResults([]);
    }
  };

  //Individual machine field value change
  const handleMachineDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setMachineData({
      ...machineData,
      [name]: value,
    });
  };

  //Individual estimation details field value change
  const handleEstimationDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setEstimationData({
      ...estimationData,
      [name]: value,
    });
  };

  const updateCustomerData = () => {
    let data = {
      builderId,
      source: customerData.source,
      customerId: customerData.customerID,
      customerName: customerData.customerName,
      contactName: customerData.contactName,
      contactEmail: customerData.contactEmail,
      customerGroup: customerData.customerGroup,
      contactPhone: customerData.contactPhone,
    };
    const validator = new Validator();
    if (!validator.emailValidation(customerData.contactEmail)) {
      alert("Please enter the email address in correct format");
    } else {
      updateBuilderCustomer(bId, data)
        .then((result) => {
          setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
          setValue("machine");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateMachineData = () => {
    let data = {
      builderId,
      model: machineData.model,
      fleetNo: machineData.fleetNo,
      smu: machineData.smu,
      registrationNo: machineData.registrationNo,
      chasisNo: machineData.chasisNo,
      serialNo: machineData.serialNo,
    };
    updateBuilderMachine(bId, data)
      .then((result) => {
        setViewOnlyTab({ ...viewOnlyTab, machineViewOnly: true });
        setValue("estimation");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateGeneralData = () => {
    let data = {
      builderId,
      estimationDate: generalData.estimationDate,
      description: generalData.description,
      reference: generalData.reference,
      validityDays: generalData.validity?.value,
      estimationNumber: generalData.estimationNo,
    };
    updateBuilderGeneralDet(bId, data)
      .then((result) => {
        setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
        setValue("price");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showToast = (element) =>
    toast(element, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const updateEstData = () => {
    let data = {
      builderId,
      preparedBy: estimationData.preparedBy,
      preparedOn: estimationData.preparedOn,
      revisedBy: estimationData.revisedBy,
      revisedOn: estimationData.revisedOn,
      approver: estimationData.approvedBy,
      salesOffice: estimationData.salesOffice?.value,
    };
    updateBuilderEstimation(bId, data)
      .then((result) => {
        setViewOnlyTab({ ...viewOnlyTab, estViewOnly: true });
        setValue("general");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateTotalPrice = (extendedPrice, usage) => {
    return usage > 0 ? (usage / 100) * extendedPrice : extendedPrice;
  };
  const handleIndPartAdd = () => {
    let data = {
      groupNumber: sparePart.groupNumber,
      partNumber: sparePart.partNumber,
      partType: sparePart.partType,
      quantity: sparePart.quantity,
      unitPrice: sparePart.unitPrice,
      extendedPrice: sparePart.extendedPrice,
      currency: sparePart.currency,
      usagePercentage: sparePart.usagePercentage,
      totalPrice: sparePart.totalPrice,
      comment: sparePart.comment,
      // description: sparePart.description,
      // salesUnit: sparePart.salesUnit
    };
    addPartToPartList(partListNo, data)
      .then((result) => {
        handleAddPartClose();
        showToast(`👏 New Spare Part has been added`);
      })
      .catch((err) => {
        console.log(err);
        showToast("😐" + err);
      });
  };
  const fileTypes = ["xls", "xlsx"];

  const handleReadFile = (file) => {
    // e.preventDefault();
    if (file) {
      console.log(file.name);
      setFile(file)
    }
  };

  const handleUploadFile = () => {
    // console.log("Upload");
    setFileUploadOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleAddPartClose = () => setAddPartOpen(false);
  const handleSearchResClose = () => {
    setSearchResultOpen(false);
    setSelectedMasterData([]);
  }

  const activityOptions = ["Create Versions", "Show Errors", "Review"];

  const data = [
    {
      id: 1,
      caseId: 13322,
      BundleId: "Pc",
      Bundledescription: "Ex2487518",
      S1: "CAT DEO",
      strategy: "3",
      Standardjob: "$43.09",
      repairoption: "$100",
      frequency: "USD",
      quantity: "80%",
      part$: "$80",
      srevic$: "80% usage observed on previous work.",
      Total$: "80% usage observed on previous work.",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#872ff7",
        color: "#fff",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const columns = [
    {
      name: (
        <>
          <div>
            <Checkbox className="text-white" {...label} />
          </div>
        </>
      ),
      selector: (row) => row.standardJobId,
      wrap: true,
      sortable: true,
      maxWidth: "50px",
      minWidth: "50px",
      cell: (row) => <Checkbox className="text-black" {...label} />,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Group Number
          </div>
        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      maxWidth: "150px",
      minWidth: "150px",
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Type
          </div>
        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Part Number
          </div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
      cell: (row) => (
        <a href="#" data-toggle="modal" data-target="#Recommended">
          3
        </a>
      ),
    },
    {
      name: (
        <>
          <div>Qty</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
    },
    {
      name: (
        <>
          <div>Unit of Measures</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
    },
    {
      name: (
        <>
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
      cell: (row) => (
        <a href="#" data-toggle="modal" data-target="#Substitute">
          3
        </a>
      ),
    },
    {
      name: (
        <>
          <div>Extended Price</div>
        </>
      ),
      selector: (row) => row.frequency,
      wrap: true,
      sortable: true,
      format: (row) => row.frequency,
    },
    {
      name: (
        <>
          <div>Currency</div>
        </>
      ),
      selector: (row) => row.frequency,
      wrap: true,
      sortable: true,
      format: (row) => row.frequency,
    },
    {
      name: (
        <>
          <div>% Usage</div>
        </>
      ),
      selector: (row) => row.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row.quantity,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.part,
      wrap: true,
      sortable: true,
      format: (row) => row.part,
    },
    {
      name: (
        <>
          <div>Comments</div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      format: (row) => row.bundleId,
    },
    {
      name: (
        <>
          <div>Action</div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      // cell: row => row.bundleId,
      // cell: (row) => <button onClick={() => alert()}>1</button>,
      // cell: (row) => <Checkbox className="text-black" {...label} />,
      cell: (row) => (
        <a onClick={() => setAddPartOpen(true)} href="#">
          <FontAwesomeIcon icon={faPen} />
        </a>
      ),
      format: (row) => row.bundleId,
    },
  ];
  const columns2 = [
    { headerName: "GroupNumber", field: "groupNumber", flex: 1, width: 70 },
    { headerName: "Type", field: "partType", flex: 1, width: 130 },
    { headerName: "PartNumber", field: "partNumber", flex: 1, width: 130 },
    {
      headerName: "Description",
      field: "partDescription",
      flex: 1,
      width: 130,
    },
    { headerName: "Currency", field: "currency", flex: 1, width: 130 },
    { headerName: "Unit Price", field: "listPrice", flex: 1, width: 130 },
    { headerName: "Status", field: "status", flex: 1, width: 130 },
  ];  

  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];

  const handleOption2 = (e) => {
    setValue2(e);
  };
  const options2 = [
    { value: "archived", label: "Archived" },
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "revised", label: "Revised" },
  ];
  const options3 = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const options4 = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];
  const handleOption3 = (e) => {
    setValue3(e);
  };
  const handleOption4 = (e) => {
    setValue4(e);
  };
  const [value3, setValue3] = useState({ value: "1", label: "1" });
  const [value4, setValue4] = useState({ value: "1", label: "1" });
  const [value2, setValue2] = useState({
    value: "Archived",
    label: "Archived",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    console.log("event", event);
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleCreate = () => {
    history.push("/quoteTemplate");
  };

  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    sparePartSearch(tempArray[id].selectCategory.value + "~" + e.target.value)
      .then((res) => {
        obj.selectOptions = res;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
        $(`.scrollbar-${id}`).css("display", "block");
      })
      .catch((err) => {
        console.log("err in api call", err);
      });
    obj.inputSearch = e.target.value;
  };
  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr = "";
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr = item.selectCategory.value + ":" + item.inputSearch;
      } else if (
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectOperator.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          item.inputSearch;
      }
      return searchStr;
    });

    console.log("searchStr", searchStr);
    try {
      const res = await sparePartSearch(searchStr);
      console.log("search Query Result :", res);
      setMasterData(res);
      setSearchResultOpen(true);
      console.log("search Query Result end");
    } catch (err) {
      console.log("error in getSearchQueryCoverage", err);
    }
  };
  const addSearchQuerryHtml = () => {
    console.log(querySearchSelector[0]);
    if (
      count === 0 ||
      (count === 1 &&
        querySearchSelector[0].inputSearch &&
        querySearchSelector[0].selectCategory) ||
      (querySearchSelector[count - 1].inputSearch &&
        querySearchSelector[count - 1].selectCategory &&
        querySearchSelector[count - 1].selectOperator)
    ) {
      setQuerySearchSelector([
        ...querySearchSelector,
        {
          id: count,
          selectOperator: "",
          selectCategory: "",
          inputSearch: "",
          selectOptions: [],
          selectedOption: "",
        },
      ]);
      setCount(count + 1);
    } else {
      showToast(`Please fill the search data`);
    }
  };
  const handleSearchCategory = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleSearchCategory e:", e);
    let obj = tempArray[id];
    obj.selectCategory = e;
    tempArray[id] = obj;
    console.log(obj.selectCategory);
    setQuerySearchSelector([...tempArray]);
  };
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem[obj.selectCategory.value];
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  // const handleMasterCheck = (e, row) => {
  //   if (e.target.checked) {
  //     var _masterData = [...masterData];
  //     const updated = _masterData.map((currentItem, i) => {
  //       if (row.id == currentItem.id) {
  //         return { ...currentItem, ["check1"]: e.target.checked };
  //       } else return currentItem;
  //     });
  //     setMasterData([...updated]);
  //     setFilterMasterData([...filterMasterData, { ...row }]);
  //   } else {
  //     var _filterMasterData = [...filterMasterData];
  //     const updated = _filterMasterData.filter((currentItem, i) => {
  //       if (row.id !== currentItem.id) return currentItem;
  //     });
  //     setFilterMasterData(updated);
  //   }
  // };
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [count, setCount] = useState(1);
  // const handleDeleteIncludeSerialNo = (e, row) => {
  //   const updated = selectedMasterData.filter((obj) => {
  //     if (obj.id !== row.id) return obj;
  //   });
  //   setSelectedMasterData(updated);
  // };
  const handleRowClick = (e) => {
    setShow(true);
  };

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => masterData.find((row) => row.id === id));
    selectedRowsData.map(item => {
      let data = {
        partlistId:partListNo,
        groupNumber: item.groupNumber,
        partNumber: item.partNumber,
        partType: item.partType,
        quantity: 1,
        unitPrice: item.listPrice,
        extendedPrice: 0,
        currency: item.currency,
        totalPrice: 0,
        comment: item.comment,
        // description: sparePart.description,
        // salesUnit: sparePart.salesUnit
      };
      setSelectedMasterData([...selectedMasterData, data]);
    })
    // setSelectedMasterData(selectedRowsData);
  };

  const addSelectedPartsToPartList = () => {
    console.log(selectedMasterData);
    setSearchResultOpen(false);
    
    addMultiPartsToPartList(partListNo, selectedMasterData)
      .then((result) => {
        handleSearchResClose();        
        showToast(`👏 New parts have been added with default quantity as 1!`);        
      })
      .catch((err) => {
        console.log(err);
        showToast("😐" + err);
      });
  };

  const [show, setShow] = React.useState(false);
  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="font-weight-600 mb-0">Part List</h5>
              <div className="d-flex justify-content-center align-items-center">
                <div className="ml-3">
                  <Select
                    className="customselectbtn"
                    onChange={(e) => handleOption3(e)}
                    options={options3}
                    value={value3}
                  />
                </div>

                <div className="ml-3">
                  <Select
                    className="customselectbtn"
                    onChange={(e) => handleOption2(e)}
                    options={options2}
                    value={value2}
                  />
                </div>
                <div className="rating-star">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <React.Fragment>
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
                      onClick={handleClick}
                      size="small"
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <span className="convert mx-2">
                        Convert to
                        <span>
                          <KeyboardArrowDownIcon />
                        </span>
                      </span>
                    </IconButton>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
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
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>Templates</MenuItem>
                    <MenuItem>Standard Job</MenuItem>
                    <MenuItem>Kit</MenuItem>
                    <MenuItem data-toggle="modal" data-target="#quotecreat">
                      Quote
                    </MenuItem>
                    <Divider />
                  </Menu>
                </React.Fragment>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <a href="#" className="ml-3 font-size-14" title="Share">
                  <img src={shareIcon}></img>
                </a>
                <a
                  href="#"
                  className="ml-3 font-size-14"
                  title="Items to Review"
                >
                  <img src={folderaddIcon}></img>
                </a>
                <a href="#" className="ml-3 font-size-14" title="Upload">
                  <img src={uploadIcon}></img>
                </a>
                {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
                <a href="#" className="ml-3 font-size-14" title="Delete">
                  <img src={deleteIcon}></img>
                </a>
                <a href="#" className="ml-3 font-size-14" title="Copy">
                  <img src={copyIcon}></img>
                </a>
                <a href="#" className="ml-2">
                  <MuiMenuComponent options={activityOptions} />
                </a>
              </div>
            </div>
          </div>

          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: "contents" }}>
                <span className="mr-3">Header</span>
                <a
                  href={undefined}
                  className="btn-sm"
                  style={{ cursor: "pointer" }}
                >
                  <i
                    class="fa fa-pencil"
                    aria-hidden="true"
                    onClick={() => {
                      if (value === "customer")
                        setViewOnlyTab({ ...viewOnlyTab, custViewOnly: false });
                      else if (value === "machine")
                        setViewOnlyTab({
                          ...viewOnlyTab,
                          machineViewOnly: false,
                        });
                      else if (value === "estimation")
                        setViewOnlyTab({ ...viewOnlyTab, estViewOnly: false });
                      else if (value === "general")
                        setViewOnlyTab({
                          ...viewOnlyTab,
                          generalViewOnly: false,
                        });
                    }}
                  ></i>
                </a>{" "}
                <a href={undefined} className="btn-sm">
                  <i class="fa fa-bookmark-o" aria-hidden="true"></i>
                </a>{" "}
                <a href="#" className="btn-sm">
                  <i class="fa fa-folder-o" aria-hidden="true"></i>
                </a>
              </div>
              <div className="hr"></div>
            </h5>
            <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Customer" value="customer" />
                    <Tab label="Machine " value="machine" />
                    <Tab label="Estimation Details" value="estimation" />
                    <Tab label="General Details" value="general" />
                    <Tab label="Price" value="price" />
                  </TabList>
                </Box>
                <TabPanel value="customer">
                  {!viewOnlyTab.custViewOnly ? (
                    <>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              SOURCE
                            </label>
                            <input
                              type="text"
                              disabled
                              class="form-control border-radius-10"
                              id="customer-src"
                              placeholder="Placeholder (Required)"
                              value={customerData.source}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
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
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="customerName"
                            >
                              CUSTOMER NAME
                            </label>
                            <input
                              type="text"
                              value={customerData.customerName}
                              name="customerName"
                              onChange={handleCustomerDataChange}
                              class="form-control border-radius-10"
                              id="customerNameid"
                              placeholder="Placeholder (Optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group w-100">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="contactName"
                            >
                              CONTACT NAME
                            </label>
                            <input
                              type="text"
                              value={customerData.contactName}
                              name="contactName"
                              onChange={handleCustomerDataChange}
                              class="form-control border-radius-10"
                              id="contactNameid"
                              placeholder="Placeholder (Required)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="contatEmail"
                            >
                              CONTACT EMAIL
                            </label>
                            <input
                              type="email"
                              value={customerData.contactEmail}
                              name="contactEmail"
                              onChange={handleCustomerDataChange}
                              class="form-control border-radius-10"
                              id="contatEmail"
                              aria-describedby="emailHelp"
                              placeholder="Placeholder (Required)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="contactphone"
                            >
                              CONTACT PHONE
                            </label>
                            <input
                              type="tel"
                              class="form-control border-radius-10"
                              onChange={handleCustomerDataChange}
                              value={customerData.contactPhone}
                              name="contactPhone"
                              placeholder="Phone (Optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="customergroup"
                            >
                              CUSTOMER GROUP
                            </label>
                            <input
                              type="text"
                              value={customerData.customerGroup}
                              name="customerGroup"
                              onChange={handleCustomerDataChange}
                              class="form-control border-radius-10"
                              id="custGroup"
                              placeholder="Placeholder (Required)"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          disabled={
                            !customerData.source ||
                            !customerData.contactEmail ||
                            !customerData.customerGroup ||
                            !customerData.contactName
                          }
                          onClick={updateCustomerData}
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            SOURCE
                          </p>
                          <h6 class="font-weight-500">{customerData.source}</h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            CUSTOMER ID
                          </p>
                          <h6 class="font-weight-500">
                            {customerData.customerID}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            CUSTOMER NAME
                          </p>
                          <h6 class="font-weight-500">
                            {customerData.customerName}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            CUSTOMER EMAIL
                          </p>
                          <h6 class="font-weight-500">
                            {customerData.contactEmail}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            CONTACT PHONE
                          </p>
                          <h6 class="font-weight-500">
                            {customerData.contactPhone}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            CUSTOMER GROUP
                          </p>
                          <h6 class="font-weight-500">
                            {customerData.customerGroup}
                          </h6>
                        </div>
                      </div>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="machine">
                  {!viewOnlyTab.machineViewOnly ? (
                    <>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="model"
                            >
                              MODEL
                            </label>
                            <SearchBox
                              value={machineData.model}
                              onChange={(e) =>
                                handleModelSearch("model", e.target.value)
                              }
                              type="model"
                              result={searchModelResults}
                              onSelect={handleModelSelect}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              SERIAL #
                            </label>
                            <SearchBox
                              value={machineData.serialNo}
                              onChange={(e) =>
                                handleModelSearch("serialNo", e.target.value)
                              }
                              type="equipmentNumber"
                              result={searchSerialResults}
                              onSelect={handleModelSelect}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="smu"
                            >
                              SMU
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              id="smu-id"
                              name="smu"
                              value={machineData.smu}
                              onChange={handleMachineDataChange}
                              placeholder="Placeholder (Optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="fleet"
                            >
                              UNIT NO / FLEET NO
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              onChange={handleMachineDataChange}
                              value={machineData.fleetNo}
                              name="fleetNo"
                              id="fleet-id"
                              placeholder="Placeholder (Optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="registrationNo"
                            >
                              REGISTRATION NO
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              onChange={handleMachineDataChange}
                              value={machineData.registrationNo}
                              name="registrationNo"
                              id="registration-id"
                              placeholder="Placeholder (Optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="chasis"
                            >
                              CHASIS NO
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              id="chasis-id"
                              onChange={handleMachineDataChange}
                              value={machineData.chasisNo}
                              name="chasisNo"
                              placeholder="Placeholder (Optional)"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          disabled={!machineData.model || !machineData.serialNo}
                          onClick={updateMachineData}
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">MODEL</p>
                          <h6 class="font-weight-500">{machineData.model}</h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            SERIAL NO
                          </p>
                          <h6 class="font-weight-500">
                            {machineData.serialNo}{" "}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">SMU</p>
                          <h6 class="font-weight-500">{machineData.smu}</h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            {" "}
                            UNIT NO / FLEET NO
                          </p>
                          <h6 class="font-weight-500">{machineData.fleetNo}</h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            REGISTRATION NO
                          </p>
                          <h6 class="font-weight-500">
                            {machineData.registrationNo}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            CHASSIS NO
                          </p>
                          <h6 class="font-weight-500">
                            {machineData.chasisNo}
                          </h6>
                        </div>
                      </div>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="estimation">
                  {!viewOnlyTab.estViewOnly ? (
                    <>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PREPARED BY
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              placeholder="Required"
                              value={estimationData.preparedBy}
                              name="preparedBy"
                              onChange={handleEstimationDataChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              APPROVED BY
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              value={estimationData.approvedBy}
                              name="approvedBy"
                              onChange={handleEstimationDataChange}
                              placeholder="Placeholder (Optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="align-items-center date-box">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              PREPARED ON
                            </label>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                                variant="inline"
                                format="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                label=""
                                value={estimationData.preparedOn}
                                onChange={(e) =>
                                  setEstimationData({
                                    ...estimationData,
                                    preparedOn: e,
                                  })
                                }
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              REVISED BY
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              value={estimationData.revisedBy}
                              name="revisedBy"
                              onChange={handleEstimationDataChange}
                              placeholder="Placeholder (Optional)"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="align-items-center date-box">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              REVISED ON
                            </label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                                variant="inline"
                                format="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                label=""
                                value={estimationData.revisedOn}
                                onChange={(e) =>
                                  setEstimationData({
                                    ...estimationData,
                                    revisedOn: e,
                                  })
                                }
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
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
                              placeholder="Required"
                              value={estimationData.salesOffice}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          onClick={updateEstData}
                          disabled={
                            !estimationData.preparedBy ||
                            !estimationData.preparedOn ||
                            !estimationData.salesOffice
                          }
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            PREPARED BY
                          </p>
                          <h6 class="font-weight-500">
                            {estimationData.preparedBy}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            APPROVED BY
                          </p>
                          <h6 class="font-weight-500">
                            {estimationData.approvedBy}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            PREPARED ON
                          </p>
                          <h6 class="font-weight-500">
                            <Moment format="DD/MM/YYYY">
                              {estimationData.preparedOn}
                            </Moment>
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            REVISED BY{" "}
                          </p>
                          <h6 class="font-weight-500">
                            {estimationData.revisedBy}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            REVISED ON
                          </p>
                          <h6 class="font-weight-500">
                            <Moment format="DD/MM/YYYY">
                              {estimationData.revisedOn}
                            </Moment>
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            SALES OFFICE / BRANCH
                          </p>
                          <h6 class="font-weight-500">
                            {estimationData.salesOffice?.value}
                          </h6>
                        </div>
                      </div>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="general">
                  {!viewOnlyTab.generalViewOnly ? (
                    <>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <div className="align-items-center date-box">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              <span className=" mr-2">ESTIMATION DATE</span>
                            </label>
                            {/* <div className="form-group w-100"> */}

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                                variant="inline"
                                format="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                label=""
                                value={generalData.estimationDate}
                                onChange={(e) =>
                                  setGeneralData({
                                    ...generalData,
                                    estimationDate: e,
                                  })
                                }
                              />
                            </MuiPickersUtilsProvider>
                            {/* </div> */}
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              ESTIMATION #
                            </label>
                            <input
                              type="text"
                              disabled
                              class="form-control border-radius-10"
                              id="estNoId"
                              value={generalData.estimationNo}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              DESCRIPTION
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              id="desc-id"
                              placeholder="Required"
                              maxLength={140}
                              value={generalData.description}
                              onChange={(e) =>
                                setGeneralData({
                                  ...generalData,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              REFERENCE
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              id="desc-id"
                              placeholder="Required"
                              maxLength={140}
                              value={generalData.reference}
                              onChange={(e) =>
                                setGeneralData({
                                  ...generalData,
                                  reference: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              VALIDITY
                            </label>
                            <Select
                              // defaultValue={selectedOption}
                              onChange={(e) =>
                                setGeneralData({ ...generalData, validity: e })
                              }
                              options={validityOptions}
                              placeholder="Required"
                              value={generalData.validity}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div class="form-group">
                            <label
                              className="text-light-dark font-size-12 font-weight-500"
                              for="exampleInputEmail1"
                            >
                              VERSION
                            </label>
                            <input
                              type="text"
                              class="form-control border-radius-10"
                              placeholder="Placeholder (Optional)"
                              disabled
                              value={parseFloat(value3.value).toFixed(1)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ justifyContent: "right" }}>
                        <button
                          type="button"
                          className="btn btn-light bg-primary text-white"
                          onClick={updateGeneralData}
                          disabled={
                            !generalData.estimationDate ||
                            !generalData.description ||
                            !generalData.estimationNo ||
                            !generalData.reference ||
                            !generalData.validity
                          }
                        >
                          Save & Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="row mt-3">
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            ESTIMATION DATE{" "}
                          </p>
                          <h6 class="font-weight-500">
                            <Moment format="DD/MM/YYYY">
                              {generalData.estimationDate}
                            </Moment>
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            ESTIMATION #
                          </p>
                          <h6 class="font-weight-500">
                            {generalData.estimationNo}{" "}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            DESCRIPTION
                          </p>
                          <h6 class="font-weight-500">
                            {generalData.description}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            REFERENCE{" "}
                          </p>
                          <h6 class="font-weight-500">
                            {generalData.reference}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            VALIDTITY (DAYs)
                          </p>
                          <h6 class="font-weight-500">
                            {generalData.validity?.value}{" "}
                          </h6>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">
                            VERSION
                          </p>
                          <h6 class="font-weight-500">
                            {parseFloat(value3.value).toFixed(1)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  )}
                </TabPanel>
                <TabPanel value="price">
                  <div className="row">
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          NET PRICE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          PRICE DATE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          COST PRICE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          PRICE METHOD
                        </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-4">
                      <div class="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          ADJUSTED PRICE
                        </label>
                        <input
                          type="email"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          CURRENCY
                        </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          NET PRICE
                        </p>
                        <h6 class="font-weight-500">Mining</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PRICE DATE
                        </p>
                        <h6 class="font-weight-500">01.09.2021</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          COST PRICE
                        </p>
                        <h6 class="font-weight-500">01.09.2021</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PRICE METHOD
                        </p>
                        <h6 class="font-weight-500">List Price </h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ADJUSTED PRICE{" "}
                        </p>
                        <h6 class="font-weight-500">Mining</h6>
                      </div>
                    </div>

                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          CURRENCY{" "}
                        </p>
                        <h6 class="font-weight-500">AUD</h6>
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ justifyContent: "right" }}>
                    <button
                      type="button"
                      className="btn btn-light bg-primary text-white"
                    >
                      Next
                    </button>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <div className="card border mt-4 px-4">
            <div className="row align-items-center">
              <div className="col-8">
                <div className="d-flex align-items-center w-100">
                  <div
                    className="d-flex mr-3 col-auto pl-0"
                    style={{ whiteSpace: "pre" }}
                  >
                    <h5 className="mr-2 mb-0 text-black">
                      <span>Parts Table</span>
                    </h5>
                    <Select
                      className="customselectbtn col-auto"
                      onChange={(e) => handleOption4(e)}
                      options={options4}
                      value={value4}
                    />
                    <p className=" mb-0">
                      <a href="#" className="ml-3">
                        <FontAwesomeIcon icon={faPen} />
                      </a>
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center w-100 ">
                    <div className="row align-items-center m-0">
                      {querySearchSelector.map((obj, i) => {
                        return (
                          <>
                            <div className="customselect d-flex align-items-center mr-3 my-2">
                              {i > 0 ? (
                                <SelectFilter
                                  // isClearable={true}
                                  defaultValue={{ label: "And", value: "AND" }}
                                  options={[
                                    { label: "And", value: "AND", id: i },
                                    { label: "Or", value: "OR", id: i },
                                  ]}
                                  placeholder="&amp;"
                                  onChange={(e) => handleOperator(e, i)}
                                  // value={querySearchOperator[i]}
                                  value={obj.selectOperator}
                                />
                              ) : (
                                <></>
                              )}

                              <div>
                                <SelectFilter
                                  // isClearable={true}
                                  options={[
                                    {
                                      label: "Part No",
                                      value: "partNumber",
                                      id: i,
                                    },
                                    {
                                      label: "Description",
                                      value: "partDescription",
                                      id: i,
                                    },
                                    { label: "Model", value: "model", id: i },
                                    {
                                      label: "Group No",
                                      value: "groupNumber",
                                      id: i,
                                    },
                                    {
                                      label: "Bec Code",
                                      value: "becCode",
                                      id: i,
                                    },
                                    { label: "Type", value: "partType", id: i },
                                  ]}
                                  onChange={(e) => handleSearchCategory(e, i)}
                                  value={obj.selectCategory}
                                />
                              </div>
                              <div className="customselectsearch">
                                <input
                                  className="custom-input-sleact"
                                  type="text"
                                  placeholder="Search string"
                                  value={obj.inputSearch}
                                  onChange={(e) => handleInputSearch(e, i)}
                                  id={"inputSearch-" + i}
                                  autoComplete="off"
                                />

                                {obj.selectOptions &&
                                  obj.selectOptions.length > 0 && (
                                    <ul
                                      className={`list-group customselectsearch-list scrollbar scrollbar-${i}`}
                                      id="style"
                                    >
                                      {obj.selectOptions.map(
                                        (currentItem, j) => (
                                          <li
                                            className="list-group-item"
                                            key={j}
                                            onClick={(e) =>
                                              handleSearchListClick(
                                                e,
                                                currentItem,
                                                obj,
                                                i
                                              )
                                            }
                                          >
                                            {
                                              currentItem[
                                                obj.selectCategory.value
                                              ]
                                            }
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                              </div>
                            </div>
                          </>
                        );
                      })}
                      <div onClick={(e) => addSearchQuerryHtml(e)}>
                        <Link
                          to="#"
                          className="btn-sm text-black border mr-2"
                          style={{ border: "1px solid #872FF7" }}
                        >
                          +
                        </Link>
                      </div>
                      <div onClick={handleDeletQuerySearch}>
                        <Link to="#" className="btn-sm border">
                          <svg
                            data-name="Layer 41"
                            id="Layer_41"
                            fill="black"
                            viewBox="0 0 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title />
                            <path
                              className="cls-1"
                              d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                            />
                            <path
                              class="cls-1"
                              d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                            />
                            <path
                              class="cls-1"
                              d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                            />
                          </svg>
                          {/* <DeleteIcon className="font-size-16" /> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-right pl-3 py-3">
                  <button
                    type="button"
                    class="btn bg-primary text-white"
                    onClick={handleQuerySearchClick}
                  >
                    <SearchIcon />
                    <span className="ml-1">Search</span>
                  </button>
                  <a
                    onClick={() => setFileUploadOpen(true)}
                    style={{ cursor: "pointer" }}
                    className="btn bg-primary text-white mx-2"
                  >
                    Upload
                  </a>
                  <a
                    onClick={() => setAddPartOpen(true)}
                    href="#"
                    className="btn bg-primary text-white "
                  >
                    + Add Part
                  </a>
                </div>
              </div>
            </div>

            <DataTable
              className="mr-2"
              title=""
              columns={columns}
              data={data}
              customStyles={customStyles}
              pagination
            />
            <div className=" my-3 text-right">
              <a href="#" className="btn text-white bg-primary">
                Save
              </a>
            </div>
          </div>
          <Modal
            show={addPartOpen}
            onHide={handleAddPartClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>
                1000-Engine|23-Replace Engine|Replace Engine
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 bg-white">
              <div className="ligt-greey-bg p-3">
                <div>
                  <span className="mr-3">
                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i>
                    <span className="ml-2">Edit</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span
                      className="ml-2 cursor"
                      data-toggle="modal"
                      data-target="#Recommended"
                    >
                      Substitute parts
                    </span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span
                      className="ml-2 cursor"
                      data-toggle="modal"
                      data-target="#Substitute"
                    >
                      Recommended price
                    </span>
                  </span>
                  <span className="mr-3">
                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          GROUP NUMBER
                        </label>
                        <SearchBox
                          value={sparePart.groupNumber}
                          onChange={(e) =>
                            handleSparePartSearch("groupNumber", e.target.value)
                          }
                          type="groupNumber"
                          result={searchGroupNoResults}
                          onSelect={handleSparePartSelect}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TYPE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          value={sparePart.partType}
                          onChange={(e) =>
                            setSparePart({
                              ...sparePart,
                              partType: e.target.value,
                            })
                          }
                          disabled
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          PART NUMBER
                        </label>
                        <SearchBox
                          value={sparePart.partNumber}
                          onChange={(e) =>
                            handleSparePartSearch("partNumber", e.target.value)
                          }
                          type="partNumber"
                          result={searchPartNoResults}
                          onSelect={handleSparePartSelect}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          QTY
                        </label>
                        <input
                          type="Number"
                          class="form-control border-radius-10"
                          onChange={(e) =>
                            setSparePart({
                              ...sparePart,
                              quantity: e.target.value,
                              extendedPrice: parseFloat(
                                sparePart.unitPrice * e.target.value
                              ).toFixed(2),
                              totalPrice:
                                sparePart.usagePercentage > 0
                                  ? parseFloat(
                                      (sparePart.usagePercentage / 100) *
                                        sparePart.unitPrice *
                                        e.target.value
                                    ).toFixed(2)
                                  : parseFloat(
                                      sparePart.unitPrice * e.target.value
                                    ).toFixed(2),
                            })
                          }
                          value={sparePart.quantity}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          UNIT OF MEASURES
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          value={sparePart.salesUnit}
                          onChange={(e) =>
                            setSparePart({
                              ...sparePart,
                              salesUnit: e.target.value,
                            })
                          }
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          UNIT PRICE
                        </label>
                        <input
                          type="Number"
                          class="form-control border-radius-10"
                          value={parseFloat(sparePart.unitPrice).toFixed(2)}
                          disabled
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EXTENDED PRICE
                        </label>
                        <input
                          type="Number"
                          class="form-control border-radius-10"
                          disabled
                          // onChange={(e) => setSparePart({...sparePart, extendedPrice: e.target.value})}
                          value={parseFloat(sparePart.extendedPrice).toFixed(2)}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CURRENCY
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          onChange={(e) =>
                            setSparePart({
                              ...sparePart,
                              currency: e.target.value,
                            })
                          }
                          value={sparePart.currency}
                          placeholder="Required"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          % USAGE
                        </label>
                        <input
                          type="Number"
                          class="form-control border-radius-10"
                          onChange={(e) =>
                            setSparePart({
                              ...sparePart,
                              usagePercentage: e.target.value,
                              totalPrice: parseFloat(
                                calculateTotalPrice(
                                  sparePart.extendedPrice,
                                  e.target.value
                                )
                              ).toFixed(2),
                            })
                          }
                          value={sparePart.usagePercentage}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          TOTAL PRICE
                        </label>
                        <input
                          type="Number"
                          class="form-control border-radius-10"
                          value={parseFloat(sparePart.totalPrice).toFixed(2)}
                          disabled
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          COMMENT
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          value={sparePart.comment}
                          onChange={(e) =>
                            setSparePart({
                              ...sparePart,
                              comment: e.target.value,
                            })
                          }
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          DESCRIPTION
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          value={sparePart.description}
                          onChange={(e) =>
                            setSparePart({
                              ...sparePart,
                              description: e.target.value,
                            })
                          }
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <a
                    href="#"
                    onClick={handleAddPartClose}
                    className="btn border mr-3 "
                  >
                    {" "}
                    Cancel
                  </a>
                  <button
                    type="button"
                    className="btn btn-light bg-primary text-white"
                    onClick={handleIndPartAdd}
                    disabled={
                      !sparePart.partType ||
                      !sparePart.partNumber ||
                      !sparePart.quantity ||
                      !sparePart.unitPrice ||
                      !sparePart.extendedPrice ||
                      !sparePart.currency ||
                      !sparePart.totalPrice
                    }
                  >
                    Save
                  </button>
                  {/* <a href="#" className="btn text-white bg-primary"
                  onClick={}
                  disabled>
                    Save
                  </a> */}
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={fileUploadOpen}
            onHide={() => setFileUploadOpen(false)}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>Import Files</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              <div className="p-3">
                <div className="add-new-recod">
                  <div>
                    <FontAwesomeIcon
                      className="cloudupload"
                      icon={faCloudUploadAlt}
                    />
                    <h6 className="font-weight-500 mt-3">
                      Drag and drop files to upload <br /> or
                    </h6>
                    <FileUploader
                      handleChange={handleReadFile}
                      name="file"
                      types={fileTypes}
                      onClick={(event) => {
                        event.currentTarget.value = null;
                      }}
                    />
                  </div>
                </div>
                <p className="mt-3">
                  Single upload file should not be more than 10MB. Only the
                  .xls, .xlsx file types are allowed
                </p>
              </div>
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="recent-items mt-3">
                  <div className="d-flex justify-content-between align-items-center ">
                    <p className="mb-0 ">
                      <FontAwesomeIcon
                        className=" font-size-14"
                        icon={faFileAlt}
                      />
                      <span className="font-weight-500 ml-2">
                        Engine Partlist
                      </span>
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="white-space custom-checkbox">
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label=""
                          />
                        </FormGroup>
                      </div>
                      <a href="#" className="ml-3 font-size-14">
                        <FontAwesomeIcon icon={faShareAlt} />
                      </a>
                      <a href="#" className="ml-3 font-size-14">
                        <FontAwesomeIcon icon={faFolderPlus} />
                      </a>
                      <a href="#" className="ml-3 font-size-14">
                        <FontAwesomeIcon icon={faUpload} />
                      </a>
                      <a href="#" className="ml-2">
                        <MuiMenuComponent options={activityOptions} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                  <p className="font-size-12 mb-0">Part List </p>
                </div>
                <div className="recent-items mt-3">
                  <div className="d-flex justify-content-between align-items-center ">
                    <p className="mb-0 ">
                      <FontAwesomeIcon
                        className=" font-size-14"
                        icon={faFileAlt}
                      />
                      <span className="font-weight-500 ml-2">
                        Engine Partlist
                      </span>
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="white-space custom-checkbox">
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="" />
                        </FormGroup>
                      </div>
                      <a href="#" className="ml-3 font-size-14">
                        <FontAwesomeIcon icon={faShareAlt} />
                      </a>
                      <a href="#" className="ml-3 font-size-14">
                        <FontAwesomeIcon icon={faFolderPlus} />
                      </a>
                      <a href="#" className="ml-3 font-size-14">
                        <FontAwesomeIcon icon={faUpload} />
                      </a>
                      <a href="#" className="ml-2">
                        <MuiMenuComponent options={activityOptions} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                  <p className="font-size-12 mb-0">Part List </p>
                </div>
              </div>
            </Modal.Body>
            <div className="row m-0 p-3">
              <div className="col-md-6 col-sm-6">
                <button
                  className="btn border w-100 bg-white"
                  onClick={() => setFileUploadOpen(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-6 col-sm-6">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleUploadFile}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />
                  Upload
                </button>
              </div>
            </div>
          </Modal>
        </div>
        <div
          class="modal fade"
          id="Substitute"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ zIndex: "1200" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header p-0 ">
                <div
                  className="card w-100 p-2 m-0"
                  style={{ backgroundColor: "#F3F4FE" }}
                >
                  <div className="d-flex justify-content-between mt-3 px-3">
                    <h6>RECOMMENDED DISCOUNT PRICE</h6>
                    <a href="">$500</a>
                  </div>
                  <p className="mt-2 px-3">
                    The best suited discount for this type of quotation.
                  </p>
                  <div className="mx-3 mb-3">
                    <button
                      className="btn border w-100 bg-white"
                      style={{ borderRadius: "0.5rem" }}
                    >
                      Apply recommendation
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-body m-2">
                <div className="card w-100 border mb-0">
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5  pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2 ">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">New</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">20%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Refurb</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">30%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Reman</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">40%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-4 mb-5">
                <button
                  className="btn border w-100 text-white bg-primary"
                  style={{ borderRadius: "0.5rem" }}
                >
                  <span className="mr-2">
                    <CheckOutlinedIcon />
                  </span>
                  Apply selection
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="Recommended"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ zIndex: "1200" }}
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header p-4">
                <div className="card w-100 border mb-0">
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">New</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">20%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                      {/* <div className="listcheckbox">
            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
            </div> */}
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Refurb</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">30%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                      {/* <div className="listcheckbox">
            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
            </div> */}
                    </div>
                  </div>
                  <div className="hr w-100"></div>
                  <div className="row mt-3 px-2">
                    <div class="col-md-5 col-sm-5 pl-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          PART TYPE
                        </p>
                        <h6 class="font-weight-500">Reman</h6>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">
                          ALLOWED DISCOUNT
                        </p>
                        <h6 class="font-weight-500">40%</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        ></input>
                      </div>
                      {/* <div className="listcheckbox">
            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
            </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-4 mb-5">
                <button
                  className="btn border w-100 text-white bg-primary"
                  style={{ borderRadius: "0.5rem" }}
                >
                  <span className="mr-2">
                    <CheckOutlinedIcon />
                  </span>
                  Apply selection
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="quotecreat"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content bg-white border-none">
              <div class="modal-header border-none">
                <h5 class="modal-title" id="exampleModalLabel">
                  Quote Create
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p className="d-block px-3">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <hr className="my-1" />
              <div class="modal-body">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        Quote Type
                      </label>
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        placeholder="Cyclical"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        Quote ID
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        Description
                      </label>
                      <textarea
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div class="form-group">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        Reference
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">
                        QUOTE TYPE{" "}
                      </p>
                      <h6 class="font-weight-500">
                        Repair Quote with Spare Parts
                      </h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">Quote ID </p>
                      <h6 class="font-weight-500">SB12345</h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">
                        QUOTE DESCRIPTION
                      </p>
                      <h6 class="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12">
                    <div class="form-group mt-3">
                      <p class="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                      <h6 class="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer" style={{ display: "unset" }}>
                <div className="mb-2">
                  <a
                    href="#"
                    onClick={() => handleCreate()}
                    data-dismiss="modal"
                    className="btn bg-primary d-block text-white"
                  >
                    Done
                  </a>
                </div>
                <div>
                  <button class="btn  btn-primary">Create</button>
                  <button
                    type="button"
                    class="btn pull-right border"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={searchResultOpen}
          onHide={handleSearchResClose}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>Search Results</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0 bg-white">
            <div className="card w-100 p-2">
              <div
                className=""
                style={{
                  height: 400,
                  width: "100%",
                  backgroundColor: "#fff",
                }}
              >
                <DataGrid
                  sx={{
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#872ff7",
                      color: "#fff",
                    },
                  }}
                  rows={masterData}
                  columns={columns2}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                  onCellClick={(e) => handleRowClick(e)}
                />
              </div>
            </div>
            <div className="m-2 text-right">
              <button className="btn text-white bg-primary" onClick={addSelectedPartsToPartList}>
                + Add Selected
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default PartList;

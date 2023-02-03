import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormGroup from '@mui/material/FormGroup';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { ERROR_MAX_VERSIONS, FONT_STYLE, FONT_STYLE_SELECT } from "../Repair/CONSTANTS";
import Tab from '@mui/material/Tab';
import { customerSearch, machineSearch } from "services/searchServices";
import { toast } from "react-toastify";
import {
  getSearchCoverageForFamily,
  getSearchQueryCoverage,
  getConvertQuoteData,
  solutionQuoteCreation,
} from "../../services/index";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Select1 from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import DateFnsUtils from "@date-io/date-fns";
import Menu from '@mui/material/Menu';
import SearchBox from "pages/Repair/components/SearchBox";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddIcon from '@mui/icons-material/Add';
import { styled, alpha } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import Button from '@mui/material/Button';
import boxicon from '../../assets/icons/png/box.png'
import { FileUploader } from "react-drag-drop-files";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DataTable from 'react-data-table-component';
import FormControlLabel from '@mui/material/FormControlLabel';
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import Checkbox from '@mui/material/Checkbox';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import EditIcon from '@mui/icons-material/Edit';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { CommanComponents } from "../../components/index"
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { MuiMenuComponent } from "pages/Operational";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
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
          borderRight: "1px solid rgba(0,0,0,.12)",
      },
  },
  cells: {
      style: {
          paddingLeft: "8px", // override the cell padding for data cells
          paddingRight: "8px",
          borderRight: "1px solid rgba(0,0,0,.12)",
      },
  },
};

const RepairBuilderRepairOption = () => {
  const [age, setAge] = React.useState('');
  const [open1, setOpen1] = React.useState(false);
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');
  const [show, setShow] = React.useState(false);
  const [customerData, setCustomerData] = useState({
    source: "User Generated",
    // source: "",
    customerID: "",
    customerName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    customerGroup: "",
  });
  const [quoteDataId, setQuoteDataId] = useState(0);
  const handleMachineSearch = async (searchMachinefieldName, searchText) => {
    // console.log("cleared the result", searchText);
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
      // searchQueryMachine = searchText
      //     ? machineData.model
      //         ? `model:${machineData.model} AND equipmentNumber~` + searchText
      //         : "equipmentNumber~" + searchText
      //     : "";
      searchQueryMachine = searchText
        ? "equipmentNumber~" + searchText
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
          handleSnack(
            "error",
            true,
            "Error occurred while searching the machine!"
          );
        });
    } else {
      searchMachinefieldName === "model"
        ? setSearchModelResults([])
        : setSearchSerialResults([]);
    }
  };
  const handleSnack = (snackSeverity, snackStatus, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(snackStatus);
  };
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    // console.log("clear data", searchText);
    setSearchCustResults([]);
    customerData.customerID = searchText;
    if (searchText) {
      await customerSearch(searchCustfieldName + "~" + searchText)
        .then((result) => {
          setSearchCustResults(result);
        })
        .catch((e) => {
          handleSnack(
            "error",
            true,
            "Error occurred while searching the customer!"
          );
        });
    }
  };
  const [searchCustResults, setSearchCustResults] = useState([]);
  const handleCustSelect = (type, currentItem) => {
    setCustomerData({
      ...customerData,
      customerID: currentItem.customerId,
      contactEmail: currentItem.email,
      contactName: currentItem.contactName,
      // customerGroup: currentItem.priceGroup,
      customerGroup: currentItem.customerGroup,
      customerName: currentItem.fullName,
    });
    setSearchCustResults([]);
  };
  const handleCustomerDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    // console.log("customerData conatct value : ",value)
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };
  const [estimateDetails, setEstimateDetails] = useState({
    preparedBy: "",
    approvedBy: "",
    preparedOn: new Date(),
    revisedBy: "",
    revisedOn: new Date(),
    salesOffice: "",
  });
  const [machineData, setMachineData] = useState({
    model: "",
    serialNo: "",
    smu: "",
    fleetNo: "",
    registrationNo: "",
    chasisNo: "",
  });
  const handleMachineDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setMachineData({
      ...machineData,
      [name]: value,
    });
  };
  const handleModelSelect = (type, currentItem) => {
    if (type === "model") {
      setMachineData({
        ...machineData,
        model: currentItem.model,
        fleetNo: currentItem.stockNumber,
        smu: currentItem.sensorId,

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
  const [searchModelResults, setSearchModelResults] = useState([]);
  const [searchSerialResults, setSearchSerialResults] = useState([]);
  const [generalDetails, setGeneralDetails] = useState({
    quoteDate: new Date(),
    quote: "",
    description: "",
    reference: "",
    validity: "",
    version: "",
    salesOffice: "",
  });
  const handleEstimateDetailsDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setEstimateDetails({
      ...machineData,
      [name]: value,
    });
  };
  const handleNextClick = async (e) => {
    try {
      if (e.target.id === "customer") {
        // 
        if (customerData.customerID === "") {
          throw "Customer ID must not be Empty."
        }

        let solutionQuoteObj = {
          quoteType: "SOLUTION_QUOTE",
          source: customerData.source,
          customerId: customerData.customerID,
          model: machineData.model,
          serialNumber: machineData.serialNo,
          smu: machineData.smu,
          fleetNo: machineData.fleetNo,
          registrationNo: machineData.registrationNo,
          chasisNo: machineData.chasisNo,
          preparedBy: estimateDetails.preparedBy,
          approvedBy: estimateDetails.approvedBy,
          preparedOn: estimateDetails.preparedOn,
          revisedBy: estimateDetails.revisedBy,
          revisedOn: estimateDetails.revisedOn,
          salesOffice: estimateDetails.salesOffice,
          quoteDate: generalDetails.quoteDate,
          description: generalDetails.description,
          reference: generalDetails.reference,
          validity: generalDetails.validity != "" ? generalDetails.validity : "ALLOWED",
          version: generalDetails.version,
          netPrice: 0,
          priceDate: "",
          costPrice: 0,
          priceMethod: "LIST_PRICE",
          adjustedPrice: 0,
          currency: "",
          status: "PENDING_ACTIVE",
          tenantId: 74,
          sbQuoteItems: [],
          rbQuoteItems: [],
          plQuoteItems: []
        }

        const solutionRes = await solutionQuoteCreation(solutionQuoteObj);
        if (solutionRes.status === 200) {
          toast(`👏 Quote Created Successfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setValue("machine");
          // setViewOnlyTab({ ...viewOnlyTab, generalViewOnly: true });
          //   setGeneralComponentData({
          //     ...generalComponentData,
          //     portfolioId: solutionRes.data.portfolioId,
          //   });
          setQuoteDataId(solutionRes.data.quoteId);
          //   setPortfolioId(solutionRes.data.portfolioId);
          //   setNameIsNotEditAble(true);
        }

      } else if (e.target.id === "machine") {
        setValue("estimationDetails");
      } else if (e.target.id === "estimationDetails") {
        setValue("generalDetails");
      } else if (e.target.id === "generalDetails") {
        setValue("price");
      } else if (e.target.id === "price") {
        setValue("shipping_billing");
      } else if (e.target.id === "shipping_billing") {
        console.log("final")
      }
      console.log("e.target.id", e.target.id)

    } catch (error) {
      toast("😐" + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  }
  const rows4 = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, },
    { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, },
  ];
  const rows3 = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, },
    { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, },
  ];
  const masterColumns3 = [
    {
      name: (
        <>
          <div>Price Breakup</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Price Summary Type</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Estimated $</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Discounts %</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
  ]
  const masterColumns4 = [
    {
      name: (
        <>
          <div>Other Misc Type $</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Price</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
  ]
  const rows2 = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, },
    { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, },
  ];
  const masterColumns2 = [
    {
      name: (
        <>
          <div>Payers</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Billing Split %</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
    {
      name: (
        <>
          <div>Price $</div>
        </>
      ),
      selector: (row) => row.sbQuoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.sbQuoteId,
    },
  ]
  const generalValidityOptions = [
    { label: "Allowed", value: "ALLOWED" },
    { label: "Denied", value: "DENIED" },
    { label: "Indeterminate", value: "INDETERMINATE" },
  ]
  const handleGeneralDetailsDataChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    setGeneralDetails({
      ...machineData,
      [name]: value,
    });
  };
  const handleOpen = () => setShow(true)

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleClose1 = () => {
    setShow(false)
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,

    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const [value, setValue] = React.useState('customer');
  const steps = [
    'Draft',
    'Reviewed',
    'Sent to Costomer',
    'In revision',
    'Revised',
    'Accepted',

  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  const data = [
    {
      id: 1,
      caseId: 13322,
      BundleId: 'Pc',
      Bundledescription: 'Ex2487518',
      S1: "CAT DEO",
      strategy: '3',
      Standardjob: '$43.09',
      repairoption: '$100',
      frequency: 'USD',
      quantity: '80%',
      part$: '$80',
      srevic$: '80% usage observed on previous work.',
      Total$: '80% usage observed on previous work.',

    },
  ]


  const columns = [
    {
      name: <><div><img className='mr-2' src={boxicon}></img>Case ID</div></>,
      selector: row => row.caseId,
      sortable: true,
      maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      cell: row => row.caseId,
    },
    {
      name: <><div><img className='mr-2' src={boxicon}></img>Bundle iD</div></>,
      selector: row => row.BundleId,
      wrap: true,
      sortable: true,
      cell: (row) => <div><HexagonOutlinedIcon className="font-size-18 mr-2" />{row.BundleId}</div>
    },
    {
      name: <><div>Bundle Description
      </div></>,
      selector: row => row.Bundledescription,
      wrap: true,
      sortable: true,
      cell: (row) => <div>
        <div style={{ fontWeight: '600' }}>{row.Bundledescription}</div>
        <div className=" font-size-12">{row.S1}</div>
      </div>
      // format: row =>row.Source,
    },
    {
      name: <><div>strategy
      </div></>,
      selector: row => row.strategy,
      wrap: true,
      sortable: true,
      format: row => row.strategy,
    },
    {
      name: <><div>Standard job
      </div></>,
      selector: row => row.Standardjob,
      wrap: true,
      sortable: true,
      format: row => row.Standardjob,
    },
    {
      name: <><div>repair Option
      </div></>,
      selector: row => row.repairoption,
      wrap: true,
      sortable: true,
      format: row => row.repairoption,
    },
    {
      name: <><div>frequency
      </div></>,
      selector: row => row.frequency,
      wrap: true,
      sortable: true,
      format: row => row.frequency
      ,
    },
    {
      name: <><div>% Usage
      </div></>,
      selector: row => row.Usage,
      wrap: true,
      sortable: true,
      format: row => row.Usage
      ,
    },

    {
      name: <><div>Total price
      </div></>,
      selector: row => row.Totalprice,
      wrap: true,
      sortable: true,
      format: row => row.Totalprice
      ,
    },
    {
      name: <><div>Comments
      </div></>,
      selector: row => row.Comments,
      wrap: true,
      sortable: true,
      minWidth: '200px',
      format: row => row.Comments
      ,
    },

    {
      name: 'Actions',
      button: true,
      minWidth: '200px',
      cell: (row) =>
        <div className="d-flex align-items-center">
          <div className="">
            <Link><span className="mr-2"><MoreVertIcon className="font-size-18" /></span>More Actions</Link>

          </div>

        </div>
      // cell: () => <Button>Download Poster</Button>,
    },
  ];

  return (
    <>
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div className="container-fluid mt-4">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0" style={{ fontSize: "18px" }}>Repair Option</h5>
            <div className="d-flex justify-content-center align-items-center">
              <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Items to review"><img src={folderaddIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
              {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
              <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
              <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

            </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex bg-primary p-3 border-radius-10 align-items-center mb-0">
              <div className="" style={{ display: 'contents' }}><span className="mr-3 text-white" style={{ whiteSpace: 'pre', fontSize: "20px" }}>Quote Header</span>
                <a href="#" className="btn-sm text-white"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                <a href="#" className="btn-sm text-white"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                <a href="#" className="btn-sm text-white"><DriveFolderUploadOutlinedIcon /></a></div>
              {/* <div class="hr"></div> */}
            </h5>
            <Box className="mt-4 tab2" sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList className="" onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Customer" value="customer" className="heading-tabs" />
                    <Tab label="Machine " value="machine" className="heading-tabs" />
                    <Tab label="Estimation Details" value="estimationDetails" className="heading-tabs" />
                    <Tab label="General Details" value="generalDetails" className="heading-tabs" />
                    <Tab label="Price" value="price" className="heading-tabs" />
                    <Tab label="Shipping / Billing" value="shipping_billing" className="heading-tabs" />
                  </TabList>
                </Box>
                <TabPanel value="customer">
                  <div class="row mt-4 input-fields">
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOURCE</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                          name="source"
                          disabled={true}
                          value={customerData.source}
                          onChange={handleCustomerDataChange}
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER ID</label>
                      <div class="form-group w-100" style={{ position: "relative" }}>
                        {/* <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" /> */}
                        <SearchBox
                          value={customerData.customerID}
                          onChange={(e) =>
                            handleCustSearch("customerId", e.target.value)
                          }
                          type="customerId"
                          result={searchCustResults}
                          onSelect={handleCustSelect}
                        />
                        {/* <span className="search-absolute"><SearchIcon /></span> */}
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER NAME</label>
                      <div class="form-group w-100">
                        <input
                          value={customerData.customerName}
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          disabled={true}
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500 " for="exampleInputEmail1">CONTACT EMAIL</label>
                      <div class="form-group w-100">
                        <input
                          value={customerData.contactEmail}
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          disabled={true}
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CONTACT PHONE</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="contactPhone"
                          onChange={handleCustomerDataChange}
                          value={customerData.contactPhone}
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER GROUP</label>
                      <div class="form-group w-100">
                        <input
                          value={customerData.customerGroup}
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          disabled={true}
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>

                  </div>
                  <div className="row mt-4">
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">SOURCE</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">CUSTOMER ID</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">CUSTOMER NAME</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">CONTACT EMAIL</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">CONTACT PHONE</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">CUSTOMER GROUP</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div class="form-group">
                        <Link
                          className="btn bg-primary text-white pull-right"
                          id="customer"
                          onClick={handleNextClick}
                        >
                          Save & Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="machine">
                  <div className="row mt-4 input-fields">
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MODEL</label>
                      <div class="form-group w-100">
                        {/* <SearchBox
                                                    value={machineData.model}
                                                    onChange={(e) =>
                                                        handleMachineSearch("model", e.target.value)
                                                    }
                                                    type="model"
                                                    result={searchSerialResults}
                                                    onSelect={handleModelSelect}
                                                /> */}
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={machineData.model}
                          disabled={true}
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SERIAL #</label>
                      <div class="form-group w-100">
                        {/* <input
                                                    type="email"
                                                    class="form-control border-radius-10 text-primary"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Placeholder (Optional)" /> */}
                        <SearchBox
                          value={machineData.serialNo}
                          onChange={(e) =>
                            handleMachineSearch("serialNo", e.target.value)
                          }
                          type="equipmentNumber"
                          result={searchSerialResults}
                          onSelect={handleModelSelect}
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SMU</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="smu"
                          value={machineData.smu}
                          onChange={handleMachineDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT NO / FLEET NO</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="fleetNo"
                          value={machineData.fleetNo}
                          onChange={handleMachineDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REGISTRATION NO</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="registrationNo"
                          value={machineData.registrationNo}
                          onChange={handleMachineDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CHASIS NO</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="chasisNo"
                          value={machineData.chasisNo}
                          onChange={handleMachineDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-sm-6">
                                            <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">DATE</label>
                                            <div className="d-flex align-items-center">
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                                <div className="form-group mx-2">To</div>
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div> */}
                    {/* <div className="col-md-6 col-sm-6">
                                            <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">HOUR</label>
                                            <div className="d-flex align-items-center">
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                                <div className="form-group mx-2">To</div>
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div> */}
                  </div>
                  <div className="row mt-4">
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">MODEL</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">SERIAL #</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">SMU</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">UNIT NO / FLEET NO</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">MODEL</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">MODEL</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div class="form-group">
                        <Link
                          className="btn bg-primary text-white pull-right"
                          id="machine"
                          onClick={handleNextClick}
                        >
                          Save & Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="estimationDetails">
                  <div className="row mt-4 input-fields">
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PREPARED BY </label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="preparedBy"
                          value={estimateDetails.preparedBy}
                          onChange={handleEstimateDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">APPROVED BY</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="approvedBy"
                          value={estimateDetails.approvedBy}
                          onChange={handleEstimateDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PREPARED ON</label>
                      <div className="d-flex align-items-center date-box w-100">
                        <div class="form-group w-100">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              variant="inline"
                              format="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              label=""
                              name="preparedOn"
                              value={estimateDetails.preparedOn}
                              onChange={(e) =>
                                setEstimateDetails({
                                  ...estimateDetails,
                                  preparedOn: e,
                                })
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REVISED BY</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="revisedBy"
                          value={estimateDetails.revisedBy}
                          onChange={handleEstimateDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REVISED ON</label>
                      <div className="d-flex align-items-center date-box w-100">
                        <div class="form-group w-100">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              variant="inline"
                              format="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              label=""
                              name="revisedOn"
                              value={estimateDetails.revisedOn}
                              onChange={(e) =>
                                setEstimateDetails({
                                  ...estimateDetails,
                                  revisedOn: e,
                                })
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SALES OFFICE / BRANCH</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="salesOffice"
                          value={estimateDetails.salesOffice}
                          onChange={handleEstimateDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">PREPARED BY</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">APPROVED BY</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">PREPARED ON</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">REVISED BY</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">REVISED ON</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">SALES OFFICE / BRANCH</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div class="form-group">
                        <Link
                          className="btn bg-primary text-white pull-right"
                          id="estimationDetails"
                          onClick={handleNextClick}
                        >
                          Save & Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="generalDetails">
                  <div className="row mt-4 input-fields">
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QUOTE DATE</label>
                      <div className="d-flex align-items-center date-box w-100">
                        <div class="form-group w-100">
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              variant="inline"
                              format="dd/MM/yyyy"
                              className="form-controldate border-radius-10"
                              label=""
                              name="quoteDate"
                              value={generalDetails.quoteDate}
                              onChange={(e) =>
                                setGeneralDetails({
                                  ...generalDetails,
                                  quoteDate: e,
                                })
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      </div>
                      {/* <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div> */}
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QUOTE #</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="quote"
                          value={generalDetails.quote}
                          onChange={handleGeneralDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QUOTE DESCRIPTION</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="description"
                          value={generalDetails.description}
                          onChange={handleGeneralDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REFERENCE</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="reference"
                          value={generalDetails.reference}
                          onChange={handleGeneralDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)"
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">VALIDITY</label>
                      <div class="form-group w-100">
                        {/* <input
                                                    type="email"
                                                    class="form-control border-radius-10 text-primary"
                                                    id="exampleInputEmail1"
                                                    name="validity"
                                                    value={generalDetails.validity}
                                                    onChange={handleGeneralDetailsDataChange}
                                                    aria-describedby="emailHelp"
                                                    placeholder="Placeholder (Optional)"
                                                /> */}
                        <Select
                          onChange={(e) =>
                            setGeneralDetails({
                              ...machineData,
                              validity: e,
                            })
                          }
                          className="text-primary"
                          options={generalValidityOptions}
                          placeholder="Required"
                          value={generalDetails.validity}
                          styles={FONT_STYLE_SELECT}
                        />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">VERSION</label>
                      <div class="form-group w-100">
                        <input
                          type="email"
                          class="form-control border-radius-10 text-primary"
                          id="exampleInputEmail1"
                          name="version"
                          value={generalDetails.version}
                          onChange={handleGeneralDetailsDataChange}
                          aria-describedby="emailHelp"
                          placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 row">
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">QUOTE DATE</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">QUOTE #</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">QUOTE DESCRIPTION</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">VALIDITY</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">VERSION</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div class="form-group">
                        <Link
                          className="btn bg-primary text-white pull-right"
                          id="generalDetails"
                          onClick={handleNextClick}
                        >
                          Save & Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="price">
                  <div class="row mt-4">
                    <div class="col-md-3 col-sm-3">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">ACCOUNT NAME</p>
                        <div>
                          <FormControl className="customseleact">
                            <Select1 className=""
                              multiple
                              displayEmpty
                              value={personName}
                              onChange={handleChange1}
                              input={<OutlinedInput />}
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return <em>30dayes</em>;
                                }

                                return selected.join(', ');
                              }}
                              MenuProps={MenuProps}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem disabled value="">
                                <em>30dayes</em>
                              </MenuItem>
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, personName, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select1>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">BILLING FREQUENCY</p>
                        <div>
                          <FormControl className="customseleact">
                            <Select1 className=""
                              multiple
                              displayEmpty
                              value={personName}
                              onChange={handleChange1}
                              input={<OutlinedInput />}
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return <em>30dayes</em>;
                                }

                                return selected.join(', ');
                              }}
                              MenuProps={MenuProps}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem disabled value="">
                                <em>30dayes</em>
                              </MenuItem>
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, personName, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select1>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">PRICE SEGMENT</p>
                        <div>
                          <FormControl className="customseleact">
                            <Select1 className=""
                              multiple
                              displayEmpty
                              value={personName}
                              onChange={handleChange1}
                              input={<OutlinedInput />}
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return <em>30dayes</em>;
                                }

                                return selected.join(', ');
                              }}
                              MenuProps={MenuProps}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem disabled value="">
                                <em>30dayes</em>
                              </MenuItem>
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, personName, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select1>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">NET PRICE</p>
                        <h6 class="font-weight-600"><MonetizationOnOutlinedIcon className="text-light font-size-36" /></h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">MARGIN (25%)</p>
                        <h6 class="font-weight-600">752.740.10</h6>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-3">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">FLAT RATE(ALL $)</p>
                        <h6 class="font-weight-600">No</h6>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">CURRENCY</p>
                        <div>
                          <FormControl className="customseleact">
                            <Select1 className=""
                              multiple
                              displayEmpty
                              value={personName}
                              onChange={handleChange1}
                              input={<OutlinedInput />}
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return <em>30dayes</em>;
                                }

                                return selected.join(', ');
                              }}
                              MenuProps={MenuProps}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem disabled value="">
                                <em>30dayes</em>
                              </MenuItem>
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, personName, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select1>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-sm-2">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
                        <h6 class="font-weight-600">21.01.2022</h6>
                      </div>
                    </div>
                    <div class="col-md-3 col-sm-3">
                      <div class="form-group ">
                        <p class="font-size-12 font-weight-500 mb-2">DISCOUNT</p>
                        <div>
                          <FormControl className="customseleact position-relative percent-p">
                            <span className="percent-div bg-white p-1 text-primary" style={{ borderRadius: "50%" }}>
                              8%
                            </span>
                            <Select1 className="btn bg-green text-white"
                              multiple
                              displayEmpty
                              value={personName}
                              onChange={handleChange1}
                              input={<OutlinedInput />}
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return <em>30dayes</em>;
                                }

                                return selected.join(', ');
                              }}
                              MenuProps={MenuProps}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem disabled value="">
                                <em>30dayes</em>
                              </MenuItem>
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, personName, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select1>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <a href="#" className="btn bg-primary text-white"><AddIcon className="mr-2" />ADD PAYER</a>
                  <div className="mt-3">
                    <DataTable
                      className=""
                      title=""
                      columns={masterColumns2}
                      data={rows2}
                      customStyles={customStyles}
                      pagination
                      // onRowClicked={(e) => handleRowClick(e)}
                      selectableRows
                    />
                  </div>
                  <div className="mt-3 d-flex align-items-center justify-content-between">
                    <h6 className="mb-0 font-size-16 font-weight-600">PRICE/ESTIMATE SUMMARY</h6>
                    <div className="d-flex align-items-center">
                      <a href="#" className="text-primary mr-3"><ModeEditOutlineOutlinedIcon /></a>
                      <a href="#" className="text-primary mr-3"><ShareOutlinedIcon /></a>
                      <a href="#" className="btn bg-primary text-white"><AddIcon className="mr-2" />Add Price Summary Type</a>
                    </div>
                  </div>
                  <div className="mt-3">
                    <DataTable
                      className=""
                      title=""
                      columns={masterColumns3}
                      data={rows3}
                      customStyles={customStyles}
                      pagination
                      // onRowClicked={(e) => handleRowClick(e)}
                      selectableRows
                    />
                  </div>
                  <div className="mt-3 d-flex align-items-center justify-content-between">
                    <h6 className="mb-0 font-size-16 font-weight-600">OTHER MISC ITEMS $</h6>
                    <div className="d-flex align-items-center">
                      <a href="#" className="text-primary mr-3"><ModeEditOutlineOutlinedIcon /></a>
                      <a href="#" className="text-primary mr-3"><ShareOutlinedIcon /></a>
                      <a href="#" className="btn bg-primary text-white"><AddIcon className="mr-2" />Add Miscellaenous Type</a>
                    </div>
                  </div>
                  <div className="mt-3">
                    <DataTable
                      className=""
                      title=""
                      columns={masterColumns4}
                      data={rows4}
                      customStyles={customStyles}
                      pagination
                      // onRowClicked={(e) => handleRowClick(e)}
                      selectableRows
                    />
                  </div>
                  {/* <div class="row mt-4 input-fields">
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">NET PRICE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE DATE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COST PRICE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ADJUSTED PRICE</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MARGIN</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                                            <div class="form-group w-100">
                                                <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">NET PRICE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">COST PRICE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">ADJUSTED PRICE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">MARGIN</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">CURRENCY</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <Link className="btn bg-primary text-white pull-right">
                                                    Save & Next
                                                </Link>
                                            </div>
                                        </div>
                                    </div> */}
                </TabPanel>
                <TabPanel value="shipping_billing">
                  <div className="row mt-4 input-fields">
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DELIVERY TYPE</label>
                      <div class="form-group w-100">
                        <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DELIVERY PRIORITY</label>
                      <div class="form-group w-100">
                        <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PAYMENT TERMS</label>
                      <div class="form-group w-100">
                        <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">BILLING FREQUENCY</label>
                      <div class="form-group w-100">
                        <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PAYER (s)</label>
                      <div class="form-group w-100">
                        <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">% SPLIT</label>
                      <div class="form-group w-100">
                        <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">NET PAYABLE BY PAYER</label>
                      <div class="form-group w-100">
                        <input type="email" class="form-control border-radius-10 text-primary" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">DELIVERY TYPE</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">DELIVERY PRIORITY</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">PAYMENT TERMS</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">BILLING FREQUENCY</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">PAYER (s)</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">% SPLIT</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                      <div class="form-group">
                        <p class="font-size-12 font-weight-500 mb-2">NET PAYABLE BY PAYER</p>
                        <h6 class="font-weight-600">X1234</h6>
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div class="form-group">
                        <Link
                          className="btn bg-primary text-white pull-right"
                          id="shipping_billing"
                          onClick={handleNextClick}
                        >
                          Save & Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPanel>

              </TabContext>
            </Box>
          </div>
        </div>
      </div>

    </>
  )
}

export default RepairBuilderRepairOption
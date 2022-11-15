import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TabContext from "@mui/lab/TabContext";
import Checkbox from "@mui/material/Checkbox";
import TabList from "@mui/lab/TabList";
import DataTable from "react-data-table-component";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { DataGrid } from "@mui/x-data-grid";
import $ from "jquery";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { default as Select, default as SelectFilter } from "react-select";
import { getSearchCoverageForFamily } from "../../services/index";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useEffect } from "react";
import {
  AddServiceHeader,
  FetchServiceHeader,
  AddLaborToService,
  FetchLabourforService,
  AddConsumableToService,
  AddExtWorkToService,
  AddMiscToService,
} from "services/repairBuilderServices";
import Moment from "react-moment";
import { useAppSelector } from "app/hooks";
// import {
//   selectCategoryList,
//   selectStrategyTaskOption,
//   taskActions,
// } from "pages/PortfolioAndBundle/customerSegment/strategySlice";

import {
  selectDropdownOption,
  selectChargeCodeList,
  repairActions,
  selectLaborTypeList,
  selectServiceTypeList,
  selectLaborCodeList,
  selectPricingMethodList,
} from "pages/Repair/dropdowns/repairSlice";

import Loader from "react-js-loader";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { useDispatch } from "react-redux";
import SearchBox from "./components/SearchBox";
import { getVendors } from "services/searchServices";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

function RepairServiceEstimate(props) {
  const { activeElement, setActiveElement } = props.builderDetails;
  const [serviceEstHeaderLoading, setServiceEstHeaderLoading] = useState(true);
  const [flagRequired, setFlagRequired] = useState({
    flagLaborReq: true,
    flagConsumableReq: true,
    flagExtWorkReq: true,
    flagMiscReq: true,
  });
  const [serviceEstimateData, setServiceEstimateData] = useState({
    reference: "",
    description: "",
    segmentTitle: "",
    jobOperation: "",
    priceMethod: null,
    priceDate: new Date(),
    currency: "USD",
    netPrice: "",
    jobCode: "",
  });
  const [labourData, setLabourData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    laborCode: "",
    pricingMethod: "",
    ratePerHourOrDay: 0,
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
  });
  const [labourItemData, setLabourItemData] = useState({
    chargeCode: "",
    laborType: "",
    serviceType: "",
    unitOfMeasure: "",
    estimatedHours: 0,
    unitPrice: 0.0,
    extendedPrice: 0.0,
    totalPrice: 0.0,
    currency: "",
    comments: "",
    travelIncluded: true,
    travelCharge: 0.0,
    inspectionIncluded: true,
    inspectionCharge: 0.0,
  });
  const [consumableData, setConsumableData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
  });
  const [extWorkData, setExtWorkData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
    supplyingVendor: "",
  });
  const [miscData, setMiscData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    adjustedPrice: 0.0,
    typeOfMisc: "",
  });
  const [noOptionsVendor, setNoOptionsVendor] = useState(false);
  const [searchVenodrResults, setSearchVendorResults] = useState([]);
  // const [priceMethodOptions, setPriceMethodOptions] = useState([]);
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [viewOnlyTab, setViewOnlyTab] = useState({
    laborViewOnly: false,
    consumableViewOnly: false,
    extWorkViewOnly: false,
    miscViewOnly: false,
  });
  const [serviceHeaderViewOnly, setServiceHeaderViewOnly] = useState(false);
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlagRequired({
      ...flagRequired,
      [event.target.name]: event.target.checked,
    });
  };
  const chargeCodeList = useAppSelector(
    selectDropdownOption(selectChargeCodeList)
  );
  const laborTypeList = useAppSelector(
    selectDropdownOption(selectLaborTypeList)
  );
  const serviceTypeList = useAppSelector(
    selectDropdownOption(selectServiceTypeList)
  );

  const laborCodeList = useAppSelector(
    selectDropdownOption(selectLaborCodeList)
  );
  const priceMethodOptions = useAppSelector(
    selectDropdownOption(selectPricingMethodList)
  );

  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState("labor");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairActions.fetchDropdowns());
    if (activeElement.oId) {
      setServiceEstHeaderLoading(true);
      FetchServiceHeader(activeElement.oId)
        .then((result) => {
          setServiceEstimateData({
            ...serviceEstimateData,
            reference: result.reference,
            id: result.id,
            // currency: result.currency, //TODO: Uncomment this once currecy is updated.
            description: result.description,
            jobCode: result.jobCode,
            jobOperation: result.jobOperation,
            netPrice: result.netPrice,
            priceDate: result.priceDate,
            priceMethod: priceMethodOptions.find(
              (element) => element.value === result.priceMethod
            ),
            segmentTitle: result.segmentTitle,
          });
          setServiceHeaderViewOnly(result.id ? true : false);
          FetchLabourforService(result.id).then(resultLabour => {
            if(resultLabour){
              console.log( "in if", laborCodeList.find(
                (element) => element.value === resultLabour.laborCode
              ));
              setLabourData({
                ...resultLabour,
                id: resultLabour.id,
                pricingMethod: priceMethodOptions.find(
                  (element) => element.value === resultLabour.pricingMethod
                ),
                laborCode: laborCodeList.find(
                  (element) => element.value === resultLabour.laborCode
                ),
                payer: options.find(
                  (element) => element.value === resultLabour.payer
                ),
              });
              setViewOnlyTab({...viewOnlyTab, laborViewOnly: true});
            } 
          }).catch(e => {
            setLabourData({
              ...labourData,
              jobCode: result.jobCode,
              jobCodeDescription: result.jobOperation,
            });
          })
          
          setConsumableData({
            ...consumableData,
            jobCode: result.jobCode,
            jobCodeDescription: result.jobCodeDescription,
          });
          setExtWorkData({
            ...extWorkData,
            jobCode: result.jobCode,
            jobCodeDescription: result.jobOperation,
          });
          setMiscData({
            ...miscData,
            jobCode: result.jobCode,
            jobCodeDescription: result.jobOperation,
          });
        })
        .catch((e) => {
          handleSnack(
            "error",
            "Error occurred while fetching the estimate header details!"
          );
        });
      setServiceEstHeaderLoading(false);
    }
  }, []);

  const makeHeaderEditable = (type) => {
    if (type === "serviceEstHeader" && serviceHeaderViewOnly)
      setServiceHeaderViewOnly(false);
    if (value === "labor" && viewOnlyTab.laborViewOnly)
      setViewOnlyTab({ ...viewOnlyTab, laborViewOnly: false });
    else if (value === "consumable" && viewOnlyTab.consumableViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        consumableViewOnly: false,
      });
    else if (value === "extWork" && viewOnlyTab.extWorkViewOnly)
      setViewOnlyTab({ ...viewOnlyTab, extWorkViewOnly: false });
    else if (value === "misc" && viewOnlyTab.miscViewOnly)
      setViewOnlyTab({
        ...viewOnlyTab,
        miscViewOnly: false,
      });
  };
  // Search Vendors
  const handleVendorSearch = async (searchVendorfieldName, searchText) => {
    // console.log("clear data", searchText);
    setSearchVendorResults([]);
    extWorkData.supplyingVendor = searchText;
    if (searchText) {
      await getVendors("fullName~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchVendorResults(result);
            setNoOptionsVendor(false);
          } else {
            setNoOptionsVendor(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the vendor!");
        });
    }
  };

  // Select the customer from search result
  const handleVendorSelect = (type, currentItem) => {
    setExtWorkData({
      ...extWorkData,
      supplyingVendor: currentItem.fullName,
    });
    setSearchVendorResults([]);
  };
  const updateServiceEstHeader = () => {
    let data = {
      ...serviceEstimateData,
      priceMethod: serviceEstimateData.priceMethod.value,
    };
    AddServiceHeader(activeElement.oId, data)
      .then((result) => {
        // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
        // setValue("machine");
        setServiceEstimateData({
          ...result,
          id: result.id,
          priceMethod: priceMethodOptions.find(
            (element) => element.value === result.priceMethod
          ),
        });
        handleSnack("success", "Service estimate details updated!");
        setServiceHeaderViewOnly(true);
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating service estimate header!"
        );
      });
  };
  const updateLabourEstHeader = () => {
    let data = {
      ...labourData,
      pricingMethod: labourData.pricingMethod?.value,
      laborCode: labourData.laborCode?.value,
      payer: labourData.payer?.value,
    };
    AddLaborToService(serviceEstimateData.id, data)
      .then((result) => {
        // setViewOnlyTab({ ...viewOnlyTab, custViewOnly: true });
        // setValue("machine");
        setLabourData({
          ...result,
          id: result.id,
          pricingMethod: priceMethodOptions.find(
            (element) => element.value === result.pricingMethod
          ),
          laborCode: laborCodeList.find(
            (element) => element.value === result.laborCode
          ),
          payer: options.find(
            (element) => element.value === result.payer
          ),
        });
        handleSnack("success", "Labour details updated!");
        setViewOnlyTab({ ...viewOnlyTab, laborViewOnly: true });
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occurred while updating service estimate header!"
        );
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleClose4 = () => setOpen4(false);
  const handleClose3 = () => setOpen3(false);
  const handleClose2 = () => setOpen2(false);
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
  const masterColumns = [
    {
      name: (
        <>
          <div>Select</div>
        </>
      ),
      // selector: (row) => row.check1,
      wrap: true,
      sortable: true,
      maxWidth: "300px",
      cell: (row) => (
        <Checkbox
          className="text-black"
          // checked={row.check1}
          // onChange={(e) => handleCheckboxData(e, row)}
        />
      ),
    },
    {
      name: (
        <>
          <div>Group Number</div>
        </>
      ),
      selector: (row) => row.GroupNumber,
      wrap: true,
      sortable: true,
      format: (row) => row.GroupNumber,
    },
    {
      name: (
        <>
          <div>Type</div>
        </>
      ),
      selector: (row) => row.Type,
      wrap: true,
      sortable: true,
      format: (row) => row.Type,
    },
    {
      name: (
        <>
          <div>Part number</div>
        </>
      ),
      selector: (row) => row.Partnumber,
      wrap: true,
      sortable: true,
      format: (row) => row.Partnumber,
    },
    {
      name: (
        <>
          <div>Price Extended</div>
        </>
      ),
      selector: (row) => row.PriceExtended,
      wrap: true,
      sortable: true,
      format: (row) => row.PriceExtended,
    },
    {
      name: (
        <>
          <div>Price currency</div>
        </>
      ),
      selector: (row) => row.Pricecurrency,
      wrap: true,
      sortable: true,
      format: (row) => row.Pricecurrency,
    },
    {
      name: (
        <>
          <div>Usage</div>
        </>
      ),
      selector: (row) => row.Usage,
      wrap: true,
      sortable: true,
      format: (row) => row.Usage,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.TotalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.TotalPrice,
    },
    {
      name: (
        <>
          <div>Comments</div>
        </>
      ),
      selector: (row) => row.Comments,
      wrap: true,
      sortable: true,
      format: (row) => row.Comments,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      selector: (row) => row.Actions,
      wrap: true,
      sortable: true,
      format: (row) => row.Actions,
    },
  ];
  const [show, setShow] = React.useState(false);
  const [count, setCount] = useState(1);
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];
  const handleRowClick = (e) => {
    setShow(true);
  };

  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const addSearchQuerryHtml = () => {
    setQuerySearchSelector([
      ...querySearchSelector,
      {
        id: count,
        selectOperator: "",
        selectFamily: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);
    setCount(count + 1);
  };
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", e);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleMasterCheck = (e, row) => {
    if (e.target.checked) {
      var _masterData = [...masterData];
      const updated = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked };
        } else return currentItem;
      });
      setMasterData([...updated]);
      setFilterMasterData([...filterMasterData, { ...row }]);
    } else {
      var _filterMasterData = [...filterMasterData];
      const updated = _filterMasterData.filter((currentItem, i) => {
        if (row.id !== currentItem.id) return currentItem;
      });
      setFilterMasterData(updated);
    }
  };
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value)
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

  const rows = [
    {
      id: 1,
      GroupNumber: "Snow",
      Type: "Jon",
      Partnumber: 35,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Inconsistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
    },
    {
      id: 2,
      GroupNumber: "Lannister",
      Type: "Cersei",
      Partnumber: 42,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Consistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
    },
    {
      id: 3,
      GroupNumber: "Lannister",
      Type: "Jaime",
      Partnumber: 45,
      PriceExtended: "pending",
      Pricecurrency: "Open",
      Usage: "Consistent",
      TotalPrice: "Inconsistent",
      Comments: "Inconsistent",
      Created: "Created On",
      Total: "25",
      Status: "Status",
      Actions: "Action",
    },
  ];

  const columns = [
    { field: "GroupNumber", headerName: "Charge Code", flex: 1, width: 70 },
    { field: "Type", headerName: "Labor Type", flex: 1, width: 130 },
    { field: "Partnumber", headerName: "Service Type", flex: 1, width: 130 },
    {
      field: "PriceExtended",
      headerName: "Unit of measure",
      flex: 1,
      width: 130,
    },
    {
      field: "Pricecurrency",
      headerName: "Estimated hours",
      flex: 1,
      width: 130,
    },
    { field: "Usage", headerName: "Unit Price", flex: 1, width: 130 },
    { field: "TotalPrice", headerName: "Extended Price", flex: 1, width: 130 },
    { field: "Comments", headerName: "Comments", flex: 1, width: 130 },
    { field: "Created", headerName: "Currency", flex: 1, width: 130 },
    { field: "Total", headerName: "Total Price", flex: 1, width: 130 },
    { field: "Actions", headerName: "Action", flex: 1, width: 130 },
  ];

  const rowsConsumables = [
    {
      id: 1,
      ConsumableId: "Snow",
      ConsumableType: "Type",
      Description: 34,
      Quantity: "4",
      UnitMeasures: "5",
      Vendor: "Consistent",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Actions: "Action",
    },
    {
      id: 2,
      ConsumableId: "Lannister",
      ConsumableType: "Cersei",
      Description: 34,
      Quantity: "4",
      UnitMeasures: "5",
      Vendor: "Consistent",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Actions: "Action",
    },
    {
      id: 3,
      ConsumableId: "Lannister",
      ConsumableType: "Jaime",
      Description: 34,
      Quantity: "4",
      UnitMeasures: "5",
      Vendor: "Consistent",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Actions: "Action",
    },
  ];

  const columnsConsumables = [
    { field: "ConsumableId", headerName: "Consumable ID", flex: 1, width: 70 },
    {
      field: "ConsumableType",
      headerName: "Consumable Type",
      flex: 1,
      width: 70,
    },
    {
      field: "Description",
      headerName: "Consumable Description",
      flex: 1,
      width: 130,
    },
    { field: "Quantity", headerName: " Quantity", flex: 1, width: 130 },
    {
      field: "UnitMeasures",
      headerName: "Unit of measure",
      flex: 1,
      width: 130,
    },
    { field: "Vendor", headerName: "Vendor", flex: 1, width: 130 },
    { field: "UnitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "ExtendedPrice",
      headerName: "Extended price",
      flex: 1,
      width: 130,
    },
    { field: "Currency", headerName: "Currency", flex: 1, width: 130 },
    { field: "TotalPrice", headerName: "Total price", flex: 1, width: 130 },
    { field: "Actions", headerName: "Action", flex: 1, width: 130 },
  ];

  const rowsExternal = [
    {
      id: 1,
      ActivityId: "Snow",
      ActivityName: "Jon",
      Description: 35,
      Quantity: "24",
      UnitMeasures: "24",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Dimensions: "Inconsistent",
      SupplyingVendor: "Created On",
      Actions: "Action",
    },
    {
      id: 2,
      ActivityId: "Lannister",
      ActivityName: "Cersei",
      Description: 35,
      Quantity: "24",
      UnitMeasures: "24",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Dimensions: "Inconsistent",
      SupplyingVendor: "Created On",
      Actions: "Action",
    },
    {
      id: 3,
      ActivityId: "Lannister",
      ActivityName: "Jaime",
      Description: 35,
      Quantity: "24",
      UnitMeasures: "24",
      UnitPrice: "Inconsistent",
      ExtendedPrice: "Consistent",
      Currency: "$",
      TotalPrice: "37",
      Dimensions: "Inconsistent",
      SupplyingVendor: "Created On",
      Actions: "Action",
    },
  ];

  const columnsExternal = [
    { field: "ActivityId", headerName: "Activity ID", flex: 1, width: 70 },
    { field: "ActivityName", headerName: "Activity Name", flex: 1, width: 70 },
    {
      field: "Description",
      headerName: "Short Description",
      flex: 1,
      width: 70,
    },
    { field: "Quantity", headerName: "Quantity", flex: 1, width: 70 },
    {
      field: "UnitMeasures",
      headerName: "Unit of measure",
      flex: 1,
      width: 130,
    },
    { field: "UnitPrice", headerName: "Unit Price", flex: 1, width: 130 },
    {
      field: "ExtendedPrice",
      headerName: "Extended price",
      flex: 1,
      width: 130,
    },
    { field: "Currency", headerName: "Currency", flex: 1, width: 130 },
    { field: "TotalPrice", headerName: "Total price", flex: 1, width: 130 },
    { field: "Dimensions", headerName: "Dimension", flex: 1, width: 130 },
    {
      field: "SupplyingVendor",
      headerName: "Supplying Vendor",
      flex: 1,
      width: 130,
    },
    { field: "Actions", headerName: "Action", flex: 1, width: 130 },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      {serviceEstHeaderLoading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Loader
            type="spinner-default"
            bgColor={"#872ff7"}
            title={"spinner-default"}
            color={"#FFFFFF"}
            size={35}
          />
        </div>
      ) : (
        <div class="container-fluid">
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center bg-primary p-2 border-radius-10 mb-0">
              <div className="" style={{ display: "contents" }}>
                <span className="mr-3 white-space text-white">
                  Service Estimation Header
                </span>
                <a
                  href={undefined}
                  className="ml-3 text-white"
                  style={{ cursor: "pointer" }}
                >
                  <EditOutlinedIcon
                    onClick={() => makeHeaderEditable("serviceEstHeader")}
                  />
                </a>
              </div>
              {/* <div className="hr"></div> */}
            </h5>
            {!serviceHeaderViewOnly ? (
              <>
                <div className="row mt-4 input-fields">
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        REFERENCE
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        placeholder="Required"
                        value={serviceEstimateData.reference}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        DESCRIPTION
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        placeholder="Required"
                        value={serviceEstimateData.description}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData.currency,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        SEGMENT TITLE
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        placeholder="Required"
                        value={serviceEstimateData.segmentTitle}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        JOB OPERATION
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        placeholder="Required"
                        value={serviceEstimateData.jobOperation}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        PRICE METHOD
                      </label>
                      <Select
                        defaultValue={selectedOption}
                        value={serviceEstimateData.priceMethod}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            priceMethod: e,
                          })
                        }
                        options={priceMethodOptions}
                        placeholder="Required"
                      />
                      {/* <input
                  type="text"
                  class="form-control border-radius-10 text-primary"
                  id="exampleInputEmail1"
                  placeholder="Required"
                  value={serviceEstimateData.priceMethod}
                /> */}
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div className="form-group mt-3 align-items-center date-box">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PRICE DATE
                      </label>

                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          variant="inline"
                          format="dd/MM/yyyy"
                          className="form-controldate border-radius-10"
                          label=""
                          value={serviceEstimateData.priceDate}
                          onChange={(e) =>
                            setServiceEstimateData({
                              ...serviceEstimateData,
                              priceDate: e,
                            })
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    {/* <div class="form-group mt-3">
                <label
                  className="text-light-dark font-size-12 font-weight-600"
                  
                >
                  PRICE DATE
                </label>
                <input
                  type="text"
                  class="form-control border-radius-10 text-primary"
                  id="exampleInputEmail1"
                  
                  placeholder="Required"
                />
              </div> */}
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        CURRENCY
                      </label>
                      <input
                        type="text"
                        disabled
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        placeholder="Required"
                        value={serviceEstimateData.currency}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        NET PRICE
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        placeholder="Required"
                        value={serviceEstimateData.netPrice}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            netPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        JOB CODE
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        placeholder="Optional"
                        value={serviceEstimateData.jobCode}
                        onChange={(e) =>
                          setServiceEstimateData({
                            ...serviceEstimateData,
                            jobCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className=" text-right">
                  <button
                    className="btn bg-primary text-white"
                    onClick={() =>
                      setActiveElement({ ...activeElement, name: "operation" })
                    }
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-light bg-primary text-white"
                    disabled={
                      !(
                        serviceEstimateData.jobOperation &&
                        serviceEstimateData.description &&
                        serviceEstimateData.currency &&
                        serviceEstimateData.netPrice &&
                        serviceEstimateData.priceDate &&
                        serviceEstimateData.priceMethod?.value &&
                        serviceEstimateData.reference &&
                        serviceEstimateData.segmentTitle
                      )
                    }
                    onClick={updateServiceEstHeader}
                  >
                    Save
                  </button>
                  {/* <a href="#" className="btn border bg-primary text-white">
              Save
            </a> */}
                </div>
              </>
            ) : (
              <div className="row mt-4">
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      REFERENCE
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.reference}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      DESCRIPTION{" "}
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.description}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      SEGMENT TITLE
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.segmentTitle}{" "}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      JOB OPERATION
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.jobOperation}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      PRICE METHOD
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.priceMethod?.value}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      PRICE DATE
                    </p>
                    <h6 className="font-weight-600">
                      <Moment format="DD/MM/YYYY">
                        {serviceEstimateData.priceDate}
                      </Moment>
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      CURRENCY
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.currency}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      NET PRICE
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.netPrice}
                    </h6>
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <p className="font-size-12 font-weight-600 mb-2">
                      JOB CODE{" "}
                    </p>
                    <h6 className="font-weight-600">
                      {serviceEstimateData.jobCode}
                    </h6>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="card p-4 mt-5">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList className="custom-tabs-div" onChange={handleChange}>
                    <Tab label="Labor" value="labor" />
                    <Tab label="Consumables" value="consumables" />
                    <Tab label="External Work" value="extwork" />
                    <Tab label="Other misc." value="othrMisc" />
                  </TabList>
                </Box>
                <TabPanel value="labor">
                  <div className="col-md-12 col-sm-12">
                    <div className=" d-flex justify-content-between align-items-center">
                      <div>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={flagRequired.flagLaborReq}
                                onChange={handleChangeSwitch}
                                name="flagLaborReq"
                              />
                            }
                            label="REQUIRED"
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  {flagRequired.flagLaborReq && (
                    <React.Fragment>
                      {!viewOnlyTab.laborViewOnly ? (
                        <div className="row mt-2 input-fields">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={labourData.jobCode}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE DESCRIPTION
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={labourData.jobCodeDescription}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group  mt-3">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                LABOR CODE
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setLabourData({ ...labourData, laborCode: e })
                                }
                                options={laborCodeList}
                                placeholder="Required"
                                value={labourData.laborCode}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group  mt-3">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                PRICE METHOD
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setLabourData({
                                    ...labourData,
                                    pricingMethod: e,
                                  })
                                }
                                options={priceMethodOptions}
                                placeholder="Required"
                                value={labourData.pricingMethod}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                RATE PER HOUR / DAY
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={labourData.ratePerHourOrDay}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                NET PRICE - LABOR
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={labourData.totalPrice}
                              />
                            </div>
                          </div>

                          {/* <div className="col-md-4 col-sm-4">
                    <div class="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-600">
                        SUPPLYING VENDOR
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10 text-primary"
                        id="exampleInputEmail1"
                        
                        placeholder="Placeholder (Optional)"
                      />
                    </div>
                  </div> */}
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setLabourData({ ...labourData, payer: e })
                                }
                                options={options}
                                placeholder="Required"
                                value={labourData.payer}
                              />
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                ADJUSTED PRICE
                              </label>
                              <input
                                type="text"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Optional"
                                value={labourData.adjustedPrice}
                                onChange={(e) =>
                                  setLabourData({
                                    ...labourData,
                                    adjustedPrice: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div class="form-group mt-3 mb-0 text-right">
                              <button
                                type="button"
                                className="btn btn-light bg-primary text-white"
                                onClick={updateLabourEstHeader}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row mt-4">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.jobCode}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE DESCRIPTION{" "}
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.jobCodeDescription}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                LABOR CODE
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.laborCode?.value}{" "}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PRICE METHOD
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.pricingMethod?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                RATE PER HOUR / DAY
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.ratePerHourOrDay}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                NET PRICE - LABOR
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.totalPrice}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.payer?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                ADJUSTED PRICE
                              </p>
                              <h6 className="font-weight-600">
                                {labourData.adjustedPrice}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr />

                      <div className="">
                        <div className="bg-primary px-3 mb-3">
                          <div className="row align-items-center">
                            <div className="col-11 mx-2">
                              <div className="d-flex align-items-center bg-primary w-100">
                                <div
                                  className="d-flex mr-3"
                                  style={{ whiteSpace: "pre" }}
                                >
                                  <h5 className="mr-2 mb-0 text-white">
                                    <span>Labor</span>
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <div className="text-center border-left pl-2 py-3">
                                <Link
                                  onClick={() => setOpen2(true)}
                                  to="#"
                                  className="p-1 text-white"
                                  data-toggle="modal"
                                  data-target="#Datatable"
                                >
                                  <span className="ml-1">Add Items</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className=""
                          style={{
                            height: 400,
                            width: "100%",
                            backgroundColor: "#fff",
                          }}
                        >
                          <DataTable
                            className=""
                            title=""
                            columns={masterColumns}
                            data={rows}
                            customStyles={customStyles}
                            pagination
                          />
                        </div>
                        <div className=" text-right mt-3">
                          <a
                            href="#"
                            className="btn border bg-primary text-white"
                          >
                            Save
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </TabPanel>
                <TabPanel value="consumables">
                  <div className="col-md-12 col-sm-12">
                    <div className=" d-flex justify-content-between align-items-center">
                      <div>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={flagRequired.flagConsumableReq}
                                onChange={handleChangeSwitch}
                                name="flagConsumableReq"
                              />
                            }
                            label="REQUIRED"
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  {flagRequired.flagConsumableReq && (
                    <React.Fragment>
                      {!viewOnlyTab.consumableViewOnly ? (
                        <div className="row mt-2 input-fields">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={consumableData.jobCode}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE DESCRIPTION
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={consumableData.jobCodeDescription}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div className="form-group  mt-3">
                              <label className="text-light-dark font-size-12 font-weight-500">
                                PRICE METHOD
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setConsumableData({
                                    ...consumableData,
                                    pricingMethod: e,
                                  })
                                }
                                value={consumableData.pricingMethod}
                                options={priceMethodOptions}
                                placeholder="Required"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                NET PRICE
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={consumableData.totalPrice}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setConsumableData({
                                    ...consumableData,
                                    payer: e,
                                  })
                                }
                                options={options}
                                placeholder="Required"
                                value={consumableData.payer}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                ADJUSTED PRICE
                              </label>
                              <input
                                type="text"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Optional"
                                value={consumableData.adjustedPrice}
                                onChange={(e) =>
                                  setConsumableData({
                                    ...consumableData,
                                    adjustedPrice: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div class="form-group mt-3 mb-0 text-right">
                              <a href="#" className="btn bg-primary text-white">
                                Save
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row mt-4">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE
                              </p>
                              <h6 className="font-weight-600">
                                {consumableData.jobCode}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE DESCRIPTION{" "}
                              </p>
                              <h6 className="font-weight-600">
                                {consumableData.jobCodeDescription}
                              </h6>
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PRICE METHOD
                              </p>
                              <h6 className="font-weight-600">
                                {consumableData.pricingMethod?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                NET PRICE
                              </p>
                              <h6 className="font-weight-600">
                                {consumableData.totalPrice}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {consumableData.payer?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                ADJUSTED PRICE
                              </p>
                              <h6 className="font-weight-600">
                                {consumableData.adjustedPrice}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr />

                      <div className="">
                        <div className="bg-primary px-3 mb-3">
                          <div className="row align-items-center">
                            <div className="col-11 mx-2">
                              <div className="d-flex align-items-center bg-primary w-100">
                                <div
                                  className="d-flex mr-3"
                                  style={{ whiteSpace: "pre" }}
                                >
                                  <h5 className="mr-2 mb-0 text-white">
                                    <span>Consumables</span>
                                  </h5>
                                  <p className="ml-4 mb-0">
                                    <a href="#" className="ml-3 text-white">
                                      <EditOutlinedIcon />
                                    </a>
                                    <a href="#" className="ml-3 text-white">
                                      <ShareOutlinedIcon />
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
                                                isClearable={true}
                                                defaultValue={{
                                                  label: "And",
                                                  value: "AND",
                                                }}
                                                options={[
                                                  {
                                                    label: "And",
                                                    value: "AND",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Or",
                                                    value: "OR",
                                                    id: i,
                                                  },
                                                ]}
                                                placeholder="Search By.."
                                                onChange={(e) =>
                                                  handleOperator(e, i)
                                                }
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
                                                    label: "Make",
                                                    value: "make",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Family",
                                                    value: "family",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Model",
                                                    value: "model",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Prefix",
                                                    value: "prefix",
                                                    id: i,
                                                  },
                                                ]}
                                                placeholder="Search By.."
                                                onChange={(e) =>
                                                  handleFamily(e, i)
                                                }
                                                value={obj.selectFamily}
                                              />
                                            </div>
                                            <div className="customselectsearch customize">
                                              <span className="search-icon-postn">
                                                <SearchIcon />
                                              </span>
                                              <input
                                                className="custom-input-sleact "
                                                style={{ position: "relative" }}
                                                type="text"
                                                placeholder="Search Parts"
                                                value={obj.inputSearch}
                                                onChange={(e) =>
                                                  handleInputSearch(e, i)
                                                }
                                                id={"inputSearch-" + i}
                                                autoComplete="off"
                                              />
                                              <div className="btn border">
                                                <span className="mr-2">
                                                  <AddIcon />
                                                </span>
                                                Add Part
                                              </div>

                                              {
                                                <ul
                                                  className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
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
                                                        {currentItem}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              }
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                    <div
                                      onClick={(e) => addSearchQuerryHtml(e)}
                                    >
                                      <Link
                                        to="#"
                                        className="btn-sm text-white border mr-2"
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
                                          fill="#ffffff"
                                          viewBox="0 0 50 50"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <title />
                                          <path
                                            className="cls-1"
                                            d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                                          />
                                          <path
                                            className="cls-1"
                                            d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                                          />
                                          <path
                                            className="cls-1"
                                            d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                                          />
                                        </svg>
                                        {/* <DeleteIcon className="font-size-16" /> */}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                {/* <div className="px-3">
          <Link to="#" className="btn bg-primary text-white" onClick={handleQuerySearchClick}>
            <SearchIcon /><span className="ml-1">Search</span>
          </Link>
        </div> */}
                              </div>
                            </div>
                            <div className="col-1">
                              <div className="text-center border-left pl-3 py-3">
                                <Link
                                  onClick={() => setOpen3(true)}
                                  to="#"
                                  className="p-1 text-white"
                                  data-toggle="modal"
                                  data-target="#Datatableconsumables"
                                >
                                  <span className="ml-1">Add Items</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
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
                            rows={rowsConsumables}
                            columns={columnsConsumables}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onCellClick={(e) => handleRowClick(e)}
                          />
                        </div>
                        <div className=" text-right mt-3">
                          <a
                            href="#"
                            className="btn border bg-primary text-white"
                          >
                            Save
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </TabPanel>
                <TabPanel value="extwork">
                  <div className="col-md-12 col-sm-12">
                    <div className=" d-flex justify-content-between align-items-center">
                      <div>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={flagRequired.flagExtWorkReq}
                                onChange={handleChangeSwitch}
                                name="flagExtWorkReq"
                              />
                            }
                            label="REQUIRED"
                            value={flagRequired.flagExtWorkReq}
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  {flagRequired.flagExtWorkReq && (
                    <React.Fragment>
                      {!viewOnlyTab.extWorkViewOnly ? (
                        <div className="row mt-2 input-fields">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={extWorkData.jobCode}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE DESCRIPTION
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={extWorkData.jobCodeDescription}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                SUPPLYING VENDOR
                              </label>
                              <SearchBox
                                value={extWorkData.supplyingVendor}
                                onChange={(e) =>
                                  handleVendorSearch("vendor", e.target.value)
                                }
                                type="fullName"
                                result={searchVenodrResults}
                                onSelect={handleVendorSelect}
                                noOptions={noOptionsVendor}
                              />
                              {/* <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Required"
                        /> */}
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PRICE METHOD
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setExtWorkData({
                                    ...extWorkData,
                                    pricingMethod: e,
                                  })
                                }
                                value={extWorkData.pricingMethod}
                                options={priceMethodOptions}
                                placeholder="Required"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                NET PRICE
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={extWorkData.totalPrice}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setExtWorkData({ ...extWorkData, payer: e })
                                }
                                options={options}
                                placeholder="Required"
                                value={extWorkData.payer}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                ADJUSTED PRICE
                              </label>
                              <input
                                type="text"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Optional"
                                value={extWorkData.adjustedPrice}
                                onChange={(e) =>
                                  setExtWorkData({
                                    ...extWorkData,
                                    adjustedPrice: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div class="form-group mt-3 mb-0 text-right">
                              <a href="#" className="btn bg-primary text-white">
                                Save
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row mt-4">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.jobCode}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE DESCRIPTION{" "}
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.jobCodeDescription}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PRICE METHOD
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.pricingMethod?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                NET PRICE
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.totalPrice}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                SUPPLYING VENDOR
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.supplyingVendor}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.payer?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                ADJUSTED PRICE
                              </p>
                              <h6 className="font-weight-600">
                                {extWorkData.adjustedPrice}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr />

                      <div className="">
                        <div className="bg-primary px-3 mb-3">
                          <div className="row align-items-center">
                            <div className="col-11 mx-2">
                              <div className="d-flex align-items-center bg-primary w-100">
                                <div
                                  className="d-flex mr-3"
                                  style={{ whiteSpace: "pre" }}
                                >
                                  <h5 className="mr-2 mb-0 text-white">
                                    <span>External Work</span>
                                  </h5>
                                  <p className="ml-4 mb-0">
                                    <a href="#" className="ml-3 text-white">
                                      <EditOutlinedIcon />
                                    </a>
                                    <a href="#" className="ml-3 text-white">
                                      <ShareOutlinedIcon />
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
                                                isClearable={true}
                                                defaultValue={{
                                                  label: "And",
                                                  value: "AND",
                                                }}
                                                options={[
                                                  {
                                                    label: "And",
                                                    value: "AND",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Or",
                                                    value: "OR",
                                                    id: i,
                                                  },
                                                ]}
                                                placeholder="Search By.."
                                                onChange={(e) =>
                                                  handleOperator(e, i)
                                                }
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
                                                    label: "Make",
                                                    value: "make",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Family",
                                                    value: "family",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Model",
                                                    value: "model",
                                                    id: i,
                                                  },
                                                  {
                                                    label: "Prefix",
                                                    value: "prefix",
                                                    id: i,
                                                  },
                                                ]}
                                                placeholder="Search By.."
                                                onChange={(e) =>
                                                  handleFamily(e, i)
                                                }
                                                value={obj.selectFamily}
                                              />
                                            </div>
                                            <div className="customselectsearch customize">
                                              <span className="search-icon-postn">
                                                <SearchIcon />
                                              </span>
                                              <input
                                                className="custom-input-sleact "
                                                style={{ position: "relative" }}
                                                type="text"
                                                placeholder="Search Parts"
                                                value={obj.inputSearch}
                                                onChange={(e) =>
                                                  handleInputSearch(e, i)
                                                }
                                                id={"inputSearch-" + i}
                                                autoComplete="off"
                                              />
                                              <div className="btn border">
                                                <span className="mr-2">
                                                  <AddIcon />
                                                </span>
                                                Add Part
                                              </div>

                                              {
                                                <ul
                                                  className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
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
                                                        {currentItem}
                                                      </li>
                                                    )
                                                  )}
                                                </ul>
                                              }
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                                    <div
                                      onClick={(e) => addSearchQuerryHtml(e)}
                                    >
                                      <Link
                                        to="#"
                                        className="btn-sm text-white border mr-2"
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
                                          fill="#ffffff"
                                          viewBox="0 0 50 50"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <title />
                                          <path
                                            className="cls-1"
                                            d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                                          />
                                          <path
                                            className="cls-1"
                                            d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                                          />
                                          <path
                                            className="cls-1"
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
                            <div className="">
                              <div className="text-center border-left pl-3 py-3">
                                <Link
                                  onClick={() => setOpen4(true)}
                                  to="#"
                                  className="p-1 text-white"
                                  data-toggle="modal"
                                  data-target="#Datatable"
                                >
                                  <span className="ml-1">Add Items</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
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
                            rows={rowsExternal}
                            columns={columnsExternal}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onCellClick={(e) => handleRowClick(e)}
                          />
                        </div>
                        <div className=" text-right mt-3">
                          <a
                            href="#"
                            className="btn border bg-primary text-white"
                          >
                            Save
                          </a>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </TabPanel>
                <TabPanel value="othrMisc">
                  <div className="col-md-12 col-sm-12">
                    <div className=" d-flex justify-content-between align-items-center">
                      <div>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={flagRequired.flagMiscReq}
                                onChange={handleChangeSwitch}
                                name="flagMiscReq"
                              />
                            }
                            label="REQUIRED"
                            value={flagRequired.flagMiscReq}
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  {flagRequired.flagMiscReq && (
                    <React.Fragment>
                      {!viewOnlyTab.miscViewOnly ? (
                        <div className="row mt-2 input-fields">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={miscData.jobCode}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                JOB CODE DESCRIPTION
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={miscData.jobCodeDescription}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PRICE METHOD
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setMiscData({ ...miscData, pricingMethod: e })
                                }
                                options={priceMethodOptions}
                                placeholder="Required"
                                value={miscData.pricingMethod}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                NET PRICE - MISC.
                              </label>
                              <input
                                type="text"
                                disabled
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Required"
                                value={miscData.totalPrice}
                              />
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                TYPE OF MISC.{" "}
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                                placeholder="Required"
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                PAYER
                              </label>
                              <Select
                                defaultValue={selectedOption}
                                onChange={(e) =>
                                  setMiscData({ ...miscData, payer: e })
                                }
                                options={options}
                                placeholder="Required"
                                value={miscData.payer}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <label className="text-light-dark font-size-12 font-weight-600">
                                ADJUSTED PRICE
                              </label>
                              <input
                                type="text"
                                class="form-control border-radius-10 text-primary"
                                id="exampleInputEmail1"
                                placeholder="Optional"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div class="form-group mt-3 mb-0 text-right">
                              <a href="#" className="btn bg-primary text-white">
                                Save
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row mt-4">
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.jobCode}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                JOB CODE DESCRIPTION{" "}
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.jobCodeDescription}
                              </h6>
                            </div>
                          </div>

                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PRICE METHOD
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.pricingMethod?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                NET PRICE - MISC
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.totalPrice}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                TYPE OF MISC.
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.typeOfMisc}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                PAYER
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.payer?.value}
                              </h6>
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                            <div class="form-group mt-3">
                              <p className="font-size-12 font-weight-600 mb-2">
                                ADJUSTED PRICE
                              </p>
                              <h6 className="font-weight-600">
                                {miscData.adjustedPrice}
                              </h6>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <Modal
            show={open2}
            onHide={handleClose2}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
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
                    <DeleteIcon className=" font-size-16" />
                    <span className="ml-2">Delete</span>
                  </span>
                  <span className="mr-3">
                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                  <span className="mr-3">
                    <SettingsBackupRestoreIcon className=" font-size-16" />
                    <span className="ml-2">Go back to operations</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span>
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CHARGE CODE
                        </label>
                        <Select
                          onChange={(e) =>
                            setLabourItemData({
                              ...labourItemData,
                              chargeCode: e,
                            })
                          }
                          options={chargeCodeList}
                          placeholder="Required"
                          value={labourItemData.chargeCode}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          LABOR TYPE
                        </label>
                        <Select
                          onChange={(e) =>
                            setLabourItemData({
                              ...labourItemData,
                              laborType: e,
                            })
                          }
                          options={laborTypeList}
                          value={labourItemData.laborType}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SERVICE TYPE
                        </label>
                        <Select
                          onChange={(e) =>
                            setLabourItemData({
                              ...labourItemData,
                              serviceType: e,
                            })
                          }
                          options={serviceTypeList}
                          value={labourItemData.serviceType}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT OF MEASURES
                        </label>
                        <Select
                          onChange={(e) =>
                            setLabourItemData({
                              ...labourItemData,
                              unitOfMeasure: e,
                            })
                          }
                          options={[
                            { label: "Hours", value: "Hours" },
                            { label: "Days", value: "Days" },
                          ]}
                          placeholder="Required"
                          value={labourItemData.unitOfMeasure}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ESTIMATED HOURS
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          placeholder="Required"
                          onChange={(e) =>
                            setLabourItemData({
                              ...labourItemData,
                              estimatedHours: e.target.value,
                            })
                          }
                          value={labourItemData.estimatedHours}
                        />
                      </div>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          class="form-control border-radius-10"
                          placeholder="Required"
                          value={labourItemData.unitPrice}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EXTENDED PRICE
                        </label>
                        <input
                          type="text"
                          disabled
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="Required"
                          value={labourItemData.extendedPrice}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TOTAL PRICE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="Required"
                          value={labourItemData.totalPrice}
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
                          disabled
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="REQUIRED"
                          value={serviceEstimateData.currency}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          COMMENTS (More Action)
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          placeholder="Optional"
                          value={labourItemData.comments}
                          onChange={(e) =>
                            setLabourItemData({
                              ...labourItemData,
                              comments: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={labourItemData.travelIncluded}
                                  onChange={(e) =>
                                    setLabourItemData({
                                      ...labourItemData,
                                      travelIncluded: e.target.checked,
                                    })
                                  }
                                />
                              }
                              label="TRAVEL INCLUDED"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className=" d-flex justify-content-between align-items-center">
                        <div>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={labourItemData.inspectionIncluded}
                                  onChange={(e) =>
                                    setLabourItemData({
                                      ...labourItemData,
                                      inspectionIncluded: e.target.checked,
                                    })
                                  }
                                />
                              }
                              label="INSPECTION INCLUDED"
                            />
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      {!labourItemData.travelIncluded && (
                        <div class="form-group w-100">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            TRAVEL CHARGE
                          </label>
                          <input
                            type="text"
                            class="form-control border-radius-10"
                            id="exampleInputEmail1"
                            value={labourItemData.travelCharge}
                            onChange={(e) =>
                              setLabourItemData({
                                ...labourItemData,
                                travelCharge: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 col-sm-6">
                      {!labourItemData.inspectionIncluded && (
                        <div class="form-group w-100">
                          <label className="text-light-dark font-size-12 font-weight-500">
                            INSPECTION
                          </label>
                          <input
                            type="text"
                            class="form-control border-radius-10"
                            id="exampleInputEmail1"
                            value={labourItemData.inspectionCharge}
                            onChange={(e) =>
                              setLabourItemData({
                                ...labourItemData,
                                inspectionCharge: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <a
                    href="#"
                    onClick={handleClose2}
                    className="btn border mr-3 "
                  >
                    {" "}
                    Cancel
                  </a>
                  <a href="#" className="btn text-white bg-primary">
                    Save
                  </a>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={open3}
            onHide={handleClose3}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
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
                    <DeleteIcon className=" font-size-16" />
                    <span className="ml-2">Delete</span>
                  </span>
                  <span className="mr-3">
                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                  <span className="mr-3">
                    <SettingsBackupRestoreIcon className=" font-size-16" />
                    <span className="ml-2">Go back to operations</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span>
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONSUMABLE TYPE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="1000 ENGINE"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONSUMABLE ID
                        </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          CONSUMABLE DESCRIPTION
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="0123 REPLACE"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          QUANTITY
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="Replace left side of the Engine"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT OF MEASURES
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="List Price"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          VENDOR
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$10000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT PRICE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$5000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EXTENDED PRICE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="EA"
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
                          id="exampleInputEmail1"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TOTAL PRICE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ACTION
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <a
                    href="#"
                    onClick={handleClose3}
                    className="btn border mr-3 "
                  >
                    {" "}
                    Cancel
                  </a>
                  <a href="#" className="btn text-white bg-primary">
                    Save
                  </a>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            show={open4}
            onHide={handleClose4}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
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
                    <DeleteIcon className=" font-size-16" />
                    <span className="ml-2">Delete</span>
                  </span>
                  <span className="mr-3">
                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                  <span className="mr-3">
                    <SettingsBackupRestoreIcon className=" font-size-16" />
                    <span className="ml-2">Go back to operations</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span>
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ACTIVITY ID
                        </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ACTIVITY NAME
                        </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SHORT DESCRIPTION
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="List Price"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          QUANTITY
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$35000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT OF MEASURE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$10000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          UNIT PRICE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$10000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          EXTENDED PRICE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$5000"
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
                          id="exampleInputEmail1"
                          placeholder="EA"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          TOTAL PRICE
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          DIMENSIONS
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          SUPPLYING VENDOR
                        </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Required"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          ACTION
                        </label>
                        <input
                          type="text"
                          class="form-control border-radius-10"
                          id="exampleInputEmail1"
                          placeholder="$480000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <a
                    href="#"
                    onClick={handleClose4}
                    className="btn border mr-3 "
                  >
                    {" "}
                    Cancel
                  </a>
                  <a href="#" className="btn text-white bg-primary">
                    Save
                  </a>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default RepairServiceEstimate;

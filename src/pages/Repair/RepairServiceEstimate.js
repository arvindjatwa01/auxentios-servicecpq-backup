import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TabContext from "@mui/lab/TabContext";
import Checkbox from '@mui/material/Checkbox';
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
function RepairServiceEstimate(props) {
  const { activeElement, setActiveElement } = props.builderDetails;

  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState("1");

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
     {/* <div className="content-body" style={{ minHeight: '884px' }}> */}
                <div class="container-fluid">
      <div className="card p-4 mt-5">
        <h5 className="d-flex align-items-center bg-primary p-2 border-radius-10 mb-0">
          <div className="" style={{ display: "contents" }}>
            <span className="mr-3 white-space text-white">Header</span>
          </div>
          {/* <div className="hr"></div> */}
        </h5>
        <div className="row mt-4 input-fields">
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                REFERENCE
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                DESCRIPTION
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                SEGMENT TITLE
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                JOB OPERATION
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                PRICE METHOD
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                PRICE DATE
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                CURRENCY
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                NET PRICE
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <label
                className="text-light-dark font-size-12 font-weight-600"
                for="exampleInputEmail1"
              >
                JOB CODE
              </label>
              <input
                type="email"
                class="form-control border-radius-10 text-primary"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Placeholder (Optional)"
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">REFERENCE</p>
              <h6 className="font-weight-600">
                Chinalco SA, Beijing,China (code 203027)
              </h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">DESCRIPTION </p>
              <h6 className="font-weight-600">
                Alberto Franco, Head of purchase
              </h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">SEGMENT TITLE</p>
              <h6 className="font-weight-600">SF1234 </h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">JOB OPERATION</p>
              <h6 className="font-weight-600">
                Sales Opportunity for Chinalco for recondition{" "}
              </h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">PRICE METHOD</p>
              <h6 className="font-weight-600">LAJ00t6t31</h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">PRICE DATE</p>
              <h6 className="font-weight-600">CAT</h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">CURRENCY</p>
              <h6 className="font-weight-600">Customer 50%, Insurer 50%</h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">NET PRICE</p>
              <h6 className="font-weight-600">30days</h6>
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div class="form-group mt-3">
              <p className="font-size-12 font-weight-600 mb-2">JOB CODE </p>
              <h6 className="font-weight-600">Standard</h6>
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
          <a href="#" className="btn border bg-primary text-white">
            Save
          </a>
        </div>
      </div>
      <div className="card p-4 mt-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList className="custom-tabs-div"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Labor" value="1" />
                <Tab label="Consumables" value="2" />
                <Tab label="External Work" value="3" />
                <Tab label="Other misc." value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="row mt-2 input-fields">
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      JOB CODE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      JOB CODE DESCRIPTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group  mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      LABOR CODE
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
                  <div className="form-group  mt-3">
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
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      RATE PER HOUR / DAY
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      TOTAL PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      NET PRICE - LABOR
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      NET PRICE - MISC.
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      SUPPLYING VENDOR
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      PAYER
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      TYPE OF MISC.{" "}
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      ADJUSTED PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
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
                      <div className="text-center border-left pl-3 py-3">
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
                <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
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
                  <a href="#" className="btn border bg-primary text-white">
                    Save
                  </a>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="row mt-2 input-fields">
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      JOB CODE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      JOB CODE DESCRIPTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div className="form-group  mt-3">
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
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      TOTAL PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
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
                                  defaultValue={{ label: "And", value: "AND" }}
                                  options={[
                                    { label: "And", value: "AND", id: i },
                                    { label: "Or", value: "OR", id: i },
                                  ]}
                                  placeholder="Search By.."
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
                                    { label: "Make", value: "make", id: i },
                                    { label: "Family", value: "family", id: i },
                                    { label: "Model", value: "model", id: i },
                                    { label: "Prefix", value: "prefix", id: i },
                                  ]}
                                  placeholder="Search By.."
                                  onChange={(e) => handleFamily(e, i)}
                                  value={obj.selectFamily}
                                />
                              </div>
                              <div className="customselectsearch customize">
                              <span className="search-icon-postn"><SearchIcon /></span>
                                <input
                                  className="custom-input-sleact "
                                  style={{position:"relative"}}
                                  type="text"
                                  placeholder="Search Parts"
                                  value={obj.inputSearch}
                                  onChange={(e) => handleInputSearch(e, i)}
                                  id={"inputSearch-" + i}
                                  autoComplete="off"
                                />
                                <div className="btn border"><span className="mr-2"><AddIcon /></span>Add Part</div>
                                   
                                {
                                  <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}>
                                    {obj.selectOptions.map((currentItem, j) => (
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
                                    ))}
                                  </ul>
                                }
                              </div>
                            </div>
                          </>
                        );
                      })}
                      <div onClick={(e) => addSearchQuerryHtml(e)}>
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
                    <div className="">
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
                  <a href="#" className="btn border bg-primary text-white">
                    Save
                  </a>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="row mt-2 input-fields">
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      JOB CODE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      JOB CODE DESCRIPTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      SUPPLYING VENDOR
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      PRICE METHOD
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      TOTAL PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
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
                                  defaultValue={{ label: "And", value: "AND" }}
                                  options={[
                                    { label: "And", value: "AND", id: i },
                                    { label: "Or", value: "OR", id: i },
                                  ]}
                                  placeholder="Search By.."
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
                                    { label: "Make", value: "make", id: i },
                                    { label: "Family", value: "family", id: i },
                                    { label: "Model", value: "model", id: i },
                                    { label: "Prefix", value: "prefix", id: i },
                                  ]}
                                  placeholder="Search By.."
                                  onChange={(e) => handleFamily(e, i)}
                                  value={obj.selectFamily}
                                />
                              </div>
                              <div className="customselectsearch customize">
                              <span className="search-icon-postn"><SearchIcon /></span>
                                <input
                                  className="custom-input-sleact "
                                  style={{position:"relative"}}
                                  type="text"
                                  placeholder="Search Parts"
                                  value={obj.inputSearch}
                                  onChange={(e) => handleInputSearch(e, i)}
                                  id={"inputSearch-" + i}
                                  autoComplete="off"
                                />
                                <div className="btn border"><span className="mr-2"><AddIcon /></span>Add Part</div>
                                   
                                {
                                  <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}>
                                    {obj.selectOptions.map((currentItem, j) => (
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
                                    ))}
                                  </ul>
                                }
                              </div>
                            </div>
                          </>
                        );
                      })}
                      <div onClick={(e) => addSearchQuerryHtml(e)}>
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
                  <a href="#" className="btn border bg-primary text-white">
                    Save
                  </a>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="4">
              <div className="row mt-2 input-fields">
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      DESCRIPTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      TYPE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      TOTAL PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      PRICE METHOD
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      APPROVAL NEEDED
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
                    />
                  </div>
                </div>
                <div className="col-md-4 col-sm-4">
                  <div class="form-group mt-3">
                    <label
                      className="text-light-dark font-size-12 font-weight-600"
                      for="exampleInputEmail1"
                    >
                      PAYER
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10 text-primary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Placeholder (Optional)"
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
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CHARGE CODE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="1000 ENGINE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      LABOR TYPE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="0123 REPLACE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      SERVICE TYPE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Replace left side of the Engine"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="List Price"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ESTIMATED HOURS
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$35000"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="EA"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      EXTENDED PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="PAYER TYPE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CURRENCY
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="PAYER TYPE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      COMMENTS
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="PAYER TYPE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ACTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="PAYER TYPE"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-3 text-right">
              <a href="#" onClick={handleClose2} className="btn border mr-3 ">
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
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CONSUMABLE TYPE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="1000 ENGINE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CONSUMABLE ID
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="1000 ENGINE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CONSUMABLE DESCRIPTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="0123 REPLACE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      QUANTITY
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Replace left side of the Engine"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="List Price"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      VENDOR
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$10000"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$5000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      EXTENDED PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="EA"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CURRENCY
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ACTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-3 text-right">
              <a href="#" onClick={handleClose3} className="btn border mr-3 ">
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
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ACTIVITY ID
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="1000 ENGINE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ACTIVITY NAME
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="0123 REPLACE"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      SHORT DESCRIPTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="List Price"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      QUANTITY
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$35000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      UNIT OF MEASURE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$10000"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$10000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      EXTENDED PRICE
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$5000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      CURRENCY
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="EA"
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
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      DIMENSIONS
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      SUPPLYING VENDOR
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      for="exampleInputEmail1"
                    >
                      ACTION
                    </label>
                    <input
                      type="email"
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="$480000"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-3 text-right">
              <a href="#" onClick={handleClose4} className="btn border mr-3 ">
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
      {/* </div> */}
    </>
  );
}

export default RepairServiceEstimate;

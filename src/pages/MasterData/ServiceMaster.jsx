import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DataTable from "react-data-table-component";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import $ from "jquery";

const tempdata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "SEAL-O-RING",
    taskType: "1757896",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "9.92",
    bundleFlag: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R4469",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "94886.38",
    bundleFlag: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "Spacer",
    taskType: "6I6123",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "40.69",
    bundleFlag: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R5474",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "5879.24",
    bundleFlag: "5879.24",
  },
];
const erpservicedata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "1757896",
    taskType: "PC",
    quantity: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "10R4469",
    taskType: "PC",
    quantity: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "6I6123",
    taskType: "PC",
    quantity: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "10R5474",
    taskType: "PC",
    quantity: "5879.24",
  },
];
const ServiceMaster = () => {
  const [bundleItems, setBundleItems] = useState([...tempdata]);
  const [erpItemsService, setErpItemsService] = useState([...erpservicedata]);
  const [value, setValue] = React.useState("1");
  const searchOptions = [
    { value: "A", label: "By internal or external" },
    { value: "B", label: "Service code" },
    { value: "C", label: "Description" },
    { value: "D", label: "Labor type" },
  ];
  const laborOptions = [
    { value: "A", label: "Activity ID" },
    { value: "B", label: "Activity Name" },
    { value: "C", label: "Supplying Vendor" },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addMoreSearchCritria = () => {
    const _searchSelector = [...searchSelector];
    _searchSelector.push({
      id: searchSelector.length + 1,
      selectOperator: "",
      selectFamily: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    });
    if (_searchSelector.length <= 2) {
      setSearchSelector(_searchSelector);
    }
  };
  const handleClickOnSearchedList = (currentItem, id) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setSearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const [searchSelector, setSearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      itemType: { label: "", value: "" },
      itemTypeOperator: "",
      selectedKeyValue: "",
    },
  ]);
  const removeSearchCritria = () => {
    setSearchSelector([]);
  };
  const [labormasterpagination, setLabormasterpagination] = React.useState(1);
  const laborPaginationChange = (event, value) => {
    setLabormasterpagination(value);
  };
  const globalsearchList = [
    { A: "S012", B: "Internal", C: "Inspection", D: "Field Service" },
    { A: "S006", B: "Internal", C: "Analysis", D: "Field Service" },
    { A: "S014", B: "External", C: "Inspection", D: "Special Service" },
    { A: "3J0634", B: "3620656", C: "SEAL", D: "CATERPILLAR" },
    {
      A: "F198300020130",
      B: "3620656",
      C: "PRESSURE WASHER",
      D: "CATERPILLAR",
    },
    { A: "2A4429", B: "3620656", C: "LOCK", D: "CATERPILLAR" },
    {
      A: "3681P053",
      B: "3620656",
      C: "MANIFOLD COVER GASKET",
      D: "CATERPILLAR",
    },
  ];
  const globalservicesearchList = [
    { A: "AC01", B: "Chroming", C: "Description 1", D: "Test Agency 1" },
    { A: "AC02", B: "Electrical Work", C: "Description 2", D: "Test Agency 2" },
    { A: "AC03", B: "Machining", C: "Description 3", D: "Test Agency 3" },
    { A: "AC04", B: "Tooling", C: "Description 4", D: "Test Agency 4" },
    { A: "AC05", B: "Crane Service", C: "Description 5", D: "Test Agency 5" },
    { A: "AC06", B: "Welding", C: "Description 6", D: "Test Agency 6" },
    { A: "AC07", B: "Drlling", C: "Description 7", D: "Test Agency 7" },
  ];
  const priceLaborColumns = [
    {
      name: (
        <>
          <div>Charge Code</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Labor Code</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Labor Type</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Service Type</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Unit Of Measure</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Currency</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Start Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>End Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Effective From</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Last Updated</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon className="mr-1" />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const priceServiceColumns = [
    {
      name: (
        <>
          <div>Activity ID</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Activity Name</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Supplying Vendor</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Unit Of Measure</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Currency</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Start Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>End Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Effective From</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Last Updated</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      wrap: true,
      sortable: true,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon className="mr-1" />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const erpLaborColumns = [
    {
      name: (
        <>
          <div>Activity Cost</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Activity Number</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Period</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Fiscal Year</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Average/Fixed Cost</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#872ff7",
        color: "#fff",
        borderRight: "1px solid rgba(0,0,0,.12)",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        borderRight: "1px solid rgba(0,0,0,.12)",
      },
    },
  };
  return (
    <div className="content-body" style={{ minHeight: "884px" }}>
      <div className="container-fluid">
        <h5 className="font-weight-600 mb-0">Labor & Service Master</h5>
        <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Labor" value="1" />
                <Tab label="Service" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" className="px-0">
              <p className="mb-1 mt-4 font-size-12">
                Select the search criteria for equipment
              </p>
              <div className="w-100 equipment-select br-bl pb-3">
                <div className="d-flex align-items-center w-100 border-radius-10">
                  <div className="d-flex justify-content-between align-items-center border-radius-10">
                    <div className="row align-items-center m-0">
                      {searchSelector.length > 0 &&
                        searchSelector.map((searchFiled, i) => (
                          <div
                            className={`customselect py-1 d-flex align-items-center mr-3${
                              i > 0 ? " customselect-margin" : ""
                            }`}
                          >
                            {i > 0 && (
                              <Select
                                defaultValue={{ label: "And", value: "AND" }}
                                options={[
                                  { label: "And", value: "AND", id: i },
                                  { label: "Or", value: "OR", id: i },
                                ]}
                                placeholder="AND/OR"
                                // value={searchFiled.selectOperator}
                              />
                            )}
                            <div>
                              <Select
                                options={searchOptions}
                                placeholder="Search By"
                                // isOptionDisabled={(option) => checkForDisabled(option)}
                              />
                            </div>
                            <div className="customselectsearch pl-2">
                              <SearchIcon className="text-primary" />
                              <input
                                className="custom-input-sleact"
                                type="text"
                                placeholder="Search Parts"
                                autoComplete="off"
                              />
                              {
                                <ul
                                  className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                >
                                  {searchFiled.selectOptions.map(
                                    (currentItem, j) => (
                                      <li
                                        className="list-group-item"
                                        key={j}
                                        onClick={() =>
                                          handleClickOnSearchedList(
                                            currentItem,
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
                        ))}
                      <div
                        className={`d-flex align-items-center mr-3 ${
                          searchSelector.length > 1 ? "add-delete-mt" : ""
                        }`}
                      >
                        <div>
                          <Link
                            className="btn-sm cursor p-0 font-size-16 mr-2 bg-white text-violet"
                            onClick={addMoreSearchCritria}
                          >
                            +
                          </Link>
                        </div>
                        <div>
                          <Link
                            onClick={removeSearchCritria}
                            className="p-1 bg-white cursor"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
                                fill="#872FF7"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.5 2.25C7.08579 2.25 6.75 2.58579 6.75 3V4.5C6.75 4.91421 6.41421 5.25 6 5.25C5.58579 5.25 5.25 4.91421 5.25 4.5V3C5.25 1.75736 6.25736 0.75 7.5 0.75H10.5C11.7426 0.75 12.75 1.75736 12.75 3V4.5C12.75 4.91421 12.4142 5.25 12 5.25C11.5858 5.25 11.25 4.91421 11.25 4.5V3C11.25 2.58579 10.9142 2.25 10.5 2.25H7.5ZM3.75 3.75C4.16421 3.75 4.5 4.08579 4.5 4.5V15C4.5 15.4142 4.83579 15.75 5.25 15.75H12.75C13.1642 15.75 13.5 15.4142 13.5 15V4.5C13.5 4.08579 13.8358 3.75 14.25 3.75C14.6642 3.75 15 4.08579 15 4.5V15C15 16.2426 13.9926 17.25 12.75 17.25H5.25C4.00736 17.25 3 16.2426 3 15V4.5C3 4.08579 3.33579 3.75 3.75 3.75Z"
                                fill="#872FF7"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
                                fill="#872FF7"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
                                fill="#872FF7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <Link to="#" className="btn bg-primary text-white">
                      <span className="ml-1">Search</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 border-50">
                  <div className="bg-grey border-radius-10 p-3">
                    <div className="equipment-master-ul">
                      <ul>
                        {globalsearchList.map((Data, i) => (
                          <li className={`${i === 0 ? "active" : ""}`}>
                            <div className="row align-items-center">
                              <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                                <img
                                  src="../assets/images/spare-parts-sm.png"
                                  alt="jcb"
                                  className=" img-fluid"
                                />
                              </div>
                              <div className="col-lg-4 col-md-4 col-4">
                                <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                                  {Data.A}
                                </h6>
                                <p className="font-size-12 text-light-60 font-weight-500 m-0 text-truncate">
                                  {Data.B}
                                </p>
                              </div>
                              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-block pr-1">
                                    <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                                      {Data.C}
                                    </h6>
                                    <p className="font-size-12 text-light-60 font-weight-500 m-0 text-truncate">
                                      {Data.D}
                                    </p>
                                  </div>
                                  <div>
                                    <ArrowForwardIosIcon className="text-primary font-size-20" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
                  <div className="">
                    <div className="bg-white p-3 border-radius-10 ">
                      <div className="d-flex align-items-center justify-content-between equipment-pagination">
                        <h5 className="font-weight-600 mb-0">Inspection</h5>
                        <Stack spacing={2}>
                          <Pagination
                            boundaryCount={0}
                            siblingCount={0}
                            count={2}
                            page={labormasterpagination}
                            onChange={laborPaginationChange}
                          />
                        </Stack>
                      </div>
                      <div className="d-block mt-3">
                        <h6 className="text-primary font-weight-600">S014</h6>
                        <p className="text-light-60 font-size-12 mb-0">
                          External - Special Service
                        </p>
                      </div>
                    </div>

                    {labormasterpagination === 1 && (
                      <>
                        <div className="bg-white p-3 border-radius-10 overflow-hidden br-t">
                          <div className="row align-items-end">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Service Code
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Full Core Deposit
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Service Description
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Reman
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Service Type
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Active
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Labor Type
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Caterpillar
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Charge Code
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                336D2 L
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Labor Code
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  3620656
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Recommended Duration
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  REMAN
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Actual duration
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                1PB
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Estimated Duration
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  3620656
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3 border-radius-10 mt-4 mb-5">
                          <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Model
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                AA: 0S1619
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Family
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                AA: 0S1619
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Customer
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                AA: 0S1619
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Related Job Code
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                $ 90534
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Related Component Code
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                Stock
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {labormasterpagination === 2 && (
                      <>
                        <h6 className="font-weight-500 pl-2 mt-5">Price</h6>
                        <div className="bg-white p-3 border-radius-10 overflow-hidden">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="font-weight-600 mb-0 mr-3">
                              Price Details
                            </h6>
                            <a href="#" className="btn bg-primary text-white">
                              Add New
                            </a>
                          </div>
                          <div className="table-responsive mt-3">
                            <div
                              className="custom-table  table-child"
                              style={{
                                height: "auto",
                                width: "100%",
                              }}
                            >
                              <DataTable
                                title=""
                                columns={priceLaborColumns}
                                data={bundleItems}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
                        <div className="bg-white p-3 border-radius-10 overflow-hidden mb-5">
                          <h6 className="font-weight-600">ERP Details</h6>
                          <div className="table-responsive mt-3">
                            <div
                              className="custom-table  table-child"
                              style={{
                                height: "auto",
                                width: "100%",
                              }}
                            >
                              <DataTable
                                title=""
                                columns={erpLaborColumns}
                                data={bundleItems}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2" className="px-0">
              <p className="mb-1 mt-4 font-size-12">
                Select the search criteria for equipment
              </p>
              <div className="w-100 equipment-select br-bl pb-3">
                <div className="d-flex align-items-center w-100 border-radius-10">
                  <div className="d-flex justify-content-between align-items-center border-radius-10">
                    <div className="row align-items-center m-0">
                      {searchSelector.length > 0 &&
                        searchSelector.map((searchFiled, i) => (
                          <div
                            className={`customselect py-1 d-flex align-items-center mr-3${
                              i > 0 ? " customselect-margin" : ""
                            }`}
                          >
                            {i > 0 && (
                              <Select
                                defaultValue={{ label: "And", value: "AND" }}
                                options={[
                                  { label: "And", value: "AND", id: i },
                                  { label: "Or", value: "OR", id: i },
                                ]}
                                placeholder="AND/OR"
                                // value={searchFiled.selectOperator}
                              />
                            )}
                            <div>
                              <Select
                                options={laborOptions}
                                placeholder="Search By"
                                // isOptionDisabled={(option) => checkForDisabled(option)}
                              />
                            </div>
                            <div className="customselectsearch pl-2">
                              <SearchIcon className="text-primary" />
                              <input
                                className="custom-input-sleact"
                                type="text"
                                placeholder="Search Service"
                                autoComplete="off"
                              />
                              {
                                <ul
                                  className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                >
                                  {searchFiled.selectOptions.map(
                                    (currentItem, j) => (
                                      <li
                                        className="list-group-item"
                                        key={j}
                                        onClick={() =>
                                          handleClickOnSearchedList(
                                            currentItem,
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
                        ))}
                      <div
                        className={`d-flex align-items-center mr-3 ${
                          searchSelector.length > 1 ? "add-delete-mt" : ""
                        }`}
                      >
                        <div>
                          <Link
                            className="btn-sm cursor p-0 font-size-16 mr-2 bg-white text-violet"
                            onClick={addMoreSearchCritria}
                          >
                            +
                          </Link>
                        </div>
                        <div>
                          <Link
                            onClick={removeSearchCritria}
                            className="p-1 bg-white cursor"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
                                fill="#872FF7"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.5 2.25C7.08579 2.25 6.75 2.58579 6.75 3V4.5C6.75 4.91421 6.41421 5.25 6 5.25C5.58579 5.25 5.25 4.91421 5.25 4.5V3C5.25 1.75736 6.25736 0.75 7.5 0.75H10.5C11.7426 0.75 12.75 1.75736 12.75 3V4.5C12.75 4.91421 12.4142 5.25 12 5.25C11.5858 5.25 11.25 4.91421 11.25 4.5V3C11.25 2.58579 10.9142 2.25 10.5 2.25H7.5ZM3.75 3.75C4.16421 3.75 4.5 4.08579 4.5 4.5V15C4.5 15.4142 4.83579 15.75 5.25 15.75H12.75C13.1642 15.75 13.5 15.4142 13.5 15V4.5C13.5 4.08579 13.8358 3.75 14.25 3.75C14.6642 3.75 15 4.08579 15 4.5V15C15 16.2426 13.9926 17.25 12.75 17.25H5.25C4.00736 17.25 3 16.2426 3 15V4.5C3 4.08579 3.33579 3.75 3.75 3.75Z"
                                fill="#872FF7"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
                                fill="#872FF7"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
                                fill="#872FF7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <Link to="#" className="btn bg-primary text-white">
                      <span className="ml-1">Search</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 border-50">
                  <div className="bg-grey border-radius-10 p-3">
                    <div className="equipment-master-ul">
                      <ul>
                        {globalservicesearchList.map((Data, i) => (
                          <li className={`${i === 0 ? "active" : ""}`}>
                            <div className="row align-items-center">
                              <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                                <img
                                  src="../assets/images/spare-parts-sm.png"
                                  alt="jcb"
                                  className=" img-fluid"
                                />
                              </div>
                              <div className="col-lg-4 col-md-4 col-4">
                                <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                                  {Data.A}
                                </h6>
                                <p className="font-size-12 text-light-60 font-weight-500 m-0 text-truncate">
                                  {Data.B}
                                </p>
                              </div>
                              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="d-block pr-1">
                                    <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                                      {Data.C}
                                    </h6>
                                    <p className="font-size-12 text-light-60 font-weight-500 m-0 text-truncate">
                                      {Data.D}
                                    </p>
                                  </div>
                                  <div>
                                    <ArrowForwardIosIcon className="text-primary font-size-20" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
                  <div className="">
                    <div className="bg-white p-3 border-radius-10 ">
                      <div className="d-flex align-items-center justify-content-between equipment-pagination">
                        <h5 className="font-weight-600 mb-0">Machining</h5>
                        <Stack spacing={2}>
                          <Pagination
                            boundaryCount={0}
                            siblingCount={0}
                            count={2}
                            page={labormasterpagination}
                            onChange={laborPaginationChange}
                          />
                        </Stack>
                      </div>
                      <div className="d-block mt-3">
                        <h6 className="text-primary font-weight-600">AC03</h6>
                        <p className="text-light-60 font-size-12 mb-0">
                          Description 3 - Test Agency 3
                        </p>
                      </div>
                    </div>

                    {labormasterpagination === 1 && (
                      <>
                        <div className="bg-white p-3 border-radius-10 overflow-hidden br-t">
                          <div className="row align-items-end">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Activity Id
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Full Core Deposit
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Activity Name
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Reman
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Activity Description
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Active
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Supplying Vendor
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  Caterpillar
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Unit Of Measure
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                336D2 L
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Estimated Hours/Days
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  3620656
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  Activity Dimensions
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500">
                                  REMAN
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3 border-radius-10 mt-4 mb-5">
                          <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Model
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                AA: 0S1619
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Family
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                AA: 0S1619
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Customer
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                AA: 0S1619
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Related Job Code
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                $ 90534
                              </p>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                Related Component Code
                              </p>
                              <p className="text-primary font-size-12 mt-1 font-weight-500">
                                Stock
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {labormasterpagination === 2 && (
                      <>
                        <h6 className="font-weight-500 pl-2 mt-5">Price</h6>
                        <div className="bg-white p-3 border-radius-10 overflow-hidden">
                          <div className="d-flex align-items-center justify-content-between">
                            <h6 className="font-weight-600 mb-0 mr-3">
                              Price Details
                            </h6>
                            <a href="#" className="btn bg-primary text-white">
                              Add New
                            </a>
                          </div>
                          <div className="table-responsive mt-3">
                            <div
                              className="custom-table  table-child"
                              style={{
                                height: "auto",
                                width: "100%",
                              }}
                            >
                              <DataTable
                                title=""
                                columns={priceServiceColumns}
                                data={bundleItems}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
                        <div className="bg-white p-3 border-radius-10 overflow-hidden mb-5">
                          <h6 className="font-weight-600">ERP Details</h6>
                          <div className="table-responsive mt-3">
                            <div
                              className="custom-table  table-child"
                              style={{
                                height: "auto",
                                width: "100%",
                              }}
                            >
                              <DataTable
                                title=""
                                columns={erpLaborColumns}
                                data={erpItemsService}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default ServiceMaster;

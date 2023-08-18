import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EquipmentSearchComponent from "./EquipmentSearchComponent";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Switch from "@mui/material/Switch";
import $ from "jquery";

const searchOptions = [
  { value: "A", label: "Part Number" },
  { value: "B", label: "Group Number" },
  { value: "C", label: "Part Group" },
  { value: "D", label: "BEC Code" },
  { value: "E", label: "ERP Material Group" },
  { value: "F", label: "ERP Material Number" },
];

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
const warrentydata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "SEAL-O-RING",
    taskType: "1757896",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R4469",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "Spacer",
    taskType: "6I6123",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R5474",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "5879.24",
  },
];

const Parts360 = () => {
  const [bundleItems, setBundleItems] = useState([...tempdata]);
  const [warrentyItems, setWarrentyItems] = useState([...warrentydata]);

  const [value, setValue] = React.useState("1");
  const searchList = [
    { A: "5365377", B: "HOSE AS.", C: "3620656", D: "CATERPILLAR" },
    { A: "1L1118", B: "FITTING", C: "3620656", D: "Description" },
    { A: "0R6158", B: "Full Core Deposit", C: "992K", D: "Description" },
    { A: "3J0634", B: "SEAL", C: "3620656", D: "Description" },
    {
      A: "F198300020130",
      B: "PRESSURE WASHER",
      C: "3620656",
      D: "Description",
    },
  ];

  const label = { inputProps: { "aria-label": "Switch demo" } };

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
  const [equipmentmasterpagination, setEquipmentmasterpagination] =
    React.useState(1);
  const equipmentPaginationChange = (event, value) => {
    setEquipmentmasterpagination(value);
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

  const removeSearchCritria = () => {
    setSearchSelector([]);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const replpacedItemColumns = [
    {
      name: (
        <>
          <div>Replaced By</div>
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
          <div>Replaced Quantity</div>
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
          <div>Availability</div>
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
          <div>Total Available</div>
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
          <div>Sales Unit</div>
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
          <div>Price</div>
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
      // selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      // format: (row) => row?.bundleFlag,
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
  const alternateItemColumns = [
    {
      name: (
        <>
          <div>Alternate Part #</div>
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
          <div>Quantity</div>
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
          <div>Availability</div>
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
          <div>Total Available</div>
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
          <div>Sales Unit</div>
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
          <div>Price</div>
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
  const remanItemColumns = [
    {
      name: (
        <>
          <div>Reman Part #</div>
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
          <div>Refurbished Part #</div>
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
          <div>Availability</div>
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
          <div>Total Available</div>
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
          <div>Sales Unit</div>
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
          <div>Price</div>
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
  const priceItemColumns = [
    {
      name: (
        <>
          <div>Group#</div>
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
          <div>Type</div>
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
          <div>Part #</div>
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
          <div>Sales Unit</div>
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
          <div>Quantity</div>
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
          <div>Price</div>
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
          <div>Valid From</div>
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
          <div>Valid To</div>
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
  const erpDetailsItemColumns = [
    {
      name: (
        <>
          <div>ERP Condition</div>
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
          <div>ERP Amount</div>
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
          <div>ERP Cost Price</div>
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
          <div>ERP Margin</div>
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
          <div>Last Priced Date </div>
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
          <div>Price Change Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
  ];
  const warrentyItemColumns = [
    {
      name: (
        <>
          <div>Warranty Type</div>
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
          <div>Warranty Duration</div>
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
          <div>Date Of Sale</div>
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
          <div>Date Of Installation</div>
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
          <div>Actions</div>
        </>
      ),
      // selector: (row) => row?.bundleFlag,
      wrap: true,
      sortable: true,
      // format: (row) => row?.bundleFlag,
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
        <h5 className="font-weight-600 mb-0">Parts 360</h5>
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
                            {searchFiled.selectOptions.map((currentItem, j) => (
                              <li
                                className="list-group-item"
                                key={j}
                                onClick={() =>
                                  handleClickOnSearchedList(currentItem, i)
                                }
                              >
                                {currentItem}
                              </li>
                            ))}
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
                  {searchList.map((Data, i) => (
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
                  <h5 className="font-weight-600 mb-0">Full Core Deposit</h5>
                  <Stack spacing={2}>
                    <Pagination
                      boundaryCount={0}
                      siblingCount={0}
                      count={4}
                      page={equipmentmasterpagination}
                      onChange={equipmentPaginationChange}
                    />
                  </Stack>
                </div>
                <div className="d-block mt-3">
                  <h6 className="text-primary font-weight-600">0R6158</h6>
                  <p className="text-light-60 font-size-12 mb-0">992K - 2015</p>
                </div>
              </div>

              {equipmentmasterpagination === 1 && (
                <>
                  <div className="bg-white p-3 border-radius-10 overflow-hidden">
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Description
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Full Core Deposit
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Type
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Reman
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <img
                          src="../assets/images/spare-parts.png"
                          alt="spare-parts"
                          className="width-75 img-fluid"
                        />
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Manufacturer
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Caterpillar
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Model
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            336D2 L
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Group Number
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          3620656
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Parts Group
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            REMAN
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            BEC Code
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            1PB
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          BEC Code Description
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          CALEFACTOR CCC
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Serial Number (If Any)
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            ZCT01096
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Status
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Active
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="font-weight-500 mt-4">ERP Details</h5>
                  <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Material Group
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          AA: 0S1619
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Material Number
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          AA: 0S1619
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Old Material Number
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          AA: 0S1619
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Average Cost
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          $ 90534
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Availability
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          Stock
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Total Number Available
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          10
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Status
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {equipmentmasterpagination === 2 && (
                <>
                  <h5 className="font-weight-500 mt-4 ">Substitute Details</h5>
                  <div className="d-flex align-items-center">
                    <h6 className="m-0 mr-2 font-weight-600">Replaced By</h6>
                    <div className="equipment-switch">
                      <Switch {...label} defaultChecked size="small" />
                    </div>
                  </div>
                  <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
                    <div className="row align-items-center">
                      <div className="col-lg-9 col-md-9">
                        <div className="d-flex align-items-center">
                          <h6 className="font-weight-500 mb-0 mr-3">Parts</h6>
                          <EquipmentSearchComponent
                            searchOptions={searchOptions}
                            searchPlaceholder="Parts"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 text-right">
                        <a href="#" className="btn bg-primary text-white">
                          <span className="mr-1">
                            <AddIcon />
                          </span>
                          Upload
                        </a>
                      </div>
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
                          columns={replpacedItemColumns}
                          data={bundleItems}
                          customStyles={customStyles}
                          // pagination
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <h6 className="m-0 mr-2 font-weight-600">
                      Alternate Parts
                    </h6>
                    <div className="equipment-switch">
                      <Switch {...label} defaultChecked size="small" />
                    </div>
                  </div>
                  <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
                    <div className="row align-items-center">
                      <div className="col-lg-9 col-md-9">
                        <div className="d-flex align-items-center">
                          <h6 className="font-weight-500 mb-0 mr-3">Parts</h6>
                          <EquipmentSearchComponent
                            searchOptions={searchOptions}
                            searchPlaceholder="Parts"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 text-right">
                        <a href="#" className="btn bg-primary text-white">
                          <span className="mr-1">
                            <AddIcon />
                          </span>
                          Upload
                        </a>
                      </div>
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
                          columns={alternateItemColumns}
                          data={bundleItems}
                          customStyles={customStyles}
                          // pagination
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <h6 className="m-0 mr-2 font-weight-600">
                      AReman or Refurb Option
                    </h6>
                    <div className="equipment-switch">
                      <Switch {...label} defaultChecked size="small" />
                    </div>
                  </div>
                  <div className="bg-white p-3 border-radius-10 mt-3 mb-5 overflow-hidden">
                    <div className="row align-items-center">
                      <div className="col-lg-9 col-md-9">
                        <div className="d-flex align-items-center">
                          <h6 className="font-weight-500 mb-0 mr-3">Parts</h6>
                          <EquipmentSearchComponent
                            searchOptions={searchOptions}
                            searchPlaceholder="Parts"
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 text-right">
                        <a href="#" className="btn bg-primary text-white">
                          <span className="mr-1">
                            <AddIcon />
                          </span>
                          Upload
                        </a>
                      </div>
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
                          columns={remanItemColumns}
                          data={bundleItems}
                          customStyles={customStyles}
                          // pagination
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              {equipmentmasterpagination === 3 && (
                <>
                  <Box
                    className="mt-3"
                    sx={{ width: "100%", typography: "body1" }}
                  >
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab label="Price" value="1" />
                          <Tab label="Discount" value="2" />
                        </TabList>
                      </Box>
                      <TabPanel value="1" className="px-0">
                        <div className="bg-white p-3 border-radius-10">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 master-input-fields">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  Select a combination
                                </label>
                                <Select
                                  className="text-primary"
                                  // value={generalComponentData.customerSegment}
                                  // options={customerSegmentKeyValue}
                                  placeholder="Customer Segment"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <div className="form-group">
                                <label
                                  className="text-light-dark font-size-12 font-weight-500"
                                  htmlFor="exampleInputEmail1"
                                >
                                  Enter respective values
                                </label>
                                <input
                                  className="form-control border-light-blue text-primary border-radius-10"
                                  placeholder="Marine"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <div className="form-group">
                                <label
                                  className="text-light-dark font-size-12 font-weight-500"
                                  htmlFor="exampleInputEmail1"
                                >
                                  Select Price Method
                                </label>
                                <input
                                  className="form-control border-light-blue border-radius-10 text-primary"
                                  placeholder="List Price"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3 border-radius-10 mt-4 overflow-hidden">
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
                                columns={priceItemColumns}
                                data={bundleItems}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
                        <div className="bg-white p-3 mt-3 border-radius-10 mb-5 overflow-hidden">
                          <h6 className="font-weight-600 mb-0 mr-3">
                            ERP Price
                          </h6>
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
                                columns={erpDetailsItemColumns}
                                data={bundleItems}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="2" className="px-0">
                        <div className="bg-white p-3 border-radius-10">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 master-input-fields">
                              <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                  Select a combination
                                </label>
                                <Select
                                  className="text-primary"
                                  // value={generalComponentData.customerSegment}
                                  // options={customerSegmentKeyValue}
                                  placeholder="Customer Segment"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <div className="form-group">
                                <label
                                  className="text-light-dark font-size-12 font-weight-500"
                                  htmlFor="exampleInputEmail1"
                                >
                                  Enter respective values
                                </label>
                                <input
                                  className="form-control border-light-blue text-primary border-radius-10"
                                  placeholder="Marine"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                              <div className="form-group">
                                <label
                                  className="text-light-dark font-size-12 font-weight-500"
                                  htmlFor="exampleInputEmail1"
                                >
                                  Select Price Method
                                </label>
                                <input
                                  className="form-control border-light-blue border-radius-10 text-primary"
                                  placeholder="List Price"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3 border-radius-10 mt-4 overflow-hidden">
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
                                columns={priceItemColumns}
                                data={bundleItems}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
                        <div className="bg-white p-3 mt-3 border-radius-10 mb-5 overflow-hidden">
                          <h6 className="font-weight-600 mb-0 mr-3">
                            ERP Price
                          </h6>
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
                                columns={erpDetailsItemColumns}
                                data={bundleItems}
                                customStyles={customStyles}
                                // pagination
                              />
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </TabContext>
                  </Box>
                </>
              )}
              {equipmentmasterpagination === 4 && (
                <>
                  <h5 className="font-weight-500 mt-5 ">Warranty</h5>
                  <div className="bg-white p-3 border-radius-10 mt-3 mb-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="font-weight-600 mb-0 mr-3">
                        Warranty Details
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
                          columns={warrentyItemColumns}
                          data={warrentyItems}
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
      </div>
    </div>
  );
};

export default Parts360;

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Modal } from "react-bootstrap";
import TabContext from "@mui/lab/TabContext";
import { DataGrid } from "@mui/x-data-grid";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Select from "react-select";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import shareIcon from "../../assets/icons/svg/share.svg";
import folderaddIcon from "../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../assets/icons/svg/upload.svg";
import cpqIcon from "../../assets/icons/svg/CPQ.svg";
import $ from "jquery";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import copyIcon from "../../assets/icons/svg/Copy.svg";
import editIcon from "../../assets/icons/svg/edit.svg";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { MuiMenuComponent } from "pages/Operational";
import { CommanComponents } from "components";
import SearchComponent from "pages/Repair/components/SearchComponent";
import { sparePartSearch, sparePartSearchMargin } from "services/searchServices";
import { GRID_STYLE, SPAREPART_SEARCH_Q_OPTIONS } from "pages/Repair/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";

function PriceComputation() {
  const activityOptions = ["None", "Atria", "Callisto"];
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState("1");
  const [show, setShow] = React.useState(false);
  const handleOpen = () => setShow(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose1 = () => {
    setShow(false);
  };
  const columns = [
    { field: "groupNumber", headerName: "Group Number", flex: 1, width: 70 },
    { field: "partType", headerName: "Type", flex: 1, width: 130 },
    { field: "partNumber", headerName: "Part number", flex: 1, width: 130 },
    {
      field: "listPrice",
      headerName: "Unit Price",
      flex: 1,
      width: 130,
    },
    {
      field: "currency",
      headerName: "Price currency",
      flex: 1,
      width: 130,
    },
    { field: "marginPrice", headerName: "Margin", flex: 1, width: 130 },
    { field: "totalPrice", headerName: "Total Price", flex: 1, width: 130 },
    // { field: "Comments", headerName: "Comments", flex: 1, width: 130 },
    // { field: "Actions", headerName: "Actions", flex: 1, width: 130 },
    // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
    // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'DocumentType') || ''
    //     }`,
  ];

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
  const [masterData, setMasterData] = useState([]);
  // Once parts are selected to add clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  // To display the notifications
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    // console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr = "";
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
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
          encodeURI('"' + item.inputSearch + '"');
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await sparePartSearchMargin(searchStr);
        // console.log("search Query Result :", res);
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };
  return (
    <>
      {/* <CommanComponents/> */}
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid mt-3">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Recommended price</h5>
            <div className="d-flex justify-content-center align-items-center">
              <a href="#" className="ml-3 font-size-14" title="Share">
                <img src={shareIcon}></img>
              </a>
              <a href="#" className="ml-3 font-size-14" title="Item to Review">
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
          <div className="card p-4 mt-5">
            <div className="border card p-3 mb-0">
              <SearchComponent
                querySearchSelector={querySearchSelector}
                setQuerySearchSelector={setQuerySearchSelector}
                clearFilteredData={clearFilteredData}
                handleSnack={handleSnack}
                searchAPI={sparePartSearchMargin}
                searchClick={handleQuerySearchClick}
                options={SPAREPART_SEARCH_Q_OPTIONS}
                background={"white"}
                type=""
                zindex={0}
                buttonText="SEARCH"
              />
              {/* <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          FILTER CRITERIA
                        </label>
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Spare Parts"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        ></label>
                        <Select
                          className="mt-2"
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="Last 30 days"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="row">
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        ></label>
                        <Select
                          className="mt-2"
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="By material"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        ></label>
                        <Select
                          className="mt-2"
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="By Service"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        ></label>
                        <Select
                          className="mt-2"
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="By Customer"
                        />
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-3">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        ></label>
                        <div className="mt-1 pt-1">
                          <a
                            href="#"
                            className=" font-size-14 border p-2 border-radius-10 d-block text-center"
                          >
                            Add filter +
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="card border">
            <div className="d-flex align-items-center justify-content-between px-3">
              <div className="">
                <div className="d-flex ">
                  <h5 className=" mb-0">
                    <span>Report type</span>
                  </h5>
                  <p className=" mb-0">
                    <a href="#" className="ml-3 ">
                      <img src={editIcon}></img>
                    </a>
                    <a href="#" className="ml-3 ">
                      <img src={shareIcon}></img>
                    </a>
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center ">
                <div className=" text-center py-4 pl-3">
                  {/* <a  onClick={()=>handleOpen()} className=" ">+ Add Price</a> */}
                </div>
              </div>
            </div>
            <div
              className=""
              style={{ height: 400, width: "100%", backgroundColor: "#fff" }}
            >
              <DataGrid
                className="mx-3 my-1"
                getRowId={(row)=> row.partNumber}
                // sx={{
                //   "& .MuiDataGrid-columnHeaders": {
                //     backgroundColor: "#7380E4",
                //     color: "#fff",
                //   },
                // }}
                sx={GRID_STYLE}
                rows={masterData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                // checkboxSelection
              />
            </div>
          </div>
          <div>
            <a href="#" className=" btn bg-primary text-white ">
              Next
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceComputation;

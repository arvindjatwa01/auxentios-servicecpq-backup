import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SelectFilter from "react-select";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import $ from "jquery";
import { QUOTE_SPARE_PARTS_TEMPLATE, QUOTE_SPARE_PART_CONFIGURATION } from "navigation/CONSTANTS";
import SearchComponent from "../components/SearchComponent";
import { QUOTE_SEARCH_Q_OPTIONS } from "../CONSTANTS";
import { builderSearch } from "services/repairBuilderServices";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";

const SearchSparePartQuote = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);

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
      Actions: "Inconsistent",
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
      Actions: "Inconsistent",
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
      Actions: "Inconsistent",
    },
    // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
    // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
    // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
    // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
    // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
    // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
  ];
  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
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
  const handleRowClick = (e) => {
    setShow(true);
  };
  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
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
        const res = await builderSearch(
          `quoteType:PARTS_QUOTE AND saved:true AND ${searchStr}`
        );
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  // Once option has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
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

  const [masterData, setMasterData] = useState([]);
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
  const masterColumns = [
    // {
    //     name: (
    //         <>
    //             <div>Select</div>
    //         </>
    //     ),
    //     // selector: (row) => row.check1,
    //     wrap: true,
    //     sortable: true,
    //     maxWidth: "50px",
    //     minWidth: "50px",
    //     cell: (row) => (
    //         <Checkbox
    //             className="text-black"
    //         // checked={row.check1}
    //         // onChange={(e) => handleCheckboxData(e, row)}
    //         />
    //     ),
    // },
    {
      name: (
        <>
          <div>Quote Id</div>
        </>
      ),
      selector: (row) => row.quoteId,
      wrap: true,
      sortable: true,
      format: (row) => row.quoteId,
    },
    {
      name: (
        <>
          <div>Description</div>
        </>
      ),
      selector: (row) => row.description,
      wrap: true,
      sortable: true,
      format: (row) => row.description,
    },
    {
      name: (
        <>
          <div>Version</div>
        </>
      ),
      selector: (row) => row.version,
      wrap: true,
      sortable: true,
      format: (row) => row.version,
    },
    {
      name: (
        <>
          <div>Status</div>
        </>
      ),
      selector: (row) => row.status,
      wrap: true,
      sortable: true,
      format: (row) => row.status,
    },
    {
      name: (
        <>
          <div>Created On</div>
        </>
      ),
      selector: (row) => row.createdOn,
      wrap: true,
      sortable: true,
      format: (row) => row.createdOn,
    },
    {
      name: (
        <>
          <div>Validity</div>
        </>
      ),
      selector: (row) => row.validity,
      wrap: true,
      sortable: true,
      format: (row) => row.validity,
    },
    {
      name: (
        <>
          <div>Serial No</div>
        </>
      ),
      selector: (row) => row.serialNumber,
      wrap: true,
      sortable: true,
      format: (row) => row.serialNumber,
    },
    {
      name: (
        <>
          <div>Model</div>
        </>
      ),
      selector: (row) => row.model,
      wrap: true,
      sortable: true,
      format: (row) => row.model,
    },
    {
      name: (
        <>
          <div>currency</div>
        </>
      ),
      selector: (row) => row.currency,
      wrap: true,
      sortable: true,
      format: (row) => row.currency,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.totalPrice,
      wrap: true,
      sortable: true,
      format: (row) => row.totalPrice,
    },
  ];

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="card p-4 mt-5">
            <div className="d-flex align-items-center mb-0">
              <div className="" style={{ display: "contents" }}>
              <h5 className="col-10 mr-3 mb-0" style={{ whiteSpace: "pre" }}>
                  Search Quote
                </h5>
              </div>


              <div className="ml-2">
                <Link
                  to={QUOTE_SPARE_PART_CONFIGURATION}
                  className="btn bg-primary text-white"
                >
                  Create New <ChevronRightIcon className="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-6">
            <div className="row align-items-center">
              <div className="col-11 mx-2">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div
                    className="d-flex mr-3 py-3"
                    style={{ whiteSpace: "pre" }}
                  >
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Spare Parts Quotes</span>
                    </h5>
                  </div>
                  <p className=" mb-0">
                    <a href="#" className="ml-2 text-white">
                      <EditOutlinedIcon />
                    </a>
                    <a href="#" className="ml-2 text-white">
                      <ShareOutlinedIcon />
                    </a>
                  </p>
                  <SearchComponent
                    querySearchSelector={querySearchSelector}
                    setQuerySearchSelector={setQuerySearchSelector}
                    clearFilteredData={clearFilteredData}
                    handleSnack={handleSnack}
                    searchAPI={builderSearch}
                    searchClick={handleQuerySearchClick}
                    options={QUOTE_SEARCH_Q_OPTIONS}
                    color="white"
                    quoteType={"PARTS_QUOTE"}
                    buttonText="SEARCH"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className=""
              style={{ height: 400, width: "100%", backgroundColor: "#fff" }}
            >
              <DataTable
                className=""
                title=""
                columns={masterColumns}
                data={masterData}
                customStyles={customStyles}
                pagination
                selectableRows
                onRowClicked={(e) => handleRowClick(e)}
                // selectableRows
              />
            </div>
          </div>
          {/* <div className="text-right">
          <a href="/ConfigurationSolutionBuilderComponent" className="btn bg-primary text-white">Next</a>
        </div> */}
        </div>
        <Modal
          className="tablerowmodal"
          show={show}
          onHide={() => handleClose()}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body className="">
            <div
              class="modal-header justify-content-unset"
              style={{ background: "#D0E1EF", justifyContent: "unset" }}
            >
              {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
          <h4 class="modal-title">Warning!</h4> */}
              <div>
                <LightbulbOutlinedIcon className="text-light" />
              </div>
              <div>
                <p className="text-light ml-3">
                  This standard job is created for replacement of engne
                  belonging to 797,797F & 793 models
                </p>
              </div>
            </div>
            <div class="p-3 bg-white">
              <div>
                <a href="#" className="btn bg-primary text-white">
                  Template
                </a>
              </div>
              <h4 className="text-light mt-3">SJ671</h4>
              {/* <p>Your current session will expire in 5 minutes. Please Save your changes to continue your session, otherwise you
             will lose all unsaved data and your session will time out.</p> */}
              <h4 className=" mt-3">SUMMARY</h4>
              <ul>
                <li className="my-2">
                  <span className="mr-3 ">
                    <FormatListBulletedOutlinedIcon />
                  </span>
                  Spare Parts New (# 31)
                </li>
                <li className="my-2">
                  <span className="mr-3 ">
                    <FormatListBulletedOutlinedIcon />
                  </span>
                  Spare Parts Remain (# 7)
                </li>
                <li className="my-2">
                  <span className="mr-3 ">
                    <FormatListBulletedOutlinedIcon />
                  </span>
                  Number of Parts #38.
                </li>
                <li className="my-2">
                  <span className="mr-3 ">
                    <FormatListBulletedOutlinedIcon />
                  </span>
                  Total Price $4,100.00
                </li>
              </ul>
              <div>
                <a href="#" style={{ textDecoration: "underline" }}>
                  View Details
                </a>
              </div>
            </div>
            <div class="modal-footer justify-content-between bg-primary">
              <div>
                <b className="text-white">$50,000</b>
              </div>
              <div>
                <a href={QUOTE_SPARE_PARTS_TEMPLATE} className="text-white">
                  Select <ArrowRightAltOutlinedIcon className="" />
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default SearchSparePartQuote;

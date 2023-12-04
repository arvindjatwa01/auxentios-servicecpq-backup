import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';
import DataTable from "react-data-table-component";
import SelectFilter from "react-select";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { CommanComponents } from "../../components/index"
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, useHistory } from "react-router-dom";
import { Modal, ModalFooter } from 'react-bootstrap';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import $ from 'jquery';

import { ToastContainer, toast } from 'react-toastify';

import {
  getSearchCoverageForFamily,
  getSearchQueryCoverage,
  getSearchQuoteData,
  getQuoteSearchDropdown,
} from "../../services/index";
import { QUOTE_REPAIR_CREATE, SOLUTION_QUOTE_CREATE } from "navigation/CONSTANTS";
import SearchComponent from "pages/Repair/components/SearchComponent";
import { quoteRepairSearch } from "services/repairQuoteServices";
import { QUOTE_SEARCH_Q_OPTIONS } from "pages/Repair/CONSTANTS";
export const solutionQuoteColumns = [
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
        <div>Quote ID</div>
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
        <div>Customer ID</div>
      </>
    ),
    selector: (row) => row.customerId,
    wrap: true,
    sortable: true,
    format: (row) => row.customerId,
  },
  {
    name: (
      <>
        <div>Reference</div>
      </>
    ),
    selector: (row) => row.reference,
    wrap: true,
    sortable: true,
    format: (row) => row.reference,
  },
  {
    name: (
      <>
        <div>Total Amount</div>
      </>
    ),
    selector: (row) => row.netPrice,
    wrap: true,
    sortable: true,
    format: (row) => row.netPrice,
  },
  {
    name: (
      <>
        <div>Serial #</div>
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
        <div>Currency</div>
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
        <div>Created By</div>
      </>
    ),
    selector: (row) => row.preparedBy,
    wrap: true,
    sortable: true,
    format: (row) => row.preparedBy,
  },
  {
    name: (
      <>
        <div>Created On</div>
      </>
    ),
    selector: (row) => row.preparedOn,
    wrap: true,
    sortable: true,
    format: (row) => row.preparedOn,
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
];
const SolutionQuoteSearch = () => {
  const history = useHistory();
  const [age, setAge] = React.useState('5');
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');
  const [show, setShow] = React.useState(false);

  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: { label: "And", value: "AND" },
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);
  const [count, setCount] = useState(1);
  const activityOptions = [
    'Create Versions',
    'Show Errors',
    'Review'
  ];

  const [selectedMasterData, setSelectedMasterData] = useState([]);
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  const [clickedQuoteRowData, setClickedQuoteRowData] = useState(null);

  const [searchQuoteMasterData, setSearchQuoteMasterData] = useState([]);

  const [value, setValue] = React.useState('1');

  const handleOpen = () => setShow(true)
  const handleClose = () => setShow(false)

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

  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
  const addSearchQueryHtml = () => {
    if (count < 2) {
      setQuerySearchSelector([
        ...querySearchSelector,
        {
          id: count,
          selectOperator: { label: "And", value: "AND" },
          selectFamily: "",
          inputSearch: "",
          selectOptions: [],
          selectedOption: "",
        },
      ]);
      setCount(count + 1);
    }

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

  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];

    var searchText = `SOLUTION_QUOTE&field_name=${tempArray[id].selectFamily.value}&field_value=${e.target.value}`;
    var searchStr = `quoteType:SOLUTION_QUOTE AND ${tempArray[id].selectFamily.value + "~" + e.target.value}`;
    var SearchResArr = [];
    if (e.target.value.length !== 0) {
      getQuoteSearchDropdown(searchText)
        .then((res) => {
          if (res.status == 200) {
            if (tempArray[id].selectFamily.value === "preparedBy") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].preparedBy)
              }

            } else if (tempArray[id].selectFamily.value == "customerId") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].customerId)
              }
            } else if (tempArray[id].selectFamily.value == "model") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].model)
              }
            } else if (tempArray[id].selectFamily.value == "serialNumber") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].serialNumber)
              }
            } else if (tempArray[id].selectFamily.value == "quoteId") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].quoteId)
              }
            } else if (tempArray[id].selectFamily.value == "description") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].description)
              }
            } else if (tempArray[id].selectFamily.value == "quoteName") {
              for (let i = 0; i < res.data.length; i++) {
                SearchResArr.push(res.data[i].quoteName)
              }
            }
            obj.selectOptions = SearchResArr;

            tempArray[id] = obj;
            setQuerySearchSelector([...tempArray]);
            $(`.scrollbar-${id}`).css("display", "block");
          } else {
            toast("😐" + res.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((err) => {
          console.log("err in api call", err);
        });
    } else {
      obj.selectOptions = [];
      tempArray[id] = obj;
      setQuerySearchSelector([...tempArray]);
    }

    obj.inputSearch = e.target.value; // working new cmt

    // getSearchQuoteData(searchStr)
    //   .then((res) => {
    //     console.log("response is : ", res)
    //     if (res.status == 200) {
    //       obj.selectOptions = res;
    //       tempArray[id] = obj;
    //       setQuerySearchSelector([...tempArray]);
    //       $(`.scrollbar-${id}`).css("display", "block");
    //     } else {
    //       toast("😐" + res.data.message, {
    //         position: "top-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //       });
    //     }


    //   })
    //   .catch((err) => {
    //     console.log("err in api call", err);
    //   });
    // obj.inputSearch = e.target.value;
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", e);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const clearFilteredData = () => {
    setMasterData([]);
  };

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

  const handleQuoteSearchClick = () => {
    try {

      $(".scrollbar").css("display", "none")

      console.log("handleQuerySearchClick", querySearchSelector)

      if (
        querySearchSelector[0]?.selectCategory?.value == "" ||
        querySearchSelector[0]?.inputSearch == "" ||
        querySearchSelector[0]?.selectCategory?.value === undefined
      ) {
        // throw "Please fill data properly"
      }

      var searchStr = `SOLUTION_QUOTE&field_name=${querySearchSelector[0].selectCategory.value}&field_value=${querySearchSelector[0].inputSearch}`;
      // var searchText = "quoteType:SOLUTION_QUOTE AND " + querySearchSelector[0].selectFamily.value + "~" + querySearchSelector[0].inputSearch

      for (let i = 1; i < querySearchSelector.length; i++) {
        searchStr = searchStr + " " + querySearchSelector[i].selectOperator.value + " " + querySearchSelector[i].selectFamily.value + "~" + querySearchSelector[i].inputSearch
      }

      console.log("searchStr", searchStr)
      getQuoteSearchDropdown(searchStr).then((res) => {
        console.log("search Quote Result :", res)
        if (res.status === 200) {
          setSearchQuoteMasterData(res.data)
        } else {
          toast("😐" + res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        // setBundleServiceShow(true)

      }).catch((err) => {
        console.log("error in getSearchQueryCoverage", err)
      })

    } catch (error) {
      console.log("error in getSearchQueryCoverage", error);
      toast("😐" + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return
    }
  }

  const columns = [
    { field: 'GroupNumber', headerName: 'Group Number', flex: 1, width: 70 },
    { field: 'Type', headerName: 'Type', flex: 1, width: 130 },
    { field: 'Partnumber', headerName: 'Part number', flex: 1, width: 130 },
    { field: 'PriceExtended', headerName: 'Price Extended', flex: 1, width: 130 },
    { field: 'Pricecurrency', headerName: 'Price currency', flex: 1, width: 130 },
    { field: 'Usage', headerName: 'Usage', flex: 1, width: 130 },
    { field: 'TotalPrice', headerName: 'Total Price', flex: 1, width: 130 },
    { field: 'Comments', headerName: 'Comments', flex: 1, width: 130 },
    { field: 'Actions', headerName: 'Actions', flex: 1, width: 130 },
    // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
    // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'DocumentType') || ''
    //     }`,

  ];


  

  const rows = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
    { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
    // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
    // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
    // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
    // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
    // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
    // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
  ];

  const handleRowClick = (e) => {
    // console.log(e);
    setClickedQuoteRowData(e)
    setShow(true)

  }

  const handleSelectQuote = (data) => {
    let quotesDetails = {
      quoteId: data.quoteId,
      type: "fetch",
    }
    history.push({
      pathname: "/SolutionServicePortfolio",
      state: quotesDetails,
    });
  }

  const getFormattedDateTimeByTimeStamp = (timeStamp) => {

    var date = new Date(timeStamp);
    var year = date.getFullYear();
    // var m = date.getMonth() + 1;
    var m = date.getMonth();
    // var month = m < 10 ? '0' + m : m;
    var month = m;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var format = "AM";
    var hour = date.getHours();
    var minutes = date.getMinutes();

    var monthName = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (hour > 11) {
      format = "PM";
    }
    if (hour > 12) {
      hour = hour - 12;
    } else if (hour === 0) {
      hour = 12;
    }

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    // var finalDateString = day + "-" + month + "-" + year + " " + hour + ":" + minutes + " " + format;
    var finalDateString = day + " " + monthName[month - 1] + "-" + year;
    // var finalDateString = year + "-" + month + "-" + day;
    return finalDateString;
  }

  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
        <div className="card p-4 mt-5">
            <div className="row d-flex align-items-center mb-0">
              <div className="" style={{ display: "contents" }}>
                <h5 className="col-10 mr-3 mb-0" style={{ whiteSpace: "pre" }}>
                  Search Quotes
                </h5>
              </div>
              <div className="ml-2">
                <Link
                  to={SOLUTION_QUOTE_CREATE}
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
                      <span>Quotes</span>
                    </h5>
                  </div>
                  {/* <p className="mb-0">
                    <a href="#" className="ml-2 text-white">
                      <EditOutlinedIcon />
                    </a>
                    <a href="#" className="ml-2 text-white">
                      <ShareOutlinedIcon />
                    </a>
                  </p> */}
                  <SearchComponent
                    querySearchSelector={querySearchSelector}
                    setQuerySearchSelector={setQuerySearchSelector}
                    clearFilteredData={clearFilteredData}
                    handleSnack={handleSnack}
                    searchAPI={quoteRepairSearch}
                    searchClick={handleQuoteSearchClick}
                    options={QUOTE_SEARCH_Q_OPTIONS}
                    color="white"
                    quoteType={"SOLUTION_QUOTE"}
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
                columns={solutionQuoteColumns}
                data={searchQuoteMasterData}
                customStyles={customStyles}
                pagination
                onRowClicked={(e) => handleRowClick(e)}
              // selectableRows
              />
            </div>
          </div>
          {/* <div className="text-right">
          <a href="/ConfigurationSolutionBuilderComponent" className="btn bg-primary text-white">Next</a>
        </div> */}
        </div>
        <Modal className="tablerowmodal" show={show} onHide={() => handleClose()} size="ms"
          aria-labelledby="contained-modal-title-vcenter">
          <Modal.Body className="">
            {clickedQuoteRowData !== null && <>
              <div class="modal-header justify-content-unset" style={{ background: '#D0E1EF', justifyContent: 'unset' }}>
                {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
          <h4 class="modal-title">Warning!</h4> */}
                <div><LightbulbOutlinedIcon className="text-light" /></div>
                <div>
                  {/* <p className="text-light ml-3">This standard job is created for replacement of engne belonging to 797,797F & 793 models</p> */}
                  <p className="text-light ml-3">This solution quote was created by {clickedQuoteRowData?.preparedBy} on {clickedQuoteRowData?.preparedOn != null ? getFormattedDateTimeByTimeStamp(clickedQuoteRowData?.preparedOn) : ""}</p>
                </div>
              </div>
              <div class="p-3 bg-white">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <a href="#" className="btn bg-primary text-white">Solution Quote</a>
                  </div>
                  <h4 className="text-light mt-2 mr-2">{clickedQuoteRowData?.quoteId}</h4>
                </div>
                <hr />
                <h5 className=" mt-3">Summary</h5>
                <ul>
                  <li className="my-2"><span className="mr-3 "><Checkbox className="p-0 font-size-14 text-primary" defaultChecked /></span>{clickedQuoteRowData?.description}</li>
                  <li className="my-2"><span className="mr-3 "><Checkbox className="p-0 font-size-14 text-primary" defaultChecked /></span>{clickedQuoteRowData?.serialNumber}</li>
                  <li className="my-2"><span className="mr-3 "><Checkbox className="p-0 font-size-14 text-primary" defaultChecked /></span>{clickedQuoteRowData?.model}</li>
                  <li className="my-2"><span className="mr-3 "><Checkbox className="p-0 font-size-14 text-primary" defaultChecked /></span>{clickedQuoteRowData?.customerId}</li>

                </ul>
                {/* <p>{clickedQuoteRowData?.description}</p> */}
                {/* <h4 className=" mt-3">INCLUDES</h4>
                <ul>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Spare Parts</li>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Labor Hours</li>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Miscellaenous</li>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>External Work</li>

                </ul> */}
                <div>
                  <a href="#" style={{ textDecoration: 'underline' }}>View Details</a>
                </div>
              </div>
              <div class="modal-footer justify-content-between bg-primary">
                <div>
                  {/* <b className="text-white">$50,000</b> */}
                  <b className="text-white">${clickedQuoteRowData.netPrice}</b>
                </div>
                <div>
                  <a href={undefined} className="text-white cursor" onClick={() => handleSelectQuote(clickedQuoteRowData)}>Select <ArrowRightAltOutlinedIcon className="" /></a>
                  {/* <a href="/SparePartsQuoteTemplate" className="text-white">Select <ArrowRightAltOutlinedIcon className="" /></a> */}
                </div>
              </div>
            </>}
          </Modal.Body>
        </Modal>


      </div>

    </>
  )
}

export default SolutionQuoteSearch
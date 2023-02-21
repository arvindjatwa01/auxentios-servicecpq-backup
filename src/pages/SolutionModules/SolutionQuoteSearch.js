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
import { Link } from "react-router-dom";
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

const SolutionQuoteSearch = () => {

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

    obj.inputSearch = e.target.value;

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

  const handleQuoteSearchClick = () => {
    try {

      $(".scrollbar").css("display", "none")

      console.log("handleQuerySearchClick", querySearchSelector)

      if (
        querySearchSelector[0]?.selectFamily?.value == "" ||
        querySearchSelector[0]?.inputSearch == "" ||
        querySearchSelector[0]?.selectFamily?.value === undefined
      ) {
        throw "Please fill data properly"
      }

      var searchStr = `SOLUTION_QUOTE&field_name=${querySearchSelector[0].selectFamily.value}&field_value=${querySearchSelector[0].inputSearch}`;
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
    setShow(true)
  }
  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="card p-4 mt-5">
            <div className="d-flex align-items-center mb-0">
              <div className="" style={{ display: 'contents' }}><h5 className="mr-3 mb-0" style={{ whiteSpace: 'pre' }}>Search Quotes</h5></div>
              <div class="input-group icons border-radius-10 border overflow-hidden">
                <div class="input-group-prepend">
                  <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                    <SearchIcon /></span>
                </div>
                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />

              </div>
              <div className="ml-2">
                <Link className="btn bg-primary text-white">Search</Link>
              </div>
              <div className="ml-2">
                <Link to="/QuoteSolutionConfiguration" className="btn bg-primary text-white">Create New <ChevronRightIcon className="" /></Link>
              </div>
            </div>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-6">
            <div className="row align-items-center height-66">
              <div className="col-2">
                <div className="d-flex ">
                  <h5 className="mb-0 text-white"><span>Quotes</span></h5>
                  <p className=" mb-0">
                    <a href="#" className="ml-3 text-white"><EditOutlinedIcon /></a>
                    <a href="#" className="ml-3 text-white"><ShareOutlinedIcon /></a>
                  </p>
                </div>
              </div>
              <div className="col-10">
                <div className="d-flex justify-content-between align-items-center w-100 ">
                  <div className="row align-items-center m-0 ">
                    {querySearchSelector.map((obj, i) => {
                      return (
                        <>
                          <div className={`customselect ${i < ((querySearchSelector.length - 1)) ? "p-2" : ""} border-white d-flex align-items-center mr-3 my-2 border-radius-10`}>
                            {i > 0 ? (
                              <SelectFilter
                                // isClearable={true}
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
                                  { label: "Created By", value: "preparedBy" },
                                  { label: "Customer Number", value: "customerId" },
                                  { label: "Model", value: "model" },
                                  { label: "Serial Number", value: "serialNumber" },
                                  { label: "Name/Id", value: "quoteId" },
                                  { label: "Description", value: "description" },
                                  // { label: "Family", value: "family", id: i },
                                  // { label: "Model", value: "model", id: i },
                                  // { label: "Prefix", value: "prefix", id: i },
                                ]}
                                placeholder="Search By.."
                                onChange={(e) => handleFamily(e, i)}
                                value={obj.selectFamily}
                              />
                            </div>
                            <div className="customselectsearch customize">

                              {/* <span className={((i === 0) || ((querySearchSelector.length - 1) === i)) ? "search-icon-postn" : (i < querySearchSelector.length) ? "search-icon-quote" : ""}> */}
                              <span className={(i < (querySearchSelector.length - 1)) ? "search-icon-quote" : "search-icon-postn"}>
                                <SearchIcon className="text-primary" />
                              </span>
                              <input
                                className="custom-input-sleact "
                                style={{ position: "relative" }}
                                type="text"
                                placeholder="Search Parts"
                                value={obj.inputSearch}
                                onChange={(e) => handleInputSearch(e, i)}
                                id={"inputSearch-" + i}
                                autoComplete="off"
                              />

                              {/* {querySearchSelector.length} and {i} */}
                              {(querySearchSelector.length - 1) === i ?
                                <>
                                  <div className="bg-primary text-white btn" onClick={handleQuoteSearchClick}>
                                    <span className="mr-2">
                                      <AddIcon />
                                    </span>
                                    Add Item
                                  </div>
                                </> : <></>}


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
                    <div onClick={(e) => addSearchQueryHtml(e)}>
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
              {/* <div className="col-3">
            <div className="d-flex align-items-center">
              <div className="col-8 text-center">
              <a href="#" className="p-1 more-btn text-white">+ 3 more
              <span className="c-btn">C</span>
              <span className="b-btn">B</span>
              <span className="a-btn">A</span>
              </a>
              </div>
              <div className="col-4 text-center border-left py-3">
              <Link to="/QuoteRepairOption" className="p-1 text-white">+ Add Part</Link>
              </div>
            </div>
          </div> */}
            </div>
          </div>
          <div className="card">


            <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
              <DataTable
                className=""
                title=""
                columns={masterColumns}
                data={searchQuoteMasterData}
                customStyles={customStyles}
                pagination
                onRowClicked={(e) => handleRowClick(e)}
                selectableRows
              />
            </div>
          </div>
          {/* <div className="text-right">
          <a href="/ConfigurationSolutionBuilderComponent" className="btn bg-primary text-white">Next</a>
        </div> */}
        </div>
        <Modal className="tablerowmodal" show={show} onHide={() => handleClose()} size="md"
          aria-labelledby="contained-modal-title-vcenter">
          <Modal.Body className="">
            <div class="modal-header justify-content-unset" style={{ background: '#D0E1EF', justifyContent: 'unset' }}>
              {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
          <h4 class="modal-title">Warning!</h4> */}
              <div><LightbulbOutlinedIcon className="text-light" /></div>
              <div>
                <p className="text-light ml-3">This standard job is created for replacement of engne belonging to 797,797F & 793 models</p>
              </div>
            </div>
            <div class="p-3 bg-white">
              <div>
                <a href="#" className="btn bg-primary text-white">Template</a>
              </div>
              <h4 className="text-light mt-3">SJ671</h4>
              <p>Your current session will expire in 5 minutes. Please Save your changes to continue your session, otherwise you
                will lose all unsaved data and your session will time out.</p>
              <h4 className=" mt-3">INCLUDES</h4>
              <ul>
                <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Spare Parts</li>
                <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Labor Hours</li>
                <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Miscellaenous</li>
                <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>External Work</li>

              </ul>
              <div>
                <a href="#" style={{ textDecoration: 'underline' }}>View Details</a>
              </div>
            </div>
            <div class="modal-footer justify-content-between bg-primary">
              <div>
                <b className="text-white">$50,000</b>
              </div>
              <div>
                <a href="/SparePartsQuoteTemplate" className="text-white">Select <ArrowRightAltOutlinedIcon className="" /></a>
              </div>
            </div>
          </Modal.Body>
        </Modal>


      </div>

    </>
  )
}

export default SolutionQuoteSearch
import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import FormGroup from '@mui/material/FormGroup';
import Select from 'react-select';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FileUploader } from "react-drag-drop-files";
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import { CommanComponents } from "../../components/index"
import { MuiMenuComponent } from "pages/Operational";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AddIcon from '@mui/icons-material/Add';

import {
  getRecentSolutionQuotes,
  getRecentQuotes,
} from "../../services/index";

const SolutionQuoteConfiguration = () => {

  const [age, setAge] = React.useState('5');
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');

  const [headerLoading, setHeaderLoading] = useState(false);
  const [recentSolutionQuoteData, setRecentSolutionQuoteData] = useState([]);

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const [value, setValue] = React.useState('1');

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleCoveragetable = () => setOpenCoveragetable(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];


  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];


  // get Recent Solution Quotes Data 
  useEffect(() => {

    setHeaderLoading(true)
    getRecentQuotes("SOLUTION_QUOTE")
      .then((res) => {
        // setRecentPortfolioSolution(res);
        setRecentSolutionQuoteData(res);
      })
    setHeaderLoading(false)
  }, [])

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
    var finalDateString = hour + ":" + minutes + "" + format + ", " + day + " " + monthName[month] + " " + year;
    return finalDateString;
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
  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Configuration</h5>
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
            <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Use Product/Solution Configurator " value="1" />
                    <Tab label="Use Configuration Templates " value="2" />
                    <Tab label="Import Configurations" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div>
                    <Link to="/SolutionServicePortfolio" style={{ cursor: 'pointer' }} className="btn bg-primary text-white"><AddIcon className="mr-2" />
                      Create New</Link>
                  </div>
                  <div className="mt-5 d-none">
                    <div className="recent-div p-3">
                      <h6 className="font-weight-600 text-grey mb-0">RECENT SOLUTION QUOTE</h6>
                      {recentSolutionQuoteData.length === 0 ? (
                        "No Record Found"
                      ) : (
                        <div className="row">
                          {recentSolutionQuoteData.map((quoteData, index) =>
                            <div className="col-md-4">
                              <div className="recent-items mt-3 block-div">
                                <div className="d-flex justify-content-between align-items-center ">
                                  <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">{quoteData.description}</span></p>
                                  <div className="d-flex align-items-center">
                                    <a
                                      href={undefined}
                                      className="btn-sm"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <i
                                        className="fa fa-pencil"
                                        aria-hidden="true"
                                      // onClick={() =>
                                      //   makeSolutionQuoteEditable(quoteData)
                                      // }
                                      ></i>
                                    </a>
                                    <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                    <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                    <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                    <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                                  </div>
                                </div>

                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                <p className="font-size-12 mb-0">{getFormattedDateTimeByTimeStamp(quoteData.updatedAt)} </p>
                                <p className="font-size-12 mb-0">Solution Option</p>
                              </div>
                            </div>
                          )}
                          {/* <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                                    </FormGroup>
                                  </div>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                  <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                                </div>
                              </div>

                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                              <p className="font-size-12 mb-0">Solution Option</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                                    </FormGroup>
                                  </div>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                  <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                                </div>
                              </div>

                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                              <p className="font-size-12 mb-0">Solution Option</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                                    </FormGroup>
                                  </div>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                  <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                                </div>
                              </div>

                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                              <p className="font-size-12 mb-0">Solution Option</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                                    </FormGroup>
                                  </div>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                  <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                                </div>
                              </div>

                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                              <p className="font-size-12 mb-0">Solution Option</p>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                                    </FormGroup>
                                  </div>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                  <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                  <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                                </div>
                              </div>

                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                              <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                              <p className="font-size-12 mb-0">Solution Option</p>
                            </div>
                          </div> */}

                        </div>
                      )}
                    </div>
                    {/* <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">SERVICE BUNDLES</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel control={<Checkbox />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                </div>
              </div> */}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="row">
                    <div className="col-md-4">
                      <Link to="solutionBuilder/guide" className="card p-3">
                        <div class="d-flex">
                          <div class="mr-2"><VerifiedOutlinedIcon className="font-size-65 text-light mr-2" /></div>
                          <div>
                            <h5 class="text-light">Without Evalution</h5>
                            <p><b>You configuration solutions by answering a set of questions</b></p>
                            <p>Exampies, You answer questions releted to your requlreemnts for a maintenance plan.Sytem picks up a pre-configured template based on your answers</p>

                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-4">
                      <Link to='/SolutionSearchTemplate' className="card p-3">
                        <div class="d-flex">
                          <div class="mr-2"><VerifiedOutlinedIcon className="font-size-65 text-light mr-2" /></div>
                          <div>
                            <h5 class="text-light">With evaluation</h5>
                            <p><b>You configuration solutions by answering a set of questions</b></p>
                            <p>Exampies, You answer questions releted to your requlreemnts for a maintenance plan.Sytem picks up a pre-configured template based on your answers</p>

                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div className="add-new-recod">
                    <div>
                      <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                      <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                      <a href="/QuoteSolutionBuilder" className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                      <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>

          </div>

          <Modal show={open} onHide={handleClose} size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
              <Modal.Title>Import Files</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
              <div className="p-3">
                <div className="add-new-recod">
                  <div>
                    <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                    <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                  </div>
                </div>
                <p className="mt-3">Single upload file should not be more than 10MB. Only the  .xls, .xlsx file types are allowed</p>
              </div>
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                <div className="recent-items mt-3">
                  <div className="d-flex justify-content-between align-items-center ">
                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
                    <div className="d-flex align-items-center">
                      <div className="white-space custom-checkbox">
                        <FormGroup>
                          <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                        </FormGroup>
                      </div>
                      <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                      <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                      <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                      <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
                    </div>
                  </div>

                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                  <p className="font-size-12 mb-0">Part List </p>
                </div>
                <div className="recent-items mt-3">
                  <div className="d-flex justify-content-between align-items-center ">
                    <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
                    <div className="d-flex align-items-center">
                      <div className="white-space custom-checkbox">
                        <FormGroup>
                          <FormControlLabel control={<Checkbox />} label="" />
                        </FormGroup>
                      </div>
                      <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                      <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                      <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                      <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
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
                <button className="btn border w-100 bg-white" onClick={handleClose}>Cancel</button>
              </div>
              <div className="col-md-6 col-sm-6">
                <button className="btn btn-primary w-100" onClick={() => setOpenCoveragetable(true)} style={{ cursor: 'pointer' }}><FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />Upload</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default SolutionQuoteConfiguration
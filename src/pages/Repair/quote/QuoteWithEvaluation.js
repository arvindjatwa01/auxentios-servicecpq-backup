import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import FormGroup from '@mui/material/FormGroup';
import Select from 'react-select';
import Select1 from '@mui/material/Select';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import DataTable from "react-data-table-component";
import SelectFilter from "react-select";
import AddIcon from '@mui/icons-material/Add';
import {
  getSearchCoverageForFamily,
  getSearchQueryCoverage,
} from "../../../services/index";
import $ from 'jquery';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Link} from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FileUploader } from "react-drag-drop-files";
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import {faShareAlt} from '@fortawesome/free-solid-svg-icons'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../../assets/icons/svg/share.svg'
import folderaddIcon from '../../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../../assets/icons/svg/upload.svg'
import deleteIcon from '../../../assets/icons/svg/delete.svg'
import copyIcon from '../../../assets/icons/svg/Copy.svg'

import { MuiMenuComponent } from "pages/Operational";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const  QuoteWithEvaluation=()=>{

  const [age, setAge] = React.useState('5');
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');

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
  const columns = [
    { field: 'GroupNumber', headerName: 'Group Number', flex:1, width: 70 },
    { field: 'Type', headerName: 'Type',  flex:1, width: 130 },
    { field: 'Partnumber', headerName: 'Part number',  flex:1, width: 130 },
    { field: 'PriceExtended', headerName: 'Price Extended',  flex:1, width: 130 },
    { field: 'Pricecurrency', headerName: 'Price currency',  flex:1, width: 130 },
    { field: 'Usage', headerName: 'Usage',  flex:1, width: 130 },
    { field: 'TotalPrice', headerName: 'Total Price',  flex:1, width: 130 },
    { field: 'Comments', headerName: 'Comments',  flex:1, width: 130 },
    { field: 'Actions', headerName: 'Actions',  flex:1, width: 130 },
    // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
    // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //       params.getValue(params.id, 'DocumentType') || ''
    //     }`,
    
  ];
  
  const rows = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended:'pending', Pricecurrency:'Open',  Usage:'Inconsistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Actions:'Inconsistent',  },
    { id: 2, GroupNumber: 'Lannister',Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Actions:'Inconsistent', },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Actions:'Inconsistent', },
    // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
    // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
    // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
    // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
    // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
    // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
  ];
  const handleRowClick=(e)=>{
    setShow(true)
  }
  const [show, setShow] = React.useState(false);

  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
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
  const [count, setCount] = useState(1);
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const [selectedMasterData, setSelectedMasterData] = useState([]);
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
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", e);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
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
    return(
      <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Quote Configuration</h5>
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
                      <Tab label="Use Repair Builder " value="1" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                  <div className="ml-2">
                     <Link to="/RepairBuilderRepairOption" className="btn bg-primary text-white">Create New <ChevronRightIcon className=""/></Link>
                  </div>
                  <div className="mt-5">
                    {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
                    <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">RECENT REPAIR BUILDER</h6>
                        <div className="row">
                        <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
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
                              <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
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
                              <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
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
                              <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
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
                              <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
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
                              <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recent-items mt-3 block-div">
                              <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
                                <div className="d-flex align-items-center">
                                  <div className="white-space custom-checkbox">
                                    <FormGroup>
                                      <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
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
                              <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>

                        </div>

                    </div>
                    {/* <div className="recent-div p-3">
                        <h6 className="font-weight-600 text-grey mb-0">SERVICE BUNDLES</h6>
                        <div className="row">
                        <div className="col-md-4">
                            <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
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
                            <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
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
                            <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recent-items mt-3">
                            <div className="d-flex justify-content-between align-items-center ">
                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Repair Builder</span></p>
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
                            <p className="font-size-12 mb-0">Repair Builder</p>
                            </div>
                        </div>
                        </div>
                    </div> */}
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
           <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br/> or</h6>
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
                <FormControlLabel control={<Checkbox defaultChecked/>} label="" />
              </FormGroup>
              </div>
            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
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
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
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
          <button className="btn btn-primary w-100" onClick={() => setOpenCoveragetable(true)} style={{cursor: 'pointer'}}><FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />Upload</button>
          </div>
          </div>
      </Modal>
      <Modal className="tablerowmodal" show={show} onHide={() => handleClose()} size="md"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="">
                <div class="modal-header justify-content-unset" style={{background:'#D0E1EF', justifyContent:'unset'}}>
          {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
          <h4 class="modal-title">Warning!</h4> */}
          <div><LightbulbOutlinedIcon className="text-light"/></div>
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
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Spare Parts</li>
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Labor Hours</li>
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>Miscellaenous</li>
               <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon/></span>External Work</li>
             
             </ul>
             <div>
               <a href="#" style={{textDecoration:'underline'}}>View Details</a>
             </div>
        </div>
        <div class="modal-footer justify-content-between bg-primary">
         <div>
        <b className="text-white">$50,000</b>
         </div>
         <div>
         <a href="#" className="text-white">Select <ArrowRightAltOutlinedIcon className=""/></a>
         </div>
        </div>
                </Modal.Body>
            </Modal>
        </div>
      </div>
    </>
    )
}

export default QuoteWithEvaluation
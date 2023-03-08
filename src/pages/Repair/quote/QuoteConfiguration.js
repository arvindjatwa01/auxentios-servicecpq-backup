import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import FormGroup from '@mui/material/FormGroup';
import $ from 'jquery';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link, useHistory } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FileUploader } from "react-drag-drop-files";
import MenuItem from '@mui/material/MenuItem';
import penIcon from "../../../assets/images/pen.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../../assets/icons/svg/share.svg'
import folderaddIcon from '../../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../../assets/icons/svg/upload.svg'
import cpqIcon from '../../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../../assets/icons/svg/delete.svg'
import copyIcon from '../../../assets/icons/svg/Copy.svg'
import editIcon from '../../../assets/icons/svg/edit.svg'
import searchstatusIcon from '../../../assets/icons/svg/search-status.svg'
import { MuiMenuComponent } from "pages/Operational";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { QUOTE_SPARE_PARTS_TEMPLATE } from "navigation/CONSTANTS";
import { GRID_STYLE, KIT_SEARCH_Q_OPTIONS } from "../CONSTANTS";
import SearchComponent from "../components/SearchComponent";
import { kitSearch } from "services/kitService";
import { Tooltip, Typography } from "@mui/material";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";

const QuoteConfiguration = () => {

  const [value, setValue] = React.useState('partlist');
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const handleClose = () => setOpen(false);
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
  const makeKitEditable = (selectedKIT) => {
    let kitDetails = {
      kitId: "",
      kitDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    kitDetails.kitId = selectedKIT.kitId;
    kitDetails.kitDBId = selectedKIT.id;
    // kitDetails.partListNo = kitDetails.;
    // kitDetails.partListId = selectedKIT.estimationNumber;
    // kitDetails.versionNumber = selectedKIT.versionNumber;
    history.push({
      pathname: "/RepairKits/Kits",
      state: kitDetails,
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const fileTypes = ["xls", "xlsx"];
  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
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
        const res = await kitSearch(`kitId~KT AND ${searchStr}`);
        res.map(kit => {
          let family = [], model = [];
          kit.coverages.map(coverage => {          
          family.push(coverage.family);
          model.push(coverage.model);          
        });
        // return {...kit, family : family, model: model};
        kit.family = family;
        kit.model =  model;
      })
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      console.log(err)
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };


  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  
  const searchKitColumns = [
    { field: "kitId", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    { field: "model", headerName: "Model", flex: 1, width: 130, 
    renderCell: (params) => (
      <div>
      {params.value?.map(model => 
      <Typography display="block" style={{ fontSize: 12 }}>
        {model}
      </Typography>
      )}</div>
    ),},
    { field: "family", headerName: "Family", flex: 1, width: 130,
    renderCell: (params) => (
      <div>
      {params.value?.map(family => 
      <Typography display="block" style={{ fontSize: 12 }}>
        {family}
      </Typography>
      )}
      </div>
    ) 
  },
    { field: "version", headerName: "Version", flex: 1, width: 130 },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
      width: 130,      
    },
    { field: "netPrice", headerName: "Total $", flex: 1, width: 130 },
    { field: "status", headerName: "Status", flex: 1, width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Edit"> 
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => makeKitEditable(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
 
  const [show, setShow] = React.useState(false);
  const [masterData, setMasterData] = useState([]);
  
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
  

  return (
    <>
            <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
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
                    <Tab label="Use Part List " value="partlist" />
                    <Tab label="Use Kits " value="kit" />
                    <Tab label="Import From Excel" value="import" />
                  </TabList>
                </Box>
                <TabPanel value="partlist">
                <div>
                    <Link to="/SparePartsPortfolio" style={{ cursor: 'pointer' }} className="btn bg-primary text-white"><AddIcon className="mr-2" />
                      Create New</Link>
                  </div>
                  <div className="recent-div mt-2 p-3">
                    <h6 className="font-weight-600 text-grey mb-0">RECENT SPARE PARTS QUOTE</h6>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="recent-items mt-3 block-div">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Spare Parts Quote</span></p>
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
                          <p className="font-size-12 mb-0">Spare Parts Option</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="recent-items mt-3 block-div">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Spare Parts Quote</span></p>
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
                          <p className="font-size-12 mb-0">Spare Parts Option</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="recent-items mt-3 block-div">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Spare Parts Quote</span></p>
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
                          <p className="font-size-12 mb-0">Spare Parts Option</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="recent-items mt-3 block-div">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Spare Parts Quote</span></p>
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
                          <p className="font-size-12 mb-0">Spare Parts Option</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="recent-items mt-3 block-div">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Spare Parts Quote</span></p>
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
                          <p className="font-size-12 mb-0">Spare Parts Option</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="recent-items mt-3 block-div">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space"><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Spare Parts Quote</span></p>
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
                          <p className="font-size-12 mb-0">Spare Parts Option</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
                    <h6 className="font-weight-600 text-light mb-0 ml-1">Table Name<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                    <div>
                      <a href="#" className="btn">+Add</a>
                    </div>
                  </div> */}
                  {/* <div className="p-2 row">
                    <div className="col-md-6 col-sm-6">
                      <a href="/RepairPartlist/PartList" className="add-new-recod">
                        <div>
                          <FontAwesomeIcon icon={faPlus} />
                          <p className="font-weight-600">Add new record</p>
                        </div>
                      </a>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="add-new-recod">

                        <div>
                          <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                          <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                          <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                          <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                        </div>
                      </div>
                    </div>
                  </div> */}

                </TabPanel>
                <TabPanel value="kit">
                  <div className="bg-primary px-3 my-3 border-radius-6 height-66">
            <div className="d-block d-md-flex justify-content-between align-items-center">
              <div className=" mx-2 ">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Search</span>
                    </h5>
                  </div>
                  <SearchComponent
                    querySearchSelector={querySearchSelector}
                    setQuerySearchSelector={setQuerySearchSelector}
                    clearFilteredData={clearFilteredData}
                    handleSnack={handleSnack}
                    searchAPI={kitSearch}
                    searchClick={handleQuerySearchClick}
                    options={KIT_SEARCH_Q_OPTIONS}
                    color="white"
                    buttonText={"SEARCH"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <DataGrid
              sx={GRID_STYLE}
              rows={masterData}
              columns={searchKitColumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowHeight={() => 'auto'} getEstimatedRowHeight={() => 200}
              autoHeight
            />
          </div>
                </TabPanel>
                <TabPanel value="import">
                  <div className="add-new-recod">
                    <div>
                      <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                      <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                      {/* <a href="/QuoteSolutionBuilder" className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a> */}
                      <FileUploader
                      // handleChange={handleReadFile}
                      name="file"
                      types={["xls", "xlsx"]}
                      onClick={(event) => {
                        event.currentTarget.value = null;
                      }}
                    />
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
                {/* <p>Your current session will expire in 5 minutes. Please Save your changes to continue your session, otherwise you
             will lose all unsaved data and your session will time out.</p> */}
                <h4 className=" mt-3">SUMMARY</h4>
                <ul>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Spare Parts New (# 31)</li>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Spare Parts Remain (# 7)</li>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Number of Parts #38.</li>
                  <li className="my-2"><span className="mr-3 "><FormatListBulletedOutlinedIcon /></span>Total Price $4,100.00</li>

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
                  <a href={QUOTE_SPARE_PARTS_TEMPLATE} className="text-white">Select <ArrowRightAltOutlinedIcon className="" /></a>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default QuoteConfiguration
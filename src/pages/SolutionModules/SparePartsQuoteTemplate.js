import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FormGroup from '@mui/material/FormGroup';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import Button from '@mui/material/Button';
import boxicon from '../../assets/icons/png/box.png'
import { FileUploader } from "react-drag-drop-files";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DataTable from 'react-data-table-component';
import FormControlLabel from '@mui/material/FormControlLabel';
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import Checkbox from '@mui/material/Checkbox';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPen} from '@fortawesome/free-solid-svg-icons'
import EditIcon from '@mui/icons-material/Edit';
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import {faShareAlt} from '@fortawesome/free-solid-svg-icons'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons'
import { CommanComponents } from "../../components/index"
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { MuiMenuComponent } from "pages/Operational";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


const SparePartsQuoteTemplate = () => {
  const [age, setAge] = React.useState('');
  const [open1, setOpen1] = React.useState(false);
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');
  const [show, setShow] = React.useState(false);
  
  const handleOpen=()=>setShow(true)
  
  const handleChangedrop = (event) => {
    setAge(event.target.value);
};
const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
};
const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
};
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleClose1 = () => {
    setShow(false)
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  const [value, setValue] = React.useState('1');
  const steps = [
    'Draft',
    'Active',
    'Released',
    'Approved',
    
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const fileTypes = ["JPG", "PNG", "GIF"];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  const data = [
    {
      id: 1,
      caseId:13322,
      BundleId:'Pc',
      Bundledescription:'Ex2487518',
      S1:"CAT DEO",
      strategy:'3',
      Standardjob:'$43.09',
      repairoption:'$100',
      frequency:'USD',
      quantity:'80%',
      part$:'$80',
      srevic$:'80% usage observed on previous work.',
      Total$:'80% usage observed on previous work.',
    
    },
  ]
  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        // backgroundColor: "#000"
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };

    
  const columns = [
    {
      name: <><div><img className='mr-2' src={boxicon}></img>Case ID</div></>,
      selector: row => row.caseId,
      sortable: true,
      maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      cell: row => row.caseId,
    },
    {
      name:<><div><img className='mr-2' src={boxicon}></img>Bundle iD</div></>,
      selector: row => row.BundleId,
      wrap: true,
      sortable: true,
      cell: (row) => <div><HexagonOutlinedIcon className="font-size-18 mr-2"/>{row.BundleId}</div>
    },
    {
      name:<><div>Bundle Description
      </div></>,
      selector: row => row.Bundledescription,
      wrap: true,
      sortable: true,
      cell: (row) => <div>
                      <div style={{fontWeight:'600'}}>{row.Bundledescription}</div>
                      <div className=" font-size-12">{row.S1}</div>
                    </div>
      // format: row =>row.Source,
    },
    {
      name:<><div>strategy
      </div></>,
      selector: row => row.strategy,
      wrap: true,
      sortable: true,
      format: row =>row.strategy,
    },
    {
      name:<><div>Standard job
      </div></>,
      selector: row => row.Standardjob,
      wrap: true,
      sortable: true,
      format: row =>row.Standardjob,
    },
    {
      name:<><div>repair Option
      </div></>,
      selector: row => row.repairoption,
      wrap: true,
      sortable: true,
      format: row =>row.repairoption,
    },
    {
      name:<><div>frequency
      </div></>,
      selector: row => row.frequency,
      wrap: true,
      sortable: true,
      format: row =>row.frequency
      ,
    },
    {
      name:<><div>% Usage 
      </div></>,
      selector: row => row.Usage,
      wrap: true,
      sortable: true,
      format: row =>row.Usage
      ,
    },

    {
      name:<><div>Total price 
      </div></>,
      selector: row => row.Totalprice,
      wrap: true,
      sortable: true,
      format: row =>row.Totalprice
      ,
    },
    {
      name:<><div>Comments 
      </div></>,
      selector: row => row.Comments,
      wrap: true,
      sortable: true,
      minWidth: '200px',
      format: row =>row.Comments
      ,
    },

    {
      name: 'Actions',
      button: true,
      minWidth: '200px',
      cell: (row) =>
      <div className="d-flex align-items-center">
        <div className="">
          <Link><span className="mr-2"><MoreVertIcon className="font-size-18"/></span>More Actions</Link>

        </div>
      
      </div>
      // cell: () => <Button>Download Poster</Button>,
    },
  ];

  const data2 = [
    {
      id: 1,
      Payers:'Koolan Iron Ore',
      BillingSplit:'100%',
      Bundledescription:'Ex2487518',
      Price:"$4310.00",
    },
  ]
  const customStyles2 = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px', // override the cell padding for head cells
        paddingRight: '8px',
        // backgroundColor: "#000"
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
      },
    },
  };

    
  const columns2 = [
    {
      name:<><div>ID
      </div></>,
      selector: row => row.strategy,
      wrap: true,
      sortable: true,
      format: row =>row.strategy,
    },
    {
      name: <><div><img className='mr-2' src={boxicon}></img>PAYERS</div></>,
      selector: row => row.caseId,
      sortable: true,
      maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      cell: row => row.caseId,
    },
    {
      name:<><div><img className='mr-2' style={{whiteSpace:'pre'}} src={boxicon}></img>BILLING SPLIT %</div></>,
      selector: row => row.BundleId,
      wrap: true,
      sortable: true,
      cell: (row) => <div><HexagonOutlinedIcon className="font-size-18 mr-2"/>{row.BundleId}</div>
    },
    {
      name:<><div>PRICE $
      </div></>,
      selector: row => row.Bundledescription,
      wrap: true,
      sortable: true,
      cell: (row) => <div>
                      <div style={{fontWeight:'600'}}>{row.Bundledescription}</div>
                      <div className=" font-size-12">{row.S1}</div>
                    </div>
      // format: row =>row.Source,
    },
    
  ];

  return (
    <>
      <CommanComponents/>
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div className="container-fluid mt-4">
          <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Quote templates</h5>
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
        <Box className="mt-5" sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    <div className="card p-4 mt-5">
          <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3" style={{whiteSpace:'pre'}}>Quote Header</span>
              <a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
              <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a> 
              <a href="#" className="btn-sm"><img style={{width:'14px'}} src={folderaddIcon}></img></a></div>
              <div class="input-group icons border-radius-10 border overflow-hidden">
            <div class="input-group-prepend">
              <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
              <SearchIcon/></span>
              </div>
              <input type="search" class="form-control search-form-control" placeholder="Search" aria-label="Search Dashboard"/>
              </div>
              <div>
              <a href="#" className="btn-sm" style={{whiteSpace:'pre'}}><AddOutlinedIcon />Add new</a>
              </div>
              </h5>
              <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Customer" value="1" />
                      <Tab label="Machine" value="2" />
                      <Tab label="Estimation Team" value="3" />
                      <Tab label="Estimate" value="4" />
                      <Tab label="Pricing/Billing" value="5" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                <div className="row mt-4">
                <div class="col-md-4 col-sm-4">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ACCOUNT NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EPR Work Order"/>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ACCOUNT NUMBER</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Andrew Peplow"/>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CONTACT NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="203037"/>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CONTACT PH</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="CHINALCO Bejing"/>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER GROUP</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="peplow@ferreycorp.com"/>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">BUSINESS AREA</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="765-102"/>
                </div>
              </div>
                </div>
                <div class="row mt-4">
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ACCOUNT NAME</p>
              <h6 class="font-weight-600">EPR Work Order</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ACCOUNT NUMBER</p>
              <h6 class="font-weight-600">Andrew Peplow</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CONTACT NAME</p>
              <h6 class="font-weight-600">203037</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CONTACT PH</p>
              <h6 class="font-weight-600">CHINALCO Bejing</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER GROUP</p>
              <h6 class="font-weight-600">peplow@ferreycorp.com</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">BUSINESS AREA</p>
              <h6 class="font-weight-600">765-102</h6>
              </div>
            </div>
            <div className=" col-md-12  col-sm-12">
               <a href="#" className="btn text-white bg-primary">Next</a>
              </div>
            </div>
            </TabPanel>
            <TabPanel value="2">
            <div className="row mt-4">
                <div class="col-md-6 col-sm-6">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOURCE ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EPR Work Order"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REQUESTER</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Andrew Peplow"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="203037"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COSTOMER NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="CHINALCO Bejing"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER EMAIL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="peplow@ferreycorp.com"/>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
               <div class="form-group">
                 <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COSTOMER ZIP CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="765-102"/>
                </div>
              </div>
              <div className=" col-md-12  col-sm-12">
               <a href="#" className="btn text-white bg-primary">Next</a>
              </div>
                </div>
             
            </TabPanel>
            <TabPanel value="3">
           <p>Data Not Found</p>
            </TabPanel>
            <TabPanel value="4">
            <p>Data Not Found</p>
            </TabPanel>
           
            <TabPanel value="5">
            <div class="row mt-4">
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PAYMENT TERMS</p>
              <div>
                <FormControl className="customseleact">
                  <Select className=""
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange1}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>30dayes</em>;
                      }

                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>30dayes</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">BILLING FREQUENCY</p>
              <div>
                <FormControl className="customseleact">
                  <Select className=""
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange1}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>30dayes</em>;
                      }

                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>30dayes</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE SEGMENT</p>
              <div>
                <FormControl className="customseleact">
                  <Select className=""
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange1}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>30dayes</em>;
                      }

                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>30dayes</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">NET PRICE</p>
              <h6 class="font-weight-600">752.740.10</h6>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">MARGIN (25%)</p>
              <h6 class="font-weight-600"><MonetizationOnOutlinedIcon className="text-light font-size-36"/></h6>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">FLAT RATE (ALL $)</p>
              <h6 class="font-weight-600">752.740.10</h6>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CURRENCY</p>
              <h6 class="font-weight-600">No</h6>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
              <div>
                <FormControl className="customseleact">
                  <Select className=""
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange1}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>30dayes</em>;
                      }

                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem disabled value="">
                      <em>30dayes</em>
                    </MenuItem>
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              </div>
            </div>
            <div class="col-md-3 col-sm-3">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">DISCOUNT</p>
              <h6 class="font-weight-600">21.01.2022</h6>
              </div>
            </div>
            
            </div>
            <div className="mt-4 mx-0">
            <a href="#" className="btn-sm" style={{whiteSpace:'pre'}}><AddOutlinedIcon />Add new</a>
            <div className="custom-pricing-table mt-2">
            <DataTable className="" title="" columns={columns2} data={data2} customStyles={customStyles2} pagination />
            </div>
            </div>

            </TabPanel>
            
          </TabContext>
        </Box>
  
        </div>
        <div className="custom-table card p-2" style={{width: '100%', backgroundColor: '#fff' }}>
        <div className="row align-items-center px-2">
                            <div className="col-3">
                                <div className="d-flex ">
                                    <h5 className="mr-4 mb-0"><span>Line Item</span></h5>
                                    <p className="ml-4 mb-0">
                                        <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                                        <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center" style={{ background: '#F9F9F9', padding: '10px 15px', borderRadius: '10px' }}>
                                    <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                                        <img src={searchstatusIcon}></img>
                                    </div>
                                    <div className="w-100 mx-2">
                                        <div className="machine-drop d-flex align-items-center">
                                            {/* <div><lable className="label-div">Search By</lable></div> */}
                                            <FormControl className="" sx={{ m: 1, }}>
                                                <Select
                                                    placeholder="Search By"
                                                    id="demo-simple-select-autowidth"
                                                    value={age}
                                                    onChange={handleChangedrop}
                                                    autoWidth
                                                >
                                                    <MenuItem value="5">
                                                        <em>Engine</em>
                                                    </MenuItem>
                                                    <MenuItem value={10}>Twenty</MenuItem>
                                                    <MenuItem value={21}>Twenty one</MenuItem>
                                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="col-3">
                                <div className="d-flex align-items-center">
                                    <div className="col-8 text-center">
                                        <a href="#" className="p-1 more-btn">+ 3 more
                                            <span className="c-btn">C</span>
                                            <span className="b-btn">B</span>
                                            <span className="a-btn">A</span>
                                        </a>
                                    </div>
                                    <div className="col-4 text-center border-left py-4">
                                        <a onClick={()=>handleOpen()} className="p-1 ">+ Add Parts</a>
                                    </div>
                                </div>
                            </div>
                        </div>
        <DataTable className="" title="" columns={columns} data={data} customStyles={customStyles} pagination />
        <div className=" col-md-12  col-sm-12">
            <a href="/SparePartsQuoteReviewed" className="btn text-white bg-primary">Next</a>
        </div>
        </div>
        

        </div>
      <Modal show={show} onHide={()=>handleClose1()} size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered>
        <Modal.Header closeButton>
          <Modal.Title className="font-size-14">1000-Engine|23-Replace Engine|Replace Engine</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 bg-white">
          <div className="ligt-greey-bg p-3">
            <div>
              <span className="mr-3">
              <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span  className="ml-2">Edit</span>
              </span>
              <span className="mr-3">
             < MonetizationOnOutlinedIcon className=" font-size-16"/>
             <span className="ml-2"> Adjust price</span>
              </span>
              <span className="mr-3">
                <FormatListBulletedOutlinedIcon className=" font-size-16"/>
                <span className="ml-2">Related part list(s)</span>
              </span>
              <span className="mr-3">
                <AccessAlarmOutlinedIcon className=" font-size-16"/>
                <span className="ml-2">Related service estimate(s)</span>
              </span>
              <span>
               <SellOutlinedIcon className=" font-size-16"/>
               <span className="ml-2">Split price</span>
              </span>
            </div>
          </div>
          <div>
            <div className="p-3">
              <div className="row mt-4">
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMPONENT</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="1000 ENGINE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">OPERATION </label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0123 REPLACE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace left side of the Engine"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="List Price"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SPARE PARTS</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$35000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">LABOR </label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$10000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MISC.</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$5000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT </label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EA"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DISCOUNT TYPE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PAYER TYPE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXTENDED PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PAYER TYPE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="CUSTOMER (100%)"/>
                </div>
                </div>
              </div>
            </div>
            <div className="m-3">
              <a href="#" onClick={()=>handleClose1()}  className="btn border mr-3 "> Cancel</a>
              <a href="#" className="btn text-white bg-primary pull-right">Save</a>
            </div>
          </div>
       
        </Modal.Body>
      </Modal>
      </div>

    </>
  )
}

export default SparePartsQuoteTemplate
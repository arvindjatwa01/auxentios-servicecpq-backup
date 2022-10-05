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
import searchLogo from '../../assets/icons/svg/search.svg';


const TermsConditions = () => {
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
          <div className="card p-3 mt-5">
      <h5 className="d-flex align-items-center mb-0">
                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{whiteSpace:'pre'}}>Terms and conditions for sale</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                            <div class="input-group icons border-radius-10 border" style={{overflow:'hidden'}}>
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                        <img src={searchLogo} /></span>
                                </div>
                                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                            </div>
                            <div className="ml-3">
                              <a href="#" className=" font-size-14 " style={{whiteSpace:'pre'}}>+ Add part</a>
                            </div>
                        </h5>

                        <div className="mt-5">
                        <h6>TERM 1</h6>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et diam magna. Aenean sollicitudin
         malesuada rhoncus. Aliquam faucibus purus malesuada, mollis justo in, aliquet orci. Vivamus
          pellentesque nisi id tortor pretium, non iaculis quam iaculis. Integer ac enim finibus, imperdiet mauris nec,
           porttitor felis. Duis fermentum lacus id neque viverra eleifend. Phasellus consequat tellus in lectus viverra, 
        vitae bibendum orci rhoncus. Vestibulum in odio mollis, commodo neque id, efficitur turpis.</p>   
        <h6>TERM 2</h6> 
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et diam magna. Aenean sollicitudin
         malesuada rhoncus. Aliquam faucibus purus malesuada, mollis justo in, aliquet orci. Vivamus
          pellentesque nisi id tortor pretium, non iaculis quam iaculis. Integer ac enim finibus, imperdiet mauris nec,
           porttitor felis. Duis fermentum lacus id neque viverra eleifend. Phasellus consequat tellus in lectus viverra, 
        vitae bibendum orci rhoncus. Vestibulum in odio mollis, commodo neque id, efficitur turpis.</p> 
        <h6>TERM 3</h6>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et diam magna. Aenean sollicitudin
         malesuada rhoncus. Aliquam faucibus purus malesuada, mollis justo in, aliquet orci. Vivamus
          pellentesque nisi id tortor pretium, non iaculis quam iaculis. Integer ac enim finibus, imperdiet mauris nec,
           porttitor felis. Duis fermentum lacus id neque viverra eleifend. Phasellus consequat tellus in lectus viverra, 
        vitae bibendum orci rhoncus. Vestibulum in odio mollis, commodo neque id, efficitur turpis.</p> 
        </div>              
      </div>
        </div>
      </div>

    </>
  )
}

export default TermsConditions
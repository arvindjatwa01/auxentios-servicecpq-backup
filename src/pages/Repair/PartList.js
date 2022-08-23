import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import MultiSelect from '@mui/material/Select';
import { Modal, SplitButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import editIcon from '../../assets/icons/svg/edit.svg'
import { MuiMenuComponent } from "pages/Operational";
import { DataGrid } from '@mui/x-data-grid';
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import {Link, useHistory} from 'react-router-dom'

import { CommanComponents } from "components";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import FormGroup from '@mui/material/FormGroup';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'

import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import DataTable from 'react-data-table-component';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FileUploader } from "react-drag-drop-files";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, toast } from 'react-toastify';
import boxicon from '../../assets/icons/png/box.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import {
  createPortfolio, getPortfolio,
  getPortfolioSchema,
  getMakeKeyValue, getModelKeyValue, getPrefixKeyValue,
  updatePortfolio, getUsageCategoryKeyValue, getTaskTypeKeyValue, getResponseTimeTaskKeyValue, getValidityKeyValue, getStrategyTaskKeyValue, getProductHierarchyKeyValue, getGergraphicKeyValue, getMachineTypeKeyValue, getTypeKeyValue
} from '../../services/index'
import { color } from "@mui/system";
import $ from "jquery"
import SelectFilter from 'react-select';
import SearchIcon from '@mui/icons-material/Search';

import {
 
 

 

  getPortfolioCommonConfig,
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  itemCreation
} from "../../services/index";

function PartList() {
  const history=useHistory()
  const [selectedOption, setSelectedOption] = useState(null);
  const [openAddBundleItem, setOpenAddBundleItem] = useState(false)
  const [value, setValue] = React.useState('1');
  const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("")
  const [openSearchSolution, setOpenSearchSolution] = useState(false)
  const [bundleItems, setBundleItems] = useState([])
  const [createNewBundle, setCreateNewBundle] = useState(false)
  const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState([])
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [open1, setOpen1] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose1 = () => setOpen1(false);
  const activityOptions = [
    'Create Versions',
    'Show Errors',
    'Review'
  ];
  const handleAddSolutionPress = () => {
    setOpenSearchSolution(true)
    getPortfolioSchema().then((res) => {
      const options = res.map((d) => ({
        value: d,
        label: d,
      }));
    })
      .catch((err) => {

      })

  }
  const handleMoreAction = (type) => {
    if (type == 1) {
      setOpenAddBundleItem(false)
      setOpenSearchSolution(false)
      setCreateNewBundle(true)
    } else if (type == 2) {
      setOpenAddBundleItem(true)
      setOpenSearchSolution(false)
      setCreateNewBundle(false)
      setOpenAddBundleItemHeader("Add New Service")
    } else if (type == 3) {
      setOpenAddBundleItem(true)
      setOpenSearchSolution(false)
      setCreateNewBundle(false)
      setOpenAddBundleItemHeader("Add New Portfolio Item")
    }
  }
  const data = [
    {
      id: 1,
      caseId: 13322,
      BundleId: "Pc",
      Bundledescription: "Ex2487518",
      S1: "CAT DEO",
      strategy: "3",
      Standardjob: "$43.09",
      repairoption: "$100",
      frequency: "USD",
      quantity: "80%",
      part$: "$80",
      srevic$: "80% usage observed on previous work.",
      Total$: "80% usage observed on previous work.",
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
        backgroundColor: "#7380E4",
        color: "#fff"
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const columns = [

    {
      name: (
        <>
          <div><Checkbox className="text-white" {...label} /></div>
        </>
      ),
      selector: (row) => row.standardJobId,
      wrap: true,
      sortable: true,
      maxWidth: "300px",
      cell: (row) => <Checkbox className="text-black" {...label} />,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Group Number
          </div>

        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Type
          </div>

        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Part Number
          </div>

        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
      cell: (row) => <a href="#"  data-toggle="modal" data-target="#Recommended">3</a>,
    },
    {
      name: (
        <>
          <div>Qty</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
      
    },
    {
      name: (
        <>
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
      cell: (row) => <a href="#"  data-toggle="modal" data-target="#Substitute">3</a>,
    },
    {
      name: (
        <>
          <div>Extended Price</div>
        </>
      ),
      selector: (row) => row.frequency,
      wrap: true,
      sortable: true,
      format: (row) => row.frequency,
    },
    {
      name: (
        <>
          <div>Currency</div>
        </>
      ),
      selector: (row) => row.frequency,
      wrap: true,
      sortable: true,
      format: (row) => row.frequency,
    },
    {
      name: (
        <>
          <div>% Usage</div>
        </>
      ),
      selector: (row) => row.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row.quantity,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.part,
      wrap: true,
      sortable: true,
      format: (row) => row.part,
    },
    {
      name: (
        <>
          <div>
            Comments
          </div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      // cell: row => row.bundleId,
      // cell: (row) => <button onClick={() => alert()}>1</button>,
      // cell: (row) => <Checkbox className="text-black" {...label} />,
      format: (row) => row.bundleId,
    },
    {
      name: (
        <>
          <div>
            Action
          </div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      // cell: row => row.bundleId,
      // cell: (row) => <button onClick={() => alert()}>1</button>,
      // cell: (row) => <Checkbox className="text-black" {...label} />,
      cell: (row) => <a onClick={() => setOpen2(true)} href="#"><FontAwesomeIcon icon={faPen} /></a>,
      format: (row) => row.bundleId,
    },
  ];
  const columns2 = [
    { field: 'GroupNumber', headerName: 'ID#', flex:1, width: 70 },
    { field: 'Type', headerName: 'Description',  flex:1, width: 130 },
    { field: 'Partnumber', headerName: 'Customer#',  flex:1, width: 130 },
    { field: 'PriceExtended', headerName: 'Make',  flex:1, width: 130 },
    { field: 'Pricecurrency', headerName: 'Model',  flex:1, width: 130 },
    { field: 'Usage', headerName: 'Family',  flex:1, width: 130 },
    { field: 'TotalPrice', headerName: 'Serial#',  flex:1, width: 130 },
    { field: 'Comments', headerName: 'Created by',  flex:1, width: 130 },
    { field: 'Created', headerName: 'Created On',  flex:1, width: 130 },
    { field: 'Total', headerName: 'Total $',  flex:1, width: 130 },
    { field: 'Status', headerName: 'Status',  flex:1, width: 130 },
   
    
  ];
  const rows = [
    { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended:'pending', Pricecurrency:'Open',  Usage:'Inconsistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Created:'Created On', Total:'25', Status:'Status', Actions:'Action',  },
    { id: 2, GroupNumber: 'Lannister',Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent',  Created:'Created On', Total:'25', Status:'Status', Actions:'Action', },
    { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Created:'Created On', Total:'25', Status:'Status', Actions:'Action', },
 
  ];

  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  const [portfolioId, setPortfolioId] = useState();
  const [generalComponentData, setGeneralComponentData] = useState({
    name: "",
    description: "",
    serviceDescription: "",
    externalReference: "",
    customerSegment: null,
    items: []
  });
  const handleOption2 = (e) => {
    setValue2(e)
  }
  const options2 = [
    { value: "chocolate", label: "Archived" },
    { value: "strawberry", label: "Draft" },
    { value: "vanilla", label: "Active" },
    { value: "Construction", label: "Revised" },
  ];
  const options3 = [
    { value: "chocolate", label: "Gold" },
    { value: "strawberry", label: "1" },
    { value: "vanilla", label: "2" },
    { value: "Construction", label: "3" },
  ];
  const handleOption3 = (e) => {
    setValue3(e)
  }
  const [value3, setValue3] = useState({ value: 'Gold', label: 'Gold' });
  const [value2, setValue2] = useState({ value: 'Archived', label: 'Archived' });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    console.log("event",event)
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleCreate=()=>{
    history.push('/quoteTemplate')
  }
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

  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    obj.selectOperator = e
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
  }
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value).then((res) => {
      obj.selectOptions = res
      tempArray[id] = obj
      setQuerySearchSelector([...tempArray]);
      $(`.scrollbar-${id}`).css("display", "block")
    }).catch((err) => {
      console.log("err in api call", err)
    })
    obj.inputSearch = e.target.value
  
  }
  const handleQuerySearchClick = () => {
    $(".scrollbar").css("display", "none")
    console.log("handleQuerySearchClick", querySearchSelector)
    var searchStr = querySearchSelector[0].selectFamily.value + "~" + querySearchSelector[0].inputSearch

    for (let i = 1; i < querySearchSelector.length; i++) {
      searchStr = searchStr + " " + querySearchSelector[i].selectOperator.value + " " + querySearchSelector[i].selectFamily.value + "~" + querySearchSelector[i].inputSearch
    }

    console.log("searchStr", searchStr)
    getSearchQueryCoverage(searchStr).then((res) => {
      console.log("search Query Result :", res)
      setMasterData(res)

    }).catch((err) => {
      console.log("error in getSearchQueryCoverage", err)
    })

  }
  const addSearchQuerryHtml = () => {
    setQuerySearchSelector([...querySearchSelector, {
      id: count,
      selectOperator: "",
      selectFamily: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: ""
    }])
    setCount(count + 1)
  }
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector]
    console.log("handleFamily e:", e)
    let obj = tempArray[id]
    obj.selectFamily = e
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
  }
  const [querySearchSelector, setQuerySearchSelector] = useState([{
    id: 0,
    selectFamily: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: ""
  }])
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([])
    setCount(0)
    setMasterData([])
    setFilterMasterData([])
    setSelectedMasterData([])
  }
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector]
    let obj = tempArray[id]
    obj.inputSearch = currentItem
    obj.selectedOption = currentItem
    tempArray[id] = obj
    setQuerySearchSelector([...tempArray])
    $(`.scrollbar-${id}`).css("display", "none")
  }
  const handleMasterCheck = (e, row) => {
    if (e.target.checked) {
      var _masterData = [...masterData]
      const updated = _masterData.map((currentItem, i) => {
        if (row.id == currentItem.id) {
          return { ...currentItem, ["check1"]: e.target.checked }
        } else return currentItem
      })
      setMasterData([...updated])
      setFilterMasterData([...filterMasterData, { ...row }])
    } else {
      var _filterMasterData = [...filterMasterData]
      const updated = _filterMasterData.filter((currentItem, i) => {
        if (row.id !== currentItem.id)
          return currentItem
      })
      setFilterMasterData(updated)
    }
  
  }
  const [filterMasterData, setFilterMasterData] = useState([])
  const [selectedMasterData, setSelectedMasterData] = useState([])
  const [masterData, setMasterData] = useState([])
    const [count, setCount] = useState(1)
  const handleDeleteIncludeSerialNo = (e, row) => {
    const updated = selectedMasterData.filter((obj) => {
      if (obj.id !== row.id)
        return obj
    })
    setSelectedMasterData(updated)
  }
  const handleRowClick=(e)=>{
    setShow(true)
  }
  const [show, setShow] = React.useState(false);
  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
        <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex justify-content-center align-items-center">
          <h5 className="font-weight-600 mb-0">Part List</h5>
          <div className="d-flex justify-content-center align-items-center">
            {/* <div className="ml-3"><a href="#" className="bg-yellow text-white btn-sm rounded-pill">* Gold <KeyboardArrowDownIcon className="font-size-14"/></a></div> */}
            <div className="ml-3">
                <Select className="customselectbtn1" onChange={(e) => handleOption3(e)} options={options3} value={value3} />
              </div>
            
              <div className="ml-3">
                <Select className="customselectbtn" onChange={(e) => handleOption2(e)} options={options2} value={value2} />
              </div>
            <div className="rating-star">
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
              </div>
           
          </div>
          </div>
          <div className="d-flex">
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Items to Review"><img src={folderaddIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
            {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
           
          </div>
          <div>
          <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
          <IconButton className="btn bg-primary text-white font-size-14 pr-0 ml-2" style={{borderRadius:'5px'}}
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
           <span>Convert to<span><KeyboardArrowDownIcon/></span></span>
          </IconButton>

      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem >
         Templates
        </MenuItem>
        <MenuItem >
         Standard Job
        </MenuItem>
        <MenuItem>
         Kit
        </MenuItem>
        <MenuItem data-toggle="modal" data-target="#quotecreat">
        Quote
        </MenuItem>
        <Divider />

      </Menu>
    </React.Fragment>
          </div>
          </div>
          </div>
          
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-folder-o" aria-hidden="true"></i></a></div>
              <div className="hr"></div>
            </h5>
            <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Customer" value="1" />
                <Tab label="Machine " value="2" />
                <Tab label="Estimation Team" value="3" />
                <Tab label="General Details" value="4" />
                <Tab label="Price" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SOURCE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CONTACT EMAIL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CONTACT PHONE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CUSTOMER GROUP</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
                
              </div>
              <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SOURCE</p>
              <h6 class="font-weight-500">Koolan lran Ore pty Ltd</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER ID</p>
              <h6 class="font-weight-500">357418</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER NAME</p>
              <h6 class="font-weight-500">Damon Farrell</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER EMAIL</p>
              <h6 class="font-weight-500">08 6311 5741</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CONTACT PHONE</p>
              <h6 class="font-weight-500">Large Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER GROUP</p>
              <h6 class="font-weight-500">Australia-Direct Sale</h6>
              </div>
            </div>
         </div>
         <div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
                {/* <div class="form-group mb-0">
                  <Link to={"/WithSpareParts"} className="btn bg-primary text-white">
                 Next
                  </Link>
                </div> */}

         </div>

            </TabPanel>
            <TabPanel value="2">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">MODEL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SERIAL #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SMU</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT NO / FLEET NO</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REGISTRATION NO</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CHASIS NO</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
                
              </div>
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">MODEL</p>
              <h6 class="font-weight-500">992K</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SERIAL NO</p>
              <h6 class="font-weight-500">H4COO450 </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SMU</p>
              <h6 class="font-weight-500">12,580</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2"> UNIT NO / FLEET NO</p>
              <h6 class="font-weight-500">WL006</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REGISTRATION NO</p>
              <h6 class="font-weight-500">LAJOOt6t31</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CHASSIS NO</p>
              <h6 class="font-weight-500">797</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
            </TabPanel>
            <TabPanel value="3">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PREPARED BY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">APPROVED BY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PREPARED ON</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REVISED BY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REVISED ON</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SALES OFFICE / BRANCH</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
                
                
              </div>
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PREPARED BY</p>
              <h6 class="font-weight-500">Dan Ham</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">APPROVED BY</p>
              <h6 class="font-weight-500">01.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PREPARED ON</p>
              <h6 class="font-weight-500">Steve Eckersley</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REVISED BY </p>
              <h6 class="font-weight-500">Dan Ham</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REVISED ON</p>
              <h6 class="font-weight-500">10.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SALES OFFICE / BRANCH</p>
              <h6 class="font-weight-500">Sales Office</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
            </TabPanel>
            <TabPanel value="4">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ESTIMATION DATE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ESTIMATION #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">REFERENCE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">VALIDITY</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">VERSION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
                
              </div>
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ESTIMATION DATE </p>
              <h6 class="font-weight-500">3/10/2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ESTIMATION #</p>
              <h6 class="font-weight-500">1005583 </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
              <h6 class="font-weight-500">Koolan 992k WL006(revised)</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REFERENCE </p>
              <h6 class="font-weight-500">KM1305RE</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">VALIDTITY</p>
              <h6 class="font-weight-500">30 days </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">VERSION</p>
              <h6 class="font-weight-500">2</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Save & Next
                    </button>
                  </div>
            </TabPanel>
            <TabPanel value="5">
              <div className="row">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">NET PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE DATE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COST PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">ADJUSTED PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
              
              
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              </div>
              <div className="row mt-3">
              <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">NET PRICE</p>
              <h6 class="font-weight-500">Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
              <h6 class="font-weight-500">01.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">COST PRICE</p>
              <h6 class="font-weight-500">01.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD</p>
              <h6 class="font-weight-500">List Price </h6>
              </div>
            </div>
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ADJUSTED PRICE </p>
              <h6 class="font-weight-500">Mining</h6>
              </div>
            </div>
            
            
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CURRENCY </p>
              <h6 class="font-weight-500">AUD</h6>
              </div>
            </div>
         </div>
         <div className="row" style={{ justifyContent: "right" }}>
                    <button type="button" className="btn btn-light bg-primary text-white">
                      Next
                    </button>
                  </div>
              
            </TabPanel>
          </TabContext>
        </Box>
            {/* <div className="row mt-5">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">JOB CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">JOB DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COMPONENT CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COMPONENT DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">REFERENCE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">OPERATION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>


            </div>
            <div className="row mt-3">
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">SEGMENT</p>
                  <h6 class="font-weight-600">01</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">JOB CODE</p>
                  <h6 class="font-weight-600">15</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">TITLE</p>
                  <h6 class="font-weight-600">Disassemble</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">COMP CODE</p>
                  <h6 class="font-weight-600">3000</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
                  <h6 class="font-weight-600">Transmission</h6>
                </div>
              </div>
            </div> */}
          </div>

          {/* <div className="card mt-5">
                        <div className="fileheader p-4 border-bottom d-flex justify-content-between align-items-center custom-portfolio-dropdown">
                            <h6 className="font-weight-600 text-light mb-0">Table Name<span> <a onClick={() => setOpen2(true)} href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                            <h6 className="font-weight-600 text-light mb-0 cursor" onClick={handleShowAddSolution}><span className="mr-2">+</span>Add Solution</h6>
                            <div className="d-flex align-items-center">
                                <h6 className="font-weight-600 text-light mb-0 cursor" onClick={handleAddSolutionPress}><span className="mr-2">+</span>Add Solution</h6>
                                <Dropdown as={ButtonGroup}>
                                    
                                    <Dropdown.Toggle split variant="" id="dropdown-split-basic" className="dropdownBtnCustom"><MoreVertIcon /></Dropdown.Toggle>
                                    <Dropdown.Menu className="">
                                        <Dropdown.Item className="cursor" onClick={() => handleMoreAction(1)}>Create Bundle</Dropdown.Item>
                                        <Dropdown.Item className="cursor" onClick={() => handleMoreAction(2)}>Create Service</Dropdown.Item>
                                        <Dropdown.Item className="cursor" onClick={() => handleMoreAction(3)}>Create Item</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <MuiMenuComponent onClick={(event) => handleMenuItemClick(event)} options={portfolioBodyMoreActions} />
                        </div>
                        {bundleItems.length > 0 ?
                            <div>
                               
                                <div className="custom-table  card " style={{ height: 400, width: '100%' }}>
                                    <DataTable title="" columns={columns} data={bundleItems} customStyles={customStyles} pagination />
                                </div>
                            </div>
                            :
                            <div className="p-4  row">
                                <div className="col-md-6 col-sm-6" >
                                    <a href="#" className="add-new-recod">
                                        <div>
                                            <FontAwesomeIcon icon={faPlus} />
                                            <p className="font-weight-600">Add Protfolio Item</p>
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
                                
                            </div>
                        }


                    </div> */}
          <div className="card border mt-4 px-4">
          <div className="row align-items-center">
          
          <div className="col-9 mx-1">
         
          <div className="d-flex align-items-center w-100">
          <div className="d-flex mr-3" style={{whiteSpace:'pre'}}>
          <h5 className="mr-2 mb-0 text-black"><span>Parts Table</span></h5>
          <p className="ml-4 mb-0">
          <a href="#" className="ml-3"><FontAwesomeIcon icon={faPen} /></a>
          </p>
          </div>
                          <div className="d-flex justify-content-between align-items-center w-100 ">
                            <div className="row align-items-center m-0">
                              {
                                querySearchSelector.map((obj, i) => {
                                  return (
                                    <>

                                      <div className="customselect d-flex align-items-center mr-3 my-2">
                                        {
                                          i > 0 ?
                                            <SelectFilter
                                              isClearable={true}
                                              defaultValue={{ label: "And", value: "AND" }}
                                              options={[
                                                { label: "And", value: "AND", id: i },
                                                { label: "Or", value: "OR", id: i },
                                              ]}
                                              placeholder="&amp;"
                                              onChange={(e) => handleOperator(e, i)}
                                              // value={querySearchOperator[i]}
                                              value={obj.selectOperator}

                                            /> : <></>
                                        }

                                        <div>
                                          <SelectFilter
                                            // isClearable={true}
                                            options={[
                                              { label: "Make", value: "make", id: i },
                                              { label: "Family", value: "family", id: i },
                                              { label: "Model", value: "model", id: i },
                                              { label: "Prefix", value: "prefix", id: i },
                                            ]}
                                            onChange={(e) => handleFamily(e, i)}
                                            value={obj.selectFamily}
                                          />
                                        </div>
                                        <div className="customselectsearch">
                                          <input className="custom-input-sleact"
                                            type="text"
                                            placeholder="Search string"
                                            value={obj.inputSearch}
                                            onChange={(e) => handleInputSearch(e, i)}
                                            id={"inputSearch-" + i}
                                            autoComplete="off"
                                          />

                                          {

                                            <ul className={`list-group customselectsearch-list scrollbar scrollbar-${i}`} id="style">
                                              {obj.selectOptions.map((currentItem, j) => (
                                                <li className="list-group-item" key={j} onClick={(e) => handleSearchListClick(e, currentItem, obj, i)}>{currentItem}</li>
                                              ))}
                                            </ul>

                                          }
                                        </div>
                                      </div>
                                    </>
                                  );
                                })
                              }
                              <div
                                onClick={(e) => addSearchQuerryHtml(e)}>
                                <Link
                                  to="#"
                                  className="btn-sm text-black border mr-2"
                                  style={{ border: "1px solid #872FF7" }}
                                >
                                  +
                                </Link>
                              </div>
                              <div onClick={handleDeletQuerySearch}>
                                <Link to="#" className="btn-sm border">
                                  <svg data-name="Layer 41" id="Layer_41" fill="black" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title /><path className="cls-1" d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z" /><path class="cls-1" d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z" /><path class="cls-1" d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z" /></svg>
                                  {/* <DeleteIcon className="font-size-16" /> */}
                                </Link>
                              </div>

                            </div>
                          </div>
                        </div>
         
          </div>
          <div className="col-1">
          <div className="text-center pl-3 py-3">
          <a className="btn bg-primary text-white ml-3" data-toggle="modal" data-target="#Datatable"><SearchIcon /><span className="ml-1">Search</span></a>
                  
          </div>
          
          </div>
          {/* <div className="col-1">
            <div className="d-flex align-items-center justify-content-center">
            <a onClick={() => setOpen3(true)} style={{ cursor: 'pointer' }} className="btn bg-primary text-white ml-3">Upload</a>
                  
             
            </div>
          </div> */}
          <div className="col-auto">
            <div className="d-flex align-items-center justify-content-center">
            <a onClick={() => setOpen3(true)} style={{ cursor: 'pointer' }} className="btn bg-primary text-white ml-3">Upload</a>
            <a onClick={() => setOpen2(true)} href="#" className="btn bg-primary text-white ml-3">+ Add Part</a>
                  
             
            </div>
          </div>
          </div>
           
            <DataTable
              className="mr-2"
              title=""
              columns={columns}
              data={data}
              customStyles={customStyles}
              pagination
            />
            <div className=" my-3 text-right">
              <a href="#" className="btn text-white bg-primary">Save</a>
            </div>

          </div>
          <Modal show={open2} onHide={handleClose2} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header >
              <Modal.Title>1000-Engine|23-Replace Engine|Replace Engine</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 bg-white">
              <div className="ligt-greey-bg p-3">
                <div>
                  <span className="mr-3">
                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span className="ml-2">Edit</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2 cursor"  data-toggle="modal" data-target="#Recommended" >Substitute parts</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2 cursor" data-toggle="modal" data-target="#Substitute" >Recommended price</span>
                  </span>
                  <span className="mr-3">
                    < MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">GROUP NUMBER</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="1000 ENGINE" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TYPE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0123 REPLACE" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PART NUMBER</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace left side of the Engine" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QTY</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="List Price" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$35000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXTENDED PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$10000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$5000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">% USAGE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EA" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TOTAL PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMMENTS</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DESCRIPTION</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <a href="#" onClick={handleClose2} className="btn border mr-3 "> Cancel</a>
                  <a href="#" className="btn text-white bg-primary">Save</a>
                </div>
              </div>
            </Modal.Body>


          </Modal>

          <Modal show={open3} onHide={() => setOpen3(false)} size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
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
                <button className="btn border w-100 bg-white" onClick={() => setOpen3(false)}>Cancel</button>
              </div>
              <div className="col-md-6 col-sm-6">
                <button className="btn btn-primary w-100" onClick={() => setOpenCoveragetable(true)} style={{ cursor: 'pointer' }}><FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />Upload</button>
              </div>
            </div>


          </Modal>

          {/* comment below Code on 12/08/22 */}
          {/* <div className="card p-4 mt-5">
            comment this
            <h5 className="d-flex align-items-center  mb-3">
              <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Part List</span></div>
              <div className="hr"></div>
            </h5>
            comment end
            <div className="d-flex align-items-center justify-content-between m-2">
              <h5 className="font-weight-600 mb-0">Part Lists</h5>
              <div className="d-flex justify-content-center align-items-center">
                <Link to="#" className="btn-sm bg-primary text-white">
                  <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add New
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}>comment this</img></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Add-new-segment-div p-3 border-radius-10">
            <Link to="/RepairServiceEstimate" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Service Estimates
            </Link>

          </div> */}
        </div>
        <div class="modal fade" id="Substitute" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{zIndex:'1200'}}>
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header p-0 ">
              <div className="card w-100 p-2 m-0" style={{backgroundColor: '#F3F4FE'}}>
              <div className="d-flex justify-content-between mt-3 px-3" >
              <h6>RECOMMENDED DISCOUNT PRICE</h6>
              <a href="" >$500</a>
              </div>
              <p className="mt-2 px-3">The best suited discount for this type of quotation.</p>
              <div className="mx-3 mb-3">
              <button className="btn border w-100 bg-white" style={{ borderRadius: '0.5rem'}}>Apply recommendation</button>
              </div>
              </div>
            </div>
            <div class="modal-body m-2">
            <div className="card w-100 border mb-0">
            <div className="row mt-3 px-2">
             <div class="col-md-5 col-sm-5  pl-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2 ">PART TYPE</p>
              <h6 class="font-weight-500">New</h6>
              </div>
            </div>
            <div class="col-md-5 col-sm-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ALLOWED DISCOUNT</p>
              <h6 class="font-weight-500">20%</h6>
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
            </div>
            </div>
            </div>
            <div className="hr w-100"></div>
            <div className="row mt-3 px-2">
            <div class="col-md-5 col-sm-5 pl-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PART TYPE</p>
              <h6 class="font-weight-500">Refurb</h6>
              </div>
            </div>
            <div class="col-md-5 col-sm-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ALLOWED DISCOUNT</p>
              <h6 class="font-weight-500">30%</h6>
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
            </div>
            </div>
            </div>
            <div className="hr w-100"></div>
            <div className="row mt-3 px-2">
            <div class="col-md-5 col-sm-5 pl-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PART TYPE</p>
              <h6 class="font-weight-500">Reman</h6>
              </div>
            </div>
            <div class="col-md-5 col-sm-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ALLOWED DISCOUNT</p>
              <h6 class="font-weight-500">40%</h6>
              </div>
            </div> 
            <div class="col-md-2 col-sm-2">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
            </div>
            </div>
         </div>
         </div>
            </div>

            <div className="mx-4 mb-5">
              <button className="btn border w-100 text-white bg-primary" style={{ borderRadius: '0.5rem'}}><span className="mr-2"><CheckOutlinedIcon /></span>Apply selection</button>
              </div>
             
          </div>
        </div>
      </div>
      <div class="modal fade" id="Recommended" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{zIndex:'1200'}}>
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header p-4">
           <div className="card w-100 border mb-0">
            <div className="row mt-3 px-2">
             <div class="col-md-5 col-sm-5 pl-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PART TYPE</p>
              <h6 class="font-weight-500">New</h6>
              </div>
            </div>
            <div class="col-md-5 col-sm-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ALLOWED DISCOUNT</p>
              <h6 class="font-weight-500">20%</h6>
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
            <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
</div>
            {/* <div className="listcheckbox">
            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
            </div> */}
            </div>
            </div>
            <div className="hr w-100"></div>
            <div className="row mt-3 px-2">
            <div class="col-md-5 col-sm-5 pl-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PART TYPE</p>
              <h6 class="font-weight-500">Refurb</h6>
              </div>
            </div>
            <div class="col-md-5 col-sm-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ALLOWED DISCOUNT</p>
              <h6 class="font-weight-500">30%</h6>
              </div>
            </div>
            <div class="col-md-2 col-sm-2">
            <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
</div>
            {/* <div className="listcheckbox">
            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
            </div> */}
            </div>
            </div>
            <div className="hr w-100"></div>
            <div className="row mt-3 px-2">
            <div class="col-md-5 col-sm-5 pl-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PART TYPE</p>
              <h6 class="font-weight-500">Reman</h6>
              </div>
            </div>
            <div class="col-md-5 col-sm-5">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ALLOWED DISCOUNT</p>
              <h6 class="font-weight-500">40%</h6>
              </div>
            </div> 
            <div class="col-md-2 col-sm-2">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
            </div>
            {/* <div className="listcheckbox">
            <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
            </div> */}
            </div>
         </div>
         </div>
            </div>
           
            <div className="mx-4 mb-5">
              <button className="btn border w-100 text-white bg-primary" style={{ borderRadius: '0.5rem'}}><span className="mr-2"><CheckOutlinedIcon /></span>Apply selection</button>
              </div>
          
          </div>
        </div>
      </div>
      <div class="modal fade" id="quotecreat" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content bg-white border-none">
              <div class="modal-header border-none">
                <h5 class="modal-title" id="exampleModalLabel">Quote Create</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
               
              </div>
              <p className="d-block px-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              <hr className="my-1"/>
              <div class="modal-body">
             <div className="row">
             <div className="col-md-12 col-sm-12">
              <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Quote Type</label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                placeholder="Cyclical"
              />
            </div>
              </div>
              <div className="col-md-12 col-sm-12">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Quote ID</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              </div>
              <div className="col-md-12 col-sm-12">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
              </div>
              <div className="col-md-12 col-sm-12">
              <div class="form-group">
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Reference</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              </div>
             </div>

             <div className="row">
             <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">QUOTE TYPE </p>
                 <h6 class="font-weight-500">Repair Quote with Spare Parts</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">Quote ID </p>
                 <h6 class="font-weight-500">SB12345</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">QUOTE DESCRIPTION</p>
                 <h6 class="font-weight-500">Holder text</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                 <h6 class="font-weight-500">Holder text</h6>
                 </div>
                 </div>
               
             </div>
              </div>
              <div class="modal-footer"style={{display:'unset'}}>
                <div className="mb-2">
                  <a href="#" onClick={()=>handleCreate()} data-dismiss="modal" className="btn bg-primary d-block text-white">Done</a>
                </div>
                <div>
                <button class="btn  btn-primary">Create</button>
                <button type="button" class="btn pull-right border" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="Datatable" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{zIndex:'1200'}}>
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
          <div class="modal-content">
          
            <div class="modal-header p-3">
            <div className="d-flex" >
              <h5>Search Result</h5>
             
              </div>
            </div>
             <div>
            <div className="card w-100 p-2">
    
    <div className="" style={{ height: 400, width: '100%', backgroundColor:'#fff' }}>
        <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#7380E4', color:'#fff'
          }
        }}
          rows={rows}
          columns={columns2}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onCellClick={(e)=>handleRowClick(e)}
          
          
        />
      </div> 
      
    </div>
    <div className="m-2 text-right">
        <a href="#" className="btn text-white bg-primary">+ Add Selected</a>
             
        </div>
    </div>
            
           
            
          
          </div>
        </div>
      </div>
      </div>
    </>
  )
}


export default PartList
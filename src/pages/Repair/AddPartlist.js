import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MuiMenuComponent } from "pages/Operational";
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import FormControlLabel from '@mui/material/FormControlLabel';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import FormGroup from '@mui/material/FormGroup';
import { FileUploader } from "react-drag-drop-files";
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { Modal, SplitButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SelectFilter from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import DataTable from 'react-data-table-component';
import boxicon from '../../assets/icons/png/box.png'
import $ from "jquery"
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { DataGrid } from '@mui/x-data-grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {Link, useHistory} from 'react-router-dom'
import {
 
 

 

  getPortfolioCommonConfig,
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  itemCreation
} from "../../services/index";
function AddPartlist(){
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState('1');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = [
    'Create Versions',
    'Show Errors',
    'Review'
  ];
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
];
const handleClose2 = () => setOpen2(false);
const [open2, setOpen2] = React.useState(false);
const [open3, setOpen3] = React.useState(false);
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
const handleFamily = (e, id) => {
  let tempArray = [...querySearchSelector]
  console.log("handleFamily e:", e)
  let obj = tempArray[id]
  obj.selectFamily = e
  tempArray[id] = obj
  setQuerySearchSelector([...tempArray])
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
const handleOperator = (e, id) => {
  let tempArray = [...querySearchSelector]
  let obj = tempArray[id]
  obj.selectOperator = e
  tempArray[id] = obj
  setQuerySearchSelector([...tempArray])
}
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
const options3 = [
  { value: "chocolate", label: "Gold" },
  { value: "strawberry", label: "1" },
  { value: "vanilla", label: "2" },
  { value: "Construction", label: "3" },
];
const options4 = [
  { value: "chocolate", label: "Gold" },
  { value: "strawberry", label: "1" },
  { value: "vanilla", label: "2" },
  { value: "Construction", label: "3" },
];
const handleOption3 = (e) => {
  setValue3(e)
}
const handleOption4 = (e) => {
  setValue4(e)
}
const [value3, setValue3] = useState({ value: 'Gold', label: 'Gold' });
const [value4, setValue4] = useState({ value: 'Gold', label: 'Gold' });
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
const [querySearchSelector, setQuerySearchSelector] = useState([{
  id: 0,
  selectFamily: "",
  selectOperator: "",
  inputSearch: "",
  selectOptions: [],
  selectedOption: ""
}])
const [masterData, setMasterData] = useState([])
const [count, setCount] = useState(1)
const handleDeletQuerySearch = () => {
  setQuerySearchSelector([])
  setCount(0)
  setMasterData([])
  setFilterMasterData([])
  setSelectedMasterData([])
}
const [filterMasterData, setFilterMasterData] = useState([])
const [selectedMasterData, setSelectedMasterData] = useState([])
const [openCoverage, setOpenCoveragetable] = React.useState(false);
const fileTypes = ["JPG", "PNG", "GIF"];
const handleRowClick=(e)=>{
  setShow(true)
}
const [show, setShow] = React.useState(false);
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
const handleClose = () => {
  setAnchorEl(null);
}; 
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleOption2 = (e) => {
  setValue2(e)
}
const [value2, setValue2] = useState({ value: 'Archived', label: 'Archived' });
const options2 = [
  { value: "chocolate", label: "Archived" },
  { value: "strawberry", label: "Draft" },
  { value: "vanilla", label: "Active" },
  { value: "Construction", label: "Revised" },
];
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleCreate=()=>{
  history.push('/quoteTemplate')
}
const history=useHistory()

    return(
      <>
      {/* <CommanComponents/> */}
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
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Items to Review"><img src={folderaddIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
            {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
           
          </div>
          
          </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Part List</span></div>
              <div className="hr"></div>
            </h5>
            <div className="row mt-4">
            <div className="col-md-4 col-sm-4">
                  <div className="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">JOB CODE</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                  <div className="form-group mt-3">
                      <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMPONENT CODE</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">JOB CODE</p>
                  <h6 className="font-weight-600">Chinalco SA, Beijing,China (code 203027)</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">DESCRIPTION </p>
                  <h6 className="font-weight-600">Alberto Franco, Head of purchase</h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">COMPONENT CODE</p>
                  <h6 className="font-weight-600">SF1234 </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <p className="font-size-12 font-weight-600 mb-2">DESCRIPTION</p>
                  <h6 className="font-weight-600">Sales Opportunity for Chinalco for recondition </h6>
                </div>
              </div>
            </div>
           
            <div className=" text-right">
             <a href="#" className="btn border bg-primary text-white">Save</a>
           </div>
          </div>
          <div className="card border mt-4 px-4">
          <div className="row align-items-center">
          <div className="col-8">
         
          <div className="d-flex align-items-center w-100">
          <div className="d-flex mr-3 col-auto pl-0" style={{whiteSpace:'pre'}}>
          <h5 className="mr-2 mb-0 text-black"><span>Parts Table</span></h5>
          <Select className="customselectbtn1 col-auto" onChange={(e) => handleOption4(e)} options={options4} value={value4} />
          <p className=" mb-0">
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
          <div className="col-4">
          <div className="text-right pl-3 py-3">
          <a className="btn bg-primary text-white" data-toggle="modal" data-target="#Datatable"><SearchIcon /><span className="ml-1">Search</span></a>
          <a onClick={() => setOpen3(true)} style={{ cursor: 'pointer' }} className="btn bg-primary text-white mx-2">Upload</a>
          <a onClick={() => setOpen2(true)} href="#" className="btn bg-primary text-white ">+ Add Part</a>      
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
            backgroundColor: '#872ff7', color:'#fff'
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
        </div>
        </>
    )
}


export default AddPartlist
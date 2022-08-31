import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MuiMenuComponent } from "pages/Operational";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { CommanComponents } from "components";
import AddIcon from '@mui/icons-material/Add';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {Link, useHistory} from 'react-router-dom'

function RepairOption01(){
  const history=useHistory()
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

const handleClose = () => {
  setAnchorEl(null);
}; 
const [anchorEl, setAnchorEl] = React.useState(null);
const handleOption2 = (e) => {
  setValue2(e)
}
const handleOption3 = (e) => {
  setValue3(e)
}
const [value2, setValue2] = useState({ value: 'Archived', label: 'Archived' });
const [value3, setValue3] = useState({ value: 'Gold', label: 'Gold' });
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
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const open = Boolean(anchorEl);
const handleCreate=()=>{
  history.push('/quoteTemplate')
}
    return(
      <>
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
      <div className="d-flex align-items-center justify-content-between mt-2">
        <div className="d-flex justify-content-center align-items-center">
          <h5 className="font-weight-600 mb-0">Repair Options</h5>
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
          <div className="d-flex justify-content-end align-items-center mb-0">
          <div className="text-right">
          <a href="#" className="text-primary"><span><KeyboardArrowLeftIcon/></span>Operation 07<span><KeyboardArrowRightIcon/></span></a>
             <a href="#" className="text-primary ml-2 border-left "><span className="ml-2"><AddIcon/></span>Add New</a>
           </div>
           </div>
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Operation 01</span></div>
              <div className="hr"></div>
              </h5>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">OPERATION #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">COMPONENT CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholdEr="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">COMPONENT CODE DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">MODIFIER</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
              </div>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">OPERATION #</p>
                 <h6 className="font-weight-600">001</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">COMPONENT CODE</p>
                 <h6 className="font-weight-600">15</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2"> JOB CODE DESCRIPTION </p>
                 <h6 className="font-weight-600">Disassemble </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">COMPONENT CODE DESCRIPTION</p>
                 <h6 className="font-weight-600">3066</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">JOB CODE</p>
                 <h6 className="font-weight-600">BOMB Aceite-Transmission</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">MODIFIER  </p>
                 <h6 className="font-weight-600">LF</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
                 <h6 className="font-weight-600">DISASSEMBLE BOMB ACEITE TRANSMISSION</h6>
                </div>
                </div>
              </div>
              <div className=" text-right">
             <a href="#" className="btn border bg-primary text-white">Save</a>
           </div>
            
           <h5 className="d-flex align-items-center  mx-2">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Part List</span></div>
          <div className="hr"></div>
          </h5>
          <div className="row">
            <div className="col-md-4">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
          <div className="d-flex">
          <div>
          <Checkbox className="p-0 text-white" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21 text-white" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><DeleteOutlineOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ContentCopyIcon className="ml-3 font-size-21 text-white"/></a>
           <a  className="ml-3 text-white svg-div"><MuiMenuComponent options={activityOptions}/></a>
           
         
         </div>
          </div>
          <div className="bg-white px-3 pt-4 pb-2">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          <div className="hr"></div>
          
          </div>
          <div className="bg-white py-2 px-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
          <div className="d-flex">
          <div>
          <Checkbox className="p-0 text-white" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21 text-white" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><DeleteOutlineOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ContentCopyIcon className="ml-3 font-size-21 text-white"/></a>
           <a  className="ml-3 text-white svg-div"><MuiMenuComponent options={activityOptions}/></a>
           
         
         </div>
          </div>
          <div className="bg-white px-3 pt-4 pb-2">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          <div className="hr"></div>
          
          </div>
          <div className="bg-white py-2 px-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
          <div className="d-flex">
          <div>
          <Checkbox className="p-0 text-white" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21 text-white" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><DeleteOutlineOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ContentCopyIcon className="ml-3 font-size-21 text-white"/></a>
           <a  className="ml-3 text-white svg-div"><MuiMenuComponent options={activityOptions}/></a>
           
         
         </div>
          </div>
          <div className="bg-white px-3 pt-4 pb-2">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          <div className="hr"></div>
          
          </div>
          <div className="bg-white py-2 px-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
          <div className="d-flex">
          <div>
          <Checkbox className="p-0 text-white" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21 text-white" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><DeleteOutlineOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ContentCopyIcon className="ml-3 font-size-21 text-white"/></a>
           <a  className="ml-3 text-white svg-div"><MuiMenuComponent options={activityOptions}/></a>
           
         
         </div>
          </div>
          <div className="bg-white px-3 pt-4 pb-2">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          <div className="hr"></div>
          
          </div>
          <div className="bg-white py-2 px-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
          <div className="d-flex">
          <div>
          <Checkbox className="p-0 text-white" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21 text-white" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><DeleteOutlineOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ContentCopyIcon className="ml-3 font-size-21 text-white"/></a>
           <a  className="ml-3 text-white svg-div"><MuiMenuComponent options={activityOptions}/></a>
           
         
         </div>
          </div>
          <div className="bg-white px-3 pt-4 pb-2">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          <div className="hr"></div>
          
          </div>
          <div className="bg-white py-2 px-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
          <div className="d-flex">
          <div>
          <Checkbox className="p-0 text-white" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21 text-white" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><DeleteOutlineOutlinedIcon className="ml-3 font-size-21 text-white"/></a>
           <a href="#"><ContentCopyIcon className="ml-3 font-size-21 text-white"/></a>
           <a  className="ml-3 text-white svg-div"><MuiMenuComponent options={activityOptions}/></a>
           
         
         </div>
          </div>
          <div className="bg-white px-3 pt-4 pb-2">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          <div className="hr"></div>
          
          </div>
          <div className="bg-white py-2 px-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-light-black font-size-12">Go to Version <span className="text-light-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          
          
          <div className="row my-4">
          <div className="col-auto">
          <div className="d-flex">
          <p className="mr-2 font-size-12 font-weight-500 mr-2">TOTAL PARTS</p>
          </div>      
          </div>
          <div className="col-2">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">NEW</p>
              <h6 className="font-size-14 font-weight-600">7</h6>
            </div>
          </div>
          <div className="col-3">
            <div class="d-flex">
              <p className="mr-2 font-size-12 font-weight-500 mr-2">REFURBISHED</p>
              <h6 className="font-size-14 font-weight-600">6</h6>
            </div>
          </div>
          <div className="col-4">
            <div class="d-flex justify-content-center">
            <p class="mr-2 font-size-12 font-weight-500 mr-2">TOTAL COSTS</p>
              <h6 className=" font-size-14 font-weight-600">$48</h6>
            </div>
          </div>
          </div>
          <div className="form-group my-4">
          <div className="d-flex align-items-center">
          <p class="font-size-12 font-weight-500 mr-2 mb-0">STATUS</p>
              <h6 class="font-weight-600 mb-0 mr-3">6/8</h6>
              <div class="progress w-100">
                <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              </div>
          
          </div>
          
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
           
            
            
            {/* <div className="col-md-6">
              <div className="card border">
              <div className="d-flex align-items-center justify-content-between mb-0 p-3">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
         <div className="d-flex">
         <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share"/></a>
           <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review"/></a>
           <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
         </div>
          </div>
          <div className="bg-light-grey p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
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
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div>
            <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>
           
          </div>
          </div>
          <div className=" p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
         <div className="d-flex">
          <div>
          <Checkbox className="p-0" {...label} />
        </div>
        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload"/></a>
           <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21"/></a>
           <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21"/></a>
      
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MoreVertOutlinedIcon/></a>
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
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
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
            </div> */}
           
          </div>
          <div className=" text-right">
             <a href="#" className="btn border bg-primary text-white">Save</a>
           </div>
        </div>
        <div className="Add-new-segment-div p-3 border-radius-10 mb-3">
              <Link to="/AddPartlist" className="btn bg-primary text-white mr-3">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Part List
                </Link>
                <Link to="/RepairServiceEstimate" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Service Estimate
                </Link>
                {/* <a className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Srvice Estimates
                </a> */}
               
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


export default RepairOption01
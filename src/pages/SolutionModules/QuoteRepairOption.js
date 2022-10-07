import React,{useEffect, useState} from "react";
import { MuiMenuComponent } from "pages/Operational";
import Box from '@mui/material/Box';
import Select from 'react-select';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommanComponents } from "../../components/index"
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {Link, useHistory} from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const QuoteRepairOption = () => {
  const history=useHistory()
  const options = [
    { value: 'Archived', label: 'Archived' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Active', label: 'Active' },
    { value: 'Revised', label: 'Revised' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value1, setValue1] = React.useState({ value: 'Archived', label: 'Archived' });

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];

  const handleCreate=()=>{
    history.push('/quoteTemplate')
  }

  const handleOption=(e)=>{
    setValue1(e)
  }


  return (
    <>
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
      <div className="d-flex align-items-center justify-content-between mt-2">
            <div className="d-flex">
          <h5 className="font-weight-600 mb-0">Repair Option</h5>
          <div className="d-flex">
            {/* <div className="ml-3"><a href="#" className="bg-yellow text-white btn-sm rounded-pill">* Gold <KeyboardArrowDownIcon className="font-size-14"/></a></div> */}
            <div className="ml-3">
              <Select className="customselectbtn" onChange={(e)=>handleOption(e)} options={options} value={value1}/>
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
      
          <IconButton className="btn bg-primary text-white font-size-14" style={{borderRadius:'5px'}}
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
          {/* <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Repair Option</h5>
          <div className="d-flex">
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
          </div>
          <div>
          <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
          <IconButton className="btn bg-primary text-white font-size-14" style={{borderRadius:'5px'}}
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
          </div> */}
          <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Header</span></div>
              <div className="hr"></div>
              </h5>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">CUSTOMER </p>
                 <h6 className="font-weight-600">Chinalco SA, Beijing,China (code 203027)</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">CONTACT </p>
                 <h6 className="font-weight-600">Alberto Franco, Head of purchase</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">REFERENCE</p>
                 <h6 className="font-weight-600">SF1234 </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">DESCRIPTION</p>
                 <h6 className="font-weight-600">Sales Opportunity for Chinalco for recondition </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">EQUIPMENT / SERIAL #</p>
                 <h6 className="font-weight-600">LAJ00t6t31</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">MANUFACTURER</p>
                 <h6 className="font-weight-600">CAT</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">PLAYER</p>
                 <h6 className="font-weight-600">Customer 50%, Insurer 50%</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">PAYMENT TERM</p>
                 <h6 className="font-weight-600">30days</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">INCOTERM </p>
                 <h6 className="font-weight-600">Standard</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">SHIPPING CONDITION</p>
                 <h6 className="font-weight-600">Standard</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">VALIDITY</p>
                 <h6 className="font-weight-600">01.10.2021 to 01.02.2022</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">CONTACT</p>
                 <h6 className="font-weight-600">Employee responsible</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">EMPLOYEE RESPONSIBLE</p>
                 <h6 className="font-weight-600">Jorge Moya, Service Operation</h6>
                </div>
                </div>
                <div className="col-md-12">
                <div class="form-group mt-3">
                <a href="#" className="btn bg-primary text-white">Next</a>
                </div>
                </div>
              </div>
  
        </div>
            </div>
            <div className="col-md-6 col-sm-6">
            <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Machine</span></div>
              <div className="hr"></div>
              </h5>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">MAKE</p>
                 <h6 className="font-weight-600">Placement holder text </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">MODEL</p>
                 <h6 className="font-weight-600">797</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">PREFIX </p>
                 <h6 className="font-weight-600">LAJ </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">SERIAL NO.</p>
                 <h6 className="font-weight-600">Placement holder text </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">COMPONENT NO.</p>
                 <h6 className="font-weight-600">Placement holder text </h6>
                </div>
                </div>
                <div className="col-md-12">
                <div class="form-group mt-3">
                <a href="#" className="btn bg-primary text-white">Next</a>
                </div>
                </div>
              </div>
  
        </div>
            </div>
        
          </div>
          <div className="Add-new-segment-div p-3 border-radius-10">
          <Link to={"/Segment01Transmission"} className="btn bg-primary text-white">
          <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Segment<span className="ml-2"><FontAwesomeIcon icon={faAngleDown} /></span>
          </Link>
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
              <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">Descriptions</label>
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
                 <p class="font-size-12 font-weight-600 mb-2">QUOTE TYPE </p>
                 <h6 class="font-weight-600">Repair Quote with Spare Parts</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-600 mb-2">Quote ID </p>
                 <h6 class="font-weight-600">SB12345</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-600 mb-2">QUOTE DESCRIPTION</p>
                 <h6 class="font-weight-600">Holder text</h6>
                 </div>
                 </div>
                 <div class="col-md-12 col-sm-12">
               <div class="form-group mt-3">
                 <p class="font-size-12 font-weight-600 mb-2">REFERENCE</p>
                 <h6 class="font-weight-600">Holder text</h6>
                 </div>
                 </div>
               
             </div>
              </div>
              <div class="modal-footer"style={{display:'unset'}}>
                <div>
                  <a href="/SparePartsQuoteTemplate" className="btn bg-primary d-block text-white">Done</a>
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

export default QuoteRepairOption
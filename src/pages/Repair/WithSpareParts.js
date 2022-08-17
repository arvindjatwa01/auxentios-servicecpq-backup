import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MuiMenuComponent } from "pages/Operational";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
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
import {Link, useHistory} from 'react-router-dom'
import { CommanComponents } from "components";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function WithSpareParts(){
  const history=useHistory()
  const [selectedOption, setSelectedOption] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value1, setValue1] = React.useState({ value: 'Archived', label: 'Archived' });
  const [value, setValue] = React.useState('1');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOption=(e)=>{
    setValue1(e)
  }
  const handleCreate=()=>{
    history.push('/quoteTemplate')
  }
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  const options = [
    { value: 'Archived', label: 'Archived' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Active', label: 'Active' },
    { value: 'Revised', label: 'Revised' },
  ];
    return(
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
      
          <IconButton className="btn bg-primary text-white font-size-14 pr-0" style={{borderRadius:'5px'}}
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
              <div className="" style={{ display:'contents'}}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-folder-o" aria-hidden="true"></i></a></div>
              <div className="hr"></div>
              </h5>
        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Customer" value="1" />
                <Tab label="Machine " value="2" />
                <Tab label="Estimation Team" value="3" />
                <Tab label="Estimate" value="4" />
                <Tab label="Pricing/Billing" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <div className="row">
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">SOURCE ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">SOURCE NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER FIRST NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER FIRST NAME</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER EMAIL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER ZIPCODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
              </div>
              <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ACCOUNT NAME</p>
              <h6 class="font-weight-600">Koolan lran Ore pty Ltd</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">ACCOUNT NUMBER</p>
              <h6 class="font-weight-600">357418</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CONTACT NAME</p>
              <h6 class="font-weight-600">Damon Farrell</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CONTACT PH</p>
              <h6 class="font-weight-600">08 6311 5741</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CUSTOMER GROUP</p>
              <h6 class="font-weight-600">Large Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">BUSINESS AREA</p>
              <h6 class="font-weight-600">Australia-Direct Sale</h6>
              </div>
            </div>
         </div>
         <div>
                <div class="form-group mb-0">
                  <Link to={"/WithSpareParts"} className="btn bg-primary text-white">
                 Next
                  </Link>
                </div>

         </div>

            </TabPanel>
            <TabPanel value="2">
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">MODAL</p>
              <h6 class="font-weight-600">992K</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SERIAL NO</p>
              <h6 class="font-weight-600">H4COO450 </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SMU</p>
              <h6 class="font-weight-600">12,580</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2"> UNIT NO / FLEET NO</p>
              <h6 class="font-weight-600">WL006</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REGISTRATION NO</p>
              <h6 class="font-weight-600">LAJOOt6t31</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CHASSIS NO</p>
              <h6 class="font-weight-600">797</h6>
              </div>
            </div>
         </div>
            </TabPanel>
            <TabPanel value="3">
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRIPARED BY</p>
              <h6 class="font-weight-600">Dan Ham</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PREPARED ON</p>
              <h6 class="font-weight-600">01.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">APPROVER</p>
              <h6 class="font-weight-600">Steve Eckersley</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REVISED BY </p>
              <h6 class="font-weight-600">Dan Ham</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REVISED ON</p>
              <h6 class="font-weight-600">10.09.2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">SALES OFFICE</p>
              <h6 class="font-weight-600">Sales Office</h6>
              </div>
            </div>
         </div>
            </TabPanel>
            <TabPanel value="4">
            <div className="row mt-3">
       <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">QUOTE DATE </p>
              <h6 class="font-weight-600">3/10/2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">QUOTE NO</p>
              <h6 class="font-weight-600">1005583 </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
              <h6 class="font-weight-600">Koolan 992k WL006(revised)</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">REFERENCE </p>
              <h6 class="font-weight-600">KM1305RE</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">QUOTE VALIDTITY</p>
              <h6 class="font-weight-600">30 days </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">VERSION</p>
              <h6 class="font-weight-600">2</h6>
              </div>
            </div>
         </div>
            </TabPanel>
            <TabPanel value="5">
              <div className="row">
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE LIST</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE DATE</label>
                      <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          placeholder="placeholder (Optional)"
                      />
                  </div>
              </div>
              <div className="col-md-4 col-sm-4">
                  <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
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
              <p class="font-size-12 font-weight-500 mb-2">PRICE LIST</p>
              <h6 class="font-weight-600">Mining</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE METHOD</p>
              <h6 class="font-weight-600">List Price </h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">PRICE DATE</p>
              <h6 class="font-weight-600">01.09
2021</h6>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <p class="font-size-12 font-weight-500 mb-2">CURRENCY </p>
              <h6 class="font-weight-600">AUD</h6>
              </div>
            </div>
         </div>
              
            </TabPanel>
          </TabContext>
        </Box>
        </div>
      

          <div className="Add-new-segment-div p-3 border-radius-10">
                <Link to="/Segment01Transmission" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add New Segment
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


export default WithSpareParts
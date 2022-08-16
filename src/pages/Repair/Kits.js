import React, { useEffect, useState } from "react";
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
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { Link } from 'react-router-dom'
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
function Kits() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState('1');
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
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

  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];
  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            
            <div className="d-flex">
          <h5 className="font-weight-600 mb-0">Repair Option</h5>
              <div className="ml-3">
                {portfolioId ? generalComponentData.name : ""}
              </div>
            
              <div className="ml-3">
                <Select className="customselectbtn" onChange={(e) => handleOption2(e)} options={options2} value={value2} />
              </div>
              <div className="rating-star">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>

            </div>
            <div className="d-flex justify-content-center align-items-center">
              <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Items to Review"><img src={folderaddIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
              {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
              <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
              <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
              <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>

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
                    <Tab label="Estimate" value="4" />
                    <Tab label="Pricing/Billing" value="5" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">SOURCE ID</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">SOURCE NAME</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER FIRST NAME</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER FIRST NAME</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER EMAIL</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER ZIPCODE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
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
                      <Link to={"/BulidRepairOptions"} className="btn bg-primary text-white">
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

          {/* comment below code on 12/08 */}
          
          {/* <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center  mb-0">
              <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Part List</span></div>
              <div className="hr"></div>
            </h5>
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
      </div>
    </>
  )
}


export default Kits
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
import {Link} from 'react-router-dom'
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
function Segment01Transmission(){
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
  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
];
    return(
      <>
      {/* <CommanComponents/> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Repair Option</h5>
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
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Segment 01- Transmission</span></div>
              <div className="hr"></div>
              </h5>
              <div className="row mt-4">
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE</label>
                  {/* <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/> */}
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
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">TITLE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">COMPONENT CODE</label>
                  {/* <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/> */}
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
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-12">
                <div class="form-group mt-3">
                 <Link to="/Segment01Disassemble" className="btn bg-primary text-white">Next</Link>
                </div>
                </div>
              </div>
              
        </div>
        <div className="card p-4 mt-5">
          <div className="d-flex justify-content-between align-items-center">
          <div className=" ml-3 pl-2">
                <a href="#" className="btn alert-messges ">Add Filter<AddBoxOutlinedIcon className="font-size-16"/></a>
              </div>
            
              </div>
              <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center mt-3">
              <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                <img src={searchstatusIcon}></img>
              </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10">
                <div className="d-flex align-items-center">
              <span className="mr-3">Repair Bulider</span>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Spare Parts</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Repair Quote"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Labor</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Cost Plus"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Consumables</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Flat rate"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div>
                  <a href="#" className="btn-sm text-violet border" style={{border:'1px solid #872FF7'}}>+</a>
                </div>
              </div>
                </div>
                
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-14 text-danger"/></a>
              </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center mt-3">
              <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                <img src={searchstatusIcon}></img>
              </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10">
                <div className="d-flex align-items-center">
              <span className="mr-3">Repair Bulider</span>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Spare Parts</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Repair Quote"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Labor</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Cost Plus"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                    <Select
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="&"
                      />
                </div>
                <div className="customselect d-flex align-items-center mr-3">
                  <div><span className="px-2">Consumables</span></div>
                    <Select className="border-left"
                      // onChange={handleChangeSelect}
                      isClearable={true}
                      // value={dValue}
                      options={[{label:"One",value:"one"}]}
                      placeholder="Flat rate"
                      /> <span>
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-14"/></a>
                      </span>
                </div>
                <div>
                  <a href="#" className="btn-sm text-violet border" style={{border:'1px solid #872FF7'}}>+</a>
                </div>
              </div>
                </div>
                
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-14 text-danger"/></a>
              </div>
              </div>
           <div className=" text-right">
             <a href="#" className="btn text-white bg-primary mr-3">Review</a>
             <a href="#" className="btn border">Cancel</a>
           </div>
          </div>
        <div className="card p-4 mt-5">
        <h5 className="d-flex align-items-center  mb-0">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Part List</span></div>
          <div className="hr"></div>
          </h5>
          <div className="row">
            <div className="col-md-6">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
         <div className="d-flex">
         <div>
        
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
        </div>
          
         </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>

                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                           </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 2</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                            </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           
          </div>
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
         <div className="d-flex">
         <div>
        
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
        </div>
          
         </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>

                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                           </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 2</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                            </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           
          </div>
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
         <div className="d-flex">
         <div>
        
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
        </div>
          
         </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>

                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                           </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 2</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                            </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           
          </div>
          </div>
          {/* <div className="bg-light-grey p-3">
            <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>
          </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border" style={{overflow: "hidden"}}>
              <div className="d-flex align-items-center justify-content-between mb-0 p-3 bg-primary">
          <div className="" style={{ display:'contents'}}><span className="mr-3 white-space font-size-16 text-white">023-Remove Engine partlist</span></div>
         <div className="d-flex">
         <div>
        
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
          <a href="#"><FileUploadOutlinedIcon className="ml-3 text-white" style={{fontSize: "30px"}} titleAccess="Share"/></a>
        </div>
          
         </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 1</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>

                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                       </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                           </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           </div>
          </div>
          <div className="bg-white p-3">
          <div className="d-flex align-items-center justify-content-between mb-0">
          <div className="" style={{ display:'contents'}}>
          <a href="#" className="btn-sm text-white bg-primary mr-3">Version 2</a>
          </div>
          </div>
          <div className="hr"></div>
          <p class="font-size-12 font-weight-500 my-2">TOTAL PARTS</p>
          <div className="row mt-4">
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>New</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">7</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16"><b>Refurbished</b></h6>
                           </div>
                           <div className="d-flex justify-content-center align-items-center bg-light-grey rounded-circle text-white" style={{width:'45px',height:'45px'}}>
                             <span className="text-primary font-size-18 font-weight-600">6</span>
                           </div>
                            </div>
            </div>
            <div className="col-4">
            <div className="d-flex" style={{alignItems: "baseline"}}>
                         <div>
                             <h6 className="mr-2 font-size-16 d-flex justify-content-center align-items-center"><b>Total Costs</b></h6>
                           </div>
                           <div className=" ">
                             <span className="text-black font-size-25 font-weight-600 d-flex justify-content-center align-items-center " style={{fontSize: "24px"}}>$48</span>
                           </div>
                            </div>
            </div>
          </div>
          <div className="form-group my-3">
          <div className="d-flex ">
          <p class="font-size-12 font-weight-500 mr-2">STATUS</p>
              <h6 class="font-weight-600">6/8</h6>
              </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style={{width:'75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          </div>
          <div style={{textAlign: "right"}}>
            <a href="#" class="text-black font-size-12">Go to Version <span className="text-black" ><ArrowForwardIosOutlinedIcon /></span></a>
           
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
        </div>
        <div className="Add-new-segment-div p-3 border-radius-10">
                <Link to="/RepairServiceEstimate" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Service Estimates
                </Link>
          
        </div>
        </div>
        </div>
        </>
    )
}


export default Segment01Transmission
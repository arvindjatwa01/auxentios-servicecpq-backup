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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AddIcon from '@mui/icons-material/Add';
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
          <div className="d-flex justify-content-end align-items-center mb-0">
          <div className="text-right">
          <a href="#" className="text-primary"><span><KeyboardArrowLeftIcon/></span>Segment 07<span><KeyboardArrowRightIcon/></span></a>
             <a href="#" className="text-primary ml-2 border-left "><span className="ml-2"><AddIcon/></span>Add New</a>
           </div>
           </div>
            <h5 className="d-flex align-items-center mb-0">
            
              <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Segment 01- Transmission</span></div>
              <div className="hr"></div>
              </h5>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">SEGMENT #</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">JOB CODE</label>
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
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TITLE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMPONENT CODE</label>
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
                  <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMPONENT CODE DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
               
              </div>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">SEGMENT #</p>
                 <h6 className="font-weight-500">15</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">JOB CODE</p>
                 <h6 className="font-weight-500">15</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">TITLE</p>
                 <h6 className="font-weight-500">Disassemble </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">COMPONENT CODE</p>
                 <h6 className="font-weight-500">300</h6>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">COMPONENT CODE DESCRIPTION </p>
                 <h6 className="font-weight-500">Transmission</h6>
                </div>
                </div>
                {/* <div className="col-md-12">
                <div class="form-group mt-3">
                 <Link to="/Segment01Disassemble" className="btn bg-primary text-white">Next</Link>
                </div>
                </div> */}
                
              </div>
              <div className=" text-right">
             <a href="#" className="btn border bg-primary text-white">Save</a>
           </div>
        </div>
        <div className="Add-new-segment-div p-3 border-radius-10">
        <Link to={"/RepairOption01"} className="btn bg-primary text-white">
        <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Opretion<span className="ml-2"><FontAwesomeIcon icon={faAngleDown} /></span>
          </Link>
         
        </div>
        <div className="card p-4 mt-5 d-none">
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
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-18"/></a>
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
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-18"/></a>
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
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-18"/></a>
                      </span>
                </div>
                <div>
                  <a href="#" className="btn-sm text-violet border" style={{border:'1px solid #872FF7'}}>+</a>
                </div>
              </div>
                </div>
                
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-18 text-light-grey"/></a>
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
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-18"/></a>
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
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-18"/></a>
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
                      <a href="#" className="btn-sm"><DeleteIcon className="font-size-18"/></a>
                      </span>
                </div>
                <div>
                  <a href="#" className="btn-sm text-violet border" style={{border:'1px solid #872FF7'}}>+</a>
                </div>
              </div>
                </div>
                
              </div>
              <div>
              <a href="#" className="btn-sm"><DeleteIcon className="font-size-18 text-light-grey"/></a>
              </div>
              </div>
           <div className=" text-right">
             <a href="#" className="btn text-white bg-primary mr-3">Review</a>
             <a href="#" className="btn border">Cancel</a>
           </div>
          </div>
        </div>
        </div>
        </>
    )
}


export default Segment01Transmission
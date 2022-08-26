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
import {Link} from 'react-router-dom'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { CommanComponents } from "components";
import AddIcon from '@mui/icons-material/Add';

function RepairOption01(){
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState('1');

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
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">OPERATION NO</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">JOB CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholdEr="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">DESCRIPTION</label>
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
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">DESCIPTION</label>
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
                <p className="font-size-12 font-weight-500 mb-2">OPERATION NO</p>
                 <h6 className="font-weight-600">001</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">JOB CODE</p>
                 <h6 className="font-weight-600">15</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">DESCRIPTION </p>
                 <h6 className="font-weight-600">Disassemble </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">COMPONENT CODE</p>
                 <h6 className="font-weight-600">3066</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">DESCRIPTION </p>
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
              
        </div>
        <div className="Add-new-segment-div p-3 border-radius-10 mb-3">
              {/* <Link to="/AddPartlist" className="btn bg-primary text-white mr-3">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add part list
                </Link> */}
                <Link to="/RepairServiceEstimate" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Service Estimate
                </Link>
                {/* <a className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Srvice Estimates
                </a> */}
               
        </div>
        </div>
        </div>
        </>
    )
}


export default RepairOption01
import React,{useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import {faShareAlt} from '@fortawesome/free-solid-svg-icons'
import {faUpload} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faClone} from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { MuiMenuComponent } from "pages/Operational";
import { CommanComponents } from "components";

function Segment01Disassemble(){

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
    return(
      <>
      <CommanComponents/>
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Repair Option</h5>
          <div className="d-flex justify-content-center align-items-center">
            <a href="#" className="ml-3 font-size-14" title="Share"><FontAwesomeIcon icon={faShareAlt} /></a>
            <a href="#" className="ml-3 font-size-14" title="Items to Review"><FontAwesomeIcon icon={faFolderPlus} /></a>
            <a href="#" className="ml-3 font-size-14" title="Upload"><FontAwesomeIcon icon={faUpload} /></a>
            <a href="#" className="ml-3 font-size-14" title="Delete"><FontAwesomeIcon icon={faTrashAlt} /></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><FontAwesomeIcon icon={faClone} /></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
           
          </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Segment 01- Disassemble</span></div>
              <div className="hr"></div>
              </h5>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">SEGMENT</p>
                 <h6 className="font-weight-600">01</h6>
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
                <p className="font-size-12 font-weight-500 mb-2">TITLE</p>
                 <h6 className="font-weight-600">Disassemble </h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">COMP CODE</p>
                 <h6 className="font-weight-600">300</h6>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group">
                <p className="font-size-12 font-weight-500 mb-2">DESCRIPTION </p>
                 <h6 className="font-weight-600">Transmission</h6>
                </div>
                </div>
              </div>
  
        </div>
        <div className="Add-new-segment-div p-3 border-radius-10">
        <Link to={"/RepairOption01"} className="btn bg-primary text-white">
        <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Opretion<span className="ml-2"><FontAwesomeIcon icon={faAngleDown} /></span>
          </Link>
         
        </div>
        </div>
        </div>
        </>
    )
}


export default Segment01Disassemble
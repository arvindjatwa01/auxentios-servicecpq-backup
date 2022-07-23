import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
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
import { CommanComponents } from "components";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

function RepairServiceEstimate(){
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
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
      <CommanComponents/>
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
          <h5 className="font-weight-600 mb-0">Service Estimate</h5>
          <div className="d-flex justify-content-center align-items-center">
          <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Item to Review"><img src={folderaddIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a>
            {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
            <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a>
           
          </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display:'contents'}}><span className="mr-3 white-space">Header</span></div>
              <div className="hr"></div>
              </h5>
              <div className="row mt-4">
              <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">REFERENCE ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">OPERATION ID</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">VALIDITY PERIOD</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PRIORITY INFORMATION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">SOURCE DESCRIPTION</label>
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
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">NET VALUE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">VERSION NO.</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">MACHINE NAME </label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">MACHINE MAKE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                  <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">MACHINE MODEL</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)"/>
                </div>
                </div>
                
              </div>
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
                <p className="font-size-12 font-weight-600 mb-2">MODEL</p>
                 <h6 className="font-weight-600">CAT</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">PREFIX</p>
                 <h6 className="font-weight-600">Customer 50%, Insurer 50%</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">MANUFACTURER</p>
                 <h6 className="font-weight-600">30days</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">PAYER </p>
                 <h6 className="font-weight-600">Standard</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">PAYMENT TERM</p>
                 <h6 className="font-weight-600">Standard</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">INCOTERM</p>
                 <h6 className="font-weight-600">01.10.2021 to 01.02.2022</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">SHIPPING CONDITION</p>
                 <h6 className="font-weight-600">Employee responsible</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">VALIDITY</p>
                 <h6 className="font-weight-600">Jorge Moya, Service Operation</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">CONTACT</p>
                 <h6 className="font-weight-600">Employee Responsible</h6>
                </div>
                </div>
                <div className="col-md-4 col-sm-4">
                <div class="form-group mt-3">
                <p className="font-size-12 font-weight-600 mb-2">REFERENCE</p>
                 <h6 className="font-weight-600">Jorge Moya, Service Operation</h6>
                </div>
                </div>
                <div className="col-md-12">
                <div class="form-group mt-3">
                <a href="#" className="btn bg-primary text-white"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add New</a>
                </div>
                </div>
              </div>
              <div className="Add-new-segment-div p-3 border-radius-10">
              <Link onClick={() => setOpen1(true)} className="btn bg-primary text-white mr-3">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Labor
                </Link>
          
        </div>
        </div>
        </div>
        <Modal show={open1} onHide={handleClose1} size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered>
        <Modal.Header closeButton>
          <Modal.Title className="font-size-14">1000-Engine|23-Replace Engine|Replace Engine</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 bg-white">
          <div className="ligt-greey-bg p-3">
            <div>
              <span className="mr-3">
              <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span  className="ml-2">Edit</span>
              </span>
              <span className="mr-3">
             < MonetizationOnOutlinedIcon className=" font-size-16"/>
             <span className="ml-2"> Adjust price</span>
              </span>
              <span className="mr-3">
                <FormatListBulletedOutlinedIcon className=" font-size-16"/>
                <span className="ml-2">Related part list(s)</span>
              </span>
              <span className="mr-3">
                <AccessAlarmOutlinedIcon className=" font-size-16"/>
                <span className="ml-2">Related service estimate(s)</span>
              </span>
              <span>
               <SellOutlinedIcon className=" font-size-16"/>
               <span className="ml-2">Split price</span>
              </span>
            </div>
          </div>
          <div>
            <div className="p-3">
              <div className="row mt-4">
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">LABOR CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="1000 ENGINE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">LABOR TYPE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0123 REPLACE"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QTY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace left side of the Engine"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="List Price"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$35000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXTENDED PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$10000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$5000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">% USAGE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EA"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TOTAL PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000"/>
                </div>
                </div>
                <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMMENTS</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE"/>
                </div>
                </div>
                {/* <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXTENDED PRICE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000"/>
                </div>
                </div> */}
                {/* <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PAYER TYPE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="CUSTOMER (100%)"/>
                </div>
                </div> */}
              </div>
            </div>
            <div className="m-3 text-right">
              <a href="#" onClick={()=>handleClose1()}  className="btn border mr-3 "> Cancel</a>
              <a href="#" className="btn text-white bg-primary">Save</a>
            </div>
          </div>
       
        </Modal.Body>
      </Modal>
        </div>
        </>
    )
}


export default RepairServiceEstimate
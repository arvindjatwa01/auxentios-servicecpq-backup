import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import deleteIcon from '../../assets/icons/svg/delete.svg'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const  ShoppingCartList=()=>{

  const [age, setAge] = React.useState('5');
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');

  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };


  const steps = [
    'Register',
    'Shop/Configure',
    'Add to cart',
    'Payment',
    
  ];
    return(
      <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
      <div class="container-fluid ">
      <Box className="mt-5" sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <div className="mt-4">
              <div className="row">
                  <div className="col-md-8 col-sm-8">
                      <div className="card" style={{overflow: "hidden"}}>
                          <h5 className="mb-0 bg-primary p-4 text-white">Shopping Cart</h5>
                          <div className="row p-4">
                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                            <div className="row">
                              <div className="col-md-4 col-sm-4">
                                <div className="w-100">
                                  <img src="./assets/images/gray.png"></img>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6">
                                <h6 className=""><b>Premium maintenance plan for Grader</b></h6>
                                <p className="mt-4">MODEL ABC12345</p>
                                <div className="mt-4" style={{display: "block"}}>
                                  <a href="#" className="btn-sm bg-primary text-white mr-3">Quantity <KeyboardArrowDownIcon /></a>
                                  <a href="#" className="btn-sm text-primary mr-3" style={{border:"1px solid #872ff7"}}>Remove </a>
                                  <a href="#" className="btn-sm text-primary" style={{border:"1px solid #872ff7"}}>Edit </a>
                                </div>
                              </div>
                              <div className="col-md-2 col-sm-2">
                                <h5 style={{fontSize:"25px", fontWeight:"600"}}>$38</h5>
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                            <div className="row">
                              <div className="col-md-4 col-sm-4">
                                <div className="w-100">
                                  <img src="./assets/images/gray.png"></img>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6">
                                <h6 className=""><b>Premium maintenance plan for Grader</b></h6>
                                <p className="mt-4">MODEL ABC12345</p>
                                <div className="mt-4" style={{display: "block"}}>
                                  <a href="#" className="btn-sm bg-primary text-white mr-3">Quantity <KeyboardArrowDownIcon /></a>
                                  <a href="#" className="btn-sm text-primary mr-3" style={{border:"1px solid #872ff7"}}>Remove </a>
                                  <a href="#" className="btn-sm text-primary" style={{border:"1px solid #872ff7"}}>Edit </a>
                                </div>
                              </div>
                              <div className="col-md-2 col-sm-2">
                                <h5 style={{fontSize:"25px", fontWeight:"600"}}>$38</h5>
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                            <div className="row">
                              <div className="col-md-4 col-sm-4">
                                <div className="w-100">
                                  <img src="./assets/images/gray.png"></img>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6">
                                <h6 className=""><b>Premium maintenance plan for Grader</b></h6>
                                <p className="mt-4">MODEL ABC12345</p>
                                <div className="mt-4" style={{display: "block"}}>
                                  <a href="#" className="btn-sm bg-primary text-white mr-3">Quantity <KeyboardArrowDownIcon /></a>
                                  <a href="#" className="btn-sm text-primary mr-3" style={{border:"1px solid #872ff7"}}>Remove </a>
                                  <a href="#" className="btn-sm text-primary" style={{border:"1px solid #872ff7"}}>Edit </a>
                                </div>
                              </div>
                              <div className="col-md-2 col-sm-2">
                                <h5 style={{fontSize:"25px", fontWeight:"600"}}>$38</h5>
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                            <div className="row">
                              <div className="col-md-4 col-sm-4">
                                <div className="w-100">
                                  <img src="./assets/images/gray.png"></img>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6">
                                <h6 className=""><b>Premium maintenance plan for Grader</b></h6>
                                <p className="mt-4">MODEL ABC12345</p>
                                <div className="mt-4" style={{display: "block"}}>
                                  <a href="#" className="btn-sm bg-primary text-white mr-3">Quantity <KeyboardArrowDownIcon /></a>
                                  <a href="#" className="btn-sm text-primary mr-3" style={{border:"1px solid #872ff7"}}>Remove </a>
                                  <a href="#" className="btn-sm text-primary" style={{border:"1px solid #872ff7"}}>Edit </a>
                                </div>
                              </div>
                              <div className="col-md-2 col-sm-2">
                                <h5 style={{fontSize:"25px", fontWeight:"600"}}>$38</h5>
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                            <div className="row">
                              <div className="col-md-4 col-sm-4">
                                <div className="w-100">
                                  <img src="./assets/images/gray.png"></img>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6">
                                <h6 className=""><b>Premium maintenance plan for Grader</b></h6>
                                <p className="mt-4">MODEL ABC12345</p>
                                <div className="mt-4" style={{display: "block"}}>
                                  <a href="#" className="btn-sm bg-primary text-white mr-3">Quantity <KeyboardArrowDownIcon /></a>
                                  <a href="#" className="btn-sm text-primary mr-3" style={{border:"1px solid #872ff7"}}>Remove </a>
                                  <a href="#" className="btn-sm text-primary" style={{border:"1px solid #872ff7"}}>Edit </a>
                                </div>
                              </div>
                              <div className="col-md-2 col-sm-2">
                                <h5 style={{fontSize:"25px", fontWeight:"600"}}>$38</h5>
                              </div>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                            <div className="row">
                              <div className="col-md-4 col-sm-4">
                                <div className="w-100">
                                  <img src="./assets/images/gray.png"></img>
                                </div>
                              </div>
                              <div className="col-md-6 col-sm-6">
                                <h6 className=""><b>Premium maintenance plan for Grader</b></h6>
                                <p className="mt-4">MODEL ABC12345</p>
                                <div className="mt-4" style={{display: "block"}}>
                                  <a href="#" className="btn-sm bg-primary text-white mr-3">Quantity <KeyboardArrowDownIcon /></a>
                                  <a href="#" className="btn-sm text-primary mr-3" style={{border:"1px solid #872ff7"}}>Remove </a>
                                  <a href="#" className="btn-sm text-primary" style={{border:"1px solid #872ff7"}}>Edit </a>
                                </div>
                              </div>
                              <div className="col-md-2 col-sm-2">
                                <h5 style={{fontSize:"25px", fontWeight:"600"}}>$38</h5>
                              </div>
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-4 col-sm-4">
                      <div className="card" style={{overflow:"hidden"}}>
                         <p className="p-4 bg-primary text-white" >Your Total Price</p>
                         <div className="px-4 py-2 d-flex justify-content-between" >
                             <p className="mb-0">Currency</p>
                             <h6 className="mb-0">USD</h6>
                         </div>
                      </div>
                      <div className="card p-4">
                            <h5 className="mb-0">Summary</h5>
                            <div className="mt-5 card p-4 bg-primary">
                                <div className="row">
                                    <div className="col-md-5">
                                        <h6 className="mb-0 text-white">Your total price</h6>
                                        <h3 className="mb-0 mt-3 text-white">$400.80</h3>
                                        <p className="mb-0 text-white mt-5">Redeem promo code</p>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-6">
                                                 <p className="text-white mb-0">Currency</p>
                                                 <p className="text-white mt-2 mb-0">Price</p>
                                                 <p className="text-white mt-2 mb-0">Margin</p>
                                            </div>
                                            <div className="col-md-6">
                                                 <p className="text-white mb-0">USD</p>
                                                 <p className="text-white mt-2 mb-0">$300</p>
                                                 <p className="text-white mt-2 mb-0">$30</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">CHOICE OF SPARE PARTS</h5>
                          </div>
                          <div className="bg-white p-3">
                            <FormGroup>
                              <FormControlLabel control={<Switch defaultChecked />} label="With Spare Parts" />
                              <FormControlLabel control={<Switch />} label="Without Spare Parts" />
                              <FormControlLabel control={<Switch />} label="Only Spare Parts" />
                            </FormGroup>
                          </div>
                          <div className="bg-light-blue p-3">
                            <h5 className="font-weight-normal text-violet mb-0">SERVICES</h5>
                          </div>
                          <div className="bg-white p-3">
                            <div className=" d-flex justify-content-between align-items-center">
                              <div>
                                <FormGroup>
                                  <FormControlLabel control={<Switch />} label=" Changee Oil and Filter" />
                                </FormGroup>
                              </div>
                              <div>
                                <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                              </div>
                            </div>
                            <h5 className="d-flex align-items-center mb-0"><div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Optianal services</span></div><div className="hr"></div></h5>
                            <FormGroup>
                              <FormControlLabel control={<Switch />} label="Air Filter Replacement" />
                              <FormControlLabel control={<Switch />} label="Cabin Air Filter" />
                              <FormControlLabel control={<Switch />} label="Rotete Tires" />
                            </FormGroup>
                            <h5 className="d-flex align-items-center mb-0"><div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Includes</span></div><div className="hr"></div></h5>
                            <div className="mt-3">
                              <h6><a href="#" className="btn-sm text-white mr-2" style={{ background: '#79CBA2' }}>Free</a> 50 Point Inspection</h6>
                              <h6 className="mt-3"><a href="#" className="btn-sm text-white mr-2 " style={{ background: '#79CBA2' }}>Free</a> Service Report</h6>
                            </div>
                            <div className=" d-flex justify-content-between mt-4">
                              <div>
                                <a href="#" className="btn text-violet bg-light-blue"><b><span className="mr-2">+</span>Add more services</b></a>
                              </div>
                              <div>
                                <a href="#" className="btn text-violet"><b>I Have Parts</b></a>
                              </div>
                            </div>
                          </div>
                    
                         
                      </div>
                  </div>
              </div>
              <div>
              <a href="/ReviewOrder" class="btn bg-primary text-white pull-right">Review</a>
              </div>
          </div>
        </div>
      </div>
    </>
    )
}

export default ShoppingCartList
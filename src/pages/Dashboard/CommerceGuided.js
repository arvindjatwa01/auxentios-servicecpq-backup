import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const  CommerceGuided=()=>{

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
    'Login',
    'Find solutions',
    'Add to cart',
    'Review',
    'Order',
    
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
          <div className="mt-5">
            <h4>How is the solution for?</h4>
          </div>
          <div className="mt-5 mb-5">
              <div className="row">
                 <div className="col-md-4">
                    <div className="card p-3">
                    <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="defaultUnchecked" name="defaultExampleRadios"></input>
                    <label class="custom-control-label" for="defaultUnchecked"></label>
                    </div>
                    <h5 className="my-4">Customer Segment 1</h5>
                    </div>
                 </div>
                 <div className="col-md-4">
                    <div className="card p-3">
                    <div class="custom-control custom-radio">
                    <input type="radio" class="custom-control-input" id="defaultChecked" name="defaultExampleRadios" checked></input>
                    <label class="custom-control-label" for="defaultChecked"></label>
                    </div>
                    <h5 className="my-4">Customer Segment 2</h5>
                    </div>
                 </div>
              </div>
          </div>
          <a href="/CommerceGuidedQuestions" className="btn bg-primary text-white pull-right mt-5">Finish</a>
        </div>
      </div>
    </>
    )
}

export default CommerceGuided
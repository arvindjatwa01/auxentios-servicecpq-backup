import React,{useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Select from 'react-select';
import { bindActionCreators } from "redux"
import { actionCreator } from "../../redux/index"
import { useSelector, useDispatch } from 'react-redux'

var makeKeyValue = []
var modelKeyValue = []
var prefixKeyValue = []

const  CommerceGuidedQuestions=()=>{

  const [age, setAge] = React.useState('5');
  const [age1, setAge1] = React.useState('5');
  const [age2, setAge2] = React.useState('5');
  const [modelData, setModelData] = useState('');
  const [prefixData, setPrefixData] = useState('');
  const handleChangedrop = (event) => {
    setAge(event.target.value);
  };
  const handleChangedrop1 = (event) => {
    setAge1(event.target.value);
  };
  const handleChangedrop2 = (event) => {
    setAge2(event.target.value);
  };
  const [makeData, setMakeData] = useState('');
  const handleSelectChange = (e) => {
    if (e != null) {
        if (e.fieldName == "make") {
            console.log("makeee is call")
            setMakeData(e)
        } else if (e.fieldName == "model") {
            console.log("model is call")
            setModelData(e)
        } else {
            console.log("prefix is call")
            setPrefixData(e)
        }
        var dict = {
            "key": -1,
            "fieldName": e.fieldName,
            "fieldValue": e.value,
            "value": ""
        }
        addQuestion(dict)
    }
}
const [prefixKeyValuePair, setPrefixKeyValuePair] = useState([])
const dispatch = useDispatch()
const { addQuestion } = bindActionCreators(actionCreator, dispatch)
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
            <h4>If you know the make and model choose the options</h4>
          </div>
          <div className="card option-box">
                    <div className="header-box">
                        <h6>Choose one option from the following</h6>
                    </div>
                    <div className="row mt-4">
                        {/* {dropdownList} */}
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">MAKE</label>
                                <Select
                                    // defaultValue={selectedOption}
                                    value={makeData}
                                    onChange={handleSelectChange}
                                    options={makeKeyValue}
                                    placeholder="--Select Make--"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">MODEL</label>
                                <Select
                                    // defaultValue={selectedOption}
                                    value={modelData}
                                    onChange={handleSelectChange}
                                    options={modelKeyValue}
                                    placeholder="--Select Model--"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">PREFIX</label>
                                <Select
                                    // defaultValue={selectedOption}
                                    value={prefixData}
                                    onChange={handleSelectChange}
                                    options={prefixKeyValuePair}
                                    placeholder="--Select Prefix--"
                                />
                            </div>
                        </div>
                    </div>
                </div>
          <a href="/CommercePageQuestion" className="btn bg-primary text-white pull-right mt-5">Finish</a>
        </div>
      </div>
    </>
    )
}

export default CommerceGuidedQuestions
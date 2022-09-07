import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { RadioGroupComponent } from '../Common/index'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from "redux"
import { actionCreator } from "../../redux/index"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CabinIcon from '@mui/icons-material/Cabin';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import { getMakeKeyValue, getModelKeyValue, getPrefixKeyValue } from "../../services/index"

var makeKeyValue = []
var modelKeyValue = []
var prefixKeyValue = []



const InitQuestion = () => {





    const [defaultValue, setDefaultValue] = useState("")

    const [checkedValue, setCheckedValue] = useState({})

    const state = useSelector((state) => state);



    const dispatch = useDispatch()

    const { addQuestion } = bindActionCreators(actionCreator, dispatch)

    const handleParentCallback = (value) => {
        var dict = {
            "key": 0,
            "fieldName": "",
            "fieldValue": value.value,
            "value": value.key
        }
        addQuestion(dict)
        setCheckedValue(dict)
        // props.parentCallback(dict)
    }

    useEffect(() => {


        if (state.guidedSolution?.guidedQuestions.length > 0) {
            setDefaultValue(state.guidedSolution?.guidedQuestions[0].value)
        } else {
            var dict = {
                "key": 0,
                "fieldName": "",
                "fieldValue": "",
                "value": ""
            }
            addQuestion(dict)
        }
    }, []);


    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    {/* <p>QUESTION 01/10</p> */}
                    <h4>I am looking solution for</h4>
                </div>
            </div>
            <RadioGroupComponent
                withDescription={false}
                dValue={defaultValue}
                parentCallback={handleParentCallback}
                testingData="01"
                addQuestion={addQuestion}
                checkedValue={checkedValue}
                formControlLabels={[{
                    "key": "New equipment",
                    "value": 0
                },
                {
                    "key": "Maintenance & Repair",
                    "value": 1
                }]} />
        </div>
    </>
}

const Question1 = (props) => {
    // console.log("Question 1 Props : ", props)

    const [defaultValue, setDefaultValue] = useState("")

    const state = useSelector((state) => state);


    const dispatch = useDispatch()

    const { addQuestion } = bindActionCreators(actionCreator, dispatch)

    const handleParentCallback = (value) => {
        var dict = {
            "key": 1,
            "fieldName": state.guidedSolution?.fieldName,
            "fieldValue": value.value,
            "value": value.key
        }
        addQuestion(dict)
        // props.parentCallback(dict)
    }

    useEffect(() => {

        if (state.guidedSolution?.guidedQuestions.length > 1) {
            setDefaultValue(state.guidedSolution?.guidedQuestions[1].value)
        } else {
            var dict = {
                "key": 1,
                "fieldName": "",
                "fieldValue": "",
                "value": ""
            }
            addQuestion(dict)
        }
    }, []);

    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    <p>QUESTION 01/10</p>
                    <h4>{state.guidedSolution?.questionHeader}</h4>
                </div>
            </div>
            <RadioGroupComponent
                testingData="02"
                addQuestion={addQuestion}
                withDescription={false}
                dValue={defaultValue}
                parentCallback={handleParentCallback}
                formControlLabels={state.guidedSolution?.formLabels} />
        </div>
    </>
}

// const Question2 = (props) => {
//   const [defaultValue, setDefaultValue] = useState("")

//   const state = useSelector((state) => state);

//   const dispatch = useDispatch()

//   const { addQuestion } = bindActionCreators(actionCreator, dispatch)


//   const handleParentCallback = (value) => {
//     var dict = {
//       "key": 2,
//       "value": value
//     }
//     addQuestion(dict)
//   }
//   useEffect(() => {
//     if (state.guidedSolution?.guidedQuestions.length > 1) {
//       setDefaultValue(state.guidedSolution?.guidedQuestions[1].value)
//     }
//     else {
//       var dict = {
//         "key": 2,
//         "value": ""
//       }
//       addQuestion(dict)
//     }
//   }, []);

//   return <>
//     <div className=" mt-3 p-3">
//       <div className="d-flex">
//         <div className="col-12">
//           <p>QUESTION 02/10</p>
//           <h4> What maintenence or repair solution you want to explore?</h4>
//         </div>
//       </div>
//       <RadioGroupComponent withDescription={false} dValue={defaultValue} parentCallback={handleParentCallback} formControlLabels={["Standard Rapair or Replacement", "Routine Maintenance Tasks", "Service Contracts or Warranty"]} />
//     </div>
//   </>;
// }

const Question2 = (props) => {
    const [defaultValue, setDefaultValue] = useState("")
    const [formLbls, setFormLbls] = useState([])
    const state = useSelector((state) => state);

    const dispatch = useDispatch()

    const { addQuestion, addFormControlLabel, addWithDescription, addQuestionHeader, addWithDropdown } = bindActionCreators(actionCreator, dispatch)
    const handleParentCallback = (value) => {
        var dict = {
            "key": 2,
            "fieldName": state.guidedSolution?.fieldName,
            "fieldValue": value.value,
            "value": value.key
        }
        addQuestion(dict)
    }
    useEffect(() => {
        if (state.guidedSolution?.guidedQuestions.length > 2) {
            setDefaultValue(state.guidedSolution?.guidedQuestions[2].value)
            setFormLbls(state.guidedSolution?.prevFormLabels)
            addFormControlLabel(state.guidedSolution?.prevFormLabels)
            addWithDropdown(state.guidedSolution?.prevWithDropDown)
            addWithDescription(state.guidedSolution?.prevWithDescription)
            addQuestionHeader(state.guidedSolution?.prevQuestionHeader)
        } else {
            var dict = {
                "key": 2,
                "fieldName": "",
                "fieldValue": "",
                "value": ""
            }
            addQuestion(dict)
        }
    }, []);

    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    <p>QUESTION 02/10</p>
                    <h4> {state.guidedSolution?.questionHeader}</h4>
                </div>
            </div>
            <RadioGroupComponent
                testingData="03"
                withDescription={false}
                dValue={defaultValue}
                parentCallback={handleParentCallback}
                formControlLabels={state.guidedSolution?.formLabels} />
        </div>
    </>;
}

const Question3 = (props) => {

    const [defaultValue, setDefaultValue] = useState("")
    const state = useSelector((state) => state);

    const [withDropDown, setWithDropDown] = useState(false)


    const dispatch = useDispatch()

    const { addQuestion, addWithDescription, addQuestionHeader, addWithDropdown } = bindActionCreators(actionCreator, dispatch)

    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownList, setDropdownList] = useState([]);

    const [makeKeyValuePair, setMakeKeyValuePair] = useState([])
    const [modelKeyValuePair, setModelKeyValuePair] = useState([])
    const [prefixKeyValuePair, setPrefixKeyValuePair] = useState([])

    const handleParentCallback = (value) => {
        var dict = {
            "key": 3,
            "fieldName": state.guidedSolution?.fieldName,
            "fieldValue": value.value,
            "value": value.key
        }
        addQuestion(dict)
    }

    const handleSelectChange = (e) => {
        if (e != null) {
            var dict = {
                "key": -1,
                "fieldName": e.fieldName,
                "fieldValue": e.value,
                "value": ""
            }
            addQuestion(dict)
        }
    }

    useEffect(() => {
        if (state.guidedSolution?.guidedQuestions.length > 3) {
            setDefaultValue(state.guidedSolution?.guidedQuestions[3].value)
            // setFormLbls(state.guidedSolution?.prevFormLabels)
            addWithDropdown(state.guidedSolution?.prevWithDropDown)
            addWithDescription(state.guidedSolution?.prevWithDescription)
            addQuestionHeader(state.guidedSolution?.prevQuestionHeader)
        } else {

            if (state.guidedSolution?.withDropDown) {

            } else {

                var dict = {
                    "key": 3,
                    "fieldName": "",
                    "fieldValue": "",
                    "value": ""
                }
                addQuestion(dict)
            }
        }
        var tempDropdownList = []
        getMakeKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d,
                label: d,
                fieldName: 'make'
            }));
            makeKeyValue = options;
            // setMakeKeyValuePair(options)
            getModelKeyValue().then((res1) => {
                console.log(res1)
                const options1 = res1.map((d) => ({
                    value: d,
                    label: d,
                    fieldName: 'model'
                }));
                modelKeyValue = options1
                // setModelKeyValuePair(options1)
                getPrefixKeyValue().then((res2) => {
                    console.log(res2)
                    const options2 = res2.map((d) => ({
                        value: d,
                        label: d,
                        fieldName: 'prefix'
                    }));
                    prefixKeyValue = options2
                    // setPrefixKeyValuePair(options2)
                    state.guidedSolution?.dropdownFormLbls.map((opt) => {
                        if (opt.secondValue == 'Make') {
                            tempDropdownList.push(<div className="col-md-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">{opt.secondValue}</label>
                                    <Select
                                        onChange={handleSelectChange}
                                        // value={makeData}
                                        options={makeKeyValue}
                                        placeholder="--Select Make--"
                                    />
                                </div>
                            </div>)
                        } else if (opt.secondValue == "Model") {
                            tempDropdownList.push(<div className="col-md-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">{opt.secondValue}</label>
                                    <Select
                                        onChange={handleSelectChange}
                                        // value={modelData}
                                        options={modelKeyValue}
                                        placeholder="--Select Model--"
                                    />
                                </div>
                            </div>)
                        } else if (opt.secondValue == "Prefix") {
                            tempDropdownList.push(<div className="col-md-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">{opt.secondValue}</label>
                                    <Select
                                        onChange={handleSelectChange}
                                        // value={prefixData}
                                        options={prefixKeyValue}
                                        placeholder="--Select Prefix--"
                                    />
                                </div>
                            </div>)
                        }
                    })
                    setDropdownList(tempDropdownList)
                }).catch((err) => {
                    alert(err)
                })
            }).catch((err) => {
                alert(err)
            })
        }).catch((err) => {
            alert(err)
        })


        // setWithDropDown(state.guidedSolution?.withDropDown)
    }, []);

    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    <p>QUESTION 03/10</p>
                    <h4> {state.guidedSolution?.questionHeader}</h4>
                </div>
            </div>
            {state.guidedSolution?.withDropDown
                ?
                <div className="card option-box">
                    <div className="header-box">
                        <h6>Choose one option from the following</h6>
                    </div>
                    <div className="row mt-4">
                        {dropdownList}
                        {/* <div className="col-md-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">MAKE</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="1000-ENGINE"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">MODEL</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="ELECTRICAL"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">PREFIX</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="ALTERNATOR"
                />
              </div>
            </div> */}
                    </div>
                </div>
                :
                <RadioGroupComponent testingData="04" withDescription={state.guidedSolution?.withDescription} dValue={defaultValue} parentCallback={handleParentCallback} formControlLabels={state.guidedSolution?.formLabels} />
            }

        </div>
    </>;
}
const Question4 = (props) => {

    const [defaultValue, setDefaultValue] = useState("")
    const state = useSelector((state) => state);
    const [dropdownList, setDropdownList] = useState([]);
    const [withDropDown, setWithDropDown] = useState(false)


    const dispatch = useDispatch()

    const { addQuestion, addWithDescription, addQuestionHeader, addWithDropdown } = bindActionCreators(actionCreator, dispatch)

    const options12 = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];
    const [makeData, setMakeData] = useState(null);
    const [modelData, setModelData] = useState(null);
    const [prefixData, setPrefixData] = useState(null);

    const handleParentCallback = (value) => {
        var dict = {
            "key": 4,
            "fieldName": state.guidedSolution?.fieldName,
            "fieldValue": value.value,
            "value": value.key
        }
        addQuestion(dict)
    }

    const handleSelectChange = (e) => {
        if (e != null) {
            var dict = {
                "key": -1,
                "fieldName": e.fieldName,
                "fieldValue": e.value,
                "value": ""
            }
            addQuestion(dict)
        }
        if (e.fieldName == 'make') {
            setMakeData(e)
        } else if (e.fieldName == 'model') {
            setModelData(e)
        } else if (e.fieldName == 'prefix') {
            setPrefixData(e)
        }
    }

    useEffect(() => {
        if (state.guidedSolution?.guidedQuestions.length > 4) {
            setDefaultValue(state.guidedSolution?.guidedQuestions[4].value)
            // setFormLbls(state.guidedSolution?.prevFormLabels)
            addWithDropdown(state.guidedSolution?.prevWithDropDown)
            addWithDescription(state.guidedSolution?.prevWithDescription)
            addQuestionHeader(state.guidedSolution?.prevQuestionHeader)
        } else {
            if (state.guidedSolution?.withDropDown) {

            } else {

                var dict = {
                    "key": 4,
                    "fieldName": "",
                    "fieldValue": "",
                    "value": ""
                }
                addQuestion(dict)
            }
        }
        var tempDropdownList = []
        getMakeKeyValue().then((res) => {
            console.log(res)
            const options = res.map((d) => ({
                value: d,
                label: d,
                fieldName: 'make'
            }));
            makeKeyValue = options;
            // setMakeKeyValuePair(options)
            getModelKeyValue().then((res1) => {
                console.log(res1)
                const options1 = res1.map((d) => ({
                    value: d,
                    label: d,
                    fieldName: 'model'
                }));
                modelKeyValue = options1
                // setModelKeyValuePair(options1)
                getPrefixKeyValue().then((res2) => {
                    console.log(res2)
                    const options2 = res2.map((d) => ({
                        value: d,
                        label: d,
                        fieldName: 'prefix'
                    }));
                    prefixKeyValue = options2
                    // setPrefixKeyValuePair(options2)
                    state.guidedSolution?.dropdownFormLbls.map((opt) => {
                        if (opt.secondValue == 'Make') {
                            tempDropdownList.push(<div className="col-md-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">{opt.secondValue}</label>
                                    <Select
                                        onChange={handleSelectChange}
                                        // value={makeData}
                                        options={makeKeyValue}
                                        placeholder="--Select Make--"
                                    />
                                </div>
                            </div>)
                        } else if (opt.secondValue == "Model") {
                            tempDropdownList.push(<div className="col-md-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">{opt.secondValue}</label>
                                    <Select
                                        onChange={handleSelectChange}
                                        // value={modelData}
                                        options={modelKeyValue}
                                        placeholder="--Select Model--"
                                    />
                                </div>
                            </div>)
                        } else if (opt.secondValue == "Prefix") {
                            tempDropdownList.push(<div className="col-md-4">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">{opt.secondValue}</label>
                                    <Select
                                        onChange={handleSelectChange}
                                        // value={prefixData}
                                        options={prefixKeyValue}
                                        placeholder="--Select Prefix--"
                                    />
                                </div>
                            </div>)
                        }
                    })
                    setDropdownList(tempDropdownList)
                }).catch((err) => {
                    alert(err)
                })
            }).catch((err) => {
                alert(err)
            })
        }).catch((err) => {
            alert(err)
        })

        // state.guidedSolution?.dropdownFormLbls.map((opt) => {
        //   tempDropdownList.push(<div className="col-md-4">
        //     <div className="form-group">
        //       <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">{opt.secondValue}</label>
        //       <Select
        //         defaultValue={selectedOption}
        //         value={selectedOption}
        //         onChange={handleSelectChange}
        //         options={options}
        //         placeholder="Select"
        //       />
        //     </div>
        //   </div>)
        // })
        // setDropdownList(tempDropdownList)
        // setWithDropDown(state.guidedSolution?.withDropDown)
    }, []);

    return <>
        {state.guidedSolution?.isResultFound ?
            <>
                <ResultQuestion />
            </>
            :
            <div className=" mt-3 p-3">
                <div className="d-flex">
                    <div className="col-12">
                        <p>QUESTION 04/10</p>
                        <h4> {state.guidedSolution?.questionHeader}</h4>
                    </div>
                </div>
                {state.guidedSolution?.withDropDown
                    ?
                    <div className="card option-box">
                        <div className="header-box">
                            <h6>Choose one option from the following</h6>
                        </div>
                        <div className="row mt-4">
                            {dropdownList}
                            {/* <div className="col-md-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">MAKE</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="1000-ENGINE"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">MODEL</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="ELECTRICAL"
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">PREFIX</label>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="ALTERNATOR"
                />
              </div>
            </div> */}
                        </div>
                    </div>
                    :
                    <RadioGroupComponent testingData="05" withDescription={state.guidedSolution?.withDescription} dValue={defaultValue} parentCallback={handleParentCallback} formControlLabels={state.guidedSolution?.formLabels} />
                }

            </div>
        }

    </>;
}
const Question5 = (props) => {

    const [defaultValue, setDefaultValue] = useState("")
    const state = useSelector((state) => state);

    const dispatch = useDispatch()

    const { addQuestion } = bindActionCreators(actionCreator, dispatch)

    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);

    const handleParentCallback = (value) => {
        var dict = {
            "key": 5,
            "value": value
        }
        addQuestion(dict)
    }
    useEffect(() => {
        if (props.defaultValue != null) {
            setDefaultValue(props.defaultValue.value)
        } else {
            var dict = {
                "key": 5,
                "fieldName": "",
                "fieldValue": "",
                "value": ""
            }
            addQuestion(dict)
        }
    }, []);

    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    <p>QUESTION 05/10</p>
                    <h4> {state.guidedSolution?.questionHeader}</h4>
                </div>
            </div>
            {state.guidedSolution?.withDropDown
                ?
                <div className="card option-box">
                    <div className="header-box">
                        <h6>Choose one option from the following</h6>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">SYSTEM</label>
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder="1000-ENGINE"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">SUB-SYSTEM</label>
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder="ELECTRICAL"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">COMPONENT</label>
                                <Select
                                    defaultValue={selectedOption}
                                    onChange={setSelectedOption}
                                    options={options}
                                    placeholder="ALTERNATOR"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div class="contain-slider mt-3">
                    <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                        <div class='item border-none'>
                            <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>For Cabin</a>
                            <h4 className='text-red mt-3'><b>$4,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with AC</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                            <h4 className='text-red mt-3'><b>$6,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Safety</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Two rear view cameras</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Two fog lamps</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            {/* <a href='#' className='bg-yellow text-white btn'>CV agreement</a> */}
                            <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Comprehensive</a>
                            <h4 className='text-red mt-3'><b>$20,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Covers solution for cabin,<br />safety and frame</li>

                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>
                        <div class='item border-none'>
                            <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                            <h4 className='text-red mt-3'><b>$6,000</b></h4>
                            <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                                <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                            </ul>
                            <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                        </div>

                    </OwlCarousel>
                </div>
            }

        </div>
    </>;
}

const Question6 = (props) => {
    const [defaultValue, setDefaultValue] = useState("")

    const state = useSelector((state) => state);

    const dispatch = useDispatch()

    const { addQuestion } = bindActionCreators(actionCreator, dispatch)
    const handleParentCallback = (value) => {
        var dict = {
            "key": 6,
            "value": value
        }
        addQuestion(dict)
    }
    useEffect(() => {
        if (props.defaultValue != null) {
            setDefaultValue(props.defaultValue.value)
        } else {
            var dict = {
                "key": 6,
                "fieldName": "",
                "fieldValue": "",
                "value": ""
            }
            addQuestion(dict)
        }
    }, []);

    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    <p>QUESTION 06/10</p>
                    <h4> {state.guidedSolution?.questionHeader}</h4>
                </div>
            </div>
            <div class="contain-slider mt-3">
                <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                    <div class='item border-none'>
                        <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>For Cabin</a>
                        <div className="text-red mt-3">
                            <b className="font-size-18">$4,000</b>
                            <span><b>per equipment for 2000 hours</b></span>
                        </div>
                        {/* <h4 className='text-red mt-3'></h4> */}
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with AC</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                        <h4 className='text-red mt-3'><b>$6,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Safety</a>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Two rear view cameras</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Two fog lamps</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        {/* <a href='#' className='bg-yellow text-white btn'>CV agreement</a> */}
                        <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Comprehensive</a>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Covers solution for cabin,<br />safety and frame</li>

                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                        <h4 className='text-red mt-3'><b>$6,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>

                </OwlCarousel>
            </div>
        </div>
    </>;
}
const Header = (props) => {
    const [defaultValue, setDefaultValue] = useState("")

    const state = useSelector((state) => state);

    const dispatch = useDispatch()

    const { addQuestion } = bindActionCreators(actionCreator, dispatch)
    const handleParentCallback = (value) => {
        var dict = {
            "key": 6,
            "value": value
        }
        addQuestion(dict)
    }
    useEffect(() => {
        if (props.defaultValue != null) {
            setDefaultValue(props.defaultValue.value)
        } else {
            var dict = {
                "key": 6,
                "value": ""
            }
            addQuestion(dict)
        }
    }, []);

    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    <p>QUESTION 01/10</p>
                    <h4>Fill in the header details</h4>
                </div>
            </div>
            <div className="card p-4 mt-5">
                <h5 className="d-flex align-items-center mb-0">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Header</span></div>
                    <div className="hr"></div>
                </h5>
                <div className="row mt-4">
                    <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">CUSTOMER #</label>
                            <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">REQUESTED NAME</label>
                            <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">REQUESTER EMAIL</label>
                            <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500" htmlFor="exampleInputEmail1">SOLUTION DESCRIPTION</label>
                            <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
const ResultQuestion = (props) => {
    const [defaultValue, setDefaultValue] = useState("")

    const state = useSelector((state) => state);

    const dispatch = useDispatch()

    const { addQuestion } = bindActionCreators(actionCreator, dispatch)
    const handleParentCallback = (value) => {
        var dict = {
            "key": 6,
            "value": value
        }
        addQuestion(dict)
    }
    useEffect(() => {
        if (props.defaultValue != null) {
            setDefaultValue(props.defaultValue.value)
        } else {
            var dict = {
                "key": 6,
                "value": ""
            }
            addQuestion(dict)
        }
    }, []);

    return <>
        <div className=" mt-3 p-3">
            <div className="d-flex">
                <div className="col-12">
                    <p>QUESTION 05/10</p>
                    <h4> {state.guidedSolution?.questionHeader}</h4>
                </div>
            </div>
            <div class="contain-slider mt-3">
                <OwlCarousel items={4} className='owl-theme' loop margin={10} nav>
                    <div class='item border-none'>
                        <a href='#' className='bg-primary text-white btn'><CabinIcon className=" font-size-16 mr-2"></CabinIcon>For Cabin</a>
                        <h4 className='text-red mt-3'><b>$4,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with AC</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Fitted with...</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                        <h4 className='text-red mt-3'><b>$6,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Safety</a>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Two rear view cameras</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Two fog lamps</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        {/* <a href='#' className='bg-yellow text-white btn'>CV agreement</a> */}
                        <a href='#' className='bg-green-light text-white btn'><CoronavirusOutlinedIcon className=" font-size-16 mr-2"></CoronavirusOutlinedIcon>For Comprehensive</a>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Covers solution for cabin,<br />safety and frame</li>

                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>
                    <div class='item border-none'>
                        <a href='#' className=' bg-yellow  text-white btn'> <CallOutlinedIcon className=" font-size-16 mr-2"></CallOutlinedIcon>For Frame</a>
                        <h4 className='text-red mt-3'><b>$6,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Outside chroming</li>
                            <li className='mt-3' style={{ listStyle: 'disc' }}>Ladder</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn"><ShoppingCartOutlinedIcon className=" font-size-16 mr-2"></ShoppingCartOutlinedIcon>Add to Cart</a>
                    </div>

                </OwlCarousel>
            </div>
        </div>
    </>;
}




export {
    InitQuestion, Question1, Question2, Question3, Question4, Question5, Question6, Header, ResultQuestion
};

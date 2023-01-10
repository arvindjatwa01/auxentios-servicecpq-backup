import React, { useEffect, useState } from "react";
import Select from "react-select";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormControlLabel, Switch } from "@material-ui/core";
import {
  Switch as Switch1,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";

import { useDispatch, useSelector } from "react-redux";

import {
  itemCreation,
  updatePortfolio,
  getPortfolioCommonConfig,
  portfolioItemPriceSjid,
  getItemPriceData,
  getSolutionPriceCommonConfig,
} from "../../services/index";

import {
  taskActions,
} from "./customerSegment/strategySlice";


const PriceCalculator = (props) => {
  const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
  const [priceCurrencyKeyValue, setPriceCurrencyKeyvalue] = useState([]);
  const [priceTypeKeyValue, setPriceTypeKeyValue] = useState([]);
  const [priceHeadTypeKeyValue, setPriceHeadTypeKeyValue] = useState([]);
  const [needFlatOrAdjustedPrice, setNeedFlatOrAdjustedPrice] = useState(false);

  const [additionalPriceHeadTypeKeyValue, setAdditionalPriceHeadTypeKeyValue] = useState([
    // { label: "Surcharge Percentage", value: "PERCENTAGE" },
    // { label: "Surcharge Dollar", value: "ABSOLUTE", },
    { label: "Surcharge %", value: "PERCENTAGE" },
    { label: "Surcharge $", value: "ABSOLUTE", },
  ])

  // const [priceCalculator, setPriceCalculator] = useState({
  //   priceMethod: "",
  //   listPrice: "",
  //   currency: "",
  //   priceAdditionalSelect: "",
  //   priceAdditionalInput: "",
  //   priceEscalationSelect: "",
  //   priceEscalationInput: "",
  //   calculatedPrice: "",
  //   // flatPrice: "",
  //   flatPrice: 0,
  //   discountTypeSelect: "",
  //   discountTypeInput: "",
  //   priceYear: "",
  //   startUsage: "",
  //   endUsage: "",
  //   usageType: "",
  //   frequency: "",
  //   cycle: "",
  //   suppresion: "",
  //   priceType: "",
  //   netPrice: 1200,
  //   totalPrice: 1200,
  // });


  const [priceCalculator, setPriceCalculator] = useState({
    priceMethod: "",
    currency: "",
    priceDate: new Date(),
    priceType: "",
    priceAdditionalSelect: "",
    priceAdditionalInput: "",
    priceEscalationSelect: "",
    discountTypeSelect: "",
    priceEscalationInput: "",
    flatRateIndicator: false,
    flatPrice: "",
    discountTypeInput: "",
    priceBrackDownType: "",
    priceBrackDownPercantage: "",
    year: "",
    noOfYear: 1,
    startUsage: "",
    endUsage: "",
    usageType: "",
    frequency: "",
    unit: "",
    recommendedValue: "",
    numberOfEvents: "",
    netPrice: 1200,
    totalPrice: 1200,
    listPrice: "",
    calculatedPrice: "",
    priceYear: "",
    usageType: "",
    frequency: "",
    cycle: "",
    suppresion: "",
    id: "",
    portfolioDataId: 1,
  });

  const dispatch = useDispatch();
  useEffect(() => {

    if ((props.createdBundleItems != "")) {
      setAddportFolioItem(props.createdBundleItems)
    }
    // console.log("props.createdBundleItems 114 : ", props.createdBundleItems)
    // console.log("props.createdBundleItems != 114 : ", props.createdBundleItems != "")
    // console.log("props.createdBundleItems != null : ", props.createdBundleItems != undefined)
    if (props.serviceOrBundlePrefix !== "SERVICE") {
      if (props.priceCalculator) {
        // console.log("priceCalculator 111111", props.priceCalculator)
        // setPriceCalculator(props.priceCalculator);
        portfolioItemPriceSjIdFun()
      }
    }
  }, []);

  // useEffect(() => {

  //   if (props.serviceOrBundlePrefix == "BUNDLE") {
  //     portfolioItemPriceSjIdFun()
  //   }
  // }, [])

  const portfolioItemPriceSjIdFun = async () => {

    const rObjId = props.priceCalculator.itemPriceDataId;

    const res = await getItemPriceData(rObjId)

    console.log("res data ", res)

    // const rObj={
    //   standardJobId: "SJ000002",
    //   repairKitId: "string",
    //   itemId: 1,
    //   itemPriceDataId: 25
    // }


    setPriceCalculator({
      ...priceCalculator,
      priceMethod: (res.data.priceMethod != "EMPTY" ||
        res.data.priceMethod != "" ||
        res.data.priceMethod != null) ? {
        label: res.data.priceMethod,
        value: res.data.priceMethod
      } : "",
      priceType: (res.data.priceType != "EMPTY" ||
        res.data.priceType != "" ||
        res.data.priceType != null) ? {
        label: res.data.priceType,
        value: res.data.priceType
      } : "",
      priceAdditionalSelect: {
        label: (res.data.additionalPriceType != "" ||
          res.data.additionalPriceType != null) ? res.data.additionalPriceType : "ABSOLUTE",
        value: (res.data.additionalPriceType != "" ||
          res.data.additionalPriceType != null) ? res.data.additionalPriceType : "ABSOLUTE"
      },
      priceAdditionalInput: res.data.additionalPriceValue,
      discountTypeSelect: (res.data.discountType != "EMPTY" ||
        res.data.discountType != "" ||
        res.data.discountType != null) ? {
        label: res.data.discountType,
        value: res.data.discountType
      } : "",
      discountTypeInput: res.data.discountValue,
      // year: {
      //   label: (res.data.year != "" ||
      //     res.data.year != null) ? res.data.year : "1",
      //   value: (res.data.year != "" ||
      //     res.data.year != null) ? res.data.year : "1"
      // },
      // noOfYear: (res.data.noOfYear != null ||
      //   res.data.noOfYear != 0) ? res.data.noOfYear : 1,
      year: {
        label: res.data.year,
        value: res.data.year,
      },
      noOfYear: res.data.noOfYear,
      startUsage: res.data.startUsage,
      endUsage: res.data.endUsage,
      recommendedValue: res.data.recommendedValue,
      netPrice: res.data.netService,
      totalPrice: res.data.totalPrice,
      id: res.data.itemPriceDataId,
      numberOfEvents: res.data.numberOfEvents,
      portfolioDataId: res.data.portfolio.portfolioId,
    })


    // setPriceCalculator({
    //   ...priceCalculator,
    //   priceMethod: res.data.priceMethod,
    //   listPrice: res.data.listPrice,
    //   calculatedPrice: res.data.calculatedPrice,
    //   flatPrice: res.data.flatPrice,
    //   priceYear: res.data.year,
    //   startUsage: res.data.startUsage,
    //   endUsage: res.data.endUsage,
    //   totalPrice: res.data.totalPrice,
    //   netPrice: res.data.netService
    // })


    // console.log("response",res)
  }

  useEffect(() => {
    // const portfolioId1=location.state
    initFetch();
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

  const initFetch = () => {

    // getPortfolioCommonConfig("price-method")
    //   .then((res) => {
    //     const options = res.map((d) => ({
    //       value: d.key,
    //       label: d.value,
    //     }));
    //     setPriceMethodKeyValue(options);
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });

    getSolutionPriceCommonConfig("price-method")
      .then((res) => {
        // let emptyInd = res.findIndex(data => data.key === "EMPTY")
        // console.log("emptyInd is ", emptyInd)
        // res.splice(emptyInd, 1)
        // console.log("price-method response is : ", res)
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setPriceMethodKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getSolutionPriceCommonConfig("currency")
      .then((res) => {
        console.log("Price currency Response is : ", res)
        const options = res.map((d) => ({
          value: d,
          label: d,
        }));
        setPriceCurrencyKeyvalue(options);
      })
      .catch((err) => {
        alert(err);
      })

    getSolutionPriceCommonConfig("price-type")
      .then((res) => {
        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));
        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });
        setPriceTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getSolutionPriceCommonConfig("price-head-type")
      .then((res) => {

        // const options = res.map((d) => ({
        //   value: d.key,
        //   label: d.value,
        // }));

        const options = []
        res.map((d) => {
          if (d.key != "EMPTY") {
            options.push({
              value: d.key,
              label: d.value,
            })
          }
        });

        setPriceHeadTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const [priceDetails, setPriceDetails] = useState({
    priceDate: new Date()
  })
  const [disable, setDisable] = useState(true);
  const [itemPriceCalculator, setItemPriceCalculator] = useState({
    netParts: "",
    netService: "",
    priceType: "",
    netPrice: "",
    netAdditionals: "",
  })
  const [extWorkData, setExtWorkData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    flatRateIndicator: false,
    adjustedPrice: 0.0,
    basePrice: 0.0,
    percentageOfBase: 0,
  });
  const handleItemPriceCalculatorChange = (e) => {
    setItemPriceCalculator({ ...itemPriceCalculator, [e.target.name]: e.target.value })
  }
  const [selectedOption, setSelectedOption] = useState(null);

  const frequencyOptions = [
    { label: "Cyclic", value: "Cyclic" },
    { label: "once", value: "once" },
    { label: "alternate", value: "alternate" },
    { label: "Custom", value: "Custom" },
  ];
  const options = [
    { value: "chocolate", label: "Construction-Heavy" },
    { value: "strawberry", label: "Construction-Low" },
    { value: "vanilla", label: "Construction-Medium" },
    { value: "Construction", label: "Construction" },
  ];

  const discountTypeOptions = [
    { value: "PROGRAM_DISCOUNT", label: "Program" },
    { value: "CUSTOMER_DISCOUNT", label: "Customer" },
    { value: "PORTFOLIO_DISCOUNT", label: "Portfolio" },
  ]
  const [addPortFolioItem, setAddportFolioItem] = useState({
    id: 0,
    name: "",
    description: "",
    // usageIn:{label:categoryUsageKeyValue1.label,value:categoryUsageKeyValue1.value},
    // taskType: {label:stratgyTaskTypeKeyValue.label,value:stratgyTaskTypeKeyValue.value},
    usageIn: "",
    taskType: "",
    frequency: "",
    unit: "",
    recommendedValue: "",
    quantity: 1,
    numberOfEvents: "",
    templateId: "",
    templateDescription: "",
    repairOption: "",
    kitDescription: "",
    strategyTask: "",
    year: "",
    noOfYear: "1",
    headerdescription: "",
    preparedBy: "",
    approvedBy: "",
    preparedOn: new Date(),
    revisedBy: "",
    revisedOn: new Date(),
    branch: "",
    offerValidity: "",
    startUsage: "",
    endUsage: "",
    usageType: "",
  });
  const [yearsOption, seYearsOption] = useState([
    {
      value: "1", label: "1"
    }
  ])

  const handleFlatPriceIndicator = (e) => {
    // console.log("event ", e.target.checked)

    setExtWorkData({
      ...extWorkData,
      flatRateIndicator: e.target.checked,
      adjustedPrice: e.target.checked
        ? extWorkData.adjustedPrice
        : 0.0,
    })
    setPriceCalculator({
      ...priceCalculator,
      flatPrice: 0,
    })
  }

  useEffect(() => {
    var yearsOptionArr = [];
    for (let i = 1; i <= priceCalculator.noOfYear; i++) {
      yearsOptionArr.push({ value: i, label: i })
    }
    seYearsOption(yearsOptionArr);
  }, [priceCalculator.noOfYear])

  const handleItemPriceSave = () => {
    // props.setTabs("6")
    props.setTabs("4"); // previous flow
    props.getPriceCalculatorDataFun(priceCalculator);
    // props.handleSavePrices(); //called it at getPriceCalculatorDataFun
  };
  const handleBundlePriceSave = () => {
    // props.setTabs("6")//just for check new flow
    // props.setBundleServiceShow(false);
    props.getPriceCalculatorDataFun(priceCalculator);
    // props.setBundleTabs("1")
  };

  const handlePriceChange = (e) => {
    setPriceCalculator({
      ...priceCalculator,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="">
        <div className="ligt-greey-bg p-3">
          <div>
            <span className="mr-3 cursor"
              onClick={() => setDisable(!disable)}
            >
              <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
              <span className="ml-2">Edit</span>
            </span>
            <span className="mr-3">
              <MonetizationOnOutlinedIcon className=" font-size-16" />
              <span className="ml-2"> Adjust price</span>
            </span>
            {/* <span className="mr-3">
                      <FormatListBulletedOutlinedIcon className=" font-size-16" />
                      <span className="ml-2">Related part list(s)</span>
                    </span>
                    <span className="mr-3">
                      <AccessAlarmOutlinedIcon className=" font-size-16" />
                      <span className="ml-2">Related service estimate(s)</span>
                    </span> */}
            <span>
              <SellOutlinedIcon className=" font-size-16" />
              <span className="ml-2">Split price</span>
            </span>
          </div>
        </div>
        <div className="p-3">
          <div className="row input-fields">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PRICE METHOD
                </label>
                <Select
                  options={priceMethodKeyValue}
                  className="text-primary"
                  // defaultValue={props?.priceCalculator?.priceMethod}
                  value={priceCalculator.priceMethod}
                  name="priceMethod"
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      priceMethod: e
                    })
                  }
                  placeholder="placeholder (Optional)"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  CURRENCY
                </label>
                <Select
                  options={priceCurrencyKeyValue}
                  className="text-primary"
                  // defaultValue={props?.priceCalculator?.priceMethod}
                  value={priceCalculator.currency}
                  name="priceMethod"
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      currency: e
                    })
                  }
                  placeholder="placeholder (Optional)"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  htmlFor="exampleInputEmail1"
                >
                  PRICE DATE
                </label>
                <div className="d-flex align-items-center date-box w-100">
                  <div className="form-group w-100">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        label=""
                        name="preparedOn"
                        value={priceCalculator.priceDate}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            currency: e
                          })
                        }
                      // value={priceDetails.priceDate}
                      // onChange={(e) =>
                      //   setPriceDetails({
                      //     ...priceDetails,
                      //     priceDate: e,
                      //   })
                      // }
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PRICE TYPE
                </label>
                <Select
                  // defaultValue={priceTypeKeyValue}
                  className="text-primary"
                  onChange={(e) =>
                    // setPriceTypeKeyValue1(e)
                    setPriceCalculator({
                      ...priceCalculator,
                      priceType: e
                    })
                  }
                  options={priceTypeKeyValue}
                  placeholder="placeholder (Optional)"
                  value={priceCalculator.priceType}
                />
                {/* <input
                  type="text"
                  className="form-control border-radius-10"
                  placeholder="Optional"
                  name="priceType"
                  disabled={disable}
                  value={itemPriceCalculator.priceType}
                  onChange={handleItemPriceCalculatorChange}
                /> */}
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  ADDITIONAL
                </label>
                <div className=" d-flex form-control-date">
                  <div className="">
                    <Select
                      // isClearable={true}
                      className="text-primary"
                      value={priceCalculator.priceAdditionalSelect}
                      name="priceAdditionalSelect"
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          priceAdditionalSelect: e,
                        })
                      }
                      // options={options}
                      options={additionalPriceHeadTypeKeyValue}
                      placeholder="Select"
                    // isDisabled
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="10%"
                    // defaultValue={props?.priceCalculator?.priceAdditionalInput}
                    value={priceCalculator.priceAdditionalInput}
                    name="priceAdditionalInput"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceAdditionalInput: e.target.value,
                      })
                    }
                  // disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PRICE ESCALATON
                </label>
                <div className=" d-flex align-items-center form-control-date">
                  <Select
                    className="select-input"
                    id="priceEscalationSelect"
                    options={priceHeadTypeKeyValue}
                    placeholder="placeholder "
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceEscalationSelect: e,
                      })
                    }
                    value={priceCalculator.priceEscalationSelect}
                  // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceEscalationSelect: e })}
                  // value={expandedPriceCalculator.priceEscalationSelect}
                  />
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="20%"
                    id="priceEscalationInput"
                    value={priceCalculator.priceEscalationInput}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceEscalationInput: e.target.value
                      })
                    }
                  // value={escalationPriceValue}
                  // onchange={(e) = setEscalationPriceValue(e.target.value)}
                  // defaultValue={data.itemBodyModel.priceEscalation}
                  // value={expandedPriceCalculator.priceEscalationInput}
                  // onChange={handleExpandePriceChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div class="form-group mt-1">
                <FormGroup>
                  <FormControlLabel
                    style={{
                      alignItems: "start",
                      marginLeft: 0,
                    }}
                    control={
                      <Switch1
                        checked={extWorkData.flatRateIndicator}
                        onChange={(e) =>
                          handleFlatPriceIndicator(e)
                        }
                      />
                    }
                    labelPlacement="top"
                    label={
                      <span className="text-light-dark font-size-12 font-weight-500">
                        FLAT RATE INDICATOR
                      </span>
                    }
                  />
                </FormGroup>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  FLAT PRICE / ADJUSTED PRICE
                </label>
                <input
                  // type="text"
                  type="number"
                  className="form-control border-radius-10 text-primary"
                  value={priceCalculator.flatPrice}
                  name="flatPrice"
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      flatPrice: e.target.value,
                    })
                  }
                  disabled={!extWorkData.flatRateIndicator}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  DISCOUNT TYPE
                </label>
                <div className=" d-flex form-control-date">
                  <div className="">
                    <Select
                      value={priceCalculator.discountTypeSelect}
                      name="discountTypeSelect"
                      className="text-primary"
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          discountTypeSelect: e,
                        })
                      }
                      isClearable={true}
                      options={discountTypeOptions}
                      placeholder="Select"
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                    value={priceCalculator.discountTypeInput}
                    name="discountTypeInput"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        discountTypeInput: e.target.value,
                      })
                    }
                    placeholder="10%"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  htmlFor="exampleInputEmail1"
                >
                  PRICE BREAK DOWN
                </label>
                <div className=" d-flex form-control-date">
                  <Select
                    className="select-input text-primary"
                    // defaultValue={selectedOption}
                    value={priceCalculator.priceBrackDownType}
                    // onChange={setSelectedOption}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceBrackDownType: e,
                      })}
                    // options={options}
                    options={priceHeadTypeKeyValue}
                    placeholder="Select "
                  />
                  <input
                    type="text"
                    className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="optional"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceBrackDownPercantage: e.target.value,
                      })}
                    value={priceCalculator.priceBrackDownPercantage}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-radius-10 mt-3 py-2 px-3">
            <div className="row input-fields">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    YEAR
                  </label>


                  <Select
                    // options={[
                    //   { value: "1", label: "1" },
                    //   { value: "2", label: "2" },
                    //   { value: "3", label: "3" },
                    // ]}
                    options={yearsOption}
                    placeholder="Select..."
                    className="text-primary"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        year: e
                      })
                    }
                    value={priceCalculator.year}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    NO. OF YEARS
                  </label>
                  <input
                    type="number"
                    // type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="No. of Years"
                    // defaultValue={props?.priceCalculator?.startUsage}
                    // value={priceCalculator.startUsage}
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        noOfYear: e.target.value,
                      })}
                    value={priceCalculator.noOfYear}
                    name="noOfYear"
                  />
                  {/* <Select
                                  options={[
                                    { value: "1", label: "1" },
                                    { value: "2", label: "2" },
                                    { value: "3", label: "3" },
                                  ]}
                                  placeholder="Select..."
                                  className="text-primary"
                                  onChange={(e) =>
                                    setAddportFolioItem({ ...addPortFolioItem, noOfYear: e })
                                  }
                                  value={addPortFolioItem.noOfYear}
                                /> */}
                </div>
              </div>
            </div>
            <p className="font-size-14 text-black font-weight-500 mb-1">USAGE</p>
            <div className="row input-fields">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    START USAGE
                  </label>
                  <div
                    className=" d-flex form-control-date"
                    style={{ overflow: "hidden" }}
                  >
                    <input
                      type="number"
                      // type="text"
                      className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                      placeholder="10,000 hours"
                      // defaultValue={props?.priceCalculator?.startUsage}
                      // value={priceCalculator.startUsage}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          startUsage: e.target.value,
                        })
                      }
                      value={priceCalculator.startUsage}
                      name="startUsage"
                    />
                    <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                  </div>
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    END USAGE
                  </label>
                  <div
                    className=" d-flex form-control-date"
                    style={{ overflow: "hidden" }}
                  >
                    <input
                      type="number"
                      // type="text"
                      className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                      placeholder="16,000 hours"
                      // defaultValue={props?.priceCalculator?.startUsage}
                      // value={priceCalculator.startUsage}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          endUsage: e.target.value,
                        })
                      }
                      value={priceCalculator.endUsage}
                      name="endUsage"
                    />
                    <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                  </div>
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    USAGE TYPE
                  </label>
                  <Select
                    options={options}
                    placeholder="Planned Usage"
                    className="text-primary"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        usageType: e,
                      })
                    }
                    value={addPortFolioItem.usageType}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    FREQUENCY
                  </label>
                  <Select
                    options={frequencyOptions}
                    placeholder="Select....."
                    className="text-primary"
                    // onChange={(e) =>
                    //   setPriceCalculator({
                    //     ...priceCalculator,
                    //     frequency: e,
                    //   })
                    // }
                    // value={priceCalculator.frequency}
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        frequency: e,
                      })
                    }
                    value={addPortFolioItem.frequency}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    UNIT
                  </label>
                  <Select
                    options={[
                      { value: "per Hr", label: "per Hr" },
                      { value: "per Km", label: "per Km" },
                      { value: "per Miles", label: "per Miles" },
                      { value: "per year", label: "per year" },
                      { value: "per month", label: "per month" },
                      { value: "per day", label: "per day" },
                      { value: "per quarter", label: "per quarter" },
                    ]}
                    placeholder="Select..."
                    className="text-primary"
                    onChange={(e) =>
                      setAddportFolioItem({ ...addPortFolioItem, unit: e })
                    }
                    value={addPortFolioItem.unit}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    RECOMMENDED VALUE
                  </label>
                  <div
                    className=" d-flex form-control-date"
                    style={{ overflow: "hidden" }}
                  >
                    <input
                      type="number"
                      // type="text"
                      className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                      placeholder="Recommended Value"
                      // defaultValue={props?.priceCalculator?.startUsage}
                      // value={priceCalculator.startUsage}
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          recommendedValue: e.target.value,
                        })
                      }
                      value={priceCalculator.recommendedValue}
                      name="recommendedValue"
                    // name="startUsage"
                    // onChange={(e) =>
                    //   setPriceCalculator({
                    //     ...priceCalculator,
                    //     startUsage: e.target.value,
                    //   })
                    // }
                    />
                    <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                  </div>
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    NO. OF EVENTS
                  </label>
                  <input
                    type="number"
                    className="form-control border-radius-10 text-primary"
                    placeholder="NO. OF EVENTS"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        numberOfEvents: e.target.value,
                      })
                    }
                    value={priceCalculator.numberOfEvents}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group mt-1">
                  <FormGroup>
                    <FormControlLabel
                      style={{
                        alignItems: "start",
                        marginLeft: 0,
                      }}
                      control={
                        <Switch1
                          checked={extWorkData.flatRateIndicator}
                          onChange={(e) =>
                            setExtWorkData({
                              ...extWorkData,
                              flatRateIndicator: e.target.checked,
                              adjustedPrice: e.target.checked
                                ? extWorkData.adjustedPrice
                                : 0.0,
                            })
                          }
                        />
                      }
                      labelPlacement="top"
                      label={
                        <span className="text-light-dark font-size-12 font-weight-500">
                          SUPRESSION
                        </span>
                      }
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="my-1 d-flex align-items-center justify-content-end">
              <Link to="#" className="btn border mr-4">Cancel</Link>
              <Link to="#" className="btn d-flex align-items-center border bg-primary text-white">
                <span className="mr-2 funds">
                  <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                    <g>
                      <g>
                        <path class="st0" d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2
                              C74.2,101.4,70.7,105,66.3,105.1z"/>
                      </g>
                      <g>
                        <path class="st0" d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9
                              C103.4,89.1,106.9,92.9,106.8,97.2z"/>
                      </g>
                      <g>
                        <path class="st0" d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3
                              C135.6,88.9,139.3,92.5,139.4,96.8z"/>
                      </g>
                      <g>
                        <path class="st0" d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C70.7,121.6,74.3,125.2,74.3,129.6z"/>
                      </g>
                      <g>
                        <path class="st0" d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C103.2,121.5,106.8,125.2,106.8,129.5z"/>
                      </g>
                      <g>
                        <path class="st0" d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C70.7,154.1,74.3,157.7,74.3,162.1z"/>
                      </g>
                      <g>
                        <path class="st0" d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                              C90.7,157.7,94.3,154.1,98.6,154z"/>
                      </g>
                      <g>
                        <path class="st0" d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                              C135.8,121.5,139.4,125.2,139.4,129.5z"/>
                      </g>
                      <g>
                        <path class="st0" d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                              C123.2,157.7,126.8,154.1,131.1,154z"/>
                      </g>
                      <g>
                        <path class="st0" d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                              c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                              c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"/>
                      </g>
                      <g>
                        <path class="st0" d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                              S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                              c0-3.5-2.9-6.4-6.4-6.4H71.3z"/>
                      </g>
                    </g>
                  </svg>
                </span>Calculate<span className="ml-2"><KeyboardArrowDownIcon /></span></Link>
            </div>
          </div>

          {/* <div className="row input-fields">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  YEAR
                </label>
                <Select
                  defaultValue={props?.priceCalculator?.priceYear}
                  className="text-primary"
                  value={priceCalculator.priceYear}
                  name="priceYear"
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, priceYear: e })
                  }
                  options={options}
                  placeholder="Year"
                  isDisabled={true}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  USAGE TYPE
                </label>
                <Select
                  options={options}
                  className="text-primary"
                  defaultValue={props?.priceCalculator?.usageType}
                  value={priceCalculator.usageType}
                  name="usageType"
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, usageType: e })
                  }
                  placeholder="placeholder (Optional)"

                  isDisabled={true}
                />
              </div>
            </div>
          </div> */}
          {/* <div className="row input-fields">
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  START USAGE
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="per hour"
                    defaultValue={props?.priceCalculator?.startUsage}
                    value={priceCalculator.startUsage}
                    name="startUsage"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        startUsage: e.target.value,
                      })
                    }
                    disabled
                  />
                  <span className="hours-div">hours</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  END USAGE
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="10%"
                    defaultValue={props?.priceCalculator?.endUsage}
                    value={priceCalculator.endUsage}
                    name="endUsage"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        endUsage: e.target.value,
                      })
                    }
                    disabled
                  />
                  <span className="hours-div">hours</span>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="row input-fields">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  FREQUENCY
                </label>
                <Select
                  defaultValue={props?.priceCalculator?.frequency}
                  className="text-primary"
                  options={frequencyOptions}
                  value={priceCalculator.frequency}
                  name="frequency"
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, frequency: e })
                  }
                  placeholder="Cyclical"

                  isDisabled={true}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group date-box">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  CYCLE
                </label>
                <div
                  className=" d-flex form-control-date"
                  style={{ overflow: "hidden" }}
                >
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="250"
                    value={priceCalculator.cycle}
                    name="cycle"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        cycle: e.target.value,
                      })
                    }
                    disabled
                  />
                  <span className="hours-div">hours</span>
                </div>
              </div>
            </div>
          </div> */}
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <div>
                <h6 className="text-light-dark font-size-12 font-weight-500 mr-4">
                  NET PRICE
                </h6>
                ${priceCalculator.netPrice}
              </div>
              <div>
                <h6 className="text-light-dark font-size-12 font-weight-500">
                  TOTAL PRICE
                </h6>
                ${priceCalculator.totalPrice}
              </div>
            </div>
            <div className="my-3 text-right">
              <a
                href="#"
                className="btn text-white bg-primary"
                onClick={
                  props.serviceOrBundlePrefix === ""
                    ? handleItemPriceSave
                    : handleBundlePriceSave
                }
              >
                Save
              </a>
            </div>
          </div>
        </div>
        {/* <div className="m-3 text-right">
          <a
            href="#"
            className="btn text-white bg-primary"
            onClick={
              props.serviceOrBundlePrefix === ""
                ? handleItemPriceSave
                : handleBundlePriceSave
            }
          >
            Save
          </a>
        </div> */}
      </div>
    </>
  );
};

export default PriceCalculator;

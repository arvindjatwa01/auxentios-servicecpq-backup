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
  getItemDataById,
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

  // const [escalationPriceOptionsValue, setEscalationPriceOptionValue] = useState("");
  // const [escalationPriceOptionsValue1, setEscalationPriceOptionValue1] = useState("");
  // const [escalationPriceInputValue, setEscalationPriceInputValue] = useState(0);

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
    netPrice: 0,
    totalPrice: 0,
    listPrice: "",
    calculatedPrice: 0,
    priceYear: "",
    usageType: "",
    frequency: "",
    cycle: "",
    suppresion: "",
    id: "",
    portfolioDataId: 1,
    escalationPriceOptionsValue: "",
    escalationPriceOptionsValue1: "",
    escalationPriceInputValue: 0,
    priceBreakDownOptionsKeyValue: "",
    priceBreakDownOptionsKeyValue1: "",
    priceBreakDownInputValue: 0,
  });

  const dispatch = useDispatch();
  useEffect(() => {

    console.log("props is ============ ", props)

    if ((props.createdBundleItems != "")) {
      // if (props.createdBundleItems.itemId != undefined) {
      //   // const editAbleBundleService = await getItemDataById(props.createdBundleItems.itemId);
      //   fetchSelectedBundleServiceData(props.createdBundleItems.itemId);
      // } else {
      setAddportFolioItem(props.createdBundleItems)
      // }
    }
    if (props.priceCompFlagIs === "editAble") {
      setDisable(true);
    } else {
      setDisable(false);
    }


    // console.log("props.createdBundleItems 114 : ", props.createdBundleItems)
    // console.log("props.createdBundleItems != 114 : ", props.createdBundleItems != "")
    // console.log("props.createdBundleItems != null : ", props.createdBundleItems != undefined)
    // if (props.serviceOrBundlePrefix !== "SERVICE") {
    if (props.serviceOrBundlePrefix === "SERVICE" && props.priceCompFlagIs === "editAble") {
      if (props.priceCalculator) {
        // console.log("priceCalculator 111111", props.priceCalculator)
        // setPriceCalculator(props.priceCalculator);
        portfolioItemPriceSjIdFun()
      }
    }

    if (props.serviceOrBundlePrefix === "BUNDLE") {
      portfolioItemPriceSjIdFun();
    }

    if (props.serviceOrBundlePrefix !== "SERVICE") {
      if (props.priceCalculator) {
        // console.log("priceCalculator 111111", props.priceCalculator)
        // setPriceCalculator(props.priceCalculator);
        portfolioItemPriceSjIdFun()
      }
    }

    // }
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

    const fetchItemDetailsById = await getItemDataById(props.createdBundleItems.itemId);



    // const rObj={
    //   standardJobId: "SJ000002",
    //   repairKitId: "string",
    //   itemId: 1,
    //   itemPriceDataId: 25
    // }

    if (fetchItemDetailsById.status === 200) {
      // const bundleOrServiceData = await getItemDataById(props.createdBundleItems.itemId);
      const bundleOrServiceData = fetchItemDetailsById.data;
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
        year: res.data.year != "" ? {
          label: res.data.year,
          value: res.data.year,
        } : "",
        noOfYear: res.data.noOfYear,
        startUsage: res.data.startUsage,
        endUsage: res.data.endUsage,
        recommendedValue: res.data.recommendedValue,
        netPrice: res.data.netService,
        totalPrice: res.data.totalPrice,
        calculatedPrice: res.data.calculatedPrice,
        id: res.data.itemPriceDataId,
        numberOfEvents: res.data.numberOfEvents,
        portfolioDataId: (res.data?.portfolio != undefined ||
          res.data?.portfolio != null) ?
          res.data?.portfolio?.portfolioId : null,

        flatPrice: res.data.flatPrice ? parseInt(res.data.flatPrice) : 0,

        escalationPriceOptionsValue1: (res.data.priceEscalation != "" ? {
          label: res.data.priceEscalation,
          value: res.data.priceEscalation,
        } : ""),
        escalationPriceOptionsValue: (res.data.priceEscalation != "" ?
          res.data.priceEscalation : ""),
        escalationPriceInputValue: (res.data.priceEscalation == "" ? "" :
          res.data.priceEscalation === "PARTS" ? res.data.sparePartsEscalation :
            res.data.priceEscalation === "LABOR" ? res.data.labourEscalation :
              res.data.priceEscalation === "MISCELLANEOUS" ? res.data.miscEscalation :
                res.data.priceEscalation === "SERVICE" ? res.data.serviceEscalation : ""),

        priceBreakDownOptionsKeyValue: res.data.sparePartsPriceBreakDownPercentage != 0 ?
          "PARTS" : res.data.labourPriceBreakDownPercentage != 0 ? "LABOR" :
            res.data.miscPriceBreakDownPercentage != 0 ? "MISCELLANEOUS" : "",
        priceBreakDownInputValue: res.data.sparePartsPriceBreakDownPercentage != 0 ?
          res.data.sparePartsPriceBreakDownPercentage :
          res.data.labourPriceBreakDownPercentage != 0 ?
            res.data.labourPriceBreakDownPercentage :
            res.data.miscPriceBreakDownPercentage != 0 ?
              res.data.miscPriceBreakDownPercentage : 0,
        // : res.data.miscPriceBreakDownPercentage != 0 ? {
        //   label: "PARTS",
        //   value: "PARTS",
        // } : 
        priceBreakDownOptionsKeyValue1: res.data.sparePartsPriceBreakDownPercentage != 0 ? {
          label: "PARTS",
          value: "PARTS",
        } : res.data.labourPriceBreakDownPercentage != 0 ? {
          label: "LABOR",
          value: "LABOR",
        } : res.data.miscPriceBreakDownPercentage != 0 ? {
          label: "MISCELLANEOUS",
          value: "MISCELLANEOUS",
        } : "",

        currency: ((props.createdBundleItems != "") && (bundleOrServiceData?.itemHeaderModel?.currency) &&
          (bundleOrServiceData?.itemHeaderModel?.currency != "")) ? {
          label: bundleOrServiceData?.itemHeaderModel?.currency,
          value: bundleOrServiceData?.itemHeaderModel?.currency
        } : "",
        unit: ((props.createdBundleItems != "") && (bundleOrServiceData?.itemBodyModel?.unit) &&
          (bundleOrServiceData?.itemBodyModel?.unit != "")) ? {
          label: bundleOrServiceData?.itemBodyModel?.unit,
          value: bundleOrServiceData?.itemBodyModel?.unit
        } : "",
        frequency: ((props.createdBundleItems != "") && (bundleOrServiceData?.itemBodyModel?.frequency) &&
          bundleOrServiceData?.itemBodyModel?.frequency != "") ? {
          label: bundleOrServiceData?.itemBodyModel?.frequency,
          value: bundleOrServiceData?.itemBodyModel?.frequency
        } : "",
        usageType: ((props.createdBundleItems != "") && (bundleOrServiceData?.itemBodyModel?.usage) &&
          (bundleOrServiceData?.itemBodyModel?.usage != "")) ? {
          label: bundleOrServiceData?.itemBodyModel?.usage,
          value: bundleOrServiceData?.itemBodyModel?.usage
        } : "",
      })
    }

    setExtWorkData({
      ...extWorkData,
      flatRateIndicator: res.data.flatPrice || res.data.flatPrice != 0 ? true : false,
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

  const usageTypeOption = [
    { value: "Planned Usage", label: "Planned Usage" },
    { value: "Recommended usage", label: "Recommended usage" },
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
    usageType: "",
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

  const handleEscalationPriceValue = (e) => {
    console.log(e)

    setPriceCalculator({
      ...priceCalculator,
      escalationPriceOptionsValue: e.value,
      escalationPriceOptionsValue1: e,
    })
    // if (e.value === "PARTS") {
    //     setPriceEscalationTypeValue({
    //         sparePartsEscalation: 0,
    //         labourEscalation: 0,
    //         miscEscalation: 0,
    //         serviceEscalation: 0
    //     });
    // } else if (e.value === "LABOR") {
    //     setPriceEscalationTypeValue({
    //         sparePartsEscalation: 0,
    //         labourEscalation: 0,
    //         miscEscalation: 0,
    //         serviceEscalation: 0
    //     });
    // } else if (e.value === "MISCELLANEOUS") {
    //     setPriceEscalationTypeValue({
    //         sparePartsEscalation: 0,
    //         labourEscalation: 0,
    //         miscEscalation: 0,
    //         serviceEscalation: 0
    //     });
    // } else if (e.value === "SERVICE") {
    //     setPriceEscalationTypeValue({
    //         sparePartsEscalation: 0,
    //         labourEscalation: 0,
    //         miscEscalation: 0,
    //         serviceEscalation: 0
    //     });
    // }
  }

  const handlePriceBreakDownValue = (e) => {
    setPriceCalculator({
      ...priceCalculator,
      priceBreakDownOptionsKeyValue: e.value,
      priceBreakDownOptionsKeyValue1: e,
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

    try {

      console.log("props ---------- ", props, disable)
      if (props.bundleOrServiceEditOrNot) {
        // if (disable) {
          props.getPriceCalculatorDataFun(priceCalculator, props.priceCompFlagIs, disable);
        // }
      } else {
        if ((priceCalculator.startUsage == "") ||
          (priceCalculator.startUsage == undefined)) {
          throw "Start Usage is a required field, you can’t leave it blank";
        }

        if ((priceCalculator.endUsage == "") ||
          (priceCalculator.endUsage == undefined)) {
          throw "End Usage is a required field, you can’t leave it blank";
        }

        if ((priceCalculator.recommendedValue == "") ||
          (priceCalculator.recommendedValue == undefined)) {
          throw "Recommended Value is a required field, you can’t leave it blank";
        }
        props.getPriceCalculatorDataFun(priceCalculator, props.priceCompFlagIs, false);

      }


    } catch (error) {
      toast("😐" + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // props.setTabs("6")//just for check new flow
    // props.setBundleServiceShow(false);
    // 
    // props.setBundleTabs("1")
  };

  const handlePriceChange = (e) => {
    setPriceCalculator({
      ...priceCalculator,
      [e.target.name]: e.target.value,
    });
  };

  const getFormattedDateTime = (timeStamp) => {

    var date = new Date(timeStamp);
    var year = date.getFullYear();
    // var m = date.getMonth() + 1;
    var m = date.getMonth();
    // var month = m < 10 ? '0' + m : m;
    var month = m;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var format = "AM";
    var hour = date.getHours();
    var minutes = date.getMinutes();

    var monthName = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (hour > 11) {
      format = "PM";
    }
    if (hour > 12) {
      hour = hour - 12;
    } else if (hour === 0) {
      hour = 12;
    }

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    // var finalDateString = day + "-" + month + "-" + year + " " + hour + ":" + minutes + " " + format;
    var finalDateString = year + "-" + month + "-" + day;
    return finalDateString;
  }

  return (
    <>
      <div className="">
        <div className="ligt-greey-bg p-3">
          <div>
            <span className="mr-3 cursor"
              onClick={() => { setDisable(!disable) }}
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
          {disable ?
            <>
              <div className="row input-fields">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> PRICE METHOD</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.priceMethod == "" ||
                        priceCalculator.priceMethod == undefined)
                        ? "NA" : priceCalculator.priceMethod?.value}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> CURRENCY</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.currency == "" ||
                        priceCalculator.currency == undefined)
                        ? "NA" : priceCalculator.currency?.value}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> PRICE DATE</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.priceDate == "" ||
                        priceCalculator.priceDate == undefined)
                        ? "NA" : getFormattedDateTime(priceCalculator.priceDate)}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> PRICE TYPE</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.priceType == "" ||
                        priceCalculator.priceType == undefined)
                        ? "NA" : priceCalculator.priceType?.value}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> ADDITIONAL</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.priceAdditionalSelect == "" ||
                        priceCalculator.priceAdditionalSelect == undefined)
                        ? "NA" : priceCalculator.priceAdditionalSelect?.value}
                      {(priceCalculator.priceAdditionalInput == "" ||
                        priceCalculator.priceAdditionalInput == undefined)
                        ? ` NA` : ` ${priceCalculator.priceAdditionalInput}`}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> PRICE ESCALATION</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.escalationPriceOptionsValue1 == "" ||
                        priceCalculator.escalationPriceOptionsValue1 == undefined)
                        ? "NA" : priceCalculator.escalationPriceOptionsValue1?.value}
                      {(priceCalculator.escalationPriceInputValue == "" ||
                        priceCalculator.escalationPriceInputValue == undefined)
                        ? ` NA` : ` ${priceCalculator.escalationPriceInputValue}`}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> FLAT RATE INDICATOR</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(extWorkData.flatRateIndicator == true)
                        ? "Yes" : "No"}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> FLAT PRICE / ADJUSTED PRICE</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.flatPrice == "" ||
                        priceCalculator.flatPrice == undefined)
                        ? ` NA` : ` ${priceCalculator.flatPrice}`}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">  DISCOUNT TYPE</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.discountTypeSelect == "" ||
                        priceCalculator.discountTypeSelect == undefined)
                        ? "NA" : priceCalculator.discountTypeSelect?.value}
                      {(priceCalculator.discountTypeInput == "" ||
                        priceCalculator.discountTypeInput == undefined)
                        ? ` NA` : ` ${priceCalculator.discountTypeInput}`}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">  PRICE BREAK DOWN</p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {(priceCalculator.priceBreakDownOptionsKeyValue1 == "" ||
                        priceCalculator.priceBreakDownOptionsKeyValue1 == undefined)
                        ? "NA" : priceCalculator.priceBreakDownOptionsKeyValue1?.value}
                      {(priceCalculator.priceBreakDownInputValue == "" ||
                        priceCalculator.priceBreakDownInputValue == undefined)
                        ? ` NA` : ` ${priceCalculator.priceBreakDownInputValue}`}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="border border-radius-10 mt-3 py-2 px-3">
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">  YEAR</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.year == "" ||
                          priceCalculator.year == undefined)
                          ? "NA" : priceCalculator.year?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">  NO. OF YEARS</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.noOfYear == "" ||
                          priceCalculator.noOfYear == undefined)
                          ? "NA" : priceCalculator.noOfYear}
                      </h6>
                    </div>
                  </div>
                </div>
                <p className="font-size-14 text-black font-weight-500 mb-1">USAGE</p>
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">  START USAGE</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.startUsage == "" ||
                          priceCalculator.startUsage == undefined)
                          ? "NA" : priceCalculator.startUsage}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">  END USAGE</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.endUsage == "" ||
                          priceCalculator.endUsage == undefined)
                          ? "NA" : priceCalculator.endUsage}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">  USAGE TYPE</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.usageType == "" ||
                          priceCalculator.usageType == undefined)
                          ? "NA" : priceCalculator.usageType?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2"> FREQUENCY</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.frequency == "" ||
                          priceCalculator.frequency == undefined)
                          ? "NA" : priceCalculator.frequency?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2"> UNIT</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.unit == "" ||
                          priceCalculator.unit == undefined)
                          ? "NA" : priceCalculator.unit?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2"> RECOMMENDED VALUE</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.recommendedValue == "" ||
                          priceCalculator.recommendedValue == undefined)
                          ? "NA" : priceCalculator.recommendedValue}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2"> NO. OF EVENTS</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(priceCalculator.numberOfEvents == "" ||
                          priceCalculator.numberOfEvents == undefined)
                          ? "NA" : priceCalculator.numberOfEvents}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </> :
            <>
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
                                priceDate: e
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
                      PRICE ESCALATION
                    </label>
                    <div className=" d-flex align-items-center form-control-date">
                      <Select
                        className="select-input text-primary"
                        id="priceEscalationSelect"
                        options={priceHeadTypeKeyValue}
                        placeholder="placeholder "
                        value={priceCalculator.escalationPriceOptionsValue1}
                        onChange={(e) =>
                          handleEscalationPriceValue(e)
                        }
                      // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceEscalationSelect: e })}
                      // value={expandedPriceCalculator.priceEscalationSelect}
                      />
                      <input
                        type="text"
                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                        placeholder="20%"
                        id="priceEscalationInput"
                        value={priceCalculator.escalationPriceInputValue}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            escalationPriceInputValue: e.target.value,
                          })
                        }
                      // defaultValue={data.itemBodyModel.priceEscalation}
                      // value={expandedPriceCalculator.priceEscalationInput}
                      // onChange={handleExpandePriceChange}
                      />
                      {/* <Select
                    className="select-input text-primary"
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
                  /> */}
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
                        // value={priceCalculator.priceBrackDownType}
                        // onChange={(e) =>
                        //   setPriceCalculator({
                        //     ...priceCalculator,
                        //     priceBrackDownType: e,
                        //   })}
                        value={priceCalculator.priceBreakDownOptionsKeyValue1}
                        onChange={(e) =>
                          handlePriceBreakDownValue(e)}
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
                        value={priceCalculator.priceBreakDownInputValue}
                        onChange={(e) =>
                          setPriceCalculator({
                            ...priceCalculator,
                            priceBreakDownInputValue: e.target.value,
                          })
                        }
                      // onChange={(e) =>
                      //   setPriceCalculator({
                      //     ...priceCalculator,
                      //     priceBrackDownPercantage: e.target.value,
                      //   })}
                      // value={priceCalculator.priceBrackDownPercantage}
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
                        <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit?.label}</span>
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
                        <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit?.label}</span>
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
                        options={usageTypeOption}
                        placeholder="Planned Usage"
                        className="text-primary"
                        onChange={(e) =>
                          // setAddportFolioItem({
                          //   ...addPortFolioItem,
                          //   usageType: e,
                          // })
                          setPriceCalculator({
                            ...priceCalculator,
                            usageType: e,
                          })
                        }
                        value={priceCalculator.usageType}
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
                          // setAddportFolioItem({
                          //   ...addPortFolioItem,
                          //   frequency: e,
                          // })
                          setPriceCalculator({
                            ...priceCalculator,
                            frequency: e,
                          })
                        }
                        value={priceCalculator.frequency}
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
                          // setAddportFolioItem({ ...addPortFolioItem, unit: e })
                          setPriceCalculator({
                            ...priceCalculator,
                            unit: e,
                          })
                        }
                        value={priceCalculator.unit}
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
                        <span className="hours-div text-primary">{priceCalculator.unit == "" ? "select unit" : priceCalculator.unit?.label}</span>
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
                        disabled
                        readOnly
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
            </>}




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
                ${priceCalculator.calculatedPrice}
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
                {props.bundleOrServiceEditOrNot ? "Save" : "Save & Next"}
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

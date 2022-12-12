import React, { useEffect, useState } from "react";
import Select from "react-select";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import { itemCreation, updatePortfolio, getPortfolioCommonConfig, portfolioItemPriceSjid, getItemPriceData } from "../../services/index";

import {
  taskActions,
} from "./customerSegment/strategySlice";


const PriceCalculator = (props) => {

  const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
  const [priceCalculator, setPriceCalculator] = useState({
    priceMethod: "",
    listPrice: "",
    priceAdditionalSelect: "",
    priceAdditionalInput: "",
    priceEscalationSelect: "",
    priceEscalationInput: "",
    calculatedPrice: "",
    flatPrice: "",
    discountTypeSelect: "",
    discountTypeInput: "",
    priceYear: "",
    startUsage: "",
    endUsage: "",
    usageType: "",
    frequency: "",
    cycle: "",
    suppresion: "",
    netPrice: 1200,
    totalPrice: 1200,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.serviceOrBundlePrefix !== "SERVICE") {
      if (props.priceCalculator) {
        console.log("priceCalculator 111111", props.priceCalculator)
        setPriceCalculator(props.priceCalculator);
      }
    }
  }, [props]);

  useEffect(() => {
    if (props.serviceOrBundlePrefix == "BUNDLE") {
      portfolioItemPriceSjidFun()
    }
  }, [])

  const portfolioItemPriceSjidFun = async () => {

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
      priceMethod: res.data.priceMethod,
      listPrice: res.data.listPrice,
      calculatedPrice: res.data.calculatedPrice,
      flatPrice: res.data.flatPrice,
      priceYear: res.data.year,
      startUsage: res.data.startUsage,
      endUsage: res.data.endUsage,
      totalPrice: res.data.totalPrice,
      netPrice: res.data.netService
    })


    // console.log("response",res)
  }

  useEffect(() => {
    // const portfolioId1=location.state
    initFetch();
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

  const initFetch = () => {

    getPortfolioCommonConfig("price-method")
      .then((res) => {
        const options = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
        setPriceMethodKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });
  };


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
                  defaultValue={props?.priceCalculator?.priceMethod}
                  value={priceCalculator.priceMethod}
                  name="priceMethod"
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, priceMethod: e })
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
                  LIST PRICE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  aria-describedby="emailHelp"
                  placeholder="$100"
                  defaultValue={props?.priceCalculator?.listPrice}
                  value={priceCalculator.listPrice}
                  name="listPrice"
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      listPrice: e.target.value,
                    })
                  }
                  disabled
                />
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
                      isClearable={true}
                      className="text-primary"
                      value={priceCalculator.priceAdditionalSelect}
                      name="priceAdditionalSelect"
                      onChange={(e) =>
                        setPriceCalculator({
                          ...priceCalculator,
                          priceAdditionalSelect: e,
                        })
                      }
                      options={options}
                      placeholder="Select"
                      isDisabled
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="10%"
                    defaultValue={props?.priceCalculator?.priceAdditionalInput}
                    value={priceCalculator.priceAdditionalInput}
                    name="priceAdditionalInput"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceAdditionalInput: e.target.value,
                      })
                    }
                    disabled
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
                    className="select-input text-primary"
                    value={priceCalculator.priceEscalationSelect}
                    name="priceEscalationSelect"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceEscalationSelect: e,
                      })
                    }
                    options={options}
                    placeholder="placeholder "
                    isDisabled
                  />
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                    placeholder="20%"
                    defaultValue={props?.priceCalculator?.priceEscalationInput}
                    value={priceCalculator.priceEscalationInput}
                    name="priceEscalationInput"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        priceEscalationInput: e.target.value,
                      })
                    }
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  CALCULATED PRICE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  defaultValue={props?.priceCalculator?.calculatedPrice}
                  value={priceCalculator.calculatedPrice}
                  name="calculatedPrice"
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      calculatedPrice: e.target.value,
                    })
                  }
                  placeholder="$100"
                  disabled
                />
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
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  value={priceCalculator.flatPrice}
                  name="flatPrice"
                  onChange={(e) =>
                    setPriceCalculator({
                      ...priceCalculator,
                      flatPrice: e.target.value,
                    })
                  }
                  placeholder="$100"
                />
              </div>
            </div>
          </div>
          <div className="row input-fields">
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
                      options={options}
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
          </div>
          <div className="row input-fields">
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
          </div>

          {/* <h6 className="text-light-dark font-size-12 font-weight-500">
            USAGE
          </h6> */}
          <div className="row input-fields">
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
            {/* <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  USAGE TYPE
                </label>
                <Select
                  options={options}
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
            </div> */}
          </div>

          {/* <h6 className="text-light-dark font-size-12 font-weight-500">
            QUANTITY
          </h6> */}
          <div className="row input-fields">
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
          </div>
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

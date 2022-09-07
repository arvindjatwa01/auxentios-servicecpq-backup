import React, { useEffect, useState } from "react";
import Select from "react-select";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { itemCreation, updatePortfolio } from "../../services/index";

const PriceCalculator = (props) => {
  const [disable, setDisable] = useState(true);
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

    netParts:"",
    netService:"",
    priceType:"",
    netPrice:"",
    netAdditionals:""
  });

  useEffect(() => {
    setPriceCalculator(props.priceCalculator);
  }, [props]);
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

  const handlePriceSelectChange = (e) => {
    setPriceCalculator({
      priceCalculator,
      [e.target.name]: e.target.value,
    });
  };
  const handlePriceInputChange = (e) => {
    console.log("handlePriceInputChange");
  };

  const handleItemPriceSave = () => {
    props.setTabs("3");
    props.getPriceCalculatorDataFun(priceCalculator);
    props.handleSavePrices();
  };
  const handleBundlePriceSave = () => {
    props.setBundleServiceShow(false);
    props.getPriceCalculatorDataFun(priceCalculator);
    props.handleSavePrices();
  };

  const handlePriceChange=(e)=>{
    setPriceCalculator({
      ...priceCalculator,
      [e.target.name]:e.target.value
    })
  }


  return (
    <>
      <div className="ligt-greey-bg p-3">
        <div>
          <span className="mr-3 cursor" onClick={() => setDisable(!disable)}>
            <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
            <span className="ml-2">Edit</span>
          </span>
          <span className="mr-3">
            <MonetizationOnOutlinedIcon className=" font-size-16" />
            <span className="ml-2"> Adjust price</span>
          </span>
          <span className="mr-3">
            <FormatListBulletedOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related part list(s)</span>
          </span>
          <span className="mr-3">
            <AccessAlarmOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related service estimate(s)</span>
          </span>
          <span>
            <SellOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Split price</span>
          </span>
        </div>
      </div>

      <div className='mt-3'>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  Net Parts $
                </label>
                <input
                  type="text"
                   className="form-control border-radius-10"
                  options={options}
                  name="netParts"
                  disabled={disable}
                  value={priceCalculator.netParts}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  Net Service $
                </label>
                <input
                  type="text"
                   className="form-control border-radius-10"
                  name="netService"
                  disabled={disable}
                  value={priceCalculator.netService}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  Price type
                </label>
                <input
                  type="text"
                   className="form-control border-radius-10"
                  placeholder="Optional"
                  name="priceType"
                  disabled={disable}
                  value={priceCalculator.priceType}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  Net Price
                </label>
                <input
                  type="text"
                   className="form-control border-radius-10"  
                  name="netPrice"
                  disabled={disable}
                  value={priceCalculator.netPrice}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-14 font-weight-500"
                  for="exampleInputEmail1"
                >
                  Net Additionals $
                </label>
                <input
                  type="text"
                   className="form-control border-radius-10"
                  name="netAdditionals"
                  disabled={disable}
                  value={priceCalculator.netAdditionals}
                />
              </div>
            </div>
          </div>
        <div className="m-3 text-right">
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

      <div className="">
        <div className="p-3">
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  PRICE METHOD
                </label>
                <Select
                  options={options}
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
                  className="form-control border-radius-10"
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
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
                  />
                  <input
                    type="text"
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  CALCULATED PRICE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10"
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
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4">
              <div className="form-group">
                <label
                  className="text-light-dark font-size-12 font-weight-500"
                  for="exampleInputEmail1"
                >
                  FLAT PRICE / ADJUSTED PRICE
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10"
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
          <div className="row">
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
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
          <div className="row">
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
                  value={priceCalculator.priceYear}
                  name="priceYear"
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, priceYear: e })
                  }
                  options={options}
                  placeholder="Year"
                />
              </div>
            </div>
          </div>

          <h6 className="text-light-dark font-size-12 font-weight-500">
            USAGE
          </h6>
          <div className="row">
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
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
                  />
                  <span className="hours-div">hours</span>
                </div>
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
                  defaultValue={props?.priceCalculator?.usageType}
                  value={priceCalculator.usageType}
                  name="usageType"
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, usageType: e })
                  }
                  placeholder="placeholder (Optional)"
                />
              </div>
            </div>
          </div>

          <h6 className="text-light-dark font-size-12 font-weight-500">
            QUANTITY
          </h6>
          <div className="row">
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
                  options={frequencyOptions}
                  value={priceCalculator.frequency}
                  name="frequency"
                  onChange={(e) =>
                    setPriceCalculator({ ...priceCalculator, frequency: e })
                  }
                  placeholder="Cyclical"
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
                    className="form-control rounded-top-left-0 rounded-bottom-left-0"
                    placeholder="250"
                    value={priceCalculator.cycle}
                    name="cycle"
                    onChange={(e) =>
                      setPriceCalculator({
                        ...priceCalculator,
                        cycle: e.target.value,
                      })
                    }
                  />
                  <span className="hours-div">hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center">
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
        </div>
        <div className="m-3 text-right">
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
    </>
  );
};

export default PriceCalculator;

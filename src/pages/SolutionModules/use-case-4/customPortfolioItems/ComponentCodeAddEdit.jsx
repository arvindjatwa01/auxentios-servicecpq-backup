import React from "react";
import Select from "react-select";

import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SearchBox from "pages/Repair/components/SearchBox";

const ComponentCodeAddEdit = () => {
  return (
    <>
      <div className="ligt-greey-bg p-3 mb-5">
        <div>
          <span className="mr-3 cursor">
            <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
            <span className="ml-2">Edit</span>
          </span>
          <span className="mr-3">
            <SellOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related repair option</span>
          </span>
          <span className="mr-3">
            <FormatListBulletedOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related Standard Job</span>
          </span>
          <span className="mr-3">
            <AccessAlarmOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related Kit</span>
          </span>
        </div>
      </div>
      <div className="row input-fields">
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-14 font-weight-500">
              {" "}
              Component Code
            </label>
            <div className="customselectsearch">
              <input
                className="form-control border-radius-10 text-primary"
                type="text"
                name="componentCode"
                autoComplete="off"
                // value={componentData.componentCode}
                // onChange={handleComponentChange}
              />
              {/* {<ul className={`list-group customselectsearch-list scrollbar scrolbarCode style`}>
                                                    {componentData.codeSuggestions.map(
                                                        (currentItem, j) => (
                                                            <li className="list-group-item" key={j} onClick={(e) => handleComponentCodeSuggetionsClick(e, j)}
                                                            >
                                                                {currentItem.componentCode}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>} */}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-14 font-weight-500">
              Component Description
            </label>
            <input
              className="form-control border-radius-10 text-primary"
              type="text"
              name="description"
              placeholder="Optional"
              disabled
              // value={componentData.description}
              // onChange={handleComponentChange}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-12 font-weight-500">
              Make
            </label>
            <input
              className="form-control border-radius-10 text-primary"
              type="text"
              placeholder="Auto Filled"
              id="make-id"
              name="make"
              disabled
              // value={componentData.make}
              // onChange={handleMachineDataChange}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-12 font-weight-500">
              MODEL
            </label>
            <SearchBox
            // value={componentData.model}
            // onChange={(e) =>
            //     handleMachineSearch(
            //         "model",
            //         e.target.value
            //     )
            // }
            // type="model"
            // result={searchModelResults}
            // onSelect={handleModelSelect}
            // noOptions={noOptionsModel}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-12 font-weight-500">
              SERIAL #
            </label>
            <SearchBox
            // value={componentData.serialNo}
            // onChange={(e) =>
            //     handleMachineSearch(
            //         "serialNo",
            //         e.target.value
            //     )
            // }
            // type="equipmentNumber"
            // result={searchSerialResults}
            // onSelect={handleModelSelect}
            // noOptions={noOptionsSerial}
            />
          </div>
        </div>
      </div>
      <div className="row mt-3 input-fields">
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-12 font-weight-500">
              {" "}
              PRICE METHOD
            </label>
            <Select
              // options={priceMethodKeyValue}
              className="text-primary"
              // value={priceCalculator.priceMethod}
              // name="priceMethod"
              // onChange={(e) =>
              //     setPriceCalculator({ ...priceCalculator, priceMethod: e })
              // }
              placeholder="placeholder (Optional)"
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group date-box">
            <label className="text-light-dark font-size-12 font-weight-500">
              ADDITIONAL
            </label>
            <div className=" d-flex form-control-date">
              <div className="">
                <Select
                  // isClearable={true}
                  // className="text-primary"
                  // value={priceCalculator.priceAdditionalSelect}
                  // name="priceAdditionalSelect"
                  // onChange={(e) =>
                  //     setPriceCalculator({
                  //         ...priceCalculator,
                  //         priceAdditionalSelect: e,
                  //     })
                  // }
                  // options={additionalPriceHeadTypeKeyValue}
                  placeholder="Select"
                />
              </div>
              <input
                type="text"
                className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                // placeholder="10%"
                // defaultValue={props?.priceCalculator?.priceAdditionalInput}
                // value={priceCalculator.priceAdditionalInput}
                // name="priceAdditionalInput"
                // onChange={(e) =>
                //     setPriceCalculator({
                //         ...priceCalculator,
                //         priceAdditionalInput: e.target.value,
                //     })
                // }
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group date-box">
            <label className="text-light-dark font-size-12 font-weight-500">
              {" "}
              PRICE ESCALATION{" "}
            </label>
            <div className=" d-flex align-items-center form-control-date">
              <Select
                className="select-input text-primary"
                id="priceEscalationSelect"
                // options={priceHeadTypeKeyValue}
                // placeholder="placeholder "
                // value={priceCalculator.escalationPriceOptionsValue1}
                // onChange={(e) =>
                //     handleEscalationPriceValue(e)
                // }
              />
              <input
                type="text"
                className="form-control rounded-top-left-0 rounded-bottom-left-0"
                placeholder="20%"
                id="priceEscalationInput"
                // value={priceCalculator.escalationPriceInputValue}
                // onChange={(e) =>
                //     setPriceCalculator({
                //         ...priceCalculator,
                //         escalationPriceInputValue: e.target.value,
                //     })
                // }
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-12 font-weight-500">
              {" "}
              CALCULATED PRICE
            </label>
            <input
              className="form-control border-radius-10 text-primary"
              type="text"
              name="calculatedPrice"
              placeholder="$100"
              disabled
              // value={priceCalculator.calculatedPrice}
              // onChange={(e) =>
              //     setPriceCalculator({
              //         ...priceCalculator,
              //         calculatedPrice: e.target.value,
              //     })
              // }
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group">
            <label className="text-light-dark font-size-12 font-weight-500">
              FLAT PRICE / ADJUSTED PRICE
            </label>
            <input
              className="form-control border-radius-10 text-primary"
              type="text"
              name="flatPrice"
              placeholder="0"
              // value={priceCalculator.flatPrice}
              // onChange={(e) =>
              //     setPriceCalculator({
              //         ...priceCalculator,
              //         flatPrice: e.target.value,
              //     })
              // }
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-6">
          <div className="form-group date-box">
            <label className="text-light-dark font-size-12 font-weight-500">
              DISCOUNT TYPE
            </label>
            <div className=" d-flex form-control-date">
              <div className="">
                <Select
                  className="text-primary"
                  name="discountTypeSelect"
                  placeholder="Select"
                  // value={priceCalculator.discountTypeSelect}
                  // onChange={(e) =>
                  //     setPriceCalculator({
                  //         ...priceCalculator,
                  //         discountTypeSelect: e,
                  //     })
                  // }
                  // isClearable={true}
                  // options={discountTypeOptions}
                />
              </div>
              <input
                className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                type="text"
                name="discountTypeInput"
                placeholder="10%"
                // value={priceCalculator.discountTypeInput}
                // onChange={(e) =>
                //     setPriceCalculator({
                //         ...priceCalculator,
                //         discountTypeInput: e.target.value,
                //     })
                // }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentCodeAddEdit;

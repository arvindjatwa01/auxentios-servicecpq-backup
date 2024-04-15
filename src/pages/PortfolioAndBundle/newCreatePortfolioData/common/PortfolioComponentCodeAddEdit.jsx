import React, { useEffect, useState } from "react";

import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

import {
  SEARCH_FLAG_COMPONENT_CODE_SEARCH,
  SEARCH_FLAG_MODEL_SEARCH,
  defaultItemBodyObj,
  defaultItemHeaderObj,
} from "pages/Common/PortfolioAndSolutionConstants";
import { isEmpty } from "../utilities/textUtilities";
import {
  CREATE_PORTFOLIO_ITEM,
  SEARCH_COMPONENT_CODE,
  SEARCH_MACHINE,
} from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { errorMessage } from "../utilities/toastMessage";
import SearchInputBox from "pages/SolutionModules/use-case-4/useCase4Common/SearchInputBox";

const PortfolioComponentCodeAddEdit = (props) => {
  const {
    itemType,
    isPortfolioItem,
    portfolioId,
    itemId,
    isEditable = false,
    handelSaveComponentCodeData,
    buttonClassName = "",
  } = props;

  const [itemRequestObj, setItemRequestObj] = useState({
    itemId: 0,
    itemName: "",
  });

  const [itemHeaderModelObj, setItemHeaderModelObj] = useState({
    ...defaultItemHeaderObj,
  });

  const [itemBodyModelObj, setItemBodyModelObj] = useState({
    ...defaultItemBodyObj,
  });
  const [componentDataEdit, setComponentDataEdit] = useState(isEditable);

  const [componentCodeSearchResult, setComponentCodeSearchResult] = useState(
    []
  );
  const [componentCodeSearchNoOptions, setComponentCodeSearchNoOptions] =
    useState(false);
  const [componentCodeSearchLoading, setComponentCodeSearchLoading] =
    useState(false);
  const [modelSearchResult, setModelSearchResult] = useState([]);
  const [modelSearchNoOptions, setModelSearchNoOptions] = useState(false);
  const [modelSearchLoading, setModelSearchLoading] = useState(false);
  const [seialNoSearchResult, setSeialNoSearchResult] = useState([]);
  const [serialNoSearchNoOptions, setSerialNoSearchNoOptions] = useState(false);
  const [serialNoSearchLoading, setSerialNoSearchLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(itemId)) {
      const rUrl = `${CREATE_PORTFOLIO_ITEM()}/${itemId}`;
      callGetApi(rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const { itemId, itemName, itemHeaderModel, itemBodyModel } =
            response.data;

          setItemRequestObj({
            itemId: itemId,
            itemName: itemName,
          });
          setItemHeaderModelObj({ ...itemHeaderModel });
          setItemBodyModelObj({ ...itemBodyModel });
        }
      });
    }
  }, []);

  // Component Code Search
  const handleComponentCodeSearch = async (e) => {
    const { value } = e.target;
    setComponentCodeSearchNoOptions(true);
    setItemHeaderModelObj({
      ...itemHeaderModelObj,
      componentCode: value,
    });
    if (!isEmpty(value) && value.length !== 0) {
      setComponentCodeSearchLoading(true);
      const rUrl = SEARCH_COMPONENT_CODE(`componentCode~${value}`);
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            setComponentCodeSearchResult(response.data);
            setComponentCodeSearchLoading(false);
          } else {
            setComponentCodeSearchLoading(false);
            setComponentCodeSearchResult([]);
            errorMessage(response?.data?.message);
          }
        },
        (error) => {
          setComponentCodeSearchLoading(false);
          setComponentCodeSearchResult([]);
          errorMessage(error);
        }
      );
    } else {
      setComponentCodeSearchResult([]);
      setComponentCodeSearchLoading(false);
    }
  };

  // handle Select Searched Component Code
  const handleComponentCodeSelect = (selectComponentData) => {
    setComponentCodeSearchNoOptions(false);
    setItemHeaderModelObj({
      ...itemHeaderModelObj,
      componentCode: selectComponentData.componentCode,
      componentDescription: selectComponentData.description,
    });
    setComponentCodeSearchResult([]);
  };

  // Model Search
  const handleModelSearch = async (e) => {
    const { value } = e.target;
    setModelSearchNoOptions(true);
    setItemHeaderModelObj({
      ...itemHeaderModelObj,
      model: value,
    });
    if (!isEmpty(value) && value.length !== 0) {
      setModelSearchLoading(true);
      const rUrl = SEARCH_MACHINE(`model~${value}`);
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            setModelSearchResult(response.data);
            setModelSearchLoading(false);
          } else {
            setModelSearchResult([]);
            setModelSearchLoading(false);
            errorMessage(response?.data?.message);
          }
        },
        (error) => {
          setModelSearchResult([]);
          setModelSearchLoading(false);
          errorMessage(error);
        }
      );
    } else {
      setModelSearchResult([]);
      setModelSearchLoading(false);
    }
  };

  // handle Select Searched Model
  const handleModelDataSelect = (selectedModel) => {
    setModelSearchNoOptions(false);
    setItemHeaderModelObj({
      ...itemHeaderModelObj,
      model: selectedModel.model,
      itemHeaderMake: selectedModel.maker,
      itemHeaderFamily: selectedModel?.family || "",
      prefix: selectedModel.modelPrefix,
    });
    setModelSearchResult([]);
  };

  // Serial Number Search
  const handleSerialNoSearch = (e) => {
    const { value } = e.target;
    setSerialNoSearchNoOptions(true);
    setItemHeaderModelObj({
      ...itemHeaderModelObj,
      serialNumber: value,
    });
    if (!isEmpty(value) && value.length !== 0) {
      setSerialNoSearchLoading(true);
      let searchParametes = "";
      if (!isEmpty(itemHeaderModelObj.model)) {
        searchParametes = `${searchParametes}model:${itemHeaderModelObj.model} AND `;
      }
      const rUrl = SEARCH_MACHINE(`${searchParametes}equipmentNumber~${value}`);
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            setSerialNoSearchLoading(false);
            setSeialNoSearchResult(response.data);
          } else {
            setSeialNoSearchResult([]);
            setSerialNoSearchLoading(false);
            errorMessage(response?.data?.message);
          }
        },
        (error) => {
          setSeialNoSearchResult([]);
          setSerialNoSearchLoading(false);
          errorMessage(error);
        }
      );
    } else {
      setSeialNoSearchResult([]);
      setSerialNoSearchLoading(false);
    }
  };

  // handle Select Seached Serial No
  const handleSerialNoSelect = (selectedSerialNo) => {
    setSerialNoSearchNoOptions(false);
    setItemHeaderModelObj({
      ...itemHeaderModelObj,
      serialNumber: selectedSerialNo.equipmentNumber,
      model: selectedSerialNo.model,
      itemHeaderMake: selectedSerialNo.maker,
      itemHeaderFamily: selectedSerialNo?.family || "",
      prefix: selectedSerialNo.modelPrefix,
    });
    setSeialNoSearchResult([]);
  };

  // Check input fields validation
  const checkComponetDataValidation = () => {
    // else  if (isEmpty(itemHeaderModelObj.componentCode)) {
    //   errorMessage(
    //     "Component code is a required Fields, you can't leave it blank."
    //   );
    //   return false;
    // } else
    if (isPortfolioItem && isEmpty(portfolioId)) {
      errorMessage(
        "Create Portfolio First, then you can modify component data,"
      );
      return false;
    } else if (isPortfolioItem && isEmpty(itemId)) {
      errorMessage("Create Item First then you can modify component data.");
      return false;
    } else if (componentCodeSearchResult.length !== 0) {
      errorMessage(
        "Componet code must be a valid, Please Select any One Component code."
      );
      return false;
    } else if (componentCodeSearchNoOptions) {
      errorMessage(
        "Componet code must be a valid, Change Search critria and Select any One Component code."
      );
      return false;
    } else if (modelSearchResult.length !== 0) {
      errorMessage("Model must be valid, Please Select Model.");
      return false;
    } else if (modelSearchNoOptions) {
      errorMessage(
        "Model must be valid, Change Search Critria and select Model."
      );
      return false;
    } else if (seialNoSearchResult.length !== 0) {
      errorMessage("Serail Number must be valid, Please Select Serial Number.");
      return false;
    } else if (serialNoSearchNoOptions) {
      errorMessage(
        "Serial Number must be valid, change the Search Critria and select Serial Number."
      );
      return false;
    }
    return true;
  };

  // save component code changes
  const handleSaveChanges = () => {
    try {
      if (!componentDataEdit && !checkComponetDataValidation()) {
        return;
      }
      handelSaveComponentCodeData(
        componentDataEdit,
        itemRequestObj,
        itemHeaderModelObj,
        itemBodyModelObj
      );
    } catch (error) {
      errorMessage(error);
    }
  };

  return (
    <>
      <div className="ligt-greey-bg p-3 mb-3">
        <div>
          <span
            className="mr-3 cursor"
            onClick={() => setComponentDataEdit(false)}
          >
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
        {componentDataEdit ? (
          <>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                  COMPONENT CODE
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemHeaderModelObj.componentCode)
                    ? "NA"
                    : itemHeaderModelObj.componentCode}
                </h6>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                  COMPONENT DESCRIPTION
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemHeaderModelObj.componentDescription)
                    ? "NA"
                    : itemHeaderModelObj.componentDescription}
                </h6>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                  MAKE
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemHeaderModelObj.itemHeaderMake)
                    ? "NA"
                    : itemHeaderModelObj.itemHeaderMake}
                </h6>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                  MODEL
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemHeaderModelObj.model)
                    ? "NA"
                    : itemHeaderModelObj.model}
                </h6>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                  SERIAL #
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemHeaderModelObj.serialNumber)
                    ? "NA"
                    : itemHeaderModelObj.serialNumber}
                </h6>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  {" "}
                  Component Code
                </label>
                <div
                  class="form-group w-100 customerIdSearch"
                  style={{ position: "relative" }}
                >
                  <SearchInputBox
                    value={itemHeaderModelObj.componentCode}
                    placeHolder="Search Component Code Here"
                    searchType="componentCode"
                    handleSearch={handleComponentCodeSearch}
                    searchResult={componentCodeSearchResult}
                    handleSelectSearchResult={handleComponentCodeSelect}
                    noOptions={componentCodeSearchNoOptions}
                    searchFlag={SEARCH_FLAG_COMPONENT_CODE_SEARCH}
                    loading={componentCodeSearchLoading}
                  />
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
                  value={itemHeaderModelObj.componentDescription}
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
                  name="itemHeaderMake"
                  disabled
                  value={itemHeaderModelObj.itemHeaderMake}
                  // onChange={handleMachineDataChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  MODEL
                </label>
                <SearchInputBox
                  value={itemHeaderModelObj.model}
                  placeHolder="Search Model"
                  searchType="model"
                  handleSearch={handleModelSearch}
                  searchResult={modelSearchResult}
                  handleSelectSearchResult={handleModelDataSelect}
                  noOptions={modelSearchNoOptions}
                  searchFlag={SEARCH_FLAG_MODEL_SEARCH}
                  loading={modelSearchLoading}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label className="text-light-dark font-size-12 font-weight-500">
                  SERIAL #
                </label>
                <SearchInputBox
                  value={itemHeaderModelObj.serialNumber}
                  placeHolder="Search Serial Number"
                  searchType="equipmentNumber"
                  handleSearch={handleSerialNoSearch}
                  searchResult={seialNoSearchResult}
                  handleSelectSearchResult={handleSerialNoSelect}
                  noOptions={serialNoSearchNoOptions}
                  // searchFlag={SEARCH_FLAG_MODEL_SEARCH}
                  loading={serialNoSearchLoading}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <hr />
      {/* <div className="row mt-3 input-fields">
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
      </div> */}
      <div
        className={`row mt-5 ${buttonClassName}`}
        style={{ justifyContent: "right" }}
      >
        <button
          type="button"
          className="btn text-white bg-primary cursor"
          onClick={handleSaveChanges}
          // onClick={handleSaveBundleServiceComponentData}
        >
          {componentDataEdit ? "Next" : "Save and Continue"}
        </button>
      </div>
    </>
  );
};

export default PortfolioComponentCodeAddEdit;

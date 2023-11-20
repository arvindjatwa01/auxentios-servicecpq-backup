import React, { useEffect, useState } from "react";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import { Switch } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getItemDataById, getItemPriceData } from "services";

import {
  defaultCustomItemHeaderModel,
  defaultCustomItemBodyModel,
  defaultCustomItemPriceObj,
} from "../Use_Case_4_Constansts";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { PORTFOLIO_ITEM_PRICE_BY_ITEM_ID } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
// import { updateItemPriceSjRkId } from "./SJRKIdUpdate";
import LoadingProgress from "pages/Repair/components/Loader";

const CustomItemPriceCalculator = (props) => {
  const {
    priceMethodKeyValuePair,
    priceTypeKeyValuePair,
    priceHeadTypeKeyValuePair,
    unitKeyValuePairs,
    frequencyKeyValuePairs,
    currencyKeyValuePair,
    additionalPriceKeyValuePair,
    discountTypeKeyValuePair,
    usageTypeKeyValuePair,
    itemId,
    isEditable,
    handleSavePriceChanges,
  } = props;

  const [itemPriceRecordObj, setItemPriceRecordObj] = useState({
    itemPriceDataId: 0,
    priceMethod: "",
    currency: "",
    priceDate: new Date(),
    priceType: "",
    additionalPriceType: "",
    additionalPriceValue: "",
    priceEscalation: "",
    sparePartsEscalation: 0,
    labourEscalation: 0,
    miscEscalation: 0,
    serviceEscalation: 0,
    flatRateIndicator: false,
    flatPrice: "",
    discountType: "",
    discountValue: "",
    sparePartsPriceBreakDownPercentage: 0,
    labourPriceBreakDownPercentage: 0,
    miscPriceBreakDownPercentage: 0,
    year: { label: 1, value: 1 },
    noOfYear: 1,
    startUsage: 0,
    endUsage: 0,
    usageType: "",
    frequency: "",
    usageUnit: "",
    recommendedUnit: "",
    recommendedValue: "",
    numberOfEvents: 0,
    supression: false,
    totalPrice: 0,
    calculatedPrice: 0,
  });

  const [itemPriceRequestObj, setItemPriceRequestObj] = useState({
    ...defaultCustomItemPriceObj,
  });

  const [priceEscalationValues, setPriceEscalationValues] = useState({
    sparePartsEscalation: 0,
    labourEscalation: 0,
    miscEscalation: 0,
    serviceEscalation: 0,
  });

  const [priceBrackdownValues, setPriceBrackdownValues] = useState({
    labourPriceBreakDownPercentage: 0,
    miscPriceBreakDownPercentage: 0,
    sparePartsPriceBreakDownPercentage: 0,
    servicePriceBreakDownPercentage: 0,
    priceBrackdownselectValue: "",
  });

  const [itemRequestObj, setItemRequestObj] = useState({
    itemId: 0,
    itemName: "",
  });

  const [itemHeaderModelObj, setItemHeaderModelObj] = useState({
    ...defaultCustomItemHeaderModel,
  });

  const [itemBodyModelObj, setItemBodyModelObj] = useState({
    ...defaultCustomItemBodyModel,
  });

  const [yearsKeyValuePairs, seYearsKeyValuePairs] = useState([
    { value: 1, label: 1 },
  ]);
  const [editItemPrice, setEditItemPrice] = useState(isEditable ? true : false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (itemId) {
      handleGetItemDetails(itemId);
    }
  }, [itemId]);

  // get Select Bundle/Service/Portfolio Item Details
  const handleGetItemDetails = async (itemId) => {
    setLoading(true);
    const itemDetails = await getItemDataById(itemId);
    if (itemDetails.status === 200) {
      const { itemId, itemName, itemHeaderModel, itemBodyModel } =
        itemDetails.data;

      const _currency = currencyKeyValuePair.find(
        (obj) => obj.value === itemHeaderModel.currency
      );
      const _usageType = usageTypeKeyValuePair.find(
        (obj) => obj.value === itemBodyModel.usage
      );

      const _itemYear = isEmpty(itemBodyModel.year)
        ? ""
        : { label: itemBodyModel.year, itemBodyModel: itemBodyModel.year };

      // set item request obj data
      setItemRequestObj({
        itemId: itemId,
        itemName: itemName,
      });

      // set item header request obj
      const _itemHeaderModelObj = {
        ...itemHeaderModelObj,
        usage: _usageType || "",
        currency: _currency || "",
      };
      setItemHeaderModelObj({ ..._itemHeaderModelObj });

      // set item body request obj
      const _itemBodyModelObj = {
        ...itemBodyModelObj,
        usage: _usageType || "",
        year: _itemYear,
      };
      setItemBodyModelObj({ ..._itemBodyModelObj });

      //   setItemRequestObj({
      //     ...itemRequestObj,
      //     name: itemName,
      //     description: itemBodyModel.itemBodyDescription,
      //     usage: _usageIn || "",
      //     strategyTask: _strategyTask,
      //     taskType: _taskType,
      //     usageType: _usageType,
      //   });

      if (itemBodyModel.itemPrices.length !== 0) {
        const itemId =
          itemBodyModel.itemPrices[itemBodyModel.itemPrices.length - 1]
            .itemPriceDataId;
        const rUrl = PORTFOLIO_ITEM_PRICE_BY_ITEM_ID() + "/" + itemId;
        callGetApi(
          null,
          rUrl,
          (response) => {
            if (response.status === API_SUCCESS) {
              const res = response.data;

              // Set price method Key value
              const _priceMethod = priceMethodKeyValuePair.find(
                (obj) => obj.value === res.priceMethod
              );

              // set price type key value
              const _priceType = priceTypeKeyValuePair.find(
                (obj) => obj.value === res.priceType
              );

              // set addition price key value
              const _additionalPriceType = additionalPriceKeyValuePair.find(
                (obj) => obj.value === res.additionalPriceType
              );

              // set price escaltion key value
              const _priceEscalation = priceHeadTypeKeyValuePair.find(
                (obj) => obj.value === res.priceEscalation
              );

              // set dsicount type key value
              const _discountType = discountTypeKeyValuePair.find(
                (obj) => obj.value === res.discountType
              );

              // set frequency key value
              let _frequency = frequencyKeyValuePairs.find(
                (obj) => obj.value === res.frequency
              );

              // set unit key value
              let _usageUnit = unitKeyValuePairs.find(
                (obj) => obj.value === res.usageUnit
              );

              // set year key value
              const _year = isEmpty(res.year)
                ? ""
                : { label: res.year, value: res.year };

              // set price escalation values
              setPriceEscalationValues({
                sparePartsEscalation: res.sparePartsEscalation,
                labourEscalation: res.labourEscalation,
                miscEscalation: res.miscEscalation,
                serviceEscalation: res.serviceEscalation,
              });

              // set price brackdiwn values
              setPriceBrackdownValues({
                labourPriceBreakDownPercentage:
                  res.labourPriceBreakDownPercentage || 0,
                miscPriceBreakDownPercentage:
                  res.miscPriceBreakDownPercentage || 0,
                sparePartsPriceBreakDownPercentage:
                  res.sparePartsPriceBreakDownPercentage || 0,
                servicePriceBreakDownPercentage:
                  res.servicePriceBreakDownPercentage || 0,
              });

              setItemPriceRecordObj({
                ...res,
                numberOfEvents: res.numberOfEvents,
                itemPriceId: res.itemPriceDataId,
                year: _year,
                frequency: _frequency || "",
                usageUnit: _usageUnit || "",
                priceMethod: _priceMethod || "",
                priceType: _priceType || "",
                additionalPriceType: _additionalPriceType || "",
                priceEscalation: _priceEscalation || "",
                discountType: _discountType || "",
                currency: _currency || "",
                usageType: _usageType || "",
              });
              setItemPriceRequestObj({
                ...res,
                numberOfEvents: res.numberOfEvents,
                itemPriceId: res.itemPriceDataId,
                year: _year,
                frequency: _frequency || "",
                usageUnit: _usageUnit || "",
                priceMethod: _priceMethod || "",
                priceType: _priceType || "",
                additionalPriceType: _additionalPriceType || "",
                priceEscalation: _priceEscalation || "",
                discountType: _discountType || "",
                currency: _currency || "",
              });
            }
          },
          (error) => {
            return;
          }
        );
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  // Year Options change on noOfYear value Change
  useEffect(() => {
    var yearsOptionArr = [];
    for (let i = 1; i <= itemPriceRequestObj.noOfYear; i++) {
      yearsOptionArr.push({ value: i, label: i });
    }
    seYearsKeyValuePairs(yearsOptionArr);
  }, [itemPriceRequestObj.noOfYear]);

  // text value change
  const handlePriceTextChange = (e, keyName, type, isPrice = false) => {
    try {
      if (type === "text") {
        setItemPriceRequestObj((pre) => ({
          ...pre,
          [keyName]: e.target.value,
        }));
      } else if (type === "select" || type === "date") {
        setItemPriceRequestObj((pre) => ({ ...pre, [keyName]: e }));
      } else if (type === "number") {
        if (isPrice) {
          setItemPriceRequestObj((pre) => ({
            ...pre,
            [keyName]: parseFloat(e.target.value),
          }));
        } else {
          setItemPriceRequestObj((pre) => ({
            ...pre,
            [keyName]: parseInt(e.target.value),
          }));
        }
      } else if (type === "checkbox") {
        setItemPriceRequestObj((pre) => ({
          ...pre,
          [keyName]: e.target.checked,
        }));
      } else {
        setItemPriceRequestObj((pre) => ({
          ...pre,
          [keyName]: e.target.value,
        }));
      }
    } catch (error) {
      return;
    }
  };

  // change the item RElated Fields text change
  const handlePriceRecordTextChange = (e, keyName, type) => {
    if (type === "select") {
      setItemPriceRecordObj((prev) => ({ ...prev, [keyName]: e }));
    } else if (type === "checkbox") {
      setItemPriceRecordObj((pre) => ({
        ...pre,
        [keyName]: e.target.checked,
      }));
    }
  };

  // Price Escalation input value change
  const priceEscalationPriceInput = (e) => {
    const _priceEscalationValues = { ...priceEscalationValues };
    if (itemPriceRequestObj.priceEscalation?.value === "PARTS") {
      _priceEscalationValues["sparePartsEscalation"] = parseFloat(
        e.target.value
      );
    } else if (itemPriceRequestObj.priceEscalation?.value === "LABOR") {
      _priceEscalationValues["labourEscalation"] = parseFloat(e.target.value);
    } else if (itemPriceRequestObj.priceEscalation?.value === "MISCELLANEOUS") {
      _priceEscalationValues["miscEscalation"] = parseFloat(e.target.value);
      _priceEscalationValues["serviceEscalation"] = 0;
    } else if (itemPriceRequestObj.priceEscalation?.value === "SERVICE") {
      _priceEscalationValues["serviceEscalation"] = parseFloat(e.target.value);
    }
    setPriceEscalationValues({ ..._priceEscalationValues });
  };

  // price brakdown select & input value chnage
  const handleChangePriceBrakdownValues = (e) => {
    const _priceBrackdownValues = { ...priceBrackdownValues };
    if (priceBrackdownValues.priceBrackdownselectValue?.value === "PARTS") {
      _priceBrackdownValues["sparePartsPriceBreakDownPercentage"] = parseInt(
        e.target.value
      );
    } else if (
      priceBrackdownValues.priceBrackdownselectValue?.value === "LABOR"
    ) {
      _priceBrackdownValues["labourPriceBreakDownPercentage"] = parseInt(
        e.target.value
      );
    } else if (
      priceBrackdownValues.priceBrackdownselectValue?.value === "MISCELLANEOUS"
    ) {
      _priceBrackdownValues["miscPriceBreakDownPercentage"] = parseInt(
        e.target.value
      );
    } else if (
      priceBrackdownValues.priceBrackdownselectValue?.value === "SERVICE"
    ) {
      _priceBrackdownValues["servicePriceBreakDownPercentage"] = parseInt(
        e.target.value
      );
    }
    setPriceBrackdownValues({ ..._priceBrackdownValues });
  };

  // check input validation
  const checkInputValidation = () => {
    if (isEmpty(itemPriceRequestObj.startUsage)) {
      errorMessage("Start Usage is a required field, you can’t leave it blank");
      return false;
    } else if (parseInt(itemPriceRequestObj.startUsage) < 0) {
      errorMessage("Start Usage must not be negative");
      return false;
    } else if (isEmpty(itemPriceRequestObj.endUsage)) {
      errorMessage("End Usage is a required field, you can’t leave it blank");
      return false;
    } else if (parseInt(itemPriceRequestObj.endUsage) < 0) {
      errorMessage("End Usage must not be negative");
      return false;
    } else if (
      parseInt(itemPriceRequestObj.startUsage) >
      parseInt(itemPriceRequestObj.endUsage)
    ) {
      errorMessage("Start Usage must not be greater to End Usage");
      return false;
    } else if (isEmpty(itemPriceRequestObj.usageUnit)) {
      errorMessage("Unit is a required field, you can’t leave it blank");
      return false;
    } else if (isEmpty(itemPriceRequestObj.recommendedValue)) {
      errorMessage(
        "Recommended Value is a required field, you can’t leave it blank"
      );
      return false;
    } else if (parseInt(itemPriceRequestObj.recommendedValue) < 0) {
      errorMessage("Recommended Value must not be negative");
      return false;
    }
    return true;
  };

  // save changes
  const handleSaveItemPriceChanges = async () => {
    if (!editItemPrice && !checkInputValidation()) {
      return;
    }

    const requestObj = {
      ...itemPriceRequestObj,
      priceMethod: itemPriceRequestObj.priceMethod?.value || "LIST_PRICE",
      priceType: itemPriceRequestObj.priceType?.value || "EVENT_BASED",
      additionalPriceType:
        itemPriceRequestObj.additionalPriceType?.value || "ABSOLUTE",
      priceEscalation: itemPriceRequestObj.priceEscalation?.value || "",
      sparePartsEscalation: priceEscalationValues.sparePartsEscalation || 0,
      labourEscalation: priceEscalationValues.labourEscalation || 0,
      miscEscalation: priceEscalationValues.miscEscalation || 0,
      serviceEscalation: priceEscalationValues.serviceEscalation || 0,
      flatPrice: itemPriceRequestObj.flatPrice || 0,
      discountType:
        itemPriceRequestObj.discountType?.value || "PORTFOLIO_DISCOUNT",
      discountValue: itemPriceRequestObj.discountValue || 0,
      sparePartsPriceBreakDownPercentage:
        priceBrackdownValues.sparePartsPriceBreakDownPercentage || 0,
      labourPriceBreakDownPercentage:
        priceBrackdownValues.labourPriceBreakDownPercentage || 0,
      miscPriceBreakDownPercentage:
        priceBrackdownValues.miscPriceBreakDownPercentage || 0,
      year: itemPriceRequestObj.year?.value || "1",
      noOfYear: itemPriceRequestObj.noOfYear || 1,
      startUsage: itemPriceRequestObj.startUsage,
      endUsage: itemPriceRequestObj.endUsage,
      frequency: itemPriceRequestObj.frequency?.value || "CYCLIC",
      usageUnit: itemPriceRequestObj.usageUnit?.value || "",
      recommendedUnit:
        itemPriceRequestObj.usageUnit?.value === "YEAR"
          ? "MONTH"
          : itemPriceRequestObj.usageUnit?.value || "",
      recommendedValue: itemPriceRequestObj.recommendedValue,
      portfolio:
        itemPriceRequestObj.portfolio?.portfolioId === 0
          ? null
          : itemPriceRequestObj.portfolio,
    };

    const _itemBodyModelObj = {
      ...itemBodyModelObj,
      usage: itemPriceRecordObj.usageType,
      year: itemPriceRequestObj.year,
    };

    const _itemHeaderModelObj = {
      ...itemHeaderModelObj,
      currency: itemPriceRecordObj.currency,
      usage: itemPriceRecordObj.usageType,
    };

    let rUrl = PORTFOLIO_ITEM_PRICE_BY_ITEM_ID();
    if (!editItemPrice) {
      if (!isEmpty(requestObj.itemPriceDataId)) {
        rUrl = rUrl + "/" + requestObj.itemPriceDataId;
      }
      if (!isEmpty(requestObj.itemPriceDataId)) {
        callPutApi(null, rUrl, requestObj, (response) => {
          if (response.status === API_SUCCESS) {
            // updateItemPriceSjRkId({
            //   standardJobId: itemPriceRequestObj.standardJobId,
            //   repairKitId: itemPriceRequestObj.repairKitId,
            //   itemId: itemId,
            //   itemPriceDataId: itemPriceRequestObj.itemPriceDataId,
            // });
            handleSavePriceChanges(
              itemRequestObj,
              _itemHeaderModelObj,
              _itemBodyModelObj,
              editItemPrice
            );
          }
        });
      } else {
        callPostApi(null, rUrl, requestObj, (response) => {
          if (response.status === API_SUCCESS) {
            // updateItemPriceSjRkId({
            //   standardJobId: itemPriceRequestObj.standardJobId,
            //   repairKitId: itemPriceRequestObj.repairKitId,
            //   itemId: itemId,
            //   itemPriceDataId: response.data?.itemPriceDataId,
            // });
            _itemBodyModelObj["itemPrices"].push({
              itemPriceDataId: response.data?.itemPriceDataId,
            });
            handleSavePriceChanges(
              itemRequestObj,
              _itemHeaderModelObj,
              _itemBodyModelObj,
              editItemPrice
            );
          }
        });
      }
    } else {
      handleSavePriceChanges(
        itemRequestObj,
        _itemHeaderModelObj,
        _itemBodyModelObj,
        editItemPrice
      );
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <LoadingProgress />
        </div>
      ) : (
        <>
          <div className="ligt-greey-bg p-3">
            <div>
              <span
                className="mr-3 cursor"
                onClick={() => setEditItemPrice(false)}
                // onClick={() => setPortfolioItemPriceEditable(!portfolioItemPriceEditable)}
              >
                <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                <span className="ml-2">Edit</span>
              </span>
              <span className="mr-3">
                <MonetizationOnOutlinedIcon className=" font-size-16" />
                <span className="ml-2"> Adjust price</span>
              </span>
              <span>
                <SellOutlinedIcon className=" font-size-16" />
                <span className="ml-2">Split price</span>
              </span>
            </div>
          </div>
          <div className="mt-3">
            {editItemPrice ? (
              <>
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        PRICE METHOD
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.priceMethod?.value)
                          ? "NA"
                          : itemPriceRequestObj.priceMethod?.label}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        CURRENCY
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.currency?.value)
                          ? "NA"
                          : itemPriceRequestObj.currency?.label}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        PRICE DATE
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.priceDate)
                          ? "NA"
                          : getFormatDateTime(
                              itemPriceRequestObj.priceDate,
                              false
                            )}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        PRICE TYPE
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.priceType?.value)
                          ? "NA"
                          : itemPriceRequestObj.priceType?.label}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        ADDITIONAL
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.additionalPriceType?.value)
                          ? "NA"
                          : itemPriceRequestObj.additionalPriceType?.label}
                        {!isEmpty(itemPriceRequestObj.additionalPriceValue) &&
                          `(${itemPriceRequestObj.additionalPriceValue})`}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        PRICE ESCALATION
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.priceEscalation?.value)
                          ? "NA"
                          : itemPriceRequestObj.priceEscalation?.label}
                        {!isEmpty(itemPriceRequestObj.priceEscalation?.value) &&
                          `(${
                            itemPriceRequestObj.priceEscalation?.value ===
                            "PARTS"
                              ? priceEscalationValues.sparePartsEscalation
                              : itemPriceRequestObj.priceEscalation?.value ===
                                "LABOR"
                              ? priceEscalationValues.labourEscalation
                              : itemPriceRequestObj.priceEscalation?.value ===
                                "MISCELLANEOUS"
                              ? priceEscalationValues.miscEscalation
                              : itemPriceRequestObj.priceEscalation?.value ===
                                "SERVICE"
                              ? priceEscalationValues.serviceEscalation
                              : "NA"
                          })`}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        FLAT RATE INDICATOR
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {itemPriceRecordObj.flatRateIndicator ? "YES" : "NO"}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        FLAT PRICE / ADJUSTED PRICE
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.flatPrice)
                          ? "NA"
                          : itemPriceRequestObj.flatPrice}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        DISCOUNT TYPE
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(itemPriceRequestObj.discountType?.value)
                          ? "NA"
                          : itemPriceRequestObj.discountType?.label}
                        {!isEmpty(itemPriceRequestObj.discountType?.value) &&
                          `(${itemPriceRequestObj.discountValue})`}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        PRICE BREAK DOWN
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(
                          priceBrackdownValues.priceBrackdownselectValue?.value
                        )
                          ? "NA"
                          : priceBrackdownValues.priceBrackdownselectValue
                              ?.label}
                        {!isEmpty(
                          priceBrackdownValues.priceBrackdownselectValue?.value
                        ) &&
                          `(${
                            priceBrackdownValues.priceBrackdownselectValue
                              ?.value === "PARTS"
                              ? priceBrackdownValues.sparePartsPriceBreakDownPercentage
                              : priceBrackdownValues.priceBrackdownselectValue
                                  ?.value === "LABOR"
                              ? priceBrackdownValues.labourPriceBreakDownPercentage
                              : priceBrackdownValues.priceBrackdownselectValue
                                  ?.value === "MISCELLANEOUS"
                              ? priceBrackdownValues.miscPriceBreakDownPercentage
                              : priceBrackdownValues.priceBrackdownselectValue
                                  ?.value === "SERVICE"
                              ? priceBrackdownValues.servicePriceBreakDownPercentage
                              : "NA"
                          })`}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="border border-radius-10 mt-3 py-2 px-3">
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          YEAR
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.year?.value)
                            ? "NA"
                            : itemPriceRequestObj.year?.label}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          NO. OF YEARS
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.noOfYear)
                            ? "NA"
                            : itemPriceRequestObj.noOfYear}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <p className="font-size-14 text-black font-weight-500 mb-1">
                    USAGE
                  </p>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          START USAGE
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.startUsage)
                            ? "NA"
                            : itemPriceRequestObj.startUsage}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          END USAGE
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.endUsage)
                            ? "NA"
                            : itemPriceRequestObj.endUsage}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          USAGE TYPE
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRecordObj.usageType?.value)
                            ? "NA"
                            : itemPriceRecordObj.usageType?.label}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          FREQUENCY
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.frequency?.value)
                            ? "NA"
                            : itemPriceRequestObj.frequency?.label}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          UNIT
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.usageUnit?.value)
                            ? "NA"
                            : itemPriceRequestObj.usageUnit?.label}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          RECOMMENDED VALUE
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.recommendedValue)
                            ? "NA"
                            : itemPriceRequestObj.recommendedValue}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                          {" "}
                          NO. OF EVENTS
                        </p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {isEmpty(itemPriceRequestObj.numberOfEvents)
                            ? "NA"
                            : itemPriceRequestObj.numberOfEvents}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PRICE METHOD
                      </label>
                      <Select
                        className="text-primary"
                        placeholder="placeholder (Optional)"
                        options={priceMethodKeyValuePair}
                        value={itemPriceRequestObj.priceMethod}
                        onChange={(e) =>
                          handlePriceTextChange(e, "priceMethod", "select")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        CURRENCY{" "}
                      </label>
                      <Select
                        className="text-primary"
                        placeholder="placeholder (Optional)"
                        options={currencyKeyValuePair}
                        value={itemPriceRecordObj.currency}
                        onChange={(e) =>
                          handlePriceRecordTextChange(e, "currency", "select")
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
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
                              value={itemPriceRequestObj.priceDate}
                              onChange={(e) =>
                                handlePriceTextChange(e, "priceDate", "date")
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        PRICE TYPE
                      </label>
                      <Select
                        className="text-primary"
                        placeholder="placeholder (Optional)"
                        options={priceTypeKeyValuePair}
                        value={itemPriceRequestObj.priceType}
                        onChange={(e) =>
                          handlePriceTextChange(e, "priceType", "select")
                        }
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
                            className="text-primary"
                            placeholder="Select"
                            value={itemPriceRequestObj.additionalPriceType}
                            onChange={(e) =>
                              handlePriceTextChange(
                                e,
                                "additionalPriceType",
                                "select"
                              )
                            }
                            options={additionalPriceKeyValuePair}
                          />
                        </div>
                        <input
                          type="number"
                          className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                          placeholder="10%"
                          name="priceAdditionalInput"
                          value={itemPriceRequestObj.additionalPriceValue}
                          onChange={(e) =>
                            handlePriceTextChange(
                              e,
                              "additionalPriceValue",
                              "number",
                              true
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group date-box">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PRICE ESCALATION
                      </label>
                      <div className=" d-flex align-items-center form-control-date">
                        <Select
                          className="select-input text-primary"
                          options={priceHeadTypeKeyValuePair}
                          value={itemPriceRequestObj.priceEscalation}
                          onChange={(e) =>
                            handlePriceTextChange(
                              e,
                              "priceEscalation",
                              "select"
                            )
                          }
                        />
                        <input
                          className="form-control rounded-top-left-0 rounded-bottom-left-0"
                          type="text"
                          placeholder="20%"
                          id="priceEscalationInput"
                          disabled={isEmpty(
                            itemPriceRequestObj.priceEscalation?.value
                          )}
                          value={
                            itemPriceRequestObj.priceEscalation?.value ===
                            "PARTS"
                              ? priceEscalationValues.sparePartsEscalation
                              : itemPriceRequestObj.priceEscalation?.value ===
                                "LABOR"
                              ? priceEscalationValues.labourEscalation
                              : itemPriceRequestObj.priceEscalation?.value ===
                                "MISCELLANEOUS"
                              ? priceEscalationValues.miscEscalation
                              : itemPriceRequestObj.priceEscalation?.value ===
                                "SERVICE"
                              ? priceEscalationValues.serviceEscalation
                              : 0
                          }
                          onChange={priceEscalationPriceInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div class="form-group mt-1">
                      <FormGroup>
                        <FormControlLabel
                          style={{ alignItems: "start", marginLeft: 0 }}
                          control={
                            <Switch
                              checked={itemPriceRecordObj.flatRateIndicator}
                              onChange={(e) =>
                                handlePriceRecordTextChange(
                                  e,
                                  "flatRateIndicator",
                                  "checkbox"
                                )
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
                      <label className="text-light-dark font-size-12 font-weight-500">
                        {" "}
                        FLAT PRICE / ADJUSTED PRICE
                      </label>
                      <input
                        type="number"
                        className="form-control border-radius-10 text-primary"
                        name="flatPrice"
                        value={itemPriceRequestObj.flatPrice}
                        placeholder="0"
                        onChange={(e) =>
                          handlePriceTextChange(e, "flatPrice", "number", true)
                        }
                        disabled={!itemPriceRecordObj.flatRateIndicator}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group date-box">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        {" "}
                        DISCOUNT TYPE
                      </label>
                      <div className=" d-flex form-control-date">
                        <div className="">
                          <Select
                            className="text-primary"
                            placeholder="Select"
                            value={itemPriceRequestObj.discountType}
                            options={discountTypeKeyValuePair}
                            onChange={(e) =>
                              handlePriceTextChange(e, "discountType", "select")
                            }
                          />
                        </div>
                        <input
                          type="text"
                          className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                          name="discountTypeInput"
                          placeholder="10%"
                          value={itemPriceRequestObj.discountValue}
                          onChange={(e) =>
                            handlePriceTextChange(
                              e,
                              "discountValue",
                              "number",
                              true
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group date-box">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        {" "}
                        PRICE BREAK DOWN
                      </label>
                      <div className=" d-flex form-control-date">
                        <Select
                          className="select-input text-primary"
                          value={priceBrackdownValues.priceBrackdownselectValue}
                          onChange={(e) =>
                            setPriceBrackdownValues((pre) => ({
                              ...pre,
                              priceBrackdownselectValue: e,
                            }))
                          }
                          options={priceHeadTypeKeyValuePair}
                        />
                        <input
                          type="text"
                          className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                          placeholder="optional"
                          onChange={handleChangePriceBrakdownValues}
                          value={
                            priceBrackdownValues.priceBrackdownselectValue
                              ?.value === "PARTS"
                              ? priceBrackdownValues.sparePartsPriceBreakDownPercentage
                              : priceBrackdownValues.priceBrackdownselectValue
                                  ?.value === "LABOR"
                              ? priceBrackdownValues.labourPriceBreakDownPercentage
                              : priceBrackdownValues.priceBrackdownselectValue
                                  ?.value === "MISCELLANEOUS"
                              ? priceBrackdownValues.miscPriceBreakDownPercentage
                              : priceBrackdownValues.priceBrackdownselectValue
                                  ?.value === "SERVICE"
                              ? priceBrackdownValues.servicePriceBreakDownPercentage
                              : 0
                          }
                          disabled={isEmpty(
                            priceBrackdownValues.priceBrackdownselectValue
                              ?.value
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-radius-10 mt-3 py-2 px-3">
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          {" "}
                          YEAR
                        </label>
                        <Select
                          options={yearsKeyValuePairs}
                          className="text-primary"
                          value={itemPriceRequestObj.year}
                          onChange={(e) =>
                            handlePriceTextChange(e, "year", "select")
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          {" "}
                          NO. OF YEARS
                        </label>
                        <input
                          type="number"
                          className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                          placeholder="No. of Years"
                          name="noOfYear"
                          value={itemPriceRequestObj.noOfYear}
                          onChange={(e) =>
                            handlePriceTextChange(e, "noOfYear", "number")
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <p className="font-size-14 text-black font-weight-500 mb-1">
                    USAGE
                  </p>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          {" "}
                          START USAGE
                        </label>
                        <div
                          className=" d-flex form-control-date"
                          style={{ overflow: "hidden" }}
                        >
                          <input
                            type="number"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="Required*"
                            name="startUsage"
                            value={itemPriceRequestObj.startUsage}
                            onChange={(e) =>
                              handlePriceTextChange(e, "startUsage", "number")
                            }
                          />
                          <span className="hours-div text-primary">
                            {isEmpty(itemPriceRequestObj.usageUnit)
                              ? "Select unit"
                              : itemPriceRequestObj.usageUnit?.label}
                          </span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          END USAGE
                        </label>
                        <div
                          className=" d-flex form-control-date"
                          style={{ overflow: "hidden" }}
                        >
                          <input
                            type="number"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="Required*"
                            name="endUsage"
                            value={itemPriceRequestObj.endUsage}
                            onChange={(e) =>
                              handlePriceTextChange(e, "endUsage", "number")
                            }
                          />
                          <span className="hours-div text-primary">
                            {isEmpty(itemPriceRequestObj.usageUnit)
                              ? "Select unit"
                              : itemPriceRequestObj.usageUnit?.label}
                          </span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          {" "}
                          USAGE TYPE
                        </label>
                        <Select
                          className="text-primary"
                          options={usageTypeKeyValuePair}
                          value={itemPriceRecordObj.usageType}
                          onChange={(e) =>
                            handlePriceRecordTextChange(
                              e,
                              "usageType",
                              "select"
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          {" "}
                          FREQUENCY
                        </label>
                        <Select
                          placeholder="Select..."
                          className="text-primary"
                          options={frequencyKeyValuePairs}
                          value={itemPriceRequestObj.frequency}
                          onChange={(e) =>
                            handlePriceTextChange(e, "frequency", "select")
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          UNIT
                        </label>
                        <Select
                          placeholder="Select..."
                          className="text-primary"
                          options={unitKeyValuePairs}
                          value={itemPriceRequestObj.usageUnit}
                          onChange={(e) =>
                            handlePriceTextChange(e, "usageUnit", "select")
                          }
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          RECOMMENDED VALUE
                        </label>
                        <div
                          className="d-flex form-control-date"
                          style={{ overflow: "hidden" }}
                        >
                          <input
                            type="number"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="Recommended Value"
                            name="recommendedValue"
                            value={itemPriceRequestObj.recommendedValue}
                            onChange={(e) =>
                              handlePriceTextChange(
                                e,
                                "recommendedValue",
                                "number"
                              )
                            }
                          />
                          <span className="hours-div text-primary">
                            {isEmpty(itemPriceRequestObj.usageUnit)
                              ? "Select unit"
                              : (itemPriceRequestObj.usageUnit?.value).toLowerCase() ===
                                "year"
                              ? "Month"
                              : itemPriceRequestObj.usageUnit?.label}
                          </span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          NO. OF EVENTS
                        </label>
                        <input
                          type="number"
                          className="form-control border-radius-10 text-primary"
                          placeholder="NO. OF EVENTS"
                          value={itemPriceRequestObj.numberOfEvents}
                          disabled
                          readOnly
                          onChange={(e) =>
                            handlePriceTextChange(e, "numberOfEvents", "number")
                          }
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group mt-1">
                        <FormGroup>
                          <FormControlLabel
                            style={{ alignItems: "start", marginLeft: 0 }}
                            control={
                              <Switch
                                checked={itemPriceRecordObj.supression}
                                onChange={(e) =>
                                  handlePriceRecordTextChange(
                                    e,
                                    "supression",
                                    "checkbox"
                                  )
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
                    <a className="btn border mr-4 cursor">Cancel</a>
                    {/* <a className="btn d-flex align-items-center border bg-primary text-white" onClick={calculateItemPrice}> */}
                    <a className="btn d-flex align-items-center border bg-primary text-white cursor">
                      <span className="mr-2 funds">
                        <svg
                          style={{ width: "13px" }}
                          version="1.1"
                          id="Layer_1"
                          viewBox="0 0 200 200"
                        >
                          <g>
                            <g>
                              <path
                                class="st0"
                                d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2C74.2,101.4,70.7,105,66.3,105.1z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9C103.4,89.1,106.9,92.9,106.8,97.2z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3C135.6,88.9,139.3,92.5,139.4,96.8z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1C70.7,121.6,74.3,125.2,74.3,129.6z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C103.2,121.5,106.8,125.2,106.8,129.5z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C70.7,154.1,74.3,157.7,74.3,162.1z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C90.7,157.7,94.3,154.1,98.6,154z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C135.8,121.5,139.4,125.2,139.4,129.5z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C123.2,157.7,126.8,154.1,131.1,154z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                      c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                      c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"
                              />
                            </g>
                            <g>
                              <path
                                class="st0"
                                d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                      S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                      c0-3.5-2.9-6.4-6.4-6.4H71.3z"
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                      Calculate
                      <span className="ml-2">
                        <KeyboardArrowDownIcon />
                      </span>
                    </a>
                  </div>
                </div>
              </>
            )}
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="d-flex align-items-center">
                <div className="d-block mr-4">
                  <p className="mb-0 font-size-14 text-grey">
                    TOTAL BASE PRICE
                  </p>
                  <p className="mb-0 font-size-14 text-black">
                    ${itemPriceRequestObj.totalPrice}
                  </p>
                </div>
                <div className="d-block">
                  <p className="mb-0 font-size-14 text-grey">NET PRICE</p>
                  <p className="mb-0 font-size-14 text-black">
                    ${itemPriceRequestObj.calculatedPrice}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <a
                  className="btn text-white bg-primary cursor"
                  onClick={handleSaveItemPriceChanges}
                  // onClick={handleItemPriceCalculatorSave}
                >
                  Next
                  {/* {portfolioItemPriceEditable ? "Next" : "Save & Next"} */}
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomItemPriceCalculator;

import React, { useState, useEffect } from "react";

import Select from "react-select";

import {
  CREATE_PORTFOLIO_ITEM,
  PORTFOLIO_ITEM_PRICE_BY_ITEM_ID,
} from "services/CONSTANTS";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import { updateItemPriceSjRkId } from "./SJRKIdUpdate";
import { isEmpty, isEmptySelect } from "../utilities/textUtilities";
import { errorMessage, successMessage } from "../utilities/toastMessage";
import LoadingProgress from "pages/Repair/components/Loader";
import {
  defaultItemBodyObj,
  defaultItemHeaderObj,
  defaultItemPriceObj,
} from "pages/Common/PortfolioAndSolutionConstants";

const ExpendBundleServiceItem = (props) => {
  const {
    bundleServiceRowData,
    frequencyKeyValuePairs,
    unitKeyValuePairs,
    priceMethodKeyValuePair,
    priceTypeKeyValuePair,
    existBundleServiceItems,
    bundleServiceItemsList,
    portfolioRecordId,
    portfolioItemId,
    handleUpdateItem,
  } = props;

  const [bundleServiceItemObj, setBundleServiceItemObj] = useState({
    itemId: 0,
    itemName: "",
  });

  const [bundleServiceItemHeader, setBundleServiceItemHeader] = useState({
    ...defaultItemHeaderObj,
  });
  const [bundleServiceItemBody, setBundleServiceItemBody] = useState({
    ...defaultItemBodyObj,
  });
  const [bundleServicePriceObj, setBundleServicePriceObj] = useState({
    ...defaultItemPriceObj,
  });
  const [isExist, setIsExist] = useState(false);
  const [editData, setEditData] = useState(false);
  const [isLastRow, setIsLastRow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Find the index of the expedned row in the bundleServiceItemsList array
    const expendRowIndex = bundleServiceItemsList.findIndex(
      (obj) => obj.itemId === bundleServiceRowData.itemId
    );

    // Check if the expedned row is the last row element in the bundleServiceItemsList array
    const isLastIndex = expendRowIndex === bundleServiceItemsList.length - 1;
    setIsLastRow(isLastIndex);

    if (existBundleServiceItems.length !== 0) {
      const bundleServiceExists = existBundleServiceItems.some(
        (obj) => obj.itemId === bundleServiceRowData.itemId
      );
      setIsExist(bundleServiceExists);
      setEditData(bundleServiceExists);
    }
    const rUrl = CREATE_PORTFOLIO_ITEM() + "/" + bundleServiceRowData.itemId;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const { itemId, itemName, itemHeaderModel, itemBodyModel } =
            response.data;

          setBundleServiceItemObj({
            itemId: itemId,
            itemName: itemName,
          });

          if (!itemHeaderModel.portfolioItemIds.includes(portfolioItemId)) {
            itemHeaderModel.portfolioItemIds.push(portfolioItemId);
          }

          const _portfolioItemIds = [...itemHeaderModel["portfolioItemIds"]];
          const removeDuplicatePortfolioItemIds = Array.from([
            ...new Set(_portfolioItemIds),
          ]);
          itemHeaderModel["portfolioItemIds"] = removeDuplicatePortfolioItemIds;
          setBundleServiceItemHeader({ ...itemHeaderModel });
          setBundleServiceItemBody({ ...itemBodyModel });
          if (itemBodyModel.itemPrices.length !== 0) {
            const itemPriceId =
              itemBodyModel.itemPrices[itemBodyModel.itemPrices.length - 1]
                .itemPriceDataId;
            getBundleServicePriceDetails(itemPriceId);
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  }, [bundleServiceRowData]);

  // get the expended bundle|Service item Price data
  const getBundleServicePriceDetails = async (itemPriceId) => {
    setLoading(true);
    const rUrl = PORTFOLIO_ITEM_PRICE_BY_ITEM_ID() + "/" + itemPriceId;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const res = response.data;

          // set price method key-value pair
          const _priceMethod = priceMethodKeyValuePair.find(
            (obj) => obj.value === res.priceMethod
          );

          // set price type key-value pair
          const _priceType = priceTypeKeyValuePair.find(
            (obj) => obj.value === res.priceType
          );

          // set frequency key-value pair
          let _frequency = frequencyKeyValuePairs.find(
            (obj) => obj.value === res.frequency
          );

          // set unit key-value pair
          let _usageUnit = unitKeyValuePairs.find(
            (obj) => obj.value === res.usageUnit
          );

          setBundleServicePriceObj({
            ...res,
            priceMethod: _priceMethod || "",
            priceType: _priceType || "",
            frequency: _frequency || "",
            usageUnit: _usageUnit || "",
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  // change input fields text change
  const handleTextChange = (e, stateName, type, key = null) => {
    if (stateName === "bundleServiceItemHeader") {
      // set data for bundleServiceItemHeader
      if (type === "number") {
        setBundleServiceItemHeader((pre) => ({
          ...pre,
          [e.target.name]: parseInt(e.target.value),
        }));
      } else if (type === "select") {
        setBundleServiceItemHeader((pre) => ({ ...pre, [key]: e }));
      } else {
        setBundleServiceItemHeader((pre) => ({
          ...pre,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (stateName === "bundleServiceItemBody") {
      // set data for bundleServiceItemBody
      if (type === "number") {
        setBundleServiceItemBody((pre) => ({
          ...pre,
          [e.target.name]: parseInt(e.target.value),
        }));
      } else if (type === "select") {
        setBundleServiceItemBody((pre) => ({ ...pre, [key]: e }));
      } else {
        setBundleServiceItemBody((pre) => ({
          ...pre,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (stateName === "bundleServicePriceObj") {
      // set data for bundleServicePriceObj
      if (type === "number") {
        setBundleServicePriceObj((pre) => ({
          ...pre,
          [e.target.name]: parseInt(e.target.value),
        }));
      } else if (type === "select") {
        setBundleServicePriceObj((pre) => ({ ...pre, [key]: e }));
      } else {
        setBundleServicePriceObj((pre) => ({
          ...pre,
          [e.target.name]: e.target.value,
        }));
      }
    }
  };

  // Mandatory input fields validation check
  const checkInputValidation = () => {
    if (isEmpty(bundleServiceItemHeader.itemHeaderDescription)) {
      errorMessage("Description is a required field, you can’t leave it blank");
      return false;
    } else if (isEmpty(bundleServicePriceObj.priceMethod)) {
      errorMessage(
        "Price Method is a required field, you can’t leave it blank"
      );
      return false;
    } else if (isEmpty(bundleServicePriceObj.startUsage)) {
      errorMessage(
        "Start usage is a required field, you can’t leave it blank or Zero(0)"
      );
      return false;
    } else if (parseInt(bundleServicePriceObj.startUsage) < 0) {
      errorMessage("Start Usage must not be negative");
      return false;
    } else if (isEmpty(bundleServicePriceObj.endUsage)) {
      errorMessage(
        "End usage is a required field, you can’t leave it blank or Zero(0)"
      );
      return false;
    } else if (parseInt(bundleServicePriceObj.endUsage) < 0) {
      errorMessage("End Usage must not be negative");
      return false;
    } else if (
      parseInt(bundleServicePriceObj.startUsage) >
      parseInt(bundleServicePriceObj.endUsage)
    ) {
      errorMessage("Start Usage must not be greater to End Usage");
      return false;
    } else if (isEmpty(bundleServicePriceObj.usageUnit)) {
      errorMessage("Unit is a required field, you can’t leave it blank");
      return false;
    } else if (isEmpty(bundleServicePriceObj.recommendedValue)) {
      errorMessage(
        "Recommended Value is a required field, you can’t leave it blank or Zero(0)"
      );
      return false;
    } else if (parseInt(bundleServicePriceObj.recommendedValue) < 0) {
      errorMessage("Recommended Value must not be negative");
      return false;
    }
    return true;
  };

  // handlse Add|Update item price for expended item
  const handleAddUpdateItemPrice = (_bundleServiceItemBody) => {
    return new Promise((resolve, reject) => {
      try {
        const priceRequestObj = {
          ...bundleServicePriceObj,
          priceMethod:
            bundleServicePriceObj.priceMethod?.value ||
            bundleServicePriceObj.priceMethod ||
            "LIST_PRICE",
          priceType:
            bundleServicePriceObj.priceType?.value ||
            bundleServicePriceObj.priceType ||
            "EVENT_BASED",
          frequency:
            bundleServicePriceObj.frequency?.value ||
            bundleServicePriceObj.frequency ||
            "CYCLIC",
          usageUnit:
            bundleServicePriceObj.usageUnit?.value ||
            bundleServicePriceObj.usageUnit ||
            "YEAR",
          recommendedUnit:
            bundleServicePriceObj.usageUnit?.value === "YEAR"
              ? "MONTH"
              : bundleServicePriceObj.usageUnit?.value ||
                bundleServicePriceObj.usageUnit ||
                "MONTH",
          year:
            bundleServicePriceObj?.year?.value || bundleServicePriceObj?.year,
          additionalPriceType:
            bundleServicePriceObj.additionalPriceType?.value ||
            bundleServicePriceObj?.additionalPriceType ||
            "ABSOLUTE",
          discountType:
            bundleServicePriceObj.discountType?.value ||
            bundleServicePriceObj?.discountType ||
            "PORTFOLIO_DISCOUNT",
        };

        if (isExist) {
          if (!isEmpty(bundleServicePriceObj.itemPriceDataId)) {
            const priceUpdateReqUrl =
              PORTFOLIO_ITEM_PRICE_BY_ITEM_ID() +
              "/" +
              bundleServicePriceObj.itemPriceDataId;
            callPutApi(
              null,
              priceUpdateReqUrl,
              priceRequestObj,
              (response) => {
                if (response.status === API_SUCCESS) {
                  updateItemPriceSjRkId({
                    standardJobId: bundleServicePriceObj.standardJobId,
                    repairKitId: bundleServicePriceObj.repairKitId,
                    itemId: bundleServiceItemObj.itemId,
                    itemPriceDataId: bundleServicePriceObj.itemPriceDataId,
                  });
                  resolve({
                    successStatus: true,
                    itemBodyModelObj: _bundleServiceItemBody,
                  });
                } else {
                  resolve({
                    successStatus: false,
                    itemBodyModelObj: _bundleServiceItemBody,
                  });
                }
              },
              (error) => {
                resolve({
                  successStatus: false,
                  itemBodyModelObj: _bundleServiceItemBody,
                });
              }
            );
          }
        } else {
          const priceCreateReqUrl = PORTFOLIO_ITEM_PRICE_BY_ITEM_ID();
          callPostApi(
            null,
            priceCreateReqUrl,
            {
              ...priceRequestObj,
              itemPriceDataId: 0,
              portfolio: { portfolioId: portfolioRecordId },
            },
            (response) => {
              if (response.status === API_SUCCESS) {
                const res = response.data;
                updateItemPriceSjRkId({
                  standardJobId: bundleServicePriceObj.standardJobId,
                  repairKitId: bundleServicePriceObj.repairKitId,
                  itemId: bundleServiceItemObj.itemId,
                  itemPriceDataId: res.itemPriceDataId,
                });
                _bundleServiceItemBody.itemPrices.push({
                  itemPriceDataId: res.itemPriceDataId,
                });
                resolve({
                  successStatus: true,
                  itemBodyModelObj: _bundleServiceItemBody,
                });
              } else {
                resolve({
                  successStatus: false,
                  itemBodyModelObj: _bundleServiceItemBody,
                });
              }
            },
            (error) => {
              resolve({
                successStatus: false,
                itemBodyModelObj: _bundleServiceItemBody,
              });
            }
          );
        }
      } catch (error) {
        resolve({
          successStatus: false,
          itemBodyModelObj: _bundleServiceItemBody,
        });
      }
    });
  };

  // save the Item Changes
  const handleSaveChanges = () => {
    try {
      if (!checkInputValidation()) {
        return;
      }

      const _bundleServiceItemBody = { ...bundleServiceItemBody };

      // if (!handleAddUpdateItemPrice(_bundleServiceItemBody)) {
      //   return;
      // }

      handleAddUpdateItemPrice(_bundleServiceItemBody).then((res) => {
        if (res.successStatus) {
          // item update request Obj
          const itemRequestObj = {
            ...bundleServiceItemObj,
            itemHeaderModel: { ...bundleServiceItemHeader },
            itemBodyModel: { ...res.itemBodyModelObj },
          };

          const itemReqUrl =
            CREATE_PORTFOLIO_ITEM() + "/" + bundleServiceItemObj.itemId;
          callPutApi(null, itemReqUrl, itemRequestObj, (response) => {
            if (response.status === API_SUCCESS) {
              handleUpdateItem(bundleServiceItemObj.itemId);
              successMessage(
                `${bundleServiceItemObj.itemName} Item updated successfully`
              );
            }
          });
        }
      });
    } catch (error) {
      return;
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
          {isExist && (
            <div className="ligt-greey-bg p-3 my-3">
              <div>
                <span
                  className="mr-3 cursor"
                  onClick={() => setEditData(false)}
                >
                  <i className="fa fa-pencil font-size-12" aria-hidden="true" />
                  <span className="ml-2">Edit</span>
                </span>
              </div>
            </div>
          )}
          {editData ? (
            <>
              <div className="row mt-3 input-fields">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      {" "}
                      NAME
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(bundleServiceItemObj.itemName)
                        ? "NA"
                        : bundleServiceItemObj.itemName}
                    </h6>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                      {" "}
                      DESCRIPTION
                    </p>
                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                      {isEmpty(bundleServiceItemHeader.itemHeaderDescription)
                        ? "NA"
                        : bundleServiceItemHeader.itemHeaderDescription}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="border border-radius-10 my-3 py-2 px-3">
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        PRICE METHOD
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmptySelect(bundleServicePriceObj.priceMethod?.value)
                          ? "NA"
                          : bundleServicePriceObj.priceMethod?.label}
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
                        {isEmptySelect(bundleServicePriceObj.priceType?.value)
                          ? "NA"
                          : bundleServicePriceObj.priceType?.label}
                      </h6>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        START USAGE
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(bundleServicePriceObj.startUsage)
                          ? "NA"
                          : bundleServicePriceObj.startUsage}
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
                        {isEmpty(bundleServicePriceObj.endUsage)
                          ? "NA"
                          : bundleServicePriceObj.endUsage}
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
                        {isEmptySelect(bundleServicePriceObj.frequency?.value)
                          ? "NA"
                          : bundleServicePriceObj.frequency?.label}
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
                        {isEmptySelect(bundleServicePriceObj.usageUnit?.value)
                          ? "NA"
                          : bundleServicePriceObj.usageUnit?.label}
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
                        {isEmpty(bundleServicePriceObj.recommendedValue)
                          ? "NA"
                          : bundleServicePriceObj.recommendedValue}
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
                        {isEmpty(bundleServicePriceObj.numberOfEvents)
                          ? "NA"
                          : bundleServicePriceObj.numberOfEvents}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        CALCULATED PRICE
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {bundleServicePriceObj.priceType?.value !==
                        "USAGE_BASED"
                          ? bundleServicePriceObj.calculatedPrice
                          : "NA"}
                        {/* {isEmpty(bundleServicePriceObj.calculatedPrice)
                          ? "NA"
                          : bundleServicePriceObj.priceType?.value !==
                            "USAGE_BASED"
                            ? "NA"
                            : bundleServicePriceObj.calculatedPrice} */}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        BASE PRICE
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(bundleServicePriceObj.totalPrice)
                          ? "NA"
                          : bundleServicePriceObj.totalPrice}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                        {" "}
                        COST PER HOUR
                      </p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {isEmpty(bundleServicePriceObj.calculatedPrice)
                          ? "NA"
                          : bundleServicePriceObj.priceType?.value !==
                            "USAGE_BASED"
                          ? "NA"
                          : bundleServicePriceObj.calculatedPrice}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row mt-3 input-fields">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      {" "}
                      NAME
                    </label>
                    <input
                      className="form-control border-radius-10 text-primary"
                      type="text"
                      disabled
                      value={bundleServiceItemObj.itemName}
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DESCRIPTION
                    </label>
                    <input
                      className="form-control border-radius-10 text-primary"
                      type="text"
                      placeholder="Description"
                      name="itemHeaderDescription"
                      autoComplete="off"
                      value={bundleServiceItemHeader.itemHeaderDescription}
                      onChange={(e) =>
                        handleTextChange(e, "bundleServiceItemHeader", "text")
                      }
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
              </div>
              <div className="border border-radius-10 mt-3 py-2 px-3">
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        {" "}
                        PRICE METHOD
                      </label>
                      <Select
                        className="text-primary"
                        options={priceMethodKeyValuePair}
                        value={bundleServicePriceObj.priceMethod}
                        onChange={(e) =>
                          handleTextChange(
                            e,
                            "bundleServicePriceObj",
                            "select",
                            "priceMethod"
                          )
                        }
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        PRICE TYPE
                      </label>
                      <Select
                        className="text-primary"
                        options={priceTypeKeyValuePair}
                        value={bundleServicePriceObj.priceType}
                        onChange={(e) =>
                          handleTextChange(
                            e,
                            "bundleServicePriceObj",
                            "select",
                            "priceType"
                          )
                        }
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        START USAGE
                      </label>
                      <div
                        className=" d-flex form-control-date border left-select-div"
                        style={{ borderRadius: "5px" }}
                      >
                        <input
                          className="form-control border-none text-primary"
                          type="number"
                          name="startUsage"
                          value={bundleServicePriceObj.startUsage}
                          onChange={(e) =>
                            handleTextChange(
                              e,
                              "bundleServicePriceObj",
                              "number"
                            )
                          }
                        />
                        <span className="hours-div text-primary">
                          {bundleServicePriceObj.usageUnit == ""
                            ? "select unit"
                            : bundleServicePriceObj.usageUnit.label}
                        </span>
                      </div>
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        END USAGE
                      </label>
                      <div
                        className=" d-flex form-control-date"
                        style={{ overflow: "hidden" }}
                      >
                        <input
                          className="border-none form-control border-radius-10 text-primary"
                          type="number"
                          name="endUsage"
                          value={bundleServicePriceObj.endUsage}
                          onChange={(e) =>
                            handleTextChange(
                              e,
                              "bundleServicePriceObj",
                              "number"
                            )
                          }
                        />
                        <span className="hours-div text-primary">
                          {bundleServicePriceObj.usageUnit == ""
                            ? "select unit"
                            : bundleServicePriceObj.usageUnit.label}
                        </span>
                      </div>
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        FREQUENCY
                      </label>
                      <Select
                        className="text-primary"
                        options={frequencyKeyValuePairs}
                        value={bundleServicePriceObj.frequency}
                        onChange={(e) =>
                          handleTextChange(
                            e,
                            "bundleServicePriceObj",
                            "select",
                            "frequency"
                          )
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
                        className="text-primary"
                        options={unitKeyValuePairs}
                        value={bundleServicePriceObj.usageUnit}
                        onChange={(e) =>
                          handleTextChange(
                            e,
                            "bundleServicePriceObj",
                            "select",
                            "usageUnit"
                          )
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
                        className=" d-flex form-control-date"
                        style={{ overflow: "hidden" }}
                      >
                        <input
                          className="form-control border-none border-radius-10 text-primary"
                          type="number"
                          name="recommendedValue"
                          autoComplete="off"
                          value={bundleServicePriceObj.recommendedValue}
                          onChange={(e) =>
                            handleTextChange(
                              e,
                              "bundleServicePriceObj",
                              "number"
                            )
                          }
                        />
                        <span className="hours-div text-primary">
                          {bundleServicePriceObj.usageUnit == ""
                            ? "select unit"
                            : bundleServicePriceObj.usageUnit?.value === "YEAR"
                            ? "Month"
                            : bundleServicePriceObj.usageUnit.label}
                        </span>
                      </div>
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        NO. OF EVENTS
                      </label>
                      <input
                        className="form-control border-radius-10 text-primary"
                        type="number"
                        name="numberOfEvents"
                        value={bundleServicePriceObj.numberOfEvents}
                        disabled={
                          bundleServicePriceObj.priceType?.value === "FIXED"
                            ? false
                            : true
                        }
                        onChange={(e) =>
                          handleTextChange(e, "bundleServicePriceObj", "number")
                        }
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        CALCULATED PRICE
                      </label>
                      <div
                        className=" d-flex form-control-date"
                        style={{ overflow: "hidden" }}
                      >
                        <input
                          className="form-control border-radius-10 text-primary"
                          type="text"
                          name="calculatedPrice"
                          disabled
                          value={
                            bundleServicePriceObj.priceType?.value !==
                            "USAGE_BASED"
                              ? bundleServicePriceObj.calculatedPrice
                              : null
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        BASE PRICE
                      </label>
                      <div
                        className=" d-flex form-control-date"
                        style={{ overflow: "hidden" }}
                      >
                        <input
                          className="form-control border-none border-radius-10 text-primary"
                          type="number"
                          name="totalPrice"
                          autoComplete="off"
                          disabled
                          value={bundleServicePriceObj.totalPrice}
                          onChange={(e) =>
                            handleTextChange(
                              e,
                              "bundleServicePriceObj",
                              "number"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label className="text-light-dark font-size-14 font-weight-500">
                        COST PER HOUR
                      </label>
                      <div
                        className=" d-flex form-control-date"
                        style={{ overflow: "hidden" }}
                      >
                        <input
                          className="form-control border-none border-radius-10 text-primary"
                          type="number"
                          name="calculatedPrice"
                          autoComplete="off"
                          disabled
                          value={
                            bundleServicePriceObj.priceType?.value !==
                            "USAGE_BASED"
                              ? null
                              : bundleServicePriceObj.calculatedPrice
                          }
                          onChange={(e) =>
                            handleTextChange(
                              e,
                              "bundleServicePriceObj",
                              "number"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right my-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveChanges}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </>
      )}
      {!isLastRow && (
        <div className="p-3 d-flex align-items-center justify-content-between table-header-div">
          <div className="" />
          <div className="text-white">Item Name</div>
          <div className="text-white">Description</div>
          <div className="text-white">Strategy</div>
          <div className="text-white">Task Type</div>
          <div className="text-white">Quantity</div>
          <div className="text-white">Recommended Value</div>
          <div className="text-white">Template/Kit Id</div>
        </div>
      )}
    </>
  );
};

export default ExpendBundleServiceItem;

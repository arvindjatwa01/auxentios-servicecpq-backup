import React, { useState, useEffect } from 'react'

import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tab } from "@mui/material";

import {
    createPortfolio,
    getPortfolio,
    getPortfolioSchema,
    getMakeKeyValue,
    getModelKeyValue,
    getPrefixKeyValue,
    updatePortfolio,
    getUsageCategoryKeyValue,
    getTaskTypeKeyValue,
    getResponseTimeTaskKeyValue,
    getValidityKeyValue,
    getStrategyTaskKeyValue,
    getProductHierarchyKeyValue,
    getGergraphicKeyValue,
    getMachineTypeKeyValue,
    getTypeKeyValue,
    getPortfolioCommonConfig,
    getSearchQueryCoverage,
    getSearchCoverageForFamily,
    itemCreation,
    createCoverage,
    getItemPrice,
    updateItemData,
    deleteItem,
    getComponentCodeSuggetions,
    itemPriceDataId,
    updateItemPriceData,
    updateCustomPortfolio,
    customitemCreation,
    createCustomPortfolio,
    createCutomCoverage,
    updateCustomItemData,
    deleteCustomItem,
    customPriceCreation,
    getcustomItemPrice,
    quoteCreation,
    getQuoteMasterData,
    getSearchQuoteData,
    updateMasterQuoteData,
    deleteMasterQuote
} from "../../services/index";

const ExpendCustomItemTablePopup = ({ data, ...props }) => {

    const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
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
        strategyTask: "",
        year: "",
        noOfYear: "",
        headerdescription: "",
      });
      const [tabs, setTabs] = useState("1");
      const handleAddPortfolioSave = () => {
        if (props.compoFlag === "itemEdit") {
          props.handleItemEditSave(addPortFolioItem);
        } else if (props.compoFlag === "ITEM") {
          props.setTabs("2");
          props.getAddportfolioItemDataFun(addPortFolioItem);
        } else {
          props.getAddportfolioItemData(addPortFolioItem)
          props.setBundleTabs("3");
        }
      };
    const [expandedPriceCalculator, setExpandedPriceCalculator] = useState({
        itemId: "",
        description: "",
        startUsage: "",
        endUsage: "",
        frequency: "",
        recommendedValue: "",
        numberOfEvents: "",
        priceMethod: "",
        priceAdditionalSelect: "",
        priceAdditionalInput: "",
        priceEscalationSelect: "",
        priceEscalationInput: "",
        calculatedPrice: "",
        flatPrice: "",
        discountTypeSelect: "",
        discountTypeInput: "",
    });

    const options = [
        { value: "chocolate", label: "Construction-Heavy" },
        { value: "strawberry", label: "Construction-Low" },
        { value: "vanilla", label: "Construction-Medium" },
        { value: "Construction", label: "Construction" },
    ];

    const handleExpandedPriceSave = async (e, rowData) => {
        try {
            const { customItemId, itemName, customItemHeaderModel, customItemBodyModel } = rowData
            let reqObj1 = {
                customItemId,
                itemName,
                customItemHeaderModel,
                customItemBodyModel: {
                    ...customItemBodyModel,
                    itemBodyDescription: $("#description").val(),
                    startUsage: $("#startUsage").val(),
                    endUsage: $("#endUsage").val(),
                    frequency: $("#frequency").val(),
                    recommendedValue: parseInt($("#recommendedValue").val()),
                    numberOfEvents: parseInt($("#numberOfEvents").val()),
                    priceMethod: expandedPriceCalculator.priceMethod.value,
                    additional: $("#priceAdditionalInput").val(),
                    priceEscalation: $("#priceEscalationInput").val(),
                    calculatedPrice: parseInt($("#calculatedPrice").val()),
                    flatPrice: parseInt($("#flatPrice").val()),
                    discountType: $("#discountTypeInput").val(),
                }
            }
            const res = await updateCustomItemData(customItemId, reqObj1)
            if (res.status == 200) {
                toast(`😎 ${customItemId}: price updated`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

    }

    const handleExpandePriceChange = (e) => {
        // setExpandedPriceCalculator({ ...expandedPriceCalculator, [e.target.name]: e.target.value })
    }

    useEffect(() => {
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
    }, [])

    return (
        <>
            <div className="ligt-greey-bg p-2">
                <div>
                    {/* <span className="mr-3">
          <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
          <span className="ml-2 font-size-14">Edit</span>
        </span> */}
                    {/* <span className="mr-3">
                        <FormatListBulletedOutlinedIcon className=" font-size-16" />
                        <span className="ml-2 font-size-14">Related Standard Job</span>
                    </span>
                    <span className="mr-3">
                        <AccessAlarmOutlinedIcon className=" font-size-16" />
                        <span className="ml-2 font-size-14">Related Kit</span>
                    </span> */}
                    <TabContext value={tabs}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            <TabList className="custom-tabs-div"
              onChange={(e, newValue) => setTabs(newValue)}
              aria-label="lab API tabs example"
            >
              <Tab label="Related template(s)" value="1" />
              <Tab label="Related Kit" value="2" disabled={addPortFolioItem.templateId != ""} />
            </TabList>
          </Box>
          <TabPanel value="1">
            {" "}
            <p className="mt-4 font-size-14">TEMPLATES</p>
            <div className="row input-fields">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    TEMPLATE ID
                  </label>
                  <Select
                    options={options}
                    className="text-primary"
                    placeholder="TEMPLATE ID"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        templateId: e,
                      })
                    }
                    value={addPortFolioItem.templateId}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    TEMPLATE DESCRIPTION
                  </label>
                  <Select
                    options={options}
                    className="text-primary"
                    placeholder="TEMPLATE DESCRIPTION"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        templateDescription: e,
                      })
                    }
                    value={addPortFolioItem.templateDescription}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <div className="mt-4">
                    <a
                      href="#"
                      className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                    >
                      <span className="mr-2">+</span>Add Template / Kit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <p className="mt-4 font-size-14">REPAIR OPTIONS</p>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    REPAIR OPTION
                  </label>
                  <Select
                    options={options}
                    placeholder="REPAIR OPTION"
                    className="text-primary"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        repairOption: e,
                      })
                    }
                    value={addPortFolioItem.repairOption}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <div className="mt-4">
                    <a
                      href="#"
                      className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                    >
                      <span className="mr-2">+</span>Add Repair Option
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right pb-2">
              <Link
                to="#"
                className="btn border mr-4"
                onClick={handleAddPortfolioSave}
              >
                {props.compoFlag === "itemEdit"
                  ? "Save Changes"
                  : "Save & Continue"}
              </Link>
            </div>
          </TabPanel>
        </TabContext>
                </div>
            </div>
            <div className="row mt-3 input-fields">
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            ID
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            defaultValue={data.customItemId}
                            // value={expandedPriceCalculator.itemId}
                            placeholder="Service/Bundle ID"
                            disabled
                        />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            Description
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            placeholder="Description"
                            name="description"
                            id="description"
                            defaultValue={data.customItemBodyModel.itemBodyDescription}
                            // value={expandedPriceCalculator.description}
                            // onChange={handleExpandePriceChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            Frequency
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            id="frequency"
                            defaultValue={data.customItemBodyModel.frequency}
                            // value={expandedPriceCalculator.frequency}
                            // onChange={handleExpandePriceChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            Recommonded Value
                        </label>
                        <input
                            type="number"
                            className="form-control border-radius-10 text-primary"
                            id="recommendedValue"
                            defaultValue={data.customItemBodyModel.recommendedValue}
                            // value={expandedPriceCalculator.recommendedValue}
                            // onChange={handleExpandePriceChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            Start Usage
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            id="startUsage"
                        // value={expandedPriceCalculator.startUsage}
                        // onChange={handleExpandePriceChange}
                        />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            End Usage
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            id="endUsage"
                        // value={expandedPriceCalculator.endUsage}
                        // onChange={handleExpandePriceChange}
                        />
                    </div>
                </div>

                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            No. of Events
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            // placeholder="Description"
                            id="numberOfEvents"
                        // value={expandedPriceCalculator.numberOfEvents}
                        // onChange={handleExpandePriceChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3 input-fields">
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            PRICE METHOD
                        </label>
                        <Select
                            options={priceMethodKeyValue}
                            id="priceMethod"
                            value={expandedPriceCalculator.priceMethod}
                            onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceMethod: e })}
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
                                    id="priceAdditionalSelect"
                                    options={options}
                                    placeholder="Select"
                                // value={expandedPriceCalculator.priceAdditionalSelect}
                                // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceAdditionalSelect: e })}
                                />
                            </div>
                            <input
                                type="text" 
                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                placeholder="10%"
                                value={expandedPriceCalculator.priceAdditionalInput}
                                id="priceAdditionalInput"
                                onChange={handleExpandePriceChange}
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
                                options={options}
                                placeholder="placeholder "
                            // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceEscalationSelect: e })}
                            // value={expandedPriceCalculator.priceEscalationSelect}
                            />
                            <input
                                type="text"
                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                placeholder="20%"
                                id="priceEscalationInput"
                            // defaultValue={data.itemBodyModel.priceEscalation}
                            // value={expandedPriceCalculator.priceEscalationInput}
                            // onChange={handleExpandePriceChange}
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
                            id="calculatedPrice"
                            placeholder="$100"
                        // value={expandedPriceCalculator.calculatedPrice}
                        // onChange={handleExpandePriceChange}
                        />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                            for="exampleInputEmail1"
                        >
                            FLAT PRICE / ADJUSTED PRIC
                        </label>
                        <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            id="flatPrice"
                            placeholder="$100"
                        // value={expandedPriceCalculator.flatPrice}
                        // onChange={handleExpandePriceChange}
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
                                    id="discountTypeSelect"
                                    isClearable={true}
                                    options={options}
                                    placeholder="Select"
                                // defaultValue={data.itemBodyModel.startUsage}
                                // value={expandedPriceCalculator.discountTypeSelect}
                                // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, discountTypeSelect: e })}
                                />
                            </div>
                            <input
                                type="text"
                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                id="discountTypeInput"
                                placeholder="10%"
                            // defaultValue={data.itemBodyModel.discountType}
                            // value={expandedPriceCalculator.discountTypeInput}
                            // onChange={handleExpandePriceChange}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <div className="text-right">
                <button type="button" className="btn btn-light" onClick={(e) => handleExpandedPriceSave(e, data)}>Save</button>
            </div>
        </>
    )
}

export default ExpendCustomItemTablePopup

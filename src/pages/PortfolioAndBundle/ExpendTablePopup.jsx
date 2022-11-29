import React, { useState, useEffect } from 'react'

import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";

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
    updateItemPriceData
} from "../../services/index";

const ExpendTablePopup = ({ data, ...props }) => {

    console.log("props : ", data);

    const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);

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

    useEffect(() => {
        getPortfolioCommonConfig("price-method")
            .then((res) => {
                console.log("hello");
                const options = res.map((d) => ({
                    value: d.key,
                    label: d.value,
                }));
                setPriceMethodKeyValue(options);
            })
    }, [])


    const handleExpandePriceChange = event => {
        console.log("e is : ", event);
        console.log("value is : ", event.target.value);
        console.log("name is : ", event.target.name);

        // console.log("expandedPriceCalculator 1 : ", expandedPriceCalculator)
        // console.log("description : ", expandedPriceCalculator.description);

        setExpandedPriceCalculator({
            ...expandedPriceCalculator,
            [event.target.name]: event.target.value
        })
        // console.log("expandedPriceCalculator 2 : ", expandedPriceCalculator)
    }

    const handleExpandedPriceSave = async (e, rowData) => {
        try {
            const { itemId, itemName, itemHeaderModel, itemBodyModel } = rowData
            let reqObj1 = {
                itemId,
                itemName,
                itemHeaderModel,
                itemBodyModel: {
                    ...itemBodyModel,
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
            const res = await updateItemData(itemId, reqObj1)
            if (res.status == 200) {
                toast(`😎 ${itemId}: price updated`, {
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

    const optionsusage = [
        { value: "chocolate", label: "/Hour" },
        { value: "strawberry", label: "/Km" },
        { value: "vanilla", label: "/Miles" },
        { value: "Construction", label: "/Year" },
        { value: "Construction", label: "/Month" },
        { value: "Construction", label: "/Day" },
        { value: "Construction", label: "/Quarter" },
    ];
    const options = [
        { value: "chocolate", label: "Construction-Heavy" },
        { value: "strawberry", label: "Construction-Low" },
        { value: "vanilla", label: "Construction-Medium" },
        { value: "Construction", label: "Construction" },
    ];

    return (
        <>
            <div className="ligt-greey-bg p-2">
                <div>
                    {/* <span className="mr-3">
          <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
          <span className="ml-2 font-size-14">Edit</span>
        </span> */}
                    <span className="mr-3">
                        <FormatListBulletedOutlinedIcon className=" font-size-16" />
                        <span className="ml-2 font-size-14">Related Standard Job</span>
                    </span>
                    <span className="mr-3">
                        <AccessAlarmOutlinedIcon className=" font-size-16" />
                        <span className="ml-2 font-size-14">Related Kit</span>
                    </span>
                </div>
            </div>
            <div className="row mt-3">
                {/* <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            ID
                        </label>
                        <input
                            className="form-control border-radius-10"
                            type="text"
                            defaultValue={data.itemId}
                            value={expandedPriceCalculator.itemId}
                            placeholder="Service/Bundle ID"
                            disabled
                        />
                    </div>
                </div> */}
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            Name
                        </label>
                        <input
                            className="form-control border-radius-10"
                            type="text"
                            defaultValue={data.itemName}
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
                            className="form-control border-radius-10"
                            type="text"
                            placeholder="Description"
                            name="description"
                            id="description"
                            defaultValue={data.itemBodyModel.itemBodyDescription}
                            // value={expandedPriceCalculator.description}
                            onChange={handleExpandePriceChange}
                            // onChange={handlePriceMethodSelect}
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
                            className="form-control border-radius-10"
                            type="text"
                            id="frequency"
                            defaultValue={data.itemBodyModel.frequency}
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
                            className="form-control border-radius-10"
                            id="recommendedValue"
                            defaultValue={data.itemBodyModel.recommendedValue}
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
                        <div className=" d-flex form-control-date border left-select-div" style={{borderRadius: "5px"}}>
                            
                            <input
                            className="form-control border-none "
                            type="text"
                            id="startUsage"
                        // value={expandedPriceCalculator.startUsage}
                        // onChange={handleExpandePriceChange}
                        />
                       
                                <Select
                                    isClearable={true}
                                    id=""
                                    options={optionsusage}
                                    placeholder="Select"
                                // value={expandedPriceCalculator.priceAdditionalSelect}
                                // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceAdditionalSelect: e })}
                                />
                            
                        </div>
                        
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            End Usage
                        </label>
                       
                        <div
                    className=" d-flex form-control-date"
                    style={{ overflow: "hidden" }}
                  >
                   <input
                            className="form-control border-radius-10"
                            type="text"
                            id="endUsage"
                        // value={expandedPriceCalculator.endUsage}
                        // onChange={handleExpandePriceChange}
                        />
                    
                    <span className="hours-div">hours</span>
                  </div>
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
                            className="form-control border-radius-10"
                            type="text"
                            // placeholder="Description"
                            id="numberOfEvents"
                        // value={expandedPriceCalculator.numberOfEvents}
                        // onChange={handleExpandePriceChange}
                        />
                    </div>
                </div>
            </div>
            <div className="row mb-3 ">
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
                            name="priceMethod"
                            // onChange={handlePriceMethodSelect}
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
                                className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
                                className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
                            className="form-control border-radius-10"
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
                            FLAT PRICE / ADJUSTED PRICE
                        </label>
                        <input
                            type="text"
                            className="form-control border-radius-10"
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
                                className="form-control rounded-top-left-0 rounded-bottom-left-0"
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
            <div className="text-right mb-4">
                <button type="button" className="btn btn-light" onClick={(e) => handleExpandedPriceSave(e, data)}>Save</button>
            </div>
            <div className='p-3 d-flex align-items-center justify-content-between table-header-div'>
                <div className=''></div>
                <div className='text-white'>Item ID</div>
                <div className='text-white'>Description</div>
                <div className='text-white'>Usage In</div>
                <div className='text-white'>Strategy</div>
                <div className='text-white'>Task Type</div>
                <div className='text-white'>Quantity</div>
                <div className='text-white'>Recommended Value</div>
                <div className='text-white'>Template/Kit ID</div>
            </div>
        </>
    )
}

export default ExpendTablePopup

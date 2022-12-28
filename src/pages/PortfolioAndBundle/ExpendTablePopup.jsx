import React, { useState, useEffect } from 'react'

import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import {
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
    getSearchStandardJobId,
    getSearchKitId
} from "../../services/index";

const ExpendTablePopup = ({ data, ...props }) => {

    console.log("props : ", data);

    const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
    const [querySearchStandardJobResult, setQuerySearchStandardJobResult] = useState([]);
    const [querySearchRelatedKitResult, setQuerySearchRelatedKitResult] = useState([]);


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

    const [tabs, setTabs] = useState("0");
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
    const [addPortFolioItem, setAddportFolioItem] = useState({
        id: 0,
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
    });
    const handleAddPortfolioSave = () => {
        if (props.compoFlag === "itemEdit") {
            props.handleItemEditSave(addPortFolioItem);
        } else if (props.compoFlag === "ITEM") {
            props.setTabs("2");
            props.getAddportfolioItemDataFun(addPortFolioItem);
            console.log("addPortFolioItem : ", addPortFolioItem)
        } else {
            props.getAddportfolioItemData(addPortFolioItem)
            props.setBundleTabs("3");
        }
    };
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

    const handleStandardJobInputSearch = (e) => {

        setAddportFolioItem({
            ...addPortFolioItem,
            templateId: e.target.value,
        })
        var searchStr = e.target.value;
        getSearchStandardJobId(searchStr)
            .then((res) => {
                // console.log("search Query Result --------- :", res);
                // setMasterData(res);
                $(`.scrollbar-model`).css("display", "block");
                setQuerySearchStandardJobResult(res)
                var preArr = [];
                for (var n = 0; n < res.length; n++) {
                    preArr.push({ label: res[n].prefix, value: res[n].prefix })
                }
                // setQuerySearchModelPrefixOption(preArr);
            })
            .catch((err) => {
                console.log("error in getSearchQueryCoverage", err);
            });
    }

    const handleRelatedKitInputSearch = (e) => {
        setAddportFolioItem({
            ...addPortFolioItem,
            repairOption: e.target.value,
        })
        var searchStr = e.target.value;
        getSearchKitId(searchStr)
            .then((res) => {
                // console.log("search Query Result --------- :", res);
                // setMasterData(res);
                $(`.scrollbar-model`).css("display", "block");
                setQuerySearchRelatedKitResult(res)
                var preArr = [];
                for (var n = 0; n < res.length; n++) {
                    preArr.push({ label: res[n].prefix, value: res[n].prefix })
                }
                // setQuerySearchModelPrefixOption(preArr);
            })
            .catch((err) => {
                console.log("error in getSearchQueryCoverage", err);
            });
    }

    const handleSearchStandardJobListClick = (e, currentItem) => {

        console.log("currentItem : ", currentItem);
        // templateDescription
        setAddportFolioItem({
            ...addPortFolioItem,
            templateId: currentItem.standardJobId,
            templateDescription: { label: currentItem.description, value: currentItem.description },
        })
        $(`.scrollbar-model`).css("display", "none");
    }


    const handleSearchRelatedKitListClick = (e, currentItem) => {

        console.log("currentItem : ", currentItem);
        // templateDescription
        setAddportFolioItem({
            ...addPortFolioItem,
            repairOption: currentItem.kitId,
            // templateDescription: { label: currentItem.description, value: currentItem.description },
        })
        $(`.scrollbar-model`).css("display", "none");
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
            <div className="bg-white p-2">
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
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="model"
                                            placeholder="TEMPLATE ID"
                                            value={addPortFolioItem.templateId}
                                            // onChange={handleAddServiceBundleChange}
                                            onChange={(e) => handleStandardJobInputSearch(e)}
                                        />
                                        {
                                            <ul
                                                className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                                id="style"
                                            >
                                                {querySearchStandardJobResult.map((currentItem, j) => (
                                                    <li
                                                        className="list-group-item"
                                                        key={j}
                                                        onClick={(e) => handleSearchStandardJobListClick(
                                                            e,
                                                            currentItem
                                                        )}
                                                    // onClick={(e) =>
                                                    //   handleSearchListClick(
                                                    //     e,
                                                    //     currentItem,
                                                    //   )
                                                    // }
                                                    >
                                                        {currentItem.standardJobId}  {currentItem.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        {/* <Select
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
                  /> */}
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
                                            isDisabled
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
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="repairOption"
                                            placeholder="REPAIR OPTION"
                                            value={addPortFolioItem.repairOption}
                                            onChange={(e) => handleRelatedKitInputSearch(e)}
                                        />
                                        {
                                            <ul
                                                className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                                id="style"
                                            >
                                                {querySearchRelatedKitResult.map((currentItem, j) => (
                                                    <li
                                                        className="list-group-item"
                                                        key={j}
                                                        onClick={(e) => handleSearchRelatedKitListClick(
                                                            e,
                                                            currentItem
                                                        )}
                                                    // onClick={(e) =>
                                                    //   handleSearchListClick(
                                                    //     e,
                                                    //     currentItem,
                                                    //   )
                                                    // }
                                                    >
                                                        {currentItem.kitId}  {currentItem.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        {/* <Select
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
                                        /> */}
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
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            defaultValue={data.itemName}
                            // value={expandedPriceCalculator.itemId}
                            placeholder="Service/Bundle ID"
                            disabled
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                            defaultValue={data.itemBodyModel.itemBodyDescription}
                            // value={expandedPriceCalculator.description}
                            onChange={handleExpandePriceChange}
                            // onChange={handlePriceMethodSelect}
                            autoComplete="off"
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                            className="form-control border-radius-10 text-primary"
                            id="recommendedValue"
                            defaultValue={data.itemBodyModel.recommendedValue}
                            // value={expandedPriceCalculator.recommendedValue}
                            // onChange={handleExpandePriceChange}
                            autoComplete="off"
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label
                            className="text-light-dark font-size-12 font-weight-500"
                        >
                            Start Usage
                        </label>
                        <div className=" d-flex form-control-date border left-select-div" style={{ borderRadius: "5px" }}>

                            <input
                                className="form-control border-none text-primary"
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
                                className='text-primary'
                            // value={expandedPriceCalculator.priceAdditionalSelect}
                            // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceAdditionalSelect: e })}
                            />
                        
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
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
                                className="form-control border-radius-10 text-primary"
                                type="text"
                                id="endUsage"
                            // value={expandedPriceCalculator.endUsage}
                            // onChange={handleExpandePriceChange}
                            />

                            <span className="hours-div">hours</span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
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
                        <div className="css-w8dmq8">*Mandatory</div>
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
                            className="text-primary"
                            id="priceMethod"
                            value={expandedPriceCalculator.priceMethod}
                            name="priceMethod"
                            // onChange={handlePriceMethodSelect}
                            onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceMethod: e })}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                                className="select-input text-primary"
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
                        <div className="css-w8dmq8">*Mandatory</div>
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
                                    className='text-primary'
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

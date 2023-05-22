import React, { useState, useEffect } from 'react'

import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Cookies from "js-cookie";

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
    getSearchKitId,
    getItemPriceData,
    getSolutionPriceCommonConfig,
    getItemDataById,
    portfolioItemPriceRkId,
    portfolioItemPriceSjid
} from "../../services/index";
import AddPortfolioItem from './AddPortfolioItem';

const ExpendTablePopup = ({ data, ...props }) => {

    console.log("props : ", data); var CookiesSetData = Cookies.get("loginTenantDtl");
    var getCookiesJsonData;
    if (CookiesSetData != undefined) {
        getCookiesJsonData = JSON.parse(CookiesSetData);
    }
    const loginTenantId = CookiesSetData != undefined ? getCookiesJsonData?.user_tenantId : 74;

    const [expendedBundleServiceData, setExpendedBundleServiceData] = useState({
        itemId: 0,
        itemName: 0,
        itemBodyModel: {},
        itemHeaderModel: {}
    });
    const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
    const [querySearchStandardJobResult, setQuerySearchStandardJobResult] = useState([]);
    const [querySearchRelatedKitResult, setQuerySearchRelatedKitResult] = useState([]);
    const [priceHeadTypeKeyValue, setPriceHeadTypeKeyValue] = useState([]);
    const [bundleSeriveData, setBundleServiceData] = useState([]);

    const [priceEscalationTypeValue, setPriceEscalationTypeValue] = useState({
        sparePartsEscalation: 0,
        labourEscalation: 0,
        miscEscalation: 0,
        serviceEscalation: 0
    })

    const [escalationPriceOptionsValue, setEscalationPriceOptionValue] = useState("");
    const [escalationPriceOptionsValue1, setEscalationPriceOptionValue1] = useState("");
    const [escalationPriceInputValue, setEscalationPriceInputValue] = useState(0);


    const [addPortFolioItem, setAddPortFolioItem] = useState({
        id: 0,
        name: "",
        description: "",
        frequency: "",
        recommendedValue: "",
        startUsage: "",
        endUsage: "",
        usageIn: "",
        noOfEvents: "",
        taskType: "",
        unit: "",
        quantity: 1,
        numberOfEvents: "",
        templateId: "",
        templateDescription: "",
        repairOption: "",
        strategyTask: "",
    });

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
        netPrice: 1200,
        totalPrice: 1200,
        listPrice: "",
        calculatedPrice: "",
        priceYear: "",
        usageType: "",
        frequency: "",
        cycle: "",
        suppresion: "",
        id: "",
        portfolioDataId: 0,
    });

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

    const frequencyOptions = [
        { label: "Cyclic", value: "Cyclic" },
        { label: "once", value: "once" },
        { label: "alternate", value: "alternate" },
        { label: "Custom", value: "Custom" },
    ];

    const [additionalPriceHeadTypeKeyValue, setAdditionalPriceHeadTypeKeyValue] = useState([
        // { label: "Surcharge Percentage", value: "PERCENTAGE" },
        // { label: "Surcharge Dollar", value: "ABSOLUTE", },
        { label: "Surcharge %", value: "PERCENTAGE" },
        { label: "Surcharge $", value: "ABSOLUTE", },
    ])

    const discountTypeOptions = [
        { value: "PROGRAM_DISCOUNT", label: "Program" },
        { value: "CUSTOMER_DISCOUNT", label: "Customer" },
        { value: "PORTFOLIO_DISCOUNT", label: "Portfolio" },
    ]

    useEffect(() => {
        // getPortfolioCommonConfig("price-method")
        //     .then((res) => {
        //         console.log("hello");
        //         const options = res.map((d) => ({
        //             value: d.key,
        //             label: d.value,
        //         }));
        //         setPriceMethodKeyValue(options);
        //     })

        getSolutionPriceCommonConfig("price-method")
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
                setPriceMethodKeyValue(options);
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
    }, [])

    useEffect(() => {


        fetchBundleServiceDataById();
        // const newItemDataData = await getItemDataById(data.itemId)

        // console.log("data.frequency ", data.itemBodyModel.frequency)
        // setAddPortFolioItem({
        //     ...addPortFolioItem,
        //     id: data.itemId,
        //     name: data.itemName,
        //     description: data.itemHeaderModel.itemHeaderDescription,
        //     // frequency: { label: data.itemBodyModel.frequency, value: data.itemBodyModel.frequency },
        //     frequency: (data.itemBodyModel.frequency != "" ||
        //         data.itemBodyModel.frequency != "EMPTY" ||
        //         data.itemBodyModel.frequency != null) ? {
        //         label: data.itemBodyModel.frequency,
        //         value: data.itemBodyModel.frequency,
        //     } : { label: "once", value: "once" },
        // });

        // if (data.itemBodyModel?.itemPrices.length > 0) {
        //     ItemPriceDataFetchById();
        // }
    }, [])


    const fetchBundleServiceDataById = async () => {
        const fetchItemDetailsById = await getItemDataById(data.itemId);
        if (fetchItemDetailsById.status === 200) {

            // const newItemDataData = await getItemDataById(data.itemId)
            setExpendedBundleServiceData(fetchItemDetailsById.data)
            const newItemDataData = fetchItemDetailsById.data

            setAddPortFolioItem({
                ...addPortFolioItem,
                id: newItemDataData.itemId,
                name: newItemDataData.itemName,
                description: newItemDataData.itemHeaderModel.itemHeaderDescription,
                // frequency: { label: newItemDataData.itemBodyModel.frequency, value: newItemDataData.itemBodyModel.frequency },
                frequency: (newItemDataData.itemBodyModel.frequency != "" ||
                    newItemDataData.itemBodyModel.frequency != "EMPTY" ||
                    newItemDataData.itemBodyModel.frequency != null) ? {
                    label: newItemDataData.itemBodyModel.frequency,
                    value: newItemDataData.itemBodyModel.frequency,
                } : { label: "once", value: "once" },
                unit: (newItemDataData.itemBodyModel.unit != "" ||
                    newItemDataData.itemBodyModel.unit != "EMPTY" ||
                    newItemDataData.itemBodyModel.unit != null) ? {
                    label: newItemDataData.itemBodyModel.unit,
                    value: newItemDataData.itemBodyModel.unit,
                } : { label: "per day", value: "per day" },
                repairOption: data.repairKitId,
                templateId: data.standardJobId,
            });

            if (newItemDataData.itemBodyModel?.itemPrices.length > 0) {
                console.log("newItemDataData =========== 272", newItemDataData);
                ItemPriceDataFetchById(newItemDataData);
            }
        }
    }



    const ItemPriceDataFetchById = async (itemPriceData) => {


        const priceId = itemPriceData.itemBodyModel.itemPrices[0].itemPriceDataId;
        console.log("priceId 283 ", priceId);

        const priceDataId = itemPriceData.itemBodyModel.itemPrices[0].itemPriceDataId;

        const resPrice = await getItemPriceData(priceDataId)

        console.log("resPrice 291 ", resPrice);

        // console.log("resPrice.itemPriceData.additionalPriceType ", resPrice.itemPriceData.additionalPriceType)

        if (resPrice.status === 200) {


            setPriceCalculator({
                ...priceCalculator,
                priceMethod: (resPrice.data.priceMethod != "EMPTY" ||
                    resPrice.data.priceMethod != "" ||
                    resPrice.data.priceMethod != null) ? {
                    label: resPrice.data.priceMethod,
                    value: resPrice.data.priceMethod
                } : "",
                priceType: (resPrice.data.priceType != "EMPTY" ||
                    resPrice.data.priceType != "" ||
                    resPrice.data.priceType != null) ? {
                    label: resPrice.data.priceType,
                    value: resPrice.data.priceType
                } : "",
                priceAdditionalSelect: (resPrice.data.additionalPriceType == "" ||
                    resPrice.data.additionalPriceType == "EMPTY" ||
                    resPrice.data.additionalPriceType == null) ?
                    { label: "Surcharge $", value: "ABSOLUTE", }
                    : {
                        label: resPrice.data.additionalPriceType,
                        value: resPrice.data.additionalPriceType
                    },
                priceAdditionalInput: resPrice.data.additionalPriceValue,
                discountTypeSelect: (resPrice.data.discountType != "EMPTY" ||
                    resPrice.data.discountType != "" ||
                    resPrice.data.discountType != null) ? {
                    label: resPrice.data.discountType,
                    value: resPrice.data.discountType
                } : "",
                discountTypeInput: resPrice.data.discountValue,
                year: {
                    label: resPrice.data.year, value: resPrice.data.year
                },
                noOfYear: resPrice.data.noOfYear,
                startUsage: resPrice.data.startUsage,
                endUsage: resPrice.data.endUsage,
                recommendedValue: resPrice.data.recommendedValue,
                netPrice: resPrice.data.netService,
                totalPrice: resPrice.data.totalPrice,
                numberOfEvents: resPrice.data.numberOfEvents,
                calculatedPrice: resPrice.data.calculatedPrice,
                id: resPrice.data.itemPriceDataId,
                portfolioDataId: resPrice.data.portfolio.portfolioId,
            })
            console.log("resPrice ======== 292 ", resPrice.data);
            const fetchItemDetailsById = await getItemDataById(data.itemId);
            console.log("fetchItemDetailsById ======= 344", fetchItemDetailsById);
            if (fetchItemDetailsById.status === 200) {
                // const newItemDataData = await getItemDataById(data.itemId)
                const newItemDataData = fetchItemDetailsById.data;
                console.log("data.itemBodyModel.frequency ", data)
                setAddPortFolioItem({
                    ...addPortFolioItem,
                    id: newItemDataData.itemId,
                    name: newItemDataData.itemName,
                    description: newItemDataData.itemHeaderModel.itemHeaderDescription,
                    frequency: (newItemDataData.itemBodyModel.frequency != "" ||
                        newItemDataData.itemBodyModel.frequency != "EMPTY" ||
                        newItemDataData.itemBodyModel.frequency != null) ? {
                        label: newItemDataData.itemBodyModel.frequency,
                        value: newItemDataData.itemBodyModel.frequency,
                    } : { label: "once", value: "once" },
                    templateId: (resPrice.data.standardJobId != "string") ?
                        resPrice.data.standardJobId : "",
                    templateDescription: {
                        label: resPrice.data.templateDescription,
                        value: resPrice.data.templateDescription,
                    },
                    repairOption: (resPrice.data.repairKitId != "string") ?
                        resPrice.data.repairKitId : "",
                    unit: (newItemDataData.itemBodyModel.unit != "" ||
                        newItemDataData.itemBodyModel.unit != "EMPTY" ||
                        newItemDataData.itemBodyModel.unit != null) ? {
                        label: newItemDataData.itemBodyModel.unit,
                        value: newItemDataData.itemBodyModel.unit,
                    } : { label: "per day", value: "per day" },
                    repairOption: data.repairKitId,
                    templateId: data.standardJobId,
                })
            }

        }
    }

    const handleEscalationPriceValue = (e) => {
        console.log(e)
        setEscalationPriceOptionValue(e.value)
        setEscalationPriceOptionValue1(e)

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

            console.log("rowData.itemBodyModel ", rowData);

            if ((addPortFolioItem.description == "") ||
                (addPortFolioItem.description == undefined) ||
                (addPortFolioItem.description == null)) {
                throw "Description is a required field, you can’t leave it blank";
            }

            if ((priceCalculator.recommendedValue == "") ||
                (priceCalculator.recommendedValue == undefined) ||
                (priceCalculator.recommendedValue == 0)) {
                throw "Recommended Value is a required field, you can’t leave it blank or Zero(0)";
            }

            if ((priceCalculator.startUsage == "") ||
                (priceCalculator.startUsage == undefined) ||
                (priceCalculator.startUsage == 0)) {
                throw "Start usage is a required field, you can’t leave it blank or Zero(0)";
            }

            if ((priceCalculator.endUsage == "") ||
                (priceCalculator.endUsage == undefined) ||
                (priceCalculator.endUsage == 0)) {
                throw "End usage is a required field, you can’t leave it blank or Zero(0)";
            }

            if ((priceCalculator.priceMethod == "") ||
                (priceCalculator.priceMethod == undefined)) {
                throw "Price Method is a required field, you can’t leave it blank";
            }



            // const { itemId, itemName, itemHeaderModel, itemBodyModel } = rowData
            // let reqObj1 = {
            //     itemId,
            //     itemName,
            //     itemHeaderModel,
            //     itemBodyModel: {
            //         ...itemBodyModel,
            //         itemBodyDescription: $("#description").val(),
            //         startUsage: $("#startUsage").val(),
            //         endUsage: $("#endUsage").val(),
            //         frequency: $("#frequency").val(),
            //         recommendedValue: parseInt($("#recommendedValue").val()),
            //         numberOfEvents: parseInt($("#numberOfEvents").val()),
            //         priceMethod: expandedPriceCalculator.priceMethod.value,
            //         additional: $("#priceAdditionalInput").val(),
            //         priceEscalation: $("#priceEscalationInput").val(),
            //         calculatedPrice: parseInt($("#calculatedPrice").val()),
            //         flatPrice: parseInt($("#flatPrice").val()),
            //         discountType: $("#discountTypeInput").val(),
            //     }
            // }

            if (rowData.itemBodyModel.itemPrices.length > 0) {

                const priceUpdateData = {
                    itemPriceDataId: priceCalculator.id,
                    quantity: 0,
                    standardJobId: addPortFolioItem.templateId,
                    repairKitId: addPortFolioItem.repairOption,
                    templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
                    repairOption: "",
                    additional: "",
                    partListId: "",
                    serviceEstimateId: "",
                    numberOfEvents: 0,
                    priceMethod: (priceCalculator.priceMethod != "EMPTY"
                        || priceCalculator.priceMethod != "" ||
                        priceCalculator.priceMethod != null) ?
                        priceCalculator.priceMethod?.value : "EMPTY",
                    priceType: (priceCalculator.priceType != "EMPTY" ||
                        priceCalculator.priceType != "" ||
                        priceCalculator.priceType != null) ? priceCalculator.priceType?.value : "EMPTY",
                    listPrice: 0,
                    priceEscalation: "",
                    calculatedPrice: 0,
                    flatPrice: 0,
                    year: priceCalculator?.year?.value,
                    noOfYear: parseInt(priceCalculator?.noOfYear),
                    // year: addPortFolioItem?.year?.value,
                    // noOfYear: parseInt(addPortFolioItem?.noOfYear),
                    sparePartsPrice: 0,
                    sparePartsPriceBreakDownPercentage: 0,
                    servicePrice: 0,
                    labourPrice: 0,
                    labourPriceBreakDownPercentage: 0,
                    miscPrice: 0,
                    miscPriceBreakDownPercentage: 0,
                    totalPrice: 0,
                    netService: 0,
                    additionalPriceType: (priceCalculator?.additionalPriceType != "EMPTY" ||
                        priceCalculator?.additionalPriceType != "" ||
                        priceCalculator?.additionalPriceType != null) ?
                        priceCalculator?.additionalPriceType : "ABSOLUTE",
                    additionalPriceValue: priceCalculator?.additionalPriceValue,
                    discountType: (priceCalculator?.discountType != "EMPTY" ||
                        priceCalculator?.discountType != "" ||
                        priceCalculator?.discountType != null) ? priceCalculator?.discountType : "EMPTY",
                    discountValue: priceCalculator?.discountValue,
                    recommendedValue: parseInt(priceCalculator?.recommendedValue),
                    startUsage: parseInt(priceCalculator?.startUsage),
                    endUsage: parseInt(priceCalculator?.endUsage),
                    sparePartsEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "PARTS") ?
                        escalationPriceInputValue : 0),
                    labourEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "LABOR") ?
                        escalationPriceInputValue : 0),
                    miscEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "MISCELLANEOUS") ?
                        escalationPriceInputValue : 0),
                    serviceEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "SERVICE") ?
                        escalationPriceInputValue : 0),
                    withBundleService: false,
                    portfolio: (priceCalculator.portfolioDataId != 0) ? {
                        portfolioId: priceCalculator.portfolioDataId
                    } : {},
                    tenantId: loginTenantId,
                    partsRequired: true,
                    labourRequired: true,
                    serviceRequired: false,
                    miscRequired: true,
                    inclusionExclusion: false
                }

                const priceUpdateData1 = {
                    itemPriceDataId: parseInt(priceCalculator.id),
                    quantity: 0,
                    standardJobId: addPortFolioItem.templateId,
                    repairKitId: addPortFolioItem.repairOption,
                    templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
                    repairOption: "",
                    additional: "",
                    partListId: "",
                    serviceEstimateId: "",
                    numberOfEvents: 0,
                    priceMethod: (priceCalculator.priceMethod != "EMPTY"
                        || priceCalculator.priceMethod != "" ||
                        priceCalculator.priceMethod != null) ?
                        priceCalculator.priceMethod?.value : "EMPTY",
                    priceType: (priceCalculator.priceType != "EMPTY" ||
                        priceCalculator.priceType != "" ||
                        priceCalculator.priceType != null) ? priceCalculator.priceType?.value : "EMPTY",
                    listPrice: 0,
                    priceEscalation: "",
                    calculatedPrice: 0,
                    flatPrice: 0,
                    year: priceCalculator?.year?.value,
                    noOfYear: parseInt(priceCalculator?.noOfYear),
                    sparePartsPrice: 0,
                    sparePartsPriceBreakDownPercentage: 0,
                    servicePrice: 0,
                    labourPrice: 0,
                    labourPriceBreakDownPercentage: 0,
                    miscPrice: 0,
                    miscPriceBreakDownPercentage: 0,
                    totalPrice: 0,
                    netService: 0,
                    additionalPriceType: (priceCalculator?.priceAdditionalSelect != "EMPTY" ||
                        priceCalculator?.priceAdditionalSelect != "" ||
                        priceCalculator?.priceAdditionalSelect != null) ?
                        priceCalculator?.priceAdditionalSelect?.value : "ABSOLUTE",
                    additionalPriceValue: priceCalculator?.priceAdditionalInput,
                    discountType: (priceCalculator?.discountTypeSelect != "EMPTY" ||
                        priceCalculator?.discountTypeSelect != "" ||
                        priceCalculator?.discountTypeSelect != null) ?
                        priceCalculator?.discountTypeSelect?.value : "EMPTY",
                    discountValue: priceCalculator?.discountTypeInput,
                    recommendedValue: parseInt(priceCalculator?.recommendedValue),
                    startUsage: parseInt(priceCalculator?.startUsage),
                    endUsage: parseInt(priceCalculator?.endUsage),
                    sparePartsEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "PARTS") ?
                        escalationPriceInputValue : 0),
                    labourEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "LABOR") ?
                        escalationPriceInputValue : 0),
                    miscEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "MISCELLANEOUS") ?
                        escalationPriceInputValue : 0),
                    serviceEscalation: ((escalationPriceOptionsValue != "") &&
                        (escalationPriceOptionsValue == "SERVICE") ?
                        escalationPriceInputValue : 0),
                    withBundleService: false,
                    portfolio: (priceCalculator.portfolioDataId != 0) ? {
                        portfolioId: priceCalculator.portfolioDataId
                    } : {},
                    tenantId: loginTenantId,
                    partsRequired: true,
                    labourRequired: true,
                    serviceRequired: false,
                    miscRequired: true,
                    inclusionExclusion: false
                }

                console.log("priceUpdateData Now : ", priceUpdateData1)
                const updatePriceId = await updateItemPriceData(
                    priceCalculator.id,
                    priceUpdateData1
                );

            }

            let reqItemUpdateObj = {
                itemId: parseInt(addPortFolioItem.id),
                itemName: addPortFolioItem.name,
                itemHeaderModel: {
                    itemHeaderId: 0,
                    itemHeaderDescription: addPortFolioItem.description,
                    bundleFlag: rowData.itemHeaderModel.bundleFlag,
                    portfolioItemId: rowData.itemHeaderModel.portfolioItemId,
                    reference: rowData.itemHeaderModel?.reference,
                    itemHeaderMake: rowData.itemHeaderModel?.itemHeaderMake,
                    itemHeaderFamily: rowData.itemHeaderModel?.itemHeaderFamily,
                    model: rowData.itemHeaderModel?.model,
                    prefix: rowData.itemHeaderModel?.prefix,
                    type: rowData.itemHeaderModel?.type,
                    additional: rowData.itemHeaderModel?.additional,
                    currency: rowData.itemHeaderModel?.currency,
                    netPrice: rowData.itemHeaderModel?.netPrice,
                    itemProductHierarchy: rowData.itemHeaderModel?.itemProductHierarchy,
                    itemHeaderGeographic: rowData.itemHeaderModel?.itemHeaderGeographic,
                    responseTime: rowData.itemHeaderModel?.responseTime,
                    usage: rowData.itemHeaderModel?.usage,
                    validFrom: rowData.itemHeaderModel?.validFrom,
                    validTo: rowData.itemHeaderModel?.validTo,
                    estimatedTime: rowData.itemHeaderModel?.estimatedTime,
                    servicePrice: rowData.itemHeaderModel?.servicePrice,
                    status: rowData.itemHeaderModel?.status,
                    componentCode: rowData.itemHeaderModel?.componentCode,
                    componentDescription: rowData.itemHeaderModel?.componentDescription,
                    serialNumber: rowData.itemHeaderModel?.serialNumber,
                    itemHeaderStrategy: rowData.itemHeaderModel?.itemHeaderStrategy,
                    variant: rowData.itemHeaderModel?.variant,
                    itemHeaderCustomerSegment: rowData.itemHeaderModel?.itemHeaderCustomerSegment,
                    jobCode: rowData.itemHeaderModel?.jobCode,
                    preparedBy: rowData.itemHeaderModel?.preparedBy,
                    approvedBy: rowData.itemHeaderModel?.approvedBy,
                    preparedOn: rowData.itemHeaderModel?.preparedOn,
                    revisedBy: rowData.itemHeaderModel?.revisedBy,
                    revisedOn: rowData.itemHeaderModel?.revisedOn,
                    salesOffice: rowData.itemHeaderModel?.salesOffice,
                    offerValidity: rowData.itemHeaderModel?.offerValidity,
                },
                itemBodyModel: {
                    itemBodyId: parseInt(rowData.itemBodyModel?.itemBodyId),
                    itemBodyDescription: addPortFolioItem.description,
                    spareParts: rowData.itemBodyModel?.spareParts,
                    labours: rowData.itemBodyModel?.labours,
                    miscellaneous: rowData.itemBodyModel?.miscellaneous,
                    taskType: rowData.itemBodyModel?.taskType,
                    solutionCode: rowData.itemBodyModel?.solutionCode,
                    usageIn: rowData.itemBodyModel?.usageIn,
                    usage: rowData.itemBodyModel?.usage,
                    year: priceCalculator?.year?.value,
                    avgUsage: 0,
                    unit: rowData.itemBodyModel?.unit,
                    frequency: addPortFolioItem.frequency != "" ? addPortFolioItem.frequency?.value : "once",
                    recommendedValue: parseInt(priceCalculator.recommendedValue),
                    itemPrices: rowData.itemBodyModel?.itemPrices,
                },
            }


            console.log("reqItemUpdateObj 567 ", reqItemUpdateObj)


            const res = await updateItemData(
                addPortFolioItem.id,
                reqItemUpdateObj)
            if (res.status == 200) {
                toast(`😎 ${rowData.itemName} Item updated successfully`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            if (rowData.itemBodyModel.itemPrices.length > 0) {

                // let reqRkOrSjIdObj = {
                //     standardJobId: addPortFolioItem.templateId,
                //     repairKitId: addPortFolioItem.repairOption,
                //     itemId: addPortFolioItem.id,
                //     itemPriceDataId: priceCalculator.id
                // }
                let reqRkOrSjIdObj = {
                    standardJobId: addPortFolioItem.templateId,
                    repairKitId: addPortFolioItem.repairOption,
                    itemId: addPortFolioItem.id,
                    itemPriceDataId: priceCalculator.id
                }

                // if ((addPortFolioItem.templateId == "") ||
                //     (addPortFolioItem.templateId == null) ||
                //     addPortFolioItem.repairOption != "") {
                //     const updateRkId = portfolioItemPriceRkId(reqRkOrSjIdObj)

                // }
                if (((addPortFolioItem.templateId == "") ||
                    (addPortFolioItem.templateId == null)) &&
                    ((addPortFolioItem.repairOption != "") ||
                        (addPortFolioItem.repairOption != null))) {
                    const updateRkId = portfolioItemPriceRkId(reqRkOrSjIdObj)
                }


                // if ((addPortFolioItem.repairOption == "") ||
                //     (addPortFolioItem.repairOption == null) ||
                //     addPortFolioItem.templateId != "") {
                //     const updateSjId = portfolioItemPriceSjid(reqRkOrSjIdObj)
                // }

                if (((addPortFolioItem.repairOption == "") ||
                    (addPortFolioItem.repairOption == null)) &&
                    ((addPortFolioItem.templateId != "") ||
                        (addPortFolioItem.templateId != null))) {
                    const updateSjId = portfolioItemPriceSjid(reqRkOrSjIdObj)
                }
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

        setAddPortFolioItem({
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
        setAddPortFolioItem({
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
        setAddPortFolioItem({
            ...addPortFolioItem,
            templateId: currentItem.standardJobId,
            templateDescription: { label: currentItem.description, value: currentItem.description },
        })
        $(`.scrollbar-model`).css("display", "none");
    }


    const handleSearchRelatedKitListClick = (e, currentItem) => {

        console.log("currentItem : ", currentItem);
        // templateDescription
        setAddPortFolioItem({
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


    console.log(" ...addPortFolioItem, ", addPortFolioItem,)

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
                                <Tab
                                    label="Related template(s)"
                                    value="1"
                                    disabled={addPortFolioItem.repairOption != "" && addPortFolioItem.repairOption != null}
                                />
                                <Tab
                                    label="Related Kit"
                                    value="2"
                                    disabled={addPortFolioItem.templateId != "" && addPortFolioItem.templateId != null}
                                />
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
                                            placeholder="Template Id"
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
                      setAddPortFolioItem({
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
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="model"
                                            placeholder="Template Description"
                                            value={addPortFolioItem.templateDescription?.value}
                                            disabled
                                            onChange={(e) => handleStandardJobInputSearch(e)}
                                        />
                                        {/* <Select
                                            options={options}
                                            className="text-primary"
                                            placeholder="TEMPLATE DESCRIPTION"
                                            onChange={(e) =>
                                                setAddPortFolioItem({
                                                    ...addPortFolioItem,
                                                    templateDescription: e,
                                                })
                                            }
                                            value={addPortFolioItem.templateDescription}
                                            isDisabled
                                        /> */}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <div className="mt-4">
                                            <a
                                                href="#"
                                                className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                                            >
                                                <span className="mr-2">+</span>Go To Template
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <p className="mt-4 font-size-14">RELATED KIT</p>
                            <div className="row input-fields">
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-12 font-weight-500"
                                            for="exampleInputEmail1"
                                        >
                                            RELATED KIT
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="repairOption"
                                            placeholder="Kit Id"
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
                                                setAddPortFolioItem({
                                                    ...addPortFolioItem,
                                                    repairOption: e,
                                                })
                                            }
                                            value={addPortFolioItem.repairOption}
                                        /> */}
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
                                            for="exampleInputEmail1"
                                        >
                                            KIT DESCRIPTION
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control text-primary border-radius-10"
                                            name="repairOption"
                                            placeholder="Kit Description"
                                            value={addPortFolioItem.kitDescription?.value}
                                            onChange={(e) => handleRelatedKitInputSearch(e)}
                                            disabled
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
                                                <span className="mr-2">+</span>Go To Related Kit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="text-right pb-2">
                                <Link
                                    to="#"
                                    className="btn border mr-4"
                                    onClick={handleAddPortfolioSave}
                                >
                                    {props.compoFlag === "itemEdit"
                                        ? "Save Changes"
                                        : "Save & Continue"}
                                </Link>
                            </div> */}
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
                            NAME
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            // defaultValue={data.itemName}
                            value={addPortFolioItem.name}
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
                            DESCRIPTION
                        </label>
                        <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            placeholder="Description"
                            name="description"
                            id="description"
                            defaultValue={addPortFolioItem.description}
                            value={addPortFolioItem.description}
                            // onChange={handleExpandePriceChange}
                            onChange={(e) => setAddPortFolioItem({
                                ...addPortFolioItem,
                                description: e.target.value,
                            })}
                            autoComplete="off"
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                </div>
            </div>
            <div className='border border-radius-10 mt-3 py-2 px-3'>
                <div className='row input-fields'>
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
                                value={priceCalculator.priceMethod}
                                onChange={(e) =>
                                    setPriceCalculator({
                                        ...priceCalculator,
                                        priceMethod: e,
                                    })}
                            // value={expandedPriceCalculator.priceMethod}
                            // name="priceMethod"
                            // // onChange={handlePriceMethodSelect}
                            // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceMethod: e })}
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
                                    {/* <Select
                                    isClearable={true}
                                    className="text-primary"
                                    id="priceAdditionalSelect"
                                    options={options}
                                    placeholder="Select"
                                    value={priceCalculator.recommendedValue}
                                    onChange={(e) =>
                                        setPriceCalculator({
                                            ...priceCalculator,
                                            recommendedValue: e.target.value,
                                        })}
                                // value={expandedPriceCalculator.priceAdditionalSelect}
                                // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceAdditionalSelect: e })}
                                /> */}
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
                                        options={additionalPriceHeadTypeKeyValue}
                                        placeholder="Select"
                                    // isDisabled
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                    placeholder="10%"
                                    value={priceCalculator.priceAdditionalInput}
                                    id="priceAdditionalInput"
                                    // onChange={handleExpandePriceChange}
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
                                PRICE ESCALATION
                            </label>
                            <div className=" d-flex align-items-center form-control-date">
                                <Select
                                    className="select-input text-primary"
                                    id="priceEscalationSelect"
                                    options={priceHeadTypeKeyValue}
                                    placeholder="placeholder "
                                    value={escalationPriceOptionsValue1}
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
                                    value={escalationPriceInputValue}
                                    onChange={(e) => {
                                        setEscalationPriceInputValue(e.target.value)
                                    }}
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
                                placeholder="0"
                                disabled
                                value={priceCalculator.calculatedPrice}
                            // value={expandedPriceCalculator.calculatedPrice}
                            // onChange={handleExpandePriceChange}
                            />
                            {/* <div className="css-w8dmq8">*Mandatory</div> */}
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
                                    {/* <Select
                                    id="discountTypeSelect"
                                    className='text-primary'
                                    isClearable={true}
                                    options={options}
                                    placeholder="Select"
                                // defaultValue={data.itemBodyModel.startUsage}
                                // value={expandedPriceCalculator.discountTypeSelect}
                                // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, discountTypeSelect: e })}
                                /> */}
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
                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                    id="discountTypeInput"
                                    placeholder="10%"
                                    value={priceCalculator.discountTypeInput}
                                    onChange={(e) =>
                                        setPriceCalculator({
                                            ...priceCalculator,
                                            discountTypeInput: e.target.value,
                                        })
                                    }
                                // defaultValue={data.itemBodyModel.discountType}
                                // value={expandedPriceCalculator.discountTypeInput}
                                // onChange={handleExpandePriceChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-6 col-sm-6">
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
                                options={priceHeadTypeKeyValue}
                                placeholder="placeholder "
                            // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceEscalationSelect: e })}
                            // value={expandedPriceCalculator.priceEscalationSelect}
                            />
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
                    
                </div> */}

                <p className="font-size-14 text-black font-weight-500 my-3">USAGE</p>
                <div className='row input-fields'>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-12 font-weight-500"
                            >
                                START USAGE
                            </label>
                            <div className=" d-flex form-control-date border left-select-div" style={{ borderRadius: "5px" }}>

                                <input
                                    className="form-control border-none text-primary"
                                    type="number"
                                    id="startUsage"
                                    value={priceCalculator.startUsage}
                                    onChange={(e) =>
                                        setPriceCalculator({
                                            ...priceCalculator,
                                            startUsage: e.target.value,
                                        })}
                                // value={expandedPriceCalculator.startUsage}
                                // onChange={handleExpandePriceChange}
                                />
                                <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                                {/* <Select
                                    isClearable={true}
                                    id=""
                                    options={optionsusage}
                                    placeholder="Select"
                                    className='text-primary'
                                // value={expandedPriceCalculator.priceAdditionalSelect}
                                // onChange={(e) => setExpandedPriceCalculator({ ...expandedPriceCalculator, priceAdditionalSelect: e })}
                                /> */}

                            </div>
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-12 font-weight-500"
                            >
                                END USAGE
                            </label>

                            <div
                                className=" d-flex form-control-date"
                                style={{ overflow: "hidden" }}
                            >
                                <input
                                    className="border-none form-control border-radius-10 text-primary"
                                    type="text"
                                    id="endUsage"
                                    value={priceCalculator.endUsage}
                                    onChange={(e) =>
                                        setPriceCalculator({
                                            ...priceCalculator,
                                            endUsage: e.target.value,
                                        })}
                                // value={expandedPriceCalculator.endUsage}
                                // onChange={handleExpandePriceChange}
                                />

                                <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                            </div>
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-12 font-weight-500"
                            >
                                FREQUENCY
                            </label>
                            <Select
                                options={frequencyOptions}
                                placeholder="Select....."
                                className="text-primary"
                                onChange={(e) =>
                                    setAddPortFolioItem({
                                        ...addPortFolioItem,
                                        frequency: e,
                                    })
                                }
                                value={addPortFolioItem.frequency}
                            />
                            {/* <input
                            className="form-control border-radius-10 text-primary"
                            type="text"
                            id="frequency"
                            // defaultValue={data.itemBodyModel.frequency}
                            value={addPortFolioItem.frequency}
                            onChange={(e) => setAddPortFolioItem({
                                ...addPortFolioItem,
                                frequency: e,
                            })}
                            autoComplete="off"
                        /> */}
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
                                    setAddPortFolioItem({ ...addPortFolioItem, unit: e })
                                }
                                value={addPortFolioItem.unit}
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
                                    className="form-control border-none border-radius-10 text-primary"
                                    id="recommendedValue"
                                    // defaultValue={priceCalculator.recommendedValue}
                                    value={priceCalculator.recommendedValue}
                                    onChange={(e) =>
                                        setPriceCalculator({
                                            ...priceCalculator,
                                            recommendedValue: e.target.value,
                                        })}
                                    // onChange={handleExpandePriceChange}
                                    autoComplete="off"
                                />
                                <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                            </div>
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label
                                className="text-light-dark font-size-12 font-weight-500"
                            >
                                NO. OF EVENTS
                            </label>
                            <input
                                className="form-control border-radius-10 text-primary"
                                type="text"
                                // placeholder="Description"
                                id="numberOfEvents"
                                value={priceCalculator.numberOfEvents}
                                disabled
                            // onChange={(e) =>
                            //     setPriceCalculator({
                            //         ...priceCalculator,
                            //         recommendedValue: e.target.value,
                            //     })}
                            // value={expandedPriceCalculator.numberOfEvents}
                            // onChange={handleExpandePriceChange}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right my-3">
                <button type="button" className="btn btn-light" onClick={(e) => handleExpandedPriceSave(e, expendedBundleServiceData)}>Save</button>
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

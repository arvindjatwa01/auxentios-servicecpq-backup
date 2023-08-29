import React, { useState, useEffect } from 'react'

import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tab } from "@mui/material";

import Cookies from "js-cookie";

import {
    getSolutionPriceCommonConfig,
    getCustomItemDataById,
    getCustomItemPriceById,
    getSearchStandardJobId,
    getSearchKitId,
    getPortfolioCommonConfig,
    getSearchQueryCoverage,
    updateCustomPriceData,
    customItemCreation,
    updateCustomItemData,
    customPortfolioItemPriceSJID,
    customPortfolioItemPriceRkId,
    getPortfolioAndSolutionCommonConfig,
    customPriceCreation,
} from "../../services/index";

const ExpendCustomItemTablePopup = (props) => {

    console.log("props data is : ", props)
    var CookiesSetData = Cookies.get("loginTenantDtl");
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
    const [expendBundleServiceEdit, setExpendBundleServiceEdit] = useState(true)

    const [priceMethodKeyValue, setPriceMethodKeyValue] = useState([]);
    const [querySearchStandardJobResult, setQuerySearchStandardJobResult] = useState([]);
    const [querySearchRelatedKitResult, setQuerySearchRelatedKitResult] = useState([]);
    const [priceHeadTypeKeyValue, setPriceHeadTypeKeyValue] = useState([]);
    const [bundleServiceData, setBundleServiceData] = useState([]);

    const [unitOptionKeyValue, setUnitOptionKeyValue] = useState([])
    const [frequencyOptionKeyValue, setFrequencyOptionKeyValue] = useState([])


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
        netPrice: 0,
        totalPrice: 0,
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
        { label: "Cyclic", value: "CYCLIC" },
        { label: "once", value: "ONCE" },
        { label: "alternate", value: "ALTERNATE" },
        { label: "Custom", value: "CUSTOM" },
    ];

    const [additionalPriceHeadTypeKeyValue, setAdditionalPriceHeadTypeKeyValue] = useState([
        { label: "Surcharge %", value: "PERCENTAGE" },
        { label: "Surcharge $", value: "ABSOLUTE", },
    ]);

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


        // fetch Unit Dropdown API
        getPortfolioAndSolutionCommonConfig("unit")
            .then((res) => {
                if (res.status === 200) {
                    const options = []
                    res.data.map((d) => {
                        if ((d.key != "EMPTY") && (d.key != "MONTH")) {
                            options.push({
                                value: d.key,
                                label: d.value,
                            })
                        }
                    });
                    setUnitOptionKeyValue(options);
                }
            })
            .catch((err) => {
                alert(err);
            });
        // Frequency Dropdown 
        getPortfolioAndSolutionCommonConfig("frequency")
            .then((res) => {
                if (res.status === 200) {
                    const options = []
                    res.data.map((d) => {
                        if (d.key != "EMPTY") {
                            options.push({
                                value: d.key,
                                label: d.value,
                            })
                        }
                    });
                    setFrequencyOptionKeyValue(options);
                }
            })
            .catch((err) => {
                alert(err);
            });
    }, []);

    useEffect(() => {
        fetchBundleServiceDataById();
    }, [])

    const fetchBundleServiceDataById = async () => {
        const fetchItemDetailsById = await getCustomItemDataById(props.bundleServiceData.itemId);
        if (fetchItemDetailsById.status === 200) {
            setExpendedBundleServiceData(fetchItemDetailsById.data)
            const newItemDataData = fetchItemDetailsById.data

            setAddPortFolioItem({
                ...addPortFolioItem,
                id: newItemDataData.customItemId,
                name: newItemDataData.itemName,
                description: newItemDataData.customItemHeaderModel.itemHeaderDescription,
                repairOption: props.bundleServiceData.repairKitId,
                templateId: props.bundleServiceData.standardJobId,
            })

            if (newItemDataData.customItemBodyModel?.customItemPrices.length > 0) {
                ItemPriceDataFetchById(newItemDataData);
            }
        }
        // const newItemDataData = await getCustomItemDataById(data.customItemId);
        // const newItemDataData = await getCustomItemDataById(data.itemId);
        // const bundleServiceRes = await getCustomItemDataById(data.itemId);

        // if (bundleServiceRes.status === 200) {
        //     const newItemDataData = bundleServiceRes.data;
        //     setBundleServiceItemObj(newItemDataData)
        //     setAddPortFolioItem({
        //         ...addPortFolioItem,
        //         id: newItemDataData.customItemId,
        //         name: newItemDataData.itemName,
        //         description: newItemDataData.customItemHeaderModel.itemHeaderDescription,
        //         frequency: (newItemDataData.customItemBodyModel.frequency != "" ||
        //             newItemDataData.customItemBodyModel.frequency != "EMPTY" ||
        //             newItemDataData.customItemBodyModel.frequency != null) ? {
        //             label: newItemDataData.customItemBodyModel.frequency,
        //             value: newItemDataData.customItemBodyModel.frequency,
        //         } : { label: "once", value: "once" },
        //         unit: (newItemDataData.customItemBodyModel.unit != "" ||
        //             newItemDataData.customItemBodyModel.unit != "EMPTY" ||
        //             newItemDataData.customItemBodyModel.unit != null) ? {
        //             label: newItemDataData.customItemBodyModel.unit,
        //             value: newItemDataData.customItemBodyModel.unit,
        //         } : { label: "per day", value: "per day" },
        //     });

        //     if (newItemDataData.customItemBodyModel?.customItemPrices.length > 0) {
        //         ItemPriceDataFetchById(newItemDataData);
        //     }
        // }

        // console.log("newItemDataData ======== ", newItemDataData);
    }

    const ItemPriceDataFetchById = async (itemPriceData) => {

        let itemPricesLength = (itemPriceData.customItemBodyModel.customItemPrices.length) - 1;
        console.log("-------- itemPriceData.customItemBodyModel.customItemPrices ", itemPriceData.customItemBodyModel.customItemPrices);
        const priceId = itemPriceData.customItemBodyModel.customItemPrices[itemPricesLength].customItemPriceDataId;
        const priceDataId = itemPriceData.customItemBodyModel.customItemPrices[itemPricesLength].customItemPriceDataId;

        const resPrice = await getCustomItemPriceById(priceDataId);

        if (resPrice.status === 200) {
            setPriceCalculator({
                ...priceCalculator,
                priceMethod: ((resPrice.data.priceMethod === "EMPTY") ||
                    (resPrice.data.priceMethod === "") || (resPrice.data.priceMethod === null)) ? "" :
                    props.priceMethodDropdownKeyValue.find(o => o.value === resPrice.data.priceMethod),
                priceType: ((resPrice.data.priceType === "EMPTY") || (resPrice.data.priceType === "") ||
                    (resPrice.data.priceType === null)) ? "" : props.priceTypeDropdownKeyValue.find(o => o.value === resPrice.data.priceType),
                priceAdditionalSelect: ((resPrice.data.additionalPriceType === "") ||
                    (resPrice.data.additionalPriceType === null) || (resPrice.data.additionalPriceType === "EMPTY")) ? { label: "Surcharge $", value: "ABSOLUTE" } :
                    additionalPriceHeadTypeKeyValue.find(o => o.value === resPrice.data.additionalPriceType),
                priceAdditionalInput: resPrice.data.additionalPriceValue,
                discountTypeSelect: ((resPrice.data.discountType === "") ||
                    (resPrice.data.discountType === null) || (resPrice.data.discountType === "EMPTY")) ? "" :
                    props.discountTypeDropdownKeyValue.find(o => o.value === resPrice.data.discountType),
                discountTypeInput: resPrice.data.discountValue,
                year: ((resPrice.data.year === "") || (resPrice.data.year === null) || (resPrice.data.year === "EMPTY")) ? "" :
                    { label: resPrice.data.year, value: resPrice.data.year },
                noOfYear: resPrice.data.noOfYear,
                startUsage: resPrice.data.startUsage,
                endUsage: resPrice.data.endUsage,
                recommendedValue: resPrice.data.recommendedValue,
                netPrice: resPrice.data.netService,
                totalPrice: resPrice.data.totalPrice,
                numberOfEvents: resPrice.data.numberOfEvents,
                calculatedPrice: resPrice.data.calculatedPrice,
                id: resPrice.data.customItemPriceDataId,
                portfolioDataId: resPrice.data.customPortfolio.portfolioId,
            })

            const fetchItemDetailsById = await getCustomItemDataById(props.bundleServiceData.itemId);
            if (fetchItemDetailsById.status === 200) {
                const newItemDataData = fetchItemDetailsById.data;
                setAddPortFolioItem({
                    ...addPortFolioItem,
                    id: newItemDataData.customItemId,
                    name: newItemDataData.itemName,
                    description: newItemDataData.customItemHeaderModel.itemHeaderDescription,
                    templateId: ((resPrice.data.standardJobId === "string") || (resPrice.data.standardJobId === "") ||
                        (resPrice.data.standardJobId === null)) ? "" : resPrice.data.standardJobId,
                    templateDescription: ((resPrice.data.standardJobId === "string") || (resPrice.data.standardJobId === "") ||
                        (resPrice.data.standardJobId === null)) ? "" : {
                        label: resPrice.data.templateDescription,
                        value: resPrice.data.templateDescription,
                    },
                    repairOption: ((resPrice.data.repairKitId === "string") || (resPrice.data.repairKitId === "") ||
                        resPrice.data.repairKitId === null) ? "" : resPrice.data.repairKitId,

                    frequency: ((resPrice.data.frequency === "") ||
                        (resPrice.data.frequency === "EMPTY") ||
                        (resPrice.data.frequency === null)) ?
                        "" : props.frequencyDropdownKeyValue.find(o => o.value === resPrice.data.frequency),
                    unit: (resPrice.data.usageUnit === "" ||
                        resPrice.data.usageUnit === "EMPTY" ||
                        resPrice.data.usageUnit === null) ?
                        "" : props.unitDropdownKeyValue.find(o => o.value === resPrice.data.usageUnit),
                })
            }
        }
    }

    const handleEscalationPriceValue = (e) => {
        console.log(e)
        setEscalationPriceOptionValue(e.value)
        setEscalationPriceOptionValue1(e)
    }

    const [tabs, setTabs] = useState("0");

    const handleExpandedPriceChange = event => {
        // console.log("e is : ", event);
        // console.log("value is : ", event.target.value);
        // console.log("name is : ", event.target.name);

        setExpandedPriceCalculator({
            ...expandedPriceCalculator,
            [event.target.name]: event.target.value
        })
    }

    const handleExpandePriceChange = event => {
        setExpandedPriceCalculator({
            ...expandedPriceCalculator,
            [event.target.name]: event.target.value
        })
    }

    const handleAddPortfolioSave = () => {
        if (props.compoFlag === "itemEdit") {
            props.handleItemEditSave(addPortFolioItem);
        } else if (props.compoFlag === "ITEM") {
            props.setTabs("2");
            props.getAddPortfolioItemDataFun(addPortFolioItem);
            console.log("addPortFolioItem : ", addPortFolioItem)
        } else {
            props.getAddPortfolioItemData(addPortFolioItem)
            props.setBundleTabs("3");
        }
    };

    const handleExpandedPriceSave = async (e, rowData) => {
        try {

            if ((addPortFolioItem.description == "") ||
                (addPortFolioItem.description == undefined) ||
                (addPortFolioItem.description == null)) {
                throw "Description is a required field, you can’t leave it blank";
            }

            if ((priceCalculator.priceMethod == "") ||
                (priceCalculator.priceMethod == undefined)) {
                throw "Price Method is a required field, you can’t leave it blank";
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

            if ((addPortFolioItem.unit == "") ||
                (addPortFolioItem.unit == undefined) ||
                (addPortFolioItem.unit == null)) {
                throw "Unit is a required field, you can’t leave it blank";
            }

            if ((priceCalculator.recommendedValue == "") ||
                (priceCalculator.recommendedValue == undefined) ||
                (priceCalculator.recommendedValue == 0)) {
                throw "Recommended Value is a required field, you can’t leave it blank or Zero(0)";
            }

            // if (rowData.customItemBodyModel?.customItemPrices.length > 0) {
            //     const priceUpdateData = {
            //         customItemPriceDataId: priceCalculator.id,
            //         quantity: 1,
            //         standardJobId: addPortFolioItem.templateId,
            //         repairKitId: addPortFolioItem.repairOption,
            //         templateDescription: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null)
            //             || (addPortFolioItem.templateId === undefined)) ? "" :
            //             addPortFolioItem.templateDescription?.value,
            //         repairOption: "",
            //         additional: "",
            //         partListId: "",
            //         serviceEstimateId: "",
            //         numberOfEvents: 0,
            //         priceMethod: ((priceCalculator.priceMethod === "EMPTY") || (priceCalculator.priceMethod === "") ||
            //             (priceCalculator.priceMethod === null)) ? "LIST_PRICE" : priceCalculator.priceMethod?.value,
            //         priceType: ((priceCalculator.priceType === "EMPTY") || (priceCalculator.priceType === "") ||
            //             priceCalculator.priceType === null) ? "EVENT_BASED" : priceCalculator.priceType?.value,
            //         listPrice: 0,
            //         priceEscalation: "",
            //         calculatedPrice: 0,
            //         flatPrice: ((priceCalculator.flatPrice === "") || (priceCalculator.flatPrice === null) ||
            //             (priceCalculator.flatPrice === undefined)) ? 0 : priceCalculator.flatPrice,
            //         year: priceCalculator?.year?.value,
            //         noOfYear: parseInt(priceCalculator?.noOfYear),
            //         sparePartsPrice: 0,
            //         sparePartsPriceBreakDownPercentage: 0,
            //         servicePrice: 0,
            //         labourPrice: 0,
            //         labourPriceBreakDownPercentage: 0,
            //         miscPrice: 0,
            //         miscPriceBreakDownPercentage: 0,
            //         totalPrice: 0,
            //         netService: 0,
            //         additionalPriceType: ((priceCalculator?.priceAdditionalSelect === "EMPTY") || (priceCalculator?.priceAdditionalSelect === "") ||
            //             (priceCalculator?.priceAdditionalSelect === null)) ? "ABSOLUTE" : priceCalculator?.priceAdditionalSelect?.value,
            //         additionalPriceValue: priceCalculator?.priceAdditionalInput,
            //         discountType: ((priceCalculator?.discountTypeSelect === "EMPTY") || (priceCalculator?.discountTypeSelect === "") ||
            //             (priceCalculator?.discountTypeSelect === null)) ? "PORTFOLIO_DISCOUNT" : priceCalculator?.discountTypeSelect?.value,
            //         discountValue: priceCalculator?.discountTypeInput,
            //         recommendedValue: parseInt(priceCalculator?.recommendedValue),
            //         startUsage: parseInt(priceCalculator?.startUsage),
            //         endUsage: parseInt(priceCalculator?.endUsage),
            //         sparePartsEscalation: ((escalationPriceOptionsValue != "") &&
            //             (escalationPriceOptionsValue == "PARTS") ?
            //             escalationPriceInputValue : 0),
            //         labourEscalation: ((escalationPriceOptionsValue != "") &&
            //             (escalationPriceOptionsValue == "LABOR") ?
            //             escalationPriceInputValue : 0),
            //         miscEscalation: ((escalationPriceOptionsValue != "") &&
            //             (escalationPriceOptionsValue == "MISCELLANEOUS") ?
            //             escalationPriceInputValue : 0),
            //         serviceEscalation: ((escalationPriceOptionsValue != "") &&
            //             (escalationPriceOptionsValue == "SERVICE") ?
            //             escalationPriceInputValue : 0),
            //         withBundleService: false,
            //         sparePartsNOE: 0,
            //         labourNOE: 0,
            //         miscNOE: 0,
            //         recommendedUnit: ((addPortFolioItem?.unit === "") || (addPortFolioItem?.unit === null) ||
            //             (addPortFolioItem?.unit === "EMPTY") || (addPortFolioItem?.unit === undefined)) ? "MONTH" :
            //             addPortFolioItem?.unit?.value === "YEAR" ? "MONTH" : addPortFolioItem?.unit?.value,
            //         usageUnit: ((addPortFolioItem?.unit === "") || (addPortFolioItem?.unit === null) ||
            //             (addPortFolioItem?.unit === "EMPTY") || (addPortFolioItem?.unit === undefined)) ? "YEAR" : addPortFolioItem?.unit?.value,
            //         customPortfolio: (priceCalculator.portfolioDataId != 0) ? {
            //             portfolioId: priceCalculator.portfolioDataId
            //         } : null,
            //         tenantId: loginTenantId,
            //         inclusionExclusion: false,
            //         partsRequired: true,
            //         labourRequired: true,
            //         serviceRequired: false,
            //         miscRequired: true
            //     }
            //     const updatePriceId = await updateCustomPriceData(
            //         priceCalculator.id,
            //         priceUpdateData
            //     );
            // }

            const priceUpdateData = {
                // customItemPriceDataId: priceCalculator.id,
                customItemPriceDataId: 0,
                quantity: 1,
                standardJobId: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
                    (addPortFolioItem.templateId === undefined)) ? "" : addPortFolioItem.templateId,
                repairKitId: ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) ||
                    (addPortFolioItem.repairOption === undefined)) ? "" : addPortFolioItem.repairOption,
                templateDescription: ((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) ||
                    (addPortFolioItem.templateId === undefined)) ? "" : (typeof addPortFolioItem.templateDescription === "object") ?
                    addPortFolioItem.templateDescription?.value : addPortFolioItem.templateDescription,
                repairOption: "",
                additional: "",
                partListId: "",
                serviceEstimateId: "",
                numberOfEvents: (priceCalculator.priceType?.value === "FIXED") ? priceCalculator.numberOfEvents : 0,
                frequency: ((addPortFolioItem?.frequency === "") || (addPortFolioItem?.frequency === null) ||
                    (addPortFolioItem?.frequency === undefined) || (addPortFolioItem?.frequency === "EMPTY")) ? "CYCLIC" :
                    (typeof addPortFolioItem?.frequency === "object") ? addPortFolioItem?.frequency?.value : addPortFolioItem?.frequency,
                priceMethod: ((priceCalculator.priceMethod === "EMPTY") || (priceCalculator.priceMethod === "") ||
                    (priceCalculator.priceMethod === null)) ? "LIST_PRICE" : priceCalculator.priceMethod?.value,
                priceType: ((priceCalculator.priceType === "EMPTY") || (priceCalculator.priceType === "") ||
                    (priceCalculator.priceType === null)) ? "EVENT_BASED" : priceCalculator.priceType?.value,
                listPrice: 0,
                priceEscalation: "",
                calculatedPrice: 0,
                flatPrice: ((priceCalculator.flatPrice === "") || (priceCalculator.flatPrice === null) || (priceCalculator.flatPrice === undefined) ||
                    (priceCalculator.flatPrice === 0)) ? 0 : parseInt(priceCalculator.flatPrice),
                year: priceCalculator.year?.value,
                noOfYear: parseInt(priceCalculator.noOfYear),
                sparePartsPrice: 0,
                priceEscalation: "",
                sparePartsPriceBreakDownPercentage: ((priceCalculator.priceBreakDownOptionsKeyValue != "") &&
                    (priceCalculator.priceBreakDownOptionsKeyValue == "PARTS") ?
                    priceCalculator.priceBreakDownInputValue : 0),
                servicePrice: 0,
                labourPrice: 0,
                labourPriceBreakDownPercentage: ((priceCalculator.priceBreakDownOptionsKeyValue != "") &&
                    (priceCalculator.priceBreakDownOptionsKeyValue == "LABOR") ?
                    priceCalculator.priceBreakDownInputValue : 0),
                miscPrice: 0,
                miscPriceBreakDownPercentage: ((priceCalculator.priceBreakDownOptionsKeyValue != "") &&
                    (priceCalculator.priceBreakDownOptionsKeyValue == "MISCELLANEOUS") ?
                    priceCalculator.priceBreakDownInputValue : 0),
                totalPrice: 0,
                netService: 0,
                additionalPriceType: ((priceCalculator?.priceAdditionalSelect === "EMPTY") ||
                    (priceCalculator?.priceAdditionalSelect === "") ||
                    (priceCalculator?.priceAdditionalSelect === null)) ? "ABSOLUTE" : priceCalculator?.priceAdditionalSelect?.value,
                additionalPriceValue: priceCalculator?.priceAdditionalInput,
                discountType: ((priceCalculator?.discountTypeSelect === "EMPTY") ||
                    (priceCalculator?.discountTypeSelect === "") ||
                    (priceCalculator?.discountTypeSelect === null)) ? "PORTFOLIO_DISCOUNT" : priceCalculator?.discountTypeSelect?.value,
                discountValue: priceCalculator?.discountTypeInput,
                recommendedValue: parseInt(priceCalculator?.recommendedValue),
                startUsage: parseInt(priceCalculator.startUsage),
                endUsage: parseInt(priceCalculator.endUsage),

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
                sparePartsNOE: 0,
                labourNOE: 0,
                miscNOE: 0,
                recommendedUnit: ((addPortFolioItem.unit === "") || (addPortFolioItem.unit === null) || (addPortFolioItem.unit === undefined) ||
                    (addPortFolioItem.unit === "EMPTY")) ? "MONTH" : (typeof addPortFolioItem.unit === "object") ?
                    addPortFolioItem.unit?.value === "YEAR" ? "MONTH" : addPortFolioItem.unit?.value : addPortFolioItem.unit,
                usageUnit: ((addPortFolioItem.unit === "") || (addPortFolioItem.unit === null) || (addPortFolioItem.unit === undefined) ||
                    (addPortFolioItem.unit === "EMPTY")) ? "YEAR" : (typeof addPortFolioItem.unit === "object") ? addPortFolioItem.unit?.value : addPortFolioItem.unit,
                customPortfolio: ((priceCalculator.portfolioDataId == null) || (priceCalculator.portfolioDataId == 0) ||
                    (priceCalculator.portfolioDataId == undefined) || (priceCalculator.portfolioDataId == "")) ? null : {
                    portfolioId: priceCalculator.portfolioDataId
                },
                tenantId: loginTenantId,
                inclusionExclusion: true,
                partsRequired: true,
                labourRequired: true,
                serviceRequired: false,
                miscRequired: true
            }

            // const updatePriceId = await updateCustomPriceData(
            //     priceCalculator.id,
            //     priceUpdateData
            // );

            console.log("====== ", rowData);

            const saveNewItemPrice = await customPriceCreation(priceUpdateData)
            let itemBodyModalData = { ...rowData.customItemBodyModel };
            let itemPriceIdsData = [...itemBodyModalData["customItemPrices"]];
            if (saveNewItemPrice.status === 200) {
                itemPriceIdsData.push({
                    "customItemPriceDataId": saveNewItemPrice.data.customItemPriceDataId
                });

                var reqObjSJId = {
                    itemId: addPortFolioItem.id,
                    standardJobId: addPortFolioItem.templateId,
                    repairKitId: addPortFolioItem.repairOption,
                    // itemPriceDataId: priceCalculator.id
                    itemPriceDataId: saveNewItemPrice.data.customItemPriceDataId,
                }
                if (!(((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null) || (addPortFolioItem.templateId === undefined)) &&
                    ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null) || (addPortFolioItem.repairOption === undefined)))) {

                    if (!addPortFolioItem.templateId && addPortFolioItem.repairOption) {
                        const price_RkIdUpdate = await customPortfolioItemPriceRkId(reqObjSJId)
                    }

                    if (addPortFolioItem.templateId && !addPortFolioItem.repairOption) {
                        const price_SjIdUpdate = await customPortfolioItemPriceSJID(reqObjSJId)
                    }

                    // if (((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null)) &&
                    //     (addPortFolioItem.repairOption !== "") || (addPortFolioItem.repairOption !== null)) {
                    //     const price_RkIdUpdate = await customPortfolioItemPriceRkId(reqObjSJId)
                    // }

                    // if (((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null)) &&
                    //     (addPortFolioItem.templateId !== "") || (addPortFolioItem.templateId !== null)) {
                    //     const price_SjIdUpdate = await customPortfolioItemPriceSJID(reqObjSJId)
                    // }
                }
            }

            var portfolioIdsData = [...rowData["customItemHeaderModel"]["portfolioItemIds"]]
            let reqItemUpdateObj = {
                customItemId: parseInt(addPortFolioItem.id),
                // customItemId: 0,
                itemName: addPortFolioItem.name,
                customItemHeaderModel: {
                    customItemHeaderId: 0,
                    itemHeaderDescription: addPortFolioItem.description,
                    bundleFlag: rowData.customItemHeaderModel.bundleFlag,
                    withBundleService: rowData.customItemHeaderModel.withBundleService,
                    portfolioItemId: rowData.customItemHeaderModel.portfolioItemId,
                    reference: rowData.customItemHeaderModel?.reference,
                    itemHeaderMake: rowData.customItemHeaderModel?.itemHeaderMake,
                    itemHeaderFamily: rowData.customItemHeaderModel?.itemHeaderFamily,
                    model: rowData.customItemHeaderModel?.model,
                    prefix: rowData.customItemHeaderModel?.prefix,
                    type: rowData.customItemHeaderModel?.type,
                    additional: rowData.customItemHeaderModel?.additional,
                    currency: rowData.customItemHeaderModel?.currency,
                    netPrice: rowData.customItemHeaderModel?.netPrice,
                    itemProductHierarchy: rowData.customItemHeaderModel?.itemProductHierarchy,
                    itemHeaderGeographic: rowData.customItemHeaderModel?.itemHeaderGeographic,
                    responseTime: rowData.customItemHeaderModel?.responseTime,
                    usage: rowData.customItemHeaderModel?.usage,
                    validFrom: rowData.customItemHeaderModel?.validFrom,
                    validTo: rowData.customItemHeaderModel?.validTo,
                    estimatedTime: rowData.customItemHeaderModel?.estimatedTime,
                    servicePrice: rowData.customItemHeaderModel?.servicePrice,
                    status: rowData.customItemHeaderModel?.status,
                    componentCode: rowData.customItemHeaderModel?.componentCode,
                    componentDescription: rowData.customItemHeaderModel?.componentDescription,
                    serialNumber: rowData.customItemHeaderModel?.serialNumber,
                    itemHeaderStrategy: rowData.customItemHeaderModel?.itemHeaderStrategy,
                    variant: rowData.customItemHeaderModel?.variant,
                    itemHeaderCustomerSegment: rowData.customItemHeaderModel?.itemHeaderCustomerSegment,
                    jobCode: rowData.customItemHeaderModel?.jobCode,
                    preparedBy: rowData.customItemHeaderModel?.preparedBy,
                    approvedBy: rowData.customItemHeaderModel?.approvedBy,
                    preparedOn: rowData.customItemHeaderModel?.preparedOn,
                    revisedBy: rowData.customItemHeaderModel?.revisedBy,
                    revisedOn: rowData.customItemHeaderModel?.revisedOn,
                    salesOffice: rowData.customItemHeaderModel?.salesOffice,
                    offerValidity: rowData.customItemHeaderModel?.offerValidity,
                    serviceChargable: rowData.customItemHeaderModel?.serviceChargable,
                    serviceOptional: rowData.customItemHeaderModel?.serviceOptional
                },
                customItemBodyModel: {
                    customItemBodyId: parseInt(rowData.customItemBodyModel?.customItemBodyId),
                    itemBodyDescription: addPortFolioItem.description,
                    spareParts: rowData.customItemBodyModel?.spareParts,
                    labours: rowData.customItemBodyModel?.labour,
                    miscellaneous: rowData.customItemBodyModel?.miscellaneous,
                    taskType: rowData.customItemBodyModel?.taskType,
                    solutionCode: rowData.customItemBodyModel?.solutionCode,
                    usageIn: rowData.customItemBodyModel?.usageIn,
                    usage: rowData.customItemBodyModel?.usage,
                    year: priceCalculator?.year?.value,
                    avgUsage: 0,
                    // unit: rowData.customItemBodyModel?.unit,
                    // frequency: addPortFolioItem.frequency != "" ? addPortFolioItem.frequency?.value : "once",
                    // customItemPrices: rowData.customItemBodyModel?.customItemPrices,
                    customItemPrices: [...itemPriceIdsData]
                },
            }
            const res = await updateCustomItemData(
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

            // if (rowData.customItemBodyModel?.customItemPrices.length > 0) {
            //     var reqObjSJId = {
            //         itemId: addPortFolioItem.id,
            //         standardJobId: addPortFolioItem.templateId,
            //         repairKitId: addPortFolioItem.repairOption,
            //         itemPriceDataId: priceCalculator.id
            //     }
            //     if (!(((addPortFolioItem.templateId === "") || (addPortFolioItem.templateId === null)) &&
            //         ((addPortFolioItem.repairOption === "") || (addPortFolioItem.repairOption === null)))) {
            //         if (((addPortFolioItem.templateId == "") ||
            //             (addPortFolioItem.templateId == null)) &&
            //             (addPortFolioItem.repairOption != "") ||
            //             (addPortFolioItem.repairOption != null)) {
            //             const price_RkIdUpdate = await customPortfolioItemPriceRkId(reqObjSJId)
            //         }

            //         if (((addPortFolioItem.repairOption == "") ||
            //             (addPortFolioItem.repairOption == null)) &&
            //             (addPortFolioItem.templateId != "") ||
            //             (addPortFolioItem.templateId != null)) {
            //             const price_SjIdUpdate = await customPortfolioItemPriceSJID(reqObjSJId)
            //         }
            //     }

            // }
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
                if (res.status === 200) {
                    $(`.scrollbar-model`).css("display", "block");
                    setQuerySearchStandardJobResult(res)
                    var preArr = [];
                    for (var n = 0; n < res.data.length; n++) {
                        preArr.push({ label: res.data[n].prefix, value: res.data[n].prefix })
                    }
                }
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
                if (res.status === 200) {
                    $(`.scrollbar-model`).css("display", "block");
                    setQuerySearchRelatedKitResult(res.data)
                    var preArr = [];
                    for (var n = 0; n < res.data.length; n++) {
                        preArr.push({ label: res.data[n].prefix, value: res.data[n].prefix })
                    }
                }
            })
            .catch((err) => {
                console.log("error in getSearchQueryCoverage", err);
            });
    }

    const handleSearchStandardJobListClick = (e, currentItem) => {
        setAddPortFolioItem({
            ...addPortFolioItem,
            templateId: currentItem.standardJobId,
            templateDescription: { label: currentItem.description, value: currentItem.description },
        })
        $(`.scrollbar-model`).css("display", "none");
    }

    const handleSearchRelatedKitListClick = (e, currentItem) => {
        setAddPortFolioItem({
            ...addPortFolioItem,
            repairOption: currentItem.kitId,
        })
        $(`.scrollbar-model`).css("display", "none");
    }

    const optionsUsage = [
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
            <div className="ligt-greey-bg p-3 my-3">
                <div>
                    <span className="mr-3 cursor" onClick={() => setExpendBundleServiceEdit(false)}>
                        <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                        <span className="ml-2">Edit</span>
                    </span>
                    {/* <span className="mr-3">
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
                    </span> */}
                </div>
            </div>
            {expendBundleServiceEdit ?
                <>
                    <div className="bg-white"><div /></div>
                    <div className="row mt-3 input-fields">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <p className="text-light-dark font-size-12 font-weight-500 mb-2"> NAME</p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {((addPortFolioItem.name === "") || (addPortFolioItem.name == undefined) ||
                                        (addPortFolioItem.name == null) || (addPortFolioItem.name == "string") || (addPortFolioItem.name == 0))
                                        ? "NA" : addPortFolioItem.name}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <p className="text-light-dark font-size-12 font-weight-500 mb-2"> DESCRIPTION</p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {((addPortFolioItem.description === "") || (addPortFolioItem.description == undefined) ||
                                        (addPortFolioItem.description == null) || (addPortFolioItem.description == "string") || (addPortFolioItem.description == 0))
                                        ? "NA" : addPortFolioItem.description}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className='border border-radius-10 mt-3 py-2 px-3'>
                        <div className='row input-fields'>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> PRICE METHOD</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.priceMethod === "") || (priceCalculator.priceMethod == undefined) ||
                                            (priceCalculator.priceMethod == null) || (priceCalculator.priceMethod == "string") || (priceCalculator.priceMethod == 0))
                                            ? "NA" : typeof priceCalculator.priceMethod === "object" ? priceCalculator.priceMethod?.label : priceCalculator.priceMethod}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> PRICE TYPE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.priceType === "") || (priceCalculator.priceType == undefined) ||
                                            (priceCalculator.priceType == null) || (priceCalculator.priceType == "string") || (priceCalculator.priceType == 0))
                                            ? "NA" : typeof priceCalculator.priceType === "object" ? priceCalculator.priceType?.label : priceCalculator.priceType}
                                    </h6>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> START USAGE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.startUsage === "") || (priceCalculator.startUsage == undefined) ||
                                            (priceCalculator.startUsage == null) || (priceCalculator.startUsage == "string") || (priceCalculator.startUsage == 0))
                                            ? "NA" : priceCalculator.startUsage}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> END USAGE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.endUsage === "") || (priceCalculator.endUsage == undefined) ||
                                            (priceCalculator.endUsage == null) || (priceCalculator.endUsage == "string") || (priceCalculator.endUsage == 0))
                                            ? "NA" : priceCalculator.endUsage}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> FREQUENCY</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((addPortFolioItem.frequency === "") || (addPortFolioItem.frequency == undefined) ||
                                            (addPortFolioItem.frequency == null) || (addPortFolioItem.frequency == "string") || (addPortFolioItem.frequency == 0))
                                            ? "NA" : typeof addPortFolioItem.frequency === "object" ? addPortFolioItem.frequency?.label : addPortFolioItem.frequency}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> UNIT</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((addPortFolioItem.unit === "") || (addPortFolioItem.unit == undefined) ||
                                            (addPortFolioItem.unit == null) || (addPortFolioItem.unit == "string") || (addPortFolioItem.unit == 0))
                                            ? "NA" : typeof addPortFolioItem.unit === "object" ? addPortFolioItem.unit?.label : addPortFolioItem.unit}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> RECOMMENDED VALUE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.recommendedValue === "") || (priceCalculator.recommendedValue == undefined) ||
                                            (priceCalculator.recommendedValue == null) || (priceCalculator.recommendedValue == "string") || (priceCalculator.recommendedValue == 0))
                                            ? "NA" : priceCalculator.recommendedValue}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">  NO. OF EVENTS</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.numberOfEvents === "") || (priceCalculator.numberOfEvents == undefined) ||
                                            (priceCalculator.numberOfEvents == null) || (priceCalculator.numberOfEvents == "string") || (priceCalculator.numberOfEvents == 0))
                                            ? "NA" : priceCalculator.numberOfEvents}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2"> CALCULATED PRICE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.calculatedPrice === "") || (priceCalculator.calculatedPrice == undefined) ||
                                            (priceCalculator.calculatedPrice == null) || (priceCalculator.calculatedPrice == "string") || (priceCalculator.calculatedPrice == 0))
                                            ? "NA" : priceCalculator.priceType?.value !== "USAGE_BASED" ? "NA" : priceCalculator.calculatedPrice}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">  BASE PRICE</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.totalPrice === "") || (priceCalculator.totalPrice == undefined) ||
                                            (priceCalculator.totalPrice == null) || (priceCalculator.totalPrice == "string") || (priceCalculator.totalPrice == 0))
                                            ? "NA" : priceCalculator.totalPrice}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">  COST PER HOUR</p>
                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                        {((priceCalculator.calculatedPrice === "") || (priceCalculator.calculatedPrice == undefined) ||
                                            (priceCalculator.calculatedPrice == null) || (priceCalculator.calculatedPrice == "string") || (priceCalculator.calculatedPrice == 0))
                                            ? "NA" : priceCalculator.priceType?.value !== "USAGE_BASED" ? "NA" : priceCalculator.calculatedPrice}
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </> :
                <>
                    <div className="bg-white">
                        {/* <div>
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
                                                    >
                                                        {currentItem.standardJobId}  {currentItem.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
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
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <div className="mt-4">
                                            <a className="form-control cursor Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                                            >
                                                <span className="mr-2">+</span>Go To Template
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <p className="mt-4">RELATED KIT</p>
                            <div className="row input-fields">
                                <div className="col-md-6 col-sm-6">
                                    <div className="form-group">
                                        <label
                                            className="text-light-dark font-size-14 font-weight-500"
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
                                                    >
                                                        {currentItem.kitId}  {currentItem.description}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
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
                                            <a className="form-control cursor Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                                            >
                                                <span className="mr-2">+</span>Go to Related Kit
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </div> */}
                    </div>
                    <div className="row mt-3 input-fields">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500"> NAME</label>
                                <input
                                    className="form-control border-radius-10 text-primary"
                                    type="text"
                                    defaultValue={addPortFolioItem.name}
                                    placeholder="Service/Bundle ID"
                                    disabled
                                />
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500">
                                    Description
                                </label>
                                <input
                                    className="form-control border-radius-10 text-primary"
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    id="description"
                                    defaultValue={addPortFolioItem.description}
                                    value={addPortFolioItem.description}
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
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label
                                        className="text-light-dark font-size-12 font-weight-500"
                                    >
                                        PRICE TYPE
                                    </label>
                                    <Select
                                        options={props.priceTypeDropdownKeyValue}
                                        className="text-primary"
                                        id="priceType"
                                        value={priceCalculator.priceType}
                                        onChange={(e) =>
                                            setPriceCalculator({
                                                ...priceCalculator,
                                                priceType: e,
                                            })}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            {/* <div className="col-md-6 col-sm-6">
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
                                        options={additionalPriceHeadTypeKeyValue}
                                        placeholder="Select"
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                    placeholder="10%"
                                    value={priceCalculator.priceAdditionalInput}
                                    id="priceAdditionalInput"
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
                                />
                                <input
                                    type="text"
                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                    placeholder="20%"
                                    id="priceEscalationInput"
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
                                    name="discountTypeInput"
                                    onChange={(e) =>
                                        setPriceCalculator({
                                            ...priceCalculator,
                                            discountTypeInput: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div> */}
                        </div>
                        {/* <p className="font-size-14 text-black font-weight-500 my-3">USAGE</p> */}
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
                                        />
                                        <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                                        {/* <Select
                                    isClearable={true}
                                    id=""
                                    options={optionsUsage}
                                    placeholder="Select"
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
                                        // options={frequencyOptions}
                                        options={props.frequencyDropdownKeyValue}
                                        placeholder="Select..."
                                        className="text-primary"
                                        onChange={(e) =>
                                            setAddPortFolioItem({
                                                ...addPortFolioItem,
                                                frequency: e,
                                            })
                                        }
                                        value={addPortFolioItem.frequency}
                                    />
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
                                        // options={[
                                        //     { value: "per Hr", label: "per Hr" },
                                        //     { value: "per Km", label: "per Km" },
                                        //     { value: "per Miles", label: "per Miles" },
                                        //     { value: "per year", label: "per year" },
                                        //     { value: "per month", label: "per month" },
                                        //     { value: "per day", label: "per day" },
                                        //     { value: "per quarter", label: "per quarter" },
                                        // ]}
                                        options={unitOptionKeyValue}
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
                                            value={priceCalculator.recommendedValue}
                                            onChange={(e) =>
                                                setPriceCalculator({
                                                    ...priceCalculator,
                                                    recommendedValue: e.target.value,
                                                })}
                                            autoComplete="off"
                                        />
                                        <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit?.value === "YEAR" ? "Month" : addPortFolioItem.unit.label}</span>
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
                                        id="numberOfEvents"
                                        value={priceCalculator.numberOfEvents}
                                        disabled={priceCalculator.calculatedPrice?.value === "FIXED" ? false : true}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label
                                        className="text-light-dark font-size-14 font-weight-500"
                                        for="exampleInputEmail1"
                                    >
                                        CALCULATED PRICE
                                    </label>
                                    <div
                                        className=" d-flex form-control-date"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <input
                                            type="text"
                                            className="form-control border-radius-10 text-primary"
                                            id="calculatedPrice"
                                            placeholder="0"
                                            disabled
                                            value={((priceCalculator.calculatedPrice?.value !== "USAGE_BASED")) ? priceCalculator.calculatedPrice : null}
                                        // value={expandedPriceCalculator.calculatedPrice}
                                        // onChange={handleExpandePriceChange}
                                        />
                                        {/* <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label
                                        className="text-light-dark font-size-14 font-weight-500"
                                        for="exampleInputEmail1"
                                    >
                                        BASE PRICE
                                    </label>
                                    <div
                                        className=" d-flex form-control-date"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <input
                                            type="number"
                                            className="form-control border-none border-radius-10 text-primary"
                                            id="totalPrice"
                                            // defaultValue={priceCalculator.recommendedValue}
                                            value={priceCalculator.totalPrice}
                                            onChange={(e) =>
                                                setPriceCalculator({
                                                    ...priceCalculator,
                                                    totalPrice: e.target.value,
                                                })}
                                            // onChange={handleExpandePriceChange}
                                            autoComplete="off"
                                            disabled={true}
                                        />
                                        {/* <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label
                                        className="text-light-dark font-size-14 font-weight-500"
                                        for="exampleInputEmail1"
                                    >
                                        COST PER HOUR
                                    </label>
                                    <div
                                        className=" d-flex form-control-date"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <input
                                            type="number"
                                            className="form-control border-none border-radius-10 text-primary"
                                            id="calculatedPrice"
                                            // defaultValue={priceCalculator.recommendedValue}
                                            value={((priceCalculator.calculatedPrice?.value !== "USAGE_BASED")) ? null : priceCalculator.calculatedPrice}
                                            onChange={(e) =>
                                                setPriceCalculator({
                                                    ...priceCalculator,
                                                    calculatedPrice: e.target.value,
                                                })}
                                            // onChange={handleExpandePriceChange}
                                            autoComplete="off"
                                            disabled={true}
                                        />
                                        {/* <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-right my-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) =>
                                // handleExpandedPriceSave(e, data)}
                                handleExpandedPriceSave(e, expendedBundleServiceData)}
                        >
                            Save
                        </button>
                    </div>
                </>}
            <div className='p-3 d-flex align-items-center justify-content-between table-header-div'>
                <div className=''></div>
                <div className='text-white'>Item Name</div>
                <div className='text-white'>Description</div>
                <div className='text-white'>Strategy</div>
                <div className='text-white'>Task Type</div>
                <div className='text-white'>Quantity</div>
                <div className='text-white'>Recommended Value</div>
                <div className='text-white'>Template/Kit Id</div>
                {/* <div className='text-white'>Net Price</div>
                <div className='text-white'>Net Additional</div>
                <div className='text-white'>Net Parts Price</div>
                <div className='text-white'>Total Price</div>
                <div className='text-white'>Comments</div>
                <div className='text-white'>Total $</div> */}
            </div>
        </>
    )
}

export default ExpendCustomItemTablePopup

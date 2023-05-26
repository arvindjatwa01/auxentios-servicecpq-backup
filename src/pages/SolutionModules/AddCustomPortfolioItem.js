import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Cookies from "js-cookie";

import SearchIcon from '@mui/icons-material/Search';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import $ from "jquery";

import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";

import { ToastContainer, toast } from 'react-toastify';

import { useDispatch, useSelector } from "react-redux";

import { PortfolioContext } from "../PortfolioAndBundle/ProtfolioContext";
import { useAppSelector } from "../../app/hooks";
import {
  selectUpdateTaskList,
  selectStrategyTaskOption,
  selectCategoryList,
  selectUpdateList,
  taskActions,
} from "../PortfolioAndBundle/customerSegment/strategySlice";

import {
  getUsageCategoryKeyValue,
  getTaskTypeKeyValue,
  getMachineTypeKeyValue,
  getTypeKeyValue,
  getSearchStandardJobId,
  getSearchKitId,
  getCustomItemPriceData,
  createItemPriceData,
  itemCreation,
  updatePortfolio,
  portfolioSearch,
  itemSearch,
  customPriceCreation
} from "../../services/index";

const AddCustomPortfolioItem = (props) => {

  var CookiesSetData = Cookies.get("loginTenantDtl");
  var getCookiesJsonData;
  if (CookiesSetData != undefined) {
    getCookiesJsonData = JSON.parse(CookiesSetData);
  }
  const loginTenantId = CookiesSetData != undefined ? getCookiesJsonData?.user_tenantId : 74;
  // console.log("props for AddCustomPortfolioItem is : ", props);
  const [tabs, setTabs] = useState("itemSummary");
  const [editable, setEditable] = useState(
    props?.compoFlag === "itemEdit" ? true : false
  );

  const [querySearchStandardJobResult, setQuerySearchStandardJobResult] =
    useState([]);
  const [querySearchRelatedKitResult, setQuerySearchRelatedKitResult] =
    useState([]);

  const [modelShowForTemplate, setModelShowForTemplate] = useState(false);
  const [modelShowForRelatedKit, setModelShowForRelatedKit] = useState(false);
  const [noNeedBundleService, setNoNeedBundleService] = useState(false);

  const [editAbleItemPrice, setEditAbleItemPrice] = useState({
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
  })

  // const {stratgyTaskTypeKeyValue,categoryUsageKeyValue1} = useContext(PortfolioContext);


  const [typeOfSearch, setTypeOfSearch] = useState(null);

  const [generalComponentData, setGeneralComponentData] = useState({
    name: "",
    description: "",
    serviceDescription: "",
    externalReference: "",
    customerSegment: null,
    items: [],
    coverages: [],
  });

  const [createServiceOrBundle, setCreateServiceOrBundle] = useState({
    id: "",
    description: "",
    bundleFlag: "",
    reference: "",
    customerSegment: "",
    make: "",
    models: "",
    prefix: "",
    machine: "",
    additional: "",
  });

  const [addPortFolioItem, setAddPortFolioItem] = useState({
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
    relatedKit: "",
    kitDescription: "",
    repairOption: "",
    strategyTask: "",
    year: "",
    noOfYear: "1",
    headerdescription: "",
    preparedBy: "",
    approvedBy: "",
    preparedOn: new Date(),
    revisedBy: "",
    revisedOn: new Date(),
    branch: "",
    offerValidity: "",
    startUsage: "",
    endUsage: "",
    usageType: "",
    withBundleService: true,
  });

  const [administrative, setAdministrative] = useState({
    preparedBy: null,
    approvedBy: null,
    preparedOn: new Date(),
    revisedBy: null,
    revisedOn: new Date(),
    salesOffice: null,
    offerValidity: null,
  });

  const [currentItemId, setCurrentItemId] = useState();
  const [createdItemsIdData, setCreatedItemsIdData] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);

  const [categoryUsageKeyValue1, setCategoryUsageKeyValue1] = useState([]);
  const [stratgyTaskUsageKeyValue, setStratgyTaskUsageKeyValue] = useState([]);
  const [stratgyTaskTypeKeyValue, setStratgyTaskTypeKeyValue] = useState([]);
  const [stratgyResponseTimeKeyValue, setStratgyResponseTimeKeyValue] =
    useState([]);
  const [stratgyHierarchyKeyValue, setStratgyHierarchyKeyValue] = useState([]);
  const [stratgyGeographicKeyValue, setStratgyGeographicKeyValue] = useState(
    []
  );
  const [portfolioPriceDataId, setPortfolioPriceDataId] = useState({})
  const [portfolioAdditionalPriceDataId, setPortfolioAdditionalPriceDataId] = useState({})
  const [portfolioEscalationPriceDataId, setPortfolioEscalationPriceDataId] = useState({})
  const [portfolioCoverage, setPortfolioCoverage] = useState([]);

  const [tempBundleItems, setTempBundleItems] = useState([]);
  const [openAddBundleItem, setOpenAddBundleItem] = useState(false);
  const [openSearchSolution, setOpenSearchSolution] = useState(true);
  const [createNewBundle, setCreateNewBundle] = useState(false);
  const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("");
  const [columnSearchText, setColumnSearchText] = useState("");
  const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null);
  const [portfolioItemData, setPortfolioItemData] = useState([]);

  const [bundleServiceItemData, setBundleServiceItemData] = useState([]);

  const [selectedItemType, setSelectedItemType] = useState("");

  const [value3, setValue3] = useState({ value: "STANDARD", label: "Standard (Bronze)" });
  const [value2, setValue2] = useState({
    value: "DRAFT",
    label: "Draft",
  });

  const [bundleFlagType, setBundleFlagType] = useState("");

  const [typeKeyValue, setTypeKeyValue] = useState([]);
  const [machineTypeKeyValue, setMachineTypeKeyValue] = useState([]);
  const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState(
    []
  );
  const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([]);

  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);


  const updatedTaskList = useAppSelector(
    selectStrategyTaskOption(selectUpdateTaskList)
  );
  const categoryList = useAppSelector(
    selectStrategyTaskOption(selectCategoryList)
  );
  const updatedList = useAppSelector(
    selectStrategyTaskOption(selectUpdateList)
  );
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

  const usageTypeOption = [
    { value: "Planned Usage", label: "Planned Usage" },
    { value: "Recommended usage", label: "Recommended usage" },
  ];

  const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([
    { label: "Bundle", value: "bundle" },
    { label: "Service", value: "service" },
    { label: "Portfolio Item", value: "portfolioItem" },
  ]);
  const [typeOfSearchColumnKeyValue, setTypeOfSearchColumnKeyValue] = useState([
    { label: "Make", value: "make" },
    { label: "Model", value: "model" },
    { label: "Prefix", value: "prefix" },
  ]);

  const initFetch = () => {
    getTaskTypeKeyValue()
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
        setBundleItemTaskTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getUsageCategoryKeyValue()
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
        setCategoryUsageKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getTypeKeyValue()
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
        setTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getMachineTypeKeyValue()
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
        setMachineTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("props.passItemEditRowData 12345: ", props.passItemEditRowData)
    if (props.passItemEditRowData) {
      // setIt accordingly for fields
      const {
        itemBodyDescription,
        startUsage,
        endusage,
        frequency,
        usageIn,
        usage,
        taskType,
        unit,
        recommendedValue,
        quantity,
        numberOfEvents,
        templateDescription,
        repairOption,
      } = props.passItemEditRowData.customItemBodyModel;
      setAddPortFolioItem({
        ...addPortFolioItem,
        id: props.passItemEditRowData.customItemId,
        name: props.passItemEditRowData.itemName,
        description: itemBodyDescription,
        // description: props.passItemEditRowData.customItemHeaderModel.itemHeaderDescription,
        usageIn: {
          label: props.passItemEditRowData.customItemBodyModel.usageIn,
          value: props.passItemEditRowData.customItemBodyModel.usageIn
        },
        taskType: { label: taskType, value: taskType },
        frequency: {
          label: props.passItemEditRowData.customItemBodyModel.frequency,
          value: props.passItemEditRowData.customItemBodyModel.frequency
        },
        unit: {
          label: props.passItemEditRowData.customItemBodyModel.unit,
          value: props.passItemEditRowData.customItemBodyModel.unit
        },
        recommendedValue: props.passItemEditRowData.customItemBodyModel.recommendedValue,
        usageType: { label: usage, value: usage },
        numberOfEvents: numberOfEvents,
        // quantity: 0,
        // numberOfEvents: numberOfEvents,
        // templateDescription: {
        //   label: itemBodyDescription,
        //   value: itemBodyDescription,
        // },
        strategyTask: {
          label: props.passItemEditRowData.customItemHeaderModel.itemHeaderStrategy,
          value: props.passItemEditRowData.customItemHeaderModel.itemHeaderStrategy
        },
        // repairOption: { label: repairOption, value: repairOption },
        repairOption: repairOption,
        withBundleService: props.passItemEditRowData.customItemHeaderModel.withBundleService,
      });

      if (props.setBundleServiceNeed != undefined) {
        if (props.passItemEditRowData.customItemHeaderModel.withBundleService) {
          // props.setBundleServiceNeed(props.passItemEditRowData.customItemHeaderModel.withBundleService)
          props.setBundleServiceNeed(true)
        } else {
          // props.setBundleServiceNeed(!props.passItemEditRowData.customItemHeaderModel.withBundleService)
          props.setBundleServiceNeed(false)
        }
      }

      // console.log("2132546576786787 : ", props.passItemEditRowData)
      // console.log("props.passItemEditRowData.customItemBodyModel.customItemPrices != null : ", props.passItemEditRowData.customItemBodyModel.customItemPrices != null)
      // console.log("props.passItemEditRowData.customItemBodyModel.customItemPrices.length : ", props.passItemEditRowData.customItemBodyModel.customItemPrices.length)

      setBundleFlagType(props.passItemEditRowData.customItemHeaderModel.bundleFlag);
      if ((props.passItemEditRowData.customItemBodyModel.customItemPrices != null)) {
        if (props.passItemEditRowData.customItemBodyModel.customItemPrices.length > 0) {
          ItemPriceDataFetchById();
        }
      }
    }
  }, []);

  useEffect(() => {
    var yearsOptionArr = [];
    for (let i = 1; i <= addPortFolioItem.noOfYear; i++) {
      yearsOptionArr.push({ value: i, label: i })
    }
    seYearsOption(yearsOptionArr);
  }, [addPortFolioItem.noOfYear])

  // console.log("add -12324324345345354534 : ", addPortFolioItem)


  const ItemPriceDataFetchById = async () => {

    console.log("props.passItemEditRowData : ", props.passItemEditRowData)

    const priceId = props.passItemEditRowData.customItemBodyModel.customItemPrices[0].customItemPriceDataId;

    const priceDataId = props.passItemEditRowData.customItemBodyModel.customItemPrices[0].customItemPriceDataId;
    // getCustomItemPriceData

    const res = await getCustomItemPriceData(priceDataId)

    // console.log("res issss 089342394 : ", res)
    // console.log("res.data.quantity : ", res.data.quantity)
    setEditAbleItemPrice(res.data)
    const {
      itemName,
      itemBodyDescription,
      startUsage,
      endusage,
      frequency,
      usageIn,
      usage,
      taskType,
      unit,
      recommendedValue,
      quantity,
      numberOfEvents,
      templateDescription,
      // repairOption,
    } = props.passItemEditRowData.customItemBodyModel;
    // console.log("addportFolioItem :  wdfcsdf ", addPortFolioItem)
    setAddPortFolioItem({
      ...addPortFolioItem,
      id: props.passItemEditRowData.customItemId,
      name: props.passItemEditRowData.itemName,
      description: itemBodyDescription,
      usageIn: { label: usageIn, value: usageIn },
      usageType: { label: usage, value: usage },
      taskType: { label: taskType[0], value: taskType[0] },
      frequency: { label: frequency, value: frequency },
      unit: { label: unit, value: unit },
      recommendedValue: res.data.recommendedValue,
      quantity: res.data.quantity,
      numberOfEvents: res.data.numberOfEvents,
      strategyTask: { label: props.passItemEditRowData.customItemHeaderModel.itemHeaderStrategy, value: props.passItemEditRowData.customItemHeaderModel.itemHeaderStrategy },
      templateId: (res.data.standardJobId == "" || res.data.standardJobId == "string") ? "" : res.data.standardJobId,
      templateDescription: {
        label: res.data.templateDescription,
        value: res.data.templateDescription,
      },
      repairOption: (res.data.repairKitId == "" || res.data.repairKitId == "string") ? "" : res.data.repairKitId,
      kitDescription: (res.data.repairKitId == "" || res.data.repairKitId == "string") ? "" : {
        label: "rty",
        value: "rty",
      },
      startUsage: res.data.startUsage,
      endUsage: res.data.endUsage,
      year: {
        label: res.data.year,
        value: res.data.year,
      },
      noOfYear: res.data.noOfYear,
      currency: (props.passItemEditRowData?.customItemHeaderModel?.currency ||
        props.passItemEditRowData?.customItemHeaderModel?.currency != "") ?
        {
          label: props.passItemEditRowData?.customItemHeaderModel?.currency,
          value: props.passItemEditRowData?.customItemHeaderModel?.currency,
        } : "",
    });

    // console.log("price Result fetch Data : ", res);
  }


  useEffect(() => {
    initFetch();
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

  const HandleCatUsage = (e) => {
    setStratgyTaskUsageKeyValue([]);
    setStratgyTaskTypeKeyValue([]);
    addPortFolioItem.strategyTask = "";
    addPortFolioItem.taskType = "";
    // setCategoryUsageKeyValue1(e);
    setAddPortFolioItem({ ...addPortFolioItem, usageIn: e });
    dispatch(taskActions.updateList(e.value));
  };

  const HandleStrategyUsage = (e) => {
    setStratgyTaskTypeKeyValue([]);
    addPortFolioItem.taskType = "";
    // setStratgyTaskUsageKeyValue(e);
    setAddPortFolioItem({ ...addPortFolioItem, strategyTask: e });
    dispatch(taskActions.updateTask(e.value));
  };

  const handleSummaryAndTemplateTabs = async () => {

    try {
      if (tabs == "itemSummary") {
        if ((props.compoFlag === "ITEM")) {

          if ((props.portfolioDataId == "") ||
            (props.portfolioDataId == undefined)) {
            props.itemModelShow(false)
            throw "Please Create Solution First, then you can Add Item";
          }

          if ((addPortFolioItem.name == "") ||
            (addPortFolioItem.name == undefined)) {
            throw "Name is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.description == "") ||
            (addPortFolioItem.description == undefined)) {
            throw "Description is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.usageIn == "") ||
            (addPortFolioItem.usageIn == undefined)) {
            throw "UsageIn is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.usageIn.value == "") ||
            (addPortFolioItem.usageIn.value == undefined)) {
            throw "UsageIn is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.taskType.value == "") ||
            (addPortFolioItem.taskType.value == undefined)) {
            throw "Task Type is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.startUsage == "") ||
            (addPortFolioItem.startUsage == undefined)) {
            throw "Start Usage is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.endUsage == "") ||
            (addPortFolioItem.endUsage == undefined)) {
            throw "End Usage is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.recommendedValue == "") ||
            (addPortFolioItem.recommendedValue == undefined)) {
            throw "Recommended Value is a required field, you can’t leave it blank";
          }

          // if ((addPortFolioItem.quantity == "") ||
          //   (addPortFolioItem.quantity == undefined)) {
          //   throw "Quantity is a required field, you can’t leave it blank";
          // }


          // if ((addPortFolioItem.numberOfEvents == "") ||
          //   (addPortFolioItem.numberOfEvents == undefined)) {
          //   throw "No of Events is a required field, you can’t leave it blank";
          // }


        }

        if ((props.compoFlag === "BUNDLE")) {
          if ((addPortFolioItem.usageIn == "") ||
            (addPortFolioItem.usageIn == undefined)) {
            throw "UsageIn is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.usageIn.value == "") ||
            (addPortFolioItem.usageIn.value == undefined)) {
            throw "UsageIn is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.taskType.value == "") ||
            (addPortFolioItem.taskType.value == undefined)) {
            throw "Task Type is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.startUsage == "") ||
            (addPortFolioItem.startUsage == undefined)) {
            throw "Start Usage is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.endUsage == "") ||
            (addPortFolioItem.endUsage == undefined)) {
            throw "End Usage is a required field, you can’t leave it blank";
          }

          if ((addPortFolioItem.recommendedValue == "") ||
            (addPortFolioItem.recommendedValue == undefined)) {
            throw "Recommended Value is a required field, you can’t leave it blank";
          }

          // if ((addPortFolioItem.quantity == "") ||
          //   (addPortFolioItem.quantity == undefined)) {
          //   throw "Quantity is a required field, you can’t leave it blank";
          // }


          // if ((addPortFolioItem.numberOfEvents == "") ||
          //   (addPortFolioItem.numberOfEvents == undefined)) {
          //   throw "No of Events is a required field, you can’t leave it blank";
          // }
        }

        if ((props.compoFlag == "itemEdit")) {
          if ((addPortFolioItem.templateId == "") &&
            (addPortFolioItem.repairOption == "")) {
            setTabs("relatedTemplate")
          } else if ((addPortFolioItem.templateId != "") &&
            (addPortFolioItem.repairOption == "" || addPortFolioItem.repairOption == null)) {
            setTabs("relatedTemplate")
          } else if ((addPortFolioItem.repairOption != "") &&
            (addPortFolioItem.templateId == "" || addPortFolioItem.templateId == null)) {
            setTabs("relatedKit")
          }
        } else {
          setTabs("relatedTemplate")
          // setTabs((prev) => `${parseInt(prev) + 1}`)
          setAddPortFolioItem({ ...addPortFolioItem, templateId: "", repairOption: "" });
        }
      }

      if (tabs == "relatedTemplate") {

        if ((addPortFolioItem.templateId == "") ||
          (addPortFolioItem.templateId == undefined)) {
          setTabs("relatedKit");
          // setTabs((prev) => `${parseInt(prev) + 1}`);
        }

        if ((addPortFolioItem.templateId !== "")) {
          if ((props.compoFlag === "ITEM")) {

            if ((props.portfolioDataId == "") ||
              (props.portfolioDataId == undefined)) {
              props.itemModelShow(false)
              throw "Please Create Solution First, then you can Add Item";
            }
            if (noNeedBundleService) {
              props.setTabs("4");
              props.getAddPortfolioItemDataFun(addPortFolioItem);
            } else {
              props.setTabs("2");
              props.getAddPortfolioItemDataFun(addPortFolioItem);
            }
            // props.setTabs("relatedTemplate");
          }

          if ((props.compoFlag === "BUNDLE")) {


            // ================= Old Todo ============== //
            // const newPriceObj = {
            //   itemPriceDataId: 0,
            //   quantity: 0,
            //   standardJobId: addPortFolioItem.templateId,
            //   repairKitId: addPortFolioItem.repairOption,
            //   templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
            //   repairOption: "",
            //   additional: "",
            //   partListId: "",
            //   serviceEstimateId: "",
            //   numberOfEvents: 0,
            //   priceMethod: "EMPTY",
            //   priceType: "EMPTY",
            //   listPrice: 0,
            //   priceEscalation: "",
            //   calculatedPrice: 0,
            //   flatPrice: 0,
            //   year: addPortFolioItem.year?.value,
            //   noOfYear: parseInt(addPortFolioItem.noOfYear),
            //   sparePartsPrice: 0,
            //   sparePartsPriceBreakDownPercentage: 0,
            //   servicePrice: 0,
            //   labourPrice: 0,
            //   labourPriceBreakDownPercentage: 0,
            //   miscPrice: 0,
            //   miscPriceBreakDownPercentage: 0,
            //   totalPrice: 0,
            //   netService: 0,
            //   additionalPriceType: "ABSOLUTE",
            //   additionalPriceValue: 0,
            //   discountType: "EMPTY",
            //   discountValue: 0,
            //   recommendedValue: parseInt(addPortFolioItem.recommendedValue),
            //   startUsage: parseInt(addPortFolioItem.startUsage),
            //   endUsage: parseInt(addPortFolioItem.endUsage),
            //   sparePartsEscalation: 0,
            //   labourEscalation: 0,
            //   miscEscalation: 0,
            //   serviceEscalation: 0,
            //   withBundleService: false,
            //   portfolio: {
            //     portfolioId: 1
            //   },
            //   tenantId: loginTenantId,
            //   partsRequired: true,
            //   labourRequired: true,
            //   serviceRequired: false,
            //   miscRequired: true,
            //   inclusionExclusion: false
            // }
            // const itemPriceData = await createItemPriceData(newPriceObj)

            // ================= Old Todo End ============== //

            const newPriceObj = {
              customItemPriceDataId: 0,
              quantity: 0,
              standardJobId: addPortFolioItem.templateId,
              repairKitId: addPortFolioItem.repairOption,
              templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
              repairOption: "",
              additional: "",
              partListId: "",
              serviceEstimateId: "",
              numberOfEvents: 0,
              priceMethod: "EMPTY",
              priceType: "EMPTY",
              listPrice: 0,
              priceEscalation: "",
              calculatedPrice: 0,
              flatPrice: 0,
              year: addPortFolioItem.year?.value,
              noOfYear: parseInt(addPortFolioItem.noOfYear),
              sparePartsPrice: 0,
              sparePartsPriceBreakDownPercentage: 0,
              servicePrice: 0,
              labourPrice: 0,
              labourPriceBreakDownPercentage: 0,
              miscPrice: 0,
              miscPriceBreakDownPercentage: 0,
              totalPrice: 0,
              netService: 0,
              additionalPriceType: "ABSOLUTE",
              additionalPriceValue: 0,
              discountType: "EMPTY",
              discountValue: 0,
              recommendedValue: parseInt(addPortFolioItem.recommendedValue),
              startUsage: parseInt(addPortFolioItem.startUsage),
              endUsage: parseInt(addPortFolioItem.endUsage),
              sparePartsEscalation: 0,
              labourEscalation: 0,
              miscEscalation: 0,
              serviceEscalation: 0,
              withBundleService: false,
              // customPortfolio: {
              //   portfolioId: 1
              // },
              customPortfolio: null,
              tenantId: loginTenantId,
              partsRequired: true,
              labourRequired: true,
              miscRequired: true,
              serviceRequired: false,
              inclusionExclusion: false
            }
            const itemPriceData = await customPriceCreation(newPriceObj)
            props.getAddPortfolioItemData(addPortFolioItem, itemPriceData.data);
          }

          if ((props.compoFlag === "itemEdit") &&
            (props.compoFlagTest === "itemEditPort")) {
            props.handleItemEditSave(
              addPortFolioItem,
              editAbleItemPrice,
              bundleFlagType
            );
          }

          if ((props.compoFlag === "itemEdit") &&
            (props.compoFlagTest === "itemEditBundle")) {
            props.handleItemEditSave(
              addPortFolioItem,
              editAbleItemPrice,
              bundleFlagType
            );
          }

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

    // ================== Old Method with Conditions Start ================ //
    //  if (tabs == 1) {
    //   if ((props.compoFlag === "ITEM") &&
    //     (addPortFolioItem.name == "" ||
    //       addPortFolioItem.description == "" ||
    //       addPortFolioItem.usageIn == "" ||
    //       addPortFolioItem.taskType == "" ||
    //       addPortFolioItem.quantity == "" ||
    //       addPortFolioItem.quantity == 0)) {
    //     toast("😐" + "Please fill mandatory fields", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   } else if ((props.compoFlag === "itemEdit") &&
    //     (addPortFolioItem.name == "" ||
    //       addPortFolioItem.description == "" ||
    //       addPortFolioItem.usageIn == "" ||
    //       addPortFolioItem.taskType == "" ||
    //       addPortFolioItem.quantity == "")) {
    //     toast("😐" + "Please fill mandatory fields", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   } else {
    //     if (props.compoFlag == "itemEdit") {
    //       setTabs((prev) => `${parseInt(prev) + 1}`);
    //     } else {
    //       setTabs((prev) => `${parseInt(prev) + 1}`)
    //       setAddPortFolioItem({ ...addPortFolioItem, templateId: "", repairOption: "" });
    //     }
    //   }
    // } else if (tabs == 2 && addPortFolioItem.templateId == "") {
    //   setTabs((prev) => `${parseInt(prev) + 1}`);
    // } else if (tabs == 2 && addPortFolioItem.templateId !== "") {
    //   if (props.compoFlag === "ITEM") {
    //     props.setTabs("2");
    //     props.getAddportfolioItemDataFun(addPortFolioItem);
    //   } else {
    //     if (props.compoFlag === "itemEdit") {
    //       // props.handleItemEditSave(addPortFolioItem, editAbleItemPrice);
    //       props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
    //     }
    //     // props.getAddportfolioItemData(addPortFolioItem);
    //     props.setBundleTabs("3");
    //   }
    // }

    // ================== Old Method with Conditions End ================ //
    // tabs < 3 && setTabs((prev) => `${parseInt(prev) + 1}`);

  }

  const handleStandardJobInputSearch = (e) => {
    setAddPortFolioItem({
      ...addPortFolioItem,
      templateId: e.target.value,
    });
    var searchStr = e.target.value;
    getSearchStandardJobId(searchStr)
      .then((res) => {
        if(res.status === 200){
          // console.log("search Query Result --------- :", res);
          // setMasterData(res);
          $(`.scrollbar-model`).css("display", "block");
          setQuerySearchStandardJobResult(res.data);
          var preArr = [];
          for (var n = 0; n < res.data.length; n++) {
            preArr.push({ label: res.data[n].prefix, value: res.data[n].prefix });
          }
          // setQuerySearchModelPrefixOption(preArr);
        }
      })
      .catch((err) => {
        console.log("error in getSearchQueryCoverage", err);
      });
  };

  const handleRelatedKitInputSearch = (e) => {
    setAddPortFolioItem({
      ...addPortFolioItem,
      repairOption: e.target.value,
    });
    var searchStr = e.target.value;
    getSearchKitId(searchStr)
      .then((res) => {
        if(res.status === 200){
          // console.log("search Query Result --------- :", res);
          // setMasterData(res);
          $(`.scrollbar-model`).css("display", "block");
          setQuerySearchRelatedKitResult(res.data);
          var preArr = [];
          for (var n = 0; n < res.data.length; n++) {
            preArr.push({ label: res.data[n].prefix, value: res.data[n].prefix });
          }
          // setQuerySearchModelPrefixOption(preArr);
        }
      })
      .catch((err) => {
        console.log("error in getSearchQueryCoverage", err);
      });
  };

  const handleSearchStandardJobListClick = (e, currentItem) => {
    console.log("currentItem : ", currentItem);
    // templateDescription
    setAddPortFolioItem({
      ...addPortFolioItem,
      templateId: currentItem.standardJobId,
      templateDescription: {
        label: currentItem.description,
        value: currentItem.description,
      },
    });
    $(`.scrollbar-model`).css("display", "none");
  };

  const handleSearchRelatedKitListClick = (e, currentItem) => {
    console.log("currentItem : ", currentItem);
    // templateDescription
    setAddPortFolioItem({
      ...addPortFolioItem,
      repairOption: currentItem.kitId,
      kitDescription: { label: currentItem.description, value: currentItem.description },
    });
    $(`.scrollbar-model`).css("display", "none");
  };

  const handleAddPortfolioSave = async () => {

    try {
      if (props.compoFlag === "ITEM") {
        if ((props.portfolioDataId == "") ||
          (props.portfolioDataId == undefined)) {
          props.itemModelShow(false)
          throw "Please Create Solution First, then you can Add Item";
        }
      }

      if (addPortFolioItem.repairOption == "") {
        throw "you can’t leave blank related Kit field";
      }

      if ((props.compoFlag === "ITEM")) {

        if ((props.portfolioDataId == "") ||
          (props.portfolioDataId == undefined)) {
          props.itemModelShow(false)
          throw "Please Create Solution First, then you can Add Item";
        }

        if (noNeedBundleService) {
          props.setTabs("4");
          props.getAddPortfolioItemDataFun(addPortFolioItem);
        } else {
          props.setTabs("2");
          props.getAddPortfolioItemDataFun(addPortFolioItem);
        }

      } else if ((props.compoFlag === "itemEdit") &&
        (props.compoFlagTest === "itemEditPort")) {
        props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
      } else if ((props.compoFlag === "itemEdit") &&
        (props.compoFlagTest === "itemEditBundle")) {
        props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
      } else {


        // ================= Old Todo ============== //

        // const rObj = {
        //   itemPriceDataId: 0,
        //   quantity: addPortFolioItem.quantity,
        //   startUsage: addPortFolioItem.startUsage,
        //   endUsage: addPortFolioItem.endUsage,
        //   standardJobId: addPortFolioItem.templateId,
        //   repairKitId: addPortFolioItem.repairOption,
        //   templateDescription: addPortFolioItem.templateDescription,
        //   repairOption: "",
        //   additional: "",
        //   partListId: "",
        //   serviceEstimateId: "",
        //   numberOfEvents: addPortFolioItem.numberOfEvents,
        //   priceMethod: "LIST_PRICE",
        //   priceType: "FIXED",
        //   listPrice: 0,
        //   priceEscalation: "",
        //   calculatedPrice: 0,
        //   flatPrice: 0,
        //   discountType: "",
        //   year: addPortFolioItem.year?.value,
        //   noOfYear: addPortFolioItem.noOfYear,
        //   sparePartsPrice: 0,
        //   sparePartsPriceBreakDownPercentage: 0,
        //   servicePrice: 0,
        //   labourPrice: 0,
        //   labourPriceBreakDownPercentage: 0,
        //   miscPrice: 0,
        //   miscPriceBreakDownPercentage: 0,
        //   totalPrice: 0,
        //   netService: 0,
        //   portfolio: {
        //     portfolioId: 1
        //   },
        //   tenantId: loginTenantId,
        //   partsRequired: true,
        //   serviceRequired: false,
        //   labourRequired: true,
        //   miscRequired: true
        // }
        // const itemPriceData = await createItemPriceData(rObj)

        // ================= Old Todo End ============== //

        const rObj = {
          customItemPriceDataId: 0,
          quantity: 0,
          standardJobId: addPortFolioItem.templateId,
          repairKitId: addPortFolioItem.repairOption,
          templateDescription: addPortFolioItem.templateId != "" ? addPortFolioItem.templateDescription?.value : "",
          repairOption: "",
          additional: "",
          partListId: "",
          serviceEstimateId: "",
          numberOfEvents: 0,
          priceMethod: "EMPTY",
          priceType: "EMPTY",
          listPrice: 0,
          priceEscalation: "",
          calculatedPrice: 0,
          flatPrice: 0,
          year: addPortFolioItem.year?.value,
          noOfYear: parseInt(addPortFolioItem.noOfYear),
          sparePartsPrice: 0,
          sparePartsPriceBreakDownPercentage: 0,
          servicePrice: 0,
          labourPrice: 0,
          labourPriceBreakDownPercentage: 0,
          miscPrice: 0,
          miscPriceBreakDownPercentage: 0,
          totalPrice: 0,
          netService: 0,
          additionalPriceType: "ABSOLUTE",
          additionalPriceValue: 0,
          discountType: "EMPTY",
          discountValue: 0,
          recommendedValue: parseInt(addPortFolioItem.recommendedValue),
          startUsage: parseInt(addPortFolioItem.startUsage),
          endUsage: parseInt(addPortFolioItem.endUsage),
          sparePartsEscalation: 0,
          labourEscalation: 0,
          miscEscalation: 0,
          serviceEscalation: 0,
          withBundleService: addPortFolioItem.withBundleService,
          // customPortfolio: {
          //   portfolioId: 1
          // },
          customPortfolio: null,
          tenantId: loginTenantId,
          partsRequired: true,
          labourRequired: true,
          miscRequired: true,
          serviceRequired: false,
          inclusionExclusion: true
        }

        const itemPriceData = await customPriceCreation(rObj)

        props.getAddPortfolioItemData(addPortFolioItem, itemPriceData.data)
        props.setBundleTabs("bundleServicePriceCalculator");
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
      return;
    }

    // if (props.compoFlag === "ITEM") {
    //   props.setTabs("2");
    //   props.getAddportfolioItemDataFun(addPortFolioItem);
    // } else {
    //   if (props.compoFlag === "itemEdit") {
    //     props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
    //   } else {
    //     props.getAddportfolioItemData(addPortFolioItem);
    //     props.setBundleTabs("3");
    //   }
    // }

    // if (props.compoFlag === "itemEdit") {
    //   props.handleItemEditSave(addPortFolioItem);
    // } else if (props.compoFlag === "ITEM") {

    //   console.log("addPortFolioItem : ", addPortFolioItem);
    // } else {
    //   props.getAddportfolioItemData(addPortFolioItem);
    //   props.setBundleTabs("3");
    // }
  };

  const [yearsOption, seYearsOption] = useState([
    {
      value: "1", label: "1"
    }
  ])

  const [extWorkData, setExtWorkData] = useState({
    jobCode: "",
    jobCodeDescription: "",
    pricingMethod: "",
    totalPrice: 0.0,
    payer: "",
    flatRateIndicator: false,
    adjustedPrice: 0.0,
    basePrice: 0.0,
    percentageOfBase: 0,
  });

  const makeTemplateEditable = (selectedTemplate) => {
    let templateDetails = {
      templateId: "",
      templateDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };

    // templateDetails.templateId = selectedTemplate.templateId;
    // templateDetails.templateDBId = selectedTemplate.id;
    // history.push({
    //   pathname: "/RepairServiceOnlyTemplate/ServiceOnlyTemplates",
    //   state: templateDetails,
    // });
  }

  const makeKitEditable = (selectedTemplate) => {
    let templateDetails = {
      templateId: "",
      templateDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };

    // templateDetails.templateId = selectedTemplate.templateId;
    // templateDetails.templateDBId = selectedTemplate.id;
    // history.push({
    //   pathname: "/RepairServiceOnlyTemplate/ServiceOnlyTemplates",
    //   state: templateDetails,
    // });
  }

  const handleBundleItemSaveAndContinue = async (data, itemPriceData) => {


    try {
      // let reqObj = {
      //   itemId: 0,
      //   itemName: addPortFolioItem.name,
      //   itemHeaderModel: {
      //     itemHeaderId: 0,
      //     // itemHeaderId: parseInt(generalComponentData.portfolioId),
      //     // itemHeaderDescription: generalComponentData.description,
      //     itemHeaderDescription: addPortFolioItem.headerdescription,
      //     bundleFlag: "PORTFOLIO",
      //     reference: generalComponentData.externalReference,
      //     itemHeaderMake: "",
      //     itemHeaderFamily: "",
      //     model: "",
      //     prefix: "",
      //     type: "MACHINE",
      //     additional: "",
      //     currency: "",
      //     netPrice: 0,
      //     itemProductHierarchy: generalComponentData.productHierarchy,
      //     itemHeaderGeographic: generalComponentData.geographic,
      //     responseTime: generalComponentData.responseTime,
      //     usage: "",
      //     validFrom: generalComponentData.validFrom,
      //     validTo: generalComponentData.validTo,
      //     estimatedTime: "",
      //     servicePrice: 0,
      //     status: "NEW",
      //   },
      //   itemBodyModel: {
      //     itemBodyId: parseInt(addPortFolioItem.id),
      //     itemBodyDescription: addPortFolioItem.description,
      //     quantity: parseInt(addPortFolioItem.quantity),
      //     startUsage: priceCalculator.startUsage,
      //     endUsage: priceCalculator.endUsage,
      //     standardJobId: "",
      //     frequency: addPortFolioItem.frequency.value,
      //     additional: "",
      //     spareParts: ["WITH_SPARE_PARTS"],
      //     labours: ["WITH_LABOUR"],
      //     miscellaneous: ["LUBRICANTS"],
      //     taskType: [addPortFolioItem.taskType.value],
      //     solutionCode: "",
      //     usageIn: addPortFolioItem.usageIn.value,
      //     recommendedValue: 0,
      //     usage: "",
      //     repairKitId: "",
      //     templateDescription: addPortFolioItem.description.value,
      //     partListId: "",
      //     serviceEstimateId: "",
      //     numberOfEvents: parseInt(addPortFolioItem.numberOfEvents),
      //     repairOption: addPortFolioItem.repairOption.value,
      //     priceMethod: "LIST_PRICE",
      //     listPrice: parseInt(priceCalculator.listPrice),
      //     priceEscalation: "",
      //     calculatedPrice: parseInt(priceCalculator.calculatedPrice),
      //     flatPrice: parseInt(priceCalculator.flatPrice),
      //     discountType: "",
      //     // year: priceCalculator.priceYear.value,
      //     year: addPortFolioItem.year,
      //     avgUsage: 0,
      //     unit: addPortFolioItem.unit.value,
      //     sparePartsPrice: 0,
      //     sparePartsPriceBreakDownPercentage: 0,
      //     servicePrice: 0,
      //     servicePriceBreakDownPercentage: 0,
      //     miscPrice: 0,
      //     miscPriceBreakDownPercentage: 0,
      //     totalPrice: 0,
      //   },
      // };

      //  Old Todo
      // let reqObj = {
      //   itemId: 0,
      //   itemName: data.name,
      //   itemHeaderModel: {
      //     itemHeaderId: 0,
      //     // itemHeaderId: parseInt(generalComponentData.portfolioId),
      //     // itemHeaderDescription: generalComponentData.description,
      //     itemHeaderDescription: data.headerdescription,
      //     bundleFlag: "PORTFOLIO",
      //     reference: generalComponentData.externalReference,
      //     itemHeaderMake: "",
      //     itemHeaderFamily: "",
      //     model: "",
      //     prefix: "",
      //     type: "MACHINE",
      //     additional: "",
      //     currency: "",
      //     netPrice: 0,
      //     itemProductHierarchy: generalComponentData.productHierarchy,
      //     itemHeaderGeographic: generalComponentData.geographic,
      //     responseTime: generalComponentData.responseTime,
      //     usage: "",
      //     validFrom: generalComponentData.validFrom,
      //     validTo: generalComponentData.validTo,
      //     estimatedTime: "",
      //     servicePrice: 0,
      //     status: "DRAFT",
      //   },
      //   itemBodyModel: {
      //     itemBodyId: parseInt(data.id),
      //     itemBodyDescription: data.description,
      //     quantity: parseInt(data.quantity),
      //     startUsage: priceCalculator.startUsage,
      //     endUsage: priceCalculator.endUsage,
      //     standardJobId: "",
      //     frequency: data.frequency.value,
      //     additional: "",
      //     spareParts: ["WITH_SPARE_PARTS"],
      //     labours: ["WITH_LABOUR"],
      //     miscellaneous: ["LUBRICANTS"],
      //     taskType: [data.taskType.value],
      //     solutionCode: "",
      //     usageIn: data.usageIn.value,
      //     recommendedValue: 0,
      //     usage: "",
      //     repairKitId: "",
      //     templateDescription: data.description.value,
      //     partListId: "",
      //     serviceEstimateId: "",
      //     numberOfEvents: parseInt(data.numberOfEvents),
      //     repairOption: data.repairOption.value,
      //     priceMethod: "LIST_PRICE",
      //     listPrice: parseInt(priceCalculator.listPrice),
      //     priceEscalation: "",
      //     calculatedPrice: parseInt(priceCalculator.calculatedPrice),
      //     flatPrice: parseInt(priceCalculator.flatPrice),
      //     discountType: "",
      //     // year: priceCalculator.priceYear.value,
      //     year: data.year,
      //     avgUsage: 0,
      //     unit: data.unit.value,
      //     sparePartsPrice: 0,
      //     sparePartsPriceBreakDownPercentage: 0,
      //     servicePrice: 0,
      //     servicePriceBreakDownPercentage: 0,
      //     miscPrice: 0,
      //     miscPriceBreakDownPercentage: 0,
      //     totalPrice: 0,
      //   },
      // };

      // New Todo
      let reqObj = {
        itemId: 0,
        itemName: data.name,
        itemHeaderModel: {
          itemHeaderId: 0,
          itemHeaderDescription: data.headerdescription,
          bundleFlag: "PORTFOLIO",
          portfolioItemId: 0,
          reference: generalComponentData.externalReference,
          itemHeaderMake: data?.make,
          itemHeaderFamily: data?.family,
          model: data.model,
          prefix: data.prefix,
          type: "MACHINE",
          additional: "",
          currency: "",
          netPrice: 0,
          itemProductHierarchy: "END_PRODUCT",
          itemHeaderGeographic: "ONSITE",
          responseTime: "PROACTIVE",
          usage: "",
          validFrom: generalComponentData.validFrom,
          validTo: generalComponentData.validTo,
          estimatedTime: "",
          servicePrice: 0,
          status: "DRAFT",
          itemHeaderStrategy: data.strategyTask !== "" ? data.strategyTask?.value : "PREVENTIVE_MAINTENANCE",
          componentCode: "",
          componentDescription: "",
          serialNumber: "",
          variant: "",
          itemHeaderCustomerSegment: createServiceOrBundle.customerSegment != "" ? createServiceOrBundle.customerSegment?.value : "Customer Segment",
          jobCode: "",
          preparedBy: administrative.preparedBy,
          approvedBy: administrative.approvedBy,
          preparedOn: administrative.preparedOn,
          revisedBy: administrative.revisedBy,
          revisedOn: administrative.revisedOn,
          salesOffice: administrative.branch,
          offerValidity: administrative.offerValidity
        },
        itemBodyModel: {
          itemBodyId: 0,
          itemBodyDescription: data.description,
          frequency: data.frequency != "" ? data.frequency?.value : "once",
          spareParts: ["WITH_SPARE_PARTS"],
          labours: ["WITH_LABOUR"],
          miscellaneous: ["LUBRICANTS"],
          taskType: data.taskType != "" ? [data.taskType.value] : ["PM1"],
          solutionCode: "",
          usageIn: data.usageIn != "" ? data.usageIn.value : "REPAIR_OR_REPLACE",
          recommendedValue: parseInt(data.recommendedValue),
          usage: "",
          year: data.year,
          avgUsage: 0,
          unit: data.unit != "" ? data.unit?.value : "",
          itemPrices: [
            {
              itemPriceDataId: itemPriceData.itemPriceDataId
            }
          ],
        }
      }

      console.log("new reqObj : 12345 ----- : ", reqObj)

      console.log("requested obj : ", reqObj);
      console.log("requested obj 2 : ", addPortFolioItem);
      const itemRes = await itemCreation(reqObj);
      if (itemRes.status !== 200) {
        throw "Something went wrong/Item not created"
      }
      setCurrentItemId(itemRes.data.itemId);
      setCreatedItemsIdData([...createdItemsIdData, itemRes.data.itemId]);
      const _generalComponentData = { ...generalComponentData };
      _generalComponentData.items?.push({ itemId: itemRes.data.itemId });
      var _itemArrData = [...portfolioItems];
      _itemArrData.push({ itemId: itemRes.data.itemId })
      setPortfolioItems(_itemArrData);
      // put API for porfolio update Item id
      // call here
      const { portfolioId, ...res } = generalComponentData;
      let obj = {
        ...res,
        visibleInCommerce: true,
        customerId: 0,
        lubricant: true,
        customerSegment: generalComponentData.customerSegment
          ? generalComponentData.customerSegment.value
          : "EMPTY",
        machineType: generalComponentData.machineType
          ? generalComponentData.machineType
          : "EMPTY",
        strategyTask: generalComponentData.strategyTask
          ? generalComponentData.strategyTask
          : "EMPTY",
        taskType: generalComponentData.taskType
          ? generalComponentData.taskType
          : "EMPTY",
        usageCategory: generalComponentData.usageCategory
          ? generalComponentData.usageCategory
          : "EMPTY",
        productHierarchy: generalComponentData.productHierarchy
          ? generalComponentData.productHierarchy
          : "EMPTY",
        geographic: generalComponentData.geographic
          ? generalComponentData.geographic
          : "EMPTY",
        availability: generalComponentData.availability
          ? generalComponentData.availability
          : "EMPTY",
        responseTime: generalComponentData.responseTime
          ? generalComponentData.responseTime
          : "EMPTY",
        type: generalComponentData.type ? generalComponentData.type : "EMPTY",
        application: generalComponentData.application
          ? generalComponentData.application
          : "EMPTY",
        contractOrSupport: generalComponentData.contractOrSupport
          ? generalComponentData.contractOrSupport
          : "EMPTY",
        lifeStageOfMachine: generalComponentData.lifeStageOfMachine
          ? generalComponentData.lifeStageOfMachine
          : "EMPTY",
        supportLevel: generalComponentData.supportLevel
          ? generalComponentData.supportLevel
          : "EMPTY",
        customerGroup: generalComponentData.customerGroup
          ? generalComponentData.customerGroup
          : "EMPTY",
        searchTerm: "EMPTY",

        usageCategory: categoryUsageKeyValue1.value
          ? categoryUsageKeyValue1.value : "EMPTY",
        strategyTask: stratgyTaskUsageKeyValue.value ?
          stratgyTaskUsageKeyValue.value : "EMPTY",
        taskType: stratgyTaskTypeKeyValue.value ?
          stratgyTaskTypeKeyValue.value : "EMPTY",
        responseTime: stratgyResponseTimeKeyValue.value ?
          stratgyResponseTimeKeyValue.value : "EMPTY",
        productHierarchy: stratgyHierarchyKeyValue.value ?
          stratgyHierarchyKeyValue.value : "EMPTY",
        geographic: stratgyGeographicKeyValue.value ?
          stratgyGeographicKeyValue.value : "EMPTY",

        preparedBy: administrative.preparedBy,
        approvedBy: administrative.approvedBy,
        preparedOn: administrative.preparedOn,
        revisedBy: administrative.revisedBy,
        revisedOn: administrative.revisedOn,
        offerValidity: administrative.offerValidity?.value,
        salesOffice: administrative.salesOffice?.value,

        portfolioPrice: Object.keys(portfolioPriceDataId).length > 0
          ? portfolioPriceDataId : null,
        additionalPrice: Object.keys(portfolioAdditionalPriceDataId).length > 0
          ? portfolioAdditionalPriceDataId : null,
        escalationPrice: Object.keys(portfolioEscalationPriceDataId).length > 0
          ? portfolioEscalationPriceDataId : null,

        supportLevel: value3.value,
        status: value2.value,

        items: _itemArrData,
        coverages: portfolioCoverage,

      };
      if (generalComponentData.portfolioId) {
        const updatePortfolioRes = await updatePortfolio(
          generalComponentData.portfolioId,
          obj
        );
        if (updatePortfolioRes.status === 200) {
          toast(`👏 Portfolio <${generalComponentData.name}> saved Successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          throw `${updatePortfolioRes.status}:Something went wrong`;
        }
        // if (updatePortfolioRes.status != 200) {
        //   throw `${updatePortfolioRes.status}:Something went wrong`;
        // }
      }

      setGeneralComponentData(_generalComponentData);
      setTempBundleItems([...tempBundleItems, itemRes.data]);

      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
    } catch (error) {
      console.log("error in item creation err:", error);
      toast("😐" + error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };

  const handleCreateNewServiceBundle = () => {
    if (typeOfSearch.value == "bundle") {
      setOpenAddBundleItem(false);
      setOpenSearchSolution(false);
      setCreateNewBundle(true);
      setOpenAddBundleItemHeader("Add New Bundle");
    } else if (typeOfSearch.value == "service") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Service");
    } else if (typeOfSearch.value == "portfolioItem") {
      setOpenAddBundleItem(true);
      setOpenSearchSolution(false);
      setCreateNewBundle(false);
      setOpenAddBundleItemHeader("Add New Portfolio Item");
    }
  };

  const handleTypeOfSearchChange = (e) => {
    setTypeOfSearch(e);
    if (e == null) {
      setColumnSearchText("");
    }
  };

  const handleTypeOfSearchColumnChange = (e) => {
    setTypeOfSearchColumn(e);
    if (e == null) {
      setColumnSearchText("");
    }
  };

  const handleLandingPageQuerySearchClick = async () => {
    try {
      if (selectedItemType == "" ||
        querySearchSelector[0]?.selectFamily?.value == "" ||
        querySearchSelector[0]?.inputSearch == "" ||
        querySearchSelector[0]?.selectFamily?.value === undefined) {
        throw "Please fill data properly"
      }
      var searchStr = `${querySearchSelector[0]?.selectFamily?.value}~${querySearchSelector[0]?.inputSearch}`;

      for (let i = 1; i < querySearchSelector.length; i++) {
        if (
          querySearchSelector[i]?.selectFamily?.value == "" ||
          querySearchSelector[i]?.inputSearch == "" ||
          querySearchSelector[i]?.selectOperator?.value == ""

        ) {
          throw "Please fill data properly"
        }
        searchStr =
          searchStr +
          " " +
          querySearchSelector[i].selectOperator.value + " " +
          querySearchSelector[i].selectFamily.value +
          "~" +
          querySearchSelector[i].inputSearch;
      }

      console.log("portfolio search searchStr : ", searchStr);

      if (selectedItemType === "PORTFOLIO") {
        var newArr = [];
        const res2 = await portfolioSearch(searchStr)
        for (var j = 0; j < res2.length; j++) {
          for (var k = 0; k < res2[j].items.length; k++) {
            newArr.push(res2[j].items[k]);
          }
        }

        var result = newArr.reduce((unique, o) => {
          if (!unique.some(obj => obj.itemId === o.itemId)) {
            unique.push(o);
          }
          return unique;
        }, []);
        // setPortfolioItemData(result);
        setPortfolioItemData(res2);

        console.log("set PortfolioItemData : ", res2)
      } else if (selectedItemType === "BUNDLE_ITEM") {
        searchStr = "bundleFlag:BUNDLE_ITEM AND " + searchStr;
        const res1 = await itemSearch(searchStr);
        // console.log(res1)
        setBundleServiceItemData(res1)
      }
      else if (selectedItemType === "SERVICE") {
        searchStr = "bundleFlag:SERVICE AND " + searchStr;
        const res1 = await itemSearch(searchStr);
        // console.log(res1)
        setBundleServiceItemData(res1)
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
      return
    }
  };

  const BundleServiceItemsNeed = (e) => {
    console.log("event is  : ", e.target.checked)
    if (props.setBundleServiceNeed !== undefined) {
      props.setBundleServiceNeed(e.target.checked)
      setNoNeedBundleService(e.target.checked);
      setAddPortFolioItem({
        ...addPortFolioItem,
        withBundleService: e.target.checked,
      })
    }
  }


  return (
    <>
      <div className="ligt-greey-bg p-3 d-none">
        <div>
          {props.compoFlag === "itemEdit" && (
            <span className="mr-3 cursor" onClick={() => setEditable(false)}>
              <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
              <span className="ml-2">Edit</span>
            </span>
          )}

          <span className="mr-3">
            <FormatListBulletedOutlinedIcon className=" font-size-16" />
            {/* <span className="ml-2">Related part list(s)</span> */}
            <span className="ml-2">Item Summary(s)</span>
          </span>
          <span className="mr-3">
            <AccessAlarmOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related template(s)</span>
          </span>
          <span>
            <SellOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related repair option</span>
          </span>
        </div>
      </div>
      <div className="d-none">
        <p className="mt-4">SUMMARY</p>
        <div className="row mt-4">
          <div className="col-md-6 col-sm-6">
            <div className="form-group w-100">
              <label
                className="text-light-dark font-size-12 font-weight-500"
                for="exampleInputEmail1"
              >
                ID
              </label>
              <input
                type="text"
                className="form-control border-radius-10"
                disabled
                placeholder="(AUTO GENERATE)"
                value={addPortFolioItem.id ? addPortFolioItem.id : ""}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group w-100">
              <label
                className="text-light-dark font-size-12 font-weight-500"
                for="exampleInputEmail1"
              >
                DESCRIPTION
              </label>
              <input
                type="text"
                className="form-control border-radius-10"
                placeholder="DESCRIPTION"
                name="description"
                onChange={(e) =>
                  setAddPortFolioItem({
                    ...addPortFolioItem,
                    description: e.target.value,
                  })
                }
                value={addPortFolioItem.description}
                disabled={editable}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group w-100">
              <label
                className="text-light-dark font-size-12 font-weight-500"
                for="exampleInputEmail1"
              >
                USAGE IN
              </label>
              <Select
                options={categoryList}
                // options={props.categoryList}
                value={addPortFolioItem.usageIn}
                onChange={(e) =>
                  setAddPortFolioItem({ ...addPortFolioItem, usageIn: e })
                }
                isDisabled={editable}
              />
            </div>
          </div>
        </div>

        <p className="mt-4">STRATEGY</p>
        <div className="row mt-4">
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label
                className="text-light-dark font-size-14 font-weight-500"
                for="exampleInputEmail1"
              >
                TASK TYPE
              </label>
              <Select
                options={updatedTaskList}
                // options={props.updatedTaskList}
                value={addPortFolioItem.taskType}
                onChange={(e) =>
                  setAddPortFolioItem({ ...addPortFolioItem, taskType: e })
                }
                isDisabled={editable}
              />
              {/* <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={updatedTaskList}
                    value={addPortFolioItem.taskType}
                    onChange={(e) => setAddPortFolioItem({ ...addPortFolioItem, taskType: e, })}
                    isDisabled={editable}
                  />
                  <span className="search-icon searchIcon">
                    <SearchOutlinedIcon className="font-size-16" />
                  </span>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label
                className="text-light-dark font-size-14 font-weight-500"
                for="exampleInputEmail1"
              >
                FREQUENCY
              </label>
              <Select
                options={frequencyOptions}
                placeholder="FREQUENCY"
                onChange={(e) =>
                  setAddPortFolioItem({ ...addPortFolioItem, frequency: e })
                }
                value={addPortFolioItem.frequency}
                isDisabled={editable}
              />
              {/* <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={frequencyOptions}
                    placeholder="FREQUENCY"
                    onChange={(e) => setAddPortFolioItem({ ...addPortFolioItem, frequency: e, })}
                    value={addPortFolioItem.frequency}
                    isDisabled={editable}
                  />
                  <span className="search-icon searchIcon">
                    <SearchOutlinedIcon className="font-size-16" />
                  </span>
                </div>
              </div> */}
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
                placeholder="Select unit"
                onChange={(e) =>
                  setAddPortFolioItem({ ...addPortFolioItem, unit: e })
                }
                value={addPortFolioItem.unit}
                isDisabled={editable}
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
              <input
                type="text"
                placeholder="RECOMMENDED VALUE"
                className="form-control border-radius-10"
                // options={options}

                onChange={(e) =>
                  setAddPortFolioItem({
                    ...addPortFolioItem,
                    recommendedValue: e.target.value,
                  })
                }
                value={addPortFolioItem.recommendedValue}
                isDisabled={editable}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group w-100">
              <label
                className="text-light-dark font-size-12 font-weight-500"
                for="exampleInputEmail1"
              >
                QUANTITY
              </label>
              <input
                type="text"
                className="form-control border-radius-10"
                placeholder="QUANTITY"
                onChange={(e) =>
                  setAddPortFolioItem({
                    ...addPortFolioItem,
                    quantity: e.target.value,
                  })
                }
                value={addPortFolioItem.quantity}
                disabled={editable}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group w-100">
              <label
                className="text-light-dark font-size-12 font-weight-500"
                for="exampleInputEmail1"
              >
                NO. OF EVENTS
              </label>
              <input
                type="text"
                className="form-control border-radius-10"
                placeholder="NO. OF EVENTS"
                onChange={(e) =>
                  setAddPortFolioItem({
                    ...addPortFolioItem,
                    numberOfEvents: e.target.value,
                  })
                }
                value={addPortFolioItem.numberOfEvents}
                // disabled={editable}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
        <p className="mt-4">TEMPLATES</p>
        <div className="row">
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label
                className="text-light-dark font-size-14 font-weight-500"
                for="exampleInputEmail1"
              >
                TEMPLATE ID
              </label>
              <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={options}
                    placeholder="TEMPLATE ID"
                    onChange={(e) =>
                      setAddPortFolioItem({
                        ...addPortFolioItem,
                        templateId: e,
                      })
                    }
                    value={addPortFolioItem.templateId}
                    isDisabled={editable}
                  />
                  <span className="search-icon searchIcon">
                    <SearchOutlinedIcon className="font-size-16" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6">
            <div className="form-group">
              <label
                className="text-light-dark font-size-14 font-weight-500"
                for="exampleInputEmail1"
              >
                TEMPLATE DESCRIPTION
              </label>
              <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={options}
                    placeholder="TEMPLATE DESCRIPTION"
                    onChange={(e) =>
                      setAddPortFolioItem({
                        ...addPortFolioItem,
                        templateDescription: e,
                      })
                    }
                    value={addPortFolioItem.templateDescription}
                    isDisabled={editable}
                  />
                  <span className="search-icon searchIcon">
                    <SearchOutlinedIcon className="font-size-16" />
                  </span>
                </div>
              </div>
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

        <p className="mt-4">REPAIR OPTIONS</p>
        <div className="row">
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label
                className="text-light-dark font-size-14 font-weight-500"
                for="exampleInputEmail1"
              >
                REPAIR OPTION
              </label>
              <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={options}
                    placeholder="REPAIR OPTION"
                    onChange={(e) =>
                      setAddPortFolioItem({
                        ...addPortFolioItem,
                        repairOption: e,
                      })
                    }
                    value={addPortFolioItem.repairOption}
                    isDisabled={editable}
                  />
                  <span className="search-icon searchIcon">
                    <SearchOutlinedIcon className="font-size-16" />
                  </span>
                </div>
              </div>
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
      </div>

      {/* tabs view for addportfolio */}

      <div>
        <div>
          {props.compoFlag === "itemEdit" && (
            <span className="mr-3 cursor" onClick={() => setEditable(false)}>
              <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
              <span className="ml-2">Edit</span>
            </span>
          )}
        </div>
        <TabContext value={tabs}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#F8F8F8",
              borderRadius: "5px",
            }}
          >
            {/* <TabList
              className="custom-tabs-div"
              onChange={(e, newValue) => setTabs(newValue)}
              aria-label="lab API tabs example"
            >
              <FormatListBulletedOutlinedIcon className=" font-size-16" />
              <Tab label="Related part list(s)" value="1" />
              <Tab label="Item Summary(s)" value="1" />
              <AccessAlarmOutlinedIcon className=" font-size-16" />
              <Tab
                label="Related template(s)"
                value="2"
                disabled={addPortFolioItem.repairOption != "" && editable != true}
              />
              <SellOutlinedIcon className=" font-size-16" />
              <Tab label="Related repair option" value="3" />
              <Tab
                label="Related Kit"
                value="3"
                disabled={addPortFolioItem.templateId != "" && editable != true}
              />
            </TabList> */}

            <TabList className="custom-tabs-div"
              onChange={(e, newValue) => setTabs(newValue)}
              aria-label="lab API tabs example"
            >
              <Tab label="Item Summary(s)" value="itemSummary" />
              <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>

              <Tab
                label="Related template(s)"
                value="relatedTemplate"
                // disabled={addPortFolioItem.repairOption != "" && editable != true}
                disabled={addPortFolioItem.repairOption != "" && addPortFolioItem.repairOption != null}
              />
              <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>

              <Tab
                label="Related Kit"
                value="relatedKit"
                // disabled={addPortFolioItem.templateId != "" && editable != true} />
                disabled={addPortFolioItem.templateId != ""} />
            </TabList>
          </Box>
          <TabPanel value="itemSummary">
            {/* <p className="mt-4">SUMMARY</p> */}
            {props.compoFlag === "itemEdit" && editable == true ?
              <>
                <div className="row input-fields ">
                  {(props.compoFlagTest === "itemEditPort") ?
                    <>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">NAME</p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {(addPortFolioItem.name == "" ||
                              addPortFolioItem.name == null ||
                              addPortFolioItem.name == "string" ||
                              addPortFolioItem.name == undefined)
                              ? "NA" : addPortFolioItem.name
                            }
                          </h6>
                        </div>
                      </div>
                    </> : <></>}

                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.description == "" ||
                          addPortFolioItem.description == null ||
                          addPortFolioItem.description == undefined ||
                          addPortFolioItem.description == "string")
                          ? "NA" : addPortFolioItem.description}
                        {/* {addPortFolioItem.description} */}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="border border-radius-10 py-2 px-3">
                  <p className="mt-4">STRATEGY</p>
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">USAGE IN</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.usageIn == "" ||
                            addPortFolioItem.usageIn == null ||
                            addPortFolioItem.usageIn == undefined ||
                            addPortFolioItem.usageIn?.value == "" ||
                            addPortFolioItem.usageIn?.value == "string")
                            ? "NA" : addPortFolioItem.usageIn?.value}
                          {/* {addPortFolioItem.usageIn?.value} */}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">STRATEGY TASK</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.strategyTask == "" ||
                            addPortFolioItem.strategyTask == null ||
                            addPortFolioItem.strategyTask == undefined ||
                            addPortFolioItem.strategyTask?.value == "" ||
                            addPortFolioItem.strategyTask?.value == "string")
                            ? "NA" : addPortFolioItem.strategyTask?.value}
                          {/* {addPortFolioItem.strategyTask?.value} */}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">TASK TYPE</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.taskType == "" ||
                            addPortFolioItem.taskType == null ||
                            addPortFolioItem.taskType == undefined ||
                            addPortFolioItem.taskType?.value == "" ||
                            addPortFolioItem.taskType?.value == "string")
                            ? "NA" : addPortFolioItem.taskType?.value}
                          {/* {addPortFolioItem.taskType?.value} */}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-radius-10 mt-3 py-2 px-3">
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">YEAR</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.year.length == 0 ||
                            addPortFolioItem.year?.value == "" ||
                            addPortFolioItem.year?.value == null ||
                            addPortFolioItem.year?.value == undefined ||
                            addPortFolioItem.year?.value == "string")
                            ? "NA" : addPortFolioItem.year?.value}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">NO. OF YEARS</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.noOfYear == "" ||
                            addPortFolioItem.noOfYear == null ||
                            addPortFolioItem.noOfYear == undefined ||
                            addPortFolioItem.noOfYear == "string")
                            ? "NA" : addPortFolioItem.noOfYear}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <p className="font-size-14 text-black font-weight-500 mb-1">USAGE</p>
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">START USAGE</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.startUsage == "" ||
                            addPortFolioItem.startUsage == null ||
                            addPortFolioItem.startUsage == undefined ||
                            addPortFolioItem.startUsage == "string")
                            ? "NA" : addPortFolioItem.startUsage}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">END USAGE</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.endUsage == "" ||
                            addPortFolioItem.endUsage == null ||
                            addPortFolioItem.endUsage == undefined ||
                            addPortFolioItem.endUsage == "string")
                            ? "NA" : addPortFolioItem.endUsage}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">USAGE TYPE</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem?.usageType.length == 0 ||
                            addPortFolioItem?.usageType?.value == "" ||
                            addPortFolioItem?.usageType?.value == null ||
                            addPortFolioItem?.usageType?.value == undefined ||
                            addPortFolioItem?.usageType?.value == "string")
                            ? "NA" : addPortFolioItem?.usageType?.value}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="font-size-12 text-light-dark font-weight-500 mb-2">FREQUENCY</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.frequency == "" ||
                            addPortFolioItem.frequency == null ||
                            addPortFolioItem.frequency == undefined ||
                            addPortFolioItem.frequency?.value == "" ||
                            addPortFolioItem.frequency?.value == null ||
                            addPortFolioItem.frequency?.value == undefined ||
                            addPortFolioItem.frequency?.value == "string")
                            ? "NA" : addPortFolioItem.frequency?.value}
                          {/* {addPortFolioItem.frequency?.value} */}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">UNIT</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.unit == "" ||
                            addPortFolioItem.unit == null ||
                            addPortFolioItem.unit == undefined ||
                            addPortFolioItem.unit?.value == "" ||
                            addPortFolioItem.unit?.value == null ||
                            addPortFolioItem.unit?.value == undefined ||
                            addPortFolioItem.unit?.value == "string")
                            ? "NA" : addPortFolioItem.unit?.value}
                          {/* {addPortFolioItem.unit?.value} */}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">RECOMMENDED VALUE</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {addPortFolioItem.recommendedValue == "" ||
                            addPortFolioItem.recommendedValue == null ||
                            addPortFolioItem.recommendedValue == undefined ||
                            addPortFolioItem.recommendedValue == "string"
                            ? "NA" : addPortFolioItem.recommendedValue}
                          {/* {addPortFolioItem.recommendedValue} */}
                        </h6>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">NO. OF EVENTS</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.numberOfEvents == "" ||
                            addPortFolioItem.numberOfEvents == null ||
                            addPortFolioItem.numberOfEvents == undefined ||
                            addPortFolioItem.numberOfEvents == "string")
                            ? "NA" : addPortFolioItem.numberOfEvents}
                        </h6>
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <p className="text-light-dark font-size-12 font-weight-500 mb-2">QUANTITY</p>
                        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                          {(addPortFolioItem.quantity == "" ||
                            addPortFolioItem.quantity == null ||
                            addPortFolioItem.quantity == undefined ||
                            addPortFolioItem.quantity == "string")
                            ? "NA" : addPortFolioItem.quantity}
                        </h6>
                      </div>
                    </div> */}
                  </div>
                </div>
              </> :
              <>
                <div className="row mt-4 input-fields">
                  {/* <div className="col-md-6 col-sm-6">
                <div className="form-group w-100">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    ID
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10"
                    disabled
                    placeholder="(AUTO GENERATE)"
                    value={addPortFolioItem.id ? addPortFolioItem.id : ""}
                  />
                </div>
              </div> */}
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group w-100">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        NAME
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10"
                        placeholder="Required*"
                        onChange={(e) =>
                          setAddPortFolioItem({
                            ...addPortFolioItem,
                            name: e.target.value,
                          })
                        }
                        value={addPortFolioItem.name}
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group w-100">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        DESCRIPTION
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        placeholder="Optional"
                        onChange={(e) =>
                          setAddPortFolioItem({
                            ...addPortFolioItem,
                            description: e.target.value,
                          })
                        }
                        value={addPortFolioItem.description}
                      />
                      <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 checkbox-input">
                    <div class="form-group form-check">
                      <label class="form-check-label" for="exampleCheck1">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="exampleCheck1"
                          checked={noNeedBundleService}
                          onChange={(e) => BundleServiceItemsNeed(e)}
                        />I don’t need bundles / services</label>
                    </div>
                  </div>
                </div>

                <div className="border border-radius-10 mt-3 py-2 px-3">
                  <p className="mt-3">STRATEGY</p>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          USAGE IN
                        </label>
                        <Select
                          options={categoryList}
                          value={addPortFolioItem.usageIn}
                          className="text-primary"
                          onChange={(e) => HandleCatUsage(e)}
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
                          STRATEGY
                        </label>
                        <Select
                          options={updatedList}
                          // onChange={(e) =>
                          //   setAddPortFolioItem({
                          //     ...addPortFolioItem,
                          //     strategyTask: e,
                          //   })
                          // }
                          placeholder="Select(Required*)"
                          onChange={(e) => HandleStrategyUsage(e)}
                          value={addPortFolioItem.strategyTask}
                          className="text-primary"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          TASK TYPE
                        </label>
                        <Select
                          options={updatedTaskList}
                          onChange={(e) =>
                            setAddPortFolioItem({
                              ...addPortFolioItem,
                              taskType: e,
                            })
                          }
                          className="text-primary"
                          value={addPortFolioItem.taskType}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border border-radius-10 mt-3 py-2 px-3">
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          YEAR
                        </label>


                        <Select
                          // options={[
                          //   { value: "1", label: "1" },
                          //   { value: "2", label: "2" },
                          //   { value: "3", label: "3" },
                          // ]}
                          options={yearsOption}
                          placeholder="Select..."
                          className="text-primary"
                          onChange={(e) =>
                            setAddPortFolioItem({ ...addPortFolioItem, year: e })
                          }
                          value={addPortFolioItem.year}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          NO. OF YEARS
                        </label>
                        <input
                          type="number"
                          // type="text"
                          className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                          placeholder="No. of Years"
                          // defaultValue={props?.priceCalculator?.startUsage}
                          // value={priceCalculator.startUsage}
                          onChange={(e) =>
                            setAddPortFolioItem({
                              ...addPortFolioItem,
                              noOfYear: e.target.value,
                            })
                          }
                          value={addPortFolioItem.noOfYear}
                          name="noOfYear"
                        />
                        {/* <Select
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                          ]}
                          placeholder="Select..."
                          className="text-primary"
                          onChange={(e) =>
                            setAddPortFolioItem({ ...addPortFolioItem, noOfYear: e })
                          }
                          value={addPortFolioItem.noOfYear}
                        /> */}
                      </div>
                    </div>
                  </div>
                  <p className="font-size-14 text-black font-weight-500 mb-1">USAGE</p>
                  <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          START USAGE
                        </label>
                        <div
                          className=" d-flex form-control-date"
                          style={{ overflow: "hidden" }}
                        >
                          <input
                            type="number"
                            // type="text"
                            className="form-control border-none rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="10,000 hours"
                            // defaultValue={props?.priceCalculator?.startUsage}
                            // value={priceCalculator.startUsage}
                            onChange={(e) =>
                              setAddPortFolioItem({
                                ...addPortFolioItem,
                                startUsage: e.target.value,
                              })
                            }
                            value={addPortFolioItem.startUsage}
                            name="startUsage"
                          />
                          <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          END USAGE
                        </label>
                        <div
                          className=" d-flex form-control-date"
                          style={{ overflow: "hidden" }}
                        >
                          <input
                            type="number"
                            // type="text"
                            className="border-none form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="16,000 hours"
                            // defaultValue={props?.priceCalculator?.startUsage}
                            // value={priceCalculator.startUsage}
                            onChange={(e) =>
                              setAddPortFolioItem({
                                ...addPortFolioItem,
                                endUsage: e.target.value,
                              })
                            }
                            value={addPortFolioItem.endUsage}
                            name="endUsage"
                          />
                          <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          USAGE TYPE
                        </label>
                        <Select
                          options={usageTypeOption}
                          placeholder="Planned Usage"
                          className="text-primary"
                          onChange={(e) =>
                            setAddPortFolioItem({
                              ...addPortFolioItem,
                              usageType: e,
                            })
                          }
                          value={addPortFolioItem.usageType}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group">
                        <label
                          className="text-light-dark font-size-14 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          FREQUENCY
                        </label>
                        <Select
                          options={frequencyOptions}
                          placeholder="Optional"
                          onChange={(e) =>
                            setAddPortFolioItem({
                              ...addPortFolioItem,
                              frequency: e,
                            })
                          }
                          className="text-primary"
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
                          options={[
                            { value: "per Hr", label: "per Hr" },
                            { value: "per Km", label: "per Km" },
                            { value: "per Miles", label: "per Miles" },
                            { value: "per year", label: "per year" },
                            { value: "per month", label: "per month" },
                            { value: "per day", label: "per day" },
                            { value: "per quarter", label: "per quarter" },
                          ]}
                          placeholder="Select"
                          onChange={(e) =>
                            setAddPortFolioItem({ ...addPortFolioItem, unit: e })
                          }
                          className="text-primary"
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
                            className="border-none form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="Recommended Value"
                            // defaultValue={props?.priceCalculator?.startUsage}
                            // value={priceCalculator.startUsage}
                            onChange={(e) =>
                              setAddPortFolioItem({
                                ...addPortFolioItem,
                                recommendedValue: e.target.value,
                              })
                            }
                            value={addPortFolioItem.recommendedValue}
                            name="recommendedValue"
                          />
                          <span className="hours-div">
                            {addPortFolioItem.unit == ""
                              ? "select unit"
                              : addPortFolioItem.unit.label}
                          </span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-sm-6">
                    <div className="form-group w-100">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        QUANTITY
                      </label>
                      <input
                        type="text"
                        className="form-control border-radius-10 text-primary"
                        placeholder="QUANTITY"
                        onChange={(e) =>
                          setAddPortFolioItem({
                            ...addPortFolioItem,
                            quantity: e.target.value,
                          })
                        }
                        value={addPortFolioItem.quantity}
                      />
                    </div>
                  </div> */}
                    <div className="col-md-6 col-sm-6">
                      <div className="form-group w-100">
                        <label
                          className="text-light-dark font-size-12 font-weight-500"
                          for="exampleInputEmail1"
                        >
                          NO. OF EVENTS
                        </label>
                        <input
                          type="email"
                          className="form-control border-radius-10 text-primary"
                          placeholder="NO. OF EVENTS"
                          onChange={(e) =>
                            setAddPortFolioItem({
                              ...addPortFolioItem,
                              numberOfEvents: e.target.value,
                            })
                          }
                          value={addPortFolioItem.numberOfEvents}
                          disabled
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group mt-1">
                        <FormGroup>
                          <FormControlLabel
                            style={{
                              alignItems: "start",
                              marginLeft: 0,
                            }}
                            control={
                              <Switch
                                checked={extWorkData.flatRateIndicator}
                                onChange={(e) =>
                                  setExtWorkData({
                                    ...extWorkData,
                                    flatRateIndicator: e.target.checked,
                                    adjustedPrice: e.target.checked
                                      ? extWorkData.adjustedPrice
                                      : 0.0,
                                  })
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
                </div>
              </>}
          </TabPanel>
          <TabPanel value="relatedTemplate">
            {" "}
            <p className="mt-4">TEMPLATES</p>
            {props.compoFlag === "itemEdit" && editable == true ?
              <>
                <div className="row mt-4 ">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">TEMPLATE ID</p>
                      <h6 className="font-weight-500 text-primary font-size-17">
                        {(addPortFolioItem?.templateId == "" ||
                          addPortFolioItem?.templateId == null ||
                          addPortFolioItem?.templateId == undefined ||
                          addPortFolioItem?.templateId == "string")
                          ? "NA" : addPortFolioItem?.templateId}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">TEMPLATE DESCRIPTION</p>
                      <h6 className="font-weight-500 text-primary font-size-17">
                        {(addPortFolioItem?.templateId == "" ||
                          addPortFolioItem?.templateId == null ||
                          addPortFolioItem?.templateId == undefined ||
                          addPortFolioItem?.templateId == "string")
                          ? "NA" : addPortFolioItem?.templateDescription?.value}
                      </h6>
                    </div>
                  </div>
                </div>
              </> :
              <>
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label
                        className="text-light-dark font-size-14 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        TEMPLATE ID
                      </label>
                      {props.compoFlag === "itemEdit" ?
                        <>
                          <a
                            href={undefined}
                            className="input-search cursor text-primary"
                            onClick={() => makeKitEditable(addPortFolioItem.templateId)}
                          >
                            <svg style={{ width: "20px", fill: "#872ff7", paddingBottom: "5px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                              <g>
                                <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
                      c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
                      c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
                      c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
                      c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
                                <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
                      c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
                      c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
                      c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
                              </g>
                            </svg>
                            {/* <SearchIcon style={{ fontSize: "34px" }} /> */}
                          </a>
                        </> :
                        <>
                          <a
                            href={undefined}
                            className="input-search cursor text-primary"
                            onClick={() => setModelShowForTemplate(true)}
                          ><SearchIcon style={{ fontSize: "34px" }} /></a>
                        </>
                      }
                      <input
                        type="text"
                        className="form-control text-primary border-radius-10 position-relative"
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
                              onClick={(e) =>
                                handleSearchStandardJobListClick(e, currentItem)
                              }
                            >
                              {currentItem.standardJobId} {currentItem.description}
                            </li>
                          ))}
                        </ul>
                      }
                      {/* <Select
                    options={options}
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
                        className="text-light-dark font-size-14 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        TEMPLATE DESCRIPTION
                      </label>
                      <input
                        type="text"
                        className="form-control text-primary border-radius-10"
                        name="model"
                        placeholder="TEMPLATE DESCRIPTION"
                        value={addPortFolioItem.templateDescription?.value}
                        disabled
                        // onChange={handleAddServiceBundleChange}
                        onChange={(e) => handleStandardJobInputSearch(e)}
                      />
                      {/* <Select
                        options={options}
                        placeholder="TEMPLATE DESCRIPTION"
                        onChange={(e) =>
                          setAddPortFolioItem({
                            ...addPortFolioItem,
                            templateDescription: e,
                          })
                        }
                        className="text-primary"
                        value={addPortFolioItem.templateDescription}
                        isDisabled
                      /> */}
                      {/* <div className="icon-defold">
                    <div className="form-control">
                      <Select
                        options={options}
                        placeholder="TEMPLATE DESCRIPTION"
                        onChange={(e) =>
                          setAddPortFolioItem({
                            ...addPortFolioItem,
                            templateDescription: e,
                          })
                        }
                        value={addPortFolioItem.templateDescription}
                      />
                      <span className="search-icon searchIcon">
                        <SearchOutlinedIcon className="font-size-16" />
                      </span>
                    </div>
                  </div> */}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <div className="mt-4">
                        <a
                          href="#"
                          className="form-control Add-new-segment-div text-center border-radius-10 bg-light-dark font-size-16 text-violet mt-2"
                        >
                          <span className="mr-2">+</span>Go to Template
                          {/* <span className="mr-2">+</span>Add Template / Kit */}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {modelShowForTemplate ?
                  <>
                    <div className="maintableheader py-3 px-2 bg-primary mt-3 border-radius-10">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="customselect d-flex align-items-center border-white border-radius-10 d-flex ml-3">
                            {/* <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span> */}
                            <Select
                              onChange={handleTypeOfSearchChange}
                              isClearable={true}
                              className="p-2"
                              value={typeOfSearch}
                              options={columnSearchKeyValue}
                              placeholder="Add by"
                            />
                            {typeOfSearch != null ? (
                              <div className="customselect d-flex align-items-center border-radius-10 d-flex ml-3">
                                <span>
                                  <a href="#" className="btn-sm">
                                    +
                                  </a>
                                </span>
                                <Select
                                  onChange={handleTypeOfSearchColumnChange}
                                  isClearable={true}
                                  value={typeOfSearchColumn}
                                  options={typeOfSearchColumnKeyValue}
                                  placeholder="Select"
                                />
                                {typeOfSearchColumn != null ? (
                                  // <></>
                                  <input
                                    type="email"
                                    className="mr-2"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter text"
                                    style={{
                                      border: "none",
                                      background: "transparent",
                                      width: "95px",
                                      fontWeight: "600",
                                      paddingLeft: "10px",
                                    }}
                                    value={columnSearchText}
                                    onChange={(e) => setColumnSearchText(e.target.value)}
                                  ></input>
                                ) : (
                                  <></>
                                )}
                                <Link to="#" className="btn bg-primary text-white" onClick={handleLandingPageQuerySearchClick}>
                                  <SearchIcon /><span className="ml-1">Search</span>
                                </Link>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>

                        </div>
                        <div>
                        </div>
                      </div>
                      {columnSearchText.trim() != "" && typeOfSearchColumn != null ? (
                        <div className="tableheader">
                          <ul
                            className="submenu accordion mt-2"
                            style={{ display: "block" }}
                          >
                            <li>
                              <a className="result cursor">RESULTS</a>
                            </li>
                            <li>
                              <a
                                className="cursor"
                                onClick={handleBundleItemSaveAndContinue}
                              >
                                PM125
                              </a>
                            </li>
                            <li>
                              <a
                                className="cursor"
                                onClick={handleBundleItemSaveAndContinue}
                              >
                                PM2
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={handleCreateNewServiceBundle}
                                className="lastOption text-violet cursor"
                              >
                                <span className="mr-2">+</span>Create New{" "}
                                {typeOfSearch != null
                                  ? typeOfSearch.value == "bundle"
                                    ? "Bundle"
                                    : typeOfSearch.value == "service"
                                      ? "Service"
                                      : typeOfSearch.value == "portfolioItem"
                                        ? "Portfolio Item"
                                        : ""
                                  : ""}
                              </a>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </> : <></>}
              </>}
          </TabPanel>
          <TabPanel value="relatedKit">
            <p className="mt-4">RELATED KIT</p>
            {props.compoFlag === "itemEdit" && editable == true ?
              <>
                <div className="row mt-4 ">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">RELATED KIT</p>
                      {/* <h6 className="font-weight-500">CVA</h6> */}
                      <h6 className="font-weight-500 text-primary font-size-17">
                        {(addPortFolioItem?.repairOption == "" ||
                          addPortFolioItem?.repairOption == null ||
                          addPortFolioItem?.repairOption == undefined ||
                          addPortFolioItem?.repairOption == "string")
                          ? "NA" : addPortFolioItem?.repairOption}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">KIT DESCRIPTION</p>
                      <h6 className="font-weight-500 text-primary font-size-17">
                        {(addPortFolioItem?.repairOption == "" ||
                          addPortFolioItem?.repairOption == null ||
                          addPortFolioItem?.repairOption == undefined ||
                          addPortFolioItem?.repairOption == "string")
                          ? "NA" : addPortFolioItem?.kitDescription?.value}
                      </h6>
                      {/* <h6 className="font-weight-500">CVA</h6> */}
                    </div>
                  </div>
                </div>
              </> :
              <>
                <div className="row input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label
                        className="text-light-dark font-size-14 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        {/* REPAIR OPTION */}
                        RELATED KIT
                      </label>
                      {props.compoFlag === "itemEdit" ?
                        <>
                          <a
                            href={undefined}
                            className="input-search cursor text-primary"
                            onClick={() => makeTemplateEditable(addPortFolioItem.templateId)}
                          >
                            <svg style={{ width: "20px", fill: "#872ff7", paddingBottom: "5px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                              <g>
                                <path class="st0" d="M168.4,109.3c0-5.3-3.5-8.9-8.3-9c-5-0.1-8.5,3.7-8.5,9.5c0,19.7,0,39.3,0,59c0,5.5-1.9,7.4-7.4,7.4
                      c-38.2,0-76.3,0-114.5,0c-5.5,0-7.4-1.9-7.4-7.4c0-38.2,0-76.3,0-114.5c0-5.5,1.9-7.4,7.4-7.4c13,0,26,0,39,0c7,0,14.1,0,21.1,0
                      c3.5,0,6.1-1.7,7.6-4.8c1.5-3,1.1-5.9-0.9-8.6c-2-2.7-4.8-3.5-8-3.5c-21.4,0.1-42.9,0-64.3,0C12.2,30,5.4,36.8,5.4,48.7
                      c0,21,0,41.9,0,62.9c0,21.3,0,42.6,0,63.9c0,10.3,7.2,17.5,17.5,17.5c42.6,0,85.2,0,127.9,0c10.5,0,17.6-7.2,17.6-17.7
                      c0-10.3,0-20.6,0-30.9C168.4,132.7,168.5,121,168.4,109.3z"/>
                                <path class="st0" d="M193.7,13.9c0-5-2-6.9-7.1-6.9c-12.3,0-24.6,0-36.9,0c-5.7,0-9.5,3.5-9.4,8.6c0.1,4.9,3.9,8.2,9.4,8.3
                      c4.8,0,9.5,0,14.3,0c0.2,0.3,0.3,0.7,0.5,1c-0.8,0.6-1.6,1-2.3,1.7c-28.6,28.5-57.1,57.1-85.7,85.6c-5.2,5.2-6,10.1-2.2,14
                      c3.8,3.9,8.9,3.2,14-1.9c28.5-28.5,56.9-56.9,85.4-85.4c0.8-0.8,1.7-1.6,2.8-2.6c0.2,0.7,0.2,0.8,0.2,0.9c0,4.7,0,9.4,0.1,14
                      c0.1,5.5,3.5,9.2,8.4,9.2c4.9,0,8.4-3.8,8.4-9.2C193.8,38.7,193.8,26.3,193.7,13.9z"/>
                              </g>
                            </svg>
                            {/* <SearchIcon style={{ fontSize: "34px" }} /> */}
                          </a>
                        </> : <>
                          <a
                            href={undefined}
                            className="input-search cursor text-primary"
                            onClick={() => setModelShowForRelatedKit(true)}
                          ><SearchIcon style={{ fontSize: "34px" }} /></a>
                        </>}
                      <input
                        type="text"
                        className="form-control text-primary border-radius-10"
                        name="repairOption"
                        placeholder="RELATED KIT"
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
                              onClick={(e) =>
                                handleSearchRelatedKitListClick(e, currentItem)
                              }
                            >
                              {currentItem.kitId} {currentItem.description}
                            </li>
                          ))}
                        </ul>
                      }
                      {/* <Select
                    options={options}
                    placeholder="REPAIR OPTION"
                    onChange={(e) =>
                      setAddPortFolioItem({
                        ...addPortFolioItem,
                        repairOption: e,
                      })
                    }
                    value={addPortFolioItem.repairOption}
                    className="text-primary"
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
                        placeholder="KIT DESCRIPTION"
                        value={addPortFolioItem.kitDescription?.value}
                        onChange={(e) => handleRelatedKitInputSearch(e)}
                        disabled
                      />
                      {/* <Select
                        options={options}
                        placeholder="KIT DESCRIPTION"
                        onChange={(e) =>
                          setAddPortFolioItem({
                            ...addPortFolioItem,
                            kitDescription: e,
                          })
                        }
                        className="text-primary"
                        value={addPortFolioItem.kitDescription}
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
                          {/* <span className="mr-2">+</span>Add Repair Option */}
                          <span className="mr-2">+</span>Go to Related Kit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {modelShowForRelatedKit ?
                  <>
                    <div className="maintableheader py-3 px-2 bg-primary mt-3 border-radius-10">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="customselect d-flex align-items-center border-white border-radius-10 d-flex ml-3">
                            {/* <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span> */}
                            <Select
                              onChange={handleTypeOfSearchChange}
                              isClearable={true}
                              className="p-2"
                              value={typeOfSearch}
                              options={columnSearchKeyValue}
                              placeholder="Add by"
                            />
                            {typeOfSearch != null ? (
                              <div className="customselect d-flex align-items-center border-radius-10 d-flex ml-3">
                                <span>
                                  <a href="#" className="btn-sm">
                                    +
                                  </a>
                                </span>
                                <Select
                                  onChange={handleTypeOfSearchColumnChange}
                                  isClearable={true}
                                  value={typeOfSearchColumn}
                                  options={typeOfSearchColumnKeyValue}
                                  placeholder="Select"
                                />
                                {typeOfSearchColumn != null ? (
                                  // <></>
                                  <input
                                    type="email"
                                    className="mr-2"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter text"
                                    style={{
                                      border: "none",
                                      background: "transparent",
                                      width: "95px",
                                      fontWeight: "600",
                                      paddingLeft: "10px",
                                    }}
                                    value={columnSearchText}
                                    onChange={(e) => setColumnSearchText(e.target.value)}
                                  ></input>
                                ) : (
                                  <></>
                                )}
                                <Link to="#" className="btn bg-primary text-white" onClick={handleLandingPageQuerySearchClick}>
                                  <SearchIcon /><span className="ml-1">Search</span>
                                </Link>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>

                        </div>
                        <div>
                        </div>
                      </div>
                      {columnSearchText.trim() != "" && typeOfSearchColumn != null ? (
                        <div className="tableheader">
                          <ul
                            className="submenu accordion mt-2"
                            style={{ display: "block" }}
                          >
                            <li>
                              <a className="result cursor">RESULTS</a>
                            </li>
                            <li>
                              <a
                                className="cursor"
                                onClick={handleBundleItemSaveAndContinue}
                              >
                                PM125
                              </a>
                            </li>
                            <li>
                              <a
                                className="cursor"
                                onClick={handleBundleItemSaveAndContinue}
                              >
                                PM2
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={handleCreateNewServiceBundle}
                                className="lastOption text-violet cursor"
                              >
                                <span className="mr-2">+</span>Create New{" "}
                                {typeOfSearch != null
                                  ? typeOfSearch.value == "bundle"
                                    ? "Bundle"
                                    : typeOfSearch.value == "service"
                                      ? "Service"
                                      : typeOfSearch.value == "portfolioItem"
                                        ? "Portfolio Item"
                                        : ""
                                  : ""}
                              </a>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </> : <></>}
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
              </>}
          </TabPanel>
        </TabContext>
        {(tabs == "itemSummary") ||
          (tabs == "relatedTemplate") ? (
          <div className="pull-right mt-3">
            <Link
              to={undefined}
              className="btn cursor bg-primary text-white border mr-4"
              onClick={handleSummaryAndTemplateTabs}
            >
              Save & Next
            </Link>
          </div>
        ) : ("")}
        {tabs < 3 && (
          <div className="pull-right mt-3">
            <Link
              to="#"
              className="btn bg-primary text-white border mr-4"
              // onClick={() => {
              //   tabs < 3 && setTabs((prev) => `${parseInt(prev) + 1}`);
              // }}
              onClick={handleSummaryAndTemplateTabs}
            >
              Save & Next
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AddCustomPortfolioItem;

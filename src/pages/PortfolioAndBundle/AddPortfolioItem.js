import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from "react-router-dom";
import { useCallback } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import {
  createPortfolio,
  getPortfolio,
  getPortfolioSchema,
  getMakeKeyValue,
  getModelKeyValue,
  getPrefixKeyValue,
  updatePortfolio,
  getResponseTimeTaskKeyValue,
  getValidityKeyValue,
  getStrategyTaskKeyValue,
  getProductHierarchyKeyValue,
  getGergraphicKeyValue,
  getPortfolioCommonConfig,
  getSearchQueryCoverage,
  getSearchCoverageForFamily,
  getSearchForPortfolio,
  getSearchForRecentPortfolio,
  getSearchForRecentBundleService,
  itemCreation,
  updateItemData,
  portfolioSearch,
  itemSearch,
  portfolioItemPriceSjid,
} from "../../services/index";
import $ from "jquery";
import {
  Modal,
  SplitButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';

import { PortfolioContext } from "./ProtfolioContext";
import { useAppSelector } from "../../app/hooks";
import {
  getUsageCategoryKeyValue,
  getTaskTypeKeyValue,
  getMachineTypeKeyValue,
  getTypeKeyValue,
  getSearchStandardJobId,
  getSearchKitId,
  createItemPriceData,
  getItemPriceData,
} from "../../services/index";
import {
  selectUpdateTaskList,
  selectStrategyTaskOption,
  selectCategoryList,
  selectUpdateList,
  taskActions,
} from "./customerSegment/strategySlice"


const AddPortfolioItem = (props) => {
  const [tabs, setTabs] = useState("1");
  const [subTabs, setSubTabs] = useState("A");
  const [editable, setEditable] = useState(
    props?.compoFlag === "itemEdit" ? true : false
  );
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
  const [categoryUsageKeyValue1, setCategoryUsageKeyValue1] = useState([]);
  const [stratgyTaskTypeKeyValue, setStratgyTaskTypeKeyValue] = useState([]);
  const [stratgyTaskUsageKeyValue, setStratgyTaskUsageKeyValue] = useState([]);

  const [typeKeyValue, setTypeKeyValue] = useState([]);
  const [machineTypeKeyValue, setMachineTypeKeyValue] = useState([]);
  const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState(
    []
  );
  const [modelShowForTemplate, setModelShowForTemplate] = useState(false);
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
  const [count, setCount] = useState(1);
  const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([]);
  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    setMasterData([]);
    setFilterMasterData([]);
    setSelectedMasterData([]);
  };
  const addSearchQuerryHtml = () => {
    // New Updated 24 Nov 2022
    if (count !== 2) {
      setQuerySearchSelector([
        ...querySearchSelector,
        {
          id: count,
          selectOperator: "",
          selectFamily: "",
          inputSearch: "",
          selectOptions: [],
          selectedOption: "",
        },
      ]);
      setCount(count + 1);
    }

    // Old Before 24 Nov 2022
    // setQuerySearchSelector([
    //   ...querySearchSelector,
    //   {
    //     id: count,
    //     selectOperator: "",
    //     selectFamily: "",
    //     inputSearch: "",
    //     selectOptions: [],
    //     selectedOption: "",
    //   },
    // ]);
    // setCount(count + 1);
  };
  const [selectedItemType, setSelectedItemType] = useState("");
  const [portfolioItemData, setPortfolioItemData] = useState([]);
  const [bundleServiceItemData, setBundleServiceItemData] = useState([]);
  const [filterMasterData, setFilterMasterData] = useState([]);
  const [selectedMasterData, setSelectedMasterData] = useState([]);
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
  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    // obj.inputSearch = e.target.value;
    if (selectedItemType === "PORTFOLIO") {
      var newArr = [];
      var SearchResArr = [];
      portfolioSearch(`${tempArray[id].selectFamily.value}~${e.target.value}`)
        .then((res) => {
          if (tempArray[id].selectFamily.value === "make") {
            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < res[i].coverages.length; j++) {
                SearchResArr.push(res[i].coverages[j].make)
              }
            }

          } else if (tempArray[id].selectFamily.value == "family") {
            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < res[i].coverages.length; j++) {
                SearchResArr.push(res[i].coverages[j].family)
              }
            }
          } else if (tempArray[id].selectFamily.value == "modelNo") {
            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < res[i].coverages.length; j++) {
                SearchResArr.push(res[i].coverages[j].modelNo)
              }
            }
          } else if (tempArray[id].selectFamily.value == "serialNumberPrefix") {
            for (let i = 0; i < res.length; i++) {
              for (let j = 0; j < res[i].coverages.length; j++) {
                SearchResArr.push(res[i].coverages[j].serialNumberPrefix)
              }
            }
          } else if (tempArray[id].selectFamily.value == "name") {
            for (let i = 0; i < res.length; i++) {
              SearchResArr.push(res[i].name)
            }
          } else if (tempArray[id].selectFamily.value == "description") {
            for (let i = 0; i < res.length; i++) {
              SearchResArr.push(res[i].description)
            }
          }
          obj.selectOptions = SearchResArr;
          tempArray[id] = obj;
          setQuerySearchSelector([...tempArray]);
          $(`.scrollbar-${id}`).css("display", "block");
        })
        .catch((err) => {
          console.log("err in api call", err);
        });
    } else {
      var bundleServiceSearch;
      var SearchResArr = [];
      if (selectedItemType === "BUNDLE_ITEM") {
        bundleServiceSearch = "bundleFlag:BUNDLE_ITEM AND " + `${tempArray[id].selectFamily.value}~${e.target.value}`;
      } else if (selectedItemType === "SERVICE") {
        bundleServiceSearch = "bundleFlag:SERVICE AND " + `${tempArray[id].selectFamily.value}~${e.target.value}`;
      }
      itemSearch(bundleServiceSearch)
        .then((res) => {
          if (res.length > 0) {
            if (tempArray[id].selectFamily.value == "itemName") {
              for (let i = 0; i < res.length; i++) {
                SearchResArr.push(res[i].itemName)
              }
            } else if (tempArray[id].selectFamily.value == "itemHeaderDescription") {
              for (let i = 0; i < res.length; i++) {
                SearchResArr.push(res[i].itemHeaderModel.itemHeaderDescription)
              }
            } else if (tempArray[id].selectFamily.value == "make") {
              for (let i = 0; i < res.length; i++) {
                SearchResArr.push(res[i].itemHeaderModel.itemHeaderMake)
              }
            } else if (tempArray[id].selectFamily.value == "model") {
              for (let i = 0; i < res.length; i++) {
                SearchResArr.push(res[i].itemHeaderModel.model)
              }
            } else if (tempArray[id].selectFamily.value == "family") {
              for (let i = 0; i < res.length; i++) {
                SearchResArr.push(res[i].itemHeaderModel.itemHeaderFamily)
              }
            } else if (tempArray[id].selectFamily.value == "prefix") {
              for (let i = 0; i < res.length; i++) {
                SearchResArr.push(res[i].itemHeaderModel.prefix)
              }
            }
          }
          obj.selectOptions = SearchResArr;
          tempArray[id] = obj;
          setQuerySearchSelector([...tempArray]);
          $(`.scrollbar-${id}`).css("display", "block");
        })
        .catch((err) => {
          alert(err)
          console.log("err in api call", err);
          return
        });
    }
    obj.inputSearch = e.target.value;
    setQuerySearchSelector([...tempArray]);
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    console.log("handleFamily e:", tempArray[id]);
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const [familySelectOption, setFamilySelectOption] = useState([]);
  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleItemType = useCallback(
    (e, i) => {
      // console.log("event is : ", e.value)
      // console.log("id is : ", id)
      setBundleServiceItemData([]);
      setPortfolioItemData([]);
      setSelectedItemType(e.value);

      let tempArray = [...querySearchSelector];
      // console.log("tempArray : ", tempArray)
      // let obj = tempArray[i];
      // // obj.selectFamily = "";
      // // tempArray[id] = obj;
      setQuerySearchSelector([{
        id: 0,
        selectFamily: "",
        selectOperator: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      }]);

      if (e.value === "PORTFOLIO") {
        setFamilySelectOption([
          { label: "Make", value: "make", id: i },
          { label: "Family", value: "family", id: i },
          { label: "Model", value: "modelNo", id: i },
          { label: "Prefix", value: "serialNumberPrefix", id: i },
          { label: "Name", value: "name", id: i },
          { label: "Description", value: "description", id: i },
        ])
      } else if (e.value === "BUNDLE_ITEM") {
        setFamilySelectOption([{ label: "Make", value: "itemHeaderMake", id: i },
        { label: "Family", value: "itemHeaderFamily", id: i },
        { label: "Model", value: "model", id: i },
        { label: "Prefix", value: "prefix", id: i },
        { label: "Name", value: "itemName", id: i },
        { label: "Description", value: "itemHeaderDescription", id: i },])
      } else if (e.value === "SERVICE") {
        setFamilySelectOption([{ label: "Make", value: "itemHeaderMake", id: i },
        { label: "Family", value: "itemHeaderFamily", id: i },
        { label: "Model", value: "model", id: i },
        { label: "Prefix", value: "prefix", id: i },
        { label: "Name", value: "itemName", id: i },
        { label: "Description", value: "itemHeaderDescription", id: i },])
      }
    },
    [],
  );
  const handleQuerySearchClick = () => {
    $(".scrollbar").css("display", "none");
    console.log("handleQuerySearchClick", querySearchSelector);
    var searchStr =
      querySearchSelector[0].selectFamily.value +
      "~" +
      querySearchSelector[0].inputSearch;

    for (let i = 1; i < querySearchSelector.length; i++) {
      searchStr =
        searchStr +
        " " +
        querySearchSelector[i].selectOperator.value +
        " " +
        querySearchSelector[i].selectFamily.value +
        "~" +
        querySearchSelector[i].inputSearch;
    }

    console.log("searchStr", searchStr);
    getSearchQueryCoverage(searchStr)
      .then((res) => {
        console.log("search Query Result :", res);
        setMasterData(res);
      })
      .catch((err) => {
        console.log("error in getSearchQueryCoverage", err);
      });
  };
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
  const [masterData, setMasterData] = useState([]);
  const [querySearchStandardJobResult, setQuerySearchStandardJobResult] = useState([]);
  const [querySearchRelatedKitResult, setQuerySearchRelatedKitResult] = useState([]);
  // const [querySearchStandardJobDescriptionResult, setQuerySearchStandardJobDescriptionResult] = useState()
  // const {stratgyTaskTypeKeyValue,categoryUsageKeyValue1} = useContext(PortfolioContext);
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
    kitDescription: "",
    strategyTask: "",
    year: "",
    noOfYear: "",
    headerdescription: "",
    preparedBy: "",
    approvedBy: "",
    preparedOn: new Date(),
    revisedBy: "",
    revisedOn: new Date(),
    branch: "",
    offerValidity: "",
  });

  const [bundleFlagType, setBundleFlagType] = useState("");

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

  const initFetch = () => {

    getTaskTypeKeyValue()
      .then((res) => {
        const options = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
        setBundleItemTaskTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getUsageCategoryKeyValue()
      .then((res) => {
        const options = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
        setCategoryUsageKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getTypeKeyValue()
      .then((res) => {
        const options = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
        setTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });

    getMachineTypeKeyValue()
      .then((res) => {
        const options = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
        setMachineTypeKeyValue(options);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.passItemEditRowData) {
      console.log("props.passItemEditRowData : ", props.passItemEditRowData)
      // setIt accordingly for fields
      const {
        itemName,
        itemBodyDescription,
        startUsage,
        endusage,
        frequency,
        usageIn,
        taskType,
        unit,
        recommendedValue,
        quantity,
        numberOfEvents,
        templateDescription,
        repairOption,
      } = props.passItemEditRowData.itemBodyModel;
      setAddportFolioItem({
        ...addPortFolioItem,
        id: props.passItemEditRowData.itemId,
        name: props.passItemEditRowData.itemName,
        description: itemBodyDescription,
        usageIn: { label: usageIn, value: usageIn },
        taskType: { label: taskType[0], value: taskType[0] },
        frequency: { label: frequency, value: frequency },
        unit: { label: unit, value: unit },
        recommendedValue: recommendedValue,
        quantity,
        numberOfEvents: numberOfEvents,
        // templateDescription: {
        //   label: itemBodyDescription,
        //   value: itemBodyDescription,
        // },
        strategyTask: { label: props.passItemEditRowData.itemHeaderModel.itemHeaderStrategy, value: props.passItemEditRowData.itemHeaderModel.itemHeaderStrategy },
        // repairOption: { label: repairOption, value: repairOption },
        repairOption: repairOption,
      });

      setBundleFlagType(props.passItemEditRowData.itemHeaderModel.bundleFlag)

      if ((props.passItemEditRowData.itemBodyModel.itemPrices != null)) {
        if (props.passItemEditRowData.itemBodyModel.itemPrices.length > 0) {
          ItemPriceDataFetchById();
        }
      }
      // if (props.passItemEditRowData.itemBodyModel.itemPrices.length > 0) {
      //   ItemPriceDataFetchById();
      // }

    }
  }, []);

  const ItemPriceDataFetchById = async () => {

    // console.log("props.passItemEditRowData : ", props.passItemEditRowData)
    const priceId = props.passItemEditRowData.itemBodyModel.itemPrices[0].itemPriceDataId;

    const priceDataId = props.passItemEditRowData.itemBodyModel.itemPrices[0].itemPriceDataId;

    const res = await getItemPriceData(priceDataId)
    setEditAbleItemPrice(res.data)
    const {
      itemName,
      itemBodyDescription,
      startUsage,
      endusage,
      frequency,
      usageIn,
      taskType,
      unit,
      recommendedValue,
      quantity,
      numberOfEvents,
      templateDescription,
      // repairOption,
    } = props.passItemEditRowData.itemBodyModel;
    setAddportFolioItem({
      ...addPortFolioItem,
      id: props.passItemEditRowData.itemId,
      name: props.passItemEditRowData.itemName,
      description: itemBodyDescription,
      usageIn: { label: usageIn, value: usageIn },
      taskType: { label: taskType[0], value: taskType[0] },
      frequency: { label: frequency, value: frequency },
      unit: { label: unit, value: unit },
      recommendedValue: recommendedValue,
      quantity: res.data.quantity,
      numberOfEvents: res.data.numberOfEvents,
      strategyTask: { label: props.passItemEditRowData.itemHeaderModel.itemHeaderStrategy, value: props.passItemEditRowData.itemHeaderModel.itemHeaderStrategy },
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

    });


    console.log("price Result fetch Data : ", res);
  }

  useEffect(() => {
    // const portfolioId1=location.state
    // const portfolioId = 362;
    // getPortfolioDetails(portfolioId);
    initFetch();
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

  const categoryList = useAppSelector(selectStrategyTaskOption(selectCategoryList));
  const updatedList = useAppSelector(
    selectStrategyTaskOption(selectUpdateList)
  );
  const updatedTaskList = useAppSelector(selectStrategyTaskOption(selectUpdateTaskList));

  const HandleCatUsage = (e) => {
    setStratgyTaskUsageKeyValue([]);
    setStratgyTaskTypeKeyValue([]);
    addPortFolioItem.strategyTask = "";
    addPortFolioItem.taskType = "";
    // setCategoryUsageKeyValue1(e);
    setAddportFolioItem({ ...addPortFolioItem, usageIn: e })
    dispatch(taskActions.updateList(e.value));
  };

  const HandleStrategyUsage = (e) => {
    setStratgyTaskTypeKeyValue([]);
    addPortFolioItem.taskType = "";
    // setStratgyTaskUsageKeyValue(e);
    setAddportFolioItem({ ...addPortFolioItem, strategyTask: e })
    dispatch(taskActions.updateTask(e.value));
  };

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
  // console.log("categoryList --- ", categoryList)

  const TabsEnableDisabledFun = async () => {
    // console.log("Hello");
    // console.log("tabs : ", tabs)
    // console.log("props.compoFlag : ", props.compoFlag);
    // console.log("addPortFolioItem.templateId : ", addPortFolioItem.templateId === "");

    if (tabs == 1) {
      if ((props.compoFlag === "ITEM") &&
        (addPortFolioItem.name == "" ||
          addPortFolioItem.headerdescription == "" ||
          addPortFolioItem.usageIn == "" ||
          addPortFolioItem.taskType == "" ||
          addPortFolioItem.quantity == "")) {
        toast("😐" + "Please fill mandatory fields", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if ((props.compoFlag === "BUNDLE") &&
        (addPortFolioItem.usageIn == "" ||
          addPortFolioItem.taskType == "" ||
          addPortFolioItem.quantity == "")) {
        toast("😐" + "Please fill mandatory fields", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      } else {
        if (props.compoFlag == "itemEdit") {
          setTabs((prev) => `${parseInt(prev) + 1}`)
        } else {
          setTabs((prev) => `${parseInt(prev) + 1}`)
          setAddportFolioItem({ ...addPortFolioItem, templateId: "", repairOption: "" });
        }
      }
    } else if (tabs == 2 && addPortFolioItem.templateId == "") {
      // if(&& props.compoFlag === "ITEM")
      setTabs((prev) => `${parseInt(prev) + 1}`)
    } else if (tabs == 2 && addPortFolioItem.templateId !== "") {
      if (props.compoFlag === "ITEM") {
        // const rObj = {
        //   itemPriceDataId: 0,
        //   quantity: addPortFolioItem.quantity,
        //   startUsage: "",
        //   endUsage: "",
        //   standardJobId: addPortFolioItem.templateId,
        //   repairKitId: "",
        //   templateDescription: addPortFolioItem.templateDescription?.value,
        //   repairOption: "",
        //   additional: "",
        //   partListId: "",
        //   serviceEstimateId: "",
        //   numberOfEvents: 0,
        //   priceMethod: "LIST_PRICE",
        //   priceType: "FIXED",
        //   listPrice: 0,
        //   priceEscalation: "",
        //   calculatedPrice: 0,
        //   flatPrice: 0,
        //   discountType: "",
        //   year: "",
        //   noOfYear: 0,
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
        //   tenantId: 0,
        //   createdAt: "2022-12-09T13:52:27.880Z",
        //   partsRequired: true,
        //   serviceRequired: true,
        //   labourRequired: true,
        //   miscRequired: true
        // }
        // const itemPriceData = await createItemPriceData(rObj)
        props.setTabs("2");
        props.getAddportfolioItemDataFun(addPortFolioItem);
        // if (props.compoFlag === "itemEdit") {
        //   props.handleItemEditSave(addPortFolioItem, itemPriceData.data);
        // } else {
        // }
      } else if (props.compoFlag === "BUNDLE") {
        const rObj = {
          itemPriceDataId: 0,
          quantity: addPortFolioItem.quantity,
          startUsage: "",
          endUsage: "",
          standardJobId: addPortFolioItem.templateId,
          repairKitId: "",
          templateDescription: addPortFolioItem.templateDescription?.value,
          repairOption: "",
          additional: "",
          partListId: "",
          serviceEstimateId: "",
          numberOfEvents: addPortFolioItem?.numberOfEvents,
          priceMethod: "LIST_PRICE",
          priceType: "FIXED",
          listPrice: 0,
          priceEscalation: "",
          calculatedPrice: 0,
          flatPrice: 0,
          discountType: "",
          year: "",
          noOfYear: 0,
          sparePartsPrice: 0,
          sparePartsPriceBreakDownPercentage: 0,
          servicePrice: 0,
          labourPrice: 0,
          labourPriceBreakDownPercentage: 0,
          miscPrice: 0,
          miscPriceBreakDownPercentage: 0,
          totalPrice: 0,
          netService: 0,
          portfolio: {
            portfolioId: 1
          },
          tenantId: 0,
          createdAt: "2022-12-09T13:52:27.880Z",
          partsRequired: true,
          serviceRequired: false,
          labourRequired: true,
          miscRequired: true
        }
        console.log("props.compoFlag Test :", rObj)
        console.log("addPortFolioItem Test :", addPortFolioItem)
        const itemPriceData = await createItemPriceData(rObj)
        // props.setBundleTabs("3");
        props.getAddportfolioItemData(addPortFolioItem, itemPriceData.data);
      } else {
        if (props.compoFlag === "itemEdit" && props.compoFlagTest === "itemEditPort") {
          props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
        } else if (props.compoFlag === "itemEdit" && props.compoFlagTest === "itemEditBundle") {
          props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
        } else {
          const rObj = {
            itemPriceDataId: 0,
            quantity: addPortFolioItem.quantity,
            startUsage: "",
            endUsage: "",
            standardJobId: addPortFolioItem.templateId,
            repairKitId: "",
            templateDescription: addPortFolioItem.templateDescription?.value,
            repairOption: "",
            additional: "",
            partListId: "",
            serviceEstimateId: "",
            numberOfEvents: 0,
            priceMethod: "LIST_PRICE",
            priceType: "FIXED",
            listPrice: 0,
            priceEscalation: "",
            calculatedPrice: 0,
            flatPrice: 0,
            discountType: "",
            year: "",
            noOfYear: 0,
            sparePartsPrice: 0,
            sparePartsPriceBreakDownPercentage: 0,
            servicePrice: 0,
            labourPrice: 0,
            labourPriceBreakDownPercentage: 0,
            miscPrice: 0,
            miscPriceBreakDownPercentage: 0,
            totalPrice: 0,
            netService: 0,
            portfolio: {
              portfolioId: 1
            },
            tenantId: 0,
            createdAt: "2022-12-09T13:52:27.880Z",
            partsRequired: true,
            serviceRequired: false,
            labourRequired: true,
            miscRequired: true
          }
          const itemPriceData = await createItemPriceData(rObj);
          props.getAddportfolioItemData(addPortFolioItem, itemPriceData.data)
        }

        // props.setBundleTabs("3");
      }
    }

    // tabs < 3 && setTabs((prev) => `${parseInt(prev) + 1}`);
  }

  const handleAddPortfolioSave = async () => {
    // if (props.compoFlag === "itemEdit") {
    //   props.handleItemEditSave(addPortFolioItem);
    //   // props.setTabs("2");
    // } else 
    if (props.compoFlag === "ITEM") {
      props.setTabs("2");
      props.getAddportfolioItemDataFun(addPortFolioItem);
    } else {
      if (props.compoFlag === "itemEdit" && props.compoFlagTest === "itemEditPort") {
        props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
      } else if (props.compoFlag === "itemEdit" && props.compoFlagTest === "itemEditBundle") {
        props.handleItemEditSave(addPortFolioItem, editAbleItemPrice, bundleFlagType);
      } else {

        if (addPortFolioItem.repairOption == "") {
          toast("😐" + "Please fill related Kit field", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {

          const rObj = {
            itemPriceDataId: 0,
            quantity: addPortFolioItem.quantity,
            startUsage: "",
            endUsage: "",
            standardJobId: addPortFolioItem.templateId,
            repairKitId: addPortFolioItem.repairOption,
            templateDescription: addPortFolioItem.templateDescription,
            repairOption: "",
            additional: "",
            partListId: "",
            serviceEstimateId: "",
            numberOfEvents: 0,
            priceMethod: "LIST_PRICE",
            priceType: "FIXED",
            listPrice: 0,
            priceEscalation: "",
            calculatedPrice: 0,
            flatPrice: 0,
            discountType: "",
            year: "",
            noOfYear: 0,
            sparePartsPrice: 0,
            sparePartsPriceBreakDownPercentage: 0,
            servicePrice: 0,
            labourPrice: 0,
            labourPriceBreakDownPercentage: 0,
            miscPrice: 0,
            miscPriceBreakDownPercentage: 0,
            totalPrice: 0,
            netService: 0,
            portfolio: {
              portfolioId: 1
            },
            tenantId: 0,
            createdAt: "2022-12-09T13:52:27.880Z",
            partsRequired: true,
            serviceRequired: false,
            labourRequired: true,
            miscRequired: true
          }

          const itemPriceData = await createItemPriceData(rObj)
          props.getAddportfolioItemData(addPortFolioItem, itemPriceData.data)

          // props.getAddportfolioItemData(addPortFolioItem)
          props.setBundleTabs("3");
        }
      }
      // alert("hello");


    }
  };
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

          <span className="mr-3 cursor" onClick={() => setSubTabs("A")}>
            <FormatListBulletedOutlinedIcon className=" font-size-16" />
            {/* <span className="ml-2">Related part list(s)</span> */}
            <span className="ml-2">Item Summary(s)</span>
          </span>
          <span className="mr-3 cursor" onClick={() => setSubTabs("B")}>
            <AccessAlarmOutlinedIcon className=" font-size-16" />
            <span className="ml-2">Related template(s)</span>
          </span>
          <span className="cursor" onClick={() => setSubTabs("C")}>
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
                onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, description: e.target.value, })}
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
                onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, usageIn: e })}
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
              <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={updatedTaskList}
                    // options={props.updatedTaskList}
                    value={addPortFolioItem.taskType}
                    onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, taskType: e, })}
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
                FREQUENCY
              </label>
              <Select
                options={frequencyOptions}
                placeholder="FREQUENCY"
                onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, frequency: e, })}
                value={addPortFolioItem.frequency}
                isDisabled={editable}
              />
              {/* <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={frequencyOptions}
                    placeholder="FREQUENCY"
                    onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, frequency: e, })}
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
                placeholder="HOURS"
                onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, unit: e })}
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
                type="number"
                placeholder="Recommended Value"
                className="form-control border-radius-10"
                // options={options}

                onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, recommendedValue: e.target.value, })}
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
                onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, quantity: e.target.value, })}
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
                  setAddportFolioItem({
                    ...addPortFolioItem,
                    numberOfEvents: e.target.value,
                  })
                }
                value={addPortFolioItem.numberOfEvents}
                disabled={editable}
              />
            </div>
          </div>
        </div>
        {/* <p className="mt-4">TEMPLATES</p>
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
                          setAddportFolioItem({
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
                          setAddportFolioItem({
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
            </div> */}

        {/* <p className="mt-4">REPAIR OPTIONS</p>
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
                          setAddportFolioItem({
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
            </div> */}
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

      <div className="d-none">
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
              <input
                type="text"
                className="form-control text-primary border-radius-10"
                name="model"
                placeholder="TEMPLATE ID"
                value={addPortFolioItem.templateId}
                // onChange={handleAddServiceBundleChange}
                onChange={(e) => handleStandardJobInputSearch(e)}
              />
              {/* <Select
                options={options}
                placeholder="TEMPLATE ID"
                onChange={(e) =>
                  setAddportFolioItem({
                    ...addPortFolioItem,
                    templateId: e,
                  })
                }
                value={addPortFolioItem.templateId}
                isDisabled={editable}
              /> */}
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
              {/* <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={options}
                    placeholder="TEMPLATE ID"
                    onChange={(e) =>
                      setAddportFolioItem({
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
              </div> */}
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
              <Select
                options={options}
                placeholder="TEMPLATE DESCRIPTION"
                onChange={(e) =>
                  setAddportFolioItem({
                    ...addPortFolioItem,
                    templateDescription: e,
                  })
                }
                value={addPortFolioItem.templateDescription}
                isDisabled={editable}
              />
              {/* <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={options}
                    placeholder="TEMPLATE DESCRIPTION"
                    onChange={(e) =>
                      setAddportFolioItem({
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
                  <span className="mr-2">+</span>Add Template / Kit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-none">
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
              <Select
                options={options}
                placeholder="REPAIR OPTION"
                onChange={(e) =>
                  setAddportFolioItem({
                    ...addPortFolioItem,
                    repairOption: e,
                  })
                }
                value={addPortFolioItem.repairOption}
                isDisabled={editable}
              />
              {/* <div className="icon-defold">
                <div className="form-control">
                  <Select
                    options={options}
                    placeholder="REPAIR OPTION"
                    onChange={(e) =>
                      setAddportFolioItem({
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
              </div> */}
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
      </div>

      {/* tabs view for addportfolio */}

      <div>

        {/* <div className="ligt-greey-bg p-3">
          
        </div> */}
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
            <TabList className="custom-tabs-div"
              onChange={(e, newValue) => setTabs(newValue)}
              aria-label="lab API tabs example"
            >
              {/* <FormatListBulletedOutlinedIcon className=" font-size-16" /> */}
              {/* <Tab label="Related part list(s)" value="1" /> */}
              <Tab label="Item Summary(s)" value="1" />
              <div className="align-items-center d-flex justidy-content-center"><ArrowForwardIosIcon /></div>
              {/* <AccessAlarmOutlinedIcon className=" font-size-16" /> */}
              <Tab label="Related template(s)" value="2" disabled={addPortFolioItem.repairOption != "" && editable != true} />
              <div className="align-items-center d-flex justidy-content-center"><ArrowForwardIosIcon /></div>
              {/* <SellOutlinedIcon className=" font-size-16" /> */}
              {/* <Tab label="Related repair option" value="3" /> */}
              <Tab label="Related Kit" value="3" disabled={addPortFolioItem.templateId != "" && editable != true} />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* <p className="mt-4">SUMMARY</p> */}
            {props.compoFlag === "itemEdit" && editable == true ?
              <>
                <div className="row mt-4 ">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">NAME</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.name == "" ||
                          addPortFolioItem.name == null ||
                          addPortFolioItem.name == undefined ||
                          addPortFolioItem.name == "string")
                          ? "NA" : addPortFolioItem.name}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.description == "" ||
                          addPortFolioItem.description == null ||
                          addPortFolioItem.description == undefined ||
                          addPortFolioItem.description == "string") ?
                          "NA" : addPortFolioItem.description}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">USAGE IN</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.usageIn.length == 0 ||
                          addPortFolioItem.usageIn?.value == "" ||
                          addPortFolioItem.usageIn?.value == null ||
                          addPortFolioItem.usageIn?.value == undefined ||
                          addPortFolioItem.usageIn?.value == "string")
                          ? "NA" : addPortFolioItem.usageIn?.value}
                      </h6>
                    </div>
                  </div>
                </div>
                <p className="">STRATEGY</p>
                <div className="row mt-2 ">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">STRATEGY TASK</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.strategyTask.length == 0 ||
                          addPortFolioItem.strategyTask?.value == "" ||
                          addPortFolioItem.strategyTask?.value == null ||
                          addPortFolioItem.strategyTask?.value == undefined ||
                          addPortFolioItem.strategyTask?.value == "string")
                          ? "NA" : addPortFolioItem.strategyTask?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">TASK TYPE</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.taskType.length == 0 ||
                          addPortFolioItem.taskType?.value == "" ||
                          addPortFolioItem.taskType?.value == null ||
                          addPortFolioItem.taskType?.value == undefined ||
                          addPortFolioItem.taskType?.value == "string")
                          ? "" : addPortFolioItem.taskType?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="font-size-12 text-light-dark font-weight-500 mb-2">FREQUENCY</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.frequency.length == 0 ||
                          addPortFolioItem.frequency?.value == "" ||
                          addPortFolioItem.frequency?.value == null ||
                          addPortFolioItem.frequency?.value == undefined ||
                          addPortFolioItem.frequency?.value == "string")
                          ? "NA" : addPortFolioItem.frequency?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">UNIT</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.unit.length == 0 ||
                          addPortFolioItem.unit?.value == "" ||
                          addPortFolioItem.unit?.value == null ||
                          addPortFolioItem.unit?.value == undefined ||
                          addPortFolioItem.unit?.value == "string")
                          ? "NA" : addPortFolioItem.unit?.value}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">RECOMMENDED VALUE</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem.recommendedValue == "" ||
                          addPortFolioItem.recommendedValue == null ||
                          addPortFolioItem.recommendedValue == undefined ||
                          addPortFolioItem.recommendedValue == "string")
                          ? "NA" : addPortFolioItem.recommendedValue}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
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
                  </div>
                  {props.compoFlagTest == "itemEditPort" ?
                    <>
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
                    </> : <></>}
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
                  {props.compoFlag == "ITEM" ?
                    <>
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
                              setAddportFolioItem({
                                ...addPortFolioItem,
                                name: e.target.value,
                              })
                            }
                            value={addPortFolioItem.name}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                    </> : <></>}
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group w-100">
                      <label
                        className="text-light-dark font-size-12 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        DESCRIPTION
                      </label>
                      {props.compoFlag == "ITEM" ?
                        <>
                          <input
                            type="text"
                            className="form-control border-radius-10"
                            placeholder="Required*"
                            onChange={(e) =>
                              setAddportFolioItem({
                                ...addPortFolioItem,
                                headerdescription: e.target.value,
                              })
                            }
                            value={addPortFolioItem.headerdescription}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </> : <>
                          <input
                            type="text"
                            className="form-control border-radius-10"
                            placeholder="Optional"
                            onChange={(e) =>
                              setAddportFolioItem({
                                ...addPortFolioItem,
                                description: e.target.value,
                              })
                            }
                            value={addPortFolioItem.description}
                          /></>}
                      {/* <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    placeholder="Optional"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        description: e.target.value,
                      })
                    }
                    value={addPortFolioItem.description}
                  /> */}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6 checkbox-input">
                    <div class="form-group form-check">
                      <label class="form-check-label" for="exampleCheck1"><input type="checkbox" class="form-check-input" id="exampleCheck1"></input>I don’t need bundles / services</label>
                    </div>
                  </div>
                </div>
                <div className="border border-radius-10 py-2 px-3">
                  <p className="mt-4">STRATEGY</p>
                  <div className="row mt-4 input-fields">
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
                          className="text-primary"
                          value={addPortFolioItem.usageIn}
                          // onChange={(e) =>
                          //   setAddportFolioItem({ ...addPortFolioItem, usageIn: e })
                          // }
                          placeholder="Select(Required*)"
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
                          //   setAddportFolioItem({
                          //     ...addPortFolioItem,
                          //     strategyTask: e,
                          //   })
                          // }
                          placeholder="Select(Required*)"
                          onChange={(e) => HandleStrategyUsage(e)}
                          value={addPortFolioItem.strategyTask}
                          className="text-primary"
                        />
                        {/* <div className="icon-defold">
                        <div className="form-control">
                          <Select
                            options={updatedList}
                            // onChange={(e) =>
                            //   setAddportFolioItem({
                            //     ...addPortFolioItem,
                            //     strategyTask: e,
                            //   })
                            // }
                            onChange={(e) => HandleStrategyUsage(e)}
                            value={addPortFolioItem.strategyTask}
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
                          TASK TYPE
                        </label>
                        <Select
                          options={updatedTaskList}
                          className="text-primary"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              taskType: e,
                            })
                          }
                          value={addPortFolioItem.taskType}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                        {/* <div className="icon-defold">
                        <div className="form-control">
                          <Select
                            options={updatedTaskList}
                            onChange={(e) =>
                              setAddportFolioItem({
                                ...addPortFolioItem,
                                taskType: e,
                              })
                            }
                            value={addPortFolioItem.taskType}
                          />
                          <span className="search-icon searchIcon">
                            <SearchOutlinedIcon className="font-size-16" />
                          </span>
                        </div>
                      </div> */}
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
                            setAddportFolioItem({ ...addPortFolioItem, unit: e })
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
                          NO. OF YEARS
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
                            setAddportFolioItem({ ...addPortFolioItem, unit: e })
                          }
                          value={addPortFolioItem.unit}
                        />
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
                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="10,000 hours"
                            // defaultValue={props?.priceCalculator?.startUsage}
                            // value={priceCalculator.startUsage}
                            onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, recommendedValue: e.target.value, })}
                            value={addPortFolioItem.recommendedValue}
                            name="recommendedValue"
                          />
                          <span className="hours-div text-primary">Hours</span>
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
                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="16,000 hours"
                            // defaultValue={props?.priceCalculator?.startUsage}
                            // value={priceCalculator.startUsage}
                            onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, recommendedValue: e.target.value, })}
                            value={addPortFolioItem.recommendedValue}
                            name="recommendedValue"
                          />
                          <span className="hours-div text-primary">Hours</span>
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
                          options={frequencyOptions}
                          placeholder="Planned Usage"
                          className="text-primary"
                          onChange={(e) =>
                            setAddportFolioItem({
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
                          FREQUENCY
                        </label>
                        <Select
                          options={frequencyOptions}
                          placeholder="Select....."
                          className="text-primary"
                          onChange={(e) =>
                            setAddportFolioItem({
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
                            setAddportFolioItem({ ...addPortFolioItem, unit: e })
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
                            // type="text"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                            placeholder="Recommended Value"
                            // defaultValue={props?.priceCalculator?.startUsage}
                            // value={priceCalculator.startUsage}
                            onChange={(e) => setAddportFolioItem({ ...addPortFolioItem, recommendedValue: e.target.value, })}
                            value={addPortFolioItem.recommendedValue}
                            name="recommendedValue"
                          // name="startUsage"
                          // onChange={(e) =>
                          //   setPriceCalculator({
                          //     ...priceCalculator,
                          //     startUsage: e.target.value,
                          //   })
                          // }
                          />
                          <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
                        </div>
                        <div className="css-w8dmq8">*Mandatory</div>
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
                          type="email"
                          className="form-control border-radius-10 text-primary"
                          placeholder="NO. OF EVENTS"
                          onChange={(e) =>
                            setAddportFolioItem({
                              ...addPortFolioItem,
                              numberOfEvents: e.target.value,
                            })
                          }
                          value={addPortFolioItem.numberOfEvents}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
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
                  <div className="my-1 d-flex align-items-center justify-content-end">
                    <Link to="#" className="btn border mr-4">Cancel</Link>
                    <Link to="#" className="btn d-flex align-items-center border bg-primary text-white">
                      <span className="mr-2 funds">
                        <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                          <g>
                            <g>
                              <path class="st0" d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2
                      C74.2,101.4,70.7,105,66.3,105.1z"/>
                            </g>
                            <g>
                              <path class="st0" d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9
                      C103.4,89.1,106.9,92.9,106.8,97.2z"/>
                            </g>
                            <g>
                              <path class="st0" d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3
                      C135.6,88.9,139.3,92.5,139.4,96.8z"/>
                            </g>
                            <g>
                              <path class="st0" d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C70.7,121.6,74.3,125.2,74.3,129.6z"/>
                            </g>
                            <g>
                              <path class="st0" d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C103.2,121.5,106.8,125.2,106.8,129.5z"/>
                            </g>
                            <g>
                              <path class="st0" d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C70.7,154.1,74.3,157.7,74.3,162.1z"/>
                            </g>
                            <g>
                              <path class="st0" d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C90.7,157.7,94.3,154.1,98.6,154z"/>
                            </g>
                            <g>
                              <path class="st0" d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C135.8,121.5,139.4,125.2,139.4,129.5z"/>
                            </g>
                            <g>
                              <path class="st0" d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C123.2,157.7,126.8,154.1,131.1,154z"/>
                            </g>
                            <g>
                              <path class="st0" d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                      c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                      c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"/>
                            </g>
                            <g>
                              <path class="st0" d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                      S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                      c0-3.5-2.9-6.4-6.4-6.4H71.3z"/>
                            </g>
                          </g>
                        </svg>
                      </span>Calculate<span className="ml-2"><KeyboardArrowDownIcon /></span></Link>
                  </div>
                </div>

              </>}


          </TabPanel>
          <TabPanel value="2">
            {" "}
            <p className="mt-4">TEMPLATES</p>
            {props.compoFlag === "itemEdit" && editable == true ?
              <>
                <div className="row mt-4 ">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">TEMPLATE ID</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem?.templateId == "" ||
                          addPortFolioItem?.templateId == null ||
                          addPortFolioItem?.templateId == "string" ||
                          addPortFolioItem?.templateId == undefined)
                          ? "NA" : addPortFolioItem?.templateId}
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">TEMPLATE DESCRIPTION</p>
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                        {(addPortFolioItem?.templateDescription.length == 0 ||
                          addPortFolioItem?.templateDescription?.value == "" ||
                          addPortFolioItem?.templateDescription?.value == null ||
                          addPortFolioItem?.templateDescription?.value == undefined)
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
                      <a 
                      href={undefined} 
                      className="input-search cursor text-primary"
                      onClick={() => setModelShowForTemplate(true)}
                      ><SearchIcon style={{ fontSize: "34px" }} /></a>
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
                    className="text-primary"
                    options={options}
                    placeholder="TEMPLATE ID"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        templateId: e,
                      })
                    }
                    value={addPortFolioItem.templateId}
                  /> */}
                      {/* <div className="icon-defold">
                    <div className="form-control">
                      <Select
                        options={options}
                        placeholder="TEMPLATE ID"
                        onChange={(e) =>
                          setAddportFolioItem({
                            ...addPortFolioItem,
                            templateId: e,
                          })
                        }
                        value={addPortFolioItem.templateId}
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
                        className="text-primary"
                        onChange={(e) =>
                          setAddportFolioItem({
                            ...addPortFolioItem,
                            templateDescription: e,
                          })
                        }
                        value={addPortFolioItem.templateDescription}
                        isDisabled
                      /> */}
                      {/* <div className="icon-defold">
                    <div className="form-control">
                      <Select
                        options={options}
                        placeholder="TEMPLATE DESCRIPTION"
                        onChange={(e) =>
                          setAddportFolioItem({
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
              </>}


          </TabPanel>
          <TabPanel value="3">
            {/* <p className="mt-4">REPAIR OPTIONS</p> */}
            <p className="mt-4">RELATED KIT</p>
            {props.compoFlag === "itemEdit" && editable == true ?
              <>
                <div className="row mt-4 ">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">RELATED KIT</p>
                      {/* <h6 className="font-weight-500">CVA</h6> */}
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
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
                      <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
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
                    className="text-primary"
                    placeholder="REPAIR OPTION"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        repairOption: e,
                      })
                    }
                    value={addPortFolioItem.repairOption}
                  /> */}
                      {/* <div className="icon-defold">
                    <div className="form-control">
                      <Select
                        options={options}
                        placeholder="REPAIR OPTION"
                        onChange={(e) =>
                          setAddportFolioItem({
                            ...addPortFolioItem,
                            repairOption: e,
                          })
                        }
                        value={addPortFolioItem.repairOption}
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
                        KIT DESCRIPTION
                      </label>
                      <input
                        type="text"
                        className="form-control text-primary border-radius-10"
                        name="repairOption"
                        placeholder="KIT DESCRIPTION"
                        value={addPortFolioItem.kitDescription}
                        onChange={(e) => handleRelatedKitInputSearch(e)}
                        disabled
                      />
                      {/* <Select
                        options={options}
                        placeholder="KIT DESCRIPTION"
                        onChange={(e) =>
                          setAddportFolioItem({
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
        {tabs < 3 && (
          <div className="pull-right mt-3">
            <Link
              to="#"
              className="btn bg-primary text-white border mr-4"
              // onClick={() => {
              //   tabs < 3 && setTabs((prev) => `${parseInt(prev) + 1}`);
              // }}
              onClick={TabsEnableDisabledFun}
            >
              Save & Next
            </Link>
          </div>
        )}
      </div>
      <Modal
        size="xl"
        show={modelShowForTemplate}
        onHide={() => setModelShowForTemplate(false)}
      >
        <Modal.Body className="bg-primary">
        <div className="d-flex justify-content-between align-items-center w-100 mr-5">
                    <div className="row align-items-center m-0">
                      {querySearchSelector.map((obj, i) => {
                        return (
                          <>
                            <div className="customselect border-white d-flex align-items-center mr-3 my-2 border-radius-10">
                              {i === 0 ?
                                <>
                                  <Select
                                    placeholder="Select Type."
                                    options={([
                                      { label: "Portfolio", value: "PORTFOLIO" },
                                      { label: "Bundle", value: "BUNDLE_ITEM" },
                                      { label: "Service", value: "SERVICE" },

                                    ])}

                                    // defaultValue={props.compoFlag === "portfolioTempItemSearch" ? ({ label: "Portfolio", value: "PORTFOLIO" }) : ""}
                                    value={querySearchSelector.itemType}
                                    onChange={(e) => handleItemType(e, i)}
                                  // autoSelect={props.compoFlag === "portfolioTempItemSearch"}
                                  />
                                  {/* <Select
                                    options={[
                                      { label: "AND", value: "AND" },
                                      { label: "OR", value: "OR" },
                                    ]}
                                    disabled
                                    placeholder="And"
                                  // value={querySearchSelector.itemTypeOperator}
                                  // onChange={(e) => handleitemTypeOperator(e, i)}
                                  /> */}
                                </>
                                : <></>}
                              {i > 0 ? (
                                <Select
                                  isClearable={true}
                                  defaultValue={{ label: "AND", value: "AND" }}
                                  options={[
                                    { label: "AND", value: "AND", id: i },
                                    { label: "OR", value: "OR", id: i },
                                  ]}
                                  // placeholder="&amp;"
                                  placeholder="AND/OR"
                                  onChange={(e) => handleOperator(e, i)}
                                  // value={querySearchOperator[i]}
                                  value={obj.selectOperator}
                                />
                              ) : (
                                <></>
                              )}

                              <div>
                                <Select
                                  // isClearable={true}
                                  options={familySelectOption}
                                  onChange={(e) => handleFamily(e, i)}
                                  value={obj.selectFamily}
                                />
                              </div>
                              <div className="customselectsearch">
                                <input
                                  className="custom-input-sleact pr-1"
                                  type="text"
                                  placeholder="Search string"
                                  value={obj.inputSearch}
                                  onChange={(e) => handleInputSearch(e, i)}
                                  id={"inputSearch-" + i}
                                  autoComplete="off"
                                />

                                {
                                  <ul
                                    className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                    id="style"
                                  >
                                    {obj.selectOptions.map((currentItem, j) => (
                                      <li
                                        className="list-group-item"
                                        key={j}
                                        onClick={(e) =>
                                          handleSearchListClick(
                                            e,
                                            currentItem,
                                            obj,
                                            i
                                          )
                                        }
                                      >
                                        {currentItem}
                                      </li>
                                    ))}
                                  </ul>
                                }

                              </div>
                              <Link to="#" className="btn bg-primary text-white" onClick={handleLandingPageQuerySearchClick}>
                      <SearchIcon /><span className="ml-1">Search</span>
                    </Link>
                            </div>
                          </>
                        );
                      })}
                      <div onClick={(e) => addSearchQuerryHtml(e)}>
                        <Link
                          to="#"
                          className="btn-sm text-white border mr-2"
                          style={{ border: "1px solid #872FF7" }}
                        >
                          +
                        </Link>
                      </div>
                      <div onClick={handleDeletQuerySearch}>
                        <Link to="#" className="btn-sm border">
                          <svg
                            data-name="Layer 41"
                            id="Layer_41"
                            fill="white"
                            viewBox="0 0 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title />
                            <path
                              className="cls-1"
                              d="M44,10H35V8.6A6.6,6.6,0,0,0,28.4,2H21.6A6.6,6.6,0,0,0,15,8.6V10H6a2,2,0,0,0,0,4H9V41.4A6.6,6.6,0,0,0,15.6,48H34.4A6.6,6.6,0,0,0,41,41.4V14h3A2,2,0,0,0,44,10ZM19,8.6A2.6,2.6,0,0,1,21.6,6h6.8A2.6,2.6,0,0,1,31,8.6V10H19V8.6ZM37,41.4A2.6,2.6,0,0,1,34.4,44H15.6A2.6,2.6,0,0,1,13,41.4V14H37V41.4Z"
                            />
                            <path
                              class="cls-1"
                              d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                            />
                            <path
                              class="cls-1"
                              d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                            />
                          </svg>
                          {/* <DeleteIcon className="font-size-16" /> */}
                        </Link>
                      </div>
                    </div>
                  </div>
        </Modal.Body>
      </Modal>
      {/* <ToastContainer /> */}
    </>
  );
};

export default AddPortfolioItem;

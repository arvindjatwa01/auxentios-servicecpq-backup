import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";

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

  const [categoryUsageKeyValue1, setCategoryUsageKeyValue1] = useState([]);
  const [stratgyTaskTypeKeyValue, setStratgyTaskTypeKeyValue] = useState([]);
  const [stratgyTaskUsageKeyValue, setStratgyTaskUsageKeyValue] = useState([]);

  const [typeKeyValue, setTypeKeyValue] = useState([]);
  const [machineTypeKeyValue, setMachineTypeKeyValue] = useState([]);
  const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState(
    []
  );
  const [categoryUsageKeyValue, setCategoryUsageKeyValue] = useState([]);

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
        taskType: { label: taskType, value: taskType },
        frequency: { label: frequency, value: frequency },
        unit: { label: unit, value: unit },
        recommendedValue: recommendedValue,
        quantity,
        numberOfEvents: numberOfEvents,
        templateDescription: {
          label: itemBodyDescription,
          value: itemBodyDescription,
        },
        strategyTask: { label: props.passItemEditRowData.itemHeaderModel.itemHeaderStrategy, value: props.passItemEditRowData.itemHeaderModel.itemHeaderStrategy },
        // repairOption: { label: repairOption, value: repairOption },
        repairOption: repairOption,
      });
    }
  }, []);

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
      } else {
        setTabs((prev) => `${parseInt(prev) + 1}`)
        setAddportFolioItem({ ...addPortFolioItem, templateId: "", repairOption: "" });
      }
    } else if (tabs == 2 && addPortFolioItem.templateId == "") {
      // if(&& props.compoFlag === "ITEM")
      setTabs((prev) => `${parseInt(prev) + 1}`)
    } else if (tabs == 2 && addPortFolioItem.templateId !== "") {
      if (props.compoFlag === "ITEM") {

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
          serviceRequired: true,
          labourRequired: true,
          miscRequired: true
        }

        const itemPriceData = await createItemPriceData(rObj)

        props.setTabs("2");
        props.getAddportfolioItemDataFun(addPortFolioItem, itemPriceData.data);


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
          serviceRequired: true,
          labourRequired: true,
          miscRequired: true
        }

        const itemPriceData = await createItemPriceData(rObj)
        props.getAddportfolioItemData(addPortFolioItem, itemPriceData.data)
        props.setBundleTabs("3");
      }
    }

    // tabs < 3 && setTabs((prev) => `${parseInt(prev) + 1}`);
  }

  const handleAddPortfolioSave = async () => {
    if (props.compoFlag === "itemEdit") {
      props.handleItemEditSave(addPortFolioItem);
      // props.setTabs("2");
    } else if (props.compoFlag === "ITEM") {
      props.setTabs("2");
      props.getAddportfolioItemDataFun(addPortFolioItem);
    } else {


      // alert("hello");

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
          standardJobId: "",
          repairKitId: addPortFolioItem.repairOption,
          templateDescription: "",
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
          serviceRequired: true,
          labourRequired: true,
          miscRequired: true
        }

        const itemPriceData = await createItemPriceData(rObj)
        props.getAddportfolioItemData(addPortFolioItem, itemPriceData.data)

        // props.getAddportfolioItemData(addPortFolioItem)
        props.setBundleTabs("3");
      }
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
              {/* <AccessAlarmOutlinedIcon className=" font-size-16" /> */}
              <Tab label="Related template(s)" value="2" disabled={addPortFolioItem.repairOption != "" && editable != true} />
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
                      <h6 className="font-weight-500">{addPortFolioItem.name}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
                      <h6 className="font-weight-500">{addPortFolioItem.description}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">USAGE IN</p>
                      <h6 className="font-weight-500">{addPortFolioItem.usageIn?.value}</h6>
                    </div>
                  </div>
                </div>
                <p className="">STRATEGY</p>
                <div className="row mt-2 ">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">STRATEGY TASK</p>
                      <h6 className="font-weight-500">{addPortFolioItem.strategyTask?.value}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">TASK TYPE</p>
                      <h6 className="font-weight-500">{addPortFolioItem.taskType?.value}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="font-size-12 text-light-dark font-weight-500 mb-2">FREQUENCY</p>
                      <h6 className="font-weight-500">{addPortFolioItem.frequency?.value}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">UNIT</p>
                      <h6 className="font-weight-500">{addPortFolioItem.unit?.value}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">RECOMMENDED VALUE</p>
                      <h6 className="font-weight-500">{addPortFolioItem.recommendedValue}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">QUANTITY</p>
                      <h6 className="font-weight-500">{addPortFolioItem.quantity}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">NO. OF EVENTS</p>
                      <h6 className="font-weight-500">{addPortFolioItem.numberOfEvents}</h6>
                    </div>
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
                    </div>
                  </div>
                </div>

                <p className="mt-4">STRATEGY</p>
                <div className="row mt-4 input-fields">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label
                        className="text-light-dark font-size-14 font-weight-500"
                        for="exampleInputEmail1"
                      >
                        STRATEGY TASK
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
                      {/* <div className="icon-defold">
                    <div className="form-control">
                      <Select
                        options={frequencyOptions}
                        className="text-primary"
                        placeholder="Select....."
                        onChange={(e) =>
                          setAddportFolioItem({
                            ...addPortFolioItem,
                            frequency: e,
                          })
                        }
                        value={addPortFolioItem.frequency}
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
                      {/* <Select
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        recommendedValue: e,
                      })
                    }
                    value={addPortFolioItem.recommendedValue}
                    options={options}
                    placeholder="RECOMMENDED VALUE"
                  /> */}
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
                        className="form-control border-radius-10 text-primary"
                        placeholder="QUANTITY"
                        onChange={(e) =>
                          setAddportFolioItem({
                            ...addPortFolioItem,
                            quantity: e.target.value,
                          })
                        }
                        value={addPortFolioItem.quantity}
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
                    </div>
                  </div>
                  {props.compoFlag == "ITEM" ?
                    <>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group w-100">
                          <label
                            className="text-light-dark font-size-12 font-weight-500"
                            for="exampleInputEmail1"
                          >
                            YEAR
                          </label>
                          <input
                            type="email"
                            className="form-control border-radius-10"
                            placeholder="Year"
                            onChange={(e) =>
                              setAddportFolioItem({
                                ...addPortFolioItem,
                                year: e.target.value,
                              })
                            }
                            value={addPortFolioItem.year}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <div className="form-group w-100">
                          <label
                            className="text-light-dark font-size-12 font-weight-500"
                            for="exampleInputEmail1"
                          >
                            NO. OF YEAR
                          </label>
                          <input
                            type="email"
                            className="form-control border-radius-10"
                            placeholder="No of Year"
                            onChange={(e) =>
                              setAddportFolioItem({
                                ...addPortFolioItem,
                                noOfYear: e.target.value,
                              })
                            }
                            value={addPortFolioItem.noOfYear}
                          />
                        </div>
                      </div>
                    </> : <></>}

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
                      <h6 className="font-weight-500">{addPortFolioItem?.templateId}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">TEMPLATE DESCRIPTION</p>
                      <h6 className="font-weight-500">{addPortFolioItem?.templateDescription?.value}</h6>
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
                      <Select
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
                      <h6 className="font-weight-500">{addPortFolioItem?.repairOption}</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <p className="text-light-dark font-size-12 font-weight-500 mb-2">KIT DESCRIPTION</p>
                      <h6 className="font-weight-500">{addPortFolioItem?.kitDescription?.value}</h6>
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
                      <Select
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
          <div className="text-right pb-2">
            <Link
              to="#"
              className="btn border mr-4"
              // onClick={() => {
              //   tabs < 3 && setTabs((prev) => `${parseInt(prev) + 1}`);
              // }}
              onClick={TabsEnableDisabledFun}
            >
              Next
            </Link>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

export default AddPortfolioItem;

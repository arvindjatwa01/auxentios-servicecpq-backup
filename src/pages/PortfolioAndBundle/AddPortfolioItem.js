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

import { PortfolioContext } from "./ProtfolioContext";
import { useAppSelector } from "../../app/hooks";
import {
  getUsageCategoryKeyValue,
  getTaskTypeKeyValue,
  getMachineTypeKeyValue,
  getTypeKeyValue,
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

  // const {stratgyTaskTypeKeyValue,categoryUsageKeyValue1} = useContext(PortfolioContext);
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
    year: "",
    noOfYear: "",
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
        repairOption: { label: repairOption, value: repairOption },
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

  // console.log("categoryList --- ", categoryList)

  const TabsEnableDisabledFun = () => {
    // console.log("Hello");
    console.log("tabs : ", tabs)
    console.log("props.compoFlag : ", props.compoFlag);
    console.log("addPortFolioItem.templateId : ", addPortFolioItem.templateId === "");

    if (tabs == 1) {
      setTabs((prev) => `${parseInt(prev) + 1}`)
      setAddportFolioItem({ ...addPortFolioItem, templateId: "", repairOption: "" });
    } else if (tabs == 2 && addPortFolioItem.templateId == "") {
      // if(&& props.compoFlag === "ITEM")
      setTabs((prev) => `${parseInt(prev) + 1}`)
    } else if (tabs == 2 && addPortFolioItem.templateId !== "") {
      if (props.compoFlag === "ITEM") {
        props.setTabs("2");
        props.getAddportfolioItemDataFun(addPortFolioItem);
      } else {
        props.getAddportfolioItemData(addPortFolioItem)
        props.setBundleTabs("3");
      }
    }

    // tabs < 3 && setTabs((prev) => `${parseInt(prev) + 1}`);
  }

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
              <Tab label="Related template(s)" value="2" disabled={addPortFolioItem.repairOption != ""} />
              {/* <SellOutlinedIcon className=" font-size-16" /> */}
              {/* <Tab label="Related repair option" value="3" /> */}
              <Tab label="Related Kit" value="3" disabled={addPortFolioItem.templateId != ""} />
            </TabList>
          </Box>
          <TabPanel value="1">
            {/* <p className="mt-4">SUMMARY</p> */}
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
                    DESCRIPTION
                  </label>
                  <input
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
                    className="text-primary"
                    value={addPortFolioItem.usageIn}
                    // onChange={(e) =>
                    //   setAddportFolioItem({ ...addPortFolioItem, usageIn: e })
                    // }
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
                  <div className="icon-defold">
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
                      {/* <span className="search-icon searchIcon">
                        <SearchOutlinedIcon className="font-size-16" />
                      </span> */}
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
                    <span className="hours-div">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span>
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
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <p className="mt-4">TEMPLATES</p>
            <div className="row input-fields">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-14 font-weight-500"
                    for="exampleInputEmail1"
                  >
                    TEMPLATE ID
                  </label>
                  <Select
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
                  />
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
                      <span className="mr-2">+</span>Add Template / Kit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="3">
            <p className="mt-4">REPAIR OPTIONS</p>
            <div className="row input-fields">
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
                    className="text-primary"
                    placeholder="REPAIR OPTION"
                    onChange={(e) =>
                      setAddportFolioItem({
                        ...addPortFolioItem,
                        repairOption: e,
                      })
                    }
                    value={addPortFolioItem.repairOption}
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
    </>
  );
};

export default AddPortfolioItem;

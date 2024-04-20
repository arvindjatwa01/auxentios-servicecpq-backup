import React, { useState, useEffect } from "react";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useSelector } from "react-redux";

import $ from "jquery";
import Select from "react-select";
import { Modal } from "react-bootstrap";

import shareIcon from "../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import cpqIcon from "../../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../assets/icons/svg/Copy.svg";
import shearchIcon from "../../../assets/icons/svg/search.svg";

import { MuiMenuComponent } from "../../Operational/index";
import { errorMessage, successMessage } from "./utilities/toastMessage";
import { isEmpty, isEmptySelect } from "./utilities/textUtilities";
import ItemAddEdit from "./portfolio-item/ItemAddEdit";
import ItemPriceCalculator from "./portfolio-item/ItemPriceCalculator";
import { getFormatDateTime } from "./utilities/dateUtilities";
import { FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";

import { callGetApi, getApiCall } from "services/searchQueryService";
import {
  getItemDataById,
  itemCreation,
  updateItemData,
} from "../../../services/index";
import { updateItemPriceSjRkId } from "./portfolio-item/SJRKIdUpdate";
import { GET_SEARCH_COVERAGE } from "services/CONSTANTS";
import LoadingProgress from "pages/Repair/components/Loader";

import {
  offerValidityKeyValuePairs,
  salesOfficeKeyValuePairs,
  serviceTypeKeyValuePairs,
  additionalPriceKeyValuePair,
  discountTypeKeyValuePair,
  usageTypeKeyValuePair,
  defaultItemHeaderObj,
  defaultItemBodyObj,
  defaultItemPriceObj,
} from "pages/Common/PortfolioAndSolutionConstants";
const activityOptions = ["None", "Atria", "Callisto"];

const BundleServiceAddUpdate = (props) => {
  // const {
  //   show, hideModel, itemFlag, customerSegmentKeyValuePair, machineComponentKeyValuePair, itemVersionKeyValuePairs,
  //   itemStatusKeyValuePairs, itemId, setItemId, itemEditModeOn, frequencyKeyValuePairs, unitKeyValuePairs, priceHeadTypeKeyValuePair,
  //   priceTypeKeyValuePair, priceMethodKeyValuePair, currencyKeyValuePair, reviewModeActive = false,
  // } = props;
  const {
    show,
    hideModel,
    itemFlag,
    itemId,
    setItemId,
    itemEditModeOn,
    reviewModeActive = false,
  } = props;

  const {
    supportLevelKeyValuePair,
    portfolioStatusKeyValuePair,
    customerSegmentKeyValuePair,
    machineComponentKeyValuePair,
    priceMethodKeyValuePair,
    priceTypeKeyValuePair,
    priceHeadTypeKeyValuePair,
    currencyKeyValuePair,
    frequencyKeyValuePairs,
    unitKeyValuePairs,
    ...newdataResponse
  } = useSelector((state) => state.commonAPIReducer);

  const [activeTab, setActiveTab] = useState("bundleServiceHeader");
  const [itemActive, setItemActive] = useState(false);

  const [bundleServiceItemHeader, setBundleServiceItemHeader] = useState({
    ...defaultItemHeaderObj,
  });
  const [bundleServiceItemBody, setBundleServiceItemBody] = useState({
    ...defaultItemBodyObj,
  });
  const [bundleServicePriceObj, setBundleServicePriceObj] = useState({
    ...defaultItemPriceObj,
  });

  const [bundleServiceEdit, setBundleServiceEdit] = useState({
    bundleServiceHeader: false,
    bundleServiceItems: false,
    bundleServicePrice: false,
    bundleServiceAdministrative: false,
  });

  const [bundleServiceObj, setBundleServiceObj] = useState({
    itemId: 0,
    name: "",
    description: "",
    itemBodyDescription: "",
    bundleFlag: "",
    reference: "",
    customerSegment: "",
    make: "",
    model: "",
    family: "",
    prefix: "",
    additional: "",
    estimatedTime: "",
    unit: "",
    usageType: "",
    frequency: "",
    currency: "",
    machineComponent: "",
    serviceChargable: { value: "chargeable", label: "Chargeable" },
    supportLevel: { value: "STANDARD", label: "Standard (Bronze)" },
    status: { value: "DRAFT", label: "Draft" },
  });

  const [administrative, setAdministrative] = useState({
    preparedBy: "",
    approvedBy: "",
    preparedOn: new Date(),
    revisedBy: "",
    revisedOn: new Date(),
    salesOffice: "",
    offerValidity: "",
  });

  const [modelSearchList, setModelSearchList] = useState([]);
  const [modelSelect, setModelSelect] = useState(false);
  const [prefixKeyValuePair, setPrefixKeyValuePair] = useState([]);
  const [itemPriceDataId, setItemPriceDataId] = useState(null);

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (itemId && itemEditModeOn) {
      handleGetItemDetails(itemId);
      setBundleServiceEdit({
        bundleServiceHeader: true,
        bundleServiceItems: true,
        bundleServicePrice: true,
        bundleServiceAdministrative: true,
      });
    }
  }, [itemId, itemEditModeOn]);

  // get Select Bundle/Service Item Details
  const handleGetItemDetails = async (itemId) => {
    setShowLoader(true);
    const itemDetails = await getItemDataById(itemId);
    if (itemDetails.status === 200) {
      const { itemId, itemName, itemHeaderModel, itemBodyModel } =
        itemDetails.data;

      // set customer Segment
      const _customerSegment = customerSegmentKeyValuePair.find(
        (obj) => obj.value === itemHeaderModel.itemHeaderCustomerSegment
      );

      // Set machine-component Type
      const _machineType = machineComponentKeyValuePair.find(
        (obj) => obj.value === itemHeaderModel.type
      );

      // set Item Status
      const _status = portfolioStatusKeyValuePair.find(
        (obj) => obj.value === itemHeaderModel.status
      );

      // set sales office key value
      const _salesOffice = salesOfficeKeyValuePairs.find(
        (obj) => obj.value === itemHeaderModel.salesOffice
      );

      // set offer validity key value
      const _offerValidity = offerValidityKeyValuePairs.find(
        (obj) => obj.value === itemHeaderModel.offerValidity
      );

      setBundleServiceObj({
        ...bundleServiceObj,
        itemId: itemId,
        name: itemName,
        description: itemHeaderModel.itemHeaderDescription,
        bundleFlag: itemHeaderModel.bundleFlag,
        reference: itemHeaderModel.reference,
        customerSegment: _customerSegment || "",
        make: itemHeaderModel.itemHeaderMake,
        model: itemHeaderModel.model,
        family: itemHeaderModel.itemHeaderFamily,
        prefix: isEmpty(itemHeaderModel.prefix)
          ? ""
          : { label: itemHeaderModel.prefix, value: itemHeaderModel.prefix },
        additional: "",
        estimatedTime: itemHeaderModel.estimatedTime,
        unit: "",
        usageType: "",
        frequency: "",
        currency: itemHeaderModel.currency,
        machineComponent: _machineType || "",
        serviceChargable: itemHeaderModel.serviceChargable
          ? { value: "chargeable", label: "Chargeable" }
          : { value: "free", label: "Free" },
        supportLevel: { value: "STANDARD", label: "Standard (Bronze)" },
        status: _status,
      });

      if (!isEmpty(itemHeaderModel.model)) {
        handleModelSearch(itemHeaderModel.model);
      }

      setModelSelect(!isEmpty(itemHeaderModel.model));
      setBundleServiceItemHeader({ ...itemHeaderModel });
      setBundleServiceItemBody({ ...itemBodyModel });

      setAdministrative({
        preparedBy: itemHeaderModel.preparedBy,
        approvedBy: itemHeaderModel.approvedBy,
        preparedOn: itemHeaderModel.preparedOn,
        revisedBy: itemHeaderModel.revisedBy,
        revisedOn: itemHeaderModel.revisedOn,
        salesOffice: _salesOffice || "",
        offerValidity: _offerValidity || "",
      });

      if (itemBodyModel.itemPrices.length !== 0) {
        // Use Array.reduce() to find the minimum itemId
        const _itemPriceDataId = itemBodyModel.itemPrices.reduce(
          (minItemId, currentItem) => {
            return currentItem.itemPriceDataId < minItemId
              ? currentItem.itemPriceDataId
              : minItemId;
          },
          itemBodyModel.itemPrices[0].itemPriceDataId
        );
        setItemPriceDataId(_itemPriceDataId);
        // setItemPriceDataId(
        //   itemBodyModel.itemPrices[itemBodyModel.itemPrices.length - 1]
        //     .itemPriceDataId
        // );
      }
      setShowLoader(false);
    } else {
      setShowLoader(false);
    }
  };

  // handle Bundle/Service Edit falg
  const handleBundleServiceEditFlag = (keyName) => {
    // setBundleServiceEdit({
    //   ...bundleServiceEdit,
    //   bundleServiceHeader: itemId
    //     ? !bundleServiceEdit.bundleServiceHeader
    //     : false,
    // });
    if (!reviewModeActive) {
      setBundleServiceEdit({
        ...bundleServiceEdit,
        [keyName]: itemId ? !bundleServiceEdit[keyName] : false,
      });
    }
  };

  // search model
  const handleModelSearch = (modelValue) => {
    setModelSelect(false);
    var searchStr = "model~" + modelValue;
    let loading, data, failure;
    getApiCall(GET_SEARCH_COVERAGE + searchStr, loading, data, failure)
      // getSearchQueryCoverage(searchStr)
      .then((res) => {
        if (res || res !== undefined) {
          $(`.scrollbar-model`).css("display", "block");
          setModelSearchList(res);
          var prefixOptions = [];
          const resultLength = res.length;
          for (var n = 0; n < resultLength; n++) {
            prefixOptions.push({ label: res[n].prefix, value: res[n].prefix });
          }
          setPrefixKeyValuePair(prefixOptions);
        }
      })
      .catch((err) => {
        return;
      });
  };

  // Select Search Model from list
  const handleSelectModel = (currentItem) => {
    setBundleServiceObj((pre) => ({
      ...pre,
      model: currentItem.model,
      make: currentItem.make,
      family: currentItem.family,
    }));
    setModelSelect(true);
    $(`.scrollbar-model`).css("display", "none");
  };

  // input fields text change
  const handleTextChange = (e) => {
    const { name, type, value } = e.target;
    if (type === "number") {
      setBundleServiceObj((pre) => ({ ...pre, [name]: parseInt(value) }));
    } else {
      setBundleServiceObj((pre) => ({ ...pre, [name]: value }));
    }
  };

  // administrative tab text change
  const handleAdministrativeTextChange = (e, type, keyName) => {
    if (type === "text") {
      setAdministrative((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    } else if (type === "date") {
      setAdministrative((pre) => ({ ...pre, [keyName]: e }));
    } else if (type === "select") {
      setAdministrative((pre) => ({ ...pre, [keyName]: e }));
    }
  };

  // Select text change
  const handleSelectChange = (e, keyName) => {
    setBundleServiceObj((pre) => ({ ...pre, [keyName]: e }));
  };

  // make item status options disable
  const handleStatusOptionsDisable = (optionData) => {
    if (
      optionData.value === "DRAFT" &&
      bundleServiceObj.status.value == "ACTIVE"
    ) {
      setItemActive(false);
      return true;
    }

    if (
      (optionData.value === "DRAFT" || optionData.value === "ACTIVE") &&
      bundleServiceObj.status.value == "REVISED"
    ) {
      return true;
    }

    if (
      (optionData.value === "DRAFT" ||
        optionData.value === "ACTIVE" ||
        optionData.value === "REVISED") &&
      bundleServiceObj.status.value == "ARCHIVED"
    ) {
      return true;
    }
  };

  // check bundle Header input validation
  const checkHeaderValidation = () => {
    try {
      if (isEmpty(bundleServiceObj.name)) {
        errorMessage(
          (itemFlag === "SERVICE" ? "Service" : "Bundle") +
            " Name is a required field, you can’t leave it blank"
        );
        return false;
      } else if (isEmpty(bundleServiceObj.description)) {
        errorMessage(
          (itemFlag === "SERVICE" ? "Service" : "Bundle") +
            " Description is a required field, you can’t leave it blank"
        );
        return false;
      } else if (isEmpty(bundleServiceObj.model)) {
        errorMessage("Model is a required field, you can’t leave it blank");
        return false;
      } else if (!modelSelect) {
        errorMessage("Please Enter valid Model .");
        return false;
      }
      return true;
    } catch (error) {
      return;
    }
  };

  // Common Function for Item Create/Update
  const handleCreateUpdateItem = async (
    itemHeaderData,
    itemBodyData,
    itemPriceObj = bundleServicePriceObj
  ) => {
    let itemReqObj = {
      itemId: bundleServiceObj.itemId,
      itemName: bundleServiceObj.name,
      itemHeaderModel: {
        ...itemHeaderData,
        // ...bundleServiceItemHeader,
        // itemHeaderDescription: bundleServiceObj.description,
        bundleFlag: itemFlag === "BUNDLE" ? "BUNDLE_ITEM" : "SERVICE",
        reference: bundleServiceObj.reference,
        itemHeaderMake: bundleServiceObj.make,
        itemHeaderFamily: bundleServiceObj.family,
        model: bundleServiceObj.model,
        prefix: bundleServiceObj.prefix?.value || "",
        type: bundleServiceObj.machineComponent?.value || "EMPTY",
        estimatedTime: bundleServiceObj.estimatedTime,
        // status: "DRAFT",
        itemHeaderCustomerSegment:
          bundleServiceObj.customerSegment?.value || "",
        preparedBy: administrative.preparedBy,
        approvedBy: administrative.approvedBy,
        preparedOn: administrative.preparedOn,
        revisedBy: administrative.revisedBy,
        revisedOn: administrative.revisedOn,
        salesOffice: administrative.salesOffice?.value || "",
        offerValidity: administrative.offerValidity?.value || "",
        serviceChargable:
          bundleServiceObj.serviceChargable?.value === "chargeable",
        serviceOptional: !(
          bundleServiceObj.serviceChargable?.value === "chargeable"
        ),
      },
      itemBodyModel: {
        // ...bundleServqqiceItemBody,
        ...itemBodyData,
        itemBodyDescription: itemBodyData.itemBodyDescription,
        taskType: [
          itemBodyData.taskType?.value || itemBodyData.taskType || "EMPTY",
        ],
        usageIn: itemBodyData.usageIn?.value || itemBodyData.usageIn || "",
        usage: itemBodyData.usage?.value || itemBodyData.usage || "",
        year: itemBodyData.year?.value || itemBodyData.year || "",
        itemPrices: itemBodyData.itemPrices,
      },
    };

    // console.log("itemHeaderData ====== ", itemHeaderData);
    // console.log("itemBodyData ====== ", itemBodyData);
    // console.log("itemPriceObj ====== ", itemPriceObj);
    // console.log("itemReqObj ======= ", itemReqObj);
    if (itemId) {
      const updateItem = await updateItemData(itemId, itemReqObj);
      if (updateItem.status === 200) {
        successMessage(bundleServiceObj.name + " Update Successfully.");
        updateItemPriceSjRkId({
          standardJobId: itemPriceObj.standardJobId,
          repairKitId: itemPriceObj.repairKitId,
          itemId: itemId,
          itemPriceDataId:
            itemBodyData.itemPrices[itemBodyData.itemPrices.length - 1]
              .itemPriceDataId,
        });
        setActiveTab("bundleServicePrice");
      }
    } else {
      const createItem = await itemCreation(itemReqObj);
      if (createItem.status === 200) {
        successMessage(bundleServiceObj.name + " Create Successfully.");
        if (itemBodyData.itemPrices.length !== 0) {
          updateItemPriceSjRkId({
            standardJobId: itemPriceObj.standardJobId,
            repairKitId: itemPriceObj.repairKitId,
            itemId: createItem.data.itemId,
            itemPriceDataId:
              itemBodyData.itemPrices[itemBodyData.itemPrices.length - 1]
                .itemPriceDataId,
          });
        }
        setBundleServiceObj({
          ...bundleServiceObj,
          itemId: createItem.data.itemId,
        });
        setItemId(createItem.data.itemId);
        setActiveTab("bundleServicePrice");
      }
    }
  };

  // Bundle/Service Header Tab Button Action
  const handleBundleServiceHeader = async () => {
    try {
      if (!bundleServiceEdit.bundleServiceHeader && !checkHeaderValidation()) {
        return;
      }
      if (itemFlag === "SERVICE") {
        if (bundleServiceEdit.bundleServiceHeader) {
          setActiveTab("bundleServicePrice");
        } else {
          if (
            itemId &&
            !bundleServiceEdit.bundleServiceHeader &&
            bundleServiceObj.status?.value === "ACTIVE"
          ) {
            errorMessage(
              "Service Status is Active, change Status for change item details."
            );
            return;
          }
          let serviceReqObj = {
            itemId: bundleServiceObj.itemId,
            itemName: bundleServiceObj.name,
            itemHeaderModel: {
              ...bundleServiceItemHeader,
              itemHeaderDescription: bundleServiceObj.description,
              bundleFlag: "SERVICE",
              reference: bundleServiceObj.reference,
              itemHeaderMake: bundleServiceObj.make,
              itemHeaderFamily: bundleServiceObj.family,
              model: bundleServiceObj.model,
              prefix: bundleServiceObj.prefix?.value || "",
              type: bundleServiceObj.machineComponent?.value || "EMPTY",
              estimatedTime: bundleServiceObj.estimatedTime,
              status: bundleServiceObj.status?.value || "DRAFT",
              itemHeaderCustomerSegment:
                bundleServiceObj.customerSegment?.value || "",
              preparedBy: administrative.preparedBy,
              approvedBy: administrative.approvedBy,
              preparedOn: administrative.preparedOn,
              revisedBy: administrative.revisedBy,
              revisedOn: administrative.revisedOn,
              salesOffice: administrative.salesOffice?.value || "",
              offerValidity: administrative.offerValidity?.value || "",
              serviceChargable:
                bundleServiceObj.serviceChargable?.value === "chargeable",
              serviceOptional: !(
                bundleServiceObj.serviceChargable?.value === "chargeable"
              ),
            },
            itemBodyModel: { ...bundleServiceItemBody },
          };
          if (itemId) {
            const updateService = await updateItemData(itemId, serviceReqObj);
            if (updateService.status === 200) {
              successMessage(bundleServiceObj.name + " Update Successfully.");
              setActiveTab("bundleServicePrice");
            }
          } else {
            const createService = await itemCreation(serviceReqObj);
            if (createService.status === 200) {
              setItemId(createService.data.itemId);
              setBundleServiceObj({
                ...bundleServiceObj,
                itemId: createService.data.itemId,
              });
              successMessage(bundleServiceObj.name + " Create Successfully.");
              setActiveTab("bundleServicePrice");
            }
          }
        }
      } else {
        if (bundleServiceEdit.bundleServiceHeader) {
          setActiveTab("bundleServiceItems");
        } else {
          if (itemId) {
            let serviceReqObj = {
              itemId: bundleServiceObj.itemId,
              itemName: bundleServiceObj.name,
              itemHeaderModel: {
                ...bundleServiceItemHeader,
                itemHeaderDescription: bundleServiceObj.description,
                bundleFlag: "BUNDLE_ITEM",
                reference: bundleServiceObj.reference,
                itemHeaderMake: bundleServiceObj.make,
                itemHeaderFamily: bundleServiceObj.family,
                model: bundleServiceObj.model,
                prefix: bundleServiceObj.prefix?.value || "",
                type: bundleServiceObj.machineComponent?.value || "EMPTY",
                estimatedTime: bundleServiceObj.estimatedTime,
                status: bundleServiceObj.status?.value || "DRAFT",
                itemHeaderCustomerSegment:
                  bundleServiceObj.customerSegment?.value || "",
                preparedBy: administrative.preparedBy,
                approvedBy: administrative.approvedBy,
                preparedOn: administrative.preparedOn,
                revisedBy: administrative.revisedBy,
                revisedOn: administrative.revisedOn,
                salesOffice: administrative.salesOffice?.value || "",
                offerValidity: administrative.offerValidity?.value || "",
                serviceChargable:
                  bundleServiceObj.serviceChargable?.value === "chargeable",
                serviceOptional: !(
                  bundleServiceObj.serviceChargable?.value === "chargeable"
                ),
              },
              itemBodyModel: { ...bundleServiceItemBody },
            };

            const updateService = await updateItemData(itemId, serviceReqObj);
            if (updateService.status === 200) {
              successMessage(bundleServiceObj.name + " Update Successfully.");
              setActiveTab("bundleServiceItems");
            }
          } else {
            setActiveTab("bundleServiceItems");
          }
        }
      }
    } catch (error) {
      return;
    }
  };

  // Bundle/Service Items Tab Button Action
  const handleBundleServiceItems = async (
    editItemData,
    itemRequestObj,
    itemPriceData,
    isPortfolioItem,
    isEditable
  ) => {
    const _itemPrice = [...bundleServiceItemBody.itemPrices];
    if (
      !_itemPrice.some(
        (obj) => obj.itemPriceDataId === itemPriceData.itemPriceDataId
      ) &&
      !isEmpty(itemPriceData.itemPriceDataId)
    ) {
      _itemPrice.push({ itemPriceDataId: itemPriceData.itemPriceDataId });
    }
    const _bundleServiceItemHeader = {
      ...bundleServiceItemHeader,
      usage: itemRequestObj.usageType?.value || "",
      itemHeaderStrategy:
        itemRequestObj?.strategyTask?.value ||
        itemRequestObj?.strategyTask ||
        "EMPTY",
    };
    const _bundleServiceItemBody = {
      ...bundleServiceItemBody,
      itemBodyDescription: itemRequestObj.description,
      taskType: itemRequestObj.taskType,
      usageIn: itemRequestObj.usageIn,
      usage: itemRequestObj.usageType,
      year: itemPriceData.year,
      itemPrices: _itemPrice,
    };

    // console.log("editItemData ", editItemData);
    // console.log("itemRequestObj ", itemRequestObj);
    // console.log("itemPriceData ", itemPriceData);
    // console.log("isPortfolioItem ", isPortfolioItem);
    // console.log("isEditable ", isEditable);
    // console.log("_bundleServiceItemBody ", _bundleServiceItemBody);
    // console.log("_bundleServiceItemHeader ", _bundleServiceItemHeader);

    const _bundleServicePriceObj = { ...itemPriceData };

    setBundleServiceItemHeader({ ..._bundleServiceItemHeader });
    setBundleServiceItemBody({ ..._bundleServiceItemBody });
    setBundleServicePriceObj({
      ..._bundleServicePriceObj,
      taskType: [
        itemRequestObj.taskType?.value || itemRequestObj.taskType || "EMPTY",
      ],
      usageIn:
        itemRequestObj.usageIn?.value || itemRequestObj.usageIn || "EMPTY",
    });
    if (isEditable) {
      setActiveTab("bundleServicePrice");
    } else {
      handleCreateUpdateItem(
        _bundleServiceItemHeader,
        _bundleServiceItemBody,
        _bundleServicePriceObj
      );
    }
  };

  // Bundle/Service Administrative tab data
  const handleUpateAdministrativeData = async () => {
    try {
      if (bundleServiceEdit.bundleServiceAdministrative) {
        hideModel();
      } else {
        if (isEmpty(administrative.preparedBy)) {
          errorMessage(
            "Prepared By is a required field, you can’t leave it blank"
          );
          return;
        } else if (isEmpty(administrative.salesOffice?.value)) {
          errorMessage(
            "Sales Office/Branch is a required field, you can’t leave it blank"
          );
          return;
        } else if (isEmpty(administrative.offerValidity?.value)) {
          errorMessage(
            "Offer Validity is a required field, you can’t leave it blank"
          );
          return;
        }
        let serviceReqObj = {
          itemId: bundleServiceObj.itemId,
          itemName: bundleServiceObj.name,
          itemHeaderModel: {
            ...bundleServiceItemHeader,
            itemHeaderDescription: bundleServiceObj.description,
            bundleFlag: itemFlag === "BUNDLE" ? "BUNDLE_ITEM" : "SERVICE",
            reference: bundleServiceObj.reference,
            itemHeaderMake: bundleServiceObj.make,
            itemHeaderFamily: bundleServiceObj.family,
            model: bundleServiceObj.model,
            prefix: bundleServiceObj.prefix?.value || "",
            type: bundleServiceObj.machineComponent?.value || "EMPTY",
            estimatedTime: bundleServiceObj.estimatedTime,
            status: bundleServiceObj.status?.value || "DRAFT",
            itemHeaderCustomerSegment:
              bundleServiceObj.customerSegment?.value || "",
            preparedBy: administrative.preparedBy,
            approvedBy: administrative.approvedBy,
            preparedOn: administrative.preparedOn,
            revisedBy: administrative.revisedBy,
            revisedOn: administrative.revisedOn,
            salesOffice: administrative.salesOffice?.value || "",
            offerValidity: administrative.offerValidity?.value || "",
            serviceChargable:
              bundleServiceObj.serviceChargable?.value === "chargeable",
            serviceOptional: !(
              bundleServiceObj.serviceChargable?.value === "chargeable"
            ),
          },
          itemBodyModel: {
            ...bundleServiceItemBody,
            taskType: [
              bundleServiceItemBody.taskType?.value ||
                bundleServiceItemBody.taskType[0] ||
                "EMPTY",
            ],
            usageIn:
              bundleServiceItemBody.usageIn?.value ||
              bundleServiceItemBody.usageIn ||
              "EMPTY",
          },
        };

        if (itemId) {
          const updateService = await updateItemData(itemId, serviceReqObj);
          if (updateService.status === 200) {
            successMessage(bundleServiceObj.name + " Update Successfully.");
            setActiveTab("bundleServiceHeader");
            hideModel();
          }
        }
      }
    } catch (error) {
      return;
    }
  };

  // Save item price changes
  const handleSaveItemPriceChanges = async (
    requestItemObj,
    headerModelObj,
    bodyModelObj,
    editItem
  ) => {
    let itemRequestObj = {
      itemId: bundleServiceObj.itemId,
      itemName: bundleServiceObj.name,
      itemHeaderModel: {
        ...headerModelObj,
        itemHeaderDescription: bundleServiceObj.description,
        reference: bundleServiceObj.reference,
        itemHeaderMake: bundleServiceObj.make,
        itemHeaderFamily: bundleServiceObj.family,
        model: bundleServiceObj.model,
        prefix: bundleServiceObj.prefix?.value || "",
        type: bundleServiceObj.machineComponent?.value || "EMPTY",
        estimatedTime: bundleServiceObj.estimatedTime,
        itemHeaderCustomerSegment:
          bundleServiceObj.customerSegment?.value || "",
        preparedBy: administrative.preparedBy,
        approvedBy: administrative.approvedBy,
        preparedOn: administrative.preparedOn,
        revisedBy: administrative.revisedBy,
        revisedOn: administrative.revisedOn,
        salesOffice: administrative.salesOffice?.value || "",
        offerValidity: administrative.offerValidity?.value || "",
        serviceChargable:
          bundleServiceObj.serviceChargable?.value === "chargeable",
        serviceOptional: !(
          bundleServiceObj.serviceChargable?.value === "chargeable"
        ),
        currency:
          headerModelObj.currency?.value || headerModelObj.currency || "",
        usage: headerModelObj.usage?.value || headerModelObj.usage || "",
      },
      itemBodyModel: {
        ...bodyModelObj,
        usage: bodyModelObj.usage?.value || bodyModelObj.usage || "",
        year: bodyModelObj.year?.value || bodyModelObj.year || "",
      },
    };

    setBundleServiceItemBody({
      ...bundleServiceItemBody,
      usage: bodyModelObj.usage?.value || bodyModelObj.usage || "",
      year: bodyModelObj.year?.value || bodyModelObj.year || "",
      itemPrices: [...bodyModelObj["itemPrices"]],
    });

    setBundleServiceItemHeader({
      ...bundleServiceItemHeader,
      currency: headerModelObj.currency?.value || headerModelObj.currency || "",
      usage: headerModelObj.usage?.value || headerModelObj.usage || "",
    });

    if (!editItem) {
      const updateService = await updateItemData(itemId, itemRequestObj);
      if (updateService.status === 200) {
        successMessage(bundleServiceObj.name + " Update Successfully.");
        setActiveTab("bundleServiceAdministrative");
      }
    } else {
      setActiveTab("bundleServiceAdministrative");
    }
  };

  return (
    <Modal size="xl" show={show} onHide={hideModel}>
      <Modal.Body>
        {showLoader ? (
          <LoadingProgress />
        ) : (
          <Box sx={{ typography: "body1" }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  aria-label="lab API tabs example"
                  onChange={(e, tabValue) => setActiveTab(tabValue)}
                  // onChange={(e, newValue) => itemEditModeOn && setActiveTab(newValue)}
                >
                  <Tab
                    label={`${itemFlag} HEADER`}
                    value="bundleServiceHeader"
                  />
                  <div className="align-items-center d-flex justify-content-center">
                    <ArrowForwardIosIcon />
                  </div>
                  {itemFlag === "BUNDLE" && (
                    <Tab
                      label={`${itemFlag} ITEMS`}
                      value="bundleServiceItems"
                    />
                  )}
                  {itemFlag === "BUNDLE" && (
                    <div className="align-items-center d-flex justify-content-center">
                      <ArrowForwardIosIcon />
                    </div>
                  )}
                  <Tab label="PRICE CALCULATOR" value="bundleServicePrice" />
                  <div className="align-items-center d-flex justify-content-center">
                    <ArrowForwardIosIcon />
                  </div>
                  <Tab
                    label="ADMINISTRATIVE"
                    value="bundleServiceAdministrative"
                  />
                </TabList>
              </Box>
              <TabPanel value="bundleServiceHeader">
                <div className="container-fluid ">
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <div className="ml-3 green-custom-btn ">
                      {itemFlag === "SERVICE" && (
                        <Select
                          className={`customselectbtn1 p-${
                            bundleServiceEdit.bundleServiceHeader ? 0 : 2
                          } border-radius-10 ${
                            bundleServiceObj.serviceChargable?.value ==
                            "chargeable"
                              ? "bg-gray-light"
                              : "bg-green-light"
                          }`}
                          onChange={(e) =>
                            handleSelectChange(e, "serviceChargable")
                          }
                          options={serviceTypeKeyValuePairs}
                          value={bundleServiceObj.serviceChargable}
                          isDisabled={bundleServiceEdit.bundleServiceHeader}
                        />
                      )}
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="ml-3">
                        <Select
                          className="customselectbtn1"
                          onChange={(e) =>
                            handleSelectChange(e, "supportLevel")
                          }
                          options={supportLevelKeyValuePair}
                          value={bundleServiceObj.supportLevel}
                          isDisabled={bundleServiceEdit.bundleServiceHeader}
                        />
                      </div>
                      <div className="ml-3">
                        <Select
                          className="customselectbtn"
                          onChange={(e) => handleSelectChange(e, "status")}
                          options={portfolioStatusKeyValuePair}
                          value={bundleServiceObj.status}
                          isOptionDisabled={(option) =>
                            handleStatusOptionsDisable(option)
                          }
                          isDisabled={bundleServiceEdit.bundleServiceHeader}
                        />
                      </div>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={shareIcon} />
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={folderaddIcon} />
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={uploadIcon} />
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        {" "}
                        <img src={cpqIcon} />
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={deleteIcon} />
                      </a>
                      <a className="ml-3 font-size-14 cursor">
                        <img src={copyIcon} />
                      </a>
                      <a className="ml-2 cursor">
                        <MuiMenuComponent options={activityOptions} />
                      </a>
                    </div>
                  </div>
                  <div className="card p-4 mt-5">
                    <h5 className="d-flex align-items-center mb-0">
                      <div className="" style={{ display: "contents" }}>
                        <span className="mr-3">Header</span>
                        <a
                          className="btn-sm cursor"
                          onClick={() =>
                            handleBundleServiceEditFlag("bundleServiceHeader")
                          }
                          // onClick={makeBundleServiceHeaderEditable}
                        >
                          <i className="fa fa-pencil" aria-hidden="true" />
                        </a>
                        <a className="btn-sm cursor">
                          <i className="fa fa-bookmark-o" aria-hidden="true" />
                        </a>
                        <a className="btn-sm cursor">
                          <img style={{ width: "14px" }} src={folderaddIcon} />
                        </a>
                      </div>
                      <div className="input-group icons border-radius-10 border">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text bg-transparent border-0 pr-0 "
                            id="basic-addon1"
                          >
                            <img src={shearchIcon} />
                          </span>
                        </div>
                        <input
                          type="search"
                          className="form-control search-form-control"
                          aria-label="Search Dashboard"
                        />
                      </div>
                    </h5>
                    {bundleServiceEdit.bundleServiceHeader ? (
                      <div className="row mt-4 ">
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              {itemFlag} NAME
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmpty(bundleServiceObj.name)
                                ? "NA"
                                : bundleServiceObj.name}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              {itemFlag} DESCRIPTION
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmpty(bundleServiceObj.description)
                                ? "NA"
                                : bundleServiceObj.description}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              BUNDLE/SERVICE
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {itemFlag === "SERVICE"
                                ? "SERVICE"
                                : "BUNDLE_ITEM"}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              REFERENCE
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmpty(bundleServiceObj.reference)
                                ? "NA"
                                : bundleServiceObj.reference}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              CUSTOMER SEGMENT
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmptySelect(
                                bundleServiceObj.customerSegment?.value
                              )
                                ? "NA"
                                : bundleServiceObj.customerSegment?.label}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              MACHINE/COMPONENT
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmptySelect(
                                bundleServiceObj.machineComponent?.value
                              )
                                ? "NA"
                                : bundleServiceObj.machineComponent?.label}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group customselectmodelSerch">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              MODEL(S)
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmpty(bundleServiceObj.model)
                                ? "NA"
                                : bundleServiceObj.model}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              FAMILY
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmpty(bundleServiceObj.family)
                                ? "NA"
                                : bundleServiceObj.family}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              MAKE
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmpty(bundleServiceObj.make)
                                ? "NA"
                                : bundleServiceObj.make}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              PREFIX(S)
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmptySelect(bundleServiceObj.prefix?.value)
                                ? "NA"
                                : bundleServiceObj.prefix?.label}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                              ESTIMATED HOURS
                            </p>
                            <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                              {isEmpty(bundleServiceObj.estimatedTime)
                                ? "NA"
                                : bundleServiceObj.estimatedTime}
                            </h6>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row mt-4 input-fields">
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              {itemFlag} NAME
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="name"
                              placeholder="Name (Required*)"
                              onChange={handleTextChange}
                              value={bundleServiceObj.name}
                              disabled={bundleServiceObj.itemId !== 0}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              {itemFlag} DESCRIPTION
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="description"
                              placeholder="Description (Required*)"
                              value={bundleServiceObj.description}
                              onChange={handleTextChange}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              BUNDLE/SERVICE
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="bundleFlag"
                              placeholder="Bundle Flag"
                              value={
                                itemFlag === "SERVICE"
                                  ? "SERVICE"
                                  : "BUNDLE_ITEM"
                              }
                              onChange={handleTextChange}
                              disabled
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              REFERENCE
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="reference"
                              placeholder="Reference"
                              value={bundleServiceObj.reference}
                              onChange={handleTextChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              CUSTOMER SEGMENT
                            </label>
                            <Select
                              onChange={(e) =>
                                handleSelectChange(e, "customerSegment")
                              }
                              className="text-primary"
                              value={bundleServiceObj.customerSegment}
                              options={customerSegmentKeyValuePair}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              MACHINE/COMPONENT
                            </label>
                            <Select
                              onChange={(e) =>
                                handleSelectChange(e, "machineComponent")
                              }
                              value={bundleServiceObj.machineComponent}
                              className="text-primary"
                              options={machineComponentKeyValuePair}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group customselectmodelSerch">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              MODEL(S)
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="model"
                              placeholder="Model(Required*)"
                              value={bundleServiceObj.model}
                              onChange={(e) => {
                                handleTextChange(e);
                                handleModelSearch(e.target.value);
                              }}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                            {
                              <ul
                                className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`}
                                id="style"
                              >
                                {modelSearchList.length !== 0 &&
                                  modelSearchList.map((currentItem, j) => (
                                    <li
                                      className="list-group-item text-primary"
                                      key={j}
                                      onClick={() =>
                                        handleSelectModel(currentItem)
                                      }
                                    >
                                      {currentItem.model}
                                    </li>
                                  ))}
                              </ul>
                            }
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              FAMILY
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="make"
                              placeholder="Auto Fill Search Model...."
                              value={bundleServiceObj.family}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              MAKE
                            </label>
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10"
                              name="make"
                              placeholder="Auto Fill Search Model...."
                              value={bundleServiceObj.make}
                              onChange={handleTextChange}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                          <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                              PREFIX(S)
                            </label>
                            <Select
                              onChange={(e) => handleSelectChange(e, "prefix")}
                              className="text-primary"
                              value={bundleServiceObj.prefix}
                              options={prefixKeyValuePair}
                              noOptionsMessage={() =>
                                bundleServiceObj.model === 0
                                  ? "Search Modal First"
                                  : "No Options"
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">
                              ESTIMATED HOURS
                            </label>
                            <div
                              className=" d-flex form-control-date"
                              style={{ overflow: "hidden" }}
                            >
                              <input
                                type="number"
                                className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                name="estimatedTime"
                                onChange={handleTextChange}
                                value={bundleServiceObj.estimatedTime}
                              />
                              <span className="hours-div text-primary">
                                hours/day
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row" style={{ justifyContent: "right" }}>
                      <button
                        type="button"
                        className="btn text-white bg-primary"
                        onClick={handleBundleServiceHeader}
                      >
                        {bundleServiceEdit.bundleServiceHeader
                          ? "Next"
                          : "Save & Next"}
                      </button>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="bundleServiceItems">
                <ItemAddEdit
                  itemType="bundleItem"
                  isEditable={bundleServiceEdit.bundleServiceItems}
                  isPortfolioItem={false}
                  itemId={itemId}
                  reviewModeActive={reviewModeActive}
                  handleGetPortfolioItemsData={handleBundleServiceItems}
                />
              </TabPanel>
              <TabPanel value="bundleServicePrice">
                <ItemPriceCalculator
                  itemId={itemId}
                  reviewModeActive={reviewModeActive}
                  isEditable={bundleServiceEdit.bundleServicePrice}
                  handleSavePriceChanges={handleSaveItemPriceChanges}
                />
              </TabPanel>
              <TabPanel value="bundleServiceAdministrative">
                <div>
                  <div className="ligt-greey-bg p-3">
                    <div>
                      <span
                        className="mr-3 cursor"
                        onClick={() =>
                          handleBundleServiceEditFlag(
                            "bundleServiceAdministrative"
                          )
                        }
                      >
                        <i
                          className="fa fa-pencil font-size-12"
                          aria-hidden="true"
                        />
                        <span className="ml-2">Edit</span>
                      </span>
                    </div>
                  </div>
                  {bundleServiceEdit.bundleServiceAdministrative ? (
                    <div className="row mt-4">
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                            PREPARED BY
                          </p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {isEmpty(administrative.preparedBy)
                              ? "NA"
                              : administrative.preparedBy}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                            APPROVED BY
                          </p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {isEmpty(administrative.approvedBy)
                              ? "NA"
                              : administrative.preparedBy}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                            PREPARED ON
                          </p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {isEmpty(administrative.preparedOn)
                              ? "NA"
                              : getFormatDateTime(
                                  administrative.preparedOn,
                                  false
                                )}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                            REVISED BY
                          </p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {isEmpty(administrative.revisedBy)
                              ? "NA"
                              : administrative.revisedBy}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                            REVISED ON
                          </p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {isEmpty(administrative.revisedOn)
                              ? "NA"
                              : getFormatDateTime(
                                  administrative.revisedOn,
                                  false
                                )}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                            SALES OFFICE / BRANCH
                          </p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {isEmpty(administrative.salesOffice?.value)
                              ? "NA"
                              : administrative.salesOffice?.label}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <p className="text-light-dark font-size-12 font-weight-500 mb-2">
                            OFFER VALIDITY
                          </p>
                          <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                            {isEmpty(administrative.offerValidity?.value)
                              ? "NA"
                              : administrative.offerValidity?.label}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row mt-4  input-fields">
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-14 font-weight-500">
                            PREPARED BY
                          </label>
                          <input
                            type="text"
                            className="form-control text-primary border-radius-10"
                            name="preparedBy"
                            placeholder="Required (ex-abc@gmail.com)"
                            value={administrative.preparedBy}
                            onChange={(e) =>
                              handleAdministrativeTextChange(e, "text")
                            }
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-14 font-weight-500">
                            APPROVED BY
                          </label>
                          <input
                            type="text"
                            className="form-control text-primary border-radius-10"
                            name="approvedBy"
                            placeholder="Optional  (ex-abc@gmail.com)"
                            value={administrative.approvedBy}
                            onChange={(e) =>
                              handleAdministrativeTextChange(e, "text")
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <label className="text-light-dark font-size-14 font-weight-500">
                          PREPARED ON
                        </label>
                        <div className="d-flex align-items-center date-box w-100">
                          <div className="form-group w-100">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DatePicker
                                variant="inline"
                                format="dd/MM/yyyy"
                                className="form-controldate border-radius-10"
                                label=""
                                name="preparedOn"
                                value={administrative.preparedOn}
                                onChange={(e) =>
                                  handleAdministrativeTextChange(
                                    e,
                                    "date",
                                    "preparedOn"
                                  )
                                }
                              />
                            </MuiPickersUtilsProvider>
                            <div className="css-w8dmq8">*Mandatory</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-14 font-weight-500">
                            REVISED BY
                          </label>
                          <input
                            type="text"
                            className="form-control border-radius-10 text-primary"
                            name="revisedBy"
                            placeholder="Optional  (ex-abc@gmail.com)"
                            value={administrative.revisedBy}
                            onChange={(e) =>
                              handleAdministrativeTextChange(e, "text")
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-14 font-weight-500">
                            REVISED ON
                          </label>
                          <div className="d-flex align-items-center date-box w-100">
                            <div className="form-group w-100 m-0">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  className="form-controldate border-radius-10"
                                  label=""
                                  name="revisedOn"
                                  value={administrative.revisedOn}
                                  onChange={(e) =>
                                    handleAdministrativeTextChange(
                                      e,
                                      "date",
                                      "revisedOn"
                                    )
                                  }
                                />
                              </MuiPickersUtilsProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-14 font-weight-500">
                            {" "}
                            SALES OFFICE / BRANCH
                          </label>
                          <Select
                            className="text-primary"
                            options={salesOfficeKeyValuePairs}
                            onChange={(e) =>
                              handleAdministrativeTextChange(
                                e,
                                "select",
                                "salesOffice"
                              )
                            }
                            value={administrative.salesOffice}
                            styles={FONT_STYLE_SELECT}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4">
                        <div className="form-group">
                          <label className="text-light-dark font-size-14 font-weight-500">
                            OFFER VALIDITY
                          </label>
                          <Select
                            className="text-primary"
                            options={offerValidityKeyValuePairs}
                            onChange={(e) =>
                              handleAdministrativeTextChange(
                                e,
                                "select",
                                "offerValidity"
                              )
                            }
                            value={administrative.offerValidity}
                            styles={FONT_STYLE_SELECT}
                          />
                          <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="row" style={{ justifyContent: "right" }}>
                    <button
                      type="button"
                      className="btn text-white bg-primary"
                      onClick={handleUpateAdministrativeData}
                      // onClick={editBundleService ? saveAddNewServiceOrBundle : handleUpdateNewServiceOrBundle}
                    >
                      {" "}
                      {bundleServiceEdit.bundleServiceAdministrative
                        ? "Close"
                        : "Save & CLose"}
                    </button>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BundleServiceAddUpdate;

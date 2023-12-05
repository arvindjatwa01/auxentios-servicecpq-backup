import React, { useEffect } from "react";
import CustomPortfolioHeader from "./CustomPortfolioHeader";
import { useState } from "react";
import {
  defaultSupportLevel,
  defaultStatus,
  additionalPriceKeyValuePair,
  brackdownPrices,
  priceAgreementItemsKeyValuePair,
  salesOfficeKeyValuePairs,
  offerValidityKeyValuePairs,
} from "pages/PortfolioAndBundle/newCreatePortfolioData/itemConstant";
import folderAddIcon from "../../../assets/icons/svg/folder-add.svg";
import { SOLUTION_BUILDER_ANALYTICS } from "navigation/CONSTANTS";
import { useHistory } from "react-router-dom";
import {
  isEmpty,
  isEmptySelect,
} from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { Box, FormControlLabel, FormGroup, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Select from "react-select";
import {
  errorMessage,
  successMessage,
} from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import { useAppSelector } from "../../../app/hooks";
import $ from "jquery";
import editIcon from "../../../assets/icons/svg/edit.svg";
import shareIcon from "../../../assets/icons/svg/share.svg";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import {
  createCoverage,
  createPortfolio,
  getPortfolioCommonConfig,
  getSolutionPriceCommonConfig,
  getValidityKeyValue,
  portfolioPriceAgreementCreation,
  portfolioPriceCreation,
  updatePortfolio,
  updatePortfolioPrice,
} from "../../../services/index";
import { useDispatch } from "react-redux";
import {
  selectCategoryList,
  selectGeographicalList,
  selectProductList,
  selectResponseTimeList,
  selectStrategyTaskOption,
  selectUpdateList,
  selectUpdateTaskList,
  taskActions,
  selectSolutionTaskList,
  selectSolutionLevelList,
} from "pages/PortfolioAndBundle/customerSegment/strategySlice";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import { sparePartSearch } from "services/searchServices";
import { FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import SearchInputBox from "./useCase4Common/SearchInputBox";
import {
  CUSTOM_PORTFOLIO_URL,
  GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
  PORTFOLIO_PRICE_AGREEMENT_URL,
  PORTFOLIO_PRICE_CREATE,
  SEARCH_CUSTOMER,
} from "services/CONSTANTS";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { Switch } from "@material-ui/core";
import CustomPortfolioItemsList from "./customPortfolioItems/CustomPortfolioItemsList";
import {
  SEARCH_FLAG_CUSTOMER_SEARCH,
  defaultCustomPortfolioObj,
} from "./Use_Case_4_Constansts";
import LoadingProgress from "pages/Repair/components/Loader";
import CustomOptionalServicesModel from "./useCase4Common/CustomOptionalServicesModel";

const CustomPortfolioAddUpdate = (props) => {
  const {
    location: { state: portfolioRecordData },
    ...restProps
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const categoryUsageKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectCategoryList)
  );
  const strategyTaskKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectUpdateList)
  );
  const taskTypeKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectUpdateTaskList)
  );
  const responseTimeKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectResponseTimeList)
  );
  const productHierarchyKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectProductList)
  );
  const geographicKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectGeographicalList)
  );

  const solutionTypeKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectSolutionTaskList)
  );

  const solutionLevelKeyValuePair = useAppSelector(
    selectStrategyTaskOption(selectSolutionLevelList)
  );

  const [portfolioStatusKeyValuePair, setPortfolioStatusKeyValuePair] =
    useState([]);
  const [supportLevelKeyValuePair, setSupportLevelKeyValuePair] = useState([]);

  const [loading, setLoading] = useState(false);

  const [portfolioSupportLevel, setPortfolioSupportLevel] = useState({
    ...defaultSupportLevel,
  });
  const [portfolioStatus, setPortfolioStatus] = useState({ ...defaultStatus });
  const [isActivePortfolio, setIsActivePortfolio] = useState(false);

  const [customPortfolioRecordId, setCustomPortfolioRecordId] = useState(null);

  const [customItemsTableList, setCustomItemsTableList] = useState([]);
  const [customItemReviewTabItemList, setCustomItemReviewTabItemList] =
    useState([]);
  const [customItemIds, setCustomItemIds] = useState([]);

  // Optional Service
  const [checkedService, setCheckedService] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [inclusionService, setInclusionService] = useState([]);

  const [showOptionalServicesModal, setShowOptionalServicesModal] =
    useState(false);
  const [showSelectedServicesModal, setShowSelectedServicesModal] =
    useState(false);

  const [portfolioHeaderActiveTab, setPortfolioHeaderActiveTab] =
    useState("general");
  const [portfolioTabsEditView, setPortfolioTabsEditView] = useState({
    generalTabEdit: false,
    validityTabEdit: false,
    strategyTabEdit: false,
    priceTabEdit: false,
    priceAgreementTabEdit: false,
    coverageTabEdit: false,
    administrativeTabEdit: false,
  });

  const [isPriceAgreementDisable, setIsPriceAgreementDisable] = useState(false);
  const [customerSegmentKeyValuePair, setCustomerSegmentKeyValue] = useState(
    []
  );
  const [validityKeyValuePair, setValidityKeyValuePair] = useState([]);

  // Price tab Key-Value -pair list
  const [priceListKeyValuePair, setPriceListKeyValuePair] = useState([]);
  const [priceMethodKeyValuePair, setPriceMethodKeyValuePair] = useState([]);
  const [priceTypeKeyValuePair, setPriceTypeKeyValuePair] = useState([]);
  const [priceHeadTypeKeyValuePair, setPriceHeadTypeKeyValuePair] = useState(
    []
  );
  const [currencyKeyValuePair, setCurrencyKeyValuePair] = useState([]);

  const [customerSearchResult, setCustomerSearchResult] = useState([]);
  const [customerSearchNoOptions, setCustomerSearchNoOptions] = useState(false);
  const [generalTabData, setGeneralTabData] = useState({
    name: "",
    description: "",
    serviceDescription: "",
    externalReference: "",
    customerSegment: "",
    flagTemplate: false,
    flagCommerce: false,
  });

  const [generalTabCustomerData, setGeneralTabCustomerData] = useState({
    source: "User Generated",
    customerID: "",
    customerName: "",
    contactEmail: "",
    contactName: "",
    contactPhone: "",
    customerGroup: "",
  });

  const [validityTabData, setValidityTabData] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    from: null,
    to: null,
    fromInput: "",
    toInput: "",
    dateFlag: false,
    inputFlag: false,
  });

  const [strategyTabData, setStrategyTabData] = useState({
    categoryUsage: "",
    strategyTask: "",
    taskType: "",
    optionals: "",
    responseTime: "",
    productHierarchy: "",
    geographic: "",
    solutionType: "",
    solutionLevel: "",
  });

  const [priceTabData, setPriceTabData] = useState({
    portfolioPriceId: 0,
    priceList: "",
    priceMethod: "",
    priceDate: new Date(),
    priceType: "",
    netPrice: "",
    additionalPriceType: "",
    additionalPriceValue: "",
    priceEscalatonType: "",
    priceEscaltonValue: "",
    calculatedPrice: "",
    priceBreakDownType: "",
    priceBreakDownValue: "",
  });
  const [priceBrackdownValues, setPriceBrackdownValues] =
    useState(brackdownPrices);

  const [priceAgreementTableRow, setPriceAgreementTableRow] = useState([]);
  const [priceAgreementIds, setPriceAgreementIds] = useState([]);

  const [searchCustomCoverageData, setSearchCustomCoverageData] = useState([]);
  const [checkedCustomCoverageData, setCheckedCustomCoverageData] = useState(
    []
  );
  const [selectedCustomCoverageData, setSelectedCustomCoverageData] = useState(
    []
  );
  const [customPortfolioCoverageIds, setCustomPortfolioCoverageIds] = useState(
    []
  );

  const [administrativeTabData, setAdministrativeTabData] = useState({
    preparedBy: null,
    approvedBy: null,
    preparedOn: new Date(),
    revisedBy: null,
    revisedOn: new Date(),
    salesOffice: null,
    offerValidity: null,
  });

  useEffect(() => {
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

  useEffect(() => {
    // get Validity Key-Value Pair list
    getValidityKeyValue()
      .then((res) => {
        const validityOptions = [];
        res.map((d) => {
          if (d.key !== "EMPTY") {
            validityOptions.push({ value: d.key, label: d.value });
          }
        });
        setValidityKeyValuePair(validityOptions);
      })
      .catch((err) => {
        errorMessage(err);
      });

    // get Price-List key-value pair
    getSolutionPriceCommonConfig("price-list")
      .then((res) => {
        const priceListOptions = [];
        res.map((d) => {
          if (d.key != "EMPTY") {
            priceListOptions.push({ value: d.key, label: d.value });
          }
        });
        setPriceListKeyValuePair(priceListOptions);
      })
      .catch((err) => {
        errorMessage(err);
      });

    // get Price-method key-value Pair
    getSolutionPriceCommonConfig("price-method")
      .then((res) => {
        const priceMethodOptions = [];
        res.map((d) => {
          if (d.key != "EMPTY") {
            priceMethodOptions.push({ value: d.key, label: d.value });
          }
        });
        setPriceMethodKeyValuePair(priceMethodOptions);
      })
      .catch((err) => {
        errorMessage(err);
      });

    // get Price-Type key-value Pair
    getSolutionPriceCommonConfig("price-type")
      .then((res) => {
        const priceTypeOptions = [];
        res.map((d) => {
          if (d.key != "EMPTY") {
            priceTypeOptions.push({ value: d.key, label: d.value });
          }
        });
        setPriceTypeKeyValuePair(priceTypeOptions);
      })
      .catch((err) => {
        errorMessage(err);
      });

    //get price-head-type key-value pair
    getSolutionPriceCommonConfig("price-head-type")
      .then((res) => {
        const priceHeadTypeOptions = [];
        res.map((d) => {
          if (d.key != "EMPTY") {
            priceHeadTypeOptions.push({ value: d.key, label: d.value });
          }
        });
        setPriceHeadTypeKeyValuePair(priceHeadTypeOptions);
      })
      .catch((err) => {
        errorMessage(err);
      });

    //  get currency  key-value pair
    getSolutionPriceCommonConfig("currency")
      .then((res) => {
        const currencyOptions = [];
        res.length !== 0 &&
          res.map((d) => {
            if (d.key != "EMPTY") {
              currencyOptions.push({ value: d, label: d });
            }
          });
        setCurrencyKeyValuePair(currencyOptions);
      })
      .catch((err) => {
        errorMessage(err);
        return;
      });

    // get customer segment key value pair list
    getPortfolioCommonConfig("customer-segment")
      .then((res) => {
        const customerSegmentOptions = res.map((d) => ({
          value: d.key,
          label: d.value,
        }));
        setCustomerSegmentKeyValue(customerSegmentOptions);
      })
      .catch((err) => {
        errorMessage(err);
      });
  }, []);

  useEffect(() => {
    // existing Portfolio
    if (portfolioRecordData.type === "fetch") {
      setCustomPortfolioRecordId(portfolioRecordData.portfolioId);
      getCustomPortfolioDetails(portfolioRecordData.portfolioId);
    }
  }, [portfolioRecordData]);

  // get exisiting Solution (Custom Portfolio) details get by ApiCalling
  const getCustomPortfolioDetails = async (cutomPortfolioId) => {
    if (!isEmpty(cutomPortfolioId)) {
      setLoading(true);
      const rUrl = `${CUSTOM_PORTFOLIO_URL()}/${cutomPortfolioId}`;
      callGetApi(
        null,
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            intiliseCustomPortfolioDetails(response.data);
            const timeout = setTimeout(() => {
              setLoading(false);
            }, 2000); // 5000 milliseconds = 5 seconds

            // Cleanup the timeout to avoid memory leaks
            return () => clearTimeout(timeout);
          } else {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
        }
      );
    }
  };

  // map and set the initial data of Solution(Custom Portfolio)
  const intiliseCustomPortfolioDetails = (recordData) => {
    // set Portfolio Support Level
    const _portfolioSupportLevel = supportLevelKeyValuePair.find(
      (obj) => obj.value === recordData.supportLevel
    );
    setPortfolioSupportLevel(_portfolioSupportLevel || "");

    // set Portfolio Status
    const _portfolioStatus = portfolioStatusKeyValuePair.find(
      (obj) => obj.value === recordData.status
    );
    setPortfolioStatus(_portfolioStatus || "");

    // set Portfolio Tab Edit Mode true
    setPortfolioTabsEditView({
      generalTabEdit: true,
      validityTabEdit: true,
      strategyTabEdit: true,
      priceTabEdit: true,
      priceAgreementTabEdit: true,
      coverageTabEdit: true,
      administrativeTabEdit: true,
    });

    // set General Tab data
    setGeneralTabData({
      ...generalTabData,
      name: recordData.name || "",
      description: recordData.description || "",
      serviceDescription: "",
      externalReference: recordData.externalReference || "",
      customerSegment:
        customerSegmentKeyValuePair.find(
          (obj) => obj.value === recordData.customerSegment
        ) || "",
      flagTemplate: recordData.template,
      flagCommerce: recordData.visibleInCommerce,
    });

    // fetch and set the Custom Details
    if (!isEmpty(recordData.customerId)) {
      handleFetchExistingCustomerDetails(recordData.customerId);
    }

    // set Validity Tab data
    setValidityTabData({
      fromDate: recordData.validFrom,
      toDate: recordData.validTo,
      from:
        validityKeyValuePair.find((obj) => obj.value === recordData.unit) || "",
      to: null,
      fromInput: recordData.startUsage,
      toInput: recordData.endUsage,
      dateFlag: true,
      inputFlag: false,
    });

    // Response Time
    const _responseTime = responseTimeKeyValuePair.find(
      (obj) => obj.value === recordData.responseTime
    );

    // Prouct Hirerarchy
    const _productHierarchy = productHierarchyKeyValuePair.find(
      (obj) => obj.value === recordData.productHierarchy
    );

    // Geograpic
    const _geographic = geographicKeyValuePair.find(
      (obj) => obj.value === recordData.geographic
    );
    // Solution Type
    const _solutionType = solutionTypeKeyValuePair.find(
      (obj) =>
        obj.value === recordData.solutionType &&
        recordData.solutionType !== "EMPTY"
    );

    // Solution Value
    const _solutionValue = solutionLevelKeyValuePair.find(
      (obj) =>
        obj.value === recordData.solutionLevel &&
        recordData.solutionLevel !== "EMPTY"
    );

    // Set Strategy Tab data
    setStrategyTabData({
      // categoryUsage: _categoryUsage || "",
      // strategyTask: _strategyTask || "",
      // taskType: _taskType || "",
      categoryUsage: "",
      strategyTask: "",
      taskType: "",
      optionals: "",
      responseTime: _responseTime || "",
      productHierarchy: _productHierarchy || "",
      geographic: _geographic || "",
      solutionType: _solutionType || "",
      solutionLevel: _solutionValue || "",
    });

    // administrative sales office
    const _salesOffice = salesOfficeKeyValuePairs.find(
      (obj) => obj.value === recordData.salesOffice
    );

    // administrative offer Validity
    const _offerValidity = offerValidityKeyValuePairs.find(
      (obj) => obj.value === recordData.offerValidity
    );

    // Set Administrative Tab data
    setAdministrativeTabData({
      preparedBy: recordData.preparedBy,
      approvedBy: recordData.approvedBy,
      preparedOn: recordData.preparedOn,
      revisedBy: recordData.revisedBy,
      revisedOn: recordData.revisedOn,
      salesOffice: _salesOffice || "",
      offerValidity: _offerValidity || "",
    });

    if (
      recordData.portfolioPrice &&
      Object.keys(recordData.portfolioPrice).length !== 0
    ) {
      // Price List
      const _priceList = priceListKeyValuePair.find(
        (obj) => obj.value === recordData.portfolioPrice?.priceList
      );

      // Price Method
      const _priceMethod = priceMethodKeyValuePair.find(
        (obj) => obj.value === recordData.portfolioPrice?.priceMethod
      );

      // Price Type
      const _priceType = priceTypeKeyValuePair.find(
        (obj) => obj.value === recordData.portfolioPrice?.priceType
      );

      // Set Price Tab Data
      setPriceTabData({
        portfolioPriceId: recordData.portfolioPrice?.portfolioPriceId || 0,
        priceList: _priceList || "",
        priceMethod: _priceMethod || "",
        priceDate: recordData.portfolioPrice?.priceDate,
        priceType: _priceType || "",
        netPrice: recordData.portfolioPrice?.price,
        additionalPriceType: "",
        additionalPriceValue: "",
        priceEscalatonType: "",
        priceEscaltonValue: "",
        calculatedPrice: recordData.portfolioPrice?.calculatedPrice,
        priceBreakDownType: priceHeadTypeKeyValuePair[0],
        priceBreakDownValue: "",
      });

      // set Portfolio Price brackdown Values
      setPriceBrackdownValues({
        sparePartsPrice: recordData.portfolioPrice?.sparePartsPrice,
        labourPrice: recordData.portfolioPrice?.labourPrice,
        miscPrice: recordData.portfolioPrice?.miscPrice,
        servicePrice: recordData.portfolioPrice?.servicePrice,
      });
    }

    // Set Portfolio Coverage Id's
    const _customPortfolioCoverageIds = recordData.customCoverages.map(
      (obj) => {
        return { coverageId: obj.customCoverageId };
      }
    );
    setCustomPortfolioCoverageIds(_customPortfolioCoverageIds);

    // set Coverage Data
    setSelectedCustomCoverageData(recordData.customCoverages);

    // Map|Fetch the Portfolio Items for Table List
    fetchCustomPortfolioItemsTableList(
      recordData.customItems,
      recordData.customPortfolioId
    );
  };

  // fetch the existing customer Details
  const handleFetchExistingCustomerDetails = async (customerId) => {
    const rUrl = SEARCH_CUSTOMER(`customerId~${customerId}`);
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const customerRes = response.data[0];
        setGeneralTabCustomerData({
          ...generalTabCustomerData,
          customerID: customerRes.customerId,
          contactEmail: customerRes.email,
          customerGroup: customerRes.customerGroup,
          customerName: customerRes.fullName,
        });
      }
    });
  };

  // get Portfolio Items data
  const fetchCustomPortfolioItemsTableList = async (
    items = [],
    portfolioId = null
  ) => {
    let rUrl = GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE;
    if (items.length !== 0) {
      const shortedItems = items.sort(
        (itemA, itemB) => itemA.customItemId - itemB.customItemId
      );

      //  set Portfolio Item Ids data
      const _portfolioItemsIds = shortedItems.map((item) => ({
        customItemId: item.customItemId,
      }));
      setCustomItemIds(_portfolioItemsIds);

      rUrl =
        rUrl +
        shortedItems.map((item) => `itemIds=${item.customItemId}`).join("&");
      if (!isEmpty(portfolioId)) {
        rUrl = rUrl + "&portfolio_id=" + portfolioId;
      }
      await callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const res = response.data;
          const _portfolioItems = [];

          res.map((data) => {
            let portfolioBundleService = []; // Create a new array for each data object

            for (let i = 0; i < data.bundleItems.length; i++) {
              portfolioBundleService.push(data.bundleItems[i]);
            }

            for (let j = 0; j < data.serviceItems.length; j++) {
              portfolioBundleService.push(data.serviceItems[j]);
            }

            if (
              data.portfolioItem &&
              Object.keys(data.portfolioItem).length !== 0
            ) {
              _portfolioItems.push({
                ...data.portfolioItem,
                associatedServiceOrBundle: portfolioBundleService,
              });
            }
          });
          setCustomItemsTableList(_portfolioItems);
          setCustomItemReviewTabItemList(_portfolioItems);
        }
      });
    }
  };

  // handle portfolio tabs edit flag
  const handlePortfolioHeaderTabDataViews = () => {
    try {
      if (portfolioStatus.value === "ACTIVE") {
        errorMessage(
          `The Solution data cannot be changed on active status, change to revise status to edit`
        );
      } else {
        if (
          portfolioHeaderActiveTab === "general" &&
          portfolioTabsEditView.generalTabEdit
        ) {
          setPortfolioTabsEditView({
            ...portfolioTabsEditView,
            generalTabEdit: false,
          });
        } else if (
          portfolioHeaderActiveTab === "validity" &&
          portfolioTabsEditView.validityTabEdit
        ) {
          setPortfolioTabsEditView({
            ...portfolioTabsEditView,
            validityTabEdit: false,
          });
        } else if (
          portfolioHeaderActiveTab === "strategy" &&
          portfolioTabsEditView.strategyTabEdit
        ) {
          setPortfolioTabsEditView({
            ...portfolioTabsEditView,
            strategyTabEdit: false,
          });
        } else if (
          portfolioHeaderActiveTab === "administrative" &&
          portfolioTabsEditView.administrativeTabEdit
        ) {
          setPortfolioTabsEditView({
            ...portfolioTabsEditView,
            administrativeTabEdit: false,
          });
        } else if (
          portfolioHeaderActiveTab === "price" &&
          portfolioTabsEditView.priceTabEdit
        ) {
          setPortfolioTabsEditView({
            ...portfolioTabsEditView,
            priceTabEdit: false,
          });
        }
      }
    } catch (error) {
      return;
    }
  };

  // Go back to Recent Portfolio Screen
  const goBackToRecentSolutions = () => {
    history.push({
      pathname: SOLUTION_BUILDER_ANALYTICS,
    });
  };

  // Change Portfolio tabs
  const handleTabChange = (e, value) => {
    setPortfolioHeaderActiveTab(value);
  };

  // handle general Tab input data change
  const handleGeneralTabTextChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setGeneralTabData({ ...generalTabData, [name]: checked });
    } else {
      setGeneralTabData({ ...generalTabData, [name]: value });
    }
  };

  // handle validity Tab input data change
  const handleValidityTabTextChange = (e, keyName, type) => {
    const _validityTabData = { ...validityTabData };
    if (type == "date") {
      // setValidityTabData(prev => ({...prev, inputFlag: false, [keyName]: e.toISOString().substring(0, 10)}))
      _validityTabData.inputFlag = false;
      _validityTabData[keyName] = e.toISOString().substring(0, 10);
      if (keyName === "toDate") {
        _validityTabData.dateFlag = true;
      }
    } else if (type == "select") {
      _validityTabData[keyName] = e;
    } else if (type === "text") {
      _validityTabData[keyName] = e;
      if (keyName === "fromInput") {
        _validityTabData.dateFlag = false;
      }
    }
    setValidityTabData(_validityTabData);
  };

  //  handle strategy tab input data change
  const handleStrategyTabSelectChange = (e, keyName) => {
    try {
      const _strategyTabData = { ...strategyTabData };
      _strategyTabData[keyName] = e;
      if (keyName === "categoryUsage") {
        _strategyTabData.strategyTask = "";
        _strategyTabData.taskType = "";
        dispatch(taskActions.updateList(e.value));
      }

      if (keyName === "strategyTask") {
        _strategyTabData.taskType = "";
        dispatch(taskActions.updateTask(e.value));
      }
      setStrategyTabData(_strategyTabData);
    } catch (error) {
      return;
    }
  };

  // handle price tab input data change
  const handlePriceTabTextChange = (e, type, keyName) => {
    if (type === "text") {
      setPriceTabData({ ...priceTabData, [keyName]: e.target.value });
    } else {
      setPriceTabData({ ...priceTabData, [keyName]: e });
    }
  };

  // Price Agreement tab Actions
  // Add new Rows
  const handleAddNewPriceAgreementRow = () => {
    setPriceAgreementTableRow([
      ...priceAgreementTableRow,
      {
        id: priceAgreementTableRow.length + 1,
        itemType: "",
        itemTypeKeyValue: "",
        selectOptions: [],
        itemNumber: "",
        specialPrice: 0,
        discount: 0,
        absoluteDiscount: 0,
      },
    ]);
  };

  // Remove selected Row
  const handleRemovePriceAgreementRow = (i) => {
    var _priceAgreementTableRow = [...priceAgreementTableRow];
    _priceAgreementTableRow.splice(i, 1);
    setPriceAgreementTableRow(_priceAgreementTableRow);
  };

  //handle table input text change
  const handlePriceAgreementData = (e, i, type) => {
    var _priceAgreementTableRow = [...priceAgreementTableRow];
    var selectedRow = priceAgreementTableRow[i];

    if (type === "select") {
      selectedRow = { ...selectedRow, itemType: e.value, itemTypeKeyValue: e };
    } else if (type === "text") {
      selectedRow = { ...selectedRow, [e.target.name]: e.target.value };
    } else if (type === "number") {
      if (e.target.value < 0) {
        return;
      }
      selectedRow = { ...selectedRow, [e.target.name]: e.target.value };
    }
    // priceAgreementTableRow[i] = selectedRow;
    _priceAgreementTableRow.splice(i, 1, selectedRow);
    setPriceAgreementTableRow(_priceAgreementTableRow);
  };

  // Search Item number for parts
  const handleItemNumberSearch = async (e, i) => {
    try {
      let tempArray = [...priceAgreementTableRow];
      let obj = tempArray[i];
      obj.itemNumber = e.target.value;
      if (obj.itemType === "") {
        throw "Select Item Type First.";
      }
      if (obj.itemType === "PARTS") {
        let searchString = "partNumber~" + e.target.value;
        sparePartSearch(searchString)
          .then((res) => {
            obj.selectOptions = res;
            tempArray[i] = obj;
            setPriceAgreementTableRow([...tempArray]);
            $(`.scrollbar-${i}`).css("display", "block");
          })
          .catch((err) => {
            return;
          });

        obj.itemNumber = e.target.value;
      } else {
        obj.itemNumber = e.target.value;
        tempArray[i] = obj;
        setPriceAgreementTableRow([...tempArray]);
      }
    } catch (error) {
      errorMessage(error);
    }
  };

  // Select search item number
  const handleSearchItemNumberListClick = (currentItem, i) => {
    let tempArray = [...priceAgreementTableRow];
    let obj = tempArray[i];
    obj.itemNumber = currentItem;
    tempArray[i] = obj;
    setPriceAgreementTableRow([...tempArray]);
    $(`.scrollbar-${i}`).css("display", "none");
  };

  // Administrative tab text change
  const handleAdministrativeTabTextChange = (e, keyName, type) => {
    if (type === "text") {
      setAdministrativeTabData({
        ...administrativeTabData,
        [keyName]: e.target.value,
      });
    } else if (type === "date") {
      setAdministrativeTabData({ ...administrativeTabData, [keyName]: e });
    } else if (type === "select") {
      setAdministrativeTabData({ ...administrativeTabData, [keyName]: e });
    }
  };

  // Change tab
  const handleTabSelectChange = (e, tabType, keyName) => {
    if (tabType === "general") {
      setGeneralTabData({ ...generalTabData, [keyName]: e });
    }
  };

  // handle Customer Search
  const handleCustomerSearch = async (e) => {
    const { value } = e.target;
    setCustomerSearchNoOptions(true);
    setGeneralTabCustomerData({
      ...generalTabCustomerData,
      customerID: value,
    });
    // generalTabCustomerData.customerID = value;
    if (!isEmpty(value) && value.length !== 0) {
      const rUrl = SEARCH_CUSTOMER(`customerId~${value}`);
      callGetApi(
        null,
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            setCustomerSearchResult(response.data);
          } else {
            errorMessage(response?.data?.mesage);
          }
        },
        (error) => {
          errorMessage(error);
        }
      );
    }
  };

  // handle Selected Searched Customer
  const handleCutomerSelect = (selectRes) => {
    setCustomerSearchNoOptions(false);
    setGeneralTabCustomerData({
      ...generalTabCustomerData,
      customerID: selectRes.customerId,
      contactEmail: selectRes.email,
      contactName: selectRes.contactName,
      customerGroup: selectRes.customerGroup,
      customerName: selectRes.fullName,
    });
    setCustomerSearchResult([]);
  };

  // Solution Header General tab data
  const viewGeneralTabData = () => {
    return (
      <>
        {!portfolioTabsEditView.generalTabEdit ? (
          <>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SOLUTION CODE
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control text-primary border-radius-10"
                    placeholder="Name"
                    value={generalTabData.name}
                    onChange={handleGeneralTabTextChange}
                    disabled={isEmpty(customPortfolioRecordId) ? false : true}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SOLUTION DESCRIPTION
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    name="description"
                    placeholder="Optional"
                    value={generalTabData.description}
                    onChange={handleGeneralTabTextChange}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CUSTOMER ID
                  </label>
                  <div
                    class="form-group w-100 customerIdSearch"
                    style={{ position: "relative" }}
                  >
                    <SearchInputBox
                      value={generalTabCustomerData.customerID}
                      placeHolder="Search Customer"
                      searchType="customerId"
                      handleSearch={handleCustomerSearch}
                      searchResult={customerSearchResult}
                      handleSelectSearchResult={handleCutomerSelect}
                      noOptions={customerSearchNoOptions}
                      searchFlag={SEARCH_FLAG_CUSTOMER_SEARCH}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CUSTOMER NAME
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    name="customerName"
                    placeholder="Customer Name"
                    value={generalTabCustomerData.customerName}
                    disabled
                    // onChange={handleGeneralTabTextChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CUSTOMER EMAIL
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    name="contactEmail"
                    placeholder="Customer Email"
                    value={generalTabCustomerData.contactEmail}
                    disabled
                    // onChange={handleGeneralTabTextChange}
                  />
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    REFERENCE
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    name="externalReference"
                    placeholder="Reference"
                    value={generalTabData.externalReference}
                    onChange={handleGeneralTabTextChange}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CUSTOMER GROUP
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    name="customerGroup"
                    placeholder="Customer Group"
                    value={generalTabCustomerData.customerGroup}
                    disabled
                    // onChange={handleGeneralTabTextChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CUSTOMER SEGMENT
                  </label>
                  <Select
                    onChange={(e) =>
                      handleTabSelectChange(e, "general", "customerSegment")
                    }
                    className="text-primary"
                    value={generalTabData.customerSegment}
                    options={customerSegmentKeyValuePair}
                    placeholder="Optionals"
                  />
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4 d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch checked={generalTabData.flagTemplate} />
                        }
                        name="flagTemplate"
                        label=" FLAG FOR TEMPLATE"
                        value={generalTabData.flagTemplate}
                        onChange={handleGeneralTabTextChange}
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4 d-flex justify-content-between align-items-center">
                <div className=" d-flex justify-content-between align-items-center">
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch checked={generalTabData.flagCommerce} />
                        }
                        name="flagCommerce"
                        label=" FLAG FOR COMMERCE"
                        value={generalTabData.flagCommerce}
                        onChange={handleGeneralTabTextChange}
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "right" }}>
              <button
                type="button"
                onClick={handleNextClick}
                className="btn btn-light"
                id="general"
              >
                Save & Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row mt-4">
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    SOLUTION CODE
                  </p>
                  <h6 className="font-weight-500 text-primary font-size-17">
                    {isEmpty(generalTabData.name) ? "NA" : generalTabData.name}
                  </h6>
                </div>
              </div>
              <div className="col-md-6 col-sm-5">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    SOLUTION DESCRIPTION
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(generalTabData.description)
                      ? "NA"
                      : generalTabData.description}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    CUSTOMER ID
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(generalTabCustomerData.customerID)
                      ? "NA"
                      : generalTabCustomerData.customerID}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    CUSTOMER NAME
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(generalTabCustomerData.customerName)
                      ? "NA"
                      : generalTabCustomerData.customerName}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    CUSTOMER EMAIL
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(generalTabCustomerData.contactEmail)
                      ? "NA"
                      : generalTabCustomerData.contactEmail}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    {" "}
                    REFERENCE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(generalTabData.externalReference)
                      ? "NA"
                      : generalTabData.externalReference}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    {" "}
                    CUSTOMER GROUP
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(generalTabCustomerData.customerGroup)
                      ? "NA"
                      : generalTabCustomerData.customerGroup}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    CUSTOMER SEGMENT
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(generalTabData.customerSegment?.value)
                      ? "NA"
                      : generalTabData.customerSegment?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    FLAG FOR TEMPLATE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {generalTabData.flagTemplate ? "YES" : "NO"}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    FLAG FOR COMMERCE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {generalTabData.flagCommerce ? "YES" : "NO"}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  // Solution Header Validaty tab data
  const viewValidityTabData = () => {
    return (
      <>
        <div className="row mt-4 input-fields">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="d-flex align-items-center date-box">
                  <label
                    className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                    htmlFor="exampleInputEmail1"
                  >
                    <span className=" mr-2">FROM</span>
                  </label>
                  <div className="form-group w-100">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        variant="inline"
                        format="dd/MM/yyyy"
                        className={`form-controldate text-primary border-radius-10 ${
                          portfolioTabsEditView.validityTabEdit
                            ? "dateNotEditable"
                            : ""
                        }`}
                        label=""
                        value={validityTabData.fromDate}
                        onChange={(e) =>
                          handleValidityTabTextChange(e, "fromDate", "date")
                        }
                        readOnly={portfolioTabsEditView.validityTabEdit}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <label
                    className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                    htmlFor="exampleInputEmail1"
                  >
                    TO
                  </label>
                  <div className="form-group w-100">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        variant="inline"
                        className={`form-controldate text-primary border-radius-10 ${
                          portfolioTabsEditView.validityTabEdit
                            ? "dateNotEditable"
                            : ""
                        }`}
                        label=""
                        format="dd/MM/yyyy"
                        value={validityTabData.toDate}
                        onChange={(e) =>
                          handleValidityTabTextChange(e, "toDate", "date")
                        }
                        readOnly={portfolioTabsEditView.validityTabEdit}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ textAlign: "center", margin: "8px" }}>
              <div className="col-6">
                <h6 className="font-weight-500">OR</h6>
              </div>
              <div className="col-6"></div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center date-box w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                      htmlFor="exampleInputEmail1"
                    >
                      <span className="mr-2">FROM</span>
                    </label>
                    <div className="form-group w-100">
                      <div className=" d-flex form-control-date ">
                        <Select
                          className="select-input text-primary"
                          value={validityTabData.from}
                          onChange={(e) =>
                            handleValidityTabTextChange(e, "from", "select")
                          }
                          options={validityKeyValuePair}
                          placeholder="Select "
                          isDisabled={portfolioTabsEditView.validityTabEdit}
                        />
                        <div>
                          <input
                            type="text"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                            id="fromInput"
                            aria-describedby="emailHelp"
                            placeholder="From"
                            value={validityTabData.fromInput}
                            onChange={(e) =>
                              handleValidityTabTextChange(
                                e.target.value,
                                "fromInput",
                                "text"
                              )
                            }
                            disabled={portfolioTabsEditView.validityTabEdit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center date-box w-100">
                    <label
                      className="text-light-dark font-size-12 font-weight-500  mx-2 form-group"
                      htmlFor="exampleInputEmail1"
                    >
                      <span className="">TO</span>
                    </label>
                    <div className="form-group w-100">
                      <div className=" d-flex form-control-date">
                        <Select
                          className="select-input"
                          value={validityTabData.from}
                          onChange={(e) =>
                            handleValidityTabTextChange(
                              e.target.value,
                              "to",
                              "text"
                            )
                          }
                          isDisabled={true}
                          options={validityKeyValuePair}
                          placeholder="Select "
                          // isDisabled={portfolioTabsEditView.validityTabEdit}
                        />
                        <div>
                          <input
                            type="email"
                            className="form-control rounded-top-left-0 rounded-bottom-left-0"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder=""
                            value={validityTabData.toInput}
                            onChange={(e) =>
                              setValidityTabData({
                                ...validityTabData,
                                toInput: e.target.value,
                                dateFlag: false,
                                inputFlag: true,
                              })
                            }
                            disabled={portfolioTabsEditView.validityTabEdit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!portfolioTabsEditView.validityTabEdit && (
          <div className="row" style={{ justifyContent: "right" }}>
            <button
              type="button"
              onClick={handleNextClick}
              className="btn btn-light"
              id="validity"
            >
              {" "}
              Save & Next
            </button>
          </div>
        )}
      </>
    );
  };

  // Solution Header Strategy tab data
  const viewStrategyTabData = () => {
    return (
      <>
        {!portfolioTabsEditView.strategyTabEdit ? (
          <>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {" "}
                    RESPONSE TIME{" "}
                  </label>
                  <Select
                    placeholder="Optional"
                    options={responseTimeKeyValuePair}
                    className="text-primary"
                    value={strategyTabData.responseTime}
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "responseTime")
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {" "}
                    PRODUCT HIERARCHY{" "}
                  </label>
                  <Select
                    placeholder="Optional"
                    options={productHierarchyKeyValuePair}
                    className="text-primary"
                    value={strategyTabData.productHierarchy}
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "productHierarchy")
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    GEOGRAPHIC{" "}
                  </label>
                  <Select
                    placeholder="Optional"
                    options={geographicKeyValuePair}
                    className="text-primary"
                    value={strategyTabData.geographic}
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "geographic")
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SOLUTION TYPE{" "}
                  </label>
                  <Select
                    options={solutionTypeKeyValuePair}
                    className="text-primary"
                    value={strategyTabData.solutionType}
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "solutionType")
                    }
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SOLUTION LEVEL{" "}
                  </label>
                  <Select
                    options={solutionLevelKeyValuePair}
                    className="text-primary"
                    value={strategyTabData.solutionLevel}
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "solutionLevel")
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "right" }}>
              <button
                type="button"
                onClick={handleNextClick}
                className="btn btn-light"
                id="strategy"
              >
                Save & Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    RESPONSE TIME
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.responseTime?.value)
                      ? "NA"
                      : strategyTabData?.responseTime?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PRODUCT HIERARCHY
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.productHierarchy?.value)
                      ? "NA"
                      : strategyTabData?.productHierarchy?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    GEOGRAPHIC
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.geographic?.value)
                      ? "NA"
                      : strategyTabData?.geographic?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    SOLUTION TYPE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.solutionType?.value)
                      ? "NA"
                      : strategyTabData?.solutionType?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    SOLUTION LEVEL
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.solutionLevel?.value)
                      ? "NA"
                      : strategyTabData?.solutionLevel?.label}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  // Solution Header Price tab data
  const viewPriceTabData = () => {
    return (
      <>
        {!portfolioTabsEditView.priceTabEdit ? (
          <>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    PRICE LIST{" "}
                  </label>
                  <Select
                    onChange={(e) =>
                      handlePriceTabTextChange(e, "select", "priceList")
                    }
                    className="text-primary"
                    options={priceListKeyValuePair}
                    placeholder="placeholder (Optional)"
                    value={priceTabData.priceList}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    {" "}
                    PRICE METHOD
                  </label>
                  <Select
                    className="text-primary"
                    onChange={(e) =>
                      handlePriceTabTextChange(e, "select", "priceMethod")
                    }
                    options={priceMethodKeyValuePair}
                    placeholder="required"
                    value={priceTabData.priceMethod}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    PRICE DATE
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
                          value={priceTabData.priceDate}
                          onChange={(e) =>
                            handlePriceTabTextChange(e, "date", "priceDate")
                          }
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    PRICE TYPE
                  </label>
                  <Select
                    className="text-primary"
                    onChange={(e) =>
                      handlePriceTabTextChange(e, "select", "priceType")
                    }
                    options={priceTypeKeyValuePair}
                    placeholder="placeholder (Optional)"
                    value={priceTabData.priceType}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    {" "}
                    NET PRICE{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    placeholder="Optional"
                    value={priceTabData.netPrice}
                    disabled
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group date-box">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    ADDITIONAL{" "}
                  </label>
                  <div className=" d-flex form-control-date">
                    <div className="">
                      <Select
                        onChange={(e) =>
                          handlePriceTabTextChange(
                            e,
                            "select",
                            "additionalPriceType"
                          )
                        }
                        className="text-primary"
                        options={additionalPriceKeyValuePair}
                        placeholder="Select"
                        value={priceTabData.additionalPriceType}
                      />
                    </div>
                    <input
                      type="text"
                      className="form-control rounded-top-left-0 text-primary rounded-bottom-left-0"
                      placeholder="optional"
                      value={priceTabData.additionalPriceValue}
                      onChange={(e) =>
                        handlePriceTabTextChange(
                          e,
                          "text",
                          "additionalPriceValue"
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="form-group date-box">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PRICE ESCALATON
                  </label>
                  <div className=" d-flex align-items-center form-control-date">
                    <Select
                      className="select-input text-primary"
                      onChange={(e) =>
                        handlePriceTabTextChange(
                          e,
                          "select",
                          "priceEscalatonType"
                        )
                      }
                      options={priceHeadTypeKeyValuePair}
                      placeholder="Select "
                      value={priceTabData.priceEscalatonType}
                    />
                    <input
                      type="text"
                      className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                      placeholder="optional"
                      value={priceTabData.priceEscaltonValue}
                      onChange={(e) =>
                        handlePriceTabTextChange(
                          e,
                          "text",
                          "priceEscaltonValue"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CALCULATED PRICE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    disabled
                    value={priceTabData.calculatedPrice}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group date-box">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PRICE BREAK DOWN{" "}
                  </label>
                  <div className=" d-flex form-control-date">
                    <Select
                      className="select-input text-primary"
                      // onChange={setSelectedOption}
                      onChange={(e) =>
                        handlePriceTabTextChange(
                          e,
                          "select",
                          "priceBreakDownType"
                        )
                      }
                      options={priceHeadTypeKeyValuePair}
                      placeholder="Select "
                      value={priceTabData.priceBreakDownType}
                    />
                    <input
                      type="text"
                      className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                      placeholder="optional"
                      // value={priceTabData.priceBreakDownValue}
                      value={
                        priceTabData.priceBreakDownType?.value === "PARTS"
                          ? priceBrackdownValues.sparePartsPrice
                          : priceTabData.priceBreakDownType?.value === "LABOR"
                          ? priceBrackdownValues.labourPrice
                          : priceTabData.priceBreakDownType?.value ===
                            "MISCELLANEOUS"
                          ? priceBrackdownValues.miscPrice
                          : priceTabData.priceBreakDownType?.value === "SERVICE"
                          ? priceBrackdownValues.servicePrice
                          : 0
                      }
                      onChange={(e) =>
                        handlePriceTabTextChange(
                          e,
                          "text",
                          "priceBreakDownValue"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "right" }}>
              <button
                type="button"
                onClick={handleNextClick}
                className="btn btn-light"
                id="price"
              >
                {" "}
                Save & Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PRICE LIST
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(priceTabData.priceList?.value)
                      ? "NA"
                      : priceTabData?.priceList?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PRICE METHOD
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(priceTabData.priceMethod?.value)
                      ? "NA"
                      : priceTabData?.priceMethod?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PRICE DATE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(priceTabData.priceDate)
                      ? "NA"
                      : getFormatDateTime(priceTabData.priceDate, false)}
                  </h6>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PRICE TYPE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(priceTabData.priceType?.value)
                      ? "NA"
                      : priceTabData?.priceType?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    {" "}
                    NET PRICE{" "}
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(priceTabData.netPrice)
                      ? "NA"
                      : parseInt(priceTabData.netPrice)}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group date-box">
                  <p className="font-size-12 font-weight-500 mb-2">
                    ADDITIONAL
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(priceTabData.additionalPriceType?.value)
                      ? "NA"
                      : priceTabData?.additionalPriceType?.label}
                    {isEmpty(priceTabData.additionalPriceValue)
                      ? "NA"
                      : parseInt(priceTabData.additionalPriceValue)}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group date-box">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PRICE ESCALATON
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(priceTabData.priceEscalatonType?.value)
                      ? "NA"
                      : priceTabData?.priceEscalatonType?.label}
                    {isEmpty(priceTabData.priceEscaltonValue)
                      ? "NA"
                      : parseInt(priceTabData.priceEscaltonValue)}
                  </h6>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    CALCULATED PRICE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(priceTabData.calculatedPrice)
                      ? "NA"
                      : parseInt(priceTabData.calculatedPrice)}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group date-box">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PRICE BREAK DOWN
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(priceTabData.priceBreakDownType?.value)
                      ? "NA"
                      : priceTabData?.priceBreakDownType?.label}
                    {isEmpty(priceTabData.priceBreakDownValue)
                      ? "NA"
                      : parseInt(priceTabData.priceBreakDownValue)}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  // Solution Header Price Agreement tab data
  const viewPriceAgreementTabData = () => {
    return (
      <>
        <div className="card border">
          <div className="d-flex align-items-center justify-content-between px-3">
            <div className="">
              <div className="d-flex ">
                <h5 className=" mb-0">
                  <span>Price Agreement</span>
                </h5>
                <p className=" mb-0">
                  <a className="ml-3 cursor">
                    <img src={editIcon} />
                  </a>
                  <a className="ml-3 cursor">
                    <img src={shareIcon} />
                  </a>
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center ">
              <div className=" text-center border-left py-4 pl-3">
                <a className="cursor" onClick={handleAddNewPriceAgreementRow}>
                  {" "}
                  + Add{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="table-responsive custometable">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item Type</th>
                  <th scope="col">Item Number</th>
                  <th scope="col">Special Price</th>
                  <th scope="col">Discount%</th>
                  <th scope="col">Absolute discount</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {priceAgreementTableRow.length > 0 &&
                  priceAgreementTableRow.map((data, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>
                          <div className="form-group mb-0">
                            <Select
                              value={data.itemTypeKeyValue}
                              onChange={(e) =>
                                handlePriceAgreementData(e, i, "select")
                              }
                              options={priceAgreementItemsKeyValuePair}
                              placeholder="Select..."
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-group mb-0">
                            <input
                              type="text"
                              className="form-control text-primary border-radius-10 position-relative"
                              name="itemNumber"
                              placeholder="Search..."
                              value={data.itemNumber}
                              onChange={(e) => handleItemNumberSearch(e, i)}
                            />
                            {
                              <ul
                                className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                              >
                                {data.selectOptions.map((currentItem, j) => (
                                  <li
                                    className="list-group-item cursor"
                                    key={j}
                                    onClick={(e) =>
                                      handleSearchItemNumberListClick(
                                        currentItem["partNumber"],
                                        i
                                      )
                                    }
                                  >
                                    {currentItem["partNumber"]}
                                  </li>
                                ))}
                              </ul>
                            }
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="NA"
                            name="specialPrice"
                            value={data.specialPrice}
                            onChange={(e) =>
                              handlePriceAgreementData(e, i, "number")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="5%"
                            name="discount"
                            value={data.discount}
                            onChange={(e) =>
                              handlePriceAgreementData(e, i, "number")
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="NA"
                            name="absoluteDiscount"
                            value={data.absoluteDiscount}
                            onChange={(e) =>
                              handlePriceAgreementData(e, i, "number")
                            }
                          />
                        </td>
                        <td>
                          <div>
                            <a className="mr-3 cursor">
                              {" "}
                              <RemoveRedEyeOutlinedIcon className="font-size-16 mr-2" />{" "}
                              View detail
                            </a>
                            <a
                              onClick={() => handleRemovePriceAgreementRow(i)}
                              className="cursor"
                            >
                              <ModeEditIcon className="font-size-16 mr-2" />
                              View detail
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          <button
            type="button"
            onClick={handleNextClick}
            className="btn btn-light"
            id="priceAgreement"
          >
            Save & Next
          </button>
        </div>
      </>
    );
  };

  // Solution Header Coverage tab data
  const viewCoverageTabData = () => {};

  // Solution Header Administrative tab data
  const viewAdministrativeTabData = () => {
    return (
      <>
        {!portfolioTabsEditView.administrativeTabEdit ? (
          <>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    PREPARED BY
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    name="preparedBy"
                    value={administrativeTabData.preparedBy}
                    onChange={(e) =>
                      handleAdministrativeTabTextChange(e, "preparedBy", "text")
                    }
                    placeholder="Required (ex-abc@gmail.com)"
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    {" "}
                    APPROVED BY{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    placeholder="Optional (ex-abc@gmail.com)"
                    name="approvedBy"
                    value={administrativeTabData.approvedBy}
                    onChange={(e) =>
                      handleAdministrativeTabTextChange(e, "approvedBy", "text")
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <label className="text-light-dark font-size-14 font-weight-500">
                  PREPARED ON{" "}
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
                        value={administrativeTabData.preparedOn}
                        onChange={(e) =>
                          handleAdministrativeTabTextChange(
                            e,
                            "preparedOn",
                            "date"
                          )
                        }
                      />
                    </MuiPickersUtilsProvider>
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    REVISED BY
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    placeholder="Optional (ex-abc@gmail.com)"
                    name="revisedBy"
                    value={administrativeTabData.revisedBy}
                    onChange={(e) =>
                      handleAdministrativeTabTextChange(e, "revisedBy", "text")
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
                          value={administrativeTabData.revisedOn}
                          onChange={(e) =>
                            handleAdministrativeTabTextChange(
                              e,
                              "revisedOn",
                              "date"
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
                    placeholder="Required"
                    value={administrativeTabData.salesOffice}
                    onChange={(e) =>
                      handleAdministrativeTabTextChange(
                        e,
                        "salesOffice",
                        "select"
                      )
                    }
                    styles={FONT_STYLE_SELECT}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    OFFER VALIDITY
                  </label>
                  <Select
                    className="text-primary"
                    options={offerValidityKeyValuePairs}
                    placeholder="Required"
                    value={administrativeTabData.offerValidity}
                    onChange={(e) =>
                      handleAdministrativeTabTextChange(
                        e,
                        "offerValidity",
                        "select"
                      )
                    }
                    styles={FONT_STYLE_SELECT}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "right" }}>
              <button
                type="button"
                className="btn btn-light"
                id="administrative"
                onClick={handleNextClick}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    {" "}
                    PREPARED BY
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(administrativeTabData.preparedBy)
                      ? "NA"
                      : administrativeTabData.preparedBy}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    {" "}
                    APPROVED BY
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(administrativeTabData.preparedBy)
                      ? "NA"
                      : administrativeTabData.preparedBy}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PREPARED ON
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(administrativeTabData.preparedOn)
                      ? "NA"
                      : getFormatDateTime(
                          administrativeTabData.preparedBy,
                          false
                        )}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    REVISED BY
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(administrativeTabData.revisedBy)
                      ? "NA"
                      : administrativeTabData.revisedBy}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    REVISED ON
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmpty(administrativeTabData.revisedOn)
                      ? "NA"
                      : getFormatDateTime(
                          administrativeTabData.revisedOn,
                          false
                        )}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    SALES OFFICE / BRANCH
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(administrativeTabData.salesOffice?.value)
                      ? "NA"
                      : administrativeTabData.salesOffice?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    {" "}
                    OFFER VALIDITY
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(administrativeTabData.offerValidity?.value)
                      ? "NA"
                      : administrativeTabData.offerValidity?.label}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  // create Custom Portfolio
  const handleCreateCustomPortfolio = (requestObj) => {
    return new Promise((resolve, reject) => {
      const rUrl = CUSTOM_PORTFOLIO_URL();
      callPostApi(
        null,
        rUrl,
        requestObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            resolve({
              apiSuccess: true,
              responsePacket: response.data,
            });
          } else {
            resolve({
              apiSuccess: false,
              responsePacket: null,
            });
          }
        },
        (error) => {
          resolve({
            apiSuccess: false,
            responsePacket: null,
          });
        }
      );
    });
  };

  // Update Custom Portfolio
  const handleUpdateCustomPortfolio = (requestObj) => {
    return new Promise((resolve, reject) => {
      const rUrl = `${CUSTOM_PORTFOLIO_URL()}/${customPortfolioRecordId}`;
      callPutApi(
        null,
        rUrl,
        requestObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            resolve({
              apiSuccess: true,
              responsePacket: response.data,
            });
          } else {
            resolve({
              apiSuccess: false,
              responsePacket: null,
            });
          }
        },
        (error) => {
          resolve({
            apiSuccess: false,
            responsePacket: null,
          });
        }
      );
    });
  };

  // Create || Update Portfolio Price data
  const handleCreateUpdateCustomPortfolioPrice = () => {
    return new Promise((resolve, reject) => {
      let priceReqObj = {
        priceMethod: priceTabData.priceMethod?.value || "LIST_PRICE",
        priceType: priceTabData.priceType?.value || "EVENT_BASSD",
        priceList: priceTabData.priceList?.value || "COUNTRY",
        priceDate: priceTabData.priceDate,
        currency: "INR",
        validFrom: validityTabData.validFrom,
        validTo: validityTabData.validTo,
        calculatedPriceRule: "",
        userId: "",
      };
      if (isEmpty(priceTabData.portfolioPriceId)) {
        const rUrl = PORTFOLIO_PRICE_CREATE();
        callPostApi(
          null,
          rUrl,
          priceReqObj,
          (response) => {
            if (response.status === 200) {
              const priceResult = response.data;
              setPriceTabData({
                ...priceTabData,
                portfolioPriceId: priceResult.portfolioPriceId,
                netPrice: priceResult.totalPrice,
                calculatedPrice: priceResult.calculatedPrice,
              });
              resolve({
                apiSuccess: true,
                responsePacket: priceResult.portfolioPriceId,
                createMode: true,
              });
            } else {
              errorMessage(response?.data?.message);
              resolve({
                apiSuccess: false,
                responsePacket: null,
                createMode: true,
              });
            }
          },
          (error) => {
            errorMessage(error);
            resolve({
              apiSuccess: false,
              responsePacket: null,
              createMode: true,
            });
          }
        );
      } else {
        const rUrl = `${PORTFOLIO_PRICE_CREATE()}/${
          priceTabData.portfolioPriceId
        }`;
        callPutApi(
          null,
          rUrl,
          priceReqObj,
          (response) => {
            if (response.status === 200) {
              const priceResult = response.data;
              setPriceTabData({
                ...priceTabData,
                netPrice: priceResult.totalPrice,
                calculatedPrice: priceResult.calculatedPrice,
              });
              resolve({
                apiSuccess: true,
                responsePacket: priceResult,
                createMode: false,
              });
            } else {
              errorMessage(response?.data?.message);
              resolve({
                apiSuccess: false,
                responsePacket: null,
                createMode: false,
              });
            }
          },
          (error) => {
            errorMessage(error);
            resolve({
              apiSuccess: false,
              responsePacket: null,
              createMode: false,
            });
          }
        );
      }
    });
  };

  // Create Solution Price Agreement data
  const handleCreateUpdateCutmPortfolioPriceAgreement = () => {
    const _priceAgreementIds = [...priceAgreementIds];
    if (priceAgreementTableRow.length !== 0) {
      for (let i = 0; i < priceAgreementTableRow.length; i++) {
        var reqObj = {
          itemType: isEmpty(priceAgreementTableRow[i].itemType)
            ? "EMPTY"
            : priceAgreementTableRow[i].itemType,
          itemNumber: priceAgreementTableRow[i].itemNumber,
          specialPrice: parseFloat(priceAgreementTableRow[i].specialPrice),
          discount: parseFloat(priceAgreementTableRow[i].discount),
          absoluteDiscount: parseFloat(
            priceAgreementTableRow[i].absoluteDiscount
          ),
        };
        const priceAgreementReqUrl = PORTFOLIO_PRICE_AGREEMENT_URL();
        callPostApi(
          null,
          priceAgreementReqUrl,
          reqObj,
          (response) => {
            if (response.status === API_SUCCESS) {
              _priceAgreementIds.push({
                priceAgreementId: response.data.priceAgreementId,
              });
            } else {
              errorMessage(response.data.message);
            }
          },
          (error) => {
            errorMessage(error);
          }
        );
      }
    }
    setPriceAgreementIds(_priceAgreementIds);
  };

  // Optional Services Modal Show|Hide
  const handleOptionalServiceModal = () => {
    setShowOptionalServicesModal(!showOptionalServicesModal);
  };

  // Select Optional Services Modal Show|Hide
  const handleSelectedServiceModal = () => {
    setShowSelectedServicesModal(!showSelectedServicesModal);
  };

  // check custom portfolio tab Input Validation
  const checkInputValidation = (activeTab) => {
    if (activeTab == "general" && !portfolioTabsEditView.generalViewOnly) {
      if (isEmpty(generalTabData.name)) {
        errorMessage(
          "Solution code is a required field, you can’t leave it blank"
        );
        return false;
      } else if (isEmpty(generalTabData.description)) {
        errorMessage(
          "Solution description is a required field, you can’t leave it blank"
        );
        return false;
      } else if (isEmpty(generalTabData.externalReference)) {
        errorMessage("Reference is a required field, you can’t leave it blank");
        return false;
      }
      return true;
    } else {
      if (isEmpty(customPortfolioRecordId)) {
        errorMessage("Please Create Solution First.");
        setPortfolioHeaderActiveTab("general");
        return false;
      } else {
        if (activeTab == "strategy" && !portfolioTabsEditView.strategyTabEdit) {
          // if (isEmpty(strategyTabData.categoryUsage?.value)) {
          //   errorMessage(
          //     "Category usage is a required field, you can’t leave it blank"
          //   );
          //   return false;
          // } else if (isEmpty(strategyTabData.strategyTask?.value)) {
          //   errorMessage(
          //     "Strategy Task is a required field, you can’t leave it blank"
          //   );
          //   return false;
          // }
          return true;
        } else if (
          activeTab === "price" &&
          !portfolioTabsEditView.priceTabEdit
        ) {
          if (isEmpty(priceTabData.priceMethod?.value)) {
            errorMessage(
              "Price method is a required field, you can’t leave it blank"
            );
            return false;
          }
          return true;
        } else if (
          activeTab === "administrative" &&
          !portfolioTabsEditView.administrativeTabEdit
        ) {
          console.log("administrativeTabData ====== ", administrativeTabData);
          if (isEmpty(administrativeTabData.preparedBy)) {
            errorMessage(
              "Prepared By is a required field, you can’t leave it blank"
            );
            return false;
          } else if (isEmptySelect(administrativeTabData.salesOffice?.value)) {
            errorMessage(
              "Sales Office/Branch is a required field, you can’t leave it blank"
            );
            return false;
          } else if (
            isEmptySelect(administrativeTabData.offerValidity?.value)
          ) {
            errorMessage(
              "Offer validity is a required field, you can’t leave it blank"
            );
            return false;
          }
          return true;
        }
        return true;
      }
    }
  };

  const handleNextClick = (e) => {
    try {
      let { id } = e.target;
      const requestObj = {
        ...defaultCustomPortfolioObj,
        customPortfolioId: customPortfolioRecordId,
        name: generalTabData.name,
        description: generalTabData.description,
        externalReference: generalTabData.externalReference,
        customerSegment: generalTabData.customerSegment?.value || "",
        template: generalTabData.flagTemplate,
        visibleInCommerce: generalTabData.flagCommerce,

        customerId: parseInt(generalTabCustomerData.customerID),
        customerGroup: generalTabCustomerData.customerGroup,

        validFrom: validityTabData.fromDate,
        validTo: validityTabData.toDate,
        startUsage: validityTabData.fromInput,
        endUsage: validityTabData.toInput,
        unit: validityTabData.from?.value || "EMPTY",

        usageCategory: strategyTabData.categoryUsage?.value || "EMPTY",
        strategyTask: strategyTabData.strategyTask?.value || "EMPTY",
        taskType: strategyTabData.taskType?.value || "EMPTY",
        // optionalServices: _optionalServices,
        optionalServices: "",
        responseTime: strategyTabData.responseTime?.value || "EMPTY",
        productHierarchy: strategyTabData.productHierarchy?.value || "EMPTY",
        geographic: strategyTabData.geographic?.value || "EMPTY",
        solutionType: strategyTabData.solutionType?.value || "EMPTY",
        solutionLevel: strategyTabData.solutionLevel?.value || "EMPTY",

        portfolioPrice: isEmpty(priceTabData.portfolioPriceId)
          ? null
          : {
              portfolioPriceId: priceTabData.portfolioPriceId,
            },

        preparedBy: administrativeTabData.preparedBy,
        approvedBy: administrativeTabData.approvedBy,
        preparedOn: administrativeTabData.preparedOn,
        revisedBy: administrativeTabData.revisedBy,
        revisedOn: administrativeTabData.revisedOn,
        salesOffice: administrativeTabData.salesOffice?.value || "",
        offerValidity: administrativeTabData.preparedBy?.value || "",

        customItems: customItemIds,
        customCoverages: customPortfolioCoverageIds,

        status: portfolioStatus?.value,
        supportLevel: portfolioSupportLevel?.value,
      };

      if (!checkInputValidation(id)) {
        return;
      }

      if (id === "general") {
        if (isEmpty(customPortfolioRecordId)) {
          handleCreateCustomPortfolio(requestObj).then((res) => {
            if (res.apiSuccess) {
              successMessage(
                `Solution ${generalTabData.name} Created Successfully`
              );
              setCustomPortfolioRecordId(res.responsePacket.customPortfolioId);
              setPortfolioHeaderActiveTab("validity");
              setPortfolioTabsEditView((prev) => ({
                ...prev,
                generalTabEdit: true,
              }));
            }
          });
        } else {
          handleUpdateCustomPortfolio(requestObj).then((res) => {
            if (res.apiSuccess) {
              successMessage(
                `Solution ${generalTabData.name} Updated Successfully`
              );
              setPortfolioHeaderActiveTab("validity");
              setPortfolioTabsEditView((prev) => ({
                ...prev,
                generalTabEdit: true,
              }));
            }
          });
        }
      } else {
        if (isEmpty(customPortfolioRecordId)) {
          setPortfolioHeaderActiveTab("general");
          throw `Please Create Solution First.`;
        } else {
          if (id === "price") {
            handleCreateUpdateCustomPortfolioPrice().then((priceResult) => {
              if (priceResult.apiSuccess) {
                console.log("price result ==== ", priceResult);
                let requestObjWithPriceId = { ...requestObj };
                if (priceResult.createMode) {
                  requestObjWithPriceId = {
                    ...requestObjWithPriceId,
                    portfolioPrice: isEmpty(priceResult.responsePacket)
                      ? null
                      : {
                          portfolioPriceId: priceResult.responsePacket,
                        },
                  };
                }
                handleUpdateCustomPortfolio(requestObjWithPriceId).then(
                  (res) => {
                    if (res.apiSuccess) {
                      successMessage(
                        `Solution ${generalTabData.name} Updated Successfully`
                      );
                      setPortfolioHeaderActiveTab("priceAgreement");
                      setPortfolioTabsEditView((prev) => ({
                        ...prev,
                        priceTabEdit: true,
                      }));
                    }
                  }
                );
              }
            });
          } else if (id === "priceAgreement") {
            handleCreateUpdateCutmPortfolioPriceAgreement();
            handleUpdateCustomPortfolio(requestObj).then((res) => {
              if (res.apiSuccess) {
                successMessage(
                  `Solution ${generalTabData.name} Updated Successfully`
                );

                setPortfolioHeaderActiveTab("coverage");
                setPortfolioTabsEditView((prev) => ({
                  ...prev,
                  priceAgreementTabEdit: true,
                }));
              }
            });
          } else {
            handleUpdateCustomPortfolio(requestObj).then((res) => {
              if (res.apiSuccess) {
                successMessage(
                  `Solution ${generalTabData.name} Updated Successfully`
                );
                if (id === "validity") {
                  setPortfolioHeaderActiveTab("strategy");
                  setPortfolioTabsEditView((prev) => ({
                    ...prev,
                    validityTabEdit: true,
                  }));
                } else if (id == "strategy") {
                  setPortfolioHeaderActiveTab("price");
                  setPortfolioTabsEditView((prev) => ({
                    ...prev,
                    strategyTabEdit: true,
                  }));
                } else if (id == "price") {
                  setPortfolioHeaderActiveTab("priceAgreement");
                  setPortfolioTabsEditView((prev) => ({
                    ...prev,
                    priceTabEdit: true,
                  }));
                } else if (id == "priceAgreement") {
                  setPortfolioHeaderActiveTab("coverage");
                  setPortfolioTabsEditView((prev) => ({
                    ...prev,
                    priceAgreementTabEdit: true,
                  }));
                } else if (id == "coverage") {
                  setPortfolioHeaderActiveTab("administrative");
                  setPortfolioTabsEditView((prev) => ({
                    ...prev,
                    coverageTabEdit: true,
                  }));
                } else if (id == "administrative") {
                  setPortfolioTabsEditView((prev) => ({
                    ...prev,
                    administrativeTabEdit: true,
                  }));
                }
              }
            });
          }
        }
      }
    } catch (error) {
      errorMessage(error);
      return;
    }
  };

  // update the Solution header(Custom Portfolio) on item Level
  const handleUpdateSolutionHeader = (_customItemIds = []) => {
    const requestObj = {
      ...defaultCustomPortfolioObj,
      customPortfolioId: customPortfolioRecordId,
      name: generalTabData.name,
      description: generalTabData.description,
      externalReference: generalTabData.externalReference,
      customerSegment: generalTabData.customerSegment?.value || "",
      template: generalTabData.flagTemplate,
      visibleInCommerce: generalTabData.flagCommerce,

      customerId: parseInt(generalTabCustomerData.customerID),
      customerGroup: generalTabCustomerData.customerGroup,

      validFrom: validityTabData.fromDate,
      validTo: validityTabData.toDate,
      startUsage: validityTabData.fromInput,
      endUsage: validityTabData.toInput,
      unit: validityTabData.from?.value || "EMPTY",

      usageCategory: strategyTabData.categoryUsage?.value || "EMPTY",
      strategyTask: strategyTabData.strategyTask?.value || "EMPTY",
      taskType: strategyTabData.taskType?.value || "EMPTY",
      // optionalServices: _optionalServices,
      optionalServices: "",
      responseTime: strategyTabData.responseTime?.value || "EMPTY",
      productHierarchy: strategyTabData.productHierarchy?.value || "EMPTY",
      geographic: strategyTabData.geographic?.value || "EMPTY",
      solutionType: strategyTabData.solutionType?.value || "EMPTY",
      solutionLevel: strategyTabData.solutionLevel?.value || "EMPTY",

      portfolioPrice: isEmpty(priceTabData.portfolioPriceId)
        ? null
        : {
            portfolioPriceId: priceTabData.portfolioPriceId,
          },

      preparedBy: administrativeTabData.preparedBy,
      approvedBy: administrativeTabData.approvedBy,
      preparedOn: administrativeTabData.preparedOn,
      revisedBy: administrativeTabData.revisedBy,
      revisedOn: administrativeTabData.revisedOn,
      salesOffice: administrativeTabData.salesOffice?.value || "",
      offerValidity: administrativeTabData.preparedBy?.value || "",

      customItems: _customItemIds.length !== 0 ? _customItemIds : customItemIds,
      customCoverages: customPortfolioCoverageIds,

      status: portfolioStatus?.value,
      supportLevel: portfolioSupportLevel?.value,
    };

    handleUpdateCustomPortfolio(requestObj).then((res) => {
      if (res.apiSuccess) {
        // successMessage(
        //   `Solution ${generalTabData.name} Updated Successfully`
        // );
      }
    });
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <LoadingProgress />
          </div>
        ) : (
          <div className="container-fluid ">
            <CustomPortfolioHeader
              portfolioSupportLevel={portfolioSupportLevel}
              portfolioStatus={portfolioStatus}
              supportLevelKeyValuePair={supportLevelKeyValuePair}
              portfolioStatusKeyValuePair={portfolioStatusKeyValuePair}
              setIsActivePortfolio={setIsActivePortfolio}
              handlePortfolioSupportLevel={(e) => setPortfolioSupportLevel(e)}
              handlePortfolioStatus={(e) => setPortfolioStatus(e)}
            />
            <div className="card p-4 mt-5">
              <h5 className="d-flex justify-content-between align-items-center mb-0">
                <div className="d-flex align-items-center">
                  <span className="mr-3" style={{ whiteSpace: "pre" }}>
                    {!isEmpty(customPortfolioRecordId)
                      ? "Solution Details"
                      : "Solution Header"}
                  </span>
                  <a className="btn-sm cursor">
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={handlePortfolioHeaderTabDataViews}
                    />
                  </a>
                  <a className="btn-sm cursor">
                    <i className="fa fa-bookmark-o" aria-hidden="true" />{" "}
                  </a>
                  <a className="btn-sm cursor">
                    <img style={{ width: "14px" }} src={folderAddIcon} />{" "}
                  </a>
                </div>
                <button
                  onClick={goBackToRecentSolutions}
                  className="btn bg-primary text-white cursor"
                >
                  Back
                </button>
              </h5>
              <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={portfolioHeaderActiveTab}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      className="custom-tabs-div"
                      aria-label="lab API tabs example"
                      onChange={handleTabChange}
                    >
                      <Tab label="General" value={"general"} />
                      <Tab label="Validity" value={"validity"} />
                      <Tab label="Strategy" value={"strategy"} />
                      <Tab
                        label="Price"
                        //   disabled={isPriceAgreementDisable}
                        value={"price"}
                      />
                      <Tab
                        label="Price Agreement"
                        //   disabled={!isPriceAgreementDisable}
                        value={"priceAgreement"}
                      />
                      <Tab label="Coverage" value={"coverage"} />
                      <Tab label="Administrative" value={"administrative"} />
                    </TabList>
                  </Box>
                  <TabPanel value={portfolioHeaderActiveTab}>
                    {portfolioHeaderActiveTab === "general" &&
                      viewGeneralTabData()}
                    {portfolioHeaderActiveTab === "validity" &&
                      viewValidityTabData()}
                    {portfolioHeaderActiveTab === "strategy" &&
                      viewStrategyTabData()}
                    {portfolioHeaderActiveTab === "price" && viewPriceTabData()}
                    {portfolioHeaderActiveTab === "priceAgreement" &&
                      viewPriceAgreementTabData()}
                    {portfolioHeaderActiveTab === "coverage" &&
                      viewCoverageTabData()}
                    {portfolioHeaderActiveTab === "administrative" &&
                      viewAdministrativeTabData()}
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
            <CustomPortfolioItemsList
              customPortfolioId={customPortfolioRecordId}
              customItemsTableList={customItemsTableList}
              setCustomItemsTableList={setCustomItemsTableList}
              setCustomItemReviewTabItemList={setCustomItemReviewTabItemList}
              customItemReviewTabItemList={customItemReviewTabItemList}
              customItemIds={customItemIds}
              setCustomItemIds={setCustomItemIds}
              priceMethodKeyValuePair={priceMethodKeyValuePair}
              priceTypeKeyValuePair={priceTypeKeyValuePair}
              priceHeadTypeKeyValuePair={priceHeadTypeKeyValuePair}
              currencyKeyValuePair={currencyKeyValuePair}
              handleUpdateSolutionHeader={handleUpdateSolutionHeader}
              showOptionalServicesModal={showOptionalServicesModal}
              handleOptionalServiceModal={handleOptionalServiceModal}
              checkedService={checkedService}
              setCheckedService={setCheckedService}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />
          </div>
        )}
      </div>
      {(showOptionalServicesModal || showSelectedServicesModal) && (
        <CustomOptionalServicesModel
          showOptionalServicesModal={showOptionalServicesModal}
          handleOptionalServiceModal={handleOptionalServiceModal}
          checkedService={checkedService}
          setCheckedService={setCheckedService}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          showSelectedServicesModal={showSelectedServicesModal}
          handleSelectedServiceModal={handleSelectedServiceModal}
        />
      )}
    </>
  );
};

export default CustomPortfolioAddUpdate;

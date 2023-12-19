import React, { useEffect, useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import folderAddIcon from "../../../assets/icons/svg/folder-add.svg";
import editIcon from "../../../assets/icons/svg/edit.svg";
import shareIcon from "../../../assets/icons/svg/share.svg";

import PortfolioHeader from "./PortfolioHeader";
import { ToastContainer, toast } from "react-toastify";
import { Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

import $ from "jquery";
import Select from "react-select";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  createCoverage,
  createPortfolio,
  getPortfolioCommonConfig,
  getSolutionPriceCommonConfig,
  getTypeKeyValue,
  getValidityKeyValue,
  portfolioPriceAgreementCreation,
  portfolioPriceCreation,
  updatePortfolio,
  updatePortfolioPrice,
} from "../../../services/index";
import { FONT_STYLE_SELECT } from "../../Repair/CONSTANTS";
import { isEmpty, isEmptySelect } from "./utilities/textUtilities";
import { errorMessage, successMessage } from "./utilities/toastMessage";
import { useAppSelector } from "../../../app/hooks";
import {
  selectCategoryList,
  selectGeographicalList,
  selectProductList,
  selectResponseTimeList,
  selectStrategyTaskOption,
  selectUpdateList,
  selectUpdateTaskList,
  taskActions,
} from "../customerSegment/strategySlice";
import { useDispatch, useSelector } from "react-redux";
import { getFormatDateTime } from "./utilities/dateUtilities";
import { sparePartSearch } from "services/searchServices";
import PortfolioCoverageSearch from "./PortfolioCoverageSearch";
import CoveragePaginationTable from "./coverage/CoveragePaginationTable";
import PortfolioItemsList from "./portfolio-item/PortfolioItemsList";

import {
  offerValidityKeyValuePairs,
  salesOfficeKeyValuePairs,
  additionalPriceKeyValuePair,
  brackdownPrices,
  priceAgreementItemsKeyValuePair,
  defaultSupportLevel,
  defaultStatus,
} from "./itemConstant";
import { API_SUCCESS } from "services/ResponseCode";
import {
  CREATE_PORTFOLIO_ITEM,
  PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
  PORTFOLIO_URL,
} from "services/CONSTANTS";
import { callGetApi, callPutApi } from "services/ApiCaller";
import OptionalServiceModal from "./common/OptionalServiceModal";
import LoadingProgress from "pages/Repair/components/Loader";

const portfolioHeaderType = [
  { label: "PORTFOLIO", value: "PORTFOLIO" },
  { label: "PROGRAM", value: "PROGRAM" },
];

export const CreatePortfolio = (props) => {
  const {
    location: { state: portfolioRecordData },
    ...restProps
  } = props;

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    supportLevelKeyValuePair,
    portfolioStatusKeyValuePair,
    customerSegmentKeyValuePair,
    machineComponentKeyValuePair,
    validityKeyValuePair,
    priceListKeyValuePair,
    priceMethodKeyValuePair,
    priceTypeKeyValuePair,
    priceHeadTypeKeyValuePair,
    currencyKeyValuePair,
    ...newdataResponse
  } = useSelector((state) => state.commonAPIReducer);

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

  // Price tab Key-Value -pair list
  // const [priceListKeyValuePair, setPriceListKeyValuePair] = useState([]);
  // const [priceMethodKeyValuePair, setPriceMethodKeyValuePair] = useState([]);
  // const [priceTypeKeyValuePair, setPriceTypeKeyValuePair] = useState([]);
  // const [priceHeadTypeKeyValuePair, setPriceHeadTypeKeyValuePair] = useState(
  //   []
  // );
  // const [currencyKeyValuePair, setCurrencyKeyValuePair] = useState([]);

  // const [supportLevelKeyValuePair, setSupportLevelKeyValuePair] = useState([]);
  const [portfolioSupportLevel, setPortfolioSupportLevel] = useState({
    ...defaultSupportLevel,
  });
  // const [portfolioStatusKeyValuePair, setPortfolioStatusKeyValuePair] =
  //   useState([]);
  const [portfolioStatus, setPortfolioStatus] = useState({ ...defaultStatus });
  const [isActivePortfolio, setIsActivePortfolio] = useState(false);

  const [portfolioRecordId, setPortfolioRecordId] = useState(0);
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
  // const [customerSegmentKeyValuePair, setCustomerSegmentKeyValue] = useState(
  //   []
  // );
  // const [validityKeyValuePair, setValidityKeyValuePair] = useState([]);
  // const [machineComponentKeyValuePair, setMachineComponentKeyValuePair] =
  //   useState([]);

  const [loading, setLoading] = useState(false);

  const [generalTabData, setGeneralTabData] = useState({
    headerType: { label: "PORTFOLIO", value: "PORTFOLIO" },
    name: "",
    description: "",
    serviceDescription: "",
    externalReference: "",
    customerSegment: "",
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

  const [searchCoverageData, setSearchCoverageData] = useState([]);
  const [checkedCoverageData, setCheckedCoverageData] = useState([]);
  const [selectedCoverageData, setSelectedCoverageData] = useState([]);
  const [portfolioCoverageIds, setPortfolioCoverageIds] = useState([]);

  const [administrativeTabData, setAdministrativeTabData] = useState({
    preparedBy: null,
    approvedBy: null,
    preparedOn: new Date(),
    revisedBy: null,
    revisedOn: new Date(),
    salesOffice: null,
    offerValidity: null,
  });

  const [portfolioItemsList, setPortfolioItemsList] = useState([]);
  const [portfolioItemsIds, setPortfolioItemsIds] = useState([]);

  // Optional Service
  const [checkedService, setCheckedService] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [inclusionService, setInclusionService] = useState([]);

  const [showOptionalServicesModal, setShowOptionalServicesModal] =
    useState(false);
  const [showSelectedServicesModal, setShowSelectedServicesModal] =
    useState(false);

  useEffect(() => {
    dispatch(taskActions.fetchTaskList());
  }, [dispatch]);

  useEffect(() => {
    // // get Portfolio support-level Options Key-Value List
    // getSolutionPriceCommonConfig("support-level")
    //   .then((res) => {
    //     const supportLevelOptions = [];
    //     res.map((d) => {
    //       if (d.key != "EMPTY") {
    //         supportLevelOptions.push({ value: d.key, label: d.value });
    //       }
    //     });
    //     setSupportLevelKeyValuePair(supportLevelOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // // get Portfolio Status Options Key-value List
    // getSolutionPriceCommonConfig("status")
    //   .then((res) => {
    //     const portfolioStatusOptions = [];
    //     res.map((d) => {
    //       if (d.key != "EMPTY") {
    //         portfolioStatusOptions.push({ value: d.key, label: d.value });
    //       }
    //     });
    //     setPortfolioStatusKeyValuePair(portfolioStatusOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // // get customer segment key value pair list
    // getPortfolioCommonConfig("customer-segment")
    //   .then((res) => {
    //     const customerSegmentOptions =
    //       res.length !== 0 &&
    //       res.map((d) => ({
    //         value: d.key,
    //         label: d.value,
    //       }));
    //     setCustomerSegmentKeyValue(customerSegmentOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // // get machine component key value Pair
    // getTypeKeyValue()
    //   .then((res) => {
    //     const options = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key !== "EMPTY") {
    //           options.push({ value: d.key, label: d.value });
    //         }
    //       });
    //     setMachineComponentKeyValuePair(options);
    //   })
    //   .catch((error) => {
    //     return;
    //   });
    // // get Validity Key-Value Pair list
    // getValidityKeyValue()
    //   .then((res) => {
    //     const validityOptions = [];
    //     res.map((d) => {
    //       if (d.key !== "EMPTY") {
    //         validityOptions.push({ value: d.key, label: d.value });
    //       }
    //     });
    //     setValidityKeyValuePair(validityOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // // get Price-List key-value pair
    // getSolutionPriceCommonConfig("price-list")
    //   .then((res) => {
    //     const priceListOptions = [];
    //     res.map((d) => {
    //       if (d.key != "EMPTY") {
    //         priceListOptions.push({ value: d.key, label: d.value });
    //       }
    //     });
    //     setPriceListKeyValuePair(priceListOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // // get PRice-method key-value Pair
    // getSolutionPriceCommonConfig("price-method")
    //   .then((res) => {
    //     const priceMethodOptions = [];
    //     res.map((d) => {
    //       if (d.key != "EMPTY") {
    //         priceMethodOptions.push({ value: d.key, label: d.value });
    //       }
    //     });
    //     setPriceMethodKeyValuePair(priceMethodOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // // get Price-Type key-value Pair
    // getSolutionPriceCommonConfig("price-type")
    //   .then((res) => {
    //     const priceTypeOptions = [];
    //     res.map((d) => {
    //       if (d.key != "EMPTY") {
    //         priceTypeOptions.push({ value: d.key, label: d.value });
    //       }
    //     });
    //     setPriceTypeKeyValuePair(priceTypeOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // //get price-head-type key-value pair
    // getSolutionPriceCommonConfig("price-head-type")
    //   .then((res) => {
    //     const priceHeadTypeOptions = [];
    //     res.map((d) => {
    //       if (d.key != "EMPTY") {
    //         priceHeadTypeOptions.push({ value: d.key, label: d.value });
    //       }
    //     });
    //     setPriceHeadTypeKeyValuePair(priceHeadTypeOptions);
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });
    // //  get currency  key-value pair
    // getSolutionPriceCommonConfig("currency")
    //   .then((res) => {
    //     const currencyOptions = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key != "EMPTY") {
    //           currencyOptions.push({ value: d, label: d });
    //         }
    //       });
    //     setCurrencyKeyValuePair(currencyOptions);
    //   })
    //   .catch((err) => {
    //     return;
    //   });
  }, []);

  useEffect(() => {
    // existing Portfolio
    if (portfolioRecordData.type === "fetch") {
      setPortfolioRecordId(portfolioRecordData.portfolioId);
      getPortfolioDetails(portfolioRecordData.portfolioId);
    }
  }, [portfolioRecordData]);

  // get exisiting portfolio details get by ApiCalling
  const getPortfolioDetails = async (portfolioId) => {
    if (!isEmpty(portfolioId)) {
      setLoading(true);
      const rUrl = PORTFOLIO_URL() + "/" + portfolioId;
      await callGetApi(
        null,
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            intilisePortfolioDetails(response.data);
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
          // handleSnack("error", "Error occured while fetching header details");
        }
      );
    }
  };

  // map and set Selected Portfolio details
  const intilisePortfolioDetails = (recordData) => {
    // set Portfolio Support Level
    const _portfolioSupportLevel = supportLevelKeyValuePair.find(
      (obj) => obj.value === recordData.supportLevel
    );
    setPortfolioSupportLevel(_portfolioSupportLevel || defaultSupportLevel);

    // set Portfolio Status
    const _portfolioStatus = portfolioStatusKeyValuePair.find(
      (obj) => obj.value === recordData.status
    );
    setPortfolioStatus(_portfolioStatus || defaultStatus);
    // setIsActivePortfolio={setIsActivePortfolio}

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
      // customerSegment: isEmpty(recordData.customerSegment)
      //   ? ""
      //   : {
      //       label: recordData.customerSegment,
      //       value: recordData.customerSegment,
      //     },
    });

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

    dispatch(taskActions.updateList(recordData.usageCategory));
    dispatch(taskActions.updateTask(recordData.strategyTask));

    // Category useage
    const _categoryUsage = categoryUsageKeyValuePair.find(
      (obj) => obj.value === recordData.usageCategory
    );

    // Startegy Task
    const _strategyTask = strategyTaskKeyValuePair.find(
      (obj) => obj.value === recordData.strategyTask
    );

    // Category useage
    const _taskType = taskTypeKeyValuePair.find(
      (obj) => obj.value === recordData.taskType
    );

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

    // Set Strategy Tab data
    setStrategyTabData({
      categoryUsage: _categoryUsage || "",
      strategyTask: _strategyTask || "",
      taskType: _taskType || "",
      optionals: "",
      responseTime: _responseTime || "",
      productHierarchy: _productHierarchy || "",
      geographic: _geographic || "",
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

    // portfolioPrice !== null
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
    const _portfolioCoverageIds = recordData.coverages.map((obj) => {
      return { coverageId: obj.coverageId };
    });
    setPortfolioCoverageIds(_portfolioCoverageIds);

    // set Coverage Data
    setSelectedCoverageData(recordData.coverages);

    // Map|Fetch the Portfolio Items for Table List
    fetchPortfolioItemsTableList(recordData.items, recordData.portfolioId);

    // gwt Optional Services details
    if (!isEmpty(recordData.optionalServices)) {
      let _optionalServices = recordData.optionalServices.split(",");
      getOptionalServices(_optionalServices);
    }
  };

  // get Portfolio Items data
  const fetchPortfolioItemsTableList = async (
    items = [],
    portfolioId = null
  ) => {
    let rUrl = PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE;
    if (items.length !== 0) {
      const shortedItems = items.sort(
        (itemA, itemB) => itemA.itemId - itemB.itemId
      );

      //  set Portfolio Item Ids data
      const _portfolioItemsIds = shortedItems.map((item) => ({
        itemId: item.itemId,
      }));
      setPortfolioItemsIds(_portfolioItemsIds);

      rUrl =
        rUrl + shortedItems.map((item) => `itemIds=${item.itemId}`).join("&");
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
          setPortfolioItemsList(_portfolioItems);
        }
      });
    }
  };

  // get optional services for existing Portfolio
  const getOptionalServices = async (optionalServices) => {
    const sortedServices = optionalServices.sort(
      (item1, item2) => item1 - item2
    );
    let rUrl = CREATE_PORTFOLIO_ITEM() + "/services-details?";
    rUrl = rUrl + sortedServices.map((data) => `itemIds=${data}`).join("&");
    rUrl = rUrl + "&bundle_flag=SERVICE";
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const res = response.data;
        const _optionalServices = res.map((service) => {
          return { ...service, checked: true, inclusionService: true };
        });
        setSelectedService(_optionalServices);
        setCheckedService(_optionalServices);
      }
    });
  };

  // handle Portfolio Support level
  const handlePortfolioSupportLevel = (e) => {
    setPortfolioSupportLevel(e);
  };

  // handle Portfolio Status
  const handlePortfolioStatus = (e) => {
    setPortfolioStatus(e);
  };

  // handle portfolio tabs edit flag
  const handlePortfolioHeaderTabDataViews = () => {
    try {
      if (portfolioStatus.value === "ACTIVE") {
        const errorMessage =
          "The portfolio data cannot be changed on active status, change to revise status to edit";
        toast("😐 " + errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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

  // goTo Recent Portfolio/Bundles/Service
  const goBackToRecentPortfolio = () => {
    history.push({ pathname: "/portfolio" });
  };

  // Change Portfolio tabs
  const handleTabChange = (e, value) => {
    setPortfolioHeaderActiveTab(value);
  };

  // handle general Tab input data change
  const handleGeneralTabTextChange = (e) => {
    const { name, value } = e.target;
    setGeneralTabData({ ...generalTabData, [name]: value });
  };

  // handle validity Tab input data change
  const handleValidityTabTextChange = (e, keyName, type) => {
    const _validityTabData = { ...validityTabData };
    if (type == "date") {
      _validityTabData.inputFlag = false;
      _validityTabData[keyName] = e.toISOString().substring(0, 10);
      if (keyName === "toDate") {
        _validityTabData.dateFlag = true;
      }
    }

    if (type == "select") {
      _validityTabData[keyName] = e;
    }

    if (type === "text") {
      _validityTabData[keyName] = e;
      if (keyName === "fromInput") {
        _validityTabData.dateFlag = false;
      }
    }
    setValidityTabData(_validityTabData);
  };

  // handle strategy tab input data change
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
      if (keyName === "priceBreakDownValue") {
        setPriceBrackdownValues({
          ...priceBrackdownValues,
          [e.target.id]: e.target.value,
        });
      } else {
        setPriceTabData({ ...priceTabData, [keyName]: e.target.value });
      }
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
      toast("😐" + error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

  // Coverage
  const handleSetSearchCoverageData = (data) => {
    setSearchCoverageData(data);
  };

  // handle Search Coverage Data-table checkbox
  const handleCheckedCoverageData = () => {
    let selectedCoverageDataClone = [];
    checkedCoverageData.map((data, i) => {
      const exist = selectedCoverageData.some((item) => item.id === data.id);
      if (!exist) {
        selectedCoverageDataClone.push(data);
      }
    });
    setSelectedCoverageData([
      ...selectedCoverageData,
      ...selectedCoverageDataClone,
    ]);
    setSearchCoverageData([]);
    setCheckedCoverageData([]);
  };

  // ****TODO
  const handleUpdateCoverageData = (updatedData, isFiltered = false) => {
    setSelectedCoverageData(updatedData);
    if (isFiltered) {
      setCheckedCoverageData(updatedData);
    }
  };

  // ****TODO
  const handlePortfolioCoverageIds = (idsData) => {
    setPortfolioCoverageIds(idsData);
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
      if (keyName === "headerType") {
        if (e.value == "PROGRAM") {
          setIsPriceAgreementDisable(true);
        } else {
          setIsPriceAgreementDisable(false);
        }
      }
      setGeneralTabData({ ...generalTabData, [keyName]: e });
    }
  };

  // view general tab data
  const viewGeneralTabData = () => {
    return (
      <>
        {!portfolioTabsEditView.generalTabEdit ? (
          <>
            <div className="row mt-4 input-fields">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {" "}
                    SELECT TYPE
                  </label>
                  <Select
                    placeholder="Select..."
                    className="text-primary"
                    options={portfolioHeaderType}
                    value={generalTabData.headerType}
                    onChange={(e) =>
                      handleTabSelectChange(e, "general", "headerType")
                    }
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {generalTabData.headerType.value} NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control text-primary border-radius-10"
                    placeholder="Name"
                    value={generalTabData.name}
                    onChange={handleGeneralTabTextChange}
                    disabled={portfolioRecordId === 0 ? false : true}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {/* SERVICE {generalTabData.headerType.value} DESCRIPTION (IF ANY) */}
                    {generalTabData.headerType.value} DESCRIPTION (IF ANY)
                  </label>
                  <input
                    type="text"
                    className="form-control text-primary border-radius-10"
                    name="description"
                    placeholder="Optional"
                    value={generalTabData.description}
                    onChange={handleGeneralTabTextChange}
                  />
                </div>
              </div>
            </div>
            <div className="row input-fields">
              <div className="col-md-6 col-sm-6">
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
              <div className="col-md-6 col-sm-6">
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
                    SELECT TYPE
                  </p>
                  <h6 className="font-weight-500 text-primary font-size-17">
                    {isEmptySelect(generalTabData.headerType?.value)
                      ? "NA"
                      : generalTabData.headerType?.value}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PORTFOLIO NAME
                  </p>
                  <h6 className="font-weight-500 text-primary font-size-17">
                    {isEmpty(generalTabData.name) ? "NA" : generalTabData.name}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-3">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    PORTFOLIO DESCRIPTION
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
                    CUSTOMER SEGMENT
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(generalTabData.customerSegment?.value)
                      ? "NA"
                      : generalTabData.customerSegment?.label}
                  </h6>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  // view general tab data
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

  // view strategy tab data
  const viewStrategyTabData = () => {
    return (
      <>
        {!portfolioTabsEditView.strategyTabEdit ? (
          <>
            <div className="row input-fields">
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CATEGORY USAGE{" "}
                  </label>
                  <Select
                    options={categoryUsageKeyValuePair}
                    className="text-primary"
                    value={strategyTabData.categoryUsage}
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "categoryUsage")
                    }
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {" "}
                    STRATEGY TASK{" "}
                  </label>
                  <Select
                    options={strategyTaskKeyValuePair}
                    className="text-primary"
                    value={strategyTabData?.strategyTask}
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "strategyTask")
                    }
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {" "}
                    TASK TYPE{" "}
                  </label>
                  <Select
                    options={taskTypeKeyValuePair}
                    className="text-primary"
                    value={strategyTabData.taskType}
                    placeholder="Optional"
                    onChange={(e) =>
                      handleStrategyTabSelectChange(e, "taskType")
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {" "}
                    OPTIONALS{" "}
                  </label>
                  <div className="optionl-service-input bg-white border-radius-10 d-flex align-items-center justify-content-between">
                    <h6 className="text-primary m-0 font-size-17 font-weight-500">
                      {selectedService.length === 0
                        ? "Add Services"
                        : selectedService.length + " Services Selected"}{" "}
                    </h6>
                    {selectedService.length !== 0 ? (
                      <RemoveRedEyeIcon
                        className="text-primary font-size-30 cursor"
                        onClick={handleSelectedServiceModal}
                      />
                    ) : (
                      <AddCircleOutlineIcon
                        className="text-primary font-size-30 cursor"
                        onClick={handleOptionalServiceModal}
                      />
                    )}
                  </div>
                </div>
              </div>
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
                    CATEGORY USAGE
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.categoryUsage?.value)
                      ? "NA"
                      : strategyTabData?.categoryUsage?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">
                    STRATEGY TASK
                  </p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.strategyTask?.value)
                      ? "NA"
                      : strategyTabData?.strategyTask?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <p className="font-size-12 font-weight-500 mb-2">TASK TYPE</p>
                  <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                    {isEmptySelect(strategyTabData.taskType?.value)
                      ? "NA"
                      : strategyTabData?.taskType?.label}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <p className="font-size-12 font-weight-500 mb-2">OPTIONALS</p>
                <h6 className="cursor font-weight-500 text-uppercase text-primary font-size-17">
                  {selectedService.length !== 0
                    ? `${selectedService.length} Service Selected`
                    : "No Service Selected"}
                </h6>
              </div>
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
            </div>
          </>
        )}
      </>
    );
  };

  // view Price Tab Data
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
                      disabled={isEmptySelect(
                        priceTabData.additionalPriceType?.value
                      )}
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
                      disabled={isEmptySelect(
                        priceTabData.priceEscaltonValue?.value
                      )}
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
                      id={
                        priceTabData.priceBreakDownType?.value === "PARTS"
                          ? "sparePartsPrice"
                          : priceTabData.priceBreakDownType?.value === "LABOR"
                          ? "labourPrice"
                          : priceTabData.priceBreakDownType?.value ===
                            "MISCELLANEOUS"
                          ? "miscPrice"
                          : priceTabData.priceBreakDownType?.value === "SERVICE"
                          ? "servicePrice"
                          : ""
                      }
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
                      disabled={isEmptySelect(
                        priceTabData.priceBreakDownType?.value
                      )}
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

  // view Price-Agreement Tab View
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

  // view Coverage Tab Data
  const viewCoverageTabData = () => {
    return (
      <>
        <ul
          class="submenu templateResultheading accordion"
          style={{ display: "block" }}
        >
          <li>
            <a className="cursor result">Search Coverage</a>
          </li>
        </ul>
        <div
          className="custom-table card p-3"
          style={{ width: "100%", backgroundColor: "#fff" }}
        >
          <div
            className="row align-items-center m-0"
            style={{ flexFlow: "unset" }}
          >
            <PortfolioCoverageSearch
              searchFlag="coverage"
              handleAddSearchItem={handleSetSearchCoverageData}
            />
            <div className=" ml-3">
              <Link className="btn bg-primary cursor text-white cursor">
                <FileUploadOutlinedIcon /> <span className="ml-1">Upload</span>
              </Link>
            </div>
          </div>
          {searchCoverageData.length !== 0 && (
            <>
              <hr />
              <CoveragePaginationTable
                className=""
                isSelectAble={true}
                tableData={searchCoverageData}
                setCheckedCoverageData={setCheckedCoverageData}
              />
              <div>
                {" "}
                <div className="text-right">
                  <input
                    className="btn bg-primary text-white"
                    value="+ Add Selected"
                    onClick={handleCheckedCoverageData}
                    disabled={checkedCoverageData.length === 0}
                  />
                </div>
              </div>
            </>
          )}
          {selectedCoverageData.length !== 0 && (
            <>
              <hr />
              <label htmlFor="Included-model">
                <h5 className="font-weight-400 text-black mb-2 mt-1">
                  Included models
                </h5>
              </label>
              <CoveragePaginationTable
                className="mt-3"
                isSelectAble={false}
                tableData={selectedCoverageData}
                handleUpdateCoverageData={handleUpdateCoverageData}
                // handlePortfolioCoverageIds={handlePortfolioCoverageIds}
                handlePortfolioCoverageIds={(idsData) =>
                  setPortfolioCoverageIds(idsData)
                }
                setTableData={setSelectedCoverageData}
              />
            </>
          )}
        </div>
        <div className="row" style={{ justifyContent: "right" }}>
          {selectedCoverageData.length !== 0 && (
            <button
              type="button"
              className="btn btn-light"
              id="coverage"
              onClick={handleNextClick}
            >
              Save & Next
            </button>
          )}
        </div>
      </>
    );
  };

  // view administrative tab data
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

  // Capitalize First Latter
  const capitalizeFirstLetter = (inputString) => {
    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  };

  // check General tab Input Validation
  const checkInputValidation = (activeTab) => {
    if (activeTab == "general" && !portfolioTabsEditView.generalViewOnly) {
      if (isEmpty(generalTabData.headerType?.value)) {
        errorMessage(
          "Select Type is a required field, you can’t leave it blank"
        );
        return false;
      } else if (isEmpty(generalTabData.name)) {
        errorMessage(
          generalTabData.headerType?.value +
            " Name is a required field, you can’t leave it blank"
        );
        return false;
      } else if (isEmpty(generalTabData.externalReference)) {
        errorMessage("Reference is a required field, you can’t leave it blank");
        return false;
      }
      return true;
    } else {
      if (isEmpty(portfolioRecordId)) {
        errorMessage(
          "Please create " + generalTabData.headerType?.value + " First"
        );
        return false;
      } else {
        if (activeTab == "strategy" && !portfolioTabsEditView.strategyTabEdit) {
          if (isEmpty(strategyTabData.categoryUsage?.value)) {
            errorMessage(
              "Category usage is a required field, you can’t leave it blank"
            );
            return false;
          } else if (isEmpty(strategyTabData.strategyTask?.value)) {
            errorMessage(
              "Strategy Task is a required field, you can’t leave it blank"
            );
            return false;
          }
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
      return true;
    }
  };

  // Create/Update portfolio Price
  const portfolioPriceCreateUpdate = async () => {
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
      const portfolioPriceCreate = await portfolioPriceCreation(priceReqObj);
      if (portfolioPriceCreate.status === 200) {
        setPriceTabData({
          ...priceTabData,
          portfolioPriceId: portfolioPriceCreate.data.portfolioPriceId,
          netPrice: portfolioPriceCreate.data.totalPrice,
          calculatedPrice: portfolioPriceCreate.data.calculatedPrice,
        });
        return true;
      } else {
        return false;
      }
    } else {
      const portfolioPriceUpdate = await updatePortfolioPrice(
        priceReqObj,
        priceTabData.portfolioPriceId
      );
      if (portfolioPriceUpdate.status === 200) {
        setPriceTabData({
          ...priceTabData,
          netPrice: portfolioPriceUpdate.data.totalPrice,
          calculatedPrice: portfolioPriceUpdate.data.calculatedPrice,
        });
        return true;
      } else {
        return false;
      }
    }
  };

  // Create/Update Price Agreement
  const portfolioPriceAgreementCreateUpdate = async () => {
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
        const priceAgreementCreate = await portfolioPriceAgreementCreation(
          reqObj
        );
        if (priceAgreementCreate.status === 200) {
          _priceAgreementIds.push({
            priceAgreementId: priceAgreementCreate.data.priceAgreementId,
          });
        }
      }
    }
    setPriceAgreementIds(_priceAgreementIds);
  };

  // Create coverage
  const createPortfolioCoverage = async () => {
    try {
      let _portfolioCoverageIds = [...portfolioCoverageIds];
      for (let i = 0; i < selectedCoverageData.length; i++) {
        if (
          selectedCoverageData[i].model === "" ||
          selectedCoverageData[i].family === ""
        ) {
          throw "Family or Model values are missing";
        }
        let reqObj = {
          coverageId: 0,
          serviceId: 0,
          modelNo: selectedCoverageData[i].model,
          serialNumber:
            selectedCoverageData[i].includedSerialNoModalData[0].serialNumber
              ?.value || "",
          startSerialNumber: "",
          endSerialNumber: "",
          serialNumberPrefix: selectedCoverageData[i].prefix,
          family: selectedCoverageData[i].family,
          make: selectedCoverageData[i].make,
          fleet: "",
          fleetSize: "SMALL",
          location: "",
          startDate: "",
          endDate: "",
          actions: "",
          createdAt: "",
        };

        const coverageCreate = await createCoverage(reqObj);
        _portfolioCoverageIds.push({ coverageId: coverageCreate.coverageId });
      }
      setPortfolioCoverageIds(_portfolioCoverageIds);
    } catch (error) {
      errorMessage(error);
      return;
    }
  };

  // Optional Services Modal Show|Hide
  const handleOptionalServiceModal = () => {
    setShowOptionalServicesModal(!showOptionalServicesModal);
  };

  // Select Optional Services Modal Show|Hide
  const handleSelectedServiceModal = () => {
    setShowSelectedServicesModal(!showSelectedServicesModal);
  };

  // update portfolio at item Level
  const handleUpdatePortfolioOnItem = async (itemIds = []) => {
    return new Promise((resolve, reject) => {
      // optionsalSerivce
      let _optionalServices = "";
      if (selectedService.length !== 0) {
        _optionalServices = selectedService.map((obj) => obj.itemId).join(",");
      }
      let requestObj = {
        portfolioId: portfolioRecordId,
        headerType: generalTabData.headerType?.value || "",
        name: generalTabData.name,
        description: generalTabData.description,
        externalReference: generalTabData.externalReference,
        customerSegment: generalTabData.customerSegment?.value || "",

        validFrom: validityTabData.validFrom,
        validTo: validityTabData.validTo,
        startUsage: validityTabData.fromInput,
        endUsage: validityTabData.toInput,
        unit: validityTabData.from?.value || "EMPTY",

        usageCategory: strategyTabData.categoryUsage?.value || "EMPTY",
        strategyTask: strategyTabData.strategyTask?.value || "EMPTY",
        taskType: strategyTabData.taskType?.value || "EMPTY",
        optionalServices: _optionalServices,
        responseTime: strategyTabData.responseTime?.value || "EMPTY",
        productHierarchy: strategyTabData.productHierarchy?.value || "EMPTY",
        geographic: strategyTabData.geographic?.value || "EMPTY",

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

        items: itemIds.length !== 0 ? itemIds : portfolioItemsIds,
        coverages: portfolioCoverageIds,

        status: portfolioStatus?.value,
        supportLevel: portfolioSupportLevel?.value,

        machineType: "EMPTY",
        searchTerm: "",
        lubricant: true,
        customerId: 0,
        customerGroup: "",
        availability: "EMPTY",
        type: "EMPTY",
        application: "EMPTY",
        contractOrSupport: "EMPTY",
        lifeStageOfMachine: "EMPTY",
        numberOfEvents: 0,
        rating: "",
        additionals: "",
        template: true,
        visibleInCommerce: true,
      };

      let rUrl = PORTFOLIO_URL() + "/" + portfolioRecordId;
      callPutApi(
        null,
        rUrl,
        requestObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          resolve(false);
        }
      );
    });
  };

  // handle next Click for Portfolio Create/Update
  const handleNextClick = async (e) => {
    try {
      let { id } = e.target;

      // optionsalSerivce
      let _optionalServices = "";
      if (selectedService.length !== 0) {
        _optionalServices = selectedService.map((obj) => obj.itemId).join(",");
      }
      // strategyTabData
      let requestObj = {
        portfolioId: portfolioRecordId,
        headerType: generalTabData.headerType?.value || "",
        name: generalTabData.name,
        description: generalTabData.description,
        externalReference: generalTabData.externalReference,
        customerSegment: generalTabData.customerSegment?.value || "",

        validFrom: validityTabData.fromDate,
        validTo: validityTabData.toDate,
        startUsage: validityTabData.fromInput,
        endUsage: validityTabData.toInput,
        unit: validityTabData.from?.value || "EMPTY",

        usageCategory: strategyTabData.categoryUsage?.value || "EMPTY",
        strategyTask: strategyTabData.strategyTask?.value || "EMPTY",
        taskType: strategyTabData.taskType?.value || "EMPTY",
        optionalServices: _optionalServices,
        responseTime: strategyTabData.responseTime?.value || "EMPTY",
        productHierarchy: strategyTabData.productHierarchy?.value || "EMPTY",
        geographic: strategyTabData.geographic?.value || "EMPTY",

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

        items: portfolioItemsIds,
        coverages: portfolioCoverageIds,

        status: portfolioStatus?.value,
        supportLevel: portfolioSupportLevel?.value,

        machineType: "EMPTY",
        searchTerm: "",
        lubricant: true,
        customerId: 0,
        customerGroup: "",
        availability: "EMPTY",
        type: "EMPTY",
        application: "EMPTY",
        contractOrSupport: "EMPTY",
        lifeStageOfMachine: "EMPTY",
        numberOfEvents: 0,
        rating: "",
        additionals: "",
        template: true,
        visibleInCommerce: true,
      };
      if (!checkInputValidation(id)) {
        return;
      }
      if (id == "general") {
        if (isEmpty(portfolioRecordId)) {
          const portfolioCreate = await createPortfolio(requestObj);
          if (portfolioCreate.status === 200) {
            successMessage(
              capitalizeFirstLetter(generalTabData.headerType?.value) +
                " " +
                generalTabData.name +
                " Created successfully"
            );
            setPortfolioRecordId(portfolioCreate.data.portfolioId);
            setPortfolioHeaderActiveTab("validity");
            setPortfolioTabsEditView((prev) => ({
              ...prev,
              generalTabEdit: true,
            }));
          }
        } else {
          const portfolioUpdate = await updatePortfolio(
            portfolioRecordId,
            requestObj
          );
          if (portfolioUpdate.status === 200) {
            successMessage(
              capitalizeFirstLetter(generalTabData.headerType?.value) +
                generalTabData.name +
                " Updated successfully"
            );
            setPortfolioHeaderActiveTab("validity");
            setPortfolioTabsEditView((prev) => ({
              ...prev,
              generalTabEdit: true,
            }));
          }
        }
      } else if (id == "validity") {
        const portfolioUpdate = await updatePortfolio(
          portfolioRecordId,
          requestObj
        );
        if (portfolioUpdate.status === 200) {
          successMessage(
            capitalizeFirstLetter(generalTabData.headerType?.value) +
              generalTabData.name +
              " Updated successfully"
          );
        }
        setPortfolioHeaderActiveTab("strategy");
        setPortfolioTabsEditView((prev) => ({
          ...prev,
          validityTabEdit: true,
        }));
      } else if (id == "strategy") {
        const portfolioUpdate = await updatePortfolio(
          portfolioRecordId,
          requestObj
        );
        if (portfolioUpdate.status === 200) {
          successMessage(
            capitalizeFirstLetter(generalTabData.headerType?.value) +
              generalTabData.name +
              " Updated successfully"
          );
          setPortfolioHeaderActiveTab(
            isPriceAgreementDisable ? "priceAgreement" : "price"
          );
          setPortfolioTabsEditView((prev) => ({
            ...prev,
            strategyTabEdit: true,
          }));
        }
      } else if (id == "price") {
        if (portfolioPriceCreateUpdate()) {
          const portfolioUpdate = await updatePortfolio(
            portfolioRecordId,
            requestObj
          );
          if (portfolioUpdate.status === 200) {
            successMessage(
              capitalizeFirstLetter(generalTabData.headerType?.value) +
                generalTabData.name +
                " Updated successfully"
            );
            setPortfolioHeaderActiveTab("coverage");
            setPortfolioTabsEditView((prev) => ({
              ...prev,
              priceTabEdit: true,
            }));
          }
        }
      } else if (id == "priceAgreement") {
        portfolioPriceAgreementCreateUpdate();
        setPortfolioHeaderActiveTab("coverage");
        setPortfolioTabsEditView((prev) => ({
          ...prev,
          priceAgreementTabEdit: true,
        }));
      } else if (id == "coverage") {
        createPortfolioCoverage();
        setPortfolioHeaderActiveTab("administrative");
        setPortfolioTabsEditView((prev) => ({
          ...prev,
          coverageTabEdit: true,
        }));
      } else if (id == "administrative") {
        const portfolioUpdate = await updatePortfolio(
          portfolioRecordId,
          requestObj
        );
        if (portfolioUpdate.status === 200) {
          successMessage(
            capitalizeFirstLetter(generalTabData.headerType?.value) +
              generalTabData.name +
              " Updated successfully"
          );
          setPortfolioTabsEditView((prev) => ({
            ...prev,
            administrativeTabEdit: true,
          }));
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
      return;
    }
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <LoadingProgress />
          </div>
        ) : (
          <>
            <div className="container-fluid ">
              <PortfolioHeader
                portfolioSupportLevel={portfolioSupportLevel}
                portfolioStatus={portfolioStatus}
                supportLevelKeyValuePair={supportLevelKeyValuePair}
                portfolioStatusKeyValuePair={portfolioStatusKeyValuePair}
                setIsActivePortfolio={setIsActivePortfolio}
                handlePortfolioSupportLevel={handlePortfolioSupportLevel}
                handlePortfolioStatus={handlePortfolioStatus}
              />
              <div className="card p-4 mt-5">
                <h5 className="d-flex justify-content-between align-items-center mb-0">
                  <div className="d-flex align-items-center">
                    <span className="mr-3" style={{ whiteSpace: "pre" }}>
                      {portfolioRecordId !== 0
                        ? "Portfolio Details"
                        : "New Portfolio*"}
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
                    onClick={goBackToRecentPortfolio}
                    className="btn bg-primary text-white cursor"
                  >
                    Back
                  </button>
                </h5>
                <Box
                  className="mt-4"
                  sx={{ width: "100%", typography: "body1" }}
                >
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
                          disabled={isPriceAgreementDisable}
                          value={"price"}
                        />
                        <Tab
                          label="Price Agreement"
                          disabled={!isPriceAgreementDisable}
                          value={"priceAgreement"}
                        />
                        <Tab label="Coverage" value={"coverage"} />
                        <Tab label="Administrative" value={"administrative"} />
                      </TabList>
                    </Box>
                    <TabPanel value={"general"}>
                      {" "}
                      {viewGeneralTabData()}
                    </TabPanel>
                    <TabPanel value={"validity"}>
                      {viewValidityTabData()}
                    </TabPanel>
                    <TabPanel value={"strategy"}>
                      {viewStrategyTabData()}
                    </TabPanel>
                    <TabPanel value={"price"}>{viewPriceTabData()}</TabPanel>
                    <TabPanel
                      value={"priceAgreement"}
                      className="customTabPanel"
                    >
                      {viewPriceAgreementTabData()}
                    </TabPanel>
                    <TabPanel value="coverage">
                      {viewCoverageTabData()}
                    </TabPanel>
                    <TabPanel value="administrative">
                      {viewAdministrativeTabData()}
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
              <PortfolioItemsList
                componentDataTabShow={
                  strategyTabData.categoryUsage?.value === "REPAIR_OR_REPLACE"
                    ? true
                    : false
                }
                portfolioRecordId={portfolioRecordId}
                itemsList={portfolioItemsList}
                setPortfolioItemsList={setPortfolioItemsList}
                portfolioItemsIds={portfolioItemsIds}
                setPortfolioItemsIds={setPortfolioItemsIds}
                priceMethodKeyValuePair={priceMethodKeyValuePair}
                priceTypeKeyValuePair={priceTypeKeyValuePair}
                priceHeadTypeKeyValuePair={priceHeadTypeKeyValuePair}
                currencyKeyValuePair={currencyKeyValuePair}
                showOptionalServicesModal={showOptionalServicesModal}
                handleOptionalServiceModal={handleOptionalServiceModal}
                checkedService={checkedService}
                setCheckedService={setCheckedService}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                handleUpdatePortfolio={handleUpdatePortfolioOnItem}
                supportLevelKeyValuePair={supportLevelKeyValuePair}
                portfolioStatusKeyValuePair={portfolioStatusKeyValuePair}
                customerSegmentKeyValuePair={customerSegmentKeyValuePair}
                machineComponentKeyValuePair={machineComponentKeyValuePair}
              />
            </div>
          </>
        )}
      </div>
      {(showOptionalServicesModal || showSelectedServicesModal) && (
        <OptionalServiceModal
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
      <ToastContainer />
    </>
  );
};

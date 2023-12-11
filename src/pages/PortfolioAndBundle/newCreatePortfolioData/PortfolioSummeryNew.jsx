import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";
import Loader from "react-js-loader";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import SearchIcon from "@mui/icons-material/Search";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { getFormatDateTime } from "./utilities/dateUtilities";
import { errorMessage } from "./utilities/toastMessage";
import { isEmpty } from "./utilities/textUtilities";
import DataTable from "react-data-table-component";
import BundleServiceAddUpdate from "./BundleServiceAddUpdate";
import {
  getPortfolioAndSolutionCommonConfig,
  getPortfolioCommonConfig,
  getSearchCoverageForFamily,
  // getSearchForRecentPortfolio,
  // getServiceBundleItemPrices,
  getSolutionPriceCommonConfig,
  getTypeKeyValue,
  itemSearchDropdown,
  portfolioSearchDropdownList,
  portfolioSearchTableDataList,
  recentItemsList,
} from "../../../services/index";

import { selectCustomStyle, dataTableCustomStyle } from "./itemConstant";
import {
  GET_RECENT_ITEMS_LIST_URL,
  PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
  RECENT_PORTFOLIO_URL,
} from "services/CONSTANTS";
import { getApiCall } from "services/searchQueryService";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import LoadingProgress from "pages/Repair/components/Loader";
import { useSelector } from "react-redux";

const portfolioSearchOptions = [
  { label: "Make", value: "make" },
  { label: "Model", value: "model" },
  { label: "Prefix", value: "prefix" },
  { label: "Family", value: "family" },
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

const bundleServiceSearchOptions = [
  { label: "Make", value: "itemHeaderMake" },
  { label: "Family", value: "itemHeaderFamily" },
  { label: "Model", value: "model" },
  { label: "Prefix", value: "prefix" },
  { label: "Name", value: "itemName" },
  { label: "Description", value: "itemHeaderDescription" },
];

export const PortfolioSummary = () => {
  const history = useHistory();
  const {
    supportLevelKeyValuePair: itemVersionKeyValuePairs,
    portfolioStatusKeyValuePair: itemStatusKeyValuePairs,
    customerSegmentKeyValuePair,
    machineComponentKeyValuePair,
    priceMethodKeyValuePair,
    priceTypeKeyValuePair,
    priceHeadTypeKeyValuePair,
    currencyKeyValuePair,
    frequencyKeyValuePairs,
    unitKeyValuePairs,
    // validityKeyValuePair,
    // priceListKeyValuePair,
    ...newdataResponse
  } = useSelector((state) => state.commonAPIReducer);
  const [recentTabIs, setRecentTabIs] = useState("portfolio");
  const [recentPortfolios, setRecentPortfolios] = useState([]);
  const [recentBundles, setRecentBundles] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [searchParameter, setSearchParameter] = useState([
    {
      id: 0,
      itemType: "",
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      selectedKeyValue: "",
    },
  ]);
  const [searchResultData, setSearchResultData] = useState([]);

  // const [customerSegmentKeyValuePair, setCustomerSegmentKeyValuePair] =
  //   useState([]);
  // const [machineComponentKeyValuePair, setMachineComponentKeyValuePair] =
  //   useState([]);
  // const [itemVersionKeyValuePairs, setItemVersionKeyValuePairs] = useState([]);
  // const [itemStatusKeyValuePairs, setItemStatusKeyValuePairs] = useState([]);
  // const [frequencyKeyValuePairs, setFrequencyKeyValuePairs] = useState([]);
  // const [unitKeyValuePairs, setUnitKeyValuePairs] = useState([]);
  // const [priceMethodKeyValuePair, setPriceMethodKeyValuePair] = useState([]);
  // const [priceTypeKeyValuePair, setPriceTypeKeyValuePair] = useState([]);
  // const [priceHeadTypeKeyValuePair, setPriceHeadTypeKeyValuePair] = useState(
  //   []
  // );
  // const [currencyKeyValuePair, setCurrencyKeyValuePair] = useState([]);

  const [showBundleServiceModel, setShowBundleServiceModel] = useState(false);
  const [itemFlag, setItemFlag] = useState("");
  const [itemId, setItemId] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [itemEditModeOn, setItemEditModeOn] = useState(false);

  const [recentPortfolioLoader, setRecentPortfolioLoader] = useState(false);
  const [recentBundleLoaer, setRecentBundleLoaer] = useState(false);
  const [recentServiceLoader, setRecentServiceLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);

    // get Recent Portfolio List
    getRecentPortfolio();

    // get Recent Service Items
    getRecentServiceItem();

    // get Recent Bundle Items
    getRecentBundleItem();

    // // get customer segment key Value Pairs
    // getPortfolioCommonConfig("customer-segment")
    //   .then((res) => {
    //     const options = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key !== "EMPTY") {
    //           options.push({ value: d.key, label: d.value });
    //         }
    //       });
    //     setCustomerSegmentKeyValuePair(options);
    //   })
    //   .catch((error) => {
    //     return;
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

    // // get item version key value Pair
    // getSolutionPriceCommonConfig("support-level")
    //   .then((res) => {
    //     const options = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key !== "EMPTY") {
    //           options.push({ value: d.key, label: d.value });
    //         }
    //       });
    //     setItemVersionKeyValuePairs(options);
    //   })
    //   .catch((err) => {
    //     return;
    //   });

    // // get item status key value Pair
    // getSolutionPriceCommonConfig("status")
    //   .then((res) => {
    //     const options = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key !== "EMPTY") {
    //           options.push({ value: d.key, label: d.value });
    //         }
    //       });
    //     setItemStatusKeyValuePairs(options);
    //   })
    //   .catch((err) => {
    //     return;
    //   });

    // // get frequency key-value pair
    // getPortfolioAndSolutionCommonConfig("frequency")
    //   .then((res) => {
    //     if (res.status === 200) {
    //       const options = [];
    //       res.length !== 0 &&
    //         res.data.map((d) => {
    //           if (d.key !== "EMPTY") {
    //             options.push({ value: d.key, label: d.value });
    //           }
    //         });
    //       setFrequencyKeyValuePairs(options);
    //     }
    //   })
    //   .catch((err) => {
    //     return;
    //   });

    // // get unit key-value pairs
    // getPortfolioAndSolutionCommonConfig("unit")
    //   .then((res) => {
    //     if (res.status === 200) {
    //       const options = [];
    //       res.data.length !== 0 &&
    //         res.data.map((d) => {
    //           if (d.key !== "EMPTY" && d.key !== "MONTH") {
    //             options.push({ value: d.key, label: d.value });
    //           }
    //         });
    //       setUnitKeyValuePairs(options);
    //     }
    //   })
    //   .catch((err) => {
    //     return;
    //   });

    // // get Price-method key-value Pair
    // getSolutionPriceCommonConfig("price-method")
    //   .then((res) => {
    //     const priceMethodOptions = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key != "EMPTY") {
    //           priceMethodOptions.push({ value: d.key, label: d.value });
    //         }
    //       });
    //     setPriceMethodKeyValuePair(priceMethodOptions);
    //   })
    //   .catch((err) => {
    //     return;
    //   });

    // // get Price-Type key-value Pair
    // getSolutionPriceCommonConfig("price-type")
    //   .then((res) => {
    //     const priceTypeOptions = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key != "EMPTY") {
    //           priceTypeOptions.push({ value: d.key, label: d.value });
    //         }
    //       });
    //     setPriceTypeKeyValuePair(priceTypeOptions);
    //   })
    //   .catch((err) => {
    //     return;
    //   });

    // //get price-head-type key-value pair
    // getSolutionPriceCommonConfig("price-head-type")
    //   .then((res) => {
    //     const priceHeadTypeOptions = [];
    //     res.length !== 0 &&
    //       res.map((d) => {
    //         if (d.key != "EMPTY") {
    //           priceHeadTypeOptions.push({ value: d.key, label: d.value });
    //         }
    //       });
    //     setPriceHeadTypeKeyValuePair(priceHeadTypeOptions);
    //   })
    //   .catch((err) => {
    //     return;
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
    setShowLoader(false);
  }, []);

  // get Recent Portfolio List
  const getRecentPortfolio = () => {
    setRecentPortfolioLoader(true);
    callGetApi(
      null,
      RECENT_PORTFOLIO_URL + "/recent",
      (response) => {
        if (response.status === API_SUCCESS) {
          setRecentPortfolioLoader(false);
          setRecentPortfolios(response.data);
        } else {
          setRecentPortfolioLoader(false);
        }
      },
      (error) => {
        setRecentPortfolioLoader(false);
      }
    );
  };

  // get Recent Service Items
  const getRecentServiceItem = () => {
    setRecentServiceLoader(true);
    callGetApi(
      null,
      `${GET_RECENT_ITEMS_LIST_URL}SERVICE`,
      (response) => {
        if (response.status === API_SUCCESS) {
          setRecentServiceLoader(false);
          setRecentServices(response.data);
        } else {
          setRecentServiceLoader(false);
        }
      },
      (error) => {
        setRecentServiceLoader(false);
      }
    );
  };

  // get Recent Bundle Items
  const getRecentBundleItem = () => {
    setRecentBundleLoaer(true);
    callGetApi(
      null,
      `${GET_RECENT_ITEMS_LIST_URL}BUNDLE_ITEM`,
      (response) => {
        if (response.status === API_SUCCESS) {
          setRecentBundleLoaer(false);
          setRecentBundles(response.data);
        } else {
          setRecentBundleLoaer(false);
        }
      },
      (error) => {
        setRecentBundleLoaer(false);
      }
    );
  };

  useEffect(() => {
    if (!showBundleServiceModel) {
      setItemId(null);
      setItemFlag("");
      setItemEditModeOn(false);
    }
  }, [showBundleServiceModel]);

  // view Bundle/Service Details
  const viewBundleServiceDetails = (row) => {
    setItemEditModeOn(true);
    setItemId(row.itemId);
    setItemFlag(row.bundleFlag === "SERVICE" ? "SERVICE" : "BUNDLE");
    setShowBundleServiceModel(true);
  };

  // change Create type Portfolio/Bundle/Service
  const handleCreateTypeChange = (e) => {
    if (e.value === "PORTFOLIO") {
      history.push({
        pathname: "/portfolio/new",
        state: {
          portfolioId: null,
          type: "new",
        },
      });
    } else {
      setItemFlag(e.value);
      setShowBundleServiceModel(true);
      setItemId(null);
      setItemEditModeOn(false);
    }
  };

  // Select Search Itm Type Portfolio/Bundle/Service
  const handleSelectSearchType = (e) => {
    setSearchParameter([
      {
        id: 0,
        itemType: e,
        selectFamily: "",
        selectOperator: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);
    setSearchResultData([]);
  };

  // select AND/OR operator for search
  const handleSelectOperator = (e, id) => {
    const _searchParameter = [...searchParameter];
    let obj = _searchParameter[id];
    obj.selectOperator = e;
    _searchParameter[id] = obj;
    setSearchParameter([..._searchParameter]);
  };

  // check disable option which selected in previous
  const handleCheckDisableOptions = (option) => {
    if (searchParameter.length > 1) {
      if (
        searchParameter[0].selectFamily.value === "name" ||
        searchParameter[0].selectFamily.value === "description"
      ) {
        if (option.value === "name" || option.value === "description") {
          return true;
        }
      } else {
        if (option.value === searchParameter[0].selectFamily.value) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  // select family type like model/make
  const handleSelectFamily = (e, i) => {
    const _searchParameter = [...searchParameter];
    const updateObj = {
      ..._searchParameter[i],
      inputSearch: "",
      selectOptions: [],
      selectFamily: e,
    };
    _searchParameter[i] = updateObj;
    setSearchParameter(_searchParameter);
  };

  // handle Search items dropdown list
  const handleSearchDropdownData = (e, id) => {
    let _searchParameter = [...searchParameter];
    let obj = _searchParameter[id];
    let responseArr = [];
    if (e.target.value.length > 0) {
      if (_searchParameter[0].itemType?.value === "PORTFOLIO") {
        if (
          _searchParameter[id].selectFamily.value === "name" ||
          _searchParameter[id].selectFamily.value === "description"
        ) {
          portfolioSearchDropdownList(
            `${_searchParameter[id].selectFamily.value}/${e.target.value}`
          )
            .then((res) => {
              if (res.status === 200) {
                for (let i = 0; i < res.data.length; i++) {
                  responseArr.push(res.data[i].key);
                }
              }
              obj.selectOptions = responseArr;
              _searchParameter[id] = obj;
              setSearchParameter([..._searchParameter]);
              $(`.scrollbar-${id}`).css("display", "block");
            })
            .catch((error) => {
              return;
            });
        } else {
          getSearchCoverageForFamily(
            _searchParameter[id].selectFamily.value,
            e.target.value
          )
            .then((res) => {
              obj.selectOptions = res;
              _searchParameter[id] = obj;
              setSearchParameter([..._searchParameter]);
              $(`.scrollbar-${id}`).css("display", "block");
            })
            .catch((error) => {
              return;
            });
        }
      } else {
        let searchUrl =
          _searchParameter[id].selectFamily.value +
          "/" +
          e.target.value +
          "?bundle_flag=" +
          _searchParameter[0].itemType?.value;
        itemSearchDropdown(searchUrl)
          .then((res) => {
            if (res.status === 200) {
              for (let i = 0; i < res.data.length; i++) {
                responseArr.push(res.data[i].key);
              }
            }
            obj.selectOptions = responseArr;
            _searchParameter[id] = obj;
            setSearchParameter([..._searchParameter]);
            $(`.scrollbar-${id}`).css("display", "block");
          })
          .catch((error) => {
            return;
          });
      }
      obj.inputSearch = e.target.value;
      setSearchParameter([..._searchParameter]);
    } else {
      obj.inputSearch = e.target.value;
      obj.selectOptions = [];
      setSearchParameter([..._searchParameter]);
    }
  };

  // handle Select item from dropdown list
  const handleSelectDropdownItem = (currentItem, id) => {
    const _searchParameter = [...searchParameter];
    let obj = _searchParameter[id];
    obj.inputSearch =
      searchParameter[0].itemType?.value === "PORTFOLIO" &&
      obj.selectFamily.value !== "name" &&
      obj.selectFamily.value !== "description"
        ? currentItem
        : currentItem.split("#")[1];
    obj.selectedOption =
      searchParameter[0].itemType?.value === "PORTFOLIO" &&
      obj.selectFamily.value !== "name" &&
      obj.selectFamily.value !== "description"
        ? currentItem
        : currentItem.split("#")[1];
    obj.selectedKeyValue =
      searchParameter[0].itemType?.value === "PORTFOLIO" &&
      obj.selectFamily.value !== "name" &&
      obj.selectFamily.value !== "description"
        ? currentItem
        : currentItem.split("#")[0];
    _searchParameter[id] = obj;
    setSearchParameter([..._searchParameter]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  // add more extra search fields like model/make etc.
  const addMoreSearchParameters = () => {
    const _searchParameter = [...searchParameter];
    if (_searchParameter.length !== 2) {
      _searchParameter.push({
        id: _searchParameter.length,
        itemType: "",
        selectOperator: "",
        selectFamily: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      });
    }
    setSearchParameter(_searchParameter);
  };

  // delete the search parameters data
  const handleDeleteSearchParameters = () => {
    setSearchParameter([]);
  };

  // search Portfolio and Bundle/Service Items
  const handleSearchData = async () => {
    try {
      if (
        isEmpty(searchParameter[0].itemType?.value) ||
        isEmpty(searchParameter[0]?.selectFamily?.value) ||
        isEmpty(searchParameter[0].inputSearch)
      ) {
        errorMessage("Please fill data properly");
        return;
      }
      let searchUrl = "";
      if (searchParameter[0].itemType?.value === "PORTFOLIO") {
        searchUrl =
          searchParameter[0]?.selectFamily?.value === "name" ||
          searchParameter[0]?.selectFamily?.value === "description"
            ? "portfolio_id=" + searchParameter[0]?.selectedKeyValue
            : searchParameter[0]?.selectFamily?.value +
              "=" +
              searchParameter[0]?.inputSearch;
      } else {
        searchUrl = "itemIds=" + searchParameter[0]?.selectedKeyValue;
      }

      for (let i = 1; i < searchParameter.length; i++) {
        if (
          isEmpty(searchParameter[i].selectFamily?.value) ||
          isEmpty(searchParameter[i].inputSearch)
        ) {
          errorMessage("Please fill data properly");
          return;
        }

        if (searchParameter[0].itemType?.value === "PORTFOLIO") {
          searchUrl =
            searchUrl +
            "&" +
            (searchParameter[0]?.selectFamily?.value === "name" ||
              searchParameter[0]?.selectFamily?.value === "description")
              ? "portfolio_id=" + searchParameter[i]?.selectedKeyValue
              : searchParameter[i]?.selectFamily?.value +
                "=" +
                searchParameter[i]?.inputSearch;
        } else {
          searchUrl =
            searchUrl +
            " " +
            searchParameter[i]?.selectOperator.value +
            " " +
            searchParameter[i]?.selectFamily?.value +
            ":'" +
            searchParameter[i]?.inputSearch +
            "'";
        }
      }

      if (searchParameter[0].itemType?.value === "PORTFOLIO") {
        const portfolioSearch = await portfolioSearchTableDataList(searchUrl);
        if (portfolioSearch.status === 200) {
          setSearchResultData(portfolioSearch.data);
        } else {
          errorMessage(
            "No information is found for your search, change the search criteria"
          );
          return;
        }
      } else {
        let loading, data, failure;
        const bundleServiceSearch = await getApiCall(
          PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + searchUrl,
          loading,
          data,
          failure
        );
        // const bundleServiceSearch = await getServiceBundleItemPrices(searchUrl);
        if (bundleServiceSearch.status === 200) {
          let _bundleServiceItems = [];
          let bundleServiceData = bundleServiceSearch.data;

          for (let i = 0; i < bundleServiceData.length; i++) {
            if (searchParameter[0].itemType?.value === "BUNDLE_ITEM") {
              if (bundleServiceData[i].bundleItems.length === 0) {
                errorMessage(
                  "No information is found for your search, change the search criteria"
                );
                return;
              }
              for (
                let j = 0;
                j < bundleServiceData[i].bundleItems.length;
                j++
              ) {
                _bundleServiceItems.push(bundleServiceData[i].bundleItems[j]);
              }
            } else if (searchParameter[0].itemType?.value === "SERVICE") {
              if (bundleServiceData[i].serviceItems.length === 0) {
                errorMessage(
                  "No information is found for your search, change the search criteria"
                );
                return;
              }
              for (
                let j = 0;
                j < bundleServiceData[i].serviceItems.length;
                j++
              ) {
                _bundleServiceItems.push(bundleServiceData[i].serviceItems[j]);
              }
            }
          }
          setSearchResultData(_bundleServiceItems);
        } else {
          errorMessage(
            "No information is found for your search, change the search criteria"
          );
          return;
        }
      }
    } catch (error) {
      return;
    }
  };

  // Portfolio table columns
  const portfolioColumns = [
    {
      name: <div>Name</div>,
      selector: (row) => row.name,
      wrap: true,
      sortable: false,
      format: (row) => row.name,
    },
    {
      name: <div>Description</div>,
      selector: (row) => row.description,
      wrap: true,
      sortable: false,
      format: (row) => row.description,
    },
    {
      name: <div>Strategy</div>,
      selector: (row) => row.strategyTask,
      wrap: true,
      sortable: false,
      format: (row) => row.strategyTask,
    },
    {
      name: <div>Task Type</div>,
      selector: (row) => row.taskType,
      wrap: true,
      sortable: false,
      format: (row) => row.taskType,
    },
    {
      name: <div>Net Price</div>,
      selector: (row) => row.netPrice,
      wrap: true,
      sortable: false,
      format: (row) => row.netPrice,
    },
    {
      name: <div>Net Price</div>,
      selector: (row) => row?.netAdditional,
      wrap: true,
      sortable: false,
      format: (row) => row?.netAdditional,
    },
    {
      name: <div>Net Parts Price</div>,
      selector: (row) => row.netPartsPrice,
      wrap: true,
      sortable: false,
      format: (row) => row.netPartsPrice,
    },
    {
      name: <div>Net Service Price</div>,
      selector: (row) => row.netServicePrice,
      wrap: true,
      sortable: false,
      format: (row) => row.netServicePrice,
    },
    {
      name: <div>Total Price</div>,
      selector: (row) => row.calculatedPrice,
      wrap: true,
      sortable: false,
      format: (row) => row.calculatedPrice,
    },
    {
      name: <div>Action</div>,
      selector: (row) => row.action,
      wrap: true,
      sortable: false,
      format: (row) => row.action,
      cell: (row, i) => (
        <div>
          <a className="cursor" onClick={() => viewPortfolioDetails(row)}>
            {" "}
            <EditOutlinedIcon />
          </a>
        </div>
      ),
    },
  ];

  // Bundle/Service table Columns
  const bundleServiceColumns = [
    {
      name: <div>Name</div>,
      selector: (row) => row.itemName,
      wrap: true,
      sortable: false,
      format: (row) => row.itemName,
    },
    {
      name: <div>Description</div>,
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: false,
      format: (row) => row.itemDescription,
    },
    {
      name: <div>Strategy</div>,
      selector: (row) => row.itemHeaderStrategy,
      wrap: true,
      sortable: false,
      format: (row) => row.itemHeaderStrategy,
    },
    {
      name: <div>Task Type</div>,
      selector: (row) => row.taskType,
      wrap: true,
      sortable: false,
      format: (row) => row.taskType,
    },
    {
      name: <div>Quantity</div>,
      selector: (row) => row.quantity,
      wrap: true,
      sortable: false,
      format: (row) => (isEmpty(row.quantity) ? 1 : row.quantity),
    },
    {
      name: <div>Recommended Value</div>,
      selector: (row) => row.recommendedValue,
      wrap: true,
      sortable: false,
      format: (row) => row.recommendedValue,
    },
    {
      name: <div>Net Parts Price</div>,
      selector: (row) => row.sparePartsPrice,
      wrap: true,
      sortable: false,
      format: (row) => row.sparePartsPrice,
    },
    {
      name: <div>Net Service Price</div>,
      selector: (row) => row.servicePrice,
      wrap: true,
      sortable: false,
      format: (row) => row.servicePrice,
    },
    {
      name: <div>Total Price</div>,
      selector: (row) => row.calculatedPrice,
      wrap: true,
      sortable: false,
      format: (row) => row.calculatedPrice,
    },
    {
      name: <div>Comments</div>,
      selector: (row) => row?.comments,
      wrap: true,
      sortable: false,
      format: (row) => row?.comments,
    },
    {
      name: <div>Action</div>,
      selector: (row) => row.action,
      wrap: true,
      sortable: false,
      format: (row) => row.action,
      cell: (row, i) => (
        <div>
          <a
            className="cursor"
            key={`action-${i}`}
            onClick={() => viewBundleServiceDetails(row)}
          >
            <EditOutlinedIcon />
          </a>
        </div>
      ),
    },
  ];

  // go to Portfolio Details page
  const viewPortfolioDetails = (portfolio) => {
    history.push({
      pathname: "/portfolio/new",
      state: {
        portfolioId: portfolio.portfolioId,
        type: "fetch",
      },
    });
  };

  // Recent Portfolio Tabs Data View
  const viewRecentPortfolio = () => (
    <div className="mt-1">
      <div className="recent-div p-3">
        <h6 className="font-weight-600 text-grey mb-0 text-uppercase">
          RECENT PORTFOLIO
        </h6>
        <div className="row">
          {recentPortfolios.length !== 0 &&
            recentPortfolios.map(
              (portfolio, i) =>
                i < 10 && (
                  <div className="col-md-4" key={"portfolio-" + i}>
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 overflow-hidden white-space">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            {portfolio.name}
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <a
                            className="btn-sm cursor"
                            onClick={() => viewPortfolioDetails(portfolio)}
                          >
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">
                        {getFormatDateTime(portfolio.updatedAt, true)}
                      </p>
                      <p className="font-size-12 mb-0">Portfolio</p>
                    </div>
                  </div>
                )
            )}
          {recentPortfolios.length === 0 && (
            <p className="font-size-12 mb-0 ml-3">No Recent Portfolio</p>
          )}
        </div>
      </div>
    </div>
  );

  // Recent Service Items Tabs Data View
  const viewRecentServices = () => (
    <div className="mt-1">
      <div className="recent-div p-3">
        <h6 className="font-weight-600 text-grey mb-0 text-uppercase">
          RECENT SERVICE
        </h6>
        <div className="row">
          {recentServices.length !== 0 &&
            recentServices.map(
              (service, i) =>
                i < 10 && (
                  <div className="col-md-4" key={"service-" + i}>
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 overflow-hidden white-space">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            {service.itemName}
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <a className="btn-sm cursor">
                            <i
                              className="fa fa-pencil"
                              aria-hidden="true"
                              onClick={() => viewBundleServiceDetails(service)}
                            />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">
                        {getFormatDateTime(service.updatedAt, true)}
                      </p>
                      <p className="font-size-12 mb-0">Service</p>
                    </div>
                  </div>
                )
            )}
          {recentServices.length === 0 && (
            <p className="font-size-12 mb-0 ml-3">No Recent Service</p>
          )}
        </div>
      </div>
    </div>
  );

  // Recent Service Items Tabs Data View
  const viewRecentBundles = () => (
    <div className="mt-1">
      <div className="recent-div p-3">
        <h6 className="font-weight-600 text-grey mb-0 text-uppercase">
          RECENT BUNDLE
        </h6>
        <div className="row">
          {recentBundles.length !== 0 &&
            recentBundles.map(
              (bundle, i) =>
                i < 10 && (
                  <div className="col-md-4" key={"bundle-" + i}>
                    <div className="recent-items mt-3">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 overflow-hidden white-space">
                          <FontAwesomeIcon
                            className=" font-size-14"
                            icon={faFileAlt}
                          />
                          <span className="font-weight-500 ml-2">
                            {bundle.itemName}
                          </span>
                        </p>
                        <div className="d-flex align-items-center">
                          <a className="btn-sm cursor">
                            <i
                              className="fa fa-pencil"
                              aria-hidden="true"
                              onClick={() => viewBundleServiceDetails(bundle)}
                            />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faShareAlt} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faFolderPlus} />
                          </a>
                          <a className="ml-3 font-size-14 cursor">
                            <FontAwesomeIcon icon={faUpload} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">
                        {getFormatDateTime(bundle.updatedAt, true)}
                      </p>
                      <p className="font-size-12 mb-0">Bundle</p>
                    </div>
                  </div>
                )
            )}
          {recentBundles.length === 0 && (
            <p className="font-size-12 mb-0 ml-3">No Recent Bundle</p>
          )}
        </div>
      </div>
    </div>
  );

  // show Loader
  const showLoadingProgress = () => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Loader
          type="spinner-default"
          bgColor={"#872ff7"}
          title={"spinner-default"}
          color={"#FFFFFF"}
          size={35}
        />
      </div>
    );
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Portfolio and Bundles</h5>
            <Select
              className="customselect1"
              id="custom"
              placeholder=" + Create"
              styles={selectCustomStyle}
              options={[
                { label: "Portfolio", value: "PORTFOLIO" },
                { label: "Service", value: "SERVICE" },
                { label: "Bundles", value: "BUNDLE" },
              ]}
              onChange={handleCreateTypeChange}
            />
          </div>
          {showLoader ? (
            // showLoadingProgress()
            <LoadingProgress />
          ) : (
            <>
              <div className="card p-4 mt-5">
                <TabContext value={recentTabIs}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      className="custom-tabs-div"
                      aria-label="lab API tabs example"
                      onChange={(e, tabValue) => setRecentTabIs(tabValue)}
                    >
                      <Tab label="Portfolio" value={"portfolio"} />
                      <Tab label="Service " value={"service"} />
                      <Tab label="Bundle" value={"bundle"} />
                    </TabList>
                  </Box>
                  <TabPanel value={"portfolio"}>
                    {viewRecentPortfolio()}
                  </TabPanel>
                  <TabPanel value={"service"}>{viewRecentServices()}</TabPanel>
                  <TabPanel value={"bundle"}>{viewRecentBundles()}</TabPanel>
                </TabContext>
              </div>
              <div className="bg-primary px-3 mb-3 border-radius-10 ">
                <div className="d-block height-66 d-md-flex justify-content-between align-items-center">
                  <div className="mx-2">
                    <div className="d-flex align-items-center bg-primary w-100">
                      <div
                        className="d-flex mr-2"
                        style={{ whiteSpace: "pre" }}
                      >
                        <h5 className="mr-2 mb-0 text-white">
                          <span>Search</span>
                        </h5>
                        <p className="ml-4 mb-0">
                          <a className="ml-3 cursor text-white cursor">
                            <EditOutlinedIcon />
                          </a>
                          <a
                            href={undefined}
                            className="ml-3 cursor text-white"
                          >
                            <ShareOutlinedIcon />
                          </a>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center w-100 mr-4">
                        <div className="row align-items-center m-0">
                          {searchParameter.map((obj, i) => (
                            <div
                              className={`customselect ${
                                i < searchParameter.length - 1 ? "p-2" : ""
                              } border-white d-flex align-items-center mr-3 my-2 border-radius-10`}
                            >
                              {i === 0 && (
                                <Select
                                  placeholder="Select Type."
                                  options={[
                                    { label: "Portfolio", value: "PORTFOLIO" },
                                    { label: "Bundle", value: "BUNDLE_ITEM" },
                                    { label: "Service", value: "SERVICE" },
                                  ]}
                                  value={obj.itemType}
                                  onChange={handleSelectSearchType}
                                />
                              )}
                              {i > 0 && (
                                <Select
                                  isClearable={true}
                                  defaultValue={{ label: "AND", value: "AND" }}
                                  options={[
                                    { label: "AND", value: "AND", id: i },
                                    { label: "OR", value: "OR", id: i },
                                  ]}
                                  placeholder="AND/OR"
                                  onChange={(e) => handleSelectOperator(e, i)}
                                  value={obj.selectOperator}
                                />
                              )}
                              <div>
                                <Select
                                  options={
                                    isEmpty(searchParameter[0].itemType?.value)
                                      ? []
                                      : searchParameter[0].itemType?.value ===
                                        "PORTFOLIO"
                                      ? portfolioSearchOptions
                                      : bundleServiceSearchOptions
                                  }
                                  onChange={(e) => handleSelectFamily(e, i)}
                                  value={obj.selectFamily}
                                  isOptionDisabled={(option) =>
                                    handleCheckDisableOptions(option)
                                  }
                                />
                              </div>
                              <div className="customselectsearch">
                                <input
                                  className="custom-input-sleact pr-1"
                                  type="text"
                                  placeholder="Search string"
                                  id={"inputSearch-" + i}
                                  value={obj.inputSearch}
                                  autoComplete="off"
                                  onChange={(e) =>
                                    handleSearchDropdownData(e, i)
                                  }
                                />
                                {
                                  <ul
                                    className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                                    id="style"
                                  >
                                    {obj.inputSearch.length !== 0 &&
                                      obj.selectOptions.length === 0 && (
                                        <li className="list-group-item">
                                          No Result found
                                        </li>
                                      )}
                                    {obj.selectOptions.map((currentItem, j) => (
                                      <li
                                        className="list-group-item"
                                        key={j}
                                        onClick={() =>
                                          handleSelectDropdownItem(
                                            currentItem,
                                            i
                                          )
                                        }
                                      >
                                        {searchParameter[0].itemType?.value ===
                                          "PORTFOLIO" &&
                                        obj.selectFamily.value !== "name" &&
                                        obj.selectFamily.value !== "description"
                                          ? currentItem
                                          : currentItem.split("#")[1]}
                                      </li>
                                    ))}
                                  </ul>
                                }
                              </div>
                              {searchParameter.length - 1 === i && (
                                <a
                                  className="btn bg-primary text-white border-radius-10 cursor"
                                  onClick={handleSearchData}
                                >
                                  <SearchIcon />
                                  <span className="ml-1">Search</span>
                                </a>
                              )}
                            </div>
                          ))}
                          <div onClick={(e) => addMoreSearchParameters(e)}>
                            <a
                              className="btn-sm text-white border mr-2 cursor"
                              style={{ border: "1px solid #872FF7" }}
                            >
                              +
                            </a>
                          </div>
                          <div onClick={handleDeleteSearchParameters}>
                            <a className="btn-sm border cursor">
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
                                  className="cls-1"
                                  d="M20,18.5a2,2,0,0,0-2,2v18a2,2,0,0,0,4,0v-18A2,2,0,0,0,20,18.5Z"
                                />
                                <path
                                  className="cls-1"
                                  d="M30,18.5a2,2,0,0,0-2,2v18a2,2,0,1,0,4,0v-18A2,2,0,0,0,30,18.5Z"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-center pl-3 py-3" />
                  </div>
                </div>
              </div>
              <div className="card">
                <div
                  style={{
                    minHeight: 200,
                    height: "auto",
                    width: "100%",
                    backgroundColor: "#fff",
                  }}
                >
                  {searchResultData.length !== 0 && (
                    <DataTable
                      columns={
                        searchParameter[0]?.itemType?.value === "PORTFOLIO"
                          ? portfolioColumns
                          : bundleServiceColumns
                      }
                      data={searchResultData}
                      customStyles={dataTableCustomStyle}
                      pagination
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showBundleServiceModel && (
        <BundleServiceAddUpdate
          show={showBundleServiceModel}
          hideModel={() => setShowBundleServiceModel(false)}
          itemFlag={itemFlag}
          customerSegmentKeyValuePair={customerSegmentKeyValuePair}
          machineComponentKeyValuePair={machineComponentKeyValuePair}
          itemVersionKeyValuePairs={itemVersionKeyValuePairs}
          itemStatusKeyValuePairs={itemStatusKeyValuePairs}
          itemId={itemId}
          setItemId={setItemId}
          itemEditModeOn={itemEditModeOn}
          frequencyKeyValuePairs={frequencyKeyValuePairs}
          unitKeyValuePairs={unitKeyValuePairs}
          priceHeadTypeKeyValuePair={priceHeadTypeKeyValuePair}
          priceTypeKeyValuePair={priceTypeKeyValuePair}
          priceMethodKeyValuePair={priceMethodKeyValuePair}
          currencyKeyValuePair={currencyKeyValuePair}
        />
      )}
    </>
  );
};

import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import $ from "jquery";
import Select from "react-select";
import { Link } from "react-router-dom";

import {
  CUSTOM_PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL,
  CUSTOM_PORTFOLIO_URL,
  GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
  GET_SEARCH_FAMILY_COVERAGE,
  PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH,
  PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL,
  PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE,
  PORTFOLIO_URL,
  SOLUTION_COVERAGE_SEARCH_DROPDOWN,
  SOLUTION_PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH,
} from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import {
  isEmpty,
  isEmptySelect,
} from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import {
  IS_PORTFOLIO,
  IS_SOLUTION,
  PORTFOLIO_SEARCH_OPTIONS,
} from "pages/Common/PortfolioAndSolutionConstants";

const PortfolioSolutionSearch = (props) => {
  const {
    customPortfolioId,
    setCustomItemsTableList,
    setSearchPortfolioSolutionItems,
    setSelectedSearchSolutionItems,
    setSearchBySolutionOrPortlio,
  } = props;

  const [searchSelector, setSearchSelector] = useState({
    id: 0,
    selectFamily: "",
    selectOperator: "",
    inputSearch: "",
    selectOptions: [],
    selectedOption: "",
    disableNameSelect: true,
    selectedName: "",
    portfolioSelectionOptions: [],
  });

  // slect text change
  const handleSelect = (e, keyName) => {
    if (keyName === "itemType") {
      setSearchSelector({
        ...searchSelector,
        itemType: e,
        selectFamily: "",
        inputSearch: "",
        selectOptions: [],
        selectedName: "",
        portfolioSelectionOptions: [],
        disableNameSelect: true,
      });
      setSearchBySolutionOrPortlio(e.value);
    } else if (keyName === "selectFamily") {
      setSearchSelector({
        ...searchSelector,
        selectFamily: e,
        inputSearch: "",
        selectOptions: [],
        selectedName: "",
        portfolioSelectionOptions: [],
        disableNameSelect: true,
      });
    } else if (keyName === "selectedName") {
      setSearchSelector({
        ...searchSelector,
        [keyName]: e,
      });
    }
  };

  // input text Search for Portfolio || Solution
  const handleInputSearch = (e) => {
    if (isEmptySelect(searchSelector.itemType?.value)) {
      errorMessage("Select Type must not be empty.");
      return;
    } else if (isEmptySelect(searchSelector.selectFamily?.value)) {
      errorMessage("Select By must not be empty.");
      return;
    }
    const _searchSelector = { ...searchSelector };
    _searchSelector.inputSearch = e.target.value;

    if (!isEmpty(e.target.value)) {
      if (searchSelector.itemType?.value === IS_PORTFOLIO) {
        if (
          searchSelector.selectFamily?.value === "name" ||
          searchSelector.selectFamily?.value === "description"
        ) {
          hanldeSearchPortfolio(
            `${searchSelector.selectFamily.value}/${e.target.value}`,
            _searchSelector
          );
        } else {
          handlePortfolioCoverageSearch(
            `${searchSelector.selectFamily.value}=${e.target.value}`,
            _searchSelector
          );
        }
      } else if (searchSelector.itemType?.value === IS_SOLUTION) {
        if (
          searchSelector.selectFamily?.value === "name" ||
          searchSelector.selectFamily?.value === "description"
        ) {
          handleSearchSolution(
            `${searchSelector.selectFamily.value}/${e.target.value}`,
            _searchSelector
          );
        } else {
          const selectedFamilyVal =
            searchSelector.selectFamily.value === "model"
              ? "modelNo"
              : searchSelector.selectFamily.value === "prefix"
              ? "serialNumberPrefix"
              : searchSelector.selectFamily.value;

          handleSolutionCoverageSearch(
            `${selectedFamilyVal}/${e.target.value}`,
            _searchSelector
          );
        }
      }
    } else {
      setSearchSelector({ ..._searchSelector });
    }
  };

  // Search For Portfolio
  const hanldeSearchPortfolio = (searchTextUrl, _searchSelector) => {
    const rUrl = `${PORTFOLIO_URL()}/${searchTextUrl}`;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const searchResultArr = [];
          for (let i = 0; i < response.data.length; i++) {
            searchResultArr.push(response.data[i].key);
          }
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: searchResultArr,
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
          $(`.scrollbar`).css("display", "block");
        } else {
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: [],
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
        }
      },
      (error) => {
        setSearchSelector({
          ...searchSelector,
          ..._searchSelector,
          selectOptions: [],
          selectedName: "",
          portfolioSelectionOptions: [],
          disableNameSelect: true,
        });
      }
    );
  };

  // Search Portfolio Coverage
  const handlePortfolioCoverageSearch = (searchTextUrl, _searchSelector) => {
    const rUrl = `${GET_SEARCH_FAMILY_COVERAGE}?${searchTextUrl}`;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: response.data,
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
          $(`.scrollbar`).css("display", "block");
        } else {
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: [],
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
        }
      },
      (error) => {
        setSearchSelector({
          ...searchSelector,
          ..._searchSelector,
          selectOptions: [],
          selectedName: "",
          portfolioSelectionOptions: [],
          disableNameSelect: true,
        });
      }
    );
    setSearchSelector({
      ...searchSelector,
      ..._searchSelector,
      selectedName: "",
      portfolioSelectionOptions: [],
      disableNameSelect: true,
    });
  };

  // search for Solution
  const handleSearchSolution = (searchTextUrl, _searchSelector) => {
    const rUrl = `${CUSTOM_PORTFOLIO_URL()}/${searchTextUrl}`;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const searchResultArr = [];
          for (let i = 0; i < response.data.length; i++) {
            searchResultArr.push(response.data[i].key);
          }
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: searchResultArr,
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
          $(`.scrollbar`).css("display", "block");
        } else {
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: [],
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
        }
      },
      (error) => {
        setSearchSelector({
          ...searchSelector,
          ..._searchSelector,
          selectOptions: [],
          selectedName: "",
          portfolioSelectionOptions: [],
          disableNameSelect: true,
        });
      }
    );
  };

  // search Solution Coverage (Custom Coverage)
  const handleSolutionCoverageSearch = (searchTextUrl, _searchSelector) => {
    const rUrl = `${SOLUTION_COVERAGE_SEARCH_DROPDOWN}/${searchTextUrl}`;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const searchResultArr = [];
          for (let i = 0; i < response.data.length; i++) {
            searchResultArr.push(response.data[i].value);
          }
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: searchResultArr,
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
          $(`.scrollbar`).css("display", "block");
        } else {
          setSearchSelector({
            ...searchSelector,
            ..._searchSelector,
            selectOptions: [],
            selectedName: "",
            portfolioSelectionOptions: [],
            disableNameSelect: true,
          });
        }
      },
      (error) => {
        setSearchSelector({
          ...searchSelector,
          ..._searchSelector,
          selectOptions: [],
          selectedName: "",
          portfolioSelectionOptions: [],
          disableNameSelect: true,
        });
      }
    );
  };

  // Select select data from search list
  const handleSearchDataSelect = (currentItem) => {
    let _searchSelector = { ...searchSelector };
    if (_searchSelector.itemType?.value === IS_PORTFOLIO) {
      if (
        _searchSelector.selectFamily?.value === "name" ||
        _searchSelector.selectFamily?.value === "description"
      ) {
        _searchSelector = {
          ..._searchSelector,
          inputSearch: currentItem.split("#")[1],
          selectedOption: currentItem.split("#")[1],
          selectedKeyValue: currentItem.split("#")[0],
          selectedName: "",
          disableNameSelect: false,
        };
        setSearchSelector({ ..._searchSelector });
        $(`.scrollbar`).css("display", "none");
      } else {
        _searchSelector = {
          ..._searchSelector,
          inputSearch: currentItem,
          selectedOption: currentItem,
          selectedKeyValue: currentItem,
          selectedName: "",
          disableNameSelect: false,
        };
        handleGetConsolidatedPortfolioDtl(
          `${_searchSelector.selectFamily.value}=${currentItem}`
        ).then((res) => {
          if (res.result) {
            _searchSelector.portfolioSelectionOptions = res.data;
            setSearchSelector({ ..._searchSelector });
            $(`.scrollbar`).css("display", "none");
          } else {
            setSearchSelector({ ..._searchSelector });
            $(`.scrollbar`).css("display", "none");
          }
        });
      }
    } else if (_searchSelector.itemType?.value === IS_SOLUTION) {
      if (
        _searchSelector.selectFamily?.value === "name" ||
        _searchSelector.selectFamily?.value === "description"
      ) {
        _searchSelector = {
          ..._searchSelector,
          inputSearch: currentItem.split("#")[1],
          selectedOption: currentItem.split("#")[1],
          selectedKeyValue: currentItem.split("#")[0],
          selectedName: "",
          disableNameSelect: false,
        };
        setSearchSelector({ ..._searchSelector });
        $(`.scrollbar`).css("display", "none");
      } else {
        _searchSelector = {
          ..._searchSelector,
          inputSearch: currentItem,
          selectedOption: currentItem,
          selectedKeyValue: currentItem,
          selectedName: "",
          disableNameSelect: false,
        };
        handleGetConsolidatedSolutionDtl(
          `${_searchSelector.selectFamily.value}=${currentItem}`
        ).then((res) => {
          if (res.result) {
            _searchSelector.portfolioSelectionOptions = res.data;
            setSearchSelector({ ..._searchSelector });
            $(`.scrollbar`).css("display", "none");
          } else {
            setSearchSelector({ ..._searchSelector });
            $(`.scrollbar`).css("display", "none");
          }
        });
      }
    }
  };

  // get Consolidated Portfolio Details
  const handleGetConsolidatedPortfolioDtl = async (textUrl) => {
    const rUrl = `${PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL + textUrl}`;
    return new Promise((resolve, reject) => {
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            const result = response.data;
            const searchResultArr = [];
            for (let i = 0; i < result.length; i++) {
              searchResultArr.push({
                label: result[i].name,
                value: result[i].portfolioId,
              });
            }
            resolve({
              result: true,
              data: searchResultArr,
            });
          } else {
            resolve({
              result: false,
              data: [],
            });
          }
        },
        (error) => {
          resolve({
            result: false,
            data: [],
          });
        }
      );
    });
  };

  // get Consolidated Solution (Custom Portfolio) Details
  const handleGetConsolidatedSolutionDtl = async (textUrl) => {
    const rUrl = `${CUSTOM_PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL + textUrl}`;
    return new Promise((resolve, reject) => {
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            const result = response.data;
            const searchResultArr = [];
            if (result.length !== 0) {
              for (let i = 0; i < result.length; i++) {
                searchResultArr.push({
                  label: result[i].name,
                  value: result[i].portfolioId,
                });
              }
            }
            resolve({
              result: true,
              data: searchResultArr,
            });
          } else {
            resolve({
              result: false,
              data: [],
            });
          }
        },
        (error) => {
          resolve({
            result: false,
            data: [],
          });
        }
      );
    });
  };

  // handle Search CLick for Portfolio || SOlution Items
  const handleSearch = () => {
    try {
      console.log("customPortfolioId ", customPortfolioId);
      if (isEmpty(customPortfolioId)) {
        throw "Create Solution First then You can Search Porfolio/Solution.";
      } else if (
        isEmpty(searchSelector.itemType?.value) ||
        isEmpty(searchSelector.selectFamily?.value) ||
        isEmpty(searchSelector.inputSearch)
      ) {
        throw "Please fill data properly";
      }

      if (searchSelector.itemType?.value === IS_PORTFOLIO) {
        let rUrl = PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH;
        if (
          searchSelector.selectFamily?.value === "name" ||
          searchSelector.selectFamily?.value === "description"
        ) {
          rUrl = rUrl + searchSelector.selectedKeyValue;
        } else {
          if (isEmpty(searchSelector.selectedName?.value)) {
            throw "Please fill data properly";
          }
          rUrl = rUrl + searchSelector?.selectedName?.value;
        }
        handlePortfolioItemPriceHierarchySearch(rUrl);
      } else if (searchSelector.itemType?.value === IS_SOLUTION) {
        let rUrl = SOLUTION_PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH;
        if (
          searchSelector.selectFamily?.value === "name" ||
          searchSelector.selectFamily?.value === "description"
        ) {
          rUrl = rUrl + searchSelector.selectedKeyValue;
        } else {
          if (isEmpty(searchSelector.selectedName?.value)) {
            throw "Please fill data properly";
          }
          rUrl = rUrl + searchSelector?.selectedName?.value;
        }
        handleSolutionItemPriceHierarchySearch(rUrl);
      }
    } catch (error) {
      errorMessage(error);
    }
  };

  // search Portfolio Item Price Hierachy data
  const handlePortfolioItemPriceHierarchySearch = (rUrl) => {
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const result = response.data;
        if (result.itemRelations.length !== 0) {
          let itemSearchReqUrl = "portfolio_id=" + result.portfolioId + "&";
          var itemsArray = [];
          result.itemRelations.length !== 0 &&
            result.itemRelations.map((data, i) => {
              itemsArray.push(data.portfolioItemId);
              for (let i = 0; i < data.bundles.length; i++) {
                itemsArray.push(data.bundles[i]);
              }

              for (let j = 0; j < data.services.length; j++) {
                itemsArray.push(data.services[j]);
              }
            });

          itemSearchReqUrl =
            itemSearchReqUrl +
            itemsArray.map((data) => `itemIds=${data}`).join("&");

          handleGetPortfolioBundleServicePrice(
            itemSearchReqUrl,
            result.portfolioId
          );
        } else {
          errorMessage(
            "Search Solution have not any Item realtion, change the Search criteria"
          );
        }
      } else {
        errorMessage(
          "Search Solution have not any Item realtion, change the Search criteria"
        );
      }
    });
  };

  // get Portfolio bundle|Service Item Prices
  const handleGetPortfolioBundleServicePrice = (rUrl, portfolioId) => {
    const bundleServiceReqUrl = PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + rUrl;
    callGetApi(
      bundleServiceReqUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const res = response.data;
          const _customPortfolioItems = [];

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
              _customPortfolioItems.push({
                ...data.portfolioItem,
                associatedServiceOrBundle: portfolioBundleService,
                portfolioId: portfolioId || 0,
              });
            }
            setSearchPortfolioSolutionItems(_customPortfolioItems);
            setSelectedSearchSolutionItems([]);
            // setCustomItemsTableList(_customPortfolioItems);
          });
        } else {
        }
      },
      (error) => {}
    );
  };

  // search Solution (Custom Portfolio) Item Price Hierachy data
  const handleSolutionItemPriceHierarchySearch = (rUrl) => {
    callGetApi(rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const result = response.data;
        if (result.itemRelations.length !== 0) {
          let itemSearchReqUrl = `portfolio_id=${result.portfolioId}&`;
          var itemsArray = [];
          result.itemRelations.length !== 0 &&
            result.itemRelations.map((data, i) => {
              itemsArray.push(data.portfolioItemId);
              for (let i = 0; i < data.bundles.length; i++) {
                itemsArray.push(data.bundles[i]);
              }

              for (let j = 0; j < data.services.length; j++) {
                itemsArray.push(data.services[j]);
              }
            });
          itemSearchReqUrl =
            itemSearchReqUrl +
            itemsArray.map((data) => `itemIds=${data}`).join("&");

          handleGetPortSolutionBundleServicePrice(itemSearchReqUrl);
        } else {
          errorMessage(
            "Search Solution have not any Item realtion, change the Search criteria"
          );
        }
      } else {
        errorMessage(
          "Search Solution have not any Item realtion, change the Search criteria"
        );
      }
    });
  };

  // get Solution (Custom Portfolio) bundle|Service Item Prices
  const handleGetPortSolutionBundleServicePrice = (rUrl) => {
    const customBundleServiceReqUrl =
      GET_CUSTOM_PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + rUrl;
    callGetApi(
      customBundleServiceReqUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const res = response.data;
          const _customPortfolioItems = [];
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
              _customPortfolioItems.push({
                ...data.portfolioItem,
                associatedServiceOrBundle: portfolioBundleService,
              });
            }
            setSearchPortfolioSolutionItems(_customPortfolioItems);
            setSelectedSearchSolutionItems([]);
            // setCustomItemsTableList(_customPortfolioItems);
          });
        } else {
        }
      },
      (error) => {}
    );
  };

  return (
    <>
      <div
        className="input-group-prepend bg-white"
        style={{ borderRadius: "5px" }}
      >
        <span
          className=" bg-white input-group-text border-0 pr-0 "
          id="basic-addon1"
        >
          <SearchIcon />
        </span>
      </div>
      <div className="input-group-prepend">
        <div
          className={`customselect p-2 border-white d-flex align-items-center mr-3 my-2 border-radius-10`}
        >
          <Select
            className="color-dropdown"
            placeholder="Select Type."
            options={[
              { label: "Portfolio", value: "PORTFOLIO" },
              { label: "Solution", value: "SOLUTION" },
            ]}
            value={searchSelector.itemType}
            onChange={(e) => handleSelect(e, "itemType")}
          />
          <div>
            <Select
              options={
                isEmpty(searchSelector.itemType) ? [] : PORTFOLIO_SEARCH_OPTIONS
              }
              placeholder="Select By..."
              className="color-dropdown"
              value={searchSelector.selectFamily}
              onChange={(e) => handleSelect(e, "selectFamily")}
            />
          </div>
          <div
            className={`customselectsearch 
            ${
              isEmpty(searchSelector.selectFamily)
                ? "family-search"
                : searchSelector.selectFamily?.value === "name" ||
                  searchSelector.selectFamily?.value === "description"
                ? "family-search"
                : "family-search-add"
            }`}
          >
            <input
              className="custom-input-sleact pr-1"
              type="text"
              placeholder="Search string"
              value={searchSelector.inputSearch}
              onChange={handleInputSearch}
              id={"inputSearch"}
              autoComplete="off"
            />
            {
              <ul
                className={`list-group customselectsearch-list scrollbar scrollbar style`}
                id="style"
              >
                {!isEmpty(searchSelector.inputSearch) &&
                  searchSelector.selectOptions.length !== 0 &&
                  searchSelector.selectOptions.map((currentItem, j) => (
                    <li
                      className="list-group-item"
                      key={j}
                      onClick={() => handleSearchDataSelect(currentItem)}
                    >
                      {searchSelector.selectFamily.value === "name" ||
                      searchSelector.selectFamily.value === "description"
                        ? currentItem.split("#")[1]
                        : currentItem}
                    </li>
                  ))}
                {!isEmpty(searchSelector.inputSearch) &&
                  searchSelector.selectOptions.length === 0 && (
                    <span style={{ color: "red", fontSize: 12, height: 2 }}>
                      No Options Found!
                    </span>
                    // <li className="list-group-item">No Options Found!</li>
                  )}
              </ul>
            }
          </div>
          {!isEmptySelect(searchSelector.selectFamily) &&
            !(
              searchSelector.selectFamily.value === "name" ||
              searchSelector.selectFamily.value === "description"
            ) && (
              <div className="name-select-portfolio">
                <Select
                  options={searchSelector.portfolioSelectionOptions}
                  onChange={(e) => handleSelect(e, "selectedName")}
                  className="color-dropdown"
                  placeholder="Select name"
                  value={searchSelector.selectedName}
                  isDisabled={searchSelector.disableNameSelect}
                />
              </div>
            )}
          <Link
            className="btn bg-primary text-white border-radius-10 cursor"
            style={{ zIndex: 0 }}
            onClick={handleSearch}
            // onClick={showSearchPortfolioData}
          >
            <SearchIcon />
            <span className="ml-1">Search</span>
          </Link>
        </div>
      </div>
      <div />
    </>
  );
};

export default PortfolioSolutionSearch;

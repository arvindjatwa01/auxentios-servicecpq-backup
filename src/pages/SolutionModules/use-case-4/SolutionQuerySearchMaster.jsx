import React, { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import $ from "jquery";
import Select from "react-select";
import { Link } from "react-router-dom";

import {
  CUSTOM_PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL, CUSTOM_PORTFOLIO_URL,
  PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL, PORTFOLIO_URL,
} from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import { isEmpty, isEmptySelect, } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import {
  AND_OR_OPERATOR_OPTIONS, DEFAULT_AND_OR_OPERATOR_VALUE,
  PORTFOLIO_SEARCH, PORTFOLIO_SEARCH_OPTIONS, SOLUTION_SEARCH,
} from "pages/Common/PortfolioAndSolutionConstants";


const SolutionnQuerySearchMaster = (props) => {
  const { searchFlag, setSearchedResult } = props;
  const [searchSelector, setSearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      // itemType: { label: '', value: '' },
      itemType: "",
      itemTypeOperator: "",
    },
  ]);

  // add more search Selector
  const addMoreSearchSelector = () => {
    const _searchSelector = [...searchSelector];
    _searchSelector.push({
      id: _searchSelector.length,
      selectOperator: "",
      selectFamily: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      // itemType: querySearchSelector[0].itemType,
    });
    setSearchSelector(_searchSelector);
  };

  // remove search selector
  const handleDeleteSearchSelector = () => {
    // const _searchSelector = [...searchSelector];
    // let selectorLength = _searchSelector.length;
    // _searchSelector.splice(selectorLength === 0 ? 0 : selectorLength.length - 1, 1)
    // setSearchSelector(_searchSelector);
    setSearchSelector([]);
  };

  // handle And/Or Operator
  const handleAndOrOperator = (e, i) => {
    let _searchSelector = [...searchSelector];
    let obj = _searchSelector[i];
    obj.selectOperator = e;
    _searchSelector[i] = obj;
    setSearchSelector([..._searchSelector]);
  };

  // handle Select Item Type || family Type Option
  const handleFamily = (e, i, keyName) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[i];
    obj[keyName] = e;
    tempArray[i] = obj;
    setSearchSelector([...tempArray]);
  };

  // input fields Search
  const handleInputSearch = async (e, i) => {
    try {
      const { id, value } = e.target;
      let _searchSelector = [...searchSelector];
      let obj = _searchSelector[i];

      let rUrl = "";
      if (searchFlag === PORTFOLIO_SEARCH) {
        rUrl = rUrl + PORTFOLIO_URL() + "/";
      } else if (searchFlag === SOLUTION_SEARCH) {
        rUrl = rUrl + CUSTOM_PORTFOLIO_URL() + "/";
      }
      if (value.length > 0) {
        obj.inputSearch = value;
        if (isEmptySelect(searchSelector[i]?.selectFamily?.value)) {
          throw "Please Select Type first.";
        }
        rUrl = rUrl + `${obj.selectFamily.value}/${value}`;
        callGetApi(
          null,
          rUrl,
          (response) => {
            if (response.status === API_SUCCESS) {
              const res = response.data;
              let searchResult = [];
              for (let i = 0; i < res.length; i++) {
                searchResult.push(res[i].key);
              }
              obj.selectOptions = searchResult;
              _searchSelector[i] = obj;
              setSearchSelector([..._searchSelector]);
              $(`.scrollbar-${i}`).css("display", "block");
            } else {
              obj.selectOptions = [];
              _searchSelector[i] = obj;
              setSearchSelector([..._searchSelector]);
              $(`.scrollbar-${i}`).css("display", "block");
              errorMessage(response?.data?.message);
            }
          },
          (error) => {
            obj.selectOptions = [];
            _searchSelector[i] = obj;
            setSearchSelector([..._searchSelector]);
            $(`.scrollbar-${i}`).css("display", "block");
            throw error;
          }
        );
      } else {
        obj.inputSearch = value;
        obj.selectOptions = [];
        _searchSelector[i] = obj;
        setSearchSelector([..._searchSelector]);
      }
    } catch (error) {
      errorMessage(error);
      return;
    }
  };

  // handle Select input searched data
  const handleSearchListClick = (selectedItem, i) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[i];
    obj.inputSearch = selectedItem;
    obj.selectedOption = selectedItem.split("#")[0];
    tempArray[i] = obj;
    setSearchSelector([...tempArray]);
    $(`.scrollbar-${i}`).css("display", "none");
  };

  // disable the selected option
  const handleDisableOption = (option) => {
    if (searchSelector.length !== 0) {
      if (option.value === "name" || option.value === "description") {
        return searchSelector.some(
          (obj) =>
            (obj.selectFamily && obj.selectFamily?.value === "name") ||
            obj.selectFamily?.value === "description"
        );
      } else {
        return searchSelector.some(
          (obj) => obj.selectFamily && obj.selectFamily?.value === option.value
        );
      }
    }
    return false;
  };

  // Seach Template result according to Selected Template(PORTFOLIO || SOLUTION)
  const handleSearchTemplate = async () => {
    try {
      let searchStr = "";
      if (isEmptySelect(searchSelector[0].selectFamily?.value)) {
        throw "Please fill data properly";
      }
      if (isEmpty(searchSelector[0]?.inputSearch)) {
        throw "Please fill data properly";
      }

      if (searchFlag === SOLUTION_SEARCH || searchFlag === PORTFOLIO_SEARCH) {
        searchStr =
          searchStr + searchSelector[0]?.selectFamily.value === "name" ||
            searchSelector[0]?.selectFamily.value === "description"
            ? `portfolio_id=${searchSelector[0]?.selectedOption}`
            : `${searchSelector[0]?.selectFamily.value}=${searchSelector[0]?.inputSearch.split("#")[0]
            }`;
      }
      for (let i = 1; i < searchSelector.length; i++) {
        if (isEmptySelect(searchSelector[i].selectFamily?.value)) {
          throw "Please fill data properly";
        } else if (isEmpty(searchSelector[i]?.inputSearch)) {
          throw "Please fill data properly";
        }
        if (searchFlag === SOLUTION_SEARCH || searchFlag === PORTFOLIO_SEARCH) {
          searchStr =
            searchStr +
            "&" +
            (searchSelector[i].selectFamily.value === "name" ||
              searchSelector[i].selectFamily.value === "description"
              ? `portfolio_id=${searchSelector[i]?.selectedOption}`
              : `${searchSelector[i].selectFamily.value}=${searchSelector[0]?.inputSearch.split("#")[0]
              }`);
        }
      }

      let rUrl = "";
      if (searchFlag === PORTFOLIO_SEARCH) {
        rUrl = rUrl + PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL;
      } else if (searchFlag === SOLUTION_SEARCH) {
        rUrl = rUrl + CUSTOM_PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL;
      }

      rUrl = rUrl + searchStr;
      callGetApi(
        null,
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            setSearchedResult(response.data);
            console.log("response success ::", response);
          } else {
            console.log("response failed ::", response);
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    } catch (error) {
      errorMessage(error);
      return;
    }
  };

  return (
    <div className="w-100">
      <div className="d-flex align-items-center bg-light-dark w-100 border-radius-10">
        <div className="d-flex justify-content-between align-items-center p-3 border-radius-10 w-100 border-right">
          <div className="row align-items-center m-0">
            {searchSelector.length !== 0 &&
              searchSelector.map((selector, i) => {
                return (
                  <div
                    className="customselect d-flex align-items-center mr-3 my-2"
                    key={i}
                  >
                    {i > 0 && (
                      <Select
                        defaultValue={DEFAULT_AND_OR_OPERATOR_VALUE}
                        options={AND_OR_OPERATOR_OPTIONS}
                        placeholder="&amp;"
                        onChange={(e) => handleAndOrOperator(e, i)}
                        value={selector.selectOperator}
                      />
                    )}
                    <div>
                      <Select
                        options={PORTFOLIO_SEARCH_OPTIONS}
                        onChange={(e) => handleFamily(e, i, "selectFamily")}
                        value={selector.selectFamily}
                        isOptionDisabled={(option) =>
                          handleDisableOption(option)
                        }
                      />
                    </div>
                    <div className="customselectsearch">
                      <input
                        className="custom-input-sleact"
                        type="text"
                        placeholder="Search string"
                        value={
                          searchFlag === PORTFOLIO_SEARCH ||
                            searchFlag === SOLUTION_SEARCH
                            ? selector.inputSearch.split("#")[1]
                            : selector.inputSearch
                        }
                        onChange={(e) => handleInputSearch(e, i)}
                        id={"inputSearch-" + i}
                        autoComplete="off"
                      />
                      <ul
                        className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                      >
                        {selector.inputSearch.length > 0 &&
                          selector.selectOptions.length === 0 ? (
                          <li>No Result Found</li>
                        ) : (
                          selector.inputSearch.length > 0 &&
                          selector.selectOptions.map((currentItem, j) => (
                            <li
                              className="list-group-item"
                              key={j}
                              onClick={(e) =>
                                handleSearchListClick(currentItem, i)
                              }
                            >
                              {searchFlag === PORTFOLIO_SEARCH ||
                                searchFlag === SOLUTION_SEARCH
                                ? currentItem.split("#")[1]
                                : currentItem}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                );
              })}
            <div onClick={addMoreSearchSelector}>
              <Link
                className="btn-sm text-violet border cursor"
                style={{ border: "1px solid #872FF7" }}
              >
                +
              </Link>
            </div>
            <div onClick={handleDeleteSearchSelector}>
              <Link className="btn-sm cursor">
                <svg
                  data-name="Layer 41"
                  id="Layer_41"
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
              </Link>
            </div>
          </div>
        </div>
        <div className="px-3">
          <Link
            className="btn bg-primary text-white cursor"
            onClick={handleSearchTemplate}
          >
            {" "}
            <SearchIcon />
            <span className="ml-1">Search</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SolutionnQuerySearchMaster;

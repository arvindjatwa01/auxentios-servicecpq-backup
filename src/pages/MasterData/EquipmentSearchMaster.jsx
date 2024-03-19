import React, { useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import Select from "react-select";

import SearchIcon from "@mui/icons-material/Search";
import { laborOptions, serviceOptions } from "./equipmentConstant";
import {
  EMPTY_SEARCH_FIELDS_ERROR_MESSAGE,
  INPUT_SEARCH_API_ERROR_MESSAGE,
  INPUT_SEARCH_ERROR_MESSAGE,
  INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE,
  SEARCH_FALG_EQUIPMENT,
  SEARCH_FLAG_CONSUMABLE,
  SEARCH_FLAG_CUSTOMER,
  SEARCH_FLAG_PARTS,
  SEARCH_FLAG_SERVICE,
  consumableSearchOptions,
  customerSearchOptions,
  equipmentSearchOptions,
  partsSearchOptions,
} from "./equipmentMasterConstants";
import { callGetApi } from "services/ApiCaller";
import {
  SEARCH_CONSUMABLE_MASTER,
  SEARCH_CUSTOMER_MASTER,
  SEARCH_EQUIPMENT,
  SEARCH_SPARC_PART,
  SEARCH_EXTWORK,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";

const EquipmentSearchMaster = ({ falgType, searchFlag, setSearchList }) => {
  const [searchSelector, setSearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  // Select options text Change
  const handleSelectOptionChange = (e, keyName, i) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[i];
    if (keyName === "selectCategory") {
      obj["inputSearch"] = "";
      obj["selectOptions"] = [];
    }
    obj[keyName] = e;
    tempArray[i] = obj;
    setSearchSelector([...tempArray]);
  };

  // input text change and search data for dropdwn list
  const handleInputSearch = (e, i) => {
    try {
      const { value } = e.target;
      let _searchSelector = [...searchSelector];
      let obj = _searchSelector[i];
      if (!isEmpty(obj.selectCategory.value)) {
        if (value.length !== 0) {
          let dropdownReqUrl = "";
          let searchString = `${obj.selectCategory.value}~${value}`;
          if (searchFlag === SEARCH_FALG_EQUIPMENT) {
            dropdownReqUrl = SEARCH_EQUIPMENT(searchString);
          } else if (searchFlag === SEARCH_FLAG_PARTS) {
            dropdownReqUrl = SEARCH_SPARC_PART(searchString);
          } else if (searchFlag === SEARCH_FLAG_CUSTOMER) {
            dropdownReqUrl = SEARCH_CUSTOMER_MASTER(searchString);
          } else if (searchFlag === SEARCH_FLAG_CONSUMABLE) {
            dropdownReqUrl = SEARCH_CONSUMABLE_MASTER(searchString);
          } else if(searchFlag===SEARCH_FLAG_SERVICE){
            dropdownReqUrl=SEARCH_EXTWORK(searchString);
          } else {
            dropdownReqUrl = "";
          }
          if (dropdownReqUrl) {
            callGetApi(null, dropdownReqUrl, (response) => {
              if (response.status === API_SUCCESS) {
                const responseData = response.data;
                if (responseData.length === 0) {
                  handleSnack(
                    "info",
                    INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE
                  );
                }
                obj.selectOptions = response.data;
                _searchSelector[i] = obj;
                setSearchSelector([..._searchSelector]);
                $(`.scrollbar-${i}`).css("display", "block");
              } else {
                handleSnack("info", INPUT_SEARCH_API_ERROR_MESSAGE);
              }
            });
          }
        } else {
          obj.selectOptions = [];
          obj.inputSearch = "";
          _searchSelector[i] = obj;
          setSearchSelector([..._searchSelector]);
        }
      } else {
        handleSnack("info", INPUT_SEARCH_ERROR_MESSAGE);
      }
      obj.inputSearch = value;
    } catch (error) {
      return;
    }
  };

  // Select the current Item from Search List (input Search)
  const handleSelectSearchedList = (currentItem, id) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem[obj.selectCategory.value];
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setSearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  // Add More Search fields
  const handleAddMoreSearchFields = () => {
    const _searchSelector = [...searchSelector];
    _searchSelector.push({
      id: searchSelector.length + 1,
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    });
    if (_searchSelector.length <= 2) {
      setSearchSelector(_searchSelector);
    }
  };

  // remove all the Search Fields
  const handleRemoveSearchFields = () => {
    setSearchSelector([]);
  };

  const handleSearch = () => {
    try {
      var searchStr = "";

      searchSelector.length !== 0 &&
        searchSelector.map((item, i) => {
          if (
            i === 0 &&
            !isEmpty(item.selectCategory.value) &&
            !isEmpty(item.inputSearch)
          ) {
            searchStr =
              item.selectCategory.value +
              ":" +
              encodeURI('"' + item.inputSearch + '"');
          } else if (
            item.selectCategory.value &&
            item.inputSearch &&
            item.selectOperator.value
          ) {
            searchStr =
              searchStr +
              " " +
              item.selectOperator.value +
              " " +
              item.selectCategory.value +
              ":" +
              encodeURI('"' + item.inputSearch + '"');
          }
          return searchStr;
        });

      if (isEmpty(searchStr)) {
        handleSnack("info", EMPTY_SEARCH_FIELDS_ERROR_MESSAGE);
      } else {
        let reqUrl = "";
        if (searchFlag === SEARCH_FALG_EQUIPMENT) {
          reqUrl = SEARCH_EQUIPMENT(searchStr);
          console.log(reqUrl);
        } else if (searchFlag === SEARCH_FLAG_PARTS) {
          reqUrl = SEARCH_SPARC_PART(searchStr);
        } else if (searchFlag === SEARCH_FLAG_CUSTOMER) {
          reqUrl = SEARCH_CUSTOMER_MASTER(searchStr);
        } else if (searchFlag === SEARCH_FLAG_CONSUMABLE) {
          reqUrl = SEARCH_CONSUMABLE_MASTER(searchStr);
        } else if(searchFlag===SEARCH_FLAG_SERVICE){
          reqUrl=SEARCH_EXTWORK(searchStr);
        }else {
          reqUrl = "";
        }
        callGetApi(null, reqUrl, (response) => {
          if (response.status === API_SUCCESS) {
            setSearchList(response.data);
          }
        });
      }
    } catch (error) {}
  };

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="w-100 equipment-select br-bl pb-3">
        <div className="d-flex align-items-center w-100 border-radius-10">
          <div className="d-flex justify-content-between align-items-center border-radius-10">
            <div className="row align-items-center m-0">
              {searchSelector.length !== 0 &&
                searchSelector.map((searchFiled, i) => (
                  <div
                    className={`customselect py-1 d-flex align-items-center mr-3${
                      i > 0 ? " customselect-margin" : ""
                    }`}
                  >
                    {i > 0 && (
                      <Select
                        defaultValue={{ label: "And", value: "AND" }}
                        options={[
                          { label: "And", value: "AND", id: i },
                          { label: "Or", value: "OR", id: i },
                        ]}
                        placeholder="AND/OR"
                        value={searchFiled.selectOperator}
                        onChange={(e) =>
                          handleSelectOptionChange(e, "selectOperator", i)
                        }
                      />
                    )}
                    <div>
                      <Select
                        options={
                          falgType === "equipment"
                            ? equipmentSearchOptions
                            : falgType === "parts"
                            ? partsSearchOptions
                            : falgType === "labor"
                            ? laborOptions
                            : falgType === "service"
                            ? serviceOptions
                            : falgType === "customer"
                            ? customerSearchOptions
                            : falgType === "consumable"
                            ? consumableSearchOptions
                            : []
                        }
                        placeholder="Search By"
                        value={searchFiled.selectCategory}
                        onChange={(e) =>
                          handleSelectOptionChange(e, "selectCategory", i)
                        }
                      />
                    </div>
                    <div className="customselectsearch pl-2">
                      <SearchIcon className="text-primary" />
                      <input
                        className="custom-input-sleact"
                        type="text"
                        value={searchFiled.inputSearch}
                        placeholder={"Search " + falgType}
                        id={"inputSearch-" + i}
                        autoComplete="off"
                        onChange={(e) => handleInputSearch(e, i)}
                      />
                      {
                        <ul
                          className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                        >
                          {searchFiled.selectOptions.map((currentItem, j) => (
                            <li
                              className="list-group-item"
                              key={j}
                              onClick={() =>
                                handleSelectSearchedList(currentItem, i)
                              }
                            >
                              {searchFlag === SEARCH_FALG_EQUIPMENT ||
                              searchFlag === SEARCH_FLAG_PARTS ||
                              searchFlag === SEARCH_FLAG_CUSTOMER ||
                              searchFlag===SEARCH_FLAG_SERVICE ||
                              searchFlag === SEARCH_FLAG_CONSUMABLE
                                ? currentItem[searchFiled.selectCategory.value]
                                : currentItem}
                            </li>
                          ))}
                        </ul>
                      }
                    </div>
                  </div>
                ))}
              <div
                className={`d-flex align-items-center mr-3 ${
                  searchSelector.length > 1 ? "add-delete-mt" : ""
                }`}
              >
                <div>
                  <Link
                    className="btn-sm cursor p-0 font-size-16 mr-2 bg-white text-violet"
                    onClick={handleAddMoreSearchFields}
                  >
                    +
                  </Link>
                </div>
                <div>
                  <Link
                    onClick={handleRemoveSearchFields}
                    className="p-1 bg-white cursor"
                  >
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.5 4.5C1.5 4.08579 1.83579 3.75 2.25 3.75H15.75C16.1642 3.75 16.5 4.08579 16.5 4.5C16.5 4.91421 16.1642 5.25 15.75 5.25H2.25C1.83579 5.25 1.5 4.91421 1.5 4.5Z"
                        fill="#872FF7"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 2.25C7.08579 2.25 6.75 2.58579 6.75 3V4.5C6.75 4.91421 6.41421 5.25 6 5.25C5.58579 5.25 5.25 4.91421 5.25 4.5V3C5.25 1.75736 6.25736 0.75 7.5 0.75H10.5C11.7426 0.75 12.75 1.75736 12.75 3V4.5C12.75 4.91421 12.4142 5.25 12 5.25C11.5858 5.25 11.25 4.91421 11.25 4.5V3C11.25 2.58579 10.9142 2.25 10.5 2.25H7.5ZM3.75 3.75C4.16421 3.75 4.5 4.08579 4.5 4.5V15C4.5 15.4142 4.83579 15.75 5.25 15.75H12.75C13.1642 15.75 13.5 15.4142 13.5 15V4.5C13.5 4.08579 13.8358 3.75 14.25 3.75C14.6642 3.75 15 4.08579 15 4.5V15C15 16.2426 13.9926 17.25 12.75 17.25H5.25C4.00736 17.25 3 16.2426 3 15V4.5C3 4.08579 3.33579 3.75 3.75 3.75Z"
                        fill="#872FF7"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 7.5C7.91421 7.5 8.25 7.83579 8.25 8.25V12.75C8.25 13.1642 7.91421 13.5 7.5 13.5C7.08579 13.5 6.75 13.1642 6.75 12.75V8.25C6.75 7.83579 7.08579 7.5 7.5 7.5Z"
                        fill="#872FF7"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.5 7.5C10.9142 7.5 11.25 7.83579 11.25 8.25V12.75C11.25 13.1642 10.9142 13.5 10.5 13.5C10.0858 13.5 9.75 13.1642 9.75 12.75V8.25C9.75 7.83579 10.0858 7.5 10.5 7.5Z"
                        fill="#872FF7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Link
              className="btn bg-primary text-white cursor"
              onClick={handleSearch}
            >
              <span className="ml-1">Search</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EquipmentSearchMaster;

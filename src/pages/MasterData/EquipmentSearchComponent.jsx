import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import $ from "jquery";

const EquipmentSearchComponent = ({ searchOptions, searchPlaceholder }) => {
  const [searchSelector, setSearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      itemType: { label: "", value: "" },
      itemTypeOperator: "",
      selectedKeyValue: "",
    },
  ]);

  //add more Search fields
  const addMoreSearchCritria = () => {
    const _searchSelector = [...searchSelector];
    _searchSelector.push({
      id: searchSelector.length + 1,
      selectOperator: "",
      selectFamily: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    });
    if (_searchSelector.length <= 2) {
      setSearchSelector(_searchSelector);
    }
  };

  //remove the search fields
  const removeSearchCritria = () => {
    setSearchSelector([]);
  };

  //Select item from Searched List
  const handleClickOnSearchedList = (currentItem, id) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setSearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  return (
    <div>
      <div className="equipment-select d-flex justify-content-between align-items-center border-radius-10">
        <div className="row align-items-center m-0">
          {searchSelector.length > 0 &&
            searchSelector.map((searchFiled, i) => (
              <div
                className={`customselect d-flex align-items-center mr-3${
                  i > 0 ? " mt-1" : ""
                }`}
              >
                {i > 0 && (
                  <Select
                  className="width-ao"
                    defaultValue={{
                      label: "And",
                      value: "AND",
                    }}
                    options={[
                      { label: "And", value: "AND", id: i },
                      { label: "Or", value: "OR", id: i },
                    ]}
                    placeholder="AND/OR"
                    // value={searchFiled.selectOperator}
                  />
                )}
                <div className="">
                  <Select
                    options={searchOptions}
                    placeholder="Search By"
                    // isOptionDisabled={(option) => checkForDisabled(option)}
                  />
                </div>
                <div
                  className={`customselectsearch d-flex align-items-center pl-2${
                    i < searchSelector.length - 1 ? " py-1" : ""
                  }`}
                >
                  <SearchIcon className="text-primary" />
                  <input
                    className="custom-input-sleact"
                    type="text"
                    placeholder={`Search ${searchPlaceholder}`}
                    // value={obj.inputSearch}
                    // onChange={(e) =>
                    //     handleInputSearch(e, i)
                    // }
                    // id={"inputSearch-" + i}
                    autoComplete="off"
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
                            handleClickOnSearchedList(currentItem, i)
                          }
                        >
                          {currentItem}
                        </li>
                      ))}
                    </ul>
                  }
                </div>
                {searchSelector.length > 0 &&
                  i === searchSelector.length - 1 && (
                    <div className="">
                      <button className="btn bg-primary text-white">
                        <span className="ml-1">Search</span>
                      </button>
                    </div>
                  )}
              </div>
            ))}

          <div
            className={`d-flex align-items-center mt-right-search ${
              searchSelector.length > 1 ? "mt-2" : ""
            }`}
          >
            <div>
              <Link
                className="btn-sm cursor p-0 font-size-16 mr-2 bg-gl text-violet"
                onClick={addMoreSearchCritria}
              >
                +
              </Link>
            </div>
            <div>
              <Link onClick={removeSearchCritria} className="p-1 bg-gl cursor">
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
    </div>
  );
};

export default EquipmentSearchComponent;

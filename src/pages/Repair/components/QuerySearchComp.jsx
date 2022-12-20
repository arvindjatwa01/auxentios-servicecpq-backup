import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import $ from "jquery";
import SearchIcon from "@mui/icons-material/Search";
import "react-toastify/dist/ReactToastify.css";
import {
  getSearchCoverageForFamily,
  getSearchQueryCoverage,
} from "../../../services/index";

const QuerySearchComp = (props) => {
  const [count, setCount] = useState(1);
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectFamily: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
      itemType: { label: "", value: "" },
      itemTypeOperator: "",
    },
  ]);

  const options = [
    { label: "Make", value: "make" },
    { label: "Model", value: "model" },
    { label: "Prefix", value: "prefix" },
    { label: "Family", value: "family" },
  ];

  const handleOperator = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectOperator = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleFamily = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.selectFamily = e;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
  };
  const handleInputSearch = (e, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];

    getSearchCoverageForFamily(tempArray[id].selectFamily.value, e.target.value)
      .then((res) => {
        obj.selectOptions = res;
        tempArray[id] = obj;
        setQuerySearchSelector([...tempArray]);
        $(`.scrollbar-${id}`).css("display", "block");
      })
      .catch((err) => {
        props.handleSnack("error", "Error occurred while searching");
      });
    obj.inputSearch = e.target.value;
  };

  const handleSearchListClick = (e, currentItem, obj1, id) => {
    let tempArray = [...querySearchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setQuerySearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };

  const addSearchQuerryHtml = () => {
    setQuerySearchSelector([
      ...querySearchSelector,
      {
        id: count,
        selectOperator: "",
        selectFamily: "",
        inputSearch: "",
        selectOptions: [],
        selectedOption: "",
      },
    ]);
    setCount(count + 1);
  };

  const handleDeletQuerySearch = () => {
    setQuerySearchSelector([]);
    setCount(0);
    props?.setMasterData([]);
    props?.setFilterMasterData([]);
    props?.setSelectedMasterData([]);
  };

  const handleQuerySearchClick = async () => {
    try {
      $(".scrollbar").css("display", "none");
      if (
        querySearchSelector[0]?.selectFamily?.value === "" ||
        querySearchSelector[0]?.inputSearch === "" ||
        querySearchSelector[0]?.selectFamily?.value === undefined
      ) {
        props.handleSnack("warning", "Please fill the search criteria");
      }

      var searchStr = `${querySearchSelector[0]?.selectFamily?.value}:${querySearchSelector[0]?.inputSearch}`;
      // console.log("searchStr  try : ", searchStr);

      for (let i = 1; i < querySearchSelector.length; i++) {
        if (
          querySearchSelector[i]?.selectOperator?.value === "" ||
          querySearchSelector[i]?.selectFamily?.value === "" ||
          querySearchSelector[i]?.inputSearch === ""
        ) {
          props.handleSnack("warning", "Please fill the search criteria");
        }
        searchStr =
          searchStr +
          " " +
          querySearchSelector[i].selectOperator.value +
          " " +
          querySearchSelector[i].selectFamily.value +
          "~" +
          querySearchSelector[i].inputSearch;
      }
      const res = await getSearchQueryCoverage(searchStr);
      props?.setMasterData(res);
    } catch (error) {
      props.handleSnack("error", "Error occurred while searching");     
    }
  };

  return (
    <>
      <div className="w-100">
        <div className="d-flex align-items-center bg-light-dark w-100 border-radius-10">
          <div className="d-flex justify-content-between align-items-center p-3 border-radius-10 w-100 border-right">
            <div className="row align-items-center m-0">
              {querySearchSelector.map((obj, i) => {
                return (
                  <div
                    className="customselect d-flex align-items-center mr-3 my-2"
                    key={i}
                  >
                    {i > 0 ? (
                      <Select
                        isClearable={true}
                        defaultValue={{ label: "And", value: "AND" }}
                        options={[
                          { label: "And", value: "AND", id: i },
                          { label: "Or", value: "OR", id: i },
                        ]}
                        placeholder="&amp;"
                        onChange={(e) => handleOperator(e, i)}
                        value={obj.selectOperator}
                      />
                    ) : (
                      <></>
                    )}
                    <div>
                      <Select
                        isClearable={true}
                        options={props.options ? props.options : options}
                        onChange={(e) => handleFamily(e, i)}
                        value={obj.selectFamily}
                      />
                    </div>
                    <div className="customselectsearch">
                      <input
                        className="custom-input-sleact"
                        type="text"
                        placeholder="Search string"
                        value={obj.inputSearch}
                        onChange={(e) => handleInputSearch(e, i)}
                        id={"inputSearch-" + i}
                        autoComplete="off"
                      />

                      {
                        <ul
                          className={`list-group customselectsearch-list scrollbar scrollbar-${i} style`}
                        >
                          {obj.selectOptions.map((currentItem, j) => (
                            <li
                              className="list-group-item"
                              key={j}
                              onClick={(e) =>
                                handleSearchListClick(e, currentItem, obj, i)
                              }
                            >
                              {currentItem}
                            </li>
                          ))}
                        </ul>
                      }
                    </div>
                  </div>
                );
              })}
              <div onClick={(e) => addSearchQuerryHtml(e)}>
                <Link
                  to="#"
                  className="btn-sm text-violet border"
                  style={{ border: "1px solid #872FF7" }}
                >
                  +
                </Link>
              </div>
              <div onClick={handleDeletQuerySearch}>
                <Link to="#" className="btn-sm">
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
              to="#"
              className="btn bg-primary text-white"
              onClick={handleQuerySearchClick}
            >
              <SearchIcon />
              <span className="ml-1">Search</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuerySearchComp;

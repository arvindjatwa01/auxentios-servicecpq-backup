import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import $ from "jquery";

const consumableSearchOptions = [
  { value: "A", label: "Consumable Number" },
  { value: "B", label: "Description" },
  { value: "C", label: "Supplier" },
];

const ConsumableMaster = () => {
  const removeSearchCritria = () => {
    setSearchSelector([]);
  };
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
  const handleClickOnSearchedList = (currentItem, id) => {
    let tempArray = [...searchSelector];
    let obj = tempArray[id];
    obj.inputSearch = currentItem;
    obj.selectedOption = currentItem;
    tempArray[id] = obj;
    setSearchSelector([...tempArray]);
    $(`.scrollbar-${id}`).css("display", "none");
  };
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
  const [consumablepagination, setConsumablepagination] = React.useState(1);
  const consumablePaginationChange = (event, value) => {
    setConsumablepagination(value);
  };
  const searchList = [
    { A: "110346", B: "Materials Procesivos", C: "MC", D: "Stockable" },
    { A: "111141", B: "Miscelanos", C: "EX", D: "Stockable" },
    { A: "101093", B: "Trapo Industrial", C: "AA", D: "Non Stockable" },
    {
      A: "110528",
      B: "Set of mirrors for retro view mirrors",
      C: "OL",
      D: "Stockable",
    },
    { A: "111141", B: "Absorbent Cloth", C: "PK", D: "Stockable" },
    { A: "110549", B: "Miscelanos", C: "LN", D: "Stockable" },
    {
      A: "110528",
      B: "Set of mirrors for retro view mirrors",
      C: "EX",
      D: "Stockable",
    },
  ];

  return (
    <div className="content-body" style={{ minHeight: "884px" }}>
      <div className="container-fluid">
        <h5 className="font-weight-600 mb-0">Consumable Master</h5>
        <p className="mb-1 mt-4 font-size-12">
          Select the search criteria for consumable
        </p>
        <div className="w-100 equipment-select br-bl pb-3">
          <div className="d-flex align-items-center w-100 border-radius-10">
            <div className="d-flex justify-content-between align-items-center border-radius-10">
              <div className="row align-items-center m-0">
                {searchSelector.length > 0 &&
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
                          // value={searchFiled.selectOperator}
                        />
                      )}
                      <div>
                        <Select
                          options={consumableSearchOptions}
                          placeholder="Search By"
                          // isOptionDisabled={(option) => checkForDisabled(option)}
                        />
                      </div>
                      <div className="customselectsearch pl-2">
                        <SearchIcon className="text-primary" />
                        <input
                          className="custom-input-sleact"
                          type="text"
                          placeholder="Search Consumable"
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
                      onClick={addMoreSearchCritria}
                    >
                      +
                    </Link>
                  </div>
                  <div>
                    <Link
                      onClick={removeSearchCritria}
                      className="p-1 bg-white cursor"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
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
              <Link to="#" className="btn bg-primary text-white">
                <span className="ml-1">Search</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 border-50">
            <div className="bg-grey border-radius-10 p-3">
              <div className="equipment-master-ul">
                <ul>
                  {searchList.map((Data, i) => (
                    <li className={`${i === 0 ? "active" : ""}`}>
                      <div className="row position-relative">
                        <div className="global-serach-arrow">
                          <ArrowForwardIosIcon className="text-primary font-size-20 mb-0 pb-0" />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                          <img
                            src="../assets/images/spare-parts-sm.png"
                            alt="jcb"
                            className=" img-fluid"
                          />
                        </div>
                        <div className="col-lg-5 col-md-5 col-5">
                          <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                            {Data.A}
                          </h6>
                          <p className="font-size-12 text-light-60 font-weight-500 m-0">
                            {Data.B}
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <div className="d-block pr-3">
                            <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                              {Data.C}
                            </h6>
                            <p className="font-size-12 text-light-60 font-weight-500 m-0">
                              {Data.D}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
            <div className="">
              <div className="bg-white p-3 border-radius-10 ">
                <div className="d-flex align-items-center justify-content-between equipment-pagination">
                  <h5 className="font-weight-600 mb-0">Trapo Industrial</h5>
                  <Stack spacing={2}>
                    <Pagination
                      boundaryCount={0}
                      siblingCount={0}
                      shape="rounded"
                      hidePrevButton={consumablepagination === 1 && true}
                      hideNextButton={consumablepagination === 2 && true}
                      count={2}
                      page={consumablepagination}
                      onChange={consumablePaginationChange}
                    />
                  </Stack>
                </div>
                <div className="d-block mt-3">
                  <h6 className="text-primary font-weight-600">101093</h6>
                  <p className="text-light-60 font-size-12 mb-0">
                    Non Stockable
                  </p>
                </div>
              </div>

              {consumablepagination === 1 && (
                <>
                  <div className="bg-white p-3 border-radius-10 overflow-hidden">
                    <div className="row align-items-end">
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Consumable Number
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            101093
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Description
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            TRAPO INDUSTRIAL
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Stock/Non Stock
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            Non Stockable
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Unit Of Measure
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            CM
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Supplier
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            AA
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Availability
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          Yes
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
                        <div className="d-block">
                          <p className="text-light-60 font-size-12 m-0 font-weight-500">
                            Total Available
                          </p>
                          <p className="text-primary font-size-12 mt-1 font-weight-500">
                            10
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="font-weight-500 mt-4">ERP Details</h5>
                  <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Material Group
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          AA: 0S1619
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Material Number
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          AA: 0S1619
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Stock Quantity
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          10
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Supplier
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          AA
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Average Price
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          $ 4589.63
                        </p>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
                        <p className="text-light-60 font-size-12 m-0 font-weight-500">
                          Average Cost
                        </p>
                        <p className="text-primary font-size-12 mt-1 font-weight-500">
                          $ 4058.96
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {consumablepagination === 2 && <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumableMaster;
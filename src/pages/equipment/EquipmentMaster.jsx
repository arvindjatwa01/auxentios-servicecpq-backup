import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import { Card, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import StatusStackedChart from "../Dashboard/StatusStackedChart";

const EquipmentMaster = () => {
  const lifeCycleStatusData = [
    {
      month: "Jan",
      draft: 400,
      waiting: 240,
      ready: 247,
      running: 325,
      done: 100,
    },
    {
      month: "Feb",
      draft: 300,
      waiting: 139,
      ready: 221,
      running: 325,
      done: 100,
    },
    {
      month: "March",
      draft: 200,
      waiting: 980,
      ready: 229,
      running: 325,
      done: 100,
    },
    {
      month: "Apr",
      draft: 278,
      waiting: 390,
      ready: 200,
      running: 325,
      done: 100,
    },
    {
      month: "May",
      draft: 189,
      waiting: 480,
      ready: 218,
      running: 325,
      done: 100,
    },
    {
      month: "June",
      draft: 239,
      waiting: 380,
      ready: 250,
      running: 100,
      done: 100,
    },
    {
      month: "July",
      draft: 349,
      waiting: 430,
      ready: 210,
      running: 140,
      done: 100,
    },
    {
      month: "Aug",
      draft: 349,
      waiting: 430,
      ready: 210,
      running: 231,
      done: 100,
    },
    {
      month: "Sept",
      draft: 349,
      waiting: 430,
      ready: 210,
      running: 300,
      done: 100,
    },
    {
      month: "Oct",
      draft: 349,
      waiting: 430,
      ready: 210,
      running: 175,
      done: 100,
    },
    {
      month: "Nov",
      draft: 349,
      waiting: 430,
      ready: 210,
      running: 250,
      done: 100,
    },
    {
      month: "Dec",
      draft: 349,
      waiting: 430,
      ready: 210,
      running: 325,
      done: 100,
    },
  ];

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

    // if (searchSelector.length < 2) {
    //   setSearchSelector([
    //     ...searchSelector,
    //     {
    //       id: searchSelector.length,
    //       selectOperator: "",
    //       selectFamily: "",
    //       inputSearch: "",
    //       selectOptions: [],
    //       selectedOption: "",
    //     },
    //   ]);
    // }
  };

  const removeSearchCritria = () => {
    setSearchSelector([]);
  };

  return (
    <div className="content-body" style={{ minHeight: "884px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 border-50">
            <h5 className="font-weight-600 mb-0">Equipment Master</h5>
            <div className="bg-grey border-radius-10 p-3 mt-4">
              <p className="mb-1">Select the search criteria</p>
              <div className="w-100 equipment-select br-bl pb-3">
                <div className="d-flex justify-content-between align-items-center w-100 border-radius-10">
                  <div className="d-flex justify-content-between align-items-center border-radius-10 w-100">
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
                                options={[{ label: "A", value: "a" }]}
                                placeholder="Search By"
                                // isOptionDisabled={(option) => checkForDisabled(option)}
                              />
                            </div>
                            <div className="customselectsearch pl-2">
                              <SearchIcon className="text-primary" />
                              <input
                                className="custom-input-sleact"
                                type="text"
                                placeholder="Search Parts"
                                // value={obj.inputSearch}
                                // onChange={(e) =>
                                //     handleInputSearch(e, i)
                                // }
                                // id={"inputSearch-" + i}
                                autoComplete="off"
                              />
                            </div>
                          </div>
                        ))}
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
                  <div className="">
                    <Link
                      to="#"
                      className="btn bg-primary text-white"
                      // onClick={
                      //   props.compoFlag === "bundleSearch"
                      //     ? handleBundleSearch
                      //     : handleQuerySearchClick
                      // }
                    >
                      <span className="ml-1">Search</span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="equipment-master-ul">
                <ul>
                  <li className="active">
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        src="../assets/images/jcb-equipment.png"
                        alt="jcb"
                        className=" img-fluid"
                      />
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          ZCT01096
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CHAIN EXCAVATOR - 336D2 L
                        </p>
                      </div>
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          336D2 L
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CATERPILLAR
                        </p>
                      </div>
                      <div>
                        <ArrowForwardIosIcon className="text-primary font-size-36" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        src="../assets/images/jcb-equipment.png"
                        alt="jcb"
                        className=" img-fluid"
                      />
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          ZCT01096
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CHAIN EXCAVATOR - 336D2 L
                        </p>
                      </div>
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          336D2 L
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CATERPILLAR
                        </p>
                      </div>
                      <div>
                        <ArrowForwardIosIcon className="text-primary font-size-36" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        src="../assets/images/jcb-equipment.png"
                        alt="jcb"
                        className=" img-fluid"
                      />
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          ZCT01096
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CHAIN EXCAVATOR - 336D2 L
                        </p>
                      </div>
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          336D2 L
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CATERPILLAR
                        </p>
                      </div>
                      <div>
                        <ArrowForwardIosIcon className="text-primary font-size-36" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        src="../assets/images/jcb-equipment.png"
                        alt="jcb"
                        className=" img-fluid"
                      />
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          ZCT01096
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CHAIN EXCAVATOR - 336D2 L
                        </p>
                      </div>
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          336D2 L
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CATERPILLAR
                        </p>
                      </div>
                      <div>
                        <ArrowForwardIosIcon className="text-primary font-size-36" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        src="../assets/images/jcb-equipment.png"
                        alt="jcb"
                        className=" img-fluid"
                      />
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          ZCT01096
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CHAIN EXCAVATOR - 336D2 L
                        </p>
                      </div>
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          336D2 L
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CATERPILLAR
                        </p>
                      </div>
                      <div>
                        <ArrowForwardIosIcon className="text-primary font-size-36" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="d-flex align-items-center justify-content-between">
                      <img
                        src="../assets/images/jcb-equipment.png"
                        alt="jcb"
                        className=" img-fluid"
                      />
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          ZCT01096
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CHAIN EXCAVATOR - 336D2 L
                        </p>
                      </div>
                      <div className="d-block">
                        <h6 className="font-size-14 font-weight-500 text-primary m-0">
                          336D2 L
                        </h6>
                        <p className="font-size-14 text-light-60 font-weight-500 m-0">
                          CATERPILLAR
                        </p>
                      </div>
                      <div>
                        <ArrowForwardIosIcon className="text-primary font-size-36" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-7 equipment-master-chart">
            <div className="bg-white p-3 border-radius-10">
              <div className="d-flex align-items-center justify-content-between equipment-pagination">
                <h5 className="font-weight-600 mb-0">
                  CHAIN EXCAVATOR - 336D2 L
                </h5>
                <Pagination count={5} />
              </div>
              <div className="d-block mt-3">
                <h6 className="text-primary font-weight-600">ZCT01096</h6>
                <p className="text-light-60 font-size-12 mb-0">
                  336D2 L - 2015
                </p>
              </div>
              <div className="row align-items-end">
                <div className="col-lg-4">
                  <div className="d-block">
                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                      Manufacturer
                    </p>
                    <p className="text-primary font-size-12 mt-1 font-weight-500">
                      Caterpillar
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="d-block">
                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                      Model
                    </p>
                    <p className="text-primary font-size-12 mt-1 font-weight-500">
                      336D2 L
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <img
                    src="../assets/images/chain-excavator.png"
                    alt="jcb"
                    className=" img-fluid w-100"
                  />
                </div>
                <div className="col-lg-4 mt-4">
                  <div className="d-block">
                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                      Engine Model
                    </p>
                    <p className="text-primary font-size-12 mt-1 font-weight-500">
                      C9 ACERT
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 mt-4">
                  <div className="d-block">
                    <p className="text-light-60 font-size-12 m-0 font-weight-500">
                      Operating Weight
                    </p>
                    <p className="text-primary font-size-12 mt-1 font-weight-500">
                      80648 lb
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 mt-4">
                  <p className="text-light-60 font-size-12 m-0 font-weight-500">
                    Net Flywheel Power
                  </p>
                  <p className="text-primary font-size-12 mt-1 font-weight-500">
                    268 HP
                  </p>
                </div>
              </div>
            </div>
            <Grid item md={9} xs={12} container>
              <Card
                elevation={10}
                sx={{ width: "97%", borderRadius: 4, mx: 2, my: 1 }}
              >
                <div className="m-3 d-flex align-items-center justify-content-between">
                  <h5 className="font-weight-600 mb-0">
                    Condition of Chain Excavator - 336D2 L
                  </h5>
                  <div className="d-flex align-items-center equipment-master-btn-select">
                    <div className=" mr-2">
                      <Select
                        options={[{ label: "1 Year", value: "a" }]}
                        placeholder="Last 6 months"
                      />
                    </div>
                    <a href="#" className="btn">
                      Update
                    </a>
                  </div>
                </div>
                <Divider />
                <StatusStackedChart data={lifeCycleStatusData} />
              </Card>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentMaster;

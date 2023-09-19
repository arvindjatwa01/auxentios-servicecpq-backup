import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import $ from "jquery";
import EquipmentSearchMaster from "./EquipmentSearchMaster";
import SearchListMaster from "./SearchListMaster";
import { defaultConsumableSearchList } from "./equipmentConstant";

const ConsumableMaster = () => {
  const [searchList, setSearchList] = useState([
    ...defaultConsumableSearchList,
  ]);
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
  const [pageNo, setPageNo] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  // view search list details
  const viewEquipmentDetails = (id) => {
    const _searchList = [...searchList];
    const updatedSearchList = _searchList.map((data) => ({
      ...data,
      active: data.id === id ? true : false,
    }));
    setSearchList(updatedSearchList);
  };

  //page 1 details
  const viewDetailsPage_1 = () => {
    return (
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
    );
  };
  //page 2 details
  const viewDetailsPage_2 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4">Price</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                List Price
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                $ 956.32
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Cost Price
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                $ 865.45
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Supplier contracted price
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                $ 923.55
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Start date
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                04/05/2023
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                End Date
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                31/12/2023
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Effective Date
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                05/05/2023
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="content-body" style={{ minHeight: "884px" }}>
      <div className="container-fluid">
        <h5 className="font-weight-600 mb-0">Consumable Master</h5>
        <p className="mb-1 mt-4 font-size-12">
          Select the search criteria for consumable
        </p>
        <EquipmentSearchMaster falgType="consumable" />
        <div className="row mt-3">
          <SearchListMaster
            searchList={searchList}
            viewEquipmentDetails={viewEquipmentDetails}
          />
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
                      hidePrevButton={pageNo === 1 && true}
                      hideNextButton={pageNo === 2 && true}
                      count={2}
                      page={pageNo}
                      onChange={handlePageChange}
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
              {pageNo === 1 && viewDetailsPage_1()}
              {pageNo === 2 && viewDetailsPage_2()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumableMaster;

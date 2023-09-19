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
import { defaultCustomerSearchList } from "./equipmentConstant";

const CustomerMaster = () => {
  const [searchList, setSearchList] = useState([...defaultCustomerSearchList]);
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
  const [pageNo, setPageNo] = useState(1);
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

  // page 1 details
  const viewDetailsPage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden">
          <div className="row align-items-end">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Customer ID
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  1011453
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Customer Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  PROVINCIAL MUNICIPALITY OF CHANCHAMAYO
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Customer Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Non Stockable
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Customer Address
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  83 Princeton Court, Cupertino, CA 95014
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  District
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Autown
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Region/State
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Millworth
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Country
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  US
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Website
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  multiplx@optonline.net
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Email
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  multiplx@optonline.net
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
                Contact
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Carl Mayer
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Payer Type
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Self
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Payer Name
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                PROVINCIAL MUNICIPALITY OF CHANCHAMAYO
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Insurance
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AIG
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };
  // page 2 details
  const viewDetailsPage_2 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4">Customer Details</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Segment
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Mining
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Medium Enterprise
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Type
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Commercial
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Class
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                A Class
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Since
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                2012
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Status
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Active
              </p>
            </div>
          </div>
        </div>
        <h5 className="font-weight-500 mt-4">ERP Details</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Code
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                CU1011453
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Medium Enterprise
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Industry
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                PROVINCIAL MUNICIPALITY OF CHANCHAMAYO
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Rating
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                3.4
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer Type
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Commercial
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
        <h5 className="font-weight-600 mb-0">Customer Master</h5>
        <p className="mb-1 mt-4 font-size-12">
          Select the search criteria for customer
        </p>
        <EquipmentSearchMaster falgType="customer" />
        <div className="row mt-3">
          <SearchListMaster
            searchList={searchList}
            viewEquipmentDetails={viewEquipmentDetails}
          />
          <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
            <div className="">
              <div className="bg-white p-3 border-radius-10 ">
                <div className="d-flex align-items-center justify-content-between equipment-pagination">
                  <h5 className="font-weight-600 mb-0">
                    Provincial Municipality of Chanchamayo
                  </h5>
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
                  <h6 className="text-primary font-weight-600">1011453</h6>
                  <p className="text-light-60 font-size-12 mb-0">
                    Small Retail - Energy
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

export default CustomerMaster;

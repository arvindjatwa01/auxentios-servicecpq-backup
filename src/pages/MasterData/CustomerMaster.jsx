import React, { useState } from "react";

import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { Get_Customer_Master_Details_By_Id_GET } from "services/CONSTANTS";

import EquipmentSearchMaster from "./EquipmentSearchMaster";
import { SEARCH_FLAG_CUSTOMER } from "./equipmentMasterConstants";
import LoadingProgress from "pages/Repair/components/Loader";
import CustomerMasterSearchList from "./CustomerMaster/CustomerMasterSearchList";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";

const CustomerMaster = () => {
  const [searchList, setSearchList] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  // view search list details
  const handleViewSelectSearchRowDetails = (id) => {
    setLoading(true);
    setPageNo(1);
    const rUrl = Get_Customer_Master_Details_By_Id_GET + id;
    callGetApi(
      null,
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setSelectedCustomerId(id);
          setSelectedCustomerDetails(responseData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  // page 1 details
  const viewDetailsPage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden">
          <div className="row align-items-end">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                  Customer ID
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.customerId)
                    ? "NA"
                    : selectedCustomerDetails.customerId}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Customer Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.fullName)
                    ? "NA"
                    : selectedCustomerDetails.fullName}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Customer Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.customerType)
                    ? "NA"
                    : selectedCustomerDetails.customerType}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                  Customer Address
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.addressDTO?.fullAddress)
                    ? "NA"
                    : selectedCustomerDetails.addressDTO?.fullAddress}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  District
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.addressDTO?.district)
                    ? "NA"
                    : selectedCustomerDetails.addressDTO?.district}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Region/State
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedCustomerDetails.addressDTO?.regionOrState)
                  ? "NA"
                  : selectedCustomerDetails.addressDTO?.regionOrState}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Country
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.addressDTO?.country)
                    ? "NA"
                    : selectedCustomerDetails.addressDTO?.country}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                  Website
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.wwebsite)
                    ? "NA"
                    : selectedCustomerDetails.website}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Email
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedCustomerDetails.email)
                    ? "NA"
                    : selectedCustomerDetails.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-weight-500 mt-4">ERP Details</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Contact
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedCustomerDetails.contactType)
                  ? "NA"
                  : selectedCustomerDetails.contactType}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Payer Type
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedCustomerDetails.payerType)
                  ? "NA"
                  : selectedCustomerDetails.payerType}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Payer Name
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedCustomerDetails.payer)
                  ? "NA"
                  : selectedCustomerDetails.payer}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Insurance
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedCustomerDetails.insurance)
                  ? "NA"
                  : selectedCustomerDetails.insurance}
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
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Customer Segment
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.customerSegemnt)
                  ? "NA"
                  : selectedCustomerDetails.customerSegemnt}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Customer Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.customerGroup)
                  ? "NA"
                  : selectedCustomerDetails.customerGroup}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Customer Type
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.customerType)
                  ? "NA"
                  : selectedCustomerDetails.customerType}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Customer Class
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.customerClass)
                  ? "NA"
                  : selectedCustomerDetails.customerClass}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Customer Since
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.createdAt)
                  ? "NA"
                  : selectedCustomerDetails.createdAt}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Status
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.status)
                  ? "NA"
                  : selectedCustomerDetails.status}
              </p>
            </div>
          </div>
        </div>
        <h5 className="font-weight-500 mt-4">ERP Details</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Customer Code
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.customerCode)
                  ? "NA"
                  : selectedCustomerDetails.customerCode}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Customer Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.customerGroup)
                  ? "NA"
                  : selectedCustomerDetails.customerGroup}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Customer Industry
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.businessArea)
                  ? "NA"
                  : selectedCustomerDetails.businessArea}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Customer Rating
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedCustomerDetails.customerRating)
                  ? "NA"
                  : selectedCustomerDetails.customerRating}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase ">
                Customer Type
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedCustomerDetails.customerType)
                  ? "NA"
                  : selectedCustomerDetails.customerType}
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
        <EquipmentSearchMaster
          falgType="customer"
          searchFlag={SEARCH_FLAG_CUSTOMER}
          setSearchList={setSearchList}
        />
        <div className="row mt-3">
          {searchList.length !== 0 && (
            <CustomerMasterSearchList
              customerSearchList={searchList}
              selectedCustomerId={selectedCustomerId}
              handleViewDetails={handleViewSelectSearchRowDetails}
            />
          )}
          <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
            {loading ? (
              <LoadingProgress />
            ) : (
              <>
                {selectedCustomerId && (
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
                        <h6 className="text-primary font-weight-600">
                          {!isEmpty(selectedCustomerDetails.customerId) &&
                            selectedCustomerDetails.customerId}
                        </h6>
                        <p className="text-light-60 font-size-12 mb-0">
                          {!isEmpty(selectedCustomerDetails.fullName) &&
                            selectedCustomerDetails.fullName}
                        </p>
                      </div>
                    </div>

                    {pageNo === 1 && viewDetailsPage_1()}
                    {pageNo === 2 && viewDetailsPage_2()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMaster;

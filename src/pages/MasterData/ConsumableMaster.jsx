import React, { useState,useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";

import { callGetApi } from "services/ApiCaller";
import { Get_Consumable_Master_Details_By_Id_GET } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";

import EquipmentSearchMaster from "./EquipmentSearchMaster";
import { SEARCH_FLAG_CONSUMABLE } from "./equipmentMasterConstants";
import ConsumableMasterSearchList from "./ConsumableMaster/ConsumableMasterSearchList";
import LoadingProgress from "pages/Repair/components/Loader";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";

const ConsumableMaster = () => {
  const [searchList, setSearchList] = useState([]);
  const [selectedConsumableId, setSelectedConsumableId] = useState(null);
  const [pageNo, setPageNo] = React.useState(1);
  const [selectedConsumableDetals, setSelectedConsumableDetals] =
    useState(null);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (event, value) => {
    setPageNo(value);
  };
  useEffect(()=>{
    setSelectedConsumableId(null);
  },[searchList])

  // view search list details
  const handleViewSelectSearchRowDetails = (id) => {
    setLoading(true);
    setPageNo(1);
    const rUrl = Get_Consumable_Master_Details_By_Id_GET + id;
    callGetApi(
      null,
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setSelectedConsumableId(id);
          setSelectedConsumableDetals(responseData);
         
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

  //page 1 details
  const viewDetailsPage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden">
          <div className="row align-items-end">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Consumable Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedConsumableDetals.consumableId)
                    ? "NA"
                    : selectedConsumableDetals.consumableId}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Description
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(selectedConsumableDetals.description)
                    ? "NA"
                    : selectedConsumableDetals.description}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Stock/Non Stock
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedConsumableDetals.stockItem)
                    ? "Not Stockable"
                    : "Stockable"}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Unit Of Measure
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(selectedConsumableDetals.unit)
                    ? "NA"
                    : selectedConsumableDetals.unit}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Supplier
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(selectedConsumableDetals.sourceOrVendor)
                    ? "NA"
                    : selectedConsumableDetals.sourceOrVendor}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Availability
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedConsumableDetals.availability) ? "No" : "Yes"}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                  Total Available
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(selectedConsumableDetals.avgContractedPrice)
                    ? "NA"
                    : selectedConsumableDetals.avgContractedPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-weight-500 mt-4">ERP Details</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Material Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedConsumableDetals.erpMaterialGroup)
                  ? "NA"
                  : selectedConsumableDetals.erpMaterialGroup}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Material Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {isEmpty(selectedConsumableDetals.erpMaterialNumber)
                  ? "NA"
                  : selectedConsumableDetals.erpMaterialNumber}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Stock Quantity
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                10
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Supplier
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Average Price
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* $ 4589.63 */}
                {isEmpty(selectedConsumableDetals.avgContractedPrice)
                  ? "NA"
                  : selectedConsumableDetals.avgContractedPrice}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Average Cost
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* $ 4058.96 */}
                {isEmpty(selectedConsumableDetals.movingAvgCost)
                  ? "NA"
                  : selectedConsumableDetals.movingAvgCost}
             
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
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                List Price
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                $ 956.32
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Cost Price
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* $ 865.45 */}
                {isEmpty(selectedConsumableDetals.costPrice)
                    ? "NA"
                    : selectedConsumableDetals.costPrice}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Supplier contracted price
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                {/* $ 923.55 */}
                {isEmpty(selectedConsumableDetals.contractedPrice)
                    ? "NA"
                    : selectedConsumableDetals.contractedPrice}
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                Start date
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                04/05/2023
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
                End Date
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                31/12/2023
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500 text-uppercase">
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
        <EquipmentSearchMaster
          falgType="consumable"
          searchFlag={SEARCH_FLAG_CONSUMABLE}
          setSearchList={setSearchList}
        />
        <div className="row mt-3">
          {searchList.length !== 0 && (
            <ConsumableMasterSearchList
              consumableSearchList={searchList}
              selectedConsumableId={selectedConsumableId}
              handleViewDetails={handleViewSelectSearchRowDetails}
            />
          )}
          <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
            {loading ? (
              <LoadingProgress />
            ) : (
              <>
                {selectedConsumableId && (
                  <div className="">
                    <div className="bg-white p-3 border-radius-10 ">
                      <div className="d-flex align-items-center justify-content-between equipment-pagination">
                        <h5 className="font-weight-600 mb-0">
                          Trapo Industrial
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
                          {!isEmpty(selectedConsumableDetals.consumableId) &&
                            selectedConsumableDetals.consumableId}
                        </h6>
                        <p className="text-light-60 font-size-12 mb-0">
                          {!isEmpty(selectedConsumableDetals.stockItem)
                            ? "Stockable"
                            : "Non Stockable"}
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

export default ConsumableMaster;

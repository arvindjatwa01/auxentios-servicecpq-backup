import React from "react";
import ModalWrapper from "../common/ModelWrapper";
import {
  SPARE_PARTS_REPLACED_BY_DETAILS,
  SPARE_PARTS_ALTERNATE_PARTS_DETAILS,
  SPARE_PARTS_REMAN_OR_REFURB_DETAILS,
  SPARE_PARTS_PRICE_DETAILS,
  SPARE_PARTS_WARRENTY_DETAILS,
} from "../equipmentMasterConstants";

const PartsReportDetails = ({
  show,
  hideModal,
  headerTitle,
  contentReportType,
  contetntReportObj = null,
}) => {
  // view Spare Parts Replaced by details
  const viewPartsReplacedByDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Replaced By
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Replaced Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Availability
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Total Available
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            94886.38
          </p>
        </div>
      </div>
    );
  };

  // view spare parts alternate parts details
  const viewPartsAlternatePartsDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Alternate Part #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Availability
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Total Available
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            94886.38
          </p>
        </div>
      </div>
    );
  };

  // view spare parts reman or refurb option details
  const viewPartsRemanOrRefurbDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Reman Part #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Refurbished Part #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Availability
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Total Available
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            94886.38
          </p>
        </div>
      </div>
    );
  };

  // view spare parts price details
  const viewPartsPriceDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Group#
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">Type</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Part #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            94886.38
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Valid From
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Valid To
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
      </div>
    );
  };

  // view spare parts warrenty details
  const viewPartsWarrantyDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Warranty Type
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Warranty Duration
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Date Of Sale
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Date Of Installation
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
      </div>
    );
  };

  return (
    <ModalWrapper
      show={show}
      hide={hideModal}
      header={`${headerTitle}`}
      size="md"
      centered
    >
      {contentReportType === SPARE_PARTS_REPLACED_BY_DETAILS &&
        viewPartsReplacedByDetails()}
      {contentReportType === SPARE_PARTS_ALTERNATE_PARTS_DETAILS &&
        viewPartsAlternatePartsDetails()}
      {contentReportType === SPARE_PARTS_REMAN_OR_REFURB_DETAILS &&
        viewPartsRemanOrRefurbDetails()}
      {contentReportType === SPARE_PARTS_PRICE_DETAILS &&
        viewPartsPriceDetails()}
      {contentReportType === SPARE_PARTS_WARRENTY_DETAILS &&
        viewPartsWarrantyDetails()}
      <div className="text-right">
        <button
          type="button"
          className="btn bg-primary text-white"
          onClick={hideModal}
        >
          Close
        </button>
      </div>
    </ModalWrapper>
  );
};

export default PartsReportDetails;

import React from "react";
import ModalWrapper from "../common/ModelWrapper";
import {
  SPARE_PARTS_REPLACED_BY_DETAILS,
  SPARE_PARTS_ALTERNATE_PARTS_DETAILS,
  SPARE_PARTS_REMAN_OR_REFURB_DETAILS,
  SPARE_PARTS_PRICE_DETAILS,
  SPARE_PARTS_WARRENTY_DETAILS,
} from "../equipmentMasterConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";

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
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.replacedBy)
              ? "NA"
              : contetntReportObj.replacedBy}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Replaced Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.quantity)
              ? "0"
              : contetntReportObj.quantity}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Availability
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.availablity)
              ? "NA"
              : contetntReportObj.availablity}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Total Available
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.totalAvailablity)
              ? "NA"
              : contetntReportObj.totalAvailablity}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.salesUnit)
              ? "NA"
              : contetntReportObj.salesUnit}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.price) ? "NA" : contetntReportObj.price}
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
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            New
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Availability
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Total Available
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            1
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            9.92
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
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
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Refurbished Part #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            New
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Availability
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Total Available
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            1
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            9.92
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
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
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.groupNumber)
              ? "NA"
              : contetntReportObj.groupNumber}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">Type</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.type) ? "NA" : contetntReportObj.type}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Part #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.partNumber)
              ? "NA"
              : contetntReportObj.partNumber}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sales Unit
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {" "}
            {isEmpty(contetntReportObj.salesUnit)
              ? "NA"
              : contetntReportObj.salesUnit}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {" "}
            {isEmpty(contetntReportObj.quantity)
              ? "NA"
              : contetntReportObj.quantity}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.price) ? "NA" : contetntReportObj.price}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Valid From
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.validFrom)
              ? "NA"
              : contetntReportObj.validFrom}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Valid To
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.validTo)
              ? "NA"
              : contetntReportObj.validTo}
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
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.warrantyType)
              ? "NA"
              : contetntReportObj.warrantyType}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Warranty Duration
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.warrentyDuration)
              ? "NA"
              : contetntReportObj.warrentyDuration}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Date Of Sale
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.dateOfSale)
              ? "NA"
              : contetntReportObj.dateOfSale}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Date Of Installation
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.dateOfInstallation)
              ? "NA"
              : contetntReportObj.dateOfInstallation}
          </p>
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

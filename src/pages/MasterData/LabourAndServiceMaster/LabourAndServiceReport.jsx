import React from "react";
import ModalWrapper from "../common/ModelWrapper";
import {
  LABOUR_AND_SERVICE_ERP_DETAILS,
  LABOUR_AND_SERVICE_PRICE_DETAILS,
} from "../equipmentMasterConstants";

const LabourAndServiceReport = ({
  show,
  hideModal,
  headerTitle,
  contentReportType,
  contetntReportObj = null,
}) => {
  //Labor and Service Price details
  const labourAndServicePriceDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Charge Code
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Labor Code
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Labor Type
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Service Type
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Unit Of Measure
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">Days</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Unit Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Currency
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">USD</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Effective From
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Last Updated
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
      </div>
    );
  };

  // LAbour and Service ERP Price Details
  const labourAndServiceERPPriceDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Activity ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Activity Name
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Chroming
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Supplying Vendor
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Test Agency 1
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Unit Of Measure
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Hours
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Unit Price
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Currency
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">USD</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Effective From
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Last Updated
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            01/01/2023
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
      {contentReportType === LABOUR_AND_SERVICE_PRICE_DETAILS &&
        labourAndServicePriceDetails()}
      {contentReportType === LABOUR_AND_SERVICE_ERP_DETAILS &&
        labourAndServiceERPPriceDetails()}

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

export default LabourAndServiceReport;
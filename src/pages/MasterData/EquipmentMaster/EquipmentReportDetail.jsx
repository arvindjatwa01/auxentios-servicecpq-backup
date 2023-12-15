import React from "react";
import ModalWrapper from "../common/ModelWrapper";
import {
  EQUIPMENT_CONTRACT_DETAILS,
  EQUIPMENT_ERP_WARRENTY_REPORT_DETAILS,
  EQUIPMENT_FAILURE_REPORT_DETAILS,
  EQUIPMENT_SERVICE_REPORT_DETAILS,
  EQUIPMENT_USAGE_SMU_REPORT_DETAILS,
  EQUIPMENT_WARRENTY_DETAILS,
  EQUIPMNT_USAGE_REPORT_DETAILS,
} from "../equipmentMasterConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";

const EquipmentReportDetail = ({
  show,
  hideModal,
  headerTitle,
  contentReportType,
  contetntReportObj = null,
}) => {
  // view Equipment contract details
  const viewEquipmentContractDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Entitlement #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.entitlementId)
              ? "NA"
              : contetntReportObj.entitlementId}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Entitlement Title
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {" "}
            {isEmpty(contetntReportObj.title) ? "NA" : contetntReportObj.title}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Category
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.category)
              ? "NA"
              : contetntReportObj.category}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Basis
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.basis) ? "NA" : contetntReportObj.basis}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Amount
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.amount)
              ? "NA"
              : contetntReportObj.amount}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Currency
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.currency)
              ? "NA"
              : contetntReportObj.currency}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Valid For
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.validFor)
              ? "NA"
              : contetntReportObj.validFor}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">Unit</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.unitOfMeasure)
              ? "NA"
              : contetntReportObj.unitOfMeasure}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.startDate)
              ? "NA"
              : contetntReportObj.startDate}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.endDate)
              ? "NA"
              : contetntReportObj.endDate}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.startUsage)
              ? "NA"
              : contetntReportObj.startUsage}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.endUsage)
              ? "NA"
              : contetntReportObj.endUsage}
          </p>
        </div>
      </div>
    );
  };

  // view Equipment warrenty details
  const viewEquipmentWarrentyDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">ID</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.id) ? "NA" : contetntReportObj.id}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Title
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.title) ? "NA" : contetntReportObj.title}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Category
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.category)
              ? "NA"
              : contetntReportObj.category}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Basis
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.basis) ? "NA" : contetntReportObj.basis}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">Unit</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.unitOfMeasure)
              ? "NA"
              : contetntReportObj.unitOfMeasure}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.startDate)
              ? "NA"
              : contetntReportObj.startDate}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.endDate)
              ? "NA"
              : contetntReportObj.endDate}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.startUsage)
              ? "NA"
              : contetntReportObj.startUsage}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.endUsage)
              ? "NA"
              : contetntReportObj.endUsage}
          </p>
        </div>
      </div>
    );
  };

  // view Equipment ERP warrenty details
  const viewEquipmentERPWarrentyReportDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Component ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Description
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            SEAL-O-RING
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Serial Number
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Warranty
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">PC</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Warranty Code
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
      </div>
    );
  };

  // view Equipment Service REport details
  const viewEquipmentServiceReportDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Report #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.reportNumber)
              ? "NA"
              : contetntReportObj.reportNumber}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Job #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.jobNumber)
              ? "NA"
              : contetntReportObj.jobNumber}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Engine Model #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.engineModelNumber)
              ? "NA"
              : contetntReportObj.engineModelNumber}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Engine Serial #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.engineSerialNumber)
              ? "NA"
              : contetntReportObj.engineSerialNumber}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.usage) ? "NA" : contetntReportObj.usage}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Repair Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.repairDate)
              ? "NA"
              : contetntReportObj.repairDate}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Complaints
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.complaint)
              ? "NA"
              : contetntReportObj.complaint}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Condition
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.condition)
              ? "NA"
              : contetntReportObj.condition}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Customer
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.customer)
              ? "NA"
              : contetntReportObj.customer}
          </p>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Customer Request
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.customerRequest)
              ? "NA"
              : contetntReportObj.customerRequest}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Site Address
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.siteAddress)
              ? "NA"
              : contetntReportObj.siteAddress}
          </p>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Engineer Remark
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.engineerRemark)
              ? "NA"
              : contetntReportObj.engineerRemark}
          </p>
        </div>
      </div>
    );
  };

  // view Equipment Failure Report details
  const viewEquipmentFailureReportDetails = () => {
    return (
      <div className="row">
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
            Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.quantity)
              ? 1
              : contetntReportObj.quantity}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sub-Assembly
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.subAssembly)
              ? "NA"
              : contetntReportObj.subAssembly}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Warranty
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.warranty)
              ? "NA"
              : contetntReportObj.warranty}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Failure Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.failureDate)
              ? "NA"
              : contetntReportObj.failureDate}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Repair Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.repairDate)
              ? "NA"
              : contetntReportObj.repairDate}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Hours On Part
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.hoursOfPart)
              ? "NA"
              : contetntReportObj.hoursOfPart}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Complaint
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.complaint)
              ? "NA"
              : contetntReportObj.complaint}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Cause
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.cause) ? "NA" : contetntReportObj.cause}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Correction
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.correction)
              ? "NA"
              : contetntReportObj.correction}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Specific Information
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.specificInformation)
              ? "NA"
              : contetntReportObj.specificInformation}
          </p>
        </div>
      </div>
    );
  };

  // view Equipment usage Report details
  const viewEquipmentUsageReportDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Current Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.currentUsage)
              ? "NA"
              : contetntReportObj.currentUsage}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Average Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.averageUsage)
              ? "NA"
              : contetntReportObj.averageUsage}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Last Updated Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.updatedAt)
              ? "NA"
              : contetntReportObj.updatedAt}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sensor ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.sensorId)
              ? "NA"
              : contetntReportObj.sensorId}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            SMU ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.smuId) ? "NA" : contetntReportObj.smuId}
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            SMU Type
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
            {isEmpty(contetntReportObj.smuType)
              ? "NA"
              : contetntReportObj.smuType}
          </p>
        </div>
      </div>
    );
  };

  // view Equipment usage smu report details
  const viewEquipmentUsageSMUReportDetails = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            SMU ID/Sensor ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            SMU Type
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Usage ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Reading Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">Unit</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Reading Description
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            94886.38
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Overwrite/Error
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            94886.38
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
      {contentReportType === EQUIPMENT_CONTRACT_DETAILS &&
        viewEquipmentContractDetails()}
      {contentReportType === EQUIPMENT_WARRENTY_DETAILS &&
        viewEquipmentWarrentyDetails()}
      {contentReportType === EQUIPMENT_ERP_WARRENTY_REPORT_DETAILS &&
        viewEquipmentERPWarrentyReportDetails()}
      {contentReportType === EQUIPMENT_SERVICE_REPORT_DETAILS &&
        viewEquipmentServiceReportDetails()}
      {contentReportType === EQUIPMENT_FAILURE_REPORT_DETAILS &&
        viewEquipmentFailureReportDetails()}
      {contentReportType === EQUIPMNT_USAGE_REPORT_DETAILS &&
        viewEquipmentUsageReportDetails()}
      {contentReportType === EQUIPMENT_USAGE_SMU_REPORT_DETAILS &&
        viewEquipmentUsageSMUReportDetails()}

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

export default EquipmentReportDetail;

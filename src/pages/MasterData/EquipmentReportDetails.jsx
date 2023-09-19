import React from "react";
import { Modal } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EquipmentReportDetails = ({ show, hideModel, header, reportType }) => {
  // equipment-master-component
  const failureReport = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Part #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Caterpillar
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Quantity
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            336D2 L
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sub-Assembly
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Warranty
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            C9 ACERT
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Failure Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            80648 lb
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Repair Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Hours On Part
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Complaint
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Lorem ipsum dolor sit amet, consectetuer.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Cause
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Lorem ipsum dolor sit amet, consectetuer.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Correction
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Lorem ipsum dolor sit amet, consectetuer.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Specific Information
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Lorem ipsum dolor sit amet, consectetuer.Lorem ipsum dolor sit ame.
          </p>
        </div>
      </div>
    );
  };
  const WarrantyReport = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">ID</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Title
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Category
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            SEAL-O-RING
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Basis
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            C9 ACERT
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">Unit</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">8501</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">3873</p>
        </div>
      </div>
    );
  };
  const ServiceReport = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Report #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Caterpillar
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Job #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            336D2 L
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Engine Model #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Engine Serial #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            C9 ACERT
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            80648 lb
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Repair Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Complaints
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Condition
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            336D2 L
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Customer
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Customer Request
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis.
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Site Address
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            8501 Willow Avenue, Los Angeles, CA 90037
          </p>
        </div>
        <div className="col-lg-8 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Engineer Remark
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis.
          </p>
        </div>
      </div>
    );
  };
  const ContractReport = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Entitlement #
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Entitlement Title
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Category
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            SEAL-O-RING
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Basis
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            C9 ACERT
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Amount
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Currency
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Valid For
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            268 HP
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">Unit</p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">PC</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Start Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">8501</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            End Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">3873</p>
        </div>
      </div>
    );
  };
  const ErpWarrantyReport = () => {
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
  const UsageReport = () => {
    return (
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Current Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            2276044
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Average Usage
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">New</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Last Updated Date
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            1757896
          </p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            Sensor ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">1</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            SMU ID
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">9.92</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
          <p className="text-light-60 font-size-12 m-0 font-weight-500">
            SMU Type
          </p>
          <p className="text-primary font-size-12 mt-1 font-weight-500">
            94886.38
          </p>
        </div>
      </div>
    );
  };
  const UsageSmuReport = () => {
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
  // parts-360-component
  const ReplacedByReport = () => {
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
  const AlternateReport = () => {
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
  const RemanRefurbReport = () => {
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
  const PriceDetails = () => {
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
  const PartsWarrantyDetails = () => {
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
  // service-labor-component
  const LaborPriceDetails = () => {
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
  const ServicePriceDetails = () => {
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
          <p className="text-primary font-size-12 mt-1 font-weight-500">Hours</p>
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
    <Modal
      className="failure-modal"
      size="md"
      show={show}
      onHide={hideModel}
      centered
    >
      <Modal.Header>
        <Modal.Title>
          {header}
          <span className="ml-2">
            <EditOutlinedIcon className="font-size-20" />
          </span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bg-white p-3 border-radius-10">
          {/* equipment-master-component */}
          {reportType === "failure" && failureReport()}
          {reportType === "warranty" && WarrantyReport()}
          {reportType === "service" && ServiceReport()}
          {reportType === "contract" && ContractReport()}
          {reportType === "erpWarranty" && ErpWarrantyReport()}
          {reportType === "usage" && UsageReport()}
          {reportType === "usageSmu" && UsageSmuReport()}
          {/* parts-360-component */}
          {reportType === "replacedByDetails" && ReplacedByReport()}
          {reportType === "alternateDetails" && AlternateReport()}
          {reportType === "remanDetails" && RemanRefurbReport()}
          {reportType === "price" && PriceDetails()}
          {reportType === "partsWarranty" && PartsWarrantyDetails()}
          {/* service-master-component */}
          {reportType === "laborPrice" && LaborPriceDetails()}
          {reportType === "srvicePrice" && ServicePriceDetails()}

          <div className="text-right">
            <button
              type="button"
              className="btn bg-primary text-white"
              onClick={hideModel}
            >
              Close
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EquipmentReportDetails;

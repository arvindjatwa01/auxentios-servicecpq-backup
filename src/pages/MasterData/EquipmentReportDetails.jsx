import React from "react";
import { Modal } from "react-bootstrap";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EquipmentReportDetails = ({ show, hideModel, isFailureReport }) => {
  // show failures modal data
  const viewFailureReportDetails = () => {
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

  //  show service report details
  const viewServiceReportDetails = () => {
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
          {isFailureReport ? "Failure" : "Service"} Report Details
          <span>
            <EditOutlinedIcon />
          </span>{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bg-white p-3 border-radius-10">
          {isFailureReport
            ? viewFailureReportDetails()
            : viewServiceReportDetails()}
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

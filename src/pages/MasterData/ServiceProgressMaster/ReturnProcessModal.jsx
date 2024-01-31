import { Divider } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";

const ReturnProcessModal = ({ show, hideModal }) => {
  return (
    <Modal show={show} onHide={hideModal} centered size="xl">
      <Modal.Body>
        <div className="card border px-2 py-3 mt-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-center justify-content-center ">
              <h6>Select One action you would like to take</h6>
              <div className="row d-flex justify-content-center mb-3">
                <button className="btn btn-dark mx-5">Evaluate</button>
                <button className="btn btn-success">Return/Rebuild</button>
              </div>
              <a href="#" className="cursor mt-5" onClick={hideModal}>Cancel</a>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              {/* <table className="table"></table> */}
              <div className="row">
                <div
                  className="col pb-1"
                  style={{ fontWeight: 400, color: "#000000" }}
                >
                  Coupon Discount
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 600, color: "#000000" }}
                >
                  -$439
                </div>
              </div>
              <div className="row pb-1">
                <div
                  className="col"
                  style={{ fontWeight: 400, color: "#000000" }}
                >
                  Shipping
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 600, color: "#000000" }}
                >
                  $71.99
                </div>
              </div>
              <div className="row pb-1">
                <div
                  className="col"
                  style={{ fontWeight: 400, color: "#000000" }}
                >
                  Taxes
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 600, color: "#000000" }}
                >
                  $21
                </div>
              </div>
              <div className="row pb-1 border-bottom border-secondary ">
                <div
                  className="col"
                  style={{ fontWeight: 400, color: "#000000" }}
                >
                  State Recycling Fee
                </div>
                <div
                  className="col"
                  style={{ fontWeight: 600, color: "#000000" }}
                >
                  $9.99
                </div>
              </div>
              <div className="row pb-1 text-success">
                <div className="col" style={{ fontWeight: 500 }}>
                  TOTAL
                </div>
                <div className="col" style={{ fontWeight: 600 }}>
                  $541.98
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReturnProcessModal;

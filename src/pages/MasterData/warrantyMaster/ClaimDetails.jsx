import React from "react";
import { Modal } from "react-bootstrap";

const ClaimDetails = ({show, hideModal}) => {
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <h5 style={{ fontWeight: 500 }}>Claim Detials</h5>
        <div className="card border px-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Claim Status
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Pending
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Claim Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Coil
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Replacement
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  No
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Fill Date
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  14/10/2023
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Installed
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  14/10/2023
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Defect Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Return Bead Leak
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Defect Description
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  -
                </p>
              </div>
            </div>
          </div>
        </div>
        <h5 style={{ fontWeight: 500 }}>Distributor</h5>
        <div className="card border px-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Distributor Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Jones Welly
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Distributor Address
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  -
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  City
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Pekon
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  State
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  WA
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Zip Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  90399
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Contact Email
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  hello@airtech.com
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Phone Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  -
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Fax
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  509-727-3333
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 px-2 d-flex justify-content-arround">
          <button
            className="btn text-white bg-primary mx-1"
            onClick={hideModal}
          >
            Submit
          </button>
          <button
            className="btn text-white bg-primary mx-1"
            onClick={hideModal}
          >
            Cancel
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimDetails;

import React from "react";
import { Modal } from "react-bootstrap";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const WarrantyClaimAddUpdate = ({ show, hideModal }) => {
  return (
    <>
      <Modal show={show} onHide={hideModal} size="xl">
        <Modal.Body>
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 border-50 text-white bg-primary">
              <div className="card py-4 px-2 text-white bg-primary align-items-center ">
                <h2 className="text-white">Warranty Claim</h2>
                <h5 className="text-white">Provided Information</h5>
                <div
                  className="row px-2 d-flex flex-column justify-content-center align-items-center"
                  style={{ borderLeft: "1px solid #ffffff" }}
                >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Warranty Status
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        Under Warranty*
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Warranty ID
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        123546789
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Serial Number
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        b-21-123456
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white text-white font-size-12 m-0 font-weight-500">
                        Model Number
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        ce60f34-210l-004
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Replacement
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        Yes
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-500">
                        Installed
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        Yes
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 text-white font-size-12 m-0 font-weight-100">
                        Distributor Info
                      </p>
                      <p className="text-white font-size-14 mb-1 font-weight-500 text-uppercase">
                        <AssignmentTurnedInIcon />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 border-50">
              <h5 style={{ fontWeight: "bold" }}>End Customer</h5>
              <div className="card border px-2">
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        End Customer First Name
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Zach
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        End Customer Last Name
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Hallum
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installation Addresss
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        1511 S Union S Ct.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installation Addresss 2
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Unit 4
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        City
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Kenniwich
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        State/Province
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        WA
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Zip Code
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        99320
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Email
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Zach@nuke.digital
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Phone
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        509-727-3333
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h5 style={{ fontWeight: "bold" }}>Installer</h5>
              <div className="card border px-2 mb-0">
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Install Company Name
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Air-Tech Services
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installer Address
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        250 A Street
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Installer Address 2
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Ste 4
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        City
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Pasco
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        State
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        WA
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Zip
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        99320
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Email
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Zach@nuke.digital
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Contact Phone
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        509-727-3333
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
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
                  Back
                </button>
                <button
                  className="btn text-white bg-primary mx-1"
                  //   onClick={hideModal}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WarrantyClaimAddUpdate;

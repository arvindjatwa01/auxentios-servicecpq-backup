import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
// import partsImage from "";
import { Modal } from "react-bootstrap";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";
import { claimRecords } from "./WarrantyConstants";
import WarrantyClaimAddUpdate from "./WarrantyClaimAddUpdate";

const WarrantyOverView = ({ show, hideModal, handleOverViewModal }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const claimColumns = [
    {
      field: "claimNumber",
      headerName: "Claim Number",
      flex: 1,
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      flex: 1,
    },
    {
      field: "claimType",
      headerName: "Claim Type",
      flex: 1,
    },
    {
      field: "claimDate",
      headerName: "Claim Date",
      flex: 1,
    },
    {
      field: "replacement",
      headerName: "Replacement",
      flex: 1,
    },
  ];

  // Overview tab data
  const viewOverviewTab = () => {
    return (
      <>
        <div className="row mt-3 mb-5">
          <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 border-50">
            <div className="card border px-5">
              <img
                src="../../assets/images/spare-parts.png"
                alt="spare-parts"
                className="card-img-top width-75 img-fluid"
              />
            </div>
            <div className="card-body">
              <h6 className="card-title">Notes</h6>
              <p class="card-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti labore eum quas odit, sunt ex tenetur nobis neque nulla
                ad, vel, voluptatibus veritatis repellat temporibus. Totam, amet
                dolore illo laudantium, praesentium, fuga incidunt expedita
                voluptatem maiores obcaecati possimus magnam vel quaerat labore
                velit. Rem ut, et laboriosam corporis fuga aut ex?
              </p>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 equipment-master-chart mt-custom">
            <div className="">
              <div className="bg-white p-3 border-radius-10 ">
                <div className="d-flex align-items-center justify-content-between equipment-pagination">
                  <h5 className="font-weight-600 mb-0 text-uppercase">
                    DA24A- da series aluminum uncased upflow/downflow coil
                  </h5>
                </div>
              </div>
              <div className="bg-white p-3 border-radius-10 overflow-hidden">
                <div className="row align-items-end">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Warranty Id
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        123546789
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Warranty Start Date
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        10/14/2023
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Model Number
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        ce60f34-210l-004
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Serial Number
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        b-21-123456
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Warranty Status
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        In Warranty
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Warranty Start Date
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        10/14/2025
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Manufecture Date
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        09/02/2020
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
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Date of Install
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        10/15/2020
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        warranty Certificate
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Aspen Cert-12345.pdf
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row align-items-end">
                  <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                    <div className="d-block">
                      <p className="text-light-60 font-size-12 m-0 font-weight-500">
                        Proof of Install
                      </p>
                      <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                        Yes <InsertPhotoIcon />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 border-radius-10 overflow-hidden">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <h6 style={{ fontWeight: "bold" }}>Installer</h6>
                    <div className="card border px-3">
                      <div className="row align-items-end">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Installer Company Name
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Air-Tech Services
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-end">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Installer Address
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              2500 A Street Ste 4
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Contact Email
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              hello@airtech.com
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-end">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              City
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Pasco
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6 col-12">
                          <div className="row align-items-end">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  State
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  WA
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
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
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Phone Number
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              509-727-3333
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-end">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Installer Type
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Installer Type
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Equipment Info
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Equipment Info
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Distributor/Wholesalers
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Jones Supply
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <h6 style={{ fontWeight: "bold" }}>End Customer</h6>
                    <div className="card border px-3">
                      <div className="row align-items-end">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              End Customer Name
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Zach Hallum
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-end">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              End Customer Address
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              300 Lakeview Ct
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              End Customer Email
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Zach@nuke.digital
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row align-items-end">
                        <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              City
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              Richland
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-6 col-12">
                          <div className="row align-items-end">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
                              <div className="d-block">
                                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                                  State
                                </p>
                                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                                  WA
                                </p>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12 col-12">
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
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                          <div className="d-block">
                            <p className="text-light-60 font-size-12 m-0 font-weight-500">
                              Phone Number
                            </p>
                            <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                              509-270-7555
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Details Tab Data
  const viewDetailsTab = () => {
    return (
      <>
        <h6 style={{ fontWeight: "bold" }}>Item Details</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Model Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  ce60f34-210l-004
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Serail Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  B-21-123456
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Manufacture Date
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  09/02/2020
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
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty ID
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  123546789
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty Status
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Under Warranty
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty Start Date
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  10/14/2020
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty End Date
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  10/14/2025
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Date of Install
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  10/20/2020
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Proof of Install
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Yes <InsertPhotoIcon />
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty Certificate
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Aspen Cert-12345.pdf
                </p>
              </div>
            </div>
          </div>
        </div>

        <h6 style={{ fontWeight: "bold" }}>Installer</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Installer Company Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Air-Tech Services
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Installer Address
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  2500 A Street Ste 4
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  City
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Pasco
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
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Zip Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  99320
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
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Phone Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  509-727-3333
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Installer Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Installer Type
                </p>
              </div>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Equipment Info
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Equipment Info
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Distributor/WholeSaler
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Jones Supply
                </p>
              </div>
            </div>
          </div>
        </div>

        <h6 style={{ fontWeight: "bold" }}>End Customer</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  End Customer Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Zach Hallum
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  End Customer Address
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  300 Lakeview Ct.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  City
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Richland
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
          </div>
          <div className="row align-items-end">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Zip Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  99320
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Contact Email
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  zach@nuke.digital
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Phone Number
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  509-270-7555
                </p>
              </div>
            </div>
          </div>
        </div>

        <h6 style={{ fontWeight: "bold" }}>Notes</h6>
        <div className="card border mb-2 mt-2 px-3">
          <div className="row align-items-end">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Warranty Notes
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Claim Tab  data
  const viewClaimTab = () => {
    return (
      <>
        <div className="card px-3">
          <Box
            sx={{
              width: "100%",
              height: 500,
              // marginBottom: 8,
              marginInline: 2,
            }}
          >
            <div className="row align-items-end text-end ">
              <div className="col-12 d-flex justify-content-end mb-2 float-end ">
                <button className="btn btn-primary float-end " onClick={() => {handleOverViewModal();}}>
                  Create New
                </button>
              </div>
            </div>
            <DataGrid
              rows={claimRecords}
              columns={claimColumns}
              sx={GRID_STYLE}
              //   initialState={{
              //     pagination: {
              //       paginationModel: {
              //         pageSize: 5,
              //       },
              //     },
              //   }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal show={show} onHide={hideModal} size="xl">
        <Modal.Body>
          <Box sx={{ typography: "body1" }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  className="custom-tabs-div"
                  aria-label="lab API tabs example"
                  onChange={(e, tabValue) => setActiveTab(tabValue)}
                  centered
                >
                  <Tab label={`Overview`} value="overview" />
                  <Tab label={`Details`} value="details" />
                  <Tab label={`Claim`} value="claim" />
                  <Tab label={`Files`} value="files" />
                </TabList>
              </Box>
              <TabPanel value={activeTab}>
                {activeTab === "overview" && viewOverviewTab()}
                {activeTab === "details" && viewDetailsTab()}
                {activeTab === "claim" && viewClaimTab()}
              </TabPanel>
            </TabContext>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WarrantyOverView;

import React, { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import ReturnRequester from "./ReturnRequester";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { Warranty_Country_List_GET } from "services/CONSTANTS";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// const warrantyCard = [""]

const WarrantyReturnMaster = () => {
  const [showReturnRequesterModal, setShowReturnRequesterModal] =
    useState(false);

  const [countryList, setCountryList] = useState([]);

  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  useEffect(() => {
    getCountryKeyValueList();
  }, []);

  //
  const getCountryKeyValueList = () => {
    const rUrl = `${Warranty_Country_List_GET}?pageNumber=${0}&pageSize=${10}`;
    callGetApi(null, rUrl, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        const options = [];
        responseData.map((row) =>
          // options.push({ label: row.countryName, value: row.countryId })
          options.push({ label: row.countryName, value: row.countryName })
        );
        setCountryList(options);
      }
    });
  };

  const toggleReturnRequesterModal = () => {
    setShowReturnRequesterModal(true);
  };
  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div>
        <div className="content-body bg-white" style={{ minHeight: "884px" }}>
          <div className="container-fluid mt-3">
            <h4 className="mb-3">Warranty Dashboard</h4>
            <div class="row gx-3">
              <div class="col mt-2">
                <div class="card" style={{ width: "30rem" }}>
                  <ul class="list-group list-group-flush ">
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center p-3"
                      style={{ backgroundColor: "rgb(245, 224, 245)" }}
                    >
                      <div>
                        <span class="material-icons mr-2">
                          {" "}
                          <i
                            class="fa-regular fa-square-minus me-2"
                            style={{ color: "blue" }}
                          ></i>
                        </span>{" "}
                        Recent Activity
                      </div>
                      <span>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </span>
                    </li>
                    <li class="list-group-item ">
                      <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                        <div className="text-primary">
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          <strong>Claim 12920-2</strong>
                        </div>
                        <span>5:45PM</span>
                      </div>
                      <p>Discount has been changed from 797 to 700 </p>
                      <p className="text-primary">for SB12930</p>
                      <p>Discount has been changed from 797 to700</p>
                      <p>
                        <small>
                          <i class="fa-solid fa-angle-up me-2"></i>View more
                        </small>
                      </p>
                    </li>
                    <li class="list-group-item">
                      <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                        <div>
                          <span class="material-icons mr-2">
                            {" "}
                            <i
                              class="fa-solid fa-triangle-exclamation me-2"
                              style={{ color: "red" }}
                            ></i>
                          </span>{" "}
                          <strong>Claim 12920-2</strong>
                        </div>
                        <span>5:45PM</span>
                      </div>
                      <p>Discount has been changed from 797 to 700</p>
                      <p>
                        <small>
                          <i class="fa-solid fa-angle-down me-2"></i>View less
                        </small>{" "}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                  <div class="card" style={{ width: "25rem" }}>
                    <div
                      class="list-group-item d-flex justify-content-between align-items-center p-3"
                      style={{ backgroundColor: "#ADD8E6" }}
                    >
                      <div>
                        <span class="material-icons  text-primary">
                          {" "}
                          <i class="fa-regular fa-square-minus me-2"></i>
                        </span>{" "}
                        Workflow Tasks
                      </div>
                      <span>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </span>
                    </div>

                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                          <div>
                            <span class="material-icons text-primary">
                              <i class="fa-regular fa-square-minus"></i>
                            </span>{" "}
                            <strong style={{ color: "blue" }}>CL456 </strong>
                            requires your approval
                            {/* <strong>CL456 requires your approval</strong> */}
                          </div>
                          <span>5:45PM</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-start  border border-white">
                          <p className="me-2">
                            <strong>Approve</strong>
                          </p>
                          <p className="me-2">Reject</p>
                          <p>Review</p>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                          <div>
                            <span class="material-icons text-primary">
                              {" "}
                              <i class="fa-regular fa-square-minus"></i>
                            </span>{" "}
                            <strong style={{ color: "blue" }}>CL456 </strong>
                            requires your approval
                            {/* <strong>CL456 requires your approval</strong> */}
                          </div>
                          <span>5:45PM</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-start  border border-white">
                          <p className="me-2">
                            <strong>Approve</strong>
                          </p>

                          <p className="me-2">Reject</p>
                          <p>Review</p>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div class="list-group-item d-flex justify-content-between align-items-center border border-white">
                          <div>
                            <span class="material-icons text-primary ">
                              {" "}
                              <i class="fa-regular fa-square-minus"></i>
                            </span>{" "}
                            <strong style={{ color: "blue" }}>CL456 </strong>
                            requires your approval
                          </div>
                          <span>5:45PM</span>
                        </div>
                        <div class="list-group-item d-flex justify-content-start  border border-white">
                          <p className="me-2">
                            <strong>Approve</strong>
                          </p>

                          <p className="me-2">Reject</p>
                          <p>Review</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                  <div class="mb-3">
                    <div
                      class="border  border-success rounded"
                      style={{ color: "green", backgroundColor: "#D1FFBD" }}
                    >
                      <div class="list-group-item d-flex justify-content-between align-items-center p-3 ">
                        <div>
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          Warranty Administration
                        </div>
                        <span>
                          <ArrowForwardIosIcon />
                        </span>
                      </div>
                    </div>
                    <div
                      class=" rounded mt-4 "
                      style={{
                        color: "purple",
                        border: "1px solid purple",
                        backgroundColor: "rgb(245, 224, 245)",
                      }}
                    >
                      <div class="list-group-item d-flex justify-content-between align-items-center p-3 ">
                        <div>
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          Warranty Claims
                        </div>
                        <span>
                          <ArrowForwardIosIcon />
                        </span>
                      </div>
                    </div>
                    <div
                      class="border border-info rounded mt-4  text-black "
                      style={{ backgroundColor: "#add8e6 " }}
                    >
                      <div class="list-group-item d-flex justify-content-between align-items-center p-3 ">
                        <div>
                          <span class="material-icons ">
                            {" "}
                            <i class="fa-regular fa-square-minus me-2"></i>
                          </span>{" "}
                          Parts Return
                        </div>
                        <span>
                          <ArrowForwardIosIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showReturnRequesterModal && (
        <ReturnRequester
          show={showReturnRequesterModal}
          hideModal={() => setShowReturnRequesterModal(false)}
          handleSnack={handleSnack}
          countryRegionOptionsList={countryList}
        />
      )}
    </>
  );
};

export default WarrantyReturnMaster;

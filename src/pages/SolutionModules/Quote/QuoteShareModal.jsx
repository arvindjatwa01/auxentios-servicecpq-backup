import React, { useState } from "react";
import searchIcon from "../../../assets/icons/svg/search.svg";

import Select from "react-select";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Box from "@mui/material/Box";
import { callPostApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import Validator from "utils/validator";
import { SEND_EMAIL_URL } from "services/CONSTANTS";

const QuoteShareModal = ({ show, hideModal, handleSnack }) => {
  const [toEmail, setToEmail] = useState("");

  const handleSendEmail = () => {
    const validator = new Validator();
    if (!validator.emailValidation(toEmail)) {
      handleSnack("error", "Please enter the email address in correct format");
      return;
    }
    const rObj = `to=${toEmail}&subject=Requested Quote Link&body=Hello,<br> <p>I appreciate your interest in our service. Attached is the quote screen link <a href ="https://dev.servicecpq.com/login">Click Here</a> you requested, including all details and terms. We think our offer matches your requirements. <br><br>Looking forward to hearing from you.</p> <br> Thanks & Regards<br>Auxentios Technology&fromEmail=no-reply@auxentios.com&fromName=Auxentios Technology`;
    callPostApi(null, SEND_EMAIL_URL + rObj, {}, (response) => {
      if (response.status === API_SUCCESS) {
        handleSnack("success", "Email sent successfully, check now!");
      } else {
        handleSnack("error", "something went wrong, please try again");
      }
    });
  };

  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={show}
        onClose={hideModal}
        // onOpen={toggleDrawer(anchor, true, true)}
      >
        <Box
          sx={{ width: 420 }}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          <div className="modal-header d-block">
            <button type="button" className="close" onClick={hideModal}>
              <span aria-hidden="true">×</span>
            </button>
            <h4 className="modal-title" id="myModalLabel2">
              Share
            </h4>
          </div>
          <div className="p-3">
            <div>
              <a href="#" className="btn border">
                Internal
              </a>
              <a href="#" className="btn bg-primary text-white">
                Customer
              </a>
            </div>
            <h6 className="mt-3">MEMBERS</h6>
            <p>Amet minim mollit non deserunt ullamco est sit Viewer</p>

            <div className=" d-flex">
              <div className="input-group icons approvesearch mr-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text bg-transparent border-0 pr-0 "
                    id="basic-addon1"
                  >
                    <img src={searchIcon} />
                  </span>
                </div>
                <input
                  type="search"
                  className="form-control"
                  placeholder=""
                  value={toEmail}
                  aria-label="Search Dashboard"
                  onChange={(e) => setToEmail(e.target.value)}
                />
                <div
                  className="customselect d-flex align-items-center"
                  style={{ position: "absolute", right: "10px", top: "10px" }}
                >
                  <Select
                    // onChange={handleChangeSelect}
                    isClearable={true}
                    // value={dValue}
                    options={[{ label: "One", value: "one" }]}
                    placeholder="Viewer"
                  />
                </div>
              </div>
              <div>
                <a
                  //   href="#"
                  className="btn bg-primary text-white cursor"
                  //   data-toggle="modal"
                  //   data-target="#Assingmodal"
                  onClick={handleSendEmail}
                >
                  Send
                </a>
              </div>
            </div>
          </div>
        </Box>
        {/* {list(anchor)} */}
      </SwipeableDrawer>
    </>
  );
};

export default QuoteShareModal;

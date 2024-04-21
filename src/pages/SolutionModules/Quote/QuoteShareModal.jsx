import React from "react";
import searchIcon from "../../../assets/icons/svg/search.svg";

import Select from "react-select";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Box from "@mui/material/Box";

const QuoteShareModal = ({ show, hideModal }) => {
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
                  aria-label="Search Dashboard"
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
                  href="#"
                  className="btn bg-primary text-white"
                  data-toggle="modal"
                  data-target="#Assingmodal"
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

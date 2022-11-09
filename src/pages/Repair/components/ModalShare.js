import SearchIcon from "@mui/icons-material/Search";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Modal } from "@mui/material";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Select from "react-select";

const ModalShare = (props) => {
  const [shareTabValue, setShareTabValue] = useState("1");

  const handleChange = (event, newValue) => {
    setShareTabValue(newValue);
  };
  return (
    <Modal
      open={props.shareOpen}
      onClose={props.handleCloseShare}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Share
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={shareTabValue}>
                <Box
                  className="custom-tabs w-100"
                  sx={{ borderColor: "divider" }}
                >
                  <TabList className="custom-tabs-div"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Internal" value="1" />
                    <Tab label="External" value="2" />
                  </TabList>
                </Box>
                <TabPanel className="px-3" value="1">
                  <h6 className="mt-3">MEMBERS</h6>
                  <p>Amet minim mollit non deserunt ullamco est sit Viewer</p>
                  <div className=" d-flex">
                    <div className="input-group icons approvesearch mr-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-transparent border-0 pr-0 "
                          id="basic-addon1"
                        >
                          <SearchIcon />
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
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "10px",
                        }}
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
                        Invite
                      </a>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="px-3" value="2">
                  <h6 className="mt-3">MEMBERS</h6>
                  <p>Amet minim mollit non deserunt ullamco est sit Viewer</p>
                  <div className=" d-flex">
                    <div className="input-group icons approvesearch mr-3">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text bg-transparent border-0 pr-0 "
                          id="basic-addon1"
                        >
                          <SearchIcon />
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
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "10px",
                        }}
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
                        Invite
                      </a>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={props.handleCloseShare}
            >
              Cancel
            </button>
            <button className="btn  btn-primary w-100">
              <span className="mr-2">
                <ShareOutlinedIcon />
              </span>
              Share
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalShare;

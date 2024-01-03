import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import {
  statusDropdownOptions,
  teamDropdownOptions,
} from "./workListConstents";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { FONT_STYLE } from "pages/Repair/CONSTANTS";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { LOCAL_CASES_WORKLIST } from "services/CONSTANTS";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import { API_SUCCESS } from "services/ResponseCode";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";

const LocalCaseWorkListAdUpdate = ({
  show,
  hideModal,
  refreshData = null,
  recordId = null,
}) => {
  const recordObj = {
    caseUniqueId: "",
    requester: "",
    team: "",
    title: "",
    task: "",
    startDate: new Date(),
    promiseDate: new Date(),
    status: "",
    userName: "",
    assignedTo: "",
  };

  const [record, setRecord] = useState(recordObj);
  useEffect(() => {
    if (recordId) {
      callGetApi(null, `${LOCAL_CASES_WORKLIST}/${recordId}`, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          // find team key value pair
          const _team = teamDropdownOptions.find(
            (obj) => obj.value === responseData.team
          );

          // find status key value pair
          const _status = statusDropdownOptions.find(
            (obj) => obj.value === responseData.status
          );

          setRecord({
            ...responseData,
            team: _team || "",
            status: _status || "",
          });
        }
      });
    }
  }, [recordId]);

  // Changes the text value
  const handleTextChange = (e) => {
    setRecord({ ...record, [e.target.id]: e.target.value });
  };

  const checkInputValidation = (reqObj) => {
    if (isEmpty(reqObj.caseUniqueId)) {
      errorMessage("Case unique id must not be empty", {
        id: reqObj.caseUniqueId,
      });
      return false;
    } else if (isEmpty(reqObj.requester)) {
      errorMessage("Name must not be empty", {
        id: reqObj.requester,
      });
      return false;
    } else if (isEmpty(reqObj.title)) {
      errorMessage("Title must not be empty", {
        id: reqObj.title,
      });
      return false;
    } else if (isEmpty(reqObj.team)) {
      errorMessage("Team must not be empty", {
        id: reqObj.team,
      });
      return false;
    }
    return true;
  };

  // submit
  const handleSubmit = () => {
    const rUrl = LOCAL_CASES_WORKLIST;
    const reqObj = {
      ...record,
      team: record.team?.value || "EMPTY",
      status: record.status?.value || "EMPTY",
    };
    if (!checkInputValidation(reqObj)) {
      return;
    }
    if (recordId === "" || !recordId) {
      callPostApi(null, rUrl, reqObj, (response) => {
        if (response.status === API_SUCCESS) {
          hideModal();
          refreshData();
        } else {
          errorMessage(response?.data?.message);
        }
      });
    } else {
      callPutApi(null, `${rUrl}/${recordId}`, reqObj, (response) => {
        if (response.status === API_SUCCESS) {
          hideModal();
          refreshData();
        } else {
          errorMessage(response?.data?.message);
        }
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={hideModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{recordId ? "Update" : "Create"} Work List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="container-fluid">
          <div className="card p-3">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="requester"
                  >
                    Case Unique Id
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="caseUniqueId"
                    aria-describedby="emailHelp"
                    placeholder="Case Unique Id"
                    onChange={handleTextChange}
                    value={record.caseUniqueId}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="requester"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="requester"
                    aria-describedby="emailHelp"
                    placeholder="Requester Name"
                    onChange={handleTextChange}
                    value={record.requester}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="requester"
                  >
                    TEAM
                  </label>
                  <Select
                    options={teamDropdownOptions}
                    placeholder="Select Team"
                    value={record.team}
                    onChange={(e) => setRecord({ ...record, team: e })}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="title"
                  >
                    TITLE
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    placeholder="Worklist title"
                    onChange={handleTextChange}
                    value={record.title}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="title"
                  >
                    TASK
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="task"
                    aria-describedby="emailHelp"
                    placeholder="Task Name"
                    onChange={handleTextChange}
                    value={record.task}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="title"
                  >
                    START DATE
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        minDate={record.startDate}
                        // maxDate={new Date()}
                        closeOnSelect
                        value={record.startDate}
                        onChange={(e) =>
                          setRecord({
                            ...record,
                            startDate: e,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              style: FONT_STYLE,
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="title"
                  >
                    PROMISE DATE
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        minDate={record.promiseDate}
                        // maxDate={new Date()}
                        closeOnSelect
                        value={record.promiseDate}
                        onChange={(e) =>
                          setRecord({
                            ...record,
                            promiseDate: e,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="standard"
                            inputProps={{
                              ...params.inputProps,
                              style: FONT_STYLE,
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="title"
                  >
                    STATUS
                  </label>
                  <Select
                    options={statusDropdownOptions}
                    placeholder="Select Status"
                    value={record.status}
                    onChange={(e) => setRecord({ ...record, status: e })}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="title"
                  >
                    USER NAME
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="userName"
                    aria-describedby="emailHelp"
                    placeholder="User Name"
                    onChange={handleTextChange}
                    value={record.userName}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="form-group ">
                  <label
                    class="text-light-dark font-size-14 font-weight-500"
                    for="title"
                  >
                    ASSIGNED TO
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="assignedTo"
                    aria-describedby="emailHelp"
                    placeholder="Assigned to"
                    value={record.assignedTo}
                    onChange={handleTextChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row me-5" style={{ justifyContent: "right" }}>
            <button
              type="button"
              className="btn text-white bg-primary"
              onClick={handleSubmit}
            >
              {recordId ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LocalCaseWorkListAdUpdate;

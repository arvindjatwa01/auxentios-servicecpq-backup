import { Divider, Typography } from "@mui/material";
import { FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import React from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

const ClaimCreateModal = ({
  show,
  hideModal,
  recordId,
  handleSnack,
  handleShowClaimProcessModal,
}) => {
  return (
    <Modal show={show} onHide={hideModal} size="lg">
      <Modal.Body>
        <div className="card border py-3 mt-1">
          <div className="px-3">
            <h5 class="card-title mb-0">Quick Create</h5>
            <p className="mt-1">
              Description, Product experts convert the repair option to a
              standard job or template
            </p>
          </div>
          <Divider sx={{ my: 0.1 }} />
          <div className="row input-fields px-3 py-2">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Solution Id
                </label>
                <p>Auto Generated</p>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Quote Type
                </label>
                <Select
                  className="text-primary"
                  options={[]}
                  //   onChange={(e) => handleSelectChange(e, `question1`)}
                  //   value={recordObj.questions1}
                  styles={FONT_STYLE_SELECT}
                />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Description
                </label>
                <textarea
                  className="form-control border-radius-10 text-primary"
                  name="description"
                  cols="30"
                  rows="2"
                  //   value={recordObj.causes}
                  //   onChange={handleInputTextChange}
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label className="text-light-dark font-size-14 font-weight-500">
                  Reference
                </label>
                <input
                  type="text"
                  className="form-control border-radius-10 text-primary"
                  name="reference"
                  placeholder="Reference"
                  //   value={evaluatedByRecordObj.firstName}
                  //   onChange={handleEvaluatedByInputTextChange}
                />
              </div>
            </div>
          </div>
          <Divider sx={{ my: 0.1 }} />
          <div className="d-flex justify-content-end px-3 mt-2">
            <button className="btn btn-primary mx-3" onClicl={hideModal}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleShowClaimProcessModal}
            >
              Create
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ClaimCreateModal;

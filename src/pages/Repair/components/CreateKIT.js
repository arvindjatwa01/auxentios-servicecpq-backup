import { default as Select } from "react-select";
import { Modal } from "@mui/material";
import { TEMPLATE_VERSION_OPTIONS } from "../CONSTANTS";

const CreateKIT = (props) => {


  return (
    <Modal open={props.kitOpen} onClose={props.handleCloseKIT}>
      <div class="modal-dialog" role="document">
        <div class="modal-content bg-white border-none">
          <div class="modal-header border-none">
            <h5 class="modal-title" id="exampleModalLabel">
              Template Create
            </h5>
          </div>
          <p className="d-block px-3">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <hr className="my-1" />
          <div class="modal-body">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="form-group">
                  <label
                    className="text-light-dark font-size-12 font-weight-500"
                    htmlFor="exampleInputEmail1"
                  >
                    KIT Versions
                  </label>
                  <Select
                    defaultValue={props.version}
                    onChange={(e) => props.setVersion(e)}
                    options={TEMPLATE_VERSION_OPTIONS}
                    placeholder="Versions"
                  />
                </div>
              </div>
              <div className="col-md-12 col-sm-12">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Reference
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="reference"
                    value={props.reference}
                    onChange={(e) => props.setReference(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-12 col-sm-12">
                <div class="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    name="description"
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" style={{ display: "unset" }}>
            <div>
              <button class="btn  btn-primary" onClick={props.handleCreateKIT}>
                Create
              </button>
              <button
                type="button"
                class="btn pull-right border"
                data-dismiss="modal"
                onClick={props.handleCloseKIT}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateKIT;

import SearchBox from "./SearchBox";
import Select from "react-select";
const { Modal, Button } = require("react-bootstrap");

const UpdateCoverageModal = (props) => {
  return (
    <Modal
      show={props.modalOpen}
      onHide={() => props.setModalOpen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="align-items-center">
        <div>
          <Modal.Title>Edit Coverage</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="included_table">
        <div className="row input-fields">
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Make
              </label>
              <input
                type="text"
                className="form-control text-primary border-radius-10"
                name="make"
                placeholder="Auto Fill Search Model...."
                value={props.coverageRowData.make}
                defaultValue={props.coverageRowData.make}
                disabled
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Family
              </label>
              <input
                type="text"
                className="form-control text-primary border-radius-10"
                name="family"
                placeholder="Auto Fill Search Model...."
                value={props.coverageRowData.family}
                defaultValue={props.coverageRowData.family}
                disabled
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Model No
              </label>
              <SearchBox
                value={props.coverageRowData.model}
                onChange={(e) =>
                  props.handleCoverageModelSearch("model", e.target.value)
                }
                type="model"
                result={props.searchCoverageModelResults}
                onSelect={props.handleCoverageModelSelect}
                noOptions={props.noOptionsModelCoverage}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Serial No Prefix
              </label>
              <Select
                // options={categoryList}
                options={props.querySearchModelPrefixOption}
                placeholder={props.coverageRowData.prefix}
                value={props.coverageRowData.prefix}
                defaultValue={props.coverageRowData.prefix}
                className="text-primary"
                onChange={(e) =>
                  props.setCoverageRowData({
                    ...props.coverageRowData,
                    prefix: e.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Start Serial No
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={props.coverageRowData.startSerialNumber}
                defaultValue={props.coverageRowData.startSerialNumber}
                onChange={(e) =>
                  props.setCoverageRowData({
                    ...props.coverageRowData,
                    startSerialNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                End Serial No
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={props.coverageRowData.endSerialNumber}
                defaultValue={props.coverageRowData.endSerialNumber}
                onChange={(e) =>
                  props.setCoverageRowData({
                    ...props.coverageRowData,
                    endSerialNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Fleet
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={props.coverageRowData.fleet}
                defaultValue={props.coverageRowData.fleet}
                onChange={(e) =>
                  props.setCoverageRowData({
                    ...props.coverageRowData,
                    fleet: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                Fleet Size
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={props.coverageRowData.fleetSize}
                defaultValue={props.coverageRowData.fleetSize}
                onChange={(e) =>
                  props.setCoverageRowData({
                    ...props.coverageRowData,
                    fleetSize: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="btn border w-100"
          onClick={() => props.setModalOpen(false)}
        >
          Close
        </Button>
        <Button
          type="button"
          className="btn btn-primary w-100"
          onClick={props.handleUpdateCoverage}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCoverageModal;

import { Modal } from "react-bootstrap";
import { default as Select, default as SelectFilter } from "react-select";
import SearchBox from "./SearchBox";

const AddExtWorkItemModal = (props) => {
  const data = props.serviceEstimateData;
  const title =
    data.jobCode +
    "-" +
    data.jobCodeDescription +
    " | " +
    data.componentCode +
    "-" +
    data.componentCodeDescription +
    " | " +
    data.jobOperation;
  return (
    <Modal
      show={props.extWorkItemOpen}
      onHide={props.handleExtWorkItemClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-white">
        {/* <div className="ligt-greey-bg p-3">
                <div>
                  <span className="mr-3">
                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i>
                    <span className="ml-2">Edit</span>
                  </span>
                  <span className="mr-3">
                    <DeleteIcon className=" font-size-16" />
                    <span className="ml-2">Delete</span>
                  </span>
                  <span className="mr-3">
                    <MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                  <span className="mr-3">
                    <SettingsBackupRestoreIcon className=" font-size-16" />
                    <span className="ml-2">Go back to operations</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span>
                </div>
              </div> */}
        <div>
          <div className="p-3">
            <div className="row mt-4">
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    ACTIVITY ID
                  </label>
                  <Select
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        activityId: e,
                        activityName: e.label,
                      })
                    }
                    getOptionLabel={(option) => `${option.value}`}
                    value={props.extWorkItemData.activityId}
                    options={props.activityIdList}
                    placeholder="Required"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    ACTIVITY NAME
                  </label>
                  <input
                    type="text"
                    disabled
                    value={props.extWorkItemData.activityName}
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    SHORT DESCRIPTION
                  </label>
                  <input
                    type="text"
                    value={props.extWorkItemData.description}
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        description: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-600">
                    SUPPLYING VENDOR
                  </label>
                  <SearchBox
                    value={props.extWorkItemData.supplyingVendorName}
                    onChange={(e) =>
                      props.handleVendorSearch("vendor", e.target.value)
                    }
                    type="fullName"
                    result={props.searchVenodrResults}
                    onSelect={props.handleVendorSelect}
                    noOptions={props.noOptionsVendor}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    RATE (UNIT PRICE)
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        unitPrice: e.target.value,
                      })
                    }
                    value={props.extWorkItemData.unitPrice}
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    ESTIMATED HOURS / DAYS
                  </label>
                  <input
                    type="text"
                    value={props.extWorkItemData.estimatedHours}
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        estimatedHours: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    EXTENDED PRICE
                  </label>
                  <input
                    type="text"
                    value={props.extWorkItemData.extendedPrice}
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        extendedPrice: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    TOTAL PRICE
                  </label>
                  <input
                    type="text"
                    value={props.extWorkItemData.totalPrice}
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        totalPrice: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    ADJUSTED PRICE
                  </label>
                  <input
                    type="text"
                    value={props.extWorkItemData.adjustedPrice}
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        adjustedPrice: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    DIMENSIONS
                  </label>
                  <Select
                    onChange={(e) =>
                      props.setExtWorkItemData({
                        ...props.extWorkItemData,
                        dimensions: e,
                      })
                    }
                    options={props.dimensionList}
                    value={props.extWorkItemData.dimensions}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="m-3 text-right">
            <button
              type="button"
              onClick={props.handleExtWorkItemClose}
              className="btn border mr-3 "
            >
              {" "}
              Cancel
            </button>
            <button
              type="button"
              className="btn text-white bg-primary"
              onClick={props.addExtWorkItem}
            >
              Save
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddExtWorkItemModal;

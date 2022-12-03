import { Modal } from "react-bootstrap";
import { default as Select } from "react-select";
import SearchBox from "./SearchBox";

const AddConsumableItemModal = (props) => {
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
      show={props.consumableItemOpen}
      onHide={props.handleConsumableItemClose}
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
                    CONSUMABLE TYPE
                  </label>
                  <Select
                    onChange={(e) =>
                      props.setConsumableItemData({
                        ...props.consumableItemData,
                        consumableType: e,
                      })
                    }
                    isDisabled={true}
                    value={props.consumableItemData.consumableType}
                    options={props.consumableTypeList}
                    placeholder="Required"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CONSUMABLE ID
                  </label>
                  <SearchBox
                    disabled={true}
                    value={props.consumableItemData.consumableCode}
                    onChange={(e) =>
                      props.handleConsumableSearch("consumable", e.target.value)
                    }
                    type="consumableId"
                    result={props.searchConsumableResult}
                    onSelect={props.handleConsumableSelect}
                    noOptions={props.noOptionsConsumable}
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CONSUMABLE DESCRIPTION
                  </label>
                  <input
                    type="text"
                    disabled
                    value={props.consumableItemData.description}
                    class="form-control border-radius-10"
                    placeholder="Required"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    QUANTITY
                  </label>
                  <input
                    type="text"
                    value={props.consumableItemData.quantity}
                    onChange={(e) =>
                      props.setConsumableItemData({
                        ...props.consumableItemData,
                        quantity: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Required"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    UNIT OF MEASURES
                  </label>
                  <input
                    type="text"
                    disabled
                    value={props.consumableItemData.unitOfMeasure}
                    onChange={(e) =>
                      props.setConsumableItemData({
                        ...props.consumableItemData,
                        unitOfMeasure: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Required"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    VENDOR
                  </label>
                  <SearchBox
                    value={props.consumableItemData.supplyingVendorName}
                    onChange={(e) =>
                      props.handleVendorSearch("consVendor", e.target.value)
                    }
                    type="fullName"
                    result={props.searchVenodrResults}
                    onSelect={props.handleVendorSelect}
                    noOptions={props.noOptionsVendor}
                  />
                  {/* <input
                    type="text"
                    value={props.consumableItemData.vendor}
                    onChange={(e) =>
                      props.setConsumableItemData({
                        ...props.consumableItemData,
                        vendor: e.target.value,
                      })
                    }
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  /> */}
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    UNIT PRICE
                  </label>
                  <input
                    type="text"
                    disabled
                    value={props.consumableItemData.unitPrice}
                    // onChange={e => props.setConsumableItemData({...props.consumableItemData, unitPrice: e.target.value})}
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
                    disabled
                    value={props.consumableItemData.extendedPrice}
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CURRENCY
                  </label>
                  <input
                    type="text"
                    disabled
                    value={props.consumableItemData.currency}
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
                    disabled
                    value={props.consumableItemData.totalPrice}
                    class="form-control border-radius-10"
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="m-3 text-right">
            <button
              type="button"
              className="btn border mr-3"
              onClick={props.handleConsumableItemClose}
            >
              {" "}
              Cancel
            </button>
            <button
              type="button"
              className="btn text-white bg-primary"
              onClick={props.addConsumableItem}
              disabled={
                !(
                  props.consumableItemData.consumableCode &&
                  props.consumableItemData.consumableType &&
                  props.consumableItemData.description &&
                  props.consumableItemData.quantity
                )
              }
            >
              Save
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddConsumableItemModal;
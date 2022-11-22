import { Modal } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { default as Select, default as SelectFilter } from "react-select";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const AddLaborItemModal = (props) => {
    return (
        <Modal
        show={props.laborItemOpen}
        onHide={props.handleLaborItemClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            1000-Engine|23-Replace Engine|Replace Engine
          </Modal.Title>
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
                      CHARGE CODE
                    </label>
                    <Select
                      onChange={(e) =>
                        props.setLabourItemData({
                          ...props.labourItemData,
                          chargeCode: e,
                        })
                      }
                      options={props.chargeCodeList}
                      placeholder="Required"
                      value={props.labourItemData.chargeCode}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      LABOR TYPE
                    </label>
                    <Select
                      onChange={(e) =>
                        props.setLabourItemData({
                          ...props.labourItemData,
                          laborType: e,
                        })
                      }
                      options={props.laborTypeList}
                      value={props.labourItemData.laborType}
                      placeholder="Required"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      SERVICE TYPE
                    </label>
                    <Select
                      onChange={(e) =>
                        props.setLabourItemData({
                          ...props.labourItemData,
                          serviceType: e,
                        })
                      }
                      options={props.serviceTypeList}
                      value={props.labourItemData.serviceType}
                      placeholder="Required"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      UNIT OF MEASURES
                    </label>
                    <Select
                      onChange={(e) =>
                        props.setLabourItemData({
                          ...props.labourItemData,
                          unitOfMeasure: e,
                        })
                      }
                      options={props.unitOfMeasureOptions}
                      placeholder="Required"
                      value={props.labourItemData.unitOfMeasure}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      ESTIMATED HOURS
                    </label>
                    <input
                      type="text"
                      class="form-control border-radius-10"
                      placeholder="Required"
                      onChange={(e) =>
                        props.setLabourItemData({
                          ...props.labourItemData,
                          estimatedHours: e.target.value,
                        })
                      }
                      value={props.labourItemData.estimatedHours}
                    />
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
                      class="form-control border-radius-10"
                      placeholder="Required"
                      value={props.labourItemData.unitPrice}
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
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      placeholder="Required"
                      value={props.labourItemData.extendedPrice}
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
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      placeholder="Required"
                      value={props.labourItemData.totalPrice}
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
                      class="form-control border-radius-10"
                      id="exampleInputEmail1"
                      placeholder="REQUIRED"
                      value={props.serviceEstimateData.currency}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      COMMENTS (More Action)
                    </label>
                    <input
                      type="text"
                      class="form-control border-radius-10"
                      placeholder="Optional"
                      value={props.labourItemData.comment}
                      onChange={(e) =>
                        props.setLabourItemData({
                          ...props.labourItemData,
                          comment: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className=" d-flex justify-content-between align-items-center">
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={props.labourItemData.travelIncluded}
                              onChange={(e) =>
                                props.setLabourItemData({
                                  ...props.labourItemData,
                                  travelIncluded: e.target.checked,
                                })
                              }
                            />
                          }
                          label="TRAVEL INCLUDED"
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className=" d-flex justify-content-between align-items-center">
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={props.labourItemData.inspectionIncluded}
                              onChange={(e) =>
                                props.setLabourItemData({
                                  ...props.labourItemData,
                                  inspectionIncluded: e.target.checked,
                                })
                              }
                            />
                          }
                          label="INSPECTION INCLUDED"
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  {!props.labourItemData.travelIncluded && (
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        TRAVEL CHARGE
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10"
                        id="exampleInputEmail1"
                        value={props.labourItemData.travelCharge}
                        onChange={(e) =>
                          props.setLabourItemData({
                            ...props.labourItemData,
                            travelCharge: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-sm-6">
                  {!props.labourItemData.inspectionIncluded && (
                    <div class="form-group w-100">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        INSPECTION
                      </label>
                      <input
                        type="text"
                        class="form-control border-radius-10"
                        id="exampleInputEmail1"
                        value={props.labourItemData.inspectionCharge}
                        onChange={(e) =>
                          props.setLabourItemData({
                            ...props.labourItemData,
                            inspectionCharge: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="m-3 text-right">
              <button
                type="button"
                className="btn btn-light bg-primary text-white"
                onClick={props.handleLaborItemClose}
              >
                {" "}
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-light bg-primary text-white"
                onClick={props.addLaborItem}
              >
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
}

export default AddLaborItemModal;
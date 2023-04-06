import { Modal } from "react-bootstrap";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { ReadOnlyField } from "./ReadOnlyField";
import { default as Select } from "react-select";

const RepairQuoteItemModal = (props) => {
  const customStyle = {
    control: (styles, { isDisabled }) => {
      return {
        ...styles,
        background: isDisabled ? "#e9ecef" : "white",
        borderRadius: 10,
        fontSize: 12,
      };
    },
    singleValue: (styles, { isDisabled }) => {
      return {
        ...styles,
        color: "#616161",
        borderRadius: 10,
        fontSize: 12,
        fontWeight: 500,
      };
    },
  };

  const closeModal = () => {
    props.handleQuoteItemClose();
  };

  return (
    <Modal
      show={props.quoteItemOpen}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-white">
        <div className="ligt-greey-bg p-3">
          <div>
            {props.partFieldViewonly ? (
              <div>
                <a
                  className="mr-3"
                  onClick={() => props.setPartFieldViewonly(false)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa fa-pencil font-size-12"
                    aria-hidden="true"
                  ></i>
                  <span className="ml-2">Edit</span>
                </a>
              </div>
            ) : (
              <div>
                <span className="mr-3">
                  <FormatListBulletedOutlinedIcon className=" font-size-16" />
                  <span
                    className="ml-2 cursor"
                    data-toggle="modal"
                    data-target="#Recommended"
                  >
                    Substitute parts
                  </span>
                </span>
                <span className="mr-3">
                  <FormatListBulletedOutlinedIcon className=" font-size-16" />
                  <span
                    className="ml-2 cursor"
                    data-toggle="modal"
                    data-target="#Substitute"
                  >
                    Recommended price
                  </span>
                </span>
                <span className="mr-3">
                  <MonetizationOnOutlinedIcon className=" font-size-16" />
                  <span className="ml-2"> Adjust price</span>
                </span>
              </div>
            )}
          </div>
        </div>
        {!props.partFieldViewonly ? (
          <div>
            <div className="p-3">
              <div className="row mt-4">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      COMPONENT
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem.componentCode}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          componentCode: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      JOB DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem.operation}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          operation: e.target.value,
                        })
                      }
                      disabled
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem.description}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          description: e.target.value,
                        })
                      }
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      PART LIST ID
                    </label>
                    <input
                      type="text"
                      disabled
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem.partlistId}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      TOTAL PARTS
                    </label>
                    <input
                      type="text"
                      disabled
                      className="form-control border-radius-10 text-primary"
                      value={
                        props.quoteItem.partsPrice
                          ? parseFloat(props.quoteItem.partsPrice).toFixed(2)
                          : 0.0
                      }
                    />

                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      TOTAL LABOR
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      value={
                        props.quoteItem.labourPrice
                          ? parseFloat(props.quoteItem.labourPrice).toFixed(2)
                          : 0.0
                      }
                      disabled
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      TOTAL MISC
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      value={
                        props.quoteItem.miscPrice
                          ? parseFloat(props.quoteItem.miscPrice).toFixed(2)
                          : 0.0
                      }
                      disabled
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      NET PRICE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={
                        props.quoteItem.totalPrice
                          ? parseFloat(props.quoteItem.totalPrice).toFixed(2)
                          : 0.0
                      }
                      disabled
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>

                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      NET ADJUSTED PRICE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          netAdjustedPrice: e.target.value,
                        })
                      }
                      value={
                        props.quoteItem.totalPrice
                          ? parseFloat(
                              props.quoteItem.netAdjustedPrice
                            ).toFixed(2)
                          : 0.0
                      }
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DISCOUNT
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      value={
                        props.quoteItem.discount
                          ? parseFloat(props.quoteItem.discount).toFixed(2)
                          : 0.0
                      }
                      disabled
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      MARGIN
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem.margin}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          margin: e.target.value,
                        })
                      }
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      PAYER TYPE
                    </label>
                    <Select
                      isDisabled={props.quoteItem.payerType}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          payerType: e,
                        })
                      }
                      styles={customStyle}
                      options={[
                        { label: "Customer", value: "CUSTOMER" },
                        { label: "Goodwill", value: "GOODWILL" },
                        { label: "Insurer", value: "INSURER" },
                      ]}
                      value={props.quoteItem.payerType}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-3 text-right">
              <button
                onClick={props.handleQuoteItemClose}
                className="btn border mr-3 "
              >
                {" "}
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-light bg-primary text-white"
                onClick={props.handleQuoteItemUpdate}
                // disabled={
                //   !props.quoteItem.partType ||
                //   !props.quoteItem.partNumber ||
                //   !props.quoteItem.quantity ||
                //   // !props.quoteItem.unitPrice ||
                //   // !props.quoteItem.extendedPrice ||
                //   !props.quoteItem.currency
                //   // !props.quoteItem.totalPrice
                // }
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3">
            <div className="row mt-4">
              <ReadOnlyField
                label="GROUP NUMBER"
                value={props.quoteItem.groupNumber}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="TYPE"
                value={props.quoteItem.partType}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="PART NUMBER"
                value={props.quoteItem.partNumber}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="QTY"
                value={props.quoteItem.quantity}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="UNIT OF MESASURES"
                value={props.quoteItem.unitOfMeasure}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="UNIT PRICE"
                value={
                  props.quoteItem.unitPrice
                    ? parseFloat(props.quoteItem.unitPrice).toFixed(2)
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="EXTENDED PRICE"
                value={
                  props.quoteItem.extendedPrice
                    ? parseFloat(props.quoteItem.extendedPrice).toFixed(2)
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="CURRENCY"
                value={props.quoteItem.currency}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="% USAGE"
                value={props.quoteItem.usagePercentage}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="TOTAL PRICE"
                value={
                  props.quoteItem.totalPrice ? props.quoteItem.totalPrice : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="COMMENT"
                value={props.quoteItem.comment}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="DESCRIPTION"
                value={props.quoteItem.description}
                className="col-md-6 col-sm-6"
              />
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RepairQuoteItemModal;

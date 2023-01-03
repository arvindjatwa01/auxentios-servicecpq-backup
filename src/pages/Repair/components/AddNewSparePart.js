import { Modal } from "react-bootstrap";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { ReadOnlyField } from "./ReadOnlyField";

const AddNewSparepartModal = (props) => {
  const [searchGroupNoResults, setSearchGroupNoResults] = useState([]);
  const [searchPartNoResults, setSearchPartNoResults] = useState([]);

  // Search Spare part with group number and part number
  const handleSparePartSearch = async (searchSparePartField, searchText) => {
    // console.log("cleared the result", searchText);
    let searchQuerySparePart = "";
    setSearchGroupNoResults([]);
    setSearchPartNoResults([]);
    if (searchSparePartField === "groupNumber") {
      props.setSparePart({ ...props.sparePart, groupNumber: searchText });
      searchQuerySparePart = searchText
        ? searchSparePartField + "~" + searchText
        : "";
    } else if (searchSparePartField === "partNumber") {
      props.setSparePart({ ...props.sparePart, partNumber: searchText });
      searchQuerySparePart = searchText
        ? props.sparePart.groupNumber
          ? `groupNumber:${props.sparePart.groupNumber} AND partNumber~` +
            searchText
          : "partNumber~" + searchText
        : "";
    }
    // console.log("search query", searchQuerySparePart);
    if (searchQuerySparePart && searchText.length > 2) {
      await props
        .searchAPI(searchQuerySparePart)
        .then((result) => {
          if (result) {
            if (searchSparePartField === "groupNumber") {
              setSearchGroupNoResults(result);
            } else if (searchSparePartField === "partNumber") {
              setSearchPartNoResults(result);
            }
          }
        })
        .catch((e) => {
          props.handleSnack(
            "error",
            true,
            "Error occurred while searching the sparepart!"
          );
        });
    } else {
      searchSparePartField === "groupNumber"
        ? setSearchGroupNoResults([])
        : setSearchPartNoResults([]);
    }
  };

  // Select spare part from the search results
  const handleSparePartSelect = (type, currentItem) => {
    if (type === "groupNumber") {
      props.setSparePart({
        ...props.sparePart,
        groupNumber: currentItem.groupNumber,
      });
      setSearchGroupNoResults([]);
    } else if (type === "partNumber") {
      let quantity = props.sparePart.quantity;
      let extendedPrice = currentItem.listPrice * quantity;
      let totalPrice = calculateTotalPrice(
        extendedPrice,
        props.sparePart.usagePercentage
      );
      props.setSparePart({
        ...props.sparePart,
        groupNumber: currentItem.groupNumber,
        unitPrice: currentItem.listPrice,
        partNumber: currentItem.partNumber,
        partType: currentItem.partType,
        description: currentItem.partDescription,
        extendedPrice,
        totalPrice,
        unitOfMeasure: currentItem.salesUnit,
      });
      setSearchPartNoResults([]);
    }
  };
  const calculateTotalPrice = (extendedPrice, usage) => {
    return usage > 0 ? (usage / 100) * extendedPrice : extendedPrice;
  };

  const closeModal = () => {
    setSearchGroupNoResults([]);
    setSearchPartNoResults([]);
    props.handleAddPartClose();
  };

  return (
    <Modal
      show={props.addPartOpen}
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
                      GROUP NUMBER
                    </label>
                    <SearchBox
                      value={props.sparePart.groupNumber}
                      onChange={(e) =>
                        handleSparePartSearch("groupNumber", e.target.value)
                      }
                      type="groupNumber"
                      result={searchGroupNoResults}
                      onSelect={handleSparePartSelect}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      TYPE
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={props.sparePart.partType}
                      onChange={(e) =>
                        props.setSparePart({
                          ...props.sparePart,
                          partType: e.target.value,
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
                      PART NUMBER
                    </label>
                    <SearchBox
                      value={props.sparePart.partNumber}
                      onChange={(e) =>
                        handleSparePartSearch("partNumber", e.target.value)
                      }
                      type="partNumber"
                      result={searchPartNoResults}
                      onSelect={handleSparePartSelect}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      QTY
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      onChange={(e) =>
                        props.setSparePart({
                          ...props.sparePart,
                          quantity: e.target.value,
                          extendedPrice: parseFloat(
                            props.sparePart.unitPrice * e.target.value
                          ).toFixed(2),
                          totalPrice:
                            props.sparePart.usagePercentage > 0
                              ? parseFloat(
                                  (props.sparePart.usagePercentage / 100) *
                                    props.sparePart.unitPrice *
                                    e.target.value
                                ).toFixed(2)
                              : parseFloat(
                                  props.sparePart.unitPrice * e.target.value
                                ).toFixed(2),
                        })
                      }
                      value={props.sparePart.quantity}
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      UNIT OF MEASURES
                    </label>
                    <input
                      type="text"
                      disabled
                      className="form-control border-radius-10 text-primary"
                      value={props.sparePart.unitOfMeasure}
                      onChange={(e) =>
                        props.setSparePart({
                          ...props.sparePart,
                          unitOfMeasure: e.target.value,
                        })
                      }
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      UNIT PRICE
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      value={
                        props.sparePart.unitPrice
                          ? parseFloat(props.sparePart.unitPrice).toFixed(2)
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
                      EXTENDED PRICE
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      disabled
                      // onChange={(e) => props.setSparePart({...props.sparePart, extendedPrice: e.target.value})}
                      value={
                        props.sparePart.extendedPrice
                          ? parseFloat(props.sparePart.extendedPrice).toFixed(2)
                          : 0.0
                      }
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      CURRENCY
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      onChange={(e) =>
                        props.setSparePart({
                          ...props.sparePart,
                          currency: e.target.value,
                        })
                      }
                      value={props.sparePart.currency}
                      disabled
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      % USAGE
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      onChange={(e) =>
                        props.setSparePart({
                          ...props.sparePart,
                          usagePercentage: e.target.value,
                          totalPrice: props.sparePart.extendedPrice
                            ? parseFloat(
                                calculateTotalPrice(
                                  props.sparePart.extendedPrice,
                                  e.target.value
                                )
                              ).toFixed(2)
                            : 0.0,
                        })
                      }
                      value={props.sparePart.usagePercentage}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      TOTAL PRICE
                    </label>
                    <input
                      type="Number"
                      className="form-control border-radius-10 text-primary"
                      value={
                        props.sparePart.totalPrice
                          ? parseFloat(props.sparePart.totalPrice).toFixed(2)
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
                      COMMENT
                    </label>
                    <TextareaAutosize
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={props.sparePart.comment}
                      onChange={(e) =>
                        props.setSparePart({
                          ...props.sparePart,
                          comment: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      disabled
                      className="form-control border-radius-10 text-primary"
                      value={props.sparePart.description}
                      onChange={(e) =>
                        props.setSparePart({
                          ...props.sparePart,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-3 text-right">
              <button
                onClick={props.handleAddPartClose}
                className="btn border mr-3 "
              >
                {" "}
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-light bg-primary text-white"
                onClick={props.handleIndPartAdd}
                disabled={
                  !props.sparePart.partType ||
                  !props.sparePart.partNumber ||
                  !props.sparePart.quantity ||
                  // !props.sparePart.unitPrice ||
                  // !props.sparePart.extendedPrice ||
                  !props.sparePart.currency
                  // !props.sparePart.totalPrice
                }
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
                value={props.sparePart.groupNumber}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="TYPE"
                value={props.sparePart.partType}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="PART NUMBER"
                value={props.sparePart.partNumber}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="QTY"
                value={props.sparePart.quantity}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="UNIT OF MESASURES"
                value={props.sparePart.unitOfMeasure}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="UNIT PRICE"
                value={
                  props.sparePart.unitPrice
                    ? parseFloat(props.sparePart.unitPrice).toFixed(2)
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="EXTENDED PRICE"
                value={
                  props.sparePart.extendedPrice
                    ? parseFloat(props.sparePart.extendedPrice).toFixed(2)
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="CURRENCY"
                value={props.sparePart.currency}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="% USAGE"
                value={props.sparePart.usagePercentage}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="TOTAL PRICE"
                value={
                  props.sparePart.totalPrice ? props.sparePart.totalPrice : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="COMMENT"
                value={props.sparePart.comment}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="DESCRIPTION"
                value={props.sparePart.description}
                className="col-md-6 col-sm-6"
              />
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddNewSparepartModal;

import { Modal } from "react-bootstrap";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { ReadOnlyField } from "./ReadOnlyField";
import { default as Select } from "react-select";

const SparepartQuoteItemModal = (props) => {
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
  const [searchGroupNoResults, setSearchGroupNoResults] = useState([]);
  const [searchPartNoResults, setSearchPartNoResults] = useState([]);

  // Search Spare part with group number and part number
  const handleSparePartSearch = async (searchSparePartField, searchText) => {
    // console.log("cleared the result", searchText);
    let searchQuerySparePart = "";
    setSearchGroupNoResults([]);
    setSearchPartNoResults([]);
    if (searchSparePartField === "groupNumber") {
      props.setQuoteItem({ ...props.quoteItem, groupNumber: searchText });
      searchQuerySparePart = searchText
        ? searchSparePartField + "~" + searchText
        : "";
    } else if (searchSparePartField === "partNumber") {
      props.setQuoteItem({ ...props.quoteItem, partNumber: searchText });
      searchQuerySparePart = searchText
        ? props.quoteItem?.groupNumber
          ? `groupNumber:${props.quoteItem?.groupNumber} AND partNumber~` +
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
      props.setQuoteItem({
        ...props.quoteItem,
        groupNumber: currentItem.groupNumber,
      });
      setSearchGroupNoResults([]);
    } else if (type === "partNumber") {
      let quantity = props.quoteItem?.quantity;
      let extendedPrice = currentItem.listPrice
        ? currentItem.listPrice * quantity
        : 0;
      let totalPrice = extendedPrice;
      props.setQuoteItem({
        ...props.quoteItem,
        groupNumber: currentItem.groupNumber,
        listPrice: currentItem.listPrice,
        partNumber: currentItem.partNumber,
        partType: currentItem.partType,
        partDescription: currentItem.partDescription,
        extendedPrice,
        totalPrice,
        salesUnit: currentItem.salesUnit,
      });
      setSearchPartNoResults([]);
    }
  };

  const closeModal = () => {
    setSearchGroupNoResults([]);
    setSearchPartNoResults([]);
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
      <Modal.Header className="modal-header-border">
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-white">
        <div className="ligt-greey-bg p-3">
          <div>
            {props.quoteItemViewOnly ? (
              <div>
                <a
                  className="mr-3"
                  onClick={() => props.setQuoteItemViewOnly(false)}
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="fa fa-pencil font-size-12"
                    aria-hidden="true"
                  ></i>
                  <span className="ml-2">Edit Details</span>
                </a>
              </div>
            ) : (
              <div>
                {/* <span className="mr-3">
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
                </span> */}
              </div>
            )}
          </div>
        </div>
        {!props.quoteItemViewOnly ? (
          <div>
            <div className="p-3">
            <div className="row mt-4 input-fields">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      GROUP NUMBER
                    </label>
                    <SearchBox
                      value={props.quoteItem?.groupNumber}
                      onChange={(e) =>
                        handleSparePartSearch("groupNumber", e.target.value)
                      }
                      type="groupNumber"
                      result={searchGroupNoResults}
                      onSelect={handleSparePartSelect}
                      // disabled={true}
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
                      value={props.quoteItem?.partType}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          partType: e.target.value,
                        })
                      }
                      // disabled
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
                      value={props.quoteItem?.partNumber}
                      onChange={(e) =>
                        handleSparePartSearch("partNumber", e.target.value)
                      }
                      type="partNumber"
                      result={searchPartNoResults}
                      onSelect={handleSparePartSelect}
                      // disabled={true}
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
                        props.setQuoteItem({
                          ...props.quoteItem,
                          quantity: e.target.value,
                          extendedPrice: parseFloat(
                            props.quoteItem?.listPrice * e.target.value
                          ).toFixed(2),
                          totalPrice: parseFloat(
                            props.quoteItem?.listPrice * e.target.value
                          ).toFixed(2),
                        })
                      }
                      value={props.quoteItem?.quantity}
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
                      // disabled
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem?.salesUnit}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          salesUnit: e.target.value,
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
                      value={props.quoteItem?.listPrice}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          listPrice: e.target.value,
                          extendedPrice: parseFloat(
                            props.quoteItem?.listPrice * e.target.value
                          ).toFixed(2),
                          totalPrice: parseFloat(
                            props.quoteItem?.listPrice * e.target.value
                          ).toFixed(2),
                        })
                      }
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
                      // onChange={(e) => props.setQuoteItem({...props.quoteItem, extendedPrice: e.target.value})}
                      value={
                        props.quoteItem?.extendedPrice
                          ? parseFloat(props.quoteItem?.extendedPrice).toFixed(
                              2
                            )
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
                        props.setQuoteItem({
                          ...props.quoteItem,
                          currency: e.target.value,
                        })
                      }
                      value={
                        props.quoteItem?.currency
                          ? props.quoteItem.currency
                          : "USD"
                      }
                      disabled
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
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
                        props.quoteItem?.totalPrice
                          ? parseFloat(props.quoteItem?.totalPrice).toFixed(2)
                          : 0.0
                      }
                      disabled
                    />
                    {/* <div className="css-w8dmq8">*Mandatory</div> */}
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      NET ADJUSTED PRICE
                    </label>
                    <input
                      type="number"
                      className="form-control border-radius-10 text-primary"
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          netAdjustedPrice: e.target.value,
                        })
                      }
                      value={props.quoteItem.netAdjustedPrice}
                    />
                    {/* <div className="css-w8dmq8">*Mandatory</div> */}
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      DISCOUNT
                    </label>
                    <TextareaAutosize
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem?.discount}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          discount: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      MARGIN
                    </label>
                    <TextareaAutosize
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={props.quoteItem?.margin}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          margin: e.target.value,
                        })
                      }
                    />
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
                      value={props.quoteItem?.comment}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
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
                      value={props.quoteItem?.partDescription}
                      onChange={(e) =>
                        props.setQuoteItem({
                          ...props.quoteItem,
                          partDescription: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group w-100">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      PAYER TYPE
                    </label>
                    <Select
                      // isDisabled={props.quoteItem.payerType}
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
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-light bg-primary text-white"
                onClick={props.handleQuoteItemUpdate}
                // disabled={
                //   !props.quoteItem?.partType ||
                //   !props.quoteItem?.partNumber ||
                //   !props.quoteItem?.quantity ||
                //   // !props.quoteItem?.listPrice ||
                //   // !props.quoteItem?.extendedPrice ||
                //   !props.quoteItem?.currency
                //   // !props.quoteItem?.totalPrice
                // }
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-radius-10 py-2 px-3 m-2">
            <div className="row mt-4">
              <ReadOnlyField
                label="GROUP NUMBER"
                value={props.quoteItem?.groupNumber}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="TYPE"
                value={props.quoteItem?.partType}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="PART NUMBER"
                value={props.quoteItem?.partNumber}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="QTY"
                value={props.quoteItem?.quantity}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="UNIT OF MESASURES"
                value={props.quoteItem?.salesUnit}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="UNIT PRICE"
                value={
                  props.quoteItem?.listPrice
                    ? parseFloat(props.quoteItem?.listPrice).toFixed(2)
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="EXTENDED PRICE"
                value={
                  props.quoteItem?.extendedPrice
                    ? parseFloat(props.quoteItem?.extendedPrice).toFixed(2)
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="CURRENCY"
                value={props.quoteItem?.currency}
                className="col-md-6 col-sm-6"
              />
              
              <ReadOnlyField
                label="TOTAL PRICE"
                value={
                  props.quoteItem?.totalPrice
                    ? props.quoteItem?.totalPrice
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="NET ADJUSTED PRICE"
                value={
                  props.quoteItem?.adjustedPrice
                    ? props.quoteItem?.adjustedPrice
                    : 0.0
                }
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="DISCOUNT"
                value={props.quoteItem?.discount}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="MARGIN"
                value={props.quoteItem?.margin}
                className="col-md-6 col-sm-6"
              />              
              <ReadOnlyField
                label="Delivery Date"
                value={props.quoteItem?.deliveryDate}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="COMMENT"
                value={props.quoteItem?.comment}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="DESCRIPTION"
                value={props.quoteItem?.partDescription}
                className="col-md-6 col-sm-6"
              />
              <ReadOnlyField
                label="PAYER TYPE"
                value={props.quoteItem?.payerType?.label}
                className="col-md-6 col-sm-6"
              />
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SparepartQuoteItemModal;

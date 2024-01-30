import React, { useState } from "react";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { Modal } from "react-bootstrap";
import penIcon from "../../../assets/images/pen.png";

const itemDetailsObj = {
  componentId: "123",
  description: "abcd",
  type: "",
  availableDate: new Date(),
  status: "",
  salePrice: "",
  location: "",
  manufacturer: "",
  modelNumber: "",
  serialNumber: "",
  coreId: "",
  returnable: false,
  valuation: "",
};

const erpDetailsObj = {
  materialCode: "",
  materialDescription: "",
  materialGroup: "",
  averageCost: "",
  salePrice: "",
  availablityStatus: "",
  stockQuantity: "",
  status: "",
  warehouse: "",
};
const ItemDetailsModal = ({ show, hideModal }) => {
  const [itemDetails, setItemDetails] = useState({ ...itemDetailsObj });
  const [erpDetails, setErpDetails] = useState({ ...erpDetailsObj });
  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="font-weight-bold fw-bold mb-0">Item Details</h5>
          <div>
            <button
              className="border-primary text-primary rounded-pill cursor px-3 py-1"
              //   onClick={handleEdit}
            >
              <img className="m-1" src={penIcon} alt="Edit" /> Edit
            </button>
          </div>
        </div>
        <div className="card border px-2 py-3 mt-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Component Id
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.componentId)
                    ? "NA"
                    : itemDetails.componentId}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Description
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.description)
                    ? "NA"
                    : itemDetails.description}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Type
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.type) ? "NA" : itemDetails.type}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Available Date
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.availableDate)
                    ? "NA"
                    : getFormatDateTime(itemDetails.availableDate, false)}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Status
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.status?.label)
                    ? "NA"
                    : itemDetails.status?.label}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Sale Price
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.salePrice)
                    ? "NA"
                    : itemDetails.salePrice}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Location
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.location) ? "NA" : itemDetails.location}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Manufacturer
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.manufacturer)
                    ? "NA"
                    : itemDetails.manufacturer}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Model Number
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.modelNumber)
                    ? "NA"
                    : itemDetails.modelNumber}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Serial Number
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.serialNumber)
                    ? "NA"
                    : itemDetails.serialNumber}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Comp ID (Core)
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.coreId) ? "NA" : itemDetails.coreId}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Returnable
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {itemDetails.returnable ? "Yes" : "No"}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Valuation
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(itemDetails.valuation)
                    ? "NA"
                    : `${itemDetails.valuation} $`}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-weight-bold fw-bold mb-0">ERP Details</h5>
        <div className="card border px-2 py-3 mt-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Material Code
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.materialCode)
                    ? "NA"
                    : erpDetails.materialCode}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Material Description
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.materialDescription)
                    ? "NA"
                    : erpDetails.materialDescription}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Material Group
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.materialGroup)
                    ? "NA"
                    : erpDetails.materialGroup}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Average Cost
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.averageCost)
                    ? "NA"
                    : erpDetails.averageCost}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Sale Price
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.salePrice) ? "NA" : erpDetails.salePrice}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Availability Status
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.availablityStatus)
                    ? "NA"
                    : erpDetails.availablityStatus}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Stock Quantity
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.stockQuantity)
                    ? "NA"
                    : erpDetails.stockQuantity}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Status
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.status) ? "NA" : erpDetails.status}
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 col-12">
              <div className="form-group">
                <p className="text-light-dark font-size-12 font-weight-500 mb-1">
                  Plant / Warehouse
                </p>
                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                  {isEmpty(erpDetails.warehouse) ? "NA" : erpDetails.warehouse}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ItemDetailsModal;

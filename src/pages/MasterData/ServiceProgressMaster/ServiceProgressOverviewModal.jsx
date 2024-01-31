import React, { useState } from "react";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Modal } from "react-bootstrap";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { getFormatDateTime } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/dateUtilities";
import penIcon from "../../../assets/images/pen.png";
import ServiceProgressIssueComponent from "./ServiceProgressIssueComponent";

import DeleteIcon from "@mui/icons-material/Delete";
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

const returnDetailsObj = {
  customerId: "",
  customerName: "",
  description: "",
  programName: "",
  comment: "",
  employeName: "",
};

const returnCoreParts = [
  {
    itemCode: "2471437",
    itemDescription: "VALVE GP-CON",
    serialNumber: "ZMX00507",
    salesUnit: "PC",
    quantity: "1",
    category: "Base",
    netValue: "$ 64789.45",
    itemStatus: "NEW",
    cerficate: "STD-12",
  },
];

const tableTwoData = [
  {
    itemNumber: "10R4469",
    itemDescription: "Full Core Deposit - Engine Stage III A",
    category: "Core",
    dateOfIssue: "10/02/2017",
    status: "Returned",
  },
  {
    itemNumber: "2102582",
    itemDescription: "CORE AS-AFTC",
    category: "Core",
    dateOfIssue: "21/11/2019",
    status: "Pending",
  },
];

const ServiceProgressOverviewModal = ({
  show,
  hideModal,
  handleRetrunProcessModal,
}) => {
  const [activeTab, setActiveTab] = useState("itemDetails");
  const [itemDetails, setItemDetails] = useState({ ...itemDetailsObj });
  const [erpDetails, setErpDetails] = useState({ ...erpDetailsObj });

  const [returnTabDetails, setReturnTabDetails] = useState({
    ...returnDetailsObj,
  });

  // view item details tab view
  const viewItemDetails = () => {
    return (
      <>
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
      </>
    );
  };

  const handleReturnInputChange = (e) => {
    const { name, value } = e.target;
    setReturnTabDetails({ ...returnTabDetails, [name]: value });
  };

  // view return tab view
  const viewReturnTabView = () => {
    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="font-weight-bold fw-bold mb-0">
            Rent a New Equipment
          </h5>
        </div>
        <div className="card border px-2 py-3 mt-2">
          <div className="row align-items-end px-2 py-2">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="row input-fields">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Customer Id
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.customerId}
                      name="customerId"
                      placeholder="Customer Id"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.customerName}
                      name="customerName"
                      placeholder="Customer Name"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Program Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.programName}
                      name="programName"
                      placeholder="Program Name"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Employee Name
                    </label>
                    <input
                      type="text"
                      className="form-control border-radius-10 text-primary"
                      value={returnTabDetails.employeName}
                      name="employeName"
                      placeholder="Employee Name"
                      onChange={handleReturnInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="row input-fields">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Description
                    </label>
                    <textarea
                      name="description"
                      cols="30"
                      rows="4"
                      value={returnTabDetails.description}
                      onChange={handleReturnInputChange}
                      placeholder="Description"
                      className="form-control border-radius-10 text-primary"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      Comment
                    </label>
                    <textarea
                      name="comment"
                      cols="30"
                      rows="4"
                      value={returnTabDetails.comment}
                      onChange={handleReturnInputChange}
                      placeholder="Comment"
                      className="form-control border-radius-10 text-primary"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-weight-bold fw-bold mb-1">Component</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Item Code</th>
              <th scope="col">Item Description</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Sales Unit</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cateogry</th>
              <th scope="col">Net Value</th>
              <th scope="col">Item Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returnCoreParts.length !== 0 &&
              returnCoreParts.map((row, i) => (
                <tr key={i}>
                  <th scope="row">{(i = +1)}</th>
                  <td>{row.itemCode}</td>
                  <td>{row.itemDescription}</td>
                  <td>{row.serialNumber}</td>
                  <td>{row.salesUnit}</td>
                  <td>{row.quantity}</td>
                  <td>{row.category}</td>
                  <td>{row.netValue}</td>
                  <td>{row.itemStatus}</td>
                  <td>
                    <span className="cursor" title="Edit">
                      <img className="m-1 cusror" src={penIcon} alt="Edit" />
                    </span>
                    <span className="cursor" title="Delete">
                      <DeleteIcon />
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h5 className="font-weight-bold fw-bold mb-1">
          Active components for selected customer
        </h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Item Number</th>
              <th scope="col">Item Description</th>
              <th scope="col">Category</th>
              <th scope="col">Date of Issue</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableTwoData.length !== 0 &&
              tableTwoData.map((row, i) => (
                <tr key={i}>
                  <th scope="row">{row.itemNumber}</th>
                  <td>{row.itemDescription}</td>
                  <td>{row.category}</td>
                  <td>{row.dateOfIssue}</td>
                  <td>{row.status}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={handleRetrunProcessModal}
                    >
                      Return Process
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <Modal show={show} onHide={hideModal} size="xl">
      <Modal.Body>
        <Box sx={{ typography: "body1" }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                className="custom-tabs-div"
                aria-label="lab API tabs example"
                onChange={(e, tabValue) => setActiveTab(tabValue)}
                centered
              >
                <Tab label={`Item Details`} value="itemDetails" />
                <Tab label={`Issue`} value="issue" />
                <Tab label={`Return`} value="return" />
              </TabList>
            </Box>
            <TabPanel value={activeTab}>
              {activeTab === "itemDetails" && viewItemDetails()}
              {activeTab === "issue" && <ServiceProgressIssueComponent />}
              {activeTab === "return" && viewReturnTabView()}
            </TabPanel>
          </TabContext>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceProgressOverviewModal;

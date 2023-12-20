import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Switch from "@mui/material/Switch";

import Select from "react-select";

import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { Get_Spare_Parts_Datails_By_Id_GET } from "services/CONSTANTS";

import EquipmentDataTable from "./EquipmentDataTable";
import EquipmentSearchMaster from "./EquipmentSearchMaster";
import WithoutSearchDataTable from "./WithoutSearchDataTable";
import {
  SEARCH_FLAG_PARTS,
  SPARE_PARTS_ALTERNATE_PARTS_DETAILS,
  SPARE_PARTS_PRICE_DETAILS,
  SPARE_PARTS_REMAN_OR_REFURB_DETAILS,
  SPARE_PARTS_REPLACED_BY_DETAILS,
  SPARE_PARTS_WARRENTY_DETAILS,
} from "./equipmentMasterConstants";
import PartsMasterSearchList from "./SparePartsMaster/PartsMasterSearchList";
import LoadingProgress from "pages/Repair/components/Loader";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import PartsReportDetails from "./SparePartsMaster/PartsReportDetails";

const label = { inputProps: { "aria-label": "Switch demo" } };

const tempdata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "SEAL-O-RING",
    taskType: "1757896",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "9.92",
    bundleFlag: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R4469",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "94886.38",
    bundleFlag: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "Spacer",
    taskType: "6I6123",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "40.69",
    bundleFlag: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R5474",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "5879.24",
    bundleFlag: "5879.24",
  },
];
const warrentydata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "SEAL-O-RING",
    taskType: "1757896",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R4469",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "Spacer",
    taskType: "6I6123",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "Full Core Deposit",
    taskType: "10R5474",
    quantity: "1",
    recommendedValue: "PC",
    servicePrice: "5879.24",
  },
];

const Parts360 = () => {
  const [bundleItems, setBundleItems] = useState([
    {
      replacedBy: "OR6159",
      quantity: "2.00",
      availablity: "Not available",
      totalAvailablity: "0",
      salesUnit: "PC",
      price: "0",
    },
  ]);
  const [partsPriceDetails, setPartsPriceDetails] = useState([
    {
      groupNumber: "3620566",
      type: "reman",
      partNumber: "OR6158",
      salesUnit: "PC",
      quantity: "1.00",
      price: "498.00",
      currency: "USD",
      validFrom: "44481",
      validTo: "45291",
    },
  ]);
  const [partsERPPriceDetails, setPartsERPPriceDetails] = useState([
    {
      erpCondition: "C12345",
      amount: "498",
      costPrice: "335",
      margin: "",
      lastPricedDate: "12-10-2021",
      priceChangeDate: "12-10-2021",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modelHeaderTitle, setModelHeaderTitle] = useState("");
  const [modelContentReportType, setModelContentReportType] = useState("");
  const [modelContentReportObj, setModelContentReportObj] = useState(null);

  const [warrentyItems, setWarrentyItems] = useState([
    {
      warrantyType: "Parts",
      warrentyDuration: "6 Months",
      dateOfSale: "12-11-2022",
      dateOfInstallation: "NA",
    },
  ]);
  const [searchList, setSearchList] = useState([]);

  const [selectedPartsId, setSelectedPartsId] = useState(null);
  const [selectedPartsDetails, setSelectedPartsDetails] = useState(null);
  const [value, setValue] = React.useState("1");

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showModal) {
      setModelHeaderTitle("");
      setModelContentReportType("");
      setModelContentReportObj(null);
    }
  }, [showModal]);

  // handle Page change
  const handlePageChange = (event, value) => {
    setPageNo(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // replaced by columns
  const replpacedItemColumns = [
    {
      name: <div>Replaced By</div>,
      selector: (row) => row.replacedBy,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Replaced Quantity</div>,
      selector: (row) => row.quantity,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Availability</div>,
      selector: (row) => row?.availablity,
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: <div>Total Available</div>,
      selector: (row) => row?.totalAvailablity,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Sales Unit</div>,
      selector: (row) => row?.salesUnit,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Price</div>,
      selector: (row) => row?.price,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Replaced By",
                SPARE_PARTS_REPLACED_BY_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // alternate parts columns
  const alternateItemColumns = [
    {
      name: <div>Alternate Part #</div>,
      selector: (row) => row.itemName,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Quantity</div>,
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Availability</div>,
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: <div>Total Available</div>,
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Sales Unit</div>,
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Price</div>,
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Alternate Parts",
                SPARE_PARTS_ALTERNATE_PARTS_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // reman or reverb columns
  const remanItemColumns = [
    {
      name: <div>Reman Part #</div>,
      selector: (row) => row.itemName,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Refurbished Part #</div>,
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Availability</div>,
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: <div>Total Available</div>,
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Sales Unit</div>,
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Price</div>,
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Reman or Refurb Options",
                SPARE_PARTS_REMAN_OR_REFURB_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // parts price columns
  const priceItemColumns = [
    {
      name: <div>Group#</div>,
      selector: (row) => row.groupNumber,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Type</div>,
      selector: (row) => row.type,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Part #</div>,
      selector: (row) => row?.partNumber,
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: <div>Sales Unit</div>,
      selector: (row) => row?.salesUnit,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Quantity</div>,
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Price</div>,
      selector: (row) => row?.price,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Valid From</div>,
      selector: (row) => row?.validFrom,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Valid To</div>,
      selector: (row) => row?.validTo,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Price Details",
                SPARE_PARTS_PRICE_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // parts erp detals columns
  const erpDetailsItemColumns = [
    {
      name: <div>ERP Condition</div>,
      selector: (row) => row.erpCondition,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>ERP Amount</div>,
      selector: (row) => row.amount,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>ERP Cost Price</div>,
      selector: (row) => row?.costPrice,
      wrap: true,
      sortable: false,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: <div>ERP Margin</div>,
      selector: (row) => row?.margin,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Last Priced Date </div>,
      selector: (row) => row?.lastPricedDate,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Price Change Date</div>,
      selector: (row) => row?.priceChangeDate,
      wrap: true,
      sortable: false,
    },
  ];

  // parts warrenty columns
  const warrentyItemColumns = [
    {
      name: <div>Warranty Type</div>,
      selector: (row) => row.warrantyType,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Warranty Duration</div>,
      selector: (row) => row.warrentyDuration,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Date Of Sale</div>,
      selector: (row) => row?.dateOfSale,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Date Of Installation</div>,
      selector: (row) => row?.dateOfInstallation,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Actions</div>,
      wrap: true,
      sortable: false,
      cell: (row) => (
        <div
          className="d-flex justify-content-center align-items-center row-svg-div"
          style={{ minWidth: "180px !important" }}
        >
          <EditOutlinedIcon
            className="mr-1"
            onClick={() =>
              handleShowReportDetails(
                "Warranty Details",
                SPARE_PARTS_WARRENTY_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];

  // view select search parts details
  const handleViewDetails = (id) => {
    setLoading(true);
    setPageNo(1);
    const rUrl = Get_Spare_Parts_Datails_By_Id_GET + id;
    callGetApi(
      null,
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setSelectedPartsId(id);
          setSelectedPartsDetails(responseData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  // view the detais for data table row
  const handleShowReportDetails = (title, reportType, row) => {
    setModelHeaderTitle(title);
    setModelContentReportType(reportType);
    setModelContentReportObj(row);
    setShowModal(true);
  };

  // Parts page 1 details
  const viewDetailsPage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden">
          <div className="row align-items-end">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Description
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {/* {isEmpty(selectedPartsDetails.description)
                    ? "NA"
                    : selectedPartsDetails.description} */}
                  {selectedPartsDetails.partDescription + " " + selectedPartsDetails.modelGroupDescription}
                  {/* caterpillar turbocharger p/n OR-6158 T6 A/R 1.23 cat TL8118 */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.partType)
                    ? "NA"
                    : selectedPartsDetails.partType}
                  {/* Reman */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <img
                src="../assets/images/spare-parts.png"
                alt="spare-parts"
                className="width-75 img-fluid"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Manufacturer
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.manufacturer)
                    ? "NA"
                    : selectedPartsDetails.manufacturer}
                  {/* Caterpillar */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Model
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.model)
                    ? "NA"
                    : selectedPartsDetails.model}
                  {/* All models */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Group Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedPartsDetails.groupNumber)
                  ? "NA"
                  : selectedPartsDetails.groupNumber}
                {/* 3620566 */}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Parts Group
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.partsGroup)
                    ? "NA"
                    : selectedPartsDetails.partsGroup}
                  {/* Turbocharger */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  BEC Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.becCode)
                    ? "NA"
                    : selectedPartsDetails.becCode}
                  {/* NA */}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                BEC Code Description
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {isEmpty(selectedPartsDetails.becCodeDescription)
                  ? "NA"
                  : selectedPartsDetails.becCodeDescription}
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Serial Number (If Any)
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.serialNo)
                    ? "NA"
                    : selectedPartsDetails.serialNo}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Status
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                  {isEmpty(selectedPartsDetails.status)
                    ? "NA"
                    : selectedPartsDetails.status}
                  {/* Active */}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-weight-500 mt-4">ERP Details</h5>
        <div className="bg-white p-3 border-radius-10 mt-3 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Material Group
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.materialGroup)
                  ? "NA"
                  : selectedPartsDetails.materialGroup} */}
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Material Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.erpMaterialNumber)
                  ? "NA"
                  : selectedPartsDetails.erpMaterialNumber} */}
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Old Material Number
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.oldMaterialNumber)
                  ? "NA"
                  : selectedPartsDetails.manufacturer} */}
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Average Cost
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.costPrice)
                  ? 0
                  : selectedPartsDetails.costPrice} */}
                $ 90534
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Availability
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.availability)
                  ? "NA"
                  : selectedPartsDetails.availability} */}
                Stock
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Total Number Available
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.totalAvailability)
                  ? "NA"
                  : selectedPartsDetails.totalAvailability} */}
                10
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Status
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500 text-uppercase">
                {/* {isEmpty(selectedPartsDetails.status)
                  ? "NA"
                  : selectedPartsDetails.status} */}
                Active
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Parts page 2 details
  const viewDetailsPage_2 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-4 ">Substitute Details</h5>
        <div className="d-flex align-items-center">
          <h6 className="m-0 mr-2 font-weight-600">Replaced By</h6>
          <div className="equipment-switch">
            <Switch {...label} defaultChecked size="small" />
          </div>
        </div>
        <EquipmentDataTable
          columns={replpacedItemColumns}
          data={bundleItems}
          title="Replaced by"
        />
        <div className="d-flex align-items-center mt-4">
          <h6 className="m-0 mr-2 font-weight-600">Alternate Parts</h6>
          <div className="equipment-switch">
            {/* <Switch {...label} defaultChecked size="small" /> */}
            <Switch {...label} disabled size="small" />
          </div>
        </div>
        {/* <EquipmentDataTable
          columns={alternateItemColumns}
          data={bundleItems}
          title="Alternate Parts"
        /> */}
        <div className="d-flex align-items-center mt-4">
          <h6 className="m-0 mr-2 font-weight-600">Reman or Refurb Option</h6>
          <div className="equipment-switch">
            {/* <Switch {...label} defaultChecked size="small" /> */}
            <Switch {...label} disabled size="small" />
          </div>
        </div>
        {/* <EquipmentDataTable
          columns={remanItemColumns}
          data={bundleItems}
          title="Reman or Refurb Option"
        /> */}
      </>
    );
  };

  // Parts page 3 details
  const viewDetailsPage_3 = () => {
    return (
      <Box className="mt-3" sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Price" value="1" />
              <Tab label="Discount" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" className="px-0">
            <div className="bg-white p-3 border-radius-10">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 master-input-fields">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      Select a combination
                    </label>
                    <Select
                      className="text-primary"
                      // value={generalComponentData.customerSegment}
                      // options={customerSegmentKeyValue}
                      placeholder="Customer Segment"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Enter respective values
                    </label>
                    <input
                      className="form-control border-light-blue text-primary border-radius-10"
                      placeholder="Marine"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Select Price Method
                    </label>
                    <input
                      className="form-control border-light-blue border-radius-10 text-primary"
                      placeholder="List Price"
                    />
                  </div>
                </div>
              </div>
            </div>
            <WithoutSearchDataTable
              columns={priceItemColumns}
              data={partsPriceDetails}
              title="Price Details"
              showAddBtn={true}
            />
            <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
            <WithoutSearchDataTable
              columns={erpDetailsItemColumns}
              data={partsERPPriceDetails}
              title="ERP Details"
            />
          </TabPanel>
          <TabPanel value="2" className="px-0">
            <div className="bg-white p-3 border-radius-10">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 master-input-fields">
                  <div className="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      Select a combination
                    </label>
                    <Select
                      className="text-primary"
                      // value={generalComponentData.customerSegment}
                      // options={customerSegmentKeyValue}
                      placeholder="Customer Segment"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Enter respective values
                    </label>
                    <input
                      className="form-control border-light-blue text-primary border-radius-10"
                      placeholder="Marine"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Select Price Method
                    </label>
                    <input
                      className="form-control border-light-blue border-radius-10 text-primary"
                      placeholder="List Price"
                    />
                  </div>
                </div>
              </div>
            </div>
            <WithoutSearchDataTable
              columns={priceItemColumns}
              data={partsPriceDetails}
              title="Price Details"
              showAddBtn={true}
            />
            <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
            <WithoutSearchDataTable
              columns={erpDetailsItemColumns}
              data={partsERPPriceDetails}
              title="ERP Details"
            />
          </TabPanel>
        </TabContext>
      </Box>
    );
  };

  // Parts page 4 details
  const viewDetailsPage_4 = () => {
    return (
      <>
        <h5 className="font-weight-500 mt-5 ">Warranty</h5>
        <WithoutSearchDataTable
          columns={warrentyItemColumns}
          data={warrentyItems}
          title="Warranty Details"
          showAddBtn={true}
        />
      </>
    );
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <h5 className="font-weight-600 mb-0">Parts 360</h5>
          <p className="mb-1 mt-4 font-size-12">
            Select the search criteria for equipment
          </p>
          <EquipmentSearchMaster
            falgType="parts"
            searchFlag={SEARCH_FLAG_PARTS}
            setSearchList={setSearchList}
          />
          <div className="row mt-3">
            {searchList.length !== 0 && (
              <PartsMasterSearchList
                partsSearchList={searchList}
                selectedPartsId={selectedPartsId}
                handleViewDetails={handleViewDetails}
              />
            )}
            <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
              {loading ? (
                <LoadingProgress />
              ) : (
                <>
                  {selectedPartsId && (
                    <div className="">
                      <div className="bg-white p-3 border-radius-10 ">
                        <div className="d-flex align-items-center justify-content-between equipment-pagination">
                          <h5 className="font-weight-600 mb-0">
                          {!isEmpty(selectedPartsDetails.partDescription) &&
                              selectedPartsDetails.partDescription}
                            {/* Turbocharger Catridge - Reman */}
                          </h5>
                          <Stack spacing={2}>
                            <Pagination
                              boundaryCount={0}
                              siblingCount={0}
                              shape="rounded"
                              hidePrevButton={pageNo === 1 && true}
                              hideNextButton={pageNo === 4 && true}
                              count={4}
                              page={pageNo}
                              onChange={handlePageChange}
                            />
                          </Stack>
                        </div>
                        <div className="d-block mt-3">
                          <h6 className="text-primary font-weight-600">
                            {!isEmpty(selectedPartsDetails.partNumber) &&
                              selectedPartsDetails.partNumber}
                            {/* OR6158 */}
                          </h6>
                          <p className="text-light-60 font-size-12 mb-0">
                            {!isEmpty(selectedPartsDetails.model) &&
                              selectedPartsDetails.model}
                          </p>
                        </div>
                      </div>
                      {pageNo === 1 && viewDetailsPage_1()}
                      {pageNo === 2 && viewDetailsPage_2()}
                      {pageNo === 3 && viewDetailsPage_3()}
                      {pageNo === 4 && viewDetailsPage_4()}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {showModal && (
        <EquipmentReportDetails
          show={showModal}
          hideModel={() => setShowModal(false)}
          header={reportModalHeader}
          reportType={reportType}
        />
      )} */}

      {showModal && (
        <PartsReportDetails
          show={showModal}
          hideModal={() => setShowModal(false)}
          headerTitle={modelHeaderTitle}
          contentReportType={modelContentReportType}
          contetntReportObj={modelContentReportObj}
        />
      )}
    </>
  );
};

export default Parts360;

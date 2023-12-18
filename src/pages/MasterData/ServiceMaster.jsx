import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import EquipmentSearchMaster from "./EquipmentSearchMaster";
import SearchListMaster from "./SearchListMaster";
import WithoutSearchDataTable from "./WithoutSearchDataTable";
import LabourAndServiceReport from "./LabourAndServiceMaster/LabourAndServiceReport";
import {
  LABOUR_AND_SERVICE_ERP_DETAILS,
  LABOUR_AND_SERVICE_PRICE_DETAILS,
} from "./equipmentMasterConstants";

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
const erpservicedata = [
  {
    itemName: "2276044",
    itemDescription: "New",
    itemHeaderStrategy: "1757896",
    taskType: "PC",
    quantity: "9.92",
  },
  {
    itemName: "3734828",
    itemDescription: "Reman",
    itemHeaderStrategy: "10R4469",
    taskType: "PC",
    quantity: "94886.38",
  },
  {
    itemName: "3620656",
    itemDescription: "New",
    itemHeaderStrategy: "6I6123",
    taskType: "PC",
    quantity: "40.69",
  },
  {
    itemName: "3598761",
    itemDescription: "Refurbish",
    itemHeaderStrategy: "10R5474",
    taskType: "PC",
    quantity: "5879.24",
  },
];
const dummySearchLaborList = [
  {
    id: 1,
    A: "S012",
    B: "Internal",
    C: "Inspection",
    D: "Field Service",
    active: true,
  },
  {
    id: 2,
    A: "S006",
    B: "Internal",
    C: "Analysis",
    D: "Field Service",
    active: false,
  },
  {
    id: 3,
    A: "S014",
    B: "External",
    C: "Inspection",
    D: "Special Service",
    active: false,
  },
  {
    id: 4,
    A: "3J0634",
    B: "3620656",
    C: "SEAL",
    D: "CATERPILLAR",
    active: false,
  },
  {
    id: 5,
    A: "F198300020130",
    B: "3620656",
    C: "PRESSURE WASHER",
    D: "CATERPILLAR",
    active: false,
  },
  {
    id: 6,
    A: "2A4429",
    B: "3620656",
    C: "LOCK",
    D: "CATERPILLAR",
    active: false,
  },
  {
    id: 7,
    A: "3681P053",
    B: "3620656",
    C: "MANIFOLD COVER GASKET",
    D: "CATERPILLAR",
    active: false,
  },
];
const dummySearchServiceList = [
  {
    id: 1,
    A: "AC01",
    B: "Description 1",
    C: "Chroming",
    D: "Test Agency 1",
    active: true,
  },
  {
    id: 2,
    A: "AC02",
    B: "Description 2",
    C: "Electrical Work",
    D: "Test Agency 2",
    active: false,
  },
  {
    id: 3,
    A: "AC03",
    B: "Description 3",
    C: "Machining",
    D: "Test Agency 3",
    active: false,
  },
  {
    id: 4,
    A: "AC04",
    B: "Description 4",
    C: "Tooling",
    D: "Test Agency 4",
    active: false,
  },
  {
    id: 5,
    A: "AC05",
    B: "Description 5",
    C: "Crane Service",
    D: "Test Agency 5",
    active: false,
  },
  {
    id: 6,
    A: "AC06",
    B: "Description 6",
    C: "Welding",
    D: "Test Agency 6",
    active: false,
  },
  {
    id: 7,
    A: "AC07",
    B: "Description 7",
    C: "Drlling",
    D: "Test Agency 7",
    active: false,
  },
];

const dummyPriceDeatilsData = [
  {
    chargeCode: "Level I",
    labourCode: "L3 - Inspetion + Travel",
    labourType: "Field",
    serviceType: "Normal",
    unitOfMeasure: "Hours",
    unitPrice: "53",
    currency: "",
    startDate: "12-10-2020",
    endDate: "31-12-2023",
    effectiveFrom: "",
    lastUpdated: "",
  },
  {
    chargeCode: "Level II",
    labourCode: "L3 - Inspetion + Travel",
    labourType: "Field",
    serviceType: "Normal",
    unitOfMeasure: "Hours",
    unitPrice: "78",
    currency: "",
    startDate: "12-10-2020",
    endDate: "31-12-2023",
    effectiveFrom: "",
    lastUpdated: "",
  },
  {
    chargeCode: "Level III",
    labourCode: "L3 - Inspetion + Travel",
    labourType: "Field",
    serviceType: "Normal",
    unitOfMeasure: "Hours",
    unitPrice: "102",
    currency: "",
    startDate: "12-10-2020",
    endDate: "31-12-2023",
    effectiveFrom: "",
    lastUpdated: "",
  },
];

const ServiceMaster = () => {
  const [bundleItems, setBundleItems] = useState([...tempdata]);

  const [labourPriceDetails, setlabourPriceDetails] = useState([
    ...dummyPriceDeatilsData,
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modelHeaderTitle, setModelHeaderTitle] = useState("");
  const [modelContentReportType, setModelContentReportType] = useState("");
  const [modelContentReportObj, setModelContentReportObj] = useState(null);

  const [laborPageNo, setLaborPageNo] = useState(1);
  const [servicePageNo, setServicePageNo] = useState(1);
  const [globalLaborList, setGlobalLaborList] = useState([
    ...dummySearchLaborList,
  ]);
  const [globalServiceList, setGlobalServiceList] = useState([
    ...dummySearchServiceList,
  ]);
  const [erpItemsService, setErpItemsService] = useState([...erpservicedata]);
  const [value, setValue] = React.useState("1");

  useEffect(() => {
    if (!showModal) {
      setModelHeaderTitle("");
      setModelContentReportType("");
      setModelContentReportObj(null);
    }
  }, [showModal]);

  //Labor Page Change
  const handleLaborPageChange = (event, value) => {
    setLaborPageNo(value);
  };

  const handleServicePageChange = (event, value) => {
    setServicePageNo(value);
  };

  // modal component function
  const handleShowReportDetails = (title, reportType, row) => {
    setModelHeaderTitle(title);
    setModelContentReportType(reportType);
    setModelContentReportObj(row);
    setShowModal(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [labormasterpagination, setLabormasterpagination] = React.useState(1);
  const laborPaginationChange = (event, value) => {
    setLabormasterpagination(value);
  };

  const priceLaborColumns = [
    {
      name: <div>Charge Code</div>,
      selector: (row) => row.chargeCode,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Labor Code</div>,
      selector: (row) => row.labourCode,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Labor Type</div>,
      selector: (row) => row?.labourType,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Service Type</div>,
      selector: (row) => row?.serviceType,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Unit Of Measure</div>,
      selector: (row) => row?.unitOfMeasure,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Unit Price</div>,
      selector: (row) => row?.unitPrice,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Currency</div>,
      selector: (row) => row?.currency,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Start Date</div>,
      selector: (row) => row?.startDate,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>End Date</div>,
      selector: (row) => row?.endDate,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Effective From</div>,
      selector: (row) => row?.effectiveFrom,
      wrap: true,
      sortable: false,
    },
    {
      name: <div>Last Updated</div>,
      selector: (row) => row?.lastUpdated,
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
                LABOUR_AND_SERVICE_PRICE_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const priceServiceColumns = [
    {
      name: (
        <>
          <div>Activity ID</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Activity Name</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Supplying Vendor</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Unit Of Measure</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
    {
      name: (
        <>
          <div>Currency</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Start Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>End Date</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Effective From</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Last Updated</div>
        </>
      ),
      selector: (row) => row?.recommendedValue,
      wrap: true,
      sortable: true,
      format: (row) => row?.recommendedValue,
    },
    {
      name: (
        <>
          <div>Actions</div>
        </>
      ),
      wrap: true,
      sortable: true,
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
                LABOUR_AND_SERVICE_ERP_DETAILS,
                row
              )
            }
          />
          <DeleteOutlineOutlinedIcon />
        </div>
      ),
    },
  ];
  const erpLaborColumns = [
    {
      name: (
        <>
          <div>Activity Cost</div>
        </>
      ),
      selector: (row) => row.itemName,
      wrap: true,
      sortable: true,
      format: (row) => row.itemName,
    },
    {
      name: (
        <>
          <div>Activity Number</div>
        </>
      ),
      selector: (row) => row.itemDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.itemDescription,
    },

    {
      name: (
        <>
          <div>Period</div>
        </>
      ),
      selector: (row) => row?.itemHeaderStrategy,
      wrap: true,
      sortable: true,
      format: (row) => row?.itemHeaderStrategy,
      // minWidth: "150px",
      // maxWidth: "150px",
    },
    {
      name: (
        <>
          <div>Fiscal Year</div>
        </>
      ),
      selector: (row) => row?.taskType,
      wrap: true,
      sortable: true,
      format: (row) => row?.taskType,
    },
    {
      name: (
        <>
          <div>Average/Fixed Cost</div>
        </>
      ),
      selector: (row) => row?.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row?.quantity,
    },
  ];

  const viewLaborDetails = (id) => {
    const _globalLaborList = [...globalLaborList];
    const updatedGlobalLaborList = _globalLaborList.map((data) => ({
      ...data,
      active: data.id === id ? true : false,
    }));
    setGlobalLaborList(updatedGlobalLaborList);
  };
  const viewServiceDetails = (id) => {
    const _globalServiceList = [...globalServiceList];
    const updatedGlobalServiceList = _globalServiceList.map((data) => ({
      ...data,
      active: data.id === id ? true : false,
    }));
    setGlobalServiceList(updatedGlobalServiceList);
  };

  // Labor page 1 details
  const viewLaborPage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden br-t">
          <div className="row align-items-end">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Service Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  SO10
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Service Description
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Breakdown Service
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Service Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Normal
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Labor Type
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Field
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Charge Code
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                All
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Labor Code
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  L3 - Inspetion + Travel
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Recommended Duration
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  NA
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Actual duration
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                NA
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Estimated Duration
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  10 Hours
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 border-radius-10 mt-4 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Model
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                NA
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Family
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Dozers
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                All
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Related Job Code
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                034 - Inspection
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Related Component Code
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                7000 - Machine
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Labor page 2 details
  const viewLaborPage_2 = () => {
    return (
      <>
        <h6 className="font-weight-500 pl-2 mt-5">Price</h6>
        <WithoutSearchDataTable
          columns={priceLaborColumns}
          data={labourPriceDetails}
          title="Price Details"
          showAddBtn={true}
        />
        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
        <WithoutSearchDataTable
          columns={erpLaborColumns}
          data={bundleItems}
          title="ERP Details"
        />
      </>
    );
  };

  // Service page 1 details
  const viewServicePage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden br-t">
          <div className="row align-items-end">
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Activity Id
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Full Core Deposit
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Activity Name
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Reman
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Activity Description
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Active
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Supplying Vendor
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Caterpillar
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Unit Of Measure
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                336D2 L
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Estimated Hours/Days
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  3620656
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  Activity Dimensions
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  REMAN
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 border-radius-10 mt-4 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Model
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Family
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Customer
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Related Job Code
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                $ 90534
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                Related Component Code
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Stock
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Service page 2 details
  const viewServicePage_2 = () => {
    return (
      <>
        <h6 className="font-weight-500 pl-2 mt-5">Price</h6>
        <WithoutSearchDataTable
          columns={priceServiceColumns}
          data={bundleItems}
          title="Price Details"
          showAddBtn={true}
        />
        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
        <WithoutSearchDataTable
          columns={erpLaborColumns}
          data={erpItemsService}
          title="ERP Details"
        />
      </>
    );
  };

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <h5 className="font-weight-600 mb-0">Labor & Service Master</h5>
          <Box className="mt-4" sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Labor" value="1" />
                  <Tab label="Service" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" className="px-0">
                <p className="mb-1 mt-4 font-size-12">
                  Select the search criteria for equipment
                </p>
                <EquipmentSearchMaster falgType="labor" />
                <div className="row mt-3">
                  <SearchListMaster
                    searchList={globalLaborList}
                    viewEquipmentDetails={viewLaborDetails}
                  />
                  <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
                    <div className="">
                      <div className="bg-white p-3 border-radius-10 ">
                        <div className="d-flex align-items-center justify-content-between equipment-pagination">
                          <h5 className="font-weight-600 mb-0">Inspection</h5>
                          <Stack spacing={2}>
                            <Pagination
                              boundaryCount={0}
                              siblingCount={0}
                              shape="rounded"
                              hidePrevButton={laborPageNo === 1 && true}
                              hideNextButton={laborPageNo === 2 && true}
                              count={2}
                              page={laborPageNo}
                              onChange={handleLaborPageChange}
                            />
                          </Stack>
                        </div>
                        <div className="d-block mt-3">
                          <h6 className="text-primary font-weight-600">S014</h6>
                          <p className="text-light-60 font-size-12 mb-0">
                            External - Special Service
                          </p>
                        </div>
                      </div>
                      {laborPageNo === 1 && viewLaborPage_1()}
                      {laborPageNo === 2 && viewLaborPage_2()}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2" className="px-0">
                <p className="mb-1 mt-4 font-size-12">
                  Select the search criteria for equipment
                </p>
                <EquipmentSearchMaster falgType="service" />
                <div className="row mt-3">
                  <SearchListMaster
                    searchList={globalServiceList}
                    viewEquipmentDetails={viewServiceDetails}
                  />
                  <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
                    <div className="">
                      <div className="bg-white p-3 border-radius-10 ">
                        <div className="d-flex align-items-center justify-content-between equipment-pagination">
                          <h5 className="font-weight-600 mb-0">Machining</h5>
                          <Stack spacing={2}>
                            <Pagination
                              boundaryCount={0}
                              siblingCount={0}
                              shape="rounded"
                              hidePrevButton={servicePageNo === 1 && true}
                              hideNextButton={servicePageNo === 2 && true}
                              count={2}
                              page={servicePageNo}
                              onChange={handleServicePageChange}
                            />
                          </Stack>
                        </div>
                        <div className="d-block mt-3">
                          <h6 className="text-primary font-weight-600">AC03</h6>
                          <p className="text-light-60 font-size-12 mb-0">
                            Description 3 - Test Agency 3
                          </p>
                        </div>
                      </div>
                      {servicePageNo === 1 && viewServicePage_1()}
                      {servicePageNo === 2 && viewServicePage_2()}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
      {showModal && (
        <LabourAndServiceReport
          show={showModal}
          hideModal={() => setShowModal(false)}
          headerTitle={modelHeaderTitle}
          contentReportType={modelContentReportType}
          contetntReportObj={modelContentReportObj}
        />
      )}
      {/* {showModal && (
        <EquipmentReportDetails
          show={showModal}
          hideModel={() => setShowModal(false)}
          header={reportModalHeader}
          reportType={reportType}
        />
      )} */}
    </>
  );
};

export default ServiceMaster;

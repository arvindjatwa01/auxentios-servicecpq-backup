import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Pagination from "@mui/material/Pagination";
import { Stack, Tooltip } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import LoadingProgress from "pages/Repair/components/Loader";
import EquipmentSearchMaster from "./EquipmentSearchMaster";
import SearchListMaster from "./SearchListMaster";
import WithoutSearchDataTable from "./WithoutSearchDataTable";
import LabourAndServiceReport from "./LabourAndServiceMaster/LabourAndServiceReport";
import ServiceMasterSearchList from "./LabourAndServiceMaster/ServiceMasterSearchList";
import { service_search_uri, External_PRICE } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { callGetApi } from "services/ApiCaller";
import {
  LABOUR_AND_SERVICE_ERP_DETAILS,
  LABOUR_AND_SERVICE_PRICE_DETAILS,
  SEARCH_FLAG_SERVICE,
  SERVICE_PRICE_DETAILS
} from "./equipmentMasterConstants";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { ReadOnlyField } from "pages/Repair/components/ReadOnlyField";
import { GRID_STYLE } from "pages/Common/constants";


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

const dummyServiceData = {
  "id": 1,
  "activityId": "AC01",
  "activityDescription": "Chroming",
  "activityType": "Purchase",
  "longDescription": "Description 1",
  "dimension1": "4 X 5 X 6 Chromes",
  "dimension2": "",
  "supplyingVendorCode": "103456",
  "supplyingVendorName": "Test Agency -1",
  "contractedPrice": 600,
  "validFrom": "2021-01-01",
  "validTo": "2024-01-01",
  "createdAt": null,
  "updatedAt": null,
  "createdBy": null,
  "updatedBy": null
}
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
  const [searchList, setSearchList] = useState([])
  const [searchedService, setSearchedService] = useState({ ...dummyServiceData });
  const [loading, setLoading] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [searchedServicePriceDetails, setSearchedServicePriceDetails] = useState([]);

  useEffect(() => {
    if (!showModal) {
      setModelHeaderTitle("");
      setModelContentReportType("");
      setModelContentReportObj(null);
    }
  }, [showModal]);

  useEffect(() => {
    setSelectedServiceId(null);
  }, [searchList])

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
      field: "chargeCode",
      headerName: "charge Code",
      flex: 1,
    },
    {
      field: "labourCode",
      headerName: "Labor Code",
      flex: 1,
    },
    {
      field: "labourType",
      headerName: "Labor Type",
      flex: 1,
    },
    {
      field: "serviceType",
      headerName: "Service Type",
      flex: 1,
    },
    {
      field: "unitOfMeasure",
      headerName: "Unit Of Measure",
      flex: 1,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      flex: 1,
    },
    {
      field: "currency",
      headerName: "Currency",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
    },
    {
      field: "effectiveFrom",
      headerName: "Effective From",
      flex: 1,
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleShowReportDetails("Price Details",
                  LABOUR_AND_SERVICE_PRICE_DETAILS,
                  params.row)}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
              >
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
    },
  ];

  const priceServiceColumns = [
    {
      field: "code",
      headerName: "Activity ID",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Activity Name",
      flex: 1,
    },
    {
      field: "vendorName",
      headerName: "Supplying Vendor",
      flex: 1,
    },
    {
      field: "unit",
      headerName: "Unit Of Measure",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Unit Price",
      flex: 1,
    },
    {
      field: "currency",
      headerName: "Currency",
      flex: 1,
    },
    {
      field: "validFrom",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "validTo",
      headerName: "End Date",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                onClick={() => handleShowReportDetails("Price Details",
                  SERVICE_PRICE_DETAILS,
                  params.row)}
              >
                <Tooltip title="Edit">
                  <EditOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div
                className=" cursor"
              >
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
        ];
      },
    },
  ];
  const erpLaborColumns = [
    {
      field: "itemName",
      headerName: "Activity Cost",
      flex: 1,
    },
    {
      field: "itemDescription",
      headerName: "Activity Number",
      flex: 1,
    },
    {
      field: "itemHeaderStrategy",
      headerName: "Period ",
      flex: 1,
    },
    {
      field: "taskType",
      headerName: "Fiscal Year",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Average/Fixed Cost",
      flex: 1,
    }
  ]

  const viewLaborDetails = (id) => {
    const _globalLaborList = [...globalLaborList];
    const updatedGlobalLaborList = _globalLaborList.map((data) => ({
      ...data,
      active: data.id === id ? true : false,
    }));
    setGlobalLaborList(updatedGlobalLaborList);
  };

  const viewServiceDetails = (id) => {
    // const _globalServiceList = [...globalServiceList];
    // const updatedGlobalServiceList = _globalServiceList.map((data) => ({
    //   ...data,
    //   active: data.id === id ? true : false,
    // }));
    // setGlobalServiceList(updatedGlobalServiceList);
    const serviceReqUrl = `${service_search_uri}${id}`;
    const searchpricedetailsurl = `${External_PRICE}${id}`;
    // console.log(searchpricedetailsurl);
    setSelectedServiceId(id);
    setServicePageNo(1);
    setLoading(true);
    callGetApi(
      serviceReqUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setSearchedService(responseData);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
    // console.log(serviceReqUrl);
    callGetApi(
      searchpricedetailsurl,
      (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          setSearchedServicePriceDetails(responseData);
          if (searchedService) {
            console.log(searchedService);
            setSearchedServicePriceDetails(prevState => ({
              ...prevState,
              vendorName: searchedService.supplyingVendorName,
            }));
          }

        } else {

        }
      },
      (error) => {

      }
    );


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
                  SERVICE CODE
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  S012
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  SERVICE DESCRIPTION
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Breakdown Service
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  SERVICE TYPE
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Normal
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  LABOR TYPE
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  Field
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                CHARGE CODE
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                All
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  LABOR CODE
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  L3 - Inspetion + Travel
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  RECOMMENDED DURATION
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  NA
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                ACTUAL DURATION
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                NA
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  ESTIMATED DURATION
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
                MODEL
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                NA
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                FAMILY
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                Dozers
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                CUSTOMER
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                All
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                RELATED JOB CODE
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                034 - Inspection
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                RELATED COMPONENT CODE
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
        <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="font-weight-600 mb-0 mr-3">Price Details</h6>
            <a className="btn cursor bg-primary text-white">Add New</a>
          </div>
          <div style={{ height: 280, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={labourPriceDetails} columns={priceLaborColumns} getRowId={(row) => row.chargeCode} pageSize={5} />
          </div>
        </div>
        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
        <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="font-weight-600 mb-0 mr-3">ERP Details</h6>
            <a className="btn cursor bg-primary text-white">Add New</a>
          </div>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={bundleItems} columns={erpLaborColumns} getRowId={(row) => row.itemName} pageSize={5} />
          </div>
        </div>
      </>
    );
  };

  // Service page 1 details
  const viewServicePage_1 = () => {
    return (
      <>
        <div className="bg-white p-3 border-radius-10 overflow-hidden br-t">
          <div className="row align-items-end">
            {/* <ReadOnlyField className={"col-lg-4 col-md-4 col-sm-6 col-12"} label={"ACTIVITY ID"} value={searchedService.activityId}/> */}
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  ACTIVITY ID
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(searchedService.activityId) ? "N/A" : searchedService.activityId.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  {/* Activity Name */}
                  ACTIVITY NAME
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(searchedService.activityDescription) ? "N/A" : searchedService.activityDescription.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  {/* Activity Description */}
                  ACTIVITY DESCRIPTION
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(searchedService.longDescription) ? "N/A" : searchedService.longDescription.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  {/* Supplying Vendor */}
                  SUPPLYING VENDOR
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(searchedService.supplyingVendorName) ? "N/A" : searchedService.supplyingVendorName.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                {/* Unit Of Measure */}
                UNIT OF MEASURE
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                336D2 L
              </p>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  {/* Estimated Hours/Days */}
                  ESTIMATED HOURS/DAYS
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  3620656
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6 col-12 mt-4">
              <div className="d-block">
                <p className="text-light-60 font-size-12 m-0 font-weight-500">
                  {/* Activity Dimensions */}
                  ACTIVITY DIMENSIONS
                </p>
                <p className="text-primary font-size-12 mt-1 font-weight-500">
                  {isEmpty(searchedService.dimension1) ? "N/A" : searchedService.dimension1.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 border-radius-10 mt-4 mb-5">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                {/* Model */}
                MODEL
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                {/* Family */}
                FAMILY
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                {/* Customer */}
                CUSTOMER
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                AA: 0S1619
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                {/* Related Job Code */}
                RELATED JOB CODE
              </p>
              <p className="text-primary font-size-12 mt-1 font-weight-500">
                $ 90534
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mt-3">
              <p className="text-light-60 font-size-12 m-0 font-weight-500">
                {/* Related Component Code */}
                RELATED COMPONENT CODE
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
        <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="font-weight-600 mb-0 mr-3">Price Details</h6>
            <a className="btn cursor bg-primary text-white">Add New</a>
          </div>
          <div style={{ height: 180, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={[searchedServicePriceDetails]} columns={priceServiceColumns} getRowId={(row) => row.code} pageSize={5} />
          </div>
        </div>
        <h6 className="font-weight-500 pl-2 mt-5">ERP Price</h6>
        <div className="bg-white p-3 border-radius-10 mt-3 overflow-hidden">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="font-weight-600 mb-0 mr-3">ERP Details</h6>
            <a className="btn cursor bg-primary text-white">Add New</a>
          </div>
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid sx={GRID_STYLE} rows={erpItemsService} columns={erpLaborColumns} getRowId={(row) => row.itemName} pageSize={5} />
          </div>
        </div>
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
                          <h6 className="text-primary font-weight-600">S012</h6>
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
                <EquipmentSearchMaster falgType="service" searchFlag={SEARCH_FLAG_SERVICE} setSearchList={setSearchList} />
                <div className="row mt-3">
                  {/* <SearchListMaster
                    searchList={globalServiceList}
                    viewEquipmentDetails={viewServiceDetails}
                  />*/}
                  {searchList.length !== 0 &&
                    <ServiceMasterSearchList
                      searchList={searchList}
                      selectedServiceId={selectedServiceId}
                      viewServiceDetails={viewServiceDetails}
                    />
                  }
                  <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 equipment-master-chart mt-custom">
                    {loading ? (
                      <LoadingProgress />
                    ) : (
                      <>
                        {selectedServiceId && (<>
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
                                <h6 className="text-primary font-weight-600">{searchedService.activityId.toUpperCase()}</h6>
                                <p className="text-light-60 font-size-12 mb-0">
                                  {searchedService.longDescription.toUpperCase()} - {searchedService.supplyingVendorName.toUpperCase()}
                                </p>
                              </div>
                            </div>
                            {servicePageNo === 1 && viewServicePage_1()}
                            {servicePageNo === 2 && viewServicePage_2()}
                          </div>

                        </>)}

                      </>)}
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
          contentReportObj={modelContentReportObj}
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

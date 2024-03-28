import React, { useState } from "react";
import {
  Box,
  Grid,
  Tab,
  Tooltip,
  Radio,
  RadioGroup,
  Divider,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import VisibilityIcon from "@mui/icons-material/Visibility";
import penIcon from "../../../assets/images/pen.png";
import ItemDetailsModal from "./ItemDetailsModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ServiceProgressIssueComponent from "./ServiceProgressIssueComponent";
import ServiceProgressOverviewModal from "./ServiceProgressOverviewModal";
import ReturnProcessModal from "./ReturnProcessModal";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CachedIcon from "@mui/icons-material/Cached";
import { DATA_GRID_STYLE } from "../claimMaster/ClaimMasterConstants";

const DataGridContainer = (props) => (
  <Box
    margin={"auto"}
    sx={{
      backgroundColor: "#ffffff",
      height: 500,
      marginBlock: 2,
      borderRadius: 5,
      width: "95%",
      display: "flex",
      justifyContent: "center",
      padding: 2,
    }}
  >
    {props.children}
  </Box>
);

const colorStatus = {
  "in stock": "#dfffc9",
  "at customer": "#fff1c2",
  "at workshop": "#ffc8c8",
  "for scrap": "#fff1c2",
};

const statusPointColor = {
  "in stock": "#2ca868",
  "at customer": "#fd8e13",
  "at workshop": "#fe3938",
  "for scrap": "#fd8e12",
};
const data = [
  {
    componentId: "2471437",
    componentDescription: "MOTOR & MTG GP-TRAVEL",
    stock: "Yes",
    warehouseNumber: "AA:2471437",
    serialNumber: "ZMX00507",
    status: "at customer",
    customerName: "Koolan Iron Ore Pty Ltd",
    customerId: "101211",
  },
  {
    componentId: "N98001005",
    componentDescription: "TEMPERATURE SENSOR",
    stock: "Yes",
    warehouseNumber: "MU:N98001005",
    serialNumber: "ZCT00365",
    status: "in stock",
    customerName: "NA",
    customerId: "NA",
  },
  {
    componentId: "10R4469",
    componentDescription: "FULL CORE DEPOSIT",
    stock: "No",
    warehouseNumber: "AA:10R4469",
    serialNumber: "ZCT00125",
    status: "at workshop",
    customerName: "NA",
    customerId: "NA",
  },
  {
    componentId: "1978885",
    componentDescription: "PUMP GP-GEAR",
    stock: "No",
    warehouseNumber: "AA:1978885",
    serialNumber: "ZMX00289",
    status: "for scrap",
    customerName: "NA",
    customerId: "NA",
  },
  {
    componentId: "5503777",
    componentDescription: "CONTROL",
    stock: "Yes",
    warehouseNumber: "AA:5503777",
    serialNumber: "ZCT00865",
    status: "at customer",
    customerName: "Koolan Iron Ore Pty Ltd",
    customerId: "101211",
  },
];

const trackOrderList = [
  {
    orderId: "0000982556",
    category: "Base",
    componentCode: "2471437",
    customerId: "101211",
    orderedDate: "10/12/2023",
    status: "Ordered",
    filterType: "ordered",
  },
  {
    orderId: "0000982558",
    category: "Core",
    componentCode: "2471445",
    customerId: "101219",
    orderedDate: "05/01/2024",
    status: "Ordered",
    filterType: "ordered",
  },
  {
    orderId: "0000982560",
    category: "Core",
    componentCode: "N98001018",
    customerId: "10120",
    orderedDate: "21/12/2023",
    status: "Issued",
    filterType: "issued",
  },
  {
    orderId: "0000982563",
    category: "Base",
    componentCode: "N98001022",
    customerId: "10125",
    orderedDate: "08/09/2023",
    status: "Issued",
    filterType: "issued",
  },
  {
    orderId: "0000982566",
    category: "Base",
    componentCode: "N98001011",
    customerId: "10125",
    orderedDate: "11/11/2023",
    status: "Issued",
    filterType: "issued",
  },
  {
    orderId: "0000982569",
    category: "Core",
    componentCode: "2471433",
    customerId: "101216",
    orderedDate: "12/12/2023",
    status: "Ordered",
    filterType: "ordered",
  },
  {
    orderId: "0000982573",
    category: "Core",
    componentCode: "N98001025",
    customerId: "10129",
    orderedDate: "11/11/2023",
    status: "Core Issued",
    filterType: "coreIssued",
  },
  {
    orderId: "0000982577",
    category: "Core",
    componentCode: "2471445",
    customerId: "101219",
    orderedDate: "05/01/2024",
    status: "Ordered",
    filterType: "ordered",
  },
  {
    orderId: "0000982582",
    category: "Core",
    componentCode: "N98001018",
    customerId: "10120",
    orderedDate: "21/12/2023",
    status: "Issued",
    filterType: "issued",
  },
  {
    orderId: "0000982587",
    category: "Base",
    componentCode: "N98001022",
    customerId: "10125",
    orderedDate: "08/09/2023",
    status: "Core Returned",
    filterType: "coreReturned",
  },
  {
    orderId: "0000982593",
    category: "Core",
    componentCode: "N98001021",
    customerId: "10120",
    orderedDate: "21/12/2023",
    status: "Core Issued",
    filterType: "coreIssued",
  },
  {
    orderId: "0000982599",
    category: "Base",
    componentCode: "N98001024",
    customerId: "10132",
    orderedDate: "08/09/2023",
    status: "core Issued",
    filterType: "coreIssued",
  },
  {
    orderId: "0000982607",
    category: "Core",
    componentCode: "N98001031",
    customerId: "10136",
    orderedDate: "11/11/2023",
    status: "Core Returned",
    filterType: "coreReturned",
  },
  {
    orderId: "0000982614",
    category: "Core",
    componentCode: "N98001035",
    customerId: "10139",
    orderedDate: "21/12/2023",
    status: "Core Returned",
    filterType: "coreReturned",
  },
  {
    orderId: "0000982621",
    category: "Base",
    componentCode: "N98001037",
    customerId: "10141",
    orderedDate: "08/09/2023",
    status: "Core Returned",
    filterType: "coreReturned",
  },
];

const filyerOrderTypes = [
  { label: "All", value: "all" },
  { label: "Ordered", value: "ordered" },
  { label: "Issued", value: "issued" },
  { label: "Core Issued", value: "coreIssued" },
  { label: "Core Returned", value: "coreReturned" },
];

const ServiceProgessMaster = () => {
  const [tabValue, setTabValue] = useState("deshboard");
  const [filterExpended, setFilterExpended] = useState("filterShow");
  const [filterType, setFilterType] = useState("all");
  const [showItemDetailsModal, setShowItemDetailsModal] = useState(false);
  const [showReturnProcessModal, setShowReturnProcessModal] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    model: false,
    make: false,
    family: false,
    prefix: false,
  });
  const [trackOrdersData, setTrackOrdersData] = useState([...trackOrderList]);

  const changeTab = (event, type) => {
    setTabValue(type);
    // if(type === "activities"){
    //   setData(activitiesData);
    // } else if(type === "tasks"){
    //   setData(savedTasksData);
    //   } else if(type === "review"){
    //     setData(reviewData);
    //     }
  };

  const handleRetrunProcessModal = () => {
    setShowItemDetailsModal(!showItemDetailsModal);
    setShowReturnProcessModal(!showReturnProcessModal);
  };

  const handleFilterTypeSelect = (e) => {
    setFilterType(e.target.value);
    if (e.target.value === "all") {
      setTrackOrdersData(trackOrderList);
    } else {
      const filteredData = trackOrderList.filter(
        (obj) => obj.filterType === e.target.value
      );
      setTrackOrdersData(filteredData);
    }
  };

  const columns = [
    {
      field: "componentId",
      headerName: "Component Id",
      flex: 1,
    },
    {
      field: "componentDescription",
      headerName: "Component Description",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
    },
    {
      field: "warehouseNumber",
      headerName: "Warehouse Number",
      flex: 1,
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div
          className="d-flex justify-content-between align-items-center py-2"
          style={{
            fontSize: 15,
            backgroundColor: colorStatus[params.row.status],
            paddingInline: 5,
            paddingBlock: 2,
            borderRadius: 6,
            textTransform: "capitalize",
            color: statusPointColor[params.row.status],
          }}
        >
          <span
            style={{
              borderRadius: 10,
              content: '" "',
              display: "block",
              marginRight: 8,
              height: 10,
              width: 10,
              backgroundColor: statusPointColor[params.row.status],
            }}
          ></span>{" "}
          {params.row.status}
        </div>
      ),
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
    },
    {
      field: "customerId",
      headerName: "Customer Id",
      flex: 1,
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      //   width: 150,
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div
                className="cursor"
                //   onClick={() => handleViewWarrantyDetails(params)}
              >
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
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
                onClick={() => setShowItemDetailsModal(true)}
                //   onClick={() => handleViewWarrantyOverview(params)}
              >
                <Tooltip title="View">
                  <VisibilityIcon />
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

  const trackOrderColumns = [
    {
      field: "orderId",
      headerName: "Order Id",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "componentCode",
      headerName: "Component Code",
      flex: 1,
    },
    {
      field: "orderedDate",
      headerName: "Ordered Date",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
  ];
  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid mt-3">
          <Grid
            container
            sx={{
              width: "100%",
              backgroundColor: "#f3eafe",
              borderRadius: 5,
              marginBlock: 2,
            }}
          >
            <Grid item xs={12}>
              <TabContext value={tabValue}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginTop: 3,
                    marginInline: 5,
                  }}
                >
                  <TabList className="" onChange={changeTab}>
                    <Tab
                      // label="Dashboard"
                      value={"deshboard"}
                      className="heading-tabs"
                    />
                    <Tab
                      // label="Track Order"
                      value={"trackOrder"}
                      className="heading-tabs"
                    />
                  </TabList>
                </Box>
                <TabPanel value="deshboard" sx={{ marginTop: 0 }}>
                  {/* <div className="d-flex justify-content-between "> */}
                  <div className="row justify-content-center">
                    <div className="col-sm-2">
                      <div className="card border px-2 py-1 cursor-pointer  ">
                        <div className="card-body text-center">
                          <span className="">In Stock</span>
                          <h3 className="mt-0 text-center">6</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="card border px-2 py-1 cursor-pointer">
                        <div className="card-body">
                          <span className="">Cores Pending</span>
                          <h3 className="mt-0 text-center">4</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="card border px-2 py-1 cursor-pointer">
                        <div className="card-body">
                          <span className="">Received Cores</span>
                          <h3 className="mt-0 text-center">2</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="card border px-2 py-1 cursor-pointer">
                        <div className="card-body">
                          <span className="">PEX in Refurbish</span>
                          <h3 className="mt-0 text-center">1</h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div className="card border px-2 py-1 cursor-pointer">
                        <div className="card-body">
                          <span className="">PEX Requests</span>
                          <h3 className="mt-0 text-center">1</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border mt-2 px-4">
                    <Grid
                      container
                      sx={{
                        width: "100%",
                        backgroundColor: "#f3eafe",
                        borderRadius: 5,
                        marginBlock: 3,
                        padding: 2,
                        marginTop: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: 700,
                          // marginBottom: 8,
                          marginInline: 2,
                        }}
                      >
                        <DataGrid
                          rows={data}
                          columns={columns}
                          sx={GRID_STYLE}
                          pageSizeOptions={[5]}
                          // checkboxSelection
                          disableRowSelectionOnClick
                          rowsPerPageOptions={[5, 10, 20, 50]}
                          getRowId={(row) => row.componentId}
                        />
                      </Box>
                    </Grid>
                  </div>
                </TabPanel>
                <TabPanel value="trackOrder" sx={{ marginTop: 0 }}>
                  <Grid container>
                    <Grid item xs={2}>
                      <Box sx={{ marginBlock: 2 }}>
                        <Accordion
                          //   sx={{ backgroundColor: "#f3eafe" }}
                          defaultExpanded
                          expanded={filterExpended === "filterShow"}
                          // onChange={handleQuoteExpand("filterShow")}
                        >
                          {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                              Claim Status
                            </Typography>
                          </AccordionSummary> */}
                          <AccordionDetails>
                            <RadioGroup
                              value={filterType}
                              onChange={handleFilterTypeSelect}
                            >
                              <FormControl>
                                {filyerOrderTypes.map((filter, i) => (
                                  <FormControlLabel
                                    label={
                                      <Typography sx={{ fontSize: 14 }}>
                                        {filter.label}
                                      </Typography>
                                    }
                                    value={filter.value}
                                    control={<Radio />}
                                  />
                                ))}
                              </FormControl>
                            </RadioGroup>
                          </AccordionDetails>
                        </Accordion>
                        <Divider />
                      </Box>
                    </Grid>
                    <Grid item xs={10} container>
                      <DataGridContainer>
                        <DataGrid
                          // loading={isLoading}
                          sx={DATA_GRID_STYLE}
                          getRowId={(row) => row.orderId}
                          rows={trackOrdersData}
                          columns={trackOrderColumns}
                          columnVisibilityModel={columnVisibilityModel}
                          onColumnVisibilityModelChange={(newModel) =>
                            setColumnVisibilityModel(newModel)
                          }
                          pageSize={pageSize}
                          onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                          }
                          rowsPerPageOptions={[5, 10, 20, 50]}
                        />
                      </DataGridContainer>
                    </Grid>
                  </Grid>
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </div>
      </div>
      {showItemDetailsModal && (
        <ServiceProgressOverviewModal
          show={showItemDetailsModal}
          hideModal={() => setShowItemDetailsModal(false)}
          handleRetrunProcessModal={handleRetrunProcessModal}
        />
      )}
      {showReturnProcessModal && (
        <ReturnProcessModal
          show={showReturnProcessModal}
          hideModal={handleRetrunProcessModal}
        />
      )}
      {/* {showItemDetailsModal && (
        <ItemDetailsModal
          show={showItemDetailsModal}
          hideModal={() => setShowItemDetailsModal(false)}
        />
      )} */}
    </>
  );
};

export default ServiceProgessMaster;

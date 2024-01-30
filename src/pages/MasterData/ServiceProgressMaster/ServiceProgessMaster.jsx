import React, { useState } from "react";
import { Box, Grid, Tab, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import VisibilityIcon from "@mui/icons-material/Visibility";
import penIcon from "../../../assets/images/pen.png";
import ItemDetailsModal from "./ItemDetailsModal";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ServiceProgressIssueComponent from "./ServiceProgressIssueComponent";

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
    componentId: 1,
    componentDescription: "abcd",
    stock: 12,
    warehouseNumber: 123,
    serialNumber: 123,
    status: "in stock",
    customerName: "",
    customerId: "",
  },
  {
    componentId: 2,
    componentDescription: "abcd",
    stock: 12,
    warehouseNumber: 123,
    serialNumber: 129,
    status: "at customer",
    customerName: "John Smith",
    customerId: 12,
  },
  {
    componentId: 3,
    componentDescription: "abcd",
    stock: 12,
    warehouseNumber: 123,
    serialNumber: 123,
    status: "at workshop",
    customerName: "",
    customerId: "",
  },
  {
    componentId: 4,
    componentDescription: "abcd",
    stock: 12,
    warehouseNumber: 123,
    serialNumber: 123,
    status: "for scrap",
    customerName: "",
    customerId: "",
  },
];

const ServiceProgessMaster = () => {
  const [tabValue, setTabValue] = useState("deshboard");
  const [showItemDetailsModal, setShowItemDetailsModal] = useState(false);

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
                      label="Deshboard"
                      value={"deshboard"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Overview"
                      value={"overview"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Item Details"
                      value={"itemDetails"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Issue"
                      value={"issue"}
                      className="heading-tabs"
                    />
                    <Tab
                      label="Return"
                      value={"return"}
                      className="heading-tabs"
                    />
                  </TabList>
                </Box>
                <TabPanel value="deshboard" sx={{ marginTop: 0 }}>
                  <div className="d-flex justify-content-around ">
                    <div className="card border px-2 py-1 cursor-pointer mt-2">
                      <div className="card-body">
                        <span className="">In Stock</span>
                        <h3 className="mt-0 text-center">6</h3>
                      </div>
                    </div>
                    <div className="card border px-2 py-1 cursor-pointer">
                      <div className="card-body">
                        <span className="">Cores Pending</span>
                        <h3 className="mt-0 text-center">4</h3>
                      </div>
                    </div>
                    <div className="card border px-2 py-1 cursor-pointer">
                      <div className="card-body">
                        <span className="">Received Cores</span>
                        <h3 className="mt-0 text-center">2</h3>
                      </div>
                    </div>
                    <div className="card border px-2 py-1 cursor-pointer">
                      <div className="card-body">
                        <span className="">PEX in Refurbish</span>
                        <h3 className="mt-0 text-center">1</h3>
                      </div>
                    </div>
                    <div className="card border px-2 py-1 cursor-pointer">
                      <div className="card-body">
                        <span className="">PEX Requests</span>
                        <h3 className="mt-0 text-center">1</h3>
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
                <TabPanel value="issue" sx={{ marginTop: 0 }}>
                  <ServiceProgressIssueComponent />
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </div>
      </div>
      {showItemDetailsModal && (
        <ItemDetailsModal
          show={showItemDetailsModal}
          hideModal={() => setShowItemDetailsModal(false)}
        />
      )}
    </>
  );
};

export default ServiceProgessMaster;

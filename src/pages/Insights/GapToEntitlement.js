import { useEffect, useState } from "react";
import Select from 'react-select'

import Typography from "@mui/material/Typography";
import { Box, Card, Grid, LinearProgress } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer } from "@mui/x-data-grid";

import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import {
  getGapToEntitlement,
} from "services/dashboardServices";
import ChanceToBuyChart from "./ChanceToBuyChart";
import ServiceTable from "./ServiceTable";




const CustomToolbar = ({ setColumnButtonEl }) => {
  return (
    // <GridToolbarContainer sx={{ justifyContent: 'end' }}>
    //   <GridToolbarColumnsButton ref={setColumnButtonEl} />
    // </GridToolbarContainer>
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      {/* Legend */}
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ padding: '10px', marginRight: '10px' }}>
          <Box display="flex" alignItems="center">
            <Box mr={1} bgcolor="#D06FFF" width={20} height={20} borderRadius={1}></Box>
            <Typography variant="body2">Low</Typography>
          </Box>
        </Box>
        <Box sx={{ padding: '10px', marginRight: '10px' }}>
          <Box display="flex" alignItems="center">
            <Box mr={1} bgcolor="#6C70FE" width={20} height={20} borderRadius={1}></Box>
            <Typography variant="body2">High</Typography>
          </Box>
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Box display="flex" alignItems="center">
            <Box mr={1} bgcolor="#6FD4FF" width={20} height={20} borderRadius={1}></Box>
            <Typography variant="body2">Already Bought</Typography>
          </Box>
        </Box>
      </Box>
      {/* Column selection button */}
      <GridToolbarColumnsButton ref={setColumnButtonEl} />
    </GridToolbarContainer>
  );
}

export default function GapToEntitlement(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [entitlementData, setEntitlementData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [columnButtonEl, setColumnButtonEl] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    customer_group: false,
    customer_segment: false,
    customer_level: false,
    equipment_num: false,
    description: false,
    last_purchase: false,
    recency: false,
    frequency: false,
    transaction_value: false,
    min_discount: false,
    max_discount: false,
    avg_discount: false,
    product_segment: false,
    warranty_availability: false,
    planned_usage: false,
    warranty: false,
    contract: false,
  })
  useEffect(() => {
    setIsLoading(true);
    getGapToEntitlement()
      .then((res) => {
        setEntitlementData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setEntitlementData([]);
        setIsLoading(false);
      });
  }, []);


  const customerDetailColumns = [
    { field: "customer_id", headerName: "Customer ID", width: 100 },
    { field: "customer_name", headerName: "Customer Name", width: 130 },
    { field: "customer_group", headerName: "Customer Group", width: 130 },
    { field: "customer_segment", headerName: "Customer Segment", width: 130 },
    { field: "customer_level", headerName: "Customer Level", width: 130 },
    { field: "last_purchase", headerName: "Last Purchase Date", width: 130 },
    { field: "recency", headerName: "Recency", width: 100 },
    { field: "frequency", headerName: "Frequency", width: 100 },
    { field: "transaction_value", headerName: "Transaction Value", width: 100 },
    { field: "min_discount", headerName: "Min Discount", width: 100 },
    { field: "max_discount", headerName: "Max Discount", width: 100 },
    { field: "avg_discount", headerName: "Avg Discount", width: 100 },
    { field: "equipment_num", headerName: "Equipment #", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    { field: "pm1", headerName: "250 hr PM1", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "pm1_parts", headerName: "250 hr PM1 Kits", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "pm2", headerName: "500 hr PM2", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "pm2_parts", headerName: "500 hr PM2 Kits", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "pm3", headerName: "1000 hr PM3", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "pm4", headerName: "2000 hr PM4", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "services", headerName: "General Services", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "assessments", headerName: "Technical Assessments", width: 130, renderCell: (params) => formatDisplay(params) },
    { field: "maker", headerName: "Maker", width: 130 },
    { field: "maker_serial_num", headerName: "Maker Serial#", width: 130 },
    { field: "model_prefix", headerName: "Model Prefix", width: 130 },
    { field: "model", headerName: "Model", width: 130 },
    { field: "brand", headerName: "Brand", width: 130 },
    { field: "product_segment", headerName: "Product Segment", width: 130 },
    {
      field: "warranty_availability",
      headerName: "Warranty Availability",
      width: 130,
    },
    { field: "planned_usage", headerName: "Planned Usage", width: 130 },
    { field: "warranty", headerName: "Warranty", width: 130 },
    { field: "contract", headerName: "Contract", width: 130 },
  ];

  function formatDisplay(params) {
    let bgColor = params.value === 1 ? "#6FD4FF" : (params.value > 0.5 ? '#6C70FE' : "#D06FFF");
    return (
      <span style={{ fontSize: 12, backgroundColor: bgColor, padding: 5, borderRadius: 5 }}>
        {parseFloat(params.value).toFixed(2)}
      </span>)
  }

  const [currentService, setCurrentService] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentSelectedService, setCurrentSelectedService] = useState(null);

  const serviceRow = [
    {
      id: 0,
      service: "250 hr PM1",
      progress: 71,
      chances: null
    },
    {
      id: 1,
      service: "250 hr PM1 Kits",
      progress: 100,
      chances: null
    },
    {
      id: 2,
      service: "500 hr PM2",
      progress: 99,
      chances: null
    },
    {
      id: 3,
      service: "500 hr PM2 Kits",
      progress: 44,
      chances: null
    },
    {
      id: 4,
      service: "1000 hr PM3",
      progress: 100,
      chances: null
    },
    {
      id: 5,
      service: "2000 hr PM4",
      progress: 100,
      chances: null
    },
    {
      id: 6,
      service: "General Services",
      progress: 69,
      chances: null
    },
    {
      id: 7,
      service: "Technical Assessments",
      progress: 2,
      chances: null
    },
  ];

  const [currentCustomerServices, setCurrentCustomerServices] = useState([...serviceRow]);
  const find_in_perc = (val) => {
    let perc = Math.round(val * 10000) / 100;
    perc = perc.toFixed(2);
    return parseFloat(perc);
  }

  const handleCustomer = (params) => {
    console.log(params.row);
    setCurrentCustomer(params.row);
    serviceRow[0].progress = find_in_perc(params.row.pm1);
    serviceRow[1].progress = find_in_perc(params.row.pm1_parts);
    serviceRow[2].progress = find_in_perc(params.row.pm2);
    serviceRow[3].progress = find_in_perc(params.row.pm2_parts);
    serviceRow[4].progress = find_in_perc(params.row.pm3);
    serviceRow[5].progress = find_in_perc(params.row.pm4);
    serviceRow[6].progress = find_in_perc(params.row.services);
    serviceRow[7].progress = find_in_perc(params.row.assessments);
    setCurrentService({ progress: serviceRow[0].progress, service: '250 hr PM1' });
    setCurrentSelectedService({ value: 0, label: '250 hr PM1' });
    setCurrentCustomerServices(serviceRow);
  }

  const handleSelectService = (selectedOptions) => {
    setCurrentService({ progress: currentCustomerServices[selectedOptions.value].progress, service: selectedOptions.label });
    setCurrentSelectedService({ value: selectedOptions.value, label: selectedOptions.label });
  }

  const options = [
    { value: 0, label: '250 hr PM1' },
    { value: 1, label: '250 hr PM1 Kits' },
    { value: 2, label: '500 hr PM2' },
    { value: 3, label: '500 hr PM2 Kits' },
    { value: 4, label: '1000 hr PM3' },
    { value: 5, label: '2000 hr PM4' },
    { value: 6, label: 'General Services' },
    { value: 7, label: 'Technical Assessments' },
  ];

  return (
    <div>
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: "#f3eafe",
          borderRadius: 5,
          marginBlock: 3,
          padding: 2,
        }}
      >
        {/* <Card
          sx={{
            width: "100%",
            marginInline: "auto",
            paddingInline: 3,
            backgroundColor: "#ffffff",
            borderRadius: 4,
          }}
        > */}
        <Card
          sx={{
            borderRadius: 4,
            height: 700,
            width: "100%",
            margin: 2,
          }}
          variant="outlined"
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600, margin: 2 }}>
            Gap To Entitlement
          </Typography>
          <Box sx={{ height: 500, marginBottom: 5, marginInline: 2 }}>
            <DataGrid
              loading={isLoading}
              sx={GRID_STYLE}
              getRowId={(row) => row.customer_id}

              rows={entitlementData}
              columns={customerDetailColumns}
              columnVisibilityModel={columnVisibilityModel}
              onColumnVisibilityModelChange={(newModel) =>
                setColumnVisibilityModel(newModel)
              }
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 20, 50]}
              components={{
                Toolbar: CustomToolbar,
              }}
              componentsProps={{
                panel: {
                  anchorEl: columnButtonEl,
                  placement: "bottom-end"
                },
                toolbar: {
                  setColumnButtonEl
                }
              }}
              localeText={{ toolbarColumns: "Select Columns" }}
              // checkboxSelection={true}
              keepNonExistentRowsSelected
              onSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              selectionModel={rowSelectionModel}
              onRowClick={handleCustomer}
            />
          </Box>
        </Card>
        {currentCustomer && (
          <Card
            sx={{
              borderRadius: 4,
              height: 'auto',
              width: "100%",
              margin: 2,
            }}
            variant="outlined"
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, 
                marginBottom: 3,
                marginInline: 2,
              }}
            >
              <div style={{ flex: "60%", marginRight: { xs: 0, md: "10px" } }}> 
                <div className="text-light font-size-18 font-weight-600 my-3">
                  {currentCustomer.customer_id}: {currentCustomer.customer_name}
                </div>
                <ServiceTable
                  setCurrentService={setCurrentService}
                  serviceRow={currentCustomerServices}
                  setCurrentSelectedService={setCurrentSelectedService}
                />
              </div>
              <div style={{ flex: "40%", marginLeft: { xs: 0, md: "10px" } }}>
                <Card sx={{ borderRadius: 4, margin: 2, width: "100%" }} variant="outlined">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-light font-size-18 font-weight-600 my-2">Chances of Buying</div>
                    <div className="my-2">
                      <Select
                        options={options}
                        value={currentSelectedService}
                        onChange={handleSelectService}
                        placeholder="Select Option"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <ChanceToBuyChart percentage={currentService.progress} />
                  </div>
                  <div className="d-flex justify-content-center font-size-18 text-light font-weight-600">{currentService.service}</div>
                </Card>
              </div>
            </Box>
          </Card>
        )}

        {/* {currentCustomer && <Card sx={{
          borderRadius: 4,
          height: 420,
          width: "100%",
          margin: 2,
        }} variant="outlined">
          <Box sx={{ display: 'flex', marginBottom: 5, marginInline: 2 }}>
            <div style={{ flex: "60%", marginRight: "10px" }}>
              <div className="text-light font-size-18 font-weight-600 my-3">{currentCustomer.customer_id}: {currentCustomer.customer_name}</div>
              <ServiceTable setCurrentService={setCurrentService} serviceRow={currentCustomerServices} setCurrentSelectedService={setCurrentSelectedService} />
            </div>
            <div style={{ flex: "40%", marginLeft: "10px" }}> 
              <Card sx={{ borderRadius: 4, margin: 2, width: "100%" }} variant="outlined">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-light font-size-18 font-weight-600 my-2">Chances of Buying</div>
                  <div className="my-2">
                    <Select
                      options={options}
                      // defaultValue={options[0]}
                      value={currentSelectedService} 
                      onChange={handleSelectService}
                      placeholder="Select Option"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center"><ChanceToBuyChart percentage={currentService.progress} /></div>
                <div className="d-flex justify-content-center font-size-18 text-light font-weight-600">{currentService.service}</div>
              </Card>
            </div>
          </Box>
        </Card>} */}
      </Grid>
    </div >
  );
}





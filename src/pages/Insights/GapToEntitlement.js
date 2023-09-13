import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, Grid } from "@mui/material";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer } from "@mui/x-data-grid";
import {
  getGapToEntitlement,
} from "services/dashboardServices";

const CustomToolbar = ({ setColumnButtonEl }) => {
  return (
    <GridToolbarContainer sx={{ justifyContent: 'end' }}>
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
    customer_name: false,
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
        // console.log("axios err=", err);
        setEntitlementData([]);
        setIsLoading(false);
      });

    return () => {
      console.log("axios cleanup.");
    };
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
        <Card
          sx={{
            width: "100%",
            marginInline: "auto",
            paddingInline: 3,
            backgroundColor: "#ffffff",
            borderRadius: 4,
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600, marginBlock: 2 }}>
            Gap To Entitlement
          </Typography>
          <Box sx={{ height: 500, marginBottom: 5 }}>
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
              checkboxSelection={true}
              keepNonExistentRowsSelected
              onSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
              }}
              selectionModel={rowSelectionModel}
            />
          </Box>
        </Card>
      </Grid>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, FormControl, Grid } from "@mui/material";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";
import {
  getDiscountColumns,
  getDiscountDetails,
} from "services/dashboardServices";
import SelectBox from "./SelectBox";
import SearchBox from "./SearchBox";

const dummyMarginRecommendationData = [
  {
    index: 0,
    partNumber: "AA:20R4192",
    class: "2X",
    description: "CRANKSHAFT",
    costPrice: "1223215.98",
    // quantity: "4",
    // total: "13020504.0",
    partType: "NEW",
    status: "ACTIVE",
    usage: "Mining",
    machineAge: "New",
    equipmentUsage: "Critical Operation",
    avgAnnualRevenue: ">100000",
    contractOrWarranty: "Yes",
    requiredFor: "Breakdown",
    predictedMargin: "48.6",
  },
  {
    index: 1,
    partNumber: "AA:20R4192",
    class: "2X",
    description: "CRANKSHAFT",
    costPrice: "1223215.98",
    // quantity: "4",
    // total: "13020504.0",
    partType: "NEW",
    status: "ACTIVE",
    usage: "Mining",
    machineAge: "New",
    equipmentUsage: "Critical Operation",
    avgAnnualRevenue: ">100000",
    contractOrWarranty: "Yes",
    requiredFor: "Repair",
    predictedMargin: "44.3",
  },
  {
    index: 2,
    partNumber: "AA:5632124V",
    class: "NN",
    description: "MOTOR VESTIDO 793F",
    costPrice: "1050271.49",
    // quantity: "4",
    // total: "13020504.0",
    partType: "Reman",
    status: "ACTIVE",
    usage: "Construction",
    machineAge: "End of life",
    equipmentUsage: "Non-critical",
    avgAnnualRevenue: "<100000",
    contractOrWarranty: "No",
    requiredFor: "Overhaul",
    predictedMargin: "31.2",
  },
  {
    index: 3,
    partNumber: "AA:5632124V",
    class: "NN",
    description: "MOTOR VESTIDO 793F",
    costPrice: "1050271.49",
    // quantity: "4",
    // total: "13020504.0",
    partType: "Refurbish",
    status: "ACTIVE",
    usage: "Construction",
    machineAge: "Midlife",
    equipmentUsage: "Non-critical",
    avgAnnualRevenue: "<100000",
    contractOrWarranty: "No",
    requiredFor: "Breakdown",
    predictedMargin: "27.5",
  },
  {
    index: 4,
    partNumber: "AA:5632124V",
    class: "NN",
    description: "MOTOR VESTIDO 793F",
    costPrice: "1050271.49",
    // quantity: "4",
    // total: "13020504.0",
    partType: "Reman",
    status: "ACTIVE",
    usage: "Energy",
    machineAge: "End of life",
    equipmentUsage: "Non-critical",
    avgAnnualRevenue: "<100000",
    contractOrWarranty: "No",
    requiredFor: "Overhaul",
    predictedMargin: "21.8",
  },
];

const filterOptions = {
  equipmentUsage: false,
  avgAnnualRevnue: false,
  contractOrWarranty: false,
  requiredFor: false,
};

export default function MarginRecommendation(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [marginRecommendationData, setMarginRecommendationData] = useState([
    ...dummyMarginRecommendationData,
  ]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [customerId, setCustomerId] = useState("1023942");
  const [part, setPart] = useState("");
  const [partType, setPartType] = useState("");
  const [status, setStatus] = useState("");
  const [usage, setUsage] = useState("");
  const [machineAge, setMachineAge] = useState("");
  const [equipmentUsage, setEquipmentUsage] = useState("");
  const [avgAnnualRevnue, setAvgAnnualRevnue] = useState("");
  const [contractOrWarranty, setContractOrWarranty] = useState("");
  const [requiredFor, setRequiredFor] = useState("");
  const [totalCount, setTotalCount] = useState(4);
  const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });

  const [tableType, setTableType] = useState("");
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(filterOptions);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    // fetchDiscountGuidance(page, pageSize);
  }, [
    customerId,
    part,
    partType,
    status,
    usage,
    machineAge,
    equipmentUsage,
    avgAnnualRevnue,
    contractOrWarranty,
    requiredFor,
  ]);
  // useEffect(() => {
  // }, [columns])
  const fetchDiscountGuidanceCol = () => {
    // setIsLoading(true);
    // getDiscountColumns().then(discountCols => {
    //     discountCols.map(indColumn =>
    //         columns.push({ field: indColumn.fieldName, headerName: indColumn.columnName, flex: 1 })
    //     )
    fetchDiscountGuidance(page + 1, pageSize);
    // }).catch(e => {

    // })
  };

  const fetchDiscountGuidance = async (pageNo, rowsPerPage) => {
    setPage(pageNo);
    setPageSize(rowsPerPage);
    let sort = sortDetail.sortColumn
      ? `&sortColumn=${sortDetail.sortColumn}&orderBY=${sortDetail.orderBy}`
      : "";
    // let filter = filterQuery ? `&search=${filterQuery}` : "";
    // const query = `pageNumber=${pageNo}&pageSize=${rowsPerPage}${sort}${filter}`;
    const filter =
      `customer_id=${customerId}` +
      (part ? `&part=${part}` : "") +
      (partType ? `&partType=${partType}` : "") +
      (status ? `&status=${status}` : "") +
      (usage ? `&usage=${usage}` : "") +
      (machineAge ? `&machineAge=${machineAge}` : "") +
      (equipmentUsage ? `&equipmentUsage=${equipmentUsage}` : "") +
      (avgAnnualRevnue ? `&avgAnnualRevnue=${avgAnnualRevnue}` : "") +
      (contractOrWarranty ? `&contractOrWarranty=${contractOrWarranty}` : "") +
      (requiredFor ? `&requiredFor=${requiredFor}` : "");
    const query = `${filter}&pagenumber=${
      pageNo + 1
    }&pagesize=${rowsPerPage}${sort}`;

    await getDiscountDetails(query)
      .then((discountResult) => {
        setTotalCount(discountResult[0].number_of_rows);
        setMarginRecommendationData(discountResult[0].data);
      })
      .catch((err) => {
        props.handleSnack(
          "error",
          "Error occured while fetching discount details"
        );
        setMarginRecommendationData([]);
      });
    setIsLoading(false);
  };

  const customerDetailColumns = [
    { field: "partNumber", headerName: "Part #", flex: 1, defaultShow: true },
    { field: "class", headerName: "Class", flex: 1, defaultShow: true },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "costPrice",
      headerName: "Cost Price",
      flex: 1,
      defaultShow: true,
    },
    { field: "partType", headerName: "Part Type", width: 80 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "usage", headerName: "Usage", width: 80 },
    { field: "machineAge", headerName: "Machine Age", width: 80 },
    { field: "equipmentUsage", headerName: "Equipment Usage", flex: 1 },
    { field: "avgAnnualRevenue", headerName: "Avg Annual Revenue", flex: 1 },
    {
      field: "contractOrWarranty",
      headerName: "Contract or Warranty",
      flex: 1,
    },
    { field: "requiredFor", headerName: "Required For", flex: 1 },
    {
      field: "predictedMargin",
      headerName: "Predicted Margin",
      flex: 1,
      cellClassName: "fw-bolder",
      defaultShow: true,
    },
    // { field: "quantity", headerName: "Quantity", flex: 1 },
    // { field: "total", headerName: "Total", flex: 1 },
  ];

  const premiumTableColumns = [
    { field: "partNumber", headerName: "Part #", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "costPrice", headerName: "Cost Price", flex: 1 },
    { field: "partType", headerName: "Part Type", width: 80 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "usage", headerName: "Usage", width: 80 },
    { field: "machineAge", headerName: "Machine Age", width: 80 },
    { field: "equipmentUsage", headerName: "Equipment Usage", flex: 1 },
    { field: "avgAnnualRevenue", headerName: "Avg Annual Revenue", flex: 1 },
    {
      field: "contractOrWarranty",
      headerName: "Contract or Warranty",
      flex: 1,
    },
    { field: "requiredFor", headerName: "Required For", flex: 1 },
    {
      field: "predictedMargin",
      headerName: "Predicted Margin",
      flex: 1,
      cellClassName: "fw-bolder",
    },
  ];

  const standardTableColumns = [
    { field: "partNumber", headerName: "Part #", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "costPrice", headerName: "Cost Price", flex: 1 },
    { field: "machineAge", headerName: "Machine Age", width: 80 },
    { field: "equipmentUsage", headerName: "Equipment Usage", flex: 1 },
    { field: "buyerType", headerName: "Buyer Type", width: 80 },
    { field: "avgAnnualRevenue", headerName: "Avg Annual Revenue", flex: 1 },
    { field: "requiredFor", headerName: "Required For", flex: 1 },
    {
      field: "predictedMargin",
      headerName: "Predicted Margin",
      flex: 1,
      cellClassName: "fw-bolder",
    },
  ];

  const ordinaryTableColumns = [
    { field: "partNumber", headerName: "Part #", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "costPrice", headerName: "Cost Price", flex: 1 },
    { field: "requiredFor", headerName: "Required For", flex: 1 },
    {
      field: "predictedMargin",
      headerName: "Predicted Margin",
      flex: 1,
      cellClassName: "fw-bolder",
    },
  ];

  const orderOptions = ["Planned", "Breakdown"];
  const partTypeOptions = ["New", "Reman", "Refurbish"];
  const statusOptions = ["Active", "Discontinued", "Inactivate"];
  const usageOptions = ["Mining", "Construction", "Energy", "Marine", "Any"];
  const machineAgeOptions = ["End of life", "Midlife", "New"];
  const equipmentUsageOptions = ["Critical Operation", "Non-critical"];
  const avgAnnualRevnueOptions = ["<100000", ">100000"];
  const contractOrWarrantyOptions = ["Yes", "No"];
  const requiredForOptions = [
    "Breakdown",
    "Overhaul",
    "Scheduled Maintenance",
    "Repair",
  ];

  const tablesNameOption = ["Premium", "Standard", "Ordinary"];

  // table Type Change
  const handleChangeTableType = (e) => {
    setPart("");
    setPartType("");
    setStatus("");
    setUsage("");
    setMachineAge("");
    setEquipmentUsage("");
    setAvgAnnualRevnue("");
    setContractOrWarranty("");
    setRequiredFor("");
    setTableType(e.target.value);
    setShowMoreFilter(false);
    setShowFilters(filterOptions);
  };

  const handleMoreFilters = () => {
    setShowFilters({
      equipmentUsage: equipmentUsage ? true : !showFilters.equipmentUsage,
      avgAnnualRevnue: avgAnnualRevnue ? true : !showFilters.avgAnnualRevnue,
      contractOrWarranty: contractOrWarranty
        ? true
        : !showFilters.contractOrWarranty,
      requiredFor: requiredFor ? true : !showFilters.requiredFor,
    });
    setShowMoreFilter(!showMoreFilter);
  };

  const showPremiumTableColumns = useCallback(() => {
    const hideColumns = [
      "partType",
      "status",
      "usage",
      "machineAge",
      // "equipmentUsage",
      // "avgAnnualRevenue",
      // "contractOrWarranty",
      // "requiredFor",
    ];
    const newColumns = customerDetailColumns.map((columns) => ({
      ...columns,
      hide: columns.defaultShow
        ? false
        : tableType === ""
        ? true
        : hideColumns.includes(columns.field)
        ? false
        : showFilters[columns.field]
        ? false
        : true,
    }));
    console.log("newColumns ---- ", newColumns);
    return newColumns;
  }, [tableType, showFilters]);

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
            borderRadius: 4,
            minHeight: 700,
            width: "100%",
            margin: 2,
          }}
          variant="outlined"
        >
          <Typography sx={{ fontSize: 16, fontWeight: 600, margin: 2 }}>
            Margin Recommendation
          </Typography>
          <Box
            sx={{
              marginBottom: 2,
              marginInline: 2,
              borderBottom: "1px solid #5c5c5cb3",
            }}
          >
            <SearchBox
              label={"Search Part"}
              value={part}
              handleChange={(e) => setPart(e.target.value)}
              size={250}
            />
            <SelectBox
              label={"Table Type"}
              value={tableType}
              options={tablesNameOption}
              // handleChange={(e) => setTableType(e.target.value)}
              handleChange={handleChangeTableType}
              showClearIcon={true}
              handleUnselect={() => setTableType("")}
            />
          </Box>
          {(tableType === "" || tableType === "Premium") && (
            <Box
              sx={{
                height: 500,
                marginBottom: 5,
                marginInline: 2,
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>
                Premium Table
              </Typography>
              {tableType === "Premium" && (
                <>
                  <SelectBox
                    label={"Part Type"}
                    value={partType}
                    options={partTypeOptions}
                    handleChange={(e) => setPartType(e.target.value)}
                    showClearIcon={true}
                    handleUnselect={() => setPartType("")}
                  />
                  <SelectBox
                    label={"Status"}
                    value={status}
                    options={statusOptions}
                    handleChange={(e) => setStatus(e.target.value)}
                    showClearIcon={true}
                    handleUnselect={() => setStatus("")}
                  />
                  <SelectBox
                    label={"Usage"}
                    value={usage}
                    options={usageOptions}
                    handleChange={(e) => setUsage(e.target.value)}
                    showClearIcon={true}
                    handleUnselect={() => setUsage("")}
                  />
                  <SelectBox
                    label={"Machine Age"}
                    value={machineAge}
                    options={machineAgeOptions}
                    handleChange={(e) => setMachineAge(e.target.value)}
                    size={150}
                    showClearIcon={true}
                    handleUnselect={() => setMachineAge("")}
                  />
                  {showFilters.equipmentUsage && (
                    <SelectBox
                      label={"Equipment Usage"}
                      value={equipmentUsage}
                      options={equipmentUsageOptions}
                      handleChange={(e) => setEquipmentUsage(e.target.value)}
                      size={180}
                      showClearIcon={true}
                      handleUnselect={() => setEquipmentUsage("")}
                    />
                  )}
                  {showFilters.avgAnnualRevnue && (
                    <SelectBox
                      label={"Avg Annual Revenue"}
                      value={avgAnnualRevnue}
                      options={avgAnnualRevnueOptions}
                      handleChange={(e) => setAvgAnnualRevnue(e.target.value)}
                      size={190}
                      showClearIcon={true}
                      handleUnselect={() => setAvgAnnualRevnue("")}
                    />
                  )}
                  {showFilters.contractOrWarranty && (
                    <SelectBox
                      label={"Contract or Warranty"}
                      value={contractOrWarranty}
                      options={contractOrWarrantyOptions}
                      handleChange={(e) =>
                        setContractOrWarranty(e.target.value)
                      }
                      size={190}
                      showClearIcon={true}
                      handleUnselect={() => setContractOrWarranty("")}
                    />
                  )}
                  {showFilters.requiredFor && (
                    <SelectBox
                      label={"Required For"}
                      value={requiredFor}
                      options={requiredForOptions}
                      handleChange={(e) => setRequiredFor(e.target.value)}
                      size={150}
                      showClearIcon={true}
                      handleUnselect={() => setRequiredFor("")}
                    />
                  )}
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Button
                      // onClick={() => setShowMoreFilter(true)}
                      onClick={handleMoreFilters}
                      variant="contained"
                      size={"small"}
                      sx={{ backgroundColor: "#872FF7", color: "#FFFFFF" }}
                    >
                      {`${showMoreFilter ? "Less" : "More"} Filters ${
                        showMoreFilter ? "-" : "+"
                      }`}
                    </Button>
                  </FormControl>
                </>
              )}
              <DataGrid
                loading={isLoading}
                sx={GRID_STYLE}
                getRowId={(row) => row.index}
                page={page}
                pageSize={pageSize}
                onPageChange={(newPage) =>
                  fetchDiscountGuidance(newPage, pageSize)
                }
                onPageSizeChange={(newPageSize) =>
                  fetchDiscountGuidance(page, newPageSize)
                }
                rows={marginRecommendationData}
                // columns={customerDetailColumns}
                columns={showPremiumTableColumns()}
                // columns={columns}
                // columnVisibilityModel={columnVisibilityModel}
                // onColumnVisibilityModelChange={(newModel) =>
                //     setColumnVisibilityModel(newModel)
                // }
                rowsPerPageOptions={[10, 20, 50]}
                paginationMode="server"
                rowCount={totalCount}
                // components={{
                //     Toolbar: CustomToolbar,
                // }}
                // componentsProps={{
                //     panel: {
                //         anchorEl: columnButtonEl,
                //         placement: "bottom-end"
                //     },
                //     toolbar: {
                //         setColumnButtonEl
                //     }
                // }}
                // localeText={{ toolbarColumns: "Select Columns" }}
                checkboxSelection={true}
                keepNonExistentRowsSelected
                onSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                selectionModel={rowSelectionModel}
              />
            </Box>
          )}
          {(tableType === "" || tableType === "Standard") && (
            <Box sx={{ height: 500, marginBottom: 5, marginInline: 2 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>
                Standard Table
              </Typography>
              {tableType === "Standard" && (
                <>
                  <SelectBox
                    label={"Part Type"}
                    value={partType}
                    options={partTypeOptions}
                    handleChange={(e) => setPartType(e.target.value)}
                    showClearIcon={true}
                    handleUnselect={() => setPartType("")}
                  />
                  <SelectBox
                    label={"Status"}
                    value={status}
                    options={statusOptions}
                    handleChange={(e) => setStatus(e.target.value)}
                    showClearIcon={true}
                    handleUnselect={() => setStatus("")}
                  />
                  <SelectBox
                    label={"Usage"}
                    value={usage}
                    options={usageOptions}
                    handleChange={(e) => setUsage(e.target.value)}
                    showClearIcon={true}
                    handleUnselect={() => setUsage("")}
                  />
                  <SelectBox
                    label={"Machine Age"}
                    value={machineAge}
                    options={machineAgeOptions}
                    handleChange={(e) => setMachineAge(e.target.value)}
                    size={150}
                    showClearIcon={true}
                    handleUnselect={() => setMachineAge("")}
                  />
                  {showFilters.equipmentUsage && (
                    <SelectBox
                      label={"Equipment Usage"}
                      value={equipmentUsage}
                      options={equipmentUsageOptions}
                      handleChange={(e) => setEquipmentUsage(e.target.value)}
                      size={180}
                      showClearIcon={true}
                      handleUnselect={() => setEquipmentUsage("")}
                    />
                  )}
                  {showFilters.avgAnnualRevnue && (
                    <SelectBox
                      label={"Avg Annual Revenue"}
                      value={avgAnnualRevnue}
                      options={avgAnnualRevnueOptions}
                      handleChange={(e) => setAvgAnnualRevnue(e.target.value)}
                      size={190}
                      showClearIcon={true}
                      handleUnselect={() => setAvgAnnualRevnue("")}
                    />
                  )}
                  {showFilters.contractOrWarranty && (
                    <SelectBox
                      label={"Contract or Warranty"}
                      value={contractOrWarranty}
                      options={contractOrWarrantyOptions}
                      handleChange={(e) =>
                        setContractOrWarranty(e.target.value)
                      }
                      size={190}
                      showClearIcon={true}
                      handleUnselect={() => setContractOrWarranty("")}
                    />
                  )}
                  {showFilters.requiredFor && (
                    <SelectBox
                      label={"Required For"}
                      value={requiredFor}
                      options={requiredForOptions}
                      handleChange={(e) => setRequiredFor(e.target.value)}
                      size={150}
                      showClearIcon={true}
                      handleUnselect={() => setRequiredFor("")}
                    />
                  )}
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Button
                      // onClick={() => setShowMoreFilter(true)}
                      onClick={handleMoreFilters}
                      variant="contained"
                      sx={{ backgroundColor: "#872FF7", color: "#FFFFFF" }}
                    >
                      {`${showMoreFilter ? "Less" : "More"} Filters ${
                        showMoreFilter ? "-" : "+"
                      }`}
                    </Button>
                  </FormControl>
                </>
              )}
              <DataGrid
                loading={isLoading}
                sx={GRID_STYLE}
                getRowId={(row) => row.index}
                page={page}
                pageSize={pageSize}
                onPageChange={(newPage) =>
                  fetchDiscountGuidance(newPage, pageSize)
                }
                onPageSizeChange={(newPageSize) =>
                  fetchDiscountGuidance(page, newPageSize)
                }
                rows={marginRecommendationData}
                columns={standardTableColumns}
                // columns={columns}
                // columnVisibilityModel={columnVisibilityModel}
                // onColumnVisibilityModelChange={(newModel) =>
                //     setColumnVisibilityModel(newModel)
                // }
                rowsPerPageOptions={[10, 20, 50]}
                paginationMode="server"
                rowCount={totalCount}
                // components={{
                //     Toolbar: CustomToolbar,
                // }}
                // componentsProps={{
                //     panel: {
                //         anchorEl: columnButtonEl,
                //         placement: "bottom-end"
                //     },
                //     toolbar: {
                //         setColumnButtonEl
                //     }
                // }}
                // localeText={{ toolbarColumns: "Select Columns" }}
                checkboxSelection={true}
                keepNonExistentRowsSelected
                onSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                selectionModel={rowSelectionModel}
              />
            </Box>
          )}
          {(tableType === "" || tableType === "Ordinary") && (
            <Box sx={{ height: 500, marginBottom: 5, marginInline: 2 }}>
              <Typography sx={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>
                Ordinary Table
              </Typography>
              <DataGrid
                loading={isLoading}
                sx={GRID_STYLE}
                getRowId={(row) => row.index}
                page={page}
                pageSize={pageSize}
                onPageChange={(newPage) =>
                  fetchDiscountGuidance(newPage, pageSize)
                }
                onPageSizeChange={(newPageSize) =>
                  fetchDiscountGuidance(page, newPageSize)
                }
                rows={marginRecommendationData}
                columns={ordinaryTableColumns}
                // columns={columns}
                // columnVisibilityModel={columnVisibilityModel}
                // onColumnVisibilityModelChange={(newModel) =>
                //     setColumnVisibilityModel(newModel)
                // }
                rowsPerPageOptions={[10, 20, 50]}
                paginationMode="server"
                rowCount={totalCount}
                // components={{
                //     Toolbar: CustomToolbar,
                // }}
                // componentsProps={{
                //     panel: {
                //         anchorEl: columnButtonEl,
                //         placement: "bottom-end"
                //     },
                //     toolbar: {
                //         setColumnButtonEl
                //     }
                // }}
                // localeText={{ toolbarColumns: "Select Columns" }}
                checkboxSelection={true}
                keepNonExistentRowsSelected
                onSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                selectionModel={rowSelectionModel}
              />
            </Box>
          )}
        </Card>
      </Grid>
    </div>
  );
}

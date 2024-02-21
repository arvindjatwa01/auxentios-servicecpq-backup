import { useCallback, useEffect, useState } from "react";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Box, Button, Card, Divider, FormControl, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";

import {
  getMarginRecommendationClassA,
  getMarginRecommendationClassB,
  getMarginRecommendationClassC,
} from "services/dashboardServices";
import SelectBox from "./SelectBox";
import SearchBox from "./SearchBox";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";

const filterOptions = {
  part_type: false,
  status: false,
  usage_area: false,
  machine_age: false,
  equipment_usage: false,
  avg_annual_revenue: false,
  contract_or_warranty: false,
  required_for: false,
};

const orderOptions = ["Planned", "Breakdown"];
const partTypeOptions = ["New", "Reman", "Refurbish"];
const statusOptions = ["Active", "Discontinued", "Inactivate"];
const usageOptions = ["Mining", "Construction", "Energy", "Marine", "Any"];
const machineAgeOptions = ["End_of_life", "Mid_life", "New"];
const equipmentUsageOptions = ["Critical_Operation", "Non-critical"];
const avgAnnualRevnueOptions = ["<100000", ">100000"];
const contractOrWarrantyOptions = ["Yes", "No"];
const requiredForOptions = [
  "Breakdown",
  "Overhaul",
  "Scheduled_Maintenance",
  "Repair",
];
const partClassOptions = ["A Class", "B Class", "C Class"];

export default function MarginRecommendation() {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [partClass, setPartClass] = useState("");

  const [partClassALoading, setPartClassALoading] = useState(false);
  const [partClassATotlaRecord, setPartClassATotlaRecord] = useState(0);
  const [partClassAPageNo, setPartClassAPageNo] = useState(0);
  const [partClassAPageSize, setPartClassAPageSize] = useState(10);
  const [partClassARecords, setPartClassARecords] = useState([]);

  const [partClassBLoading, setPartClassBLoading] = useState(false);
  const [partClassBTotlaRecord, setPartClassBTotlaRecord] = useState(0);
  const [partClassBPageNo, setPartClassBPageNo] = useState(0);
  const [partClassBPageSize, setPartClassBPageSize] = useState(10);
  const [partClassBRecords, setPartClassBRecords] = useState([]);

  const [partClassCLoading, setPartClassCLoading] = useState(false);
  const [partClassCTotlaRecord, setPartClassCTotlaRecord] = useState(0);
  const [partClassCPageNo, setPartClassCPageNo] = useState(0);
  const [partClassCPageSize, setPartClassCPageSize] = useState(10);
  const [partClassCRecords, setPartClassCRecords] = useState([]);

  const [partNumber, setPartNumber] = useState("");
  const [partType, setPartType] = useState("");
  const [status, setStatus] = useState("");
  const [usage, setUsage] = useState("");
  const [machineAge, setMachineAge] = useState("");
  const [equipmentUsage, setEquipmentUsage] = useState("");
  const [avgAnnualRevnue, setAvgAnnualRevnue] = useState("");
  const [contractOrWarranty, setContractOrWarranty] = useState("");
  const [requiredFor, setRequiredFor] = useState("");

  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(filterOptions);
  const [visiableColumns, setVisiableColumns] = useState(filterOptions);
  const [showAllAClassPartsColumns, setShowAllAClassPartsColumns] =
    useState(false);
  const [showAllBClassPartsColumns, setShowAllBClassPartsColumns] =
    useState(false);

  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  // toast message error & info handler
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  useEffect(() => {
    setVisiableColumns({
      ...visiableColumns,
      part_type: partType ? true : false,
      status: status ? true : false,
      usage_area: usage ? true : false,
      machine_age: machineAge ? true : false,
      equipment_usage: equipmentUsage ? true : false,
      avg_annual_revenue: avgAnnualRevnue ? true : false,
      contract_or_warranty: contractOrWarranty ? true : false,
      required_for: requiredFor ? true : false,
    });
  }, [
    partType,
    status,
    usage,
    machineAge,
    equipmentUsage,
    avgAnnualRevnue,
    contractOrWarranty,
    requiredFor,
  ]);

  useEffect(() => {
    if (partClass === "" || partClass === "A Class") {
      fetchPartClassARecords(partClassAPageNo, partClassAPageSize);
    }

    if (partClass === "" || partClass === "B Class") {
      fetchPartClassBRecords(partClassBPageNo, partClassBPageSize);
    }

    if (partClass === "" || partClass === "C Class") {
      fetchPartClassCRecords(partClassCPageNo, partClassCPageSize);
    }
  }, [
    partClass,
    partNumber,
    partType,
    status,
    usage,
    machineAge,
    equipmentUsage,
    avgAnnualRevnue,
    contractOrWarranty,
    requiredFor,
  ]);

  // fetch Part Class A Records
  const fetchPartClassARecords = useCallback(
    async (pageNo, rowsPerPage) => {
      setPartClassAPageNo(pageNo);
      setPartClassAPageSize(rowsPerPage);
      setPartClassALoading(true);
      const filter =
        (partNumber ? `&part_number=${partNumber}` : "") +
        (partType ? `&part_type=${partType}` : "") +
        (status ? `&status=${status}` : "") +
        (usage ? `&usage_area=${usage}` : "") +
        (machineAge ? `&machine_age=${machineAge}` : "") +
        (equipmentUsage ? `&equipment_usage=${equipmentUsage}` : "") +
        (avgAnnualRevnue ? `&avg_annual_revenue=${avgAnnualRevnue}` : "") +
        (contractOrWarranty
          ? `&contract_or_warranty=${contractOrWarranty}`
          : "") +
        (requiredFor ? `&required_for=${requiredFor}` : "");

      const reqUrl = `${filter}&pagenumber=${
        pageNo + 1
      }&pagesize=${rowsPerPage}`;
      await getMarginRecommendationClassA(reqUrl)
        .then((response) => {
          setPartClassATotlaRecord(response.number_of_rows);
          setPartClassARecords(response.data);
        })
        .catch((err) => {
          handleSnack(
            "error",
            "Error occured while fetching Part Class A details"
          );
          setPartClassARecords([]);
        });
      setPartClassALoading(false);
    },
    [
      partClass,
      partNumber,
      partType,
      status,
      usage,
      machineAge,
      equipmentUsage,
      avgAnnualRevnue,
      contractOrWarranty,
      requiredFor,
    ]
  );

  // fetch B Class Records
  const fetchPartClassBRecords = async (pageNo, rowsPerPage) => {
    setPartClassBPageNo(pageNo);
    setPartClassBPageSize(rowsPerPage);
    setPartClassBLoading(true);
    const filter =
      (partNumber ? `&part_number=${partNumber}` : "") +
      // (partType ? `&part_type=${partType}` : "") +
      // (status ? `&status=${status}` : "") +
      // (usage ? `&usage_area=${usage}` : "") +
      (machineAge ? `&machine_age=${machineAge}` : "") +
      (equipmentUsage ? `&equipment_usage=${equipmentUsage}` : "") +
      (avgAnnualRevnue ? `&avg_annual_revenue=${avgAnnualRevnue}` : "") +
      // (contractOrWarranty
      //   ? `&contract_or_warranty=${contractOrWarranty}`
      //   : "") +
      (requiredFor ? `&required_for=${requiredFor}` : "");

    const reqUrl = `${filter}&pagenumber=${pageNo + 1}&pagesize=${rowsPerPage}`;
    await getMarginRecommendationClassB(reqUrl)
      .then((response) => {
        setPartClassBTotlaRecord(response.number_of_rows);
        setPartClassBRecords(response.data);
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occured while fetching Part Class B details"
        );
        setPartClassBRecords([]);
      });
    setPartClassBLoading(false);
  };

  // fetch C Class Records
  const fetchPartClassCRecords = async (pageNo, rowsPerPage) => {
    setPartClassCPageNo(pageNo);
    setPartClassCPageSize(rowsPerPage);
    setPartClassCLoading(true);
    const filter = partNumber ? `&part_number=${partNumber}` : "";

    const reqUrl = `${filter}&pagenumber=${pageNo + 1}&pagesize=${rowsPerPage}`;
    await getMarginRecommendationClassC(reqUrl)
      .then((response) => {
        setPartClassCTotlaRecord(response.number_of_rows);
        setPartClassCRecords(response.data);
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occured while fetching Part Class C details"
        );
        setPartClassCRecords([]);
      });
    setPartClassCLoading(false);
  };

  // Part Class A Table Columns
  const partClassATableColumns = [
    {
      field: "part_number",
      headerName: "Part #",
      flex: 1,
      defaultShow: true,
      renderCell: (params) => (
        <div style={{ fontWeight: "bold" }}>{params.value}</div>
      ),
    },
    {
      field: "part_class",
      headerName: "Class",
      flex: 1,
      width: 80,
      defaultShow: true,
    },
    {
      field: "part_description",
      headerName: "Description",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "cost_price",
      headerName: "Cost Price",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "total_transaction",
      headerName: "Total Transaction",
      flex: 1,
      defaultShow: true,
    },
    { field: "part_type", headerName: "Part Type", width: 80 },
    { field: "status", headerName: "Status", width: 80 },
    { field: "usage_area", headerName: "Usage", width: 80 },
    { field: "machine_age", headerName: "Machine Age", width: 80 },
    { field: "equipment_usage", headerName: "Equipment Usage", flex: 1 },
    { field: "avg_annual_revenue", headerName: "Avg Annual Revenue", flex: 1 },
    {
      field: "contract_or_warranty",
      headerName: "Contract or Warranty",
      flex: 1,
    },
    { field: "required_for", headerName: "Required For", flex: 1 },
    {
      field: "predicted_margin",
      headerName: "Predicted Margin",
      flex: 1,
      cellClassName: "fw-bolder",
      defaultShow: true,
      renderCell: (params) => formatDisplay(params),
      align: "center",
    },
  ];

  // part Class B Table Columns
  const partClassBTableColumns = [
    {
      field: "part_number",
      headerName: "Part #",
      flex: 1,
      defaultShow: true,
      renderCell: (params) => (
        <div style={{ fontWeight: "bold" }}>{params.value}</div>
      ),
    },
    {
      field: "part_class",
      headerName: "Class",
      flex: 1,
      width: 80,
      defaultShow: true,
    },
    {
      field: "part_description",
      headerName: "Description",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "cost_price",
      headerName: "Cost Price",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "total_transaction",
      headerName: "Total Transaction",
      flex: 1,
      defaultShow: true,
    },
    { field: "machine_age", headerName: "Machine Age", width: 80 },
    { field: "equipment_usage", headerName: "Equipment Usage", flex: 1 },
    {
      field: "buyer_type",
      headerName: "Buyer Type",
      width: 80,
      defaultShow: true,
    },
    { field: "avg_annual_revenue", headerName: "Avg Annual Revenue", flex: 1 },
    { field: "required_for", headerName: "Required For", flex: 1 },
    {
      field: "predicted_margin",
      headerName: "Predicted Margin",
      flex: 1,
      cellClassName: "fw-bolder",
      defaultShow: true,
      renderCell: (params) => formatDisplay(params),
      align: "center",
    },
  ];

  // Part Class C Table Columns
  const partClassCTableColumns = [
    {
      field: "part_number",
      headerName: "Part #",
      flex: 1,
      renderCell: (params) => (
        <div style={{ fontWeight: "bold" }}>{params.value}</div>
      ),
    },
    { field: "part_class", headerName: "Class", flex: 1 },
    { field: "part_description", headerName: "Description", flex: 1 },
    { field: "cost_price", headerName: "Cost Price", flex: 1 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      defaultShow: true,
    },
    {
      field: "total_transaction",
      headerName: "Total Transaction",
      flex: 1,
      defaultShow: true,
    },
    // { field: "required_for", headerName: "Required For", flex: 1 },
    // {
    //   field: "predicted_margin",
    //   headerName: "Predicted Margin",
    //   flex: 1,
    //   renderCell: (params) => formatDisplay(params),
    //   align: "center",
    // },
    {
      field: "fix_margin",
      headerName: "Fix Margin",
      flex: 1,
      renderCell: (params) =>
        params.field === "fix_margin" && (
          <span
            style={{
              fontSize: 12,
              backgroundColor: "#6FD4FF",
              padding: 5,
              borderRadius: 5,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {parseFloat(params.value).toFixed(2)}
          </span>
        ),
      align: "center",
    },
  ];

  // format design for predected Margin Columns values
  const formatDisplay = (params) => {
    if (params.field === "predicted_margin") {
      return (
        <span
          style={{
            fontSize: 12,
            backgroundColor: "#6FD4FF",
            padding: 5,
            borderRadius: 5,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {parseFloat(params.value).toFixed(2)}
        </span>
      );
    }
  };

  // table Type Change
  const handleChangeTableType = (e) => {
    setPartNumber("");
    setPartType("");
    setStatus("");
    setUsage("");
    setMachineAge("");
    setEquipmentUsage("");
    setAvgAnnualRevnue("");
    setContractOrWarranty("");
    setRequiredFor("");
    setPartClass(e.target.value);
    setShowMoreFilter(false);
    setShowFilters(filterOptions);
    setVisiableColumns(filterOptions);
  };

  // show more filter options
  const handleMoreFilters = () => {
    setShowFilters({
      ...showFilters,
      part_type: partType ? true : !showFilters.part_type,
      status: status ? true : !showFilters.status,
      usage_area: usage ? true : !showFilters.usage_area,
      machine_age: machineAge ? true : !showFilters.machine_age,
      equipment_usage: equipmentUsage ? true : !showFilters.equipment_usage,
      avg_annual_revenue: avgAnnualRevnue
        ? true
        : !showFilters.avg_annual_revenue,
      contract_or_warranty: contractOrWarranty
        ? true
        : !showFilters.contract_or_warranty,
      required_for: requiredFor ? true : !showFilters.required_for,
    });
    setShowMoreFilter(!showMoreFilter);
  };

  // Show Margin Class A Table Columns accoding to Filter
  const showMarginClassATableColumns = useCallback(() => {
    if (partClass === "" || partClass === "A Class") {
      const updatedColumns = partClassATableColumns.map((column) => ({
        ...column,
        hide: showAllAClassPartsColumns
          ? false
          : column.defaultShow
          ? false
          : visiableColumns[`${column.field}`] !== undefined
          ? !visiableColumns[`${column.field}`]
          : true,
      }));
      return updatedColumns;
    }
  }, [showAllAClassPartsColumns, partClass, visiableColumns]);

  // Show  Margin Class B Table Columns accoding to Filter
  const showMarginClassBTableColums = useCallback(() => {
    if (partClass === "" || partClass === "B Class") {
      // const hideColumns = ["partType", "status", "usage", "machineAge"];
      // const newColumns = partClassBTableColumns.map((columns) => ({
      //   ...columns,
      //   hide: showAllBClassPartsColumns
      //     ? false
      //     : columns.defaultShow
      //     ? false
      //     : partClass === ""
      //     ? true
      //     : hideColumns.includes(columns.field)
      //     ? false
      //     : showFilters[columns.field]
      //     ? false
      //     : true,
      // }));
      // return newColumns;

      const updatedColumns = partClassBTableColumns.map((column) => ({
        ...column,
        hide: showAllBClassPartsColumns
          ? false
          : column.defaultShow
          ? false
          : visiableColumns[`${column.field}`] !== undefined
          ? !visiableColumns[`${column.field}`]
          : true,
      }));
      return updatedColumns;
    }
  }, [showAllBClassPartsColumns, partClass, visiableColumns]);

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
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
            <Typography sx={{ fontSize: 18, fontWeight: 600, margin: 2 }}>
              Margin Recommendation
            </Typography>
            <Box
              sx={{
                marginBottom: 1,
                marginInline: 2,
                // borderBottom: "1px solid #5c5c5cb3",
              }}
            >
              <SearchBox
                label={"Search Part"}
                value={partNumber}
                handleChange={(e) => setPartNumber(e.target.value)}
                size={250}
              />
              <SelectBox
                label={"Part Class"}
                value={partClass}
                options={partClassOptions}
                // handleChange={(e) => setPartClass(e.target.value)}
                handleChange={handleChangeTableType}
                showClearIcon={true}
                handleUnselect={() => setPartClass("")}
              />
            </Box>
            <Divider component="li" />
            {(partClass === "" || partClass === "A Class") && (
              <Box
                sx={{
                  height: 500,
                  marginBottom: 8,
                  marginInline: 2,
                  paddingBottom: 12,
                }}
              >
                <div className="d-flex justify-content-between">
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}
                  >
                    A Class Parts
                  </Typography>
                  {(partClass === "" || partClass === "A Class") && (
                    <Button
                      variant="contained"
                      sx={{ marginTop: 2, backgroundColor: "#872ff7" }}
                      onClick={() =>
                        setShowAllAClassPartsColumns(!showAllAClassPartsColumns)
                      }
                      size="small"
                      endIcon={
                        showAllAClassPartsColumns ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )
                      }
                    >
                      {showAllAClassPartsColumns ? "Minimize " : "Show All "}
                      Columns
                    </Button>
                  )}
                </div>
                {partClass === "A Class" && (
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
                    {(showMoreFilter || showFilters.equipment_usage) && (
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
                    {(showMoreFilter || showFilters.avg_annual_revenue) && (
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
                    {(showMoreFilter || showFilters.contract_or_warranty) && (
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
                    {(showMoreFilter || showFilters.required_for) && (
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
                  loading={partClassALoading}
                  sx={GRID_STYLE}
                  getRowId={(row) => row.index}
                  page={partClassAPageNo}
                  pageSize={partClassAPageSize}
                  onPageChange={(newPage) =>
                    fetchPartClassARecords(newPage, partClassAPageSize)
                  }
                  onPageSizeChange={(newPageSize) =>
                    fetchPartClassARecords(partClassAPageNo, newPageSize)
                  }
                  rows={partClassARecords}
                  columns={showMarginClassATableColumns()}
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  rowCount={partClassATotlaRecord}
                  checkboxSelection={true}
                  keepNonExistentRowsSelected
                  onSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  selectionModel={rowSelectionModel}
                />
              </Box>
            )}
            {(partClass === "" || partClass === "B Class") && (
              <Box sx={{ height: 500, marginBottom: 8, marginInline: 2 }}>
                <div className="d-flex justify-content-between">
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}
                  >
                    B Class Parts
                  </Typography>
                  {(partClass === "" || partClass === "B Class") && (
                    <Button
                      variant="contained"
                      sx={{ marginTop: 2, backgroundColor: "#872ff7" }}
                      onClick={() =>
                        setShowAllBClassPartsColumns(!showAllBClassPartsColumns)
                      }
                      size="small"
                      endIcon={
                        showAllBClassPartsColumns ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )
                      }
                    >
                      {showAllBClassPartsColumns ? "Minimize " : "Show All "}
                      Columns
                    </Button>
                  )}
                </div>
                {partClass === "B Class" && (
                  <>
                    <SelectBox
                      label={"Machine Age"}
                      value={machineAge}
                      options={machineAgeOptions}
                      handleChange={(e) => setMachineAge(e.target.value)}
                      size={150}
                      showClearIcon={true}
                      handleUnselect={() => setMachineAge("")}
                    />
                    {(showMoreFilter || showFilters.equipment_usage) && (
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
                    {(showMoreFilter || showFilters.avg_annual_revenue) && (
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
                    {(showMoreFilter || showFilters.required_for) && (
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
                  loading={partClassBLoading}
                  sx={GRID_STYLE}
                  getRowId={(row) => row.index}
                  page={partClassBPageNo}
                  pageSize={partClassBPageSize}
                  onPageChange={(newPage) =>
                    fetchPartClassBRecords(newPage, partClassBPageSize)
                  }
                  onPageSizeChange={(newPageSize) =>
                    fetchPartClassBRecords(partClassBPageNo, newPageSize)
                  }
                  rows={partClassBRecords}
                  columns={showMarginClassBTableColums()}
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  rowCount={partClassBTotlaRecord}
                  checkboxSelection={true}
                  keepNonExistentRowsSelected
                  onSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                  }}
                  selectionModel={rowSelectionModel}
                />
              </Box>
            )}
            {(partClass === "" || partClass === "C Class") && (
              <Box sx={{ height: 500, marginBottom: 5, marginInline: 2 }}>
                <Typography
                  sx={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}
                >
                  C Class Parts
                </Typography>
                <DataGrid
                  loading={partClassCLoading}
                  sx={GRID_STYLE}
                  getRowId={(row) => row.index}
                  page={partClassCPageNo}
                  pageSize={partClassCPageSize}
                  onPageChange={(newPage) =>
                    fetchPartClassCRecords(newPage, partClassCPageSize)
                  }
                  onPageSizeChange={(newPageSize) =>
                    fetchPartClassCRecords(partClassCPageNo, newPageSize)
                  }
                  rows={partClassCRecords}
                  columns={partClassCTableColumns}
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  rowCount={partClassCTotlaRecord}
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
    </>
  );
}

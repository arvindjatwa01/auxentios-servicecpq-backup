import { useCallback, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, Card, Divider, FormControl, Grid } from "@mui/material";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";
import {
  getDiscountColumns,
  getDiscountDetails,
  getMarginRecommendationClassA,
  getMarginRecommendationClassB,
  getMarginRecommendationClassC,
} from "services/dashboardServices";
import SelectBox from "./SelectBox";
import SearchBox from "./SearchBox";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { callGetApi } from "services/ApiCaller";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";

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
  const [partNumber, setPartNumber] = useState("");
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

  const [partClass, setPartClass] = useState("");
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(filterOptions);
  const [showAllAClassPartsColumns, setShowAllAClassPartsColumns] =
    useState(false);
  const [showAllBClassPartsColumns, setShowAllBClassPartsColumns] =
    useState(false);
  const [showAllCClassPartsColumns, setShowAllCClassPartsColumns] =
    useState(false);
  const [columns, setColumns] = useState([]);

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

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  useEffect(() => {
    if (partClass === "" || partClass === "A Class") {
      fetchPartClassARecords(partClassAPageNo, partClassAPageSize);
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

  const fetchPartClassARecords = async (pageNo, rowsPerPage) => {
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

    const reqUrl = `${filter}&pagenumber=${pageNo + 1}&pagesize=${rowsPerPage}`;
    await getMarginRecommendationClassA(reqUrl)
      .then((response) => {
        setPartClassATotlaRecord(response.number_of_rows);
        setPartClassARecords(response.data);
        console.log("response :: ", response);
      })
      .catch((err) => {
        handleSnack(
          "error",
          "Error occured while fetching Part Class A details"
        );
        setPartClassARecords([]);
      });
    setPartClassALoading(false);
  };

  useEffect(() => {
    if (partClass === "" || partClass === "B Class") {
      fetchPartClassBRecords(partClassBPageNo, partClassBPageSize);
    }
  }, [
    partClass,
    partNumber,
    // partType,
    // status,
    // usage,
    machineAge,
    equipmentUsage,
    avgAnnualRevnue,
    // contractOrWarranty,
    requiredFor,
  ]);

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
        console.log("response :: ", response);
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

  useEffect(() => {
    if (partClass === "" || partClass === "C Class") {
      fetchPartClassCRecords(partClassCPageNo, partClassCPageSize);
    }
  }, [partClass, partNumber]);

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
        console.log("response :: ", response);
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
      (partNumber ? `&partNumber=${partNumber}` : "") +
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

  const standardTableColumns = [
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

  const ordinaryTableColumns = [
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
    console.log("predictedMarginDisplay params :: ", params);
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

  // const partClassOptions = ["Premium", "Standard", "Ordinary"];
  const partClassOptions = ["A Class", "B Class", "C Class"];

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
    // setShowAllAClassPartsColumns(false);
    // setShowAllBClassPartsColumns(false);
    // setShowAllCClassPartsColumns(false);
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

  // Show Premimum Table Columns accoding to Filter
  const showPremiumTableColumns = useCallback(() => {
    if (partClass === "" || partClass === "A Class") {
      const hideColumns = ["partType", "status", "usage", "machineAge"];
      const newColumns = premiumTableColumns.map((columns) => ({
        ...columns,
        hide: showAllAClassPartsColumns
          ? false
          : columns.defaultShow
          ? false
          : partClass === ""
          ? true
          : hideColumns.includes(columns.field)
          ? false
          : showFilters[columns.field]
          ? false
          : true,
      }));
      return newColumns;
    }
  }, [partClass, showFilters, showAllAClassPartsColumns]);

  // Show Standard Table Columns accoding to Filter
  const showStandardTableColums = useCallback(() => {
    if (partClass === "" || partClass === "B Class") {
      const hideColumns = ["partType", "status", "usage", "machineAge"];
      const newColumns = standardTableColumns.map((columns) => ({
        ...columns,
        hide: showAllBClassPartsColumns
          ? false
          : columns.defaultShow
          ? false
          : partClass === ""
          ? true
          : hideColumns.includes(columns.field)
          ? false
          : showFilters[columns.field]
          ? false
          : true,
      }));
      return newColumns;
    }
  }, [partClass, showFilters, showAllBClassPartsColumns]);

  // Show Ordinary Table Columns accoding to Filter
  const showOrdinaryTableColums = useCallback(() => {}, [
    partClass,
    showFilters,
  ]);

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
                  {partClass === "" && (
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
                  columns={showPremiumTableColumns()}
                  // columnVisibilityModel={columnVisibilityModel}
                  // onColumnVisibilityModelChange={(newModel) =>
                  //     setColumnVisibilityModel(newModel)
                  // }
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  rowCount={partClassATotlaRecord}
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
            {(partClass === "" || partClass === "B Class") && (
              <Box sx={{ height: 500, marginBottom: 8, marginInline: 2 }}>
                <div className="d-flex justify-content-between">
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 500, marginTop: 2 }}
                  >
                    B Class Parts
                  </Typography>
                  {partClass === "" && (
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
                    {/* <SelectBox
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
                  /> */}
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
                    {/* {showFilters.contractOrWarranty && (
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
                  )} */}
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
                  loading={partClassBLoading}
                  sx={GRID_STYLE}
                  getRowId={(row) => row.index}
                  page={partClassBPageNo}
                  pageSize={partClassBPageSize}
                  onPageChange={(newPage) =>
                    fetchDiscountGuidance(newPage, partClassBPageSize)
                  }
                  onPageSizeChange={(newPageSize) =>
                    fetchDiscountGuidance(partClassBPageNo, newPageSize)
                  }
                  rows={partClassBRecords}
                  columns={showStandardTableColums()}
                  // columns={columns}
                  // columnVisibilityModel={columnVisibilityModel}
                  // onColumnVisibilityModelChange={(newModel) =>
                  //     setColumnVisibilityModel(newModel)
                  // }
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  rowCount={partClassBTotlaRecord}
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
                    fetchDiscountGuidance(newPage, partClassCPageSize)
                  }
                  onPageSizeChange={(newPageSize) =>
                    fetchDiscountGuidance(partClassCPageNo, newPageSize)
                  }
                  rows={partClassCRecords}
                  columns={ordinaryTableColumns}
                  // columns={columns}
                  // columnVisibilityModel={columnVisibilityModel}
                  // onColumnVisibilityModelChange={(newModel) =>
                  //     setColumnVisibilityModel(newModel)
                  // }
                  rowsPerPageOptions={[10, 20, 50]}
                  paginationMode="server"
                  rowCount={partClassCTotlaRecord}
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
    </>
  );
}

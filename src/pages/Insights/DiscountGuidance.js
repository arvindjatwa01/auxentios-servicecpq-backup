import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, Grid } from "@mui/material";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";
import { getDiscountDetails } from "services/dashboardServices";

export default function DiscountGuidance(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [discountData, setDiscountData] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [customerId, setCustomerId] = useState("");
    const [order, setOrder] = useState("");
    const [parts, setParts] = useState("");
    const [usage, setUsage] = useState("");
    const [machine, setMachine] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });

    useEffect(() => {
        fetchDiscountGuidance(page, pageSize)
    }, []);

    const fetchDiscountGuidance = async (pageNo, rowsPerPage) => {
        setIsLoading(true);
        setPage(pageNo);
        setPageSize(rowsPerPage);
        let sort = sortDetail.sortColumn
            ? `&sortColumn=${sortDetail.sortColumn}&orderBY=${sortDetail.orderBy}`
            : "";
        // let filter = filterQuery ? `&search=${filterQuery}` : "";
        // const query = `pageNumber=${pageNo}&pageSize=${rowsPerPage}${sort}${filter}`;
        const filter = `customer_id=${customerId}&order=${order}&parts=${parts}&usage=${usage}&machine=${machine}`
        const query = `${filter}&pagenumber=${pageNo}&pagesize=${rowsPerPage}${sort}`;

        await getDiscountDetails(query)
            .then((discountResult) => {
                setTotalCount(discountResult.totalRows);
                setDiscountData(discountResult.result);
            })
            .catch((err) => {
                props.handleSnack("error", "Error occured while fetching discount details");
                setDiscountData([]);
            });
        setIsLoading(false);
    };

    const customerDetailColumns = [
        { field: "customer_id", headerName: "Customer ID", flex: 1 },
        { field: "min_discount", headerName: "Min Discount", flex: 1 },
        { field: "max_discount", headerName: "Max Discount", flex: 1 },
        { field: "avg_discount", headerName: "Average Discount", flex: 1 },
        { field: "chances_to_buy", headerName: "Chances To Buy", flex: 1 },
        { field: "customer_level", headerName: "Customer Level", flex: 1 },
        { field: "order", headerName: "Order", width: 80 },
        { field: "parts", headerName: "Parts", width: 80 },
        { field: "usage", headerName: "Usage", width: 80 },
        { field: "machine", headerName: "Machine", flex: 1 },
        { field: "predicted_min_discount", headerName: "Pred. Min Discount", flex: 1 },
        { field: "predicted_max_discount", headerName: "Pred. Max Discount", flex: 1 },

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
                        Discount Guidance
                    </Typography>
                    <Box sx={{ height: 500, marginBottom: 5, marginInline: 2 }}>
                        <DataGrid
                            loading={isLoading}
                            sx={GRID_STYLE}
                            getRowId={(row) => row.customer_id}
                            page={page}
                            pageSize={pageSize}
                            onPageChange={(newPage) =>
                                fetchDiscountGuidance(newPage, pageSize)
                            }
                            onPageSizeChange={(newPageSize) =>
                                fetchDiscountGuidance(page, newPageSize)
                            }
                            rows={discountData}
                            columns={customerDetailColumns}
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
                </Card>
            </Grid>
        </div >
    );
}

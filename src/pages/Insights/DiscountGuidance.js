import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, Grid } from "@mui/material";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import { DataGrid } from "@mui/x-data-grid";
import { getDiscountColumns, getDiscountDetails } from "services/dashboardServices";
import LoaderComponent from "pages/Common/LoaderComponent";
import LoadingProgress from "pages/Repair/components/Loader";

export default function DiscountGuidance(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [discountData, setDiscountData] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [customerId, setCustomerId] = useState("1023942");
    const [order, setOrder] = useState("");
    const [parts, setParts] = useState("");
    const [usage, setUsage] = useState("");
    const [machine, setMachine] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [sortDetail, setSortDetail] = useState({ sortColumn: "", orderBy: "" });
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        fetchDiscountGuidanceCol();
    }, []);

    const fetchDiscountGuidanceCol = async () => {
        setIsLoading(true);
        let cols = [];
        await getDiscountColumns().then(discountCols => {
            discountCols.map(indColumn =>
                cols.push({ field: indColumn.fieldName, headerName: indColumn.columnName, flex: 1 })
            )
            setColumns(cols)
            fetchDiscountGuidance(page + 1, pageSize);
            columns?.length > 0 ? setIsLoading(false) : setIsLoading(true);


        }).catch(e => {
            console.log("Error Occurred!")
        })
    }
    function sortPartsTable(sortEvent) {
        // console.log("sorting called");
        if (sortEvent.length > 0) {
            setSortDetail({
                sortColumn: sortEvent[0].field,
                orderBy: sortEvent[0].sort === "asc" ? "ASC" : "DESC",
            });
        } else {
            setSortDetail({ sortColumn: "", orderBy: "" });
        }
    }
    const fetchDiscountGuidance = async (pageNo, rowsPerPage) => {
        setPage(pageNo);
        setPageSize(rowsPerPage);
        let sort = sortDetail.sortColumn
            ? `&sortColumn=${sortDetail.sortColumn}&orderBY=${sortDetail.orderBy}`
            : "";
        // let filter = filterQuery ? `&search=${filterQuery}` : "";
        // const query = `pageNumber=${pageNo}&pageSize=${rowsPerPage}${sort}${filter}`;
        const filter = `customer_id=${customerId}`
        const query = `${filter}&pagenumber=${pageNo + 1}&pagesize=${rowsPerPage}${sort}`;

        await getDiscountDetails(query)
            .then((discountResult) => {
                setTotalCount(discountResult[0].number_of_rows);
                setDiscountData(discountResult[0].data);
            })
            .catch((err) => {
                props.handleSnack("error", "Error occured while fetching discount details");
                setDiscountData([]);
            });
    };


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
                        {!isLoading ? <DataGrid
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
                            onSortModelChange={e => sortPartsTable(e)}
                            rows={discountData}
                            columns={columns}
                            rowsPerPageOptions={[10, 20, 50]}
                            paginationMode="server"
                            rowCount={totalCount}
                            checkboxSelection={true}
                            keepNonExistentRowsSelected
                            onSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            selectionModel={rowSelectionModel}
                        /> : <LoadingProgress />}
                    </Box>
                </Card>
            </Grid>
        </div >
    );
}

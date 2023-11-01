import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SearchBox from "pages/Repair/components/SearchBox";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import OwlCarousel from 'react-owl-carousel';
import { Link } from "react-router-dom";
import Select from 'react-select';
import { fetchWorkList } from "services/worklistServices";
import PartIcons from '../../assets/icons/png/PartIcons.png';
import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg';
import contract from '../../assets/icons/svg/contract.svg';
import { searchUsers } from 'services/userServices';
import CustomizedSnackbar from 'pages/Common/CustomSnackBar';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';

var tempShow = false

const Actions = () => <><span className="mr-3 btn bg-primary text-white cursor" style={{ width: '50% ' }} onClick={() => tempShow = true}><img className='mr-2' src={PartIcons}></img>Build</span></>;




const data = [
    {
        id: 0,
        caseId: "13322",
        source: "Sales",
        description: "Request for Solution",
        customer: "13322",
        requestedDate: "1",
        progress: "Pending",
        status: "Open",
        consistencyStatus: "Inconsistent",
        attendedBy: "Ashok Mohanty"
    },
    {
        id: 1,
        caseId: "23972",
        source: "Marketing",
        description: "Sales Quote",
        customer: "23972",
        requestedDate: "1",
        progress: "Not relevent",
        status: "Open",
        consistencyStatus: "Consistent",
        attendedBy: "Ashok M"
    },
    {
        id: 2,
        caseId: "23924",
        source: "Salesforce",
        description: "Sales Quote",
        customer: "23924",
        requestedDate: "1",
        progress: "Not relevant",
        status: "Open",
        consistencyStatus: "Inconsistent",
        attendedBy: "Ashok M"
    }
]
const GRID_STYLE = {
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#872ff7",
        color: "#fff",
        fontSize: 12,
    },
    "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
        marginTop: "1em",
        marginBottom: "1em",
    },
    "& .MuiTablePagination-select": {
        marginTop: "1.5em",
        marginBottom: "1.5em",
    },
    "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
        borderRight: `1px solid rgba(0,0,0,.12)`,
        paddingLeft: "8px",
        paddingRight: "8px",
        minHeight: "72px",
        whiteSpace: 'normal !important',
        wordWrap: "break-word !important"
    },
    "& .MuiDataGrid-iconSeparator": {
        display: "none",
    },
    // minHeight: 300,
    "& .MuiDataGrid-cellContent": {
        fontSize: 12,
    },
    "& .MuiInputBase-root": {
        fontSize: 12, marginInline: 2, paddingInline: 1,
    },
    '& .super-app-value': {
        backgroundColor: '#dabffd',
        fontWeight: '600',
    },
    '& .disable-value': {
        backgroundColor: '#f2f2f2',
    },
};
const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            // backgroundColor: "#000"
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};


export function WorkList(props) {

    const [openSearchService, setOpenSearchService] = useState(false)

    const [show, setShow] = useState(false);
    const [worklistCases, setWorklistCase] = useState([]);
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [tenantUser, setTenantUser] = useState("");
    const [noOptionUser, setNoOptionsUser] = useState([]);
    // To display the notifications
    const handleSnack = (snackSeverity, snackMessage) => {
        setSnackMessage(snackMessage);
        setSeverity(snackSeverity);
        setOpenSnack(true);
    };
    const [severity, setSeverity] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const columns1 = [
        {
            field: "caseId",
            headerName: "Case#",
            flex: 1,
        },
        {
            field: "customer",
            headerName: "Requester",
            flex: 1,
        },
        {
            field: "caseSource",
            headerName: "Source",
            flex: 1,
        },
        // {
        //     field: "team",
        //     headerName: "Team",
        //     flex: 1,
        // },
        {
            field: "description",
            headerName: "Title",
            flex: 1,
        },
        {
            field: "longDescription",
            headerName: "Task Description",
            flex: 1,
        },
        {
            field: "team",
            headerName: "Team",
            flex: 1,
        },
        // {
        //     field: "reason",
        //     headerName: "Reason",
        //     flex: 1,
        // },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            field: "consistency",
            headerName: "Consistent",
            flex: 1,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={
                            <div className="cursor">
                                <Tooltip title="Assign">
                                    <img className="m-1" src={PartIcons} alt="Assign" />
                                </Tooltip>
                            </div>
                        }
                        label="Assign"
                        className="bg-primary textPrimary"
                        onClick={() => setShow(true)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    useEffect(() => {
        getWorklistDetails(0, 10);
    }, [])

    const getWorklistDetails = async (pageNo, rowsPerPage) => {
        setPage(pageNo);
        setPageSize(rowsPerPage);
        await fetchWorkList(`?pageNumber=${pageNo}&pageSize=${rowsPerPage}`).then(worklists => {
            setWorklistCase(worklists);
        }).catch(e => console.log("Error occurred"))
    }

    const handleAssignUser = () => {
        setShow(false)
    }

    // Machine search based on model and serial number
    const handleUserSearch = async (value) => {
        setSearchUserResult([]);
        setTenantUser(value)
        await searchUsers(`firstName~${value} OR lastName~${value} OR email~${value}`)
            .then(result => {
                if (result && result.length > 0) {
                    setSearchUserResult(result);
                    setNoOptionsUser(false);
                } else {
                    setNoOptionsUser(true);
                }
            }).catch(e => handleSnack("error", "Error occurred while searching users"))


    };

    // Select machine from the search result
    const handleUserSelect = (type, currentItem) => {
        console.log(currentItem)
        setTenantUser(currentItem.email);
        setSearchUserResult([]);
    };

    return (
        <>
            <CustomizedSnackbar
                handleClose={handleSnackBarClose}
                open={openSnack}
                severity={severity}
                message={snackMessage}
            />
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid mt-3">
                    <div className="custom-table card " style={{ height: 400, width: '100%' }}>
                        {/* <DataTable title="" selectableRows columns={columns} data={data} customStyles={customStyles} pagination /> */}
                        <DataGrid
                            sx={GRID_STYLE}
                            rows={worklistCases}
                            autoHeight
                            columns={columns1.map((column) => ({
                                ...column,
                                // filterOperators,
                            }))}
                            // editMode="row"
                            page={page}
                            pageSize={pageSize}
                            onPageChange={(newPage) =>
                                getWorklistDetails(newPage, pageSize)
                            }
                            onPageSizeChange={(newPageSize) =>
                                getWorklistDetails(page, newPageSize)
                            }
                            // onRowEditStart={(e) => setBulkUpdateProgress(true)}
                            sortingMode="server"
                            //   onSortModelChange={(e) => sortPartsTable(e)}
                            filterMode="server"
                            //   onFilterModelChange={onPartsFilterChange}
                            // onRowEditStop={(e) => setBulkUpdateProgress(false)}
                            paginationMode="server"
                            //   loading={partsLoading}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            //   rowCount={totalPartsCount}
                            experimentalFeatures={{ newEditingApi: true }}

                        />
                    </div>
                    <div className="Add-new-segment-div p-3 border-radius-10">
                        <Link to="/workList/new" className="btn bg-primary text-white">Create Worklist</Link>
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={() => setShow(!show)} size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div><h4 class="">Asign Task</h4></div>
                    </div>
                    <div className='card mt-4 p-4'>
                        <div className='row justify-content-center'>
                            <div className='col-md-12 my-3 px-4'>
                                <SearchBox
                                    value={tenantUser}
                                    onChange={(e) =>
                                        handleUserSearch(
                                            e.target.value
                                        )
                                    }
                                    type="email"
                                    result={searchUserResult}
                                    onSelect={handleUserSelect}
                                    noOptions={noOptionUser}
                                />
                            </div>
                            <div className='row col-md-12 my-3'>
                                <div className='col-md-6'>
                                    <a onClick={() => setShow(false)} className='btn bg-white text-primary border-primary w-100'>Cancel</a>
                                </div>
                                <div className='col-md-6'>
                                    <a onClick={handleAssignUser} className='btn bg-primary text-white w-100'>Assign <img className='ml-2' src={Buttonarrow}></img></a>
                                </div>

                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>





        </>
    )
}

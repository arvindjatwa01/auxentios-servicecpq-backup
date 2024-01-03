import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Grid, Tab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { MuiMenuComponent } from "../Operational/index";
import { ChartReact } from "./ChartReact";
import { WorkListDash } from "./WorkListDashboard";
import { Modal } from "react-bootstrap";
import { NewWorkList } from "./NewWorkList";
import LocalCaseWorkListAdUpdate from "./worklist/LocalCaseWorkListAdUpdate";

const activityOptions = ["None", "Atria", "Callisto"];
const workFlowOptions = ["None", "Atria"];
const transOptions = ["Test1", "Test2", "Test3", "Test4"];

const DataGridContainer = (props) => (
  <Box
    margin={"auto"}
    sx={{
      backgroundColor: "#ffffff",
      height: 400,
      borderRadius: 5,
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {props.children}
  </Box>
);

const activitiesData = [
  {
    id: 1,
    customer: "Jenny Wilson",
    status: "draft",
    name: "RO000001",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 9879,
  },
  {
    id: 2,
    customer: "Ray Hawkins",
    status: "active",
    name: "RO000002",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 8622,
  },
  {
    id: 3,
    customer: "Ralph Edwards",
    status: "draft",
    name: "RO000003",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 7811,
  },
];
const savedTasksData = [
  {
    id: 1,
    customer: "Alexander Richards",
    status: "draft",
    name: "PL000001",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 9011,
  },
  {
    id: 2,
    customer: "Tia Griffin",
    status: "active",
    name: "RO000009",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 20100,
  },
  {
    id: 3,
    customer: "Douglas Emerson",
    status: "draft",
    name: "RO000010",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 45266,
  },
];
const reviewData = [
  {
    id: 1,
    customer: "Sharon Dodds",
    status: "draft",
    name: "PL000101",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 7865,
  },
  {
    id: 2,
    customer: "Larry Eckard",
    status: "active",
    name: "RO000012",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 50321,
  },
  {
    id: 3,
    customer: "Alice Keats",
    status: "draft",
    name: "RO000013",
    createdAt: "2023-06-05T11:50:47.912447",
    price: 9912,
  },
];
const GRID_STYLE = {
  "& .MuiDataGrid-columnHeaders": {
    // backgroundColor: "#872ff7",
    color: "gray",
    fontSize: 16,
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
    // borderRight: `1px solid rgba(0,0,0,.12)`,
    paddingLeft: "8px",
    paddingRight: "8px",
    minHeight: "72px",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  // minHeight: 300,
  "& .MuiDataGrid-cellContent": {
    fontSize: 14,
  },
  "& .MuiInputBase-root": {
    fontSize: 12,
    marginInline: 2,
    paddingInline: 1,
  },
  "& .super-app-value": {
    backgroundColor: "#dabffd",
    fontWeight: "600",
  },
  "& .disable-value": {
    backgroundColor: "#f2f2f2",
  },
  marginInline: "auto",
  width: "100%",
  borderRadius: 5,
  backgroundColor: "#ffffff",
};

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const colorStatus = { draft: "lightgreen", active: "lightblue" };
  const savedTasksColumns = [
    {
      flex: 2,
      field: "customer",
      headerName: "Customer",
      renderCell: (params) => (
        <div>
          <span>
            <AccountCircleIcon fontSize="large" style={{ fontSize: 25 }} />{" "}
            {params.row.customer}
          </span>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            fontSize: 14,
            backgroundColor: colorStatus[params.row.status],
            paddingInline: 5,
            paddingBlock: 2,
            borderRadius: 6,
          }}
        >
          {params.row.status}
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Name / ID",
      flex: 1,
      renderCell: (params) => <div># {" " + params.row.name}</div>,
    },
    {
      field: "createdAt",
      headerName: "Created AT",
      flex: 2,
      renderCell: (params) => (
        <Moment format="DD MMM YY HH:MM a" style={{ fontSize: 14 }}>
          {params.row.createdAt}
        </Moment>
      ),
    },
    {
      field: "price",
      headerName: "Price $",
      flex: 1,
    },
  ];

  useEffect(() => {
    fetchUserSpecifics("", "activities");
  }, []);

  const [data, setData] = useState([]);
  const [value, setValue] = useState("activities");
  const [createWorklistShow, setCreateWorlistShow] = useState(false);
  const [showWorklistModal, setShowWorklistModal] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [recordId, setRecordId] = useState(null);

  const handleShowModal = () => {
    setShowWorklistModal(!showWorklistModal);
  };

  const handleRefreshFlag = () => {
    setRefreshFlag(refreshFlag + 1);
  };

  const fetchUserSpecifics = (event, type) => {
    console.log();
    setValue(type);
    if (type === "activities") {
      setData(activitiesData);
    } else if (type === "tasks") {
      setData(savedTasksData);
    } else if (type === "review") {
      setData(reviewData);
    }
  };

  const newWorkListCreateModel = () => {
    return (
      <Modal
        show={createWorklistShow}
        onHide={() => setCreateWorlistShow(!createWorklistShow)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body></Modal.Body>
        <NewWorkList />
      </Modal>
    );
  };

  return (
    <>
      <div>
        {/* <CommanComponents /> */}
        <div className="content-body bg-white" style={{ minHeight: "884px" }}>
          <div className="container-fluid mt-3">
            <h4 className="mb-3">Home</h4>

            <Grid
              container
              sx={{
                width: "100%",
                backgroundColor: "#f3eafe",
                borderRadius: 5,
                marginBlock: 5,
                paddingInline: 3,
                paddingBlock: 2,
              }}
            >
              {/* <div
            className="row ml-0"
            style={{ backgroundColor: "#f3eafe", borderRadius: 5 }}
          > */}
              <Grid item xs={12} md={9} sx={{ pl: 2, pr: 3, py: 2 }}>
                <WorkListDash
                  refreshFlag={refreshFlag}
                  handleRefreshData={handleRefreshFlag}
                  setRecordId={setRecordId}
                  handleShowModal={handleShowModal}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <h5 className="ml-1 mt-3">Today's Tasks</h5>
                <Card
                  className=""
                  sx={{ borderRadius: 4, marginTop: 2, height: 400 }}
                  variant="outlined"
                >
                  {[
                    { taskName: "Submission A", submittedAt: "09:00 AM" },
                    { taskName: "Planning", submittedAt: "05:00 AM" },
                  ].map((task) => (
                    <Card
                      variant="outlined"
                      sx={{
                        padding: 1,
                        margin: 2,
                        borderRadius: 3,
                        width: "90%",
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-7 text-dark">
                          {task.taskName}
                        </div>{" "}
                        <div className="col-sm-5">{task.submittedAt}</div>
                      </div>
                    </Card>
                  ))}
                  <Card
                    className="btn bg-primary text-white"
                    variant="outlined"
                    sx={{
                      padding: 1,
                      margin: 2,
                      width: "90%",
                      borderRadius: 3,
                      border: 2,
                    }}
                    // onClick={() => setCreateWorlistShow(!createWorklistShow)}
                    onClick={() => setShowWorklistModal(true)}
                  >
                    {/* + New Task */}+ Create Worklist
                  </Card>
                </Card>
              </Grid>
              {/* </div> */}
            </Grid>
            <Grid
              container
              sx={{
                width: "100%",
                backgroundColor: "#f3eafe",
                borderRadius: 5,
                marginBlock: 5,
              }}
            >
              <Grid item xs={12}>
                <TabContext value={value}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      marginBlock: 5,
                      marginInline: 5,
                    }}
                  >
                    <TabList
                      // className="home-tabs-div"
                      onChange={fetchUserSpecifics}
                    >
                      <Tab
                        label="Recent Activities"
                        value={"activities"}
                        className="heading-tabs"
                      />
                      <Tab
                        label="Saved Tasks"
                        value={"tasks"}
                        className="heading-tabs"
                      />
                      <Tab
                        label="Items to Review "
                        value={"review"}
                        className="heading-tabs"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="activities">
                    <DataGridContainer>
                      <DataGrid
                        sx={{
                          ...GRID_STYLE,
                        }}
                        paginationMode="client"
                        rows={data}
                        columns={savedTasksColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                      />
                    </DataGridContainer>
                  </TabPanel>
                  <TabPanel value="tasks">
                    <DataGridContainer>
                      <DataGrid
                        sx={{
                          ...GRID_STYLE,
                        }}
                        paginationMode="client"
                        rows={data}
                        columns={savedTasksColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                      />
                    </DataGridContainer>
                    {/* </div> */}
                  </TabPanel>
                  <TabPanel value="review">
                    <DataGridContainer>
                      <DataGrid
                        sx={{
                          ...GRID_STYLE,
                        }}
                        paginationMode="client"
                        rows={data}
                        columns={savedTasksColumns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                      />
                    </DataGridContainer>
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                width: "100%",
                backgroundColor: "#f3eafe",
                borderRadius: 5,
                marginBlock: 5,
              }}
            >
              <Grid item xs={12}>
                <div
                  className="card border"
                  style={{
                    height: "400px",
                    marginInline: 24,
                    marginBlock: 34,
                    borderRadius: 20,
                  }}
                >
                  <div className="activity-div p-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="font-weight-600 text-dark-black font-size-16 mb-0">
                        <svg
                          className="mr-2"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#FF86AB"
                          width="21px"
                          viewBox="0 0 112.91406 112.91382"
                        >
                          <path
                            className="cls-1"
                            d="M8.62012,32.645h3.69751V68.06885a4.00574,4.00574,0,0,0,8.01147,0V32.645h3.6958A8.62923,8.62923,0,0,0,32.645,24.0249V8.62012A8.62923,8.62923,0,0,0,24.0249,0H8.62012A8.62938,8.62938,0,0,0,0,8.62012V24.0249A8.62938,8.62938,0,0,0,8.62012,32.645ZM8.01147,8.62012a.61033.61033,0,0,1,.60865-.60865H24.0249a.61017.61017,0,0,1,.60864.60865V24.0249a.61032.61032,0,0,1-.60864.60864H8.62012a.61048.61048,0,0,1-.60865-.60864Z"
                          />
                          <path
                            className="cls-1"
                            d="M104.294,0H88.88916A8.62923,8.62923,0,0,0,80.269,8.62012v3.6958H44.84521a4.00574,4.00574,0,1,0,0,8.01147H80.269V24.0249A8.62923,8.62923,0,0,0,88.88916,32.645H104.294a8.62938,8.62938,0,0,0,8.62011-8.62012V8.62012A8.62938,8.62938,0,0,0,104.294,0Zm.60864,24.0249a.61048.61048,0,0,1-.60864.60864H88.88916a.61032.61032,0,0,1-.60864-.60864V8.62012a.61017.61017,0,0,1,.60864-.60865H104.294a.61033.61033,0,0,1,.60864.60865Z"
                          />
                          <path
                            className="cls-1"
                            d="M104.294,80.269h-3.69751V44.84521a4.00574,4.00574,0,1,0-8.01148,0V80.269h-3.6958A8.62907,8.62907,0,0,0,80.269,88.88916v15.40308a8.63048,8.63048,0,0,0,8.62012,8.62158H104.294a8.63063,8.63063,0,0,0,8.62011-8.62158V88.88916A8.62922,8.62922,0,0,0,104.294,80.269Zm.60864,24.0232a.61063.61063,0,0,1-.60864.6101H88.88916a.61047.61047,0,0,1-.60864-.6101V88.88916a.61037.61037,0,0,1,.60864-.60889H104.294a.61054.61054,0,0,1,.60864.60889Z"
                          />
                          <path
                            className="cls-1"
                            d="M68.06885,92.585H32.645v-3.6958A8.62907,8.62907,0,0,0,24.0249,80.269H8.62012A8.62922,8.62922,0,0,0,0,88.88916v15.40308a8.63063,8.63063,0,0,0,8.62012,8.62158H24.0249a8.63048,8.63048,0,0,0,8.62012-8.62158v-3.696H68.06885a4.00562,4.00562,0,1,0,0-8.01123ZM24.63354,104.29224a.61047.61047,0,0,1-.60864.6101H8.62012a.61063.61063,0,0,1-.60865-.6101V88.88916a.61054.61054,0,0,1,.60865-.60889H24.0249a.61037.61037,0,0,1,.60864.60889Z"
                          />
                          <path
                            className="cls-1"
                            d="M70.97461,36.68506H41.94092a4.00574,4.00574,0,0,0,0,8.01147H70.97461a4.00574,4.00574,0,0,0,0-8.01147Z"
                          />
                          <path
                            className="cls-1"
                            d="M70.97461,52.45117H41.94092a4.00574,4.00574,0,0,0,0,8.01148H70.97461a4.00574,4.00574,0,0,0,0-8.01148Z"
                          />
                          <path
                            className="cls-1"
                            d="M70.97461,68.21729H41.94092a4.00574,4.00574,0,0,0,0,8.01147H70.97461a4.00574,4.00574,0,0,0,0-8.01147Z"
                          />
                        </svg>
                        Workflow Tasks
                      </h6>
                      <MuiMenuComponent options={workFlowOptions} />
                    </div>
                  </div>
                  <div className="p-4">
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="font-weight-600">
                            <span
                              className="font-weight-600"
                              style={{ color: "#FF86AB" }}
                            >
                              Solution 12920-2
                            </span>{" "}
                            requires your approval
                          </p>
                        </div>
                        <p className="mb-0">5:45PM</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <a href="#" className="btn bg-white border">
                            Review
                          </a>
                        </div>
                        <div className="d-flex">
                          <a
                            href="#"
                            className="mr-2 text-green font-weight-500"
                          >
                            <CheckCircleOutlinedIcon
                              style={{ fontSize: "40px" }}
                            />
                          </a>
                          <a href="#" className="text-danger font-weight-500">
                            <CancelOutlinedIcon style={{ fontSize: "40px" }} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="font-weight-600">
                            <span
                              className="font-weight-600"
                              style={{ color: "#FF86AB" }}
                            >
                              Solution 12920-2
                            </span>{" "}
                            requires your approval
                          </p>
                        </div>
                        <p className="mb-0">5:45PM</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <a href="#" className="btn bg-white border">
                            Review
                          </a>
                        </div>
                        <div className="d-flex">
                          <a
                            href="#"
                            className="mr-2 text-green font-weight-500"
                          >
                            <CheckCircleOutlinedIcon
                              style={{ fontSize: "40px" }}
                            />
                          </a>
                          <a href="#" className="text-danger font-weight-500">
                            <CancelOutlinedIcon style={{ fontSize: "40px" }} />
                          </a>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="font-weight-600">
                            <span
                              className="font-weight-600"
                              style={{ color: "#FF86AB" }}
                            >
                              Solution 12920-2
                            </span>{" "}
                            requires your approval
                          </p>
                        </div>
                        <p className="mb-0">5:45PM</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <a href="#" className="btn bg-white border">
                            Review
                          </a>
                        </div>
                        <div className="d-flex">
                          <a
                            href="#"
                            className="mr-2 text-green font-weight-500"
                          >
                            <CheckCircleOutlinedIcon
                              style={{ fontSize: "40px" }}
                            />
                          </a>
                          <a href="#" className="text-danger font-weight-500">
                            <CancelOutlinedIcon style={{ fontSize: "40px" }} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            {/* <div className="card overflow-hidden border">
            <div className="activity-div bg-white border-bottom p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="font-weight-500 font-size-16 text-dark-black mb-0 d-flex align-items-center">
                  <span className="mr-2">
                    <NotificationsNoneOutlinedIcon
                      style={{ fontSize: "35px", color: "B2EAE8" }}
                    />
                  </span>
                  No of transactions
                </h6>
                <MuiMenuComponent options={transOptions} />
              </div>
            </div>
            <div className="row m-0 mt-4">
              <div className="col-md-6 col-sm-12">
                <div className="card overflow-hidden border p-2">
                  <div className="span4 collapse-group">
                    <div>
                      <a
                        href="#"
                        data-toggle="collapse"
                        data-target="#bysoluction"
                      >
                        <span>
                          <i
                            className="fa fa-angle-down f-s-16 mr-2"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className="font-weight-500">By Solution</span>
                      </a>
                      <div className="collapse show" id="bysoluction">
                        
                        <ChartReact />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="card overflow-hidden border p-2">
                  <div className="span4 collapse-group">
                    <div>
                      <a
                        href="#"
                        data-toggle="collapse"
                        data-target="#bystatus"
                      >
                        <span>
                          <i
                            className="fa fa-angle-down f-s-16 mr-2"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className="font-weight-500">By Status</span>
                      </a>
                      <div className="collapse show" id="bystatus">
                        
                        <ChartReact />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
      {/* {createWorklistShow && newWorkListCreateModel()} */}
      {showWorklistModal && (
        <LocalCaseWorkListAdUpdate
          show={showWorklistModal}
          hideModal={() => setShowWorklistModal(false)}
          refreshData={handleRefreshFlag}
          recordId={recordId}
        />
      )}
    </>
  );
};

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState, useEffect, Fragment } from "react";
import {
  fetchRoles,
  removeUser,
  getAllUsers,
  searchUsers,
  addUser,
  updateUserDetails,
} from "services/userServices";
import AddUserModal from "./AddUserModal";
import searchIcon from "../../assets/icons/svg/search.svg";
import penIcon from "../../assets/images/pen.png";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import { Tooltip, Box, Grid, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { RenderConfirmDialog } from "pages/Repair/components/ConfirmationBox";
import AddCustomerModal from "./AddCustomerModal";
import ProductSummary from "pages/use-case-2/ProductSummary";
import EquipmentRecordModal from "pages/use-case-2/EquipmentRecordModal";

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

const dummyProductSummary = {
  portfolioId: 201,
  name: "PS_B6C_SM",
  description:
    "This is a Portfolio Solution for B6C for a Scheduled Maintenance",
  machineType: "EMPTY",
  searchTerm: "",
  lubricant: true,
  customerId: 0,
  optionalServices: "SRVS_571G_PM3,SRVS_D6C_SM,SRVS_3508B_PM4",
  customerGroup: "",
  customerSegment: "Construction",
  externalReference: "345",
  status: "0",
  validFrom: "2023-07-26",
  validTo: "2025-07-26",
  strategyTask: "SERVICE_UNDER_WARRANTY",
  taskType: "INSTALATION",
  usageCategory: "NEW_EQUIPMENT_SOLUTION",
  productHierarchy: "END_PRODUCT",
  geographic: "OFFSITE",
  availability: "EMPTY",
  responseTime: "PROACTIVE",
  type: "EMPTY",
  application: "EMPTY",
  contractOrSupport: "EMPTY",
  lifeStageOfMachine: "EMPTY",
  supportLevel: "STANDARD",
  numberOfEvents: 0,
  rating: "",
  startUsage: 0,
  endUsage: 0,
  unit: "EMPTY",
  additionals: "",
  preparedBy: "WEJHGG@gmail.com",
  approvedBy: null,
  preparedOn: "2023-07-26",
  revisedBy: null,
  revisedOn: "2023-07-26",
  salesOffice: "Location2",
  offerValidity: "30",
  createdAt: "2023-07-26T11:14:24.775873",
  updatedAt: "2023-08-07T14:06:58.263019",
  saveState: false,
  userId: "1",
  createdBy: null,
  updatedBy: null,
  tenantId: 0,
  freeServices: "",
  coverages: [
    {
      coverageId: 317,
      serviceId: 0,
      modelNo: "3516B",
      serialNumber: "GZS00556",
      startSerialNumber: "",
      endSerialNumber: "",
      serialNumberPrefix: "GZS",
      family: "39",
      make: "CATERPILLAR",
      fleet: "",
      fleetSize: "SMALL",
      location: "",
      startDate: null,
      endDate: null,
      actions: "",
      createdAt: "2023-07-26T11:15:20.225792",
      updatedAt: "2023-08-07T14:09:58.30935",
      createdBy: null,
      updatedBy: null,
      tenantId: 74,
      deleted: false,
    },
    {
      coverageId: 316,
      serviceId: 0,
      modelNo: "3516B",
      serialNumber: "GZS00954",
      startSerialNumber: "",
      endSerialNumber: "",
      serialNumberPrefix: "GZS",
      family: "41",
      make: "CATERPILLAR",
      fleet: "",
      fleetSize: "SMALL",
      location: "",
      startDate: null,
      endDate: null,
      actions: "",
      createdAt: "2023-07-26T11:15:20.139828",
      updatedAt: "2023-08-07T14:08:52.829159",
      createdBy: null,
      updatedBy: null,
      tenantId: 74,
      deleted: false,
    },
    {
      coverageId: 2,
      serviceId: 0,
      modelNo: "992K",
      serialNumber: "",
      startSerialNumber: "",
      endSerialNumber: "",
      serialNumberPrefix: "ZMX",
      family: "GENERATORS SET ENGINES",
      make: "CATERPILLAR",
      fleet: "",
      fleetSize: "SMALL",
      location: "",
      startDate: null,
      endDate: null,
      actions: "",
      createdAt: "2022-09-26T09:23:03.244423",
      updatedAt: "2022-09-26T09:23:03.244461",
      createdBy: null,
      updatedBy: null,
      tenantId: 1,
      deleted: false,
    },
  ],
  items: [],
  portfolioCart: null,
  portfolioPrice: {
    portfolioPriceId: 717,
    priceMethod: "LIST_PRICE",
    priceType: null,
    priceList: null,
    priceDate: "2023-07-26",
    price: 13000,
    sparePartsPrice: 6000,
    labourPrice: 5000,
    servicePrice: 0,
    miscPrice: 2000,
    optionPrice: 0,
    specialPrice: 19662.5,
    flatPrice: 0,
    calculatedPrice: 13000,
    unitPrice: 13000,
    extendedPrice: 39000,
    discount: 0,
    totalPrice: 39000,
    cartCalculatedPrice: 0,
    currency: null,
    validFrom: null,
    validTo: null,
    calculatedPriceRule: null,
    createdAt: "2023-07-26T11:15:03.682575",
    updatedAt: "2023-08-07T14:06:58.265069",
    userId: null,
    createdBy: null,
    updatedBy: null,
    tenantId: 74,
    deleted: false,
  },
  additionalPrice: null,
  escalationPrice: null,
  coverageCart: null,
  template: true,
  deleted: false,
  visibleInCommerce: true,
};

export const Users = (props) => {
  const [tabValue, setTabValue] = useState("activeUsersAndsubscriptions");
  const [pageSize, setPageSize] = useState(5);
  const [userData, setUserData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userRoles, setUserRoles] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [addUserModalTitle, setAddUserModalTitle] = useState("Add User");
  const [openAddCustomer, setOpenAddCustomer] = useState(false);

  const [openProductSummary, setOpenProductSummary] = useState(false);
  const [openEquipmentRecordModal, setOpenEquipmentRecordModal] =
    useState(false);

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const newUser = {
    userId: "",
    firstName: "",
    lastName: "",
    password: "",
    roles: "",
    email: "",
  };
  const [subscriberData, setSubscriberData] = useState(newUser);

  const newCustomer = {
    builderId: "",
    type: "",
    dealerName: "",
    dealerNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
  };
  const [customerData, setCustomerData] = useState(newCustomer);
  const [dealerTypes, setDealerTypes] = useState([
    { label: "Partner", value: "PARTNER" },
    { label: "Customer", value: "CUSTOMER" },
  ]);

  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  // To display the notifications
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };

  // close add User close
  const handleAddUserClose = () => {
    setOpenAddUser(false);
    setSubscriberData(newUser);
  };

  // close add User close
  const handleAddCustomerClose = () => {
    setOpenAddCustomer(false);
    setSubscriberData(newUser);
  };

  // tab Change
  const handelTabChange = (e, value) => {
    setTabValue(value);
  };

  // Open spare part modal to view or edit
  const openUserRow = (row) => {
    console.log(row);
    setSubscriberData({
      ...row,
      roles: userRoles.find(
        (element) => row.roles[0].includes(element.label) > 0
      ),
    });
    setAddUserModalTitle("Update User");
    setOpenAddUser(true);
  };
  const handleDeleteUser = async () => {
    await removeUser(subscriberData.userId)
      .then((res) => {
        handleSnack("success", "User has been removed successfully");
        fetchUsers();
        setConfirmationOpen(false);
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while removing the user");
        setConfirmationOpen(false);
      });
  };
  const handleConfirm = (row) => {
    setSubscriberData(row);
    setConfirmationOpen(true);
  };
  const usersColumn = [
    { field: "firstName", headerName: "First Name", flex: 1, minWidth: 100 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 100 },
    { field: "email", headerName: "Email Id", flex: 1, minWidth: 100 },
    { field: "roles", headerName: "Role", flex: 1, minWidth: 100 },
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
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => openUserRow(params.row, true)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Delete">
                  <img className="m-1" src={deleteIcon} alt="Delete" />
                </Tooltip>
              </div>
            }
            label="Delete"
            onClick={() => handleConfirm(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const customerPartnersColumn = [
    // { field: "firstName", headerName: "First Name", flex: 1, minWidth: 100 },
    { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 100 },
    // { field: "email", headerName: "Email Id", flex: 1, minWidth: 100 },
    { field: "roles", headerName: "Role", flex: 1, minWidth: 100 },
    {
      field: "userId",
      headerName: "Customer/Partner ID",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "firstName",
      headerName: "Customer/Partner Name",
      flex: 1,
      minWidth: 100,
    },
    { field: "email", headerName: "Email", flex: 1, minWidth: 100 },
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
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => openUserRow(params.row, true)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Delete">
                  <img className="m-1" src={deleteIcon} alt="Delete" />
                </Tooltip>
              </div>
            }
            label="Delete"
            onClick={() => handleConfirm(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const fetchUserRoles = async () => {
    await fetchRoles()
      .then((fetchedRoles) => {
        let uniqueRoles = fetchedRoles.filter(
          (e, i) =>
            fetchedRoles.findIndex(
              (a) => a["roleDispName"] === e["roleDispName"]
            ) === i
        );
        uniqueRoles?.map((indRole) => {
          indRole.value = indRole.roleId;
          indRole.label = indRole.roleDispName;
        });
        setUserRoles(uniqueRoles);
      })
      .catch((e) => {
        handleSnack("error", "Error occurred while fetching roles");
      });
  };
  const fetchUsers = async () => {
    await getAllUsers()
      .then((res) => {
        setUserData(res);
        setTotalUsers(res.length);
      })
      .catch((e) =>
        handleSnack("error", "Error occurred while fetching users")
      );
  };

  const searchUserList = async (value) => {
    await searchUsers(
      `firstName~${value} OR lastName~${value} OR email~${value}`
    )
      .then((res) => {
        setUserData(res);
      })
      .catch((e) =>
        handleSnack("error", "Error occurred while searching users")
      );
  };
  useEffect(() => {
    fetchUserRoles();
    fetchUsers();
  }, []);

  const handleOpenAddUser = () => {
    setSubscriberData(newUser);
    setAddUserModalTitle("Add User");
    setOpenAddUser(true);
  };

  // open add customer modal
  const handleOpenAddCustomer = () => {
    setSubscriberData(newUser);
    setAddUserModalTitle("Add Partner/Customer");
    setOpenAddCustomer(true);
  };

  const addNewUser = async () => {
    console.log(subscriberData);
    let data = {
      firstName: subscriberData.firstName,
      lastName: subscriberData.lastName,
      roleName: subscriberData.roles?.roleDispName,
      // roleName: "PRODUCT_EXPERT",
      email: subscriberData.email,
      password: subscriberData.password,
      isApproved: true,
      type: "TENANT_BUSINESS_USER",
    };
    await addUser(data)
      .then((res) => {
        if (res) {
          handleSnack("success", "Added user successfully");
          fetchUsers();
          setOpenAddUser(false);
        }
      })
      .catch((e) => handleSnack("error", "Error occurred while adding user"));
  };

  // add new Customer
  const addNewCustomer = async () => {
    let data = {
      firstName: subscriberData.firstName,
      lastName: subscriberData.lastName,
      roleName: subscriberData.roles?.roleDispName,
      // roleName: "PRODUCT_EXPERT",
      email: subscriberData.email,
      password: subscriberData.password,
      isApproved: true,
      type: "TENANT_BUSINESS_USER",
    };
    await addUser(data)
      .then((res) => {
        if (res) {
          handleSnack("success", "Added user successfully");
          fetchUsers();
          setOpenAddUser(false);
        }
      })
      .catch((e) => handleSnack("error", "Error occurred while adding user"));
  };

  const updateUser = async () => {
    let data = {
      firstName: subscriberData.firstName,
      lastName: subscriberData.lastName,
      roles: [subscriberData.roles?.roleDispName],
      email: subscriberData.email,
    };
    await updateUserDetails(subscriberData.userId, data)
      .then((res) => {
        if (res) {
          handleSnack("success", "Updated user successfully");
          fetchUsers();
          setOpenAddUser(false);
        }
      })
      .catch((e) => handleSnack("error", "Error occurred while adding user"));
  };
  return (
    <Fragment>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <RenderConfirmDialog
        confimationOpen={confirmationOpen}
        message={`Pressing 'Yes' will remove the user`}
        handleNo={() => setConfirmationOpen(false)}
        handleYes={handleDeleteUser}
      />
      <div className="card mt-1 px-3 py-1">
        <div>
          <Grid item xs={12}>
            <TabContext value={tabValue}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  marginTop: 0,
                  marginInline: 1,
                }}
              >
                <TabList
                  className=""
                  variant="fullWidth"
                  onChange={handelTabChange}
                >
                  <Tab
                    label="Active User & Subscription"
                    value={"activeUsersAndsubscriptions"}
                    // className="heading-tabs"
                  />
                  <Tab
                    label="Partners & Customers"
                    value={"partnersAndCustomers"}
                    // className="heading-tabs"
                  />
                </TabList>
              </Box>
              <TabPanel
                value="activeUsersAndsubscriptions"
                sx={{ marginTop: 0.3 }}
              >
                <div className="row align-items-center mb-0 ">
                  <div className="col-md-6">
                    <h5>Active Users & Subscriptions</h5>
                  </div>

                  <div className="col-md-6 d-flex justify-content-end">
                    <a
                      href={undefined}
                      className="text-violet font-size-16 cursor"
                      onClick={() => handleOpenAddUser()}
                    >
                      {" "}
                      + Invite New Members
                    </a>
                  </div>
                </div>

                <div
                  className="p-2 text-black font-size-14 mt-3 border-radius-10"
                  style={{ backgroundColor: "#872ff950" }}
                >
                  {totalUsers} users have subscribed to the plan
                </div>
                <div>
                  <div class="input-group icons border-radius-10 border overflow-hidden my-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-transparent border-0 pr-0 "
                        id="basic-addon1"
                      >
                        <img src={searchIcon} />
                      </span>
                    </div>
                    <input
                      type="search"
                      class="form-control search-form-control"
                      aria-label="Search Dashboard"
                      onChange={(e) => searchUserList(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <DataGridContainer>
                    <DataGrid
                      // loading={isLoading}
                      getRowId={(row) => row.userId}
                      sx={GRID_STYLE}
                      rows={userData}
                      columns={usersColumn}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      rowsPerPageOptions={[5, 10, 20, 50]}
                    />
                  </DataGridContainer>
                </div>
              </TabPanel>
              <TabPanel value="partnersAndCustomers" sx={{ marginTop: 0.3 }}>
                <div className="row align-items-center mb-0 ">
                  <div className="col-md-6">
                    <h5>Partners & Customers</h5>
                  </div>

                  <div className="col-md-6 d-flex justify-content-end">
                    <a
                      href={undefined}
                      className="text-violet font-size-16 cursor"
                      onClick={() => handleOpenAddCustomer()}
                    >
                      {" "}
                      + Invite New Members
                    </a>
                  </div>
                </div>

                <div
                  className="p-2 text-black font-size-14 mt-3 border-radius-10"
                  style={{ backgroundColor: "#872ff950" }}
                >
                  {totalUsers} users have subscribed to the plan
                </div>
                <div>
                  <div class="input-group icons border-radius-10 border overflow-hidden my-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text bg-transparent border-0 pr-0 "
                        id="basic-addon1"
                      >
                        <img src={searchIcon} />
                      </span>
                    </div>
                    <input
                      type="search"
                      class="form-control search-form-control"
                      aria-label="Search Dashboard"
                      onChange={(e) => searchUserList(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <DataGridContainer>
                    <DataGrid
                      // loading={isLoading}
                      getRowId={(row) => row.userId}
                      sx={GRID_STYLE}
                      rows={userData}
                      columns={customerPartnersColumn}
                      pageSize={pageSize}
                      onPageSizeChange={(newPageSize) =>
                        setPageSize(newPageSize)
                      }
                      rowsPerPageOptions={[5, 10, 20, 50]}
                    />
                  </DataGridContainer>
                </div>
              </TabPanel>
            </TabContext>
          </Grid>
        </div>
        <AddUserModal
          openAddUser={openAddUser}
          handleAddUserClose={handleAddUserClose}
          subscriberData={subscriberData}
          setSubscriberData={setSubscriberData}
          title={addUserModalTitle}
          addUser={addNewUser}
          updateUser={updateUser}
          roles={userRoles}
        />

        {openAddCustomer && (
          <AddCustomerModal
            openAddCustomer={openAddCustomer}
            handleAddCustomerClose={handleAddCustomerClose}
            subscriberData={customerData}
            setSubscriberData={setCustomerData}
            title={addUserModalTitle}
            addUser={addNewUser}
            updateUser={updateUser}
            roles={userRoles}
            dealerTypes={dealerTypes}
            handleSnack={handleSnack}
          />
        )}
        <ProductSummary
          show={openProductSummary}
          handleClose={() => setOpenProductSummary(false)}
          portfolio={dummyProductSummary}
          // addItem={}
        />

        {/* <EquipmentRecordModal
          show={openEquipmentRecordModal}
          handleClose={() => setOpenEquipmentRecordModal(false)}
          handleSnack={handleSnack}
        /> */}
      </div>
    </Fragment>
  );
};

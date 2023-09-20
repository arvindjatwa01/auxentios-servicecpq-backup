import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState, useEffect, Fragment } from "react";
import { fetchRoles, removeUser, getAllUsers, searchUsers, addUser, updateUserDetails } from "services/userServices";
import AddUserModal from "./AddUserModal";
import searchIcon from '../../assets/icons/svg/search.svg'
import penIcon from "../../assets/images/pen.png";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import { Tooltip, Box } from "@mui/material"
import { GRID_STYLE } from "pages/Repair/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { RenderConfirmDialog } from "pages/Repair/components/ConfirmationBox";

const DataGridContainer = (props) =>
(<Box
    margin={"auto"}
    sx={{
        backgroundColor: "#ffffff",
        height: 400,
        borderRadius: 5,
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }}
>{props.children}</Box>)

export const Users = (props) => {

    const [pageSize, setPageSize] = useState(5);
    const [userData, setUserData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [userRoles, setUserRoles] = useState([]);
    const [openAddUser, setOpenAddUser] = useState(false);
    const [addUserModalTitle, setAddUserModalTitle] = useState("Add User");

    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const newUser = {
        userId: "", firstName: "", lastName: "", password: "", roles: "", email: ""
    }
    const [subscriberData, setSubscriberData] = useState(newUser);
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
    const handleAddUserClose = () => {
        setOpenAddUser(false);
        setSubscriberData(newUser);
    }
    // Open spare part modal to view or edit
    const openUserRow = (row) => {
        console.log(row);
        setSubscriberData({
            ...row,
            roles: userRoles.find(
                (element) => row.roles[0].includes(element.label) > 0
            )
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
    }
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
        }
    ]
    const fetchUserRoles = async () => {
        await fetchRoles().then(fetchedRoles => {
            let uniqueRoles = fetchedRoles.filter((e, i) => fetchedRoles.findIndex(a => a['roleDispName'] === e['roleDispName']) === i)
            uniqueRoles?.map(indRole => { indRole.value = indRole.roleId; indRole.label = indRole.roleDispName; });
            setUserRoles(uniqueRoles);
        }).catch(e => {
            handleSnack("error", "Error occurred while fetching roles")
        })
    }
    const fetchUsers = async () => {
        await getAllUsers()
            .then(res => {
                setUserData(res);
                setTotalUsers(res.length);
            }).catch(e => handleSnack("error", "Error occurred while fetching users"))
    }

    const searchUserList = async (value) => {
        await searchUsers(`firstName~${value} OR lastName~${value} OR email~${value}`)
            .then(res => {
                setUserData(res);
            }).catch(e => handleSnack("error", "Error occurred while searching users"))
    }
    useEffect(() => {
        fetchUserRoles();
        fetchUsers();
    }, [])

    const handleOpenAddUser = () => {
        setSubscriberData(newUser);
        setAddUserModalTitle("Add User");
        setOpenAddUser(true);
    }
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
            type: "TENANT_BUSINESS_USER"
        }
        await addUser(data).then(res => {
            if (res) {
                handleSnack("success", "Added user successfully");
                fetchUsers();
                setOpenAddUser(false);
            }
        }).catch(e => handleSnack("error", "Error occurred while adding user"));
    }

    const updateUser = async () => {
        let data = {
            firstName: subscriberData.firstName,
            lastName: subscriberData.lastName,
            roles: [subscriberData.roles?.roleDispName],
            email: subscriberData.email,
        }
        await updateUserDetails(subscriberData.userId, data).then(res => {
            if (res) {
                handleSnack("success", "Updated user successfully");
                fetchUsers();
                setOpenAddUser(false);
            }
        }).catch(e => handleSnack("error", "Error occurred while adding user"))
    }
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
                    <div className="row align-items-center mb-0 ">

                        <div className="col-md-6" >
                            <h5>Active Users & Subscriptions</h5>
                        </div>

                        <div className="col-md-6 d-flex justify-content-end">
                            <a href={undefined} className="text-violet font-size-16 cursor" onClick={() => handleOpenAddUser()}> + Invite New Members</a>
                        </div>
                    </div>

                    <div className="p-2 text-black font-size-14 mt-3 border-radius-10" style={{ backgroundColor: '#872ff950' }}>{totalUsers} users have subscribed to the plan</div>
                    <div>
                        <div class="input-group icons border-radius-10 border overflow-hidden my-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                    <img src={searchIcon} /></span>
                            </div>
                            <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" onChange={(e) => searchUserList(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <DataGridContainer>
                            <DataGrid
                                // loading={isLoading}
                                getRowId={row => row.userId}
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
            </div>
        </Fragment>
    )

}
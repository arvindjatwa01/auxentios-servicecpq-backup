import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import TabPanel from '@mui/lab/TabPanel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import smalldeleteicon from '../../assets/icons/png/small-delete.png'
import { CommanComponents } from "../../components/index"
import searchIcon from '../../assets/icons/svg/search.svg'
import { Register, Configuration } from "./index";
import { RequestActivation, AccountActivated } from "../Profile/index"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AddUserModal from "./AddUserModal";
import { addUser, fetchRoles, getAllUsers, searchUsers } from "services/userServices";
import { DataGrid } from "@mui/x-data-grid";
import { GRID_STYLE } from "pages/Repair/CONSTANTS";

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

export function Account(props) {
    const [value, setValue] = React.useState('1');
    const [activeStep, setActiveStep] = useState(0)
    const [dValue, setDValue] = useState(null)
    const [roles, setRoles] = useState([]);
    const [openAddUser, setOpenAddUser] = useState(false);
    const steps = [
        'Register',
        'Setup Account',
        'Request Activation',
        'Account Activated',
        'Configuration',
        'Load Data',
        'Start Using',

    ];
    const [open, setOpen] = React.useState(false);
    const newUser = {
        firstName: "", lastName: "", password: "", role: "", emailId: ""
    }
    const [subscriberData, setSubscriberData] = useState(newUser);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAddUserClose = () => {
        setOpenAddUser(false);
        setSubscriberData(newUser);
    }

    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];
    const reasonForRequestOptions = [
        { value: 'accountUnlock', label: 'Account unlock' },
        { value: 'grantAccess', label: 'Grant access' },
        { value: 'buildNewUseCase', label: 'Build new use case' },
        { value: 'coDevelopUseCase', label: 'Co-develop use case' },
        { value: 'traning', label: 'Training ' },
        { value: 'systemDefect', label: 'System defect' },
        { value: 'productSupport', label: 'Product support' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const usersColumn = [
        { field: "firstName", headerName: "First Name", flex: 1, minWidth: 100 },
        { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 100 },
        { field: "emailId", headerName: "Email Id", flex: 1, minWidth: 100 },
        { field: "roles", headerName: "Role", flex: 1, minWidth: 100 },
    ]

    const handleStep = (step) => {
        setActiveStep(step);
    };
    const handleChangeSelect = (e) => {
        setDValue(e)
    }
    const handleRequestActivation = (e) => {
        props.parentCallback()
    }
    const [pageSize, setPageSize] = useState(5);
    const [userData, setUserData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const fetchUserRoles = async () => {
        await fetchRoles().then(fetchedRoles => {
            fetchedRoles?.map(indRole => { indRole.value = indRole.roleId; indRole.label = indRole.roleName; });
            setRoles(fetchedRoles);
        }).catch(e => {
            console.log(e);
        })
    }
    const fetchUsers = async () => {
        await getAllUsers()
        .then(res => {
            setUserData(res);
            setTotalUsers(res.length);
        }).catch(e => console.log(e))
    }

    const searchUserList = async (value) => {
        await searchUsers(`firstName~${value} OR lastName~${value} OR email~${value}`)
            .then(res => {
                setUserData(res);
            }).catch(e => console.log(e))
    }
    useEffect(() => {
        fetchUserRoles();
        fetchUsers();
    }, [])

    const addNewUser = async () => {
        console.log(subscriberData);
        let data = {
            firstName: subscriberData.firstName,
            lastName: subscriberData.lastName,
            // roleName: subscriberData.role?.roleName,
            roleName: "PRODUCT_EXPERT",
            email: subscriberData.emailId,
            password: subscriberData.password,
            isApproved: true,
            type: "TENANT_BUSINESS_USER"
        }
        await addUser(data).then(res => {
            if (res) {
                alert("Added business user successfully")
            }
        }).catch(e => console.log(e))
    }


    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid mt-3">
                {/*<div className="row">
                     <div className="col-md-12 col-sm-12 mx-auto">
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label, index) => (
                                    <Step className="cursor" key={label} onClick={() => handleStep(index)}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </div> 
                </div>*/}
                <h4 className="mt-5">Account</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Setup Account" value="1" />
                                <Tab label="Request Information" value="2" />
                                <Tab label="Configuration" value="3" />
                                {/* <Tab label="Support Plan" value="4" />
                                    <Tab label="Cloud regions" value="5" />
                                    <Tab label="Subscriptions" value="6" />
                                    <Tab label="Order" value="7" />
                                    <Tab label="Request" value="8" />
                                    <Tab label="Bills" value="9" />
                                    <Tab label="Invoices" value="10" /> */}
                            </TabList>
                        </Box>

                        <TabPanel className="p-0" value="1">
                            <div className="Account-custom-tabs">
                                <div class="row mt-5">
                                    <div class="col-2 text-center">
                                        <ul class="nav nav-tabs tabs-left sideways">
                                            <li class=""><a className="active" href="#settings-v" data-toggle="tab">Settings</a></li>
                                            <li><a href="#contact-v" data-toggle="tab">Contact</a></li>
                                            <li><a href="#users-v" data-toggle="tab">Users</a></li>
                                            <li><a href="#supportplans-v" data-toggle="tab">Support Plans</a></li>
                                            <li><a href="#cloudregions-v" data-toggle="tab">Cloud Regions</a></li>
                                            {/* <li><a href="#subscriptions-v" data-toggle="tab">Subscriptions</a></li> */}
                                            <li><a href="#orders-v" data-toggle="tab">Orders</a></li>
                                            <li><a href="#requests-v" data-toggle="tab">Requests</a></li>
                                            <li><a href="#bills-v" data-toggle="tab">Bills</a></li>
                                            <li><a href="#invoices-v" data-toggle="tab">Invoices</a></li>
                                        </ul>
                                    </div>

                                    <div class="col-10">
                                        <div className="card p-3">
                                            <div class="tab-content">
                                                <div class="tab-pane active" id="settings-v">
                                                    <div className="card mt-3 p-3">
                                                        <h5 className="d-flex align-items-center mb-0">
                                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account settings</span></div>
                                                            <div className="hr"></div>
                                                        </h5>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ACCOUNT ID</label>
                                                                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Auto generated" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ACCOUNT NAME</label>
                                                                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Business Name" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ALIAS</label>
                                                                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Alias" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">payment frequency</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Monthly / quarterly / annually"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">payment mode</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Wire transfer / Stripe / Credit Card"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">currency for billing</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="USD"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">type of business</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Manufacturer / OEM / Dealer / Service Provider"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">company type</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Large / Medium / Small"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">fiscal year</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Jan to Dec / August to July"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <div className="d-flex mt-3">
                                                                <div className="mr-3"><a href="#" className="bg-primary text-white btn font-size-12">Request for Extension</a></div>
                                                                <p>You will receive an email to confirm your decision. This will not end your subscription or payments and you will continue to be charged. You can cancel your subscription, or switch payment methods to keep the the subscription active.
                                                                    This can't be reversed. All the data and transactions you've created will be permanently erased.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <div className="d-flex mt-3">
                                                                <div className="mr-3"><a href="#" className="bg-red text-white btn font-size-12"><img className="mr-2" src={smalldeleteicon}></img>Request for Deactivation</a></div>
                                                                <p>You will receive an email to confirm your decision. This will not end your subscription or payments and you will continue to be charged. You can cancel your subscription, or switch payment methods to keep the the subscription active.
                                                                    This can't be reversed. All the data and transactions you've created will be permanently erased.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="contact-v">

                                                    <div className="card  mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Contact Information</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row mt-3">
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">Full name</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">ADDRESS</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">CITY</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">STATE</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">COUNTRY</label>
                                                                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">PHONE NUMBER (PRIMARY)</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">PHONE NUMBER (SECONDARY)</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>


                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">COMMUNICATION PREFERENCE</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="Manufacturer / OEM / Dealer / Service Provider"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">WEBSITE URL</label>
                                                                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Contact Information</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                                    <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                                                    <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row">
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">Full name</p>
                                                                        <h6 class="font-weight-600">Jane</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">ADDRESS</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">CITY</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">STATE</p>
                                                                        <h6 class="font-weight-600">Jane</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">COUNTRY</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">PHONE NUMBER (PRIMARY)</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">PHONE NUMBER (SECONDARY)</p>
                                                                        <h6 class="font-weight-600">Jane</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">COMMUNICATION PREFERENCE</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">WEBSITE URL</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card  overflow-hidden mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Alternate contact</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row mt-3">
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">BILLING CONTACT</label>
                                                                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">OPERATIONS CONTACT</label>
                                                                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">SECURITY CONTACT</label>
                                                                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">CONTACT EMAIL</label>
                                                                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">CONTACT NUMBER</label>
                                                                        <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Alternate contact</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                                    <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                                                    <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row mt-3">
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">BILLING CONTACT</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">OPERATIONS CONTACT</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">SECURITY CONTACT</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">CONTACT EMAIL</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div class="form-group">
                                                                        <p class="font-size-14 mb-2">CONTACT NUMBER</p>
                                                                        <h6 class="font-weight-600">Doe</h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="users-v">
                                                    <div className="card mt-1 px-3 py-1">
                                                        <div>
                                                            <h5 className="row align-items-center mb-0 ">
                                                                <div className="col-md-6" ><span className="mr-3" style={{ whiteSpace: 'pre' }}>Active Users & Subscriptions</span></div>
                                                                <div className="col-md-6 d-flex justify-content-end">
                                                            <a href={undefined} className="text-violet font-size-16 cursor" onClick={() => setOpenAddUser(true)}> + Invite New Members</a>
                                                        </div>
                                                            </h5>
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
                                                                        //   columnVisibilityModel={columnVisibilityModel}
                                                                        //   onColumnVisibilityModelChange={(newModel) =>
                                                                        //     setColumnVisibilityModel(newModel)
                                                                        //   }
                                                                        pageSize={pageSize}
                                                                        onPageSizeChange={(newPageSize) =>
                                                                            setPageSize(newPageSize)
                                                                        }
                                                                        rowsPerPageOptions={[5, 10, 20, 50]}
                                                                    />
                                                                </DataGridContainer>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="supportplans-v">
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 ">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Active Plan
                                                                </span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <RadioGroup className='my-3'
                                                                row
                                                                aria-labelledby="demo-form-control-label-placement"
                                                                name="position"
                                                                defaultValue="top"
                                                            >
                                                                <div className="col-md-4">

                                                                    <div className="w-100 m-0 mb-3 p-2 d-flex custom-radio py-4 align-itemsstart border">
                                                                        <FormControlLabel className="m-0" value="end" control={<Radio />} label="" />
                                                                        <div className="ml-2">
                                                                            <span>Momentum </span><br /><span>$100</span><br /><span>user / month</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 ">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Support</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <p className="mt-3">View or Update <a href="#" className="text-violet" onClick={() => setOpen(true)}>support plans</a></p>
                                                        </div>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 ">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Deactivation</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="d-flex mt-3">
                                                                <div className="mr-3"><a href="#" className="bg-red text-white btn font-size-12"><img className="mr-2" src={smalldeleteicon}></img>Request for Deactivation</a></div>
                                                                <p>You will receive an email to confirm your decision. This will not end your subscription or payments and you will continue to be charged. You can cancel your subscription, or switch payment methods to keep the the subscription active.
                                                                    This can't be reversed. All the data and transactions you've created will be permanently erased.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="cloudregions-v">
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 ">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account regions</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <RadioGroup className='my-3'
                                                                row
                                                                aria-labelledby="demo-form-control-label-placement"
                                                                name="position"
                                                                defaultValue="top"
                                                            >

                                                                <div className="col-md-3">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                                        value="Asia"
                                                                        control={<Radio />}
                                                                        label="Asia"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Africa"
                                                                        control={<Radio />}
                                                                        label="Africa"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Australia"
                                                                        control={<Radio />}
                                                                        label="Australia"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Europe"
                                                                        control={<Radio />}
                                                                        label="Europe"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="USA(East)"
                                                                        control={<Radio />}
                                                                        label="USA(East)"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="USA(West)"
                                                                        control={<Radio />}
                                                                        label="USA(West)"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                            </RadioGroup>

                                                        </div>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 ">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account regions</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <RadioGroup className='my-3'
                                                                row
                                                                aria-labelledby="demo-form-control-label-placement"
                                                                name="position"
                                                                defaultValue="top"
                                                            >

                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                                        value="AWS"
                                                                        control={<Radio />}
                                                                        label="AWS"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="GCP"
                                                                        control={<Radio />}
                                                                        label="GCP"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Microsoft"
                                                                        control={<Radio />}
                                                                        label="Microsoft"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div class="tab-pane" id="subscriptions-v">
                                                    Subscription Tab.
                                                </div> */}
                                                <div class="tab-pane" id="orders-v">
                                                    <div className="card mt-3 p-3">
                                                        <h5 className="d-flex align-items-center mb-0 ">
                                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Order preference</span></div>
                                                            <div className="hr"></div>
                                                        </h5>
                                                        <RadioGroup className='my-3'
                                                            row
                                                            aria-labelledby="demo-form-control-label-placement"
                                                            name="position"
                                                            defaultValue="top"
                                                        >

                                                            <div className="col-md-3">
                                                                <FormControlLabel
                                                                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                                    value="Asia"
                                                                    control={<Radio />}
                                                                    label="Provision & Support"
                                                                    labelPlacement="bottom"
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <FormControlLabel
                                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                    value="Africa"
                                                                    control={<Radio />}
                                                                    label="AI co-development"
                                                                    labelPlacement="bottom"
                                                                />
                                                            </div>

                                                        </RadioGroup>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <h5 className="d-flex align-items-center mb-0 ">
                                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Order Status</span></div>
                                                            <div className="hr"></div>
                                                        </h5>
                                                        <RadioGroup className='my-3'
                                                            row
                                                            aria-labelledby="demo-form-control-label-placement"
                                                            name="position"
                                                            defaultValue="top"
                                                        >

                                                            <div className="col-md-3">
                                                                <div className="w-100  mb-3 text-left p-2 card py-4  border">
                                                                    <FormControlLabel
                                                                        className="align-itemsstart m-0"
                                                                        value="Account Active"
                                                                        control={<Radio />}
                                                                        label=""
                                                                        labelPlacement="bottom"
                                                                    />
                                                                    <p> Account Active</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                                                    <FormControlLabel
                                                                        className="m-0 align-itemsstart"
                                                                        value="Do it with us"
                                                                        control={<Radio />}
                                                                        label=""
                                                                        labelPlacement="bottom"
                                                                    />
                                                                    <p>Momentum Price Plan<br />
                                                                        $100<br />
                                                                        User / month</p>
                                                                </div>
                                                            </div>

                                                        </RadioGroup>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <h5 className="d-flex align-items-center mb-0 ">
                                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Delivery request</span></div>
                                                            <div className="hr"></div>
                                                        </h5>
                                                        <RadioGroup className='my-3'
                                                            row
                                                            aria-labelledby="demo-form-control-label-placement"
                                                            name="position"
                                                            defaultValue="top"
                                                        >

                                                            <div className="col-md-3">
                                                                <div className="w-100  mb-3 text-left p-2 card py-4  border">
                                                                    <FormControlLabel
                                                                        className="align-itemsstart m-0"
                                                                        value="Asia"
                                                                        control={<Radio />}
                                                                        label="Do it ourselves"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                    <p> We help with provision and support, all other activities are carried out by your team</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                                                    <FormControlLabel
                                                                        className="m-0 align-itemsstart"
                                                                        value="Do it with us"
                                                                        control={<Radio />}
                                                                        label="Do it with us"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                    <p>Our experts assist you with requirement mapping, consulting, data loading, test scripts and training</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                                                    <FormControlLabel
                                                                        className="m-0 align-itemsstart"
                                                                        value="Do it for us"
                                                                        control={<Radio />}
                                                                        label="Do it for us"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                    <p> We own the solution delivery with support from your team</p>
                                                                </div>
                                                            </div>

                                                        </RadioGroup>
                                                    </div>
                                                    <div className="Add-new-segment-div p-3 border-radius-10">
                                                        <a href="#" className="btn bg-primary text-white">Request activation</a>
                                                    </div>
                                                    <div className="Add-new-segment-div p-3 border-radius-10 mt-3">
                                                        <a href="#" className="btn bg-primary text-white">Configure System</a>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="requests-v">
                                                    <div className="card  mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 mt-4">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}> Support Tickets</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row mt-4">
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="1234567"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">SUPPORT TYPE</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="USD"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">SUPPORT PLAN</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Momentum" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">START DATE</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">CONTRACT END DATE</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="10.01.2023" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">STATUS</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Active" />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                        <a href="#" className="btn bg-primary text-white">Request Type</a>
                                                    </div>
                                                    <div className="card mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 ">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Request for</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <RadioGroup className='my-3'
                                                                row
                                                                aria-labelledby="demo-form-control-label-placement"
                                                                name="position"
                                                                defaultValue="top"
                                                            >

                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                                        value="Account related"
                                                                        control={<Radio />}
                                                                        label="Account related"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Access related"
                                                                        control={<Radio />}
                                                                        label="Access related"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Functionality related"
                                                                        control={<Radio />}
                                                                        label="Functionality related"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Billing & Price plan"
                                                                        control={<Radio />}
                                                                        label="Billing & Price plan"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <FormControlLabel
                                                                        className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                                        value="Deactivation(East)"
                                                                        control={<Radio />}
                                                                        label="USA(Deactivation)"
                                                                        labelPlacement="bottom"
                                                                    />
                                                                </div>
                                                            </RadioGroup>

                                                        </div>
                                                    </div>
                                                    <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                        <a href="#" className="btn bg-primary text-white">Create Service Request</a>
                                                    </div>
                                                    <div className="card  mt-3 p-3">
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">REASON FOR REQUEST</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={reasonForRequestOptions}
                                                                        placeholder="Account unlock"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">DESCRIPTION(Short description)</label>
                                                                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">BRIEF DESCRIPTION(long description)</label>
                                                                    <div>
                                                                        <TextareaAutosize className="w-100 form-control"
                                                                            aria-label="minimum height"
                                                                            minRows={3}
                                                                            placeholder="Placeholder (Optional)"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">USER NAME</label>
                                                                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Defaulted by system" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">EMAIL (if not same in profile)</label>
                                                                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CONTACT (if not same in profile)</label>
                                                                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 col-sm-12">
                                                                <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                                    <a href="#" className="btn bg-primary text-white"><span className="mr-2">+</span>Add Attachments</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="bills-v">
                                                    <div className="card  mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 mt-4">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Billing Plan</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row mt-4">
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT NO.</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="1234567"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">CURRENCY</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="USD"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">PRICE PLAN</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Momentum" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">NUMBER OF USER</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="30" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="$3000" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 col-sm-12">
                                                                    <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                                        <a href="#" className="btn bg-primary text-white">Generate pdf</a>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card  mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 mt-4">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Adhoc Plan</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row mt-4">
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT NO.</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="Choose"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">CURRENCY</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="Choose"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">PRICE PLAN</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Auto Generated" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">NUMBER OF USER</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 col-sm-12">
                                                                    <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                                        <a href="#" className="btn bg-primary text-white">Manual Invoice</a>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="invoices-v">
                                                    <div className="card  mt-3 p-3">
                                                        <div>
                                                            <h5 className="d-flex align-items-center mb-0 mt-4">
                                                                <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Past Invoices</span></div>
                                                                <div className="hr"></div>
                                                            </h5>
                                                            <div className="row mt-4">
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE NUMBER</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-sm-4">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE / MONTH</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="January" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mt-2">
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT NO.</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="1234567"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group">
                                                                        <label className="font-size-14 " for="exampleInputEmail1">INVOICE NUMBER</label>
                                                                        <Select
                                                                            defaultValue={selectedOption}
                                                                            onChange={setSelectedOption}
                                                                            options={options}
                                                                            placeholder="USD"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="$4000" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2 col-sm-2">
                                                                    <div className="form-group ">
                                                                        <label class="font-size-14 " for="exampleInputEmail1">STATUS</label>
                                                                        <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Paid" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 col-sm-12">
                                                                    <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                                        <a href="#" className="btn bg-primary text-white">Generate pdf</a>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="p-0" value="2">
                            <div className="card mt-3 p-3">
                                <h5 className="d-flex align-items-center mb-0 ">
                                    <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Order preference</span></div>
                                    <div className="hr"></div>
                                </h5>
                                <RadioGroup className='my-3'
                                    row
                                    aria-labelledby="demo-form-control-label-placement"
                                    name="position"
                                    defaultValue="top"
                                >

                                    <div className="col-md-3">
                                        <FormControlLabel
                                            className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                            value="Asia"
                                            control={<Radio />}
                                            label="Provision & Support"
                                            labelPlacement="bottom"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FormControlLabel
                                            className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                            value="Africa"
                                            control={<Radio />}
                                            label="AI co-development"
                                            labelPlacement="bottom"
                                        />
                                    </div>

                                </RadioGroup>
                            </div>
                            <div className="card mt-3 p-3">
                                <h5 className="d-flex align-items-center mb-0 ">
                                    <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Delivery request</span></div>
                                    <div className="hr"></div>
                                </h5>
                                <RadioGroup className='my-3'
                                    row
                                    aria-labelledby="demo-form-control-label-placement"
                                    name="position"
                                    defaultValue="top"
                                >

                                    <div className="col-md-3">
                                        <div className="w-100  mb-3 text-left p-2 card py-4  border">
                                            <FormControlLabel
                                                className="align-itemsstart m-0"
                                                value="Asia"
                                                control={<Radio />}
                                                label="Do it ourselves"
                                                labelPlacement="bottom"
                                            />
                                            <p> We help with provision and support, all other activities are carried out by your team</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                            <FormControlLabel
                                                className="m-0 align-itemsstart"
                                                value="Do it with us"
                                                control={<Radio />}
                                                label="Do it with us"
                                                labelPlacement="bottom"
                                            />
                                            <p>Our experts assist you with requirement mapping, consulting, data loading, test scripts and training</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                            <FormControlLabel
                                                className="m-0 align-itemsstart"
                                                value="Do it for us"
                                                control={<Radio />}
                                                label="Do it for us"
                                                labelPlacement="bottom"
                                            />
                                            <p> We own the solution delivery with support from your team</p>
                                        </div>
                                    </div>

                                </RadioGroup>
                            </div>
                            <div className="Add-new-segment-div p-3 border-radius-10">
                                <a href="#" onClick={handleRequestActivation} className="btn bg-primary text-white">Request activation</a>
                            </div>

                        </TabPanel>


                        <TabPanel className="p-0" value="3">
                            <div className="Account-custom-tabs">
                                <div class="row mt-5">
                                    <div class="col-2 text-center">
                                        <ul class="nav nav-tabs tabs-left sideways">
                                            <li class=""><a className="active" href="#activemodules-v" data-toggle="tab">Active Modules</a></li>
                                            <li><a href="#businessarea-v" data-toggle="tab">Business Area</a></li>
                                            <li><a href="#rulespermisssion-v" data-toggle="tab">Rules & Permissions</a></li>
                                            <li><a href="#systemsettings-v" data-toggle="tab">System Settings</a></li>
                                            <li><a href="#visualisationoptions-v" data-toggle="tab">Visualisation Options</a></li>
                                            <li><a href="#pricesettings-v" data-toggle="tab">Price Settings</a></li>
                                            <li><a href="#documenteditableoptions-v" data-toggle="tab">Document Editable Options</a></li>
                                            <li><a href="#loaddata-v" data-toggle="tab">Load Data</a></li>
                                        </ul>
                                    </div>
                                    <div class="col-10">
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="activemodules-v">
                                                <div className="row">
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <h5>Active Modules</h5>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Repair Builder" />
                                                                    <FormControlLabel control={<Checkbox />} label="Solution Builder" />
                                                                    <FormControlLabel control={<Checkbox />} label="Price Configurator" />
                                                                    <FormControlLabel control={<Checkbox />} label="Quote Configurator" />
                                                                    <FormControlLabel control={<Checkbox />} label="Commerce" />
                                                                    <FormControlLabel control={<Checkbox />} label="Master Data" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <h5>Active Sub-Modules</h5>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Repair Option" />
                                                                    <FormControlLabel control={<Checkbox />} label="Part List" />
                                                                    <FormControlLabel control={<Checkbox />} label="Maintenance & Repair Template" />
                                                                    <FormControlLabel control={<Checkbox />} label="Kit" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="card p-3 mt-2">
                                                            <h5>Active Sub-Modules</h5>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Portfolio" />
                                                                    <FormControlLabel control={<Checkbox />} label="Service Programs" />
                                                                    <FormControlLabel control={<Checkbox />} label="Guided Selling" />
                                                                    <FormControlLabel control={<Checkbox />} label="Solution Configuration" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="card p-3 mt-2">
                                                            <h5>Active Sub-Modules</h5>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Repair Quote" />
                                                                    <FormControlLabel control={<Checkbox />} label="Soution Quote" />
                                                                    <FormControlLabel control={<Checkbox />} label="Spare Parts Quote" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <h5>Additional Modules</h5>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Al Price Recommendation" />
                                                                    <FormControlLabel control={<Checkbox />} label="Al Product Recommendation" />
                                                                    <FormControlLabel control={<Checkbox />} label="Chat & Collaboration" />
                                                                    <FormControlLabel control={<Checkbox />} label="ERP Integration" />
                                                                    <FormControlLabel control={<Checkbox />} label="CRM Integration" />
                                                                    <FormControlLabel control={<Checkbox />} label="Third Party Integration" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="businessarea-v">
                                                <div className="card  mt-3 p-3">
                                                    <div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">COUNTRY</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="USA"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">SALES BRANCH+</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="New York"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="font-size-14 " for="exampleInputEmail1">RELATED ERP ORGANISATION</label>
                                                                    <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Long Isiand" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="font-size-14 " for="exampleInputEmail1">SALES ORGANISATION </label>
                                                                    <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="USA" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">SALES BRANCH+</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Long Isiand"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="font-size-14 " for="exampleInputEmail1">RELATED ERP ORGANISATION</label>
                                                                    <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Long Isiand" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">CHANNEL</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Long Isiand"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="font-size-14 " for="exampleInputEmail1">DISPLAYED BUISSNESS NAME</label>
                                                                    <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Long Isiand" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">DEFAULT CURRENCY</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Long Isiand"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="font-size-14 " for="exampleInputEmail1">DISPLAYED ADDRESS</label>
                                                                    <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Long Isiand" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="font-size-14 " for="exampleInputEmail1">DISPLAYED BUISSNESS NAME</label>
                                                                    <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Long Isiand" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-md-4 col-sm-4">
                                                                <div className="form-group ">
                                                                    <label class="font-size-14 " for="exampleInputEmail1">DISPLAYED ADDRESS</label>
                                                                    <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="Long Isiand" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="rulespermisssion-v">
                                                <div className="maintableheader bg-white mt-3 border-radius-10 p-3 mt-3 ">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10">
                                                            <div className="d-flex align-items-center">
                                                                <span className="mr-3">Document</span>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="Repair Quote"
                                                                    /> <span>
                                                                        <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" /></a>
                                                                    </span>
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="&"
                                                                    />
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder=""
                                                                    /> <span>
                                                                        <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" /></a>
                                                                    </span>
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="&"
                                                                    />
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="%"
                                                                    /> <span>
                                                                        <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" /></a>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <a href="#" className="btn-sm text-violet border" style={{ border: '1px solid #872FF7' }}>+</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" style={{ color: '#DD9088' }} /></a>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <a href="#" className="btn alert-messges ">Add Rules  <AddBoxOutlinedIcon /></a>
                                                    </div>
                                                    <div className="mt-3 text-right">
                                                        <a href="#" className="btn bg-green btn text-white mr-3">Save</a>
                                                        <a href="#" className="btn border ">Cancel</a>
                                                    </div>
                                                </div>
                                                <div className="maintableheader bg-white mt-3 border-radius-10 p-3 mt-3 ">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10">
                                                            <div className="d-flex align-items-center">
                                                                <span className="mr-3">Document</span>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="Repair Quote"
                                                                    /> <span>
                                                                        <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" /></a>
                                                                    </span>
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="&"
                                                                    />
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder=""
                                                                    /> <span>
                                                                        <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" /></a>
                                                                    </span>
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        // onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        // value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="&"
                                                                    />
                                                                </div>
                                                                <div className="customselect d-flex align-items-center mr-3">
                                                                    <Select
                                                                        onChange={handleChangeSelect}
                                                                        isClearable={true}
                                                                        value={dValue}
                                                                        options={[{ label: "One", value: "one" }]}
                                                                        placeholder="%"
                                                                    /> <span>
                                                                        <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" /></a>
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <a href="#" className="btn-sm text-violet border" style={{ border: '1px solid #872FF7' }}>+</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <a href="#" className="btn-sm"><DeleteIcon className="font-size-14" style={{ color: '#DD9088' }} /></a>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <a href="#" className="btn alert-messges " data-toggle="modal" data-target="#myModal2">View/Add Approvers  <AddBoxOutlinedIcon /></a>
                                                    </div>
                                                    <div className="mt-3 text-right">
                                                        <a href="#" className="btn bg-green btn text-white mr-3">Edit</a>
                                                        <a href="#" className="btn border ">Cancel</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="systemsettings-v">
                                                <div className="row">
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <div className="form-group">
                                                                <label className="font-size-14 " for="exampleInputEmail1">DOCUMENT TYPE</label>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    placeholder="Portfolio/Program"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <a href="#" className="bg-green btn text-white"><span className="mr-2">+</span>Add New</a>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-4">
                                                        <div className="card Add-new-segment-div p-3">
                                                            <div>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div><label className="font-size-14 " for="exampleInputEmail1">DOCUMENT TYPE</label></div>
                                                                    <div><a href="#" className="btn-sm bg-lightparpal text-white">+</a></div>
                                                                </div>
                                                                <div className="d-flex customizeselecter">
                                                                    <Select className="first-Select"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Portfolio/Program"
                                                                    />
                                                                    <Select className="w-100"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Portfolio/Program"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className=" mt-3">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div><label className="font-size-14 " for="exampleInputEmail1">HEADER-STRATEGY</label></div>
                                                                    <div><a href="#" className="btn-sm bg-lightparpal text-white">+</a></div>
                                                                </div>
                                                                <div className="d-flex customizeselecter">
                                                                    <Select className="first-Select"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Strategy Task"
                                                                    />
                                                                    <Select className="w-100"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Placeholder(Optional)"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mt-3">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div><label className="font-size-14 " for="exampleInputEmail1">HEADER-COVERAGE</label></div>
                                                                    <div><a href="#" className="btn-sm bg-lightparpal text-white">+</a></div>
                                                                </div>
                                                                <div className="d-flex customizeselecter">
                                                                    <Select className="first-Select"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Make"
                                                                    />
                                                                    <Select className="w-100"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Placeholder(Optional)"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="mt-3">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div><label className="font-size-14 " for="exampleInputEmail1">HEADER PRICE LIST</label></div>
                                                                </div>
                                                                <div className="d-flex customizeselecter">
                                                                    <Select className="first-Select"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Price Methods"
                                                                    />
                                                                    <Select className="w-100"
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Placeholder(Optional)"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="visualisationoptions-v">
                                                <div className="row">
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <div className="form-group">
                                                                <label className="font-size-14 " for="exampleInputEmail1">BUISNESS ROLE</label>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    placeholder="Product Expert"
                                                                />
                                                            </div>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="display price" />
                                                                    <FormControlLabel control={<Checkbox />} label="search price" />
                                                                    <FormControlLabel control={<Checkbox />} label="display net value" />
                                                                    <FormControlLabel control={<Checkbox />} label="display descounts" />
                                                                    <FormControlLabel control={<Checkbox />} label="modify net value" />
                                                                    <FormControlLabel control={<Checkbox />} label="display price breakdown" />
                                                                    <FormControlLabel control={<Checkbox />} label="approve or reject colleagu'e work" />
                                                                    <FormControlLabel control={<Checkbox />} label="share data" />
                                                                    <FormControlLabel control={<Checkbox />} label="display master data" />
                                                                    <FormControlLabel control={<Checkbox />} label="search master data" />
                                                                    <FormControlLabel control={<Checkbox />} label="display colleague's work" />
                                                                    <FormControlLabel control={<Checkbox />} label="search colleague's work" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Date Format</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="12 hours" />
                                                                    <FormControlLabel control={<Checkbox />} label="24 hours" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="form-group">
                                                                <label className="font-size-14 " for="exampleInputEmail1">TIMEZONE</label>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    placeholder="GMT + 5:30"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-size-14 " for="exampleInputEmail1">TIME FORMAT</label>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    placeholder="HH:MM:SS"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-size-14 " for="exampleInputEmail1">DATE FORMAT</label>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    placeholder="DD/MM/YYYY"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="font-size-14 " for="exampleInputEmail1">LANGUAGE</label>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    placeholder="EN"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Currency Format</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="123.xy" />
                                                                    <FormControlLabel control={<Checkbox />} label="123,xy" />
                                                                    <FormControlLabel control={<Checkbox />} label="123,45,xy" />
                                                                    <FormControlLabel control={<Checkbox />} label="123,45,xy" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="tab-pane" id="pricesettings-v">
                                                <div className="row">
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <div className="form-group">
                                                                <label className="font-size-14 " for="exampleInputEmail1">BUISNESS ROLE</label>
                                                                <Select
                                                                    defaultValue={selectedOption}
                                                                    onChange={setSelectedOption}
                                                                    options={options}
                                                                    placeholder="Product Expert"
                                                                />
                                                            </div>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="overwrite price" />
                                                                    <FormControlLabel control={<Checkbox />} label="overwrite header price" />
                                                                    <FormControlLabel control={<Checkbox />} label="maintain manual price" />
                                                                    <FormControlLabel control={<Checkbox />} label="overwrite net value" />
                                                                    <FormControlLabel control={<Checkbox />} label="overwrite discounts" />
                                                                    <FormControlLabel control={<Checkbox />} label="maintain flat rate" />
                                                                    <FormControlLabel control={<Checkbox />} label="overwrite item price" />
                                                                    <FormControlLabel control={<Checkbox />} label="price recommendation active" />
                                                                    <FormControlLabel control={<Checkbox />} label="switch to past date price" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Set exclusion rules spare parts</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Rule A" />
                                                                    <FormControlLabel control={<Checkbox />} label="Rule B" />
                                                                    <FormControlLabel control={<Checkbox />} label="Rule C" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Set exclusion rules Services</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Rule A" />
                                                                    <FormControlLabel control={<Checkbox />} label="Rule B" />
                                                                    <FormControlLabel control={<Checkbox />} label="Rule C" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-3">
                                                        <div className="form-group ">
                                                            <label class="font-size-14 " for="exampleInputEmail1">DEFAULT MARGIN PARTS</label>
                                                            <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="10%" />
                                                        </div>
                                                        <div className="form-group ">
                                                            <label class="font-size-14 " for="exampleInputEmail1">DEFAULT MARGIN LABOR</label>
                                                            <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="20%" />
                                                        </div>
                                                        <div className="form-group ">
                                                            <label class="font-size-14 " for="exampleInputEmail1">DEFAULT MARGIN MISC.</label>
                                                            <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="10%" />
                                                        </div>
                                                        <div className="form-group ">
                                                            <label class="font-size-14 " for="exampleInputEmail1">IF % ON TOTAL MISC.(DEFAULT) </label>
                                                            <input type="email" class="form-control " aria-describedby="emailHelp" placeholder="15%" />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3 mt-3">
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Spare parts / Component</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Cost Price" />
                                                                    <FormControlLabel control={<Checkbox />} label="List Price" />
                                                                    <FormControlLabel control={<Checkbox />} label="Contract price" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Labor Rates</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Cost Price" />
                                                                    <FormControlLabel control={<Checkbox />} label="List Price" />
                                                                    <FormControlLabel control={<Checkbox />} label="Contract Price" />
                                                                    <FormControlLabel control={<Checkbox />} label="Fait rate" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Misc</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="% of Tatal (On Labor) " />
                                                                    <FormControlLabel control={<Checkbox />} label="% of Tatal (On Total price) " />
                                                                    <FormControlLabel control={<Checkbox />} label="Flat rate" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mt-3">
                                                        <div className="card p-3">
                                                            <label className="font-size-14 " for="exampleInputEmail1">Portfolio / Bundles / Services</label>
                                                            <div>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Option Price" />
                                                                    <FormControlLabel control={<Checkbox />} label="List Price" />
                                                                    <FormControlLabel control={<Checkbox />} label="Manual Price" />
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="documenteditableoptions-v">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <div className="row">
                                                            <div className="col-md-5 mt-3">
                                                                <div className="form-group">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">FOR DOCUMENT CONETNTS</label>
                                                                    <Select
                                                                        defaultValue={selectedOption}
                                                                        onChange={setSelectedOption}
                                                                        options={options}
                                                                        placeholder="Product Expert"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-7 mt-3">
                                                                <div className=" card p-3">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">Changebale Fields</label>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div>
                                                                                <FormGroup>
                                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="All Fields" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Description" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Quantity" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Comments" />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div>
                                                                                <FormGroup>
                                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Price" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Owner" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Date" />
                                                                                    <FormControlLabel control={<Checkbox />} label="% Usage" />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="Add-new-segment-div p-3 border-radius-10">
                                                                    <a href="#" className="btn bg-green text-white">Apply Settings</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="loaddata-v">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-12 mt-3">
                                                                <div className=" card p-3">
                                                                    <label className="font-size-14 " for="exampleInputEmail1">Changebale Fields</label>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div>
                                                                                <FormGroup>
                                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Customer" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Equipment" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Spare Parts" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Component Code" />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div>
                                                                                <FormGroup>
                                                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Job Code" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Consumable" />
                                                                                    <FormControlLabel control={<Checkbox />} label="External Work" />
                                                                                    <FormControlLabel control={<Checkbox />} label="Price" />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="Add-new-segment-div p-3 border-radius-10">
                                                                    <a href="#" className="btn bg-green text-white">Load Data</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" col-md-12 mt-3">
                                                        <div className=" row">
                                                            <div className=" col-md-6">
                                                                <div className=" card p-3">
                                                                    <h6>Import File</h6>
                                                                    <div className="add-new-recod">
                                                                        <div>
                                                                            <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                                                            <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                                                            <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                                                        </div>
                                                                    </div>
                                                                    <p className="mt-3">Single upload file should not be more than 10MB. Only the  .xls, .xlsx file types are allowed</p>

                                                                    <div>
                                                                        <div className="recent-items mt-3">
                                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Customer</span></p>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="white-space custom-checkbox">
                                                                                        <FormGroup>
                                                                                            <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                                                                        </FormGroup>
                                                                                    </div>
                                                                                    <a href="#" className="ml-3 font-size-14"><FileUploadOutlinedIcon /></a>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                                                            <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="recent-items mt-3">
                                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Equipment</span></p>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="white-space custom-checkbox">
                                                                                        <FormGroup>
                                                                                            <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                                                                        </FormGroup>
                                                                                    </div>
                                                                                    <a href="#" className="ml-3 font-size-14"><FileUploadOutlinedIcon /></a>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                                                            <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-3">
                                                                        <div className="col-md-6">
                                                                            <a href="#" className="btn border d-block">Cancel</a>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <a href="#" className="btn border d-block bg-green text-white"><span className="mr-2"><BackupOutlinedIcon /></span>Upload</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="card p-3">
                                                                    <div>
                                                                        <label class="font-size-14 " for="exampleInputEmail1">DATA LOAD STATUS</label>
                                                                        <div className="recent-items mt-3">
                                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Equipment</span></p>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="white-space custom-checkbox">
                                                                                        <FormGroup>
                                                                                            <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                                                                        </FormGroup>
                                                                                    </div>
                                                                                    <a href="#" className="ml-3 font-size-14"><FileUploadOutlinedIcon /></a>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                                                            <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                                                            <p className="mb-0"><b style={{ color: '#5DBAB5' }}>Uploaded Succesfully</b></p>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="recent-items mt-3">
                                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Equipment</span></p>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="white-space custom-checkbox">
                                                                                        <FormGroup>
                                                                                            <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                                                                        </FormGroup>
                                                                                    </div>
                                                                                    <a href="#" className="ml-3 font-size-14"><FileUploadOutlinedIcon /></a>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                                                            <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                                                            <p className="mb-0"><b style={{ color: '#EE799B' }}>Few Records Are Not Updated</b></p>
                                                                        </div>
                                                                    </div>
                                                                    <p>The errors may have occeured due to Incorrect fieid values, or it taak too long. Click here to check the incorrect entries.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </TabPanel>
                        {/* <div className="card mt-3 p-3">
                                    <h5 className="d-flex align-items-center mb-0">
                                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account settings</span></div>
                                        <div className="hr"></div>
                                    </h5>
                                    <div className="row mt-3">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ACCOUNT ID</label>
                                                <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Auto generated" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ACCOUNT NAME</label>
                                                <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Business Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ALIAS</label>
                                                <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Alias" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">payment frequency</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Monthly / quarterly / annually"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">payment mode</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Wire transfer / Stripe / Credit Card"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">currency for billing</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="USD"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">type of business</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Manufacturer / OEM / Dealer / Service Provider"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">company type</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Large / Medium / Small"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">fiscal year</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="Jan to Dec / August to July"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <div className="d-flex mt-3">
                                            <div className="mr-3"><a href="#" className="bg-primary text-white btn font-size-12">Request for Extension</a></div>
                                            <p>You will receive an email to confirm your decision. This will not end your subscription or payments and you will continue to be charged. You can cancel your subscription, or switch payment methods to keep the the subscription active.
                                                This can't be reversed. All the data and transactions you've created will be permanently erased.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <div className="d-flex mt-3">
                                            <div className="mr-3"><a href="#" className="bg-red text-white btn font-size-12"><img className="mr-2" src={smalldeleteicon}></img>Request for Deactivation</a></div>
                                            <p>You will receive an email to confirm your decision. This will not end your subscription or payments and you will continue to be charged. You can cancel your subscription, or switch payment methods to keep the the subscription active.
                                                This can't be reversed. All the data and transactions you've created will be permanently erased.</p>
                                        </div>
                                    </div>
                                </div> */}

                        {/* <TabPanel className="p-0" value="2">
                                <div className="card  mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Contact Information</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-3">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">Full name</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">ADDRESS</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CITY</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">STATE</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">COUNTRY</label>
                                                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PHONE NUMBER (PRIMARY)</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PHONE NUMBER (SECONDARY)</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>


                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">COMMUNICATIUON PREFERNCE</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="Manufacturer / OEM / Dealer / Service Provider"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">WEBSITE URL</label>
                                                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Contact Information</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                                <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row">
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">Full name</p>
                                                    <h6 class="font-weight-600">Jane</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">ADDRESS</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">CITY</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">STATE</p>
                                                    <h6 class="font-weight-600">Jane</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">COUNTRY</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">PHONE NUMBER (PRIMARY)</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">PHONE NUMBER (SECONDARY)</p>
                                                    <h6 class="font-weight-600">Jane</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">COMMUNICATIUON PREFERNCE</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">WEBSITE URL</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card  overflow-hidden mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Alternate contact</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-3">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">BILLING CONTACT</label>
                                                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">OPERATIONS CONTACT</label>
                                                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">SECURITY CONTACT</label>
                                                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CONTACT EMAIL</label>
                                                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CONTACT NUMBER</label>
                                                    <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Alternate contact</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                                <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-3">
                                            <div className="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">BILLING CONTACT</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">OPERATIONS CONTACT</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">SECURITY CONTACT</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">CONTACT EMAIL</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div class="form-group">
                                                    <p class="font-size-14 mb-2">CONTACT NUMBER</p>
                                                    <h6 class="font-weight-600">Doe</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="3">
                                <div className="card  mt-3 p-3">
                                    <div>
                                        <div>
                                            <a href="#" className="text-violet ">Invite new members</a>
                                        </div>
                                        <div className="mt-4">
                                            <a href="#" className="btn-sm bg-perpal text-white">Upload User's Photo</a>
                                        </div>
                                        <h5 className="d-flex align-items-center mb-0 mt-4">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>User settings</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-4">
                                            <div className="col-md-3 col-sm-3">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">User ID</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="johndoe@acme.com" />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PASSWORD</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="johndoe@acme.com" />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">EMAIL</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="johndoe@acme.com" />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">ASSIGN ROLE</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="Product Expert"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Active Users & Subscriptions</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="bg-dark-green p-2 text-black font-size-14 mt-3">23 users have subscribed to the plan</div>
                                        <div>
                                            <div class="input-group icons border-radius-10 border overflow-hidden mt-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                                        <img src={searchIcon} /></span>
                                                </div>
                                                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Securtiy questions</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <p className="mt-3">Update <span className="text-violet">Secuity questions </span> for password retrival</p>

                                    </div>
                                </div>
                                <div className="Add-new-segment-div p-3 border-radius-10">
                                    <a href="#" className="btn bg-green text-white">Register Users</a>
                                </div>
                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="4">
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Active Plan
                                            </span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <RadioGroup className='my-3'
                                            row
                                            aria-labelledby="demo-form-control-label-placement"
                                            name="position"
                                            defaultValue="top"
                                        >
                                            <div className="col-md-4">

                                                <div className="w-100 m-0 mb-3 p-2 d-flex custom-radio py-4 align-itemsstart border">
                                                    <FormControlLabel className="m-0" value="end" control={<Radio />} label="" />
                                                    <div className="ml-2">
                                                        <span>Momentum </span><br /><span>$100</span><br /><span>user / month</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Support</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <p className="mt-3">View or Update <a href="#" className="text-violet" onClick={() => setOpen(true)}>support plans</a></p>
                                    </div>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Deactivation</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="d-flex mt-3">
                                            <div className="mr-3"><a href="#" className="bg-red text-white btn font-size-12"><img className="mr-2" src={smalldeleteicon}></img>Request for Deactivation</a></div>
                                            <p>You will receive an email to confirm your decision. This will not end your subscription or payments and you will continue to be charged. You can cancel your subscription, or switch payment methods to keep the the subscription active.
                                                This can't be reversed. All the data and transactions you've created will be permanently erased.</p>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="5">
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account regions</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <RadioGroup className='my-3'
                                            row
                                            aria-labelledby="demo-form-control-label-placement"
                                            name="position"
                                            defaultValue="top"
                                        >

                                            <div className="col-md-3">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                    value="Asia"
                                                    control={<Radio />}
                                                    label="Asia"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Africa"
                                                    control={<Radio />}
                                                    label="Africa"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Australia"
                                                    control={<Radio />}
                                                    label="Australia"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Europe"
                                                    control={<Radio />}
                                                    label="Europe"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="USA(East)"
                                                    control={<Radio />}
                                                    label="USA(East)"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="USA(West)"
                                                    control={<Radio />}
                                                    label="USA(West)"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                        </RadioGroup>

                                    </div>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account regions</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <RadioGroup className='my-3'
                                            row
                                            aria-labelledby="demo-form-control-label-placement"
                                            name="position"
                                            defaultValue="top"
                                        >

                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                    value="AWS"
                                                    control={<Radio />}
                                                    label="AWS"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="GCP"
                                                    control={<Radio />}
                                                    label="GCP"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Microsoft"
                                                    control={<Radio />}
                                                    label="Microsoft"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="6">
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Active Users & Subscriptions</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="bg-dark-green p-2 text-black font-size-14 mt-3">23 users have subscribed to the plan</div>
                                        <div>
                                            <div class="input-group icons border-radius-10 border overflow-hidden mt-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                                        <img src="/static/media/search.14487ffa.svg" /></span>
                                                </div>
                                                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="7">
                                <div className="card mt-3 p-3">
                                    <h5 className="d-flex align-items-center mb-0 ">
                                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Order preference</span></div>
                                        <div className="hr"></div>
                                    </h5>
                                    <RadioGroup className='my-3'
                                        row
                                        aria-labelledby="demo-form-control-label-placement"
                                        name="position"
                                        defaultValue="top"
                                    >

                                        <div className="col-md-3">
                                            <FormControlLabel
                                                className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                value="Asia"
                                                control={<Radio />}
                                                label="Provision & Support"
                                                labelPlacement="bottom"
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <FormControlLabel
                                                className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                value="Africa"
                                                control={<Radio />}
                                                label="AI co-development"
                                                labelPlacement="bottom"
                                            />
                                        </div>

                                    </RadioGroup>
                                </div>
                                <div className="card mt-3 p-3">
                                    <h5 className="d-flex align-items-center mb-0 ">
                                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Order Status</span></div>
                                        <div className="hr"></div>
                                    </h5>
                                    <RadioGroup className='my-3'
                                        row
                                        aria-labelledby="demo-form-control-label-placement"
                                        name="position"
                                        defaultValue="top"
                                    >

                                        <div className="col-md-3">
                                            <div className="w-100  mb-3 text-left p-2 card py-4  border">
                                                <FormControlLabel
                                                    className="align-itemsstart m-0"
                                                    value="Account Active"
                                                    control={<Radio />}
                                                    label=""
                                                    labelPlacement="bottom"
                                                />
                                                <p> Account Active</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                                <FormControlLabel
                                                    className="m-0 align-itemsstart"
                                                    value="Do it with us"
                                                    control={<Radio />}
                                                    label=""
                                                    labelPlacement="bottom"
                                                />
                                                <p>Momentum Price Plan<br />
                                                    $100<br />
                                                    User / month</p>
                                            </div>
                                        </div>

                                    </RadioGroup>
                                </div>
                                <div className="card mt-3 p-3">
                                    <h5 className="d-flex align-items-center mb-0 ">
                                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Delivery request</span></div>
                                        <div className="hr"></div>
                                    </h5>
                                    <RadioGroup className='my-3'
                                        row
                                        aria-labelledby="demo-form-control-label-placement"
                                        name="position"
                                        defaultValue="top"
                                    >

                                        <div className="col-md-3">
                                            <div className="w-100  mb-3 text-left p-2 card py-4  border">
                                                <FormControlLabel
                                                    className="align-itemsstart m-0"
                                                    value="Asia"
                                                    control={<Radio />}
                                                    label="Do it ourselves"
                                                    labelPlacement="bottom"
                                                />
                                                <p> We help with provision and support, all other activities are carried out by your team</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                                <FormControlLabel
                                                    className="m-0 align-itemsstart"
                                                    value="Do it with us"
                                                    control={<Radio />}
                                                    label="Do it with us"
                                                    labelPlacement="bottom"
                                                />
                                                <p>Our experts assist you with requirement mapping, consulting, data loading, test scripts and training</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="w-100 mb-3 text-left p-2 card py-4 border">
                                                <FormControlLabel
                                                    className="m-0 align-itemsstart"
                                                    value="Do it for us"
                                                    control={<Radio />}
                                                    label="Do it for us"
                                                    labelPlacement="bottom"
                                                />
                                                <p> We own the solution delivery with support from your team</p>
                                            </div>
                                        </div>

                                    </RadioGroup>
                                </div>
                                <div className="Add-new-segment-div p-3 border-radius-10">
                                    <a href="#" className="btn bg-primary text-white">Request activation</a>
                                </div>
                                <div className="Add-new-segment-div p-3 border-radius-10 mt-3">
                                    <a href="#" className="btn bg-primary text-white">Configure System</a>
                                </div>
                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="8">
                                <div className="card  mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 mt-4">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}> Support Tickets</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-4">
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="1234567"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">SUPPORT TYPE</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="USD"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">SUPPORT PLAN</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Momentum" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">START DATE</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CONTRACT END DATE</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="10.01.2023" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">STATUS</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Active" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                    <a href="#" className="btn bg-primary text-white">Request Type</a>
                                </div>
                                <div className="card mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 ">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Request for</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <RadioGroup className='my-3'
                                            row
                                            aria-labelledby="demo-form-control-label-placement"
                                            name="position"
                                            defaultValue="top"
                                        >

                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart border"
                                                    value="Account related"
                                                    control={<Radio />}
                                                    label="Account related"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Access related"
                                                    control={<Radio />}
                                                    label="Access related"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Functionality related"
                                                    control={<Radio />}
                                                    label="Functionality related"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Billing & Price plan"
                                                    control={<Radio />}
                                                    label="Billing & Price plan"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <FormControlLabel
                                                    className="w-100 m-0 mb-3 p-2 card py-4 align-itemsstart border"
                                                    value="Deactivation(East)"
                                                    control={<Radio />}
                                                    label="USA(Deactivation)"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                        </RadioGroup>

                                    </div>
                                </div>
                                <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                    <a href="#" className="btn bg-primary text-white">Create Service Reruest</a>
                                </div>
                                <div className="card  mt-3 p-3">
                                    <div className="row mt-3">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="font-size-14 " for="exampleInputEmail1">REASON FOR REQUEST</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={reasonForRequestOptions}
                                                    placeholder="Account unlock"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">DESCRIPTION(Short description)</label>
                                                <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">BRIEF DESCRIPTION(long description)</label>
                                                <div>
                                                    <TextareaAutosize className="w-100 form-control"
                                                        aria-label="minimum height"
                                                        minRows={3}
                                                        placeholder="Placeholder (Optional)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">USER NAME</label>
                                                <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Defaulted by system" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">EMAIL (if not same in profile)</label>
                                                <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CONTACT (if not same in profile)</label>
                                                <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                <a href="#" className="btn bg-primary text-white"><span className="mr-2">+</span>Add Attachments</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="9">
                                <div className="card  mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 mt-4">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Billing Plan</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-4">
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT NO.</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="1234567"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">CURRENCY</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="USD"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PRICE PLAN</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Momentum" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">NUMBER OF USER</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="30" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="$3000" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                    <a href="#" className="btn bg-primary text-white">Generate pdf</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="card  mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 mt-4">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Adhoc Plan</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-4">
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT NO.</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="Choose"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">CURRENCY</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="Choose"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PRICE PLAN</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Auto Generated" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">NUMBER OF USER</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                    <a href="#" className="btn bg-primary text-white">Manual Invoice</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel> */}
                        {/* <TabPanel className="p-0" value="10">
                                <div className="card  mt-3 p-3">
                                    <div>
                                        <h5 className="d-flex align-items-center mb-0 mt-4">
                                            <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Past Invoices</span></div>
                                            <div className="hr"></div>
                                        </h5>
                                        <div className="row mt-4">
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE NUMBER</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE / MONTH</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="January" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">ACCOUNT NO.</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="1234567"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group">
                                                    <label className="font-size-14 " for="exampleInputEmail1">INVOICE NUMBER</label>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={options}
                                                        placeholder="USD"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="$4000" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">STATUS</label>
                                                    <input type="email" class="form-control "  aria-describedby="emailHelp" placeholder="Paid" />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                    <a href="#" className="btn bg-primary text-white">Generate pdf</a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel> */}

                    </TabContext>
                </Box>
                <AddUserModal
                    openAddUser={openAddUser}
                    handleAddUserClose={handleAddUserClose}
                    subscriberData={subscriberData}
                    setSubscriberData={setSubscriberData}
                    addUser={addNewUser}
                    roles={roles}
                />
                <Modal show={open} onHide={handleClose} size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header className="modal-header-border">
                        <Modal.Title>Solution Selector</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-0 bg-white">
                        <div style={{ overflowX: 'auto' }}>
                            <div class="panel panel-default panel-table">
                                <div class="panel-heading">
                                    <div class="tr">
                                        <div class="td">Pricing</div>
                                        <div class="td">Discovering</div>
                                        <div class="td">Exploring</div>
                                        <div class="td">Engaging/ Including</div>
                                        <div class="td">Integrate / Enterprise</div>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <div class="tr">
                                        <div class="td">
                                            <p>Looking at best of breed CPQ solutions for aftermarket services or beginning the journey? Start here.</p>
                                            <div>
                                                <FormControl className="usertabs">
                                                    <RadioGroup
                                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                                        name="controlled-radio-buttons-group"
                                                        value={value}
                                                        onChange={handleChange}
                                                    >

                                                        <FormControlLabel value="1-10 Users" control={<Radio />} label="1-10 Users" />
                                                        <FormControlLabel value="10-50 Users" control={<Radio />} label="10-50 Users" />
                                                        <FormControlLabel value="50-100 Users" control={<Radio />} label="50-100 Users" />
                                                        <FormControlLabel value="100+ Users" control={<Radio />} label="100+ Users" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div class="td">
                                            <p>Starter Pack is for smaller service sales organisations that wants to establish systematic processes and systems for their service opeartions team.</p>
                                            <div className="text-center"><sup className="mr-1">$</sup><b className="font-size-18 text-black mr-2">69</b><span>/month</span></div>
                                            <div className="text-center"><small>$276 paid quarterly</small></div>
                                            <div className="text-center mt-3"><a href="#" className="btn text-violet border-light "><b>Start Now</b></a></div>
                                        </div>
                                        <div class="td">
                                            <p>Growth pack is designed for smaller and mid sized service sales organisations that wants to grow their aftermarket business using best of breed solutions.</p>
                                            <div className="text-center"><sup className="mr-1">$</sup><b className="font-size-18 text-black mr-2">99</b><span>/month</span></div>
                                            <div className="text-center"><small>$396 paid quarterly</small></div>
                                            <div className="text-center mt-3"><a href="#" className="btn text-violet border-light "><b>Start Now</b></a></div>
                                        </div>
                                        <div class="td">
                                            <p>Momementum pack is designed for mid sized and large organisations that wants to enable their service sales organisations to collaborate and build data driven aftermarket solutions for their customers.</p>
                                            <div className="text-center"><sup className="mr-1">$</sup><b className="font-size-18 text-black mr-2">129</b><span>/month</span></div>
                                            <div className="text-center"><small>$516 paid quarterly</small></div>
                                            <div className="text-center mt-3"><a href="#" className="btn text-violet border-light "><b>Start Now</b></a></div>
                                        </div>
                                        <div class="td">
                                            <p>Your business expertise, our software and power of digital technology. Standardisation & Customisation at scale.</p>
                                            <p> Insights, best of breed solutions, AI recommendations, collaborations and customer centric solutions to enhance your own aftermarket business offering.</p>
                                            <div className="text-center mt-3"><a href="#" className="btn text-violet border-light "><b>Start Now</b></a></div>
                                        </div>
                                    </div>
                                    <div className="tr">
                                        <div className="td"><h5 className="font-size-14">Resources</h5></div>
                                        <div className="td">
                                            <ul>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>User guide</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Assistance to implement</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Dedicated support</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Best practices guide</li>
                                            </ul>
                                        </div>
                                        <div className="td">
                                            <ul>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>User guide</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Assistance to implement</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Dedicated support</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Best practices guide</li>
                                            </ul>
                                        </div>
                                        <div className="td">
                                            <ul>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Consulting help</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Co-implement</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Integration</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>24 X 7 support</li>
                                            </ul>
                                        </div>
                                        <div className="td">
                                            <ul>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Consulting help</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Co-implement</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>Integration</li>
                                                <li><span><i class="fa fa-check text-violet mr-2 my-2"></i></span>24 X 7 support</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tr">
                                        <div className="td"><h5 className="font-size-14">Pathways</h5></div>
                                        <div className="td"><span>Select 1 builder from our builder platform.</span></div>
                                        <div className="td"><span>Select any two courses from our Inclusion Program.</span></div>
                                        <div className="td"><span>Unlimited access to all courses.</span></div>
                                        <div className="td"><span>Unlimited access to all courses.</span></div>
                                    </div>
                                    <div className="tr">
                                        <div className="td"><h5 className="font-size-14">Features</h5></div>
                                        <div className="td">
                                            <ul>
                                                <li className="d-flex">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Repair options builder
                                                        <ul>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}> manage repair</li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}> mange part lists</li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}> manage labor & misc.</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Templates
                                                        <ul>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}>Repair Templates </li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}> Kits</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Quote configurator
                                                        <ul>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}> quote repair options </li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}> quote spare parts</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Home page:
                                                        <ul>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>dashboards</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>collaboration</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>manage master data such as spare parts, customers, equipment</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>price spare parts, labor and miscellaneous</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="td">
                                            <ul>
                                                <li className="d-flex">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>All features from Starter pack, plus:
                                                    </div>
                                                </li>
                                                <li className="d-flex">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Portfolio
                                                        <ul>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}>Services</li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}>Bundles</li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}>Portfolio</li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}>Service</li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}>programs</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li className="d-flex">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Quote configurator
                                                        <ul>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}> quote repair options</li>
                                                            <li className="my-2" style={{ listStyle: 'inside' }}>quote spare parts</li>
                                                            <li className="my-2 " style={{ listStyle: 'inside' }}> quote repair options, services, portfolios and solutions</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="td">
                                            <ul>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>All features from Growth pack, plus:
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Solution Configurattion
                                                        <ul>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>Guided configuration</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>Non-guided configuration</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>Commerce solution</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>*Integration with ERP & CRM</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>Price configuration</li>
                                                            <li className="d-flex my-2"><span className="mr-3">-</span>Reports and Analytics</li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="td">
                                            <ul>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>All features from Momentum pack, plus:
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Price recommendation
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Product and service recommendation
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Reports and Analytics
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Consulting
                                                    </div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Implementation</div>
                                                </li>
                                                <li className="d-flex mt-2">
                                                    <div><span><i class="fa fa-check text-violet mr-2 "></i></span></div>
                                                    <div>Insights</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="panel-footer">
        <div class="tr">
            <div class="td">footer</div>
            <div class="td">footer</div>
            <div class="td">footer</div>
        </div>
    </div> */}
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
            </div>
    )
}

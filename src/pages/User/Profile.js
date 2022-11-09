import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
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


export function Profile() {
    const [value, setValue] = React.useState('1');
    const [activeStep, setActiveStep] = useState(0)
    const steps = [
        // 'Register',
        // 'Setup Account',
        // 'Request Activation',
        // 'Account Activated',
        // 'Configuration',
        // 'Load Data',
        // 'Start Using',

    ];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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

    const handleStep = (step) => {
        setActiveStep(step);
    };

    return (
        <>
            {/* <CommanComponents /> */}
            <div class="container mt-4 p-t-150">
                <div className="row">
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
                </div>
                {activeStep == 0 ? <>
                    <Register />
                </> : <></>}
                {activeStep == 1 ? <>
                    <h4 className="mt-5">Account</h4>
                    <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList className="custom-tabs-div" onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Settings" value="1" />
                                    <Tab label="Contact " value="2" />
                                    <Tab label="Users" value="3" />
                                    <Tab label="Support Plan" value="4" />
                                    <Tab label="Cloud regions" value="5" />
                                    {/* <Tab label="Subscriptions" value="6" /> */}
                                    <Tab label="Order" value="7" />
                                    <Tab label="Request" value="8" />
                                    <Tab label="Bills" value="9" />
                                    <Tab label="Invoices" value="10" />
                                </TabList>
                            </Box>

                            <TabPanel className="p-0" value="1">
                                <div className="card mt-3 p-3">
                                    <h5 className="d-flex align-items-center mb-0">
                                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account settings</span></div>
                                        <div className="hr"></div>
                                    </h5>
                                    <div className="row mt-3">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ACCOUNT ID</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Auto generated" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ACCOUNT NAME</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Business Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ALIAS</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Alias" />
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
                            </TabPanel>
                            <TabPanel className="p-0" value="2">
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
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">ADDRESS</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CITY</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">STATE</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">COUNTRY</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PHONE NUMBER (PRIMARY)</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PHONE NUMBER (SECONDARY)</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
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
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
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
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">OPERATIONS CONTACT</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">SECURITY CONTACT</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CONTACT EMAIL</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CONTACT NUMBER</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
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

                            </TabPanel>
                            <TabPanel className="p-0" value="3">
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
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="johndoe@acme.com" />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">PASSWORD</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="johndoe@acme.com" />
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-3">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">EMAIL</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="johndoe@acme.com" />
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
                                {/* <div className="card mt-3 p-3">
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
                                </div> */}
                            </TabPanel>
                            <TabPanel className="p-0" value="4">
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
                                            {/* <div className="col-md-8">
                                                <a className="add-new-recod" style={{ cursor: 'pointer' }}>
                                                    <div>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                        <p className="font-weight-600">Select support plan</p>
                                                    </div>
                                                </a>

                                            </div> */}
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
                            </TabPanel>
                            <TabPanel className="p-0" value="5">
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
                            </TabPanel>
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
                            <TabPanel className="p-0" value="7">
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
                            </TabPanel>
                            <TabPanel className="p-0" value="8">
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
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Momentum" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">START DATE</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">CONTRACT END DATE</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="10.01.2023" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">STATUS</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Active" />
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
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
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
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Defaulted by system" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">EMAIL (if not same in profile)</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group ">
                                                <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CONTACT (if not same in profile)</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                                <a href="#" className="btn bg-primary text-white"><span className="mr-2">+</span>Add Attachments</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel className="p-0" value="9">
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
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Momentum" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">NUMBER OF USER</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="30" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$3000" />
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
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Auto Generated" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">NUMBER OF USER</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
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
                            </TabPanel>
                            <TabPanel className="p-0" value="10">
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
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE DATE / MONTH</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="January" />
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
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="10.01.2022" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">INVOICE AMOUNT</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$4000" />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-2">
                                                <div className="form-group ">
                                                    <label class="font-size-14 " for="exampleInputEmail1">STATUS</label>
                                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Paid" />
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
                            </TabPanel>

                        </TabContext>
                    </Box>
                    <Modal show={open} onHide={handleClose} size="xl"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
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
                </> : <></>}
                {activeStep == 2 ? <>
                    <RequestActivation parentCallback={(step) => setActiveStep(activeStep + 1)} />
                </> : <></>}
                {activeStep == 3 ? <>
                    <AccountActivated parentCallback={(step) => setActiveStep(activeStep + 1)} />
                </> : <></>}
                {activeStep == 4 ? <>
                    <Configuration />
                </> : <></>}

            </div>
        </>


    )
}

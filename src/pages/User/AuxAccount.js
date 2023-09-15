import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, TextareaAutosize, Card, FormGroup, Checkbox } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import smalldeleteicon from '../../assets/icons/png/small-delete.png'
import { FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { FileUploader } from "react-drag-drop-files";
import { Users } from "./Users";

export function AuxAdmin(props) {
    const [value, setValue] = React.useState('1');
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

    const [businessInfo, setBusinessInfo] = useState({
        legalName: "",
        webSite: "",
        entityType: null,
        taxDocType: "",
        taxNo: "",
    });
    const [businessLoc, setBusinessLoc] = useState({
        address: "",
        contact: "",
        phoneNo: ""
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [addonSelected, seAddonSelected] = useState({
        commerce: false,
        ai: false,
        collaboration: false,
    });

    const handleAddons = (event) => {
        seAddonSelected({
            ...addonSelected,
            [event.target.name]: event.target.checked,
        });
    };
    const [file, setFile] = useState(null);
    const handleReadFile = (file) => {
        // e.preventDefault();
        if (file) {
            setFile(file);
        }
    };
    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
            <div class="container-fluid mt-3">
                <h4>Account and Settings</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                    <div className="Account-custom-tabs">
                        <div class="row mt-5">
                            <div class="col-2 text-center">
                                <ul class="nav nav-tabs tabs-left sideways">
                                    <li class=""><a className="active" href="#tenants-v" data-toggle="tab">Tenant and Reports</a></li>
                                    <li><a href="#invoices-v" data-toggle="tab">Tenant Invoices</a></li>
                                    <li><a href="#requests-v" data-toggle="tab">Tenant Requests</a></li>
                                </ul>
                            </div>
                            <div class="col-10">
                                <div className="card p-3">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tenants-v">
                                            <div className="card mt-3 p-3">
                                                <h5 className="d-flex align-items-center mb-0">
                                                    <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Tenant and Reports</span></div>
                                                    <div className="hr"></div>
                                                </h5>
                                                <Users />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Box>

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
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

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
import { ADDONS, ENTITYPE_OPTIONS, PACKAGES, PLANS, REGIONS, TAX_DOC_TYPES } from "./CONSTANTS";

export function TenantProvision(props) {
    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [selectedPackage, setSelectedPackage] = useState('STARTER');
    const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('anual');
    const [selectedRegion, setSelectedRegion] = useState('US East');
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
        contactName: "",
        contactEmail: "",
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
                <h4>Account</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                    <div className="Account-custom-tabs">
                        <div class="row mt-5">
                            <div class="col-2 text-center">
                                <ul class="nav nav-tabs tabs-left sideways">
                                    <li class=""><a className="active" href="#packages-v" data-toggle="tab">Packages</a></li>
                                    <li><a href="#businessInfo-v" data-toggle="tab">Business Information</a></li>
                                    <li><a href="#businessloc-v" data-toggle="tab">Business Location</a></li>
                                    <li><a href="#cloudregions-v" data-toggle="tab">Cloud Regions</a></li>
                                    {/* <li><a href="#supportplans-v" data-toggle="tab">Support Plans</a></li> */}
                                    <li><a href="#addons-v" data-toggle="tab">Add Ons</a></li>
                                    <li><a href="#payment-v" data-toggle="tab">Payment Plans</a></li>
                                    <li><a href="#upload-v" data-toggle="tab">Upload Document</a></li>
                                    <li><a href="#activation-v" data-toggle="tab">Activation</a></li>
                                </ul>
                            </div>
                            <div class="col-10">
                                <div className="card p-3">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="packages-v">
                                            <div className="card mt-3 p-3">
                                                <h5 className="d-flex align-items-center mb-0">
                                                    <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Package Selection</span></div>
                                                    <div className="hr"></div>
                                                </h5>
                                                <FormControl>
                                                    <RadioGroup className='my-3'
                                                        row
                                                        name="package"
                                                        defaultValue="STARTER"
                                                        value={selectedPackage}
                                                        onChange={e => setSelectedPackage(e.target.value)}
                                                    >
                                                        <div className="col-md-6 row" >
                                                            {PACKAGES.map(packageInd =>
                                                                <div className="col-md-6 col-sm-6">
                                                                    <Card variant={'outlined'} sx={{ py: 5, my: 1, borderRadius: 4, display: 'flex', justifyContent: 'center' }}>
                                                                        <FormControlLabel
                                                                            value={packageInd.value}
                                                                            control={<Radio />}
                                                                            label={packageInd.label}
                                                                        />
                                                                    </Card>
                                                                </div>)}
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="businessInfo-v">
                                            <div className="card mt-3 p-3">
                                                <h5 className="d-flex align-items-center mb-0">
                                                    <div className="" style={{ display: 'contents' }}>
                                                        <span className="mr-3" style={{ whiteSpace: 'pre' }}>Business Information</span>
                                                    </div>
                                                    <div className="hr"></div>
                                                </h5>
                                                <div className="row input-fields mt-3">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                BUSINESS LEGAL NAME
                                                            </label>
                                                            <input
                                                                type="text"
                                                                onChange={(e) => setBusinessInfo({ ...businessInfo, legalName: e.target.value })}
                                                                className="form-control border-radius-10 text-primary"
                                                                value={businessInfo.legalName}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group ">
                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                WEBSITE
                                                            </label>
                                                            <input
                                                                type="text"
                                                                onChange={(e) => setBusinessInfo({ ...businessInfo, webSite: e.target.value })}
                                                                className="form-control border-radius-10 text-primary"
                                                                value={businessInfo.webSite}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group ">
                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                ENTITY TYPE
                                                            </label>
                                                            <Select
                                                                // defaultValue={selectedOption}
                                                                onChange={(e) =>
                                                                    setBusinessInfo({
                                                                        ...businessInfo,
                                                                        entityType: e,
                                                                    })
                                                                }
                                                                options={ENTITYPE_OPTIONS}
                                                                value={businessInfo.entityType}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group ">
                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                TAX DOC TYPE
                                                            </label>
                                                            <Select
                                                                onChange={(e) =>
                                                                    setBusinessInfo({
                                                                        ...businessInfo,
                                                                        taxDocType: e,
                                                                    })
                                                                }
                                                                options={TAX_DOC_TYPES}
                                                                value={businessInfo.taxDocType}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group ">
                                                            <label className="text-light-dark font-size-12 font-weight-500">
                                                                TAX NUMBER
                                                            </label>
                                                            <input
                                                                type="text"
                                                                onChange={(e) => setBusinessInfo({ ...businessInfo, taxNo: e.target.value })}
                                                                className="form-control border-radius-10 text-primary"
                                                                value={businessInfo.taxNo}
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
                                        <div class="tab-pane" id="businessloc-v">

                                            <div className="card  mt-3 p-3">
                                                <div>
                                                    <h5 className="d-flex align-items-center mb-0">
                                                        <div className="" style={{ display: 'contents' }}>
                                                            <span className="mr-3" style={{ whiteSpace: 'pre' }}>Business Location</span></div>
                                                        <div className="hr"></div>
                                                    </h5>
                                                    <div className="row input-fields mt-3">
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                    ADDRESS
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setBusinessLoc({ ...businessLoc, address: e.target.value })}
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={businessLoc.address}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                    CONTACT NAME
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setBusinessLoc({ ...businessLoc, contactName: e.target.value })}
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={businessLoc.contactName}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                    CONTACT EMAIL
                                                                </label>
                                                                <input
                                                                    type="email"
                                                                    onChange={(e) => setBusinessLoc({ ...businessLoc, contactEmail: e.target.value })}
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={businessLoc.contactEmail}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">
                                                                    PHONE NUMBER
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setBusinessLoc({ ...businessLoc, phoneNo: e.target.value })}
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={businessLoc.phoneNo}
                                                                />
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
                                            {/* <div className="card  overflow-hidden mt-3 p-3">
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
                                            </div> */}
                                        </div>

                                        {/* <div class="tab-pane" id="supportplans-v">
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
                                        </div> */}
                                        <div class="tab-pane" id="cloudregions-v">
                                            <div className="card mt-3 p-3">
                                                <div>
                                                    <h5 className="d-flex align-items-center mb-0 ">
                                                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Account regions</span></div>
                                                        <div className="hr"></div>
                                                    </h5>
                                                    <FormControl>
                                                        <RadioGroup className='my-3'
                                                            row
                                                            value={selectedRegion}
                                                            onChange={e => setSelectedRegion(e.target.value)}
                                                        >
                                                            {REGIONS.map(region =>
                                                                <div className="col-md-3">
                                                                    <Card variant={'outlined'} sx={{ borderRadius: 2, p: 3, py: 4, my: 1 }}>
                                                                        <FormControlLabel
                                                                            value={region.value}
                                                                            control={<Radio />}
                                                                            label={region.label}
                                                                        />
                                                                    </Card>
                                                                </div>)}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="addons-v">
                                            <div className="card mt-3 p-3">
                                                <h5 className="d-flex align-items-center mb-0 ">
                                                    <div className="" style={{ display: 'contents' }}>
                                                        <span className="mr-3" style={{ whiteSpace: 'pre' }}>Add-Ons</span></div>
                                                    <div className="hr"></div>
                                                </h5>
                                                <FormGroup row>
                                                    {ADDONS.map(addon =>
                                                        <div className="col-md-3">
                                                            <Card variant={'outlined'} sx={{ borderRadius: 2, p: 3, py: 4, my: 1 }}>
                                                                <FormControlLabel
                                                                    control={<Checkbox checked={addonSelected[addon.value]} onChange={handleAddons} name={addon.value} />}
                                                                    label={addon.label}
                                                                />
                                                            </Card>
                                                        </div>)}
                                                </FormGroup>
                                            </div>

                                            <div className="Add-new-segment-div p-3 border-radius-10">
                                                <a href="#" className="btn bg-primary text-white">Request activation</a>
                                            </div>
                                            <div className="Add-new-segment-div p-3 border-radius-10 mt-3">
                                                <a href="#" className="btn bg-primary text-white">Configure System</a>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="payment-v">
                                            <div className="card  mt-3 p-3">
                                                <div>
                                                    <h5 className="d-flex align-items-center mb-0">
                                                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}> Payment Plans and Subscribers</span></div>
                                                        <div className="hr"></div>
                                                    </h5>
                                                    <div className="row mt-4">
                                                        <FormControl>
                                                            <RadioGroup className='my-3'
                                                                row
                                                                value={selectedPaymentPlan}
                                                                onChange={e => setSelectedPaymentPlan(e.target.value)}
                                                            >
                                                                {PLANS.map(plan =>
                                                                    <div className="col-md-6">
                                                                        <Card variant={'outlined'} sx={{ borderRadius: 2, p: 3, py: 4, my: 1 }}>
                                                                            <FormControlLabel
                                                                                value={plan.value}
                                                                                control={<Radio />}
                                                                                label={plan.label}
                                                                            />
                                                                        </Card>
                                                                    </div>)}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="upload-v">
                                            <div className="card  mt-3 p-3">
                                                <div>
                                                    <h5 className="d-flex align-items-center mb-0">
                                                        <div className="" style={{ display: 'contents' }}>
                                                            <span className="mr-3" style={{ whiteSpace: 'pre' }}>Upload Contract Document</span>
                                                        </div>
                                                        <div className="hr"></div>
                                                    </h5>
                                                    <div className=" col-md-12 mt-3">
                                                        <div className=" card p-3">
                                                            <div className="add-new-recod">
                                                                <div>
                                                                    <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                                                    <h6 className="font-weight-500 mt-3">
                                                                        Drag and drop files to upload <br /> or
                                                                    </h6>
                                                                    <FileUploader
                                                                    handleChange={handleReadFile}
                                                                    name="file"
                                                                    types={["doc", "docx", "pdf"]}
                                                                    onClick={(event) => {
                                                                        event.currentTarget.value = null;
                                                                    }}
                                                                    />
                                                                    {/* <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                                                    <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a> */}
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
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="activation-v">
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

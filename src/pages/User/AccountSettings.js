import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Box, Tab, Radio, RadioGroup, Tooltip, Checkbox, FormGroup, FormControlLabel, FormControl, TextareaAutosize, Card, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';
import TabPanel from '@mui/lab/TabPanel';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import smalldeleteicon from '../../assets/icons/png/small-delete.png'
import { Users } from "./Users";
import { PLANS, REGIONS } from "./CONSTANTS";
import { FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";

export function AccountSettings(props) {
    const [value, setValue] = React.useState('packages');
    const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('annual');

    const [dValue, setDValue] = useState(null)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const PAYMENT_FREQ_OPTIONS = [
        { value: 'monthly', label: 'MONTHLY' },
        { value: 'annually', label: 'ANNUALLY' },
        { value: 'biannually', label: 'BIANNUALLY' },
    ];
    const PAYMENT_MODE_OPTIONS = [
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'stripe', label: 'Stripe' },
    ];
    const CURRENCY_OPTIONS = [
        { value: 'USD', label: 'USD' }
    ]

    const BUSINESS_TYPE_OPTIONS = [
        { value: 'MANUFACTURER', label: 'Manufacturer' },
        { value: 'OEM', label: 'OEM' },
        { value: 'DEALER', label: 'Dealer' },
        { value: 'SERVICE_PROVIDER', label: 'Service Provider' },
    ]

    const COMPANY_TYPE_OPTIONS = [
        { value: 'LARGE', label: 'Large' },
        { value: 'MEDIUM', label: 'Medium' },
        { value: 'SMALL', label: 'Small' },
    ]
    const FISCAL_YEAR_OPTIONS = [
        { value: 'JAN_DEC', label: 'Jan To Dec' },
        { value: 'AUG_JULY', label: 'Aug To July' },
    ]

    const COMMUNICATION_PREF_OPTIONS = [
        { value: 'EMAIL', label: "EMAIL" }
    ]
    const [selectedRegion, setSelectedRegion] = useState('US East');

    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [accountSettings, setAccountSettings] = useState({
        accountId: "",
        accountName: "",
        alias: "",
        paymentFrequency: null,
        paymentMode: null,
        currency: null,
        typeOfBusiness: null,
        companyType: null,
        fiscalYear: null
    });

    const [contact, setContact] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        country: "",
        phoneNumberPrimary: "",
        phoneNumberSecondary: "",
        communicationPreference: null,
        website: ""
    });
    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
            <div class="container-fluid mt-3">
                <h4>Account Settings</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                    <div className="Account-custom-tabs">
                        <div class="row mt-5">
                            <div class="col-2 text-center">
                                <ul class="nav nav-tabs tabs-left sideways">
                                    <li class=""><a className="active" href="#settings-v" data-toggle="tab">Settings</a></li>
                                    <li><a href="#contact-v" data-toggle="tab">Contact</a></li>
                                    <li><a href="#users-v" data-toggle="tab">Users</a></li>
                                    <li><a href="#supportplans-v" data-toggle="tab">Support Plans</a></li>
                                    <li><a href="#cloudregions-v" data-toggle="tab">Cloud Regions</a></li>
                                    <li><a href="#payment-v" data-toggle="tab">Payment Plan</a></li>
                                </ul>
                            </div>

                            <div class="col-10">
                                <div className="card p-3">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="settings-v">
                                            <div className="card mt-3 p-3">
                                                <h5 className="d-flex align-items-center mb-0">
                                                    <div className="" style={{ display: 'contents' }}>
                                                        <span className="mr-3" style={{ whiteSpace: 'pre' }}>Account settings</span></div>
                                                    <div className="hr"></div>
                                                </h5>
                                                <div className="row input-fields mt-3">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">ACCOUNT ID</label>
                                                            <input type="text"
                                                                className="form-control border-radius-10 text-primary"
                                                                value={accountSettings.accountId}
                                                                onChange={e => setAccountSettings({ ...accountSettings, accountId: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group ">
                                                            <label class="text-light-dark font-size-12 font-weight-500">ACCOUNT NAME</label>
                                                            <input type="text"
                                                                className="form-control border-radius-10 text-primary"
                                                                value={accountSettings.accountName}
                                                                onChange={e => setAccountSettings({ ...accountSettings, accountId: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group ">
                                                            <label class="text-light-dark font-size-12 font-weight-500">ALIAS</label>
                                                            <input type="text"
                                                                className="form-control border-radius-10 text-primary"
                                                                value={accountSettings.alias}
                                                                onChange={e => setAccountSettings({ ...accountSettings, alias: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">PAYMENT FREQUENCY</label>
                                                            <Select
                                                                value={accountSettings.paymentFrequency}
                                                                onChange={e => setAccountSettings({ ...accountSettings, paymentFrequency: e })}
                                                                options={PAYMENT_FREQ_OPTIONS}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">PAYMENT MODE</label>
                                                            <Select
                                                                value={accountSettings.paymentMode}
                                                                onChange={e => setAccountSettings({ ...accountSettings, paymentMode: e })}
                                                                options={PAYMENT_MODE_OPTIONS}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">CURRENCY FOR BILLING</label>
                                                            <Select
                                                                value={accountSettings.currency}
                                                                onChange={e => setAccountSettings({ ...accountSettings, currency: e })}
                                                                options={CURRENCY_OPTIONS}
                                                                styles={FONT_STYLE_SELECT}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">TYPE OF BUSINESS</label>
                                                            <Select
                                                                value={accountSettings.typeOfBusiness}
                                                                onChange={e => setAccountSettings({ ...accountSettings, typeOfBusiness: e })}
                                                                options={BUSINESS_TYPE_OPTIONS}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">COMPANY TYPE</label>
                                                            <Select
                                                                value={accountSettings.companyType}
                                                                onChange={e => setAccountSettings({ ...accountSettings, companyType: e })}
                                                                options={COMPANY_TYPE_OPTIONS}
                                                                styles={FONT_STYLE_SELECT}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="form-group">
                                                            <label className="text-light-dark font-size-12 font-weight-500">FISCAL YEAR</label>
                                                            <Select
                                                                value={accountSettings.fiscalYear}
                                                                onChange={e => setAccountSettings({ ...accountSettings, fiscalYear: e })}
                                                                options={FISCAL_YEAR_OPTIONS}
                                                                styles={FONT_STYLE_SELECT}
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
                                                        <div className="" style={{ display: 'contents' }}>
                                                            <span className="mr-3" style={{ whiteSpace: 'pre' }}>Contact Information</span></div>
                                                        <div className="hr"></div>
                                                    </h5>
                                                    <div className="row input-fields mt-3">
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group ">
                                                                <label className="text-light-dark font-size-12 font-weight-500">FULL NAME</label>
                                                                <input type="text"
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.fullName}
                                                                    onChange={e => setContact({ ...contact, fullName: e.target.value })}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group ">
                                                                <label className="text-light-dark font-size-12 font-weight-500">ADDRESS</label>
                                                                <input type="text" 
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.address}
                                                                    onChange={e => setContact({ ...contact, address: e.target.value })} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group ">
                                                                <label className="text-light-dark font-size-12 font-weight-500">CITY</label>
                                                                <input type="text" 
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.city}
                                                                    onChange={e => setContact({ ...contact, city: e.target.value })} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group ">
                                                                <label className="text-light-dark font-size-12 font-weight-500">STATE</label>
                                                                <input type="text" 
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.state}
                                                                    onChange={e => setContact({ ...contact, state: e.target.value })} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group ">
                                                                <label className="text-light-dark font-size-12 font-weight-500">COUNTRY</label>
                                                                <input type="text" 
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.country}
                                                                    onChange={e => setContact({ ...contact, country: e.target.value })} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group ">
                                                                <label className="text-light-dark font-size-12 font-weight-500">PHONE NUMBER (PRIMARY)</label>
                                                                <input type="text" 
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.phoneNumberPrimary}
                                                                    onChange={e => setContact({ ...contact, phoneNumberPrimary: e.target.value })} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group ">
                                                                <label className="text-light-dark font-size-12 font-weight-500">PHONE NUMBER (SECONDARY)</label>
                                                                <input type="text" 
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.phoneNumberSecondary}
                                                                    onChange={e => setContact({ ...contact, phoneNumberSecondary: e.target.value })} 
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">COMMUNICATION PREFERENCE</label>
                                                                <Select
                                                                    defaultValue={contact.communicationPreference}
                                                                    onChange={e => setContact({...contact, communicationPreference: e})}
                                                                    options={COMMUNICATION_PREF_OPTIONS}
                                                                    styles={FONT_STYLE_SELECT}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">WEBSITE URL</label>
                                                                <input type="text" 
                                                                    className="form-control border-radius-10 text-primary"
                                                                    value={contact.website}
                                                                    onChange={e => setContact({ ...contact, website: e.target.value })} 
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
                                                                <p class="font-size-14 mb-2">FULL NAME</p>
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
                                                                <label className="text-light-dark font-size-12 font-weight-500">BILLING CONTACT</label>
                                                                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">OPERATIONS CONTACT</label>
                                                                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">SECURITY CONTACT</label>
                                                                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">CONTACT EMAIL</label>
                                                                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4">
                                                            <div className="form-group">
                                                                <label className="text-light-dark font-size-12 font-weight-500">CONTACT NUMBER</label>
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
                                            <Users />
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
                                                            value={selectedRegion}
                                                            onChange={e => setSelectedRegion(e.target.value)}
                                                        >
                                                            {REGIONS.map(region =>
                                                                <div className="col-md-3">
                                                                    <Card variant={'outlined'} sx={{ borderRadius: 2, p: 3, py: 4, my: 1 }}>
                                                                        <FormControlLabel
                                                                            value={region.value}
                                                                            control={<Radio disabled={selectedRegion !== region.value}/>}
                                                                            label={region.label}
                                                                        />
                                                                    </Card>
                                                                </div>)}
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

import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { Box, Tab, Radio, RadioGroup, Tooltip, Checkbox, FormGroup, FormControlLabel, FormControl, TextareaAutosize, Card, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select';


export function AccountBilling(props) {

    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
            <div class="container-fluid mt-3">
                <h4>Renewal and Billing</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                    <div className="Account-custom-tabs">
                        <div class="row mt-5">
                            <div class="col-2 text-center">
                                <ul class="nav nav-tabs tabs-left sideways">
                                    <li><a className="active" href="#orders-v" data-toggle="tab">Orders</a></li>
                                    <li><a href="#bills-v" data-toggle="tab">Bills</a></li>
                                    <li><a href="#invoices-v" data-toggle="tab">Invoices</a></li>
                                </ul>
                            </div>
                            <div class="col-10">
                                <div className="card p-3">
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="orders-v">
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
                </Box>               
            </div>
        </div>
    )
}

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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Users } from "./Users";
import { PACKAGES, PLANS } from "./CONSTANTS";

export function AccountSupport(props) {

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


    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
            <div class="container-fluid mt-3">
                <h4 className="mt-5">Account</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
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
                </Box>

            </div>
        </div>
    )
}

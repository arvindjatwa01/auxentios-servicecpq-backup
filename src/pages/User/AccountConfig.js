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

export function AccountConfig(props) {
    const [value, setValue] = React.useState('packages');
    const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('annual');

    const [dValue, setDValue] = useState(null)
    const [open, setOpen] = React.useState(false);
    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChangeSelect = (e) => {
        setDValue(e)
    }

    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
            <div class="container-fluid mt-3">
                <h4>Account Configuration</h4>
                <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
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
                </Box>
            </div>
        </div>
    )
}

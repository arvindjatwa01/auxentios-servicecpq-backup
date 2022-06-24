import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import auxentionlogo from '../../assets/icons/png/auxentionlogo.png'
import erroricon from '../../assets/icons/png/error.png'
import smalldeleteicon from '../../assets/icons/png/small-delete.png'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function Configuration() {
    const [value, setValue] = React.useState('1');
    const [dValue, setDValue] = useState(null)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeSelect = (e) => {
        setDValue(e)
    }



    return (
        <div class="container-fluid mt-4">
            <h4 className="mt-5">System Configuration</h4>
            <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Active Modules" value="1" />
                            <Tab label="Business Area " value="2" />
                            <Tab label="Rules & Permissions " value="3" />
                            <Tab label="System Settings " value="4" />
                            <Tab label="Visualisaion options" value="5" />
                            <Tab label="Price Settings" value="6" />
                            <Tab label="Document editable options" value="7" />
                            <Tab label="Load data" value="8" />
                        </TabList>
                    </Box>
                    <TabPanel className="p-0" value="1">
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
                    </TabPanel>
                    <TabPanel className="p-0" value="2">
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
                                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Long Isiand" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-4 col-sm-4">
                                        <div className="form-group ">
                                            <label class="font-size-14 " for="exampleInputEmail1">SALES ORGANISATION </label>
                                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="USA" />
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
                                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Long Isiand" />
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
                                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Long Isiand" />
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
                                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Long Isiand" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-4 col-sm-4">
                                        <div className="form-group ">
                                            <label class="font-size-14 " for="exampleInputEmail1">DISPLAYED BUISSNESS NAME</label>
                                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Long Isiand" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-4 col-sm-4">
                                        <div className="form-group ">
                                            <label class="font-size-14 " for="exampleInputEmail1">DISPLAYED ADDRESS</label>
                                            <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Long Isiand" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel className="p-0" value="3">
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
                    </TabPanel>
                    <TabPanel className="p-0" value="4">
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
                    </TabPanel>
                    <TabPanel className="p-0" value="5">
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
                    </TabPanel>
                    <TabPanel className="p-0" value="6">
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
                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="10%" />
                                </div>
                                <div className="form-group ">
                                    <label class="font-size-14 " for="exampleInputEmail1">DEFAULT MARGIN LABOR</label>
                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="20%" />
                                </div>
                                <div className="form-group ">
                                    <label class="font-size-14 " for="exampleInputEmail1">DEFAULT MARGIN MISC.</label>
                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="10%" />
                                </div>
                                <div className="form-group ">
                                    <label class="font-size-14 " for="exampleInputEmail1">IF % ON TOTAL MISC.(DEFAULT) </label>
                                    <input type="email" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="15%" />
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
                    </TabPanel>
                    <TabPanel className="p-0" value="7">
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
                    </TabPanel>
                    <TabPanel className="p-0" value="8">
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

            <div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header d-block">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel2">Approve</h4>
                        </div>
                        <div class="modal-body" style={{ background: 'white' }}>
                            <div>
                                <a href="#" className="btn bg-primary text-white">Internal</a>
                            </div>
                            <h6 className="mt-3">MEMBERS</h6>
                            <p>Add / Remove Approver,s Email. The Domain name of the
                                Appriver,s email must match with the domain name of your registsred email.</p>

                            <div className=" d-flex">
                                <div class="input-group icons approvesearch mr-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                            <img src="/static/media/search.14487ffa.svg" />
                                        </span>
                                    </div>
                                    <input type="search" class="form-control" placeholder="" aria-label="Search Dashboard" />
                                    <div className="customselect d-flex align-items-center" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                                        <Select
                                            // onChange={handleChangeSelect}
                                            isClearable={true}
                                            // value={dValue}
                                            options={[{ label: "One", value: "one" }]}
                                            placeholder="Viewer"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <a href="#" className="btn bg-primary text-white">Invite</a>
                                </div>
                            </div>
                            <hr />
                            <h5>ADDED APPROVERS</h5>
                            <div className="card border mt-3">
                                <div className="d-flex approvers-div p-3 justify-content-between align-items-center">
                                    <div className="d-flex">
                                        <div className="img-box mr-3">
                                            <span>A</span>
                                        </div>
                                        <div className="contant-div">
                                            <p className="m-0">Product Manager</p>
                                            <h6 className="m-0">Jane Doe</h6>
                                            <p className="m-0">jhondoe99@gmail.com</p>
                                        </div>
                                    </div>
                                    <div>
                                        <a href="#" className="btn text-light">Can Approve <span><KeyboardArrowDownIcon /></span></a>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex approvers-div p-3 justify-content-between align-items-center">
                                    <div className="d-flex">
                                        <div className="img-box mr-3">
                                            <span>A</span>
                                        </div>
                                        <div className="contant-div">
                                            <p className="m-0">Product Manager</p>
                                            <h6 className="m-0">Jane Doe</h6>
                                            <p className="m-0">jhondoe99@gmail.com</p>
                                        </div>
                                    </div>
                                    <div>
                                        <a href="#" className="btn text-light">Can Approve <span><KeyboardArrowDownIcon /></span></a>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h5>INVITED APPROVERS</h5>
                            <div className="card border mt-3">
                                <div className="d-flex approvers-div p-3 justify-content-between align-items-center">
                                    <div className="d-flex">
                                        <div className="img-box mr-3">
                                            <span>A</span>
                                        </div>
                                        <div className="contant-div">
                                            <p className="m-0">Product Manager</p>
                                            <h6 className="m-0">Jane Doe</h6>
                                            <p className="m-0">jhondoe99@gmail.com</p>
                                        </div>
                                    </div>
                                    <div>
                                        <a href="#" className="btn text-light">Can Approve <span><KeyboardArrowDownIcon /></span></a>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className=" col-md-6">
                                    <a href="#" className="btn border d-block">Remove</a>
                                </div>
                                <div className=" col-md-6">
                                    <a href="#" className="btn d-block bg-primary text-white">Add</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

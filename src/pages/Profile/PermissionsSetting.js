import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
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
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import smalldeleteicon from '../../assets/icons/png/small-delete.png'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CommanComponents } from "../../components/index"
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
export function PermissionsSetting(props) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

    const handleConfigureSystem = (e) => {
        props.parentCallback()
    }



    return (
        <>
            <CommanComponents />
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid mt-3">
                    <div className="maintableheader card mb-0">
                        <div className="d-flex align-items-center p-3">
                            <div className="search-icon mr-3" style={{ lineHeight: '24px' }}>
                                <img src={searchstatusIcon}></img>
                            </div>
                            <div className="d-flex align-items-center">
                                <a href="#" className="btn alert-messges ">Add Permissions  <AddBoxOutlinedIcon className="font-size-18" /></a>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className="maintableheader bg-white mt-3 border-radius-10 p-3 mt-3 ">
                        <div className="d-flex">
                            <div className="search-icon mr-3" style={{ lineHeight: '24px' }}>
                                <img src={searchstatusIcon}></img>
                            </div>
                            <div className="w-100">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10">
                                        <div className="d-flex align-items-center">
                                            <span className="mr-3">Repair Builder</span>
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
                                <div className="customselect mt-2" style={{ width: 'fit-content' }}>
                                    <Select
                                        // onChange={handleChangeSelect}
                                        isClearable={true}
                                        // value={dValue}
                                        options={[{ label: "One", value: "one" }]}
                                        placeholder="&"
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10 mt-2" style={{ width: 'fit-content' }}>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-3">Templates</span>
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
                                <div className="customselect mt-2" style={{ width: 'fit-content' }}>
                                    <Select
                                        // onChange={handleChangeSelect}
                                        isClearable={true}
                                        // value={dValue}
                                        options={[{ label: "One", value: "one" }]}
                                        placeholder="&"
                                    />
                                </div>
                                <div className="d-flex justify-content-between align-items-center p-3 bg-light-dark border-radius-10 mt-2" style={{ width: 'fit-content' }}>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-3">Prcing</span>
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
                                <div className="mt-3">
                                    <a href="#" className="btn alert-messges ">Add Group  <AddBoxOutlinedIcon className="font-size-18" /></a>
                                </div>
                                <div className="mt-3 text-right">
                                    <a href="#" className="btn bg-primary text-white mr-3">Save</a>
                                    <a href="#" className="btn border ">Cancel</a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

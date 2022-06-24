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
import smalldeleteicon from '../../assets/icons/png/small-delete.png'
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function AccountActivated(props) {
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

    const handleConfigureSystem = (e) => {
        props.parentCallback()
    }



    return (
        <>
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
            <div className="Add-new-segment-div p-3 border-radius-10 mt-3">
                <a href="#" onClick={handleConfigureSystem} className="btn bg-primary text-white">Configure System</a>
            </div>

        </>
    )
}

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
import { CommanComponents } from "../../components/index"
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
export function Permissions(props) {
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

    const handleConfigureSystem = (e) => {
        props.parentCallback()
    }



    return (
        <>
            <CommanComponents />
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid mt-3">
                    <h5 className="">Permission</h5>
                    <div class="container-fluid mt-3">
                        <div className="row">
                            <div className=" col-md-6">
                                <div class="table-responsive card">
                                    <table class="table mb-0 table table-bordered table-hover">
                                        <thead className="bg-primary text-white">
                                            <tr>
                                                <th scope="col"><div className="d-flex justify-content-between align-items-center">
                                                    <div>Mudule</div>
                                                    <div><KeyboardArrowDownOutlinedIcon /></div>
                                                </div></th>
                                                <th scope="col"><VisibilityOutlinedIcon className="mr-2" />View</th>
                                                <th scope="col"><SmsOutlinedIcon className="mr-2" />Comment</th>
                                                <th scope="col"><ShareOutlinedIcon className="mr-2" />Share</th>
                                                <th scope="col"><a href="/permission/settings" className="text-white"><ModeEditOutlineOutlinedIcon className="mr-2" />Edit access</a></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            <tr>
                                                <td data-toggle="collapse" data-target="#bystatus" ><div className="d-flex justify-content-between align-items-center">
                                                    <div>Solution Builder</div>
                                                    <div><KeyboardArrowDownOutlinedIcon /></div>
                                                </div></td>
                                                <td>  <Checkbox {...label} /></td>
                                                <td>  <Checkbox {...label} /></td>
                                                <td>  <Checkbox {...label} /></td>
                                                <td>  <Checkbox {...label} /></td>
                                            </tr>
                                        </tbody>
                                        <tbody class="collapse" id="bystatus">
                                            <tr>
                                                <td>
                                                    <div>header</div>
                                                    <small>Solution Builder</small>
                                                </td>
                                                <td>  <Checkbox {...label} /></td>
                                                <td>  <Checkbox {...label} /></td>
                                                <td>  <Checkbox {...label} /></td>
                                                <td>  <Checkbox {...label} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="span4 collapse-group">
                                <div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

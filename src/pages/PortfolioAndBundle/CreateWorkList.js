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
import boxicon from '../../assets/icons/png/box.png'
import PartIcons from '../../assets/icons/png/PartIcons.png'
import DataTable from 'react-data-table-component';
import { CommanComponents } from "../../components/index"
import Portfoliosicon from '../../assets/icons/svg/Portfolios-icon.svg'
import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg'
import contract from '../../assets/icons/svg/contract.svg'
import repairicon from '../../assets/icons/svg/repair-icon.svg'
import OwlCarousel from 'react-owl-carousel'
import { Link } from "react-router-dom"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';



export function CreateWorkList(props) {

    const [selectedOption, setSelectedOption] = useState(null);
    const reasonForRequestOptions = [
        { value: 'accountUnlock', label: 'Account unlock' },
        { value: 'grantAccess', label: 'Grant access' },
        { value: 'buildNewUseCase', label: 'Build new use case' },
        { value: 'coDevelopUseCase', label: 'Co-develop use case' },
        { value: 'traning', label: 'Training ' },
        { value: 'systemDefect', label: 'System defect' },
        { value: 'productSupport', label: 'Product support' },
    ];

    return (
        <>
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid mt-3">
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
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
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
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">REQUESTER</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Defaulted by system" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CUSTOMER</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CREATED ON</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PROMISE DATE</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">SOURCE</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Defaulted by system" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PROGRESS</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CONSISTENCY</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <div className="form-group ">
                                    <label class="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">ASSIGNED TO</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                </div>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                <div className="Add-new-segment-div p-3 border-radius-10 bg-light-blue">
                                    <Link to="/workList" className="btn bg-primary text-white"><span className="mr-2">+</span>Add Attachments</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

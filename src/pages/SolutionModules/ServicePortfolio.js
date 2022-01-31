import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import { CommanComponents } from "../../components/index"
import FormGroup from '@mui/material/FormGroup';
import Select from 'react-select';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from 'react-router-dom'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { FileUploader } from "react-drag-drop-files";
// import MuiMenuComponent from "../Operational/MuiMenuComponent";
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import editIcon from '../../assets/icons/svg/edit.svg'
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import searchLogo from '../../assets/icons/svg/search.svg';

export function ServicePortfolio(props) {
    const [age, setAge] = React.useState('5');
    const [age1, setAge1] = React.useState('5');
    const [age2, setAge2] = React.useState('5');

    const handleChangedrop = (event) => {
        setAge(event.target.value);
    };
    const handleChangedrop1 = (event) => {
        setAge1(event.target.value);
    };
    const handleChangedrop2 = (event) => {
        setAge2(event.target.value);
    };
    const options = [
        { value: 'chocolate', label: 'Construction-Heavy' },
        { value: 'strawberry', label: 'Construction-Low' },
        { value: 'vanilla', label: 'Construction-Medium' },
        { value: 'Construction', label: 'Construction' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);

    const [value, setValue] = React.useState('1');

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [openCoverage, setOpenCoveragetable] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);
    const handleCoveragetable = () => setOpenCoveragetable(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fileTypes = ["JPG", "PNG", "GIF"];


    const activityOptions = [
        'None',
        'Atria',
        'Callisto'
    ];
    const columns = [
        { field: 'GroupNumber', headerName: 'Group Number', flex: 1, width: 70 },
        { field: 'Type', headerName: 'Type', flex: 1, width: 130 },
        { field: 'Partnumber', headerName: 'Part number', flex: 1, width: 130 },
        { field: 'PriceExtended', headerName: 'Price Extended', flex: 1, width: 130 },
        { field: 'Pricecurrency', headerName: 'Price currency', flex: 1, width: 130 },
        { field: 'Usage', headerName: 'Usage', flex: 1, width: 130 },
        { field: 'TotalPrice', headerName: 'Total Price', flex: 1, width: 130 },
        { field: 'Comments', headerName: 'Comments', flex: 1, width: 130 },
        { field: 'Actions', headerName: 'Actions', flex: 1, width: 130 },
        // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
        // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
        //   `${params.getValue(params.id, 'firstName') || ''} ${
        //       params.getValue(params.id, 'DocumentType') || ''
        //     }`,

    ];

    const rows = [
        { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Inconsistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        { id: 2, GroupNumber: 'Lannister', Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency: 'Open', Usage: 'Consistent', TotalPrice: 'Inconsistent', Comments: 'Inconsistent', Actions: 'Inconsistent', },
        // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
        // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
        // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
        // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
        // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
        // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
    ];
    return (
        <>
            <CommanComponents />
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid ">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Service Portfolio</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                            <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                            {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}

                        </div>
                    </div>
                    <div className="card p-4 mt-5">
                        <h5 className="d-flex align-items-center mb-0">
                            <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a>
                                <a href="#" className="btn-sm"><img style={{ width: '14px' }} src={folderaddIcon}></img></a></div>
                            <div class="input-group icons border-radius-10 border">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                        <img src={searchLogo} /></span>
                                </div>
                                <input type="search" class="form-control search-form-control" aria-label="Search Dashboard" />
                            </div>
                        </h5>
                        <Box className="mt-4" sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="General" value="1" />
                                        <Tab label="Validity " value="2" />
                                        <Tab label="Strategy" value="3" />
                                        <Tab label="Price" value="4" />
                                        <Tab label="Price Agreement" value="5" />
                                        <Tab label="Coverage" value="6" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <div class="row mt-4">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">SOLUTION CODE</p>
                                                <h6 class="font-weight-600">X1234</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">SOLUTION DESCRIPTION</p>
                                                <h6 class="font-weight-600">solution for customer x</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">REFERENE</p>
                                                <h6 class="font-weight-600">RFQ123 </h6>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">DATE</label>
                                            <div className="d-flex align-items-center">
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                                <div className="form-group mx-2">To</div>
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">

                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">HOUR</label>
                                            <div className="d-flex align-items-center">
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                                <div className="form-group mx-2">To</div>
                                                <div class="form-group w-100">
                                                    <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group">
                                                <Link to={"/repairOption"} className="btn bg-primary text-white">
                                                    Next
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="3">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE LIST</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE METHOD</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PRICE DATE</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="4">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">MAKE</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">MODEL(S)</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">PREFIX(S)</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">MACHINE/COMPOMENT</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">MACHINE TYPE</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">MACHINE DATE</label>
                                                <Select
                                                    defaultValue={selectedOption}
                                                    onChange={setSelectedOption}
                                                    options={options}
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                            <a href="#" className="btn btn-primary w-100" onClick={() => setOpen1(true)}> Create New</a>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="5"></TabPanel>
                                <TabPanel value="6">
                                    <div class="row mt-4">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">MAKE</p>
                                                <h6 class="font-weight-600">Caterpillar</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">MODEL(S)</p>
                                                <h6 class="font-weight-600">D8T, D6T</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">PREFIX(S)</p>
                                                <h6 class="font-weight-600">MB8</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">MACHINE/COMPONENT</p>
                                                <h6 class="font-weight-600">Machine</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">MACHINE TYPE</p>
                                                <h6 class="font-weight-600">New</h6>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="form-group">
                                                <p class="font-size-12 font-weight-500 mb-2">COVERAGE DATA</p>
                                                <h6 class="font-weight-600">Coverage123</h6>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>

                    </div>
                    <div className="card mt-5">
                        <div className="fileheader p-4 border-bottom">
                            <h6 className="font-weight-600 text-light mb-0">Table Name<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                        </div>
                        <div className="p-4  row">
                            <div className="col-md-6 col-sm-6">
                                <a href="#" className="add-new-recod">
                                    <div>
                                        <FontAwesomeIcon icon={faPlus} />
                                        <p className="font-weight-600">Add new record</p>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div className="add-new-recod">

                                    <div>
                                        <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                        <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                        <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                        <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={open1} onHide={handleClose1} size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>

                        <Modal.Body className="">
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                <h5 className="font-weight-600 mb-0">Coverage</h5>
                                <div className="d-flex justify-content-center align-items-center">
                                    <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                                    {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}

                                </div>
                            </div>
                            <div className="card mt-4">
                                <div className="fileheader border-bottom d-flex align-items-center justify-content-between">
                                    <h6 className="font-weight-600 text-light mb-0 ml-3">Table Name<span> <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                                    <div>
                                        <a href="#" className="btn">+Add</a>
                                    </div>
                                </div>
                                <div className="p-4  row">
                                    <div className="col-md-6 col-sm-6">
                                        <a href="#" className="add-new-recod">
                                            <div>
                                                <FontAwesomeIcon icon={faPlus} />
                                                <p className="font-weight-600">Add new record</p>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="add-new-recod">

                                            <div>
                                                <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                                <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                                <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn text-light border-light font-weight-500 border-radius-10 mt-3"><span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Select files to upload</a>
                                                <p className="mt-3">Single upload file should not be more than <br />10MB. Only the  .xls, .xlsx file types are allowed</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <Modal show={open} onHide={handleClose} size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Import Files</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="p-3">
                                <div className="add-new-recod">
                                    <div>
                                        <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                        <h6 className="font-weight-500 mt-3">Drag and drop files to upload <br /> or</h6>
                                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                                    </div>
                                </div>
                                <p className="mt-3">Single upload file should not be more than 10MB. Only the  .xls, .xlsx file types are allowed</p>
                            </div>
                            <div className="recent-div p-3">
                                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                                <div className="recent-items mt-3">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
                                        <div className="d-flex align-items-center">
                                            <div className="white-space custom-checkbox">
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="" />
                                                </FormGroup>
                                            </div>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                            {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                    <p className="font-size-12 mb-0">Part List </p>
                                </div>
                                <div className="recent-items mt-3">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Engine Partlist</span></p>
                                        <div className="d-flex align-items-center">
                                            <div className="white-space custom-checkbox">
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox />} label="" />
                                                </FormGroup>
                                            </div>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                                            <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                                            {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}
                                        </div>
                                    </div>

                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                                    <p className="font-size-12 mb-0">Part List </p>
                                </div>
                            </div>


                        </Modal.Body>
                        <div className="row m-0 p-3">
                            <div className="col-md-6 col-sm-6">
                                <button className="btn border w-100 bg-white" onClick={handleClose}>Cancel</button>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <button className="btn btn-primary w-100" onClick={() => setOpenCoveragetable(true)} style={{ cursor: 'pointer' }}><FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />Upload</button>
                            </div>
                        </div>


                    </Modal>
                    <Modal show={openCoverage} onHide={handleCoveragetable} size="xl"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>

                        <Modal.Body className="">
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                <h5 className="font-weight-600 mb-0">Coverage</h5>
                                <div className="d-flex justify-content-center align-items-center">
                                    <a href="#" className="ml-3 font-size-14"><img src={shareIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={folderaddIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={uploadIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={deleteIcon}></img></a>
                                    <a href="#" className="ml-3 font-size-14"><img src={copyIcon}></img></a>
                                    {/* <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a> */}

                                </div>
                            </div>
                            <div className="card px-4 pb-4 mt-5 pt-0">
                                <div className="row align-items-center">
                                    <div className="col-3">
                                        <div className="d-flex ">
                                            <h5 className=" mb-0"><span>Coverage123</span></h5>
                                            <p className=" mb-0">
                                                <a href="#" className="ml-3 "><img src={editIcon}></img></a>
                                                <a href="#" className="ml-3 "><img src={shareIcon}></img></a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-5">
                                        <div className="d-flex align-items-center" style={{ background: '#F9F9F9', padding: '10px 15px', borderRadius: '10px' }}>
                                            <div className="search-icon mr-2" style={{ lineHeight: '24px' }}>
                                                <img src={searchstatusIcon}></img>
                                            </div>
                                            <div className="w-100 mx-2">
                                                <div className="machine-drop d-flex align-items-center">
                                                    <div><lable className="label-div">Machine</lable></div>
                                                    <FormControl className="" sx={{ m: 1, }}>
                                                        <Select
                                                            id="demo-simple-select-autowidth"
                                                            value={age}
                                                            onChange={handleChangedrop}
                                                            autoWidth
                                                        >
                                                            <MenuItem value="5">
                                                                <em>Engine</em>
                                                            </MenuItem>
                                                            <MenuItem value={10}>Twenty</MenuItem>
                                                            <MenuItem value={21}>Twenty one</MenuItem>
                                                            <MenuItem value={22}>Twenty one and a half</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-4">
                                        <div className="d-flex align-items-center">
                                            <div className="col-7 text-center">
                                                <a href="#" className="p-1 more-btn">+ 3 more
                                                    <span className="c-btn">C</span>
                                                    <span className="b-btn">B</span>
                                                    <span className="a-btn">A</span>
                                                </a>
                                            </div>
                                            <div className="col-5 text-center border-left py-4">
                                                <a href="#" className=" ">+ Add Part</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="" style={{ height: 400, width: '100%', backgroundColor: '#fff' }}>
                                    <DataGrid
                                        sx={{
                                            '& .MuiDataGrid-columnHeaders': {
                                                backgroundColor: '#7380E4', color: '#fff'
                                            }
                                        }}
                                        rows={rows}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection


                                    />
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </>
    )
}

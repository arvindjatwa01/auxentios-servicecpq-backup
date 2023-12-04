import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
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
import { CommanComponents } from "../../components/index"
import { MuiMenuComponent } from "pages/Operational";
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const QuoteSolutionConfiguration = (props) => {

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
      {/* <CommanComponents /> */}
      <div className="row justify-content-center">
        {/* <div class="container-fluid "> */}
          
          <div className="card p-4 mt-5" style={{ width: "60%" }}>
            <p className="my-2"><b>Choose what solution you want to configure</b></p>
            <div className="row">
              <div className="col-md-6">
                <Link onClick={() => props.setSelectedQuoteOption("without_eval")} className="card p-3">
                  <div class="d-flex">
                    <div class="mr-2"><VerifiedOutlinedIcon className="font-size-65 text-light mr-2" /></div>
                    <div>
                      <h5 class="text-light">Without Evalution</h5>
                      <p><b>You configuration solutions by answering a set of questions</b></p>
                      <p>Exampies, You answer questions releted to your requlreemnts for a maintenance plan.Sytem picks up a pre-configured template based on your answers</p>

                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6">
                <Link to='/solutionBuilder/analytics' className="card p-3">
                  <div class="d-flex">
                    <div class="mr-2"><VerifiedOutlinedIcon className="font-size-65 text-light mr-2" /></div>
                    <div>
                      <h5 class="text-light">With evaluation</h5>
                      <p><b>You configuration solutions by answering a set of questions</b></p>
                      <p>Exampies, You answer questions releted to your requlreemnts for a maintenance plan.Sytem picks up a pre-configured template based on your answers</p>

                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

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
                      <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
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
                      <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions} /></a>
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
        {/* </div> */}
      </div>
    </>
  )
}

export default QuoteSolutionConfiguration
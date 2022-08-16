import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import Select from '@mui/material/Select';
import { FileUploader } from "react-drag-drop-files";
import { MuiMenuComponent } from '../Operational/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Buttonarrow from '../../assets/icons/svg/Button-arrow.svg'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { SolutionSelector } from './index'
import { CommanComponents } from "../../components/index"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Link } from "react-router-dom";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DataGrid } from '@mui/x-data-grid';

import { SolutionBuilderModal } from "../../pages/SolutionModules/index"


export const PortfolioSummary = () => {
    const [value, setValue] = React.useState('1');
    const [openSolutionSelector, setOpenSolutionSelector] = useState(false)
    const [solutionBuilderShow, setSolutionBuilderShow] = useState(false)
    const [showExplore, setShowExplore] = useState(false);
    const [modalComponent, setModalComponent] = useState(null)
    const [openAddBundleItem, setOpenAddBundleItem] = useState(false)
    const [createNewBundle, setCreateNewBundle] = useState(false)
    const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("")

    const [openSearchSolution, setOpenSearchSolution] = useState(false)
    const [typeOfSearch, setTypeOfSearch] = useState(null)
    const [typeOfSolutionSelector, setTypeOfSolutionSelector] = useState(-1)
    const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null)
    const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([{ label: "Bundle", value: 'bundle' }, { label: "Service", value: 'service' }, { label: "Portfolio Item", value: 'portfolioItem' }])
    const [typeOfSearchColumnKeyValue, setTypeOfSearchColumnKeyValue] = useState([{ label: "Make", value: 'make' }, { label: "Model", value: 'model' }, { label: "Prefix", value: 'prefix' }])
    const [columnSearchText, setColumnSearchText] = useState('');
    const [typeOfSolutionBuild, setTypeOfSolutionBuild] = useState(-1)
    const [buildSolutionValue, setBuildSolutionValue] = useState(-1)


    const [age, setAge] = React.useState('5');
    const [age1, setAge1] = React.useState('5');
    const [age2, setAge2] = React.useState('5');
    const [show, setShow] = React.useState(false);


    const handleChangedrop = (event) => {
        setAge(event.target.value);
      };
      const handleChangedrop1 = (event) => {
        setAge1(event.target.value);
      };
      const handleChangedrop2 = (event) => {
        setAge2(event.target.value);
      };


      const handleRowClick=(e)=>{
        setShow(true)
      }

      const rows = [
        { id: 1, GroupNumber: 'Snow', Type: 'Jon', Partnumber: 35, PriceExtended:'pending', Pricecurrency:'Open',  Usage:'Inconsistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Created:'Created On', Total:'25', Status:'Status', Actions:'Action',  },
        { id: 2, GroupNumber: 'Lannister',Type: 'Cersei', Partnumber: 42, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent',  Created:'Created On', Total:'25', Status:'Status', Actions:'Action', },
        { id: 3, GroupNumber: 'Lannister', Type: 'Jaime', Partnumber: 45, PriceExtended: 'pending', Pricecurrency:'Open',  Usage:'Consistent', TotalPrice:'Inconsistent', Comments:'Inconsistent', Created:'Created On', Total:'25', Status:'Status', Actions:'Action', },
        // { id: 4, DocumentType: 'Stark', PrimaruQuote: 'Arya', Groupid: 16, progress: 'pending',},
        // { id: 5, DocumentType: 'Targaryen', PrimaruQuote: 'Daenerys', Groupid: null, progress: 35, },
        // { id: 6, DocumentType: 'Melisandre', PrimaruQuote: null, Groupid: 150, progress: 35, },
        // { id: 7, DocumentType: 'Clifford', PrimaruQuote: 'Ferrara', Groupid: 44, progress: 35, },
        // { id: 8, DocumentType: 'Frances', PrimaruQuote: 'Rossini', Groupid: 36, progress: 35, },
        // { id: 9, DocumentType: 'Roxie', PrimaruQuote: 'Harvey', Groupid: 65, progress: 35, },
      ];
    
      const columns = [
        { field: 'GroupNumber', headerName: 'ID#', flex:1, width: 70 },
        { field: 'Type', headerName: 'Description',  flex:1, width: 130 },
        { field: 'Partnumber', headerName: 'Customer#',  flex:1, width: 130 },
        { field: 'PriceExtended', headerName: 'Make',  flex:1, width: 130 },
        { field: 'Pricecurrency', headerName: 'Model',  flex:1, width: 130 },
        { field: 'Usage', headerName: 'Family',  flex:1, width: 130 },
        { field: 'TotalPrice', headerName: 'Serial#',  flex:1, width: 130 },
        { field: 'Comments', headerName: 'Created by',  flex:1, width: 130 },
        { field: 'Created', headerName: 'Created On',  flex:1, width: 130 },
        { field: 'Total', headerName: 'Total $',  flex:1, width: 130 },
        { field: 'Status', headerName: 'Status',  flex:1, width: 130 },
        { field: 'Actions', headerName: 'Actions',  flex:1, width: 130 },
        // { field: 'Actions', headerName: 'Total $',  flex:1, width: 130 },
        // { field: 'Actions', headerName: 'Status',  flex:1, width: 130 },
        // {field: 'age',headerName: 'Age',type: 'number', width: 90,},
        // {field: 'fullName',headerName: 'Full name',description: 'This column has a value getter and is not sortable.',sortable: false,width: 160,valueGetter: (params) =>
        //   `${params.getValue(params.id, 'firstName') || ''} ${
        //       params.getValue(params.id, 'DocumentType') || ''
        //     }`,
        
      ];

      

    const handleBuildSolution = (e) => {
        setBuildSolutionValue(e.target.value)
    }

    const handleCallbackClose = (data) => {
        if (solutionBuilderShow) {
            setSolutionBuilderShow(false);
        } else {
            setSolutionBuilderShow(true);
        }
    }

    const handleContinueCallback = (data) => {
        if (data) {
            setTypeOfSolutionBuild(0)
            setOpenSolutionSelector(true)
            setOpen(false)
        } else {
            setTypeOfSolutionBuild(1)
            setOpenSolutionSelector(false)
            setOpen(true)
            setTypeOfSolutionSelector(1)
        }
        setSolutionBuilderShow(false);
        setModalComponent(null)
        setOpenSearchSolution(false)
        setShowExplore(false)
    }

    const handleNextSolutionSelector = () => {
        if (buildSolutionValue == "0") {
            window.location.href = "/solutionBuilder/guide"
        } else {
            setTypeOfSolutionBuild(0)
            setOpenSolutionSelector(false)
            setOpen(true)
            setSolutionBuilderShow(false);
            setModalComponent(null)
            setOpenSearchSolution(false)
            setShowExplore(false)
            setTypeOfSolutionSelector(0)
        }
    }

    const handleShowSearchParentCallback = (data) => {
        setOpenSearchSolution(true)
        setOpenSolutionSelector(false)
        setSolutionBuilderShow(false);
        setModalComponent(null)
        setShowExplore(false)
    }

    const handleBundleItemSaveAndContinue = () => {
        // toast('👏 Item Added', {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        setOpenSolutionSelector(false)
        setSolutionBuilderShow(false);
        setModalComponent(null)
        setOpenSearchSolution(false)
        setShowExplore(true)
    }

    const handleCloseExplore = () => {
        setShowExplore(false);
    }

    const handleShow = () => {
        if (solutionBuilderShow) {
            setModalComponent(<SolutionBuilderModal showSearchParentCallback={handleShowSearchParentCallback} continueParentCallback={handleContinueCallback} parentCallback={handleCallbackClose} open={false} />)
        } else {
            setModalComponent(<SolutionBuilderModal showSearchParentCallback={handleShowSearchParentCallback} continueParentCallback={handleContinueCallback} parentCallback={handleCallbackClose} open={true} />)
        }
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fileTypes = ["JPG", "PNG", "GIF"];


    const activityOptions = [
        'None',
        'Atria',
        'Callisto'
    ];


    const handleTypeOfSearchChange = (e) => {
        setTypeOfSearch(e)
        if (e == null) {
            setColumnSearchText("")
        }
    }
    const handleTypeOfSearchColumnChange = (e) => {
        setTypeOfSearchColumn(e)
        if (e == null) {
            setColumnSearchText("")
        }
    }



    const handleCreateNewServiceBundle = () => {
        if (typeOfSearch.value == 'bundle') {
            setOpenAddBundleItem(false)
            setOpenSearchSolution(false)
            setCreateNewBundle(true)
            setOpenAddBundleItemHeader("Add New Bundle")
        } else if (typeOfSearch.value == 'service') {
            setOpenAddBundleItem(true)
            setOpenSearchSolution(false)
            setCreateNewBundle(false)
            setOpenAddBundleItemHeader("Add New Service")
        } else if (typeOfSearch.value == 'portfolioItem') {
            setOpenAddBundleItem(true)
            setOpenSearchSolution(false)
            setCreateNewBundle(false)
            setOpenAddBundleItemHeader("Add New Portfolio Item")
        }

    }


    return (
        <>
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Portfolio and Service</h5>
                        <div>
                            <Link to="/portfolioBuilder/new" style={{ cursor: 'pointer' }} className="btn bg-primary text-white">
                                <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create New<span className="ml-2"></span>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="card p-4 mt-5">
                        
                        <div className="mt-1">
                            {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
                            <div className="recent-div p-3">
                                <h6 className="font-weight-600 text-grey mb-0">RECENT</h6>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Portfolio Solution </span></p>
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
                                    </div>
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
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
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
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
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Portfolio Solution </span></p>
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
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
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
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Stardegy Task</span></p>
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

                                </div>

                            </div>
                            <div className="recent-div p-3">
                                <h6 className="font-weight-600 text-grey mb-0">SERVICE BUNDLES</h6>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
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
                                    </div>
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Service Bundles</span></p>
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
                                    <div className="col-md-4">
                                        <div className="recent-items mt-3">
                                            <div className="d-flex justify-content-between align-items-center ">
                                                <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Stardegy Task</span></p>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary px-3 mb-3">
           <div className="row align-items-center">
          <div className="col-3">
          <div className="d-flex ">
          <h5 className="mr-4 mb-0 text-white"><span>Templates</span></h5>
          <p className="ml-4 mb-0">
            <a href="#" className="ml-3 text-white"><EditOutlinedIcon/></a>
            <a href="#" className="ml-3 text-white"><ShareOutlinedIcon/></a>
          </p>
          </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <div className="search-icon mr-2 text-white" style={{lineHeight:'24px'}}>
              <SearchOutlinedIcon/>
              </div>
              <div className="w-100 mx-2">
              <div className="machine-drop d-flex align-items-center bg-white">
             <div><lable className="label-div">Model</lable></div>
            <FormControl className="" sx={{ m: 1,}}>
              <Select 
                id="demo-simple-select-autowidth"
                value={age}
                onChange={handleChangedrop}
                autoWidth
              >
                <MenuItem value="5">
                  <em>797</em>
                </MenuItem>
                <MenuItem value={10}>797</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </div>
              </div>
              <div className="w-100 mx-2">
              <div className="machine-drop d-flex align-items-center bg-white">
             <div><lable className="label-div">Make</lable></div>
            <FormControl className="" sx={{ m: 1,}}>
              <Select 
                id="demo-simple-select-autowidth"
                value={age1}
                onChange={handleChangedrop1}
                autoWidth
              >
                <MenuItem value="5">
                  <em>2018</em>
                </MenuItem>
                <MenuItem value={10}>2018</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </div>
              </div>
              <div className="w-100 mx-2">
              <div className="machine-drop d-flex align-items-center bg-white">
             <div><lable className="label-div">Family </lable></div>
            <FormControl className="" sx={{ m: 1,}}>
              <Select 
                id="demo-simple-select-autowidth"
                value={age2}
                onChange={handleChangedrop2}
                autoWidth
              >
                <MenuItem value="5">
                  <em>Dozer</em>
                </MenuItem>
                <MenuItem value={10}>Twenty</MenuItem>
                <MenuItem value={21}>Twenty one</MenuItem>
                <MenuItem value={22}>Twenty one and a half</MenuItem>
              </Select>
            </FormControl>
          </div>
              </div>
              <div className="w-100" style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'#fff',border:'1px solid #fff',borderRadius:'5px',padding:'0px 15px'
}}>
                <lable>Search By</lable>
                {/* <Checkbox {...label} /> */}
                </div>
            </div>
         
          </div>
          <div className="col-3">
            <div className="d-flex align-items-center">
              <div className="col-8 text-center">
              <a href="#" className="p-1 more-btn text-white">+ 3 more
              <span className="c-btn">C</span>
              <span className="b-btn">B</span>
              <span className="a-btn">A</span>
              </a>
              </div>
              <div className="col-4 text-center border-left py-3">
              <Link to="/repairOptions" className="p-1 text-white">+ Add Part</Link>
              </div>
            </div>
          </div>
          </div>
             </div>   
        <div className="card">
    
        <div className="" style={{ height: 400, width: '100%', backgroundColor:'#fff' }}>
            <DataGrid
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#7380E4', color:'#fff'
              }
            }}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onCellClick={(e)=>handleRowClick(e)}
              
              
            />
          </div> 
        </div>


                    <ToastContainer />
                </div>
            </div>
        </>
    )
};

import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
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
            <CommanComponents />
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid ">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Portfolio and Service</h5>
                    </div>
                    <div className="card p-4 mt-5">
                        <div>
                            <a href="/portfolioBuilder/new" style={{ cursor: 'pointer' }} className="btn bg-primary text-white">
                                <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Create New<span className="ml-2"></span>
                            </a>
                        </div>
                        <div className="mt-5">
                            <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6>
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
                    <ToastContainer />
                </div>
            </div>
        </>
    )
};

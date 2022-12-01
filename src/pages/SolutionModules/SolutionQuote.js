import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import { FileUploader } from "react-drag-drop-files";
import { Link } from 'react-router-dom'
import { MuiMenuComponent } from '../Operational/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faFolderPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
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
import { CommanComponents } from "components";
import { SolutionBuilderModal, SolutionSelector } from "pages/SolutionModules";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const  SolutionQuote=()=>{

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

    return(
      <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0" style={{fontSize:"18px"}}>Solution Quote</h5>
            <div>
              <Link to="/SolutionQuoteSearch"  style={{ cursor: 'pointer' }} className="btn bg-primary text-white pull-right">
        Search Quote<ChevronRightIcon className=""/>
              </Link>
            </div>
          </div>
          <div className="card p-4 mt-5">
           
            <div className="mt-5">
              {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <h6 className="font-weight-600 text-grey mb-0">RECENT SOLUTION QUOTE</h6>
                <div className="row">
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14 text-primary" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="recent-items mt-3 block-div">
                      <div className="d-flex justify-content-between align-items-center ">
                        <p className="mb-0 "><FontAwesomeIcon className=" font-size-14" icon={faFileAlt} /><span className="font-weight-500 ml-2">Solution Quote</span></p>
                        <div className="d-flex align-items-center">
                          <div className="white-space custom-checkbox">
                            <FormGroup>
                              <FormControlLabel  control={<Checkbox className="p-0 font-size-14 text-primary" defaultChecked />} label="" />
                            </FormGroup>
                          </div>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faShareAlt} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faFolderPlus} /></a>
                          <a href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faUpload} /></a>
                          <a href="#" className="ml-2 p-0 more-icon-div"><MuiMenuComponent className=" p-0 font-size-14" options={activityOptions} /></a>
                        </div>
                      </div>

                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <p className="font-size-12 mb-0">2:38pm, 19 Aug 21 </p>
                      <p className="font-size-12 mb-0">Solution Option</p>
                    </div>
                  </div>
                  

                </div>

              </div>
            </div>
          </div>
          <Modal show={open} onHide={handleClose} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
              <Modal.Title>Solution Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 pt-4 bg-white">
              <SolutionSelector defaultValue={typeOfSolutionSelector} />
            </Modal.Body>
          </Modal>

          <Modal show={openSolutionSelector} onHide={() => setOpenSolutionSelector(false)} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="bg-white">
              <Modal.Title>Solution Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p25 pt-4" style={{ backgroundColor: '#F8F8F8 !important' }}>
              <div>
                <h5 className='text-black'>How do you want to build the solution ?</h5>
                <RadioGroup className=''
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="position"
                  defaultValue="top"
                  value={buildSolutionValue}
                  onChange={handleBuildSolution}
                >
                  <div className="col-md-6 ">

                    <FormControlLabel
                      className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart"
                      value="0"
                      control={<Radio />}
                      label="Guided Solution"
                      labelPlacement="bottom"
                    />
                  </div>
                  <div className="col-md-6 ">
                    <FormControlLabel
                      className="w-100 m-0 mb-3  p-2 card py-4 align-itemsstart"
                      value="1"
                      control={<Radio />}
                      label="Non-guided solution"
                      labelPlacement="bottom"
                    />
                  </div>
                </RadioGroup>
                <div>
                  <button onClick={handleNextSolutionSelector} className="btn btn-primary w-100">Next  <img className='ml-2' src={Buttonarrow}></img></button>
                </div>
              </div>
            </Modal.Body>
          </Modal>


          <Modal show={openSearchSolution} onHide={() => setOpenSearchSolution(false)} size="xl"
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Body className="">
              Search Solution
              <div className="maintableheader bg-white mt-3 border-radius-10">
                <div className="d-flex justify-content-between align-items-center pl-2">
                  <div className="d-flex align-items-center">
                    <div className="customselect d-flex ml-3">
                      {/* <span>
                                        <a href="#" className="btn-sm">+</a>
                                    </span> */}
                      <Select
                        onChange={handleTypeOfSearchChange}
                        isClearable={true}
                        value={typeOfSearch}
                        options={columnSearchKeyValue}
                        placeholder="Add by"
                      />
                    </div>
                    {typeOfSearch != null
                      ?
                      <div className="customselect d-flex ml-3">
                        <span>
                          <a href="#" className="btn-sm">+</a>
                        </span>
                        <Select
                          onChange={handleTypeOfSearchColumnChange}
                          isClearable={true}
                          value={typeOfSearchColumn}
                          options={typeOfSearchColumnKeyValue}
                          placeholder="Select"
                        />
                        {typeOfSearchColumn != null
                          ?
                          // <></>
                          <input type="email" class="" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter text" style={{ border: 'none', background: 'transparent', width: '80px', fontWeight: '600', paddingLeft: '10px' }} value={columnSearchText} onChange={(e) => setColumnSearchText(e.target.value)}></input>
                          : <></>
                        }
                      </div>
                      : <></>
                    }

                  </div>
                  <div>
                    <div className="">
                      <a href="#" style={{ cursor: 'pointer' }} className="btn border-left"><span>+</span> Add</a>
                      <a href="#" className="btn border-left">Cancel</a>
                    </div>
                  </div>
                </div>
                {columnSearchText.trim() != "" && typeOfSearchColumn != null
                  ?
                  <div className="tableheader">
                    <ul class="submenu accordion mt-0" style={{ display: 'block' }}>
                      <li><a className="cursor result">RESULTS</a></li>
                      <li><a className="cursor" onClick={handleBundleItemSaveAndContinue}>PM125</a></li>
                      <li><a className="cursor" onClick={handleBundleItemSaveAndContinue}>PM2</a></li>
                      <li><a className="cursor lastOption text-violet" onClick={handleCreateNewServiceBundle}><span className="mr-2">+</span>Create New {typeOfSearch != null ? typeOfSearch.value == 'bundle' ? "Bundle" : typeOfSearch.value == 'service' ? "Service" : typeOfSearch.value == 'portfolioItem' ? "Portfolio Item" : "" : ""}</a></li>
                    </ul>
                  </div>
                  :
                  <></>}
              </div>
            </Modal.Body>
          </Modal>

          <Modal show={showExplore} onHide={handleCloseExplore} size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body className='p-0'>
              <div className='bg-white border-bottom'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div></div>
                  <div>
                    <a href='#' className='btn border-left'>+ Add</a>
                    <a href='#' className='btn border-left'>Cancel</a>
                  </div>
                </div>
              </div>
              <div className='bg-white p-2'>
                <h5>Available portfolios</h5>
                <h6>Baed on your choosen search criteria following portfolios are available,and you may click on choose to add the portfolio to the solution</h6>
                <div>
                  <div class="contain-slider mt-3">
                    <OwlCarousel items={3} className='owl-theme' loop margin={10} nav>
                      <div class='item'>
                        <a href='#' className='bg-yellow text-white btn'>CV agreement</a>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a>
                      </div>
                      <div class='item'>
                        <a href='#' className='bg-primary  text-white btn'>Repair Service</a>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a>
                      </div>
                      <div class='item'>
                        <a href='#' className='bg-green-light text-white btn'>Maintenence service</a>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a>
                      </div>
                      <div class='item'>
                        <h4 className='text-light'><b>Repair Service</b></h4>
                        <h4 className='text-red mt-3'><b>$20,000</b></h4>
                        <ul className='mt-3' style={{ paddingLeft: '20px' }}>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Cover for all models of the fleet starting from the base model</li>
                          <li className='mt-3' style={{ listStyle: 'disc' }}>Periodic maintenace triggered every 3 months</li>
                        </ul>
                        <a href="#" class="btn bg-primary text-white Choose-btn">Choose</a>
                      </div>

                    </OwlCarousel>

                  </div>
                  <div>
                    <a href='#' className='btn'>I can't find what i need</a>
                  </div>
                </div>
              </div>

            </Modal.Body>
          </Modal>


          <ToastContainer />
        </div>
        {modalComponent}
      </div>
    </>
    )
}

export default SolutionQuote
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
import { Link } from "react-router-dom"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

var tempShow = false

const Actions = () => <><span className="mr-3 btn bg-primary text-white cursor" style={{ width: '50% ' }} onClick={() => tempShow = true}><img className='mr-2' src={PartIcons}></img>Build</span></>;




const data = [
    {
        id: 0,
        caseId: "13322",
        source: "Sales",
        description: "Request for Solution",
        customer: "13322",
        requestedDate: "1",
        progress: "Pending",
        status: "Open",
        consistencyStatus: "Inconsistent",
        attendedBy: "Ashok Mohanty"
    },
    {
        id: 1,
        caseId: "23972",
        source: "Marketing",
        description: "Sales Quote",
        customer: "23972",
        requestedDate: "1",
        progress: "Not relevent",
        status: "Open",
        consistencyStatus: "Consistent",
        attendedBy: "Ashok M"
    },
    {
        id: 2,
        caseId: "23924",
        source: "Salesforce",
        description: "Sales Quote",
        customer: "23924",
        requestedDate: "1",
        progress: "Not relevant",
        status: "Open",
        consistencyStatus: "Inconsistent",
        attendedBy: "Ashok M"
    }
]

const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            // backgroundColor: "#000"
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};


export function WorkList(props) {

    const [openSearchService, setOpenSearchService] = useState(false)
    const [openAddBundleItem, setOpenAddBundleItem] = useState(false)
    const [createNewBundle, setCreateNewBundle] = useState(false)
    const [showExplore, setShowExplore] = useState(false);
    const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("")
    const [typeOfSearchColumn, setTypeOfSearchColumn] = useState(null)
    const [show, setShow] = useState(false);
    const [openSearchSolution, setOpenSearchSolution] = useState(false)
    const [typeOfSearch, setTypeOfSearch] = useState(null)
    const [columnSearchText, setColumnSearchText] = useState('');
    const [columnSearchKeyValue, setColumnSearchKeyValue] = useState([{ label: "Bundle", value: 'bundle' }, { label: "Service", value: 'service' }, { label: "Portfolio Item", value: 'portfolioItem' }])
    const [typeOfSearchColumnKeyValue, setTypeOfSearchColumnKeyValue] = useState([{ label: "Make", value: 'make' }, { label: "Model", value: 'model' }, { label: "Prefix", value: 'prefix' }])


    const columns = [
        {
            name: <><div><img className='mr-2' src={boxicon}></img>Case ID</div></>,
            selector: row => row.caseId,
            sortable: true,
            maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
            cell: row => row.caseId,
        },
        {
            name: <><div><img className='mr-2' src={boxicon}></img>Source</div></>,
            selector: row => row.source,
            sortable: true,
            maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
            cell: row => row.source,
        },
        {
            name: <><div><img className='mr-2' src={boxicon}></img>Description</div></>,
            selector: row => row.description,
            sortable: true,
            maxWidth: '300px', // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
            cell: row => row.description,
        },
        {
            name: <><div>Customer
            </div></>,
            selector: row => row.customer,
            wrap: true,
            sortable: true,
            format: row => row.customer,
        },
        {
            name: <><div>Requested Date
            </div></>,
            selector: row => row.requestedDate,
            wrap: true,
            sortable: true,
            format: row => row.requestedDate,
        },
        {
            name: <><div>Progress
            </div></>,
            selector: row => row.progress,
            wrap: true,
            sortable: true,
            format: row => row.progress,
        },
        {
            name: <><div>Status</div></>,
            selector: row => row.status,
            wrap: true,
            sortable: true,
            format: row => row.status,
        },
        {
            name: <><div>Consistency status</div></>,
            selector: row => row.consistencyStatus,
            wrap: true,
            sortable: true,
            format: row => row.consistencyStatus,
        },
        {
            name: <><div>Attended by</div></>,
            selector: row => row.attendedBy,
            wrap: true,
            sortable: true,
            format: row => row.attendedBy,
        },
        {
            name: 'Actions',
            button: true,
            minWidth: '200px',
            cell: () => <><span className="mr-3 btn bg-primary text-white cursor" style={{ width: '100%' }} onClick={() => setShow(true)}><img className='mr-2' src={PartIcons}></img>Build</span></>,
        },
    ];


    const handleBundleServiceContinue = () => {
        setOpenSearchService(true)
        setShow(false)
    }


    const handleShowSearch = (data) => {
        setOpenSearchSolution(true)
        setShow(!show)
    }


    const handleCloseExplore = () => {
        setShowExplore(false);
    }

    const handleTypeOfSearchChange = (e) => {
        setTypeOfSearch(e)
        if (e == null) {
            setColumnSearchText("")
        }
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
        setOpenSearchSolution(false)
        setShowExplore(true)
    }

    const handleCreateNewServiceBundle = () => {
        setOpenAddBundleItem(true)
        setOpenSearchSolution(false)
        setCreateNewBundle(false)
        setOpenAddBundleItemHeader("Add New Service")

    }

    const handleCantFound = () => {
        setOpenSearchSolution(false)
        setShowExplore(false)
        setShow(true)
    }



    const handleContinueClick = (data) => {
        // if (data) {
        //   setTypeOfSolutionBuild(0)
        //   setOpenSolutionSelector(true)
        //   setOpen(false)
        // } else {
        //   setTypeOfSolutionBuild(1)
        //   setOpenSolutionSelector(false)
        //   setOpen(true)
        //   setTypeOfSolutionSelector(1)
        // }
        // setSolutionBuilderShow(false);
        // setModalComponent(null)
        // setOpenSearchSolution(false)
        // setShowExplore(false)
    }

    const handleTypeOfSearchColumnChange = (e) => {
        setTypeOfSearchColumn(e)
        if (e == null) {
            setColumnSearchText("")
        }
    }



    return (
        <>
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container-fluid mt-3">
                    <div className="custom-table card " style={{ height: 400, width: '100%' }}>
                        <DataTable title="" selectableRows columns={columns} data={data} customStyles={customStyles} pagination />
                    </div>
                    <div className="Add-new-segment-div p-3 border-radius-10">
                        <Link to="/workList/new" className="btn bg-primary text-white">Create Worklist</Link>
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={() => setShow(!show)} size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
                <Modal.Body>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div><h5 class="">Choose what solution you want to build</h5></div>
                        <div onClick={handleShowSearch}>
                            <a href='#' className='btn border-light font-weight-500 bg-light-grey font-size-18'>Explore available solution</a>
                        </div>
                    </div>
                    <div className='card mt-4 p-4'>
                        <div className='row'>
                            <div className='col-md-6 my-3 '>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={Portfoliosicon}></img></div>
                                    <div>
                                        <h5 className='text-light'>Portfolios or Service Programs</h5>
                                        <p><b>You build Portfolios or Service Programs here. </b>
                                            Examples of Portfolios are Premium Maintenance Plan, Value added plan etc. A service program is a marketing or product improvement program.
                                        </p>
                                        <div className=''>
                                            <Link to="/portfolio/summary" className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6 my-3'>
                                <div className='d-flex'>
                                    <div className='mr-2'><img src={contract}></img></div>
                                    <div>
                                        <h5 className='text-light'>Bundles & Services</h5>
                                        <p><b>You build pre-configured repair & maintenance solutions for your customer segment here. </b>
                                            Examples of pre-built template are Level I contracts like subscriptions or Level IV contract for Total Maintenance and Repair.
                                        </p>
                                        <div className=''>
                                            <a onClick={handleBundleServiceContinue} className='btn bg-primary text-white'>Continue <img className='ml-2' src={Buttonarrow}></img></a>
                                        </div>

                                    </div>
                                </div>
                            </div>
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
                                    <li><a className="cursor result" >RESULTS</a></li>
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
            <Modal show={openSearchService} onHide={() => setOpenSearchService(false)} size="xl"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="">
                    Search Service
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
                                    <li><a className="cursor" onClick={() => window.location.href = "/service/new"}>PM125</a></li>
                                    <li><a className="cursor" onClick={() => window.location.href = "/service/new"}>PM2</a></li>
                                    <li><a className="cursor lastOption text-violet" onClick={() => window.location.href = "/service/new"}><span className="mr-2">+</span>Create New {typeOfSearch != null ? typeOfSearch.value == 'bundle' ? "Bundle" : typeOfSearch.value == 'service' ? "Service" : typeOfSearch.value == 'portfolioItem' ? "Portfolio Item" : "" : ""}</a></li>
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
                                <a href='#' onClick={handleCantFound} className='btn'>I can't find what i need</a>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>

        </>
    )
}

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Select from 'react-select';
import { Modal, SplitButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import editIcon from '../../assets/icons/svg/edit.svg'
import { MuiMenuComponent } from "pages/Operational";
import { DataGrid } from '@mui/x-data-grid';
import searchstatusIcon from '../../assets/icons/svg/search-status.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import shareIcon from '../../assets/icons/svg/share.svg'
import folderaddIcon from '../../assets/icons/svg/folder-add.svg'
import uploadIcon from '../../assets/icons/svg/upload.svg'
import cpqIcon from '../../assets/icons/svg/CPQ.svg'
import deleteIcon from '../../assets/icons/svg/delete.svg'
import copyIcon from '../../assets/icons/svg/Copy.svg'
import { Link } from 'react-router-dom'
import { CommanComponents } from "components";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { faFileAlt, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import FormGroup from '@mui/material/FormGroup';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import DataTable from 'react-data-table-component';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FileUploader } from "react-drag-drop-files";

import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, toast } from 'react-toastify';
import boxicon from '../../assets/icons/png/box.png'
import {
  createPortfolio, getPortfolio,
  getPortfolioSchema,
  getMakeKeyValue, getModelKeyValue, getPrefixKeyValue,
  updatePortfolio, getUsageCategoryKeyValue, getTaskTypeKeyValue, getResponseTimeTaskKeyValue, getValidityKeyValue, getStrategyTaskKeyValue, getProductHierarchyKeyValue, getGergraphicKeyValue, getMachineTypeKeyValue, getTypeKeyValue
} from '../../services/index'
import { color } from "@mui/system";

function PartList() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [openAddBundleItem, setOpenAddBundleItem] = useState(false)
  const [value, setValue] = React.useState('1');
  const [openAddBundleItemHeader, setOpenAddBundleItemHeader] = useState("")
  const [openSearchSolution, setOpenSearchSolution] = useState(false)
  const [bundleItems, setBundleItems] = useState([])
  const [createNewBundle, setCreateNewBundle] = useState(false)
  const [bundleItemTaskTypeKeyValue, setBundleItemTaskTypeKeyValue] = useState([])
  const [openCoverage, setOpenCoveragetable] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [open1, setOpen1] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose1 = () => setOpen1(false);
  const activityOptions = [
    'None',
    'Atria',
    'Callisto'
  ];
  const handleAddSolutionPress = () => {
    setOpenSearchSolution(true)
    getPortfolioSchema().then((res) => {
      const options = res.map((d) => ({
        value: d,
        label: d,
      }));
    })
      .catch((err) => {

      })

  }
  const handleMoreAction = (type) => {
    if (type == 1) {
      setOpenAddBundleItem(false)
      setOpenSearchSolution(false)
      setCreateNewBundle(true)
    } else if (type == 2) {
      setOpenAddBundleItem(true)
      setOpenSearchSolution(false)
      setCreateNewBundle(false)
      setOpenAddBundleItemHeader("Add New Service")
    } else if (type == 3) {
      setOpenAddBundleItem(true)
      setOpenSearchSolution(false)
      setCreateNewBundle(false)
      setOpenAddBundleItemHeader("Add New Portfolio Item")
    }
  }
  const data = [
    {
      id: 1,
      caseId: 13322,
      BundleId: "Pc",
      Bundledescription: "Ex2487518",
      S1: "CAT DEO",
      strategy: "3",
      Standardjob: "$43.09",
      repairoption: "$100",
      frequency: "USD",
      quantity: "80%",
      part$: "$80",
      srevic$: "80% usage observed on previous work.",
      Total$: "80% usage observed on previous work.",
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#7380E4",
        color: "#fff"
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  const columns = [

    {
      name: (
        <>
          <div><Checkbox className="text-white" {...label} /></div>
        </>
      ),
      selector: (row) => row.standardJobId,
      wrap: true,
      sortable: true,
      maxWidth: "300px",
      cell: (row) => <Checkbox className="text-black" {...label} />,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Group Number
          </div>

        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Type
          </div>

        </>
      ),
      selector: (row) => row.bundleDescription,
      wrap: true,
      sortable: true,
      format: (row) => row.bundleDescription,
    },
    {
      name: (
        <>
          <div>
            <img className="mr-2" src={boxicon}></img>Part Number
          </div>

        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
    },
    {
      name: (
        <>
          <div>Qty</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
    },
    {
      name: (
        <>
          <div>Unit Price</div>
        </>
      ),
      selector: (row) => row.strategy,
      wrap: true,
      sortable: true,
      format: (row) => row.strategy,
    },
    {
      name: (
        <>
          <div>Extended Price</div>
        </>
      ),
      selector: (row) => row.frequency,
      wrap: true,
      sortable: true,
      format: (row) => row.frequency,
    },
    {
      name: (
        <>
          <div>Currency</div>
        </>
      ),
      selector: (row) => row.frequency,
      wrap: true,
      sortable: true,
      format: (row) => row.frequency,
    },
    {
      name: (
        <>
          <div>% Usage</div>
        </>
      ),
      selector: (row) => row.quantity,
      wrap: true,
      sortable: true,
      format: (row) => row.quantity,
    },
    {
      name: (
        <>
          <div>Total Price</div>
        </>
      ),
      selector: (row) => row.part,
      wrap: true,
      sortable: true,
      format: (row) => row.part,
    },
    {
      name: (
        <>
          <div>
            Comments
          </div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      // cell: row => row.bundleId,
      // cell: (row) => <button onClick={() => alert()}>1</button>,
      // cell: (row) => <Checkbox className="text-black" {...label} />,
      format: (row) => row.bundleId,
    },
    {
      name: (
        <>
          <div>
            Action
          </div>
        </>
      ),
      selector: (row) => row.bundleId,
      sortable: true,
      maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
      // cell: row => row.bundleId,
      // cell: (row) => <button onClick={() => alert()}>1</button>,
      // cell: (row) => <Checkbox className="text-black" {...label} />,
      cell: (row) => <a onClick={() => setOpen2(true)} href="#"><FontAwesomeIcon icon={faPen} /></a>,
      format: (row) => row.bundleId,
    },
  ];

  const options = [
    { value: 'chocolate', label: 'Construction-Heavy' },
    { value: 'strawberry', label: 'Construction-Low' },
    { value: 'vanilla', label: 'Construction-Medium' },
    { value: 'Construction', label: 'Construction' },
  ];

  return (
    <>
      {/* <CommanComponents /> */}
      <div className="content-body" style={{ minHeight: '884px' }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Part Lists</h5>
            <div className="d-flex justify-content-center align-items-center">
              {/* <Link to="#" className="btn-sm bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add New
          </Link> */}
              {/* <a href="#" className="ml-3 font-size-14" title="Share"><img src={shareIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Items to Review"><img src={folderaddIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Upload"><img src={uploadIcon}></img></a> */}
              {/* <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}></img></a> */}
              {/* <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
            <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
            <a href="#" className="ml-2"><MuiMenuComponent options={activityOptions}/></a> */}
            </div>
          </div>
          <div className="card p-4 mt-5">
            <h5 className="d-flex align-items-center mb-0">
              <div className="" style={{ display: 'contents' }}><span className="mr-3">Header</span><a href="#" className="btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-bookmark-o" aria-hidden="true"></i></a> <a href="#" className="btn-sm"><i class="fa fa-folder-o" aria-hidden="true"></i></a></div>
              <div className="hr"></div>
            </h5>
            <div className="row mt-5">
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">JOB CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">JOB DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COMPONENT CODE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">COMPONENT DESCRIPTION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">REFERENCE</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500" for="exampleInputEmail1">OPERATION</label>
                  <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                </div>
              </div>


            </div>
            <div className="row mt-3">
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">SEGMENT</p>
                  <h6 class="font-weight-600">01</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">JOB CODE</p>
                  <h6 class="font-weight-600">15</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">TITLE</p>
                  <h6 class="font-weight-600">Disassemble</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">COMP CODE</p>
                  <h6 class="font-weight-600">3000</h6>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <p class="font-size-12 font-weight-500 mb-2">DESCRIPTION</p>
                  <h6 class="font-weight-600">Transmission</h6>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card mt-5">
                        <div className="fileheader p-4 border-bottom d-flex justify-content-between align-items-center custom-portfolio-dropdown">
                            <h6 className="font-weight-600 text-light mb-0">Table Name<span> <a onClick={() => setOpen2(true)} href="#" className="ml-3 font-size-14"><FontAwesomeIcon icon={faPen} /></a></span></h6>
                            <h6 className="font-weight-600 text-light mb-0 cursor" onClick={handleShowAddSolution}><span className="mr-2">+</span>Add Solution</h6>
                            <div className="d-flex align-items-center">
                                <h6 className="font-weight-600 text-light mb-0 cursor" onClick={handleAddSolutionPress}><span className="mr-2">+</span>Add Solution</h6>
                                <Dropdown as={ButtonGroup}>
                                    
                                    <Dropdown.Toggle split variant="" id="dropdown-split-basic" className="dropdownBtnCustom"><MoreVertIcon /></Dropdown.Toggle>
                                    <Dropdown.Menu className="">
                                        <Dropdown.Item className="cursor" onClick={() => handleMoreAction(1)}>Create Bundle</Dropdown.Item>
                                        <Dropdown.Item className="cursor" onClick={() => handleMoreAction(2)}>Create Service</Dropdown.Item>
                                        <Dropdown.Item className="cursor" onClick={() => handleMoreAction(3)}>Create Item</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <MuiMenuComponent onClick={(event) => handleMenuItemClick(event)} options={portfolioBodyMoreActions} />
                        </div>
                        {bundleItems.length > 0 ?
                            <div>
                               
                                <div className="custom-table  card " style={{ height: 400, width: '100%' }}>
                                    <DataTable title="" columns={columns} data={bundleItems} customStyles={customStyles} pagination />
                                </div>
                            </div>
                            :
                            <div className="p-4  row">
                                <div className="col-md-6 col-sm-6" >
                                    <a href="#" className="add-new-recod">
                                        <div>
                                            <FontAwesomeIcon icon={faPlus} />
                                            <p className="font-weight-600">Add Protfolio Item</p>
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
                        }


                    </div> */}
          <div className="card border mt-4">
            <div className="d-flex align-items-center justify-content-between px-3 py-4 pl-3">
              <div className="">
                <div className="d-flex ">
                  <h5 className=" mb-0"><span>Parts Table</span></h5>
                  <p className=" mb-0">


                    {/* <a onClick={() => setOpen1(true)} className="ml-3 "><img src={editIcon}></img></a> */}
                    <a href="#" className="ml-3"><FontAwesomeIcon icon={faPen} /></a>
                    {/* <a href="#" className="ml-3 "><img src={shareIcon}></img></a> */}
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center ">
                <div className=" text-center  ">
                  <a onClick={() => setOpen(true)} style={{ cursor: 'pointer' }} className="btn-sm bg-primary text-white ml-3">Upload</a>
                  <a onClick={() => setOpen2(true)} href="#" className="btn-sm bg-primary text-white ml-3">+ Add Part</a>
                </div>
              </div>
            </div>
            <DataTable
              className="mr-2"
              title=""
              columns={columns}
              data={data}
              customStyles={customStyles}
              pagination
            />
            <div className="m-3 text-right">
              <a href="#" className="btn text-white bg-primary">Save</a>
            </div>

          </div>
          <Modal show={open2} onHide={handleClose2} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header >
              <Modal.Title>1000-Engine|23-Replace Engine|Replace Engine</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 bg-white">
              <div className="ligt-greey-bg p-3">
                <div>
                  <span className="mr-3">
                    <i class="fa fa-pencil font-size-12" aria-hidden="true"></i><span className="ml-2">Edit</span>
                  </span>
                  <span className="mr-3">
                    < MonetizationOnOutlinedIcon className=" font-size-16" />
                    <span className="ml-2"> Adjust price</span>
                  </span>
                  <span className="mr-3">
                    <FormatListBulletedOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related part list(s)</span>
                  </span>
                  <span className="mr-3">
                    <AccessAlarmOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Related service estimate(s)</span>
                  </span>
                  <span>
                    <SellOutlinedIcon className=" font-size-16" />
                    <span className="ml-2">Split price</span>
                  </span>
                </div>
              </div>
              <div>
                <div className="p-3">
                  <div className="row mt-4">
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">GROUP NUMBER</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="1000 ENGINE" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TYPE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="0123 REPLACE" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">PART NUMBER</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Replace left side of the Engine" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">QTY</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="List Price" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">UNIT PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$35000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">EXTENDED PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$10000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">CURRENCY</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$5000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">% USAGE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="EA" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">TOTAL PRICE</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="$480000" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">COMMENTS</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE" />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <div class="form-group w-100">
                        <label className="text-light-dark font-size-12 font-weight-500" for="exampleInputEmail1">DESCRIPTION</label>
                        <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="PAYER TYPE" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="m-3 text-right">
                  <a href="#" onClick={handleClose2} className="btn border mr-3 "> Cancel</a>
                  <a href="#" className="btn text-white bg-primary">Save</a>
                </div>
              </div>
            </Modal.Body>


          </Modal>

          <Modal show={open} onHide={handleClose} size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
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

          {/* comment below Code on 12/08/22 */}
          {/* <div className="card p-4 mt-5">
            comment this
            <h5 className="d-flex align-items-center  mb-3">
              <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space">Part List</span></div>
              <div className="hr"></div>
            </h5>
            comment end
            <div className="d-flex align-items-center justify-content-between m-2">
              <h5 className="font-weight-600 mb-0">Part Lists</h5>
              <div className="d-flex justify-content-center align-items-center">
                <Link to="#" className="btn-sm bg-primary text-white">
                  <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add New
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14"><img src={cpqIcon}>comment this</img></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border">
                  <div className="d-flex align-items-center justify-content-between mb-0 p-3">
                    <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-16 text-black">023-Remove Engine-Engine partlist</span></div>
                    <div className="d-flex">
                      <div>
                        <Checkbox className="p-0" {...label} />
                      </div>
                      <a href="#"><ShareOutlinedIcon className="ml-3 font-size-21" titleAccess="Share" /></a>
                      <a href="#"><CreateNewFolderOutlinedIcon className="ml-3 font-size-21" titleAccess="Item to Review" /></a>
                      <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                      <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                      <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                      <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                      <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between mb-0">
                      <div className="" style={{ display: 'contents' }}><span className="mr-3 white-space font-size-12 text-black">Version 1</span></div>
                      <div className="d-flex">
                        <div>
                          <Checkbox className="p-0" {...label} />
                        </div>
                        <a href="#"><FileUploadOutlinedIcon className="ml-3 font-size-21" titleAccess="Upload" /></a>
                        <a href="#"><ThumbUpOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#"><ThumbDownOffAltOutlinedIcon className="ml-3 font-size-21" /></a>
                        <a href="#" className="ml-3 font-size-14" title="Delete"><img src={deleteIcon}></img></a>
                        <a href="#" className="ml-3 font-size-14" title="Copy"><img src={copyIcon}></img></a>
                        <a href="#" className="ml-2"><MoreVertOutlinedIcon /></a>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL PARTS</p>
                          <h6 class="font-weight-600">New(8)/ Refurbished (6)</h6>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group">
                          <p class="font-size-12 font-weight-500 mb-2">TOTAL COSTS</p>
                          <h6 class="font-weight-600">$38</h6>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <p class="font-size-12 font-weight-500 mb-2">STATUS</p>
                      <h6 class="font-weight-600">6/8</h6>
                      <div class="progress">
                        <div class="progress-bar" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div>
                      <a href="#" class="text-violet">Go to Version <span><ArrowRightAltIcon /></span></a>

                    </div>
                  </div>
                  <div className="bg-light-grey p-3">
                    <a href="#" class="text-violet">Go to Service Estimates <span><ArrowRightAltIcon /></span></a>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Add-new-segment-div p-3 border-radius-10">
            <Link to="/RepairServiceEstimate" className="btn bg-primary text-white">
              <span className="mr-2"><FontAwesomeIcon icon={faPlus} /></span>Add Service Estimates
            </Link>

          </div> */}
        </div>
      </div>
    </>
  )
}


export default PartList
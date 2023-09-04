import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { Modal } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";

import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";

import shareIcon from "../../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../../assets/icons/svg/upload.svg";
import cpqIcon from "../../../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../../assets/icons/svg/Copy.svg";
import editIcon from "../../../../assets/icons/svg/edit.svg";
import searchstatusIcon from "../../../../assets/icons/svg/search-status.svg";
import boxicon from "../../../../assets/icons/png/box.png";
import deleticon from "../../../../assets/images/delete.png";
import link1Icon from "../../../../assets/images/link1.png";
import penIcon from "../../../../assets/images/pen.png";

import { MuiMenuComponent } from "../../../Operational/index";
import PortfolioItemTabsModal from './PortfolioItemTabsModal';

const fileTypes = ["JPG", "PNG", "GIF"];

const menuComponentOptions = ["Create Versions", "Show Errors", "Review"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const coverageRowData = [
    {
        id: 1,
        GroupNumber: "Snow",
        Type: "Jon",
        Partnumber: 35,
        PriceExtended: "pending",
        Pricecurrency: "Open",
        Usage: "Inconsistent",
        TotalPrice: "Inconsistent",
        Comments: "Inconsistent",
        Actions: "Inconsistent",
    },
    {
        id: 2,
        GroupNumber: "Lannister",
        Type: "Cersei",
        Partnumber: 42,
        PriceExtended: "pending",
        Pricecurrency: "Open",
        Usage: "Consistent",
        TotalPrice: "Inconsistent",
        Comments: "Inconsistent",
        Actions: "Inconsistent",
    },
    {
        id: 3,
        GroupNumber: "Lannister",
        Type: "Jaime",
        Partnumber: 45,
        PriceExtended: "pending",
        Pricecurrency: "Open",
        Usage: "Consistent",
        TotalPrice: "Inconsistent",
        Comments: "Inconsistent",
        Actions: "Inconsistent",
    },
];

const coverageColumns = [
    {
        name: (
            <>
                <div>
                    <Checkbox className="text-white" {...label} />
                </div>
            </>
        ),
        selector: (row) => row.standardJobId,
        wrap: true,
        sortable: true,
        maxWidth: "300px",
        cell: (row) => <Checkbox className="text-black" />,
    },
    {
        name: (
            <>
                <div>Make</div>
            </>
        ),
        selector: (row) => row.make,
        wrap: true,
        sortable: true,
        format: (row) => row.make,
    },
    {
        name: (
            <>
                <div>Family</div>
            </>
        ),
        selector: (row) => row.family,
        wrap: true,
        sortable: true,
        format: (row) => row.family,
    },
    {
        name: (
            <>
                <div>Model</div>
            </>
        ),
        selector: (row) => row.modelDescription,
        wrap: true,
        sortable: true,
        format: (row) => row.modelDescription,
    },
    {
        name: (
            <>
                <div>Prefix</div>
            </>
        ),
        selector: (row) => row.prefix,
        wrap: true,
        sortable: true,
        format: (row) => row.prefix,
    },
    {
        name: (
            <>
                <div>Serial No</div>
            </>
        ),
        selector: (row) => row.bundleId,
        sortable: true,
        maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        format: (row) => row.bundleId,
    },
    {
        name: (
            <>
                <div>
                    <img className="mr-2" src={boxicon}></img>Start Serial No
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
                <div>End Serial No</div>
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
                <div>Action</div>
            </>
        ),
        selector: (row) => row.action,
        wrap: true,
        sortable: true,
        format: (row) => row.action,
        cell: (row) => (
            <div>
                <img className="mr-2" src={penIcon} />
                <img className="mr-2" src={deleticon} />
                <img src={link1Icon} />
            </div>
        ),
    },
];
const PortfolioItemsList = ({ componentDataTabShow }) => {

    const [showDragAndDropModal, setShowDragAndDropModal] = useState(false)
    const [uploadFileImage, setUploadFileImage] = useState("general");
    const [showCoverageModal, setShowCoverageModal] = useState(false)
    const [machineAge, setMachineAge] = useState("5");

    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const handleDragAndDropModal = () => {
        setShowDragAndDropModal(!showDragAndDropModal)
    }

    const handleImageFileUpload = (e, value) => {
        setUploadFileImage(value)
    }

    const handleShowCoverageModal = () => {
        setShowCoverageModal(!showCoverageModal)
    }

    const handleMachineAgeChange = (e) => {
        setMachineAge(e.target.value);
    }

    const dragAndDropFileModal = () => {
        return (
            <Modal show={showDragAndDropModal} onHide={handleDragAndDropModal} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Import Files</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="p-3">
                        <div className="add-new-recod">
                            <div>
                                <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                <h6 className="font-weight-500 mt-3">
                                    Drag and drop files to upload <br /> or
                                </h6>
                                <FileUploader name="file" types={fileTypes} handleChange={handleImageFileUpload} />
                            </div>
                        </div>
                        <p className="mt-3">
                            Single upload file should not be more than 10MB. Only the .lgs,
                            .lgsx file types are allowed
                        </p>
                    </div>
                </Modal.Body>
                <div className="row m-0 p-3">
                    <div className="col-md-6 col-sm-6">
                        <button className="btn border w-100 bg-white" onClick={handleDragAndDropModal}>Cancel</button>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <button className="btn btn-primary w-100 cursor" onClick={handleShowCoverageModal}>
                            <FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} /> Upload
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }


    const viewCoverageModal = () => {
        return (
            <Modal show={showCoverageModal} onHide={handleShowCoverageModal} size="lg" centered>
                <Modal.Body className="">
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <h5 className="font-weight-600 mb-0">Coverage</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <a className="ml-3 font-size-14 cursor"> <img src={shareIcon} /></a>
                            <a className="ml-3 font-size-14 cursor"> <img src={folderaddIcon} /> </a>
                            <a className="ml-3 font-size-14 cursor"><img src={uploadIcon} /></a>
                            <a className="ml-3 font-size-14 cursor"><img src={cpqIcon} /></a>
                            <a className="ml-3 font-size-14 cursor"><img src={deleteIcon} /></a>
                            <a className="ml-3 font-size-14 cursor"><img src={copyIcon} /></a>
                            <a className="ml-2 cursor"><MuiMenuComponent options={menuComponentOptions} /></a>
                        </div>
                    </div>
                    <div className="card px-4 pb-4 mt-5 pt-0">
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div className="d-flex ">
                                    <h5 className=" mb-0"><span>Coverage123</span></h5>
                                    <p className=" mb-0">
                                        <a className="ml-3 cursor"><img src={editIcon} /></a>
                                        <a className="ml-3 cursor"><img src={shareIcon} /></a>
                                    </p>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="d-flex align-items-center" style={{ background: "#F9F9F9", padding: "10px 15px", borderRadius: "10px", }}>
                                    <div className="search-icon mr-2" style={{ lineHeight: "24px" }}>
                                        <img src={searchstatusIcon} />
                                    </div>
                                    <div className="w-100 mx-2">
                                        <div className="machine-drop d-flex align-items-center">
                                            <div><label className="label-div">Machine</label></div>
                                            <FormControl className="" sx={{ m: 1 }}>
                                                <Select id="demo-simple-select-autowidth" value={machineAge} autoWidth onChange={handleMachineAgeChange} >
                                                    <MenuItem value="5"><em>Engine</em></MenuItem>
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
                                        <a className="p-1 more-btn cursor">
                                            + 3 more
                                            <span className="c-btn">C</span>
                                            <span className="b-btn">B</span>
                                            <span className="a-btn">A</span>
                                        </a>
                                    </div>
                                    <div className="col-5 text-center border-left py-4">
                                        <a className="cursor"> + Add Part</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
                            <DataGrid
                                sx={{ "& .MuiDataGrid-columnHeaders": { backgroundColor: "#872ff7", color: "#fff", }, }}
                                rows={coverageRowData}
                                columns={coverageColumns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <>
            <div className="card mt-4 px-4">
                <div className="row align-items-center mt-3">
                    <div className="col-11 mx-1">
                        <div className="d-flex align-items-center w-100">
                            <div className="d-flex mr-3" style={{ whiteSpace: "pre" }}>
                                <h5 className="mb-2 text-black">
                                    <span>Portfolio Items</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4  row">
                    <div className="col-md-6 col-sm-6" onClick={() => setShowAddItemModal(true)}
                    // onClick={handleNewBundleItem}
                    >
                        <Link className="add-new-recod cursor">
                            <div>
                                <FontAwesomeIcon icon={faPlus} />
                                <p className="font-weight-600">Add Portfolio Item</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="add-new-recod">
                            <div>
                                <FontAwesomeIcon className="cloudupload" icon={faCloudUploadAlt} />
                                <h6 className="font-weight-500 mt-3"> Drag and drop files to upload <br /> or </h6>
                                <a className="btn text-light border-light font-weight-500 border-radius-10 mt-3 cursor" onClick={handleDragAndDropModal}>
                                    <span className="mr-2"> <FontAwesomeIcon icon={faPlus} /></span>
                                    Select files to upload
                                </a>
                                <p className="mt-3">
                                    Single upload file should not be more than <br />
                                    10MB. Only the .lgs, .lgsx file types are allowed
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {dragAndDropFileModal()}
            {viewCoverageModal()}
            {showAddItemModal && <PortfolioItemTabsModal
                show={showAddItemModal}
                hideModal={() => setShowAddItemModal(false)}
                componentDataTabShow={componentDataTabShow}
            />}
        </>
    )
}

export default PortfolioItemsList
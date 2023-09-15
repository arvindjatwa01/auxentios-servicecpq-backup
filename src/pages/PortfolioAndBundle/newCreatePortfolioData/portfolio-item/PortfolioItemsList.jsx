import React, { useEffect, useState } from 'react'
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

import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import { TabList, TabPanel } from '@mui/lab';

import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import DataTable from 'react-data-table-component';
import Select from "react-select";

import SearchBox from "../../../Repair/components/SearchBox";
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
import PortfolioCoverageSearch from '../PortfolioCoverageSearch';
import ItemAddEdit from './ItemAddEdit';

import {
    selectUpdateTaskList,
    selectStrategyTaskOption,
    selectCategoryList,
    selectUpdateList,
    taskActions,
} from "../../customerSegment/strategySlice"

import {
    getPortfolioAndSolutionCommonConfig
} from "../../../../services/index"
import { isEmpty } from '../utilities/textUtilities';
import ItemPriceCalculator from './ItemPriceCalculator';
import { useDispatch } from 'react-redux';
import ExpendBundleServiceItem from './ExpendBundleServiceItem';

import { dataTableCustomStyle } from "../itemConstant"

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
        name: <div> <Checkbox className="text-white" {...label} /></div>,
        selector: (row) => row.standardJobId,
        wrap: true,
        sortable: true,
        maxWidth: "300px",
        cell: (row) => <Checkbox className="text-black" />,
    },
    {
        name: <div>Make</div>,
        selector: (row) => row.make,
        wrap: true,
        sortable: true,
        format: (row) => row.make,
    },
    {
        name: <div>Family</div>,
        selector: (row) => row.family,
        wrap: true,
        sortable: true,
        format: (row) => row.family,
    },
    {
        name: <div>Model</div>,
        selector: (row) => row.modelDescription,
        wrap: true,
        sortable: true,
        format: (row) => row.modelDescription,
    },
    {
        name: <div>Prefix</div>,
        selector: (row) => row.prefix,
        wrap: true,
        sortable: true,
        format: (row) => row.prefix,
    },
    {
        name: <div>Serial No</div>,
        selector: (row) => row.bundleId,
        sortable: true,
        maxWidth: "300px", // when using custom you should use width or maxWidth, otherwise, the table will default to flex grow behavior
        format: (row) => row.bundleId,
    },
    {
        name: <div><img className="mr-2" src={boxicon} />Start Serial No</div>,
        selector: (row) => row.bundleDescription,
        wrap: true,
        sortable: true,
        format: (row) => row.bundleDescription,
    },
    {
        name: <div>End Serial No</div>,
        selector: (row) => row.strategy,
        wrap: true,
        sortable: true,
        format: (row) => row.strategy,
    },
    {
        name: <div>Action</div>,
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

const bundleServiceItemsColumns = [
    {
        id: "itemName",
        name: "Name",
        selector: (row) => row.itemName,
        sortable: false,
        wrap: true,
    },
    {
        id: "itemDescription",
        name: "Description",
        selector: (row) => row.itemDescription,
        sortable: false,
        wrap: true,
    },
    {
        id: "itemHeaderStrategy",
        name: "Strategy",
        selector: (row) => row.itemHeaderStrategy,
        sortable: false,
        wrap: true,
    },
    {
        id: "taskType",
        name: "Task Type",
        selector: (row) => row.taskType,
        sortable: false,
        wrap: true,
    },
    {
        id: "quantity",
        name: "Quantity",
        selector: (row) => isEmpty(row.quantity) ? 1 : row.quantity,
        sortable: false,
        wrap: true,
    },
    {
        id: "recommendedValue",
        name: "Recommended Value",
        selector: (row) => row.recommendedValue,
        sortable: false,
        wrap: true,
    },
    {
        id: "templateKitId",
        name: "Template/Kit ID",
        selector: (row) => !isEmpty(row?.standardJobId) ? row?.standardJobId : !isEmpty(row?.repairKitId) ? row?.repairKitId : "NA",
        sortable: false,
        wrap: true,
    },
];

const PortfolioItemsList = ({ componentDataTabShow }) => {
    const dispatch = useDispatch();
    const [showDragAndDropModal, setShowDragAndDropModal] = useState(false)
    const [uploadFileImage, setUploadFileImage] = useState("general");
    const [showCoverageModal, setShowCoverageModal] = useState(false)
    const [machineAge, setMachineAge] = useState("5");

    const [showAddItemModal, setShowAddItemModal] = useState(false)

    const [activeTab, setActiveTab] = useState(1);
    const [bundleServiceNeed, setBundleServiceNeed] = useState(true);

    const [frequencyKeyValuePairs, setFrequencyKeyValuePairs] = useState([])
    const [unitKeyValuePairs, setUnitKeyValuePairs] = useState([])
    const [searchBundleServiceItem, setSearchBundleServiceItem] = useState([])
    const [selectedSearchedItems, setSelectedSearchedItems] = useState([])
    const [bundleServiceItemsList, setBundleServiceItemsList] = useState([])

    const [itemRequestObj, setItemRequestObj] = useState({
        itemId: 0,
        itemName: "",
    })
    const [itemHeaderModelObj, setItemHeaderModelObj] = useState({
        itemHeaderId: 0,
        itemHeaderDescription: "",
        bundleFlag: "",
        withBundleService: true,
        portfolioItemIds: [],
        reference: "",
        itemHeaderMake: "",
        itemHeaderFamily: "",
        model: "",
        prefix: "",
        type: "",
        additional: "",
        currency: "",
        netPrice: 0,
        itemProductHierarchy: "",
        itemHeaderGeographic: "",
        responseTime: "",
        usage: "",
        validFrom: "",
        validTo: "",
        estimatedTime: "",
        servicePrice: 0,
        status: "",
        componentCode: "",
        componentDescription: "",
        serialNumber: "",
        itemHeaderStrategy: "",
        variant: "",
        itemHeaderCustomerSegment: "",
        jobCode: "",
        preparedBy: "",
        approvedBy: "",
        preparedOn: "",
        revisedBy: "",
        revisedOn: "",
        salesOffice: "",
        offerValidity: "",
        serviceChargable: true,
        serviceOptional: true
    })

    const [itemBodyModelObj, setItemBodyModelObj] = useState({
        itemBodyId: 0,
        itemBodyDescription: "",
        spareParts: "",
        labours: "",
        miscellaneous: "",
        taskType: "",
        solutionCode: "",
        usageIn: "",
        usage: "",
        year: "",
        avgUsage: 0,
        itemPrices: []
    })


    useEffect(() => {
        // get frequency key-value pair
        getPortfolioAndSolutionCommonConfig("frequency")
            .then((res) => {
                if (res.status === 200) {
                    const options = []
                    res.data.map((d) => {
                        if (d.key !== "EMPTY") {
                            options.push({ value: d.key, label: d.value, })
                        }
                    });
                    setFrequencyKeyValuePairs(options);
                }
            })
            .catch((err) => {
                return;
            });

        // get unit key-value pairs
        getPortfolioAndSolutionCommonConfig("unit")
            .then((res) => {
                if (res.status === 200) {
                    const options = []
                    res.data.map((d) => {
                        if ((d.key !== "EMPTY") && (d.key !== "MONTH")) {
                            options.push({ value: d.key, label: d.value, })
                        }
                    });
                    setUnitKeyValuePairs(options);
                }
            })
            .catch((err) => {
                return;
            });
    }, [])

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

    // Hide Portfolio Item Tabs Model
    const hideItemAddUpdateModel = () => {
        setShowAddItemModal(false)
        setBundleServiceNeed(true)
        setActiveTab(1);
    }

    // handle Item Input Text change
    const handlePortfolioItemTextChange = (e, keyName = false) => {

    }

    // Search Items
    const handleAddSearchItems = (items) => {
        setSearchBundleServiceItem(items);
    }

    const addSelectedSearchedItems = () => {
        let _portfolioItemsArr = []
        const _bundleServiceItemsList = [...bundleServiceItemsList];
        selectedSearchedItems.map((itemRow, i) => {
            const exist = bundleServiceItemsList.some(item => item.itemId === itemRow.itemId)
            if (!exist) {
                _portfolioItemsArr.push({ itemId: itemRow.itemId })
                _bundleServiceItemsList.push(itemRow)
            }
        })
        setBundleServiceItemsList(_bundleServiceItemsList);
        handleAddSearchItems([])
    }

    // handle Item Create/Update
    const handlePortfolioItemAddUpdate = async (itemRequestObj, itemPriceDataId, isPortfolioItem) => {

    }

    // get Portfolio Item Data
    const handleGetPortfolioItemsData = async (isViewModeOn, itemRequestObj, itemPriceDataId, isPortfolioItem) => {
        try {
            if (isPortfolioItem) {
                if (isViewModeOn) {
                    handlePortfolioItemAddUpdate(itemRequestObj, itemPriceDataId, isPortfolioItem)
                    setActiveTab(bundleServiceNeed ? 2 : componentDataTabShow ? 3 : 4)
                } else {
                    setActiveTab(bundleServiceNeed ? 2 : componentDataTabShow ? 3 : 4)
                }
            }
        } catch (error) {
            return;
        }
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

    const viewPortfolioItemTabsModel = () => {
        return (
            <Modal show={showAddItemModal} onHide={hideItemAddUpdateModel} size="xl">
                <Modal.Body>
                    <Box sx={{ typography: "body1" }}>
                        <TabContext value={activeTab}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <TabList className="custom-tabs-div"
                                    onChange={(e, tabIndex) => setActiveTab(tabIndex)}
                                // onChange={(e, newValue) => { portfolioItemDataEditable && setTabs(newValue) }}
                                >
                                    <Tab label="Portfolio Item" value={1} />
                                    <Tab label="Service/Bundle" value={2} disabled={!bundleServiceNeed} />
                                    {componentDataTabShow && <Tab label="Component Data" value={3} />}
                                    <Tab label="Price Calculator" value={4} />
                                    <Tab label="Review" value={5} />
                                </TabList>
                            </Box>
                            <TabPanel value={1}>
                                <ItemAddEdit
                                    itemType="portfolioItem"
                                    isEditable={false}
                                    isPortfolioItem={true}
                                    bundleServiceNeed={bundleServiceNeed}
                                    componentDataTabShow={componentDataTabShow}
                                    handleBundleServiceNeed={() => setBundleServiceNeed(!bundleServiceNeed)}
                                    frequencyKeyValuePairs={frequencyKeyValuePairs}
                                    unitKeyValuePairs={unitKeyValuePairs}
                                    handleGetPortfolioItemsData={handleGetPortfolioItemsData}
                                    itemHeaderModelObj={itemHeaderModelObj}
                                    itemBodyModelObj={itemBodyModelObj}
                                    itemRequestObj={itemRequestObj}
                                />
                            </TabPanel>
                            <TabPanel value={2}>
                                <PortfolioCoverageSearch
                                    searchFlag="bundleSearch"
                                    handleAddSearchItem={handleAddSearchItems}
                                />
                                {searchBundleServiceItem.length !== 0 && <>
                                    <DataTable
                                        columns={bundleServiceItemsColumns}
                                        data={searchBundleServiceItem}
                                        customStyles={dataTableCustomStyle}
                                        selectableRows
                                        selectableRowsHighlight
                                        onSelectedRowsChange={(rows) => setSelectedSearchedItems(rows.selectedRows)}
                                        pagination
                                    />
                                    <div className="row mb-3 justify-content-end">
                                        <div className="d-flex">
                                            <button type="button" className="btn bg-primary text-white mr-3" onClick={() => handleAddSearchItems([])}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn bg-primary text-white" disabled={selectedSearchedItems.length === 0} onClick={addSelectedSearchedItems}>
                                                + Add Selected
                                            </button>
                                        </div>
                                    </div>
                                </>
                                }
                                {bundleServiceItemsList.length !== 0 && <>
                                    <DataTable
                                        columns={bundleServiceItemsColumns}
                                        data={bundleServiceItemsList}
                                        customStyles={dataTableCustomStyle}
                                        pagination
                                        expandableRows
                                        expandableRowsComponent={(row) => (
                                            <ExpendBundleServiceItem
                                                bundleServiceRowData={row.data}
                                                frequencyKeyValuePairs={frequencyKeyValuePairs}
                                                unitKeyValuePairs={unitKeyValuePairs}
                                            />
                                        )}
                                        expandOnRowClicked
                                    />
                                    <div className="row mt-5" style={{ justifyContent: "right" }}>
                                        <button type="button" className="btn bg-primary text-white"
                                        // onClick={handleContinueOfAddedServiceOrBundle}
                                        >Save & Continue</button>
                                    </div>
                                </>}
                            </TabPanel>
                            <TabPanel value={3}>
                                <>
                                    <div className="ligt-greey-bg p-3 mb-5">
                                        <div>
                                            <span className="mr-3 cursor">
                                                <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                                                <span className="ml-2">Edit</span>
                                            </span>
                                            <span className="mr-3">
                                                <SellOutlinedIcon className=" font-size-16" />
                                                <span className="ml-2">Related repair option</span>
                                            </span>
                                            <span className="mr-3">
                                                <FormatListBulletedOutlinedIcon className=" font-size-16" />
                                                <span className="ml-2">Related Standard Job</span>
                                            </span>
                                            <span className="mr-3">
                                                <AccessAlarmOutlinedIcon className=" font-size-16" />
                                                <span className="ml-2">Related Kit</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row input-fields">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500"> Component Code</label>
                                                <div className="customselectsearch">
                                                    <input className="form-control border-radius-10 text-primary" type="text"
                                                        name="componentCode" autoComplete="off"
                                                    // value={componentData.componentCode}
                                                    // onChange={handleComponentChange}
                                                    />
                                                    {/* {<ul className={`list-group customselectsearch-list scrollbar scrolbarCode style`}>
                                                    {componentData.codeSuggestions.map(
                                                        (currentItem, j) => (
                                                            <li className="list-group-item" key={j} onClick={(e) => handleComponentCodeSuggetionsClick(e, j)}
                                                            >
                                                                {currentItem.componentCode}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>} */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-14 font-weight-500">Component Description</label>
                                                <input className="form-control border-radius-10 text-primary" type="text" name="description"
                                                    placeholder="Optional" disabled
                                                // value={componentData.description}
                                                // onChange={handleComponentChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">Make</label>
                                                <input className="form-control border-radius-10 text-primary" type="text" placeholder="Auto Filled"
                                                    id="make-id" name="make" disabled
                                                // value={componentData.make}
                                                // onChange={handleMachineDataChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">MODEL</label>
                                                <SearchBox
                                                // value={componentData.model}
                                                // onChange={(e) =>
                                                //     handleMachineSearch(
                                                //         "model",
                                                //         e.target.value
                                                //     )
                                                // }
                                                // type="model"
                                                // result={searchModelResults}
                                                // onSelect={handleModelSelect}
                                                // noOptions={noOptionsModel}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">SERIAL #</label>
                                                <SearchBox
                                                // value={componentData.serialNo}
                                                // onChange={(e) =>
                                                //     handleMachineSearch(
                                                //         "serialNo",
                                                //         e.target.value
                                                //     )
                                                // }
                                                // type="equipmentNumber"
                                                // result={searchSerialResults}
                                                // onSelect={handleModelSelect}
                                                // noOptions={noOptionsSerial}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 input-fields">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500"> PRICE METHOD</label>
                                                <Select
                                                    // options={priceMethodKeyValue}
                                                    className="text-primary"
                                                    // value={priceCalculator.priceMethod}
                                                    // name="priceMethod"
                                                    // onChange={(e) =>
                                                    //     setPriceCalculator({ ...priceCalculator, priceMethod: e })
                                                    // }
                                                    placeholder="placeholder (Optional)"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group date-box">
                                                <label className="text-light-dark font-size-12 font-weight-500">ADDITIONAL</label>
                                                <div className=" d-flex form-control-date">
                                                    <div className="">
                                                        <Select
                                                            // isClearable={true}
                                                            // className="text-primary"
                                                            // value={priceCalculator.priceAdditionalSelect}
                                                            // name="priceAdditionalSelect"
                                                            // onChange={(e) =>
                                                            //     setPriceCalculator({
                                                            //         ...priceCalculator,
                                                            //         priceAdditionalSelect: e,
                                                            //     })
                                                            // }
                                                            // options={additionalPriceHeadTypeKeyValue}
                                                            placeholder="Select"
                                                        />
                                                    </div>
                                                    <input type="text" className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                                    // placeholder="10%"
                                                    // defaultValue={props?.priceCalculator?.priceAdditionalInput}
                                                    // value={priceCalculator.priceAdditionalInput}
                                                    // name="priceAdditionalInput"
                                                    // onChange={(e) =>
                                                    //     setPriceCalculator({
                                                    //         ...priceCalculator,
                                                    //         priceAdditionalInput: e.target.value,
                                                    //     })
                                                    // }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group date-box">
                                                <label className="text-light-dark font-size-12 font-weight-500"> PRICE ESCALATION </label>
                                                <div className=" d-flex align-items-center form-control-date">
                                                    <Select
                                                        className="select-input text-primary"
                                                        id="priceEscalationSelect"
                                                    // options={priceHeadTypeKeyValue}
                                                    // placeholder="placeholder "
                                                    // value={priceCalculator.escalationPriceOptionsValue1}
                                                    // onChange={(e) =>
                                                    //     handleEscalationPriceValue(e)
                                                    // }
                                                    />
                                                    <input type="text" className="form-control rounded-top-left-0 rounded-bottom-left-0" placeholder="20%"
                                                        id="priceEscalationInput"
                                                    // value={priceCalculator.escalationPriceInputValue}
                                                    // onChange={(e) =>
                                                    //     setPriceCalculator({
                                                    //         ...priceCalculator,
                                                    //         escalationPriceInputValue: e.target.value,
                                                    //     })
                                                    // }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500"> CALCULATED PRICE</label>
                                                <input className="form-control border-radius-10 text-primary" type="text" name="calculatedPrice"
                                                    placeholder="$100" disabled
                                                // value={priceCalculator.calculatedPrice}
                                                // onChange={(e) =>
                                                //     setPriceCalculator({
                                                //         ...priceCalculator,
                                                //         calculatedPrice: e.target.value,
                                                //     })
                                                // }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <label className="text-light-dark font-size-12 font-weight-500">FLAT PRICE / ADJUSTED PRICE</label>
                                                <input className="form-control border-radius-10 text-primary" type="text" name="flatPrice"
                                                    placeholder="0"
                                                // value={priceCalculator.flatPrice}
                                                // onChange={(e) =>
                                                //     setPriceCalculator({
                                                //         ...priceCalculator,
                                                //         flatPrice: e.target.value,
                                                //     })
                                                // }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group date-box">
                                                <label className="text-light-dark font-size-12 font-weight-500">DISCOUNT TYPE</label>
                                                <div className=" d-flex form-control-date">
                                                    <div className="">
                                                        <Select className="text-primary" name="discountTypeSelect" placeholder="Select"
                                                        // value={priceCalculator.discountTypeSelect}
                                                        // onChange={(e) =>
                                                        //     setPriceCalculator({
                                                        //         ...priceCalculator,
                                                        //         discountTypeSelect: e,
                                                        //     })
                                                        // }
                                                        // isClearable={true}
                                                        // options={discountTypeOptions}
                                                        />
                                                    </div>
                                                    <input className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0" type="text"
                                                        name="discountTypeInput" placeholder="10%"
                                                    // value={priceCalculator.discountTypeInput}
                                                    // onChange={(e) =>
                                                    //     setPriceCalculator({
                                                    //         ...priceCalculator,
                                                    //         discountTypeInput: e.target.value,
                                                    //     })
                                                    // }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </TabPanel>
                            <TabPanel value={4}>
                                <ItemPriceCalculator />
                            </TabPanel>
                            <TabPanel value={5}>
                                <div className="custom-table portfolioItems-expandable-data-table card expand-last-child" style={{ height: 400, width: "100%" }}>
                                    <DataTable
                                    // title=""
                                    // columns={tempBundleItemColumns}
                                    // expandableRowExpanded={(row) => (row === currentExpendModelComponentRow)}
                                    // expandOnRowClicked
                                    // onRowClicked={(row) => setCurrentExpendModelComponentRow(row)}
                                    // data={tempBundleItems}
                                    // customStyles={dataTableCustomStyle}
                                    // expandableRows
                                    // expandableRowsComponent={ReviewModalTabExpendableBundleServiceItems}
                                    // onRowExpandToggled={(bool, row) => setCurrentExpendModelComponentRow(row)}
                                    // expandableRowStyles={{ background: '#7f0606',}}
                                    // pagination
                                    />
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
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
            {viewPortfolioItemTabsModel()}
            {/* {showAddItemModal && <PortfolioItemTabsModal
                show={showAddItemModal}
                hideModal={() => setShowAddItemModal(false)}
                componentDataTabShow={componentDataTabShow}
            />} */}
        </>
    )
}

export default PortfolioItemsList
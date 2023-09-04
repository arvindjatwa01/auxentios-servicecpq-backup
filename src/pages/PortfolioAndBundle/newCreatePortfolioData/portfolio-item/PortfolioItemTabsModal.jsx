import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import { TabList, TabPanel } from '@mui/lab';
import ItemAddEdit from './ItemAddEdit';
import PortfolioCoverageSearch from '../PortfolioCoverageSearch';
import SearchBox from "../../../Repair/components/SearchBox";

import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

import {
    getPortfolioAndSolutionCommonConfig
} from "../../../../services/index"
import Select from 'react-select';
import ItemPriceCalculator from './ItemPriceCalculator';
import DataTable from 'react-data-table-component';
import { isEmptyData } from '../utilities/textUtilities';

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
            backgroundColor: "#872ff7",
            color: "#fff",
            borderRight: "1px solid rgba(0,0,0,.12)",
        },
    },
    cells: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
            borderRight: "1px solid rgba(0,0,0,.12)",
        },
    },
};

const PortfolioItemTabsModal = (props) => {
    const { show, hideModal, componentDataTabShow } = props;
    const [activeTab, setActiveTab] = useState(1);
    const [bundleServiceNeed, setBundleServiceNeed] = useState(true);

    const [frequencyKeyValuePairs, setFrequencyKeyValuePairs] = useState([])
    const [unitKeyValuePairs, setUnitKeyValuePairs] = useState([])
    const [searchBundleServiceItem, setSearchBundleServiceItem] = useState([])
    const [selectedSearchedItems, setSelectedSearchedItems] = useState([])
    const [bundleServiceItemsList, setBundleServiceItemsList] = useState([])

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
            selector: (row) => isEmptyData(row.quantity) ? 1 : row.quantity,
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
            selector: (row) => !isEmptyData(row?.standardJobId) ? row?.standardJobId : !isEmptyData(row?.repairKitId) ? row?.repairKitId : "NA",
            sortable: false,
            wrap: true,
        },
    ]


    return (
        <Modal show={show} onHide={hideModal} size="xl">
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
                                handleBundleServiceNeed={() => setBundleServiceNeed(!bundleServiceNeed)}
                                frequencyKeyValuePairs={frequencyKeyValuePairs}
                                unitKeyValuePairs={unitKeyValuePairs}
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
                                    customStyles={customStyles}
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
                                    customStyles={customStyles}
                                    pagination
                                    expandableRows
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
                                // customStyles={customStyles}
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

export default PortfolioItemTabsModal
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Select from 'react-select';
import $ from "jquery";

import shareIcon from "../../../assets/icons/svg/share.svg";
import folderaddIcon from "../../../assets/icons/svg/folder-add.svg";
import uploadIcon from "../../../assets/icons/svg/upload.svg";
import cpqIcon from "../../../assets/icons/svg/CPQ.svg";
import deleteIcon from "../../../assets/icons/svg/delete.svg";
import copyIcon from "../../../assets/icons/svg/Copy.svg";
import shearchIcon from "../../../assets/icons/svg/search.svg";

import { MuiMenuComponent } from "../../Operational/index";
import { isEmptyData, isEmptySelectData } from './utilities/textUtilities';
import { getSearchQueryCoverage } from 'services';
import ItemAddEdit from './portfolio-item/ItemAddEdit';
import ItemPriceCalculator from './portfolio-item/ItemPriceCalculator';

const BundleServiceAddUpdate = ({ show, hideModel, itemFlag, customerSegmentKeyValuePair, machineComponentKeyValuePair }) => {
    const [activeTab, setActiveTab] = useState("bundleServiceHeader")
    const [itemEditable, setItemEditable] = useState(false);

    const [bundleServiceObj, setBundleServiceObj] = useState({
        itemId: 0,
        name: "",
        description: "",
        bundleFlag: "",
        reference: "",
        customerSegment: "",
        make: "",
        model: "",
        family: "",
        prefix: "",
        machine: "",
        additional: "",
        estimatedTime: "",
        unit: "",
        usageType: "",
        frequency: "",
        currency: "",
        machineComponent: "",
    })

    const [modelSearchList, setModelSearchList] = useState([])
    const [prefixKeyValuePair, setPrefixKeyValuePair] = useState([])

    const [createServiceOrBundle, setCreateServiceOrBundle] = useState({
        id: "",
        name: "",
        description: "",
        bundleFlag: "",
        reference: "",
        customerSegment: "",
        make: "",
        model: "",
        family: "",
        prefix: "",
        machine: "",
        additional: "",
        estimatedTime: "",
        unit: "",
        usageType: "",
        frequency: "",
        currency: "",
    });

    // search model
    const handleModelSearch = (e) => {
        var searchStr = "model~" + e.target.value;
        getSearchQueryCoverage(searchStr)
            .then((res) => {
                $(`.scrollbar-model`).css("display", "block");
                setModelSearchList(res)
                var prefixOptions = [];
                for (var n = 0; n < res.length; n++) {
                    prefixOptions.push({ label: res[n].prefix, value: res[n].prefix })
                }
                setPrefixKeyValuePair(prefixOptions);
            })
            .catch((err) => {
                return;
            });
    }

    const handleSelectModel = (currentItem) => {
        setBundleServiceObj(pre => ({
            ...pre,
            model: currentItem.model,
            make: currentItem.make,
            family: currentItem.family
        }))
        // setModelResultSelected(true);
        $(`.scrollbar-model`).css("display", "none");
    }

    const handleTextChange = (e) => {
        const { name, type, value } = e.target;
        if (type === "number") {
            setBundleServiceObj(pre => ({ ...pre, [name]: parseInt(value) }))
        } else {
            setBundleServiceObj(pre => ({ ...pre, [name]: value }))
        }
    }

    const handleSelectChange = (e, keyName) => {
        setBundleServiceObj(pre => ({ ...pre, [keyName]: e }))
    }

    return (
        <Modal size="xl" show={show} onHide={hideModel}>
            <Modal.Body>
                <Box sx={{ typography: "body1" }}>
                    <TabContext value={activeTab}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList className="custom-tabs-div" aria-label="lab API tabs example"
                                onChange={(e, tabValue) => setActiveTab(tabValue)}
                            // onChange={(e, newValue) => bundleAndServiceEditAble && setBundleTabs(newValue)}
                            >
                                <Tab label={`${itemFlag} HEADER`} value="bundleServiceHeader" />
                                <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                                {itemFlag === "BUNDLE" && <Tab label={`${itemFlag} ITEMS`} value="bundleServiceItems" />}
                                {itemFlag === "BUNDLE" && <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>}
                                <Tab label="PRICE CALCULATOR" value="bundleServicePriceCalculator" />
                                <div className="align-items-center d-flex justify-content-center"><ArrowForwardIosIcon /></div>
                                <Tab label="ADMINISTRATIVE" value="bundleServiceAdministrative" />
                            </TabList>
                        </Box>
                        <TabPanel value="bundleServiceHeader">
                            <div className="container-fluid ">
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div className="ml-3 green-custom-btn ">
                                        {itemFlag === "SERVICE" &&
                                            <Select
                                                // className={`customselectbtn1 p-2 border-radius-10 ${value4.value == "chargeable" ? "bg-gray-light" : "bg-green-light"}`}
                                                // onChange={(e) => handleOption4(e)}
                                                options={[
                                                    { value: "free", label: "Free" },
                                                    { value: "chargeable", label: "Chargeable" },
                                                ]}
                                            // value={value4}
                                            />
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="ml-3">
                                            <Select
                                                className="customselectbtn1"
                                            // onChange={(e) => handleOption3(e)}
                                            // options={versionOption}
                                            // value={value3}
                                            />
                                        </div>

                                        <div className="ml-3">
                                            <Select
                                                className="customselectbtn"
                                            // onChange={(e) => handleOption2(e)}
                                            // options={statusOption}
                                            // value={value2}
                                            // isOptionDisabled={(option) => makeStatusValueDisabled(option)}
                                            />
                                        </div>
                                        <a className="ml-3 font-size-14 cursor">
                                            <img src={shareIcon} />
                                        </a>
                                        <a className="ml-3 font-size-14 cursor">
                                            <img src={folderaddIcon} />
                                        </a>
                                        <a className="ml-3 font-size-14 cursor">
                                            <img src={uploadIcon} />
                                        </a>
                                        <a className="ml-3 font-size-14 cursor">
                                            <img src={cpqIcon} />
                                        </a>
                                        <a className="ml-3 font-size-14 cursor">
                                            <img src={deleteIcon} />
                                        </a>
                                        <a className="ml-3 font-size-14 cursor">
                                            <img src={copyIcon} />
                                        </a>
                                        <a className="ml-2 cursor">
                                            {/* <MuiMenuComponent
                                                // onClick={() => alert()}
                                                // options={activityOptions}
                                            /> */}
                                        </a>
                                    </div>
                                </div>
                                <div className="card p-4 mt-5">
                                    <h5 className="d-flex align-items-center mb-0">
                                        <div className="" style={{ display: "contents" }}>
                                            <span className="mr-3">Header</span>
                                            <a className="btn-sm cursor"
                                            // onClick={makeBundleServiceHeaderEditable}
                                            >
                                                <i className="fa fa-pencil" aria-hidden="true" />
                                            </a>
                                            <a className="btn-sm cursor">
                                                <i className="fa fa-bookmark-o" aria-hidden="true" />
                                            </a>
                                            <a className="btn-sm cursor">
                                                <img style={{ width: "14px" }} src={folderaddIcon} />
                                            </a>
                                        </div>
                                        <div className="input-group icons border-radius-10 border">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-transparent border-0 pr-0 " id="basic-addon1">
                                                    <img src={shearchIcon} />
                                                </span>
                                            </div>
                                            <input type="search" className="form-control search-form-control" aria-label="Search Dashboard" />
                                        </div>
                                    </h5>
                                    {itemEditable ?
                                        <div className="row mt-4 ">
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">{itemFlag} NAME</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.name) ? "NA" : bundleServiceObj.name}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">{itemFlag} DESCRIPTION</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.description) ? "NA" : bundleServiceObj.description}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">BUNDLE/SERVICE</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{itemFlag === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM"}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">REFERENCE</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.reference) ? "NA" : bundleServiceObj.reference}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">CUSTOMER SEGMENT</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptySelectData(bundleServiceObj.customerSegment?.value) ? "NA" : bundleServiceObj.customerSegment?.label}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MACHINE/COMPONENT</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptySelectData(bundleServiceObj.machineComponent?.value) ? "NA" : bundleServiceObj.machineComponent?.label}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group customselectmodelSerch">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MODEL(S)</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.model) ? "NA" : bundleServiceObj.model}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">FAMILY</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.family) ? "NA" : bundleServiceObj.family}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">MAKE</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.make) ? "NA" : bundleServiceObj.make}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">PREFIX(S)</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptySelectData(bundleServiceObj.prefix?.value) ? "NA" : bundleServiceObj.prefix?.label}</h6>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <p className="text-light-dark font-size-12 font-weight-500 mb-2">ESTIMATED HOURS</p>
                                                    <h6 className="font-weight-500 text-uppercase text-primary font-size-17">{isEmptyData(bundleServiceObj.estimatedTime) ? "NA" : bundleServiceObj.estimatedTime}</h6>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="row mt-4 input-fields">
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">{itemFlag} NAME</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="name"
                                                        placeholder="Name (Required*)" onChange={handleTextChange}
                                                        value={bundleServiceObj.name} disabled={bundleServiceObj.itemId !== 0} />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">{itemFlag} DESCRIPTION</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="description"
                                                        placeholder="Description (Required*)" value={bundleServiceObj.description}
                                                        onChange={handleTextChange} />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">BUNDLE/SERVICE</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="bundleFlag"
                                                        placeholder="Bundle Flag" value={itemFlag === "SERVICE" ? "SERVICE" : "BUNDLE_ITEM"}
                                                        onChange={handleTextChange} disabled />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">REFERENCE</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="reference"
                                                        placeholder="Reference" value={bundleServiceObj.reference}
                                                        onChange={handleTextChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">CUSTOMER SEGMENT</label>
                                                    <Select
                                                        onChange={(e) => handleSelectChange(e, "customerSegment")}
                                                        className="text-primary"
                                                        value={bundleServiceObj.customerSegment}
                                                        options={customerSegmentKeyValuePair}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">MACHINE/COMPONENT</label>
                                                    <Select
                                                        onChange={(e) => handleSelectChange(e, "machineComponent")}
                                                        value={bundleServiceObj.machineComponent}
                                                        className="text-primary"
                                                        options={machineComponentKeyValuePair}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group customselectmodelSerch">
                                                    <label className="text-light-dark font-size-12 font-weight-500">MODEL(S)</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="model"
                                                        placeholder="Model(Required*)" value={bundleServiceObj.model}
                                                        onChange={(e) => { handleTextChange(e); handleModelSearch(e); }}
                                                    />
                                                    <div className="css-w8dmq8">*Mandatory</div>
                                                    {
                                                        <ul className={`list-group custommodelselectsearch customselectsearch-list scrollbar scrollbar-model style`} id="style">
                                                            {modelSearchList.map((currentItem, j) => (
                                                                <li className="list-group-item text-primary" key={j}
                                                                    onClick={() => handleSelectModel(currentItem)}>
                                                                    {currentItem.model}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">FAMILY</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="make"
                                                        placeholder="Auto Fill Search Model...." value={bundleServiceObj.family} disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">MAKE</label>
                                                    <input type="text" className="form-control text-primary border-radius-10" name="make"
                                                        placeholder="Auto Fill Search Model...." value={bundleServiceObj.make}
                                                        onChange={handleTextChange} disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-3">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-12 font-weight-500">PREFIX(S)</label>
                                                    <Select
                                                        onChange={(e) => handleSelectChange(e, "prefix")}
                                                        className="text-primary"
                                                        value={bundleServiceObj.prefix}
                                                        options={prefixKeyValuePair}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4">
                                                <div className="form-group">
                                                    <label className="text-light-dark font-size-14 font-weight-500">ESTIMATED HOURS</label>
                                                    <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                                        <input type="number"
                                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary" name="estimatedTime"
                                                            onChange={handleTextChange}
                                                            value={bundleServiceObj.estimatedTime}
                                                        />
                                                        <span className="hours-div text-primary">hours/day</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="row" style={{ justifyContent: "right" }}>
                                        <button type="button" className="btn text-white bg-primary"
                                        // onClick={handleAddNewServiceOrBundle}
                                        >
                                            {itemEditable ? "Next" : "Save & Next"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="bundleServiceItems">
                            <ItemAddEdit
                                itemType="bundleItem"
                                isEditable={false}
                                isPortfolioItem={false}
                                // bundleServiceNeed={bundleServiceNeed}
                                // handleBundleServiceNeed={() => setBundleServiceNeed(!bundleServiceNeed)}
                                frequencyKeyValuePairs={[]}
                                unitKeyValuePairs={[]}
                            />
                        </TabPanel>
                        <TabPanel value="bundleServicePriceCalculator">
                            <ItemPriceCalculator />
                        </TabPanel>
                        <TabPanel value="bundleServiceAdministrative">
                            <h3>Administrative details</h3>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal.Body>
        </Modal>
    )
}

export default BundleServiceAddUpdate
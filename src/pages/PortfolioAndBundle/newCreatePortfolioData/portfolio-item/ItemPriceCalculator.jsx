import React, { useEffect, useState } from 'react'
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import Select from 'react-select';
import FormGroup from "@mui/material/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import { Switch } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { isEmpty } from '../utilities/textUtilities';

const ItemPriceCalculator = (props) => {
    const { priceMethodKeyValuePair, priceTypeKeyValuePair, priceHeadTypeKeyValuePair, unitKeyValuePairs,
        frequencyKeyValuePairs, currencyKeyValuePair, additionalPriceKeyValuePair, discountTypeKeyValuePair,
        usageTypeKeyValuePair } = props;

    const [itemPriceRecordObj, setItemPriceRecordObj] = useState({
        itemPriceDataId: 0,
        priceMethod: "",
        currency: "",
        priceDate: new Date(),
        priceType: "",
        additionalPriceType: "",
        additionalPriceValue: "",
        priceEscalation: "",
        sparePartsEscalation: 0,
        labourEscalation: 0,
        miscEscalation: 0,
        serviceEscalation: 0,
        flatRateIndicator: false,
        flatPrice: "",
        discountType: "",
        discountValue: "",
        sparePartsPriceBreakDownPercentage: 0,
        labourPriceBreakDownPercentage: 0,
        miscPriceBreakDownPercentage: 0,
        year: { label: 1, value: 1 },
        noOfYear: 1,
        startUsage: 0,
        endUsage: 0,
        usageType: "",
        frequency: "",
        usageUnit: "",
        recommendedUnit: "",
        recommendedValue: "",
        numberOfEvents: 0,
        supression: false,
        totalPrice: 0,
        calculatedPrice: 0,
    });

    const [priceEscalationValues, setPriceEscalationValues] = useState({
        sparePartsEscalation: 0,
        labourEscalation: 0,
        miscEscalation: 0,
        serviceEscalation: 0,
    })

    const [yearsKeyValuePairs, seYearsKeyValuePairs] = useState([{ value: 1, label: 1 }])

    useEffect(() => {
        var yearsOptionArr = [];
        for (let i = 1; i <= itemPriceRecordObj.noOfYear; i++) {
            yearsOptionArr.push({ value: i, label: i })
        }
        seYearsKeyValuePairs(yearsOptionArr);
    }, [itemPriceRecordObj.noOfYear])

    const handlePriceTextChange = (e, keyName, type, isPrice = false) => {
        try {
            if (type === "text") {
                setItemPriceRecordObj(pre => ({ ...pre, [keyName]: e.target.value }))
            } else if (type === "select") {
                setItemPriceRecordObj(pre => ({ ...pre, [keyName]: e }))
            } else if (type === "number") {
                if (isPrice) {
                    setItemPriceRecordObj(pre => ({ ...pre, [keyName]: parseFloat(e.target.value) }))
                } else {
                    setItemPriceRecordObj(pre => ({ ...pre, [keyName]: parseInt(e.target.value) }))
                }
            } else {
                setItemPriceRecordObj(pre => ({ ...pre, [keyName]: e.target.value }))
            }
        } catch (error) {
            return;
        }
    }

    const priceEscalationPriceInput = (e) => {
        if (itemPriceRecordObj.priceEscalation?.value === "PARTS") {
            setPriceEscalationValues({
                ...priceEscalationValues,
                sparePartsEscalation: parseFloat(e.target.value),
            })
        } else if (itemPriceRecordObj.priceEscalation?.value === "LABOR") {
            setPriceEscalationValues({
                ...priceEscalationValues,
                labourEscalation: parseFloat(e.target.value),
            })

        } else if (itemPriceRecordObj.priceEscalation?.value === "MISCELLANEOUS") {
            setPriceEscalationValues({
                ...priceEscalationValues,
                miscEscalation: parseFloat(e.target.value),
                serviceEscalation: 0,
            })

        } else if (itemPriceRecordObj.priceEscalation?.value === "SERVICE") {
            setPriceEscalationValues({
                ...priceEscalationValues,
                serviceEscalation: parseFloat(e.target.value),
            })
        }
    }

    return (
        <>
            <div className="ligt-greey-bg p-3">
                <div>
                    <span className="mr-3 cursor"
                    // onClick={() => setPortfolioItemPriceEditable(!portfolioItemPriceEditable)}
                    >
                        <i className="fa fa-pencil font-size-12" aria-hidden="true"></i>
                        <span className="ml-2">Edit</span>
                    </span>
                    <span className="mr-3">
                        <MonetizationOnOutlinedIcon className=" font-size-16" />
                        <span className="ml-2"> Adjust price</span>
                    </span>
                    <span>
                        <SellOutlinedIcon className=" font-size-16" />
                        <span className="ml-2">Split price</span>
                    </span>
                </div>
            </div>
            <div className="mt-3">
                <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">PRICE METHOD</label>
                            <Select className="text-primary" placeholder="placeholder (Optional)"
                                options={priceMethodKeyValuePair} value={itemPriceRecordObj.priceMethod}
                                onChange={(e) => handlePriceTextChange(e, "priceMethod", "select")}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">CURRENCY </label>
                            <Select className="text-primary" placeholder="placeholder (Optional)"
                                options={currencyKeyValuePair} value={itemPriceRecordObj.currency}
                                onChange={(e) => handlePriceTextChange(e, "currency", "select")}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">PRICE DATE</label>
                            <div className="d-flex align-items-center date-box w-100">
                                <div className="form-group w-100">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            className="form-controldate border-radius-10"
                                            label=""
                                            name="preparedOn"
                                            value={itemPriceRecordObj.priceDate}
                                            onChange={(e) => handlePriceTextChange(e, "priceDate", "date")}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">PRICE TYPE</label>
                            <Select className="text-primary" placeholder="placeholder (Optional)"
                                options={priceTypeKeyValuePair} value={itemPriceRecordObj.priceType}
                                onChange={(e) => handlePriceTextChange(e, "priceType", "select")}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group date-box">
                            <label className="text-light-dark font-size-12 font-weight-500">ADDITIONAL</label>
                            <div className=" d-flex form-control-date">
                                <div className="">
                                    <Select className="text-primary" placeholder="Select"
                                        value={itemPriceRecordObj.additionalPriceType}
                                        onChange={(e) => handlePriceTextChange(e, "additionalPriceType", "select")}
                                        options={additionalPriceKeyValuePair}
                                    />
                                </div>
                                <input type="number" className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                    placeholder="10%" name="priceAdditionalInput"
                                    value={itemPriceRecordObj.additionalPriceValue}
                                    onChange={(e) => handlePriceTextChange(e, "additionalPriceValue", "number", true)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group date-box">
                            <label className="text-light-dark font-size-12 font-weight-500">PRICE ESCALATION</label>
                            <div className=" d-flex align-items-center form-control-date">
                                <Select className="select-input text-primary"
                                    options={priceHeadTypeKeyValuePair}
                                    value={itemPriceRecordObj.priceEscalation}
                                    onChange={(e) => handlePriceTextChange(e, "priceEscalation", "select")}
                                />
                                <input className="form-control rounded-top-left-0 rounded-bottom-left-0" type="text" placeholder="20%"
                                    id="priceEscalationInput" disabled={isEmpty(itemPriceRecordObj.priceEscalation?.value)}
                                    value={itemPriceRecordObj.priceEscalation?.value === "PARTS" ? priceEscalationValues.sparePartsEscalation :
                                        itemPriceRecordObj.priceEscalation?.value === "LABOR" ? priceEscalationValues.labourEscalation :
                                            itemPriceRecordObj.priceEscalation?.value === "MISCELLANEOUS" ? priceEscalationValues.miscEscalation :
                                                itemPriceRecordObj.priceEscalation?.value === "SERVICE" ? priceEscalationValues.serviceEscalation : 0}
                                    onChange={priceEscalationPriceInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div class="form-group mt-1">
                            <FormGroup>
                                <FormControlLabel
                                    style={{ alignItems: "start", marginLeft: 0, }}
                                    control={
                                        <Switch
                                            checked={itemPriceRecordObj.flatRateIndicator}
                                        // onChange={(e) =>
                                        //     handleFlatPriceIndicator(e)
                                        // }
                                        />
                                    }
                                    labelPlacement="top"
                                    label={<span className="text-light-dark font-size-12 font-weight-500">FLAT RATE INDICATOR</span>}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500"> FLAT PRICE / ADJUSTED PRICE</label>
                            <input type="number" className="form-control border-radius-10 text-primary" name="flatPrice"
                                value={itemPriceRecordObj.flatPrice} placeholder="0"
                                onChange={(e) => handlePriceTextChange(e, "flatPrice", "number", true)}
                                disabled={!itemPriceRecordObj.flatRateIndicator}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group date-box">
                            <label className="text-light-dark font-size-12 font-weight-500"> DISCOUNT TYPE</label>
                            <div className=" d-flex form-control-date">
                                <div className="">
                                    <Select className="text-primary" placeholder="Select"
                                        value={itemPriceRecordObj.discountType} options={discountTypeKeyValuePair}
                                        onChange={(e) => handlePriceTextChange(e, "discountType", "select")}
                                    />
                                </div>
                                <input type="text" className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                    name="discountTypeInput" placeholder="10%"
                                    value={itemPriceRecordObj.discountValue}
                                    onChange={(e) => handlePriceTextChange(e, "discountValue", "number", true)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group date-box">
                            <label className="text-light-dark font-size-12 font-weight-500"> PRICE BREAK DOWN</label>
                            <div className=" d-flex form-control-date">
                                <Select className="select-input text-primary"
                                    // value={priceCalculator.priceBreakDownOptionsKeyValue1}
                                    // onChange={(e) =>
                                    //     handlePriceBreakDownValue(e)
                                    // }
                                    options={priceHeadTypeKeyValuePair}
                                />
                                <input type="text" className="form-control text-primary rounded-top-left-0 rounded-bottom-left-0"
                                    placeholder="optional"
                                // value={((priceBreakDownFieldsValue.parts === "") || (priceBreakDownFieldsValue.labor === "") ||
                                //     (priceBreakDownFieldsValue.miscellaneous === "")) ? priceCalculator.priceBreakDownInputValue :
                                //     priceCalculator?.priceBreakDownOptionsKeyValue1?.value === "PARTS" ? priceBreakDownFieldsValue.parts :
                                //         priceCalculator?.priceBreakDownOptionsKeyValue1?.value === "LABOR" ? priceBreakDownFieldsValue.labor :
                                //             priceCalculator?.priceBreakDownOptionsKeyValue1?.value === "MISCELLANEOUS" ? priceBreakDownFieldsValue.miscellaneous :
                                //                 priceCalculator?.priceBreakDownOptionsKeyValue1?.value === "SERVICE" ? priceBreakDownFieldsValue.service : priceCalculator.priceBreakDownInputValue
                                // }
                                // onChange={(e) =>
                                //     setPriceCalculator({
                                //         ...priceCalculator,
                                //         priceBreakDownInputValue: e.target.value,
                                //     })
                                // }
                                // disabled={((priceBreakDownFieldsValue.parts === "") || (priceBreakDownFieldsValue.labor === "") ||
                                //     (priceBreakDownFieldsValue.miscellaneous === "")) ? false : true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-radius-10 mt-3 py-2 px-3">
                    <div className="row input-fields">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500"> YEAR</label>
                                <Select options={yearsKeyValuePairs} className="text-primary" value={itemPriceRecordObj.year}
                                    onChange={(e) => handlePriceTextChange(e, "year", "select")}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500"> NO. OF YEARS</label>
                                <input type="number" className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                    placeholder="No. of Years" name="noOfYear" value={itemPriceRecordObj.noOfYear}
                                    onChange={(e) => handlePriceTextChange(e, "noOfYear", "number")}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="font-size-14 text-black font-weight-500 mb-1">USAGE</p>
                    <div className="row input-fields">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500"> START USAGE</label>
                                <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                    <input type="number" className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        placeholder="Required*" name="startUsage" value={itemPriceRecordObj.startUsage}
                                        onChange={(e) => handlePriceTextChange(e, "startUsage", "number")}
                                    />
                                    <span className="hours-div text-primary">{itemPriceRecordObj.usageUnit === "" ? "Select unit" : itemPriceRecordObj.usageUnit?.label}</span>
                                </div>
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">END USAGE</label>
                                <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                    <input type="number" className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        placeholder="Required*" name="endUsage" value={itemPriceRecordObj.endUsage}
                                        onChange={(e) => handlePriceTextChange(e, "endUsage", "number")}
                                    />
                                    <span className="hours-div text-primary">{itemPriceRecordObj.usageUnit === "" ? "Select unit" : itemPriceRecordObj.usageUnit?.label}</span>
                                </div>
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500"> USAGE TYPE</label>
                                <Select className="text-primary"
                                    options={usageTypeKeyValuePair} value={itemPriceRecordObj.usageType}
                                    onChange={(e) => handlePriceTextChange(e, "usageType", "select")}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500"> FREQUENCY</label>
                                <Select placeholder="Select..." className="text-primary"
                                    options={frequencyKeyValuePairs}
                                    value={itemPriceRecordObj.frequency}
                                    onChange={(e) => handlePriceTextChange(e, "frequency", "select")}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">UNIT</label>
                                <Select placeholder="Select..." className="text-primary"
                                    options={unitKeyValuePairs}
                                    value={itemPriceRecordObj.usageUnit}
                                    onChange={(e) => handlePriceTextChange(e, "usageUnit", "select")}
                                />
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label className="text-light-dark font-size-14 font-weight-500">RECOMMENDED VALUE</label>
                                <div className="d-flex form-control-date" style={{ overflow: "hidden" }}>
                                    <input type="number" className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        placeholder="Recommended Value" name="recommendedValue"
                                        value={itemPriceRecordObj.recommendedValue}
                                        onChange={(e) => handlePriceTextChange(e, "recommendedValue", "number")}
                                    />
                                    <span className="hours-div text-primary">{itemPriceRecordObj.usageUnit === "" ? "Select unit" : itemPriceRecordObj.usageUnit?.value.toLowerCase() === "year" ? "Month" : itemPriceRecordObj.usageUnit?.label}</span>
                                </div>
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group w-100">
                                <label className="text-light-dark font-size-12 font-weight-500">NO. OF EVENTS</label>
                                <input type="number" className="form-control border-radius-10 text-primary" placeholder="NO. OF EVENTS"
                                    value={itemPriceRecordObj.numberOfEvents} disabled readOnly
                                    onChange={(e) => handlePriceTextChange(e, "numberOfEvents", "number")}
                                />
                                <div className="css-w8dmq8">*Mandatory</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <div class="form-group mt-1">
                                <FormGroup>
                                    <FormControlLabel style={{ alignItems: "start", marginLeft: 0, }}
                                        control={
                                            <Switch
                                                checked={itemPriceRecordObj.supression}
                                            // onChange={(e) =>
                                            //     setExtWorkData({
                                            //         ...extWorkData,
                                            //         flatRateIndicator: e.target.checked,
                                            //         adjustedPrice: e.target.checked
                                            //             ? extWorkData.adjustedPrice
                                            //             : 0.0,
                                            //     })
                                            // }
                                            />
                                        }
                                        labelPlacement="top"
                                        label={<span className="text-light-dark font-size-12 font-weight-500">SUPRESSION</span>}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <div className="my-1 d-flex align-items-center justify-content-end">
                        <a className="btn border mr-4 cursor">Cancel</a>
                        {/* <a className="btn d-flex align-items-center border bg-primary text-white" onClick={calculateItemPrice}> */}
                        <a className="btn d-flex align-items-center border bg-primary text-white cursor">
                            <span className="mr-2 funds">
                                <svg style={{ width: "13px" }} version="1.1" id="Layer_1" viewBox="0 0 200 200">
                                    <g>
                                        <g>
                                            <path class="st0" d="M66.3,105.1c-4.5,0.1-8.3-3.7-8.3-8.2c0-4.3,3.6-8,8-8.1c4.5-0.1,8.3,3.7,8.3,8.2C74.2,101.4,70.7,105,66.3,105.1z" />
                                        </g>
                                        <g>
                                            <path class="st0" d="M106.8,97.2c-0.1,4.5-4,8.1-8.5,7.9c-4.3-0.2-7.8-4-7.7-8.3c0.1-4.5,4-8.1,8.5-7.9C103.4,89.1,106.9,92.9,106.8,97.2z" />
                                        </g>
                                        <g>
                                            <path class="st0" d="M139.4,96.8c0.1,4.5-3.6,8.3-8.1,8.3c-4.3,0-8-3.6-8.1-7.9c-0.1-4.5,3.6-8.3,8.1-8.3C135.6,88.9,139.3,92.5,139.4,96.8z" />
                                        </g>
                                        <g>
                                            <path class="st0" d="M74.3,129.6c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.8-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1C70.7,121.6,74.3,125.2,74.3,129.6z" />
                                        </g>
                                        <g>
                                            <path class="st0" d="M106.8,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C103.2,121.5,106.8,125.2,106.8,129.5z"/>
                                        </g>
                                        <g>
                                            <path class="st0" d="M74.3,162.1c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C70.7,154.1,74.3,157.7,74.3,162.1z"/>
                                        </g>
                                        <g>
                                            <path class="st0" d="M98.6,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C90.7,157.7,94.3,154.1,98.6,154z"/>
                                        </g>
                                        <g>
                                            <path class="st0" d="M139.4,129.5c0,4.5-3.8,8.2-8.3,8.1c-4.3-0.1-7.9-3.7-7.9-8.1c0-4.5,3.8-8.2,8.3-8.1
                      C135.8,121.5,139.4,125.2,139.4,129.5z"/>
                                        </g>
                                        <g>
                                            <path class="st0" d="M131.1,154c4.3-0.1,8.1,3.5,8.2,7.8c0.2,4.5-3.5,8.4-8,8.4c-4.5,0.1-8.3-3.7-8.2-8.2
                      C123.2,157.7,126.8,154.1,131.1,154z"/>
                                        </g>
                                        <g>
                                            <path class="st0" d="M130.9,195.5H69.1c-25.4,0-46.2-20.7-46.2-46.2V50.6C23,25.2,43.7,4.5,69.1,4.5h61.7
                      c25.4,0,46.2,20.7,46.2,46.2v98.8C177,174.8,156.3,195.5,130.9,195.5z M69.1,16.4c-18.9,0-34.2,15.3-34.2,34.2v98.8
                      c0,18.9,15.3,34.2,34.2,34.2h61.7c18.9,0,34.2-15.3,34.2-34.2V50.6c0-18.9-15.3-34.2-34.2-34.2H69.1z"/>
                                        </g>
                                        <g>
                                            <path class="st0" d="M128.7,68.1H71.3C61.2,68.1,53,59.9,53,49.7s8.2-18.4,18.4-18.4h57.4c10.1,0,18.4,8.2,18.4,18.4
                      S138.8,68.1,128.7,68.1z M71.3,43.3c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4h57.4c3.5,0,6.4-2.9,6.4-6.4
                      c0-3.5-2.9-6.4-6.4-6.4H71.3z"/>
                                        </g>
                                    </g>
                                </svg>
                            </span>Calculate<span className="ml-2"><KeyboardArrowDownIcon /></span></a>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className="d-flex align-items-center">
                        <div className="d-block mr-4">
                            <p className="mb-0 font-size-14 text-grey">TOTAL BASE PRICE</p>
                            {/* <p className="mb-0 font-size-14 text-black">${priceCalculator.totalPrice}</p> */}
                        </div>
                        <div className="d-block">
                            <p className="mb-0 font-size-14 text-grey">NET PRICE</p>
                            {/* <p className="mb-0 font-size-14 text-black">${priceCalculator.calculatedPrice}</p> */}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <a className="btn text-white bg-primary cursor"
                        // onClick={handleItemPriceCalculatorSave}
                        >
                            Next
                            {/* {portfolioItemPriceEditable ? "Next" : "Save & Next"} */}
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemPriceCalculator
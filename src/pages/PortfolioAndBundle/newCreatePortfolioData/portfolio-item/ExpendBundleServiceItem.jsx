import React from 'react'
import Select from 'react-select'

const ExpendBundleServiceItem = (props) => {
    const { bundleServiceRowData } = props;
    return (
        <>
            <div className="ligt-greey-bg p-3 my-3">
            </div>
            <div className="row mt-3 input-fields">
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500" > NAME</label>
                        <input className="form-control border-radius-10 text-primary" type="text" disabled
                        // value={addPortFolioItem.name} 
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">DESCRIPTION</label>
                        <input className="form-control border-radius-10 text-primary" type="text" placeholder="Description"
                            name="description" autoComplete="off"
                        // value={addPortFolioItem.description}
                        // onChange={(e) => setAddPortFolioItem({
                        //     ...addPortFolioItem,
                        //     description: e.target.value,
                        // })}
                        />
                        <div className="css-w8dmq8">*Mandatory</div>
                    </div>
                </div>
            </div>
            <div className='border border-radius-10 mt-3 py-2 px-3'>
                <div className='row input-fields'>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500" > PRICE METHOD</label>
                            <Select className="text-primary"
                            // options={priceMethodKeyValue}
                            // value={priceCalculator.priceMethod}
                            // onChange={(e) =>
                            //     setPriceCalculator({
                            //         ...priceCalculator,
                            //         priceMethod: e,
                            //     })}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">PRICE TYPE</label>
                            <Select className="text-primary"
                            // options={props.priceTypeDropdownKeyValue}
                            // value={priceCalculator.priceType}
                            // onChange={(e) =>
                            //     setPriceCalculator({
                            //         ...priceCalculator,
                            //         priceType: e,
                            //     })}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">START USAGE</label>
                            <div className=" d-flex form-control-date border left-select-div" style={{ borderRadius: "5px" }}>
                                <input className="form-control border-none text-primary" type="number" name="startUsage"
                                // value={priceCalculator.startUsage}
                                // onChange={(e) =>
                                //     setPriceCalculator({
                                //         ...priceCalculator,
                                //         startUsage: e.target.value,
                                //     })}
                                />
                                {/* <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span> */}
                            </div>
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">END USAGE</label>
                            <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                <input className="border-none form-control border-radius-10 text-primary" type="text" name="endUsage"
                                // value={priceCalculator.endUsage}
                                // onChange={(e) =>
                                //     setPriceCalculator({
                                //         ...priceCalculator,
                                //         endUsage: e.target.value,
                                //     })}
                                />
                                {/* <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit.label}</span> */}
                            </div>
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">FREQUENCY</label>
                            <Select className="text-primary"
                            // options={frequencyOptionKeyValue}
                            // onChange={(e) =>
                            //     setAddPortFolioItem({
                            //         ...addPortFolioItem,
                            //         frequency: e,
                            //     })
                            // }
                            // value={addPortFolioItem.frequency}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">UNIT</label>
                            <Select className="text-primary"
                            // options={unitOptionKeyValue}
                            // onChange={(e) =>
                            //     setAddPortFolioItem({ ...addPortFolioItem, unit: e })
                            // }
                            // value={addPortFolioItem.unit}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">RECOMMENDED VALUE</label>
                            <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                <input className="form-control border-none border-radius-10 text-primary" type="number" name="recommendedValue"
                                    autoComplete="off"
                                // value={priceCalculator.recommendedValue}
                                // onChange={(e) =>
                                //     setPriceCalculator({
                                //         ...priceCalculator,
                                //         recommendedValue: e.target.value,
                                //     })}
                                />
                                {/* <span className="hours-div text-primary">{addPortFolioItem.unit == "" ? "select unit" : addPortFolioItem.unit?.value === "YEAR" ? "Month" : addPortFolioItem.unit.label}</span> */}
                            </div>
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">NO. OF EVENTS</label>
                            <input className="form-control border-radius-10 text-primary" type="text" name="numberOfEvents"
                            // value={priceCalculator.numberOfEvents}
                            // disabled={priceCalculator.calculatedPrice?.value === "FIXED" ? false : true}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">CALCULATED PRICE</label>
                            <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                <input className="form-control border-radius-10 text-primary" type="text" name="calculatedPrice"
                                    disabled
                                // value={((priceCalculator.calculatedPrice?.value !== "USAGE_BASED")) ? priceCalculator.calculatedPrice : null}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">BASE PRICE</label>
                            <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                <input className="form-control border-none border-radius-10 text-primary" type="number"
                                    name="totalPrice" autoComplete="off" disabled
                                // value={priceCalculator.totalPrice}
                                // onChange={(e) =>
                                //     setPriceCalculator({
                                //         ...priceCalculator,
                                //         totalPrice: e.target.value,
                                //     })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-14 font-weight-500">COST PER HOUR</label>
                            <div className=" d-flex form-control-date" style={{ overflow: "hidden" }}>
                                <input className="form-control border-none border-radius-10 text-primary" type="number" name="calculatedPrice"
                                    autoComplete="off" disabled
                                // value={((priceCalculator.calculatedPrice?.value !== "USAGE_BASED")) ? null : priceCalculator.calculatedPrice}
                                // onChange={(e) =>
                                //     setPriceCalculator({
                                //         ...priceCalculator,
                                //         calculatedPrice: e.target.value,
                                //     })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right my-3">
                <button type="button" className="btn btn-primary">Save</button>
            </div>
            <div className='p-3 d-flex align-items-center justify-content-between table-header-div'>
                <div className='' />
                <div className='text-white'>Item Name</div>
                <div className='text-white'>Description</div>
                <div className='text-white'>Strategy</div>
                <div className='text-white'>Task Type</div>
                <div className='text-white'>Quantity</div>
                <div className='text-white'>Recommended Value</div>
                <div className='text-white'>Template/Kit Id</div>
            </div>
        </>
    )
}

export default ExpendBundleServiceItem
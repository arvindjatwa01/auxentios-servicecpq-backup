import React from 'react'

const PortfolioTabsData = () => {
    return (
        <>
            {!viewOnlyTab.generalViewOnly ? <>
                <div className="row mt-4 input-fields">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                SELECT TYPE
                            </label>
                            <Select
                                placeholder="Select"
                                className="text-primary"
                                options={headerTypeKeyValue}
                                value={headerType}
                                onChange={handleHeaderTypeChange}
                                isLoading={
                                    headerTypeKeyValue.length > 0 ? false : true
                                }
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                           </div>
                    </div>
                </div>
                <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                {prefilgabelGeneral} NAME
                            </label>
                            <input
                                type="text"
                                className="form-control text-primary border-radius-10"
                                name="name"
                                placeholder="Name"
                                value={generalComponentData.name}
                                onChange={handleGeneralInputChange}
                                disabled={nameIsNotEditAble}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                {/* SERVICE {prefilgabelGeneral} DESCRIPTION (IF ANY) */}
                                {prefilgabelGeneral} DESCRIPTION (IF ANY)
                            </label>
                            <input
                                type="text"
                                className="form-control text-primary border-radius-10"
                                name="description"
                                placeholder="Optional"
                                value={generalComponentData.description}
                                onChange={handleGeneralInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row input-fields">
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                REFERENCE
                            </label>
                            <input
                                type="text"
                                className="form-control text-primary border-radius-10"
                                name="externalReference"
                                placeholder="Reference"
                                value={generalComponentData.externalReference}
                                onChange={handleGeneralInputChange}
                            />
                            <div className="css-w8dmq8">*Mandatory</div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                CUSTOMER SEGMENT
                            </label>
                            <Select
                                onChange={handleCustomerSegmentChange}
                                className="text-primary"
                                value={generalComponentData.customerSegment}
                                options={customerSegmentKeyValue}
                                placeholder="Optionals"
                            />
                        </div>
                    </div>
                </div>
                <div className="row" style={{ justifyContent: "right" }}>
                    <button
                        type="button"
                        onClick={handleNextClick}
                        className="btn btn-light"
                        id="general"
                    >
                        Save & Next
                    </button>
                </div>
            </> :
                <>
                    <div className="row mt-4">
                        <div className="col-md-4 col-sm-3">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">
                                    PORTFOLIO NAME
                                </p>
                                <h6 className="font-weight-500 text-primary font-size-17">
                                    {generalComponentData.name == "" || generalComponentData.name == null ? "NA" : generalComponentData.name}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">
                                    PORTFOLIO DESCRIPTION
                                </p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {generalComponentData.description == "" || generalComponentData.description == null ? "NA" : generalComponentData.description}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">
                                    REFERENCE
                                </p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {generalComponentData.externalReference == "" ||
                                        generalComponentData.externalReference == null ||
                                        generalComponentData.externalReference == "string"
                                        ? "NA" : generalComponentData.externalReference}
                                </h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-3">
                            <div className="form-group">
                                <p className="font-size-12 font-weight-500 mb-2">
                                    CUSTOMER SEGMENT
                                </p>
                                <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
                                    {generalComponentData?.customerSegment == "" ||
                                        generalComponentData?.customerSegment == null ||
                                        generalComponentData?.customerSegment == undefined ||
                                        generalComponentData?.customerSegment?.label == "string"
                                        ? "NA" : generalComponentData?.customerSegment?.label}
                                    {/* {generalComponentData?.customerSegment?.label} */}
                                </h6>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default PortfolioTabsData
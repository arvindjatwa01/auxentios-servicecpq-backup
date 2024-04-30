import React from "react";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE_SELECT } from "pages/Common/constants";

const shippingLeadCountUnit = [
    { value: "per Hr", label: "per Hr" },
    { value: "per Km", label: "per Km" },
    { value: "per Miles", label: "per Miles" },
    { value: "per year", label: "per year" },
    { value: "per month", label: "per month" },
    { value: "per day", label: "per day" },
    { value: "per quarter", label: "per quarter" },
];

const CustomerOrderAddress = ({ show, hideModal }) => {
    return (
        <Modal show={show} size="md">
            <Modal.Header>
                <Modal.Title>Billing Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row input-fields">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                DELIVERY TYPE
                            </label>
                            <Select
                                // onChange={(e) => {
                                //   setShippingBillingDetails({
                                //     ...shippingBillingDetails,
                                //     deliveryType: e,
                                //   });
                                // }}
                                // value={shippingBillingDetails.deliveryType}
                                options={[
                                    { label: "Standard", value: "STANDARD" },
                                    { label: "Express", value: "EXPRESS" },
                                ]}
                                placeholder="Select..."
                                styles={FONT_STYLE_SELECT}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                DELIVERY PRIORITY
                            </label>
                            <Select
                                // onChange={(e) => {
                                //   setShippingBillingDetails({
                                //     ...shippingBillingDetails,
                                //     deliveryType: e,
                                //   });
                                // }}
                                // value={shippingBillingDetails.deliveryType}
                                options={[
                                    { label: "Normal", value: "NORMAL" },
                                    { label: "Urgent", value: "URGENT" },
                                    {
                                        label: "Very Urgent",
                                        value: "VERY_URGENT",
                                    },
                                ]}
                                placeholder="Select..."
                                styles={FONT_STYLE_SELECT}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                        <div className="form-group date-box">
                            <label
                                className="text-light-dark font-size-12 font-weight-500"
                                for="exampleInputEmail1"
                            >
                                LEAD TIME
                            </label>
                            <div className=" d-flex align-items-center form-control-date">
                                <input
                                    type="text"
                                    className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                    placeholder="20%"
                                    id="leadTime"
                                    name="leadTime"
                                    //   value={shippingBillingDetails.leadTime}
                                    //   onChange={(e) => handleShippingDetails(e)}
                                />
                                <Select
                                    className="select-input text-primary"
                                    id="priceEscalationSelect"
                                    options={shippingLeadCountUnit}
                                    placeholder="placeholder "
                                    // value={priceCalculator.escalationPriceOptionsValue1}
                                    // onChange={(e) =>
                                    //     handleEscalationPriceValue(e)
                                    // }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                SERVICE RECIPIENT ADDRESS
                            </label>
                            <div className="form-group w-100">
                                <textarea
                                    id="serviceRecipentAddress"
                                    name="serviceRecipentAddress"
                                    className="form-control border-radius-10 text-primary"
                                    // value={
                                    //     shippingBillingDetails.serviceRecipentAddress
                                    // }
                                    // onChange={(e) => handleShippingDetails(e)}
                                    placeholder="Address"
                                    cols="30"
                                    rows="2"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary w-100"
                    // onClick={handleCreateQuote}
                >
                    Save
                </button>
                <button
                    className="btn btn-border-primary w-100"
                    onClick={hideModal}
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomerOrderAddress;

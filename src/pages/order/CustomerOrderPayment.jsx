import React from "react";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { FONT_STYLE_SELECT } from "pages/Common/constants";

// Price Tab >> Billing
const paymentTermsOptions = [
    { label: "Immediate", value: "IMMEDIATE" },
    { label: "90 Days", value: "NINTY_DAYS" },
    { label: "60 Days", value: "SIXTY_DAYS" },
    { label: "30 Days", value: "THIRTY_DAYS" },
];

const CustomerOrderPayment = ({
    show,
    hideModal,
    currencyOptions,
    billingTypeOptions,
    billingFrequencyOptions,
}) => {
    return (
        <Modal show={show} size="md">
            <Modal.Header>
                <Modal.Title>Order Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row input-fields">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                PAYMENT TERMS
                            </label>
                            <Select
                                // onChange={(e) => {
                                //   setShippingBillingDetails({
                                //     ...shippingBillingDetails,
                                //     deliveryType: e,
                                //   });
                                // }}
                                // value={shippingBillingDetails.deliveryType}
                                options={paymentTermsOptions}
                                placeholder="Select..."
                                styles={FONT_STYLE_SELECT}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                CURRENCY
                            </label>
                            <Select
                                // onChange={(e) => {
                                //   setShippingBillingDetails({
                                //     ...shippingBillingDetails,
                                //     deliveryType: e,
                                //   });
                                // }}
                                // value={shippingBillingDetails.deliveryType}
                                options={currencyOptions}
                                placeholder="Select..."
                                styles={FONT_STYLE_SELECT}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                BILLING TYPE
                            </label>
                            <Select
                                // onChange={(e) => {
                                //   setShippingBillingDetails({
                                //     ...shippingBillingDetails,
                                //     deliveryType: e,
                                //   });
                                // }}
                                // value={shippingBillingDetails.deliveryType}
                                options={billingTypeOptions}
                                placeholder="Select..."
                                styles={FONT_STYLE_SELECT}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                BILLING FREQUENCY
                            </label>
                            <Select
                                // onChange={(e) => {
                                //   setShippingBillingDetails({
                                //     ...shippingBillingDetails,
                                //     deliveryType: e,
                                //   });
                                // }}
                                // value={shippingBillingDetails.deliveryType}
                                options={billingFrequencyOptions}
                                placeholder="Select..."
                                styles={FONT_STYLE_SELECT}
                            />
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

export default CustomerOrderPayment;

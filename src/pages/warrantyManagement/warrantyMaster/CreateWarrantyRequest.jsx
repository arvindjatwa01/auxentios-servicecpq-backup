import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import Select from "react-select";

import { customerSearch } from "services/searchServices";
import { FONT_STYLE_SELECT } from "pages/Common/constants";

import {
    claimRequestObj,
    claimRequestTypeOptions,
} from "../warrantyManagementConstants";
import SearchBox from "pages/Common/SearchBox";
import { isEmptyInput } from "pages/Common/textUtilities";
import { callPostApi } from "services/ApiCaller";
import { CLAIM_MASTER_URL } from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";

const CreateWarrantyRequest = ({
    show,
    hideModal,
    handleSnack,
    setPwaNumber,
    setWarrantyRequestType,
    handleOpenQuestionsModal,
    setClaimRecordId,
    setClaimRecordDetail,
    setAutorizationPreReqObj,
    // handleShowAutorizationModal,
}) => {
    const [recordData, setRecordData] = useState({
        ...claimRequestObj,
        requesterDetails: "",
    });

    const [searchCustResults, setSearchCustResults] = useState([]);
    const [noOptionsCust, setNoOptionsCust] = useState(false);

    // input field text change
    const handleInputTextChange = (e) => {
        const { name, value } = e.target;
        setRecordData({ ...recordData, [name]: value });
    };

    // Search Customer with customer ID
    const handleCustSearch = async (searchCustfieldName, searchText) => {
        setSearchCustResults([]);
        recordData.customerNumber = searchText;
        if (searchText) {
            await customerSearch(searchCustfieldName + "~" + searchText)
                .then((result) => {
                    if (result && result.length > 0) {
                        setSearchCustResults(result);
                        setNoOptionsCust(false);
                    } else {
                        setNoOptionsCust(true);
                    }
                })
                .catch((e) => {
                    handleSnack(
                        "error",
                        "Error occurred while searching the customer!"
                    );
                });
        }
    };

    // Select the customer from search result
    const handleCustSelect = (type, currentItem) => {
        setRecordData({
            ...recordData,
            customerNumber: currentItem.customerId,
            customerName: currentItem.fullName,
            // contactEmail: currentItem.email,
        });
        setSearchCustResults([]);
    };

    //  check input fields validation
    const checkInputValidation = (rObj) => {
        // if (isEmptyInput(rObj.requesterDetails)) {
        //     handleSnack("error", "Please enter Request Details.");
        //     return false;
        // } else
        if (isEmptyInput(rObj.claimType)) {
            handleSnack("error", "Please enter Request type.");
            return false;
        } else if (isEmptyInput(rObj.customerNumber)) {
            handleSnack("error", "Please Search & Select Customer");
            return false;
        } else if (searchCustResults.length !== 0) {
            handleSnack("error", "Please Select a Customer first.");
            return false;
        } else if (noOptionsCust && !rObj.reference) {
            handleSnack("error", "No Customer availble so add reference.");
            return false;
        }
        return true;
    };

    // create Warranty Request
    const handleCreateWarranty = () => {
        const rObj = {
            ...recordData,
            claimType: recordData?.claimType?.value || "",
            claimStatus: "REGISTERED",
            payer: "CUSTOMER",
        };
        if (!checkInputValidation(rObj)) {
            return;
        }

        setAutorizationPreReqObj((pre) => ({
            ...pre,
            requestType: recordData?.claimType,
            customerNumber: recordData?.customerNumber,
            customerName: recordData?.customerName,
        }));

        // callPostApi(null, CLAIM_MASTER_URL, rObj, (response) => {
        //     if (response.status === API_SUCCESS) {
        //         const responseData = response.data;
        //         setClaimRecordDetail({ ...responseData });
        //         setClaimRecordId(responseData.claimId);
        //         // const pwaNumber = `AC${Math.floor(Math.random() * 90000) + 100000}`;
        //         handleSnack(
        //             "success",
        //             `Authorization code ${responseData.authorizationCode} created successfully.`
        //         );
        //         // handleSnack(
        //         //     "success",
        //         //     `Authorization code ${pwaNumber} created successfully.`
        //         // );
        //         setPwaNumber(responseData.authorizationCode);
        //         handleOpenQuestionsModal();
        //     }
        // });
        handleOpenQuestionsModal();
    };

    return (
        <Modal show={show} onHide={hideModal}>
            <Modal.Header className="d-block mb-0 pb-0">
                <Modal.Title className="h4 mb-1">Quick Create</Modal.Title>
                {/* <p>
                    Create a warranty request, For pre authorization codes
                    choose request type as PWA
                </p> */}
            </Modal.Header>
            <Modal.Body>
                {/* <span>PARTNER</span> */}
                <div className="row input-fields mt-1">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                ENTER REQUESTER DETAILS
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="requesterDetails"
                                placeholder="Requester Details"
                                value={recordData.requesterDetails}
                                onChange={handleInputTextChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                WARRANTY REQUEST TYPE
                            </label>
                            <Select
                                onChange={(e) => {
                                    setRecordData({
                                        ...recordData,
                                        claimType: e,
                                    });
                                    setWarrantyRequestType(e);
                                }}
                                options={claimRequestTypeOptions}
                                value={recordData.claimType}
                                styles={FONT_STYLE_SELECT}
                            />
                            <div className="input-info-msg">
                                For request type PWA,GoodWill, and Late Warranty
                                authorization code will be generated.
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                CUSTOMER ID
                            </label>
                            <SearchBox
                                value={recordData.customerNumber}
                                onChange={(e) =>
                                    handleCustSearch(
                                        "customerId",
                                        e.target.value
                                    )
                                }
                                type="customerId"
                                result={searchCustResults}
                                onSelect={handleCustSelect}
                                noOptions={noOptionsCust}
                                placeholder="Customer Search"
                            />
                            <div className="input-info-msg">
                                Search and add Customer ID if not available use
                                reference field.
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <label className="text-light-dark font-size-12 font-weight-500">
                                REFERENCE
                            </label>
                            <input
                                type="text"
                                className="form-control border-radius-10 text-primary"
                                name="reference"
                                // placeholder="if customer is not available in our database"
                                value={recordData.reference}
                                onChange={handleInputTextChange}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-border-primary w-100"
                    onClick={hideModal}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-primary w-100"
                    onClick={handleCreateWarranty}
                >
                    Create
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWarrantyRequest;

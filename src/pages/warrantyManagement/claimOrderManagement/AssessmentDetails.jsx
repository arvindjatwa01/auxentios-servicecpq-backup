import React from "react";

import TextField from "@mui/material/TextField";

import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Select from "react-select";
import Moment from "react-moment";

import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { WARRANTY_ASSESSMENT_MASTER_URL } from "services/CONSTANTS";
import { callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

const AssessmentDetails = (props) => {
    const {
        viewOnlyTab,
        setRequestTab,
        setViewOnlyTab,
        assesstementData,
        setAssesstementData,
        underWarrantyOptions,
        warrantyTypeOptions,
        handleSnack,
        warrantyData,
        setAssesstTabViewOnly,
        assesstTabViewOnly,
        setAssesstmentId,
        assesstmentId,
        claimRecordId,
        warrantyId,
        warrantyTitle,
        claimStatus,
    } = props;

    //Individual assessment field value change
    const handleAssesstementDataChange = (e) => {
        const { name, value } = e.target;
        setAssesstementData({ ...assesstementData, [name]: value });
    };

    // Individual assessment field value change
    const handleAssesstementSelectDataChange = (e, keyName) => {
        setAssesstementData({ ...assesstementData, [keyName]: e });
    };

    // add update assessment
    const handleAddUpdateAssesstment = () => {
        if (assesstTabViewOnly) {
            setRequestTab("evaluation");
            return;
        }
        const reqObj = {
            ...assesstementData,
            machineUnderWarranty:
                assesstementData.machineUnderWarranty?.value || "EMPTY",
            assessmentType: assesstementData.assessmentType?.value || "EMPTY",
            // warrantyEndDate: warrantyEndDate,
        };
        if (assesstmentId) {
            callPutApi(
                null,
                `${WARRANTY_ASSESSMENT_MASTER_URL}/${assesstmentId}`,
                reqObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;
                        setAssesstmentId(responseData.assessmentId);
                        handleSnack(
                            "success",
                            "Warranty Assessment Updated  Successfully"
                        );
                        // setViewOnlyTab({ ...viewOnlyTab, assesstViewOnly: true });
                        setRequestTab("evaluation");
                        setViewOnlyTab({
                            ...viewOnlyTab,
                            assesstViewOnly: true,
                        });
                        setAssesstTabViewOnly(true);
                    } else {
                        handleSnack("error", "Something went wrong.");
                    }
                },
                (error) => {
                    handleSnack("error", "Something went wrong.");
                }
            );
        } else {
            callPostApi(
                null,
                WARRANTY_ASSESSMENT_MASTER_URL,
                {
                    ...reqObj,
                    warrantyId: warrantyId,
                    warrantyTitle: warrantyTitle,
                },
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;
                        setAssesstmentId(responseData.assessmentId);
                        handleSnack(
                            "success",
                            "Warranty Assessment Created Successfully"
                        );
                        // setViewOnlyTab({ ...viewOnlyTab, assesstViewOnly: true });
                        // handleUpdateClaimOrder(
                        //     "assessment",
                        //     responseData["assessmentId"]
                        // );
                        setRequestTab("evaluation");
                        setAssesstTabViewOnly(true);
                        setViewOnlyTab({
                            ...viewOnlyTab,
                            assesstViewOnly: true,
                        });
                    } else {
                        handleSnack("error", "Something went wrong.");
                    }
                },
                (error) => {
                    handleSnack("error", "Something went wrong.");
                }
            );
        }
    };

    return (
        <>
            {assesstTabViewOnly ||
            claimStatus?.value === "CLAIM_SUBMITTED" ||
            claimStatus?.value === "ARCHIVED" ? (
                <>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="WARRANTY ID"
                                // value={assesstementData?.warrantyId}
                                value={warrantyId}
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="WARRANTY TITLE"
                                // value={assesstementData?.warrantyTitle}
                                value={warrantyTitle}
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="WARRANTY REQUEST ID"
                                value={claimRecordId}
                                // label="CLAIM NUMBER"
                                // value={claimRecordData.claimNumber}
                                className="col-md-4 col-sm-4"
                            />
                        </div>
                    </div>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="ASSESSMENT DATE"
                                value={
                                    <Moment format="DD/MM/YYYY">
                                        {assesstementData.assessmentDate}
                                    </Moment>
                                }
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="WARRANTY REQUEST DATE"
                                value={
                                    <Moment format="DD/MM/YYYY">
                                        {assesstementData.warrantyRequestDate}
                                    </Moment>
                                }
                                className="col-md-4 col-sm-4"
                            />
                            <ReadOnlyField
                                label="WARRANTY END DATE"
                                value={
                                    <Moment format="DD/MM/YYYY">
                                        {assesstementData.warrantyEndDate}
                                    </Moment>
                                }
                                className="col-md-4 col-sm-4"
                            />
                        </div>
                    </div>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="IS THE MACHINE OR COMPONENT UNDER WARRANTY?"
                                value={
                                    assesstementData.machineUnderWarranty?.label
                                }
                                className="col-md-6 col-sm-6"
                            />
                            <ReadOnlyField
                                label="WHAT TYPE OF WARRANTY ASSESSMENT IS IT?"
                                value={assesstementData.assessmentType?.label}
                                className="col-md-6 col-sm-6"
                            />
                            <ReadOnlyField
                                label="WHAT IS THE CUSTOMER COMPLAINING ABOUT?"
                                value={assesstementData.complainRow1}
                                className="col-md-12 col-sm-12"
                            />
                            <ReadOnlyField
                                label=""
                                value={assesstementData.complainRow2}
                                className="col-md-12 col-sm-12"
                            />
                            <ReadOnlyField
                                label=""
                                value={assesstementData.complainRow2}
                                className="col-md-12 col-sm-12"
                            />
                        </div>
                    </div>
                    <h5>Assign To</h5>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="FIRST NAME"
                                value={assesstementData.assignToFirstName}
                                className="col-md-6 col-sm-6"
                            />
                            <ReadOnlyField
                                label="LAST NAME"
                                value={assesstementData.assignToLastName}
                                className="col-md-6 col-sm-6"
                            />
                            <ReadOnlyField
                                label="EMAIL"
                                value={assesstementData.assignToEmail}
                                className="col-md-12 col-sm-12"
                            />
                            <ReadOnlyField
                                label="ROLE"
                                value={assesstementData.assignToRole}
                                className="col-md-6 col-sm-6"
                            />
                            <ReadOnlyField
                                label="POSITION"
                                value={assesstementData.assignToPosition}
                                className="col-md-6 col-sm-6"
                            />
                        </div>
                    </div>
                    <div
                        className="row mx-1"
                        style={{
                            justifyContent: "right",
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-light bg-primary text-white"
                            onClick={handleAddUpdateAssesstment}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row input-fields mt-2">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        WARRANTY ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={warrantyId}
                                        // value={assesstementData.warrantyId}
                                        name="warrantyId"
                                        placeholder="Warranty ID"
                                        // onChange={handleAssesstementDataChange}
                                        readOnly={true}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        WARRANTY TITLE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        // value={assesstementData?.warrantyTitle}
                                        value={warrantyTitle}
                                        name="warrantyTitle"
                                        placeholder="Warranty Title"
                                        // onChange={handleAssesstementDataChange}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        {/* CLAIM NUMBER */}
                                        WARRANTY REQUEST ID
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        // value={claimRecordData.claimNumber}
                                        value={claimRecordId}
                                        name="claimNumber"
                                        placeholder="Claim Number"
                                        disabled
                                        // onChange={handleClaimRecordDataChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row input-fields mt-2">
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        <span className=" mr-2">
                                            ASSESSMENT DATE
                                        </span>
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                // maxDate={new Date()}
                                                closeOnSelect
                                                value={
                                                    assesstementData.assessmentDate
                                                }
                                                onChange={(e) =>
                                                    handleAssesstementSelectDataChange(
                                                        e,
                                                        "assessmentDate"
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            style: FONT_STYLE,
                                                        }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        <span className=" mr-2">
                                            WARRANTY REQUEST DATE
                                        </span>
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                // maxDate={new Date()}
                                                closeOnSelect
                                                value={
                                                    assesstementData.warrantyRequestDate
                                                }
                                                onChange={(e) =>
                                                    handleAssesstementSelectDataChange(
                                                        e,
                                                        "warrantyRequestDate"
                                                    )
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            style: FONT_STYLE,
                                                        }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        <span className=" mr-2">
                                            WARRANTY END DATE
                                        </span>
                                    </label>
                                    <div className="align-items-center date-box">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <MobileDatePicker
                                                inputFormat="dd/MM/yyyy"
                                                className="form-controldate border-radius-10"
                                                // maxDate={new Date()}
                                                closeOnSelect
                                                // value={warrantyEndDate}
                                                onChange={(e) => {
                                                    // setWarrantyEndDate(e);
                                                    handleAssesstementSelectDataChange(
                                                        e,
                                                        "warrantyEndDate"
                                                    );
                                                }}
                                                // value={assesstementData.warrantyEndDate}
                                                // onChange={(e) =>
                                                // handleAssesstementSelectDataChange(
                                                //   e,
                                                //   "warrantyEndDate"
                                                // )
                                                // }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                            style: FONT_STYLE,
                                                        }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row input-fields mt-2">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        IS THE MACHINE OR COMPONENT UNDER
                                        WARRANTY?
                                    </label>
                                    <Select
                                        className="text-primary"
                                        options={underWarrantyOptions}
                                        value={
                                            assesstementData.machineUnderWarranty
                                        }
                                        onChange={(e) =>
                                            handleAssesstementSelectDataChange(
                                                e,
                                                "machineUnderWarranty"
                                            )
                                        }
                                        styles={FONT_STYLE_SELECT}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        WHAT TYPE OF WARRANTY ASSESSMENT IS IT?
                                    </label>
                                    <Select
                                        className="text-primary"
                                        options={warrantyTypeOptions}
                                        onChange={(e) =>
                                            handleAssesstementSelectDataChange(
                                                e,
                                                "assessmentType"
                                            )
                                        }
                                        value={assesstementData.assessmentType}
                                        styles={FONT_STYLE_SELECT}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        WHAT IS THE CUSTOMER COMPLAINING ABOUT?
                                    </label>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    assesstementData.complainRow1
                                                }
                                                name="complainRow1"
                                                placeholder="Complaining About the...."
                                                onChange={
                                                    handleAssesstementDataChange
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    assesstementData.complainRow2
                                                }
                                                name="complainRow2"
                                                placeholder="Complaining About the...."
                                                onChange={
                                                    handleAssesstementDataChange
                                                }
                                            />
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 my-2">
                                            <input
                                                type="text"
                                                className="form-control border-radius-10 text-primary"
                                                value={
                                                    assesstementData.complainRow3
                                                }
                                                name="complainRow3"
                                                placeholder="Complaining About the...."
                                                onChange={
                                                    handleAssesstementDataChange
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5>Assign To</h5>
                    <div
                        className="card border px-3 py-2 mb-3"
                        style={{
                            backgroundColor: `${
                                claimStatus?.value === "ARCHIVED"
                                    ? "#f3eafe"
                                    : ""
                            }`,
                        }}
                    >
                        <div className="row input-fields">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        FIRST NAME
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        name="assignToFirstName"
                                        placeholder="First Name"
                                        value={
                                            assesstementData.assignToFirstName
                                        }
                                        onChange={handleAssesstementDataChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        LAST NAME
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        name="assignToLastName"
                                        placeholder="Last Name"
                                        value={
                                            assesstementData.assignToLastName
                                        }
                                        onChange={handleAssesstementDataChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        EMAIL
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        name="assignToEmail"
                                        placeholder="Email"
                                        value={assesstementData.assignToEmail}
                                        onChange={handleAssesstementDataChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        ROLE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        name="assignToRole"
                                        placeholder="Role"
                                        value={assesstementData.assignToRole}
                                        onChange={handleAssesstementDataChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        POSITION
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        name="assignToPosition"
                                        placeholder="Position"
                                        value={
                                            assesstementData.assignToPosition
                                        }
                                        onChange={handleAssesstementDataChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="row mx-1"
                        style={{
                            justifyContent: "right",
                        }}
                    >
                        <button
                            type="button"
                            className="btn btn-light bg-primary text-white"
                            onClick={handleAddUpdateAssesstment}
                        >
                            Save & Next
                        </button>
                    </div>
                </>
            )}
        </>
    );
};

export default AssessmentDetails;

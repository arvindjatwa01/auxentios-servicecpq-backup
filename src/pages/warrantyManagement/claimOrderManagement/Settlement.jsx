import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { TextField } from "@mui/material";

import { MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Moment from "react-moment";

import { isEmpty } from "pages/Common/textUtilities";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { FONT_STYLE } from "pages/Common/constants";
import { SETTLEMENT_VALUE_MASTER_URL } from "services/CONSTANTS";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { customerSearch, machineSearch } from "services/searchServices";
import SolutionQuotePayerGridTable from "pages/components/SolutionQuotePayerGridTable";

const priceTypeOptions = [
    // { label: "Claimed", value: "CLAIMED" },
    { label: "Settled", value: "SETTLED" },
];

const Settlement = (props) => {
    const {
        handleSnack,
        handleBack,
        settlementValueId,
        setSettlementValueId,
        claimOrderId,
        handleViewAndAddNotes,
        claimSettlementRecord,
        setClaimSettlementRecord,
        claimStatus,
    } = props;

    const [addPayerData, setAddPayerData] = useState([]);
    const [quoteIdIs, setQuoteIdIs] = useState(0);
    const [viewOnly, setViewOnly] = useState(false);

    useEffect(() => {
        setClaimSettlementRecord({
            ...claimSettlementRecord,
            type: priceTypeOptions[0],
            claimOrderId: claimOrderId,
        });
    }, []);

    useEffect(() => {
        if (settlementValueId) {
            setViewOnly(true);
            callGetApi(
                `${SETTLEMENT_VALUE_MASTER_URL}/${settlementValueId}`,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;

                        const _type = priceTypeOptions.find(
                            (obj) => obj.value === responseData.type
                        );
                        setClaimSettlementRecord({
                            ...responseData,
                            type: _type || priceTypeOptions[0],
                        });
                    }
                }
            );
        }
    }, [settlementValueId]);

    // input field value chaange
    const handleInputFiledChange = (e) => {
        const { name, value } = e.target;
        setClaimSettlementRecord({ ...claimSettlementRecord, [name]: value });
    };

    // save settlement record
    const handleSaveSettlementData = () => {
        const rUrl = SETTLEMENT_VALUE_MASTER_URL;
        const rObj = {
            ...claimSettlementRecord,
            type:
                claimSettlementRecord.type?.value || priceTypeOptions[0]?.value,
        };
        if (settlementValueId) {
            callPutApi(
                null,
                `${rUrl}/${settlementValueId}`,
                rObj,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;
                        handleSnack(
                            "success",
                            "Settlement updated successfully."
                        );
                    }
                }
            );
        } else {
            callPostApi(null, `${rUrl}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    setSettlementValueId(responseData.settlementValueId);
                    handleSnack("success", "Settlement saved successfully.");
                }
            });
        }
        // handleBack();
    };

    return (
        <>
            <div
                className={`row d-flex justify-content-between align-items-center py-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-2" : ""
                }`}
            >
                <h4 className="mx-3">Settlement</h4>
                <div className="d-flex">
                    {viewOnly && claimStatus?.value !== "ARCHIVED" && (
                        <button
                            className="btn btn-light bg-primary text-white"
                            onClick={() => setViewOnly(false)}
                        >
                            Edit
                        </button>
                    )}
                    <button
                        className="btn btn-light bg-primary text-white mx-3"
                        onClick={handleBack}
                    >
                        <ArrowBackIcon /> Back
                    </button>
                </div>
            </div>
            <div
                className={`card border px-3 py-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-3" : ""
                }`}
                style={{
                    backgroundColor: `${
                        claimStatus?.value === "ARCHIVED" ? "#f3eafe" : ""
                    }`,
                }}
            >
                {viewOnly || claimStatus?.value === "ARCHIVED" ? (
                    <>
                        <div className="row mt-2">
                            <ReadOnlyField
                                label="TYPE"
                                value={claimSettlementRecord.type?.label}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL AMOUNT ALLOWED"
                                value={claimSettlementRecord.totalAmountAllowed}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL HOURS ALLOWED"
                                value={claimSettlementRecord.totalHoursAllowed}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="SETTLEMENT NUMBER"
                                value={claimSettlementRecord.settlementValueId}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="SETTLEMENT DATE"
                                value={
                                    <Moment format="DD/MM/YYYY">
                                        {claimSettlementRecord.settlementDate}
                                    </Moment>
                                }
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL INSURANCE"
                                value={claimSettlementRecord.totalInsurance}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="SERVICE DEDUCATION"
                                value={claimSettlementRecord.serviceDeduction}
                                className="col-md-3 col-sm-3"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row input-fields">
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TYPE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.type?.label
                                        }
                                        name={"type"}
                                        disabled
                                        // onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TOTAL AMOUNT ALLOWED
                                    </label>
                                    <div
                                        className="d-flex form-control-date"
                                        style={{
                                            overflow: "hidden",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                            value={
                                                claimSettlementRecord.totalAmountAllowed
                                            }
                                            name={"totalAmountAllowed"}
                                            onChange={handleInputFiledChange}
                                        />
                                        <span className="hours-div text-primary">
                                            AUD
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TOTAL HOURS ALLOWED
                                    </label>
                                    <div
                                        className="d-flex form-control-date"
                                        style={{
                                            overflow: "hidden",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                            value={
                                                claimSettlementRecord.totalHoursAllowed
                                            }
                                            name={"totalHoursAllowed"}
                                            onChange={handleInputFiledChange}
                                        />
                                        <span className="hours-div text-primary">
                                            Hr
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        SETTLEMENT NUMBER
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        disabled
                                        value={
                                            claimSettlementRecord.settlementValueId
                                        }
                                        name={"settlementValueId"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        SETTLEMENT DATE
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
                                                    claimSettlementRecord.settlementDate
                                                }
                                                onChange={(e) =>
                                                    setClaimSettlementRecord({
                                                        ...claimSettlementRecord,
                                                        settlementDate: e,
                                                    })
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
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TOTAL INSURANCE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.totalInsurance
                                        }
                                        name={"totalInsurance"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        SERVICE DEDUCATION
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.serviceDeduction
                                        }
                                        name={"serviceDeduction"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <h5 className="mb-2 mt-2">Expense Approval</h5>
                <hr className="mt-0" />
                {viewOnly ? (
                    <>
                        <div className="row mt-2">
                            <ReadOnlyField
                                label="TOTAL PARTS ALLOWED"
                                value={claimSettlementRecord.totalPartsAllowed}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL LABOUR ALLOWED"
                                value={claimSettlementRecord.totalLaborAllowed}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="VEHICLE KM ALLOWED"
                                value={claimSettlementRecord.vehicleKMAllowed}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TRAVEL ALLOWED"
                                value={claimSettlementRecord.travelAllowed}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="MISC. ALLOWED"
                                value={claimSettlementRecord.miscAllowed}
                                className="col-md-3 col-sm-3"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="row input-fields mt-2">
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TOTAL PARTS ALLOWED
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.totalPartsAllowed
                                        }
                                        name={"totalPartsAllowed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TOTAL LABOUR ALLOWED
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.totalLaborAllowed
                                        }
                                        name={"totalLaborAllowed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        VEHICLE KM ALLOWED
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.vehicleKMAllowed
                                        }
                                        name={"vehicleKMAllowed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        TRAVEL ALLOWED
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.travelAllowed
                                        }
                                        name={"travelAllowed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500">
                                        MISC. ALLOWED
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimSettlementRecord.miscAllowed
                                        }
                                        name={"miscAllowed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div
                className={`mt-3 mb-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-3" : ""
                }`}
            >
                <SolutionQuotePayerGridTable
                    handleSnack={handleSnack}
                    dataRows={addPayerData}
                    quoteId={quoteIdIs}
                    claimOrderId={claimOrderId}
                />
            </div>
            <div
                className={`row mb-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-3" : "mx-0"
                }`}
                style={{ justifyContent: "right" }}
            >
                <button
                    type="button"
                    className="btn btn-ligh save the parts hours datat bg-primary text-white mx-0"
                    onClick={() => handleViewAndAddNotes("addNotes")}
                >
                    View & Add Notes
                </button>
            </div>
        </>
    );
};

export default Settlement;

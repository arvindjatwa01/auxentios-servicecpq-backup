import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Select from "react-select";

import { isEmpty } from "pages/Common/textUtilities";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { FONT_STYLE_SELECT } from "pages/Common/constants";
import { CLAIM_VALUE_MASTER_URL } from "services/CONSTANTS";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

// const priceTypeOptions = [
//     { label: "Claimed", value: "CLAIMED" },
//     { label: "Settled", value: "SETTLED" },
// ];

// const coverageTypeOptions = [
//     { label: "All Covered", value: "CT_04" },
//     { label: "Parts & Labour", value: "CT_01" },
//     { label: "Only Parts", value: "CT_02" },
//     { label: "Part & Labour & Misc.", value: "CT_03" },
// ];

const currencyOption = [
    { label: "GBP", value: "GBP" },
    { label: "AUD", value: "AUD" },
    { label: "EUR", value: "EUR" },
    { label: "USD", value: "USD" },
    { label: "INR", value: "INR" },
];

const AdjustClaimValue = (props) => {
    const {
        handleSnack,
        handleBack,
        claimValueId,
        setClaimValueId,
        claimOrderId,
        relatedPartsRecords = [],
        setCoverageTypeValue,
        handleViewSettlement,
        claimValueRecordData,
        setClaimValueRecordData,
        handleUpdateClaimOrder,
        setClaimStatus,
        claimStatus,
        coverageTypeOptions,
        priceTypeOptions,
    } = props;

    const [viewOnly, setViewOnly] = useState(false);
    const [currency, setCurrency] = useState(currencyOption[1]);

    useEffect(() => {
        if (claimValueId) {
            setViewOnly(true);
            callGetApi(
                `${CLAIM_VALUE_MASTER_URL}/${claimValueId}`,
                (response) => {
                    if (response.status === API_SUCCESS) {
                        const responseData = response.data;

                        // type
                        const _type = priceTypeOptions.find(
                            (obj) => obj.value === responseData.type
                        );

                        // coverage type
                        const _coverageType = coverageTypeOptions.find(
                            (obj) => obj.value === responseData.coverageType
                        );

                        setClaimValueRecordData({
                            ...responseData,
                            type: _type || priceTypeOptions[0],
                            coverageType:
                                _coverageType || coverageTypeOptions[0],
                        });
                    }
                }
            );
        }
    }, [claimValueId]);

    // get price data in decimal
    const getFlotingValue = (value) => {
        if (value) {
            let priceValue = parseFloat(Number(value));
            const priceWitDecimal = priceValue.toFixed(2);
            return priceWitDecimal;
        }
        return "";
    };

    // change value of input fields
    const handleInputFiledChange = (e) => {
        const { name, value } = e.target;
        setClaimValueRecordData({ ...claimValueRecordData, [name]: value });
    };

    // save claim values
    const handleSave = () => {
        const rUrl = CLAIM_VALUE_MASTER_URL;

        const _totalAmountClaimed =
            claimValueRecordData.coverageType?.value === "CT_02"
                ? parseFloat(claimValueRecordData.totalPartsClaimed || 0)
                : claimValueRecordData.coverageType?.value === "CT_01"
                ? parseFloat(
                      parseFloat(claimValueRecordData.totalPartsClaimed || 0) +
                          parseFloat(
                              claimValueRecordData.totalHoursClaimed || 0
                          ) +
                          parseFloat(
                              claimValueRecordData.totalLaborAmountClaimed || 0
                          )
                  )
                : claimValueRecordData.coverageType?.value === "CT_03"
                ? parseFloat(
                      parseFloat(claimValueRecordData.totalPartsClaimed || 0) +
                          parseFloat(
                              claimValueRecordData.totalHoursClaimed || 0
                          ) +
                          parseFloat(
                              claimValueRecordData.totalLaborAmountClaimed || 0
                          ) +
                          parseFloat(claimValueRecordData.miscClaimed)
                  )
                : claimValueRecordData.coverageType?.value === "CT_04"
                ? parseFloat(
                      parseFloat(claimValueRecordData.totalPartsClaimed || 0) +
                          parseFloat(
                              claimValueRecordData.totalHoursClaimed || 0
                          ) +
                          parseFloat(
                              claimValueRecordData.totalLaborAmountClaimed || 0
                          ) +
                          parseFloat(claimValueRecordData.miscClaimed || 0) +
                          parseFloat(claimValueRecordData.travelClaimed || 0) +
                          parseFloat(claimValueRecordData.vehicleKMClaimed || 0)
                  )
                : 0;
        const rObj = {
            ...claimValueRecordData,
            coverageType:
                claimValueRecordData.coverageType?.value ||
                coverageTypeOptions[0]?.value ||
                "",

            totalPartsClaimed: parseFloat(
                claimValueRecordData.totalPartsClaimed || 0
            ),
            type:
                claimValueRecordData.type?.value ||
                priceTypeOptions[0]?.value ||
                "",
            totalAmountClaimed: Number(_totalAmountClaimed),
        };

        if (claimValueId) {
            callPutApi(null, `${rUrl}/${claimValueId}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    setClaimStatus({
                        label: "Submitted",
                        value: "CLAIM_SUBMITTED",
                    });
                    setViewOnly(true);
                    handleSnack("success", "Claim Value Updated Successfully.");
                } else {
                }
            });
        } else {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    setClaimValueId(responseData.claimValueId);
                    setViewOnly(true);
                    setClaimStatus({
                        label: "Submitted",
                        value: "CLAIM_SUBMITTED",
                    });
                    handleUpdateClaimOrder({
                        claimOrderStatus: "CLAIM_SUBMITTED",
                        claimValueId: responseData.claimValueId,
                    });
                    handleSnack("success", "Claim Value Created Successfully.");
                } else {
                }
            });
        }
    };

    const handleValidateClaim = () => {
        handleSnack("success", "the claim prices are validated successfully");
    };
    return (
        <>
            <div
                className={`row d-flex justify-content-between align-items-center py-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-2" : ""
                }`}
            >
                <h4 className="mx-3">Adjust Claim Value</h4>
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
                className={`card border px-3 py-2 mb-2 ${
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
                        <div className="row mt-3">
                            <ReadOnlyField
                                label="TYPE"
                                value={claimValueRecordData.type?.label}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="COVERAGE TYPE"
                                value={claimValueRecordData.coverageType?.label}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="CURRENCY"
                                value={currency?.label}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL AMOUNT CLAIMED"
                                value={getFlotingValue(
                                    claimValueRecordData.totalAmountClaimed
                                )}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL PARTS CLAIMED"
                                value={getFlotingValue(
                                    claimValueRecordData.totalPartsClaimed
                                )}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL HOURS CLAIMED"
                                value={getFlotingValue(
                                    claimValueRecordData.totalHoursClaimed
                                )}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TOTAL LABOUR AMOUNT CLAIMED"
                                value={getFlotingValue(
                                    claimValueRecordData.totalLaborAmountClaimed
                                )}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="TRAVEL CLAIMED"
                                value={getFlotingValue(
                                    claimValueRecordData.travelClaimed
                                )}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="MISC. CLAIMED"
                                value={getFlotingValue(
                                    claimValueRecordData.miscClaimed
                                )}
                                className="col-md-3 col-sm-3"
                            />
                            <ReadOnlyField
                                label="VEHICLE KM CLAIMED"
                                value={getFlotingValue(
                                    claimValueRecordData.vehicleKMClaimed
                                )}
                                className="col-md-3 col-sm-3"
                            />
                        </div>
                    </>
                ) : (
                    <div className="row input-fields mt-2">
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    TYPE
                                </label>
                                <input
                                    type="text"
                                    className="form-control border-radius-10 text-primary"
                                    value={claimValueRecordData.type?.label}
                                    name={"type"}
                                    disabled
                                    // onChange={handleInputFiledChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    COVERAGE TYPE
                                </label>
                                <Select
                                    onChange={(e) => {
                                        setClaimValueRecordData({
                                            ...claimValueRecordData,
                                            coverageType: e,
                                        });
                                        setCoverageTypeValue(e);
                                    }}
                                    options={coverageTypeOptions}
                                    value={claimValueRecordData.coverageType}
                                    styles={FONT_STYLE_SELECT}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    CURRENCY
                                </label>
                                <Select
                                    onChange={(e) => setCurrency(e)}
                                    options={currencyOption}
                                    value={currency}
                                    styles={FONT_STYLE_SELECT}
                                />
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    TOTAL AMOUNT CLAIMED
                                </label>
                                <div
                                    className="d-flex form-control-date"
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <input
                                        type="number"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        value={getFlotingValue(
                                            claimValueRecordData.coverageType
                                                ?.value === "CT_02"
                                                ? parseFloat(
                                                      claimValueRecordData.totalPartsClaimed ||
                                                          0
                                                  )
                                                : claimValueRecordData
                                                      .coverageType?.value ===
                                                  "CT_01"
                                                ? parseFloat(
                                                      claimValueRecordData.totalPartsClaimed ||
                                                          0
                                                  ) +
                                                  //   parseFloat(
                                                  //       claimValueRecordData.totalHoursClaimed ||
                                                  //           0
                                                  //   ) +
                                                  parseFloat(
                                                      claimValueRecordData.totalLaborAmountClaimed ||
                                                          0
                                                  )
                                                : claimValueRecordData
                                                      .coverageType?.value ===
                                                  "CT_03"
                                                ? parseFloat(
                                                      claimValueRecordData.totalPartsClaimed ||
                                                          0
                                                  ) +
                                                  //   parseFloat(
                                                  //       claimValueRecordData.totalHoursClaimed ||
                                                  //           0
                                                  //   ) +
                                                  parseFloat(
                                                      claimValueRecordData.totalLaborAmountClaimed ||
                                                          0
                                                  ) +
                                                  parseFloat(
                                                      claimValueRecordData.miscClaimed ||
                                                          0
                                                  )
                                                : claimValueRecordData
                                                      .coverageType?.value ===
                                                  "CT_04"
                                                ? parseFloat(
                                                      claimValueRecordData.totalPartsClaimed ||
                                                          0
                                                  ) +
                                                  //   parseFloat(
                                                  //       claimValueRecordData.totalHoursClaimed ||
                                                  //           0
                                                  //   ) +
                                                  parseFloat(
                                                      claimValueRecordData.totalLaborAmountClaimed ||
                                                          0
                                                  ) +
                                                  parseFloat(
                                                      claimValueRecordData.miscClaimed ||
                                                          0
                                                  ) +
                                                  parseFloat(
                                                      claimValueRecordData.travelClaimed ||
                                                          0
                                                      //   ) +
                                                      //   parseFloat(
                                                      //       claimValueRecordData.vehicleKMClaimed ||
                                                      //           0
                                                  )
                                                : 0
                                        )}
                                        name={"totalAmountClaimed"}
                                        onChange={handleInputFiledChange}
                                        disabled={true}
                                    />
                                    <span className="hours-div text-primary">
                                        {currency?.label || "Select Currency"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    TOTAL PARTS CLAIMED
                                </label>
                                <div
                                    className="d-flex form-control-date"
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <input
                                        type="number"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        value={getFlotingValue(
                                            claimValueRecordData.totalPartsClaimed
                                        )}
                                        name={"totalPartsClaimed"}
                                        onChange={handleInputFiledChange}
                                        disabled={true}
                                    />
                                    <span className="hours-div text-primary">
                                        {currency?.label || "Select Currency"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    TOTAL HOURS CLAIMED
                                </label>
                                <div
                                    className="d-flex form-control-date"
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <input
                                        type="number"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        value={
                                            claimValueRecordData.totalHoursClaimed
                                        }
                                        name={"totalHoursClaimed"}
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
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    TOTAL LABOUR AMOUNT CLAIMED
                                </label>
                                <div
                                    className="d-flex form-control-date"
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <input
                                        type="number"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        value={
                                            claimValueRecordData.totalLaborAmountClaimed
                                        }
                                        name={"totalLaborAmountClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                    <span className="hours-div text-primary">
                                        {currency?.label || "Select Currency"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    TRAVEL CLAIMED
                                </label>
                                <div
                                    className="d-flex form-control-date"
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <input
                                        type="number"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        value={
                                            claimValueRecordData.travelClaimed
                                        }
                                        name={"travelClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                    <span className="hours-div text-primary">
                                        {currency?.label || "Select Currency"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    MISC. CLAIMED
                                </label>
                                <div
                                    className="d-flex form-control-date"
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <input
                                        type="number"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        value={claimValueRecordData.miscClaimed}
                                        name={"miscClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                    <span className="hours-div text-primary">
                                        {currency?.label || "Select Currency"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3">
                            <div className="form-group">
                                <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                    VEHICLE KM CLAIMED
                                </label>
                                <div
                                    className="d-flex form-control-date"
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <input
                                        type="number"
                                        className="form-control rounded-top-left-0 rounded-bottom-left-0 text-primary"
                                        value={
                                            claimValueRecordData.vehicleKMClaimed
                                        }
                                        name={"vehicleKMClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                    <span className="hours-div text-primary">
                                        Km
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div
                className={`row mb-2 ${
                    claimStatus?.value === "ARCHIVED" ? "mx-3" : "mx-0"
                }`}
                style={{ justifyContent: "right" }}
            >
                {viewOnly || claimStatus?.value === "ARCHIVED" ? (
                    <button
                        type="button"
                        className="btn btn-light bg-primary text-white mr-1"
                        onClick={() => handleViewSettlement("settlement")}
                        disabled={
                            claimStatus?.value === "SETTLED" ||
                            claimStatus?.value === "CONTESTED"
                        }
                    >
                        View Settlement
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className="btn btn-light bg-primary text-white mx-2"
                            onClick={handleValidateClaim}
                        >
                            Validate Claim
                        </button>
                        <button
                            type="button"
                            className="btn btn-border-primary"
                            onClick={handleSave}
                        >
                            Submit
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default AdjustClaimValue;

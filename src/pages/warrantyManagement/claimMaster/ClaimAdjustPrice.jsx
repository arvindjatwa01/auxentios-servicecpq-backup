import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Select from "react-select";
import { FONT_STYLE_SELECT } from "pages/Common/constants";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { claimValueRequestObj } from "../warrantyManagementConstants";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { CLAIM_VALUE_MASTER_URL } from "services/CONSTANTS";
import { isEmpty } from "pages/Common/textUtilities";

const priceTypeOptions = [
    { label: "Claimed", value: "CLAIMED" },
    { label: "Settled", value: "SETTLED" },
];

const coverageTypeOptions = [
    { label: "All Covered", value: "CT_04" },
    { label: "Parts & Labour", value: "CT_01" },
    { label: "Only Parts", value: "CT_02" },
    { label: "Part & Labour & Misc.", value: "CT_03" },
];

const currencyOption = [
    { label: "GBP", value: "GBP" },
    { label: "AUD", value: "AUD" },
    { label: "EUR", value: "EUR" },
    { label: "USD", value: "USD" },
    { label: "INR", value: "INR" },
];

const ClaimAdjustPrice = ({
    handleSnack,
    handleBack,
    claimValueId,
    setClaimValueId,
    claimOrderId,
    relatedPartsRecords = [],
    setCoverageTypeValue,
    handleViewSettlement,
}) => {
    const [claimValurRecordData, setClaimValurRecordData] = useState({
        ...claimValueRequestObj,
        claimOrderId: claimOrderId,
        totalPartsClaimed: relatedPartsRecords
            .reduce((total, item) => total + item.totalPrice * item.quantity, 0)
            .toFixed(2),
        coverageType: coverageTypeOptions[0],
        type: priceTypeOptions[0],
    });
    const [editPriceData, setEditPriceData] = useState(false);
    const [currency, setCurrency] = useState("");

    useEffect(() => {
        if (claimValueId) {
            setEditPriceData(true);
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

                        setClaimValurRecordData({
                            ...responseData,
                            type: _type || priceTypeOptions[0],
                            coverageType:
                                _coverageType || coverageTypeOptions[0],
                        });
                    } else {
                    }
                }
            );
        }
    }, [claimValueId]);

    // change value of input fields
    const handleInputFiledChange = (e) => {
        const { name, value } = e.target;
        setClaimValurRecordData({ ...claimValurRecordData, [name]: value });
    };

    const handleSave = () => {
        const rUrl = CLAIM_VALUE_MASTER_URL;

        const _totalAmountClaimed =
            claimValurRecordData.coverageType?.value === "CT_02"
                ? parseFloat(claimValurRecordData.totalPartsClaimed || 0)
                : claimValurRecordData.coverageType?.value === "CT_01"
                ? parseFloat(
                      parseFloat(claimValurRecordData.totalPartsClaimed || 0) +
                          parseFloat(
                              claimValurRecordData.totalHoursClaimed || 0
                          ) +
                          parseFloat(
                              claimValurRecordData.totalLaborAmountClaimed || 0
                          )
                  )
                : claimValurRecordData.coverageType?.value === "CT_03"
                ? parseFloat(
                      parseFloat(claimValurRecordData.totalPartsClaimed || 0) +
                          parseFloat(
                              claimValurRecordData.totalHoursClaimed || 0
                          ) +
                          parseFloat(
                              claimValurRecordData.totalLaborAmountClaimed || 0
                          ) +
                          parseFloat(claimValurRecordData.miscClaimed)
                  )
                : claimValurRecordData.coverageType?.value === "CT_04"
                ? parseFloat(
                      parseFloat(claimValurRecordData.totalPartsClaimed || 0) +
                          parseFloat(
                              claimValurRecordData.totalHoursClaimed || 0
                          ) +
                          parseFloat(
                              claimValurRecordData.totalLaborAmountClaimed || 0
                          ) +
                          parseFloat(claimValurRecordData.miscClaimed || 0) +
                          parseFloat(claimValurRecordData.travelClaimed || 0) +
                          parseFloat(claimValurRecordData.vehicleKMClaimed || 0)
                  )
                : 0;
        const rObj = {
            ...claimValurRecordData,
            coverageType:
                claimValurRecordData.coverageType?.value ||
                coverageTypeOptions[0]?.value ||
                "",
            type:
                claimValurRecordData.type?.value ||
                priceTypeOptions[0]?.value ||
                "",
            totalAmountClaimed: Number(_totalAmountClaimed),
        };
        if (claimValueId) {
            callPutApi(null, `${rUrl}/${claimValueId}`, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    setEditPriceData(true);
                    handleSnack("success", "Claim Value Updated Successfully.");
                } else {
                }
            });
        } else {
            callPostApi(null, rUrl, rObj, (response) => {
                if (response.status === API_SUCCESS) {
                    const responseData = response.data;
                    setEditPriceData(true);
                    setClaimValueId(responseData.claimValueId);
                    handleSnack("success", "Claim Value Created Successfully.");
                } else {
                }
            });
        }
        // handleBack();
    };

    return (
        <>
            <div className="row d-flex justify-content-between align-items-center py-2 ">
                <h4 className="mx-3">Adjust Claim Value</h4>
                <div className="d-flex">
                    {!isEmpty(claimValueId) && (
                        <button
                            className="btn btn-light bg-primary text-white"
                            onClick={() => setEditPriceData(false)}
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
            <div className="card border px-3 py-3 mb-2">
                {!editPriceData ? (
                    <>
                        <div className="row input-fields mt-2">
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        TYPE
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-radius-10 text-primary"
                                        disabled
                                        value={claimValurRecordData.type?.label}
                                        name={"type"}
                                        // onChange={handleInputFiledChange}
                                    />
                                    {/* <Select
                                        onChange={(e) =>
                                            setClaimValurRecordData({
                                                ...claimValurRecordData,
                                                type: e,
                                            })
                                        }
                                        options={priceTypeOptions}
                                        value={claimValurRecordData.type}
                                        styles={FONT_STYLE_SELECT}
                                        isDisabled
                                    /> */}
                                    {/* <div className="css-w8dmq8">*Mandatory</div> */}
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        COVERAGE TYPE
                                    </label>
                                    <Select
                                        onChange={(e) => {
                                            setClaimValurRecordData({
                                                ...claimValurRecordData,
                                                coverageType: e,
                                            });
                                            setCoverageTypeValue(e);
                                        }}
                                        options={coverageTypeOptions}
                                        value={
                                            claimValurRecordData.coverageType
                                        }
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
                                    <input
                                        type="number"
                                        className="form-control border-radius-10 text-primary"
                                        // value={claimValurRecordData.totalAmountClaimed}
                                        value={(claimValurRecordData
                                            .coverageType?.value === "CT_02"
                                            ? parseFloat(
                                                  claimValurRecordData.totalPartsClaimed ||
                                                      0
                                              )
                                            : claimValurRecordData.coverageType
                                                  ?.value === "CT_01"
                                            ? parseFloat(
                                                  claimValurRecordData.totalPartsClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.totalHoursClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.totalLaborAmountClaimed ||
                                                      0
                                              )
                                            : claimValurRecordData.coverageType
                                                  ?.value === "CT_03"
                                            ? parseFloat(
                                                  claimValurRecordData.totalPartsClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.totalHoursClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.totalLaborAmountClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.miscClaimed ||
                                                      0
                                              )
                                            : claimValurRecordData.coverageType
                                                  ?.value === "CT_04"
                                            ? parseFloat(
                                                  claimValurRecordData.totalPartsClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.totalHoursClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.totalLaborAmountClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.miscClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.travelClaimed ||
                                                      0
                                              ) +
                                              parseFloat(
                                                  claimValurRecordData.vehicleKMClaimed ||
                                                      0
                                              )
                                            : 0
                                        ).toFixed(2)}
                                        name={"totalAmountClaimed"}
                                        onChange={handleInputFiledChange}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        TOTAL PARTS CLAIMED
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimValurRecordData.totalPartsClaimed
                                        }
                                        name={"totalPartsClaimed"}
                                        onChange={handleInputFiledChange}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        TOTAL HOURS CLAIMED
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimValurRecordData.totalHoursClaimed
                                        }
                                        name={"totalHoursClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        TOTAL LABOUR AMOUNT CLAIMED
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimValurRecordData.totalLaborAmountClaimed
                                        }
                                        name={"totalLaborAmountClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        TRAVEL CLAIMED
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimValurRecordData.travelClaimed
                                        }
                                        name={"travelClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        MISC. CLAIMED
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control border-radius-10 text-primary"
                                        value={claimValurRecordData.miscClaimed}
                                        name={"miscClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-3">
                                <div className="form-group">
                                    <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                                        VEHICLE KM CLAIMED
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control border-radius-10 text-primary"
                                        value={
                                            claimValurRecordData.vehicleKMClaimed
                                        }
                                        name={"vehicleKMClaimed"}
                                        onChange={handleInputFiledChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="row mt-3">
                        <ReadOnlyField
                            label="TYPE"
                            value={claimValurRecordData.type?.label}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="COVERAGE TYPE"
                            value={claimValurRecordData.coverageType?.label}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="CURRENCY"
                            value={currency?.label}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="TOTAL AMOUNT CLAIMED"
                            value={claimValurRecordData.totalAmountClaimed}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="TOTAL PARTS CLAIMED"
                            value={claimValurRecordData.totalPartsClaimed}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="TOTAL HOURS CLAIMED"
                            value={claimValurRecordData.totalHoursClaimed}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="TOTAL LABOUR AMOUNT CLAIMED"
                            value={claimValurRecordData.totalLaborAmountClaimed}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="TRAVEL CLAIMED"
                            value={claimValurRecordData.travelClaimed}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="MISC. CLAIMED"
                            value={claimValurRecordData.miscClaimed}
                            className="col-md-3 col-sm-3"
                        />
                        <ReadOnlyField
                            label="VEHICLE KM CLAIMED"
                            value={claimValurRecordData.vehicleKMClaimed}
                            className="col-md-3 col-sm-3"
                        />
                    </div>
                )}
            </div>
            <div className="row mb-3 mx-0" style={{ justifyContent: "right" }}>
                {editPriceData ? (
                    <button
                        type="button"
                        className="btn btn-light bg-primary text-white mr-1"
                        onClick={() => handleViewSettlement("splitPrice")}
                    >
                        View Settlement
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-light bg-primary text-white"
                        onClick={handleSave}
                    >
                        Validate Claim
                    </button>
                )}
            </div>
        </>
    );
};

export default ClaimAdjustPrice;

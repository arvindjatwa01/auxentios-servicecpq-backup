import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Select from "react-select";
import { FONT_STYLE_SELECT } from "pages/Common/constants";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import { claimValueRequestObj } from "../warrantyManagementConstants";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { CLAIM_VALUE_MASTER_URL } from "services/CONSTANTS";

const priceTypeOptions = [
  { label: "Claimed", value: "CLAIMED" },
  { label: "Settled", value: "SETTLED" },
];

const ClaimAdjustPrice = ({
  handleSnack,
  handleBack,
  claimValueId,
  setClaimValueId,
  claimOrderId,
}) => {
  const [claimValurRecordData, setClaimValurRecordData] = useState({
    ...claimValueRequestObj,
    claimOrderId: claimOrderId,
  });
  const [editPriceData, setEditPriceData] = useState(false);

  useEffect(() => {
    if (claimValueId) {
      setEditPriceData(true);
      callGetApi(
        null,
        `${CLAIM_VALUE_MASTER_URL}/${claimValueId}`,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            const _type = priceTypeOptions.find(
              (obj) => obj.value === responseData.type
            );
            setClaimValurRecordData({
              ...responseData,
              type: _type || priceTypeOptions[0],
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
    const rObj = {
      ...claimValurRecordData,
      type:
        claimValurRecordData.type?.value || priceTypeOptions[0]?.value || "",
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
          {claimValueId && (
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
                  <Select
                    onChange={(e) =>
                      setClaimValurRecordData({
                        ...claimValurRecordData,
                        type: e,
                      })
                    }
                    options={priceTypeOptions}
                    value={claimValurRecordData.type}
                    styles={FONT_STYLE_SELECT}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                    TOTAL AMOUNT CLAIMED
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimValurRecordData.totalAmountClaimed}
                    name={"totalAmountClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                    TOTAL PARTS CLAIMED
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimValurRecordData.totalPartsClaimed}
                    name={"totalPartsClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-3 col-sm-3">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500 text-uppercase">
                    TOTAL HOURS CLAIMED
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimValurRecordData.totalHoursClaimed}
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
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimValurRecordData.totalLaborAmountClaimed}
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
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimValurRecordData.travelClaimed}
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
                    type="text"
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
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={claimValurRecordData.vehicleKMClaimed}
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
        <button
          type="button"
          className="btn btn-light bg-primary text-white mr-1"
          onClick={handleBack}
        >
          Close
        </button>
        {!editPriceData && (
          <button
            type="button"
            className="btn btn-light bg-primary text-white"
            onClick={handleSave}
          >
            Save & Close
          </button>
        )}
      </div>
    </>
  );
};

export default ClaimAdjustPrice;

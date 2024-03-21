import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";

import Select from "react-select";

import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Common/constants";
import { claimRelatedHERequestObj } from "../warrantyManagementConstants";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";
import { RELATED_HOURS_EXPENSES_MASTER_URL } from "services/CONSTANTS";
import { ReadOnlyField } from "pages/Common/ReadOnlyField";
import Moment from "react-moment";

const typeOptions = [
  { label: "OEM", value: "OEM" },
  { label: "Supplier", value: "SUPPLIER" },
  { label: "Dealer", value: "DEALER" },
  { label: "Channel Partner", value: "CHANNEL_PARTNER" },
];

const climentOpt = [{ label: "Partner", value: "CHANNEL_PARTNER" }];

const codeOptions = [
  // { label: "User-defined", value: "USER_DEFINED" },
  // { label: "Auto-derived", value: "AUTO_DERIVED" },
  { label: "User-defined", value: "USER_DRIVED" },
  { label: "Auto-derived", value: "AUTO_DERIVED" },
];

const coverageTypeOptions = [
  // { label: "Parts & Labour", value: "PARTS_AND_LABOUR" },
  // { label: "Only Parts", value: "ONLY_PARTS" },
  // { label: "Part & Labour & Misc.", value: "PART_AND_LABOUR_AND_MISC" },
  // { label: "All Covered", value: "ALL_COVERED" },

  { label: "Parts & Labour", value: "CT_01" },
  { label: "Only Parts", value: "CT_02" },
  { label: "Part & Labour & Misc.", value: "CT_03" },
  { label: "All Covered", value: "CT_04" },

  // { label: "CT 01", value: "CT_01" },
  // { label: "CT 02", value: "CT_02" },
  // { label: "CT 03", value: "CT_03" },
  // { label: "CT 04", value: "CT_04" },
];

const ClaimRelatedHoursAndExpenses = ({
  handleBack,
  handleSnack,
  relatedHEId,
  setRelatedHEId,
  claimOrderId,
  claimNumber,
}) => {
  const [claimRelateHERecordData, setClaimRelateHERecordData] = useState({
    ...claimRelatedHERequestObj,
    type: climentOpt[0],
    name: "KOOLAN IRON ORE PTY LTD",
    claimOrderId: claimOrderId,
  });

  const [viewOnly, setViewOnly] = useState(false);

  useEffect(() => {
    if (relatedHEId) {
      setViewOnly(true);
      callGetApi(
        null,
        `${RELATED_HOURS_EXPENSES_MASTER_URL}/${relatedHEId}`,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;

            // set code value
            const _code = codeOptions.find(
              (obj) => obj.value === responseData.code
            );

            // set alternate code value
            const _alternateCode = codeOptions.find(
              (obj) => obj.value === responseData.alternateCode
            );

            // set alternate code value
            const _coverageType = coverageTypeOptions.find(
              (obj) => obj.value === responseData.coverageType
            );

            setClaimRelateHERecordData({
              ...responseData,
              type: climentOpt[0],
              code: _code || "",
              alternateCode: _alternateCode || "",
              coverageType: _coverageType || "",
            });
          }
        }
      );
    }
  }, [relatedHEId]);

  // input fields value change
  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setClaimRelateHERecordData({ ...claimRelateHERecordData, [name]: value });
  };

  // select fields value change
  const handleSelectFiledChange = (e, keyName) => {
    setClaimRelateHERecordData({ ...claimRelateHERecordData, [keyName]: e });
  };

  // save the parts hours data
  const handleSavePartHoursData = () => {
    const rUrl = RELATED_HOURS_EXPENSES_MASTER_URL;
    const rObj = {
      ...claimRelateHERecordData,
      type: claimRelateHERecordData.type?.value || "CHANNEL_PARTNER",
      code: claimRelateHERecordData.code?.value || "USER_DRIVED",
      alternateCode:
        claimRelateHERecordData.alternateCode?.value || "USER_DRIVED",
      coverageType: claimRelateHERecordData.coverageType?.value || "CT_04",
    };
    if (relatedHEId) {
      callPutApi(null, `${rUrl}/${relatedHEId}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          handleSnack(
            "success",
            "Related Hours & Expenses updated successfully"
          );
          setViewOnly(true);
        } else {
          handleSnack("info", "Related Hours & Expenses updation failed.");
        }
      });
    } else {
      callPostApi(null, `${rUrl}`, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          handleSnack(
            "success",
            "Related Hours & Expenses Created successfully"
          );
          setRelatedHEId(responseData.relatedHEId);
          setViewOnly(true);
        } else {
          handleSnack("info", "Related Hours & Expenses creation failed.");
        }
      });
    }
  };

  return (
    <>
      <div className="row d-flex justify-content-between align-items-center py-2 ">
        <h4 className="mx-3">Related Hours & Expenses</h4>
        <div className="d-flex">
          {viewOnly && (
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
      <div className="card border px-3 py-2 mb-2">
        {viewOnly ? (
          <>
            <div className="row mt-3">
              <ReadOnlyField
                label="CLAIMENT"
                value={claimRelateHERecordData.type?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="PARTNER CODE"
                value={"101211"}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="NAME"
                value={claimRelateHERecordData.name}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="CODE"
                value={claimRelateHERecordData.code?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="ALTERNATE CODE"
                value={claimRelateHERecordData.alternateCode?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="CLAIM NUMBER"
                value={claimNumber}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="COVERAGE TYPE"
                value={claimRelateHERecordData.coverageType?.label}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="REPAIR DATE"
                value={
                  <Moment format="DD/MM/YYYY">
                    {claimRelateHERecordData.repairDate}
                  </Moment>
                }
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="WORK ORDER NUMBER"
                value={claimRelateHERecordData.workOrder}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="HOURS ON THE JOB"
                value={claimRelateHERecordData.jobHours}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="TRAVEL TIME"
                value={claimRelateHERecordData.travelHours}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="VEHICLE KM"
                value={claimRelateHERecordData.vehicleKM}
                className="col-md-3 col-sm-3"
              />
              <ReadOnlyField
                label="MISC. DETAILS"
                value={claimRelateHERecordData.miscDetails}
                className="col-md-12 col-sm-12"
              />
            </div>
          </>
        ) : (
          <>
            <div className="row input-fields mt-2 ">
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    CLAIMENT
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    disabled
                    value={claimRelateHERecordData.type?.label}
                    placeholder="Claiment"
                    // onChange={handleClaimRecordDataChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PARTNER CODE
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    disabled
                    // value={claimRelateHERecordData.name}
                    value={"101211"}
                    // name="claiment"
                    placeholder="Partner Code"
                    // onChange={handleClaimRecordDataChange}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    NAME
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    disabled
                    value={claimRelateHERecordData.name}
                    placeholder="Claiment"
                    // onChange={handleClaimRecordDataChange}
                  />
                  {/* <Select
                className="text-primary"
                options={typeOptions}
                onChange={(e) => handleSelectFiledChange(e, `name`)}
                value={claimRelateHERecordData.name}
                styles={FONT_STYLE_SELECT}
              /> */}
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    CODE
                  </label>
                  <Select
                    className="text-primary"
                    options={codeOptions}
                    onChange={(e) => handleSelectFiledChange(e, `code`)}
                    value={claimRelateHERecordData.code}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    ALTERNATE CODE
                  </label>
                  <Select
                    className="text-primary"
                    options={codeOptions}
                    onChange={(e) =>
                      handleSelectFiledChange(e, `alternateCode`)
                    }
                    value={claimRelateHERecordData.alternateCode}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    CLAIM NUMBER
                  </label>
                  <input
                    type="text"
                    disabled
                    class="form-control border-radius-10 text-primary"
                    // value={"CO8635"}
                    value={claimNumber}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    COVERAGE TYPE
                  </label>
                  <Select
                    className="text-primary"
                    options={coverageTypeOptions}
                    onChange={(e) => handleSelectFiledChange(e, "coverageType")}
                    value={claimRelateHERecordData.coverageType}
                    styles={FONT_STYLE_SELECT}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    REPAIR DATE
                  </label>
                  <div className="align-items-center date-box">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <MobileDatePicker
                        inputFormat="dd/MM/yyyy"
                        className="form-controldate border-radius-10"
                        // maxDate={new Date()}
                        closeOnSelect
                        value={claimRelateHERecordData.repairDate}
                        onChange={(e) =>
                          handleSelectFiledChange(e, "repairDate")
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
              {/* <div className="col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                TYPE
              </label>
              <Select
                className="text-primary"
                options={typeOptions}
                onChange={(e) => handleSelectFiledChange(e, `type`)}
                value={claimRelateHERecordData.type}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3 col-12">
            <div className="form-group">
              <label className="text-light-dark font-size-14 font-weight-500">
                CODE
              </label>
              <Select
                className="text-primary"
                options={codeOptions}
                onChange={(e) => handleSelectFiledChange(e, `code`)}
                value={claimRelateHERecordData.code}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div> */}
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    WORK ORDER NUMBER
                  </label>
                  <input
                    type="text"
                    // disabled
                    class="form-control border-radius-10 text-primary"
                    name="workOrder"
                    value={claimRelateHERecordData.workOrder}
                    onChange={handleInputFieldChange}
                    // value={"CO8635"}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    HOURS ON THE JOB
                  </label>
                  <input
                    type="text"
                    // disabled
                    class="form-control border-radius-10 text-primary"
                    name="jobHours"
                    value={claimRelateHERecordData.jobHours}
                    onChange={handleInputFieldChange}
                    // value={"CO8635"}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    TRAVEL TIME
                  </label>
                  <input
                    type="text"
                    // disabled
                    class="form-control border-radius-10 text-primary"
                    name="travelHours"
                    value={claimRelateHERecordData.travelHours}
                    onChange={handleInputFieldChange}
                    // value={"CO8635"}
                  />
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    VEHICLE KM
                  </label>
                  <input
                    type="text"
                    // disabled
                    class="form-control border-radius-10 text-primary"
                    name="vehicleKM"
                    value={claimRelateHERecordData.vehicleKM}
                    onChange={handleInputFieldChange}
                    // value={"CO8635"}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    MISC. DETAILS
                  </label>
                  <textarea
                    className="form-control border-radius-10 text-primary"
                    name="miscDetails"
                    value={claimRelateHERecordData.miscDetails}
                    onChange={handleInputFieldChange}
                    cols="30"
                    rows="3"
                    // placeholder="causes"
                  ></textarea>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="row mb-2 mx-0" style={{ justifyContent: "right" }}>
        <button
          type="button"
          className="btn btn-ligh save the parts hours datat bg-primary text-white mx-0"
          onClick={handleSavePartHoursData}
        >
          Save & Close
        </button>
      </div>
    </>
  );
};

export default ClaimRelatedHoursAndExpenses;

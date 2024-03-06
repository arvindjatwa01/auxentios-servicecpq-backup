import React, { useState } from "react";
import SolutionQuotePayerGridTable from "pages/SolutionModules/SolutionQuotePayerGridTable";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import Select from "react-select";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

const priceTypeOptions = [
  // { label: "Claimed", value: "CLAIMED" },
  { label: "Settled", value: "SETTLED" },
];

const ClaimSplitPrice = ({ handleSnack, setActiveUpperTabs }) => {
  const [addPayerData, setAddPayerData] = useState([]);
  const [quoteIdIs, setQuoteIdIs] = useState(0);
  const [recordData, setRecordData] = useState({
    type: priceTypeOptions[0],
    totalAmountAllowed: "",
    totalHoursAllowed: "",
    settlementNumber: "",
    settlementDate: new Date(),
    totalInsurance: "",
    serviceDeducation: "",
    totalPartsAllowed: "",
    totalLabourAllowed: "",
    vehicelKMAllowed: "",
    travelAllowed: "",
    miscAllowed: "",
  });

  const handleInputFiledChange = (e) => {
    const { name, value } = e.target;
    setRecordData({ ...recordData, [name]: value });
  };
  return (
    <>
      <div className="row mb-2" style={{ justifyContent: "right" }}>
        <button
          type="button"
          className="btn btn-light bg-primary text-white mr-2"
          onClick={() => setActiveUpperTabs("")}
        >
          Back
        </button>
      </div>
      <div className="card border px-3 py-3">
        <div className="row input-fields">
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Type
              </label>
              <Select
                onChange={(e) =>
                  setRecordData({
                    ...recordData,
                    type: e,
                  })
                }
                options={priceTypeOptions}
                value={recordData.type}
                styles={FONT_STYLE_SELECT}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Total Amount Allowed
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.totalAmountAllowed}
                name={"totalAmountAllowed"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Total Hours Allowed
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.totalHoursAllowed}
                name={"totalHoursAllowed"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Settlement Number
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                disabled
                value={recordData.settlementNumber}
                name={"settlementNumber"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Settlement Date
              </label>
              <div className="align-items-center date-box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="dd/MM/yyyy"
                    className="form-controldate border-radius-10"
                    // maxDate={new Date()}
                    closeOnSelect
                    value={recordData.settlementDate}
                    onChange={(e) =>
                      setRecordData({
                        ...recordData,
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
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Total Insurance
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.totalInsurance}
                name={"totalInsurance"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Service Deducation
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.serviceDeducation}
                name={"serviceDeducation"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
        </div>
        <h5 className="mb-2 mt-2">Expense approval</h5>
        <hr className="mt-0" />
        <div className="row input-fields mt-2">
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Total Parts Allowed
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.totalPartsAllowed}
                name={"totalPartsAllowed"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Total Labour Allowed
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.totalLabourAllowed}
                name={"totalLabourAllowed"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Vehicle KM Allowed
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.vehicelKMAllowed}
                name={"vehicelKMAllowed"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Travel Allowed
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.travelAllowed}
                name={"travelAllowed"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <div className="form-group">
              <label className="text-light-dark font-size-12 font-weight-500">
                Misc. Allowed
              </label>
              <input
                type="text"
                className="form-control border-radius-10 text-primary"
                value={recordData.miscAllowed}
                name={"miscAllowed"}
                onChange={handleInputFiledChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <SolutionQuotePayerGridTable
          handleSnack={handleSnack}
          dataRows={addPayerData}
          quoteId={quoteIdIs}
        />
      </div>
    </>
  );
};

export default ClaimSplitPrice;

import React, { useState } from "react";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import Select from "react-select";
import { FONT_STYLE, FONT_STYLE_SELECT } from "pages/Repair/CONSTANTS";
import { updateBuilderPrice } from "services/repairBuilderServices";
import { ReadOnlyField } from "pages/Repair/components/ReadOnlyField";
import Moment from "react-moment";
import PriceMethodTable from "pages/Repair/components/PriceMethodTable";

const currencyOptions = [{ value: "USD", label: "USD" }];

const priceTypeOptions = [
  { label: "Claimed", value: "CLAIMED" },
  { label: "Settled", value: "SETTLED" },
];

const ClaimAdjustPrice = ({ handleSnack, setActiveUpperTabs }) => {
  const [editData, setEditData] = useState(false);
  const [bId, setBId] = useState("");

  const [pricingData, setPricingData] = useState({
    netPrice: 0.0,
    priceDate: new Date(),
    adjustedPrice: 0.0,
    currency: "",
    priceDetailDTO: [],
    priceEstimateDTO: [],
    priceType: priceTypeOptions[0],
    totalAmountClaimed: 0,
    totalPartsClaimed: 0,
    totalHoursClaimed: 0,
    totalLaboursClaimed: 0,
    travelClaimed: 0,
    miscClaimed: 0,
    vehicleKMClaimed: 0,
  });

  const [savedHeaderDetails, setSavedBuilderDetails] = useState([]);

  const updatePriceData = () => {
    let data = {
      //   builderId,
      priceDetailDTO: pricingData.priceDetailDTO,
      priceEstimateDTO: pricingData.priceEstimateDTO,
      currency: pricingData.currency?.value,
      priceDate: pricingData.priceDate,
      // adjustedPrice:
      //   pricingData.priceMethod?.value === "FLAT_RATE"
      //     ? pricingData.adjustedPrice
      //     : 0,
    };
    updateBuilderPrice(bId, data)
      .then((result) => {
        setSavedBuilderDetails(result);
        if (result) {
          setPricingData({
            ...pricingData,
            adjustedPrice: result.adjustedPrice,
            netPrice: result.netPrice,
            priceDetailDTO: result.priceDetailDTO,
            priceEstimateDTO: result.priceEstimateDTO,
          });
        }
        // setViewOnlyTab({ ...viewOnlyTab, priceViewOnly: true });
        setEditData(false);
        handleSnack("success", "Pricing details updated!");
      })
      .catch((err) => {
        setPricingData({
          ...pricingData,
          adjustedPrice: savedHeaderDetails.adjustedPrice,
          priceDetailDTO: savedHeaderDetails.priceDetailDTO,
          priceEstimateDTO: savedHeaderDetails.priceEstimateDTO,
          netPrice: savedHeaderDetails.netPrice,
        });
        handleSnack(
          "error",
          "Error occurred while updating the pricing details!"
        );
      });
  };

  const handleInputFiledChange = (e) => {
    const { name, value } = e.target;
    setPricingData({ ...pricingData, [name]: value });
  };

  return (
    <>
      {!editData ? (
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
                      setPricingData({
                        ...pricingData,
                        priceType: e,
                      })
                    }
                    options={priceTypeOptions}
                    value={pricingData.priceType}
                    styles={FONT_STYLE_SELECT}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Total Amount Claimed
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={pricingData.totalAmountClaimed}
                    name={"totalAmountClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Total Parts Claimed
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={pricingData.totalPartsClaimed}
                    name={"totalPartsClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Total Hours Claimed
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={pricingData.totalHoursClaimed}
                    name={"totalHoursClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Total Labour Amount Claimed
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={pricingData.totalLaboursClaimed}
                    name={"totalLaboursClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Travel Claimed
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={pricingData.travelClaimed}
                    name={"travelClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Misc. Claimed
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={pricingData.miscClaimed}
                    name={"miscClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    Vehicle KM Claimed
                  </label>
                  <input
                    type="text"
                    className="form-control border-radius-10 text-primary"
                    value={pricingData.vehicleKMClaimed}
                    name={"vehicleKMClaimed"}
                    onChange={handleInputFiledChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 mx-2" style={{ justifyContent: "right" }}>
            <button
              type="button"
              className="btn btn-light bg-primary text-white mr-1"
              //   onClick={() => handleResetData("CANCEL")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-light bg-primary text-white"
              // onClick={updatePriceData}
              // disabled={!(pricingData.priceDate && pricingData.currency)}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="row mt-3">
            <ReadOnlyField
              label="NET PRICE"
              value={pricingData.netPrice}
              className="col-md-4 col-sm-4"
            />
            <ReadOnlyField
              label="PRICE DATE"
              value={
                <Moment format="DD/MM/YYYY">{pricingData.priceDate}</Moment>
              }
              className="col-md-4 col-sm-4"
            />
            <ReadOnlyField
              label="ADJUSTED PRICE"
              value={pricingData.adjustedPrice}
              className="col-md-4 col-sm-4"
            />
            <ReadOnlyField
              label="CURRENCY"
              value={pricingData.currency?.label}
              className="col-md-4 col-sm-4"
            />
          </div>
          <hr />
          <div className="mb-5">
            <PriceMethodTable
              rows={pricingData.priceDetailDTO}
              setRows={(rows) => {
                console.log(rows);
                setPricingData({
                  ...pricingData,
                  priceDetailDTO: rows,
                });
              }}
            />
            <div className="row my-3 mr-2" style={{ justifyContent: "right" }}>
              <button
                type="button"
                className="btn btn-light bg-primary text-white"
                onClick={updatePriceData}
                disabled={!(pricingData.priceDate && pricingData.currency)}
              >
                Save Price Methods
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ClaimAdjustPrice;

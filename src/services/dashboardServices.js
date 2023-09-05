import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { FETCH_GAP_TO_ENTITLEMENT, FETCH_PARTS_SEGMENT, FETCH_PARTS_SEGMENT_DETAILS, FETCH_PROPENSITY_TO_BUY, FETCH_PROPENSITY_TO_BUY_DET } from "./CONSTANTS";
var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
  getCookiesJsonData = JSON.parse(CookiesSetData);
}
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${getCookiesJsonData?.access_token}`,
  },
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
};
//Fetch Propensity To Buy
export const getPropensityToBuy = () => {
    console.log("Dashboard Service > propensity-to-buy called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(FETCH_PROPENSITY_TO_BUY, config)
          .then((res) => {
            console.log("getPropensityToBuy > axios res=", res);
            if (res.status === 200) resolve(res.data);
            else reject(res.data);
          })
          .catch((err) => {
            console.log("getPropensityToBuy > axios err=", err);
            reject("Error in getPropensityToBuy axios!");
          });
      } catch (error) {
        console.error("in DashboardService > getPropensityToBuy, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };

  export const getPropensityDetails = (propensityLevel, transactionLevel) => {
    console.log("Dashboard Service > propensity-to-buy called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(FETCH_PROPENSITY_TO_BUY_DET(propensityLevel, transactionLevel), config)
          .then((res) => {
            console.log("getPropensityToBuy > axios res=", res);
            if (res.status === 200) resolve(res.data);
            else reject(res.data);
          })
          .catch((err) => {
            console.log("getPropensityToBuy > axios err=", err);
            reject("Error in getPropensityToBuy axios!");
          });
      } catch (error) {
        console.error("in DashboardService > getPropensityToBuy, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };


  //Fetch Gap To Entitlement
export const getGapToEntitlement = () => {
    console.log("Dashboard Service > getGapToEntitlement called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(FETCH_GAP_TO_ENTITLEMENT, config)
          .then((res) => {
            console.log("getGapToEntitlement > axios res=", res);
            if (res.status === 200) resolve(res.data);
            else reject(res.data);
          })
          .catch((err) => {
            console.log("getGapToEntitlement > axios err=", err);
            reject("Error in getGapToEntitlement axios!");
          });
      } catch (error) {
        console.error("in DashboardService > getGapToEntitlement, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };

  //Fetch parts segments
export const getPartsSegment = () => {
  console.log("Dashboard Service > partsSegment called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_PARTS_SEGMENT, config)
        .then((res) => {
          console.log("getPropensityToBuy > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getPropensityToBuy > axios err=", err);
          reject("Error in getPropensityToBuy axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getPropensityToBuy, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getPartsSegmentDetails = (cluster) => {
  console.log("Dashboard Service > getPartsSegmentDetails called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_PARTS_SEGMENT_DETAILS(cluster), config)
        .then((res) => {
          console.log("getPartsSegmentDetails > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getPartsSegmentDetails > axios err=", err);
          reject("Error in getPartsSegmentDetails axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getPartsSegmentDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { FETCH_BOTTOM_TEN, FETCH_DISCOUNT_COLUMNS, FETCH_DISCOUNT_GUIDANCE, FETCH_GAP_TO_ENTITLEMENT, FETCH_PARTS_SEGMENT, FETCH_PARTS_SEGMENT_DETAILS, FETCH_PROPENSITY_TO_BUY, FETCH_PROPENSITY_TO_BUY_DET, FETCH_QUOTE_LIFE_CYCLE, FETCH_QUOTE_PERFORMANCE, FETCH_QUOTE_WIN_LOSS, FETCH_TOP_TEN } from "./CONSTANTS";
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

//Fetch Discount Guidance
export const getDiscountDetails = (filter) => {
  console.log("Dashboard Service > getDiscountDetails called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_DISCOUNT_GUIDANCE(filter), config)
        .then((res) => {
          console.log("getDiscountDetails > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getDiscountDetails > axios err=", err);
          reject("Error in getGapToEntitlement axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getDiscountDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Fetch Discount Guidance Columns
export const getDiscountColumns = () => {
  console.log("Dashboard Service > getDiscountColumns called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_DISCOUNT_COLUMNS(), config)
        .then((res) => {
          console.log("getDiscountColumns > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getDiscountColumns > axios err=", err);
          reject("Error in getGapToEntitlement axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getDiscountColumns, Err===", error);
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

export const getQuotePerformance = () => {
  console.log("Dashboard Service > getQuotePerformance called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_QUOTE_PERFORMANCE(), config)
        .then((res) => {
          console.log("getQuotePerformance > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getQuotePerformance > axios err=", err);
          reject("Error in getQuotePerformance axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getQuotePerformance, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getQuoteWinLoss = () => {
  console.log("Dashboard Service > getQuoteWinLOSS called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_QUOTE_WIN_LOSS(), config)
        .then((res) => {
          console.log("getQuoteWinLOSS > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getQuoteWinLOSS > axios err=", err);
          reject("Error in getQuotePerformance axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getQuoteWinLOSS, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getQuoteLifeCycleStatus = () => {
  console.log("Dashboard Service > getQuoteLifeCycleStatus called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_QUOTE_LIFE_CYCLE(), config)
        .then((res) => {
          console.log("getQuoteLifeCycleStatus > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getQuoteLifeCycleStatus > axios err=", err);
          reject("Error in getQuoteLifeCycleStatus axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getQuoteLifeCycleStatus, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getTopTen = () => {
  console.log("Dashboard Service > getQuoteLifeCycleStatus called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_TOP_TEN(), config)
        .then((res) => {
          console.log("getQuoteLifeCycleStatus > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getQuoteLifeCycleStatus > axios err=", err);
          reject("Error in getQuoteLifeCycleStatus axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getQuoteLifeCycleStatus, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getBottomTen = () => {
  console.log("Dashboard Service > getQuoteLifeCycleStatus called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_BOTTOM_TEN(), config)
        .then((res) => {
          console.log("getQuoteLifeCycleStatus > axios res=", res);
          if (res.status === 200) resolve(res.data);
          else reject(res.data);
        })
        .catch((err) => {
          console.log("getQuoteLifeCycleStatus > axios err=", err);
          reject("Error in getQuoteLifeCycleStatus axios!");
        });
    } catch (error) {
      console.error("in DashboardService > getQuoteLifeCycleStatus, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
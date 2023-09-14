import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_SEARCH_COVERAGE, GET_SEARCH_FAMILY_COVERAGE, PORTFOLIO_SEARCH_URL, RECENT_PORTFOLIO_URL, GET_RECENT_BUNDLE_SERVICE_URL, GET_SEARCH_KIT_ID, GET_SEARCH_STANDARD_JOB_ID, PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE, GET_SEARCH_FAMILY_CUSTOM_COVERAGE, LINK_ITEM_TO_PORTFOLIO } from "./CONSTANTS";
import Cookies from "js-cookie";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
  getCookiesJsonData = JSON.parse(CookiesSetData);
}
//  else {
//   getCookiesJsonData = {
//     access_token: "Bearer null",
//   }
// }
// var getCookiesJsonData = JSON.parse(CookiesSetData);
const headersData = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  // 'Authorization': accessToken != undefined ? accessToken : ''
  'Authorization': CookiesSetData != undefined ? getCookiesJsonData?.access_token : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */


export const getSearchQueryCoverage = (searchStr) => {
  console.log("Query coverageService > getSearchQueryCoverage called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_SEARCH_COVERAGE + searchStr, { headers: headersData })
        .then((res) => {
          console.log("getSearchQueryCoverage > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchQueryCoverage > axios err=", err);
          reject("Error in getSearchQueryCoverage axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchQueryCoverage, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


export const getSearchCoverageForFamily = (family, familyValue) => {
  console.log("Query coverageService > getSearchCoverageForFamily called...");
  return new Promise((resolve, reject) => {
    console.log("GET_SEARCH_FAMILY_COVERAGE", `${GET_SEARCH_FAMILY_COVERAGE}${family}?${family}=${familyValue}`)
    try {
      axios
        .get(GET_SEARCH_FAMILY_COVERAGE + "?" + family + "=" + familyValue, { headers: headersData })
        .then((res) => {
          console.log("getSearchCoverageForFamily > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchCoverageForFamily > axios err=", err);
          reject("Error in getSearchCoverageForFamily axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchCoverageForFamily, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


export const getSearchForPortfolio = (family, familyValue) => {
  console.log("Query coverageService > getSearchForPortfolio called...");
  return new Promise((resolve, reject) => {
    console.log("PORTFOLIO_SEARCH_URL", `${PORTFOLIO_SEARCH_URL}${family}~${familyValue}`)
    try {
      console.log("PORTFOLIO_SEARCH_URL is : ", PORTFOLIO_SEARCH_URL)
      console.log("family is : ", family);
      axios
        .get(RECENT_PORTFOLIO_URL + family + "~" + familyValue, { headers: headersData })
        .then((res) => {
          console.log("getSearchForPortfolio > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchForPortfolio > axios err=", err);
          reject("Error in getSearchForPortfolio axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchForPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
}


export const getSearchCustomCoverageForFamily = (family, familyValue) => {
  console.log("Query coverageService > getSearchCustomCoverageForFamily called...");
  return new Promise((resolve, reject) => {
    console.log("GET_SEARCH_FAMILY_CUSTOM_COVERAGE", `${GET_SEARCH_FAMILY_CUSTOM_COVERAGE}${family}?${family}=${familyValue}`)
    try {
      axios
        .get(GET_SEARCH_FAMILY_CUSTOM_COVERAGE + "?" + family + "=" + familyValue, { headers: headersData })
        .then((res) => {
          console.log("getSearchCustomCoverageForFamily > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchCustomCoverageForFamily > axios err=", err);
          reject("Error in getSearchCustomCoverageForFamily axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchCustomCoverageForFamily, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// Recent Portfolio List 
export const getSearchForRecentPortfolio = () => {
  console.log("Query coverageService > getSearchForRecentPortfolio called...");
  return new Promise((resolve, reject) => {
    // pageSize=10&sortColumn=updatedAt&orderBY=DESC
    // console.log("RECENT_PORTFOLIO_URL", `${PORTFOLIO_SEARCH_URL}${family}~${familyValue}`)
    try {
      axios
        // .get(RECENT_PORTFOLIO_URL + "?pageSize=10&sortColumn=updatedAt&orderBY=DESC", { headers: headersData })
        .get(RECENT_PORTFOLIO_URL + "/recent", { headers: headersData })
        .then((res) => {
          console.log("getSearchForRecentPortfolio > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("getSearchForRecentPortfolio > axios err=", err);
          reject("Error in getSearchForRecentPortfolio axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchForRecentPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
}

// Recent Bundle/Service List 
export const getSearchForRecentBundleService = () => {
  console.log("Query coverageService > getSearchForRecentBundleService called...");
  return new Promise((resolve, reject) => {
    // pageSize=10&sortColumn=updatedAt&orderBY=DESC
    // console.log("RECENT_PORTFOLIO_URL", `${PORTFOLIO_SEARCH_URL}${family}~${familyValue}`)
    try {
      axios
        .get(GET_RECENT_BUNDLE_SERVICE_URL + "?pageSize=10&sortColumn=updatedAt&orderBY=DESC", { headers: headersData })
        .then((res) => {
          console.log("getSearchForRecentBundleService > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchForRecentBundleService > axios err=", err);
          reject("Error in getSearchForRecentBundleService axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchForRecentBundleService, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
}

// Search Query Coverage Master
export const getSearchQueryCoverageMaster = (searchStr) => {
  console.log("Query coverageService > getSearchQueryCoverageMaster called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_SEARCH_COVERAGE + searchStr, { headers: headersData })
        .then((res) => {
          console.log("getSearchQueryCoverageMaster > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchQueryCoverageMaster > axios err=", err);
          reject("Error in getSearchQueryCoverageMaster axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchQueryCoverageMaster, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// Search Query Standard Job ID
export const getSearchStandardJobId = (searchStr) => {
  console.log("Query coverageService > getSearchStandardJobId called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_SEARCH_STANDARD_JOB_ID + searchStr, { headers: headersData })
        .then((res) => {
          console.log("getSearchStandardJobId > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("getSearchStandardJobId > axios err=", err);
          reject("Error in getSearchStandardJobId axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchStandardJobId, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// Search Query Kit ID
export const getSearchKitId = (searchStr) => {
  console.log("Query coverageService > getSearchKitId called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_SEARCH_KIT_ID + searchStr, { headers: headersData })
        .then((res) => {
          console.log("getSearchKitId > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getSearchKitId > axios err=", err);
          reject("Error in getSearchKitId axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getSearchKitId, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// Portfolio Service-Bundle Item Prices
export const getServiceBundleItemPrices = (searchStr) => {
  console.log("Query coverageService > getServiceBundleItemPrices called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_SERVICE_BUNDLE_ITEM_PRICE + searchStr, { headers: headersData })
        .then((res) => {
          console.log("getServiceBundleItemPrices > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getServiceBundleItemPrices > axios err=", err);
          reject("Error in getServiceBundleItemPrices axios!");
        });
    } catch (error) {
      console.error("in Query coverageService > getServiceBundleItemPrices, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// Link Item to Portfolio
export const linkItemToPortfolio = (payLoadUrl) => {
  console.log("searchQueryService > linkItemToPortfolio called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(LINK_ITEM_TO_PORTFOLIO + payLoadUrl, { headers: headersData })
        .then((res) => {
          console.log("linkItemToPortfolio > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("linkItemToPortfolio > axios err=", err);
          reject("Error in linkItemToPortfolio axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > linkItemToPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
}
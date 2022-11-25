import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_SEARCH_COVERAGE, GET_SEARCH_FAMILY_COVERAGE, PORTFOLIO_SEARCH_URL, RECENT_PORTFOLIO_URL, GET_RECENT_BUNDLE_SERVICE_URL } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
const headersdata = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  'Authorization': accessToken != undefined ? accessToken : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */


export const getSearchQueryCoverage = (searchStr) => {
  console.log("Query coverageService > getSearchQueryCoverage called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_SEARCH_COVERAGE + searchStr, { headers: headersdata })
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
        .get(GET_SEARCH_FAMILY_COVERAGE + "?" + family + "=" + familyValue, { headers: headersdata })
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
        .get(RECENT_PORTFOLIO_URL + family + "~" + familyValue, { headers: headersdata })
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


// Recent Portfolio List 
export const getSearchForRecentPortfolio = () => {
  console.log("Query coverageService > getSearchForRecentPortfolio called...");
  return new Promise((resolve, reject) => {
    // pageSize=10&sortColumn=updatedAt&orderBY=DESC
    // console.log("RECENT_PORTFOLIO_URL", `${PORTFOLIO_SEARCH_URL}${family}~${familyValue}`)
    try {
      axios
        .get(RECENT_PORTFOLIO_URL + "?pageSize=10&sortColumn=updatedAt&orderBY=DESC", { headers: headersdata })
        .then((res) => {
          console.log("getSearchForRecentPortfolio > axios res=", res);
          resolve(res.data);
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
        .get(GET_RECENT_BUNDLE_SERVICE_URL + "?pageSize=10&sortColumn=updatedAt&orderBY=DESC", { headers: headersdata })
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
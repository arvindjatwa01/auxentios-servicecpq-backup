// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_ALL_SOLUTION_PORTFOLIOS, GET_ALL_USERS, GET_USER_DETAILS, PORTFOLIO_URL, PRICING_COMMON_CONFIG, PORTFOLIO_SEARCH_URL, PORTFOLIO_SEARCH_DROPDOWN_LIST_URL, PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL, PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH } from "./CONSTANTS";
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


/**
 * Function to create the Portfolios.
 */
export const createPortfolio = (data) => {
  console.log("service portfolio > createPortfolio called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(PORTFOLIO_URL(), data, { headers: headersData })
        .then((res) => {
          console.log("createPortfolio > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("createPortfolio > axios err=", err);
          reject("Error in createPortfolio axios!");
        });
    } catch (error) {
      console.error("in servicePortfolio > createPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to update the Portfolio.
 */
export const updatePortfolio = (portfolioId, data) => {
  console.log("service Service Portfolio > updatePortfolio called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(PORTFOLIO_URL() + "/" + portfolioId, data, { headers: headersData })
        .then((res) => {
          console.log("updatePortfolio > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updatePortfolio > axios err=", err);
          reject("Error in updatePortfolio axios!");
        });
    } catch (error) {
      console.error("in servicePortfolio > updatePortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


export const portfolioSearch = (searchStr) => {
  console.log("portfolioService > portfolioSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_SEARCH_URL + searchStr, { headers: headersData })
        .then((res) => {
          console.log("portfolioSearch > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("portfolioSearch > axios err=", err);
          reject("Error in portfolioSearch axios!");
        });
    } catch (error) {
      console.error("in portfolioService > portfolioSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * Function to fetch the Portfolio Search Dropdown.
 */

export const portfolioSearchDropdownList = (searchStr) => {
  console.log("portfolioService > portfolioSearchDropdownList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_URL() + "/" + searchStr, { headers: headersData })
        .then((res) => {
          console.log("portfolioSearchDropdownList > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("portfolioSearchDropdownList > axios err=", err);
          reject("Error in portfolioSearchDropdownList axios!");
        });
    } catch (error) {
      console.error("in portfolioService > portfolioSearchDropdownList, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch the Portfolio by portfolioId.
 */


export const getPortfolio = (portfolioId) => {
  console.log("service Service Portfolio > getPortfolio called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_URL() + "/" + portfolioId, { headers: headersData })
        .then((res) => {
          console.log("getPortfolio > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getPortfolio > axios err=", err);
          reject("Error in getPortfolio axios!");
        });
    } catch (error) {
      console.error("in servicePortfolio > getPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to update the Portfolios.
 */
export const getAllPortfolios = () => {
  console.log("userServices > getAllUsers called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_ALL_SOLUTION_PORTFOLIOS(), { headers: headersData })
        .then((res) => {
          console.log("getAllPortfolios > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getAllUsers > axios err=", err);
          reject("Error in getAllUsers axios!");
        });
    } catch (error) {
      console.error("in userServices > getAllUsers, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * Function to fetch the details of the user based on userId.
 * @param {string} userid of the user.
 * early dev example passing Skeleton(static object) as API response.
 */
export const getUserDetails = (id) => {
  console.log("userServices > getUserDetails called...");
  return new Promise((resolve, reject) => {
    try {
      // do an SDK, DB call or API endpoint axios call here and return the promise.
      axios
        .get(GET_USER_DETAILS(id), { headers: headersData })
        .then((res) => {
          console.log("getUserDetails > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getUserDetails > axios err=", err);
          reject("Error in getUserDetails axios!");
        });
    } catch (error) {
      console.error("in userServices > getUserDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// TODO: Dummy service - delete this.
export const getUserDetails1 = (id) => {
  console.log("userServices > getUserDetails called...");
  return new Promise((resolve, reject) => {
    try {
      // do db call or API endpoint axios call here and return the promise.
      resolve({
        "id": "30",
        "firstName": "Joel",
        "lastName": "Joseph",
        "gender": "Male",
        "age": 33,
        "isActiveEmployee": true,
        "location": "London"
      })
    } catch (error) {
      console.error("in userServices > getUserDetails1, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


// Portfolio Search Dropdown List 
export const portfolioSearchList = (searchStr) => {
  console.log("portfolioService > portfolioSearchList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_SEARCH_DROPDOWN_LIST_URL + searchStr, { headers: headersData })
        .then((res) => {
          console.log("portfolioSearchList > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("portfolioSearchList > axios err=", err);
          reject("Error in portfolioSearchList axios!");
        });
    } catch (error) {
      console.error("in portfolioService > portfolioSearchList, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};



/**
 * Function to fetch the Portfolio Search Table List .
 */


// Portfolio Search Dropdown List 
export const portfolioSearchTableDataList = (searchStr) => {
  console.log("portfolioService > portfolioSearchTableDataList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_SEARCH_TABLE_DATA_LIST_URL + searchStr, { headers: headersData })
        .then((res) => {
          console.log("portfolioSearchTableDataList > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("portfolioSearchTableDataList > axios err=", err);
          reject("Error in portfolioSearchTableDataList axios!");
        });
    } catch (error) {
      console.error("in portfolioService > portfolioSearchTableDataList, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
}


// Portfolio Price Hierarchy 

export const portfolioItemPriceHierarchySearch = (searchStr) => {
  console.log("portfolioService > portfolioItemPriceHierarchySearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_ITEM_PRICE_HIERARCHY_SEARCH + searchStr, { headers: headersData })
        .then((res) => {
          console.log("portfolioItemPriceHierarchySearch > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("portfolioItemPriceHierarchySearch > axios err=", err);
          reject("Error in portfolioItemPriceHierarchySearch axios!");
        });
    } catch (error) {
      console.error("in portfolioService > portfolioItemPriceHierarchySearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
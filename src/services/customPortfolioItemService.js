import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import {
  CREATE_CUSTOM_PORTFOLIO_ITEM,
  DELETE_CUSTOM_PORTFOLIO_ITEM,
  CUSTOM_PORTFOLIO_ITEM_PRICE_RKID,
  CREATE_CUSTOM_PRICE,
  CUSTOM_PORTFOLIO_SEARCH_QUERY,
  CUSTOM_PORTFOLIO_ITEM_PRICE_SJID,
  CUSTOM_PORTFOLIO_URL
} from "./CONSTANTS";
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
 * Function to create the Custom Item.
 */

export const customItemCreation = (payLoad) => {
  console.log("customPortfolioItemService > customItemCreation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_CUSTOM_PORTFOLIO_ITEM(), payLoad, { headers: headersData })
        .then((res) => {
          console.log("customItemCreation > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("customItemCreation > axios err=", err);
          reject("Error in customItemCreation axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > customItemCreation, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Update the Custom Item.
 */

export const updateCustomItemData = (id, payLoad) => {
  console.log("customPortfolioItemService > updateCustomItemData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${id}`, payLoad, { headers: headersData })
        .then((res) => {
          console.log("updateCustomItemData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateCustomItemData > axios err=", err);
          reject("Error in updateCustomItemData axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > updateCustomItemData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Delete the Custom Item.
 */

export const deleteCustomItem = (id) => {
  console.log("customPortfolioItemService > deleteCustomItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(DELETE_CUSTOM_PORTFOLIO_ITEM + id, { headers: headersData })
        .then((res) => {
          console.log("deleteCustomItem > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("deleteCustomItem > axios err=", err);
          reject("Error in deleteCustomItem axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > deleteCustomItem, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to get the Custom Item Data By Id.
 */

export const getCustomItemDataById = (id) => {
  console.log("customPortfolioItemService > getCustomItemDataById called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${id}`, { headers: headersData })
        .then((res) => {
          console.log("getCustomItemDataById > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getCustomItemDataById > axios err=", err);
          reject("Error in getCustomItemDataById axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > getCustomItemDataById, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Create the Custom Item Price.
 */

export const customPriceCreation = (payLoad) => {
  console.log("customPortfolioItemService > customPriceCreation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_CUSTOM_PRICE(), payLoad, { headers: headersData })
        .then((res) => {
          console.log("customPriceCreation > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("customPriceCreation > axios err=", err);
          reject("Error in customPriceCreation axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > customPriceCreation, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Update the Custom Item Price.
 */

export const updateCustomPriceData = (id, payLoad) => {
  console.log("customPortfolioItemService > updateCustomPriceData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${CREATE_CUSTOM_PRICE()}/${id}`, payLoad, { headers: headersData })
        .then((res) => {
          console.log("updateCustomPriceData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateCustomPriceData > axios err=", err);
          reject("Error in updateCustomPriceData axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > updateCustomPriceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to get the Custom Item Price By ID.
 */

export const getCustomItemPriceById = (id) => {
  console.log("customPortfolioItemService > getCustomItemPriceById called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CREATE_CUSTOM_PRICE()}/${id}`, { headers: headersData })
        .then((res) => {
          console.log("getCustomItemPriceById > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getCustomItemPriceById > axios err=", err);
          reject("Error in getCustomItemPriceById axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > getCustomItemPriceById, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to update the Custom Item Price SjId.
 */

export const customPortfolioItemPriceSJID = (data) => {
  console.log("customPortfolioItemService > customPortfolioItemPriceSJID called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(CUSTOM_PORTFOLIO_ITEM_PRICE_SJID(), data, { headers: headersData })
        .then((res) => {
          console.log("customPortfolioItemPriceSJID > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("customPortfolioItemPriceSJID > axios err=", err);
          reject("Error in customPortfolioItemPriceSJID axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > customPortfolioItemPriceSJID, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to update the Custom Item Price RkId.
 */

export const customPortfolioItemPriceRkId = (data) => {
  console.log("customPortfolioItemService > customPortfolioItemPriceRkId called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(CUSTOM_PORTFOLIO_ITEM_PRICE_RKID(), data, { headers: headersData })
        .then((res) => {
          console.log("customPortfolioItemPriceRkId > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("customPortfolioItemPriceRkId > axios err=", err);
          reject("Error in customPortfolioItemPriceRkId axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > customPortfolioItemPriceRkId, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to Search the Custom Portfolio's.
 */

export const getSearchCustomPortfolio = (searchStr) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log("path is : ", CUSTOM_PORTFOLIO_SEARCH_QUERY + searchStr);
      // console.log("path 2 is : ", `${CUSTOM_PORTFOLIO_SEARCH_QUERY}${searchStr}`);
      axios
        .get(`${CUSTOM_PORTFOLIO_SEARCH_QUERY}${searchStr}`, { headers: headersData })
        .then((res) => {
          console.log("getSearchCustomPortfolio > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("getSearchCustomPortfolio > axios err=", err);
          reject("Error in getSearchCustomPortfolio axios!");
        });
    } catch (error) {
      console.error("in Query customPortfolio > getSearchCustomPortfolio, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * Function to Search the Custom Portfolio's Dropdown List.
 */

export const getSearchCustomPortfolioDropdownList = (searchStr) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CUSTOM_PORTFOLIO_URL()}/${searchStr}`, { headers: headersData })
        .then((res) => {
          console.log("getSearchCustomPortfolioDropdownList > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("getSearchCustomPortfolioDropdownList > axios err=", err);
          reject("Error in getSearchCustomPortfolioDropdownList axios!");
        });
    } catch (error) {
      console.error("in Query customPortfolio > getSearchCustomPortfolioDropdownList, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
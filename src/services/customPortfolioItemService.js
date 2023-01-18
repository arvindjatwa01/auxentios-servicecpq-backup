import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_CUSTOM_PORTFOLIO_ITEM, DELETE_CUSTOM_PORTFOLIO_ITEM, CUSTOM_PORTFOLIO_ITEM_PRICE_RKID, CREATE_CUSTOM_PRICE, CUSTOM_PORTFOLIO_SEARCH_QUERY, CUSTOM_PORTFOLIO_ITEM_PRICE_SJID } from "./CONSTANTS";
import Cookies from "js-cookie";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData = JSON.parse(CookiesSetData)
const headersData = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  // 'Authorization': accessToken != undefined ? accessToken : ''
  'Authorization': CookiesSetData != undefined ? getCookiesJsonData.access_token : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */

export const customitemCreation = (payLoad) => {
  console.log("customPortfolioItemService > customitemCreation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_CUSTOM_PORTFOLIO_ITEM(), payLoad, { headers: headersData })
        .then((res) => {
          console.log("cusomitemCreation > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("customitemCreation > axios err=", err);
          reject("Error in customitemCreation axios!");
        });
    } catch (error) {
      console.error("in customPortfolioItemService > customitemCreation, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getCustomItemData = (id) => {
  console.log("customportfolioItemService > getcustomItemData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${id}`, { headers: headersData })
        .then((res) => {
          console.log("getcustomItemData > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getcustomItemData > axios err=", err);
          reject("Error in getcustomItemData axios!");
        });
    } catch (error) {
      console.error("in customportfolioItemService > getcustomItemData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getSearchCustomPortfolio = (searchStr) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("path is : ", CUSTOM_PORTFOLIO_SEARCH_QUERY + searchStr);
      console.log("path 2 is : ", `${CUSTOM_PORTFOLIO_SEARCH_QUERY}${searchStr}`);
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

export const getcustomItemPriceById = (id) => {
  console.log("customportfolioItemService > getcustomItemPriceById called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CREATE_CUSTOM_PRICE()}/${id}`, { headers: headersData })
        .then((res) => {
          console.log("getcustomItemPriceById > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getcustomItemPriceById > axios err=", err);
          reject("Error in getcustomItemPriceById axios!");
        });
    } catch (error) {
      console.error("in customportfolioItemService > getcustomItemPriceById, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getcustomItemPrice = (payLoad) => {
  console.log("customportfolioItemService > getcustomItemPrice called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(CUSTOM_PORTFOLIO_ITEM_PRICE_RKID(), payLoad, { headers: headersData })
        .then((res) => {
          console.log("getcustomItemPrice > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getcustomItemPrice > axios err=", err);
          reject("Error in getcustomItemPrice axios!");
        });
    } catch (error) {
      console.error("in customportfolioItemService > getcustomItemPrice, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const updateCustomItemData = (id, payLoad) => {
  console.log("customportfolioItemService > updatecustomItemData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${CREATE_CUSTOM_PORTFOLIO_ITEM()}/${id}`, payLoad, { headers: headersData })
        .then((res) => {
          console.log("updatecustomItemData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updatecustomItemData > axios err=", err);
          reject("Error in updatecustomItemData axios!");
        });
    } catch (error) {
      console.error("in customportfolioItemService > updatecustomItemData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const deleteCustomItem = (id) => {
  console.log("customportfolioItemService > deletecustomItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(DELETE_CUSTOM_PORTFOLIO_ITEM + id, { headers: headersData })
        .then((res) => {
          console.log("deletecustomItem > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("deletecustomItem > axios err=", err);
          reject("Error in deletecustomItem axios!");
        });
    } catch (error) {
      console.error("in customportfolioItemService > deletecustomItem, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

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

export const updateCustomPriceData = (id, payLoad) => {
  console.log("customportfolioItemService > updateCustomPriceData called...");
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
      console.error("in customportfolioItemService > updateCustomPriceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


export const customPortfolioItemPriceSJID = (data) => {
  console.log("customportfolioItemService > customPortfolioItemPriceSJID called...");
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
      console.error("in customportfolioItemService > customPortfolioItemPriceSJID, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_PORTFOLIO_ITEM, PORTFOLIO_ITEM_SEARCH, PORTFOLIO_ITEM_PRICE_RKID, PORTFOLIO_ITEM_PRICE_BY_ITEM_ID, GET_RECENT_ITEMS_LIST_URL } from "./CONSTANTS";
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


export const itemCreation = (payLoad) => {
  console.log("portfolioItemService > itemCreation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_PORTFOLIO_ITEM(), payLoad, { headers: headersData })
        .then((res) => {
          console.log("itemCreation > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("itemCreation > axios err=", err);
          reject("Error in itemCreation axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > itemCreation, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getItemDataById = (id) => {
  console.log("portfolioItemService > getItemDataById called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${CREATE_PORTFOLIO_ITEM()}/${id}`, { headers: headersData })
        .then((res) => {
          console.log("getItemDataById > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("getItemDataById > axios err=", err);
          reject("Error in getItemDataById axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > getItemDataById, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getAllItems = () => {
  console.log("portfolioItemService > getAllItems called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_PORTFOLIO_ITEM(), { headers: headersData })
        .then((res) => {
          console.log("getAllItems > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getAllItems > axios err=", err);
          reject("Error in getAllItems axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > getAllItems, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getServiceItemsList = () => {
  console.log("portfolioItemService > getServiceItemsList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_PORTFOLIO_ITEM() + "/services", { headers: headersData })
        .then((res) => {
          console.log("getServiceItemsList > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getServiceItemsList > axios err=", err);
          reject("Error in getServiceItemsList axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > getServiceItemsList, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const itemSearchSuggestion = (family, familyValue) => {
  console.log("portfolioItemService > itemSearchSuggestion called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_PORTFOLIO_ITEM() + `/${family}?${family}=${familyValue}`, { headers: headersData })
        .then((res) => {
          console.log("itemSearchSuggestion > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("itemSearchSuggestion > axios err=", err);
          reject("Error in itemSearchSuggestion axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > itemSearchSuggestion, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const itemSearch = (searchStr) => {
  console.log("portfolioItemService > itemSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_ITEM_SEARCH() + searchStr, { headers: headersData })
        .then((res) => {
          console.log("itemSearch > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("itemSearch > axios err=", err);
          reject("Error in itemSearch axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > itemSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


export const itemSearchDropdown = (searchStr) => {
  console.log("portfolioItemService > itemSearchDropdown called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CREATE_PORTFOLIO_ITEM() + "/" + searchStr, { headers: headersData })
        .then((res) => {
          console.log("itemSearchDropdown > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("itemSearchDropdown > axios err=", err);
          reject("Error in itemSearchDropdown axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > itemSearchDropdown, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


export const recentItemsList = (searchStr) => {
  console.log("portfolioItemService > recentItemsList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_RECENT_ITEMS_LIST_URL + searchStr, { headers: headersData })
        .then((res) => {
          console.log("recentItemsList > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("recentItemsList > axios err=", err);
          reject("Error in recentItemsList axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > recentItemsList, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
}


export const updateItemData = (id, payLoad) => {
  console.log("portfolioItemService > updateItemData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${CREATE_PORTFOLIO_ITEM()}/${id}`, payLoad, { headers: headersData })
        .then((res) => {
          console.log("updateItemData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateItemData > axios err=", err);
          reject("Error in updateItemData axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > updateItemData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const deleteItem = (id) => {
  console.log("portfolioItemService > deleteItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(`${CREATE_PORTFOLIO_ITEM()}/${id}`, { headers: headersData })
        .then((res) => {
          console.log("deleteItem > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("deleteItem > axios err=", err);
          reject("Error in deleteItem axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > deleteItem, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


export const portfolioItemPriceRkId = (payLoad) => {
  console.log("portfolioItemService > getItemPrice called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(PORTFOLIO_ITEM_PRICE_RKID(), payLoad, { headers: headersData })
        .then((res) => {
          console.log("getItemPrice > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getItemPrice > axios err=", err);
          reject("Error in getItemPrice axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > getItemPrice, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getItemPrice = (payLoad) => {
  console.log("portfolioItemService > getItemPrice called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(PORTFOLIO_ITEM_PRICE_RKID(), payLoad, { headers: headersData })
        .then((res) => {
          console.log("getItemPrice > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getItemPrice > axios err=", err);
          reject("Error in getItemPrice axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > getItemPrice, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const itemPriceDataId = (searchId) => {
  // console.log("portfolioItemPricedataService > itemPricedataSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PORTFOLIO_ITEM_PRICE_BY_ITEM_ID() + "/" + searchId, { headers: headersData })
        .then((res) => {
          // console.log("itemPricedataSearch > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("itemPricedataSearch > axios err=", err);
          reject("Error in itemPricedataSearch axios!");
        });
    } catch (error) {
      console.error("in portfolioItemPricedataService > itemPricedataSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const updateItemPriceData = (id, payLoad) => {
  console.log("portfolioItemService > updateItemPriceData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${PORTFOLIO_ITEM_PRICE_BY_ITEM_ID()}/${id}`, payLoad, { headers: headersData })
        .then((res) => {
          console.log("updateItemPriceData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateItemPriceData > axios err=", err);
          reject("Error in updateItemPriceData axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > updateItemPriceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const createItemPriceData = (payLoad) => {
  console.log("portfolioItemService > createItemPriceData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(`${PORTFOLIO_ITEM_PRICE_BY_ITEM_ID()}`, payLoad, { headers: headersData })
        .then((res) => {
          console.log("createItemPriceData > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("createItemPriceData > axios err=", err);
          reject("Error in createItemPriceData axios!");
        });
    } catch (error) {
      console.error("in portfolioItemService > createItemPriceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

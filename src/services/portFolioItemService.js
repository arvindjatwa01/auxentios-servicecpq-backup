import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_PORTFOLIO_ITEM,PORTFOLIO_ITEM_SEARCH,PORTFOLIO_ITEM_PRICE_RKID, PORTFOLIO_ITEM_PRICE_BY_ITEM_ID } from "./CONSTANTS";


export const itemCreation = (payLoad) => {
    console.log("portfolioItemService > itemCreation called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(CREATE_PORTFOLIO_ITEM(),payLoad)
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
export const getAllItems = () => {
    console.log("portfolioItemService > getAllItems called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(CREATE_PORTFOLIO_ITEM())
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

  export const itemSearchSuggestion= (family,familyValue) => {
    console.log("portfolioItemService > itemSearchSuggestion called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(CREATE_PORTFOLIO_ITEM()+`/${family}?${family}=${familyValue}`)
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
          .get(PORTFOLIO_ITEM_SEARCH()+searchStr)
          .then((res) => {
            console.log("itemSearch > axios res=", res);
            resolve(res.data);
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
export const getItemPrice = (payLoad) => {
    console.log("portfolioItemService > getItemPrice called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(PORTFOLIO_ITEM_PRICE_RKID(),payLoad)
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
  export const updateItemData = (id,payLoad) => {
    console.log("portfolioItemService > updateItemData called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(`${CREATE_PORTFOLIO_ITEM()}/${id}`,payLoad)
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
          .delete(`${CREATE_PORTFOLIO_ITEM()}/${id}`)
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
  export const itemPriceDataId = (searchId) => {
    // console.log("portfolioItemPricedataService > itemPricedataSearch called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(PORTFOLIO_ITEM_PRICE_BY_ITEM_ID()+"/"+searchId)
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

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_PORTFOLIO_ITEM,PORTFOLIO_ITEM_SEARCH,PORTFOLIO_ITEM_PRICE_RKID } from "./CONSTANTS";


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
  export const saveItemPrice = (id,payLoad) => {
    console.log("portfolioItemService > saveItemPrice called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(`${CREATE_PORTFOLIO_ITEM()}/${id}`,payLoad)
          .then((res) => {
            console.log("saveItemPrice > axios res=", res);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("saveItemPrice > axios err=", err);
            reject("Error in saveItemPrice axios!");
          });
      } catch (error) {
        console.error("in portfolioItemService > saveItemPrice, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
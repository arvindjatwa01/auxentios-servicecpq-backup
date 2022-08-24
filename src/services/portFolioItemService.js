import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_PORTFOLIO_ITEM,PORTFOLIO_ITEM_SEARCH } from "./CONSTANTS";


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
        console.log("CREATE_PORTFOLIO_ITEM()+`/${family}?${family}=${familyValue}`",CREATE_PORTFOLIO_ITEM()+`/${family}?${family}=${familyValue}`)
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

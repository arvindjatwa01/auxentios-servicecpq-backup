import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { CREATE_PORTFOLIO_ITEM } from "./CONSTANTS";


export const itemCreation = (payLoad) => {
    console.log("coverageService > itemCreation called...");
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
        console.error("in coverageService > itemCreation, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
export const getAllItems = () => {
    console.log("coverageService > itemCreation called...");
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
        console.error("in coverageService > getAllItems, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
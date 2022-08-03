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
            resolve(res.data);
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
// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { SEARCH_COMPONENT_CODE } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
const headersdata = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  'Authorization': accessToken != undefined ? accessToken : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */


/**
 * Function to get suggetions for component Codes
 */
export const getComponentCodeSuggetions = (query) => {
  console.log("coverageService > getComponentCodeSuggetions called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_COMPONENT_CODE(query), { headers: headersdata })
        .then((res) => {
          console.log("getComponentCodeSuggetions > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getComponentCodeSuggetions > axios err=", err);
          reject("Error in getComponentCodeSuggetions axios!");
        });
    } catch (error) {
      console.error("in coverageService > getComponentCodeSuggetions, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { SCHEMA_CONFIG } from "./CONSTANTS";

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
 * Function to fetch the Portfolio Schema.
 */
export const getPortfolioSchema = () => {
  console.log("Schema Config Service > getPortfolioSchema called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SCHEMA_CONFIG() + "/portfolio", { headers: headersdata })
        .then((res) => {
          console.log("getPortfolioSchemas > axios res=", res);
          resolve(res.data);
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

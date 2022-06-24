// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { SCHEMA_CONFIG } from "./CONSTANTS";

/**
 * Function to fetch the Portfolio Schema.
 */
export const getPortfolioSchema = () => {
  console.log("Schema Config Service > getPortfolioSchema called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SCHEMA_CONFIG() + "/portfolio")
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

// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GUIDED_SOLUTIONS } from "./CONSTANTS";

/**
 * Function to fetch the Portfolio Schema.
 */
export const getGuidedSolution = () => {
  console.log("Schema Config Service > getGuidedSolution called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GUIDED_SOLUTIONS())
        .then((res) => {
          // console.log("getGuidedSolution > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getGuidedSolution > axios err=", err);
          reject("Error in getGuidedSolution axios!");
        });
    } catch (error) {
      console.error("in servicePortfolio > getGuidedSolution, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

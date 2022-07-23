import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_SEARCH_COVERAGE } from "./CONSTANTS";


export const getSearchQueryCoverage = (searchStr) => {
    console.log("Query coverageService > getSearchQueryCoverage called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(GET_SEARCH_COVERAGE + searchStr)
          .then((res) => {
            console.log("getSearchQueryCoverage > axios res=", res);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("getSearchQueryCoverage > axios err=", err);
            reject("Error in getSearchQueryCoverage axios!");
          });
      } catch (error) {
        console.error("in Query coverageService > getSearchQueryCoverage, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
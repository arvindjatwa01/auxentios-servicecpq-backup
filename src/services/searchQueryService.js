import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { GET_SEARCH_COVERAGE,GET_SEARCH_FAMILY_COVERAGE } from "./CONSTANTS";


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
export const getSearchCoverageForFamily = (familyValue) => {
    console.log("Query coverageService > getSearchCoverageForFamily called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(GET_SEARCH_FAMILY_COVERAGE +familyValue)
          .then((res) => {
            console.log("getSearchCoverageForFamily > axios res=", res);
            resolve(res.data);
          })
          .catch((err) => {
            console.log("getSearchCoverageForFamily > axios err=", err);
            reject("Error in getSearchCoverageForFamily axios!");
          });
      } catch (error) {
        console.error("in Query coverageService > getSearchCoverageForFamily, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
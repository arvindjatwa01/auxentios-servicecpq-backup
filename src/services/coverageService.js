// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { COVERAGE_REST, CUSTOM_COVERAGE_REST } from "./CONSTANTS";

/**
 * Function to fetch Make keyvalue.
 */
export const getMakeKeyValue = () => {
  console.log("coverageService > getMakeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(COVERAGE_REST() + "/make")
        .then((res) => {
          console.log("getMakeKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getMakeKeyValue > axios err=", err);
          reject("Error in getMakeKeyValue axios!");
        });
    } catch (error) {
      console.error("in coverageService > getMakeKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch Model keyvalue.
 */
export const getModelKeyValue = () => {
  console.log("coverageService > getModelKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(COVERAGE_REST() + "/model")
        .then((res) => {
          console.log("getModelKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getModelKeyValue > axios err=", err);
          reject("Error in getModelKeyValue axios!");
        });
    } catch (error) {
      console.error("in coverageService > getModelKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch Prefix keyvalue.
 */
export const getPrefixKeyValue = () => {
  console.log("coverageService > getPrefixKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(COVERAGE_REST() + "/prefix")
        .then((res) => {
          console.log("getPrefixKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getPrefixKeyValue > axios err=", err);
          reject("Error in getPrefixKeyValue axios!");
        });
    } catch (error) {
      console.error("in coverageService > getPrefixKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
export const createCoverage = (data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(COVERAGE_REST(),data)
        .then((res) => {
          console.log("createCoverage > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("createCoverage > axios err=", err);
          reject("Error in createCoverage axios!");
        });
    } catch (error) {
      console.error("in coverageService > createCoverage, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const createCutomCoverage = (data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CUSTOM_COVERAGE_REST(),data)
        .then((res) => {
          console.log("createCoverage > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("createCoverage > axios err=", err);
          reject("Error in createCoverage axios!");
        });
    } catch (error) {
      console.error("in coverageService > createCoverage, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


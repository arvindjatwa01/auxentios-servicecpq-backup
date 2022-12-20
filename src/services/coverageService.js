// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { COVERAGE_REST, CUSTOM_COVERAGE_REST } from "./CONSTANTS";

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
 * Function to fetch Make keyvalue.
 */
export const getMakeKeyValue = () => {
  console.log("coverageService > getMakeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(COVERAGE_REST() + "/make", { headers: headersdata })
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
        .get(COVERAGE_REST() + "/model", { headers: headersdata })
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
        .get(COVERAGE_REST() + "/prefix", { headers: headersdata })
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

// Create Portfolio Coverage 
export const createCoverage = (data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(COVERAGE_REST(), data, { headers: headersdata })
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

// Update Portfolio Coverage 
export const updateCoverage = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${COVERAGE_REST()}/${id}`, data, { headers: headersdata })
        .then((res) => {
          console.log("updateCoverage > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateCoverage > axios err=", err);
          reject("Error in updateCoverage axios!");
        });
    } catch (error) {
      console.error("in coverageService > updateCoverage, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

// Create Custom Portfolio  Coverage Data 
export const createCustomCoverage = (data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CUSTOM_COVERAGE_REST(), data, { headers: headersdata })
        .then((res) => {
          console.log("createCustomCoverage > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("createCustomCoverage > axios err=", err);
          reject("Error in createCustomCoverage axios!");
        });
    } catch (error) {
      console.error("in coverageService > createCustomCoverage, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


// Update Custom Portfolio  Coverage Data 
export const updateCustomCoverage = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(`${CUSTOM_COVERAGE_REST()}/${id}`, data, { headers: headersdata })
        .then((res) => {
          console.log("updateCustomCoverage > axios res=", res);
          // resolve(res.data);
          resolve(res);
        })
        .catch((err) => {
          console.log("updateCustomCoverage > axios err=", err);
          reject("Error in updateCustomCoverage axios!");
        });
    } catch (error) {
      console.error("in coverageService > updateCustomCoverage, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

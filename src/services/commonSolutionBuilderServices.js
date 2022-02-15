// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { Common_SOLUTION_BUILDER_URL } from "./CONSTANTS";

/**
 * Function to fetch usage-category keyvalue.
 */
export const getUsageCategoryKeyValue = () => {
  console.log("commonSolutionBuilder > getUsageCategoryKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/usage-category")
        .then((res) => {
          console.log("getUsageCategoryKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getUsageCategoryKeyValue > axios err=", err);
          reject("Error in getUsageCategoryKeyValue axios!");
        });
    } catch (error) {
      console.error("in userServices > getUsageCategoryKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch strategy task keyvalue.
 */
export const getStrategyTaskKeyValue = () => {
  console.log("commonSolutionBuilder > getStrategyTaskKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/strategy-task")
        .then((res) => {
          console.log("getStrategyTaskKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getStrategyTaskKeyValue > axios err=", err);
          reject("Error in getStrategyTaskKeyValue axios!");
        });
    } catch (error) {
      console.error("in userServices > getStrategyTaskKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch product hierarchy keyvalue.
 */
export const getProductHierarchyKeyValue = () => {
  console.log("commonSolutionBuilder > getProductHierarchyKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/product-hierarchy")
        .then((res) => {
          console.log("getProductHierarchyKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getProductHierarchyKeyValue > axios err=", err);
          reject("Error in getProductHierarchyKeyValue axios!");
        });
    } catch (error) {
      console.error("in userServices > getProductHierarchyKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch Gergraphic keyvalue.
 */
export const getGergraphicKeyValue = () => {
  console.log("commonSolutionBuilder > getGergraphicKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/geographic")
        .then((res) => {
          console.log("getGergraphicKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getGergraphicKeyValue > axios err=", err);
          reject("Error in getGergraphicKeyValue axios!");
        });
    } catch (error) {
      console.error("in userServices > getGergraphicKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch type keyvalue.
 */
export const getTypeKeyValue = () => {
  console.log("commonSolutionBuilder > getTypeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/type")
        .then((res) => {
          console.log("getTypeKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getTypeKeyValue > axios err=", err);
          reject("Error in getTypeKeyValue axios!");
        });
    } catch (error) {
      console.error("in userServices > getTypeKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch Machine Type keyvalue.
 */
export const getMachineTypeKeyValue = () => {
  console.log("commonSolutionBuilder > getMachineTypeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/machine-type")
        .then((res) => {
          console.log("getMachineTypeKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getMachineTypeKeyValue > axios err=", err);
          reject("Error in getMachineTypeKeyValue axios!");
        });
    } catch (error) {
      console.error("in userServices > getMachineTypeKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
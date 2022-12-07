// All user related database operations can be defined here.

import { SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import { Common_SOLUTION_BUILDER_URL, GET_AUDIT_SERVICE_DATA } from "./CONSTANTS";

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
 * Function to fetch usage-category keyvalue.
 */
export const getUsageCategoryKeyValue = () => {
  // console.log("commonSolutionBuilder > getUsageCategoryKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/usage-category", { headers: headersdata })
        .then((res) => {
          // console.log("getUsageCategoryKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getUsageCategoryKeyValue > axios err=", err);
          reject("Error in getUsageCategoryKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getUsageCategoryKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch strategy task keyvalue.
 */
export const getStrategyTaskKeyValue = () => {
  // console.log("commonSolutionBuilder > getStrategyTaskKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/strategy-task", { headers: headersdata })
        .then((res) => {
          // console.log("getStrategyTaskKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getStrategyTaskKeyValue > axios err=", err);
          reject("Error in getStrategyTaskKeyValue axios!");
        });
    } catch (error) {
      console.error("in userServices > getStrategyTaskKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch response Time keyvalue.
 */
export const getResponseTimeTaskKeyValue = () => {
  // console.log("commonSolutionBuilder > getResponseTimeTaskKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/response-time", { headers: headersdata })
        .then((res) => {
          // console.log("getResponseTimeTaskKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getResponseTimeTaskKeyValue > axios err=", err);
          reject("Error in getResponseTimeTaskKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getResponseTimeTaskKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to Validity keyvalue.
 */
export const getValidityKeyValue = () => {
  // console.log("commonSolutionBuilder > getValidityKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/validity", { headers: headersdata })
        .then((res) => {
          // console.log("getValidityKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getValidityKeyValue > axios err=", err);
          reject("Error in getValidityKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getValidityKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to Fetch Task Type keyvalue.
 */
export const getTaskTypeKeyValue = () => {
  // console.log("commonSolutionBuilder > getTaskTypeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/task-type", { headers: headersdata })
        .then((res) => {
          // console.log("getTaskTypeKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getTaskTypeKeyValue > axios err=", err);
          reject("Error in getTaskTypeKeyValue axios!");
        });
    } catch (error) {
      // console.error("in commonSoltutionBuilderService > getTaskTypeKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch product hierarchy keyvalue.
 */
export const getProductHierarchyKeyValue = () => {
  // console.log("commonSolutionBuilder > getProductHierarchyKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/product-hierarchy", { headers: headersdata })
        .then((res) => {
          // console.log("getProductHierarchyKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getProductHierarchyKeyValue > axios err=", err);
          reject("Error in getProductHierarchyKeyValue axios!", { headers: headersdata });
        });
    } catch (error) {
      // console.error("in userServices > getProductHierarchyKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch Gergraphic keyvalue.
 */
export const getGergraphicKeyValue = () => {
  // console.log("commonSolutionBuilder > getGergraphicKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/geographic", { headers: headersdata })
        .then((res) => {
          // console.log("getGergraphicKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getGergraphicKeyValue > axios err=", err);
          reject("Error in getGergraphicKeyValue axios!", { headers: headersdata });
        });
    } catch (error) {
      // console.error("in userServices > getGergraphicKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch type keyvalue.
 */
export const getTypeKeyValue = () => {
  // console.log("commonSolutionBuilder > getTypeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/type", { headers: headersdata })
        .then((res) => {
          // console.log("getTypeKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getTypeKeyValue > axios err=", err);
          reject("Error in getTypeKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getTypeKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
/**
 * Function to fetch Machine Type keyvalue.
 */
export const getMachineTypeKeyValue = () => {
  // console.log("commonSolutionBuilder > getMachineTypeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/machine-type", { headers: headersdata })
        .then((res) => {
          // console.log("getMachineTypeKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getMachineTypeKeyValue > axios err=", err);
          reject("Error in getMachineTypeKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getMachineTypeKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch Life Stage of Machine keyvalue.
 */
export const getLifeStageKeyValue = () => {
  // console.log("commonSolutionBuilder > getLifeStageKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/life-stage-of-machine", { headers: headersdata })
        .then((res) => {
          // console.log("getLifeStageKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getLifeStageKeyValue > axios err=", err);
          reject("Error in getLifeStageKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getLifeStageKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch Solution Level keyvalue.
 */
export const getSolutionTypeKeyValue = () => {
  // console.log("commonSolutionBuilder > getSolutionTypeKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/solution-type", { headers: headersdata })
        .then((res) => {
          // console.log("getSolutionTypeKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getSolutionTypeKeyValue > axios err=", err);
          reject("Error in getSolutionTypeKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getSolutionTypeKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

/**
 * Function to fetch Solution Level keyvalue.
 */
export const getSolutionLevelKeyValue = () => {
  // console.log("commonSolutionBuilder > getSolutionLevelKeyValue called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(Common_SOLUTION_BUILDER_URL() + "/solution-level", { headers: headersdata })
        .then((res) => {
          // console.log("getSolutionLevelKeyValue > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getSolutionLevelKeyValue > axios err=", err);
          reject("Error in getSolutionLevelKeyValue axios!");
        });
    } catch (error) {
      // console.error("in userServices > getSolutionLevelKeyValue, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * Function to audit Rest servicekeyvalue.
 */
export const getAuditRestServiceData = (searchText) => {
  // console.log("commonSolutionBuilder > getAuditRestServiceData called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(GET_AUDIT_SERVICE_DATA + searchText, { headers: headersdata })
        .then((res) => {
          // console.log("getAuditRestServiceData > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          // console.log("getAuditRestServiceData > axios err=", err);
          reject("Error in getAuditRestServiceData axios!");
        });
    } catch (error) {
      // console.error("in userServices > getAuditRestServiceData, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
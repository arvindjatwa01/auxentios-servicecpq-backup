import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { SEARCH_COMPONENT_CODE, SEARCH_CONSUMABLE, SEARCH_CUSTOMER, SEARCH_EQUIPMENT, SEARCH_EXTWORK, SEARCH_JOB_CODE, SEARCH_MACHINE, SEARCH_SPAREPART, SEARCH_SPAREPART_MARGIN, SEARCH_VENDOR, validate_Coverage_Get_Url } from "./CONSTANTS";

/* ----------------- Authorization ------------------- */

var accessToken = localStorage.getItem("access_token");
var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
  getCookiesJsonData = JSON.parse(CookiesSetData);
}
//  else {
//   getCookiesJsonData = {
//     access_token: "Bearer null",
//   }
// }
// var getCookiesJsonData = JSON.parse(CookiesSetData);
const headersData = {
  'content-type': 'application/json',
  'Accept': 'application/json',
  // 'Authorization': accessToken != undefined ? accessToken : ''
  'Authorization': CookiesSetData != undefined ? getCookiesJsonData?.access_token : ''
  // 'Authorization': url.Auth_Token
}

/* ------------------------------------------------------------ */


//Search Customer based on the search criteria to fill the header
export const customerSearch = (searchStr) => {
  console.log("RepairBuilder > customerSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_CUSTOMER(searchStr), { headers: headersData })
        .then((res) => {
          console.log("customerSearch > axios res=", res);
          if (res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while fetching customer data');
        })
        .catch((err) => {
          console.log("customerSearch > axios err=", err);
          reject("Error in customerSearch axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > customerSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search machine from equipment master based on the search criteria
export const machineSearch = (searchStr) => {
  console.log("RepairBuilder > machineSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_MACHINE(searchStr), { headers: headersData })
        .then((res) => {
          console.log("machineSearch > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("machineSearch > axios err=", err);
          reject("Error in itemSearch axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > machineSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search Spare Part based on the search criteria
export const sparePartSearch = async (searchStr) => {
  console.log("RepairBuilder > sparePartSearch called...");
  return new Promise(async (resolve, reject) => {
    try {
      await axios
        .get(SEARCH_SPAREPART(searchStr), { headers: headersData })
        .then((res) => {
          console.log("sparePartSearch > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in Search Sparepart axios!");
          }
        })
        .catch((err) => {
          console.log("sparePartSearch > axios err=", err);
          reject("Error in itemSearch axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > sparePartSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search Spare Part with margin based on the search criteria (Remove this after actual API is created)
export const sparePartSearchMargin = async (searchStr) => {
  console.log("RepairBuilder > sparePartSearch called...");
  return new Promise(async (resolve, reject) => {
    try {
      await axios
        .get(SEARCH_SPAREPART_MARGIN(searchStr), { headers: headersData })
        .then((res) => {
          console.log("sparePartSearch > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in Search Sparepart axios!");
          }
        })
        .catch((err) => {
          console.log("sparePartSearch > axios err=", err);
          reject("Error in itemSearch axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > sparePartSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search list of jobcodes based on entered jobcode
export const jobCodeSearch = (searchStr) => {
  console.log("RepairBuilder > jobCodeSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_JOB_CODE(searchStr), { headers: headersData })
        .then((res) => {
          console.log("jobCodeSearch > axios res=", res);
          if (res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while fetching job codes');
        })
        .catch((err) => {
          console.log("jobCodeSearch > axios err=", err);
          reject("Error in jobCodeSearch axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > jobCodeSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


/**
 * Function to get suggetions for component Codes
 */
export const getComponentCodeSuggetions = (query) => {
  console.log("coverageService > getComponentCodeSuggetions called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_COMPONENT_CODE(query), { headers: headersData })
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


/**
 * Function to get suggetions for vendors
 */
export const getVendors = (query) => {
  console.log("SearchService > getVendors called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_VENDOR(query), { headers: headersData })
        .then((res) => {
          console.log("getVendors > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getVendors > axios err=", err);
          reject("Error in getVendors axios!");
        });
    } catch (error) {
      console.error("in SearchService > getVendors, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getConsumables = (query) => {
  console.log("SearchService > getConsumables called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_CONSUMABLE(query), { headers: headersData })
        .then((res) => {
          console.log("getConsumables > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getConsumables > axios err=", err);
          reject("Error in getConsumables axios!");
        });
    } catch (error) {
      console.error("in SearchService > getConsumables, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getExtWork = (query) => {
  console.log("SearchService > getExtWork called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_EXTWORK(query), { headers: headersData })
        .then((res) => {
          console.log("getExtWork > axios res=", res);
          resolve(res.data);
        })
        .catch((err) => {
          console.log("getExtWork > axios err=", err);
          reject("Error in getExtWork axios!");
        });
    } catch (error) {
      console.error("in SearchService > getExtWork, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const getValidateCoverage = (rObj) => {
  console.log("SearchService > getValidateCoverage called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(validate_Coverage_Get_Url, { params: rObj, headers: headersData })
        .then((res) => {
          console.log("getValidateCoverage > axios res=", res);
          resolve(res);
        })
        .catch((err) => {
          console.log("getValidateCoverage > axios err=", err);
          reject("Error in getValidateCoverage axios!");
        });
    } catch (error) {
      console.error("in SearchService > getValidateCoverage, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
}


//Search Equipment based on the search criteria
export const equipmentSearch = async (searchStr) => {
  console.log("searchServices > equipmentSearch called...");
  return new Promise(async (resolve, reject) => {
    try {
      await axios
        .get(SEARCH_EQUIPMENT(searchStr), {headers: headersData})
        .then((res) => {
          console.log("equipmentSearch > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in Search Sparepart axios!");
          }
        })
        .catch((err) => {
          console.log("equipmentSearch > axios err=", err);
          reject("Error in itemSearch axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > equipmentSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
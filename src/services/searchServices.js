import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import { SEARCH_COMPONENT_CODE, SEARCH_CUSTOMER, SEARCH_JOB_CODE, SEARCH_MACHINE, SEARCH_SPAREPART } from "./CONSTANTS";

//Search Customer based on the search criteria to fill the header
export const customerSearch =  (searchStr) => {
    console.log("RepairBuilder > customerSearch called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(SEARCH_CUSTOMER(searchStr))
          .then((res) => {
            console.log("customerSearch > axios res=", res);
            if(res.status === 200)
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
          .get(SEARCH_MACHINE(searchStr))
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
          .get(SEARCH_SPAREPART(searchStr))
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
  export const jobCodeSearch =  (searchStr) => {
    console.log("RepairBuilder > jobCodeSearch called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(SEARCH_JOB_CODE(searchStr))
          .then((res) => {
            console.log("jobCodeSearch > axios res=", res);
            if(res.status === 200)
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
          .get(SEARCH_COMPONENT_CODE(query))
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

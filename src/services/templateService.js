import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import { FETCH_KIT, FETCH_REPAIR_BUILDER_KIT, FETCH_TEMPLATE, SEARCH_KIT, SEARCH_TEMPLATE, UPDATE_KIT_COVERAGE, UPDATE_KIT_CUSTOMER, UPDATE_KIT_ESTIMATION, UPDATE_KIT_GENERAL_DETAIL, UPDATE_KIT_MACHINE, UPDATE_KIT_PRICE, UPDATE_KIT_STATUS } from "./CONSTANTS";

const accessToken = localStorage.getItem("access_token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${accessToken}`,
  },
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
};

//Update KIT with customer data
export const updateKITCustomer = (kitId, data) => {
    console.log("service KIT > updateKITCustomer called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(UPDATE_KIT_CUSTOMER(kitId), data, config)
          .then((res) => {
            console.log("updateKITCustomer > axios res=", res);
            if (res.status === 200) {
              resolve(res.data);
            } else {
              console.log("Status:", res.status);
              reject("Error in updateKITCustomer axios!");
            }
          })
          .catch((err) => {
            console.log("updateKITCustomer axios err :", err);
            reject("Error in updateKITCustomer axios!");
          });
      } catch (error) {
        console.error("Genreal Exception updateKITCustomer : ", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
  
  //Update KIT with machine data
  export const updateKITMachine = (kitId, data) => {
    console.log("service KIT > updateKITMachine called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(UPDATE_KIT_MACHINE(kitId), data, config)
          .then((res) => {
            console.log("updateKITMachine > axios res=", res);
            if (res.status === 200) {
              resolve(res.data);
            } else {
              console.log("Error Status:", res.status);
              reject("Error in updateKITMachine axios!");
            }
          })
          .catch((err) => {
            console.log("updateKITMachine axios err :", err);
            reject("Error in updateKITMachine axios!");
          });
      } catch (error) {
        console.error("Genreal Exception updateKITMachine : ", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
  
  //Update KIT with estimation data
  export const updateKITEstimation = (kitId, data) => {
    console.log("service KIT > updateKITEstimation called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(UPDATE_KIT_ESTIMATION(kitId), data, config)
          .then((res) => {
            console.log("updateKITEstimation > axios res=", res);
            if (res.status === 200) {
              resolve(res.data);
            } else {
              console.log("Error Status:", res.status);
              reject("Error in updateKITEstimation axios!");
            }
          })
          .catch((err) => {
            console.log("updateKITEstimation axios err :", err);
            reject("Error in updateKITEstimation axios!");
          });
      } catch (error) {
        console.error("Genreal Exception updateKITEstimation : ", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
  
  //Update kit with General Details data
  export const updateKITGeneralDet = (kitId, data) => {
    console.log("service Repair > updateKITGeneralDet called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(UPDATE_KIT_GENERAL_DETAIL(kitId), data, config)
          .then((res) => {
            console.log("updateKITGeneralDet > axios res=", res); 
            if (res.status === 200) {
              resolve(res.data);
            } else {
              console.log("Error Status:", res.status);
              reject("Error in updateKITGeneralDetails axios!");
            }
          })
          .catch((err) => {
            console.log("updateKITGeneralDet axios err :", err);
            reject("Error in updateKITGeneralDet axios!");
          });
      } catch (error) {
        console.error("Genreal Exception updateKITGeneralDet : ", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
  
  //Update kit with Price Details data
  export const updateKITPrice = (kitId, data) => {
    console.log("service Repair > updateKITPrice called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(UPDATE_KIT_PRICE(kitId), data, config)
          .then((res) => {
            console.log("updateKITPrice > axios res=", res);
            if (res.status === 200) {
              resolve(res.data);
            } else {
              console.log("Error Status:", res.status);
              reject("Error in updateKITPrice axios!");
            }
          })
          .catch((err) => {
            console.log("updateKITPrice axios err :", err);
            reject("Error in updateKITPrice axios!");
          });
      } catch (error) {
        console.error("Genreal Exception updateKITPrice : ", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
  
  //Update kit with Coverage Details data
  export const updateKITCoverage = (kitId, data) => {
    console.log("service Repair > updateKITCoverage called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(UPDATE_KIT_COVERAGE(kitId), data, config)
          .then((res) => {
            console.log("updateKITCoverage > axios res=", res);
            if (res.status === 200) {
              resolve(res.data);
            } else {
              console.log("Error Status:", res.status);
              reject("Error in updateKITCoverage axios!");
            }
          })
          .catch((err) => {
            console.log("updateKITCoverage axios err :", err);
            reject("Error in updateKITCoverage axios!");
          });
      } catch (error) {
        console.error("Genreal Exception updateKITCoverage : ", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
  
//Search Templates
export const templateSearch =  (searchStr) => {
    console.log("RepairBuilder > templateSearch called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(SEARCH_TEMPLATE(searchStr), config)
          .then((res) => {
            console.log("templateSearch > axios res=", res);
            if(res.status === 200)
              resolve(res.data);
            else
              reject('Error occurred while fetching kits');
          })
          .catch((err) => {
            console.log("templateSearch > axios err=", err);
            reject("Error in templateSearch axios!");
          });
      } catch (error) {
        console.error("in RepairBuilder > templateSearch, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };

//Search templates
export const fetchTemplateDetails =  (templateId) => {
    console.log("templateService > fetchTemplateDetails called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(FETCH_TEMPLATE(templateId), config)
          .then((res) => {
            console.log("fetchTemplateDetails > axios res=", res);
            if(res.status === 200)
              resolve(res.data);
            else
              reject('Error occurred while fetching template details');
          })
          .catch((err) => {
            console.log("fetchTemplateDetails > axios err=", err);
            reject("Error in fetchTemplateDetails axios!");
          });
      } catch (error) {
        console.error("in templateService > fetchTemplateDetails, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };

  
//update status of the KIT (Active, Draft, Revised, Archived)
export const updateKITStatus =  (kitId, status) => {
    console.log("KIT > updateKITStatus called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(UPDATE_KIT_STATUS(kitId, status), {}, config)
          .then((res) => {
            console.log("updateKITStatus > axios res=", res);
            if(res.status === 200)
              resolve(res.data);
            else
              reject('Error occurred while calling updateKITStatus');
          })
          .catch((err) => {
            console.log("updateKITStatus > axios err=", err);
            reject("Error in updateKITStatus axios!");
          });
      } catch (error) {
        console.error("in KIT > updateKITStatus, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };
  
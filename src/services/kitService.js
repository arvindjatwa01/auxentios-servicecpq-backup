import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import { FETCH_KIT, FETCH_REPAIR_BUILDER_KIT, SEARCH_KIT, UPDATE_KIT_COVERAGE, UPDATE_KIT_CUSTOMER, UPDATE_KIT_ESTIMATION, UPDATE_KIT_GENERAL_DETAIL, UPDATE_KIT_PRICE, UPDATE_KIT_STATUS } from "./CONSTANTS";

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
  
//Search Kits
export const kitSearch =  (searchStr) => {
    console.log("RepairBuilder > kitSearch called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(SEARCH_KIT(searchStr), config)
          .then((res) => {
            console.log("kitSearch > axios res=", res);
            if(res.status === 200)
              resolve(res.data);
            else
              reject('Error occurred while fetching kits');
          })
          .catch((err) => {
            console.log("kitSearch > axios err=", err);
            reject("Error in kitSearch axios!");
          });
      } catch (error) {
        console.error("in RepairBuilder > kitSearch, Err===", error);
        reject(SYSTEM_ERROR);
      }
    });
  };

//Search Kits
export const fetchKITDetails =  (kitId) => {
    console.log("kitService > fetchKITDetails called...");
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(FETCH_KIT(kitId), config)
          .then((res) => {
            console.log("fetchKITDetails > axios res=", res);
            if(res.status === 200)
              resolve(res.data);
            else
              reject('Error occurred while fetching KIT details');
          })
          .catch((err) => {
            console.log("fetchKITDetails > axios err=", err);
            reject("Error in fetchKITDetails axios!");
          });
      } catch (error) {
        console.error("in kitService > fetchKITDetails, Err===", error);
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
  
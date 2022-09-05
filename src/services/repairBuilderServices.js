import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import {
  ADD_REPAIR_BUILDER_PARTLIST,
  ADD_REPAIR_PART_TO_PARTLIST,
  CREATE_REPAIR_BUILDER,
  SEARCH_CUSTOMER,
  SEARCH_MACHINE,
  SEARCH_SPAREPART,
  UPDATE_REPAIR_CUSTOMER,
  UPDATE_REPAIR_ESTIMATION_TEAM,
  UPDATE_REPAIR_GENERAL_DETAILS,
  UPDATE_REPAIR_MACHINE,
  UPDATE_REPAIR_PRICE,
} from "./CONSTANTS";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5pc2hAdGVzdC5jb20iLCJzY29wZXMiOiJURU5BTlRfQURNSU4iLCJpYXQiOjE2NTc1Njg0NjYsImV4cCI6MTY1NzU4NjQ2Nn0.yNbrVCJJNmYubD4YkowfLtmOiDbfeE3JeKNpU5Jp0nc`,
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
};

//Create repair builder
export const createBuilder = (data) => {
  console.log("service repairbuilder > createBuilder called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_REPAIR_BUILDER(), data, config)
        .then((res) => {
          console.log("repairbuilder -> CreateBuilder response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("CreateBuilder > axios err=", err);
          reject("Error in CreateBuilder axios!");
        });
    } catch (error) {
      console.error("CreateBuilder general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Create Partlist for the builder
export const addPartlist = (builderId, data) => {
  console.log("service repairbuilder > add partlist called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_REPAIR_BUILDER_PARTLIST(builderId), data, config)
        .then((res) => {
          console.log("repairbuilder -> add part list response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("addPrtList > axios err=", err);
          reject("Error in CreateBuilder axios!");
        });
    } catch (error) {
      console.error("addPartList general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search Customer based on the search criteria to fill the header
export const customerSearch = (searchStr) => {
  console.log("RepairBuilder > customerSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_CUSTOMER(searchStr))
        .then((res) => {
          console.log("customerSearch > axios res=", res);
          resolve(res);
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

//Search machine based on the search criteria to fill the header
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
export const sparePartSearch = (searchStr) => {
  console.log("RepairBuilder > sparePartSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
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

//Update builder with customer data
export const updateBuilderCustomer = (builderId, data) => {
  console.log("service Repair > updateBuilderCustomer called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_CUSTOMER(builderId), data, config)
        .then((res) => {
          console.log("updateBuilderCustomer > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Status:", res.status);
            reject("Error in updateBuilderCustomer axios!");
          }
        })
        .catch((err) => {
          console.log("updateBuilderCustomer axios err :", err);
          reject("Error in updateBuilderCustomer axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateBuilderCustomer : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update builder with machine data
export const updateBuilderMachine = (builderId, data) => {
  console.log("service Repair > updateBuilderMachine called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_MACHINE(builderId), data, config)
        .then((res) => {
          console.log("updateBuilderMachine > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateBuilderMachine axios!");
          }
        })
        .catch((err) => {
          console.log("updateBuilderMachine axios err :", err);
          reject("Error in updateBuilderMachine axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateBuilderMachine : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update builder with estimation data
export const updateBuilderEstimation = (builderId, data) => {
  console.log("service Repair > updateBuilderEstimation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_ESTIMATION_TEAM(builderId), data, config)
        .then((res) => {
          console.log("updateBuilderEstimation > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateBuilderEstimation axios!");
          }
        })
        .catch((err) => {
          console.log("updateBuilderEstimation axios err :", err);
          reject("Error in updateBuilderEstimation axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateBuilderEstimation : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update builder with General Details data
export const updateBuilderGeneralDet = (builderId, data) => {
  console.log("service Repair > updateBuilderGeneralDet called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_GENERAL_DETAILS(builderId), data, config)
        .then((res) => {
          console.log("updateBuilderGeneralDet > axios res=", res); 
          if (res.status === 200) {
            resolve(res);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateBuilderGeneralDetails axios!");
          }
        })
        .catch((err) => {
          console.log("updateBuilderGeneralDet axios err :", err);
          reject("Error in updateBuilderGeneralDet axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateBuilderGeneralDet : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update builder with Price Details data
export const updateBuilderPrice = (builderId, data) => {
  console.log("service Repair > updateBuilderPrice called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_PRICE(builderId), data, config)
        .then((res) => {
          console.log("updateBuilderPrice > axios res=", res);
          if (res.status === 200) {
            resolve(res);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateBuilderPrice axios!");
          }
        })
        .catch((err) => {
          console.log("updateBuilderPrice axios err :", err);
          reject("Error in updateBuilderPrice axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateBuilderPrice : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add single spareparts to the partlist builder
export const addPartToPartList = (partListId, data) => {
  console.log("service repairbuilder > addPartToPartList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_REPAIR_PART_TO_PARTLIST(partListId), data, config)
        .then((res) => {
          console.log("repairbuilder -> addPartToPartList response: ", res);
          if (res.status === 200) {
            resolve(res);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in addPartToPartList axios!");
          }          
        })
        .catch((err) => {
          console.log("addPartToPartList > axios err=", err);
          reject("Error in addPartToPartList axios!");
        });
    } catch (error) {
      console.error("addPartToPartList general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

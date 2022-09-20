import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import {
  ADD_REPAIR_BUILDER_PARTLIST,
  ADD_REPAIR_MULTI_PARTS_TO_PARTLIST,
  ADD_REPAIR_PART_TO_PARTLIST,
  ADD_SEGMENT_OPERATION,
  CREATE_BUILDER_SEGMENT,
  CREATE_BUILDER_VERSION,
  CREATE_REPAIR_BUILDER,
  FETCH_BUILDER_DETAILS,
  FETCH_BUILDER_VERSION_DETAILS,
  FETCH_PARTS_OF_PARTLIST,
  FETCH_REPAIR_BUILDER_PARTLIST,
  SEARCH_CUSTOMER,
  SEARCH_MACHINE,
  SEARCH_SPAREPART,
  UPDATE_REPAIR_CUSTOMER,
  UPDATE_REPAIR_ESTIMATION_TEAM,
  UPDATE_REPAIR_GENERAL_DETAILS,
  UPDATE_REPAIR_MACHINE,
  UPDATE_REPAIR_PRICE,
  UPDATE_REPAIR_STATUS,
  UPLOAD_REPAIR_PARTS_TO_PARTLIST,
} from "./CONSTANTS";
const accessToken = Cookies.get("accessToken");

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


//Create repair Segment for a builder
export const createSegment = (builderId, data) => {
  console.log("service repairbuilder > createSegment called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_BUILDER_SEGMENT(builderId), data, config)
        .then((res) => {
          console.log("repairbuilder -> createSegment response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("createSegment > axios err=", err);
          reject("Error in createSegment axios!");
        });
    } catch (error) {
      console.error("CreateBuilder general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Add Option to the Segment of a builder
export const AddOperation = (segmentId, data) => {
  console.log("service repairbuilder > AddOperation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_SEGMENT_OPERATION(segmentId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddOperation response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("createSegment > axios err=", err);
          reject("Error in AddOperation axios!");
        });
    } catch (error) {
      console.error("AddOperation general exception", error);
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
            resolve(res.data);
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
            resolve(res.data);
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

//Add single sparepart to the partlist builder
export const addPartToPartList = (partListId, data) => {
  console.log("service repairbuilder > addPartToPartList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_REPAIR_PART_TO_PARTLIST(partListId), data, config)
        .then((res) => {
          console.log("repairbuilder -> addPartToPartList response: ", res);
          if (res.status === 200) {
            resolve(res.data);
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


//Add multiple spareparts to the partlist builder
export const addMultiPartsToPartList = (partListId, data) => {
  console.log("service repairbuilder > addPartToPartList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(ADD_REPAIR_MULTI_PARTS_TO_PARTLIST(partListId), data, config)
        .then((res) => {
          console.log("repairbuilder -> addMultiPartsToPartList response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in addMultiPartsToPartList axios!");
          }          
        })
        .catch((err) => {
          console.log("addPartToPartList > axios err=", err);
          reject("Error in addMultiPartsToPartList axios!");
        });
    } catch (error) {
      console.error("addMultiPartsToPartList general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//upload parts through the excel sheet
export const uploadPartsToPartlist = (partListId, file) => {
  console.log("service repairbuilder > uploadParts called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(UPLOAD_REPAIR_PARTS_TO_PARTLIST(partListId), file, config)
        .then((res) => {
          console.log("repairbuilder -> uploadParts response: ", res);
          if (res.status === 200 || res.status === 201) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in uploadParts axios!");
          }          
        })
        .catch((err) => {
          console.log("addPartToPartList > axios err=", err);
          reject("Error in uploadParts axios!");
        });
    } catch (error) {
      console.error("uploadParts general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//update status of the builder (Active, Draft, Revised, Archived)
export const updateBuilderStatus =  (builderId, status) => {
  console.log("RepairBuilder > updateBuilderStatus called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_REPAIR_STATUS(builderId, status), {}, config)
        .then((res) => {
          console.log("updateBuilderStatus > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling updateBuilderStatus');
        })
        .catch((err) => {
          console.log("updateBuilderStatus > axios err=", err);
          reject("Error in updateBuilderStatus axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > updateBuilderStatus, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Create a new builder version
export const createBuilderVersion =  (builderId, description) => {
  console.log("RepairBuilder > createVersion called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_BUILDER_VERSION(builderId), description, config)
        .then((res) => {
          console.log("createVersion > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling createVersion');
        })
        .catch((err) => {
          console.log("createVersion > axios err=", err);
          reject("Error in createVersion axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > createVersion, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch Builder Details
export const fetchBuilderDetails =  (builderId) => {
  console.log("RepairBuilder > fetchBuilderDetails called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_BUILDER_DETAILS(builderId), config)
        .then((res) => {
          console.log("fetchBuilderDetails > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling fetchBuilderDetails');
        })
        .catch((err) => {
          console.log("fetchBuilderDetails > axios err=", err);
          reject("Error in fetchBuilderDetails axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchBuilderDetails, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch parts from partlist
export const fetchPartsFromPartlist =  (partlistId, query) => {
  console.log("RepairBuilder > fetchPartsFromPartlist called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_PARTS_OF_PARTLIST(partlistId, query), config)
        .then((res) => {
          console.log("fetchPartsFromPartlist > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling fetchPartsFromPartlist');
        })
        .catch((err) => {
          console.log("fetchPartsFromPartlist > axios err=", err);
          reject("Error in fetchPartsFromPartlist axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchPartsFromPartlist, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Fetch partlist from builder
export const fetchPartlistFromBuilder =  (builderId) => {
  console.log("RepairBuilder > fetchPartlistFromBuilder called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_REPAIR_BUILDER_PARTLIST(builderId), config)
        .then((res) => {
          console.log("fetchPartlistFromBuilder > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling fetchPartlistFromBuilder');
        })
        .catch((err) => {
          console.log("fetchPartlistFromBuilder > axios err=", err);
          reject("Error in fetchPartlistFromBuilder axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchPartlistFromBuilder, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Fetch builder details from its versions
export const fetchBuilderVersionDet =  (builderNo, versionNo) => {
  console.log("RepairBuilder > fetchBuilderVersionDet called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_BUILDER_VERSION_DETAILS(builderNo, versionNo), config)
        .then((res) => {
          console.log("fetchBuilderVersionDet > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling fetchBuilderVersionDet');
        })
        .catch((err) => {
          console.log("fetchBuilderVersionDet > axios err=", err);
          reject("Error in fetchBuilderVersionDet axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchBuilderVersionDet, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};
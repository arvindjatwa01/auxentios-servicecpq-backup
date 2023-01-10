import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import { FETCH_KIT, KIT_MULTI_PARTS_TO_PARTLIST, KIT_PART_OF_PARTLIST, SEARCH_KIT, UPDATE_KIT_COVERAGE, UPDATE_KIT_CUSTOMER, UPDATE_KIT_ESTIMATION, UPDATE_KIT_GENERAL_DETAIL, UPDATE_KIT_PRICE, UPDATE_KIT_RATING, UPDATE_KIT_STATUS, UPDATE_KIT_VERSION } from "./CONSTANTS";

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
    console.log("service KIT > updateKITGeneralDet called...");
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
    console.log("service KIT > updateKITPrice called...");
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
    console.log("service KIT > updateKITCoverage called...");
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
    console.log("KIT Service > kitSearch called...");
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
        console.error("in KIT Service > kitSearch, Err===", error);
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

//update KIT rating
export const updateKITRating =  (kitId, rating) => {
  console.log("KIT > updateKITRating called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_KIT_RATING(kitId, rating), {}, config)
        .then((res) => {
          console.log("updateKITRating > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling updateKITRating');
        })
        .catch((err) => {
          console.log("updateKITRating > axios err=", err);
          reject("Error in updateKITRating axios!");
        });
    } catch (error) {
      console.error("in KIT > updateKITRating, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//update KIT Version
export const updateKITVersion =  (kitId, version) => {
  console.log("KIT > updateKITVersion called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_KIT_VERSION(kitId, version), {}, config)
        .then((res) => {
          console.log("updateKITVersion > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling updateKITVersion');
        })
        .catch((err) => {
          console.log("updateKITVersion > axios err=", err);
          reject("Error in updateKITVersion axios!");
        });
    } catch (error) {
      console.error("in KIT > updateKITVersion, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add single sparepart to the KIT partlist
export const addPartToKITPartList = (partListId, data) => {
  console.log("service KIT > addPartToPartList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(KIT_PART_OF_PARTLIST(partListId), data, config)
        .then((res) => {
          console.log("KIT Service -> addPartToPartList response: ", res);
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

//Add multiple spareparts to the KIT partlist
export const addMultiPartsToKITPartList = (partListId, data) => {
  console.log("KIT Service > addPartToPartList called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(KIT_MULTI_PARTS_TO_PARTLIST(partListId), data, config)
        .then((res) => {
          console.log("KIT Service -> addMultiPartsToPartList response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject(res.data);
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


//Remove spare part from KIT partlist
export const RemoveKITSparepart = (partlistId, sparePartId) => {
  console.log("service repairbuilder > RemoveSparepart called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(KIT_PART_OF_PARTLIST(partlistId)+`/${sparePartId}`, config)
        .then((res) => {
          console.log("repairbuilder -> RemoveSparepart response: ", res);
          if (res.status === 200) {
            resolve("Successfully removed the item!");
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("RemoveSparepart > axios err=", err);
          reject("Error in RemoveSparepart axios!");
        });
    } catch (error) {
      console.error("RemoveSparepart general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};
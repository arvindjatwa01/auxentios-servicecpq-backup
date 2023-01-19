import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import { FETCH_TEMPLATE, SEARCH_TEMPLATE, UPDATE_SJ_COVERAGE, UPDATE_SJ_GENERAL_DETAIL, UPDATE_SJ_PRICE, UPDATE_SJ_STATUS, UPDATE_SJ_ESTIMATION, UPDATE_SJ_USAGE, UPDATE_SJ_RATING, SJ_SEGMENT, UPDATE_SJ_VERSION } from "./CONSTANTS";

const accessToken = localStorage.getItem("access_token");

var CookiesSetData = Cookies.get("loginTenantDtl");
var getCookiesJsonData;
if (CookiesSetData != undefined) {
  getCookiesJsonData = JSON.parse(CookiesSetData);
}
// var getCookiesJsonData = JSON.parse(CookiesSetData);

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${getCookiesJsonData?.access_token}`,
  },
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
};


//Update Template with estimation data
export const updateTemplateEstimation = (templateId, data) => {
  console.log("service Template > updateTemplateEstimation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_ESTIMATION(templateId), data, config)
        .then((res) => {
          console.log("updateTemplateEstimation > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateTemplateEstimation axios!");
          }
        })
        .catch((err) => {
          console.log("updateTemplateEstimation axios err :", err);
          reject("Error in updateTemplateEstimation axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateTemplateEstimation : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update template with General Details data
export const updateTemplateGeneralDet = (templateId, data) => {
  console.log("service Repair > updateTemplateGeneralDet called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_GENERAL_DETAIL(templateId), data, config)
        .then((res) => {
          console.log("updateTemplateGeneralDet > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateTemplateGeneralDetails axios!");
          }
        })
        .catch((err) => {
          console.log("updateTemplateGeneralDet axios err :", err);
          reject("Error in updateTemplateGeneralDet axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateTemplateGeneralDet : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update template with Price Details data
export const updateTemplatePrice = (templateId, data) => {
  console.log("service Repair > updateTemplatePrice called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_PRICE(templateId), data, config)
        .then((res) => {
          console.log("updateTemplatePrice > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateTemplatePrice axios!");
          }
        })
        .catch((err) => {
          console.log("updateTemplatePrice axios err :", err);
          reject("Error in updateTemplatePrice axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateTemplatePrice : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update template with Coverage Details data
export const updateTemplateCoverage = (templateId, data) => {
  console.log("service Repair > updateTemplateCoverage called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_COVERAGE(templateId), data, config)
        .then((res) => {
          console.log("updateTemplateCoverage > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateTemplateCoverage axios!");
          }
        })
        .catch((err) => {
          console.log("updateTemplateCoverage axios err :", err);
          reject("Error in updateTemplateCoverage axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateTemplateCoverage : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Update Template with Usage Details data
export const updateTemplateUsage = (templateId, data) => {
  console.log("service Repair > updateTemplateUsage called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_USAGE(templateId), data, config)
        .then((res) => {
          console.log("updateTemplateUsage > axios res=", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            console.log("Error Status:", res.status);
            reject("Error in updateTemplateUsage axios!");
          }
        })
        .catch((err) => {
          console.log("updateTemplateUsage axios err :", err);
          reject("Error in updateTemplateUsage axios!");
        });
    } catch (error) {
      console.error("Genreal Exception updateTemplateUsage : ", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search Templates
export const templateSearch = (searchStr) => {
  console.log("RepairBuilder > templateSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_TEMPLATE(searchStr), config)
        .then((res) => {
          console.log("templateSearch > axios res=", res);
          if (res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while fetching templates');
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
export const fetchTemplateDetails = (templateId) => {
  console.log("templateService > fetchTemplateDetails called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_TEMPLATE(templateId), config)
        .then((res) => {
          console.log("fetchTemplateDetails > axios res=", res);
          if (res.status === 200)
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


//update status of the Template (Active, Draft, Revised, Archived)
export const updateTemplateStatus = (templateId, status) => {
  console.log("Template > updateTemplateStatus called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_STATUS(templateId, status), {}, config)
        .then((res) => {
          console.log("updateTemplateStatus > axios res=", res);
          if (res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling updateTemplateStatus');
        })
        .catch((err) => {
          console.log("updateTemplateStatus > axios err=", err);
          reject("Error in updateTemplateStatus axios!");
        });
    } catch (error) {
      console.error("in Template > updateTemplateStatus, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//update Template rating
export const updateTemplateRating = (templateId, rating) => {
  console.log("Template > updateTemplateRating called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_RATING(templateId, rating), {}, config)
        .then((res) => {
          console.log("updateTemplateRating > axios res=", res);
          if (res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling updateTemplateRating');
        })
        .catch((err) => {
          console.log("updateTemplateRating > axios err=", err);
          reject("Error in updateTemplateRating axios!");
        });
    } catch (error) {
      console.error("in Template > updateTemplateRating, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//update Template version
export const updateTemplateVersion = (templateId, version) => {
  console.log("Template > updateTemplateVersion called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(UPDATE_SJ_VERSION(templateId, version), {}, config)
        .then((res) => {
          console.log("updateTemplateVersion > axios res=", res);
          if (res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling updateTemplateVersion');
        })
        .catch((err) => {
          console.log("updateTemplateVersion > axios err=", err);
          reject("Error in updateTemplateVersion axios!");
        });
    } catch (error) {
      console.error("in Template > updateTemplateVersion, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Create Segment for a standard job
export const createSegmentStandardJob = (templateId, data) => {
  console.log("service template > createSegmentStandardJob called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(SJ_SEGMENT(templateId), data, config)
        .then((res) => {
          console.log("template -> createSegmentStandardJob response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("createSegmentStandardJob > axios err=", err);
          reject("Error in createSegmentStandardJob axios!");
        });
    } catch (error) {
      console.error("createSegmentStandardJob general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//fetch repair Segments for a builder
export const fetchSegmentsStandardJob = (templateId) => {
  console.log("service template  > fetchSegmentsStandardJob called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SJ_SEGMENT(templateId), config)
        .then((res) => {
          console.log("template -> fetchSegmentsStandardJob response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("fetchSegmentsStandardJob > axios err=", err);
          reject("Error in fetchSegmentsStandardJob axios!");
        });
    } catch (error) {
      console.error("fetchSegmentsStandardJob general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

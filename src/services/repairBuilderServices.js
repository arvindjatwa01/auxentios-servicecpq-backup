import axios from "axios";
import { SYSTEM_ERROR } from "config/CONSTANTS";
import Cookies from "js-cookie";
import {
  ADD_REPAIR_BUILDER_PARTLIST,
  ADD_REPAIR_MULTI_PARTS_TO_PARTLIST,
  REPAIR_PART_OF_PARTLIST,
  SEGMENT_OPERATION,
  BUILDER_SEGMENT,
  CREATE_BUILDER_VERSION,
  CREATE_REPAIR_BUILDER,
  FETCH_BUILDER_DETAILS,
  FETCH_BUILDER_VERSION_DETAILS,
  FETCH_PARTS_OF_PARTLIST,
  FETCH_REPAIR_BUILDER_PARTLIST,
  PRICING_COMMON_CONFIG,
  SEARCH_Builder,
  UPDATE_REPAIR_CUSTOMER,
  UPDATE_REPAIR_ESTIMATION_TEAM,
  UPDATE_REPAIR_GENERAL_DETAILS,
  UPDATE_REPAIR_MACHINE,
  UPDATE_REPAIR_PRICE,
  UPDATE_REPAIR_STATUS,
  UPLOAD_REPAIR_PARTS_TO_PARTLIST,
  OPERATION_SERVICE,
  OPERATION_SERVICE_EST_DETAILS,
  LABOR_SERVICE,
  CONSUMABLE_SERVICE,
  EXTWORK_SERVICE,
  MISC_SERVICE,
  LABOR_ITEM,
  EXTWORK_ITEM,
  CONSUMABLE_ITEM,
  CREATE_KIT,
  FETCH_BASE_PRICE,
} from "./CONSTANTS";
const accessToken = localStorage.getItem("access_token");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${accessToken}`,
  },
  // xsrfCookieName: "XSRF-TOKEN",
  // xsrfHeaderName: "X-XSRF-TOKEN",
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


//Create Kit
export const createKIT = (builderId, data) => {
  console.log("service repairbuilder > createKIT called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CREATE_KIT(builderId), data, config)
        .then((res) => {
          console.log("repairbuilder -> createKIT response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("createKIT > axios err=", err);
          reject("Error in createKIT axios!");
        });
    } catch (error) {
      console.error("createKIT general exception", error);
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
        .post(BUILDER_SEGMENT(builderId), data, config)
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

//fetch repair Segments for a builder
export const fetchSegments = (builderId) => {
  console.log("service repairbuilder > fetchSegments called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(BUILDER_SEGMENT(builderId), config)
        .then((res) => {
          console.log("repairbuilder -> fetchSegments response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("fetchSegments > axios err=", err);
          reject("Error in fetchSegments axios!");
        });
    } catch (error) {
      console.error("fetchSegments general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add operation to the Segment of a builder
export const AddOperation = (segmentId, data) => {
  console.log("service repairbuilder > AddOperation called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(SEGMENT_OPERATION(segmentId), data, config)
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

//fetch ServiceEstimate Header to the Operation of a builder
export const FetchServiceHeader = (operationId) => {
  console.log("service repairbuilder > FetchServiceHeader called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(OPERATION_SERVICE_EST_DETAILS(operationId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchServiceHeader response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchServiceHeader > axios err=", err);
          reject("Error in FetchServiceHeader axios!");
        });
    } catch (error) {
      console.error("FetchServiceHeader general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//fetch base Price for consumable, ext header and misc
export const FetchBasePrice = (serviceId) => {
  console.log("service repairbuilder > FetchBasePrice called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(FETCH_BASE_PRICE(serviceId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchBasePrice response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchBasePrice > axios err=", err);
          reject("Error in FetchBasePrice axios!");
        });
    } catch (error) {
      console.error("FetchBasePrice general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//fetch labor from service estimate
export const FetchLaborforService = (serviceId) => {
  console.log("service repairbuilder > FetchLaborforService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(LABOR_SERVICE(serviceId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchLaborforService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchLaborforService > axios err=", err);
          reject("Error in FetchLaborforService axios!");
        });
    } catch (error) {
      console.error("FetchLaborforService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//fetch labor items
export const FetchLaborItems = (laborId) => {
  console.log("service repairbuilder > FetchLaborItems called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(LABOR_ITEM(laborId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchLaborItems response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchLaborItems > axios err=", err);
          reject("Error in FetchLaborItems axios!");
        });
    } catch (error) {
      console.error("FetchLaborforService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Remove labor item
export const RemoveLaborItem = (laborId, laborItemId) => {
  console.log("service repairbuilder > removeLaborItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(LABOR_ITEM(laborId)+`/${laborItemId}`, config)
        .then((res) => {
          console.log("repairbuilder -> removeLaborItem response: ", res);
          if (res.status === 200) {
            resolve("Successfully removed the item!");
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("removeLaborItem > axios err=", err);
          reject("Error in removeLaborItem axios!");
        });
    } catch (error) {
      console.error("removeLaborItem general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//Remove consumable item
export const RemoveConsumableItem = (consumableId, consumableItemId) => {
  console.log("service repairbuilder > RemoveConsumableItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(CONSUMABLE_ITEM(consumableId)+`/${consumableItemId}`, config)
        .then((res) => {
          console.log("repairbuilder -> RemoveConsumableItem response: ", res);
          if (res.status === 200) {
            resolve("Successfully removed the item!");
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("RemoveConsumableItem > axios err=", err);
          reject("Error in RemoveConsumableItem axios!");
        });
    } catch (error) {
      console.error("RemoveConsumableItem general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Remove labor item
export const RemoveExtWorkItem = (extWorkId, extWorkItemId) => {
  console.log("service repairbuilder > RemoveExtWorkItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(EXTWORK_ITEM(extWorkId)+`/${extWorkItemId}`, config)
        .then((res) => {
          console.log("repairbuilder -> RemoveExtWorkItem response: ", res);
          if (res.status === 200) {
            resolve("Successfully removed the item!");
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("RemoveExtWorkItem > axios err=", err);
          reject("Error in RemoveExtWorkItem axios!");
        });
    } catch (error) {
      console.error("RemoveExtWorkItem general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//fetch consumable from service estimate
export const FetchConsumableforService = (serviceId) => {
  console.log("service repairbuilder > FetchConsumableforService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CONSUMABLE_SERVICE(serviceId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchConsumableforService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchConsumableforService > axios err=", err);
          reject("Error in FetchConsumableforService axios!");
        });
    } catch (error) {
      console.error("FetchConsumableforService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//fetch consumable items
export const FetchConsumableItems = (consumableId) => {
  console.log("service repairbuilder > FetchConsumableItems called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(CONSUMABLE_ITEM(consumableId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchConsumableItems response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchConsumableItems > axios err=", err);
          reject("Error in FetchConsumableItems axios!");
        });
    } catch (error) {
      console.error("FetchConsumableItems general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//fetch ext work from service estimate
export const FetchExtWorkforService = (serviceId) => {
  console.log("service repairbuilder > FetchExtWorkforService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(EXTWORK_SERVICE(serviceId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchExtWorkforService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchExtWorkforService > axios err=", err);
          reject("Error in FetchExtWorkforService axios!");
        });
    } catch (error) {
      console.error("FetchExtWorkforService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};


//fetch ext work items
export const FetchExtWorkItems = (extWorkId) => {
  console.log("service repairbuilder > FetchExtWorkItems called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(EXTWORK_ITEM(extWorkId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchExtWorkItems response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchExtWorkItems > axios err=", err);
          reject("Error in FetchExtWorkItems axios!");
        });
    } catch (error) {
      console.error("FetchExtWorkItems general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//fetch misc from service estimate
export const FetchMiscforService = (serviceId) => {
  console.log("service repairbuilder > FetchMiscforService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(MISC_SERVICE(serviceId), config)
        .then((res) => {
          console.log("repairbuilder -> FetchMiscforService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("FetchMiscforService > axios err=", err);
          reject("Error in FetchMiscforService axios!");
        });
    } catch (error) {
      console.error("FetchMiscforService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add ServiceEstimate Header to the Operation of a builder
export const AddServiceHeader = (operationId, data) => {
  console.log("service repairbuilder > AddServiceHeader called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(OPERATION_SERVICE(operationId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddServiceHeader response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddServiceHeader > axios err=", err);
          reject("Error in AddServiceHeader axios!");
        });
    } catch (error) {
      console.error("AddServiceHeader general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add Labor to the service estimate of a builder
export const AddLaborToService = (serviceId, data) => {
  console.log("service repairbuilder > AddLaborToService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(LABOR_SERVICE(serviceId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddLaborToService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddLaborToService > axios err=", err);
          reject("Error in AddLaborToService axios!");
        });
    } catch (error) {
      console.error("AddLaborToService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add labor item to the labor of a builder
export const AddLaborItemToLabor = (laborId, data) => {
  console.log("service repairbuilder > AddLaborItemToLabor called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(LABOR_ITEM(laborId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddLaborItemToLabor response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddLaborItemToLabor > axios err=", err);
          reject("Error in AddLaborItemToLabor axios!");
        });
    } catch (error) {
      console.error("AddLaborItemToLabor general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};
//Add Consumable to the service estimate of a builder
export const AddConsumableToService = (serviceId, data) => {
  console.log("service repairbuilder > AddConsumableToService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CONSUMABLE_SERVICE(serviceId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddConsumableToService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddConsumableToService > axios err=", err);
          reject("Error in AddConsumableToService axios!");
        });
    } catch (error) {
      console.error("AddConsumableToService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add consumable item to the consumables of a builder
export const AddConsumableItem = (consumableId, data) => {
  console.log("service repairbuilder > AddConsumableItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(CONSUMABLE_ITEM(consumableId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddConsumableItem response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddConsumableItem > axios err=", err);
          reject("Error in AddConsumableItem axios!");
        });
    } catch (error) {
      console.error("AddConsumableItem general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add Ext Work to the service estimate of a builder
export const AddExtWorkToService = (serviceId, data) => {
  console.log("service repairbuilder > AddExtWorkToService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(EXTWORK_SERVICE(serviceId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddExtWorkToService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddExtWorkToService > axios err=", err);
          reject("Error in AddExtWorkToService axios!");
        });
    } catch (error) {
      console.error("AddExtWorkToService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add ext work item to the ext work of a builder
export const AddExtWorkItem = (extWorkId, data) => {
  console.log("service repairbuilder > AddExtWorkItem called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(EXTWORK_ITEM(extWorkId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddExtWorkItem response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddExtWorkItem > axios err=", err);
          reject("Error in AddExtWorkItem axios!");
        });
    } catch (error) {
      console.error("AddExtWorkItem general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Add MISC to the service estimate of a builder
export const AddMiscToService = (serviceId, data) => {
  console.log("service repairbuilder > AddMiscToService called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(MISC_SERVICE(serviceId), data, config)
        .then((res) => {
          console.log("repairbuilder -> AddMiscToService response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("AddMiscToService > axios err=", err);
          reject("Error in AddMiscToService axios!");
        });
    } catch (error) {
      console.error("AddMiscToService general exception", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//fetch operations of a segment
export const fetchOperations = (segmentId) => {
  console.log("service repairbuilder > fetchOperations called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEGMENT_OPERATION(segmentId), config)
        .then((res) => {
          console.log("repairbuilder -> fetchOperations response: ", res);
          if (res.status === 200) {
            resolve(res.data);
          } else {
            reject(res.error);
          }
        })
        .catch((err) => {
          console.log("fetchOperations > axios err=", err);
          reject("Error in fetchOperations axios!");
        });
    } catch (error) {
      console.error("fetchOperations general exception", error);
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
        .post(REPAIR_PART_OF_PARTLIST(partListId), data, config)
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

//Remove spare part from partlist
export const RemoveSparepart = (partlistId, sparePartId) => {
  console.log("service repairbuilder > RemoveSparepart called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(REPAIR_PART_OF_PARTLIST(partlistId)+`/${sparePartId}`, config)
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
            reject(res.data);
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


//Fetch pricing Methods
export const fetchBuilderPricingMethods =  (category) => {
  console.log("RepairBuilder > fetchBuilderPricingMethods called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(PRICING_COMMON_CONFIG+category, config)
        .then((res) => {
          console.log("fetchBuilderPricingMethods > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while calling fetchBuilderPricingMethods');
        })
        .catch((err) => {
          console.log("fetchBuilderPricingMethods > axios err=", err);
          reject("Error in fetchBuilderPricingMethods axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > fetchBuilderPricingMethods, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

//Search builders
export const builderSearch =  (searchStr) => {
  console.log("RepairBuilder > builderSearch called...");
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(SEARCH_Builder(searchStr), config)
        .then((res) => {
          console.log("builderSearch > axios res=", res);
          if(res.status === 200)
            resolve(res.data);
          else
            reject('Error occurred while fetching builders');
        })
        .catch((err) => {
          console.log("builderSearch > axios err=", err);
          reject("Error in builderSearch axios!");
        });
    } catch (error) {
      console.error("in RepairBuilder > builderSearch, Err===", error);
      reject(SYSTEM_ERROR);
    }
  });
};

export const SEARCH_FALG_EQUIPMENT = "EQUIPMENT";
export const SEARCH_FLAG_PARTS = "PARTS";
export const SEARCH_FLAG_CUSTOMER = "CUSTOMER";
export const SEARCH_FLAG_CONSUMABLE = "CONSUMABLE";

// Model Content Type
// Equipment Master
export const EQUIPMENT_CONTRACT_DETAILS = "CONTRACT_DETAILS";
export const EQUIPMENT_WARRENTY_DETAILS = "WARRENTY_DETAILS";
export const EQUIPMENT_ERP_WARRENTY_REPORT_DETAILS =
  "ERP_WARRENTY_REPORT_DETAILS";
export const EQUIPMENT_SERVICE_REPORT_DETAILS = "SERVICE_REPORT_DETAILS";
export const EQUIPMENT_FAILURE_REPORT_DETAILS = "FAILURE_REPORT_DETAILS";
export const EQUIPMNT_USAGE_REPORT_DETAILS = "USAGE_REPORT_DETAILS";
export const EQUIPMENT_USAGE_SMU_REPORT_DETAILS = "USAGE_SMU_REPORT_DETAILS";

// Parts 360 (Spare Parts)
export const SPARE_PARTS_REPLACED_BY_DETAILS = "REPLACED_BY_DETAILS";
export const SPARE_PARTS_ALTERNATE_PARTS_DETAILS = "ALTERNATE_PARTS_DETAILS";
export const SPARE_PARTS_REMAN_OR_REFURB_DETAILS = "REMAN_OR_REFURB_DETAILS";
export const SPARE_PARTS_PRICE_DETAILS = "SPARE_PARTS_PRICE_DETAILS";
export const SPARE_PARTS_ERP_DETAILS = "SPARE_PARTS_ERP_DETAILS";
export const SPARE_PARTS_WARRENTY_DETAILS = "SPARE_PARTS_WARRANTY_DETAILS";

// Labbour and Service Master
export const LABOUR_AND_SERVICE_PRICE_DETAILS = "LABOUR_AND_SERVICE_PRICE_DETAILS";
export const LABOUR_AND_SERVICE_ERP_DETAILS = "LABOUR_AND_SERVICE_ERP_DETAILS";

// Error occurred while fetching spare parts!
export const INPUT_SEARCH_ERROR_MESSAGE = "Please fill current search criteria";
export const INPUT_SEARCH_API_ERROR_MESSAGE = "Somthing went wrong";
export const INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE =
  "No information is found for your search, change the search criteria";
export const EMPTY_SEARCH_FIELDS_ERROR_MESSAGE =
  "Please fill the search criteria!";

export const Switch_label_Object = {
  inputProps: { "aria-label": "Switch demo" },
};

// Equipment Master Search Select Options
export const equipmentSearchOptions = [
  { label: "Serial No", value: "makerSerialNumber" },
  { label: "Model", value: "model" },
  { label: "Family", value: "family" },
  { label: "Equipment Id", value: "equipmentNumber" },
  // { label: "Manufacturer", value: "E" },
  { label: "Description", value: "description" },
];

// Parts Master Search Select Options
export const partsSearchOptions = [
  { label: "Part Number", value: "partNumber" },
  { label: "Group Number", value: "groupNumber" },
  { label: "Part Group", value: "partsGroup" },
  { label: "BEC Code", value: "becCode" },
  { label: "ERP Material Group", value: "materialGroup" },
  { label: "ERP Material Number", value: "erpMaterialNumber" },
];

// Customer Search Select Options
export const customerSearchOptions = [
  { label: "Customer Number", value: "customerId" },
  { label: "Description", value: "description" },
  { label: "Email", value: "email" },
  { label: "Type", value: "customerType" },
  { label: "Group", value: "customerGroup" },
  { label: "Segment", value: "customerSegment" },
];

// Consumble Search Select Options
export const consumableSearchOptions = [
  { label: "Consumable Number", value: "consumableId" },
  { label: "Description", value: "description" },
  { label: "Supplier", value: "supplier" },
];

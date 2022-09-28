export const INITIAL_PAGE_NO = 0;
export const INITIAL_PAGE_SIZE = 5;
export const PARTS_TAG_OPTIONS = [
  { label: "None", value: "" },
  { label: "Required", value: "required" },
  { label: "Optional", value: "optional" },
  { label: "Additional", value: "additional" },
  { label: "Missing", value: "missing" },
  { label: "Core", value: "core" },
];
export const ERROR_MAX_VERSIONS =
  "Three versions already exist, if  you want another version then version 3.0 must be archieved";
export const SPAREPART_SEARCH_Q_OPTIONS = [
  {
    label: "Part No",
    value: "partNumber",
  },
  {
    label: "Description",
    value: "partDescription",
  },
  { label: "Model", value: "model" },
  {
    label: "Group No",
    value: "groupNumber",
  },
  {
    label: "Bec Code",
    value: "becCode",
  },
  { label: "Type", value: "partType" },
];

export const BUILDER_SEARCH_Q_OPTIONS = [
  {
    label: "ID",
    value: "builderId",
  },
  {
    label: "Description",
    value: "description",
  },
  {
    label: "Customer ID",
    value: "customerId",
  },
  { label: "Model", value: "model" },
  {
    label: "Make",
    value: "make",
  },
  {
    label: "Family",
    value: "family",
  },
  { label: "SerialNo", value: "serialNo" },
  { label: "Status", value: "status" },
];

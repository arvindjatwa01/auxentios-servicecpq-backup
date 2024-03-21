// Error occurred while fetching spare parts!
export const INPUT_SEARCH_ERROR_MESSAGE = "Please fill current search criteria";
export const INPUT_SEARCH_API_ERROR_MESSAGE = "Somthing went wrong";
export const INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE =
  "No information is found for your search, change the search criteria";
export const EMPTY_SEARCH_FIELDS_ERROR_MESSAGE =
  "Please fill the search criteria!";
export const FILL_DATA_PROPERLY_ERROR_MESSAGE = "Please fill the data Properly";

export const WITH_PARTS = "BUILDER_WITH_SPAREPART";
export const WITHOUT_PARTS = "BUILDER_WITHOUT_SPAREPART";
export const NEW_SEGMENT = "New Segment";
export const NEW_OPERATION = "New Operation";
export const SERVICE_TEMPLATE = "SERVICE_TEMPLATE";
export const PART_AND_SERVICE_TEMPLATE = "PART_AND_SERVICE_TEMPLATE";
export const INITIAL_PAGE_NO = 0;
export const INITIAL_PAGE_SIZE = 5;

export const GRID_STYLE = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#872ff7",
    color: "#fff",
    fontSize: 12,
  },
  "& .MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
    marginTop: "1em",
    marginBottom: "1em",
  },
  "& .MuiTablePagination-select": {
    marginTop: "1.5em",
    marginBottom: "1.5em",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid rgba(0,0,0,.12)`,
    paddingLeft: "8px",
    paddingRight: "8px",
    minHeight: "72px",
    whiteSpace: "normal !important",
    wordWrap: "break-word !important",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  // minHeight: 300,
  "& .MuiDataGrid-cellContent": {
    fontSize: 12,
  },
  "& .MuiInputBase-root": {
    fontSize: 12,
    marginInline: 2,
    paddingInline: 1,
  },
  "& .super-app-value": {
    backgroundColor: "#dabffd",
    fontWeight: "600",
  },
  "& .disable-value": {
    backgroundColor: "#f2f2f2",
  },
};
export const FONT_STYLE = {
  color: "#872ff7",
  fontSize: "17px",
  fontWeight: "500",
  padding: 0,
};

export const FONT_STYLE_SELECT = {
  placeholder: (provided) => ({
    ...provided,
    ...FONT_STYLE,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: 10,
    boxShadow: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    ...FONT_STYLE,
  }),
};

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

export const CONS_EXT_PRICE_OPTIONS = [
  {
    value: "LIST",
    label: "List Price",
  },
  {
    value: "PER_ON_TOTAL",
    label: "Percentage on Total",
  },
  {
    value: "PER_ON_LABOR",
    label: "Percentage on Labour",
  },
];

export const CONSUMABLE_SEARCH_Q_OPTIONS = [
  {
    label: "Id",
    value: "consumableId",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Vendor",
    value: "sourceOrVendor",
  },
];

export const EXTWORK_SEARCH_Q_OPTIONS = [
  {
    label: "Id",
    value: "activityId",
  },
  {
    label: "Activity Name",
    value: "activityDescription",
  },
  {
    label: "Supplying Vendor",
    value: "supplyingVendorName",
  },
];

export const LABOR_PRICE_OPTIONS = [
  {
    value: "LIST",
    label: "List Price",
  },
  {
    value: "COST_PLUS",
    label: "Cost Plus",
  },
];

export const MISC_PRICE_OPTIONS = [
  { value: "PER_ON_TOTAL", label: "Percentage on Total" },
  {
    value: "PER_ON_LABOR",
    label: "Percentage on Labour",
  },
];

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
export const NEW_SEGMENT = "New Segment";
export const NEW_OPERATION = "New Operation";

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
export const PARTLIST_BUILDER_SEARCH_Q_OPTIONS = [
  {
    label: "ID",
    value: "estimationNumber",
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

export const GRID_STYLE = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#872ff7",
    color: "#fff",
    fontSize: 12,
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid rgba(0,0,0,.12)`,
    paddingLeft: "8px",
    paddingRight: "8px"
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },                              
  // minHeight: 300,
  "& .MuiDataGrid-cellContent": {
    fontSize: 12,
  },  
}
export const FONT_STYLE = {
  color: '#872ff7',
  fontSize: '17px',
  fontWeight: '500',
  padding: 0
}

export const FONT_STYLE_SELECT = {
  placeholder: provided => ({
    ...provided, 
    ...FONT_STYLE
  }),
  control: provided => ({
    ...provided,
    borderRadius: 10,
  }),
  singleValue: provided => ({
    ...provided,
    ...FONT_STYLE
  })
}
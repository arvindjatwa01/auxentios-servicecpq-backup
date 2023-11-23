import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import GridOnIcon from '@mui/icons-material/GridOn';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import ConstructionIcon from '@mui/icons-material/Construction';
import EngineeringTwoToneIcon from '@mui/icons-material/EngineeringTwoTone';

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
export const WITH_PARTS = "BUILDER_WITH_SPAREPART";
export const WITHOUT_PARTS = "BUILDER_WITHOUT_SPAREPART";
export const NEW_SEGMENT = "New Segment";
export const NEW_OPERATION = "New Operation";
export const SERVICE_TEMPLATE = "SERVICE_TEMPLATE";
export const PART_AND_SERVICE_TEMPLATE = "PART_AND_SERVICE_TEMPLATE";

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

export const QUOTE_SEARCH_Q_OPTIONS = [
  {
    label: "Created By",
    value: "createdBy",
  },
  {
    label: "Created Between",
    value: "createdAt",
  },
  {
    label: "Customer ID",
    value: "customerId",
  },
  { label: "Model", value: "model" },
  {
    label: "Name",
    value: "quoteName",
  },
  {
    label: "Description",
    value: "description",
  },
  { label: "SerialNo", value: "serialNo" }
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


export const KIT_SEARCH_Q_OPTIONS = [
  {
    label: "Model",
    value: "coverageModel",
  },
  {
    label: "Status",
    value: "status",
    type: "status"
  },
  {
    label: "Expiry Date",
    value: "expiryDate",
  },
  { label: "Next Rivision Date", value: "revisionDate", type: "date" },
  {
    label: "Application",
    value: "application",
  },
  {
    label: "Reference",
    value: "reference",
  },
  { label: "Customer", value: "customerId" },
];

export const TEMPLATE_TYPES = [
  { label: "Service Only", value: "SERVICE_TEMPLATE" },
  {
    label: "Parts & Service",
    value: "PART_AND_SERVICE_TEMPLATE",
  },
]
export const TEMPLATE_SEARCH_Q_OPTIONS = [
  { label: "Model", value: "coverageModel" },
  {
    label: "Family",
    value: "coverageFamily",
  },
  {
    label: "Prefix",
    value: "coveragePrefix",
  },
  {
    label: "Status",
    value: "status",
  },
  {
    label: "Expiry Date",
    value: "expiryDate",
  },
  { label: "Next Rivision Date", value: "nextRevisionDate" },
  {
    label: "Application",
    value: "application",
  },
  {
    label: "Usage Interval",
    value: "usageInterval",
  },
  {
    label: "Reference",
    value: "reference",
  },
];

export const OPTIONS_USAGE = [
  { value: "HOUR", label: "Hours" },
  { value: "KM", label: "Kms" },
  { value: "MILE", label: "Miles" },
  { value: "TONS", label: "Tons" },
];

export const OPTIONS_LEADTIME_UNIT = [
  { value: "DAY", label: "Day" },
  { value: "HOUR", label: "Hour" }
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

export const COLOR_BRONZE = "#CD7F32";
export const COLOR_GOLD = "#FFD700";
export const COLOR_SILVER = "#C0C0C0";

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
    whiteSpace: 'normal !important',
    wordWrap: "break-word !important"
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  // minHeight: 300,
  "& .MuiDataGrid-cellContent": {
    fontSize: 12,
  },
  "& .MuiInputBase-root": {
    fontSize: 12, marginInline: 2, paddingInline: 1,
  },
  '& .super-app-value': {
    backgroundColor: '#dabffd',
    fontWeight: '600',
  },
  '& .disable-value': {
    backgroundColor: '#f2f2f2',
  },
};
export const FONT_STYLE = {
  color: "#872ff7",
  fontSize: "17px",
  fontWeight: "500",
  padding: 0,
};

export const FONT_STYLE_UNIT_SELECT = {
  placeholder: (provided) => ({
    ...provided,
    ...FONT_STYLE,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: 10,
    border: 'none !important',
    backgroundColor: '#F5F5F5 !important',
    boxShadow: 'none'
  }),
  singleValue: (provided) => ({
    ...provided,
    ...FONT_STYLE,
    minWidth: '80px !important'
  }),
};
export const FONT_STYLE_SELECT = {
  placeholder: (provided) => ({
    ...provided,
    ...FONT_STYLE,
  }),
  control: (provided) => ({
    ...provided,
    borderRadius: 10,
    boxShadow: 'none'
  }),
  singleValue: (provided) => ({
    ...provided,
    ...FONT_STYLE,
  }),
};
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

export const QUOTE_OPTIONS = [
  { value: "QuoteType1", label: "Quote Type 1" },
  { value: "QuoteType2", label: "Quote Type 2" },
  { value: "QuoteType3", label: "Quote Type 3" },
  { value: "QuoteType4", label: "Quote Type 4" },
];

export const CONSEXT_PRICE_OPTIONS_NOLABOR = [
  {
    value: "LIST",
    label: "List Price",
  },
  {
    value: "PER_ON_TOTAL",
    label: "Percentage on Total",
  },
];

export const MISC_PRICE_OPTIONS = [
  { value: "PER_ON_TOTAL", label: "Percentage on Total" },
  {
    value: "PER_ON_LABOR",
    label: "Percentage on Labour",
  },
];

export const MISC_PRICE_OPTIONS_NOLABOR = [
  { value: "PER_ON_TOTAL", label: "Percentage on Total" },
];

export const STATUS_OPTIONS = [
  { value: "DRAFT", label: "Draft" },
  { value: "ACTIVE", label: "Active" },
  { value: "REVISED", label: "Revised" },
  { value: "ARCHIVED", label: "Archived" },
];
export const TEMPLATE_VERSION_OPTIONS = [
  { value: "GOLD", label: "Gold" },
  { value: "SILVER", label: "Silver" },
  { value: "BRONZE", label: "Bronze" },
  { value: "STANDARD", label: "Standard" },
];

export const APPLICATION_OPTIONS = [
  { value: "PREVENTIVE_MAINTENANCE", label: "Preventive Maintenance", icon: <BuildIcon sx={{ mx: 2, color: "green" }} /> },
  { value: "MSCHEDULED_MAINTENANCE", label: "Scheduled Maintenance", icon: <ManageHistoryIcon sx={{ mx: 2, color: "blue" }} /> },
  { value: "COMPONENT_REPLACEMENT", label: "Component Replacement", icon: <SettingsIcon sx={{ mx: 2, color: "grey" }} /> },
  { value: "OVERHAUL", label: "Overhaul", icon: <ConstructionIcon sx={{ mx: 2, color: "blueviolet" }} /> },
  { value: "WARRANTY", label: "Service Programs", icon: <EngineeringTwoToneIcon sx={{ mx: 2, color: "orange" }} /> },
];
export const LIFE_STAGE_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "POST_WARRANTY", label: "Post Warranty" },
  { value: "MIDLIFE", label: "Midlife" },
  { value: "END_OF_LIFE", label: "End of Life" },
];

export const QUOTE_STATUS_SELECT = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: 12,
    width: '180px',
    height: 25,
    minHeight: 25,
    backgroundColor: '#f0f9ff',
    borderRadius: '50px',
    padding: '0 10px',
    alignItems: 'baseline',
    borderColor: 'hsl(0, 0%, 80%)',
    boxShadow: 'none',
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0
  }),
  valueContainer: (baseStyles, state) => ({
    ...baseStyles,
    padding: 0,
  }),
  indicatorsContainer: (baseStyles, state) => ({
    ...baseStyles,
    padding: 0,
    height: '25px'
  }),
}


export const QUOTE_VERSION_SELECT = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: 12,
    width: '130px',
    height: 25,
    minHeight: 25,
    backgroundColor: '#f0f9ff',
    borderRadius: '50px',
    padding: '0 10px',
    alignItems: 'baseline',
    borderColor: 'hsl(0, 0%, 80%)',
    boxShadow: 'none',
  }),
  input: (baseStyles, state) => ({
    ...baseStyles,
    margin: 0
  }),
  valueContainer: (baseStyles, state) => ({
    ...baseStyles,
    padding: 0,
  }),
  indicatorsContainer: (baseStyles, state) => ({
    ...baseStyles,
    padding: 0,
    height: '25px'
  }),
}

export const STYLE_QUOTEITEM_TABLE = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#872ff7",
      color: "#fff",
      borderRight: "1px solid rgba(0,0,0,.12)",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      borderRight: "1px solid rgba(0,0,0,.12)",
      fontSize: "12px",
    },
  },
};

export const UPLOAD_OPTIONS = [
  { label: 'CSV File', value: "csv", icon: <UploadFileTwoToneIcon sx={{ mx: 2, color: "green" }} /> },
  { label: 'Microsoft Excel', value: 'excel', icon: <TextSnippetTwoToneIcon sx={{ mx: 2, color: "blue" }} /> },
  { label: 'Google Sheets', value: 'gsheet', icon: <GridOnIcon sx={{ mx: 2 }} /> },
  { label: 'Paste Table Data', value: 'paste', icon: <ContentCopyTwoToneIcon sx={{ mx: 2 }} /> }]
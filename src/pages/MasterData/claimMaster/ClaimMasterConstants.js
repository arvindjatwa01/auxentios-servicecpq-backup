export const claimsStatus = [
  //   { label: "All", value: "all" },
  { label: "Registered", value: "registered" },
  { label: "Acknowledged", value: "acknowledged" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Closed", value: "closed" },
];

export const claimStatusOptions = [
  //   { label: "All", value: "all" },
  { label: "Registered", value: "REGISTERED" },
  { label: "Acknowledged", value: "ACKNOWLEDGED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Closed", value: "CLOSED" },
];

export const claimTypes = [
  { label: "Standard", value: "standard" },
  { label: "Extended", value: "extended" },
  { label: "Service Letter", value: "serviceLetter" },
  { label: "Goodwill", value: "goodwill" },
];

export const claimTypeOptions = [
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
  { label: "Service Letter", value: "SERVICE_LETTER" },
  { label: "Goodwill", value: "GOODWILL" },
];

export const warrantyStatusOptions = [
  { label: "All", value: "all" },
  { label: "In Warranty", value: "inWarranty" },
  { label: "Out of Warranty", value: "outOfWarranty" },
  { label: "Denied Warranty", value: "deniedWarranty" },
  { label: "Warranty expiry in one month", value: "expiryInOneMonth" },
];

export const DATA_GRID_STYLE = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#872ff7",
    color: "white",
    fontSize: 14,
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
    // borderRight: `1px solid rgba(0,0,0,.12)`,
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
  marginInline: "auto",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 4,
  height: 400,
};

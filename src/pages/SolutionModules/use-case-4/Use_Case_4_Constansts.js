export const IS_PORTFOLIO = "PORTFOLIO";
export const IS_SOLUTION = "SOLUTION";

export const PORTFOLIO_SEARCH = "PORTFOLIO_SEARCH";
export const SOLUTION_SEARCH = "SOLUTION_SEARCH";

export const DEFAULT_AND_OR_OPERATOR_VALUE = { label: "And", value: "AND" };

export const AND_OR_OPERATOR_OPTIONS = [
    { label: "And", value: "AND" },
    { label: "Or", value: "OR" }
];

export const PORTFOLIO_SEARCH_OPTIONS = [
  { label: "Make", value: "make" },
  { label: "Family", value: "family" },
  { label: "Model", value: "model" },
  { label: "Prefix", value: "prefix" },
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const SOLUTION_SEARCH_OPTIONS = [
  { label: "Make", value: "make" },
  { label: "Family", value: "family" },
  { label: "Model", value: "model" },
  { label: "Prefix", value: "prefix" },
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
];

export const dataTableCustomStyles = {
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
       },
    },
 };

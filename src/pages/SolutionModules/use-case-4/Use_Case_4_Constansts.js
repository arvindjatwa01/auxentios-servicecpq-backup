export const IS_PORTFOLIO = "PORTFOLIO";
export const IS_SOLUTION = "SOLUTION";

export const PORTFOLIO_SEARCH = "PORTFOLIO_SEARCH";
export const SOLUTION_SEARCH = "SOLUTION_SEARCH";

export const DEFAULT_AND_OR_OPERATOR_VALUE = { label: "And", value: "AND" };

export const AND_OR_OPERATOR_OPTIONS = [
  { label: "And", value: "AND" },
  { label: "Or", value: "OR" },
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

export const defaultCustomPortfolioObj = {
  name: "",
  description: "",
  machineType: "EMPTY",
  searchTerm: "",
  lubricant: true,
  customerId: 0,
  optionalServices: "",
  customerGroup: "",
  customerSegment: "",
  externalReference: "",
  status: "DRAFT",
  validFrom: "",
  validTo: "",
  strategyTask: "EMPTY",
  taskType: "EMPTY",
  usageCategory: "EMPTY",
  productHierarchy: "EMPTY",
  geographic: "EMPTY",
  solutionType: "EMPTY",
  solutionLevel: "EMPTY",
  availability: "EMPTY",
  responseTime: "EMPTY",
  type: "EMPTY",
  application: "EMPTY",
  contractOrSupport: "EMPTY",
  lifeStageOfMachine: "EMPTY",
  supportLevel: "PREMIUM",
  numberOfEvents: 0,
  rating: "",
  startUsage: 0,
  endUsage: 0,
  unit: "EMPTY",
  additionals: "",
  preparedBy: "",
  approvedBy: "",
  preparedOn: "",
  revisedBy: "",
  revisedOn: "",
  salesOffice: "",
  offerValidity: "",
  customItems: [],
  customCoverages: [],
  portfolioPrice: null,
  template: false,
  visibleInCommerce: false
}

export const defaultCustomItemHeaderModel = {
  customItemHeaderId: 0,
  itemHeaderDescription: "",
  bundleFlag: "PORTFOLIO",
  withBundleService: true,
  portfolioItemIds: [],
  reference: "",
  itemHeaderMake: "",
  itemHeaderFamily: "",
  model: "",
  prefix: "",
  type: "EMPTY",
  additional: "",
  currency: "",
  netPrice: 0,
  itemProductHierarchy: "EMPTY",
  itemHeaderGeographic: "EMPTY",
  responseTime: "EMPTY",
  usage: "",
  validFrom: "",
  validTo: "",
  estimatedTime: "",
  servicePrice: 0,
  status: "DRAFT",
  componentCode: "",
  componentDescription: "",
  serialNumber: "",
  itemHeaderStrategy: "EMPTY",
  variant: "EMPTY",
  itemHeaderCustomerSegment: "",
  jobCode: "",
  preparedBy: "",
  approvedBy: "",
  preparedOn: "",
  revisedBy: "",
  revisedOn: "",
  salesOffice: "",
  offerValidity: "",
  serviceChargable: true,
  serviceOptional: true,
};

export const defaultCustomItemBodyModel = {
  customItemBodyId: 0,
  itemBodyDescription: "",
  spareParts: ["EMPTY"],
  labours: ["EMPTY"],
  miscellaneous: ["EMPTY"],
  taskType: ["EMPTY"],
  solutionCode: "",
  usageIn: "",
  usage: "",
  year: "",
  avgUsage: 0,
  customItemPrices: [],
};

// default data for item Price Add/Update
export const defaultCustomItemPriceObj = {
  itemPriceDataId: 0,
  quantity: 0,
  standardJobId: "",
  repairKitId: "",
  templateDescription: "",
  repairOption: "",
  additional: "",
  partListId: "",
  serviceEstimateId: "",
  numberOfEvents: 0,
  frequency: "",
  priceMethod: "",
  priceType: "",
  listPrice: 0,
  priceEscalation: "",
  calculatedPrice: 0,
  flatPrice: 0,
  year: { label: 1, value: 1 },
  noOfYear: 1,
  sparePartsPrice: 0,
  sparePartsPriceBreakDownPercentage: 0,
  servicePrice: 0,
  labourPrice: 0,
  labourPriceBreakDownPercentage: 0,
  miscPrice: 0,
  miscPriceBreakDownPercentage: 0,
  totalPrice: 0,
  netService: 0,
  additionalPriceType: "",
  additionalPriceValue: 0,
  discountType: "",
  discountValue: 0,
  recommendedValue: 0,
  startUsage: 0,
  endUsage: 0,
  sparePartsEscalation: 0,
  labourEscalation: 0,
  miscEscalation: 0,
  serviceEscalation: 0,
  sparePartsNOE: 0,
  labourNOE: 0,
  miscNOE: 0,
  recommendedUnit: "",
  usageUnit: "",
  withBundleService: true,
  portfolio: null,
  tenantId: 0,
  inclusionExclusion: true,
  partsRequired: true,
  labourRequired: true,
  serviceRequired: false,
  miscRequired: true,
};

// usage Type key Value Pair list
export const usageTypeKeyValuePair = [
  { value: "Planned Usage", label: "Planned Usage" },
  { value: "Recommended usage", label: "Recommended usage" },
];


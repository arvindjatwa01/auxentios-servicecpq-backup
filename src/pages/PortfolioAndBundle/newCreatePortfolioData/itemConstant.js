// default item headers data for Item Add/Update 
export const defaultItemHeaderObj = {
    itemHeaderId: 0,
    itemHeaderDescription: "",
    bundleFlag: "SERVICE",
    withBundleService: false,
    portfolioItemIds: [],
    reference: "",
    itemHeaderMake: "",
    itemHeaderFamily: "",
    model: "",
    prefix: "",
    type: "",
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
    variant: "",
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
    serviceOptional: false,
};

// default item body model data for Item Add/Update 
export const defaultItemBodyObj = {
    itemBodyId: 0,
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
    itemPrices: [],
};

// default data for item Price Add/Update 
export const defaultItemPriceObj = {
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
    miscRequired: true
};

// default data for item Add/Update with itemHeader & item body data content
export const defaultItemObj = {
    itemId: 0,
    itemName: "",
    itemHeaderModel: { ...defaultItemHeaderObj },
    itemBodyModel: { ...defaultItemBodyObj },
};

// usage Type key Value Pair list
export const usageTypeKeyValuePair = [
    { value: "Planned Usage", label: "Planned Usage" },
    { value: "Recommended usage", label: "Recommended usage" },
];

// Offer validity Key Value Pair List
export const offerValidityKeyValuePairs = [
    { value: "15", label: "15 days" },
    { value: "30", label: "1 month" },
    { value: "45", label: "45 days" },
    { value: "60", label: "2 months" },
];

// Sales Office Location Key Value Pair List
export const salesOfficeKeyValuePairs = [
    { value: "Location1", label: "Location1" },
    { value: "Location2", label: "Location2" },
    { value: "Location3", label: "Location3" },
    { value: "Location4", label: "Location4" },
];

// Service Type (Chargeable or Optional) Key Value Pair List
export const serviceTypeKeyValuePairs = [
    { value: "free", label: "Free" },
    { value: "chargeable", label: "Chargeable" },
];

// Additional Price Type Key Value Pair List
export const additionalPriceKeyValuePair = [
    { label: "Surcharge %", value: "PERCENTAGE" },
    { label: "Surcharge $", value: "ABSOLUTE", },
];

// discount Type Key Value Pair List
export const discountTypeKeyValuePair = [
    { value: "PROGRAM_DISCOUNT", label: "Program" },
    { value: "CUSTOMER_DISCOUNT", label: "Customer" },
    { value: "PORTFOLIO_DISCOUNT", label: "Portfolio" },
];

// react-data-table-component custom style
export const dataTableCustomStyle = {
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

// react-select custom style
export const selectCustomStyle = {
    option: (provided, state) => ({
        ...provided,
        color: "#000",
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#872ff7",
        width: "140px",
        display: "flex",
        justifyContent: "center",
        fontSize: "14px",
        padding: "5px 10px",
        color: "#fff !important",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer"
    }),
}
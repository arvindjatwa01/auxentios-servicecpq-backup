export const warrantyDummyRecord = [
  {
    id: 1,
    warrantyId: "123546789",
    modelNo: "CE60F34-210L-004",
    serialNumber: "B-21-123456",
    warrantyBasis: "",
    warrantyStartDate: "10/15/2023",
    warrantyEndDate: "31/03/2024",
    startUsage: "",
    endUsage: "",
    replacement: "No",
    insataller: "Jones Supply",
    dateOfInsatll: "",
    dateOfSale: "",
    warrantyCertificateCopy: "",
    warrantyStatus: "In Warranty",
  },
  {
    id: 2,
    warrantyId: "123546791",
    modelNo: "CE60F34-210L-004",
    serialNumber: "B-21-123456",
    warrantyBasis: "",
    warrantyStartDate: "10/15/2023",
    warrantyEndDate: "31/03/2024",
    startUsage: "",
    endUsage: "",
    replacement: "No",
    insataller: "Goodman",
    dateOfInsatll: "",
    dateOfSale: "",
    warrantyCertificateCopy: "",
    warrantyStatus: "Out of Warranty",
  },
  {
    id: 3,
    warrantyId: "12354679",
    modelNo: "CE60F34-210L-004",
    serialNumber: "B-21-123456",
    warrantyBasis: "",
    warrantyStartDate: "10/15/2023",
    warrantyEndDate: "31/03/2024",
    startUsage: "",
    endUsage: "",
    replacement: "No",
    insataller: "Jimmi Robertson",
    dateOfInsatll: "",
    dateOfSale: "",
    warrantyCertificateCopy: "",
    warrantyStatus: "Out of Warranty",
  },
  {
    id: 4,
    warrantyId: "123546792",
    modelNo: "CE60F34-210L-004",
    serialNumber: "B-21-123456",
    warrantyBasis: "",
    warrantyStartDate: "10/15/2023",
    warrantyEndDate: "31/03/2024",
    startUsage: "",
    endUsage: "",
    replacement: "No",
    insataller: "Alex Martin",
    dateOfInsatll: "",
    dateOfSale: "",
    warrantyCertificateCopy: "",
    warrantyStatus: "In Warranty",
  },
  {
    id: 5,
    warrantyId: "123546793",
    modelNo: "CE60F34-210L-004",
    serialNumber: "B-21-123456",
    warrantyBasis: "",
    warrantyStartDate: "10/15/2023",
    warrantyEndDate: "31/03/2024",
    startUsage: "",
    endUsage: "",
    replacement: "No",
    insataller: "Rubby van",
    dateOfInsatll: "",
    dateOfSale: "",
    warrantyCertificateCopy: "",
    warrantyStatus: "In Warranty",
  },
  {
    id: 6,
    warrantyId: "123546794",
    modelNo: "CE60F34-210L-004",
    serialNumber: "B-21-123456",
    warrantyBasis: "",
    warrantyStartDate: "10/15/2023",
    warrantyEndDate: "31/03/2024",
    startUsage: "",
    endUsage: "",
    replacement: "No",
    insataller: "Sam Leffler",
    dateOfInsatll: "",
    dateOfSale: "",
    warrantyCertificateCopy: "",
    warrantyStatus: "Out of Warranty",
  },
];

export const claimRecords = [
  {
    id: 1,
    claimNumber: "123546794",
    claimStatus: "New",
    claimType: "STD",
    claimDate: "18/01/2025",
    replacement: "Yes",
  },
  {
    id: 2,
    claimNumber: "123546794",
    claimStatus: "In Review",
    claimType: "Extended",
    claimDate: "18/01/2025",
    replacement: "No",
  },
  {
    id: 3,
    claimNumber: "123546794",
    claimStatus: "Approved",
    claimType: "STD",
    claimDate: "18/01/2025",
    replacement: "No",
  },
  {
    id: 4,
    claimNumber: "123546794",
    claimStatus: "Rejected",
    claimType: "Goodwill",
    claimDate: "18/01/2025",
    replacement: "No",
  },
  {
    id: 5,
    claimNumber: "123546794",
    claimStatus: "Settled",
    claimType: "Extended",
    claimDate: "18/01/2025",
    replacement: "Yes",
  },
];

export const filesRecords = [
  {
    id: 1,
    fileName: "abcd tech.pdf",
    uploadDate: "01/01/2024",
    author: "John",
  },
  {
    id: 2,
    fileName: "abcd tech.pdf",
    uploadDate: "01/01/2024",
    author: "John",
  },
  {
    id: 3,
    fileName: "abcd tech.pdf",
    uploadDate: "01/01/2024",
    author: "John",
  },
  {
    id: 4,
    fileName: "abcd tech.pdf",
    uploadDate: "01/01/2024",
    author: "John",
  },
  {
    id: 5,
    fileName: "abcd tech.pdf",
    uploadDate: "01/01/2024",
    author: "John",
  },
  {
    id: 6,
    fileName: "abcd tech.pdf",
    uploadDate: "01/01/2024",
    author: "John",
  },
];

// Error occurred while fetching spare parts!
export const INPUT_SEARCH_ERROR_MESSAGE = "Please fill current search criteria";
export const INPUT_SEARCH_API_ERROR_MESSAGE = "Somthing went wrong";
export const INPUT_SEARCH_NO_RESULT_FOUND_ERROR_MESSAGE =
  "No information is found for your search, change the search criteria";
export const EMPTY_SEARCH_FIELDS_ERROR_MESSAGE =
  "Please fill the search criteria!";

export const warrantyStatusOptions = [
  { label: "In Warranty", value: "IN_WARRANTY" },
  { label: "Out of warranty", value: "OUT_OF_WARRANTY" },
  { label: "Denied warranty", value: "DENIED_WARRANTY" },
];

export const warrantyCategoryOptions = [
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
  { label: "Service Letter", value: "SERVICE_LETTER" },
];

export const warrantyBasisOptions = [
  { label: "Time", value: "TIME" },
  { label: "Usage", value: "USAGE" },
  { label: "Both", value: "BOTH" },
];

export const warrantyUnitOptions = [
  { label: "Months", value: "MONTHS" },
  { label: "Hours", value: "HOURS" },
  { label: "Miles", value: "MILES" },
  { label: "Km", value: "KM" },
];

export const claimStatusOptions = [
  { label: "Registered", value: "REGISTERED" },
  { label: "Acknowledged", value: "ACKNOWLEDGED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Closed", value: "CLOSED" },
];

export const claimTypeOptions = [
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
  { label: "Service Letter", value: "SERVICE_LETTER" },
  { label: "Goodwill", value: "GOODWILL" },
];

export const payerOptions = [
  { label: "Customer", value: "CUSTOMER" },
  { label: "Warranty", value: "WARRANTY" },
  { label: "GoodWill", value: "GOODWILL" },
  { label: "Insurer", value: "INSURER" },
];

export const installerTypeOptions = [
  { label: "OEM", value: "OEM" },
  { label: "Dealer", value: "DEALER" },
  { label: "Distributor", value: "DISTRIBUTOR" },
];

export const notesList = [
  {
    title: "Warranty Coverage",
    subTitle: "",
    contentList: [
      "The company warranty that the product(s) manufactured, sold, and delivered by the company to the customer shall be free from material defects and workmanship, conform to applicable specifications and perform by the product documentation under normal usage for 12 months or 2000 hours, whichever is earlier.",
    ],
  },
  {
    title: "Warranty Exclusions",
    subTitle: "The warranty does not cover:",
    contentList: [
      "a). Consumables include filters, engine oil, and batteries, unless product damage occurs due to materials or workmanship defects.",
      "b). Damage caused by accident, abuse, misuse, fire, earthquake, and other external causes.",
      "c). Damage caused by operating outside the company’s published guidelines.",
      "d). Defects caused by normal wear and tear or due to normal product ageing",
    ],
  },
  {
    title: "Claim Procedures",
    subTitle: "",
    contentList: [
      "The customer must notify within 10 days of the discovery of any claimed defect, specifying the nature of the claimed defect.",
    ],
  },
];

export const defaultWarrantyDetails = {
  warrantyId: 0,
  title: "",
  category: "",
  basis: "",
  unit: "",
  warrantyStartDate: "",
  warrantyEndDate: "",
  warrantyStartUsage: 0,
  warrantyEndUsage: 0,
  modelNumber: "",
  make: "",
  machineSerialNumber: "",
  componentCode: "",
  serialNumber: "",
  dateOfInstall: "",
  warrantyCertificate: "",
  proofOfInstall: "",
  warrantyStatus: "",
  notes: "",
  dateOfSale: "",
  manufactureDate: "",
  installerDetails: null,
  customerDetails: null,
  claimDetails: null,
  warrantyAgreement: "",
  replacement: false,
  machine: false,
};

export const defaultInstallerDetails = {
  installerId: 0,
  installerType: "",
  companyName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  phoneNumber: "",
};

export const defaultCustomerDetails = {
  customerId: 0,
  customerName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  phoneNumber: "",
};

export const warrantySearchOptions = [
  { label: "Serial Number", value: "serialNumber" },
  { label: "Component Code", value: "componentCode" },
  { label: "Equipment Number", value: "equipmentNumber" },
  { label: "Model Number", value: "ModelNo" },
];

export const defaultClaimDetails = {
  claimStatus: "",
  claimType: "",
  replacement: false,
  failDate: new Date(),
  installedDate: new Date(),
  defectType: "",
  defectDescription: "",
};

export const defaultDistributorObj = {
  distributorName: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  email: "",
  phoneNumber: "",
  fax: "",
};

export const claimRequestObj = {
  claimNumber: 0,
  modelNumber: "",
  equipmentNumber: "",
  serialNumber: "",
  componentCode: "",
  claimStatus: "",
  claimType: "",
  failDate: new Date(),
  failurePartNumber: "",
  hourOnMachine: 0,
  hoursOnFailedPart: 0,
  uploadPhoto: "",
  partList: "",
  repairTime: 0,
  claimStory: "",
  claimNotes: "",
  claimQuestionnaire: "",
  payer: "",
  claimApprover: "",
  claimReceiptDate: new Date(),
  createdOn: new Date(),
  updatedOn: new Date(),
  createdDate: new Date(),
  closedDate: new Date(),
  appoverRejectedOn: new Date(),
  warranty: null,
  replacement: false,
};

export const warrantyCertificatePDF =
  "https://assets.ctfassets.net/japba5fc4y8x/NrscZr5idwqmOQ8vr3DuW/f1397164e1c39b01511ea70[…]Certified_Rebuild_Promotion_-_Terms_and_Conditions__1_.pdf";

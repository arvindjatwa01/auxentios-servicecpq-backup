export const claimStatusFilterOptions = [
  { label: "Registered", value: "registered" },
  { label: "Acknowledged", value: "acknowledged" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
  { label: "Closed", value: "closed" },
];

export const claimTypeFilterOptions = [
  { label: "Standard", value: "standard" },
  { label: "Extended", value: "extended" },
  { label: "Service Letter", value: "serviceLetter" },
  { label: "Goodwill", value: "goodwill" },
];

export const warrantySearchOptions = [
  { label: "Serial Number", value: "serialNumber" },
  { label: "Component Code", value: "componentCode" },
  { label: "Equipment Id", value: "equipmentNumber" },
  { label: "Model Number", value: "ModelNo" },
];

export const warrantyStatusOptions = [
  { label: "In Warranty", value: "IN_WARRANTY" },
  { label: "Out of warranty", value: "OUT_OF_WARRANTY" },
  { label: "Denied warranty", value: "DENIED_WARRANTY" },
];

export const warrantyTypeOptions = [
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
  { label: "PDI", value: "PDI" },
  { label: "Goodwill", value: "GOODWILL" },
  { label: "Late Warranty", value: "LATE_WARRANTY" },
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

export const installerTypeOptions = [
  { label: "OEM", value: "OEM" },
  { label: "Dealer", value: "DEALER" },
  { label: "Distributor", value: "DISTRIBUTOR" },
];

export const payerOptions = [
  { label: "Customer", value: "CUSTOMER" },
  { label: "Warranty", value: "WARRANTY" },
  { label: "GoodWill", value: "GOODWILL" },
  { label: "Insurer", value: "INSURER" },
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

export const validityOptions = [
  { value: 15, label: "15 days" },
  { value: 30, label: "1 month" },
  { value: 45, label: "45 days" },
  { value: 60, label: "2 months" },
];

export const salesOfficeOptions = [
  { value: "Location1", label: "Location1" },
  { value: "Location2", label: "Location2" },
  { value: "Location3", label: "Location3" },
  { value: "Location4", label: "Location4" },
];

export const underWarrantyOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Expired", value: "EXPIRED" },
];

export const questionsOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
];

export const partsAnalysisOption = [
  `known to be faulty i.e. “sticky”`,
  `suspected faulty`,
  `without any fault`,
];

export const reasonForReturns = [
  {
    label: "Support Durability Failure Analysis",
    value: "SUPPORT_DURABILITY_FAILURE_ANALYSIS",
  },
  { label: "Support Part Rebuild", value: "SUPPORT_PART_REBUILD" },
  // { label: "Support Durabilit", value: "SUPPORT_DURABILIT" },
  // { label: "Failure Analysis", value: "FAILURE_ANALYSIS" },
  // { label: "Support parts rebuild", value: "SUPPORT_PARTS_REBUILD" },
];

export const requestTypeOptions = [
  { label: "Part Number", value: "PART_NUMBER" },
  { label: "BEC Code", value: "BEC_CODE" },
  { label: "GTIN Number", value: "GTIN_NUMBER" },
];

export const transactionTypeOptions = [
  { label: "Warranty Contract", value: "WARRANTY" },
  { label: "Safety Contract", value: "SAFETY" },
  { label: "Service Contract", value: "SERVICE_CONTRACT" },
];

export const shipmentRetunTypeOptions = [
  { label: "Intra Company", value: "INTRA_COMPANY" },
  { label: "With in Company", value: "WITHIN_COMPANY" },
];

export const rmaTypeOptions = [
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
];

export const rmaResonOptions = [
  { label: "Failure Analysis", value: "FAILURE_ANALYSIS" },
  { label: "Replacement", value: "REPLACEMENT" },
];

export const claimRequestTypeOptions = [
  { label: "PWA- Pre Warranty Authorized", value: "PWA" },
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
  { label: "Goodwill", value: "GOODWILL" },
  { label: "Late Claim", value: "LATE_CLAIM" },
];

export const supplierVendorSearchOptions = [
  { label: "Supplier Id", value: "customerId" },
  { label: "Supplier Name", value: "fullName" },
];

export const failedPartsRecord = [
  {
    index: Math.floor(Math.random() * 900) + 10000,
    partNumber: "N90058041",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "10R4469",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
];

export const causalPartRecord = [
  {
    index: Math.floor(Math.random() * 9000) + 1000,
    partNumber: "039720N2",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
  {
    index: Math.floor(Math.random() * 9000) + 10000,
    partNumber: "5788987",
    partDescription: "Cylinder Pack",
    quantity: "1",
    analysis: "Known to be faulty",
  },
];

export const warrantyNotesList = [
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

export const warrantyRequestObj = {
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

export const customerRequestObj = {
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

export const installerRequestObj = {
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

// Claim api  response json data
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
  smu: "",
  fleetNo: "",
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
  warrantyId: 0,
  assessmentId: 0,
  evaluationId: 0,
  claimOrderId: 0,
  replacement: false,
  customerNumber: "",
  customerName: "",
};

// assessment Request Object
export const claimAssessmentRequestObj = {
  warrantyTitle: "",
  warrantyRequestDate: new Date(),
  warrantyEndDate: new Date(),
  warrantyId: 0,
  assessmentDate: new Date(),
  machineUnderWarranty: "",
  assessmentType: "",
  complainRow1: "",
  complainRow2: "",
  complainRow3: "",
  warrantyNotes: "",
  uploadPhoto: "",
  uploadDocument: "",
  assignToFirstName: "",
  assignToLastName: "",
  assignToEmail: "",
  assignToRole: "",
  assignToPosition: "",
  claimId: 0,
};

// claim value request object
export const claimValueRequestObj = {
  type: "",
  coverageType: "",
  totalAmountClaimed: 0,
  totalPartsClaimed: 0,
  totalHoursClaimed: 0,
  totalLaborAmountClaimed: 0,
  travelClaimed: 0,
  miscClaimed: 0,
  vehicleKMClaimed: 0,
  claimOrderId: 0,
};

export const claimRelatedHERequestObj = {
  type: "",
  code: "",
  name: "",
  alternateCode: "",
  claimNumber: "",
  coverageType: "",
  repairDate: new Date(),
  workOrder: "",
  jobHours: 0,
  travelHours: 0,
  vehicleKM: 0,
  miscDetails: "",
  claimOrderId: 0,
};

export const claimSettlementRequestObj = {
  type: "",
  totalAmountAllowed: 0,
  totalPartsAllowed: 0,
  totalHoursAllowed: 0,
  totalLaborAllowed: 0,
  travelAllowed: 0,
  miscAllowed: 0,
  vehicleKMAllowed: 0,
  totalInsurance: 0,
  serviceDeduction: 0,
  settlement: "",
  settlementDate: new Date(),
  claimOrderId: 0,
};

// evaluation request object
export const evaluationRequestObj = {
  evaluatedByFirstName: "",
  evaluatedByLastName: "",
  evaluatedByEmail: "",
  evaluatedByRole: "",
  evaluatedByPosition: "",
  evaluatedOn: new Date(),
  evaluationChangedBy: "",
  evaluationChangedOn: new Date(),
  evaluationPartIds: [],
  evaluated: true,
  claimId: 0,
};

export const returnRequestObj = {
  reasonForReturnType: "",
  region: "",
  qecAssigned: "",
  assignSpecialist: "",
  requestTitle: "",
  geographicalGroup: "",
  requestType: "",
  claimTransactionType: "",
  requesterName: "",
  requesterBU: "",
  requesterEmail: "",
  requesterPhone: "",
  endRequester: true,
};

export const partsReturnHeaderObj = {
  maxQuantityRequested: null,
  claimNumber: null,
  claimDate: new Date(),
  repairDateFrom: new Date(),
  repairDateTo: new Date(),
  failureCode: "",
  messageCode: "",
  gtinBCECode: "",
  partCostRange: "",
  smuUnit: "",
  smuFromToSmuTo: "",
  failurePartOnly: true,
  casualPartOnly: true,
};

export const partsReturnShippingObj = {
  wareHouseNumber: "",
  storageLocation: "",
  shippingMethod: "",
  shippingAddress: "",
  alternateShippingAddress: "",
};

export const partsShipmentObj = {
  returnNumber: "",
  returnType: "",
  shippedOn: new Date(),
  trackingNumber: "",
  senderLocation: "",
  receiverLocation: "",
  receiverAddress: "",
  disposeType: "",
  shipmentReceived: true,
  rmaType: "",
  rmaReason: "",
  rmaNumber: "",
};

// equipment Request obj
export const equipmentRequestObj = {
  id: 0,
  equipmentNumber: "",
  description: "",
  status: "",
  stockNumber: "",
  currentClient: 0,
  maker: "",
  makerSerialNumber: "",
  technicalIdendificationNumber: "",
  motorBrand: "",
  engineModel: "",
  motorSerialNumber: "",
  typeOfApplication: "",
  unitOfMeasurement: "",
  mainWork: "",
  modelPrefix: "",
  model: "",
  brand: "",
  market: "",
  productLine: "",
  productSegment: "",
  productGroup: "",
  customer: "",
  owner: "",
  geocode: "",
  sensorId: "",
  usageType: "",
  usageDescription: "",
  serviceLetter: "",
  warranty: "",
  serviceLetterId: "",
  installationDate: new Date(),
  endOfLife: 0,
  endOfLifeUnit: "",
  plannedUsage: "",
  unit: "",
  operator: "",
  contact: "",
  warrantyAvailability: "",
  yearOfManufacture: "",
  lastOwner: "",
  fleetOwner: "",
  movedInOrOutFlag: true,
  previousLocation: true,
  newLocation: true,
  movedInDate: new Date(),
  addressDTO: null,
  customerId: "",
  installer: "",
  purchaseDate: new Date(),
  placeOfPurchase: "",
  usedFor: "",
  usageCondition: "",
  warrantyStatus: "",
  warrantyId: "",
  createdBy: "",
  updatedBy: "",
  // warrantyRecords: [
  //   {
  //     id: 0,
  //     warrantyId: "string",
  //     title: "string",
  //     category: "string",
  //     basis: "string",
  //     unitOfMeasure: "string",
  //     startDate: "2024-03-16",
  //     endDate: "2024-03-16",
  //     validFor: "string",
  //     startUsage: "string",
  //     endUsage: "string",
  //     createdAt: "2024-03-16",
  //     updatedAt: "2024-03-16",
  //     createdBy: "string",
  //     updatedBy: "string",
  //   },
  // ],
  // contractRecords: [
  //   {
  //     id: 0,
  //     entitlementId: "string",
  //     title: "string",
  //     category: "string",
  //     basis: "string",
  //     amount: 0,
  //     currency: "string",
  //     validFor: "string",
  //     unitOfMeasure: "string",
  //     startDate: "2024-03-16",
  //     endDate: "2024-03-16",
  //     startUsage: "string",
  //     endUsage: "string",
  //     createdAt: "2024-03-16",
  //     updatedAt: "2024-03-16",
  //     createdBy: "string",
  //     updatedBy: "string",
  //   },
  // ],
  // usageRecords: [
  //   {
  //     id: 0,
  //     currentUsage: "string",
  //     averageUsage: "string",
  //     sensorId: "string",
  //     smuId: "string",
  //     smuType: "string",
  //     createdAt: "2024-03-16",
  //     updatedAt: "2024-03-16",
  //     createdBy: "string",
  //     updatedBy: "string",
  //   },
  // ],
  // sensorRecords: [
  //   {
  //     id: 0,
  //     sensorId: "string",
  //     smuType: "string",
  //     usageId: "string",
  //     readingDate: "2024-03-16",
  //     unit: "string",
  //     readingDescription: "string",
  //     overwrite: "string",
  //     createdAt: "2024-03-16",
  //     updatedAt: "2024-03-16",
  //     createdBy: "string",
  //     updatedBy: "string",
  //   },
  // ],
  // failureRecords: [
  //   {
  //     id: 0,
  //     partNumber: "string",
  //     amount: 0,
  //     subAssembly: "string",
  //     warranty: "string",
  //     failureDate: "2024-03-16",
  //     repairDate: "2024-03-16",
  //     usage: "string",
  //     complaint: "string",
  //     cause: "string",
  //     correction: "string",
  //     specificInformation: "string",
  //     createdAt: "2024-03-16",
  //     updatedAt: "2024-03-16",
  //     createdBy: "string",
  //     updatedBy: "string",
  //   },
  // ],
  // serviceRecords: [
  //   {
  //     id: 0,
  //     reportNumber: "string",
  //     jobNumber: "string",
  //     engineModelNumber: "string",
  //     engineSerialNumber: "string",
  //     usage: "string",
  //     repairDate: "2024-03-16",
  //     complaint: "string",
  //     action: "string",
  //     condition: "string",
  //     customerRequest: "string",
  //     engineerRemark: "string",
  //     customer: "string",
  //     siteAddress: "string",
  //     createdAt: "2024-03-16",
  //     updatedAt: "2024-03-16",
  //     createdBy: "string",
  //     updatedBy: "string",
  //   },
  // ],
};

export const equipmentAddressDtoObj = {
  id: 0,
  addressId: 0,
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  fullAddress: "",
  district: "",
  regionOrState: "",
  country: "",
  createdAt: "2024-03-16T12:55:44.167Z",
  updatedAt: "2024-03-16T12:55:44.167Z",
  createdBy: "",
  updatedBy: "",
};

export const equipmentWarrantyRecordsObj = {
  id: 0,
  warrantyId: "",
  title: "",
  category: "",
  basis: "",
  unitOfMeasure: "",
  startDate: new Date(),
  endDate: new Date(),
  validFor: "",
  startUsage: "",
  endUsage: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "",
  updatedBy: "",
};

export const equipmentContractRecordsObj = {
  id: 0,
  entitlementId: "",
  title: "",
  category: "",
  basis: "",
  amount: 0,
  currency: "",
  validFor: "",
  unitOfMeasure: "",
  startDate: new Date(),
  endDate: new Date(),
  startUsage: "",
  endUsage: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "",
  updatedBy: "",
};

export const equipmentUsageRecordsObj = {
  id: 0,
  currentUsage: "",
  averageUsage: "",
  sensorId: "",
  smuId: "",
  smuType: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "",
  updatedBy: "",
};

export const equipmentSensorRecordsObj = {
  id: 0,
  sensorId: "",
  smuType: "",
  usageId: "",
  readingDate: new Date(),
  unit: "",
  readingDescription: "",
  overwrite: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "",
  updatedBy: "",
};

export const equipmentFailureRecordsObj = {
  id: 0,
  partNumber: "",
  amount: 0,
  subAssembly: "",
  warranty: "",
  failureDate: new Date(),
  repairDate: new Date(),
  usage: "",
  complaint: "",
  cause: "",
  correction: "",
  specificInformation: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "",
  updatedBy: "",
};

export const equipmentServiceRecords = {
  id: 0,
  reportNumber: "",
  jobNumber: "",
  engineModelNumber: "",
  engineSerialNumber: "",
  usage: "",
  repairDate: new Date(),
  complaint: "",
  action: "",
  condition: "",
  customerRequest: "",
  engineerRemark: "",
  customer: "",
  siteAddress: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: "",
  updatedBy: "",
};

export const yearlyWarrantyObj = {
  title: "",
  warrantyType: "",
  basis: "",
  warrantyStartDate: "",
  warrantyEndDate: "",
  // warrantyStartDate: new Date(),
  // warrantyEndDate: new Date(),
  warrantyStartUsage: 0,
  warrantyEndUsage: 0,
  warrantyExpAccount: "",
  amount: 0,
  componentIds: [],
  costCoverageId: 0,
  warrantyIds: [],
};

export const warrantyCreateObj = {
  warrantyId: 0,
  warrantyTitle: "",
  warrantyNumber: "",
  title: "",
  unit: "",
  // dateOfInstall: new Date(),
  dateOfInstall: "",
  warrantyCertificate: "",
  proofOfInstall: "",
  warrantyStatus: "IN_WARRANTY",
  notes: "",
  dateOfSale: "",
  // dateOfSale: new Date(),
  // manufactureDate: new Date(),
  manufactureDate: "",
  installerId: 0,
  claimId: 0,
  yearlyWarrantyIds: [],
  equipmentId: 0,
  warrantyAgreement: "",
  replacement: true,
};

export const installerCreateObj = {
  installerType: "OEM",
  companyName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  phoneNumber: "",
  warrantyId: 0,
};

export const sparePartRequestObj = {
  id: 0,
  partNumber: "",
  replacedByPartNumber: "",
  replacesPartNumber: "",
  manufacturer: "",
  model: "",
  groupNumber: "",
  partDescription: "",
  partsGroup: "",
  modelGroupDescription: "",
  partGroupDescription: "",
  yearOfManufacture: "",
  salesUnit: "",
  listPrice: 0,
  costPrice: 0,
  currency: "",
  partType: "",
  usageArea: "",
  availability: "",
  status: "",
  partComplexity: "",
  partUsage: "",
  demand: "",
  application: "",
  erpMaterialNumber: "",
  legacyMaterial: "",
  alternativePart: "",
  materialGroup: "",
  materialGroupDescription: "",
  becCode: "",
  becCodeDescription: "",
  createdBy: "",
  updatedBy: "",
};

export const replacementItemReqObj = {
  componentId: "123",
  description: "abcd",
  type: "",
  availableDate: new Date(),
  status: "",
  salePrice: "",
  location: "",
  manufacturer: "",
  modelNumber: "",
  serialNumber: "",
  coreId: "",
  returnable: false,
  valuation: "",
};

export const replacementErpReqObj = {
  materialCode: "",
  materialDescription: "",
  materialGroup: "",
  averageCost: "",
  salePrice: "",
  availablityStatus: "",
  stockQuantity: "",
  status: "",
  warehouse: "",
};

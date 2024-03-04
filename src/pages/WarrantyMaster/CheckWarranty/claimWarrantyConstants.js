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

export const warrantyClaimStatusOption = [
  { label: "Registered", value: "REGISTERED" },
  { label: "Acknowledged", value: "ACKNOWLEDGED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Closed", value: "CLOSED" },
];

export const underWarrantyOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Expired", value: "EXPIRED" },
];

export const warrantyTypeOptions = [
  { label: "Standard", value: "STANDARD" },
  { label: "Extended", value: "EXTENDED" },
  { label: "PDI", value: "PDI" },
  { label: "Goodwill", value: "GOODWILL" },
  { label: "Late Warranty", value: "LATE_WARRANTY" },
];

export const questionsOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
];

export const shipmentRetunTypeOptions = [
  { label: "Intra Company", value: "INTRA_COMPANY" },
  { label: "With in Company", value: "WITHIN_COMPANY" },
];

// claim order constants
export const claimOrderReqObj = {
  customerNumber: 0,
  customerName: "",
  emailId: "",
  address: "",
  contactNumber: "",
  make: "",
  model: "",
  serialNumber: 0,
  location: "",
  smu: "",
  unitNumber: "",
  repairFromDate: new Date(),
  repairToDate: new Date(),
  preparedBy: "",
  preparedOn: new Date(),
  revisedBy: "",
  revisedOn: new Date(),
  claimRequestDate: new Date(),
  claimType: "",
  description: "",
  claimNumber: "",
  reference: "",
};

// assessment Request Object
export const claimAssessmentReqObj = {
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
};

// evaluation request object
export const evaluationReqObj = {
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
};

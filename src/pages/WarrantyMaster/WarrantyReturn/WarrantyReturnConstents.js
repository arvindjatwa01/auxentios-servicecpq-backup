export const returnReqObj = {
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

export const returnPartHeaderReqObj = {
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

export const returnShippingReqObj = {
  wareHouseNumber: "",
  storageLocation: "",
  shippingMethod: "",
  shippingAddress: "",
  alternateShippingAddress: "",
};

export const shipmentHeaderReqObj = {
  returnNumber: "",
  returnType: "",
  shippedOn: new Date(),
  trackingNumber: "",
  senderLocation: "",
  receiverLocation: "",
  receiverAddress: "",
  disposeType: "",
  shipmentReceived: true,
};

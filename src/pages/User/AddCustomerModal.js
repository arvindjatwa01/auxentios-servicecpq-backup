import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { default as Select, default as SelectFilter } from "react-select";
import { callGetApi, callPostApi, callPutApi } from "services/ApiCaller";
import {
  DATA_SVC_CUSTOMER_MASTER_URL,
  USER_SERVICE_ADD_USER,
  USER_SERVICE_TENANT_MASTER_URL,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";

const masterSelectObj = {
  id: 0,
  customerId: "",
  firstName: "",
  lastName: "",
  fullName: "",
  customerType: "",
  businessArea: "",
  distributionChannel: "",
  email: "",
  serviceRecipent: "",
  payer: "",
  shipTo: "",
  billTo: "",
  customerGroup: "",
  customerSegment: "",
  taxRelevant: "",
  currency: "",
  contactType: "",
  contactName: "",
  primaryContact: "",
  contactAddress: "",
  addressDTO: null,
  createdBy: "",
  updatedBy: "",
};

const addressDTOObj = {
  id: 0,
  addressId: 0,
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  fullAddress: "",
  district: "",
  regionOrState: "",
  country: "",
  createdBy: "",
  updatedBy: "",
};

const customerTypeOption = [
  { label: "Partner", value: "P" },
  { label: "Customer", value: "C" },
];

const AddCustomerModal = ({
  openAddCustomer,
  handleAddCustomerClose,
  customerId,
  title,
  handleSnack,
  roles,
}) => {
  let fontColor = "#872ff7 !important";
  const customStyle = {
    control: (styles, { isDisabled }) => {
      return {
        ...styles,
        borderRadius: 10,
        fontSize: 14,
        color: fontColor,
      };
    },
    singleValue: (styles, { isDisabled }) => {
      return {
        ...styles,
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 500,
        color: fontColor,
      };
    },
  };

  const [record, setRecord] = useState({
    ...masterSelectObj,
    type: "",
    customerName: "",
    customerNumber: "",
    role: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const [addressRecord, setAddressRecord] = useState({ ...addressDTOObj });

  useEffect(() => {
    if (customerId) {
      const rUrl = `${DATA_SVC_CUSTOMER_MASTER_URL}/${customerId}`;
      console.log("Custom rURl ::: ", rUrl);
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const _customerType = customerTypeOption.find(
            (obj) => obj.value === responseData.customerType
          );
          const _contactType = roles.find(
            (obj) => obj.value === responseData.contactType
          );

          setRecord({
            ...responseData,
            customerType: _customerType || "",
            contactType: _contactType || "",
          });

          setAddressRecord({ ...responseData["addressDTO"] });
        }
      });
    }
  }, [customerId]);

  // change input fields value
  const handleInputValueChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };

  // change input fields value
  const handleAddressInputValueChange = (e) => {
    const { name, value } = e.target;
    setAddressRecord({ ...addressRecord, [name]: value });
  };

  const handleAddUpdateCustomer = () => {
    const rObj = {
      ...record,
      fullName: record.firstName + " " + record.lastName,
      customerType: record.customerType?.value || "CUSTOMER",
      contactType: record.contactType?.label || "End_Customer",
      addressDTO: addressRecord,
    };
    if (customerId) {
      callPutApi(
        null,
        `${DATA_SVC_CUSTOMER_MASTER_URL}/${customerId}`,
        rObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            handleSnack("success", "Custome Details updated succefully.");
            handleAddCustomerClose();
            // handleAddUpdateTenetUser(responseData);
          } else {
            handleSnack("info", response?.data?.message);
          }
        }
      );
    } else {
      callPostApi(null, DATA_SVC_CUSTOMER_MASTER_URL, rObj, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;
          handleAddUpdateTenetUser(responseData);
        } else {
          handleSnack("info", response?.data?.message);
        }
      });
    }
  };

  const handleAddUpdateTenetUser = (responseData) => {
    const rObj = {
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email || "",
      password: "test123",
      isApproved: true,
      roleName: record.contactType?.label || "TENANT_ADMIN",
      type: "TENANT_BUSINESS_USER",
      customerId: responseData.id ? parseInt(responseData.id) : 0,
      // customerId: record.customerId ? parseInt(record.customerId) : 0,
    };
    callPostApi(null, USER_SERVICE_ADD_USER(), rObj, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        if (record.customerType?.value === "CUSTOMER") {
          handleCreateTenent(responseData);
        } else {
          handleSnack(
            "success",
            `Partner ${parseInt(record.customerId)} created successfully.`
          );
          handleAddCustomerClose();
        }
      } else {
        handleSnack("info", response?.data?.message);
      }
    });
  };

  const handleCreateTenent = (result) => {
    const rObj = {
      tenantOwnerId: result.userId,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      domain: "TENANT_DOMAIN",
      customerId: parseInt(record.customerId),
      active: true,
      apackage: "MOMENTUM",
    };

    callPostApi(null, USER_SERVICE_TENANT_MASTER_URL, rObj, (response) => {
      if (response.status === API_SUCCESS) {
        handleSnack(
          "success",
          `Customer ${parseInt(record.customerId)} created successfully.`
        );
        handleAddCustomerClose();
      } else {
        handleSnack("info", response?.data?.message);
      }
    });
  };

  return (
    <Modal
      show={openAddCustomer}
      onHide={handleAddCustomerClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-header-border">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 bg-white">
        <div>
          <div className="card border px-3 pt-2 mb-4">
            <div className="row input-fields mt-3">
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    TYPE
                  </label>
                  <Select
                    onChange={(e) =>
                      setRecord({
                        ...record,
                        customerType: e,
                        customerId: "",
                      })
                    }
                    styles={customStyle}
                    getOptionLabel={(option) => `${option.label}`}
                    value={record.customerType}
                    options={customerTypeOption}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PARTNER/CUSTOMER FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={record.firstName}
                    className="form-control border-radius-10 text-primary"
                    onChange={handleInputValueChange}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PARTNER/CUSTOMER LAST NAME
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={record.lastName}
                    className="form-control border-radius-10 text-primary"
                    onChange={handleInputValueChange}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    PARTNER/CUSTOMER NUMBER
                  </label>
                  <input
                    type="number"
                    name="customerId"
                    value={record.customerId}
                    onChange={handleInputValueChange}
                    className="form-control border-radius-10 text-primary"
                    disabled={
                      record.customerType === "" ||
                      record.customerType?.value === "P"
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    ROLE
                  </label>
                  <Select
                    onChange={(e) =>
                      setRecord({
                        ...record,
                        contactType: e,
                      })
                    }
                    styles={customStyle}
                    getOptionLabel={(option) => `${option.label}`}
                    value={record.contactType}
                    options={roles}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputValueChange}
                    value={record.email}
                    className="form-control border-radius-10 text-primary font-size-14"
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    name="primaryContact"
                    value={record.primaryContact}
                    onChange={handleInputValueChange}
                    className="form-control border-radius-10 text-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card border px-3 pt-2 mb-4">
            <div className="row input-fields mt-3">
              <div className="col-md-12 col-sm-12">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    ADDRESS
                  </label>
                  <input
                    type="text"
                    name="fullAddress"
                    value={addressRecord.fullAddress}
                    onChange={handleAddressInputValueChange}
                    className="form-control border-radius-10 text-primary"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    CITY
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={addressRecord.district}
                    onChange={handleAddressInputValueChange}
                    className="form-control border-radius-10 text-primary"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    STATE
                  </label>
                  <input
                    type="text"
                    name="regionOrState"
                    value={addressRecord.regionOrState}
                    onChange={handleAddressInputValueChange}
                    className="form-control border-radius-10 text-primary"
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    COUNTRY
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={addressRecord.country}
                    onChange={handleAddressInputValueChange}
                    className="form-control border-radius-10 text-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="m-3 text-right">
            <button
              type="button"
              onClick={handleAddCustomerClose}
              className="btn border mr-3 "
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn text-white bg-primary"
              onClick={handleAddUpdateCustomer}
              disabled={
                !(
                  record.customerType &&
                  record.firstName &&
                  record.lastName &&
                  record.email &&
                  record.contactType
                )
              }
            >
              {title}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;

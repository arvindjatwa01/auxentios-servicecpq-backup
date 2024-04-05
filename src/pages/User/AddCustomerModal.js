import Cookies from "js-cookie";
import SearchBox from "pages/Common/SearchBox";
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
import { customerSearch } from "services/searchServices";

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

const rolesOption = [
  {label: "Partner Admin", value: "TENANT_ADMIN"},
  {label: "End Customer", value: "End_Customer"}
]

const AddCustomerModal = ({
  openAddCustomer,
  handleAddCustomerClose,
  customerId,
  title,
  handleSnack,
  roles,
}) => {
  var CookiesSetData = Cookies.get("loginTenantDtl");
  var getCookiesJsonData;
  if (CookiesSetData != undefined) {
    getCookiesJsonData = JSON.parse(CookiesSetData);
  }
  const loginTenantId =
    CookiesSetData != undefined ? getCookiesJsonData?.user_customerId : "";

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

  const [searchCustResults, setSearchCustResults] = useState([]);
  const [noOptionsCust, setNoOptionsCust] = useState(false);
  const [isCustomerSelect, setIsCustomerSelect] = useState(false);
  const [isAddressDTO, setIsAddressDTO] = useState(false);

  const [updateCust, setUpdateCust] = useState(false);

  const [addressRecord, setAddressRecord] = useState({ ...addressDTOObj });

  useEffect(() => {
    if (customerId) {
      setUpdateCust(true);
      const rUrl = `${DATA_SVC_CUSTOMER_MASTER_URL}/${customerId}`;
      console.log("Custom rURl ::: ", rUrl);
      callGetApi(null, rUrl, (response) => {
        if (response.status === API_SUCCESS) {
          const responseData = response.data;

          const _customerType = customerTypeOption.find(
            (obj) => obj.value === responseData.customerType
          );
          const _contactType = rolesOption.find(
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

  const handleSelectType = (e) => {
    let _contactType = "";
    let _customerId = "";
    if (e.value === "P") {
      _contactType = {label: "Partner Admin", value: "TENANT_ADMIN"};
      // _contactType = {
      //   roleId: 1,
      //   roleName: "TENANT_ADMIN",
      //   roleDispName: "TENANT_ADMIN",
      //   roleDesc: "Role for Tenant admin user",
      //   privileges: [
      //     {
      //       privilegeId: 16,
      //       privilegeName: "TENANT_END_CUSTOMER",
      //       privilegeDesc: "Privilege for Tenant end customer",
      //     },
      //     {
      //       privilegeId: 3,
      //       privilegeName: "TENANT_ADMIN",
      //       privilegeDesc: "Privilege for Tenant admin user",
      //     },
      //   ],
      //   value: 1,
      //   label: "TENANT_ADMIN",
      // };
      _customerId = loginTenantId;
    } else if (e.value === "C") {
      _contactType = {label: "End Customer", value: "End_Customer"};
      // _contactType = {
      //   roleId: 8,
      //   roleName: "End_Customer",
      //   roleDispName: "End_Customer",
      //   roleDesc: "Tenant_End_Customer",
      //   privileges: [
      //     {
      //       privilegeId: 16,
      //       privilegeName: "TENANT_END_CUSTOMER",
      //       privilegeDesc: "Privilege for Tenant end customer",
      //     },
      //   ],
      //   value: 8,
      //   label: "End_Customer",
      // };
      _customerId = "";
    }
    setRecord({
      ...masterSelectObj,
      customerType: e,
      contactType: _contactType,
      customerId: _customerId,
    });
    setIsCustomerSelect(false);
  };

  // Search Customer with customer ID
  const handleCustSearch = async (searchCustfieldName, searchText) => {
    setSearchCustResults([]);
    setIsCustomerSelect(false);
    setIsAddressDTO(false);
    record.customerId = searchText;
    if (searchText) {
      await customerSearch(searchCustfieldName + "~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCustResults(result);
            setNoOptionsCust(false);
          } else {
            setNoOptionsCust(true);
          }
        })
        .catch((e) => {
          handleSnack("error", "Error occurred while searching the customer!");
        });
    }
  };

  // Select the customer from search result
  const handleCustSelect = (type, currentItem) => {
    setRecord({
      ...record,
      id: currentItem.id,
      customerId: currentItem.customerId,
      firstName: currentItem.firstName,
      lastName: currentItem.lastName,
      // customerName: currentItem.fullName,
      email: currentItem.email,
      primaryContact: currentItem.primaryContact,
      // address: currentItem.addressDTO?.fullAddress,
      // city: currentItem.addressDTO?.district,
      // state: currentItem.addressDTO?.regionOrState,
      // zipCode: currentItem.addressDTO?.zipCode,
      // addressId: currentItem.addressDTO?.id,
    });
    setIsAddressDTO(false);
    if (currentItem["addressDTO"]) {
      setIsAddressDTO(true);
      setAddressRecord(currentItem.addressDTO);
    }
    setIsCustomerSelect(true);
    setSearchCustResults([]);
  };

  const handleAddUpdateCustomer = () => {
    const rObj = {
      ...record,
      fullName: record.firstName + " " + record.lastName,
      customerType: record.customerType?.value || "CUSTOMER",
      contactType: record.contactType?.value || "End_Customer",
      addressDTO: { ...addressRecord, addressLine1: addressRecord.fullAddress },
    };

    if (updateCust && customerId) {
      callPutApi(
        null,
        `${DATA_SVC_CUSTOMER_MASTER_URL}/${customerId}`,
        rObj,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            handleSnack("success", "Customer Details updated succefully.");
            handleAddCustomerClose();
            // handleAddUpdateTenetUser(responseData);
          } else {
            handleSnack("info", response?.data?.message);
          }
        }
      );
    } else {
      if (record.customerType?.value === "P" && !noOptionsCust) {
        callPostApi(null, DATA_SVC_CUSTOMER_MASTER_URL, rObj, (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            handleAddUpdateTenetUser(responseData);
          } else {
            handleSnack("info", response?.data?.message);
          }
        });
      } else if (record.customerType?.value === "C" && noOptionsCust) {
        callPostApi(null, DATA_SVC_CUSTOMER_MASTER_URL, rObj, (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;
            handleAddUpdateTenetUser(responseData);
          } else {
            handleSnack("info", response?.data?.message);
          }
        });
      } else {
        handleAddUpdateTenetUser(record);
      }
    }
  };

  const handleAddUpdateTenetUser = (responseData) => {
    const rObj = {
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email || "",
      password: "test123",
      isApproved: true,
      roleName: record.contactType?.value || "TENANT_ADMIN",
      type: "TENANT_BUSINESS_USER",
      customerId: responseData.id ? parseInt(responseData.id) : 0,
      // customerId: record.customerId ? parseInt(record.customerId) : 0,
    };
    callPostApi(null, USER_SERVICE_ADD_USER(), rObj, (response) => {
      if (response.status === API_SUCCESS) {
        const responseData = response.data;
        if (record.customerType?.value === "C") {
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
          `Customer ${parseInt(record.customerId)} authorized successfully.`
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
                    onChange={handleSelectType}
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
                    {record.customerType?.value === "P"
                      ? "PARTNER"
                      : record.customerType?.value === "C"
                      ? "CUSTOMER"
                      : ""}{" "}
                    NUMBER
                  </label>
                  {record.customerType === "" ||
                  record.customerType?.value === "P" ? (
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
                  ) : (
                    <SearchBox
                      value={record.customerId}
                      onChange={(e) =>
                        handleCustSearch("customerId", e.target.value)
                      }
                      type="customerId"
                      result={searchCustResults}
                      onSelect={handleCustSelect}
                      noOptions={noOptionsCust}
                      placeholder={`${
                        record.customerType?.value === "P"
                          ? "Partner Id"
                          : record.customerType?.value === "C"
                          ? "Customer Id"
                          : ""
                      }`}
                      disabled={
                        record.customerType === "" ||
                        record.customerType?.value === "P"
                      }
                    />
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {record.customerType?.value === "P"
                      ? "PARTNER"
                      : record.customerType?.value === "C"
                      ? "CUSTOMER"
                      : ""}{" "}
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={record.firstName}
                    className="form-control border-radius-10 text-primary"
                    onChange={handleInputValueChange}
                    disabled={isCustomerSelect}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-12 font-weight-500">
                    {record.customerType?.value === "P"
                      ? "PARTNER"
                      : record.customerType?.value === "C"
                      ? "CUSTOMER"
                      : ""}{" "}
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={record.lastName}
                    className="form-control border-radius-10 text-primary"
                    onChange={handleInputValueChange}
                    disabled={isCustomerSelect}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
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
                    // getOptionLabel={(option) => `${option.label}`}
                    value={record.contactType}
                    options={rolesOption}
                    isDisabled
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
                    disabled={isCustomerSelect}
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
                    disabled={isCustomerSelect}
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
                    disabled={isAddressDTO}
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
                    disabled={isAddressDTO}
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
                    disabled={isAddressDTO}
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
                    disabled={isAddressDTO}
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

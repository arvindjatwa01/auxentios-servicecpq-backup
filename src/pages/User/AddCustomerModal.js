import { Modal } from "react-bootstrap";
import { default as Select, default as SelectFilter } from "react-select";

const AddCustomerModal = (props) => {
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
  // console.log(props.subscriberData)
  return (
    <Modal
      show={props.openAddCustomer}
      onHide={props.handleAddCustomerClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="modal-header-border">
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-3 bg-white">
        <div>
          <div className="p-3">
            <div className="row input-fields mt-4">
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Type
                  </label>
                  <Select
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        type: e,
                      })
                    }
                    styles={customStyle}
                    getOptionLabel={(option) => `${option.label}`}
                    value={props.subscriberData.type}
                    options={props.dealerTypes}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    NAME
                  </label>
                  <input
                    type="text"
                    value={props.subscriberData.dealerName}
                    className="form-control border-radius-10 text-primary"
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        dealerName: e.target.value,
                      })
                    }
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Dealer Number
                  </label>
                  <input
                    type="text"
                    value={props.subscriberData.dealerNumber}
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        dealerNumber: e.target.value,
                      })
                    }
                    className="form-control border-radius-10 text-primary"
                  />
                  {/* <div className="css-w8dmq8">*Mandatory</div> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        email: e.target.value,
                      })
                    }
                    value={props.subscriberData.email}
                    className="form-control border-radius-10 text-primary font-size-14"
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={props.subscriberData.phoneNumber}
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="form-control border-radius-10 text-primary"
                  />
                  {/* <div className="css-w8dmq8">*Mandatory</div> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    City
                  </label>
                  <input
                    type="text"
                    value={props.subscriberData.city}
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        city: e.target.value,
                      })
                    }
                    className="form-control border-radius-10 text-primary"
                  />
                  {/* <div className="css-w8dmq8">*Mandatory</div> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    State
                  </label>
                  <input
                    type="text"
                    value={props.subscriberData.state}
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        state: e.target.value,
                      })
                    }
                    className="form-control border-radius-10 text-primary"
                  />
                  {/* <div className="css-w8dmq8">*Mandatory</div> */}
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    Country
                  </label>
                  <input
                    type="text"
                    value={props.subscriberData.country}
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        country: e.target.value,
                      })
                    }
                    className="form-control border-radius-10 text-primary"
                  />
                  {/* <div className="css-w8dmq8">*Mandatory</div> */}
                </div>
              </div>
              {props.title === "Add User" && (
                <div className="col-md-6 col-sm-6">
                  <div class="form-group w-100">
                    <label className="text-light-dark font-size-14 font-weight-500">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      onChange={(e) =>
                        props.setSubscriberData({
                          ...props.subscriberData,
                          password: e.target.value,
                        })
                      }
                      value={props.subscriberData.password}
                      className="form-control border-radius-10 text-primary font-size-12"
                    />
                    <div className="css-w8dmq8">*Mandatory</div>
                  </div>
                </div>
              )}
              <div className="col-md-6 col-sm-6">
                <div class="form-group w-100">
                  <label className="text-light-dark font-size-14 font-weight-500">
                    ROLE
                  </label>
                  <Select
                    onChange={(e) =>
                      props.setSubscriberData({
                        ...props.subscriberData,
                        roles: e,
                      })
                    }
                    styles={customStyle}
                    getOptionLabel={(option) => `${option.label}`}
                    value={props.subscriberData.roles}
                    options={props.roles}
                  />
                  <div className="css-w8dmq8">*Mandatory</div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-3 text-right">
            <button
              type="button"
              onClick={props.handleAddCustomerClose}
              className="btn border mr-3 "
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn text-white bg-primary"
              onClick={
                props.title === "Add User" ? props.addUser : props.updateUser
              }
              disabled={
                !(
                  props.subscriberData.email &&
                  (props.title === "Add User"
                    ? props.subscriberData.password
                    : true) &&
                  props.subscriberData.roles &&
                  props.subscriberData.firstName &&
                  props.subscriberData.lastName
                )
              }
            >
              {props.title}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddCustomerModal;

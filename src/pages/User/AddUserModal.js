import { Modal } from "react-bootstrap";
import { default as Select, default as SelectFilter } from "react-select";

const AddUserModal = (props) => {
    const customStyle = {
        control: (styles, { isDisabled }) => {
            return {
                ...styles,
                borderRadius: 10,
                fontSize: 12,
            };
        },
        singleValue: (styles, { isDisabled }) => {
            return {
                ...styles,
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 500,
            };
        },
    };
    console.log(props.roles)
    return (
        <Modal
            show={props.openAddUser}
            onHide={props.handleAddUserClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-3 bg-white">
                <div>
                    <div className="p-3">
                        <div className="row mt-4">
                            <div className="col-md-6 col-sm-6">
                                <div class="form-group w-100">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        FIRST NAME
                                    </label>
                                    <input
                                        type="text"
                                        value={props.subscriberData.firstName}
                                        className="form-control border-radius-10 text-primary"
                                        onChange={(e) => props.setSubscriberData({ ...props.subscriberData, firstName: e.target.value })}
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div class="form-group w-100">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        LAST NAME
                                    </label>
                                    <input
                                        type="text"
                                        value={props.subscriberData.lastName}
                                        onChange={(e) => props.setSubscriberData({ ...props.subscriberData, lastName: e.target.value })}
                                        className="form-control border-radius-10 text-primary"
                                    />
                                    <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-6">
                                <div class="form-group w-100">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        EMAIL 
                                    </label>
                                    <input
                                        type="email"
                                        onChange={(e) =>
                                            props.setSubscriberData({
                                                ...props.subscriberData,
                                                emailId: e.target.value,
                                            })
                                        }
                                        value={props.subscriberData.emailId}
                                        className="form-control border-radius-10 text-primary font-size-14"
                                    />
                                <div className="css-w8dmq8">*Mandatory</div>
                                </div>
                            </div>
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
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <div class="form-group w-100">
                                    <label className="text-light-dark font-size-14 font-weight-500">
                                        ROLE
                                    </label>
                                    <Select
                                        onChange={(e) =>
                                            props.setSubscriberData({
                                                ...props.subscriberData,
                                                role: e,
                                            })
                                        }
                                        styles={customStyle}
                                        // getOptionLabel={(option) => `${option.label}`}
                                        value={props.subscriberData.role}
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
                            onClick={props.handleAddUserClose}
                            className="btn border mr-3 "
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn text-white bg-primary"
                            onClick={props.addUser}
                            disabled={
                                !(
                                    props.subscriberData.emailId &&
                                    props.subscriberData.password &&
                                    props.subscriberData.role &&
                                    props.subscriberData.firstName &&
                                    props.subscriberData.lastName
                                )
                            }
                        >
                            Add User
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;

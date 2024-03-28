import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Modal } from "react-bootstrap";
import EastIcon from "@mui/icons-material/East";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Moment from "react-moment";

export default function EquipmentSummaryModal(props) {
  const {
    show,
    handleClose,
    serialNumber,
    handleViewDetails,
    handleConfirm,
    equipmentRecord,
  } = props;
  console.log("equipmentRecord ", equipmentRecord);
  return (
    <Modal
      className="tablerowmodal "
      style={{ padding: "auto", margin: "auto" }}
      show={show}
      onHide={() => handleClose()}
      size="sm"
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className="">
        <div class="p-2 bg-white">
          <div
            className="d-flex justify-content-between mb-0 px-2 py-1 mt-0 align-items-center"
            style={{ backgroundColor: "#f3eafe" }}
          >
            <div>
              <a href="#" className="btn bg-primary text-white py-1">
                {serialNumber || "NA"}
              </a>
            </div>
            <h5 className="mt-1 mx-2">
              {equipmentRecord?.warrantyStatus || "In Warranty"}
            </h5>
          </div>
          {/* <hr className="mt-0" /> */}
          <h6
            className=" font-weight-500 my-3 mx-0"
            style={{ fontSize: "14px" }}
          >
            {equipmentRecord?.currentClient}-{equipmentRecord?.customer}
          </h6>
          <hr className="mt-0" />
          <Card>
            <h6
              className="mx-2 mb-0 font-weight-500 font-size-15"
              style={{ fontSize: "15px" }}
            >
              Summary
            </h6>
            <List dense={true}>
              <ListItem>
                <div className="d-flex align-items-center cursor">
                  <div class="checkbox mr-2">
                    <input type="checkbox" checked={true} />
                  </div>
                </div>
                <span className="font-weight-400">
                  Model {equipmentRecord?.model}
                </span>
              </ListItem>
              <ListItem>
                <div className="d-flex align-items-center cursor">
                  <div class="checkbox mr-2">
                    <input type="checkbox" checked={true} />
                  </div>
                </div>
                <span className="font-weight-400">
                  Equipment Id {equipmentRecord?.equipmentNumber}
                </span>
              </ListItem>
              <ListItem>
                <div className="d-flex align-items-center cursor">
                  <div class="checkbox mr-2">
                    <input type="checkbox" checked={true} />
                  </div>
                </div>
                <span className="font-weight-400">
                  Installed On{" "}
                  {equipmentRecord?.installationDate && (
                    <Moment format="DD/MM/YYYY">
                      {equipmentRecord?.installationDate}
                    </Moment>
                  )}
                </span>
              </ListItem>
              <ListItem>
                <div className="d-flex align-items-center cursor">
                  <div class="checkbox mr-2">
                    <input type="checkbox" checked={true} />
                  </div>
                </div>
                <span className="font-weight-400">
                  Warranty Valid until{" "}
                  {equipmentRecord?.installationDate && (
                    <Moment format="DD/MM/YYYY">
                      {equipmentRecord?.installationDate}
                    </Moment>
                  )}
                </span>
              </ListItem>
              <ListItem>
                <div className="d-flex align-items-center cursor">
                  <div class="checkbox mr-2">
                    <input type="checkbox" checked={true} />
                  </div>
                </div>
                <span className="font-weight-400">
                  Family {equipmentRecord?.market}
                </span>
              </ListItem>
            </List>
          </Card>
          <div className="mt-2 mb-3">
            <button
              className="btn btn-border-primary mx-2 py-1 mb-0"
              onClick={handleViewDetails}
            >
              View Details
            </button>
          </div>
        </div>
        <div
          className="modal-footer bg-primary py-2"
          style={{ justifyContent: "right" }}
        >
          <div className="my-0">
            <button
              className="btn bg-white font-size-16 font-weight-500"
              onClick={handleConfirm}
            >
              Confirm <EastIcon />
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

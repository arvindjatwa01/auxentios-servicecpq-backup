import { Modal } from "@mui/material";
import React from "react";

const SupplierClaimModal = ({
  claimSupplierShow,
  handleClaimSupplierClose,
  claimSupplierRecord,
  handleSnack,
}) => {
  // supplier claim creation
  const handleCreateSupplierSummary = () => {
    handleSnack("success", "Supplier Claim Created Successfully.");
    handleClaimSupplierClose();
  };

  return (
    <Modal open={claimSupplierShow} onClose={handleClaimSupplierClose}>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div
            class="modal-header"
            style={{ borderBottom: "1px solid #872ff7" }}
          >
            <h4 class="modal-title text-primary" id="myModal12">
              Supplier Claim Summary
            </h4>
          </div>

          <div class="modal-body">
            <div className="p-2">
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Description</span>
                </p>
                <h6 className="mb-0 ">
                  <b>{claimSupplierRecord?.description}</b>
                </h6>
              </div>
              <div className="hr"></div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Part Number</span>
                </p>
                <h6 className="mb-0 ">
                  <b>{claimSupplierRecord?.serialNo}</b>
                </h6>
              </div>
              <div className="hr"></div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>SERIAL NUMBER#</span>
                </p>
                <h6 className="mb-0 ">
                  {/* <b>{claimSupplierRecord?.serialNo}</b> */}
                  <b>{"ZMX00507"}</b>
                </h6>
              </div>
              <div className="hr"></div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Customer</span>
                </p>
                <h6 className="mb-0 ">
                  <b>{"101211 " + "-" + "KOOLAN IRON ORE PTY LTD"}</b>
                </h6>
              </div>
              <div className="hr"></div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Model</span>
                </p>
                <h6 className="mb-0 ">
                  <b>{claimSupplierRecord?.model}</b>
                </h6>
              </div>
              <div className="hr"></div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Manufacturer</span>
                </p>
                <h6 className="mb-0 ">
                  <b>{"CATERPILLAR"}</b>
                </h6>
              </div>
              <div className="hr"></div>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Quantity</span>
                </p>
                <h6 className="mb-0 ">
                  <b>{claimSupplierRecord?.quantity}</b>
                </h6>
              </div>
              <div className="hr"></div>
              {/* <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Net Price</span>
                </p>
                <h6 className="mb-0 ">
                  <b>${claimSupplierRecord?.unitPrice}</b>
                </h6>
              </div>
              <div className="hr"></div> */}
              {/* <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Estimated Misc </span>
                </p>
                <h6 className="mb-0 ">
                  <b>${claimSupplierRecord?.miscPrice}</b>
                </h6>
              </div>
              <div className="hr"></div> */}
              {/* <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Estimated Labour</span>
                </p>
                <h6 className="mb-0 ">
                  <b>${claimSupplierRecord?.laborPrice}</b>
                </h6>
              </div>
              <div className="hr"></div> */}
              {/* <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Estimated Parts</span>
                </p>
                <h6 className="mb-0 ">
                  <b>${claimSupplierRecord?.partsPrice}</b>
                </h6>
              </div>
              <div className="hr"></div> */}
              {/* <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Adjusted Price</span>
                </p>
                <h6 className="mb-0 ">
                  <b>${claimSupplierRecord?.adjustedPrice}</b>
                </h6>
              </div>
              <div className="hr"></div> */}
              {/* <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Discounts</span>
                </p>
                <h6 className="mb-0 ">
                  <b>${claimSupplierRecord?.discount}</b>
                </h6>
              </div>
              <div className="hr"></div> */}
              {/* <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0 ">
                  <span>Margin</span>
                </p>
                <h6 className="mb-0 ">
                  <b>{claimSupplierRecord?.margin}%</b>
                </h6>
              </div> */}
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary w-100"
              onClick={handleCreateSupplierSummary}
            >
              Create
            </button>
            <button
              className="btn btn-border-primary w-100"
              onClick={handleClaimSupplierClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SupplierClaimModal;

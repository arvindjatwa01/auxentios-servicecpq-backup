import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { ReadOnlyField } from "./ReadOnlyField";

const ModalCreateVersion = (props) => {
  return (
    <Modal
      open={props.versionOpen}
      onClose={props.handleCloseVersion}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-none">
            <h5 class="modal-title" id="exampleModalLongTitle">
              New Version
            </h5>
          </div>

          <p className="mx-3 mt-0">
            {props.message}
          </p>
          <div className="hr"></div>
          {props.type === "quote" ? 
          <>
          <ReadOnlyField 
            label="Quote"
            value={props.quoteName}
            className={"col-md-6"}
          />
          <ReadOnlyField 
            label="Existing Version"
            value={ props.existingVersion? "Version " + props.existingVersion?.substring(8): ""}
            className={"col-md-6"}
          />
          <ReadOnlyField 
            label="New Version"
            value={props.newVersion? "Version " + props.newVersion?.substring(8) : ""}
            className={"col-md-6"}
          />
          </> :
          <div class="modal-body" style={{ marginBottom: 10 }}>
            <input
              type="text"
              className="form-control border-radius-10"
              placeholder="Builder Description"
              value={props.description}
              onChange={(e) => props.setDescription(e.target.value)}
            />
          </div>}
          <div class="modal-footer">
            <button
              className="btn  btn-primary w-100"
              onClick={() => props.type !== "quote"? props.handleCreateVersion(props.description) : props.handleCreateVersion()}
              disabled={props.type === "quote" ? false : !props.description}
            >
              Create
            </button>
            <button
              className="btn  btn-primary w-100"
              onClick={props.handleCloseVersion}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateVersion;

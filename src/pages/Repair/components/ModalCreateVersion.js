import { Modal } from "@mui/material";

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
            Another version of this builder will be created.
          </p>
          <div className="hr"></div>
          <div class="modal-body" style={{ marginBottom: 10 }}>
            <input
              type="text"
              className="form-control border-radius-10"
              placeholder="Builder Description"
              value={props.description}
              onChange={(e) => props.setDescription(e.target.value)}
            />
          </div>
          <div class="modal-footer">
            <button
              className="btn  btn-primary w-100"
              onClick={() => props.handleCreateVersion(props.description)}
              disabled={!props.description}
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

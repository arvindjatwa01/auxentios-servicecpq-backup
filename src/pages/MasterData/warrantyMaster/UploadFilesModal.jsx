import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

const UploadFilesModal = ({ show, hideModal }) => {
  const [uploadFileImage, setUploadFileImage] = useState("general");
  // Image|File upload Modal box show|hide
  const handleImageFileUpload = (e, value) => {
    setUploadFileImage(value);
  };
  return (
    <Modal show={show} onHide={hideModal} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Import Files</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="p-3">
          <div className="add-new-recod">
            <div>
              <FontAwesomeIcon
                className="cloudupload"
                icon={faCloudUploadAlt}
              />
              <h6 className="font-weight-500 mt-3">
                Drag and drop files to upload <br /> or
              </h6>
              <FileUploader
                name="file"
                types={fileTypes}
                handleChange={handleImageFileUpload}
              />
            </div>
          </div>
          <p className="mt-3">
            Single upload file should not be more than 10MB. Only the .lgs,
            .lgsx file types are allowed
          </p>
        </div>
      </Modal.Body>
      <div className="row m-0 p-3">
        <div className="col-md-6 col-sm-6">
          <button className="btn border w-100 bg-white" onClick={hideModal}>
            Cancel
          </button>
        </div>
        <div className="col-md-6 col-sm-6">
          <button className="btn btn-primary w-100 cursor" onClick={hideModal}>
            <FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} /> Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadFilesModal;

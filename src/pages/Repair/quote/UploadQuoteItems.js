import { FileUploader } from "react-drag-drop-files";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

export const UploadQuoteItems = (props) => {
    return (
        <div className="card  mt-3 p-3">
            <h5 className="d-flex align-items-center mb-0">
                <div className="" style={{ display: "contents" }}>
                    <span className="mr-3" style={{ whiteSpace: "pre" }}>
                        Import From Excel
                    </span>
                    <a href="#" className="btn-sm">
                        <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                    </a>{" "}
                    <a href="#" className="btn-sm">
                        <i className="fa fa-folder-o" aria-hidden="true"></i>
                    </a>
                </div>
                <div className="hr"></div>
            </h5>
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
                            handleChange={props.handleReadFile}
                            name="file"
                            types={["xls", "xlsx", "csv"]}
                            onClick={(event) => {
                                event.currentTarget.value = null;
                            }}
                        />
                        <p className="mt-3">
                            Single upload file should not be more than <br />{" "}
                            10MB. Only the .xls, .xlsx file types are allowed
                        </p>
                    </div>

                </div>
            </div>
            <div className="row m-0 p-3 justify-content-end">
                <div className="">
                    <button
                        className="btn btn-primary"
                        onClick={props.handleUploadFile}
                        style={{ cursor: "pointer" }}
                        disabled={!(props.file)}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faCloudUploadAlt} />
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}
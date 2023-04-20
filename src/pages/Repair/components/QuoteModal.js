import { Modal } from "@mui/material";

const QuoteModal = (props) => {
  return (
    <Modal
      open={props.openQuotePopup}
      onClose={() => props.setOpenQuotePopup(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-dialog" role="document">
            <div className="modal-content bg-white border-none">
              <div className="modal-header border-none">
                <h5 className="modal-title" id="exampleModalLabel">
                  Quote Create
                </h5>
              </div>
              <p className="d-block px-3">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <hr className="my-1" />
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        Quote Type
                      </label>
                      <h6 className="font-weight-500">
                        Repair Quote
                      </h6>
                    </div>
                  </div>
                  {/* <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        Quote ID
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                    </div>
                  </div> */}
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={props.quoteDescription}
                        onChange={e => props.setQuoteDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group">
                      <label className="text-light-dark font-size-12 font-weight-500">
                        Reference
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={props.quoteReference}
                        onChange={e => props.setQuoteReference(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        QUOTE TYPE{" "}
                      </p>
                      <h6 className="font-weight-500">
                        Repair Quote with Spare Parts
                      </h6>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        Quote ID{" "}
                      </p>
                      <h6 className="font-weight-500">SB12345</h6>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        QUOTE DESCRIPTION
                      </p>
                      <h6 className="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <div className="form-group mt-3">
                      <p className="font-size-12 font-weight-500 mb-2">
                        REFERENCE
                      </p>
                      <h6 className="font-weight-500">Holder text</h6>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="modal-footer" style={{ display: "unset" }}>
                <div>
                  <button className="btn  btn-primary" onClick={() => props.handleCreateQuote()}>Create</button>
                  <button
                    type="button"
                    className="btn pull-right border"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
    </Modal>
  );
};

export default QuoteModal;

import { Modal } from "@mui/material";

const QuoteSummary = (props) => {
    const summary = props.summary;
return (
    <Modal
    open={props.summaryOpen}
    onClose={props.handleSummaryClose}
  >
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div
        class="modal-header"
        style={{ borderBottom: "1px solid #872ff7" }}
      >
        <h4 class="modal-title text-primary" id="myModal12">
          Quote Summary
        </h4>
      </div>

      <div class="modal-body">
        <div className="p-2">
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Description</span>
            </p>
            <h6 className="mb-0 ">
              <b>{summary.description}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Service Organisation</span>
            </p>
            <h6 className="mb-0 ">
              <b>ESPERENCE (SV71)</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>SERIAL NUMBER#</span>
            </p>
            <h6 className="mb-0 ">
              <b>{summary.serialNumber}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Customer</span>
            </p>
            <h6 className="mb-0 ">
              <b>{summary.customerId+" "+summary.customerName}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Model</span>
            </p>
            <h6 className="mb-0 ">
              <b>{summary.model}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Manufacturer</span>
            </p>
            <h6 className="mb-0 ">
              <b>{"Add make"}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Price Method</span>
            </p>
            <h6 className="mb-0 ">
              <b>{summary.priceMethod}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Net Price</span>
            </p>
            <h6 className="mb-0 ">
              <b>${summary.netPrice}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Estimated External Service Purchase $</span>
            </p>
            <h6 className="mb-0 ">
              <b>$5000</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Estimated Labour</span>
            </p>
            <h6 className="mb-0 ">
              <b>${summary.laborPrice}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Estimated Parts</span>
            </p>
            <h6 className="mb-0 ">
              <b>${summary.partsPrice}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Adjusted Price</span>
            </p>
            <h6 className="mb-0 ">
              <b>${summary.adjustedPrice}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Discounts</span>
            </p>
            <h6 className="mb-0 ">
              <b>${summary.discount}</b>
            </h6>
          </div>
          <div className="hr"></div>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 ">
              <span>Margin</span>
            </p>
            <h6 className="mb-0 ">
              <b>{summary.margin}%</b>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Modal>
)
} 

export default QuoteSummary;
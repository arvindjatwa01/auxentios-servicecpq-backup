import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomerMasterSearchList = ({
  customerSearchList = [],
  selectedCustomerId = null,
  handleViewDetails,
}) => {
  return (
    <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 border-50">
      <div className="bg-grey border-radius-10 p-3">
        <div className="equipment-master-ul">
          <ul>
            {customerSearchList.length !== 0 &&
              customerSearchList.map((customerData, i) => (
                <li
                  key={`parts-master-${i}`}
                  className={`cursor ${
                    customerData.id === selectedCustomerId ? "active" : ""
                  }`}
                  onClick={() => handleViewDetails(customerData.id)}
                >
                  <div className="row position-relative">
                    <div className="global-serach-arrow">
                      <ArrowForwardIosIcon className="text-primary font-size-20 mb-0 pb-0" />
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                      <img
                        src="../assets/images/spare-parts-sm.png"
                        alt="jcb"
                        className=" img-fluid"
                      />
                    </div>
                    <div className="col-lg-5 col-md-5 col-5">
                      <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                        {customerData.customerId}
                      </h6>
                      <p className="font-size-12 text-light-60 font-weight-500 m-0">
                        {customerData.customerSegment}
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                      <div className="d-block pr-3">
                        <h6 className="font-size-12 font-weight-500 text-primary m-0 text-truncate">
                          {customerData.customerGroup}
                        </h6>
                        <p className="font-size-12 text-light-60 font-weight-500 m-0">
                          {customerData.contactAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerMasterSearchList;

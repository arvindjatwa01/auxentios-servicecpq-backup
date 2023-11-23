import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MuiMenuComponent } from "../../Operational/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { quoteRecent } from "services/repairQuoteServices";
import { QUOTE_REPAIR_CREATE, QUOTE_REPAIR_SEARCH, REPAIR_QUOTE_DETAILS } from "navigation/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { Typography } from "@mui/material";
import LoadingProgress from "../components/Loader";
import Moment from "react-moment";
import { repairQuoteActions } from "../dropdowns/quoteRepairSlice";
import { useDispatch } from "react-redux";

const RecentRepairQuote = () => {
  const [recentQuotesLoading, setRecentQuotesLoading] = useState(false);
  const [recentQuotes, setRecentQuotes] = useState([]);
  // Snack Bar State
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(repairQuoteActions.fetchQuoteDropdowns())
    fetchRecentQuotes();
  }, []);

  const fetchRecentQuotes = async () => {
    setRecentQuotesLoading(true);
    await quoteRecent("REPAIR_QUOTE")
      .then((quotes) => {
        setRecentQuotes(quotes);
        setRecentQuotesLoading(false);
      })
      .catch((e) => {
        // console.log(e);
        if (e.message === "Access is denied")
          handleSnack("error", "You don't have access to this section!");
        else if (e.message !== "Quote(s) is/are not found")
          handleSnack("error", "Error occurred while fetching repair quotes!");
        setRecentQuotesLoading(false);
      });
  };
  const history = useHistory();
  const makeQuoteEditable = (quote) => {
    let quoteDetails = {
      quoteId: "",
      type: "fetch",
    };
    quoteDetails.quoteId = quote.quoteId;
    history.push({
      pathname: REPAIR_QUOTE_DETAILS,
      state: quoteDetails,
    });
  };
  const activityOptions = ["None", "Atria", "Callisto"];

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Repair Quote</h5>
            <div >
              <Link
                to={QUOTE_REPAIR_CREATE}
                className="btn bg-primary text-white"
              >
                Create New <ChevronRightIcon className="" />
              </Link>
            </div>
          </div>
          <div className="card p-4 mt-5">
            <div className="">
              {/* <h6 class="font-weight-600 text-grey mb-0">ANALYTICS</h6> */}
              <div className="recent-div p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <h6 className="font-weight-600 text-grey mb-0">
                    RECENT REPAIR QUOTE
                  </h6>
                  <div>
                    <Link
                      to={QUOTE_REPAIR_SEARCH}
                      style={{ cursor: "pointer" }}
                      className="btn bg-primary text-white pull-right"
                    >
                      Search Quote
                      <ChevronRightIcon className="" />
                    </Link>
                  </div>
                </div>
                <div className="row">
                  {recentQuotesLoading ? (
                    <LoadingProgress />
                  ) : recentQuotes.length > 0 ? (
                    recentQuotes.map((indQuote) => (
                      <div className="col-md-4">
                        <div className="recent-items mt-3">
                          <div className="d-flex justify-content-between align-items-center ">
                            <p className="mb-0 overflow-hidden white-space">
                              <FontAwesomeIcon
                                className=" font-size-14"
                                icon={faFileAlt}
                              />
                              <span className="font-weight-500 ml-2">
                                {indQuote.quoteName}
                              </span>
                              <span
                                className="ml-2"
                                style={{
                                  fontSize: 9,
                                  fontWeight: 800,
                                }}
                              >
                                {indQuote.version ? parseFloat(indQuote.version.substring(8)).toFixed(1) : ""}
                              </span>
                            </p>
                            <div className="d-flex align-items-center">
                              <a
                                href={undefined}
                                className="btn-sm"
                                style={{ cursor: "pointer" }}
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                  onClick={() => makeQuoteEditable(indQuote)}
                                ></i>
                              </a>
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faShareAlt} />
                              </a>
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faFolderPlus} />
                              </a>
                              <a href="#" className="ml-3 font-size-14">
                                <FontAwesomeIcon icon={faUpload} />
                              </a>
                              <a href="#" className="ml-2 p-0 more-icon-div">
                                <MuiMenuComponent
                                  className=" p-0 font-size-14"
                                  options={activityOptions}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <p className="font-size-12 mb-0">
                            <Moment format="HH:MM a">
                              {indQuote.updatedAt}
                            </Moment>
                            ,{" "}
                            <Moment format="DD MMM YY">
                              {indQuote.updatedAt}
                            </Moment>
                          </p>
                          <p className="font-size-12 mb-0">Repair Quote</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ml-3 mt-4">
                      <Typography>No Quotes Found</Typography>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentRepairQuote;

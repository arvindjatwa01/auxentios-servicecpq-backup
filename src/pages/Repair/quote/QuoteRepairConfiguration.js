import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import WithoutEvalIcon from "../../../assets/icons/svg/without_eval.svg";
import WithEvalIcon from "../../../assets/icons/svg/with_eval.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import {
  GUIDED_REPAIR_QUOTE,
  REPAIR_QUOTE_WITH_EVALUATION,
} from "navigation/CONSTANTS";

const QuoteRepairConfiguration = () => {
  const activityOptions = ["None", "Atria", "Callisto"];

  return (
    <>
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div class="container-fluid ">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Quote Configuration</h5>
          </div>
          <div className="row justify-content-center">
            <div className="card p-4 mt-5" style={{ width: "60%" }}>
              {/* <p className="my-2"><b>Choose what solution you want to configure</b></p> */}
              <div className="row ">
                <div className="col-md-6">
                  {/* <Link to={GUIDED_REPAIR_QUOTE} className="p-3"> */}
                  <div class="">
                    <div class="mr-2">
                      {/* <WithoutEvalIcon className="font-size-65 text-light mr-2 mb-3" /> */}
                      <span className="mb-3">
                        <img src={WithoutEvalIcon} style={{ height: 50 }}></img>
                      </span>
                    </div>
                    <div>
                      <h5 class="text-light mt-4 mb-3">Without Evalution</h5>
                      <p>
                        You answer a few questions related to your requirement.
                        The system will propose the prebuilt templates to copy
                        and create a new quote.{" "}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link
                      to={GUIDED_REPAIR_QUOTE}
                      className="btn bg-primary text-white"
                    >
                      Continue <ArrowForwardIcon className=" font-size-16" />
                    </Link>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="col-md-6">
                  {/* <Link to={REPAIR_QUOTE_WITH_EVALUATION} className="p-3"> */}
                  <div class="">
                    <div class="mr-2">
                      <span className="mb-3">
                        <img src={WithEvalIcon} style={{ height: 50 }}></img>
                      </span>
                    </div>
                    <div>
                      <h5 class="text-light mb-3 mt-4">With Evaluation</h5>
                      <p>
                        You know what to build. Use the repair builder to create
                        a detailed quote from scratch.
                      </p>
                    </div>
                    <div>
                      <Link
                        to={REPAIR_QUOTE_WITH_EVALUATION}
                        className="btn bg-primary text-white"
                      >
                        Continue <ArrowForwardIcon className=" font-size-16" />
                      </Link>
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuoteRepairConfiguration;

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import WithoutEvalIcon from "../../../assets/icons/svg/without_eval.svg";
import WithEvalIcon from "../../../assets/icons/svg/with_eval.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIos";
import {
  GUIDED_REPAIR_QUOTE,
  REPAIR_QUOTE_WITH_EVALUATION,
} from "navigation/CONSTANTS";

const QuoteRepairConfiguration = (props) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="card p-4 mt-5" style={{ width: "60%" }}>
          <div className="row ">
            <div className="col-md-6">
              <div className="mx-3">
                  <span className="mb-3">
                    <img src={WithoutEvalIcon} style={{ height: 50 }}></img>
                  </span>
                <h5 class="text-light my-4">Without Evalution</h5>
                  <p>
                    You answer a few questions related to your requirement. The
                    system will propose the prebuilt templates to copy and
                    create a new quote.{" "}
                  </p>
                  <button
                  // to={GUIDED_REPAIR_QUOTE}
                  className="btn bg-primary text-white"
                  onClick={() => props.setSelectedQuoteOption("without_eval")}
                >
                  Continue <ArrowForwardIcon className=" font-size-16" />
                </button>
                <div>
                  
                </div>
              </div>
              <div>
                
              </div>
            </div>
            <div className="col-md-6">
              <div class="mx-3">
                  <span className="mb-3">
                    <img src={WithEvalIcon} style={{ height: 50 }}></img>
                  </span>
                  <h5 class="text-light my-4">With Evaluation</h5>
                  <p>
                    You know what to build. Use the repair builder to create a
                    detailed quote from scratch.
                  </p>
                  <br/>
                  <button
                    // to={REPAIR_QUOTE_WITH_EVALUATION}
                    className="btn bg-primary text-white"
                    onClick={() => props.setSelectedQuoteOption("with_eval")}
                  >
                    Continue <ArrowForwardIcon className=" font-size-16" />
                  </button>
                <div>
                  
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

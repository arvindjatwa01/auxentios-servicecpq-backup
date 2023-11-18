import React from "react";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import Select from "react-select";
import {
  PORTFOLIO_SEARCH,
  PORTFOLIO_SEARCH_OPTIONS,
} from "../Use_Case_4_Constansts";
import { Link } from "react-router-dom";
import PortfolioSolutionSearch from "./PortfolioSolutionSearch";

const CustomPortfolioItemsList = (props) => {
  const { customPortfolioId } = props;
  return (
    <>
      <div className="card mt-4 px-4">
        <div className="d-flex align-items-center mt-3">
          <div className="d-flex align-items-center mr-4">
            <h5 className="mb-0 mr-3 text-black">
              <span style={{ whiteSpace: "pre" }}>Solution Item</span>
            </h5>
            <div className="d-flex">
              <a className="mr-2 cursor">
                <span>
                  <ModeEditOutlineOutlinedIcon />
                </span>
              </a>
              <a className="cursor">
                <span>
                  <ShareOutlinedIcon />
                </span>
              </a>
            </div>
          </div>
          <div
            className="mr-3 input-group icons border"
            style={{ borderRadius: "5px" }}
          >
            <PortfolioSolutionSearch customPortfolioId={customPortfolioId} />
          </div>
          <div className="border-left d-flex align-items-center px-2 py-2">
            <a
              style={{ whiteSpace: "pre" }}
              className="btn-sm cursor"
              // onClick={handleNewBundleItem}
            >
              <span className="mr-2">
                <AddIcon />
              </span>
              Add
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomPortfolioItemsList;

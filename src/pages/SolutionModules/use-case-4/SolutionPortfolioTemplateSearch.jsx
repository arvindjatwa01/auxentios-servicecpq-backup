import React from "react";

import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";

import { COPY_PORTFOLIO_ITEMS_TO_CUSTOM_PORTFOLIO } from "services/CONSTANTS";
import { callGetApi } from "services/ApiCaller";
import { API_SUCCESS } from "services/ResponseCode";

import { SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE } from "navigation/CONSTANTS";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import {
  IS_PORTFOLIO,
  IS_SOLUTION,
  dataTableCustomStyle,
} from "pages/Common/PortfolioAndSolutionConstants";

const SolutionPortfolioTemplateSearch = (props) => {
  const {
    selectedSolutionTemplate,
    searchedPortfolioList,
    searchedSolutionList,
    searchedTemplateList,
  } = props;

  let history = useHistory();
  const solutionColumns = [
    {
      id: "solutionName",
      name: <div>Name</div>,
      selector: (row) => row.name,
      wrap: true,
      sortable: false,
    },
    {
      id: "solutionDescription",
      name: <div>Description</div>,
      selector: (row) => row.description,
      wrap: true,
      sortable: false,
    },
    {
      id: "solutionExternalReference",
      name: <div>Reference</div>,
      selector: (row) => row.externalReference,
      wrap: true,
      sortable: true,
    },
    {
      id: "solutionNumbberOfEvents",
      name: <div>Total Event</div>,
      selector: (row) => row.numberOfEvents,
      wrap: true,
      sortable: false,
    },
    {
      id: "solutionTotalPrice",
      name: <div>Total Price</div>,
      selector: (row) => row?.portfolioPrice?.totalPrice,
      wrap: true,
      sortable: false,
    },
  ];

  // View Search Portfolio Template
  const viewSearchPortfolioTemplate = () => {
    return (
      <ul
        class="submenu selected-li border-custom templateResultheading accordion mt-0"
        style={{ display: "block", borderTop: "none !important" }}
      >
        <li className="border-bottom">
          <div className="result py-4 px-3 font-size-14">
            <b>RESULTS</b>
          </div>
        </li>
        {searchedPortfolioList.length !== 0 &&
          searchedPortfolioList.map((portfolioRow, i) => (
            <li
              key={i}
              className="border-bottom cursor "
              // onClick={() =>
              //   handleOnPortfolioResultRow(portfolioRow.portfolioId, portfolioRow.name)
              // }
            >
              <div className="d-flex align-items-center p-3">
                <div className="d-flex mr-4">
                  <p className="mb-0 font-size-14">
                    <b>{portfolioRow.name}</b>
                  </p>
                </div>
                <div
                  className={`px-3 py-1 mr-4 text-white 
                           ${
                             portfolioRow.version == "STANDARD"
                               ? "bg-green"
                               : portfolioRow.version == "PREMIUM"
                               ? "bg-yellow"
                               : portfolioRow.version == "SUPERIOR"
                               ? "bg-gray"
                               : "text-dark"
                           } font-size-12 border-radius-5`}
                >
                  {portfolioRow.version}
                </div>
                <div className="d-flex mr-4">
                  <p className="mb-0 font-size-14">PRICE</p>
                </div>
                <div className="d-flex">
                  <p className="mb-0 font-size-14 ">
                    ${portfolioRow.calculatedPrice}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    );
  };

  // view Searched Solution Template
  const viewSearchSolutionTemplate = () => {
    return (
      <>
        <ul
          class="submenu templateResultheading accordion mt-2"
          style={{ display: "block" }}
        >
          <li>
            <a className="cursor result">INCLUDED PORTFOLIO TEMPLATE</a>
          </li>
        </ul>
        <div style={{ position: "relative" }}>
          <DataTable
            className="mt-3"
            columns={solutionColumns}
            data={searchedSolutionList}
            customStyles={dataTableCustomStyle}
            pagination
          />
        </div>
      </>
    );
  };

  // Todo** (after discussion maybe it remove othersiwe we go on with it) || if No changes in UI
  // both (View Search Solution || Portfolio )
  const viewSearchedTemplate = () => {
    return (
      <ul
        class="submenu selected-li border-custom templateResultheading accordion mt-0"
        style={{ display: "block", borderTop: "none !important" }}
      >
        <li className="border-bottom">
          <div className="result py-4 px-3 font-size-14">
            <b>RESULTS</b>
          </div>
        </li>
        {searchedTemplateList.length !== 0 &&
          searchedTemplateList.map((templateRow, i) => (
            <li
              key={i}
              className="border-bottom cursor "
              onClick={() => handleTemplateSelect(templateRow)}
            >
              <div className="d-flex align-items-center p-3">
                <div className="d-flex mr-4">
                  <p className="mb-0 font-size-14">
                    <b>{templateRow.name}</b>
                  </p>
                </div>
                <div
                  className={`px-3 py-1 mr-4 text-white 
                           ${
                             templateRow.version == "STANDARD"
                               ? "bg-green"
                               : templateRow.version == "PREMIUM"
                               ? "bg-yellow"
                               : templateRow.version == "SUPERIOR"
                               ? "bg-gray"
                               : "text-dark"
                           } font-size-12 border-radius-5`}
                >
                  {templateRow.version}
                </div>
                <div className="d-flex mr-4">
                  <p className="mb-0 font-size-14">PRICE</p>
                </div>
                <div className="d-flex">
                  <p className="mb-0 font-size-14 ">
                    ${templateRow.calculatedPrice}
                  </p>
                </div>
              </div>
            </li>
          ))}
      </ul>
    );
  };

  // copy Portfolio to Solution (PORTFOLIO)
  const handleConvertPortfolioToSolution = (row) => {
    const rUrl =
      COPY_PORTFOLIO_ITEMS_TO_CUSTOM_PORTFOLIO +
      "portfolioIds=" +
      row.portfolioId;
    callGetApi(
      rUrl,
      (response) => {
        if (response.status === API_SUCCESS) {
          history.push({
            // pathname: CREATED_CUSTOM_PORTFOLIO_DETAILS,
            pathname: SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE,
            state: {
              portfolioId: response.data.customPortfolioId,
              type: "fetch",
            },
          });
        } else {
          errorMessage(
            `Solution ${row.name} already exits,Please select another Portfolio.`
          );
        }
      },
      (error) => {
        // console.log(error);
        errorMessage(error);
      }
    );
  };

  // click on search template row
  const handleTemplateSelect = (row) => {
    if (selectedSolutionTemplate === IS_PORTFOLIO) {
      handleConvertPortfolioToSolution(row);
    } else if (selectedSolutionTemplate === IS_SOLUTION) {
      history.push({
        // pathname: SOLUTION_TEMPLATE_SELECTED_PORTFOLIO_RESULT,
        pathname: SOLUTION_BUILDER_CUSTOM_PORTFOLIO_CREATE,
        state: {
          portfolioId: row.portfolioId,
          type: "fetch",
        },
      });
    }
  };

  return (
    <div className="tableheader">
      {viewSearchedTemplate()}
      {/* {selectedSolutionTemplate === IS_PORTFOLIO &&
        viewSearchPortfolioTemplate()} */}
      {/* {selectedSolutionTemplate === IS_SOLUTION && viewSearchSolutionTemplate()} */}
    </div>
  );
};

export default SolutionPortfolioTemplateSearch;

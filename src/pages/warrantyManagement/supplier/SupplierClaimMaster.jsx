import React, { useState } from "react";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import $ from "jquery";

import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import SearchComponent from "pages/components/SearchComponent";
import { getVendors } from "services/searchServices";
import SupplierClaimDetailsModal from "./SupplierClaimDetailsModal";
import SupplierQuoteModal from "./SupplierQuoteModal";

const SupplierClaimMaster = () => {
  const [querySearchSelector, setQuerySearchSelector] = useState([
    {
      id: 0,
      selectCategory: "",
      selectOperator: "",
      inputSearch: "",
      selectOptions: [],
      selectedOption: "",
    },
  ]);

  const [openQuoteModal, setOpenQuoteModal] = useState(false);

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

  const handleQuerySearchClick = async () => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    querySearchSelector.map(function (item, i) {
      if (i === 0 && item.selectCategory.value && item.inputSearch) {
        searchStr =
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      } else if (
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectOperator.value
      ) {
        searchStr =
          searchStr +
          " " +
          item.selectOperator.value +
          " " +
          item.selectCategory.value +
          ":" +
          encodeURI('"' + item.inputSearch + '"');
      }
      return searchStr;
    });

    try {
      if (searchStr) {
        const res = await getVendors(
          `builderType:PARTLIST AND saved:true AND ${searchStr}`
        );
        // setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching spare parts!");
    }
  };

  return (
    <>
      <CustomizedSnackbar
        handleClose={handleSnackBarClose}
        open={openSnack}
        severity={severity}
        message={snackMessage}
      />
      <div className="content-body" style={{ minHeight: "884px" }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-baseline mt-3 mb-3">
            <h5 className="font-weight-600 mb-0 ">Supplier Claim</h5>
          </div>
          <div className="bg-primary px-3 mb-3 border-radius-6">
            <div className="row align-items-center">
              <div className="col-11 mx-2">
                <div className="d-flex align-items-center bg-primary w-100">
                  <div
                    className="d-flex mr-3 py-3"
                    style={{ whiteSpace: "pre" }}
                  >
                    <h5 className="mr-2 mb-0 text-white">
                      <span>Search</span>
                    </h5>
                  </div>
                  <SearchComponent
                    querySearchSelector={querySearchSelector}
                    setQuerySearchSelector={setQuerySearchSelector}
                    // clearFilteredData={clearFilteredData}
                    handleSnack={handleSnack}
                    searchAPI={getVendors}
                    searchClick={handleQuerySearchClick}
                    //   options={partsSearchOptions}
                    color="white"
                    builderType="PARTLIST"
                    buttonText={"SEARCH"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="row mt-2">
              <div className="col-md-7 col-sm-7 d-flex">
                <img
                  src="../assets/images/imgs/11.png"
                  alt=""
                  width={70}
                  height={70}
                />
                <div className="mx-2">
                  <h3 className="mb-0">Cherokee Steel Supply</h3>
                  <h6>Monroe, GA</h6>
                </div>
              </div>
              <div className="col-md-5 col-sm-5 d-flex">
                {/* <PeopleAltOutlinedIcon fontSize="large" /> */}
                <div>
                  <button
                    className="btn bg-primary text-white"
                    onClick={() => setOpenQuoteModal(true)}
                  >
                    Start a Quote <DescriptionOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <SupplierClaimDetailsModal show={true} />
        </div>
      </div>

      {openQuoteModal && (
        <SupplierQuoteModal
          show={openQuoteModal}
          hideModal={() => setOpenQuoteModal(false)}
          handleSnack={handleSnack}
        />
      )}
    </>
  );
};

export default SupplierClaimMaster;

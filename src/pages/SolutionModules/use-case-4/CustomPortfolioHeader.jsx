import React, { useEffect, useState } from "react";
import Select from "react-select";

// material ui import
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// import bootstrap
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

// import icons images
import shareIcon from "../../..//assets/icons/svg/share.svg";
import folderAddIcon from "../../..//assets/icons/svg/folder-add.svg";
import uploadIcon from "../../..//assets/icons/svg/upload.svg";
import deleteIcon from "../../..//assets/icons/svg/delete.svg";
import copyIcon from "../../..//assets/icons/svg/Copy.svg";
import { Modal } from "react-bootstrap";
import { isEmpty } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/textUtilities";
import { errorMessage } from "pages/PortfolioAndBundle/newCreatePortfolioData/utilities/toastMessage";
import {
  CONVERT_CUSTOM_PORTFOLIO_TO_QUOTE,
  SOLUTION_QUOTE_CREATION,
} from "services/CONSTANTS";
import { API_SUCCESS } from "services/ResponseCode";
import { callGetApi, callPutApi } from "services/ApiCaller";
import { SOLUTION_SERVICE_PORTFOLIO } from "navigation/CONSTANTS";
import { Chip } from "@mui/material";
import StatusAndSupportLevelSelectBox from "./StatusAndSupportLevelSelectBox";

const quoteOptions = [{ label: "Solution", value: "SOLUTION" }];

const CustomPortfolioHeader = (props) => {
  const {
    portfolioSupportLevel,
    supportLevelKeyValuePair,
    portfolioStatus,
    portfolioStatusKeyValuePair,
    setIsActivePortfolio,
    customPortfolioId,
    handlePortfolioSupportLevel,
    handlePortfolioStatus,
    history,
  } = props;

  const [openConvertToMenu, setOpenConvertToMenu] = useState(false);
  const [convertToMenuAnchorEl, setConvertToMenuAnchorEl] = useState(null);
  const [convertToQuoteModalShow, setConvertToQuoteModalShow] = useState(false);
  const [showNewVersionModal, setShowNewVersionModal] = useState(false);

  const [convertedQuoteRecord, setConvertedQuoteRecord] = useState(null);

  const [statusOptionsWithColor, setStatusOptionsWithColor] = useState([]);
  const [supportLevelOptionsWithColor, setSupportLevelOptionsWithColor] =
    useState([]);

  const [quoteRecord, setQuoteRecord] = useState({
    quoteId: 0,
    quoteType: "",
    description: "",
    reference: "",
  });

  useEffect(() => {
    const _statusOptionsWithColor = portfolioStatusKeyValuePair.map(
      (option) => {
        //   console.log("portfolioStatusKeyValuePair option ", option);
        return {
          ...option,
          color:
            option.value === "DRAFT"
              ? "#6d7ae3"
              : option.value === "ACTIVE"
              ? "#14b793"
              : option.value === "REVISED"
              ? "#ea710f"
              : "#0fb0ea",
        };
      }
    );
    setStatusOptionsWithColor(_statusOptionsWithColor);

    const _supportLevelOptionsWithColor = supportLevelKeyValuePair.map((option) => {
      return {
        ...option,
        color:
          option.value === "PREMIUM"
            ? "#e2cd00"
            : option.value === "SUPERIOR"
            ? "#898989"
            : option.value === "STANDARD"
            ? "#a78900"
            : "#ffffff",
      };
    });
    setSupportLevelOptionsWithColor(_supportLevelOptionsWithColor)
  }, []);

  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps}>
      <div
        className="d-flex align-items-center border-bottom border-secondary px-3"
        style={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <div
          className="d-flex align-items-center px-2 py-1 cursor-pointer"
          style={{
            backgroundColor: `${data.color}10`,
            color: data.color,
            borderRadius: "10px",
          }}
        >
          <span
            style={{
              backgroundColor: data.color,
              borderRadius: 10,
              content: '" "',
              display: "block",
              marginRight: 8,
              height: 10,
              width: 10,
            }}
          ></span>
          {label}
        </div>
      </div>
    </div>
  );

  // handle Portfolio status disable
  const handlePortfolioStatusDisable = (e) => {
    try {
      if (e.value === "DRAFT" && portfolioStatus.value === "ACTIVE") {
        setIsActivePortfolio(false);
        return true;
      }

      if (
        (e.value === "DRAFT" || e.value === "ACTIVE") &&
        portfolioStatus.value === "REVISED"
      ) {
        return true;
      }

      if (
        (e.value === "DRAFT" ||
          e.value === "ACTIVE" ||
          e.value === "REVISED") &&
        portfolioStatus.value === "ARCHIVED"
      ) {
        return true;
      }
    } catch (error) {
      return;
    }
  };

  // open convert to menu items list view
  const handleOpenConvertToMenu = (event) => {
    setConvertToMenuAnchorEl(event.currentTarget);
    setOpenConvertToMenu(true);
  };

  // close convert to menu items list view
  const handleCloseConvertToMenu = () => setOpenConvertToMenu(false);

  // Hide Create Quote Model
  const handleCloseQuoteCreateModal = () => setConvertToQuoteModalShow(false);

  // Quote Text Chanage
  const handleQuoteRecordChange = (e) => {
    const { id, value } = e.target;
    setQuoteRecord({ ...quoteRecord, [id]: value });
  };

  // Quote Model Box
  const viewConvertToQuoteModel = () => {
    return (
      <Modal
        show={convertToQuoteModalShow}
        onHide={handleCloseQuoteCreateModal}
        // size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="border-none">
          <Modal.Title>Quote Create</Modal.Title>
        </Modal.Header>
        <p className="d-block px-3">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <hr className="my-1" />
        <Modal.Body>
          <div className="row">
            {isEmpty(quoteRecord.quoteId) ? (
              <>
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <label
                      className="text-light-dark font-size-12 font-weight-500"
                      htmlFor="exampleInputEmail1"
                    >
                      Quote Type
                    </label>
                    <Select
                      options={quoteOptions}
                      placeholder="Quote Type"
                      value={quoteOptions[0]}
                      isDisabled
                    />
                  </div>
                </div>
                {/* <div className="col-md-12 col-sm-12">
                      <div class="form-group">
                        <label className="text-light-dark font-size-12 font-weight-500">
                          Quote ID
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                    </div> */}
                <div className="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      Description
                    </label>
                    <textarea
                      class="form-control"
                      id="description"
                      rows="3"
                      value={quoteRecord.description}
                      onChange={handleQuoteRecordChange}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12">
                  <div class="form-group">
                    <label className="text-light-dark font-size-12 font-weight-500">
                      Reference
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="reference"
                      aria-describedby="emailHelp"
                      // placeholder="Enter email"
                      value={quoteRecord.reference}
                      onChange={handleQuoteRecordChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="col-md-12 col-sm-12 mt-0 mb-0">
                  <div class="form-group mt-0 mb-0">
                    <p class="font-size-12 font-weight-500 mb-2">QUOTE TYPE </p>
                    <h6 class="font-weight-500">SOLUTION</h6>
                  </div>
                </div>
                {/* <div class="col-md-12 col-sm-12 mb-0">
                      <div class="form-group mt-1 mb-0">
                        <p class="font-size-12 font-weight-500 mb-2">Quote ID </p>
                        <h6 class="font-weight-500">
                          {isEmpty(quoteRecord.quoteId)
                            ? "NA"
                            : quoteRecord.quoteId}
                        </h6>
                      </div>
                    </div> */}
                <div class="col-md-12 col-sm-12 mb-0">
                  <div class="form-group mt-1 mb-0">
                    <p class="font-size-12 font-weight-500 mb-2">
                      QUOTE DESCRIPTION
                    </p>
                    <h6 class="font-weight-500">
                      {isEmpty(quoteRecord.description)
                        ? "NA"
                        : quoteRecord.description}
                    </h6>
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 mb-0">
                  <div class="form-group mt-1 mb-0">
                    <p class="font-size-12 font-weight-500 mb-2">REFERENCE</p>
                    <h6 class="font-weight-500">
                      {isEmpty(quoteRecord.reference)
                        ? "NA"
                        : quoteRecord.reference}
                    </h6>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: "unset" }}>
          {isEmpty(quoteRecord.quoteId) ? (
            <div className="d-flex align-items-center justify-content-end">
              <button
                class="btn btn-primary mr-2"
                // onClick={handleConvertPortfolioToQuote}
                onClick={handleCreateQuote}
              >
                Create
              </button>
              <button
                type="button"
                class="btn pull-right border"
                onClick={handleCloseQuoteCreateModal}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mb-2">
              <button
                type="button"
                className="btn cursor bg-primary d-block text-white cursor"
                onClick={handleConvertQuoteUpdate}
              >
                Done
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    );
  };

  // Check Quote input validation
  const checkQuoteInputValidation = () => {
    if (isEmpty(customPortfolioId)) {
      errorMessage("Create Solution First, then You can covnert into Quote.");
      handleCloseQuoteCreateModal();
      return false;
    }
    // else if (isEmpty(quoteRecord.description)) {
    //   errorMessage(
    //     "Quote Description in required Field, you can't leave it blank."
    //   );
    //   return false;
    // } else if (isEmpty(quoteRecord.reference)) {
    //   errorMessage(
    //     "Quote Refernece in required Field, you can't leave it blank."
    //   );
    //   return false;
    // }
    return true;
  };

  // Convert Portfolio to Quote Quote
  const handleConvertPortfolioToQuote = async () => {
    try {
      if (isEmpty(customPortfolioId)) {
        errorMessage(
          "Create Portfolio First, then You can covnert into Quote."
        );
        return;
      }
    } catch (error) {
      return;
    }
  };

  // Create Quote
  const handleCreateQuote = () => {
    try {
      if (!checkQuoteInputValidation()) {
        return;
      }
      const rUrl = CONVERT_CUSTOM_PORTFOLIO_TO_QUOTE + customPortfolioId;
      callGetApi(
        rUrl,
        (response) => {
          if (response.status === API_SUCCESS) {
            const responseData = response.data;

            setConvertedQuoteRecord({ ...responseData });
            setQuoteRecord({ ...quoteRecord, quoteId: responseData.quoteId });
          } else {
            errorMessage(response?.data?.message);
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
    } catch (error) {
      return;
    }
  };

  // update the convert Quote (click on Done button)
  const handleConvertQuoteUpdate = async () => {
    const rUrl = SOLUTION_QUOTE_CREATION() + "/" + quoteRecord.quoteId;
    const quoteReqObj = {
      ...convertedQuoteRecord,
      description:
        quoteRecord.description || convertedQuoteRecord?.description || "",
      reference: quoteRecord.reference || convertedQuoteRecord.reference || "",
    };
    callPutApi(
      null,
      rUrl,
      quoteReqObj,
      (response) => {
        if (response.status === API_SUCCESS) {
          let quotesDetails = {
            quoteId: quoteRecord.quoteId,
            type: "fetch",
          };
          history.push({
            pathname: SOLUTION_SERVICE_PORTFOLIO,
            state: quotesDetails,
          });
        } else {
          errorMessage(response?.data?.message);
        }
      },
      (error) => {
        console.log("quote update error :: ", error);
      }
    );
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mt-2">
        <div className="d-flex justify-content-center align-items-center">
          <h5 className="font-weight-600 mb-0">Solution Configurator</h5>
          <div className="d-flex justify-content-center align-items-center">
            <div className="ml-3">
            <StatusAndSupportLevelSelectBox
                className="customselectbtn1"
                value={portfolioSupportLevel}
                options={supportLevelOptionsWithColor}
                onChange={handlePortfolioSupportLevel}
                isStatus={false}
                // handleDisabledOptions={handlePortfolioStatusDisable}
              />
              {/* <Select
                className="customselectbtn1"
                onChange={handlePortfolioSupportLevel}
                options={supportLevelKeyValuePair}
                value={portfolioSupportLevel}
              /> */}
            </div>
            <div className="ml-3">
              <StatusAndSupportLevelSelectBox
                className="customselectbtn"
                value={portfolioStatus}
                options={statusOptionsWithColor}
                onChange={handlePortfolioStatus}
                handleDisabledOptions={handlePortfolioStatusDisable}
                isStatus={true}
              />
              {/* <Select
                className="customselectbtn"
                onChange={handlePortfolioStatus}
                // options={portfolioStatusKeyValuePair}
                // styles={colourStyles}
                options={statusOptionsWithColor}
                components={{
                  Option: CustomOption,
                }}
                value={portfolioStatus}
                // isOptionDisabled={(option) =>
                //   handlePortfolioStatusDisable(option)
                // }
              /> */}
            </div>
            <div className="rating-star">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star"></span>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                className="btn bg-primary text-white font-size-14 pr-0 ml-2"
                style={{ borderRadius: "5px" }}
                onClick={handleOpenConvertToMenu}
                size="small"
                aria-controls={openConvertToMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openConvertToMenu ? "true" : undefined}
              >
                <span className="convert mx-2">
                  {" "}
                  Convert to{" "}
                  <span>
                    {" "}
                    <KeyboardArrowDownIcon />
                  </span>
                </span>
              </IconButton>
            </Box>
            <Menu
              className="convert-top-left"
              anchorEl={convertToMenuAnchorEl}
              id="account-menu"
              open={openConvertToMenu}
              onClose={handleCloseConvertToMenu}
              onClick={handleCloseConvertToMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem className="custommenu">Templates</MenuItem>
                <MenuItem className="custommenu">Standard Job</MenuItem>
                <MenuItem className="custommenu">Kit</MenuItem> */}
              <MenuItem
                className="custommenu"
                sx={{ width: "75px" }}
                onClick={() => setConvertToQuoteModalShow(true)}
              >
                Quote {"           "}
              </MenuItem>
              <Divider />
            </Menu>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <a className="ml-3 font-size-14 cursor" title="Share">
              <img src={shareIcon} />
            </a>
            <a className="ml-3 font-size-14 cursor" title="Items to Review">
              <img src={folderAddIcon} />
            </a>
            <a className="ml-3 font-size-14" title="Upload">
              <img src={uploadIcon} />
            </a>
            {/* <a className="ml-3 font-size-14 cursor"><img src={cpqIcon}/></a> */}
            <a className="ml-3 font-size-14 cursor" title="Delete">
              <img src={deleteIcon} />
            </a>
            <a className="ml-3 font-size-14 cursor" title="Copy">
              <img src={copyIcon} />
            </a>
            <DropdownButton
              className="customDropdown ml-2"
              id="dropdown-item-button"
            >
              <Dropdown.Item
                as="button"
                onClick={() => setShowNewVersionModal(true)}
              >
                New Versions
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                data-toggle="modal"
                data-target="#myModal2"
              >
                Show Errors
              </Dropdown.Item>
              <Dropdown.Item as="button">Review</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
      {convertToQuoteModalShow && viewConvertToQuoteModel()}
    </>
  );
};

export default CustomPortfolioHeader;

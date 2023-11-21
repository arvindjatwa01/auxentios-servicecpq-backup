import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import penIcon from "../../../assets/images/pen.png";
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone';
import TextSnippetTwoToneIcon from '@mui/icons-material/TextSnippetTwoTone';
import GridOnIcon from '@mui/icons-material/GridOn';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { Card, Grid, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import $ from "jquery";
import { REPAIR_QUOTE_DETAILS, STANDARD_JOB_DETAIL, WITHOUT_SPARE_PARTS_DETAILS, WITH_SPARE_PARTS } from "navigation/CONSTANTS";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { uploadItemsToRepairQuote } from "services/repairQuoteServices";
import { templateSearch } from "services/templateService";
import {
  APPLICATION_OPTIONS,
  GRID_STYLE,
  TEMPLATE_SEARCH_Q_OPTIONS,
  TEMPLATE_TYPES,
  WITHOUT_PARTS,
  WITH_PARTS,
} from "../CONSTANTS";
import SearchComponentTemplate from "../components/SearchComponentTemplate";
import QuoteWithEvaluation from "./QuoteWithEvaluation";
import { UploadQuoteItems } from "./UploadQuoteItems";
import { createBuilder } from "services/repairBuilderServices";
const CardWrapper = (props) => <Card sx={{ textAlign: 'center', borderRadius: 5, height: 400, paddingBlock: 3, border: 1, borderColor: '#00000050' }} variant="outlined">{props.children}</Card>

export const CreateRepairQuote = (props) => {
  const [value, setValue] = React.useState("config");
  const history = useHistory();
  const [applicationType, setApplicationType] = useState("");
  const uploadOptions = [
    { label: 'CSV File', value: "csv", icon: <UploadFileTwoToneIcon sx={{ mx: 2, color: "green" }} /> },
    { label: 'Microsoft Excel', value: 'excel', icon: <TextSnippetTwoToneIcon sx={{ mx: 2, color: "blue" }} /> },
    { label: 'Google Sheets', value: 'gsheet', icon: <GridOnIcon sx={{ mx: 2 }} /> },
    { label: 'Paste Table Data', value: 'paste', icon: <ContentCopyTwoToneIcon sx={{ mx: 2 }} /> }]
  const [selectedQuoteOption, setSelectedQuoteOption] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Once opetion has been selected clear the search results
  const clearFilteredData = () => {
    setMasterData([]);
  };
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

  const [masterData, setMasterData] = useState([]);
  const [show, setShow] = React.useState(false);
  const [severity, setSeverity] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [showOptions, setShowOptions] = useState(true);
  const handleSnack = (snackSeverity, snackMessage) => {
    setSnackMessage(snackMessage);
    setSeverity(snackSeverity);
    setOpenSnack(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const searchKitColumns = [
    { field: "standardJobId", headerName: "ID#", flex: 1, width: 70 },
    { field: "description", headerName: "Description", flex: 1, width: 130 },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((model) => (
            <Typography style={{ fontSize: 12 }}>{model}</Typography>
          ))}
        </div>
      ),
    },
    {
      field: "family",
      headerName: "Family",
      flex: 1,
      width: 130,
      renderCell: (params) => (
        <div>
          {params.value?.map((family) => (
            <Typography style={{ fontSize: 12 }}>{family}</Typography>
          ))}
        </div>
      ),
    },
    { field: "version", headerName: "Version", flex: 1, width: 130 },
    {
      field: "totalLabourPrice",
      headerName: "Labor $",
      flex: 1,
      width: 130,
    },
    {
      field: "totalMiscPrice",
      headerName: "Misc $",
      flex: 1,
      width: 130,
    },
    { field: "netPrice", headerName: "Total $", flex: 1, width: 130 },
    { field: "status", headerName: "Status", flex: 1, width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <div className=" cursor">
                <Tooltip title="Edit">
                  <img className="m-1" src={penIcon} alt="Edit" />
                </Tooltip>
              </div>
            }
            label="Edit"
            className="textPrimary"
            onClick={() => makeKitEditable(params.row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const makeKitEditable = (selectedTemplate) => {
    let templateDetails = {
      templateId: "",
      templateDBId: "",
      partListNo: "",
      partListId: "",
      type: "fetch",
    };
    templateDetails.templateId = selectedTemplate.templateId;
    templateDetails.templateDBId = selectedTemplate.id;
    // templateDetails.partListNo = templateDetails.;
    // templateDetails.partListId = selectedTemplate.estimationNumber;
    // templateDetails.versionNumber = selectedTemplate.versionNumber;
    history.push({
      pathname: STANDARD_JOB_DETAIL,
      state: templateDetails,
    });
  };

  const handleApplicationTemplates = async (application) => {
    let searchStr = "application:" + application;
    try {
      if (searchStr) {
        const res = await templateSearch(`standardJobId~SJ AND ${searchStr}`);
        res.map((template) => {
          let family = [],
            model = [];
          template.coverages.map((coverage) => {
            family.push(coverage.coverageFamily);
            model.push(coverage.coverageModel);
          });
          // return {...kit, family : family, model: model};
          template.family = family;
          template.model = model;
        });
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching templates!");
    }
  }
  const handleQuerySearchClick = async (applicationType) => {
    $(".scrollbar").css("display", "none");
    var searchStr = "";
    // console.log(querySearchSelector);

    querySearchSelector.map(function (item, i) {
      if (
        i === 0 &&
        item.selectCategory.value &&
        item.inputSearch &&
        item.selectType
      ) {
        searchStr =
          "templateType:" +
          item.selectType.value +
          " AND " +
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
        const res = await templateSearch(`standardJobId~SJ AND ${searchStr}`);
        res.map((template) => {
          let family = [],
            model = [];
          template.coverages.map((coverage) => {
            family.push(coverage.coverageFamily);
            model.push(coverage.coverageModel);
          });
          // return {...kit, family : family, model: model};
          template.family = family;
          template.model = model;
        });
        setMasterData(res);
      } else {
        handleSnack("info", "Please fill the search criteria!");
      }
    } catch (err) {
      handleSnack("error", "Error occurred while fetching templates!");
    }
  };


  useEffect(() => {

  }, []);

  const [file, setFile] = useState(null);

  const handleReadFile = (file) => {
    // e.preventDefault();
    if (file) {
      setFile(file);
    }
  };
  //Uplaod quote through excel sheet
  const handleUploadFile = async () => {
    // console.log("Upload");
    const form = new FormData();
    form.append("file", file);
    await uploadItemsToRepairQuote(form)
      .then((createdQuote) => {
        handleSnack(
          "success",
          `Quote has been created successfully with the items`
        );
        let quoteDetails = {
          quoteId: "",
          // templateDBId: "",
          type: "fetch",
        };
        quoteDetails.quoteId = createdQuote.quoteId;
        // templateDetails.templateDBId = createdQuote.id;
        history.push({
          pathname: REPAIR_QUOTE_DETAILS,
          state: quoteDetails,
        });
      })
      .catch((err) => {
        handleSnack("error", `Failed to upload the items!`);
      });
  };

  const handleClickTemplate = (applicationType) => {
    setShowOptions(false);
    setSelectedQuoteOption("without_eval");
    handleApplicationTemplates(applicationType)
  }
  const createNewBuilder = (e) => {
    let builderDetails = {
      builderId: "",
      bId: "",
      type: "new",
    };
    if (e === "without") {
      createBuilder({
        builderType: WITHOUT_PARTS,
        activeVersion: true,
        versionNumber: 1,
        status: "DRAFT",
      })
        .then((result) => {
          builderDetails.builderId = result.builderId;
          builderDetails.bId = result.id;

          history.push({
            pathname: WITHOUT_SPARE_PARTS_DETAILS,
            state: builderDetails,
          });
        })
        .catch((err) => {
          console.log("Error Occurred", err);
          handleSnack("error", "Error occurred while creating builder!");
        });
    } else if (e === "with") {
      createBuilder({
        builderType: WITH_PARTS,
        activeVersion: true,
        versionNumber: 1,
        status: "DRAFT",
      })
        .then((result) => {
          builderDetails.builderId = result.builderId;
          builderDetails.bId = result.id;

          history.push({
            pathname: WITH_SPARE_PARTS,
            state: builderDetails,
          });
        })
        .catch((err) => {
          console.log("Error Occurred", err);
          handleSnack("error", "Error occurred while creating builder!");
        });
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
        <div className="container-fluid mt-4">
          <div className="d-flex align-items-center justify-content-between mt-2">
            <h5 className="font-weight-600 mb-0">Create Repair Quote</h5>
          </div>
          <Box className="mt-3" sx={{ width: "100%", typography: "body1" }}>
            {showOptions ?
              (<Grid container marginTop={3} columnSpacing={8} justifyContent={'space-evenly'}>
                <Grid item xs={12} md={4}>
                  <CardWrapper>
                    <Typography variant='h6'>
                      With Evaluation
                    </Typography>
                    <Typography variant="body2" paddingY={2}>
                      Create a new quote with an evaluation.
                    </Typography>
                    {/* <Card variant="outlined"
                      sx={{ margin: 'auto', width: "20%", borderRadius: 5, p: 5, cursor: 'pointer' }}
                      className="border-primary"
                      onClick={() => { setShowOptions(false); setSelectedQuoteOption("with_eval") }}>
                      +
                    </Card> */}
                    <Card variant="outlined"
                      sx={{ margin: 'auto', width: "40%", borderRadius: 2, marginBlock: 1, paddingBlock: 1, cursor: 'pointer' }}
                      onClick={() => createNewBuilder("with")}>
                      Repair Option
                    </Card>
                    <Card variant="outlined"
                      sx={{ margin: 'auto', width: "40%", borderRadius: 2, marginBlock: 1, paddingBlock: 1, cursor: 'pointer' }}
                      onClick={() => createNewBuilder("without")}>
                      Service Estimate
                    </Card>
                    <Typography variant="body1" sx={{ m: 4 }}>
                      Create A Quote
                    </Typography>
                    <Typography variant="caption">
                      Go To Repair Builder
                    </Typography>
                  </CardWrapper>

                </Grid>
                <Grid item xs={12} md={4}>
                  <CardWrapper>
                    <Typography variant={"h6"}>
                      Without evaluation
                    </Typography>
                    <Typography variant="body2" paddingY={2}>
                      Select a template to get started and customize as you go.
                    </Typography>
                    {APPLICATION_OPTIONS.map(indAppOption =>
                      <Card variant="outlined"
                        sx={{ margin: 'auto', width: "40%", borderRadius: 2, marginBlock: 1, paddingBlock: 1, cursor: 'pointer' }}
                        onClick={() => handleClickTemplate(indAppOption.value)}>
                        {indAppOption.label}
                      </Card>)}

                  </CardWrapper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <CardWrapper>
                    <Typography variant={"h6"}>
                      Import Excel
                    </Typography>
                    <Typography variant="body2" paddingY={2}>
                      Import your existing quotes from an Excel or CSV into Servicecpq.
                    </Typography>
                    {uploadOptions.map(indAppOption =>
                      <Tooltip arrow placement='left' title={indAppOption.value === 'gsheet' || indAppOption.value === 'paste' ? "Will be available in next version" : ""}>

                        <Card variant="outlined"
                          sx={{
                            margin: 'auto',
                            width: "40%",
                            borderRadius: 2,
                            marginBlock: 1,
                            paddingBlock: 1,
                            textAlign: 'left',
                            cursor: 'pointer',
                            color: indAppOption.value === 'gsheet' || indAppOption.value === 'paste' ? 'gray' : "black",
                          }}
                          onClick={() => { setShowOptions(false); setSelectedQuoteOption("upload_excel") }} >
                          {indAppOption.icon}{indAppOption.label}
                        </Card>
                      </Tooltip>)}
                  </CardWrapper>
                </Grid>
              </Grid>)
              :
              (<div>
                {selectedQuoteOption === "with_eval" && <QuoteWithEvaluation setShowOptions={setShowOptions} />}
                {selectedQuoteOption === "without_eval" &&
                  <>
                    <div className="bg-primary px-3 my-3 border-radius-6">
                      <div className="d-md-flex d-block justify-content-between align-items-center height-66">
                        <div className=" mx-2">
                          <div className="d-flex align-items-center bg-primary w-100">
                            <div
                              className="d-flex mr-3"
                              style={{ whiteSpace: "pre" }}
                            >
                              <h5 className="mr-2 mb-0 text-white">
                                <span>Search</span>
                              </h5>
                            </div>
                            <SearchComponentTemplate
                              querySearchSelector={querySearchSelector}
                              setQuerySearchSelector={setQuerySearchSelector}
                              clearFilteredData={clearFilteredData}
                              handleSnack={handleSnack}
                              searchAPI={templateSearch}
                              searchClick={handleQuerySearchClick}
                              options={TEMPLATE_SEARCH_Q_OPTIONS}
                              typeOptions={TEMPLATE_TYPES}
                              color="white"
                              type="template"
                              buttonText={"SEARCH"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div
                        className=""
                        style={{
                          height: 400,
                          width: "100%",
                          backgroundColor: "#fff",
                        }}
                      >
                        <DataGrid
                          sx={GRID_STYLE}
                          rows={masterData}
                          columns={searchKitColumns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          autoHeight
                        />
                      </div>
                      <button
                        className="btn bg-primary text-white mr-2"
                        onClick={() => {
                          props.setShowOptions(true);
                        }}
                      >
                        Back To Options
                      </button>
                    </div>
                  </>
                } :
                {selectedQuoteOption === "upload_excel" &&
                  <UploadQuoteItems handleUploadFile={handleUploadFile} handleReadFile={handleReadFile} file={file} />
                }
              </div>
              )}

          </Box>
        </div>
      </div >
    </>
  );
};
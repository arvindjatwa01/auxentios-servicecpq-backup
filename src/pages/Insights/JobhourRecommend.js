import {
  Autocomplete,
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { Fragment, useState } from "react";
import { jobCodeSearch } from "services/searchServices";
import { getComponentCodeSuggetions } from "services";

export default function JobhourRecommend(props) {
  const [selectedCategory, setSelectedCategory] = useState("service");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [selectedJobCode, setSelectedJobCode] = useState(null);
  const [selectedComponentCode, setSelectedComponentCode] = useState(null);
  const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
  const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);
  const [jobHours, setJobHours] = useState(0);

  const [make, setMake] = useState(null);
  const [family, setFamily] = useState(null);
  const [model, setModel] = useState([]);
  const [prefix, setPrefix] = useState([]);
  const [jobCode, setJobCode] = useState(null);
  const [componentCode, setComponentCode] = useState(null);
  const [searchJobCode, setSearchJobCode] = useState([]);
  const [searchComponentCodes, setSearchComponentCodes] = useState([]);

  const defaultServiceAttributeValue = [
    {
      family: "MOTOR GRADERS",
      model: [
        {
          modelNo: "160H",
          prefix: [
            {
              prefixNo: "XZK",
              jobCodes: [
                {
                  jobCode: "JB0345",
                  componentData: [
                    {
                      componentCode: "1562",
                      jobHours: 13,
                    },
                    {
                      componentCode: "1563",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0346",
                  componentData: [
                    {
                      componentCode: "1564",
                      jobHours: 18,
                    },
                    {
                      componentCode: "1565",
                      jobHours: 12,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          modelNo: "120K",
          prefix: [
            {
              prefixNo: "SZZ",
              jobCodes: [
                {
                  jobCode: "JB0345",
                  componentData: [
                    {
                      componentCode: "1562",
                      jobHours: 13,
                    },
                    {
                      componentCode: "1563",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0347",
                  componentData: [
                    {
                      componentCode: "1545",
                      jobHours: 8,
                    },
                    {
                      componentCode: "1565",
                      jobHours: 14,
                    },
                  ],
                },
              ],
            },
            {
              prefixNo: "SZS",
              jobCodes: [
                {
                  jobCode: "JB0345",
                  componentData: [
                    {
                      componentCode: "1562",
                      jobHours: 13,
                    },
                    {
                      componentCode: "1563",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0349",
                  componentData: [
                    {
                      componentCode: "1560",
                      jobHours: 8,
                    },
                    {
                      componentCode: "1569",
                      jobHours: 12,
                    },
                  ],
                },
              ],
            },
            {
              prefixNo: "SZN",
              jobCodes: [
                {
                  jobCode: "JB0345",
                  componentData: [
                    {
                      componentCode: "1562",
                      jobHours: 13,
                    },
                    {
                      componentCode: "1563",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0349",
                  componentData: [
                    {
                      componentCode: "7184",
                      jobHours: 7,
                    },
                    {
                      componentCode: "7185",
                      jobHours: 16,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      family: "TRACK EXCAVATORS",
      model: [
        {
          modelNo: "320D2",
          prefix: [
            {
              prefixNo: "TMF",
              jobCodes: [
                {
                  jobCode: "JB0353",
                  componentData: [
                    {
                      componentCode: "7187",
                      jobHours: 12,
                    },
                    {
                      componentCode: "6123",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0346",
                  componentData: [
                    {
                      componentCode: "1564",
                      jobHours: 18,
                    },
                    {
                      componentCode: "1565",
                      jobHours: 12,
                    },
                  ],
                },
              ],
            },
            {
              prefixNo: "TDZ",
              jobCodes: [
                {
                  jobCode: "JB0353",
                  componentData: [
                    {
                      componentCode: "7187",
                      jobHours: 12,
                    },
                    {
                      componentCode: "6123",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0359",
                  componentData: [
                    {
                      componentCode: "1672",
                      jobHours: 6,
                    },
                    {
                      componentCode: "1673",
                      jobHours: 15,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          modelNo: "329D2 L",
          prefix: [
            {
              prefixNo: "THW",
              jobCodes: [
                {
                  jobCode: "JB0389",
                  componentData: [
                    {
                      componentCode: "7189",
                      jobHours: 12,
                    },
                    {
                      componentCode: "7190",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0390",
                  componentData: [
                    {
                      componentCode: "1592",
                      jobHours: 18,
                    },
                    {
                      componentCode: "1594",
                      jobHours: 12,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      family: "GENERATORS SET ENGINES",
      model: [
        {
          modelNo: "3516B",
          prefix: [
            {
              prefixNo: "ZAP",
              jobCodes: [
                {
                  jobCode: "JB0353",
                  componentData: [
                    {
                      componentCode: "7187",
                      jobHours: 12,
                    },
                    {
                      componentCode: "6123",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0393",
                  componentData: [
                    {
                      componentCode: "7191",
                      jobHours: 8,
                    },
                    {
                      componentCode: "7192",
                      jobHours: 12,
                    },
                  ],
                },
              ],
            },
            {
              prefixNo: "YBT",
              jobCodes: [
                {
                  jobCode: "JB0353",
                  componentData: [
                    {
                      componentCode: "7187",
                      jobHours: 12,
                    },
                    {
                      componentCode: "6123",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0394",
                  componentData: [
                    {
                      componentCode: "7194",
                      jobHours: 10,
                    },
                    {
                      componentCode: "7188",
                      jobHours: 17,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          modelNo: "C15",
          prefix: [
            {
              prefixNo: "XP8",
              jobCodes: [
                {
                  jobCode: "JB0339",
                  componentData: [
                    {
                      componentCode: "7120",
                      jobHours: 8,
                    },
                    {
                      componentCode: "7123",
                      jobHours: 11,
                    },
                  ],
                },
                {
                  jobCode: "JB0340",
                  componentData: [
                    {
                      componentCode: "7129",
                      jobHours: 8,
                    },
                    {
                      componentCode: "7131",
                      jobHours: 11,
                    },
                  ],
                },
              ],
            },
            {
              prefixNo: "X4R",
              jobCodes: [
                {
                  jobCode: "JB0310",
                  componentData: [
                    {
                      componentCode: "7134",
                      jobHours: 12,
                    },
                    {
                      componentCode: "7189",
                      jobHours: 15,
                    },
                  ],
                },
                {
                  jobCode: "JB0335",
                  componentData: [
                    {
                      componentCode: "7135",
                      jobHours: 5,
                    },
                    {
                      componentCode: "7136",
                      jobHours: 8,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleSelectCategory = (e) => {
    console.log(e);
    setSelectedCategory(e);
  };
  const handleSelectSubService = (e) => {
    setSelectedSubService(e);
  };

  function getStyle(component) {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedSubService === component || selectedCategory === component
          ? "#872FF7"
          : "#FFF",
      color:
        selectedSubService === component || selectedCategory === component
          ? "#FFFFFF"
          : "",
      "&:hover": {
        backgroundColor: "#6315c7 !important",
        color: "#FFFFFF",
      },
    };
  }

  // select fields Style
  const getSelectedDataStyle = () => {
    return {
      mr: 1,
      my: 1,
      backgroundColor: "#872FF7",
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#6315c7 !important",
        color: "#FFFFFF",
      },
    };
  };

  // Search Job Code
  const handleJobCodeSearch = async (searchText) => {
    setSearchJobCodeResults([]);
    if (searchText) {
      await jobCodeSearch("description~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchJobCodeResults(result);
            // setNoOptionsJobCode(false);
          } else {
            // setNoOptionsJobCode(true);
          }
        })
        .catch((e) => {
          props.handleSnack(
            "error",
            "Error occurred while searching the job code!"
          );
        });
    }
  };
  // Search component code
  const handleComponentCodeSearch = async (searchText) => {
    setSearchCompCodeResults([]);
    // segmentData.componentCode = searchText;
    if (searchText) {
      await getComponentCodeSuggetions("description~" + searchText)
        .then((result) => {
          if (result && result.length > 0) {
            setSearchCompCodeResults(result);
            // setNoOptionsCompCode(false);
          }
        })
        .catch((e) => {
          props.handleSnack(
            "error",
            "Error occurred while searching the component!"
          );
        });
    }
  };
  // Select the comp code from search result
  const handleCompCodeSelect = (type, currentItem) => {
    console.log(type, currentItem);
    setComponentCode(currentItem);
    setSearchCompCodeResults([]);
  };
  // Select the job code from search result
  const handleJobCodeSelect = (type, currentItem) => {
    setJobCode(currentItem);
    setSearchCompCodeResults([]);
  };
  function JobHour() {
    return (
      <Card sx={{ padding: 2, width: "80%", mx: "auto" }} variant="outlined">
        <Card variant="outlined">
          {jobCode?.jobCode && componentCode.componentCode ? (
            <List>
              <ListItem
                sx={{
                  justifyContent: "center",
                  fontSize: "1.20rem",
                  fontWeight: "600",
                }}
              >
                Recommended Hours
                {/* Average hours to {jobCode?.description} the{" "}
                {componentCode?.description} */}
              </ListItem>
              <Divider />
              <ListItem
                className="align-items-center "
                sx={{ justifyContent: "center", fontSize: "1.05rem" }}
              >
                <Typography
                  variant="h4"
                  color={"#872ff7"}
                  sx={{ mx: 2 }}
                  fontWeight={"600"}
                >
                  {/* 100 Hrs{" "} */}
                  {jobHours} Hrs{" "}
                </Typography>
                average for similar Jobs
                {/* <p className="text-center" style={{fontSize: "1rem"}}></p> */}
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center" }}>
                <Typography variant="h6" color={"#00000060"} sx={{ mx: 2 }}>
                  Low
                  <br />
                  End
                </Typography>
                <Typography variant="h5" fontWeight={500} sx={{ mx: 2 }}>
                  {/* 20 Hrs - 200 Hrs */}
                  {jobHours !== 0
                    ? jobHours > 100
                      ? `${jobHours - 10} Hrs - ${jobHours + 10} Hrs`
                      : `${jobHours - 2} Hrs - ${jobHours + 2} Hrs`
                    : ""}
                </Typography>
                <Typography variant="h6" color={"#00000060"} sx={{ mx: 2 }}>
                  High
                  <br />
                  End
                </Typography>
              </ListItem>
            </List>
          ) : (
            <Typography
              sx={{ margin: "auto", padding: 2, textAlign: "center" }}
            >
              Please Select the filters!
            </Typography>
          )}
        </Card>
      </Card>
    );
  }

  const getListDataStyle = (subService, selectedData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        subService === "family" &&
        selectedFamily &&
        selectedData.family === selectedFamily?.family
          ? "#872FF7"
          : subService === "model" &&
            selectedModel &&
            selectedData.modelNo === selectedModel?.modelNo
          ? "#872FF7"
          : subService === "prefix" &&
            selectedPrefix &&
            selectedData.prefixNo === selectedPrefix?.prefixNo
          ? "#872FF7"
          : subService === "jobCode" &&
            selectedJobCode &&
            selectedData.jobCode === selectedJobCode?.jobCode
          ? "#872FF7"
          : subService === "componentCode" &&
            componentCode &&
            selectedData.componentCode === componentCode?.componentCode
          ? "#872FF7"
          : "#FFFFFF",
      color:
        subService === "family" &&
        selectedFamily &&
        selectedData.family === selectedFamily?.family
          ? "#FFFFFF"
          : subService === "model" &&
            selectedModel &&
            selectedData.modelNo === selectedModel?.modelNo
          ? "#FFFFFF"
          : subService === "prefix" &&
            selectedPrefix &&
            selectedData.prefixNo === selectedPrefix?.prefixNo
          ? "#FFFFFF"
          : subService === "jobCode" &&
            selectedJobCode &&
            selectedData.jobCode === selectedJobCode?.jobCode
          ? "#FFFFFF"
          : subService === "componentCode" &&
            componentCode &&
            selectedData.componentCode === componentCode?.componentCode
          ? "#FFFFFF"
          : "",
      "&:hover": {
        backgroundColor: "#6315c7 !important",
        color: "#FFFFFF",
      },
    };
  };

  const handleSelectServiceAttributes = (serviceName, row) => {
    if (serviceName === "family") {
      setSelectedFamily(row);
      setSelectedModel(null);
      setSelectedPrefix(null);
      setSelectedJobCode(null);
      setSelectedComponentCode(null);
      setJobCode("");
      setComponentCode("");
    } else if (serviceName === "model") {
      setSelectedModel(row);
      setSelectedPrefix(null);
      setSelectedJobCode(null);
      setSelectedComponentCode(null);
      setJobCode("");
      setComponentCode("");
    } else if (serviceName === "prefix") {
      setSelectedPrefix(row);
      setSelectedJobCode(null);
      setSelectedComponentCode(null);
      setJobCode("");
      setComponentCode("");
    } else if (serviceName === "jocCode") {
      setSelectedJobCode(row);
      setJobCode({
        jobCode: row.jobCode,
        description: row.jobCode,
      });
      setComponentCode("");
      // setSearchJobCodeResults([row.jobCode])
      setSelectedComponentCode(null);
    } else if (serviceName === "componentCode") {
      setSelectedComponentCode(row);
      setJobHours(row.jobHours);
      setComponentCode({
        componentCode: row.componentCode,
        description: row.componentCode,
      });
    }
  };

  const handleFamilySelect = (row) => {
    setSelectedFamily(row);
    setSelectedSubService("model");
    setSelectedModel(null);
    setSelectedPrefix(null);
    setSelectedJobCode(null);
    setSelectedComponentCode(null);
    setJobCode("");
    setComponentCode("");
    setSearchJobCode([]);
    setSearchComponentCodes([]);
  };

  const handleModelSelect = (row) => {
    setSelectedModel(row);
    setSelectedSubService("prefix");
    setSelectedPrefix(null);
    setSelectedJobCode(null);
    setSelectedComponentCode(null);
    setJobCode("");
    setComponentCode("");
    setSearchJobCode([]);
    setSearchComponentCodes([]);
  };

  const handlePrefixSelect = (row) => {
    setSelectedPrefix(row);
    setSelectedSubService("jobCode");
    setSelectedJobCode(null);
    setSelectedComponentCode(null);
    setJobCode("");
    setComponentCode("");
    setSearchJobCode([]);
    setSearchComponentCodes([]);
  };

  const handleSelectJobCode = (row) => {
    setSelectedJobCode(row);
    setSelectedSubService("componentCode");
    setJobCode({
      jobCode: row.jobCode,
      description: row.jobCode,
    });
    setComponentCode("");
    // setSearchJobCodeResults([row.jobCode])
    setSelectedComponentCode(null);
    setSearchJobCode([]);
    setSearchComponentCodes([]);
  };

  const handleSelectComponentCode = (row) => {
    setSelectedComponentCode(row);
    setJobHours(row.jobHours);
    setComponentCode({
      componentCode: row.componentCode,
      description: row.componentCode,
    });
  };

  const handleSearchJobCode = (e) => {
    const { value } = e.target;
    if (selectedPrefix && Object.keys(selectedPrefix).length !== 0) {
      const result = selectedPrefix?.jobCodes.filter((obj) =>
        obj.jobCode.toLowerCase().includes(value.toLowerCase())
      );
      console.log("result :: ", result);
      setSearchJobCode(result);
    }
  };

  const handleSearchComponentCode = (e) => {
    const { value } = e.target;
    if (selectedJobCode && Object.keys(selectedJobCode).length !== 0) {
      const result = selectedJobCode?.componentData.filter((obj) =>
        obj.componentCode.toLowerCase().includes(value.toLowerCase())
      );
      setSearchJobCode(result);
    }
  };

  return (
    <div>
      <Grid
        container
        sx={{
          width: "100%",
          backgroundColor: "#f3eafe",
          borderRadius: 5,
          marginBlock: 3,
          padding: 2,
        }}
      >
        <Card
          sx={{
            borderRadius: 4,
            width: "100%",
            margin: 2,
          }}
          variant="outlined"
        >
          <Typography
            sx={{ fontSize: 18, fontWeight: 600, margin: 2, marginBottom: 0 }}
          >
            Job Hour Recommendation
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              margin: 2,
              marginTop: 0,
              marginBottom: 1,
            }}
          >
            Service Attributes
          </Typography>
          <Grid container marginX={2}>
            <Grid item xs={12} md={6}>
              <Fragment>
                <Chip
                  variant="outlined"
                  label="Make"
                  size="small"
                  onClick={(e) => handleSelectSubService("make")}
                  sx={{
                    mr: 1,
                    my: 1,
                    backgroundColor:
                      selectedSubService === "make" || make
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "make" || make ? "#FFFFFF" : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                />
                <KeyboardArrowDownIcon />
                <Chip
                  variant="outlined"
                  label="Family"
                  size="small"
                  onClick={(e) => handleSelectSubService("family")}
                  sx={{
                    mr: 1,
                    my: 1,
                    backgroundColor:
                      selectedSubService === "family" || selectedFamily
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "family" || selectedFamily
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                />
                <KeyboardArrowDownIcon />
                <Chip
                  variant="outlined"
                  label="Model"
                  size="small"
                  onClick={(e) => handleSelectSubService("model")}
                  sx={{
                    mr: 1,
                    my: 1,
                    backgroundColor:
                      selectedSubService === "model" || selectedModel
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "model" || selectedModel
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                  disabled={selectedFamily ? false : true}
                />
                <KeyboardArrowDownIcon />
                <Chip
                  variant="outlined"
                  label="Prefix"
                  size="small"
                  onClick={(e) => handleSelectSubService("prefix")}
                  disabled={selectedModel ? false : true}
                  sx={{
                    mr: 1,
                    my: 1,
                    backgroundColor:
                      selectedSubService === "prefix" || selectedPrefix
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "prefix" || selectedPrefix
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                />
                {/* <KeyboardArrowDownIcon />
                <Chip
                  variant="outlined"
                  label="Job Code"
                  size="small"
                  onClick={(e) => handleSelectSubService("jobCode")}
                  disabled={selectedPrefix ? false : true}
                  sx={{
                    mr: 1,
                    my: 1,
                    backgroundColor:
                      selectedSubService === "jobCode" || selectedJobCode
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "jobCode" || selectedJobCode
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                />
                <KeyboardArrowDownIcon />
                <Chip
                  variant="outlined"
                  label="Component Code"
                  size="small"
                  onClick={(e) => handleSelectSubService("componentCode")}
                  disabled={selectedJobCode ? false : true}
                  sx={{
                    mr: 1,
                    my: 1,
                    backgroundColor:
                      selectedSubService === "componentCode" || componentCode
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "componentCode" || componentCode
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                /> */}
              </Fragment>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container marginX={1}>
            <Grid item xs={12}>
              {selectedSubService === "family" &&
                defaultServiceAttributeValue.length !== 0 &&
                defaultServiceAttributeValue.map((familyData, i) => {
                  return (
                    <Chip
                      variant="outlined"
                      label={familyData.family}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => handleFamilySelect(familyData)}
                      sx={() => getListDataStyle("family", familyData)}
                    />
                  );
                })}
              {selectedSubService === "model" &&
                selectedFamily &&
                Object.keys(selectedFamily).length !== 0 &&
                selectedFamily?.model.map((modelData, i) => {
                  return (
                    <Chip
                      variant="outlined"
                      label={modelData.modelNo}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => handleModelSelect(modelData)}
                      sx={() => getListDataStyle("model", modelData)}
                    />
                  );
                })}
              {selectedSubService === "prefix" &&
                selectedModel &&
                Object.keys(selectedModel).length !== 0 &&
                selectedModel?.prefix.map((prefixData, i) => {
                  return (
                    <Chip
                      variant="outlined"
                      label={prefixData.prefixNo}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => handlePrefixSelect(prefixData)}
                      sx={() => getListDataStyle("prefix", prefixData)}
                    />
                  );
                })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container marginX={1}>
            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  margin: 1,
                  marginTop: 1,
                  marginBottom: 0,
                }}
              >
                Selected Service Attributes
              </Typography>
              <Fragment>
                <Card
                  className="btn text-primary font-weight-500"
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    paddingX: 0.8,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    border: 2,
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Make
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0">{make?.make || "Select Make"}</span>
                </Card>
                <Card
                  className="btn text-primary font-weight-500"
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    border: 2,
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Family
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {selectedFamily?.family || "Select Family"}
                  </span>
                </Card>
                <Card
                  className="btn text-primary font-weight-500"
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    border: 2,
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Model
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {selectedModel?.modelNo || "Select Model"}
                  </span>
                </Card>
                <Card
                  className="btn text-primary font-weight-500"
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    border: 2,
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Prefix
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {selectedPrefix?.prefixNo || "Selected Prefix"}
                  </span>
                </Card>
                <Card
                  className="btn text-primary font-weight-500"
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    border: 2,
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Job Code
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {selectedJobCode?.jobCode || "Select Job Code"}
                  </span>
                </Card>
                <Card
                  className="btn text-primary font-weight-500"
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    border: 2,
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Component Code
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {componentCode?.componentCode || "Select Component Code"}
                  </span>
                </Card>
              </Fragment>
              {/* <Fragment>
                {selectedFamily && (
                  <>
                    <Chip
                      variant="outlined"
                      label={selectedFamily.family}
                      size="small"
                      sx={getSelectedDataStyle}
                    />
                  </>
                )}
                {selectedModel && (
                  <>
                    <KeyboardArrowDownIcon />
                    <Chip
                      variant="outlined"
                      label={selectedModel.modelNo}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      sx={getSelectedDataStyle}
                    />
                  </>
                )}
                {selectedPrefix && (
                  <>
                    <KeyboardArrowDownIcon />
                    <Chip
                      variant="outlined"
                      label={selectedPrefix.prefixNo}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      sx={getSelectedDataStyle}
                    />
                  </>
                )}
                {selectedJobCode && (
                  <>
                    <KeyboardArrowDownIcon />
                    <Chip
                      variant="outlined"
                      label={selectedJobCode.jobCode}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      sx={getSelectedDataStyle}
                    />
                  </>
                )}
                {componentCode && (
                  <>
                    <KeyboardArrowDownIcon />
                    <Chip
                      variant="outlined"
                      label={componentCode.componentCode}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      sx={getSelectedDataStyle}
                    />
                  </>
                )}
              </Fragment> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container marginX={1}>
            <Grid item xs={12} md={3}>
              <Card
                className="btn text-primary font-weight-500"
                variant="outlined"
                sx={{
                  padding: 0.5,
                  margin: 1,
                  // width: "20%",
                  borderRadius: 3,
                  border: 2,
                }}
              >
                <span
                  className="border-0 border-end border-secondary"
                  style={{ borderRight: "2px solid #00000" }}
                >
                  Job Code
                </span>
                <span className="mx-2">|</span>
                <span className="ml-0 pr-2 text-primary">
                  <input
                    class="border-0 text-primary"
                    type="text"
                    placeholder="search"
                    value={selectedJobCode?.jobCode}
                    onChange={handleSearchJobCode}
                    disabled={!selectedPrefix}
                    readOnly={!selectedPrefix}
                  />
                </span>
              </Card>
              <Card
                className="btn text-primary font-weight-500"
                variant="outlined"
                sx={{
                  padding: 0.5,
                  margin: 1,
                  // width: "20%",
                  borderRadius: 3,
                  border: 2,
                }}
              >
                <span
                  className="border-0 border-end border-secondary"
                  style={{ borderRight: "2px solid #00000" }}
                >
                  Component Code
                </span>
                <span className="mx-2">|</span>
                <span className="ml-0 pr-2 text-primary">
                  <input
                    class="border-0 text-primary"
                    type="text"
                    placeholder="search"
                    value={componentCode?.componentCode}
                    onChange={handleSearchComponentCode}
                    disabled={!selectedJobCode}
                    readOnly={!selectedJobCode}
                  />
                </span>
              </Card>

              {!selectedJobCode &&
                searchJobCode.length !== 0 &&
                searchJobCode.map((jobCodes, i) => (
                  <Chip
                    variant="outlined"
                    label={jobCodes.jobCode}
                    size="small"
                    onClick={(e) => handleSelectJobCode(jobCodes)}
                    sx={() => getListDataStyle("jobCode", jobCodes)}
                    key={`jobCode-${i}`}
                  />
                ))}

              {searchComponentCodes.length !== 0 &&
                searchComponentCodes.map((component, i) => (
                  <Chip
                    variant="outlined"
                    label={component.componentCode}
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSelectComponentCode(component)}
                    sx={() => getListDataStyle("componentCode", component)}
                    key={i}
                  />
                ))}
              {/* {selectedSubService === "jobCode" &&
                selectedPrefix &&
                Object.keys(selectedPrefix).length !== 0 &&
                selectedPrefix?.jobCodes.map((jobCodeData, i) => {
                  return (
                    <Chip
                      variant="outlined"
                      label={jobCodeData.jobCode}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => handleSelectJobCode(jobCodeData)}
                      sx={() => getListDataStyle("jobCode", jobCodeData)}
                    />
                  );
                })} */}
              {selectedSubService === "componentCode" &&
                selectedJobCode &&
                Object.keys(selectedJobCode).length !== 0 &&
                selectedJobCode?.componentData.map((component, i) => {
                  return (
                    <Chip
                      variant="outlined"
                      label={component.componentCode}
                      size="small"
                      // deleteIcon={<KeyboardArrowDownIcon />}
                      onClick={(e) => handleSelectComponentCode(component)}
                      sx={() => getListDataStyle("componentCode", component)}
                    />
                  );
                })}
            </Grid>
            <Grid item xs={1} md={2}>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid item container xs={12}>
                <Grid item xs={12} sx={{ my: 2 }}>
                  <JobHour />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
}

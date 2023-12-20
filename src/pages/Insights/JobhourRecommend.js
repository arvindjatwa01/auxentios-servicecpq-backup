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
  const [family, setFamily] = useState([]);
  const [model, setModel] = useState([]);
  const [prefix, setPrefix] = useState([]);
  const [jobCode, setJobCode] = useState("");
  const [componentCode, setComponentCode] = useState("");
  const [searchJobCodeResults, setSearchJobCodeResults] = useState([]);
  const [searchCompCodeResults, setSearchCompCodeResults] = useState([]);
  const [jobHours, setJobHours] = useState(0);

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
        color: "#000",
      },
    };
  }
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
              <ListItem sx={{ justifyContent: "center" }}>
                Average hours to {jobCode?.description} the{" "}
                {componentCode?.description}
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center" }}>
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

  const getFamilyStyle = (familyData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedFamily && familyData.family === selectedFamily?.family
          ? "#872FF7"
          : "#FFF",
      color:
        selectedFamily && familyData.family === selectedFamily?.family
          ? "#FFFFFF"
          : "",
      "&:hover": {
        color: "#000",
      },
    };
  };

  // model style
  const getModelStyle = (modelData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedModel && modelData.modelNo === selectedModel?.modelNo
          ? "#872FF7"
          : "#FFF",
      color:
        selectedModel && modelData.modelNo === selectedModel?.modelNo
          ? "#FFFFFF"
          : "",
      "&:hover": {
        color: "#000",
      },
    };
  };

  const getPrefixStyle = (prefixData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedPrefix && prefixData.prefixNo === selectedPrefix?.prefixNo
          ? "#872FF7"
          : "#FFF",
      color:
        selectedPrefix && prefixData.prefixNo === selectedPrefix?.prefixNo
          ? "#FFFFFF"
          : "",
      "&:hover": {
        color: "#000",
      },
    };
  };

  const getJobCodeStyle = (jobCodeData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedJobCode && jobCodeData.jobCode === selectedJobCode?.jobCode
          ? "#872FF7"
          : "#FFF",
      color:
        selectedJobCode && jobCodeData.jobCode === selectedJobCode?.jobCode
          ? "#FFFFFF"
          : "",
      "&:hover": {
        color: "#000",
      },
    };
  };

  const getComponentCodeStyle = (componentCodeData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedComponentCode &&
        componentCodeData.componentCode === selectedComponentCode?.componentCode
          ? "#872FF7"
          : "#FFF",
      color:
        selectedComponentCode &&
        componentCodeData.componentCode === selectedComponentCode?.componentCode
          ? "#FFFFFF"
          : "",
      "&:hover": {
        color: "#000",
      },
    };
  };

  const handleFamilySelect = (row) => {
    setSelectedFamily(row);
    setSelectedModel(null);
    setSelectedPrefix(null);
    setSelectedJobCode(null);
    setSelectedComponentCode(null);
    setJobCode("");
    setComponentCode("");
  };

  const handleModelSelect = (row) => {
    setSelectedModel(row);
    setSelectedPrefix(null);
    setSelectedJobCode(null);
    setSelectedComponentCode(null);
    setJobCode("");
    setComponentCode("");
  };

  const handlePrefixSelect = (row) => {
    setSelectedPrefix(row);
    setSelectedJobCode(null);
    setSelectedComponentCode(null);
    setJobCode("");
    setComponentCode("");
  };

  const handleSelectJobCode = (row) => {
    setSelectedJobCode(row);
    setJobCode({
      jobCode: row.jobCode,
      description: row.jobCode,
    });
    setComponentCode("");
    // setSearchJobCodeResults([row.jobCode])
    setSelectedComponentCode(null);
  };

  const handleSelectComponentCode = (row) => {
    setSelectedComponentCode(row);
    setJobHours(row.jobHours);
    setComponentCode({
      componentCode: row.componentCode,
      description: row.componentCode,
    });
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
          <Typography sx={{ fontSize: 16, fontWeight: 600, margin: 2 }}>
            Job Hour Recommendation
          </Typography>
          <Grid container marginX={1}>
            <Grid item xs={12} md={3}>
              <Chip
                variant="outlined"
                label="Service Attributes"
                size="small"
                onClick={(e) => handleSelectCategory("service")}
                sx={() => getStyle("service")}
                // icon={selectedCategory === "service" ? <CheckIcon color={"#fff"} /> : <></>}
              />
              {selectedCategory === "service" && (
                <Fragment>
                  <KeyboardArrowDownIcon />
                  <Chip
                    variant="outlined"
                    label="Family"
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSelectSubService("family")}
                    // onDelete={e => handleSelectSubService("family")}
                    sx={() => getStyle("family")}
                  />
                  <KeyboardArrowDownIcon />
                  <Chip
                    variant="outlined"
                    label="Model"
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSelectSubService("model")}
                    sx={() => getStyle("model")}
                    disabled={selectedFamily ? false : true}
                  />
                  <KeyboardArrowDownIcon />
                  <Chip
                    variant="outlined"
                    label="Prefix"
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSelectSubService("prefix")}
                    sx={() => getStyle("prefix")}
                    disabled={selectedModel ? false : true}
                  />
                  <KeyboardArrowDownIcon />
                  <Chip
                    variant="outlined"
                    label="Job Code"
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSelectSubService("jobCode")}
                    sx={() => getStyle("jobCode")}
                    disabled={selectedPrefix ? false : true}
                  />
                  <KeyboardArrowDownIcon />
                  <Chip
                    variant="outlined"
                    label="Component Code"
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSelectSubService("componentCode")}
                    sx={() => getStyle("componentCode")}
                    disabled={selectedJobCode ? false : true}
                  />
                </Fragment>
              )}

              <Divider className="mb-2" />
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
                      sx={() => getFamilyStyle(familyData)}
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
                      sx={() => getModelStyle(modelData)}
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
                      sx={() => getPrefixStyle(prefixData)}
                    />
                  );
                })}
              {selectedSubService === "jobCode" &&
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
                      sx={() => getJobCodeStyle(jobCodeData)}
                    />
                  );
                })}
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
                      sx={() => getComponentCodeStyle(component)}
                    />
                  );
                })}
            </Grid>
            <Grid item xs={1} md={1}>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
            </Grid>

            <Grid item xs={12} md={7}>
              <Grid item container xs={12}>
                {/* <Grid
                  item
                  container
                  xs={12}
                  md={12}
                  justifyContent={"center"}
                  sx={{ my: 2 }}
                >
                  <Autocomplete
                    size={"small"}
                    options={searchJobCodeResults}
                    // getOptionLabel={(option) => option.description}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size={"small"}
                        label="Job Code"
                        // onChange={(e) => handleJobCodeSearch(e.target.value)}
                      />
                    )}
                    sx={{ width: "38%", mr: 3 }}
                    filterOptions={(x) => x}
                    onChange={handleJobCodeSelect}
                  />
                  <Autocomplete
                    size={"small"}
                    options={searchCompCodeResults}
                    getOptionLabel={(option) => option.description}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{ fontSize: 13 }}
                        label="Component Code"
                        onChange={(e) =>
                          handleComponentCodeSearch(e.target.value)
                        }
                      />
                    )}
                    onChange={handleCompCodeSelect}
                    sx={{ width: "38%" }}
                    filterOptions={(x) => x}
                  />
                </Grid> */}

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

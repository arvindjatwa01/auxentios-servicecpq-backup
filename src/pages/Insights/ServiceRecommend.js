import { Card, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardRightArrowIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CheckIcon from "@mui/icons-material/Check";
import OwlCarousel from "react-owl-carousel";
import { Fragment, useState } from "react";
const OWL_CAROUSEL_OPTIONS = {
  margin: 10,
  responsiveClass: true,
  nav: true,
  dots: false,
  autoplay: false,
  // navText: ["Prev", "Next"],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    800: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

const recommendedServices = [
  {
    name: "PS_3306_PM2",
    description: [
      "This is a Portfolio Solution for 3306 for Preventive Maintenance 2",
    ],
    price: "36230",
  },
  {
    name: "PS_3508B_PM4",
    description: [
      "This is a Portfolio Solution for 3508B for Preventive Maintenance 4",
    ],
    price: "468000",
  },
  {
    name: "PS_C27_PM1",
    description: [
      "This is a Portfolio Solution for C27 for Preventive Maintenance 1",
    ],
    price: "9750",
  },
  {
    name: "PS_3508B_PM2",
    description: [
      "This is a Portfolio Solution for 3508B for Preventive Maintenance 2",
    ],
    price: "800",
  },
  {
    name: "PS_571G_PM3",
    description: [
      "This is a Portfolio Solution for 571G for Preventive Maintenance 3",
    ],
    price: "65000",
  },
];

const segementAttriibutes = [
  {
    segment: "A Class",
    group: ["Mining", "Construction", "Energy"],
  },
  {
    segment: "B Class",
    group: ["Mining", "Construction", "Energy"],
  },
  {
    segment: "C Class",
    group: ["Mining", "Construction", "Energy"],
  },
];

const dummyServiceData = [
  {
    make: "caterpillar",
    familyData: [
      {
        family: "MOTOR GRADERS",
        model: [
          {
            modelNo: "160H",
            prefix: [
              {
                prefixNo: "XZK",
                segmentAttrubute: [...segementAttriibutes],
              },
            ],
          },
          {
            modelNo: "120K",
            prefix: [
              {
                prefixNo: "SZZ",
                segmentAttrubute: [...segementAttriibutes],
              },
              {
                prefixNo: "SZS",
                segmentAttrubute: [...segementAttriibutes],
              },
              {
                prefixNo: "SZN",
                segmentAttrubute: [...segementAttriibutes],
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
                prefix: "TMF",
                segmentAttrubute: [...segementAttriibutes],
              },
              {
                prefix: "TDZ",
                segmentAttrubute: [...segementAttriibutes],
              },
            ],
          },
          {
            modelNo: "329D2 L",
            prefix: [
              {
                prefix: "THW",
                segmentAttrubute: [...segementAttriibutes],
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
                prefix: "ZAP",
                segmentAttrubute: [...segementAttriibutes],
              },
              {
                prefix: "YBT",
                segmentAttrubute: [...segementAttriibutes],
              },
            ],
          },
          {
            modelNo: "C15",
            prefix: [
              {
                prefix: "XP8",
                segmentAttrubute: [...segementAttriibutes],
              },
              {
                prefix: "X4R",
                segmentAttrubute: [...segementAttriibutes],
              },
            ],
          },
        ],
      },
    ],
  },
];
export default function ServiceRecommend(props) {
  const [selectedCategory, setSelectedCategory] = useState("service");
  const [selectedSubService, setSelectedSubService] = useState("make");
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [family, setFamily] = useState([]);
  const [model, setModel] = useState([]);
  const [prefix, setPrefix] = useState([]);
  const [customerSegment, setCustomerSegment] = useState([]);
  const [customerGroup, setCustomerGroup] = useState([]);

  const handleSelectCategory = (e) => {
    console.log(e);
    setSelectedCategory(e);
  };
  const handleSelectSubService = (serviceName) => {
    setSelectedSubService(serviceName);
  };

  function getStyle(component) {
    return {
      mx: 1,
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

  function Services() {
    return (
      <div className="card p-4 mt-5" style={{ background: "#D0E1EF" }}>
        {/* <div className="p-4 mt-4"> */}
        <h5 className="font-weight-600 mb-0">Recommended Services</h5>
        {/* <p className="mb-0">
                <b>
                  Amet minim molit non deserunt ullamco est sit alique dolor do amet
                  sint. Velit officia consequat duis enim velit molit. Exercitation
                </b>
              </p> */}
        {/* </div> */}
        <div className="contain-slider my-4">
          <OwlCarousel className="owl-theme" loop nav {...OWL_CAROUSEL_OPTIONS}>
            {recommendedServices.length !== 0 &&
              recommendedServices.map((serviceData, i) => (
                <div className="item border" style={{ height: "70%" }} key={i}>
                  <Typography fontSize={16} variant={"h6"}>
                    {serviceData.name}
                  </Typography>
                  <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                    {serviceData.description.length !== 0 &&
                      serviceData.description.map((desc, j) => (
                        <li
                          className="mt-3"
                          style={{ listStyle: "disc", fontSize: 13 }}
                          key={i + "-" + j}
                        >
                          {desc}
                        </li>
                      ))}
                  </ul>
                  <Divider />
                  <Stack
                    direction="row"
                    spacing={3}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <h4 className="text-red mt-3">
                      <b>${serviceData.price}</b>
                    </h4>
                  </Stack>
                </div>
              ))}
            {/* <div className="item border" style={{ height: "70%" }}>
              <Typography fontSize={16} variant={"h6"}>
                CV agreement
              </Typography>
              <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Cover for all models of the fleet starting from the base model
                </li>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Periodic maintenance triggered every 3 months
                </li>
              </ul>
              <Divider />
              <Stack
                direction="row"
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
              >
                <h4 className="text-red mt-3">
                  <b>$20,000</b>
                </h4>
              </Stack>
            </div>
            <div className="item border" style={{ height: "70%" }}>
              <Typography fontSize={16} variant={"h6"}>
                Maintenance Service
              </Typography>
              <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Cover for all models of the fleet starting from the base model
                </li>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Periodic maintenance triggered every 3 months
                </li>
              </ul>
              <Divider />
              <Stack
                direction="row"
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
              >
                <h4 className="text-red mt-3">
                  <b>$20,000</b>
                </h4>
              </Stack>
            </div>
            <div className="item border" style={{ height: "70%" }}>
              <Typography fontSize={16} variant={"h6"}>
                Repair Service
              </Typography>

              <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Cover for all models of the fleet starting from the base model
                </li>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Periodic maintenance triggered every 3 months
                </li>
              </ul>
              <Divider />
              <Stack
                direction="row"
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
              >
                <h4 className="text-red mt-3">
                  <b>$20,000</b>
                </h4>
              </Stack>
            </div>
            <div className="item border" style={{ height: "260px" }}>
              <Typography fontSize={16} variant={"h6"}>
                Repair Services
              </Typography>

              <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Cover for all models of the fleet starting from the base model
                </li>
                <li
                  className="mt-3"
                  style={{ listStyle: "disc", fontSize: 13 }}
                >
                  Periodic maintenance triggered every 3 months
                </li>
              </ul>
              <Divider />
              <Stack
                direction="row"
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
              >
                <h4 className="text-red mt-3">
                  <b>$20,000</b>
                </h4>
              </Stack>
            </div> */}
          </OwlCarousel>
        </div>
      </div>
    );
  }

  const getMakeStyle = (makeData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedMake && makeData.make === selectedMake?.make
          ? "#872FF7"
          : "#FFF",
      color:
        selectedMake && makeData.make === selectedMake?.make ? "#FFFFFF" : "",
      "&:hover": {
        color: "#000",
      },
    };
  };
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

  // Prefix style
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

  // Segment style
  const getSegmentStyle = (segmentData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedSegment && segmentData.segment === selectedSegment?.segment
          ? "#872FF7"
          : "#FFF",
      color:
        selectedSegment && segmentData.segment === selectedSegment?.segment
          ? "#FFFFFF"
          : "",
      "&:hover": {
        color: "#000",
      },
    };
  };

  // Group style
  const getGroupStyle = (groupData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        selectedGroup && selectedGroup === groupData ? "#872FF7" : "#FFF",
      color: selectedGroup && selectedGroup === groupData ? "#FFFFFF" : "",
      "&:hover": {
        color: "#000",
      },
    };
  };

  const handleSelectMake = (row) => {
    setSelectedMake(row);
    setSelectedFamily(null);
    setSelectedModel(null);
    setSelectedPrefix(null);
    setSelectedSegment(null);
    setSelectedGroup(null);
    setSelectedSubService("family");
  };

  const handleFamilySelect = (row) => {
    setSelectedFamily(row);
    setSelectedModel(null);
    setSelectedPrefix(null);
    setSelectedSegment(null);
    setSelectedGroup(null);
    setSelectedSubService("model");
  };

  const handleModelSelect = (row) => {
    setSelectedModel(row);
    setSelectedPrefix(null);
    setSelectedSegment(null);
    setSelectedGroup(null);
    setSelectedSubService("prefix");
  };

  const handlePrefixSelect = (row) => {
    setSelectedPrefix(row);
    setSelectedSegment(null);
    setSelectedGroup(null);
    setSelectedCategory("customer");
    setSelectedSubService("segment");
  };

  const handleSegmentSelect = (row) => {
    console.log("row :: ", row)
    setSelectedSegment(row);
    setSelectedGroup(null);
    setSelectedSubService("group");
  };
  const handleGroupSelect = (row) => {
    setSelectedGroup(row);
  };

  const serviceAttributeChips = () => {};

  // Capatailize the Select Service Title (Make || Modal || Family || Prefix || Job Code || Component Code)
  const capatalizeTitle = (text) => {
    const title = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    if (text === "jobCode") {
      return "Job Code";
    }
    return title;
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
            Service Recommendation
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
            <Grid item xs={12} md={8}>
              <Fragment>
                <Chip
                  variant="outlined"
                  label="Make"
                  size="small"
                  // onClick={(e) => handleSelectSubService("make")}
                  sx={{
                    mr: 1,
                    my: 1,
                    p: 1.7,
                    fontSize: 14,
                    fontWeight: 600,
                    backgroundColor:
                      selectedSubService === "make" || selectedMake
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "make" || selectedMake
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                />
                <KeyboardRightArrowIcon />
                <Chip
                  variant="outlined"
                  label="Family"
                  size="small"
                  onClick={(e) => handleSelectSubService("family")}
                  sx={{
                    mr: 1,
                    my: 1,
                    p: 1.7,
                    fontSize: 14,
                    fontWeight: 600,
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
                  disabled={selectedMake ? false : true}
                />
                <KeyboardRightArrowIcon />
                <Chip
                  variant="outlined"
                  label="Model"
                  size="small"
                  onClick={(e) => handleSelectSubService("model")}
                  sx={{
                    mr: 1,
                    my: 1,
                    p: 1.7,
                    fontSize: 14,
                    fontWeight: 600,
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
                <KeyboardRightArrowIcon />
                <Chip
                  variant="outlined"
                  label="Prefix"
                  size="small"
                  onClick={(e) => handleSelectSubService("prefix")}
                  disabled={selectedModel ? false : true}
                  sx={{
                    mr: 1,
                    my: 1,
                    p: 1.7,
                    fontSize: 14,
                    fontWeight: 600,
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
                <KeyboardRightArrowIcon />
                <Chip
                  variant="outlined"
                  label="Segment"
                  size="small"
                  onClick={(e) => handleSelectSubService("segment")}
                  disabled={selectedPrefix ? false : true}
                  sx={{
                    mr: 1,
                    my: 1,
                    p: 1.7,
                    fontSize: 14,
                    fontWeight: 600,
                    backgroundColor:
                      selectedSubService === "segment" || selectedSegment
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "segment" || selectedSegment
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                />
                <KeyboardRightArrowIcon />
                <Chip
                  variant="outlined"
                  label="Group"
                  size="small"
                  onClick={(e) => handleSelectSubService("group")}
                  disabled={selectedSegment ? false : true}
                  sx={{
                    mr: 1,
                    my: 1,
                    p: 1.7,
                    fontSize: 14,
                    fontWeight: 600,
                    backgroundColor:
                      selectedSubService === "group" || selectedGroup
                        ? "#872FF7"
                        : "#FFF",
                    color:
                      selectedSubService === "group" || selectedGroup
                        ? "#FFFFFF"
                        : "",
                    "&:hover": {
                      backgroundColor: "#6315c7 !important",
                      color: "#FFFFFF",
                    },
                  }}
                />
              </Fragment>
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
                  className={`btn font-weight-400  ${
                    selectedMake?.make
                      ? "text-primary font-size-14"
                      : "font-size-13"
                  }`}
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    paddingX: 0.8,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    // border: 2,
                    border: "1px solid #872ff7",
                    background: "transparent",
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Make
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0">
                    {selectedMake?.make || "Please Select"}
                  </span>
                </Card>
                <Card
                  className={`btn font-weight-400  ${
                    selectedFamily?.family
                      ? "text-primary font-size-14"
                      : "font-size-13"
                  }`}
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    // border: 2,
                    border: "1px solid #872ff7",
                    background: "transparent",
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
                    {selectedFamily?.family || "Please Select"}
                  </span>
                </Card>
                <Card
                  className={`btn font-weight-400  ${
                    selectedModel?.modelNo
                      ? "text-primary font-size-14"
                      : "font-size-13"
                  }`}
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    // border: 2,
                    border: "1px solid #872ff7",
                    background: "transparent",
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
                    {selectedModel?.modelNo || "Please Select"}
                  </span>
                </Card>
                <Card
                  className={`btn font-weight-400  ${
                    selectedPrefix?.prefixNo
                      ? "text-primary font-size-14"
                      : "font-size-13"
                  }`}
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    // border: 2,
                    border: "1px solid #872ff7",
                    background: "transparent",
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
                    {selectedPrefix?.prefixNo || "Please Select"}
                  </span>
                </Card>
                <Card
                  className={`btn font-weight-400  ${
                    selectedSegment?.segment
                      ? "text-primary font-size-14"
                      : "font-size-13"
                  }`}
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    // border: 2,
                    border: "1px solid #872ff7",
                    background: "transparent",
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Segment
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {selectedSegment?.segment || "Please Select"}
                  </span>
                </Card>
                <Card
                  className={`btn font-weight-400  ${
                    selectedGroup ? "text-primary font-size-14" : "font-size-13"
                  }`}
                  variant="outlined"
                  sx={{
                    padding: 0.5,
                    margin: 1,
                    // width: "20%",
                    borderRadius: 3,
                    // border: 2,
                    border: "1px solid #872ff7",
                    background: "transparent",
                  }}
                >
                  <span
                    className="border-0 border-end border-secondary"
                    style={{ borderRight: "2px solid #00000" }}
                  >
                    Group
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {selectedGroup || "Please Select"}
                  </span>
                </Card>
              </Fragment>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container marginX={1}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  margin: 1,
                  marginTop: 1,
                  marginBottom: 0,
                }}
              >
                Select {capatalizeTitle(selectedSubService)} Service
              </Typography>
            </Grid>
            {selectedSubService === "make" &&
              dummyServiceData.length !== 0 &&
              dummyServiceData.map((makeData) => {
                return (
                  <Chip
                    variant="outlined"
                    label={makeData.make}
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSelectMake(makeData)}
                    sx={() => getMakeStyle(makeData)}
                  />
                );
              })}
            {selectedSubService === "family" &&
              selectedMake &&
              Object.keys(selectedMake).length !== 0 &&
              selectedMake?.familyData.map((familyData) => {
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
            {selectedSubService === "segment" &&
              selectedPrefix &&
              Object.keys(selectedPrefix).length !== 0 &&
              selectedPrefix?.segmentAttrubute.map((segmentData, i) => {
                return (
                  <Chip
                    variant="outlined"
                    label={segmentData.segment}
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleSegmentSelect(segmentData)}
                    sx={() => getSegmentStyle(segmentData)}
                  />
                );
              })}
            {selectedSubService === "group" &&
              selectedSegment &&
              Object.keys(selectedSegment).length !== 0 &&
              selectedSegment?.group.map((gropName, i) => {
                return (
                  <Chip
                    variant="outlined"
                    label={gropName}
                    size="small"
                    // deleteIcon={<KeyboardArrowDownIcon />}
                    onClick={(e) => handleGroupSelect(gropName)}
                    sx={() => getGroupStyle(gropName)}
                  />
                );
              })}
          </Grid>
        </Card>
        <Grid item xs={12}>
          {selectedGroup && <Services />}
        </Grid>
      </Grid>
    </div>
  );
}

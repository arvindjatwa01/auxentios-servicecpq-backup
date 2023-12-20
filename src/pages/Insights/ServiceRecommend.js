import { Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardRightArrowIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CheckIcon from "@mui/icons-material/Check";
import OwlCarousel from "react-owl-carousel";
import { useState } from "react";
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
];
export default function ServiceRecommend(props) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");
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
  const handleSelectSubService = (e) => {
    setSelectedSubService(e);
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

  const handleFamilySelect = (row) => {
    setSelectedFamily(row);
    setSelectedModel(null);
    setSelectedPrefix(null);
    setSelectedSegment(null);
    setSelectedGroup(null);
  };

  const handleModelSelect = (row) => {
    setSelectedModel(row);
    setSelectedPrefix(null);
    setSelectedSegment(null);
    setSelectedGroup(null);
  };

  const handlePrefixSelect = (row) => {
    setSelectedPrefix(row);
    setSelectedSegment(null);
    setSelectedGroup(null);
  };

  const handleSegmentSelect = (row) => {
    setSelectedSegment(row);
    setSelectedGroup(null);
  };
  const handleGroupSelect = (row) => {
    setSelectedGroup(row);
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
        <Grid item xs={12}>
          <Chip
            variant="outlined"
            label="Service Attributes"
            size="small"
            onClick={(e) => handleSelectCategory("service")}
            sx={() => getStyle("service")}
            // icon={selectedCategory === "service" ? <CheckIcon color={"#fff"} /> : <></>}
          />
          <KeyboardRightArrowIcon />
          <Chip
            variant="outlined"
            label="Customer Attributes"
            size="small"
            // onDelete={e => handleSelectCategory("customer")}
            onClick={(e) => handleSelectCategory("customer")}
            sx={() => getStyle("customer")}
            // icon={selectedCategory === "customer" ? <CheckIcon color={"#fff"} /> : <></>}
            disabled={selectedPrefix ? false : true}
          />
        </Grid>
        {selectedCategory === "service" && (
          <Grid item xs={12}>
            <Chip
              variant="outlined"
              label="Family"
              size="small"
              // deleteIcon={<KeyboardArrowDownIcon />}
              onClick={(e) => handleSelectSubService("family")}
              // onDelete={e => handleSelectSubService("family")}
              sx={() => getStyle("family")}
            />
            <KeyboardRightArrowIcon />
            <Chip
              variant="outlined"
              label="Model"
              size="small"
              // deleteIcon={<KeyboardArrowDownIcon />}
              onClick={(e) => handleSelectSubService("model")}
              sx={() => getStyle("model")}
              disabled={selectedFamily ? false : true}
            />
            <KeyboardRightArrowIcon />
            <Chip
              variant="outlined"
              label="Prefix"
              size="small"
              // deleteIcon={<KeyboardArrowDownIcon />}
              onClick={(e) => handleSelectSubService("prefix")}
              sx={() => getStyle("prefix")}
              disabled={selectedModel ? false : true}
            />
            <Divider className="mb-2" />
            {selectedSubService === "family" &&
              dummyServiceData.length !== 0 &&
              dummyServiceData.map((familyData) => {
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
          </Grid>
        )}
        {selectedCategory === "customer" && (
          <Grid item xs={12}>
            <Chip
              variant="outlined"
              label="Segment"
              size="small"
              // deleteIcon={<KeyboardArrowDownIcon />}
              onClick={(e) => handleSelectSubService("segment")}
              sx={() => getStyle("segment")}
            />
            <KeyboardRightArrowIcon />
            <Chip
              variant="outlined"
              label="Group"
              size="small"
              // deleteIcon={<KeyboardArrowDownIcon />}
              onClick={(e) => handleSelectSubService("group")}
              sx={() => getStyle("group")}
              disabled={selectedSegment ? false : true}
            />
            <Divider className="mb-2" />
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
        )}
        <Grid item xs={12}>
          {selectedGroup && <Services />}
        </Grid>
      </Grid>
    </div>
  );
}

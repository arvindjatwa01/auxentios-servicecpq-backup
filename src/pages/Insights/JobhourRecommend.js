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
import { Fragment, useCallback, useRef, useState } from "react";
import { jobCodeSearch } from "services/searchServices";
import { getComponentCodeSuggetions } from "services";
import SearchIcon from "@mui/icons-material/Search";

const data = [
  {
    make: "caterpillar",
    make_restdata: [
      {
        family: "BACKHOE LOADERS",
        family_restdata: [
          {
            model: "12G",
            model_restdata: [
              {
                prefix: "61M",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
          {
            model: "12H",
            model_restdata: [
              {
                prefix: "4XM",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
              {
                prefix: "AMZ",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
          {
            model: "12K",
            model_restdata: [
              {
                prefix: "JJA",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
              {
                prefix: "SZP",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
          {
            model: "12M",
            model_restdata: [
              {
                prefix: "B92",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
          {
            model: "140 GC",
            model_restdata: [
              {
                prefix: "W92",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
          {
            model: "140B",
            model_restdata: [
              {
                prefix: "33C",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
          {
            model: "140G",
            model_restdata: [
              {
                prefix: "5MD",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
              {
                prefix: "72V",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
          {
            model: "140H",
            model_restdata: [
              {
                prefix: "5HM",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
              {
                prefix: "9TN",
                prefix_restdata: [
                  { job_code: "10", job_code_restdata: ["1290"] },
                  { job_code: "540", job_code_restdata: ["7501", "753S"] },
                  { job_code: "56", job_code_restdata: ["7000"] },
                  { job_code: "58", job_code_restdata: ["7000"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const defaultRecords = [
  {
    make: "caterpillar",
    make_restdata: [
      {
        family: "MOTOR GRADERS",
        family_restdata: [
          {
            model: "160H",
            model_restdata: [
              {
                prefixNo: "XZK",
                jobCodes: [
                  {
                    job_code: "JB0345",
                    job_code_restdata: [
                      {
                        component_code: "1562",
                        jobHours: 13,
                      },
                      {
                        component_code: "1563",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    job_code: "JB0346",
                    job_code_restdata: [
                      {
                        component_code: "1564",
                        jobHours: 18,
                      },
                      {
                        component_code: "1565",
                        jobHours: 12,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: "120K",
            model_restdata: [
              {
                prefix: "SZZ",
                prefix_restdata: [
                  {
                    job_code: "JB0345",
                    job_code_restdata: [
                      {
                        component_code: "1562",
                        jobHours: 13,
                      },
                      {
                        component_code: "1563",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    job_code: "JB0347",
                    job_code_restdata: [
                      {
                        component_code: "1545",
                        jobHours: 8,
                      },
                      {
                        component_code: "1565",
                        jobHours: 14,
                      },
                    ],
                  },
                ],
              },
              {
                prefix: "SZS",
                prefix_restdata: [
                  {
                    job_code: "JB0345",
                    job_code_restdata: [
                      {
                        component_code: "1562",
                        jobHours: 13,
                      },
                      {
                        component_code: "1563",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    job_code: "JB0349",
                    job_code_restdata: [
                      {
                        component_code: "1560",
                        jobHours: 8,
                      },
                      {
                        component_code: "1569",
                        jobHours: 12,
                      },
                    ],
                  },
                ],
              },
              {
                prefix: "SZN",
                prefix_restdata: [
                  {
                    job_code: "JB0345",
                    job_code_restdata: [
                      {
                        component_code: "1562",
                        jobHours: 13,
                      },
                      {
                        component_code: "1563",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    job_code: "JB0349",
                    job_code_restdata: [
                      {
                        component_code: "7184",
                        jobHours: 7,
                      },
                      {
                        component_code: "7185",
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
        family_restdata: [
          {
            model: "320D2",
            model_restdata: [
              {
                prefix: "TMF",
                prefix_restdata: [
                  {
                    job_code: "JB0353",
                    job_code_restdata: [
                      {
                        component_code: "7187",
                        jobHours: 12,
                      },
                      {
                        component_code: "6123",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    job_code: "JB0346",
                    job_code_restdata: [
                      {
                        component_code: "1564",
                        jobHours: 18,
                      },
                      {
                        component_code: "1565",
                        jobHours: 12,
                      },
                    ],
                  },
                ],
              },
              {
                prefix: "TDZ",
                prefix_restdata: [
                  {
                    job_code: "JB0353",
                    job_code_restdata: [
                      {
                        component_code: "7187",
                        jobHours: 12,
                      },
                      {
                        component_code: "6123",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    job_code: "JB0359",
                    job_code_restdata: [
                      {
                        component_code: "1672",
                        jobHours: 6,
                      },
                      {
                        component_code: "1673",
                        jobHours: 15,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: "329D2 L",
            model_restdata: [
              {
                prefix: "THW",
                prefix_restdata: [
                  {
                    job_code: "JB0389",
                    job_code_restdata: [
                      {
                        component_code: "7189",
                        jobHours: 12,
                      },
                      {
                        component_code: "7190",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    job_code: "JB0390",
                    job_code_restdata: [
                      {
                        component_code: "1592",
                        jobHours: 18,
                      },
                      {
                        component_code: "1594",
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
        family_restdata: [
          {
            model: "3516B",
            model_restdata: [
              {
                prefix: "ZAP",
                prefix_restdata: [
                  {
                    jobCode: "JB0353",
                    job_code_restdata: [
                      {
                        component_code: "7187",
                        jobHours: 12,
                      },
                      {
                        component_code: "6123",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    jobCode: "JB0393",
                    job_code_restdata: [
                      {
                        component_code: "7191",
                        jobHours: 8,
                      },
                      {
                        component_code: "7192",
                        jobHours: 12,
                      },
                    ],
                  },
                ],
              },
              {
                prefix: "YBT",
                prefix_restdata: [
                  {
                    jobCode: "JB0353",
                    job_code_restdata: [
                      {
                        component_code: "7187",
                        jobHours: 12,
                      },
                      {
                        component_code: "6123",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    jobCode: "JB0394",
                    job_code_restdata: [
                      {
                        component_code: "7194",
                        jobHours: 10,
                      },
                      {
                        component_code: "7188",
                        jobHours: 17,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: "C15",
            model_restdata: [
              {
                prefix: "XP8",
                prefix_restdata: [
                  {
                    jobCode: "JB0339",
                    job_code_restdata: [
                      {
                        component_code: "7120",
                        jobHours: 8,
                      },
                      {
                        component_code: "7123",
                        jobHours: 11,
                      },
                    ],
                  },
                  {
                    jobCode: "JB0340",
                    job_code_restdata: [
                      {
                        component_code: "7129",
                        jobHours: 8,
                      },
                      {
                        component_code: "7131",
                        jobHours: 11,
                      },
                    ],
                  },
                ],
              },
              {
                prefix: "X4R",
                prefix_restdata: [
                  {
                    jobCode: "JB0310",
                    job_code_restdata: [
                      {
                        component_code: "7134",
                        jobHours: 12,
                      },
                      {
                        component_code: "7189",
                        jobHours: 15,
                      },
                    ],
                  },
                  {
                    jobCode: "JB0335",
                    job_code_restdata: [
                      {
                        component_code: "7135",
                        jobHours: 5,
                      },
                      {
                        component_code: "7136",
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
    ],
  },
];

const reqObj = {
  make: "",
  family: "",
  model: "",
  prefix: "",
  jobCode: "",
  componentCode: "",
};

export default function JobhourRecommend(props) {
  const [selectedCategory, setSelectedCategory] = useState("service");
  const [selectedSubService, setSelectedSubService] = useState("make");
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
  const [inputJobCode, setInputJobCode] = useState("");
  const [inputComponentCode, setInputComponentCode] = useState("");

  const [serviceAttributes, setServiceAttributes] = useState([
    ...defaultRecords,
  ]);
  const [serviceAttributeRecords, setServiceAttributeRecords] = useState([
    ...data,
  ]);

  const [serviceRecord, setServiceRecord] = useState({ ...reqObj });

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

  // Servicce records Chips style
  const getServicesChipsStyle = (subService, selectedData) => {
    return {
      mr: 1,
      my: 1,
      backgroundColor:
        subService === "make" &&
        serviceRecord["make"] &&
        selectedData["make"] === serviceRecord["make"]
          ? "#872FF7"
          : subService === "family" &&
            selectedData["family"] &&
            selectedData["family"] === selectedData["family"]
          ? "#872FF7"
          : subService === "model" &&
            selectedData["model"] &&
            selectedData.modelNo === selectedData["model"]
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
        subService === "make" && make && selectedData.make === make.make
          ? "#FFFFFF"
          : subService === "family" &&
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

  // Select the Service Chip
  const handleSelectService = (serviceName, data) => {
    if (serviceName === "make") {
      setServiceRecord({
        ...reqObj,
        make: data,
      });
      setSelectedSubService("family");
    }
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

  // Capatailize the Select Service Title (Make || Modal || Family || Prefix || Job Code || Component Code)
  const capatalizeTitle = (text) => {
    const title = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    if (text === "jobCode") {
      return "Job Code";
    }
    return title;
  };

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
        subService === "make" && make && selectedData.make === make.make
          ? "#872FF7"
          : subService === "family" &&
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
        subService === "make" && make && selectedData.make === make.make
          ? "#FFFFFF"
          : subService === "family" &&
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
    if (serviceName === "make") {
      setMake(row);
      setSelectedFamily(null);
      setSelectedModel(null);
      setSelectedPrefix(null);
      setSelectedJobCode(null);
      setSelectedComponentCode(null);
      setJobCode("");
      setComponentCode("");
      setSearchJobCode([]);
      setSearchComponentCodes([]);
      setSelectedSubService("family");
    } else if (serviceName === "family") {
      setSelectedFamily(row);
      setSelectedModel(null);
      setSelectedPrefix(null);
      setSelectedJobCode(null);
      setSelectedComponentCode(null);
      setJobCode("");
      setComponentCode("");
      setSelectedSubService("model");
    } else if (serviceName === "model") {
      setSelectedModel(row);
      setSelectedPrefix(null);
      setSelectedJobCode(null);
      setSelectedComponentCode(null);
      setJobCode("");
      setComponentCode("");
      setSelectedSubService("prefix");
    } else if (serviceName === "prefix") {
      setSelectedPrefix(row);
      setSelectedJobCode(null);
      setSelectedComponentCode(null);
      setJobCode("");
      setComponentCode("");
      setSelectedSubService("jobCode");
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
    setInputJobCode(row.jobCode);
    setComponentCode("");
    // setSearchJobCodeResults([row.jobCode])
    setSelectedComponentCode(null);
    setSearchJobCode([]);
    setSearchComponentCodes([]);
    setInputComponentCode("");
  };

  const handleSelectComponentCode = (row) => {
    setSelectedComponentCode(row);
    setJobHours(row.jobHours);
    setComponentCode({
      componentCode: row.componentCode,
      description: row.componentCode,
    });
    setInputComponentCode(row.componentCode);
  };

  const handleSearchJobCode = (e) => {
    const { value } = e.target;
    handleSelectSubService("jobCode");
    if (selectedPrefix && Object.keys(selectedPrefix).length !== 0) {
      const result = selectedPrefix?.jobCodes.filter((obj) =>
        obj.jobCode.toLowerCase().includes(value.toLowerCase())
      );

      console.log("result :: ", result);
      setSearchJobCode(result);
      setSelectedJobCode(null);
    }
    setInputJobCode(e.target.value);
  };

  const handleSearchComponentCode = (e) => {
    const { value } = e.target;
    handleSelectSubService("componentCode");
    setInputComponentCode(value);
    if (selectedJobCode && Object.keys(selectedJobCode).length !== 0) {
      const result = selectedJobCode?.componentData.filter((obj) =>
        obj.componentCode.toLowerCase().includes(value.toLowerCase())
      );
      setSearchComponentCodes(result);
    }
  };

  const viewServiceAttributeRecords = useCallback(() => {
    if (selectedSubService === "make") {
    } else if (
      selectedSubService === "family" &&
      defaultServiceAttributeValue.length !== 0
    ) {
    } else if (
      selectedSubService === "model" &&
      Object.keys(selectedFamily).length !== 0
    ) {
    } else if (
      selectedSubService === "prefix" &&
      Object.keys(selectedModel).length !== 0
    ) {
      selectedModel?.prefix.map((prefixData, i) => (
        <Chip
          variant="outlined"
          label={prefixData.prefixNo}
          size="small"
          // deleteIcon={<KeyboardArrowDownIcon />}
          onClick={(e) => handlePrefixSelect(prefixData)}
          sx={() => getListDataStyle("prefix", prefixData)}
          // key={`${prefix_restdata}`}
        />
      ));
    }
    {
      selectedSubService === "family" &&
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
        });
    }
    {
      selectedSubService === "model" &&
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
        });
    }
    {
      selectedSubService === "prefix" &&
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
        });
    }
  }, [selectedSubService]);

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
                    p: 1.7,
                    fontSize: 14,
                    fontWeight: 600,
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
                  disabled={make ? false : true}
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
                    make?.make ? "text-primary font-size-14" : "font-size-13"
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
                  <span className="ml-0">{make?.make || "Please Select"}</span>
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
                    jobCode?.jobCode
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
                    Job Code
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {jobCode?.jobCode || "Please Select"}
                  </span>
                </Card>
                <Card
                  className={`btn font-weight-400  ${
                    componentCode?.componentCode
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
                    Component Code
                  </span>
                  <span className="mx-2">|</span>
                  <span className="ml-0 pr-2">
                    {componentCode?.componentCode || "Please Select"}
                  </span>
                </Card>
              </Fragment>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container marginX={1}>
            <Grid item xs={12} md={5}>
              <Grid item xs={12}>
                <Fragment>
                  <Chip
                    variant="outlined"
                    label="Job Code"
                    size="small"
                    onClick={(e) => handleSelectSubService("jobCode")}
                    sx={{
                      mr: 1,
                      my: 1,
                      p: 1.7,
                      fontSize: 14,
                      fontWeight: 600,
                      backgroundColor:
                        selectedSubService === "jobCode" || jobCode
                          ? "#872FF7"
                          : "#FFF",
                      color:
                        selectedSubService === "jobCode" || jobCode
                          ? "#FFFFFF"
                          : "",
                      "&:hover": {
                        backgroundColor: "#6315c7 !important",
                        color: "#FFFFFF",
                      },
                    }}
                    disabled={selectedPrefix ? false : true}
                  />
                  <KeyboardArrowDownIcon />
                  <Chip
                    variant="outlined"
                    label="Component Code"
                    size="small"
                    onClick={(e) => handleSelectSubService("componentCode")}
                    sx={{
                      mr: 1,
                      my: 1,
                      p: 1.7,
                      fontSize: 14,
                      fontWeight: 600,
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
                    disabled={jobCode ? false : true}
                  />
                </Fragment>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {selectedSubService === "jobCode" ||
              selectedSubService === "componentCode" ? (
                <>
                  {selectedSubService === "jobCode" && (
                    <div class="input-group icons border-radius-10 border-primary overflow-hidden my-3 p-0">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text bg-transparent border-0 pr-0 "
                          id="basic-addon1"
                        >
                          <SearchIcon />
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Search Job Code"
                        name="jobCode"
                        class="form-control search-form-control"
                        value={inputJobCode}
                        onChange={handleSearchJobCode}
                        disabled={!selectedPrefix}
                        readOnly={!selectedPrefix}
                      />
                    </div>
                  )}
                  {selectedSubService === "componentCode" && (
                    <div class="input-group icons border-radius-10 border-primary overflow-hidden my-3 p-0">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text bg-transparent border-0 pr-0 "
                          id="basic-addon1"
                        >
                          <SearchIcon />
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Search Job Code"
                        name="jobCode"
                        class="form-control search-form-control"
                        value={inputComponentCode}
                        onChange={handleSearchComponentCode}
                        disabled={!selectedJobCode}
                        readOnly={!selectedJobCode}
                      />
                    </div>
                  )}
                  <Grid item xs={12}>
                    {selectedSubService === "jobCode" &&
                      !selectedJobCode &&
                      inputJobCode.length !== 0 &&
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

                    {selectedSubService === "jobCode" &&
                      inputJobCode.length === 0 &&
                      selectedPrefix &&
                      Object.keys(selectedPrefix).length !== 0 &&
                      selectedPrefix?.jobCodes.map((jobCodeData, i) => {
                        return (
                          <Chip
                            variant="outlined"
                            label={jobCodeData.jobCode}
                            size="small"
                            onClick={(e) => handleSelectJobCode(jobCodeData)}
                            sx={() => getListDataStyle("jobCode", jobCodeData)}
                          />
                        );
                      })}

                    {selectedSubService === "componentCode" &&
                      searchComponentCodes.length !== 0 &&
                      searchComponentCodes.map((component, i) => (
                        <Chip
                          variant="outlined"
                          label={component.componentCode}
                          size="small"
                          // deleteIcon={<KeyboardArrowDownIcon />}
                          onClick={(e) => handleSelectComponentCode(component)}
                          sx={() =>
                            getListDataStyle("componentCode", component)
                          }
                          key={i}
                        />
                      ))}

                    {selectedSubService === "componentCode" &&
                      inputComponentCode.length === 0 &&
                      searchComponentCodes.length === 0 &&
                      selectedJobCode &&
                      Object.keys(selectedJobCode).length !== 0 &&
                      selectedJobCode?.componentData.map((component, i) => {
                        return (
                          <Chip
                            variant="outlined"
                            label={component.componentCode}
                            size="small"
                            // deleteIcon={<KeyboardArrowDownIcon />}
                            onClick={(e) =>
                              handleSelectComponentCode(component)
                            }
                            sx={() =>
                              getListDataStyle("componentCode", component)
                            }
                          />
                        );
                      })}
                  </Grid>
                </>
              ) : (
                <>
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
                  {/* {selectedSubService === "make" &&
                    serviceAttributeRecords.length !== 0 &&
                    serviceAttributeRecords.map((makeService, i) => (
                      <Chip
                        key={`make-${makeService["make"]}-${i}`}
                        variant="outlined"
                        label={makeService["make"]}
                        size="small"
                        sx={() => getServicesChipsStyle("make", makeService)}
                        onClick={() => handleSelectService("make", makeService)}
                      />
                    ))} */}
                  {selectedSubService === "make" &&
                    serviceAttributes.length !== 0 &&
                    serviceAttributes.map((makeData, i) => (
                      <Chip
                        variant="outlined"
                        label={makeData.make}
                        size="small"
                        // deleteIcon={<KeyboardArrowDownIcon />}
                        onClick={(e) =>
                          handleSelectServiceAttributes("make", makeData)
                        }
                        sx={() => getListDataStyle("make", makeData)}
                        key={`make-${makeData.make}-${i}`}
                      />
                    ))}
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
                </>
              )}
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
              {/* {selectedSubService === "componentCode" &&
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
                })} */}
            </Grid>
            <Grid item xs={1}>
              <Divider orientation="vertical" sx={{ mx: 1 }} />
            </Grid>
            <Grid item xs={12} md={6}>
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

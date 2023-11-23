import { Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import OwlCarousel from 'react-owl-carousel'
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

        }
    },
};
export default function ServiceRecommend(props) {
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedSubService, setSelectedSubService] = useState("")
    const [family, setFamily] = useState([]);
    const [model, setModel] = useState([]);
    const [prefix, setPrefix] = useState([]);
    const [customerSegment, setCustomerSegment] = useState([]);
    const [customerGroup, setCustomerGroup] = useState([]);

    const handleSelectCategory = (e) => {
        console.log(e)
        setSelectedCategory(e)
    }
    const handleSelectSubService = (e) => {
        setSelectedSubService(e)
    }
    function getStyle(component) {
        return (
            {
                mx: 1,
                my: 1,
                backgroundColor: selectedSubService === component || selectedCategory === component ? '#872FF7' : '#FFF',
                color: selectedSubService === component || selectedCategory === component ? '#FFFFFF' : "",
                "&:hover": {
                    color: '#000'
                }
            }
        )
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
                        <div className="item border" style={{ height: "70%" }}>
                            <Typography fontSize={16} variant={"h6"}>
                                Repair Services
                            </Typography>
                            <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Cover for all models of the fleet starting from the base model
                                </li>
                                <li className="mt-3" style={{ listStyle: "disc" }}>
                                    Periodic maintenance triggered every 3 months
                                </li>
                            </ul>
                            <Divider />
                            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                                <h4 className="text-red mt-3">
                                    <b>$20,000</b>
                                </h4>
                            </Stack>
                        </div>
                        <div className="item border" style={{ height: "70%" }}>
                            <Typography fontSize={16} variant={"h6"}>CV agreement</Typography>
                            <ul className="mt-3" style={{ paddingLeft: "20px" }}>
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Cover for all models of the fleet starting from the base model
                                </li>
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Periodic maintenance triggered every 3 months
                                </li>
                            </ul>
                            <Divider />
                            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
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
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Cover for all models of the fleet starting from the base model
                                </li>
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Periodic maintenance triggered every 3 months
                                </li>
                            </ul>
                            <Divider />
                            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
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
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Cover for all models of the fleet starting from the base model
                                </li>
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Periodic maintenance triggered every 3 months
                                </li>
                            </ul>
                            <Divider />
                            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
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
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Cover for all models of the fleet starting from the base model
                                </li>
                                <li className="mt-3" style={{ listStyle: "disc", fontSize: 13 }}>
                                    Periodic maintenance triggered every 3 months
                                </li>
                            </ul>
                            <Divider />
                            <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center">
                                <h4 className="text-red mt-3">
                                    <b>$20,000</b>
                                </h4>
                            </Stack>
                        </div>
                    </OwlCarousel>
                </div>
            </div>
        );
    }


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
                    <Chip variant="outlined"
                        label="Service Attributes"
                        size="small"
                        onClick={e => handleSelectCategory("service")}
                        sx={() => getStyle("service")}
                    // icon={selectedCategory === "service" ? <CheckIcon color={"#fff"} /> : <></>}
                    />
                    <Chip variant="outlined"
                        label="Customer Attributes"
                        size="small"
                        // onDelete={e => handleSelectCategory("customer")}
                        onClick={e => handleSelectCategory("customer")}
                        sx={() => getStyle("customer")}
                    // icon={selectedCategory === "customer" ? <CheckIcon color={"#fff"} /> : <></>}
                    />
                </Grid>
                {selectedCategory === "service" &&
                    <Grid item xs={12}>
                        <Chip variant="outlined"
                            label="Family"
                            size="small"
                            // deleteIcon={<KeyboardArrowDownIcon />}
                            onClick={e => handleSelectSubService("family")}
                            // onDelete={e => handleSelectSubService("family")}
                            sx={() => getStyle("family")}
                        />
                        <Chip variant="outlined"
                            label="Model"
                            size="small"
                            // deleteIcon={<KeyboardArrowDownIcon />}
                            onClick={e => handleSelectSubService("model")}
                            sx={() => getStyle("model")}
                        />
                        <Chip variant="outlined"
                            label="Prefix"
                            size="small"
                            // deleteIcon={<KeyboardArrowDownIcon />}
                            onClick={e => handleSelectSubService("prefix")}
                            sx={() => getStyle("prefix")}
                        />
                    </Grid>}
                {selectedCategory === "customer" &&
                    <Grid item xs={12}>
                        <Chip variant="outlined"
                            label="Segment"
                            size="small"
                            // deleteIcon={<KeyboardArrowDownIcon />}
                            onClick={e => handleSelectSubService("segment")}
                            sx={() => getStyle("segment")}
                        />
                        <Chip variant="outlined"
                            label="Group"
                            size="small"
                            // deleteIcon={<KeyboardArrowDownIcon />}
                            onClick={e => handleSelectSubService("group")}
                            sx={() => getStyle("group")}
                        />
                    </Grid>}
                <Grid item xs={12}>
                    <Services />
                </Grid>
            </Grid>
        </div>
    )
}


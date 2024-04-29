import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import deleteIcon from "../../assets/icons/svg/delete.svg";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DragHandleIcon from "@mui/icons-material/DragHandle";
const ShoppingCartList = () => {
    const [age, setAge] = React.useState("5");
    const [age1, setAge1] = React.useState("5");
    const [age2, setAge2] = React.useState("5");

    const handleChangedrop = (event) => {
        setAge(event.target.value);
    };
    const handleChangedrop1 = (event) => {
        setAge1(event.target.value);
    };
    const handleChangedrop2 = (event) => {
        setAge2(event.target.value);
    };

    const steps = ["Login", "Find solutions", "Add to cart", "Review", "Order"];
    return (
        <>
            {/* <CommanComponents /> */}
            <div className="content-body" style={{ minHeight: "884px" }}>
                <div class="container-fluid">
                    <div className="padding-custom">
                        <Box className="mt-5" sx={{ width: "100%" }}>
                            <Stepper activeStep={1} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <div className="mt-4">
                            <div className="row">
                                <div className="col-md-9 col-sm-9">
                                    <div
                                        className="card"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <h5 className="mb-0 bg-primary px-4 py-2 text-white">
                                            Shopping Cart
                                        </h5>
                                        <div className="row p-4">
                                            <div className="col-md-6 col-sm-6 card bg-light p-3">
                                                <div className="row mb-0">
                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="d-flex justify-content-between px-2">
                                                            <div>
                                                                <h6 className="">
                                                                    <b>
                                                                        Premium
                                                                        maintenance
                                                                        plan for
                                                                        Grader
                                                                    </b>
                                                                </h6>
                                                                <p className="mt-4">
                                                                    MODEL
                                                                    ABC12345
                                                                </p>
                                                                <div
                                                                    className="mt-4"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm bg-primary text-white mr-3"
                                                                    >
                                                                        Quantity{" "}
                                                                        <KeyboardArrowDownIcon />
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary mr-3"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Remove{" "}
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <h5
                                                                style={{
                                                                    fontSize:
                                                                        "25px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                $38
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-3">
                                                <div className="row mb-0">
                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="d-flex justify-content-between px-2">
                                                            <div>
                                                                <h6 className="">
                                                                    <b>
                                                                        Premium
                                                                        maintenance
                                                                        plan for
                                                                        Grader
                                                                    </b>
                                                                </h6>
                                                                <p className="mt-4">
                                                                    MODEL
                                                                    ABC12345
                                                                </p>
                                                                <div
                                                                    className="mt-4"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm bg-primary text-white mr-3"
                                                                    >
                                                                        Quantity{" "}
                                                                        <KeyboardArrowDownIcon />
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary mr-3"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Remove{" "}
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <h5
                                                                style={{
                                                                    fontSize:
                                                                        "25px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                $38
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-3">
                                                <div className="row mb-0">
                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="d-flex justify-content-between px-2">
                                                            <div>
                                                                <h6 className="">
                                                                    <b>
                                                                        Premium
                                                                        maintenance
                                                                        plan for
                                                                        Grader
                                                                    </b>
                                                                </h6>
                                                                <p className="mt-4">
                                                                    MODEL
                                                                    ABC12345
                                                                </p>
                                                                <div
                                                                    className="mt-4"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm bg-primary text-white mr-3"
                                                                    >
                                                                        Quantity{" "}
                                                                        <KeyboardArrowDownIcon />
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary mr-3"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Remove{" "}
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <h5
                                                                style={{
                                                                    fontSize:
                                                                        "25px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                $38
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-3">
                                                <div className="row mb-0">
                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="d-flex justify-content-between px-2">
                                                            <div>
                                                                <h6 className="">
                                                                    <b>
                                                                        Premium
                                                                        maintenance
                                                                        plan for
                                                                        Grader
                                                                    </b>
                                                                </h6>
                                                                <p className="mt-4">
                                                                    MODEL
                                                                    ABC12345
                                                                </p>
                                                                <div
                                                                    className="mt-4"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm bg-primary text-white mr-3"
                                                                    >
                                                                        Quantity{" "}
                                                                        <KeyboardArrowDownIcon />
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary mr-3"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Remove{" "}
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <h5
                                                                style={{
                                                                    fontSize:
                                                                        "25px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                $38
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-3">
                                                <div className="row mb-0">
                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="d-flex justify-content-between px-2">
                                                            <div>
                                                                <h6 className="">
                                                                    <b>
                                                                        Premium
                                                                        maintenance
                                                                        plan for
                                                                        Grader
                                                                    </b>
                                                                </h6>
                                                                <p className="mt-4">
                                                                    MODEL
                                                                    ABC12345
                                                                </p>
                                                                <div
                                                                    className="mt-4"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm bg-primary text-white mr-3"
                                                                    >
                                                                        Quantity{" "}
                                                                        <KeyboardArrowDownIcon />
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary mr-3"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Remove{" "}
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <h5
                                                                style={{
                                                                    fontSize:
                                                                        "25px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                $38
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-3">
                                                <div className="row mb-0">
                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9 col-sm-9">
                                                        <div className="d-flex justify-content-between px-2">
                                                            <div>
                                                                <h6 className="">
                                                                    <b>
                                                                        Premium
                                                                        maintenance
                                                                        plan for
                                                                        Grader
                                                                    </b>
                                                                </h6>
                                                                <p className="mt-4">
                                                                    MODEL
                                                                    ABC12345
                                                                </p>
                                                                <div
                                                                    className="mt-4"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm bg-primary text-white mr-3"
                                                                    >
                                                                        Quantity{" "}
                                                                        <KeyboardArrowDownIcon />
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary mr-3"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Remove{" "}
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="btn-sm text-primary"
                                                                        style={{
                                                                            border: "1px solid #872ff7",
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <h5
                                                                style={{
                                                                    fontSize:
                                                                        "25px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                $38
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6 col-sm-6 card bg-light p-4">
                                                <div className="row">
                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <h6 className="">
                                                            <b>
                                                                Premium
                                                                maintenance plan
                                                                for Grader
                                                            </b>
                                                        </h6>
                                                        <p className="mt-4">
                                                            MODEL ABC12345
                                                        </p>
                                                        <div
                                                            className="mt-4"
                                                            style={{
                                                                display: "flex",
                                                            }}
                                                        >
                                                            <a
                                                                href="#"
                                                                className="btn-sm bg-primary text-white mr-3"
                                                            >
                                                                Quantity{" "}
                                                                <KeyboardArrowDownIcon />
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary mr-3"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Remove{" "}
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Edit
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
                                                        <h5
                                                            style={{
                                                                fontSize:
                                                                    "25px",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            $38
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <h6 className="">
                                                            <b>
                                                                Premium
                                                                maintenance plan
                                                                for Grader
                                                            </b>
                                                        </h6>
                                                        <p className="mt-4">
                                                            MODEL ABC12345
                                                        </p>
                                                        <div
                                                            className="mt-4"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            <a
                                                                href="#"
                                                                className="btn-sm bg-primary text-white mr-3"
                                                            >
                                                                Quantity{" "}
                                                                <KeyboardArrowDownIcon />
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary mr-3"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Remove{" "}
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Edit{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
                                                        <h5
                                                            style={{
                                                                fontSize:
                                                                    "25px",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            $38
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <h6 className="">
                                                            <b>
                                                                Premium
                                                                maintenance plan
                                                                for Grader
                                                            </b>
                                                        </h6>
                                                        <p className="mt-4">
                                                            MODEL ABC12345
                                                        </p>
                                                        <div
                                                            className="mt-4"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            <a
                                                                href="#"
                                                                className="btn-sm bg-primary text-white mr-3"
                                                            >
                                                                Quantity{" "}
                                                                <KeyboardArrowDownIcon />
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary mr-3"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Remove{" "}
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Edit{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
                                                        <h5
                                                            style={{
                                                                fontSize:
                                                                    "25px",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            $38
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <h6 className="">
                                                            <b>
                                                                Premium
                                                                maintenance plan
                                                                for Grader
                                                            </b>
                                                        </h6>
                                                        <p className="mt-4">
                                                            MODEL ABC12345
                                                        </p>
                                                        <div
                                                            className="mt-4"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            <a
                                                                href="#"
                                                                className="btn-sm bg-primary text-white mr-3"
                                                            >
                                                                Quantity{" "}
                                                                <KeyboardArrowDownIcon />
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary mr-3"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Remove{" "}
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Edit{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
                                                        <h5
                                                            style={{
                                                                fontSize:
                                                                    "25px",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            $38
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <h6 className="">
                                                            <b>
                                                                Premium
                                                                maintenance plan
                                                                for Grader
                                                            </b>
                                                        </h6>
                                                        <p className="mt-4">
                                                            MODEL ABC12345
                                                        </p>
                                                        <div
                                                            className="mt-4"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            <a
                                                                href="#"
                                                                className="btn-sm bg-primary text-white mr-3"
                                                            >
                                                                Quantity{" "}
                                                                <KeyboardArrowDownIcon />
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary mr-3"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Remove{" "}
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Edit{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
                                                        <h5
                                                            style={{
                                                                fontSize:
                                                                    "25px",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            $38
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 card bg-light p-4">
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-4">
                                                        <div className="w-100">
                                                            <img src="./assets/images/gray.png"></img>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <h6 className="">
                                                            <b>
                                                                Premium
                                                                maintenance plan
                                                                for Grader
                                                            </b>
                                                        </h6>
                                                        <p className="mt-4">
                                                            MODEL ABC12345
                                                        </p>
                                                        <div
                                                            className="mt-4"
                                                            style={{
                                                                display:
                                                                    "block",
                                                            }}
                                                        >
                                                            <a
                                                                href="#"
                                                                className="btn-sm bg-primary text-white mr-3"
                                                            >
                                                                Quantity{" "}
                                                                <KeyboardArrowDownIcon />
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary mr-3"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Remove{" "}
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="btn-sm text-primary"
                                                                style={{
                                                                    border: "1px solid #872ff7",
                                                                }}
                                                            >
                                                                Edit{" "}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-2">
                                                        <h5
                                                            style={{
                                                                fontSize:
                                                                    "25px",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            $38
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-3">
                                    <div
                                        className="card"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="d-flex align-items-center px-4 py-2 bg-primary">
                                            <h6 className=" text-white mb-0 mr-3">
                                                Your Total Price
                                            </h6>
                                            <h6
                                                className="mb-0 text-white"
                                                style={{ fontSize: "25px" }}
                                            >
                                                $138
                                            </h6>
                                        </div>
                                        <div className="p-4">
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-0">Currency</p>
                                                <h6 className="mb-0">
                                                    <b>USD</b>
                                                </h6>
                                            </div>
                                            <div className="hr"></div>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-0">Price</p>
                                                <h6 className="mb-0">
                                                    <b>$2023.00</b>
                                                </h6>
                                            </div>
                                            <div className="hr"></div>
                                            <div className="py-2 d-flex justify-content-between">
                                                <p className="mb-0">Tax</p>
                                                <h6 className="mb-0">
                                                    <b>$360</b>
                                                </h6>
                                            </div>
                                            <div className="py-2 d-flex align-items-center">
                                                <p className="mb-0 mr-3">
                                                    Redeem Promo Code
                                                </p>
                                                <a className="btn-sm border">
                                                    <b>DWIJVWDOQW</b>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="card"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <h6 className="bg-green px-4 py-2 text-white mb-0">
                                            Choice of Spare Parts
                                        </h6>
                                        <div className="p-4 checkbox-custom2">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultChecked
                                                        />
                                                    }
                                                    label="With Spare Parts"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultUnchecked
                                                        />
                                                    }
                                                    label="Without Spare Parts"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultUnchecked
                                                        />
                                                    }
                                                    label="Only Spare Parts"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div
                                        className="card"
                                        style={{ overflow: "hidden" }}
                                    >
                                        <h6 className="bg-green px-4 py-2 text-white mb-0">
                                            Services
                                        </h6>
                                        <div className="p-4 checkbox-custom2">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultChecked
                                                        />
                                                    }
                                                    label="Change Oil & Filter"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <h5 className="mb-2">Optional Services</h5>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox defaultChecked />
                                            }
                                            label="Air Filter Replacement"
                                        />
                                    </FormGroup>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultChecked
                                                        />
                                                    }
                                                    label="Cabin Air Filter"
                                                />
                                            </FormGroup>
                                        </div>
                                        <div className="col-md-6">
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            defaultChecked
                                                        />
                                                    }
                                                    label="Rotate Tires"
                                                />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <h5 className="mb-0">Includes</h5>
                                    <div className="align-items-start mt-3">
                                        <h6>
                                            <a
                                                href="#"
                                                className="btn-sm bg-gray border text-white mr-2"
                                            >
                                                FREE
                                            </a>{" "}
                                            50 Point Inspection
                                        </h6>
                                        <h6 className="mt-2">
                                            <a
                                                href="#"
                                                className="btn-sm bg-gray border text-white mr-2"
                                            >
                                                Free
                                            </a>{" "}
                                            Service Report
                                        </h6>
                                    </div>
                                    <div className=" d-flex justify-content-between mt-4">
                                        <div>
                                            <a
                                                href="#"
                                                className="btn text-violet "
                                                style={{
                                                    border: "1px solid #872ff7",
                                                }}
                                            >
                                                <b>
                                                    <span className="mr-2">
                                                        +
                                                    </span>
                                                    Add more services
                                                </b>
                                            </a>
                                        </div>
                                        <div>
                                            <a
                                                href="#"
                                                className="btn text-violet"
                                                style={{
                                                    border: "1px solid #872ff7",
                                                }}
                                            >
                                                <b>I Have Parts</b>
                                            </a>
                                        </div>
                                    </div>
                                    <a
                                        href="/AddToCart"
                                        className="my-3 w-100 btn bg-primary text-white"
                                    >
                                        Review
                                    </a>
                                </div>
                            </div>
                            {/* <div>
              <a href="/ReviewOrder" class="btn bg-primary text-white pull-right">Review</a>
              </div> */}
                        </div>
                    </div>
                    <footer className="footer-bottom">
                        <div
                            className="card py-2 px-4 mb-0"
                            style={{ borderRadius: "0" }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex">
                                    <h4 className="mb-0">
                                        <ErrorOutlineIcon className="mr-3" />
                                        Information
                                    </h4>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <div
                                        className="d-block"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <p className="mb-0">SPARE PARTS</p>
                                        <h6 className="mb-0">
                                            <b>$1400</b>
                                        </h6>
                                    </div>
                                    <div
                                        className="d-flex"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <AddIcon />
                                    </div>
                                    <div
                                        className="d-block"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <p className="mb-0">LABOR CHARGE</p>
                                        <h6 className="mb-0">
                                            <b>$600</b>
                                        </h6>
                                    </div>
                                    <div
                                        className="d-flex"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <AddIcon />
                                    </div>
                                    <div
                                        className="d-block"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <p className="mb-0">MISC.</p>
                                        <h6 className="mb-0">
                                            <b>$23</b>
                                        </h6>
                                    </div>
                                    <div
                                        className="d-flex"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <RemoveIcon />
                                    </div>
                                    <div
                                        className="d-block"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <p className="mb-0">DISCOUNT</p>
                                        <h6 className="mb-0">
                                            <b>$80.00</b>
                                        </h6>
                                    </div>
                                    <div
                                        className="d-flex"
                                        style={{ marginRight: "30px" }}
                                    >
                                        <DragHandleIcon />
                                    </div>
                                    <div className="d-block">
                                        <p className="mb-0">TOTAL</p>
                                        <h6
                                            className="mb-0 text-primary"
                                            style={{ fontSize: "25px" }}
                                        >
                                            <b>$1400</b>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default ShoppingCartList;

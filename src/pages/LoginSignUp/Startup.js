import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import auxentionlogo from "../../assets/icons/png/auxentionlogo.png";
import erroricon from "../../assets/icons/png/error.png";
import { signIn } from "../../services/index";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpActions } from "../../features/auth/signUpSlice";
import type { SignUpPayload } from "../../features/auth/signUpSlice";
import { ToastMessageHandler } from "../../components/Common/ToastMessageHandler";
import { SignUp } from "./SignUp";
import { authActions } from "../../features/auth/authSlice";
import { history } from "../../utils";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Startup = () => {
    // let auth = useAuth();
    const steps = ["Register", "Verification", "Get Started"];

    const dispatch = useDispatch();
    const result = useSelector((state) => state.signUp);
    console.log("result of user ", result.activeStep)
    const { search } = useLocation();
    const queryString = new URLSearchParams(search);


    //   console.log("query String of login",queryString.get('uuid'));

    const [signUpInputData, setSignUpInputData] = useState({
        firstName: "",
        lastName: "",
        workEmail: "",
        password: "",
    });
    const [signInInputData, setSignInInputData] = useState({
        emailId: "",
        password: "",
    });

    const handleStep = (step) => {
        // setActiveStep(step);
    };

    const handleLogin = () => {
        var dict = {
            emailId: signInInputData.emailId,
            password: signInInputData.password,
        };
        // signIn(dict).then((res) => {
        //     localStorage.setItem('loginAuth', JSON.stringify(res));
        //     window.location.href = "/"
        // }).catch((err) => {
        //     console.log(err)
        // })
        console.log("signInResponse");

        dispatch(authActions.login(dict));
        // history.push('/')
    };

    const handleSendVerification = () => {
        dispatch(signUpActions.verifyEmail());
    };
    useEffect(() => {
        const uuid = queryString.get('uuid')

        // console.log("result.isLoggedIn in useEffect", result.isLoggedIn)
        // const uuid = result.isLoggedIn
        if (uuid) {
            dispatch(signUpActions.verifyEmail());
        }
    },[]);

    return (
        <div className="content-body" style={{ minHeight: "884px" }}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8 col-sm-12 mx-auto">
                        <Box sx={{ width: "100%" }}>
                            <Stepper activeStep={result.activeStep} alternativeLabel>
                                {steps.map((label, index) => (
                                    <Step key={label} onClick={() => handleStep(index)}>
                                        <StepButton color="inherit">{label}</StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </div>
                </div>
                <div className="card overflow-hidden mt-5">
                    {result.activeStep == 2 ? (
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        <img src={auxentionlogo}></img>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            <b>To:</b>our users
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            <b>Subject:</b> Welcome to <b>Auxentios</b>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            Need an Auxentios account?
                                            <br />
                                            <a
                                                // onClick={() => setActiveStep(0)}
                                                className="text-white text-decoration-line text-underline-offset cursor"
                                            >
                                                Create an account
                                                <span className="ml-2">
                                                    <img style={{ width: "25px" }} src={erroricon}></img>
                                                </span>
                                            </a>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            Forgot your user id?
                                            <br />
                                            <a
                                                href="/reset"
                                                className="text-white text-decoration-line text-underline-offset"
                                            >
                                                Forgot your password?
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8">
                                <div className="pt-5">
                                    <h4 className="ml-3">Log In</h4>
                                    <div className="row m-0">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-600"
                                                    for="exampleInputEmail1"
                                                >
                                                    USER ID
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control border-radius-10"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <label
                                                    className="text-light-dark font-size-12 font-weight-600"
                                                    for="exampleInputEmail1"
                                                >
                                                    PASSWORD
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control border-radius-10"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Password"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <a
                                                    onClick={handleLogin}
                                                    className="btn bg-violet text-white d-block cursor"
                                                >
                                                    Log in
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <p>Keep me logged in</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {result.activeStep == 1 ? (
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        <img className="w-100" src={auxentionlogo}></img>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            <b>To:</b>our users
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            <b>Subject:</b> Welcome to <b>Auxentios</b>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            Need an Auxentios account?
                                            <br />
                                            <a
                                                href="/LoginComponent"
                                                className="text-white text-decoration-line text-underline-offset"
                                            >
                                                Create an account
                                                <span className="ml-2">
                                                    <img style={{ width: "25px" }} src={erroricon}></img>
                                                </span>
                                            </a>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">
                                            Forgot your user id?
                                            <br />
                                            <a
                                                href="/reset"
                                                className="text-white text-decoration-line text-underline-offset"
                                            >
                                                Forgot your password?
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8">
                                <div className="pt-5 p-3">
                                    <h4 className="ml-3">Verification</h4>
                                    <div className="row m-0">
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                {/* <label
                          className="text-light-dark font-size-12 font-weight-600"
                          for="exampleInputEmail1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control border-radius-10"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Email Address"
                        /> */}
                                                <p>Varification Successfull</p>
                                                <div onClick={() => dispatch(signUpActions.getStarted())} style={{cursor: "pointer"}}>Let's Get Started</div>
                                                {/* <div onClick={}>GetS Started</div> */}
                                                {/* <a href="#">please verify email address using email sent on registered email</a> */}
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            {/* <div className="form-group mt-3">
                                                <a
                                                    //   onClick={handleSendVerification}
                                                    className="btn bg-violet text-white d-block cursor"
                                                >
                                                    Send
                                                </a>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <p>Mail sent to your registered email addrss. Click the url provided in the email to complete registration.</p>
                                    <div className="text-right">
                                        <a href="#" className="btn bg-violet text-white">Click here if already completed</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {result.activeStep == 0 ? (
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        <img src={auxentionlogo}></img>
                                    </div>
                                    <div className="mt-4">
                                        <div>
                                            <img src={erroricon}></img>
                                        </div>
                                        <p className="text-white mt-2">
                                            Register using your work email
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <div>
                                            <img src={erroricon}></img>
                                        </div>
                                        <p className="text-white mt-2">
                                            Your password must be atleast 8 characters long containing
                                            alphabets, numerals, atleast one special character and
                                            atleast one capital letter
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <div>
                                            <img src={erroricon}></img>
                                        </div>
                                        <p className="text-white mt-2">
                                            We will send a verification email to your registerd email
                                            id. Click on the link to validate your email.
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <div>
                                            <img src={erroricon}></img>
                                        </div>
                                        <p className="text-white mt-2">
                                            The email will contain a link to access our product suite.
                                            You can access the product by clciking on the link for 30
                                            days.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8">
                                {/*<div className="pt-5">*/}
                                {/*    <h4 className="ml-3">Sign up</h4>*/}
                                {/*    <div className="row m-0">*/}
                                {/*        <div className="col-md-6 col-sm-6">*/}
                                {/*            <div className="form-group mt-3">*/}
                                {/*                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">FIRST NAME</label>*/}
                                {/*                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="John" value={signUpInputData.firstName} onChange={(e) => setSignUpInputData({*/}
                                {/*                    ...signUpInputData,*/}
                                {/*                    firstName: e.target.value*/}
                                {/*                })} />*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-6 col-sm-6">*/}
                                {/*            <div className="form-group mt-3">*/}
                                {/*                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">LAST NAME</label>*/}
                                {/*                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Doe" value={signUpInputData.lastName} onChange={(e) => setSignUpInputData({*/}
                                {/*                    ...signUpInputData,*/}
                                {/*                    lastName: e.target.value*/}
                                {/*                })} />*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-6 col-sm-6">*/}
                                {/*            <div className="form-group mt-3">*/}
                                {/*                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">WORK EMAIL</label>*/}
                                {/*                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" value={signUpInputData.workEmail} onChange={(e) => setSignUpInputData({*/}
                                {/*                    ...signUpInputData,*/}
                                {/*                    workEmail: e.target.value*/}
                                {/*                })} />*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-12 col-sm-12">*/}
                                {/*            <div className="form-group mt-3">*/}
                                {/*                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">CREATE PASSWORD</label>*/}
                                {/*                <input type="password" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Create Password" value={signUpInputData.password} onChange={(e) => setSignUpInputData({*/}
                                {/*                    ...signUpInputData,*/}
                                {/*                    password: e.target.value*/}
                                {/*                })} />*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-md-12 col-sm-12">*/}
                                {/*            <div className="form-group mt-3">*/}
                                {/*                <a onClick={handleSignUp} className="btn bg-violet text-white d-block cursor">Sign Up</a>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <SignUp id={1} />
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {result.isLoggedIn &&
                result.currentUser &&
                result.currentUser.status === 200 && (
                    <ToastMessageHandler
                        status={200}
                        message={"you have registered successfully!!! \n Please varify Email"}
                    />
                )}
            {result.currentUser && result.currentUser.status === 400 && (
                <ToastMessageHandler
                    status={400}
                    message={"Error While Registering User"}
                />
            )}
            {/*<ToastContainer />*/}
        </div>
    );
};

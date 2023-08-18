import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import auxentionlogo from "../../assets/icons/png/auxentionlogo.png";
import logoIcon from '../../assets/icons/svg/Logo.svg';
// import LoginImage from '../assets/images/1.jpg';
import newLogoIcon from '../../assets/icons/svg/NewLogoIcon.svg';
import newLogoIcon1 from '../../assets/icons/svg/latest-logo.svg';

import erroricon from "../../assets/icons/png/error.png";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpActions } from "../../features/auth/signUpSlice";
import type { SignUpPayload, EmailVerifyPayLoad } from "../../features/auth/signUpSlice";
import { ToastMessageHandler } from "../../components/Common/ToastMessageHandler";
import { authActions } from "../../features/auth/authSlice";
import { history } from "../../utils";
import { useLocation } from "react-router-dom";
import Validator from "../../utils/validator";
import { SignUp } from "./SignUp";
import { Grid } from '@mui/material';
import CustomizedSnackbar from "pages/Common/CustomSnackBar";

export const Startup = () => {
    // let auth = useAuth();
    // const steps = ["Register", "Verification", "Get Started"];
    const [severity, setSeverity] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const handleSnackBarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnack(false);
    };
    // To display the notifications
    const handleSnack = (snackSeverity, snackMessage) => {
        setSnackMessage(snackMessage);
        setSeverity(snackSeverity);
        setOpenSnack(true);
    };
    const [loginErr, setLoginErr] = useState({
        isLoggedIn: false,
        logging: false,
        currentUser: undefined,
    });
    const dispatch = useDispatch();
    const result = useSelector((state) => state.signUp);
    // console.log("result of user ", result.activeStep)

    const LoginRes = useSelector((state) => state.loginSuccess);

    console.log("result of login failed/success : ", LoginRes)
    const { search } = useLocation();
    const queryString = new URLSearchParams(search);

    const [signInInputData, setSignInInputData] = useState({
        emailId: "",
        password: "",
    });

    // const handleStep = (step) => {
    //      setActiveStep(step);
    // };

    const handleLoginInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSignInInputData({
            ...signInInputData,
            [name]: value
        })
        setLoginErr({
            isLoggedIn: false,
            logging: false,
            currentUser: undefined,
        });

    }

    // console.log("object : ", signInInputData);
    const handleLogin = () => {
        var dict = {
            emailId: signInInputData.emailId,
            password: signInInputData.password,
        };

        const validator = new Validator();

        if (!validator.emailValidation(signInInputData.emailId)) {
            handleSnack("error", "Please enter the email address in correct format");
        } else if (!validator.passwordValidation(signInInputData.password)) {
            handleSnack("error", "Please enter the password");
        } else {
            const dispa = dispatch(authActions.login(dict));
            console.log("object ", dispa);
        }
        setLoginErr({
            isLoggedIn: LoginRes.isLoggedIn,
            logging: LoginRes.logging,
            currentUser: LoginRes.currentUser,
        });
        // if (loginErr.currentUser && loginErr.currentUser.status === 500) {
        //     handleSnack('error', "Please enter a valid email id and password")
        //     setLoginErr({
        //         isLoggedIn: false,
        //         logging: false,
        //         currentUser: undefined,
        //     });
        // }

        console.log("signInResponse");
        console.log("dict is : ", dict);
    };

    const handleSendVerification = () => {
        dispatch(signUpActions.verifyEmail());
    };
    const [isShowLoginPassword, setIsShowLoginPassword] = useState(false);

    const togglePassword = () => {
        setIsShowLoginPassword(prevState => !prevState);
    }

    useEffect(() => {
        const uuid = queryString.get('uuid')

        // console.log("result.isLoggedIn in useEffect", result.isLoggedIn)
        // const uuid = result.isLoggedIn
        let dictObject: EmailVerifyPayLoad = {
            uuid: uuid,
            newPassword: "1234"
        }
        if (uuid) {
            dispatch(signUpActions.verifyEmail(dictObject));
        }
    }, []);

    console.log("LoginErr : ", loginErr)

    return (
        <>
            <CustomizedSnackbar
                handleClose={handleSnackBarClose}
                open={openSnack}
                severity={severity}
                message={snackMessage}
            />
            <div style={{ height: '100vh' }}>
                <div className="d-flex justify-content-between h-100">
                    {result.activeStep === 2 ? (
                        <Grid container className="h-100 bg-white">
                            <Grid container item xs={12} md={5} alignItems={'center'}>
                                <div className="bg-violet pt-5 px-5 h-100" style={{ display: 'flex', alignItems: 'center' }} >
                                    <div>
                                        {/* <div className="text-center">
                                        <img src={newLogoIcon} width={"20%"} alt="Logo"></img>
                                    </div> */}
                                        <h2 className="text-white font-weight-600 text-center mt-3">Log In</h2>
                                        <div className="row m-5">
                                            <div className="col-md-12 col-sm-12">
                                                <div className="form-group mt-3 login-input-v-icons">
                                                    <i class="fa fa-user login-v-icon"></i>
                                                    <input
                                                        type="email"
                                                        className="form-control login-field-violet border-radius-10"
                                                        id="loginInputEmail"
                                                        placeholder="Email Address"
                                                        name="emailId"
                                                        value={signInInputData.emailId}
                                                        onChange={handleLoginInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <div className="form-group mt-3 login-input-v-icons">
                                                    <i class="fa fa-lock login-v-icon"></i>
                                                    <input
                                                        type={isShowLoginPassword ? "text" : "password"}
                                                        className="form-control login-field-violet border-radius-10"
                                                        id="loginInputPassword"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={signInInputData.password}
                                                        onChange={handleLoginInput}
                                                    />
                                                    <i onClick={togglePassword} className={`fa ${isShowLoginPassword ? "fa-eye-slash" : "fa-eye"} eye-icon text-white`}></i>
                                                    {LoginRes.currentUser && LoginRes.currentUser.status === 500 && (
                                                        <div class="invlaid-email-password">
                                                            Please enter a valid email or password.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* <div className="row"> */}
                                            <div className="col-md-12 col-sm-12 mt-2 text-right">
                                                <a
                                                    href="/forgot-password"
                                                    className="text-white text-decoration-line text-underline-offset"
                                                >
                                                    Forgot Password?
                                                </a>
                                            </div>
                                            <div className="col-md-12 col-sm-12">
                                                <div className="form-group mt-3">
                                                    <a
                                                        onClick={handleLogin}
                                                        className="btn bg-white d-block cursor text-primary font-weight-600"
                                                        style={{ paddingBlock: 10 }}
                                                    >
                                                        Login
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="col-md-12 col-sm-12 text-center">
                                                <div className="form-group mt-3 text-white">
                                                    <p>Don't have an account? <a
                                                        // onClick={() => setActiveStep(0)}
                                                        onClick={() => dispatch(signUpActions.registration())}
                                                        className="text-white text-decoration-line text-underline-offset cursor"
                                                    >
                                                        Create an account
                                                        {/* <span className="ml-2">
                                                        <img style={{ width: "25px" }} src={erroricon}></img>
                                                    </span> */}
                                                    </a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid container item xs={7} alignItems={'center'}
                                sx={{ display: { xs: "none", md: "block" }, py: 5 }}>
                                <img src={'../assets/images/login.jpg'} width="90%" height="90%" />
                            </Grid>
                        </Grid>
                    ) : (
                        <></>
                    )}
                    {result.activeStep == 1 ? (
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        <img className="w-100" src={newLogoIcon}></img>
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
                          htmlFor="exampleInputEmail1"
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
                                                <div onClick={() => dispatch(signUpActions.getStarted())} style={{ cursor: "pointer" }}>Let's Get Started</div>
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
                    {result.activeStep === 0 ? (
                        <Grid container>
                            <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                                <div className="h-100">
                                    <img src='../assets/images/signup.jpg' width='100%' height='100%' />

                                    {/* <div className="mt-4">
                                        <div>
                                            <img src={erroricon}></img>
                                        </div>
                                        <p className="text-white mt-2">
                                            Already have an account?
                                            <a onClick={() => dispatch(signUpActions.getStarted())} style={{ cursor: "pointer" }}
                                                className="text-white text-decoration-line text-underline-offset cursor"
                                            > Login
                                            </a>
                                        </p>
                                    </div> */}
                                    {/* <div className="mt-4">
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
                                    </div> */}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6} display={'flex'} alignItems={'center'} sx={{ px: 6, backgroundColor: "#ffffff" }}>
                                <SignUp id={1} />
                            </Grid>
                        </Grid>
                    ) : (
                        <></>
                    )}
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
                {/* {LoginRes.currentUser && LoginRes.currentUser.status === 500 && (
                <ToastMessageHandler
                    status={400}
                    message={"Invalid email or password.!!! \n Please try Again"}
                />
            )} */}
                {/*<ToastContainer />*/}
            </div>
        </>
    );
};

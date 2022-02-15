import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import auxentionlogo from '../../assets/icons/png/auxentionlogo.png'
import erroricon from '../../assets/icons/png/error.png'
import { signup, signIn } from '../../services/index'
export function Startup() {
    // let auth = useAuth();
    const steps = [
        'Register',
        'Verification',
        'Get Started',
    ];

    const [signUpInputData, setSignUpInputData] = useState({
        firstName: '',
        lastName: '',
        workEmail: '',
        password: ''
    })
    const [signInInputData, setSignInInputData] = useState({
        emailId: '',
        password: ''
    })

    const handleSignUp = () => {
        var dict = {
            "firstName": signUpInputData.firstName,
            "lastName": signUpInputData.lastName,
            "emailId": signUpInputData.workEmail,
            "password": signUpInputData.password
        }
        const signUpResponse = signup(dict);
        console.log(signUpResponse)
    }
    const handleSignIn = () => {
        var dict = {
            "emailId": signInInputData.emailId,
            "password": signInInputData.password
        }
        const signInResponse = signIn(dict);
        console.log(signInResponse)
    }

    const [activeStep, setActiveStep] = useState(0)

    const handleStep = (step) => {
        setActiveStep(step);
    };

    const handleLogin = () => {
        localStorage.setItem('loginAuth', 'dummy');
        window.location.reload(true)
    }

    return (
        <div className="content-body" style={{ minHeight: '884px' }}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8 col-sm-12 mx-auto">
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} alternativeLabel >
                                {steps.map((label, index) => (
                                    <Step key={label} onClick={() => handleStep(index)}>
                                        <StepButton color="inherit">
                                            {label}
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </div>
                </div>
                <div className="card overflow-hidden mt-5">
                    {activeStep == 2 ?
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        <img src={auxentionlogo}></img>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2"><b>To:</b>our users</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2"><b>Subject:</b> Welcome to <b>Auxentios</b></p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">Need an Auxentios account?<br />
                                            <a onClick={() => setActiveStep(0)} className="text-white text-decoration-line text-underline-offset cursor">Create an account<span className="ml-2"><img style={{ width: '25px' }} src={erroricon}></img></span></a>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">Forgot your user id?<br />
                                            <a href="#" className="text-white text-decoration-line text-underline-offset">Forgot your password?</a>
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
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">USER ID</label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PASSWORD</label>
                                                <input type="password" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <a onClick={handleLogin} className="btn bg-violet text-white d-block cursor">Log in</a>
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
                        </div> : <></>}
                    {activeStep == 0 ?
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        <img src={auxentionlogo}></img>
                                    </div>
                                    <div className="mt-4">
                                        <div><img src={erroricon}></img></div>
                                        <p className="text-white mt-2">Register using your work email</p>
                                    </div>
                                    <div className="mt-4">
                                        <div><img src={erroricon}></img></div>
                                        <p className="text-white mt-2">Your password must be atleast 8 characters long containing alphabets, numerals, atleast one special character and atleast one capital letter</p>
                                    </div>
                                    <div className="mt-4">
                                        <div><img src={erroricon}></img></div>
                                        <p className="text-white mt-2">We will send a verification email to your registerd email id. Click on the link to validate your email.</p>
                                    </div>
                                    <div className="mt-4">
                                        <div><img src={erroricon}></img></div>
                                        <p className="text-white mt-2">The email will contain a link to access our product suite. You can access the product by clciking on the link for 30 days.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8">
                                <div className="pt-5">
                                    <h4 className="ml-3">Sign up</h4>
                                    <div className="row m-0">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group mt-3">
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">FIRST NAME</label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" value={signUpInputData.firstName} onChange={(e) => setSignUpInputData({
                                                    ...signUpInputData,
                                                    firstName: e.target.value
                                                })} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group mt-3">
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">LAST NAME</label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" value={signUpInputData.lastName} onChange={(e) => setSignUpInputData({
                                                    ...signUpInputData,
                                                    lastName: e.target.value
                                                })} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group mt-3">
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">WORK EMAIL</label>
                                                <input type="email" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" value={signUpInputData.workEmail} onChange={(e) => setSignUpInputData({
                                                    ...signUpInputData,
                                                    workEmail: e.target.value
                                                })} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">CREATE PASSWORD</label>
                                                <input type="password" className="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=" Create Password" value={signUpInputData.password} onChange={(e) => setSignUpInputData({
                                                    ...signUpInputData,
                                                    password: e.target.value
                                                })} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3">
                                                <a onClick={handleSignUp} className="btn bg-violet text-white d-block cursor">Sign Up</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>}
                </div>
            </div>
        </div>
    )
}

import React, { useEffect, useState } from "react";
import { Modal, SplitButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link, useHistory, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import auxentionlogo from '../../assets/icons/png/auxentionlogo.png'
import logoIcon from '../../assets/icons/svg/Logo.svg';

import erroricon from '../../assets/icons/png/error.png'
import { signup, signIn } from '../../services/index'
export function ResetPassword() {
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

    const [showSecurity, setShowSecurity] = useState(false)

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
        <>
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container mt-4">
                    <div className="card  overflow-hidden mt-5">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        {/* <img src={auxentionlogo}></img> */}
                                        <img src={logoIcon}></img>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">We’ll email you instructions to reset your password.</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">If you don’t have access to your email anymore, you can try <a href="#" className="text-white text-decoration-line text-underline-offset">account recovery.</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8">
                                <div className="pt-5">
                                    <h4 className="ml-3">Reset your Password</h4>
                                    <div className="row m-0">
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group mt-3">
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">USER ID</label>
                                                <input type="email" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Address" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group mt-3">
                                                <label className="text-light-dark font-size-12 font-weight-600" for="exampleInputEmail1">PASSWORD</label>
                                                <input type="password" class="form-control border-radius-10" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Placeholder (Optional)" />
                                            </div>
                                        </div> <div className="col-md-12 col-sm-12">
                                            <div class="form-group mt-3">
                                                <p> ANSWER <a href="#" className="text-light" onClick={() => setShowSecurity(true)}>SECURITY QUESTIONS</a></p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div class="form-group mt-3">
                                                <a href="#" className="btn bg-violet text-white d-block">Reset Password</a>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div class="form-group mt-3">
                                                <Link to="/login" className="btn bg-secondary text-white d-block">Return To Log In</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showSecurity} onHide={() => setShowSecurity(false)} size="xl"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body className="">
                    <h5 className="d-flex align-items-center mb-0 ">
                        <div className="" style={{ display: 'contents' }}><span className="mr-3" style={{ whiteSpace: 'pre' }}>Security</span></div>
                        <div className="hr"></div>
                    </h5>
                    <div className="mt-2">
                        <h6>Security Question 1</h6>
                        <div className="border-radius-10 border p-3">
                            <p className="mb-0">Question 1 </p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h6>Security Question 2</h6>
                        <div className="border-radius-10 border p-3">
                            <p className="mb-0">Question 2 </p>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h6>Security Question 3</h6>
                        <div className="border-radius-10 border p-3">
                            <p className="mb-0">Question 3 </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

import React, { useEffect, useState } from "react";
import { Modal, SplitButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import auxentionlogo from '../../assets/icons/png/auxentionlogo.png'
import successLogo from "../../assets/images/check.svg"
import erroricon from '../../assets/icons/png/error.png'
import { signup, signIn } from '../../services/index'
export function VerifyEmail(props) {
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

    useEffect(() => {
        console.log(props.match.params.id)
    }, []);


    return (
        <>
            <div className="content-body" style={{ minHeight: '884px' }}>
                <div class="container mt-4">
                    <div className="card  overflow-hidden mt-5">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div className="bg-violet py-4 px-4 h-100">
                                    <div className="text-center">
                                        <img src={auxentionlogo}></img>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">We’ll email you instructions to reset your password.</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">If you don’t have access to your email anymore, <a href="/login" className="text-white text-decoration-line text-underline-offset">click here</a> to sign in
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-8" style={{ textAlign: 'center' }}>
                                <div className="pt-5">
                                    <img width="10%" className="mb-2" src={successLogo}></img>
                                    <h4 className="ml-3">Your Email verification is done</h4>
                                    {/* <div className="row m-0" style={{ justifyContent: 'center' }}>
                                        <div className="col-md-6 col-sm-6">
                                            <div class="form-group mt-3">
                                                <a href="/login" className="btn bg-secondary text-white d-block">Return To Log In</a>
                                            </div>
                                        </div>

                                    </div> */}
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

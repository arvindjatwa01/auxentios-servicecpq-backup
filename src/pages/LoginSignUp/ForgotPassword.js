import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import auxentionlogo from '../../assets/icons/png/auxentionlogo.png'
import logoIcon from '../../assets/icons/svg/Logo.svg';
import newLogoIcon from '../../assets/icons/svg/NewLogoIcon.svg';
import { Grid } from '@mui/material'
import { forgotPassword } from "services/userServices";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
export const ForgotPassword = () => {
    // let auth = useAuth();
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

    const [emailId, setEmailId] = useState('')
    const handleForgotPassword = async () => {
        var dict = { "emailId": emailId }
        await forgotPassword(dict).then(res => {
            handleSnack('success', "A password reset email has been sent to your email address")
        }).catch(err => {
            handleSnack('error', "Error occurred while sending the email!")
        })
    }

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
                    <Grid container className="bg-white">
                        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
                            <Box display="flex" justifyContent="flex-end" className="h-100">
                                {/* <div className="text-center">
                                        <img src={newLogoIcon}></img>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">We’ll email you instructions to reset your password.</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-white mt-2">If you don’t have access to your email anymore, you can try <a href="#" className="text-white text-decoration-line text-underline-offset">account recovery.</a>
                                        </p>
                                    </div> */}
                                <img src={'../assets/images/ResetPassword.svg'} width="90%" height="100%" alt="Reset" />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} container justifyContent={'center'}>
                            <Box className="bg-white h-100" style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: "90%" }}>
                                    <h2 className="text-primary font-weight-600 text-center my-4">Forgot Password?</h2>
                                    <div className="row m-0" >
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3 login-input-icons">
                                                <i class="fa fa-envelope login-icon"></i>
                                                <input
                                                    type="email"
                                                    className="form-control login-field border-radius-10"
                                                    id="loginInputEmail"
                                                    placeholder="Email Address"
                                                    name="emailId"
                                                    value={emailId}
                                                    onChange={(e) => setEmailId(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group mt-3">
                                                <a href={undefined} className="btn bg-violet text-white d-block font-weight-600"
                                                    style={{ paddingBlock: 10 }} onClick={handleForgotPassword}>Send</a>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-6 col-sm-6">
                                            <div class="form-group mt-3">
                                                <Link to="/loginUpdated" className="btn bg-secondary text-white d-block">Return To Log In</Link>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2} className="bg-white" sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>

                        </Grid>
                    </Grid>
                </div>
            </div>

            {/* <Modal show={showSecurity} onHide={() => setShowSecurity(false)} size="xl"
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
            </Modal> */}
        </>

    )
}

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import auxentionlogo from '../../assets/icons/png/auxentionlogo.png'
import logoIcon from '../../assets/icons/svg/Logo.svg';
import newLogoIcon from '../../assets/icons/svg/NewLogoIcon.svg';
import { Grid } from '@mui/material'
import { forgotPassword, resetPassword } from "services/userServices";
import CustomizedSnackbar from "pages/Common/CustomSnackBar";
import { useLocation } from "react-router-dom";

export const ResetPassword = () => {
    // let auth = useAuth();
    const location = useLocation().search;
    const uuid= new URLSearchParams(location).get("uuid");
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
    const [isShowPassword, setIsShowPassword] = useState(false);

    const togglePassword = () => {
      setIsShowPassword(prevState => !prevState);
    }
 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleForgotPassword = async () => {
        var dict = { newPassword: password, uuid };
        if(password !== confirmPassword){
            handleSnack('error', "Confirm password should be same as the password");
        } else {
            await resetPassword(dict).then(res => {
                handleSnack('success', "Password has been updated")
            }).catch(err => {
                handleSnack('error', "Error occurred while updating the password!")
            })
        }
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
                        <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "block" }, height: "100%" }}>
                            <Box display="flex" justifyContent="flex-end" className="h-100" alignItems={'center'}>
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
                                <img src={'../assets/images/reset-password.png'} width="100%" height="70%" alt="Reset" className="image-reset"/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7} container justifyContent={'center'}>
                            <Box className="bg-violet h-100" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                                <div style={{ width: "50%" }}>
                                    <h2 className="text-white font-weight-600 text-center my-4">Reset Password</h2>
                                    <div className="row m-0" >
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3 login-input-v-icons">
                                                <i class="fa fa-lock login-v-icon"></i>
                                                <input
                                                    type={isShowPassword? "text" : "password"}
                                                    className="form-control login-field-violet border-radius-10"
                                                    placeholder="New Password"
                                                    value={password}
                                                    onChange={(e) => setPassword( e.target.value)}
                                                />
                                                <i onClick={togglePassword} className={`fa ${isShowPassword ? "fa-eye-slash" : "fa-eye" } eye-icon text-white`}></i>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div className="form-group mt-3 login-input-v-icons">
                                                <i class="fa fa-lock login-v-icon"></i>
                                                <input
                                                    type={"password"}
                                                    className="form-control login-field-violet border-radius-10"
                                                    placeholder="Confirm New Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword( e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                            <div class="form-group mt-3">
                                                <button className="btn bg-white text-primary font-weight-600"
                                                    style={{ paddingBlock: 10, width: '100%' }} 
                                                    onClick={handleForgotPassword}
                                                    disabled={!(password && confirmPassword)}
                                                >
                                                        Update
                                                </button>
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

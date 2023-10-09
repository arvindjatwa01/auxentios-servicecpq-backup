import React, { useState } from "react";
import { signUpActions } from "../../features/auth/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import Validator from "../../utils/validator";
import {Grid} from "@mui/material";

var signUpState
export const SignUp = (props) => {

  const [signUpInputData, setSignUpInputData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    password: "",
    confirmPassword: ""
  });
  const dispatch = useDispatch();
  signUpState = useSelector((state) => state.signUp);


  const handleSignUp = () => {
    let dict = {
      firstName: signUpInputData.firstName,
      lastName: signUpInputData.lastName,
      email: signUpInputData.workEmail,
      password: signUpInputData.password,
      isApproved: true,
      // type: "TENANT_ADMIN",
      type: "TENANT_TRIAL_USER",
      roles: []
    };
    const validator = new Validator();
    if (!validator.firstNameValidation(signUpInputData.firstName)) {
      props.handleSnack("error", "Please enter the first name");
    } else if (!validator.lastNameValidation(signUpInputData.lastName)) {
      props.handleSnack("error", "Please enter the last name");
    } else if (!validator.emailValidation(signUpInputData.workEmail)) {
      props.handleSnack("error", "Please enter the email address in correct format");
    } else if (!validator.passwordValidation(signUpInputData.password)) {
      props.handleSnack("error", "Please enter the password");
    } else if (signUpInputData.password !== signUpInputData.confirmPassword) {
      props.handleSnack("error", "Confirm password should be same as password");
    } else {
      dispatch(signUpActions.signUp(dict));
    }

  };

  console.log("signUpState", signUpState)
  const [isShowSignupPassword, setIsShowSignupPassword] = useState(false);

  const toggleSignupPassword = () => {
    setIsShowSignupPassword(prevState => !prevState);
  }

  return (
    <div className="pt-5 px-6 text-center ">
      <h2 className="text-primary mb-5">Create Account</h2>
      <Grid container sx={{height: '100%', px: 5}} columnSpacing={2}>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mt-3 login-input-icons">
            <i class="fa fa-user login-icon"></i>
            <input
              type="text"
              className="form-control login-field border-radius-10"
              id="exampleInputFirstName"
              aria-describedby="emailHelp"
              placeholder="First Name"
              value={signUpInputData.firstName}
              onChange={(e) =>
                setSignUpInputData({
                  ...signUpInputData,
                  firstName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mt-3 login-input-icons">
            <i class="fa fa-user login-icon"></i>
            <input
              type="text"
              className="form-control login-field border-radius-10"
              id="exampleInputLastName"
              aria-describedby="emailHelp"
              placeholder="Last Name"
              value={signUpInputData.lastName}
              onChange={(e) =>
                setSignUpInputData({
                  ...signUpInputData,
                  lastName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-12">
          <div className="form-group mt-3 login-input-icons">
            <i class="fa fa-envelope login-icon"></i>
            <input
              type="email"
              className="form-control login-field border-radius-10"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              value={signUpInputData.workEmail}
              onChange={(e) =>
                setSignUpInputData({
                  ...signUpInputData,
                  workEmail: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mt-3 login-input-icons">
            <i class="fa fa-lock login-icon"></i>
            <input
              type={isShowSignupPassword? "text" : "password"}
              className="form-control login-field border-radius-10"
              id="exampleInputEmail1"
              placeholder="Password"
              value={signUpInputData.password}
              onChange={(e) =>
                setSignUpInputData({
                  ...signUpInputData,
                  password: e.target.value,
                })
              }
            />
            <i onClick={toggleSignupPassword} className={`fa ${isShowSignupPassword ? "fa-eye-slash" : "fa-eye" } eye-icon`}></i>
          </div>
        </div>
        <div className="col-sm-6 col-md-6">
          <div className="form-group mt-3 login-input-icons">
            <i class="fa fa-lock login-icon"></i>
            <input
              type="password"
              className="form-control login-field border-radius-10"
              id="exampleInputEmail1"
              placeholder="Confirm Password"
              value={signUpInputData.confirmPassword}
              onChange={(e) =>
                setSignUpInputData({
                  ...signUpInputData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-12">
          <div className="form-group mt-3">
            <a
              onClick={handleSignUp}
              className="btn bg-violet text-white d-block cursor font-weight-600"
              style={{paddingBlock: 10}}
            >
              Create Account
            </a>
          </div>
        </div>
        <div className="col-sm-12 col-md-12">
          <div className="d-flex justify-content-center form-group mt-3">
            <p>Already Have Account? <a onClick={() => dispatch(signUpActions.getStarted())} 
            href={undefined}
             style={{ cursor: "pointer" }}> Login </a></p>
          </div>
        </div>
      </Grid>
    </div>
  );
};

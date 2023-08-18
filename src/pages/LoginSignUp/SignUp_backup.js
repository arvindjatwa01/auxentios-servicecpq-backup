import React, { useState } from "react";
import type { SignUpPayload } from "../../features/auth/signUpSlice";
import { signUpActions } from "../../features/auth/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import Validator from "../../utils/validator";

interface props {
  id: string;
}
var signUpState
export const SignUp: React.FC<props> = ({ id }: props) => {

  const [signUpInputData, setSignUpInputData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    password: "",
  });
  const dispatch = useDispatch();
  signUpState = useSelector((state) => state.signUp);


  const handleSignUp = () => {
    let dict: SignUpPayload = {
      firstName: signUpInputData.firstName,
      lastName: signUpInputData.lastName,
      email: signUpInputData.workEmail,
      password: signUpInputData.password,
    };
    const validator = new Validator();
    if (!validator.firstNameValidation(signUpInputData.firstName)) {
      alert("Please enter the first name");
    } else if (!validator.lastNameValidation(signUpInputData.lastName)) {
      alert("Please enter the last name");
    } else if (!validator.emailValidation(signUpInputData.workEmail)) {
      alert("Please enter the email address in correct format");
    } else if (!validator.passwordValidation(signUpInputData.password)) {
      alert("Please enter the password");
    } else {
      dispatch(signUpActions.signUp(dict));
    }

  };

  console.log("signUpState", signUpState)

  return (
    <div className="pt-5">
      <h4 className="ml-3">Sign up</h4>
      <div className="row m-0">
        <div className="col-md-6 col-sm-6">
          <div className="form-group mt-3">
            <label
              className="text-light-dark font-size-12 font-weight-600"
              htmlFor="exampleInputEmail1"
            >
              FIRST NAME
            </label>
            <input
              type="text"
              className="form-control border-radius-10"
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
        <div className="col-md-6 col-sm-6">
          <div className="form-group mt-3">
            <label
              className="text-light-dark font-size-12 font-weight-600"
              htmlFor="exampleInputEmail1"
            >
              LAST NAME
            </label>
            <input
              type="text"
              className="form-control border-radius-10"
              id="exampleInputLastName"
              aria-describedby="emailHelp"
              placeholder="last Name"
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
        <div className="col-md-6 col-sm-6">
          <div className="form-group mt-3">
            <label
              className="text-light-dark font-size-12 font-weight-600"
              htmlFor="exampleInputEmail1"
            >
              WORK EMAIL
            </label>
            <input
              type="email"
              className="form-control border-radius-10"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
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
        <div className="col-md-12 col-sm-12">
          <div className="form-group mt-3">
            <label
              className="text-light-dark font-size-12 font-weight-600"
              htmlFor="exampleInputEmail1"
            >
              CREATE PASSWORD
            </label>
            <input
              type="password"
              className="form-control border-radius-10"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder=" Create Password"
              value={signUpInputData.password}
              onChange={(e) =>
                setSignUpInputData({
                  ...signUpInputData,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="col-md-12 col-sm-12">
          <div className="form-group mt-3">
            <a
              onClick={handleSignUp}
              className="btn bg-violet text-white d-block cursor"
            >
              Sign Up
            </a>
          </div>
        </div>
        <div className="col-md-12 col-sm-12">
          {/* <div className="d-flex justify-content-center form-group mt-3">
            <p>Already have an account? <a onClick={props.loginUrl} style={{ cursor: "pointer" }}> Login </a></p>
           
          </div> */}
        </div>
      </div>
    </div>
  );
};

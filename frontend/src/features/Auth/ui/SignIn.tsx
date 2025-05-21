import React, { ChangeEvent, useState } from "react";

import googleIcon from "@assets/authorize/gmail-sign-in.svg";
import mailIcon from "@assets/authorize/email-sign-in.svg";
import Button from "../../../views/Button/ui/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { AuthSlice } from "@/features/Auth/models/slice";
import { Navigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const {isSignSuccess} = useAppSelector(state => state.user);

  const [value, setValue] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleButtonClick = () => {
    if (!value.email || !value.password) return console.log("rejected");
    dispatch(AuthSlice.fetchSignInRequest(value));
  };

  if (isSignSuccess) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <label>
        <div className="label">Email</div>
        <input 
          name="email"
          type="text"
          onChange={handleInput}
          placeholder="Type here.."
          autoComplete="new-password"
        />
      </label>

      <label style={{marginBottom: "5px"}}>
        <div className="label">Password</div>
        <input 
          name="password"
          type="password"
          onChange={handleInput}
          placeholder="Your password.." 
          autoComplete="new-password"
        />
      </label>

      <div className="reset-pass">Forgot password?</div>

      <Button children="Log in" onclick={handleButtonClick} />

      <div className="ads-container">
        <div className="ad-block">
          <img src={googleIcon} alt="logo" />
        </div>
        <div className="ad-block">
          <img src={mailIcon} alt="logo" />
        </div>
        {/* <div className="ad-block">
              <div className="header" style={{color: "#B0B0B0"}}>
                Primary
              </div>

              <div className="line" />

              <div className="content">
                <div className="option disabled">
                  <div className="dot" />
                  Limited usage
                </div>

                <div className="option disabled">
                  <div className="dot" />
                  Half functionality
                </div>
              </div>
            </div> */}
      </div>
    </>
  );
}

export default SignIn;
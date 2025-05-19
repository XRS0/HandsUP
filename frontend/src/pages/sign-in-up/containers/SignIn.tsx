import React, { ChangeEvent, useState } from "react";

import googleIcon from "@assets/authorize/gmail-sign-in.svg";
import mailIcon from "@assets/authorize/email-sign-in.svg";
import Button from "../../../views/Button/ui/Button";
import { useAppDispatch } from "@/hooks/redux";
import { LoginActions } from "@/features/Log-in/models/slice";

const SignIn = () => {
  const dispatch = useAppDispatch();

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
    dispatch(LoginActions.fetchLoginRequest(value));
  };

  console.log(value);

  return (
    <>
      <label>
        <div className="label">Email</div>
        <input 
          name="email"
          type="text"
          onChange={handleInput}
          autoComplete="off"
          placeholder="Type here.."
        />
      </label>

      <label style={{marginBottom: "5px"}}>
        <div className="label">Password</div>
        <input 
          name="password"
          type="password"
          onChange={handleInput}
          placeholder="Your password.." 
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
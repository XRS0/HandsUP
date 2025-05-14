import React from "react";

import googleIcon from "@assets/authorize/gmail-sign-in.svg";
import mailIcon from "@assets/authorize/email-sign-in.svg";
import vkIcon from "@assets/authorize/vk-sign-in.svg";
import Button from "../../../views/Button/ui/Button";

const SignIn = () => {
  return (
    <>
      <label>
        <div className="label">Email</div>
        <input 
          type="text" 
          placeholder="Type here.."
          autoComplete="off"
        />
      </label>

      <label style={{marginBottom: "5px"}}>
        <div className="label">Password</div>
        <input type="password" placeholder="Your password.." />
      </label>

      <div className="reset-pass">Forgot password?</div>

      <Button children="Log in" onclick={() => {}} />

      <div className="ads-container">
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

        <div className="ad-block">
          <img src={googleIcon} alt="logo" />
        </div>
        <div className="ad-block">
          <img src={mailIcon} alt="logo" />
        </div>
        <div className="ad-block">
          <img src={vkIcon} alt="logo" />
        </div>
      </div>

    </>
  );
}

export default SignIn;
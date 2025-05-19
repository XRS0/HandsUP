import React, { useRef, useState } from "react";

import "./ui/Authorization.scss";
import "./ui/Animations.scss";

import bg from "@assets/authorize/bg.svg";
import logo from "@assets/welcome-page/logo.svg";
import barkArrow from "@assets/authorize/back-arrow.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SignIn from "@/features/Auth/ui/SignIn";
import SignUp from "@/features/Auth/ui/SignUp";

const Authorize = () => {
  const [mode] = useState<"out-in" | "in-out" | undefined>("out-in");
  const [switchButton, setSwitchButton] = useState(true);

  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const switchTextRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="form-container" style={{backgroundImage: `url(${bg}`}}>
      <img src={logo} alt="logo" className="auth-logo" />
      <div className="Auth-window">
        
        <img src={barkArrow} alt="arrow" className="back-arrow" />

        <h3 className="title">
          Sign
          <SwitchTransition mode={mode}>
          <CSSTransition
            key={switchButton ? "title-In" : "title-Up"}
            timeout={320}
            nodeRef={titleRef}
            classNames={switchButton ? "fadeTextin" : "fadeTextout"}
          >
            <div ref={titleRef} className="text-red">{switchButton ? "in" : "up"}</div>
          </CSSTransition>
          </SwitchTransition>
        </h3>

        <SwitchTransition mode={mode}>
          <CSSTransition
            key={switchButton ? "in" : "up"}
            timeout={320}
            nodeRef={contentRef}
            classNames={switchButton ? "fadein" : "fadeout"}
          >
            <div ref={contentRef} style={{width: "100%"}}>
              {switchButton ? <SignIn /> : <SignUp />}
            </div>
          </CSSTransition>
        </SwitchTransition>

        <div className="switch-block">
          <div 
          className="svg-container"
          style={{justifyContent: "start"}}
          onClick={() => setSwitchButton(switchButton => !switchButton)}
          >
            <svg
              className={switchButton ? "disabled" : ""} 
               width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 -1.78814e-07L7.4 1.45L3.85 5L16 5V7L3.85 7L7.4 10.55L6 12L-2.38419e-07 6L6 -1.78814e-07Z" fill="#383838"/>
            </svg>
          </div>

          <SwitchTransition mode={mode}>
          <CSSTransition
            key={switchButton ? "Sign-in" : "Sign-up"}
            timeout={320}
            nodeRef={switchTextRef}
            classNames={switchButton ? "fadein" : "fadeout"}
          >
            <div ref={switchTextRef}>{switchButton ? "Sign in" : "Sign Up"}</div>
          </CSSTransition>
        </SwitchTransition>

          <div 
            className="svg-container"
            style={{justifyContent: "end"}}
            onClick={() => setSwitchButton(switchButton => !switchButton)}
          >
            <svg 
                className={!switchButton ? "disabled" : ""}
                width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L8.6 10.55L12.15 7H0L0 5H12.15L8.6 1.45L10 0L16 6L10 12Z" fill="#C5073D"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authorize;
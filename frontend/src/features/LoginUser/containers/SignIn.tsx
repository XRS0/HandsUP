import { ChangeEvent, useEffect, useState } from "react";

import googleIcon from "@assets/authorize/gmail-sign-in.svg";
import mailIcon from "@assets/authorize/email-sign-in.svg";
import Button from "@/views/Button/ui/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { LoginSliceActions } from "../models/slice";
import { Navigate } from "react-router-dom";
import Loader from "@/views/Loader/Loader";
import ModalOverflow from "@/features/UserMenu/ui/ModalOverflow";
import useAnimation from "@/hooks/useAnimation";
import ForgotPassword from "../ui/ForgotPassword";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { error, isSuccess, isLoading } = useAppSelector(state => state.login);

  const [token, setToken] = useState(false);

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
    if (!value.email || !value.password) {
      dispatch(LoginSliceActions.fetchFailure("Заполните все поля!"));
      return;
    }
    dispatch(LoginSliceActions.fetchRequest(value));
  }

  const {
    isVisible,
    isFadeOut,
    handleOpen,
    handleAnimationEnd,
  } = useAnimation();

  const handlePopupOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("overflow")) return;
    
    handleOpen(e);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(true);
  }, []);

  if (isSuccess || token) return <Navigate to={"/chat"} replace />

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

      <div className="reset-pass" onClick={handleOpen}>Забыли пароль?</div>

      {isVisible && <ModalOverflow isOpen={!isFadeOut} onClick={handlePopupOpen}>
          <ForgotPassword
            isFadeOut={isFadeOut}
            onAnimationEnd={handleAnimationEnd}
          />
      </ModalOverflow>}

      <Button onclick={handleButtonClick}>
        {isLoading 
        ? <Loader />
        : "Войти"}
      </Button>

      <div className="error-message" children={error} />

      <div className="ads-container">
        <div className="ad-block">
          <img src={googleIcon} alt="logo" />
        </div>
        <div className="ad-block">
          <img src={mailIcon} alt="logo" />
        </div>
      </div>
    </>
  );
}

export default SignIn;
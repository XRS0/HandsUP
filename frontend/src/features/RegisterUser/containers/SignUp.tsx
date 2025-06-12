import React, { ChangeEvent, useRef, useState } from "react";
import Button from "@/views/Button/ui/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Navigate } from "react-router-dom";
import { RegisterSliceActions } from "../models/slice";
import Loader from "@/views/Loader/Loader";

//TODO сделать отображение ошибки входа

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { error, isSuccess, isLoading } = useAppSelector(state => state.register);

  const confirmPassInput = useRef<HTMLInputElement>(null);
  
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
  
  const handleButtonClick = () => {
    if (!value.email || !value.username || !value.password || !confirmPassInput.current?.value) {
      dispatch(RegisterSliceActions.fetchFailure("Заполните все поля!"));
      return;
    }
    if (value.password !== confirmPassInput.current?.value) {
      dispatch(RegisterSliceActions.fetchFailure("Пароли не совпадают!"));
      return;
    }
    dispatch(RegisterSliceActions.fetchRequest(value));
  };

  if (isSuccess) return <Navigate to={"/chat"} replace />

  return (
    <>
      <div className="input-row">
        <label>
          <div className="label">Name</div>
          <input 
            type="text"
            name="username"
            onChange={handleInput}
            placeholder="Type here.."
            autoComplete="new-password"
          />
        </label>

        <label>
          <div className="label">Email</div>
          <input 
            type="text"
            name="email"
            onChange={handleInput} 
            placeholder="Type here.."
            autoComplete="new-password"
          />
        </label>
      </div>
      
      <label>
        <div className="label">Password</div>
        <input
          name="password"
          type="password"
          onChange={handleInput}
          placeholder="Your password.." 
          autoComplete="new-password"
        />
      </label>

      <label>
        <div className="label">Confirm password</div>
        <input type="password" placeholder="Once again.." ref={confirmPassInput} autoComplete="new-password"  />
      </label>

      <Button onclick={handleButtonClick}>
        {isLoading
        ? <Loader />
        : "Зарегистрироваться"}
      </Button>

      <div className="error-message" children={error} />
    </>
  );
}

export default SignUp;
import React, { ChangeEvent, useRef, useState } from "react";
import Button from "../../../views/Button/ui/Button";
import { useAppDispatch } from "@/hooks/redux";
import { RegisterActions } from "@/features/Register/models/slice";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const confirmPassInput = useRef<HTMLInputElement>(null);
  
  const [value, setValue] = useState({
    name: "",
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
    if (!value.email || !value.name || !value.password || !confirmPassInput.current?.value) return console.log("rejected");
    if (value.password !== confirmPassInput.current?.value) return console.log("not the same pass");
    dispatch(RegisterActions.fetchRegisterRequest(value));
  };

  return (
    <>
      <div className="input-row">
        <label>
          <div className="label">Name</div>
          <input 
            type="text"
            name="name"
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

      <Button children="Register" onclick={handleButtonClick} />
    </>
  );
}

export default SignUp;
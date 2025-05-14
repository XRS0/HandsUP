import React from "react";
import Button from "../../../views/Button/ui/Button";

const SignUp = () => {
  return (
    <>
      <div className="input-row">
        <label>
          <div className="label">Name</div>
          <input 
            type="text" 
            placeholder="Type here.."
            autoComplete="off"
          />
        </label>

        <label>
          <div className="label">Email</div>
          <input 
            type="text" 
            placeholder="Type here.."
            autoComplete="off"
          />
        </label>
      </div>
      
      <label>
        <div className="label">Password</div>
        <input type="password" placeholder="Your password.."  />
      </label>

      <label>
        <div className="label">Confirm password</div>
        <input type="password" placeholder="Once again.."  />
      </label>

      <Button children="Register" onclick={() => {}} />
    </>
  );
}

export default SignUp;
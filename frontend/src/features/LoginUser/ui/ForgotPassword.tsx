import React from "react";

import "./ForgotPassword.scss";
import { createClassName } from "@/shared/utils/createClassName";
import useInput from "@/hooks/useInput";
import Button from "@/views/Button/ui/Button";

type OwnProps = {
  isFadeOut: boolean;
  onAnimationEnd: React.AnimationEventHandler<HTMLDivElement>;
}

const ForgotPassword: React.FC<OwnProps> = ({ isFadeOut, onAnimationEnd }) => {
  const {value, onChange, clear} = useInput();

  return (
    <div 
      onAnimationEnd={onAnimationEnd}
      className={createClassName("popup", !isFadeOut ? "--enter" : "--exit" )}
    >
      <label>
        <div className="label">Адрес вашей электронной почты</div>
        <input 
          type="text"
          value={value}
          onChange={onChange}
          placeholder="example@mail.ru"
          autoComplete="new-password"
        />
      </label>

      <Button
        // cssClass="warning-button"
        children="Отправить код"
        onclick={() => window.open("https://www.artstation.com/reinmar")}
      />
    </div>
  );
}

export default ForgotPassword;
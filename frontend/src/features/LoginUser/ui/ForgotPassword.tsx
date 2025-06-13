import React, { useState } from "react";

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
  const [isSended, setIsSended] = useState(false);  // template, needs to be Feature

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
        isDisabled={isSended || !value}
        children={ isSended ? "Код отправлен" : "Отправить код"}
        onclick={() => setIsSended(true)}
      />
    </div>
  );
}

export default ForgotPassword;
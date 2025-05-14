import React from "react";

import "../styles/Input.scss";
import { createClassName } from "../../shared/utils/createClassName";

type OwnProps = {
  content: string;
  cssClass?: string;
  isDisabled?: boolean;
}

const Input: React.FC<OwnProps> = ({ content, cssClass = "", isDisabled = false}) => {
  return (
    <input 
      className={createClassName(isDisabled && "disabled", cssClass !== "" && cssClass)}
      disabled={isDisabled}
    />
  );
}

export default Input;
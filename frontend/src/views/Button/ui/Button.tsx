import React from "react";
import "./Button.scss";
import "@views/Dropdown/Dropdown.scss";
import { createClassName } from "../../../shared/utils/createClassName";

type OwnProps = {
  children: string;
  cssClass?: string;
  isFilled?: boolean;
  isDisabled?: boolean;
  onclick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  IconLeft?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  IconRight?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Button: React.FC<OwnProps> = ({ 
  children,
  cssClass = "", 
  isFilled = true, 
  isDisabled = false, 
  onclick,
  IconLeft, 
  IconRight 
}) => {
  return (
    <button 
      onClick={onclick}
      className={createClassName(
        !isFilled && "transparent", 
        isDisabled && "disabled", 
        cssClass !== "" && cssClass
      )}
      disabled={isDisabled}
    >
      {IconLeft && <IconLeft style={{marginRight: "6px"}}/>}
      {children}
      {IconRight && <IconRight style={{marginRight: "6px"}}/>}
    </button>
  );
};

export default Button;
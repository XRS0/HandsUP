import React, { ChangeEvent } from "react";
import "./Button.scss";
import "@views/Dropdown/Dropdown.scss";
import { createClassName } from "../../../shared/utils/createClassName";

type OwnProps = {
  ref?: React.RefObject<HTMLButtonElement | null>
  name?: string;
  children: any;
  cssClass?: string;
  isFilled?: boolean;
  isDisabled?: boolean;
  onclick: (e: React.MouseEvent<any>) => void;
  IconLeft?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  IconRight?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Button: React.FC<OwnProps> = ({
  ref,
  name,
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
      ref={ref}
      name={name}
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
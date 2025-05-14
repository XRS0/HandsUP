import React, { HTMLAttributes } from "react";
import "./Dropdown.scss";
import { createClassName } from "../../shared/utils/createClassName";

type OwnProps = HTMLAttributes<HTMLDivElement> & {
  children: any;
  isOpen?: boolean;
  cssClass?: string;
  orientation: "row" | "column";
  doesAnimate?: boolean;
  ref?: React.Ref<HTMLDivElement> | undefined;
};

const Dropdown: React.FC<OwnProps> = ({
  children,
  orientation,
  isOpen = false,
  cssClass = "",
  doesAnimate = false,
  ref,
  ...props    // change if doesn't needed
  }) => {

  return (
    <div
      ref={ref}
      style={orientation === "row" ? {display: "flex"} : {}}
      className={createClassName(
        "dropdown",
        (!isOpen && "hidden"),
        isOpen && (doesAnimate ? "--enter" : "--exit"),
        cssClass
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Dropdown;
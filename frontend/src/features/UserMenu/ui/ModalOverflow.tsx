import React from "react";

import "./ModalOverflow.scss";
import { createClassName } from "@/shared/utils/createClassName";

type OwnProps = {
  children: any;
  isOpen: boolean;
  onClick?: ((event: React.MouseEvent<HTMLElement>) => void)
}

const ModalOverflow: React.FC<OwnProps> = ({ children, isOpen, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={createClassName(
        "overflow",
        !isOpen && "hidden"
      )
  }>{children}</div>
  );
}

export default ModalOverflow;
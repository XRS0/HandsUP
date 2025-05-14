import React from "react";

import "./ModalOverflow.scss";

type OwnProps = {
  children: any;
}

const ModalOverflow: React.FC<OwnProps> = ({ children }) => {
  return (
    <div className="overflow">{children}</div>
  );
}

export default ModalOverflow;
import React from "react";

import "./MenuField.scss";

type OwnProps = {
  name: string;
  value: any;
  line?: boolean
}

const MenuField: React.FC<OwnProps> = ({ name, value, line=false }) => {
  return (
    <div className="menu-field">
      <div className="content" style={line ? {marginBottom: "0"} : {}}>
        <div className="fieldname">{name}</div>
        <div className="fieldvalue">{value}</div>
      </div>
      {!line && <div className="sep-line"></div>}
    </div>
  );
}

export default MenuField;
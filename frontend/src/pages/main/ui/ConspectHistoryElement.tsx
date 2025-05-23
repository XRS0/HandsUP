import React from "react";

import "../ui/ConspectHistoryElement.scss";
import { getDateAgo } from "../../../shared/utils/date";

type OwnProps = {
  date: number | Date;
  topics: string[];
}

const ConspectHistoryElement: React.FC<OwnProps> = ({ date, topics }) => {
  return (
    <div className="history-container">
      <div className="header-date">{getDateAgo(date)}</div>
      {
      topics.map(name => <div className="conspect-name">{name}</div>)
      }
    </div>
  );
}

export default ConspectHistoryElement;
import { createClassName } from "@/shared/utils/createClassName";
import React, { useState } from "react";

type OwnProps = {
  date: string;
  topics: string[];
  selected: string
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ConspectHistoryElement: React.FC<OwnProps> = ({ date, topics, onClick, selected }) => {

  return (
    <div className="history-container" onClick={onClick}>
      <div className="header-date">{date}</div>
      {topics.map((name, i) => 
        <div
          onClick={onClick}
          className={createClassName("conspect-name", selected === name && "selected")}
          key={i}>{name.length < 30 ? name : `${name.slice(0, 28)}..`}
        </div>)
      }
    </div>
  );
}

export default ConspectHistoryElement;
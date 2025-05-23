import React from "react";

type OwnProps = {
  date: string;
  topics: string[];
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ConspectHistoryElement: React.FC<OwnProps> = ({ date, topics, onClick }) => {
  return (
    <div className="history-container" onClick={onClick}>
      <div className="header-date">{date}</div>
      {topics.map((name, i) => 
        <div 
          className="conspect-name" 
          key={i}>{name.length < 30 ? name : `${name.slice(0, 28)}..`}
        </div>)
      }
    </div>
  );
}

export default ConspectHistoryElement;
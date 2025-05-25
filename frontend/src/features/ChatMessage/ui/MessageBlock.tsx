import { useEffect } from "react";

type OwnProps = {
  ref: React.Ref<HTMLDivElement>;
  height: number | string;
  message: string[];
}

const MessageBlock: React.FC<OwnProps> = ({ref, height, message}) => {
  return (
    <div
      className="conspect-message-block --enter"
      ref={ref}
      style={typeof height === "number" ? {height: `${height}px`} : {height: height}}
    >
      {message.map((word, i) => {
        return <span
          key={i}
          style={{animation: 'fade-word 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0)'}}    //change how cool will work sppechToText
        >{word} </span>
      })}
    </div>
  );
}

export default MessageBlock;
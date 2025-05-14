import { RootState } from "@/app/Store/store";
import React, { useEffect, useReducer, useRef } from "react";
import { useSelector } from "react-redux";

type OwnProps = {
  socketName: string;
}

const ConspectMessageBlock: React.FC<OwnProps> = ({ socketName }) => {
  const message = useSelector((state: RootState) => state.socket[socketName].message);

  const [, forceUpdate] = useReducer(x => x + 1, 0);    // for update

  const messageRef = useRef<HTMLDivElement>(null);
  const lettersCountRef = useRef(0);
  const messageHeightRef = useRef(0);

  const renderedMessage = useRef<string[]>([]);
  useEffect(() => {
    if (!message) return;

    const wordsToRender = renderedMessage.current.length 
    ? message.slice(message.length - renderedMessage.current.length)
    : message;
    console.log(wordsToRender);

    wordsToRender.map((word, i) => {
      if (messageRef.current) messageHeightRef.current = messageRef.current.offsetHeight;
      setTimeout(() => {
        const wordLength = word.length + 1;
      
        if ((wordLength + lettersCountRef.current) >= 100) {
          if (messageRef.current) {
            messageHeightRef.current = messageHeightRef.current + 20;
          }
          lettersCountRef.current = 0;
        }

        lettersCountRef.current += wordLength;
        renderedMessage.current.push(word);
        forceUpdate();
      }, 150 * i);
    });
  }, [message]);

  return (
    <div 
      className="conspect-message-block" 
      ref={messageRef}
      style={{height: `${messageHeightRef.current}px`}}
      >
        {renderedMessage.current.map((word, i) => {
          return <span
            key={i}
            style={{animation: `fade-word 0.8s forwards cubic-bezier(0.11, 0, 0.5, 0)`}}
          >{word}</span>
        })}
    </div>
  );
}

export default ConspectMessageBlock;
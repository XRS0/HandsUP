import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Markdown from "react-markdown";

import "../ui/LoadedChat.scss";
import "../ui/MDMessageBlock.scss";
import "@/features/ChatMessage/ui/StaticMessage.scss";

const MDMessageBlock = () => {
  const { markdown } = useAppSelector(state => state.socket);
  const dispatch = useAppDispatch();

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const messageRef = useRef<HTMLDivElement>(null);
  const messageHeightRef = useRef<number | string>(0);
  const lettersCountRef = useRef(0);

  const renderedMessage = useRef<string[]>([]);
  const animationInterval = useRef<NodeJS.Timeout>(null);
  
  useEffect(() => {
    if (renderedMessage.current.join("") === markdown.join("")) return;

    const charsToRender = renderedMessage.current.length
      ? markdown.slice(renderedMessage.current.length)
      : markdown;

    charsToRender.forEach((char, i) => {
      if (messageRef.current) messageHeightRef.current = messageRef.current.offsetHeight;
      setTimeout(() => {
        const charLength = char.length;
        
        if ((charLength + lettersCountRef.current) >= 104) {
          if (messageRef.current) {
            messageHeightRef.current = +messageHeightRef.current + 23;
          }
          lettersCountRef.current = 0;
        }

        lettersCountRef.current += charLength;
        renderedMessage.current.push(char);
        forceUpdate();
      }, 100 * i);
    });
  }, [markdown]);

  return (
    <div className="chat-message-container md-block --enter"
      style={{
        animation: 'fade-word 0.7s forwards cubic-bezier(0.11, 0, 0.5, 0)',
      }}
    >
      <div className="static-message">
        <Markdown components={{h1: 'h2'}}>
          {renderedMessage.current.join("")}
        </Markdown>
      </div>
    </div>
  );
}

export default MDMessageBlock;
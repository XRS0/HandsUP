import { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import Markdown from "react-markdown";

import "../ui/LoadedChat.scss";
import "../ui/MDMessageBlock.scss";
import "@/features/ChatMessage/ui/StaticMessage.scss";

const MDMessageBlock = () => {
  const { markdown } = useAppSelector(state => state.socket);
  // const dispatch = useAppDispatch();

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const renderedMessage = useRef<string[]>([]);
  
  useEffect(() => {
    if (renderedMessage.current.join("") === markdown.join("")) return;

    const charsToRender = renderedMessage.current.length
      ? markdown.slice(renderedMessage.current.length)
      : markdown;

    charsToRender.forEach((char, i) => {
      setTimeout(() => {
        const charLength = char.length;

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
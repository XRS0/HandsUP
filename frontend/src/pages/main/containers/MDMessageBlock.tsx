import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Markdown from "react-markdown";

import "@/features/ChatMessage/ui/StaticMessage.scss";
import "../ui/MDMessageBlock.scss";

const MDMessageBlock = () => {
  const { markdown } = useAppSelector(state => state.socket);
  const dispatch = useAppDispatch();

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
        renderedMessage.current.push(char);
        forceUpdate();
      }, 100 * i);
    });
  }, [markdown]);

  return (
    <div className="chat-message-container md-block --enter">
      <div className="static-message">
        <Markdown components={{h1: 'h2'}}>
          {renderedMessage.current.join("")}
        </Markdown>
      </div>
    </div>
  );
}

export default MDMessageBlock;
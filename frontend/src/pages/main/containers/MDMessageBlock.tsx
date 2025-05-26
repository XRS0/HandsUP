import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Markdown from "react-markdown";

import "@/features/ChatMessage/ui/StaticMessage.scss";
import "../ui/MDMessageBlock.scss";

const MDMessageBlock = () => {
  const { markdown } = useAppSelector(state => state.topics);
  const dispatch = useAppDispatch();

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const renderedMessage = useRef<string[]>([]);
  
  useEffect(() => {
    if (renderedMessage.current.join("") === Object.values(markdown)[0].join("")) return;

    const charsToRender = renderedMessage.current.length
      ? Object.values(markdown)[0].slice(renderedMessage.current.length)
      : Object.values(markdown)[0];

    charsToRender.forEach((char, i) => {
      setTimeout(() => {
        renderedMessage.current.push(char);
        forceUpdate();
      }, 70 * i);
    });
  }, [markdown]);

  return (
    <div className="chat-message-container --enter">
      <div className="static-message">
        <Markdown components={{h1: 'h2'}}>
          {renderedMessage.current.join("")}
        </Markdown>
      </div>
    </div>
  );
}

export default MDMessageBlock;
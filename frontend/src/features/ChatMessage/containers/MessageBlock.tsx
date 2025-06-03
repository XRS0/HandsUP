import { useCallback, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import "@/features/ChatMessage/ui/StaticMessage.scss";
import Markdown from "react-markdown";
import EditMessageTextarea from "./EditMessageTextarea";
import { SocketSliceActions } from "@/entities/websocket/models/slice";

const MessageBlock = () => {
  const { message, isEditingNow, newMessage } = useAppSelector(state => state.socket);
  const dispatch = useAppDispatch();
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const renderedMessage = useRef<string[]>([]);
  
  useEffect(() => {
    if (renderedMessage.current.join("") === Object.values(message)[0]) return;

    const charsToRender = renderedMessage.current.length
      ? message.slice(renderedMessage.current.length).split(" ")
      : message.split(" ");

    charsToRender.forEach((char, i) => {
      setTimeout(() => {
        renderedMessage.current.push(char);
        forceUpdate();
      }, 80 * i);
    });
  }, [message]);

  useEffect(() => {
    if (!isEditingNow && newMessage) {
      renderedMessage.current = newMessage.split(" ");
      dispatch(SocketSliceActions.setMessage());
      // messageHeightRef.current = "auto";
    }
  }, [isEditingNow]);

  if (isEditingNow) return <EditMessageTextarea />

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

export default MessageBlock;
import Markdown from "react-markdown";
import EditMessageTextarea from "./EditMessageTextarea";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { SocketSliceActions } from "@/entities/websocket/models/slice";

import "@/features/ChatMessage/ui/StaticMessage.scss";
import { createClassName } from "@/shared/utils/createClassName";

const MessageBlock = () => {
  const { message, isEditingNow, newMessage } = useAppSelector(state => state.socket);
  const { chatMessages } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const renderedMessage = useRef<string[]>([]);
  
  // useEffect(() => {
  //   if (renderedMessage.current.join("") === message) return;

  //   const wordsToRender = renderedMessage.current.length
  //     ? message.slice(renderedMessage.current.length).split(" ")
  //     : message.split(" ");

  //   console.log(renderedMessage.current);
    
  //   wordsToRender.forEach((word, i) => {
  //     setTimeout(() => {
  //       renderedMessage.current.push(word);
  //       forceUpdate();
  //     }, 80 * i);
  //   });
  // }, [message]);

  useEffect(() => {
    if (!isEditingNow && newMessage) {
      renderedMessage.current = newMessage.split(" ");

      dispatch(SocketSliceActions.setMessage());
      // messageHeightRef.current = "auto";
    }
  }, [isEditingNow]);

  if (isEditingNow) return <EditMessageTextarea />

  return (
    <div className={createClassName("chat-message-container", 
    chatMessages.length === 0 && "--recording")}>
      <div className="static-message">
        <Markdown components={{h1: 'h2'}}>
          {/* {renderedMessage.current.join("")}
           */}
          {message}
        </Markdown>
      </div>
    </div>
  );
}

export default MessageBlock;
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { socketSliceActions } from "@/entities/websocket/slice";

import MessageBlock from "../ui/MessageBlock";
import EditMessageTextarea from "./EditMessageTextarea";

import "../ui/ChatMessage.scss";

const AnimateMessage = () => {
  const { message, newMessage, isEditingNow } = useAppSelector(state => state.socket);
  const dispatch = useAppDispatch();

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []); // for updating

  const messageRef = useRef<HTMLDivElement>(null);
  const messageHeightRef = useRef<number | string>(0);                 // height of message conntainer
  const lettersCountRef = useRef(0);                  // for counting we sould height will changed

  const renderedMessage = useRef<string[]>([]);       // collecting already rendered words

  useEffect(() => {
    // some defense from rerender
    if (message === newMessage) return;
    if (renderedMessage.current.join(" ") === message) return;

    const wordsToRender = renderedMessage.current.length
    ? message.split(" ").slice(renderedMessage.current.length)
    : message.split(" ");

    wordsToRender.map((word, i) => {
      if (messageRef.current) messageHeightRef.current = messageRef.current.offsetHeight;
      setTimeout(() => {
        const wordLength = word.length + 1;                               // +1 for add space
      
        if ((wordLength + lettersCountRef.current) >= 108) {
          if (messageRef.current) {
            messageHeightRef.current = +messageHeightRef.current +  23;   // add some px for increase height
          }
          lettersCountRef.current = 0;                                    // reset letters count
        }

        lettersCountRef.current += wordLength;
        renderedMessage.current.push(word);
        forceUpdate();
      }, 150 * i);
    });
  }, [message]);

  useEffect(() => {
    if (!isEditingNow && newMessage) {
      renderedMessage.current = newMessage.split(" ");
      dispatch(socketSliceActions.setMessage());
      messageHeightRef.current = "auto";
    }
  }, [isEditingNow]);

  if (isEditingNow) return <EditMessageTextarea />

  return (
    <MessageBlock
      ref={messageRef}
      height={messageHeightRef.current}
      message={renderedMessage.current}
    />
  );
}

export default AnimateMessage;
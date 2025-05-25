import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Markdown from "react-markdown";

import "../ui/LoadedChat.scss";
import "../ui/MDMessageBlock.scss";

const MDMessageBlock = () => {
  const { markdown } = useAppSelector(state => state.socket);
  const dispatch = useAppDispatch();
  
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []); // for updating
  
  const messageRef = useRef<HTMLDivElement>(null);
  const messageHeightRef = useRef<number | string>(0);                 // height of message conntainer
  const lettersCountRef = useRef(0);                  // for counting we sould height will changed
  
  const renderedMessage = useRef<string[]>([]);       // collecting already rendered words

  useEffect(() => {
    if (renderedMessage.current.join(" ") === markdown) return;

    const wordsToRender = renderedMessage.current.length
    ? markdown.split("").slice(renderedMessage.current.length)
    : markdown.split("");

    wordsToRender.map((word, i) => {
      if (messageRef.current) messageHeightRef.current = messageRef.current.offsetHeight;
      setTimeout(() => {
        const wordLength = word.length + 1;                               // +1 for add space
      
        if ((wordLength + lettersCountRef.current) >= 105) {
          if (messageRef.current) {
            messageHeightRef.current = +messageHeightRef.current +  23;   // add some px for increase height
          }
          lettersCountRef.current = 0;                                    // reset letters count
        }

        lettersCountRef.current += wordLength;
        renderedMessage.current.push(word);
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
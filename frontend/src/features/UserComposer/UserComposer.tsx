import React, { useEffect, useRef, useState } from "react";
import Button from "@/views/Button/ui/Button";

import "./UserComposer.scss";

import linkIcon from "@/shared/assets/main-page/icons/link.svg?react";
import stormIcon from "@/shared/assets/main-page/icons/storm_iocn.svg?react";
import { createClassName } from "@/shared/utils/createClassName";
import useInput from "@/hooks/useInput";
import { useAppDispatch } from "@/hooks/redux";
import { topicSliceActions } from "../UserTopics/models/slice";

const UserComposer = () => {
  const dispatch = useAppDispatch()

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {value, onChange, clear} = useInput();
  const [isClicked, setIsClicked] = useState({
    short: false,
    without_changes: false,
    expanded: false,
  });

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      const handleInput = function(this: HTMLTextAreaElement) {
        this.style.height = 'auto';
        this.style.height = `${this.scrollHeight}px`;
      };

      textarea.addEventListener('input', handleInput);

      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }
  }, []);

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const name = e.currentTarget.name as "short" | "without_changes" | "expanded";

    setIsClicked(prev => ({
      short: false,
      without_changes: false,
      expanded: false,
      [name]: !prev[name]
    }));
  }

  const handleSendMessage = () => {
    dispatch(topicSliceActions.generateMessage(value));
    clear();
  }

  return (
    <div className="main-prompt-input">
      <textarea  
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder="Type something for config a conspect..."
      />

      <div className="hint-text">
        ← Don’t forget to choose the type of conspect
      </div>

      <div className="input-tools">
        <div className="conspect-config">
          <Button 
            name="short"
            onclick={handleOptionClick} 
            cssClass={createClassName("config", isClicked["short"] && "actived")} 
            children={"Short"} 
            isFilled={false}
          />

          <Button 
            name="without_changes"
            onclick={handleOptionClick} 
            cssClass={createClassName("config", isClicked["without_changes"] && "actived")} 
            children={"Without changes"} 
            isFilled={false}
          />

          <Button 
            name="expanded"
            onclick={handleOptionClick} 
            cssClass={createClassName("config", isClicked["expanded"] && "actived")}
            children={"Expanded"} 
            isFilled={false} 
          />
        </div>

        <div className="actions">
          <Button 
            children={"Copy"}
            cssClass="copy-button" 
            IconLeft={linkIcon} 
            onclick={() => {}}
          />

          <Button
            IconLeft={stormIcon}
            children="Generate"
            cssClass="record-button"
            onclick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default UserComposer;
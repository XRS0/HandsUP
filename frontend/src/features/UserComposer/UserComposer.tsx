import React, { useEffect, useRef, useState } from "react";
import Button from "@/views/Button/ui/Button";

import "./UserComposer.scss";

import linkIcon from "@/shared/assets/main-page/icons/link.svg?react";
import stormIcon from "@/shared/assets/main-page/icons/storm_iocn.svg?react";
import { createClassName } from "@/shared/utils/createClassName";
import useInput from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { topicSliceActions } from "../UserTopics/models/slice";

const UserComposer = () => {
  const textareaRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const {value, onChange, clear} = useInput();
  const [isClicked, setIsClicked] = useState({
    short: false,
    without_changes: false,
    expanded: false,
  });

  const dispatch = useAppDispatch();
  const { language } = useAppSelector(state => state.settings);
  const {message} = useAppSelector(state => state.socket);
  const { currentTopic } = useAppSelector(state => state.topics);

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
    let conspectFullness: number;

    switch(true) {
      case isClicked["short"]:
        conspectFullness = 0;
        break;

      case isClicked["without_changes"]:
        conspectFullness = 1;
        break;

      case isClicked["expanded"]:
        conspectFullness = 2;
        break;

      default:
        conspectFullness = 3;
        break;
    }

    dispatch(topicSliceActions.generateMessage({
      user_prompt: value,
      fullness: conspectFullness,
      lang: language === "English" ? "en" : "ru",
      text: message,
      topic: Object.keys(currentTopic!)[0]
    }));

    clear();
  }

  const conspectConfigButtons = <div className="conspect-config">
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

  if (document.body.offsetWidth <= 480) return (
    <div className="main-prompt-input">
      <div className="input-tools">
        <input 
          type="text" 
          ref={textareaRef as React.Ref<HTMLInputElement>}
          value={value}
          onChange={onChange}
          placeholder="Type something.."
        />

        <Button
          IconLeft={stormIcon}
          children="Generate"
          cssClass="record-button"
          onclick={handleSendMessage}
        />
      </div>

      {conspectConfigButtons}
    </div>
  );

  return (
    <div className="main-prompt-input">
      <textarea  
        ref={textareaRef as React.Ref<HTMLTextAreaElement>}
        value={value}
        onChange={onChange}
        placeholder="Type something for config a conspect..."
      />

      <div className="hint-text">
        ← Don’t forget to choose the type of conspect
      </div>

      <div className="input-tools">
        {conspectConfigButtons}

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
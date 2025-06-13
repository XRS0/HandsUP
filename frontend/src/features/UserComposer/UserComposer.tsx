import React, { useEffect, useRef, useState } from "react";
import Button from "@/views/Button/ui/Button";

import "./UserComposer.scss";

import linkIcon from "@/shared/assets/main-page/icons/link.svg?react";
import stormIcon from "@/shared/assets/main-page/icons/storm_iocn.svg?react";
import { createClassName } from "@/shared/utils/createClassName";
import useInput from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ChatSliceActions } from "../UserChat/models/slice";

const UserComposer = () => {
  const textareaRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const {value, onChange, clear} = useInput();
  const [isClicked, setIsClicked] = useState({
    short: false,
    without_changes: false,
    expanded: false,
  });

  const dispatch = useAppDispatch();
  const { language } = useAppSelector(state => state.settings);
  const { message } = useAppSelector(state => state.socket);
  const { currentTopic } = useAppSelector(state => state.topics);
  const { chatMessages } = useAppSelector(state => state.chat);

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

    const lastBotMessage = chatMessages.filter(topic => topic.from === false).at(-1);
    
    dispatch(ChatSliceActions.generateMessage({
      user_prompt: value,
      fullness: conspectFullness,
      lang: language === "English" ? "en" : "ru",
      text: lastBotMessage ? lastBotMessage.text : message,
      topic: currentTopic!
    }));

    clear();
  }

  const copyToCLipboard = () => {
    const lastBotMessage = chatMessages.filter(topic => topic.from === false).at(-1);
    navigator.clipboard.writeText(lastBotMessage!.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }

  const conspectConfigButtons = <div className="conspect-config">
    <Button 
      name="short"
      onclick={handleOptionClick} 
      cssClass={createClassName("config", isClicked["short"] && "actived")} 
      children={document.body.offsetWidth > 950 ? "Краткий" : "Крат."} 
      isFilled={false}
    />

    <Button 
      name="without_changes"
      onclick={handleOptionClick} 
      cssClass={createClassName("config", isClicked["without_changes"] && "actived")} 
      children={document.body.offsetWidth > 950 ? "Без изменений" : "Базовый"}
      isFilled={false}
    />

    <Button 
      name="expanded"
      onclick={handleOptionClick} 
      cssClass={createClassName("config", isClicked["expanded"] && "actived")}
      children={document.body.offsetWidth > 950 ? "Объемный" : "Расш."} 
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
          placeholder="Что нибудь.."
        />

        <Button
          IconLeft={stormIcon}
          children={"Сгенерировать"}
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
        placeholder="Напиши что нибудь для конфигурации.."
      />

      <div className="hint-text">
        ← Не забудь выбрать пресет для конспекта
      </div>

      <div className="input-tools">
        {document.body.offsetWidth > 660 && conspectConfigButtons}

        <div className="actions">
          <Button 
            children={isCopied 
              ? document.body.offsetWidth > 950 
              ? "Скопировано" : "Скоп." 
              : document.body.offsetWidth > 950 
              ? "Копировать" : "Коп."}
            cssClass="copy-button" 
            IconLeft={linkIcon} 
            onclick={copyToCLipboard}
          />

          <Button
            IconLeft={stormIcon}
            children={document.body.offsetWidth > 950 ? "Сгенерировать" : "Далее"}
            cssClass="record-button"
            onclick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default UserComposer;
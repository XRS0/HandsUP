import React, { useEffect, useRef } from "react";
import Button from "@/views/Button/ui/Button";

import "./UserComposer.scss";

import audioIcon from "@assets/main-page/audio-visualize.svg?react";

const UserComposer = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="main-prompt-input">
      <textarea ref={textareaRef} placeholder="Type something for config a conspect..."></textarea>

      <div className="input-tools">
        <div className="conspect-config">
          <Button onclick={() => {}} cssClass="config" children={"Short"} isFilled={false} />
          <Button onclick={() => {}} cssClass="config" children={"Without changes"} isFilled={false} />
          <Button onclick={() => {}} cssClass="config" children={"Expanded"} isFilled={false} />
        </div>

        <div className="actions">
          <Button 
            IconLeft={audioIcon}
            children="Voice"
            cssClass="record-button"
            onclick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default UserComposer;
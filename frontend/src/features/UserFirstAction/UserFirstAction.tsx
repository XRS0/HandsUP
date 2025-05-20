import React, { ChangeEvent, HTMLAttributes, useEffect } from "react";
import Button from "@/views/Button/ui/Button";
import Dropdown from "@views/Dropdown/Dropdown";
import useAnimation from "@/hooks/useAnimation";

import "./UserFirstAction.scss";

import audioIcon from "@assets/main-page/audio-visualize.svg?react";
import computerIcon from "@assets/main-page/computer.svg?react";
import importIcon from "@assets/main-page/import-icon.svg?react";
import linkIcon from "@assets/main-page/link.svg?react";
import { createClassName } from "@/shared/utils/createClassName";
import { useAppDispatch } from "@/hooks/redux";

type OwnProps = HTMLAttributes<HTMLDivElement> & {
  isFadeOut: boolean,
  onVoice: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const UserFirstAction: React.FC<OwnProps> = ({onVoice, isFadeOut, onAnimationEnd}) => {
  const {
    containerRef,
    isVisible,
    isFadeOut: isDropdownFadeOut,
    eventHandlers,
    handleOpen,
    handleAnimationEnd
  } = useAnimation<HTMLDivElement>({
    trigger: "hover",
    closeOnOutsideClick: true,
    initialVsibility: false
  });

  const dispatch = useAppDispatch();

  const handleButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch({ type: 'socket/connect', url: process.env.REST_BASE_URL });
    onVoice(e);
  }

  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: 'socket/disconnect' })
  //   }
  // }, []);

  return (
    <div 
      onAnimationEnd={onAnimationEnd}
      className={createClassName(
        "begin-action-block",
        isFadeOut && "--exit"
      )}
    >
      <div className="title">Welcome to the che<span>rr</span>y</div>
      <div className="action-container">
        <div className="message-block">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis potenti
          morbi pellentesque sodales suscipit ultricies. Tellus hac primis
          vestibulum aliquet platea convallis gravida, quam suspendisse.
          Praesent consequat.
        </div>
        <div className="actions">
          <Button
            children="Voice"
            IconLeft={audioIcon}
            cssClass="button"
            onclick={handleButtonClick}
          />
          <div
            ref={containerRef}
            className="button-dropdown-container"
            onAnimationEnd={handleAnimationEnd}
            {...eventHandlers}
          >
            <Button
              onclick={() => {}}
              children="Import"
              IconLeft={importIcon}
              cssClass={`secondary-button button`}
            />
            {isVisible && 
              <Dropdown
                doesAnimate={!isDropdownFadeOut}
                orientation="column"
              >
                <Button 
                  children="Paste from clipboard"
                  cssClass="dropdown-button"
                  IconLeft={linkIcon}
                  onclick={() => handleOpen}
                />
                <Button
                  children="Text file on computer"
                  cssClass="dropdown-button"
                  IconLeft={computerIcon}
                  onclick={() => handleOpen}
                />
              </Dropdown>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFirstAction;
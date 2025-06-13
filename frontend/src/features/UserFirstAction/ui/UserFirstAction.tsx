import React, { HTMLAttributes } from "react";
import useAnimation from "@/hooks/useAnimation";

import "./UserFirstAction.scss";
import { createClassName } from "@/shared/utils/createClassName";
import StartRecordingButton from "../containers/StartRecordingButton";
import ImportButton from "../containers/ImportButton";
import Button from "@/views/Button/ui/Button";

import importIcon from "@assets/main-page/icons/import-icon.svg?react";

type OwnProps = HTMLAttributes<HTMLDivElement> & {
  isFadeOut: boolean;
  onVoice: (e: React.MouseEvent<HTMLElement>) => void;
}

const UserFirstAction: React.FC<OwnProps> = ({onVoice, isFadeOut, onAnimationEnd}) => {
  const {
    containerRef,
    isVisible,
    isFadeOut: isDropdownFadeOut,
    eventHandlers,
    // handleOpen,
    handleAnimationEnd
  } = useAnimation<HTMLDivElement>({
    trigger: "hover",
    initialVsibility: false
  });

  return (
    <div 
      onAnimationEnd={onAnimationEnd}
      className={createClassName(
        "begin-action-block",
        isFadeOut && "--exit"
      )}
    >
      <div className="title">Welcome to the <span>Hands Up</span></div>
      <div className="action-container">
        <div className="message-block">
          Больше не нужно тратить время на ручную запись — просто говорите, а наш сервис оформит в удобный формат. Поддерживаются разные языки. Экономьте время, и работайте продуктивнее!
        </div>
        <div className="actions">
          <StartRecordingButton startAnimation={onVoice} />
          
          {document.body.offsetWidth <= 1330
            ? <Button
                onclick={() => {}}
                children="Import"
                IconLeft={importIcon}
                cssClass={`secondary-button button`}
              />
            : <div
              ref={containerRef}
              className="button-dropdown-container"
              onAnimationEnd={handleAnimationEnd}
              {...eventHandlers}
            >
              <ImportButton
                // handleOpen={handleOpen}
                isVisible={isVisible}
                isDropdownFadeOut={isDropdownFadeOut}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default UserFirstAction;
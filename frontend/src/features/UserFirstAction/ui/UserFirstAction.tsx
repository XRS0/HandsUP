import React, { HTMLAttributes } from "react";
import useAnimation from "@/hooks/useAnimation";

import "./UserFirstAction.scss";
import { createClassName } from "@/shared/utils/createClassName";
import StartRecordingButton from "../containers/StartRecordingButton";
import ImportButton from "../containers/ImportButton";

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
    handleOpen,
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
          Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis potenti
          morbi pellentesque sodales suscipit ultricies. Tellus hac primis
          vestibulum aliquet platea convallis gravida, quam suspendisse.
          Praesent consequat.
        </div>
        <div className="actions">
          <StartRecordingButton startAnimation={onVoice} />
          <div
            ref={containerRef}
            className="button-dropdown-container"
            onAnimationEnd={handleAnimationEnd}
            {...eventHandlers}
          >
            <ImportButton
              handleOpen={handleOpen}
              isVisible={isVisible}
              isDropdownFadeOut={isDropdownFadeOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFirstAction;
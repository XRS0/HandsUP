import React from "react";

import "./ui/MainPage.scss";

import Sidebar from "./ui/Sidebar";
import useAnimation from "../../hooks/useAnimation";
import UserFirstAction from "../../features/UserFirstAction/UserFirstAction";
import ConspectMessageBlock from "./containers/ConspectMessageBlock";
import UserRecorder from "@/features/UserRecorder/ui/UserRecorder";
import UserComposer from "@/features/UserComposer/UserComposer";
import MDMessageBlock from "./containers/MDMessageBlock";

const MainPage = () => {
  const {
    handleAnimationEnd,
    handleOpen: handleBlockClose,
    isVisible,
    isFadeOut: isFadeOutBlock
  } = useAnimation({trigger: "click", initialVsibility: true});

  const {
    handleAnimationEnd: handleRecorderUnmount,
    handleOpen: handleComposerOpen,
    isVisible: isRecorderVisible,
    isFadeOut: isRecorderFadeOut
  } = useAnimation({trigger: "click", initialVsibility: true});

  return (
    <div className="wrapper">
      <Sidebar />

      <div className="chat-wrapper">
        <div className="chat-background">
          <div className="chat">
            <ConspectMessageBlock />
            <MDMessageBlock />

            { isVisible &&
            <UserFirstAction
              onVoice={handleBlockClose}
              onAnimationEnd={handleAnimationEnd}
              isFadeOut={isFadeOutBlock}
            />}

            {((isFadeOutBlock || !isVisible) && isRecorderVisible)
              && <UserRecorder
              isFadeOut={isRecorderFadeOut}
              onAnimationEnd={handleRecorderUnmount}
              onStop={handleComposerOpen}
            />}
            {(isRecorderFadeOut || !isRecorderVisible) && <UserComposer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
export const sum = (a: number, b: number) => a + b;
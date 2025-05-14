import React, { useEffect } from "react";

import "./ui/MainPage.scss";

import Sidebar from "./ui/Sidebar";
import UserComposer from "./features/UserComposer/UserComposer";
import useAnimation from "../../hooks/useAnimation";
import UserFirstAction from "./features/UserFirstAction/UserFirstAction";
import { useDispatch } from "react-redux";
import ConspectMessageBlock from "./containers/ConspectMessageBlock";
import UserManager from "@/features/UserMenu";

const MainPage = () => {
  const {
    handleAnimationEnd,
    handleOpen: handleBlockClose,
    isVisible,
    isFadeOut: isFadeOutBlock
  } = useAnimation({trigger: "click", initialVsibility: true});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "WS_CONNECT",
      payload: {
        url: "ws://placeholder.net/ws",
        socketName: "bobon'ka"
      }
    });
  }, []);

  return (
    <>
    <UserManager />
    <div className="wrapper">
      <Sidebar />

      <div className="chat-wrapper">
        <div className="chat-background">
          <div className="chat">
            <ConspectMessageBlock socketName="realtimeTextRender" />

            { isVisible &&
            <UserFirstAction
              onVoice={handleBlockClose}
              onAnimationEnd={handleAnimationEnd}
              isFadeOut={isFadeOutBlock}
            />}

            {(isFadeOutBlock || !isVisible) && <UserComposer />}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MainPage;
export const sum = (a: number, b: number) => a + b;
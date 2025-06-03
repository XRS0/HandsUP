import UserComposer from "@/features/UserComposer/UserComposer";
import { JSX } from "react";
import { useAppSelector } from "@/hooks/redux";
import { UserFirstAction } from "@/features/UserFirstAction";
import useAnimation from "@/hooks/useAnimation";
import UserRecorder from "@/features/UserRecorder/ui/UserRecorder";
import StaticMessage from "@/features/ChatMessage/ui/StaticMessge";
import { MessageBlock } from "@/features/ChatMessage";

import "../ui/LoadedChat.scss";

import logo from "@assets/welcome-page/logo.svg";

const Chat = () => {
  const { chatMessages } = useAppSelector(state => state.chat);
  const { currentTopic } = useAppSelector(state => state.topics);
  const { isRecording } = useAppSelector(state => state.socket);

  if (!currentTopic) return (
    <div className="without-topic">
      <img src={logo} alt="Logo" className="side-logo" />
      <div>
        Создайте новую <span>тему </span>
        или выберите <span>существующую</span>
      </div>
    </div>
  );

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

  if (chatMessages.length == 0 || isVisible) return (
    <UserFirstAction
      onVoice={handleBlockClose}
      onAnimationEnd={handleAnimationEnd}
      isFadeOut={isFadeOutBlock}
    />
  );

  let currentComposer: JSX.Element | null = null;

  if (chatMessages.length === 0) currentComposer = <UserComposer />;
  else if ((isFadeOutBlock || !isVisible) && isRecorderVisible) {
    currentComposer = <UserRecorder
      isFadeOut={isRecorderFadeOut}
      onAnimationEnd={handleRecorderUnmount}
      onStop={handleComposerOpen}
    />
  }
  else if (isRecorderFadeOut || !isRecorderVisible) currentComposer = <UserComposer />
  
  return (
    <div className="loaded-chat">
      <div className="messages-wrapper">
        <div className="gradient-top" />

        <div 
          className={"loaded-messages custom-scroll"}
        >
          {chatMessages.map(({from, text}) => <StaticMessage from={from} message={text} />)}
          {isRecording && <MessageBlock />}
        </div>

        <div className="gradient-bottom" />
      </div>
    
      {currentComposer}
    </div>
  );
}

export default Chat;
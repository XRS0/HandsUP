import UserComposer from "@/features/UserComposer/UserComposer";
import { JSX, useMemo } from "react";
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

  const isChatEmpty = chatMessages.length === 0;

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

  const currentComposer = useMemo(() => {
    if (!isChatEmpty) return <UserComposer />

    else if ((isFadeOutBlock || !isVisible) && isRecorderVisible) {
      return <UserRecorder
        isFadeOut={isRecorderFadeOut}
        onAnimationEnd={handleRecorderUnmount}
        onStop={handleComposerOpen}
      />
    }

    else if (isRecorderFadeOut || !isRecorderVisible) return <UserComposer />
  }, [
    isVisible, 
    isChatEmpty, 
    isFadeOutBlock, 
    isRecorderVisible,
    handleComposerOpen,
    handleRecorderUnmount,
  ]);

  const reversedMessages = useMemo(() => [...chatMessages].reverse(), [chatMessages]);

  if (!currentTopic) return (
    <div className="without-topic">
      <img src={logo} alt="Logo" className="side-logo" />
      <div>
        Создайте новую <span>тему </span>
        или выберите <span>существующую</span>
      </div>
    </div>
  );

  if (isChatEmpty && isVisible) return (
    <UserFirstAction
      onVoice={handleBlockClose}
      onAnimationEnd={handleAnimationEnd}
      isFadeOut={isFadeOutBlock}
    />
  );

  return (
    <div className="loaded-chat">
      <div className="messages-wrapper">
        <div className="gradient-top" />

        <div className="loaded-messages custom-scroll" style={isChatEmpty ? {justifyContent: "center"} : {}}>
          {((!isChatEmpty && isRecording) || isChatEmpty) && <MessageBlock />}                                  {/*Если чат пустой или если чат не пустой и идет запись*/}
          {reversedMessages.map(({from, text}) => <StaticMessage from={from} message={text} />)}
        </div>

        <div className="gradient-bottom" />
      </div>
    
      {currentComposer}
    </div>
  );
}

export default Chat;
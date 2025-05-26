import { useAppSelector } from "@/hooks/redux";
import { UserFirstAction } from "@/features/UserFirstAction";
import UserComposer from "@/features/UserComposer/UserComposer";
import UserRecorder from "@/features/UserRecorder/ui/UserRecorder";
import ChatMessage from "@/features/ChatMessage/containers/ChatMessage";

import "../ui/LoadedChat.scss";

import useAnimation from "@/hooks/useAnimation";
import logo from "@assets/welcome-page/logo.svg";


const BeginChat = () => {
  const {currentTopic} = useAppSelector(state => state.topics);
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

  if (!currentTopic) return (
    <div className="without-topic">
      <img src={logo} alt="Logo" className="side-logo" />
      <div>
        Создайте новую <span>тему </span>
        или выберите <span>существующую</span>
      </div>
    </div>
  );

  return (
    isVisible 
    ? <div className="chat">
      <UserFirstAction
        onVoice={handleBlockClose}
        onAnimationEnd={handleAnimationEnd}
        isFadeOut={isFadeOutBlock}
      />
    </div>  
    : <div className="loaded-chat">
        <div className="messages-wrapper">
          <div className="gradient-top" />

          <div className="loaded-messages custom-scroll begin-chat">
            {!isVisible && <ChatMessage />}
          </div>

          <div className="gradient-bottom" />
        </div>

        {((isFadeOutBlock || !isVisible) && isRecorderVisible)
        && <UserRecorder
          isFadeOut={isRecorderFadeOut}
          onAnimationEnd={handleRecorderUnmount}
          onStop={handleComposerOpen}
        />}

        {(isRecorderFadeOut || !isRecorderVisible) && <UserComposer />}
      </div>
  );
}

export default BeginChat;
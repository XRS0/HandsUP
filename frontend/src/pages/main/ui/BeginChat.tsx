import ChatMessage from "@/features/ChatMessage/containers/ChatMessage";
import UserRecorder from "@/features/UserRecorder/ui/UserRecorder";
import UserComposer from "@/features/UserComposer/UserComposer"
import { UserFirstAction } from "@/features/UserFirstAction";
import { useAppSelector } from "@/hooks/redux";
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

  return (
    !currentTopic 
    ? <div className="without-topic">
        <img src={logo} alt="Logo" className="side-logo" />
        <div>
          Создайте новую <span>тему </span>
          или выберите <span>существующую</span>
        </div>
      </div>
    : <div className="chat">
      {/* <MDMessageBlock /> */}
      { !isVisible && <ChatMessage /> }

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
    </div>
  );
}

export default BeginChat;
import ChatMessage from "@/features/ChatMessage/containers/ChatMessage"
import UserComposer from "@/features/UserComposer/UserComposer"
import { UserFirstAction } from "@/features/UserFirstAction";
import UserRecorder from "@/features/UserRecorder/ui/UserRecorder";
import useAnimation from "@/hooks/useAnimation";

const BeginChat = () => {
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
    <div className="chat">
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
      {(isRecorderFadeOut || !isRecorderVisible) && <UserComposer />}
    </div>
  );
}

export default BeginChat;
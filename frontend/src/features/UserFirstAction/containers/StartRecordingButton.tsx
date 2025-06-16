import { selectToken } from "@/features/AuthUser";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Button from "@/views/Button/ui/Button";

import audioIcon from "@assets/main-page/audio-visualize.svg?react";

type OwnProps = {
  startAnimation: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
}

const StartRecordingButton: React.FC<OwnProps> = ({startAnimation}) => {
  const dispatch = useAppDispatch();
  const topic = useAppSelector(state => state.topics.currentTopic);
  const token = useAppSelector(selectToken);

  const handleButtonClick = async (e: React.MouseEvent<HTMLElement>) => {
    if (!topic || !token) return;

    dispatch({ 
      type: 'socket/connect', 
      url: process.env.WS_TRANSCRIBE_URL, 
      payload: {
        topic,
        token
      }
    });
    
    startAnimation(e);
  }

  return (
    <Button
      children="Voice"
      IconLeft={audioIcon}
      cssClass="button"
      onclick={handleButtonClick}
    />
  );
}

export default StartRecordingButton;
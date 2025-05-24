import { useAppDispatch } from "@/hooks/redux";
import Button from "@/views/Button/ui/Button";

import audioIcon from "@assets/main-page/audio-visualize.svg?react";

type OwnProps = {
  startAnimation: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
}

const StartRecordingButton: React.FC<OwnProps> = ({startAnimation}) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = async (e: React.MouseEvent<HTMLElement>) => {
    // await startRecording();     // only for testing
    dispatch({ type: 'socket/connect', url: process.env.WS_TRANSCRIBE_URL });
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
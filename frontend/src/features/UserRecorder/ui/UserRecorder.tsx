import React, { use, useEffect, useRef, useState } from "react";
import Button from "@/views/Button/ui/Button";

import "./UserRecorder.scss";

import playIcon from "@/shared/assets/main-page/icons/play_icon.svg";
import pauseIcon from "@/shared/assets/main-page/icons/pause_icon.svg";
import editIcon from "@/shared/assets/main-page/icons/edit_icon.svg?react";
import linkIcon from "@/shared/assets/main-page/icons/link.svg?react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { continueRecording, pauseRecording, stopRecording } from "@/entities/recorder/recorder";
import { createClassName } from "@/shared/utils/createClassName";
import { socketSliceActions } from "@/entities/websocket/slice";

type OwnProps = {
  onStop: (e: React.MouseEvent<HTMLElement>) => void;
  onAnimationEnd: React.AnimationEventHandler<HTMLDivElement>;
  isFadeOut: boolean;
}

const UserRecorder: React.FC<OwnProps> = ({ isFadeOut, onAnimationEnd, onStop}) => {
  const [timer, setTimer] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const timerId= useRef<NodeJS.Timeout | null>(null);
  const { isRecording, isEditingNow, message } = useAppSelector(state => state.socket);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRecording) {
      timerId.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (!timerId.current) return;

      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, [isRecording]);

  const recordTime = () => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor(timer / 60) - hours * 60;
    const seconds = timer % 60;

    const time = [hours, minutes, seconds].map(e => e.toString().padStart(2, "0"));
    return `${time.join(":")}`;
    //${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}
  }

  const copyToCLipboard = () => {
    navigator.clipboard.writeText(message.join(" "));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }

  const handlePauseRecord = () => isRecording ? pauseRecording() : continueRecording();   // for testing
  const handleStopRecording = (e: React.MouseEvent<HTMLElement>) => {
    stopRecording();
    onStop(e);
  }

  return (
    <div 
      onAnimationEnd={onAnimationEnd}
      className={createClassName(
        "user-recorder", 
        !isFadeOut ? "--enter" : "--exit"
      )}
    >
      <div className="recorder-container">
        <div className="tools-block">
          <div
            style={isRecording ? {color: "#707070"} : {color: "#AAA"}}
            className="record-time"
          >
            {recordTime()}
          </div>

          <div className="conspect-interaction">
            <Button 
              children={"Изменить"}  
              cssClass="interaction" 
              isDisabled={isRecording || isEditingNow}
              IconLeft={editIcon} 
              onclick={() => dispatch(socketSliceActions.allowEdit())} 
            />

            <Button 
              children={isCopied ? "Скопировано" : "Копировать"}
              cssClass="copy-button interaction"
              isDisabled={isRecording || isEditingNow}
              IconLeft={linkIcon} 
              onclick={copyToCLipboard}
            />
          </div>
        </div>

        <div className="actions">
          <Button
            cssClass="stop-button action-button"
            onclick={handleStopRecording}
          >
            <div className="square-icon"></div>
          </Button>

          <Button
            cssClass={createClassName("action-button", !isRecording && "paused")}
            onclick={handlePauseRecord}
          >
            <img 
              id="play-icon"
              src={playIcon}
              alt="play"
            />

            <img 
              id="pause-icon"
              src={pauseIcon}
              alt="pause" 
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserRecorder;
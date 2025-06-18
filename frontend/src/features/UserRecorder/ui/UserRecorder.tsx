import React, { useEffect, useRef, useState } from "react";
import Button from "@/views/Button/ui/Button";

import "./UserRecorder.scss";

import playIcon from "@/shared/assets/main-page/icons/play_icon.svg";
import pauseIcon from "@/shared/assets/main-page/icons/pause_icon.svg";
import editIcon from "@/shared/assets/main-page/icons/edit_icon.svg?react";
import linkIcon from "@/shared/assets/main-page/icons/link.svg?react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { continueRecording, pauseRecording, stopRecording } from "@/entities/recorder/recorder";
import { createClassName } from "@/shared/utils/createClassName";
import { SocketSliceActions } from "@/entities/websocket/models/slice";

type OwnProps = {
  onStop: (e: React.MouseEvent<HTMLElement>) => void;
  onAnimationEnd: React.AnimationEventHandler<HTMLDivElement>;
  isFadeOut: boolean;
}

const UserRecorder: React.FC<OwnProps> = ({ isFadeOut, onAnimationEnd, onStop}) => {
  const { isRecording, isEditingNow, message } = useAppSelector(state => state.socket);
  const topic = useAppSelector(state => state.topics.currentTopic);
  const dispatch = useAppDispatch();

  const [isCopied, setIsCopied] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);

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
  }

  const copyToCLipboard = () => {
    navigator.clipboard.writeText(message);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }

  const handlePauseRecord = () => isRecording ? pauseRecording() : continueRecording();
  const handleStopRecording = (e: React.MouseEvent<HTMLElement>) => {
    onStop(e);
    stopRecording(message, topic!);
  }

  const actionButtons = <div className="conspect-interaction">
    <Button 
      children={document.body.offsetWidth >= 670 || document.body.offsetWidth <= 480
        ? "Изменить" : "Изм."}
      cssClass="interaction" 
      isDisabled={isRecording || isEditingNow}
      IconLeft={editIcon} 
      onclick={() => dispatch(SocketSliceActions.allowEdit())} 
    />

    <Button 
      children={ isCopied 
        ? document.body.offsetWidth >= 670 || document.body.offsetWidth <= 480
        ? "Скопировано" : "Скоп." 
        : document.body.offsetWidth >= 670 || document.body.offsetWidth <= 480
        ? "Копировать" : "Коп."
      }
      cssClass="copy-button interaction"
      isDisabled={isRecording || isEditingNow}
      IconLeft={linkIcon} 
      onclick={copyToCLipboard}
    />
  </div>

  const recorderButtons = <div className="actions">
    <Button
      cssClass="stop-button action-button"
      onclick={handleStopRecording}
      isDisabled={isEditingNow}
    >
      <div className="square-icon"></div>
    </Button>

    <Button
      cssClass={createClassName("action-button", !isRecording && "paused")}
      onclick={handlePauseRecord}
      isDisabled={isEditingNow}
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

  if (document.body.offsetWidth <= 480) return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={createClassName("user-recorder", !isFadeOut ? "--enter" : "--exit")}>
      <div className="recorder-container">
        <div
          style={isRecording ? {color: "#707070"} : {color: "#AAA"}}
          className="record-time"
        >{recordTime()}</div>

        {recorderButtons}
      </div>
      {actionButtons}
    </div>
  );

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

          {actionButtons}
        </div>

        {recorderButtons}
      </div>
    </div>
  );
}

export default UserRecorder;
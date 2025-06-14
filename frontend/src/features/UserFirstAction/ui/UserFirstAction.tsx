import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import useAnimation from "@/hooks/useAnimation";

import "./UserFirstAction.scss";
import { createClassName } from "@/shared/utils/createClassName";
import StartRecordingButton from "../containers/StartRecordingButton";
import ImportButton from "../containers/ImportButton";
import Button from "@/views/Button/ui/Button";

import importIcon from "@assets/main-page/icons/import-icon.svg?react";
import { useAppDispatch } from "@/hooks/redux";
import { SocketSliceActions } from "@/entities/websocket/models/slice";

type OwnProps = HTMLAttributes<HTMLDivElement> & {
  isFadeOut: boolean;
  onVoice: (e: React.MouseEvent<HTMLElement>) => void;
}

const UserFirstAction: React.FC<OwnProps> = ({onVoice, isFadeOut, onAnimationEnd}) => {
  const dispatch = useAppDispatch();
  const uploadRef = useRef<HTMLInputElement>(null); 
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (uploadRef.current?.files?.length) {
      if (file) dispatch(SocketSliceActions.uploadMessage({ file }));
      setFile(null);
    }
  }, [file]);
  
  const {
    containerRef,
    isVisible,
    isFadeOut: isDropdownFadeOut,
    eventHandlers,
    handleOpen,
    handleAnimationEnd
  } = useAnimation<HTMLDivElement>({
    trigger: "hover",
    initialVsibility: false
  });

  return (
    <div 
      onAnimationEnd={onAnimationEnd}
      className={createClassName(
        "begin-action-block",
        isFadeOut && "--exit"
      )}
    >
      <div className="title">Welcome to the <span>Hands Up</span></div>
      <div className="action-container">
        <div className="message-block">
          Больше не нужно тратить время на ручную запись — просто говорите, а наш сервис оформит в удобный формат. Поддерживаются разные языки. Экономьте время, и работайте продуктивнее!
        </div>
        <div className="actions">
          <StartRecordingButton startAnimation={onVoice} />
          
          {document.body.offsetWidth <= 1330
            ? <Button
                onclick={() => uploadRef.current?.click()}
                children="Import"
                IconLeft={importIcon}
                cssClass={`secondary-button button`}
              />
            : <div
              ref={containerRef}
              className="button-dropdown-container"
              onAnimationEnd={handleAnimationEnd}
              {...eventHandlers}
            >
              <ImportButton
                handleOpen={handleOpen}
                isVisible={isVisible}
                isDropdownFadeOut={isDropdownFadeOut}
                onClick={() => uploadRef.current?.click()}
              />
            </div>
          }

          <input type="file" accept=".wav,.mp3" ref={uploadRef}
            onChange={() => {
              if (uploadRef.current && uploadRef.current.files) {
                setFile(uploadRef.current.files[0])
              }
              
              console.log('Файл для загрузки выбран');
            }}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserFirstAction;
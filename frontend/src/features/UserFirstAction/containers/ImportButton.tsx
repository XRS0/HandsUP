import { SocketSliceActions } from "@/entities/websocket/models/slice";
import { useAppDispatch } from "@/hooks/redux";
import Button from "@/views/Button/ui/Button";
import Dropdown from "@/views/Dropdown/Dropdown";

import computerIcon from "@assets/main-page/icons/computer.svg?react";
import importIcon from "@assets/main-page/icons/import-icon.svg?react";
import linkIcon from "@assets/main-page/icons/link.svg?react";
import { useRef } from "react";

type OwnProps =  {
  isVisible: boolean,
  isDropdownFadeOut: boolean,
  // handleOpen: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ImportButton: React.FC<OwnProps> = ({isDropdownFadeOut, isVisible}) => {
  const dispatch = useAppDispatch();
  const uploadRef = useRef<HTMLInputElement>(null)  
  
  const handleUpload = () => {
    uploadRef.current?.click();

    if (uploadRef.current?.files) {
      dispatch(SocketSliceActions.uploadMessage(uploadRef.current.files[0]));
    }
  }

  return (
    <>
      <Button
        onclick={() => {}}
        children="Import"
        IconLeft={importIcon}
        cssClass={`secondary-button button`}
      />
      {isVisible && 
        <Dropdown
        isOpen={isVisible}
          doesAnimate={!isDropdownFadeOut}
          orientation="column"
        >
          <Button 
            children="Import you audio file"
            cssClass="dropdown-button"
            IconLeft={linkIcon}
            onclick={handleUpload}
          />
          <Button
            children="Text file on computer"
            isDisabled
            cssClass="dropdown-button"
            IconLeft={computerIcon}
            onclick={handleUpload}
          />
        </Dropdown>
      }

      <input type="file" accept=".wav,.mp3" ref={uploadRef} 
        onChange={() => console.log('Файл для загрузки выбран')} 
        style={{ display: 'none' }} 
      />
    </>
  );
}

export default ImportButton;
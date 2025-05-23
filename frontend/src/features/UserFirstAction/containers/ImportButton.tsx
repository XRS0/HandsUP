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
  handleOpen: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ImportButton: React.FC<OwnProps> = ({isDropdownFadeOut, isVisible, handleOpen}) => {
  const dispatch = useAppDispatch();
  const uploadRef = useRef<HTMLInputElement>(null)  
  const handleUpload = () => {
    uploadRef.current?.click();
  }

  //TODO: convert a file and dispatch it

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
            cssClass="dropdown-button"
            IconLeft={computerIcon}
            onclick={handleUpload}
          />
        </Dropdown>
      }

      <input type="file" ref={uploadRef} 
        onChange={() => console.log('Файл для загрузки выбран')} 
        style={{ display: 'none' }} 
      />
    </>
  );
}

export default ImportButton;
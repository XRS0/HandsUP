import Button from "@/views/Button/ui/Button";
import Dropdown from "@/views/Dropdown/Dropdown";

import computerIcon from "@assets/main-page/icons/computer.svg?react";
import importIcon from "@assets/main-page/icons/import-icon.svg?react";
import linkIcon from "@assets/main-page/icons/link.svg?react";

type OwnProps =  {
  isVisible: boolean,
  isDropdownFadeOut: boolean,
  handleOpen: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick: () => void
}

const ImportButton: React.FC<OwnProps> = ({ isDropdownFadeOut, isVisible, onClick }) => {
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
            onclick={onClick}
          />
          <Button
            children="Text file on computer"
            isDisabled
            cssClass="dropdown-button"
            IconLeft={computerIcon}
            onclick={() => {}}
          />
        </Dropdown>
      }
    </>
  );
}

export default ImportButton;
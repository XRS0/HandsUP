import React, { useRef } from "react";

import "../../ui/Topic.scss";
import "@views/Dropdown/Dropdown.scss";

import MenuField from "../../ui/MenuField";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/store";
import Dropdown from "@/views/Dropdown/Dropdown";
import Button from "@/views/Button/ui/Button";

import DropArrowIcon from "@/shared/assets/main-page/dropdown-arrow.svg?react";
import { createPortal } from "react-dom";

type OwnProps = {
  ref: React.Ref<HTMLDivElement> | undefined
}

//обязательно с большой буквы надо писать компонент

const Settings: React.FC<OwnProps> = ({ ref }) => {
  //const user = useSelector((state: RootState) => state);

  const dropdownLangRef = useRef<HTMLDivElement>(null);
  const openContainerLangRef = useRef<HTMLDivElement>(null);

  const dropdownThemeRef = useRef<HTMLDivElement>(null);
  const openContainerThemeRef = useRef<HTMLDivElement>(null);

  const handleDropdownOpen = (
    dropdownRef: React.RefObject<HTMLDivElement | null>,
    containerRef: React.RefObject<HTMLDivElement | null>,
    event?: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const dropdown = dropdownRef.current;
    const openContainer = containerRef.current;
    
    if (!dropdown || !openContainer) return;
    if (dropdown.classList.contains("hidden")) {
      const openRect = openContainer.getBoundingClientRect();

      dropdown.style.width = openRect.width + "px";
      dropdown.style.top = openRect.y + openRect.height + 5 + "px";
      dropdown.style.left = openRect.x + "px";

      dropdown.classList.remove("hidden");
    } else {
      if (event?.currentTarget.textContent) {
        openContainer.querySelector("span")!.textContent = event.currentTarget.textContent;
      }
      dropdown.classList.add("hidden");
    }
  }

  return (
    <div className="topic" ref={ref}>
      <MenuField name="Language" value={
        <div className="dropdown-container">
          <div className="dropdown-activator" onClick={() => handleDropdownOpen(dropdownLangRef, openContainerLangRef)} ref={openContainerLangRef}>
            <span>English</span>
             <DropArrowIcon style={{marginLeft: "6px"}} />
          </div>

          {createPortal(
            <Dropdown orientation="column" ref={dropdownLangRef} cssClass="topic-dropdown">
            <Button
              cssClass="dropdown-button"
              onclick={(e) => handleDropdownOpen(dropdownLangRef, openContainerLangRef, e)}
              children="Russian"
            />

            <Button
              cssClass="dropdown-button" 
              onclick={(e) => handleDropdownOpen(dropdownLangRef, openContainerLangRef, e)}
              children="English"
            />
          </Dropdown>,
          document.body
          )}
          
        </div>
      }/>
      
      <MenuField name="Theme" line value={
        <div className="dropdown-container">
          <div className="dropdown-activator" onClick={() => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef)} ref={openContainerThemeRef}>
            <span>Dark</span>
            <DropArrowIcon style={{marginLeft: "6px"}} />
          </div>

          {createPortal(
            <Dropdown orientation="column" cssClass="topic-dropdown" ref={dropdownThemeRef}>
            <Button
              cssClass="dropdown-button"
              onclick={(e) => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef, e)}
              children="Dark"
            />

            <Button
              cssClass="dropdown-button" 
              onclick={(e) => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef, e)}
              children="Light"
            />

            <Button
              cssClass="dropdown-button" 
              onclick={(e) => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef, e)}
              children="System"
            />
          </Dropdown>,
          document.body
          )}
        </div>
      }/>
    </div>
  );
}

export default Settings;
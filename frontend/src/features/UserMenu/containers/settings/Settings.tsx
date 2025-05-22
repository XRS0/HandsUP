import React, { useRef } from "react";

import "../../ui/Topic.scss";
import "@views/Dropdown/Dropdown.scss";

import MenuField from "../../ui/MenuField";
import Dropdown from "@/views/Dropdown/Dropdown";
import Button from "@/views/Button/ui/Button";

import DropArrowIcon from "@/shared/assets/main-page/icons/dropdown-arrow.svg?react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { appLanguage, appTheme, settingsSliceActions } from "../../models/slice";

type OwnProps = {
  ref: React.Ref<HTMLDivElement> | undefined
}

const Settings: React.FC<OwnProps> = ({ ref }) => {
  const {language, theme} = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  const dropdownLangRef = useRef<HTMLDivElement>(null);
  const openContainerLangRef = useRef<HTMLDivElement>(null);

  const dropdownThemeRef = useRef<HTMLDivElement>(null);
  const openContainerThemeRef = useRef<HTMLDivElement>(null);

  const handleDropdownOpen = (
    dropdownRef: React.RefObject<HTMLDivElement | null>,
    containerRef: React.RefObject<HTMLDivElement | null>,
    event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    const dropdown = dropdownRef.current;
    const openContainer = containerRef.current;
    
    if (!dropdown || !openContainer) return;

    if (event?.currentTarget === openContainer) {
      if (!dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
        return;
      }
    }

    if (dropdown.classList.contains("hidden")) {
      const openRect = openContainer.getBoundingClientRect();

      dropdown.style.width = openRect.width + "px";
      dropdown.style.top = openRect.y + openRect.height + 5 + "px";
      dropdown.style.left = openRect.x + "px";

      dropdown.classList.remove("hidden");
    } else {
      // if (event?.currentTarget.textContent) {
      //   openContainer.querySelector("span")!.textContent = event.currentTarget.textContent;
      // }

      if (event?.currentTarget instanceof HTMLDivElement) return;

      dispatch(settingsSliceActions.switchSetting({
        setting: event!.currentTarget.name as "language" | "theme",
        option: event!.currentTarget.textContent as appLanguage & appTheme
      }))
      dropdown.classList.add("hidden");
    }
  }

  return (
    <div className="topic" ref={ref}>
      <MenuField name="Language" value={
        <div className="dropdown-container">
          <div className="dropdown-activator" onClick={(e) => handleDropdownOpen(dropdownLangRef, openContainerLangRef, e)} ref={openContainerLangRef}>
            <span>{language}</span>
             <DropArrowIcon style={{marginLeft: "6px"}} />
          </div>

          {createPortal(
            <Dropdown orientation="column" ref={dropdownLangRef} cssClass="topic-dropdown">
              <Button
                name="language"
                children="Русский"
                cssClass="dropdown-button"
                onclick={(e) => handleDropdownOpen(dropdownLangRef, openContainerLangRef, e)}
              />

              <Button
                name="language"
                children="English"
                cssClass="dropdown-button" 
                onclick={(e) => handleDropdownOpen(dropdownLangRef, openContainerLangRef, e)}
              />
            </Dropdown>,
            document.body
          )}
          
        </div>
      }/>
      
      <MenuField name="Theme" line value={
        <div className="dropdown-container">
          <div className="dropdown-activator" onClick={(e) => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef, e)} ref={openContainerThemeRef}>
            <span>{theme}</span>
            <DropArrowIcon style={{marginLeft: "6px"}} />
          </div>

          {createPortal(
            <Dropdown orientation="column" cssClass="topic-dropdown" ref={dropdownThemeRef}>
            <Button
              name="theme"
              children="Dark"
              cssClass="dropdown-button"
              onclick={(e) => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef, e)}
            />

            <Button
              name="theme"
              children="Light"
              cssClass="dropdown-button" 
              onclick={(e) => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef, e)}
            />

            <Button
              name="theme"
              children="System"
              cssClass="dropdown-button" 
              onclick={(e) => handleDropdownOpen(dropdownThemeRef, openContainerThemeRef, e)}
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
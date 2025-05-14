import React, { useRef, useState } from "react";
import ModalOverflow from "./ui/ModalOverflow";

import "./ui/UserMenu.scss";
import { createClassName } from "@/shared/utils/createClassName";
import Profile from "./containers/profile/Profile";
import Balance from "./containers/balance/Balance";
import Settings from "./containers/settings/Settings";

const UserMenu = () => {
  const menuBlock = useRef<HTMLDivElement>(null);
  const hintLine = useRef<HTMLDivElement>(null);
  const transitionBlock = useRef<HTMLDivElement>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const balanceRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const [topics, setTopics] = useState<
    {[key: string]: boolean}
  >({
    Profile: true,
    Balance: false,
    Settings: false,
  });

  const handleTopicClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    const topic = event.currentTarget;
    const parent = topic.parentElement;

    if ( !topic || !parent || !menuBlock.current) return;

    const translations = ["0px", "-498px", "-996px"];  // c вычетом border

    const refList = [profileRef.current, balanceRef.current, settingsRef.current];
    const offsetLeft = topic.getBoundingClientRect().left - parent.getBoundingClientRect().left;
    
    hintLine.current!.style.width = topic.offsetWidth + 4 + "px";
    hintLine.current!.style.left = offsetLeft - 2 + "px";

    const topicsArr = Array.from(Object.keys(topics));
    const topicsStatusesArr = Array.from(Object.values(topics));

    // обнуляем значения
    transitionBlock.current!.style.animation = 'none';
    menuBlock.current.style.height = window.getComputedStyle(menuBlock.current).height;
    
    // меняем переменные на те, куда хотим переход
    document.documentElement.style.setProperty('--slide-from', translations[topicsStatusesArr.indexOf(true)]);
    document.documentElement.style.setProperty('--slide-to', translations[topicsArr.indexOf(topic.innerText)]);

    transitionBlock.current!.style.animation = "slideUserMenu var(--long-transition) forwards";

    setTopics(() => ({
      Profile: false,
      Balance: false,
      Settings: false,
      [topic.innerText]: true
    }));
    
    const currentTopicElement = refList[topicsArr.indexOf(topic.innerText)];

    if (currentTopicElement) { 
      menuBlock.current.style.height = 
      currentTopicElement.offsetHeight
      + parseInt(window.getComputedStyle(parent).marginBottom)
      + parseInt(window.getComputedStyle(menuBlock.current).paddingBlock) * 2
      + parent.offsetHeight
      + 2     //не хватало 2пкс.
      + "px";
    }
  }

  return (
    <ModalOverflow>
        <div className="user-menu" ref={menuBlock}>
          <div className="navigator">
            {Object.keys(topics).map(topic => <span 
              className={createClassName(topics[topic] && "active")}
              children={topic}
              onClick={handleTopicClick}
            />)}

            <div className="hint-line" ref={hintLine}></div>
          </div>

          <div
            ref={transitionBlock}
            className="trans-wrapper"
          >
            <Profile ref={profileRef} />
            <Balance ref={balanceRef} />
            <Settings ref={settingsRef} />
          </div>
        </div>
    </ModalOverflow>
  );
}

export default UserMenu;
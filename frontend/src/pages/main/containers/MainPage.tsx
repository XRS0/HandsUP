import "../ui/MainPage.scss";

import Sidebar from "../ui/Sidebar";
import BeginChat from "../ui/BeginChat";
import LoadedChat from "./LoadedChat";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuthSliceActions } from "@/features/Auth/models/slice";
import { useNavigate } from "react-router-dom";

import sidebarIcon from "@/shared/assets/main-page/icons/sidebar-icon.svg"
import { createClassName } from "@/shared/utils/createClassName";

const MainPage = () => {
  const parentRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const { currentTopic } = useAppSelector(state => state.topics);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
   dispatch({ type: AuthSliceActions.getUser.type, meta: { navigate }})
  }, []);

  //for rerender component when width changes
  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    forceUpdate();
  }, [document.body.offsetWidth]);

  const openSidebar = () =>setIsOpened(prev => !prev);
  
  return (
    <div className={createClassName("wrapper", isOpened && "sidebar-open")} ref={parentRef}>
      { document.body.offsetWidth <= 480 
      && <div className="sidebar-icon">
        <img
          onClick={openSidebar}
          alt="icon" 
          src={sidebarIcon} 
        />
      </div>}

      <Sidebar />

      <div className="chat-wrapper">
        <div 
          className="chat-background" 
          onClick={isOpened ? openSidebar : () => {}}
        >
          { currentTopic && Object.values(currentTopic)[0].length !== 0 // check is topic messages exist
          ? <LoadedChat currentTopic={currentTopic} />                  // chat will be loaded form server
          : <BeginChat />
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;
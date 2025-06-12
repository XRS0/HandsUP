import "../ui/MainPage.scss";

import Sidebar from "../ui/Sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import sidebarIcon from "@/shared/assets/main-page/icons/sidebar-icon.svg"
import { createClassName } from "@/shared/utils/createClassName";
import { UserSliceActions } from "@/features/AuthUser";
import { TopicSliceActions } from "@/features/UserTopics/models/slice";
import Chat from "@/features/UserChat/containers/Chat";

const MainPage = () => {
  const parentRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const { currentTopic } = useAppSelector(state => state.topics);
  const { isLoading, token } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(UserSliceActions.getUser());
    } else {
      dispatch(TopicSliceActions.getTopics());
    }
  }, [token]);

  const openSidebar = () => setIsOpened(prev => !prev); 
  
  if (!isLoading && !token) return <Navigate to={"/auth"} replace />
  
  return (
    <div 
      ref={parentRef}
      data-testid="main-page"
      className={createClassName("wrapper", isOpened && "sidebar-open")} 
    >
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
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
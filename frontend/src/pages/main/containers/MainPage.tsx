import Sidebar from "../ui/Sidebar";
import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { UserSliceActions } from "@/features/AuthUser";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { TopicSliceActions } from "@/features/UserTopics/models/slice";

import sidebarIcon from "@/shared/assets/main-page/icons/sidebar-icon.svg"
import { createClassName } from "@/shared/utils/createClassName";
import Chat from "@/features/UserChat/containers/Chat";

import "../ui/MainPage.scss";

const MainPage = () => {
  // const parentRef = useRef(null);
  const [isOpened, setIsOpened] = useState(false);
  const { isLoading, token, username } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  // Возможно поменять, все в своей фиче
  useEffect(() => {
    if (!token) {
      const token = localStorage.getItem("token");
      if (token) dispatch(UserSliceActions.setToken(token));
      else <Navigate to={"/auth"} replace />
    }
    else if (!username) {
      // if username does not exists, try get user
      dispatch(UserSliceActions.getUser());
    }
    else {
      // if username exists, try get user topics
      dispatch(TopicSliceActions.getTopics());
    }
  }, [username, token]);

  const openSidebar = () => setIsOpened(prev => !prev);   // for mobile
  
  // if (!isLoading && !token) <Navigate to={"/auth"} replace />

  return (
    <div 
      // ref={parentRef}
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
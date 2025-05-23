import "../ui/MainPage.scss";

import Sidebar from "../ui/Sidebar";
import BeginChat from "../ui/BeginChat";
import LoadedChat from "./LoadedChat";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { AuthSliceActions } from "@/features/Auth/models/slice";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { currentTopic } = useAppSelector(state => state.topics);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {      uncomment this!!
  //   dispatch({
  //     type: AuthSliceActions.getUser.type,
  //     meta: { navigate }
  //   });
  // }, []);

  return (
    <div className="wrapper">
      <Sidebar />

      <div className="chat-wrapper">
        <div className="chat-background">
          { currentTopic
          ? <LoadedChat currentTopic={currentTopic} />  // chat will be loaded form server
          : <BeginChat />   // dummy component for initialization new chat
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;
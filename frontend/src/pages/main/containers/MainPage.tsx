import "../ui/MainPage.scss";

import Sidebar from "../ui/Sidebar";
import BeginChat from "../ui/BeginChat";
import LoadedChat from "./LoadedChat";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { AuthSliceActions } from "@/features/Auth/models/slice";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  // const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: AuthSliceActions.getUser.type,
      meta: { navigate }
    });
  }, []);

  return (
    <div className="wrapper">
      <Sidebar />

      <div className="chat-wrapper">
        <div className="chat-background">
          { true 
          ? <BeginChat />   // dummy component for initialization new chat
          : <LoadedChat />  // chat will be loaded form server
          }
        </div>
      </div>
    </div>
  );
}

export default MainPage;
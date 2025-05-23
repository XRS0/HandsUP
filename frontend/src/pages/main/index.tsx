import "./ui/MainPage.scss";

import Sidebar from "./ui/Sidebar";
import BeginChat from "./ui/BeginChat";
import LoadedChat from "./containers/LoadedChat";

const MainPage = () => {
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
export const sum = (a: number, b: number) => a + b;
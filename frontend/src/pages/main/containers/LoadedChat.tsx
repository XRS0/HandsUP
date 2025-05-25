import UserMessage from "@/features/ChatMessage/ui/StaticMessge";
import UserComposer from "@/features/UserComposer/UserComposer";
import { TopicMessage } from "@/features/UserTopics/types/topic";
import MDMessageBlock from "./MDMessageBlock";

import "../ui/LoadedChat.scss";
import { useAppSelector } from "@/hooks/redux";
import { globalSocket } from "@/entities/websocket/middleware";

type OwnProps = {
  currentTopic: {
    [key: string]: TopicMessage[]
  }
}

const LoadedChat: React.FC<OwnProps> = ({currentTopic}) => {
  const messages = [...Object.values(currentTopic)[0]].reverse();
  
  return (
    <div className="loaded-chat">
      <div className="messages-wrapper">
        <div className="gradient-top"></div>

        <div 
          className={"loaded-messages custom-scroll"}
        >
          {messages.map(message => 
            <UserMessage message={message.text} from={message.from} />
          )}

          {globalSocket.readyState && <MDMessageBlock />}
        </div>

        <div className="gradient-bottom"></div>
      </div>
    
      <UserComposer />
    </div>
  );
}

export default LoadedChat;
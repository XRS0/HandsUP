import UserMessage from "@/features/ChatMessage/ui/StaticMessge";
import UserComposer from "@/features/UserComposer/UserComposer";
import { TopicMessage } from "@/features/UserTopics/types/topic";

import "../ui/LoadedChat.scss";

type OwnProps = {
  currentTopic: {
    [key: string]: TopicMessage[]
  }
}

const LoadedChat: React.FC<OwnProps> = ({currentTopic}) => {
  // cause i cat change readonly obj
  const messages = [...Object.values(currentTopic)[0]].reverse();

  return (
    <div className="loaded-chat">
      <div className="messages-wrapper">
        <div className="gradient-top"></div>

        <div className="loaded-messages custom-scroll">
          {messages.map(message => 
            <UserMessage message={message.message} from={message.from} />
          )}
        </div>

        <div className="gradient-bottom"></div>
      </div>
    
      <UserComposer />
      {/* <div className="cover-block" /> */}
    </div>
  );
}

export default LoadedChat;
import UserMessage from "@/features/ChatMessage/ui/StaticMessge";
import UserComposer from "@/features/UserComposer/UserComposer";
import { TopicMessage } from "@/features/UserTopics/types/types";

import "../ui/LoadedChat.scss";

type OwnProps = {
  currentTopic: {
    [key: string]: TopicMessage[]
  }
}

const LoadedChat: React.FC<OwnProps> = ({currentTopic}) => {
  return (
    <div className="loaded-chat">
      {Object.values(currentTopic)[0].map(message => 
        <UserMessage message={message.message} from={message.from} />
      )}
      <UserComposer />
      <div className="cover-block" />
    </div>
  );
}

export default LoadedChat;
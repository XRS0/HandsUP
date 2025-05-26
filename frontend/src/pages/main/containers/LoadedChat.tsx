import UserMessage from "@/features/ChatMessage/ui/StaticMessge";
import UserComposer from "@/features/UserComposer/UserComposer";
import { TopicMessage } from "@/features/UserTopics/types/topic";
import MDMessageBlock from "./MDMessageBlock";

import "../ui/LoadedChat.scss";
import { useAppSelector } from "@/hooks/redux";

type OwnProps = {
  currentTopic: {
    [key: string]: TopicMessage[]
  }
}

const LoadedChat: React.FC<OwnProps> = ({currentTopic}) => {
  const { markdown, isMarkdownVisible } = useAppSelector(state => state.topics);
  const messages = [...Object.values(currentTopic)[0]].reverse();
  
  return (
    <div className="loaded-chat">
      <div className="messages-wrapper">
        <div className="gradient-top" />

        <div 
          className={"loaded-messages custom-scroll"}
        >
          {Object.keys(markdown)[0] === Object.keys(currentTopic)[0]
          && isMarkdownVisible
          && <MDMessageBlock />}
          {messages.map(message => 
            <UserMessage message={message.text} from={message.from} />
          )}
        </div>

        <div className="gradient-bottom" />
      </div>
    
      <UserComposer />
    </div>
  );
}

export default LoadedChat;
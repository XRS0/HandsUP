import Markdown from "react-markdown";
import "./StaticMessage.scss";

type OwnProps = {
  message: string;
  from: boolean;
}

const StaticMessage: React.FC<OwnProps> = ({ message, from }) => {
  return (
    <div className={from === false
      ? "chat-message-container"
      : "user-message-container"
    }>
      <div className="static-message">
        <Markdown components={{h1: 'h2'}}>
          {message}
        </Markdown>
      </div>
    </div>
  );
}

export default StaticMessage;
import "./StaticMessage.scss";

type OwnProps = {
  message: string;
  from: boolean;
}

const Static: React.FC<OwnProps> = ({message, from}) => {
  return (
    <div className={from === false
      ? "chat-message-container"
      : "user-message-container"
    }>
      <div className="static-message">
        {message}
      </div>
    </div>
  );
}

export default Static;
import { useAppSelector } from "@/hooks/redux";
import Markdown from "react-markdown";

import "../ui/MainPage.scss";
import "../ui/MDMessageBlock.scss";

const MDMessageBlock = () => {
  const { markdown } = useAppSelector(state => state.socket);

  return (
    <div className="conspect-message-block"
      style={{
        position: "absolute",
        zIndex: "5",
        top: "3%",
        left: "25%"
      }}
    >
      <Markdown 
       components={{h1: 'h2'}}    // Use h2s instead of h1s
      >
        {markdown}
      </Markdown>
    </div>
  );
}

export default MDMessageBlock;
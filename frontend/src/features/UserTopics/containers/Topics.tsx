import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import "../ui/Topic.scss";

import { getDateAgo } from "@/shared/utils/date";
import ConspectHistoryElement from "../ui/ConspectHistoryElement";
import NewTopic from "@/features/NewTopicButton/containers/NewTopic";
import { TopicMessage } from "@/features/UserChat/types";
import { TopicSliceActions } from "../models/slice";
import { getKey, getValue } from "@/shared/utils/hashMapGet";
import { ChatSliceActions } from "@/features/UserChat/models/slice";
import Socket from "@/entities/websocket/models/socket";
import { SocketSliceActions } from "@/entities/websocket/models/slice";

const Topics = () => {
  const { isTopicCreating, currentTopic, topics } = useAppSelector(state => state.topics);
  const { cachedChats } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();

  if (topics.length === 0) return <div className="history custom-scroll">{isTopicCreating && <NewTopic />}</div>;
  const groupedTopics: { [topic: string]: string[] } = {}

  try {
    [...topics].reverse()     //I CANT CHANGE REDUX DATA BUT REVERSE TRIES TO CHANGE THEM!
    .map(({topic, created_at}) => {
      if (!topic) return;
      
      if (groupedTopics[getDateAgo(new Date(created_at!))!]) {
        groupedTopics[getDateAgo(new Date(created_at!))!].push(topic);
      } else {
        groupedTopics[getDateAgo(new Date(created_at!))!] = [];
        groupedTopics[getDateAgo(new Date(created_at!))!].push(topic);
      }
    });
  } catch (err: any) {
    console.error("Error while parsing a topic date:", err.message);
  }

  const handleTopicClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const topicName = e.currentTarget.innerText.split(" ").join("_");

    const currentChatInCache = cachedChats.find(topic => getKey(topic) === topicName);

    if (currentChatInCache) {
      dispatch(ChatSliceActions.switchChat({to: getKey(currentChatInCache), from: currentTopic!}));
      dispatch(TopicSliceActions.switchTopic(getKey(currentChatInCache)));
      dispatch(SocketSliceActions.setMessage());  // for cleaning message for stt
    }
    else dispatch(TopicSliceActions.openTopic(topicName));
  }

  const selected = currentTopic && currentTopic.split("_").join(" ");

  return (
    <div className="history custom-scroll">
      {isTopicCreating && <NewTopic />}
      {Object.keys(groupedTopics).map((time, i) => 
        <ConspectHistoryElement
          key={i}
          date={time}
          selected={selected || ""}
          topics={groupedTopics[time]}
          onClick={handleTopicClick}
        />
      )}
    </div>
  );
}

export default Topics;
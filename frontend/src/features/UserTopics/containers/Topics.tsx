import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import "../ui/Topic.scss";

import { getDateAgo } from "@/shared/utils/date";
import ConspectHistoryElement from "../ui/ConspectHistoryElement";
import NewTopic from "@/features/NewTopicButton/containers/NewTopic";
import { TopicMessage, TopicPreview } from "@/features/UserChat/types";
import { TopicSliceActions } from "../models/slice";
import { getKey, getValue } from "@/shared/utils/hashMapGet";

const Topics = () => {
  const { isTopicCreating, currentTopic, topics } = useAppSelector(state => state.topics);
  const { cachedChats } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();

  if (topics.length === 0) return <div className="history custom-scroll">{isTopicCreating && <NewTopic />}</div>;

  const currentChat = cachedChats.filter(topic => getKey(topic) === currentTopic)[0];
  const groupedTopics: { [topic: string]: string[] } = {}

  try {
    topics.reverse()
    .map(({topic, created_at}, i) => {
      if (!topic) return;
      
      if (groupedTopics[getDateAgo(new Date(created_at!))!]) {
        groupedTopics[getDateAgo(new Date(created_at!))!].push(topic);
      } else {
        groupedTopics[getDateAgo(new Date(created_at!))!] = [];
        groupedTopics[getDateAgo(new Date(created_at!))!].push(topic);
      }
    });
  } catch (err: any) {
    console.error("Error while parsing a topic date", err.message);
  }

  const handleTopicClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const topicName = e.currentTarget.innerText;
    const switchedTopic = getValue(currentChat).find((t: TopicMessage) => getKey(t) === topicName);

    if (switchedTopic) {
      dispatch(TopicSliceActions.switchTopic(getKey(switchedTopic)));
    } else {
      dispatch(TopicSliceActions.openTopic(topicName));
    }
  }

  const selected = currentTopic && Object.keys(currentTopic)[0];

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
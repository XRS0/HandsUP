import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import "../ui/Topic.scss";

import { getDateAgo } from "@/shared/utils/date";
import ConspectHistoryElement from "./ConspectHistoryElement";
import { topicSliceActions } from "../models/slice";
import NewTopic from "@/features/CreateTopic/containers/NewTopic";

const Topics = () => {
  const { user } = useAppSelector(state => state.user);
  const { isTopicCreating, cashedTopics, currentTopic } = useAppSelector(state => state.topics);
  const dispatch = useAppDispatch();

  if (!user) return;
  if (!user?.topics) return <div className="history custom-scroll">{isTopicCreating && <NewTopic />}</div>;

  const topics = [...user!.topics];   // sort not working without absolute copy
  const groupedTopics: { [topic: string]: string[] } = {}

  try {
    topics
    .sort(({created_at: timeA}, {created_at: timeB}) => new Date(timeB!).getMinutes() - new Date(timeA!).getMinutes())
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
    const switchedTopic = cashedTopics.find(t => Object.keys(t)[0] === topicName);   //get only keys (names) of topics
    
    if (switchedTopic) {
      dispatch(topicSliceActions.switchTopic(switchedTopic));
    } else {
      dispatch(topicSliceActions.openTopic(topicName))  //action tries to get from server
    }
  }

  const selected = currentTopic && Object.keys(currentTopic)[0];
  console.log(selected);

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
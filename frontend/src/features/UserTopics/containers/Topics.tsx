import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import "../ui/Topic.scss";

import { getDateAgo } from "@/shared/utils/date";
import ConspectHistoryElement from "./ConspectHistoryElement";
import { topicSliceActions } from "../models/slice";
import NewTopic from "@/features/CreateTopic/containers/NewTopic";
import { useState } from "react";

const Topics = () => {
  const { user } = useAppSelector(state => state.user);
  const { isTopicCreating, cashedTopics } = useAppSelector(state => state.topics);
  const dispatch = useAppDispatch();
  
  const [selected, setSelected] = useState("");

  if (!user) return;

  const topics = [...user.topics];   // sort not working without absolute copy
  const groupedTopics: { [topic: string]: string[] } = {}

  topics
  .sort(({time: timeA}, {time: timeB}) => timeB - timeA)
  .map(({name, time}, i) => {
    if (groupedTopics[getDateAgo(time)!]) {
      groupedTopics[getDateAgo(time)!].push(name);
    } else {
      groupedTopics[getDateAgo(time)!] = [];
      groupedTopics[getDateAgo(time)!].push(name);
    }
  });

  const handleTopicClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const topicName = e.currentTarget.innerText;
    const switchedTopic = cashedTopics.find(t => Object.keys(t)[0] === topicName);   //get only keys (names) of topics
    
    setSelected(topicName);

    if (switchedTopic) {
      dispatch(topicSliceActions.switchTopic(switchedTopic));
    } else {  
      dispatch(topicSliceActions.openTopic(topicName)) //action tries to get from server
    }
  }

  return (
    <div className="history custom-scroll">
      {isTopicCreating && <NewTopic />}
      {Object.keys(groupedTopics).map((time, i) => 
        <ConspectHistoryElement
          key={i}
          date={time}
          selected={selected}
          topics={groupedTopics[time]}
          onClick={handleTopicClick}
        />
      )}
    </div>
  );
}

export default Topics;
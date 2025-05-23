import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import "../ui/ConspectHistory.scss";
import { getDateAgo } from "@/shared/utils/date";
import ConspectHistoryElement from "./ConspectHistoryElement";
import { topicSliceActions } from "../models/slice";
import NewTopic from "@/features/CreateTopic/containers/NewTopic";

const Topics = () => {
  const { user } = useAppSelector(state => state.user);
  const { isTopicCreating } = useAppSelector(state => state.topics);
  const dispatch = useAppDispatch();
  
  const topics = [...user!.topics];   // sort not working without absolute copy
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
    dispatch(topicSliceActions.openTopic(e.currentTarget.textContent!))
  }

  return (
    <div className="history">
      {isTopicCreating && <NewTopic />}
      {Object.keys(groupedTopics).map((time, i) => 
        <ConspectHistoryElement 
          key={i}
          date={time} 
          topics={groupedTopics[time]}
          onClick={handleTopicClick}
        />
      )}
    </div>
  );
}

export default Topics;
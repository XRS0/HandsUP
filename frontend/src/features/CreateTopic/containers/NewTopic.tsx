import { useAppDispatch } from "@/hooks/redux";
import useInput from "@/hooks/useInput";
import { topicSliceActions } from "@/features/UserTopics/models/slice";
import { useEffect, useRef } from "react";

import "../ui/NewTopic.scss";

const NewTopic = () => {
  const {value, onChange} = useInput("My Topic");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleTopicCreate = () => {
    const topicData = { topic: value, created_at: Date.now() }
    dispatch(topicSliceActions.switchCreatingTopic());
    dispatch(topicSliceActions.registerTopic(topicData));
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleTopicCreate();
    else if (e.key === "Escape") dispatch(topicSliceActions.switchCreatingTopic());
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input 
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      className="new-topic"
      onKeyDown={handleKeyDown}
      onBlur={handleTopicCreate}
    />
  );
}

export default NewTopic;
import { TopicSliceActions } from "@/features/UserTopics/models/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Button from "@/views/Button/ui/Button";

import plusIcon from "@assets/main-page/icons/plus.svg?react";

const CreateTopicBtn = () => {
  const { error } = useAppSelector(state => state.topics)
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onclick={() => dispatch(TopicSliceActions.switchCreatingTopic())}
        cssClass="new-conspect-button"
        children="New conspect"
        IconLeft={plusIcon}
      />

      <div className="error-message">{error}</div>
    </>
  );
}

export default CreateTopicBtn;
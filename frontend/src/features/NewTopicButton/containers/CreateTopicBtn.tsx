import { TopicSliceActions } from "@/features/UserTopics/models/slice";
import { useAppDispatch } from "@/hooks/redux";
import Button from "@/views/Button/ui/Button";

import plusIcon from "@assets/main-page/icons/plus.svg?react";

const CreateTopicBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onclick={() => dispatch(TopicSliceActions.switchCreatingTopic())}
      cssClass="new-conspect-button"
      children="New conspect"
      IconLeft={plusIcon}
    />
  );
}

export default CreateTopicBtn;
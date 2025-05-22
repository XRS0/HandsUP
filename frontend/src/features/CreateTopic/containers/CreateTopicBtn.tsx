import { topicSliceActions } from "@/features/UserTopics/models/slice";
import { useAppDispatch } from "@/hooks/redux";
import Button from "@/views/Button/ui/Button";

import plusIcon from "@assets/main-page/icons/plus.svg?react";

const CreateTopicBtn = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onclick={() => dispatch(topicSliceActions.switchCreatingTopic())}
      cssClass="new-conspect-button"
      children="New conspect"
      IconLeft={plusIcon}
    />
  );
}

export default CreateTopicBtn;
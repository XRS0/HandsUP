import { socketSliceActions } from "@/entities/websocket/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";

import "../ui/EditMessageTextarea.scss";
import useInput from "@/hooks/useInput";
import Button from "@/views/Button/ui/Button";

type OwnProps = {
  height: number;
}

const EditMessageTextarea: React.FC<OwnProps> = ({ height }) => {
  const { message, isEditingNow } = useAppSelector(state => state.socket);
  const { value, onChange } = useInput(message.join(" "));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(socketSliceActions.editMessage(value));
  }, [value]);

  return (
    <div className="edit-textarea"
      style={height < 600 ? {height: `${height}px`} : {height: `600px`}}
    >
      <textarea
        autoComplete="off"
        value={value}
        onChange={onChange}
        />

      <div className="edit-buttons">
        <Button 
          children={"Cancel"} 
          cssClass={"copy-button"} 
          onclick={() => dispatch(socketSliceActions.cancelMessage())} 
        />
        
        <Button 
        children={"Accept"} 
        onclick={() => dispatch(socketSliceActions.allowEdit())} 
        />
      </div>
    </div>
  );
}

export default EditMessageTextarea;
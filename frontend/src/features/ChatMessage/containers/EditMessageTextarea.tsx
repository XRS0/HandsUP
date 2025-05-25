import { socketSliceActions } from "@/entities/websocket/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useRef } from "react";

import "../ui/EditMessageTextarea.scss";
import useInput from "@/hooks/useInput";
import Button from "@/views/Button/ui/Button";

const EditMessageTextarea = () => {
  const { message } = useAppSelector(state => state.socket);
  const { value, onChange } = useInput(message);
  const dispatch = useAppDispatch();
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    dispatch(socketSliceActions.editMessage(value));

    if (!textRef.current) return;
      textRef.current.style.height = 'auto';
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  }, [value]);

  return (
    <div className="edit-textarea">
      <textarea
        ref={textRef}
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
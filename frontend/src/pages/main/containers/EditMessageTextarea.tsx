import { socketSliceActions } from "@/entities/websocket/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";

import "../ui/EditMessageTextarea.scss";
import useInput from "@/hooks/useInput";

type OwnProps = {
  height: number;
}

const EditMessageTextarea: React.FC<OwnProps> = ({ height }) => {
  const { message } = useAppSelector(state => state.socket);
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
    </div>
  );
}

export default EditMessageTextarea;
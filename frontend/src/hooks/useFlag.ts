import {useState} from "react";

type FlagDispatch = [
  boolean,
  () => void,
  () => void
];

const useFlag = (initial?: boolean): FlagDispatch => {
  const [state, setState] = useState<boolean>(initial ?? false);
  
  const open = () => setState(true);
  const close = () => setState(false);

  return [state, open, close];
}

export default useFlag;
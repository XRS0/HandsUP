import { useState } from "react";

const useInput = (initialState = "") => {
  const [value, setValue] = useState<string>(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }

  const clear = () => {
    setValue("");
  }
  
  return {value, onChange, clear};
}

export default useInput;
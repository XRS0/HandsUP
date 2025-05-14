import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState<string>("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const clear = () => {
    setValue("");
  }
  
  return {value, onChange, clear};
}

export default useInput;
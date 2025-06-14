import Button from "@/views/Button/ui/Button"
import { Navigate } from "react-router-dom"

import trashIcon from "@/shared/assets/main-page/icons/trash.svg?react";
import { useState } from "react";

const LogoutUser = () => {          // sorry for my lazyness
  const [isLogin, setIslogin] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIslogin(false);
  }
  
  if (!isLogin) return <Navigate to={"/auth"} />
  
  return (
    <Button 
      cssClass="warning-button"
      children="Выйти из аккаунта"
      IconLeft={trashIcon}
      onclick={handleLogout}
    />
  );
}

export default LogoutUser;
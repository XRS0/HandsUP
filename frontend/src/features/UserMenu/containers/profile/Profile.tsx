import React from "react";

import "../../ui/Topic.scss";

import MenuField from "../../ui/MenuField";
import Button from "@/views/Button/ui/Button";

import trashIcon from "@/shared/assets/main-page/icons/trash.svg?react";
import { useAppSelector } from "@/hooks/redux";
import { maskEmail } from "@/shared/utils/mask";

type OwnProps = {
  ref: React.Ref<HTMLDivElement> | undefined
}

const Profile: React.FC<OwnProps> = ({ ref }) => {
  const {user} = useAppSelector(state => state.user);
  if (!user) return;

  return (
    <div className="topic" ref={ref}>
      <MenuField name="Name" value={user.username}/>
      <MenuField name="Email" value={maskEmail(user.email)}/>
      <MenuField 
        name="Password"
        data-content={user.password} 
        value={user.password.replace(/[a-z]/gi, "*")}
      />
      <Button 
        cssClass="warning-button"
        children="Delete an account"
        IconLeft={trashIcon}
        onclick={() => window.open("https://github.com/YXUNGGG")}
      />
    </div>
  );
}

export default Profile;
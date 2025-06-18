import React from "react";

import "../ui/Topic.scss";

import MenuField from "../ui/MenuField";
import { useAppSelector } from "@/hooks/redux";
import { maskEmail } from "@/shared/utils/mask";
import LogoutUser from "../ui/LogoutUser";

type OwnProps = {
  ref: React.Ref<HTMLDivElement> | undefined
}

const Profile: React.FC<OwnProps> = ({ ref }) => {
  const user = useAppSelector(state => state.user);

  return (
    <div className="topic" ref={ref}>
      <MenuField name="Name" value={user.username}/>
      <MenuField name="Email" value={maskEmail(user.email)}/>
      <MenuField 
        name="Password"
        value={
          "********"
          //user.password.replace(/[a-z]/gi, "*")
        }
      />

      <LogoutUser />
    </div>
  );
}

export default Profile;
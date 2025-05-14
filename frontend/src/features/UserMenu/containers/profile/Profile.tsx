import React from "react";

import "../../ui/Topic.scss";

import MenuField from "../../ui/MenuField";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/store";
import Button from "@/views/Button/ui/Button";

import trashIcon from "@/shared/assets/main-page/trash.svg?react";

type OwnProps = {
  ref: React.Ref<HTMLDivElement> | undefined
}

const Profile: React.FC<OwnProps> = ({ ref }) => {
  //const user = useSelector((state: RootState) => state);

  return (
    <div className="topic" ref={ref}>
      <MenuField name="Name" value={"Sergey Kivostanenko"}/>
      <MenuField name="Email" value={"s.kri***o@mail.ru"}/>
      <MenuField name="Password" value={"sosages2006"}/>
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
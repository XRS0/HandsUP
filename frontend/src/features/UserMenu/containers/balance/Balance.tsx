import React from "react";

import "../../ui/Topic.scss";


import MenuField from "../../ui/MenuField";
import Button from "@/views/Button/ui/Button";

import UpgradeIcon from "@/shared/assets/main-page/icons/upgrade.svg?react";
import { useAppSelector } from "@/hooks/redux";

type OwnProps = {
  ref: React.Ref<HTMLDivElement> | undefined
}

const Balance: React.FC<OwnProps> = ({ ref }) => {
  const {user} = useAppSelector(state => state.user);
  if (!user) return;

  return (
    <div className="topic" ref={ref}>
      <MenuField name="Balance for today" value={`${user.balance} min.`}/>
      <MenuField 
        name="Current price plan" 
        value={user.price_plan === "Free"
          ? <span style={{color: "#6A6C79", cursor: "default"}}>{user.price_plan}</span> 
          : user.price_plan }
        />
      <Button
        // cssClass="warning-button"
        children="Upgrade price plan"
        IconLeft={UpgradeIcon}
        onclick={() => window.open("https://www.artstation.com/reinmar")}
      />
    </div>
  );
}

export default Balance;
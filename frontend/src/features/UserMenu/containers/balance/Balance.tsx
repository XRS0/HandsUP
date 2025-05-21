import React from "react";

import "../../ui/Topic.scss";


import MenuField from "../../ui/MenuField";
import Button from "@/views/Button/ui/Button";

import UpgradeIcon from "@/shared/assets/main-page/icons/upgrade.svg?react";

type OwnProps = {
  ref: React.Ref<HTMLDivElement> | undefined
}

const Balance: React.FC<OwnProps> = ({ ref }) => {
  //const user = useSelector((state: RootState) => state);

  return (
    <div className="topic" ref={ref}>
      <MenuField name="Balance for today" value={"42 min."}/>
      <MenuField name="Current price plan" value={<span color="#6A6C79">Free</span>} />
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
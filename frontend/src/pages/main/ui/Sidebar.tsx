import React from "react";
import Button from "../../../views/Button/ui/Button";
import ConspectHistoryElement from "./ConspectHistoryElement";

import "./Sidebar.scss";

import logo from "@assets/welcome-page/logo.svg";
import priceIcon from "@assets/main-page/price-plan.svg";
import settingsIcon from "@assets/main-page/settings.svg";
import avatarIcon from "@assets/main-page/avatar.svg";
import plusIcon from "@assets/main-page/plus.svg?react";
import useAnimation from "@/hooks/useAnimation";
import UserMenu from "@/features/UserMenu";
import ModalOverflow from "@/features/UserMenu/ui/ModalOverflow";

const Sidebar = () => {
  const {
    isVisible,
    isFadeOut,
    handleOpen,
    handleAnimationEnd,
  } = useAnimation();

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains("overflow")) return;
    
    handleOpen(e);
  }

  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <Button
          onclick={() => {}}
          cssClass="new-conspect-button"
          children="New conspect"
          IconLeft={plusIcon}
        />

        <div className="line"></div>

        <div className="content">
          <div className="history">
            <ConspectHistoryElement date={Date.now() - 300000 * 5} topics={["Friday math lecture"]}/>

            <ConspectHistoryElement date={Date.now() - 30000000 * 5} topics={["Thursday lecture", "History Rome conspect"]}/>
          </div>

          <div className="user-block">
            <div className="upgrade-price-plan">
              <div>
                <img src={priceIcon} alt="icon" />
                Upgrade plan
              </div>

              <div className="plan-level">Free</div>
            </div>

            <div className="profile" onClick={handleOpen}>
              <div>
                <img src={avatarIcon} className="avatar" alt="icon" />
                My profile
              </div>

              <img src={settingsIcon} alt="icon" />
            </div>
          </div>
        </div>
      </div>

      {isVisible && 
        <ModalOverflow isOpen={!isFadeOut} onClick={handleMenuOpen}>
          <UserMenu
            isFadeOut={isFadeOut}
            onAnimationEnd={handleAnimationEnd}
          />
        </ModalOverflow>
      }
    </>
  );
}

export default Sidebar;
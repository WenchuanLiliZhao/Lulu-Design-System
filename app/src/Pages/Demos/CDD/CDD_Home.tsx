import { Logo } from "../../../assets/Img/Logo";
import { Placeholder } from "../../../assets/Img/Placeholder";
import { Btn } from "../../../Components/Btn";
import { HoverBox } from "../../../Components/HoverBox";
import { Icon } from "../../../Components/Icon";
import { Dropdown } from "../../../Components/Dropdown";
import { Nav } from "../../../Components/Nav";
import { Page } from "../../../Types/PageType";
import styles from "./CDD_Home.module.scss";
import React from "react";
import { Menu } from "../../../Components/Menu";
import { ThemeMenu } from "../../../Components/ThemeMenu";
import { MessageBox } from "../../../Components/MessageBox";
import { Example_MessagesList } from "../../../Types/ExampleData/Example_MessagesList";

const MenuBtnToRemove = () => {
  return (
    <div className={styles["menu"]}>
      <div className={styles["menu-btn"]}>
        <Icon icon="menu" />
      </div>
      <HoverBox mode={"default"} />
    </div>
  );
};



interface NavItem_SiteTitleBarProps {
  text: string;
}

const NavItem_SiteTitleBar: React.FC<NavItem_SiteTitleBarProps> = ({
  text,
}) => {
  return (
    <a href={`/${CDD_Home.info.slug}`} className={styles["logo-bar"]}>
      <Logo mode="FullColorNoText" className={styles["logo"]} />
      <div className={styles["text"]}>{text}</div>
    </a>
  );
};

interface NavItem_UserAvatarProps {
  avatarUrl: string | undefined;
  onClick?: () => void;
}

const NavItem_UserAvatar: React.FC<NavItem_UserAvatarProps> = ({
  avatarUrl,
}) => {
  return (
    <div className={styles["user-avatar"]}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="User Avatar" className={styles["avatar"]} />
      ) : (
        <Placeholder element="UserAvatar" className={styles["avatar"]} />
      )}
      <HoverBox mode={"default"} />
    </div>
  );
};

interface NavItem_DropdownProps {
  btn: React.ReactNode;
  menu: React.ReactNode;
  onClick?: () => void;
}

const NavItem_Dropdown: React.FC<NavItem_DropdownProps> = ({
  btn,
  menu,
  onClick,
}) => {
  console.log(menu);
  return (
    <div className={styles["dropdown"]}>
      <div className={styles["btn"]} onClick={onClick}>
        {btn}
      </div>
    </div>
  );
};

const TestMenuContent = [
  {
    groupTitle: "User Settings",
    groupItems: [
      { icon: "account_circle", text: "Profile" },
      { icon: "settings", text: "Settings" },
      { icon: "logout", text: "Logout" },
    ],
  },
  {
    groupTitle: "Resources",
    groupItems: [
      { icon: "help", text: "Help Center" },
      { icon: "info", text: "About Us" },
    ],
  },
  {
    groupItems: [
      { icon: "feedback", text: "Send Feedback" },
      { icon: "bug_report", text: "Report a Bug" },
    ],
  },
];

const CDD_Home: Page = {
  info: {
    slug: "cdd-home",
    title: "CDD Home",
    title_display: undefined,
  },
  content: (
    <>
      <Nav
        items={{
          left: [
            <MenuBtnToRemove />,
            <NavItem_SiteTitleBar text={"China Data Discover"} />,
          ],
          middle: [],
          right: [
            <ThemeMenu />,
            <Dropdown
              trigger={
                <Btn icon={"settings"} mode={"nav-btn"} deco={"arrow_drop_down"} />
              }
              dropdownContent={<Menu items={TestMenuContent} />}
              position={"left"}
              dropdownSize={"small"}
            />,
            <Dropdown
              trigger={
                <Btn
                  icon={"notifications"}
                  mode={"nav-btn"}
                  deco={"arrow_drop_down"}
                />
              }
              dropdownContent={<MessageBox title="Notification" messageList={Example_MessagesList.NonEmpty} />}
              position={"left"}
              dropdownSize={"large"}
            />,
            <NavItem_Dropdown
              btn={<Btn icon={"info"} mode={"nav-btn"} />}
              menu={undefined}
            />,
            <NavItem_UserAvatar avatarUrl={undefined} />,
          ],
        }}
      />
    </>
  ),
};

export default CDD_Home;

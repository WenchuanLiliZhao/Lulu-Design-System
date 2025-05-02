import { Logo } from "../../../assets/Img/Logo";
import { Placeholder } from "../../../assets/Img/Placeholder";
import { Btn } from "../../../Components/Btn";
import { HoverBox } from "../../../Components/HoverBox";
import { Dropdown } from "../../../Components/Dropdown";
import { Nav, NavDivider } from "../../../Components/Nav";
import { Page } from "../../../Types/PageType";
import styles from "./CDD_Home.module.scss";
import React from "react";
import { Menu } from "../../../Components/Menu";
import { ThemeMenu } from "../../../Components/ThemeMenu";
import { MessageBox } from "../../../Components/MessageBox";
import { Example_MessagesList } from "../../../Types/ExampleData/Example_MessagesList";
import { SearchBar } from "../../../Components/SearchBar";
import { Example_TagList } from "../../../Types/ExampleData/Example_TagSet";
import { TagType } from "../../../Types/TagType";
import { Tag } from "../../../Components/Tag";
import { KanbanGroup } from "../../../Components/KanbanGroup";
import { DataList } from "../../../Components/DataList";
import { Example_DataElementArray } from "../../../Types/ExampleData/Example_DataElement";
import { ChatBotBtn } from "../../../Components/ChatBotBtn";
import { Footer } from "../../../Components/Footer";
import { SideMenu } from "../../../Components/SideMenu";
import { Example_Pages } from "../../../Types/ExampleData/Example_Pages";
import { CDD_SiteInfo } from "./CDD_SiteInfo";
import { SearchHintGroupType } from "../../../Types/SearchHintType";


const SearchHintGroups: SearchHintGroupType[] = [
  {
    groupTitle: "Set Theory",
    hintList: Example_Pages.Group2.slice(0, 3),
  },
  {
    groupTitle: "General Topology",
    hintList: Example_Pages.Group3.slice(0, 5),
  },
]


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
            <SideMenu
              siteInfo={CDD_SiteInfo}
              itemGroups={[
                {
                  groupTitle: "",
                  items: Example_Pages.Group1,
                },
                {
                  groupTitle: "",
                  items: Example_Pages.Group2,
                },
                {
                  groupTitle: "Group 3",
                  items: Example_Pages.Group3,
                },
              ]}
            />,
            <NavItem_SiteTitleBar text={"China Data Discover"} />,
          ],
          middle: [],
          right: [
            <SearchBar
              place="on-nav"
              onSearch={function (): void {
                throw new Error("Function not implemented.");
              }}
              searchHintGroups={SearchHintGroups}
            />,
            <NavDivider />,
            <ThemeMenu />,
            <Dropdown
              trigger={
                <Btn
                  icon={"notifications"}
                  place={"nav-btn"}
                  deco={"arrow_drop_down"}
                />
              }
              dropdownContent={
                <MessageBox
                  title="Notification"
                  messageList={Example_MessagesList.NonEmpty}
                />
              }
              position={"left"}
              dropdownSize={"large"}
              unreadCount={Example_MessagesList.NonEmpty.filter(
                (message) => !message.read
              ).length}
              unreadMode={"number"}
            />,
            <Dropdown
              trigger={<NavItem_UserAvatar avatarUrl={undefined} />}
              dropdownContent={<Menu items={TestMenuContent} />}
              position={"left"}
              dropdownSize={"small"}
            />,
          ],
        }}
      />

      <main className={`${styles["content"]} ${styles["post-like"]}`}>
        <div className={styles["page-title-container"]}>
          <h1 className={styles["page-title"]}>Welcome to CDD Home</h1>
          <p className={styles["page-description"]}>
            A fair mood may dawn with a search bar's grace, yet a foul mood,
            too, may find its trace therein.
          </p>
        </div>

        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          <SearchBar
            placeholder="Search China Data Discover..."
            onSearch={(query: string): void => {
              console.log("Search query:", query);
            }}
            searchHintGroups={SearchHintGroups}
          />

          {/**
           * This component 👇 has been updated to limit the display of tags to a maximum of ten tags.
           * If there are more than 10 tags, the last tag in the second row will be replaced with a tag displaying `···`.
           * This ensures a clean and concise UI, especially when dealing with a large number of tags.
           * The logic uses `slice` to limit the number of tags displayed and conditionally adds the `···` tag if the total number of tags exceeds 14.
           */}
          {/**
           * 此组件 👇 已更新为将标签的显示限制为最多 10 个 tags。
           * 如果标签数量超过 10 个，第二行的最后一个标签将被替换为显示 `···` 的标签。
           * 这样可以确保在处理大量标签时，界面保持简洁和美观。
           * 逻辑使用 `slice` 限制显示的标签数量，并在总标签数超过 14 时有条件地添加 `···` 标签。
           */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "16px",
              justifyContent: "center",
            }}
          >
            {Example_TagList.slice(0, 10).map((tag: TagType, index: number) => (
              <React.Fragment key={index}>
                <Tag tag={tag} size={"medium"} />
              </React.Fragment>
            ))}
            {Example_TagList.length > 14 && (
              <React.Fragment key="more">
                <Tag tag={{ name: "···" }} size={"medium"} />
              </React.Fragment>
            )}
          </div>

          <div style={{ marginTop: "32px" }}>
            {/* <Kanban title={""} subKanbanList={[]} /> */}
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "16px",
          }}
        >
          <KanbanGroup
            title={"Browsing history"}
            kanbanList={[
              {
                title: "Report",
                icon: "monitoring",
                content: (
                  <DataList
                    list={Example_DataElementArray.Report}
                    displayMode={"simplified"}
                  />
                ),
              },
              {
                title: "Dataset",
                icon: "dataset",
                content: (
                  <DataList
                    list={Example_DataElementArray.DataSet}
                    displayMode={"simplified"}
                  />
                ),
              },
            ]}
            style={{ height: "600px", gridColumn: "span 4" }}
          />
          <KanbanGroup
            title={"Browsing history"}
            kanbanList={[
              {
                title: "Resently Viewed",
                icon: "visibility",
                content: (
                  <DataList
                    list={Example_DataElementArray.ResentlyViewed}
                    displayMode={"semi-detailed"}
                  />
                ),
              },
              {
                title: "Starred",
                icon: "star",
                content: (
                  <DataList
                    list={Example_DataElementArray.Empty}
                    displayMode={"semi-detailed"}
                  />
                ),
              },
            ]}
            style={{ height: "600px", gridColumn: "span 8" }}
          />
        </div>
      </main>

      <Footer />

      <ChatBotBtn />
    </>
  ),
};

export default CDD_Home;

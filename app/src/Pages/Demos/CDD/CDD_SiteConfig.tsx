import React from "react";
import { SiteInfoType } from "../../../ObjectShapes/SiteInfoShape";
import { Example_Pages } from "../../../ObjectShapes/ExampleData/Example_Pages";
import { SearchHintGroupType } from "../../../ObjectShapes/SearchHintShape";
import { Btn, BtnDivider } from "../../../Components/SmallElements/Btn";
import { MessageBox } from "../../../Components/MessageBox";
import {
  Nav,
  NavItem_SiteTitleBar,
  NavItem_UserAvatar,
} from "../../../Components/Layout/Nav";
import { SearchBar } from "../../../Components/SearchBar";
import { SideMenu } from "../../../Components/SideMenu";
import { ThemeMenu } from "../../../Components/SmallElements/ThemeMenu";
import { Example_MessagesList } from "../../../ObjectShapes/ExampleData/Example_MessagesList";
import { ClickToClose, Dropdown } from "../../../Components/Dropdown/Dropdown";
import { Menu } from "../../../Components/Dropdown/Menu";
import { ReactNode } from "react";
import { Footer } from "../../../Components/Layout/Footer";
import { JiraLayout } from "../../../Components/Layout/JiraLayout";
import { transformTreeNodes, TreeExplorer } from "../../../Components/TreeExplorer/TreeExplorer";
import { Example_TreeNodeMaps } from "../../../ObjectShapes/ExampleData/Example_TreeNodes";
import { MenuItem } from "../../../Components/Dropdown/MenuItem";
import { FilterableDropdown } from "../../../Components/Dropdown/FilterableDropdown";
import { TextSwitch } from "../../../Components/SmallElements/Switch";

export const CDD_SiteInfo: SiteInfoType = {
  title: "China Data Dictionary",
  description: "v4.12.0",
  currentVersion: "v4.12.0",
  buildDate: new Date("2025-04-24"), // 构建时间
  expiryDate: new Date("2025-04-26 11:06:48"), // 到期时间
};

export const SearchHintGroups: SearchHintGroupType[] = [
  {
    groupTitle: "Set Theory",
    hintList: Example_Pages.Group2.slice(0, 3),
  },
  {
    groupTitle: "General Topology",
    hintList: Example_Pages.Group3.slice(0, 5),
  },
];

export const TestMenuContent = [
  {
    groupTitle: "User Settings",
    groupItems: [
      <MenuItem item={{ icon: "account_circle", text: "Profile" }} />,
      <MenuItem item={{ icon: "settings", text: "Settings" }} />,
      <MenuItem item={{ icon: "logout", text: "Logout" }} />,
    ],
  },
  {
    groupTitle: "Resources",
    groupItems: [
      <MenuItem item={{ icon: "help", text: "Help Center" }} />,
      <MenuItem item={{ icon: "info", text: "About Us" }} />,
    ],
  },
  {
    groupItems: [
      <MenuItem item={{ icon: "feedback", text: "Send Feedback" }} />,
      <MenuItem item={{ icon: "bug_report", text: "Report a Bug" }} />,
    ],
  },
];

export const CDD_Nav: React.FC = () => {
  return (
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
          <NavItem_SiteTitleBar text={"China Data Discover"} to={""} />,
        ],
        middle: [],
        right: [
          <SearchBar
            size="size-on-nav"
            onSearch={function (): void {
              throw new Error("Function not implemented.");
            }}
            searchHintGroups={SearchHintGroups}
          />,
          <BtnDivider size={"size-small"} />,
          <ThemeMenu />,
          <Dropdown
            trigger={
              <Btn
                icon={"notifications"}
                size={"size-nav-btn"}
                deco={"arrow_drop_down"}
              />
            }
            dropdownContent={
              <MessageBox
                title="Notification"
                messageList={Example_MessagesList.NonEmpty}
              />
            }
            position={"right"}
            dropdownSize={"large"}
            unreadCount={
              Example_MessagesList.NonEmpty.filter((message) => !message.read)
                .length
            }
            unreadMode={"number"}
          />,
          <Dropdown
            trigger={<NavItem_UserAvatar avatarUrl={undefined} />}
            dropdownContent={<Menu group={TestMenuContent} />}
            position={"right"}
            dropdownSize={"small"}
          />,
        ],
      }}
    />
  );
};

interface CDD_BasicLayoutProps {
  children?: ReactNode;
}

export const CDD_BasicLayout: React.FC<CDD_BasicLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <CDD_Nav />
      {children}
      <Footer />
    </>
  );
};

export const CDD_DataPageLayout: React.FC<CDD_BasicLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <CDD_Nav />
      <JiraLayout
        mainContent={
          <main>
            {children}
            <Footer />
          </main>
        }
        sidebar={{
          title: "Data Dictionary",
          content: <TreeExplorer data={transformTreeNodes(Example_TreeNodeMaps.Math)} useAs="page-tree" />,
          headerControls: [
            <Dropdown
              trigger={
                <Btn
                  icon={"tune"}
                  size={"size-small"}
                  deco={"arrow_drop_down"}
                />
              }
              dropdownContent={
                <Menu
                  group={[
                    {
                      groupTitle: "Metamathematics",
                      groupItems: [
                        <FilterableDropdown
                          defaultSelectedOption={"Set Theory"}
                          placeholder={""}
                          options={[
                            "Set Theory",
                            "Linear Algebra",
                            "Abstract Algebra",
                            "Geometry",
                            "Topology",
                            "Number Theory",
                            "Calculus",
                            "Probability",
                            "Statistics",
                            "Combinatorics",
                          ]}
                          onSelect={(selectedOption) => {
                            console.log("Selected option:", selectedOption);
                            // 在这里处理选中的选项
                          }}
                        />,
                        <FilterableDropdown
                          placeholder={"What do you want to learn?"}
                          options={[
                            "Set Theory",
                            "Linear Algebra",
                            "Abstract Algebra",
                            "Geometry",
                            "Topology",
                            "Number Theory",
                            "Calculus",
                            "Probability",
                            "Statistics",
                            "Combinatorics",
                          ]}
                          onSelect={(selectedOption) => {
                            console.log("Selected option:", selectedOption);
                            // 在这里处理选中的选项
                          }}
                        />,
                      ],
                      groupSpacing: "group-spacing-compact",
                    },
                    {
                      groupTitle: "Foundations of Mathematics",
                      groupItems: [
                        <FilterableDropdown
                          defaultSelectedOption={"Abstract Algebra"}
                          placeholder={""}
                          options={[
                            "Set Theory",
                            "Linear Algebra",
                            "Abstract Algebra",
                            "Geometry",
                            "Topology",
                            "Number Theory",
                            "Calculus",
                            "Probability",
                            "Statistics",
                            "Combinatorics",
                          ]}
                          onSelect={(selectedOption) => {
                            console.log("Selected option:", selectedOption);
                            // 在这里处理选中的选项
                          }}
                        />,
                        <FilterableDropdown
                          placeholder={"What do you want to learn?"}
                          options={[
                            "Set Theory",
                            "Linear Algebra",
                            "Abstract Algebra",
                            "Geometry",
                            "Topology",
                            "Number Theory",
                            "Calculus",
                            "Probability",
                            "Statistics",
                            "Combinatorics",
                          ]}
                          onSelect={(selectedOption) => {
                            console.log("Selected option:", selectedOption);
                            // 在这里处理选中的选项
                          }}
                        />,
                      ],
                      groupSpacing: "group-spacing-compact",
                    },
                    {
                      groupTitle: "Preferences",
                      groupSpacing: "group-spacing-compact",
                      groupItems: [
                        <TextSwitch
                          icon="notes"
                          text={"Show Comments"}
                          fullLine
                          checked={false}
                          onChange={(checked: boolean): void => {
                            console.log("Switch toggled:", checked);
                          }}
                        />,
                        <TextSwitch
                          icon="code"
                          text={"Show Code"}
                          fullLine
                          checked={false}
                          onChange={(checked: boolean): void => {
                            console.log("Switch toggled:", checked);
                          }}
                        />,
                      ],
                    },
                    {
                      groupTitle: "Perspective",
                      groupSpacing: "group-spacing-compact",
                      groupItems: [
                        <FilterableDropdown
                          defaultSelectedOption={"Technical Perspective"}
                          placeholder={""}
                          options={[
                            "Technical Perspective",
                            "Business Perspective",
                          ]}
                          onSelect={(selectedOption) => {
                            console.log("Selected option:", selectedOption);
                            // 在这里处理选中的选项
                          }}
                        />,
                      ],
                    },
                    {
                      groupSpacing: "group-spacing-compact",
                      groupItems: [
                        <SearchBar
                          size="size-small"
                          onSearch={function (query: string): void {
                            throw new Error(
                              `Function not implemented: ${query}`
                            );
                          }}
                        />,
                      ],
                    },
                    {
                      groupItems: [
                        <Btn
                          icon={"add"}
                          text={"New Metadata"}
                          className={ClickToClose}
                          mode={"mode-possitive-filled"}
                          size={"size-medium"}
                        />,
                      ],
                      groupSpacing: "group-spacing-compact",
                    },
                  ]}
                />
              }
              dropdownSize={"medium"}
              position={"left"}
            />,
          ],
        }}
      />
    </>
  );
};

export const CDD_TopologyLayout: React.FC<CDD_BasicLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <CDD_Nav />
      <JiraLayout
        mainContent={
          <main>
            {children}
            <Footer />
          </main>
        }
        sidebar={{
          title: "Topology Layers",
          content: <TreeExplorer data={transformTreeNodes(Example_TreeNodeMaps.Math)} useAs="layer-tree" />, // Sidebar with CheckBoxTree
        }}
      />
    </>
  );
};


import { CDD_BasicLayout, SearchHintGroups } from "./CDD_SiteConfig";
import { PageShape } from "../../../ObjectShapes/PageShape";
import styles from "./CDD_Home.module.scss";
import React from "react";
import { SearchBar } from "../../../Components/SearchBar";
import { Example_TagList } from "../../../ObjectShapes/ExampleData/Example_TagSet";
import { TagType } from "../../../ObjectShapes/TagShape";
import { Tag } from "../../../Components/SmallElements/Tag";
import { KanbanGroup } from "../../../Components/DataShowCase/KanbanGroup";
import { DataList } from "../../../Components/DataShowCase/DataList";
import { Example_DataPageLists } from "../../../ObjectShapes/ExampleData/Example_DataElement";
import { ChatBotBtn } from "../../../Components/ChatBotBtn";


const CDD_Home: PageShape = {
  info: {
    slug: "cdd-home",
    title: "CDD Home",
    title_display: undefined,
    date: new Date("2025-04-16 10:00:00"),
    type: "page"
  },
  content: (
    <CDD_BasicLayout>
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
                    list={Example_DataPageLists.Reports}
                    displayMode={"simplified"}
                  />
                ),
              },
              {
                title: "Dataset",
                icon: "dataset",
                content: (
                  <DataList
                    list={Example_DataPageLists.DataSets}
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
                    list={Example_DataPageLists.ResentlyViewed}
                    displayMode={"semi-detailed"}
                  />
                ),
              },
              {
                title: "Starred",
                icon: "star",
                content: (
                  <DataList
                    list={Example_DataPageLists.Empty}
                    displayMode={"semi-detailed"}
                  />
                ),
              },
            ]}
            style={{ height: "600px", gridColumn: "span 8" }}
          />
        </div>
      </main>

      <ChatBotBtn />
    </CDD_BasicLayout>
  ),
};

export default CDD_Home;

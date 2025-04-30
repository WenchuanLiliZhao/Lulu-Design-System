import React from "react";
import styles from "./Footer.module.scss";
import { FormattedDate } from "./FormattedDate";
import { CDD_SiteInfo } from "../Pages/Demos/CDD/CDD_SiteInfo";

export const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-body"]}>
        <div className={styles["left"]}>
          <p>{`${CDD_SiteInfo.title} ${CDD_SiteInfo.currentVersion}`}</p>
        </div>
        <div className={styles["right"]}>
          <p>
            Build Date: <FormattedDate date={CDD_SiteInfo.buildDate} displayMode="date" />
          </p>
          <p>
            Expire Date:{" "}
            <FormattedDate date={new Date(CDD_SiteInfo.expiryDate)} />
          </p>
        </div>
      </div>
    </footer>
  );
};

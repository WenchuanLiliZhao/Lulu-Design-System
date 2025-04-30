import React from "react";
import styles from './Footer.module.scss';
import { FormattedDate } from './FormattedDate';
import { CDD_SiteInfo } from "../Pages/Demos/CDD/CDD_SiteInfo";

export const Footer: React.FC = () => {
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer-content']}>
        <p style={{color: "red"}}>Footer 还在设计中，请忽略</p>
        <p>{`Current Version: ${CDD_SiteInfo.currentVersion}`}</p>
        <p>Build Date: <FormattedDate date={CDD_SiteInfo.buildDate} /></p>
        <p>Expire Date: <FormattedDate date={new Date(CDD_SiteInfo.expiryDate)} /></p>
      </div>
    </footer>
  );
};
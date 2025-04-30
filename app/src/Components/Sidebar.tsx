import React from "react";
import styles from './Sidebar.module.scss';

export const Sidebar: React.FC = () => {
  return (
    <div className={styles["sidebar"]}>
      <h2>Sidebar</h2>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
      </ul>
    </div>
  )
}
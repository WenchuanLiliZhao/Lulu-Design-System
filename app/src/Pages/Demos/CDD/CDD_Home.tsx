import { Logo } from "../../../assets/LogoIndex/LogoIndex";
import { Icon } from "../../../Components/Icon";
import { Nav } from "../../../Components/Nav";
import { Page } from "../../../Types/PageType";
import styles from "./CDD_Home.module.scss";
import { useState, useEffect } from "react";

const Menu = () => {
  return (
    <div className={styles["menu"]}>
      <div className={styles["menu-btn"]}>
        <Icon icon="menu" />
      </div>
    </div>
  );
};

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    // 从 localStorage 获取初始值
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    // 根据主题设置 data-theme 属性
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    // 将主题存储到 localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={styles["theme-switcher"]}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        aria-label="Theme Switcher"
      >
        <option value="system">Adapt System</option>
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
      </select>
    </div>
  );
};


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
          left: [<Menu />, <Logo mode="FullColorNoText" className={styles["logo"]} />, <p>China Data Discover</p> ],
          middle: undefined,
          right: [<ThemeSwitcher />],
        }}
      />
    </>
  ),
};

export default CDD_Home;

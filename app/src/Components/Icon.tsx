import styles from "./Icon.module.scss"

interface IconProps {
  icon: string;
  className?: string;
}

export const Icon = ({ icon, className }: IconProps) => {
  return <span className={`${styles["icon"]} material-symbols-outlined ${className}`}>{icon}</span>;
};

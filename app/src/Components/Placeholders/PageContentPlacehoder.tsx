
import React from "react";
import styles from './PageContentPlacehoder.module.scss';

interface PageContentPlaceholderProps {
  image: string;
  title: string;
  description: string;
}

export const PageContentPlaceholder: React.FC<PageContentPlaceholderProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <div className={styles["placeholder-container"]}>
      <figure className={styles["placeholder-figure"]}>
        <img
          className={styles["placeholder-image"]}
          src={image}
          alt={`Image of ${title}`}
          loading="lazy"
        />
        <figcaption className={styles["placeholder-figcaption"]}>
          <div className={styles["placeholder-title"]}>
            {title}
          </div>
          <div className={styles["placeholder-subtitle"]}>
            {description}
          </div>
        </figcaption>
      </figure>
    </div>
  )
}
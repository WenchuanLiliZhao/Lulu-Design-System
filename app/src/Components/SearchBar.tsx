import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import { Icon } from './Icon';

type SearchBarProps = {
  placeholder?: string;
  place?: "default" | "on-nav"
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', place = "default",  onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className={`${styles["search-bar"]} ${styles[place]}`}>
      <Icon icon={'search'} />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default SearchBar;
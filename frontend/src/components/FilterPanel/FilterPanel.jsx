import { useState } from 'react';
import Icon from '../Icon/Icon';
import styles from './FilterPanel.module.css';

export default function FilterPanel({
  categories,
  initialCategory,
  initialSearch,
  onFilter,
}) {
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialSearch);

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter({ category, search: search.trim() });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <div className={styles.selectWrap}>
        <select
          aria-label="Product category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={styles.select}
        >
          <option value="">Product category</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <Icon name="icon-chevron" className={styles.selectIcon} />
      </div>

      <div className={styles.searchWrap}>
        <input
          type="text"
          aria-label="Search medicine"
          placeholder="Search medicine"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className={styles.search}
        />
        <Icon name="icon-search" className={styles.searchIcon} />
      </div>

      <button type="submit" className={styles.button}>
        <Icon name="icon-filter" className={styles.buttonIcon} />
        Filter
      </button>
    </form>
  );
}
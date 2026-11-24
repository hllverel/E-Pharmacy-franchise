import Icon from '../Icon/Icon';
import styles from './Pagination.module.css';

const WINDOW = 3;

const getPages = (page, totalPages) => {
  const start = Math.max(1, Math.min(page - 1, totalPages - WINDOW + 1));
  const end = Math.min(totalPages, start + WINDOW - 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPages(page, totalPages);
  const isFirst = page === 1;
  const isLast = page === totalPages;

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => onChange(1)}
            disabled={isFirst}
            aria-label="First page"
          >
            <Icon name="icon-chevrons" className={`${styles.icon} ${styles.flip}`} />
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => onChange(page - 1)}
            disabled={isFirst}
            aria-label="Previous page"
          >
            <Icon name="icon-chevron" className={`${styles.icon} ${styles.flip}`} />
          </button>
        </li>

        {pages[0] > 1 && (
          <li className={styles.dots} aria-hidden="true">
            ...
          </li>
        )}

        {pages.map((number) => (
          <li key={number}>
            <button
              type="button"
              className={`${styles.page} ${number === page ? styles.active : ''}`}
              onClick={() => onChange(number)}
              aria-label={`Page ${number}`}
              aria-current={number === page ? 'page' : undefined}
            >
              {number}
            </button>
          </li>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <li className={styles.dots} aria-hidden="true">
            ...
          </li>
        )}

        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => onChange(page + 1)}
            disabled={isLast}
            aria-label="Next page"
          >
            <Icon name="icon-chevron" className={styles.icon} />
          </button>
        </li>
        <li>
          <button
            type="button"
            className={styles.control}
            onClick={() => onChange(totalPages)}
            disabled={isLast}
            aria-label="Last page"
          >
            <Icon name="icon-chevrons" className={styles.icon} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
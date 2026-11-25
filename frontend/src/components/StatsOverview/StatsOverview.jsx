import Icon from '../Icon/Icon';
import styles from './StatsOverview.module.css';

export default function StatsOverview({ totals }) {
  const stats = [
    { label: 'All products', value: totals.products, icon: 'icon-database' },
    { label: 'All suppliers', value: totals.suppliers, icon: 'icon-users' },
    { label: 'All customers', value: totals.customers, icon: 'icon-users' },
  ];

  return (
    <ul className={styles.list}>
      {stats.map(({ label, value, icon }) => (
        <li key={label} className={styles.card}>
          <p className={styles.label}>
            <Icon name={icon} className={styles.icon} />
            {label}
          </p>
          <p className={styles.value}>{value.toLocaleString('en-US')}</p>
        </li>
      ))}
    </ul>
  );
}
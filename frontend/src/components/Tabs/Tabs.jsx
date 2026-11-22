import styles from './Tabs.module.css';

export default function Tabs({ tabs, activeTab, onChange, label, variant = 'underline' }) {
  return (
    <div className={`${styles.tabs} ${styles[variant]}`} role="group" aria-label={label}>
      {tabs.map(({ id, label: tabLabel }) => (
        <button
          key={id}
          type="button"
          aria-pressed={activeTab === id}
          className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
          onClick={() => onChange(id)}
        >
          {tabLabel}
        </button>
      ))}
    </div>
  );
}
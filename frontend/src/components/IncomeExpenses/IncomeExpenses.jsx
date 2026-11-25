import { useId } from 'react';
import { formatDayLabel } from '../../utils/formatDayLabel';
import { formatSignedAmount } from '../../utils/formatNumber';
import styles from './IncomeExpenses.module.css';

export default function IncomeExpenses({ transactions }) {
  const headingId = useId();

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.title}>
        Income/Expenses
      </h2>

      <div className={styles.body}>
        {transactions.length === 0 ? (
          <p className={styles.message}>No transactions yet.</p>
        ) : (
          <>
            <p className={styles.day}>{formatDayLabel(transactions[0].date)}</p>
            <ul className={styles.list}>
              {transactions.map(({ _id, name, type, amount }) => {
                const typeClass = styles[type.toLowerCase()];
                const formatted = formatSignedAmount(amount);

                return (
                  <li key={_id} className={styles.item}>
                    <span className={`${styles.badge} ${typeClass}`}>{type}</span>
                    <p className={styles.name}>{name}</p>
                    <p className={`${styles.amount} ${typeClass}`}>
                      {type === 'Error' ? <s>{formatted}</s> : formatted}
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
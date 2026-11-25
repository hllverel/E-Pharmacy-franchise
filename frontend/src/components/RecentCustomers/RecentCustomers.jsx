import { useId } from 'react';
import { formatMoney } from '../../utils/formatNumber';
import styles from './RecentCustomers.module.css';

export default function RecentCustomers({ customers, onView }) {
  const headingId = useId();

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.title}>
        Recent Customers
      </h2>

      {customers.length === 0 ? (
        <p className={styles.message}>No customers yet.</p>
      ) : (
        <div
          className={styles.tableWrap}
          role="region"
          aria-label="Recent customers table"
          tabIndex={0}
        >
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Spent</th>
                <th scope="col">Medicine</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{formatMoney(customer.spent)}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.view}
                      onClick={() => onView(customer)}
                      aria-label={`View goods of ${customer.name}`}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
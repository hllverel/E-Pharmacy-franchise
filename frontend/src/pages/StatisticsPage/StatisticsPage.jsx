import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StatsOverview from '../../components/StatsOverview/StatsOverview';
import RecentCustomers from '../../components/RecentCustomers/RecentCustomers';
import IncomeExpenses from '../../components/IncomeExpenses/IncomeExpenses';
import ClientGoodsModal from '../../components/ClientGoodsModal/ClientGoodsModal';
import { getStatisticsRequest } from '../../api/statistics';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './StatisticsPage.module.css';

export default function StatisticsPage() {
  const [state, setState] = useState({ status: 'loading', data: null });
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    getStatisticsRequest()
      .then((data) => {
        if (!isCancelled) setState({ status: 'ready', data });
      })
      .catch((error) => {
        if (isCancelled) return;
        toast.error(getErrorMessage(error));
        setState({ status: 'error', data: null });
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Statistics</h1>

      {state.status === 'loading' && (
        <p className={styles.message} role="status">
          Loading...
        </p>
      )}

      {state.status === 'error' && (
        <p className={styles.message}>Could not load the statistics.</p>
      )}

      {state.status === 'ready' && (
        <>
          <StatsOverview totals={state.data.totals} />
          <div className={styles.columns}>
            <RecentCustomers
              customers={state.data.recentCustomers}
              onView={(customer) => setSelectedClientId(customer._id)}
            />
            <IncomeExpenses transactions={state.data.transactions} />
          </div>
        </>
      )}

      {selectedClientId && (
        <ClientGoodsModal
          key={selectedClientId}
          clientId={selectedClientId}
          onClose={() => setSelectedClientId(null)}
        />
      )}
    </div>
  );
}
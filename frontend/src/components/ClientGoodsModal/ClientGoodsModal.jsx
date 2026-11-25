import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';
import placeholder from '../../assets/images/product-placeholder.webp';
import { getClientGoodsRequest } from '../../api/statistics';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { formatMoney } from '../../utils/formatNumber';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ClientGoodsModal.module.css';

export default function ClientGoodsModal({ clientId, onClose }) {
  const [state, setState] = useState({ status: 'loading', data: null });

  useEffect(() => {
    let isCancelled = false;

    getClientGoodsRequest(clientId)
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
  }, [clientId]);

  const renderContent = () => {
    if (state.status === 'loading') {
      return (
        <p className={styles.message} role="status">
          Loading...
        </p>
      );
    }

    if (state.status === 'error') {
      return <p className={styles.message}>Could not load the goods.</p>;
    }

    const { client, goods } = state.data;

    return (
      <>
        <dl className={styles.info}>
          <div className={styles.infoItem}>
            <dt className={styles.infoLabel}>Name</dt>
            <dd className={styles.infoValue}>{client.name}</dd>
          </div>
          <div className={styles.infoItem}>
            <dt className={styles.infoLabel}>Email</dt>
            <dd className={styles.infoValue}>{client.email}</dd>
          </div>
          <div className={styles.infoItem}>
            <dt className={styles.infoLabel}>Spent</dt>
            <dd className={styles.infoValue}>{formatMoney(client.spent)}</dd>
          </div>
        </dl>

        {goods.length === 0 ? (
          <p className={styles.message}>No purchases yet.</p>
        ) : (
          <ul className={styles.list}>
            {goods.map((good) => (
              <li key={good.productId}>
                <Link to={`/medicine/${good.productId}`} className={styles.item}>
                  <div className={styles.imageBox}>
                    <img
                      src={good.photo || placeholder}
                      alt=""
                      width="100"
                      height="100"
                      loading="lazy"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{good.name}</p>
                    <p className={styles.itemDescription}>{good.description}</p>
                    <p className={styles.itemPrice}>{formatPrice(good.price)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <Modal title="The client's goods" onClose={onClose} wide>
      {renderContent()}
    </Modal>
  );
}
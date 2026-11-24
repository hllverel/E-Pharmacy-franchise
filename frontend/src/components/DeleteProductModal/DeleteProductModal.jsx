import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';
import placeholder from '../../assets/images/product-placeholder.webp';
import { deleteProduct } from '../../redux/products/operations';
import styles from './DeleteProductModal.module.css';

export default function DeleteProductModal({ shopId, product, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const cancelRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteProduct({ shopId, productId: product._id })).unwrap();
      toast.success('Medicine deleted successfully');
      onClose();
      onSuccess();
    } catch (message) {
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Confirm deletion" onClose={onClose} initialFocusRef={cancelRef}>
      <p className={styles.text}>Are you sure you want to delete this item?</p>
      <div className={styles.imageBox}>
        <img src={product.photo || placeholder} alt="" className={styles.image} />
      </div>
      <p className={styles.name}>{product.name}</p>
      {product.suppliers && <p className={styles.supplier}>{product.suppliers}</p>}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.confirm}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          Confirm
        </button>
        <button type="button" ref={cancelRef} className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
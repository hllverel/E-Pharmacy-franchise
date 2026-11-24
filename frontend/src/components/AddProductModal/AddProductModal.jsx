import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';
import ProductForm from '../ProductForm/ProductForm';
import { createProduct } from '../../redux/products/operations';

export default function AddProductModal({ shopId, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await dispatch(createProduct({ shopId, formData })).unwrap();
      toast.success('Medicine added successfully');
      onClose();
      onSuccess();
    } catch (message) {
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Add medicine to store" onClose={onClose}>
      <ProductForm
        imageLabel="Upload image"
        submitLabel="Add medicine"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
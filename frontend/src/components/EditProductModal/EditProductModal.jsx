import { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Modal from '../Modal/Modal';
import ProductForm from '../ProductForm/ProductForm';
import { updateProduct } from '../../redux/products/operations';

export default function EditProductModal({ shopId, product, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await dispatch(
        updateProduct({ shopId, productId: product._id, formData }),
      ).unwrap();
      toast.success('Medicine updated successfully');
      onClose();
      onSuccess();
    } catch (message) {
      toast.error(message);
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Edit medicine" onClose={onClose}>
      <ProductForm
        product={product}
        imageLabel="Change image"
        submitLabel="Save medicine"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
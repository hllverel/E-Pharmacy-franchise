import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReviewCard from '../ReviewCard/ReviewCard';
import Pagination from '../Pagination/Pagination';
import { getReviewsRequest } from '../../api/medicine';
import { getErrorMessage } from '../../utils/getErrorMessage';
import styles from './ReviewsTab.module.css';

const REVIEWS_PER_PAGE = 3;

export default function ReviewsTab({ shopId, productId }) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    getReviewsRequest(shopId, productId, { page, limit: REVIEWS_PER_PAGE })
      .then((data) => {
        if (isCancelled) return;
        setResult({
          page,
          reviews: data.reviews,
          totalPages: data.totalPages,
          hasError: false,
        });
      })
      .catch((error) => {
        if (isCancelled) return;
        toast.error(getErrorMessage(error));
        setResult({ page, reviews: [], totalPages: 1, hasError: true });
      });

    return () => {
      isCancelled = true;
    };
  }, [shopId, productId, page]);

  const isLoading = !result || result.page !== page;

  if (isLoading) {
    return (
      <p className={styles.message} role="status">
        Loading...
      </p>
    );
  }

  if (result.hasError) {
    return <p className={styles.message}>Could not load the reviews.</p>;
  }

  if (result.reviews.length === 0) {
    return <p className={styles.message}>No reviews yet.</p>;
  }

  return (
    <>
      <ul className={styles.list}>
        {result.reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </ul>
      <Pagination page={page} totalPages={result.totalPages} onChange={setPage} />
    </>
  );
}
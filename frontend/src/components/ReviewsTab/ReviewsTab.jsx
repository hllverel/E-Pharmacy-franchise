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
  const [data, setData] = useState({ reviews: [], totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setIsLoading(true);

    getReviewsRequest(shopId, productId, { page, limit: REVIEWS_PER_PAGE })
      .then((result) => {
        if (!isCancelled) setData(result);
      })
      .catch((error) => {
        if (!isCancelled) toast.error(getErrorMessage(error));
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [shopId, productId, page]);

  if (isLoading) {
    return (
      <p className={styles.message} role="status">
        Loading...
      </p>
    );
  }

  if (data.reviews.length === 0) {
    return <p className={styles.message}>No reviews yet.</p>;
  }

  return (
    <>
      <ul className={styles.list}>
        {data.reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </ul>
      <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
    </>
  );
}
import Icon from '../Icon/Icon';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import styles from './ReviewCard.module.css';

const STARS = [1, 2, 3, 4, 5];

export default function ReviewCard({ review }) {
  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.name}>{review.name}</p>
          <p className={styles.date}>
            <time dateTime={review.date}>{formatRelativeTime(review.date)}</time>
          </p>
        </div>
        <div
          className={styles.rating}
          role="img"
          aria-label={`Rating: ${review.rating} out of 5`}
        >
          {STARS.map((star) => (
            <Icon
              key={star}
              name="icon-star"
              className={`${styles.star} ${star <= review.rating ? styles.filled : ''}`}
            />
          ))}
        </div>
      </div>
      <p className={styles.text}>{review.text}</p>
    </li>
  );
}
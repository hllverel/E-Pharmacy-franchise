import { formatRelativeTime } from '../../utils/formatRelativeTime';
import styles from './ReviewCard.module.css';

export default function ReviewCard({ review }) {
  return (
    <li className={styles.card}>
      <p className={styles.name}>{review.name}</p>
      <p className={styles.date}>
        <time dateTime={review.date}>{formatRelativeTime(review.date)}</time>
      </p>
      <p className={styles.text}>{review.text}</p>
    </li>
  );
}
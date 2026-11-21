import styles from './DeliveryRadios.module.css';

export default function DeliveryRadios({ register }) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Has own Delivery System?</legend>
      <div className={styles.options}>
        <label className={styles.option}>
          <input
            type="radio"
            value="true"
            className={styles.input}
            {...register('hasOwnDelivery')}
          />
          <span className={styles.text}>Yes</span>
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            value="false"
            className={styles.input}
            {...register('hasOwnDelivery')}
          />
          <span className={styles.text}>No</span>
        </label>
      </div>
    </fieldset>
  );
}